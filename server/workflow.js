import { Router } from 'express';
import { createHmac, randomInt, randomUUID, timingSafeEqual } from 'node:crypto';
import { z } from 'zod';
import { aiConfigured, generateAiAdvice } from './ai-review.js';
import { CHALLENGES, RESOURCES, REVIEW_FEE, scoreReview, readinessCheck, ratingBonus, qualityFromRatings } from '../shared/catalog.js';
import { createPayosLink, payosConfigured, verifyPayosWebhook } from './payos.js';
import { deliverVerificationEmail } from './auth.js';
import { MENTOR_AGREEMENT_VERSION } from '../shared/mentorAgreement.js';

const url = z.string().trim().max(500).refine(value => {
  try { const parsed = new URL(value); return ['https:', 'http:'].includes(parsed.protocol) && !parsed.username && !parsed.password; } catch { return false; }
}, 'Link phải dùng http/https, không chứa tài khoản hoặc mật khẩu.');
const submitSchema = z.object({
  challengeId: z.string(), mode: z.enum(['ai', 'human']), format: z.enum(['project', 'cv', 'chat']),
  links: z.array(url).max(3), skills: z.array(z.string().trim().min(1).max(80)).max(15),
  notes: z.string().trim().max(3000), shareTalent: z.boolean().default(false),
  mentorId: z.string().max(120).optional(), acceptDelay: z.boolean().default(false),
  linksAccessible: z.boolean().default(false), status: z.enum(['draft', 'queued'])
});
export const hasPaidAccess = (user, now = Date.now()) => Boolean(user?.isPremium && user.subscriptionExpiresAt && new Date(user.subscriptionExpiresAt).getTime() > now);
export const mentorSummary = (account, profile, submissions) => {
  const jobs = submissions.filter(item => item.mentorId === account.id && item.mode === 'human');
  const quality = qualityFromRatings(jobs.filter(item => item.rating).map(item => item.rating.stars));
  const capacity = profile?.capacity || 5;
  const queueCount = jobs.filter(item => ['queued', 'in_review', 'needs_revision'].includes(item.status)).length;
  const agreementAccepted = account.mentorAgreementVersion === MENTOR_AGREEMENT_VERSION && Boolean(account.mentorAgreementAcceptedAt);
  return { id: account.id, name: account.name, title: account.title || '', expertise: account.expertise || [],
    challengeIds: profile?.challengeIds || [], capacity, queueCount, overloaded: queueCount >= capacity,
    estimatedDays: Math.max(2, Math.ceil((queueCount + 1) / capacity) * 2), ...quality,
    available: profile?.available ?? true,
    canContinue: account.status === 'active' && profile?.application?.status === 'approved',
    eligible: account.status === 'active' && profile?.application?.status === 'approved' && agreementAccepted && profile.available !== false && (quality.qualityStatus !== 'excluded' || profile.qualityOverride === true),
    agreementAccepted,
    accountStatus: account.status, applicationStatus: profile?.application?.status || 'pending', qualityOverride: profile?.qualityOverride === true
  };
};
export const earningsFor = jobs => jobs.reduce((total, item) => {
  if (!item.reward) return total;
  const amount = item.reward.base + item.reward.bonus;
  total.base += item.reward.base; total.bonus += item.reward.bonus; total.total += amount;
  total[item.reward.paid ? 'paid' : 'pending'] += amount; total.count += 1;
  return total;
}, { base: 0, bonus: 0, total: 0, pending: 0, paid: 0, count: 0 });

export function nextPremiumExpiry(currentExpiry, now, planId) {
  const durationDays = planId === 'premium-year' ? 365 : planId === 'premium-quarter' ? 90 : 30;
  const currentTime = currentExpiry ? new Date(currentExpiry).getTime() : 0;
  const startTime = Math.max(now.getTime(), Number.isFinite(currentTime) ? currentTime : 0);
  return new Date(startTime + durationDays * 86400000);
}

export function createWorkflowRouter({ UserProfile, MentorAccount, AdminAccount, ReviewSubmission, ReviewerProfile, Complaint, SubscriptionOrder, PremiumPlan, sendPaymentEmail = deliverVerificationEmail }) {
  const router = Router();
  const userOrderQueues = new Map();
  const run = handler => async (req, res, next) => { try { await handler(req, res); } catch (error) { next(error); } };
  const serializeUserOrder = async (userId, action) => {
    const previous = userOrderQueues.get(userId) || Promise.resolve();
    let release;
    const current = new Promise(resolve => { release = resolve; });
    userOrderQueues.set(userId, current);
    await previous;
    try { return await action(); }
    finally {
      release();
      if (userOrderQueues.get(userId) === current) userOrderQueues.delete(userId);
    }
  };
  const fail = (status, message) => { const error = new Error(message); error.status = status; throw error; };
  const paymentOtpEnabled = () => process.env.EMAIL_VERIFICATION_REQUIRED === '1' || (process.env.NODE_ENV === 'production' && process.env.EMAIL_VERIFICATION_REQUIRED !== '0');
  const paymentOtpHash = (sessionId, planId, code) => createHmac('sha256', process.env.OTP_SECRET || process.env.SESSION_SECRET || 'local-payment-otp').update(`${sessionId}:${planId}:${code}`).digest('hex');
  const activateOrder = async (order, reference, actor) => {
    if (!order) fail(404, 'Không tìm thấy đơn thanh toán.');
    if (!['pending', 'completed'].includes(order.status)) fail(409, 'Đơn đã được xử lý.');
    let updated = order;
    if (order.status === 'pending') {
      const student = await UserProfile.findOne({ id: order.userId }).lean();
      if (!student) fail(409, 'Không tìm thấy tài khoản sinh viên của đơn này.');
      const now = new Date();
      const expiresAt = nextPremiumExpiry(student.subscriptionExpiresAt, now, order.planId);
      updated = await SubscriptionOrder.findOneAndUpdate({ orderId: order.orderId, status: 'pending' }, {
        $set: { status: 'completed', verifiedBy: actor, paymentReference: reference, activatedAt: now, expiresAt },
        $push: { statusHistory: { status: 'completed', changedAt: now, note: reference } }
      }, { new: true }) || await SubscriptionOrder.findOne({ orderId: order.orderId }).lean();
    }
    if (updated?.status !== 'completed' || !updated.expiresAt) fail(409, 'Đơn vừa được xử lý. Hãy tải lại.');
    // Reconcile a completed order on webhook retry if a process stopped between
    // saving the order and granting access; older callbacks cannot shorten access.
    await UserProfile.updateOne({ id: updated.userId, $or: [{ subscriptionExpiresAt: { $exists: false } }, { subscriptionExpiresAt: null }, { subscriptionExpiresAt: { $lte: updated.expiresAt } }] }, { $set: { isPremium: true, planId: updated.planId, planName: updated.planName, subscriptionExpiresAt: updated.expiresAt, subscription: { planId: updated.planId, planName: updated.planName, status: 'active', expiresAt: updated.expiresAt } } });
    return updated;
  };
  const requireRole = (req, role) => { if (req.session.user?.role !== role) fail(403, 'Bạn không có quyền thực hiện thao tác này.'); };
  const catalogItem = id => CHALLENGES.find(item => item.id === id) || fail(404, 'Không tìm thấy thử thách.');
  const loadMentors = async () => {
    const [accounts, profiles, jobs] = await Promise.all([MentorAccount.find({}).lean(), ReviewerProfile.find({}).lean(), ReviewSubmission.find({ mode: 'human' }).lean()]);
    return accounts.map(account => mentorSummary(account, profiles.find(item => item.mentorId === account.id), jobs))
      .sort((a, b) => Number(b.eligible) - Number(a.eligible) || a.queueCount / a.capacity - b.queueCount / b.capacity || b.ratingAvg - a.ratingAvg);
  };
  router.get('/catalog', (_req, res) => res.json({ catalog: CHALLENGES, resources: RESOURCES }));
  router.post('/payments/payos-webhook', run(async (req, res) => {
    if (!payosConfigured() || !verifyPayosWebhook(req.body)) return res.status(400).json({ code: 'INVALID_SIGNATURE' });
    const data = req.body.data;
    const order = await SubscriptionOrder.findOne({ providerOrderCode: Number(data.orderCode) }).lean();
    // payOS sends a signed sample transaction while confirming a webhook URL.
    if (!order) return res.json({ code: '00', success: true });
    if (Number(data.amount) !== Number(order.price)) return res.status(400).json({ code: 'ORDER_MISMATCH' });
    if (req.body.success !== true || req.body.code !== '00' || data.code !== '00') return res.json({ code: '00', success: true });
    await serializeUserOrder(order.userId, async () => {
      const fresh = await SubscriptionOrder.findOne({ orderId: order.orderId }).lean();
      await activateOrder(fresh, data.reference || String(data.paymentLinkId || data.orderCode), 'payOS');
    });
    res.json({ code: '00', success: true });
  }));
  router.use(async (req, _res, next) => {
    try {
      if (!req.session.user) fail(401, 'Vui lòng đăng nhập để tiếp tục.');
      const { id, role } = req.session.user;
      const model = role === 'student' ? UserProfile : role === 'mentor' ? MentorAccount : role === 'admin' ? AdminAccount : null;
      const account = model && await model.findOne({ id }).lean();
      if (!account || ['suspended', 'rejected', 'disqualified', 'pending'].includes(account.status)) fail(403, 'Tài khoản không khả dụng.');
      req.account = account;
      next();
    } catch (error) { next(error); }
  });

  router.get('/state', run(async (req, res) => {
    const { id, role } = req.session.user;
    const filter = role === 'admin' ? {} : role === 'mentor' ? { mentorId: id } : { userId: id };
    const [mentors, submissions, profile, orders, profiles, complaints] = await Promise.all([
      loadMentors(), ReviewSubmission.find(filter).sort({ updatedAt: -1 }).lean(),
      role === 'mentor' ? ReviewerProfile.findOne({ mentorId: id }).lean() : null,
      role === 'admin' ? SubscriptionOrder.find({}).sort({ createdAt: -1 }).lean() : role === 'student' ? SubscriptionOrder.find({ userId: id }).sort({ createdAt: -1 }).lean() : [],
      role === 'admin' ? ReviewerProfile.find({}).lean() : [],
      Complaint ? Complaint.find(role === 'admin' ? {} : { reporterId: id }).sort({ updatedAt: -1 }).lean() : []
    ]);
    const mentor = mentors.find(item => item.id === id);
    const approved = mentor?.eligible;
    const talents = role === 'mentor' && approved ? await ReviewSubmission.find({ shareTalent: true, status: 'completed', mode: 'human', 'review.score': { $gte: 85 } }).lean() : [];
    res.json({ catalog: CHALLENGES, resources: RESOURCES, mentors, submissions, aiEnabled: aiConfigured(),
      mentorAgreement: role === 'mentor' ? { accepted: req.account.mentorAgreementVersion === MENTOR_AGREEMENT_VERSION && Boolean(req.account.mentorAgreementAcceptedAt), version: MENTOR_AGREEMENT_VERSION, acceptedAt: req.account.mentorAgreementAcceptedAt || null } : null,
      profile, paid: role === 'student' && hasPaidAccess(req.account), orders,
      applications: profiles.map(item => ({ ...item, name: mentors.find(mentor => mentor.id === item.mentorId)?.name || item.mentorId })),
      earnings: earningsFor(submissions), complaints,
      talents: talents.map(item => ({ id: item.id, studentName: item.studentName, challengeId: item.challengeId, score: item.review.score, links: item.links, notes: item.notes })) });
  }));

  router.post('/mentor/agreement', run(async (req, res) => {
    requireRole(req, 'mentor');
    z.object({ accepted: z.literal(true) }).parse(req.body);
    if (req.account.mentorAgreementVersion === MENTOR_AGREEMENT_VERSION && req.account.mentorAgreementAcceptedAt) return res.json({ accepted: true, version: MENTOR_AGREEMENT_VERSION, acceptedAt: req.account.mentorAgreementAcceptedAt });
    const acceptedAt = new Date();
    await MentorAccount.updateOne({ id: req.account.id, status: 'active' }, { $set: { mentorAgreementVersion: MENTOR_AGREEMENT_VERSION, mentorAgreementAcceptedAt: acceptedAt }, $push: { mentorAgreementHistory: { version: MENTOR_AGREEMENT_VERSION, acceptedAt } } });
    res.json({ accepted: true, version: MENTOR_AGREEMENT_VERSION, acceptedAt });
  }));

  router.post('/complaints', run(async (req, res) => {
    if (!Complaint || !['student', 'mentor'].includes(req.session.user.role)) fail(403, 'Chức năng khiếu nại không khả dụng cho tài khoản này.');
    const payload = z.object({ kind: z.enum(['review', 'payout', 'account', 'other']), submissionId: z.string().max(120).default(''), description: z.string().trim().min(30).max(3000) }).parse(req.body);
    const reporter = req.session.user;
    if (payload.submissionId) {
      const owned = reporter.role === 'student'
        ? await ReviewSubmission.findOne({ id: payload.submissionId, userId: reporter.id }).lean()
        : await ReviewSubmission.findOne({ id: payload.submissionId, mentorId: reporter.id }).lean();
      if (!owned) fail(404, 'Không tìm thấy bài liên quan thuộc tài khoản của bạn.');
    }
    const recent = await Complaint.countDocuments({ reporterId: reporter.id, createdAt: { $gte: new Date(Date.now() - 86400000) } });
    if (recent >= 5) fail(429, 'Bạn đã gửi đủ số yêu cầu hỗ trợ hôm nay. Hãy chờ admin phản hồi.');
    const ticket = await Complaint.create({ id: randomUUID(), reporterId: reporter.id, reporterRole: reporter.role, reporterName: req.account.name, ...payload, status: 'open' });
    res.status(201).json({ complaint: ticket });
  }));
  router.patch('/admin/complaints/:id', run(async (req, res) => {
    requireRole(req, 'admin');
    if (!Complaint) fail(503, 'Kho khiếu nại chưa được cấu hình.');
    const payload = z.object({ status: z.enum(['in_review', 'resolved', 'rejected']), resolution: z.string().trim().min(20).max(3000) }).parse(req.body);
    const ticket = await Complaint.findOneAndUpdate({ id: req.params.id, status: { $in: ['open', 'in_review'] } }, { $set: { status: payload.status, resolution: payload.resolution, resolvedBy: req.account.id, ...(payload.status === 'resolved' || payload.status === 'rejected' ? { resolvedAt: new Date() } : {}) } }, { new: true });
    if (!ticket) fail(409, 'Yêu cầu đã được xử lý hoặc không còn tồn tại.');
    res.json({ complaint: ticket });
  }));

  const saveSubmission = run(async (req, res) => {
    requireRole(req, 'student');
    const payload = submitSchema.parse(req.body), challenge = catalogItem(payload.challengeId);
    const paid = hasPaidAccess(req.account);
    if ((challenge.access === 'premium' || payload.mode === 'human') && !paid) fail(403, 'Cần gói trả phí còn hạn để dùng lựa chọn này.');
    const existing = req.params.id ? await ReviewSubmission.findOne({ id: req.params.id, userId: req.account.id }).lean() : await ReviewSubmission.findOne({ userId: req.account.id, challengeId: payload.challengeId }).lean();
    if (req.params.id && !existing) fail(404, 'Không tìm thấy bài của bạn.');
    const upgradingAi = existing?.mode === 'ai' && existing.status === 'completed' && payload.mode === 'human';
    if (existing && !upgradingAi && !['draft', 'needs_revision', 'cancelled'].includes(existing.status)) fail(409, 'Bài đã gửi; không thể sửa hoặc gửi trùng.');
    if (existing && existing.challengeId !== payload.challengeId) fail(409, 'Không thể đổi thử thách của bài đã tạo.');
    if (existing?.status === 'needs_revision' && (payload.mode !== existing.mode || payload.mentorId !== existing.mentorId)) fail(409, 'Bài bổ sung cần gửi lại đúng mentor đang review.');
    if (payload.status !== 'draft') {
      if (payload.notes.length < 40 || payload.skills.length < 2) fail(422, 'Mô tả ít nhất 40 ký tự và khai báo ít nhất hai kỹ năng.');
      if (payload.format !== 'chat' && !payload.links.length) fail(422, 'Cần ít nhất một link sản phẩm hoặc CV.');
      if (payload.links.length && !payload.linksAccessible) fail(422, 'Xác nhận mentor có quyền xem các link minh chứng.');
      if (payload.format === 'chat' && payload.mode !== 'human') fail(422, 'Trao đổi trực tiếp cần chọn mentor thật.');
    }
    let mentor;
    if (payload.mode === 'human' && payload.status !== 'draft') {
      const continuing = existing?.status === 'needs_revision';
      mentor = (await loadMentors()).find(item => item.id === payload.mentorId && (continuing ? item.canContinue : item.eligible && item.challengeIds.includes(challenge.id)));
      if (!mentor) fail(409, 'Mentor không còn nhận thử thách này. Vui lòng chọn người khác.');
      if (!continuing && mentor.overloaded && !payload.acceptDelay) fail(409, 'Mentor đang quá tải. Hãy chọn mentor khác hoặc xác nhận chấp nhận chờ lâu hơn.');
    }
    const status = payload.status === 'draft' ? 'draft' : payload.mode === 'ai' ? 'completed' : 'queued';
    const data = { ...payload, status, userId: req.account.id, studentName: req.account.name,
      mentorId: payload.mode === 'human' ? payload.mentorId || '' : '',
      paidAtSubmission: paid, estimatedDays: mentor?.estimatedDays || 0,
      queuedAt: status === 'queued' ? new Date() : undefined,
      ai: status === 'completed' ? readinessCheck(payload) : undefined,
      revision: (existing?.revision || 0) + 1 };
    let submission;
    if (existing) {
      submission = await ReviewSubmission.findOneAndUpdate({ id: existing.id, userId: req.account.id, status: existing.status, revision: existing.revision }, { $set: data }, { new: true, runValidators: true });
      if (!submission) fail(409, 'Bài vừa được cập nhật. Hãy tải lại.');
    } else submission = await ReviewSubmission.create({ ...data, id: `review-${randomUUID()}`, messages: [] });
    res.status(existing ? 200 : 201).json({ submission });
  });
  router.post('/submissions', saveSubmission);
  router.put('/submissions/:id', saveSubmission);
  router.post('/submissions/:id/ai-advice', run(async (req, res) => {
    requireRole(req, 'student');
    z.object({ consent: z.literal(true) }).parse(req.body);
    if (!aiConfigured()) fail(503, 'Dịch vụ AI chưa được cấu hình. Kiểm tra sơ bộ vẫn sử dụng được.');
    const item = await ReviewSubmission.findOneAndUpdate({ id: req.params.id, userId: req.account.id, mode: 'ai', status: 'completed', 'ai.modelFeedback': { $exists: false },
      $or: [{ 'ai.processingAt': { $exists: false } }, { 'ai.processingAt': { $lt: new Date(Date.now() - 60000) } }] },
      { $set: { 'ai.processingAt': new Date(), 'ai.consentAt': new Date() } }, { new: true });
    if (!item) fail(409, 'Bài đã có gợi ý AI hoặc đang xử lý. Hãy tải lại sau.');
    try {
      const modelFeedback = await generateAiAdvice(catalogItem(item.challengeId), item);
      const submission = await ReviewSubmission.findOneAndUpdate({ id: item.id }, { $set: { 'ai.modelFeedback': modelFeedback }, $unset: { 'ai.processingAt': 1 } }, { new: true });
      res.json({ submission });
    } catch {
      await ReviewSubmission.updateOne({ id: item.id }, { $unset: { 'ai.processingAt': 1 } });
      fail(502, 'Chưa lấy được gợi ý AI. Bài đã lưu, bạn có thể thử lại sau.');
    }
  }));
  router.patch('/submissions/:id/cancel', run(async (req, res) => {
    requireRole(req, 'student');
    const submission = await ReviewSubmission.findOneAndUpdate({ id: req.params.id, userId: req.account.id, status: { $in: ['draft', 'queued', 'needs_revision'] } }, { $set: { status: 'cancelled' } }, { new: true });
    if (!submission) fail(409, 'Chỉ hủy được bản nháp hoặc bài chưa bắt đầu review.');
    res.json({ submission });
  }));
  router.patch('/submissions/:id/consent', run(async (req, res) => {
    requireRole(req, 'student');
    const { shareTalent } = z.object({ shareTalent: z.boolean() }).parse(req.body);
    const submission = await ReviewSubmission.findOneAndUpdate({ id: req.params.id, userId: req.account.id }, { $set: { shareTalent } }, { new: true });
    if (!submission) fail(404, 'Không tìm thấy bài của bạn.');
    res.json({ submission });
  }));
  router.post('/submissions/:id/start', run(async (req, res) => {
    requireRole(req, 'mentor');
    const submission = await ReviewSubmission.findOneAndUpdate({ id: req.params.id, mentorId: req.account.id, mode: 'human', status: 'queued' }, { $set: { status: 'in_review' } }, { new: true });
    if (!submission) fail(409, 'Bài không còn trong hàng chờ của bạn.');
    res.json({ submission });
  }));
  router.post('/submissions/:id/review', run(async (req, res) => {
    requireRole(req, 'mentor');
    const payload = z.object({ decision: z.enum(['complete', 'revise']), scores: z.record(z.string(), z.number().min(0).max(10)).optional(), strengths: z.string().trim().max(3000).default(''), improvements: z.string().trim().max(3000).default(''), comment: z.string().trim().min(20, 'Nhận xét cần ít nhất 20 ký tự.').max(3000) }).parse(req.body);
    const item = await ReviewSubmission.findOne({ id: req.params.id, mentorId: req.account.id, mode: 'human', status: 'in_review' }).lean();
    if (!item) fail(409, 'Bạn cần bắt đầu review bài được phân công trước.');
    const complete = payload.decision === 'complete';
    if (complete && (!payload.strengths || !payload.improvements)) fail(422, 'Ghi rõ điểm mạnh và hướng cải thiện.');
    let score = null;
    try { if (complete) score = scoreReview(catalogItem(item.challengeId), payload.scores); } catch (error) { fail(422, error.message); }
    const submission = await ReviewSubmission.findOneAndUpdate({ id: item.id, status: 'in_review', mentorId: req.account.id }, {
      $set: { status: complete ? 'completed' : 'needs_revision', reviewedAt: new Date(),
        review: { ...payload, score, mentorName: req.account.name },
        ...(complete ? { reward: { base: REVIEW_FEE, bonus: 0, paid: false } } : {}) }
    }, { new: true });
    if (!submission) fail(409, 'Review đã được xử lý. Không ghi nhận tiền công lần nữa.');
    res.json({ submission });
  }));
  router.post('/submissions/:id/rating', run(async (req, res) => {
    requireRole(req, 'student');
    const rating = z.object({ stars: z.number().int().min(1).max(5), comment: z.string().trim().max(1000).default('') }).parse(req.body);
    // Set-once vote; same atomic update also credits bonus. Settlement closes the voting window.
    const submission = await ReviewSubmission.findOneAndUpdate({ id: req.params.id, userId: req.account.id, mode: 'human', status: 'completed', paidAtSubmission: true, rating: { $exists: false }, 'reward.paid': false }, {
      $set: { rating: { ...rating, at: new Date() }, 'reward.bonus': ratingBonus(rating.stars) }
    }, { new: true });
    if (!submission) fail(409, 'Chỉ đánh giá một lần cho review trả phí đã hoàn tất, trước khi quyết toán (7 ngày).');
    res.json({ submission });
  }));
  router.post('/submissions/:id/messages', run(async (req, res) => {
    const { text } = z.object({ text: z.string().trim().min(1).max(2000) }).parse(req.body);
    const role = req.session.user.role;
    if (!['student', 'mentor'].includes(role)) fail(403, 'Chỉ sinh viên và mentor được phân công có thể trao đổi.');
    const ownership = role === 'student' ? { userId: req.account.id } : { mentorId: req.account.id };
    const submission = await ReviewSubmission.findOneAndUpdate({ id: req.params.id, ...ownership, mode: 'human', status: { $in: ['queued', 'in_review', 'needs_revision'] }, 'messages.99': { $exists: false } }, {
      $push: { messages: { id: randomUUID(), senderId: req.account.id, senderName: req.account.name, text, at: new Date() } }
    }, { new: true });
    if (!submission) fail(409, 'Không thể gửi: bài đã đóng, chưa gửi, không thuộc bạn hoặc đã đủ 100 tin nhắn.');
    res.json({ submission });
  }));
  router.put('/mentor/profile', run(async (req, res) => {
    requireRole(req, 'mentor');
    const payload = z.object({ challengeIds: z.array(z.enum(CHALLENGES.map(item => item.id))).max(CHALLENGES.length), capacity: z.number().int().min(1).max(20), available: z.boolean() }).parse(req.body);
    payload.challengeIds = [...new Set(payload.challengeIds)];
    const profile = await ReviewerProfile.findOneAndUpdate({ mentorId: req.account.id }, { $set: payload, $setOnInsert: { mentorId: req.account.id } }, { new: true, upsert: true, runValidators: true });
    res.json({ profile });
  }));
  router.post('/mentor/application', run(async (req, res) => {
    requireRole(req, 'mentor');
    const payload = z.object({ method: z.enum(['cv', 'chat']), profileUrl: z.string().trim().max(500).default(''), notes: z.string().trim().min(40).max(3000) }).parse(req.body);
    if (payload.method === 'cv') url.parse(payload.profileUrl);
    const profile = await ReviewerProfile.findOneAndUpdate({ mentorId: req.account.id, 'application.status': { $nin: ['approved', 'suspended'] } }, { $set: { application: { ...payload, status: 'pending', submittedAt: new Date(), reason: '' } }, $setOnInsert: { mentorId: req.account.id, challengeIds: [], capacity: 5, available: true } }, { new: true, upsert: true, runValidators: true });
    res.json({ profile });
  }));
  router.patch('/admin/mentors/:id', run(async (req, res) => {
    requireRole(req, 'admin');
    const payload = z.object({ status: z.enum(['approved', 'rejected', 'suspended']), reason: z.string().trim().min(10).max(2000) }).parse(req.body);
    const current = await ReviewerProfile.findOne({ mentorId: req.params.id, 'application.submittedAt': { $exists: true } }).lean();
    if (!current) fail(404, 'Mentor chưa gửi hồ sơ đăng ký review.');
    const restoring = payload.status === 'approved' && current.application?.status === 'suspended';
    if (payload.status !== 'suspended' && current.application?.status !== 'pending' && !restoring) fail(409, 'Hồ sơ đã được xử lý. Chỉ hồ sơ mới được quyết định; mentor tạm ngưng có thể được tái duyệt.');
    if (payload.status === 'suspended' && current.application?.status !== 'approved') fail(409, 'Chỉ mentor đã duyệt mới có thể tạm ngưng.');
    const suspendedAgain = payload.status === 'suspended';
    const profile = await ReviewerProfile.findOneAndUpdate({ mentorId: req.params.id, 'application.submittedAt': { $exists: true } }, { $set: { 'application.status': payload.status, 'application.reason': payload.reason, 'application.reviewedAt': new Date(), ...(restoring ? { qualityOverride: true } : {}), ...(suspendedAgain ? { qualityOverride: false } : {}) } }, { new: true });
    await MentorAccount.updateOne({ id: req.params.id }, { $set: { status: payload.status === 'suspended' ? 'suspended' : 'active', statusReason: payload.reason } });
    res.json({ profile });
  }));
  router.post('/admin/payouts/:id', run(async (req, res) => {
    requireRole(req, 'admin');
    const { reference } = z.object({ reference: z.string().trim().min(5).max(160) }).parse(req.body);
    // Seven days allow a student to vote before unrated jobs settle.
    const submission = await ReviewSubmission.findOneAndUpdate({ id: req.params.id, status: 'completed', mode: 'human', 'reward.paid': false,
      $or: [{ rating: { $exists: true } }, { reviewedAt: { $lte: new Date(Date.now() - 7 * 86400000) } }] }, {
      $set: { 'reward.paid': true, 'reward.paymentRef': reference, 'reward.paidAt': new Date(), 'reward.paidBy': req.account.id }
    }, { new: true });
    if (!submission) fail(409, 'Khoản đã thanh toán hoặc chưa đủ điều kiện quyết toán (có đánh giá hoặc đủ 7 ngày).');
    res.json({ submission });
  }));
  router.post('/payments/request-code', run(async (req, res) => {
    requireRole(req, 'student');
    const { planId } = z.object({ planId: z.string().max(100) }).parse(req.body);
    const plan = await PremiumPlan.findOne({ id: planId, status: 'active' }).lean();
    if (!plan || plan.price <= 0) fail(404, 'Gói không khả dụng.');
    if (!paymentOtpEnabled()) return res.json({ verificationRequired: false });
    if (req.account.emailVerified !== true) fail(403, 'Hãy xác thực email tài khoản trước khi thanh toán.');
    const previous = req.session.paymentOtp;
    if (previous && Date.now() - previous.sentAt < 60_000) fail(429, 'Hãy chờ 1 phút trước khi gửi mã thanh toán mới.');
    if (!process.env.RESEND_API_KEY && sendPaymentEmail === deliverVerificationEmail) fail(503, 'Máy chủ chưa cấu hình gửi email xác nhận thanh toán.');
    const code = String(randomInt(0, 1_000_000)).padStart(6, '0');
    try { await sendPaymentEmail(req.account.email, code, req.account.name, 'payment'); }
    catch { fail(503, 'Chưa gửi được mã thanh toán tới email. Hãy thử lại sau.'); }
    req.session.paymentOtp = { planId, hash: paymentOtpHash(req.sessionID, planId, code), expiresAt: Date.now() + 10 * 60_000, sentAt: Date.now(), attempts: 0 };
    res.json({ verificationRequired: true, email: req.account.email, message: 'Mã thanh toán có hiệu lực trong 10 phút.' });
  }));
  router.post('/orders', run(async (req, res) => {
    requireRole(req, 'student');
    const { planId, transactionCode = '', paymentCode } = z.object({ planId: z.string().max(100), transactionCode: z.string().trim().max(160).optional(), paymentCode: z.string().regex(/^\d{6}$/).optional() }).parse(req.body);
    if (paymentOtpEnabled()) {
      if (req.account.emailVerified !== true) fail(403, 'Hãy xác thực email trước khi thanh toán gói Premium.');
      const otp = req.session.paymentOtp;
      if (!otp || otp.planId !== planId || otp.expiresAt < Date.now()) fail(403, 'Mã thanh toán không có hoặc đã hết hạn. Hãy yêu cầu mã mới.');
      if (otp.attempts >= 5) fail(429, 'Mã thanh toán bị khóa sau 5 lần nhập sai. Hãy yêu cầu mã mới.');
      const actual = paymentOtpHash(req.sessionID, planId, paymentCode || '');
      if (!timingSafeEqual(Buffer.from(actual), Buffer.from(otp.hash))) {
        otp.attempts += 1;
        fail(403, 'Mã thanh toán không đúng.');
      }
    }
    const plan = await PremiumPlan.findOne({ id: planId, status: 'active' }).lean();
    if (!plan || plan.price <= 0) fail(404, 'Gói không khả dụng.');
    const existing = await SubscriptionOrder.findOne({ userId: req.account.id, status: 'pending' }).lean();
    if (existing) {
      req.session.paymentOtp = null;
      return res.json({ order: existing, success: true, ...(existing.checkoutUrl ? { payment: { checkoutUrl: existing.checkoutUrl, qrCode: existing.qrCode, provider: 'payOS' } } : {}) });
    }
    const orderId = `ORD-${randomUUID()}`;
    if (payosConfigured()) {
      // PayOS orderCode is a 32-bit integer. Millisecond modulo keeps it numeric and
      // a database collision check protects the provider's unique order reference.
      let providerOrderCode = Date.now() % 2_000_000_000;
      while (await SubscriptionOrder.findOne({ providerOrderCode }).lean()) providerOrderCode = (providerOrderCode + 1) % 2_000_000_000;
      const description = `JR${String(providerOrderCode).slice(-20)}`;
      const link = await createPayosLink({ orderCode: providerOrderCode, amount: plan.price, description, buyerName: req.account.name, buyerEmail: req.account.email });
      const order = await SubscriptionOrder.create({ orderId, providerOrderCode, userId: req.account.id, planId: plan.id, planName: plan.name, price: plan.price, transactionCode: description, paymentMethod: 'PayOS · VietQR', providerPaymentLinkId: link.paymentLinkId, checkoutUrl: link.checkoutUrl, qrCode: link.qrCode, status: 'pending', activatedAt: null });
      req.session.paymentOtp = null;
      return res.status(201).json({ order, success: true, payment: { checkoutUrl: link.checkoutUrl, qrCode: link.qrCode, provider: 'payOS' } });
    }
    if (process.env.NODE_ENV === 'production' && !(process.env.PAYMENT_BANK && process.env.PAYMENT_ACCOUNT && process.env.PAYMENT_ACCOUNT_NAME)) fail(503, 'Thanh toán chưa cấu hình. Quản trị viên cần cài PayOS hoặc thông tin ngân hàng nhận tiền trên máy chủ.');
    if (transactionCode.length < 5) fail(503, 'Thanh toán tự động chưa cấu hình. Quản trị viên cần cài PayOS; chuyển khoản thủ công cần mã nội dung giao dịch.');
    const order = await SubscriptionOrder.create({ orderId, userId: req.account.id, planId: plan.id, planName: plan.name, price: plan.price, transactionCode, paymentMethod: 'VietQR — đối soát thủ công', status: 'pending', activatedAt: null });
    req.session.paymentOtp = null;
    res.status(201).json({ order, success: true });
  }));
  router.patch('/admin/orders/:id', run(async (req, res) => {
    requireRole(req, 'admin');
    const { status, reference } = z.object({ status: z.enum(['completed', 'cancelled']), reference: z.string().trim().min(5).max(160) }).parse(req.body);
    const initial = await SubscriptionOrder.findOne({ orderId: req.params.id }).lean();
    if (!initial) fail(404, 'Không tìm thấy đơn.');
    await serializeUserOrder(initial.userId, async () => {
      const existing = await SubscriptionOrder.findOne({ orderId: req.params.id }).lean();
      if (!existing) fail(404, 'Không tìm thấy đơn.');
      if (existing.status !== 'pending' && existing.status !== status) fail(409, 'Đơn đã được xử lý.');
      const order = status === 'completed' ? await activateOrder(existing, reference, req.account.id) : await SubscriptionOrder.findOneAndUpdate(
        { orderId: existing.orderId, status: 'pending' },
        { $set: { status, verifiedBy: req.account.id, paymentReference: reference }, $push: { statusHistory: { status, changedAt: new Date(), note: reference } } },
        { new: true }
      );
      if (!order) fail(409, 'Đơn vừa được xử lý. Hãy tải lại.');
      res.json({ order });
    });
  }));
  router.use((error, _req, res, _next) => {
    if (error instanceof z.ZodError) return res.status(422).json({ message: error.issues[0].message, fieldErrors: Object.fromEntries(error.issues.map(item => [item.path[0], item.message])) });
    if (error.code === 11000) return res.status(409).json({ message: 'Dữ liệu đã tồn tại hoặc không thể đổi trạng thái. Hãy tải lại.' });
    if (error.status) return res.status(error.status).json({ message: error.message });
    console.error('Workflow error:', error.message);
    res.status(500).json({ message: 'Không thể xử lý yêu cầu. Vui lòng thử lại.' });
  });
  return router;
}
