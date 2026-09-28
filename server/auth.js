import { Router } from 'express';
import { createHash, randomUUID, randomInt, timingSafeEqual } from 'node:crypto';
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import { MENTOR_AGREEMENT_VERSION } from '../shared/mentorAgreement.js';

const email = z.string().trim().toLowerCase().email('Email không hợp lệ.').max(254);
const password = z.string().min(8, 'Mật khẩu cần ít nhất 8 ký tự.').max(72, 'Mật khẩu quá dài.')
  .regex(/\p{L}/u, 'Mật khẩu cần có chữ cái.').regex(/[0-9]/, 'Mật khẩu cần có chữ số.')
  .refine(value => Buffer.byteLength(value, 'utf8') <= 72, 'Mật khẩu tối đa 72 byte UTF-8.');
export const registrationSchema = z.object({
  role: z.enum(['student', 'mentor']),
  name: z.string().trim().min(2, 'Nhập họ và tên.').max(100),
  email, password,
  confirmPassword: z.string(),
  acceptedTerms: z.literal(true, { error: 'Vui lòng đồng ý với điều khoản và chính sách bảo mật.' }),
  acceptedMentorAgreement: z.boolean().optional(),
  selectedMajorKey: z.enum(['dev', 'mkt', 'design']),
  school: z.string().trim().max(160).optional(),
  title: z.string().trim().max(120).optional(),
  company: z.string().trim().max(160).optional(),
  expertise: z.array(z.string().trim().min(1).max(80)).max(15).optional(),
  yearsExperience: z.number().int().min(0).max(60).optional(),
  profileUrl: z.string().trim().max(500).optional(),
  bio: z.string().trim().max(2000).optional()
}).superRefine((value, ctx) => {
  const issue = (field, message) => ctx.addIssue({ code: 'custom', path: [field], message });
  if (value.password !== value.confirmPassword) issue('confirmPassword', 'Mật khẩu nhập lại chưa khớp.');
  if (value.role === 'student' && !value.school) issue('school', 'Nhập trường đang theo học.');
  if (value.role === 'mentor') {
    if (value.acceptedMentorAgreement !== true) issue('acceptedMentorAgreement', 'Vui lòng chấp thuận thỏa thuận cộng tác Mentor.');
    for (const field of ['title', 'company']) if (!value[field]) issue(field, 'Vui lòng điền thông tin này.');
    if (!value.expertise?.length) issue('expertise', 'Nhập ít nhất một chuyên môn.');
    if (value.yearsExperience === undefined) issue('yearsExperience', 'Nhập số năm kinh nghiệm.');
    try {
      const url = new URL(value.profileUrl);
      if (!['https:', 'http:'].includes(url.protocol)) throw new Error();
    } catch { issue('profileUrl', 'Nhập link LinkedIn hoặc portfolio hợp lệ (https://...).'); }
  }
});

export const sanitizeAccount = (doc) => {
  const { _id, __v, password: ignored, passwordHash, verificationCodeHash, resetCodeHash, resetExpiresAt, resetAttempts, resetSentAt, ...user } = doc.toObject ? doc.toObject() : doc;
  return user;
};
const canSignIn = (account, requireVerifiedEmail = false) => (!requireVerifiedEmail || account.emailVerified === true) && !['pending', 'suspended', 'rejected', 'disqualified', 'unverified'].includes(account.status);
const regenerate = req => new Promise((resolve, reject) => req.session.regenerate(err => err ? reject(err) : resolve()));
const saveSession = req => new Promise((resolve, reject) => req.session.save(err => err ? reject(err) : resolve()));

// Models are injected so the same HTTP routes can be tested without a live database.
export function createAuthRouter({ UserProfile, MentorAccount, AdminAccount, sendVerificationEmail = deliverVerificationEmail, verificationRequired = process.env.EMAIL_VERIFICATION_REQUIRED === '1' || (process.env.NODE_ENV === 'production' && process.env.EMAIL_VERIFICATION_REQUIRED !== '0') }) {
  const router = Router();
  const failedLoginAttempts = new Map();
  const resetRequests = new Map();
  const loginWindowMs = 15 * 60 * 1000;
  const loginLimit = 10;
  const loginKey = req => createHash('sha256')
    .update(`${req.ip || req.socket?.remoteAddress || 'unknown'}:${String(req.body?.email || '').trim().toLowerCase()}`)
    .digest('hex');
  const registerLoginFailure = key => {
    const now = Date.now();
    let attempt = failedLoginAttempts.get(key);
    if (!attempt || attempt.expiresAt <= now) attempt = { count: 0, expiresAt: now + loginWindowMs };
    attempt.count += 1;
    failedLoginAttempts.set(key, attempt);
    if (failedLoginAttempts.size > 10000) {
      for (const [entryKey, entry] of failedLoginAttempts) if (entry.expiresAt <= now) failedLoginAttempts.delete(entryKey);
      while (failedLoginAttempts.size > 10000) failedLoginAttempts.delete(failedLoginAttempts.keys().next().value);
    }
    return attempt;
  };
  const findAccount = async address => {
    for (const [type, model] of [['admin', AdminAccount], ['mentor', MentorAccount], ['student', UserProfile]]) {
      const account = await model.findOne({ email: address });
      if (account) return { type, account, model };
    }
    return null;
  };
  const otpHash = (emailAddress, code) => createHash('sha256').update(`${emailAddress}:${code}:${process.env.OTP_SECRET || process.env.SESSION_SECRET || 'local-otp-pepper'}`).digest('hex');
  const issueVerification = async (model, account) => {
    const code = String(randomInt(0, 1_000_000)).padStart(6, '0');
    await model.updateOne({ id: account.id }, { $set: { emailVerified: false, verificationCodeHash: otpHash(account.email, code), verificationExpiresAt: new Date(Date.now() + 10 * 60_000), verificationAttempts: 0, verificationSentAt: new Date() } });
    try { await sendVerificationEmail(account.email, code, account.name); }
    catch {
      await model.updateOne({ id: account.id }, { $unset: { verificationCodeHash: 1, verificationExpiresAt: 1, verificationAttempts: 1, verificationSentAt: 1 } });
      throw Object.assign(new Error('Chưa gửi được email xác thực. Hãy thử lại sau hoặc liên hệ quản trị viên.'), { status: 503 });
    }
  };
  const authenticate = async (req, found, rememberMe = false) => {
    await regenerate(req);
    req.session.cookie.maxAge = 1000 * 60 * 60 * (rememberMe ? 24 * 14 : 8);
    req.session.user = { id: found.account.id, email: found.account.email, role: found.type };
    await saveSession(req);
    return { type: found.type, user: sanitizeAccount(found.account) };
  };
  // Serializes registration across the role collections within this server process.
  let registrationQueue = Promise.resolve();
  router.post('/register', async (req, res, next) => {
    try {
      const payload = registrationSchema.parse(req.body);
      if (verificationRequired && !process.env.RESEND_API_KEY && sendVerificationEmail === deliverVerificationEmail) return res.status(503).json({ message: 'Máy chủ chưa cấu hình dịch vụ gửi email (RESEND_API_KEY, EMAIL_FROM). Hãy cấu hình trước khi mở đăng ký.' });
      const result = registrationQueue.then(async () => {
        if (await findAccount(payload.email)) return null;
        const agreementAcceptedAt = new Date();
        const common = {
          id: `${payload.role}-${randomUUID()}`, name: payload.name, email: payload.email,
          passwordHash: await bcrypt.hash(payload.password, 12), status: verificationRequired ? 'unverified' : 'active', emailVerified: !verificationRequired,
          majorKey: payload.selectedMajorKey, selectedMajorKey: payload.selectedMajorKey,
          termsAcceptedAt: new Date(), termsVersion: '2026-09-26',
          privacyAcceptedAt: new Date(), privacyVersion: '2026-09-26', bio: payload.bio || ''
        };
        const account = payload.role === 'mentor'
          ? await MentorAccount.create({ ...common, role: 'mentor', title: payload.title,
            company: payload.company, currentCompany: payload.company, jobTitle: payload.title,
            expertise: payload.expertise, strongestField: payload.expertise[0],
            yearsExperience: payload.yearsExperience, profileUrl: payload.profileUrl,
            badge: 'Mentor mới', ratingAvg: 0, rating: 0, ratingCount: 0, totalReviews: 0,
            mentorAgreementVersion: MENTOR_AGREEMENT_VERSION, mentorAgreementAcceptedAt: agreementAcceptedAt,
            mentorAgreementHistory: [{ version: MENTOR_AGREEMENT_VERSION, acceptedAt: agreementAcceptedAt }] })
          : await UserProfile.create({ ...common, role: 'student', school: payload.school,
            careerGoal: '', path: [], joinedChallengeIds: [],
            stats: { completedChallenges: 0, mentorRating: 0, portfolioProjects: 0, verifiedSkills: 0 },
            portfolio: { headline: '', bio: '', publishedProjects: [], links: [] },
            subscription: { planId: 'free', planName: 'Free', status: 'free' }, badges: [] });
        return { type: payload.role, account };
      });
      registrationQueue = result.catch(() => {});
      const found = await result;
      if (!found) return res.status(409).json({ message: 'Email đã được sử dụng. Vui lòng đăng nhập hoặc dùng email khác.', fieldErrors: { email: 'Email đã được sử dụng.' } });
      if (verificationRequired) {
        const model = found.type === 'student' ? UserProfile : MentorAccount;
        try { await issueVerification(model, found.account); }
        catch (error) { await model.deleteOne?.({ id: found.account.id }); throw error; }
        return res.status(202).json({ verificationRequired: true, email: found.account.email, message: 'Mã xác thực 6 số đã được gửi tới email của bạn. Mã có hiệu lực trong 10 phút.' });
      }
      res.status(201).json(await authenticate(req, found));
    } catch (error) { next(error); }
  });
  router.post('/verify-email', async (req, res, next) => {
    try {
      const payload = z.object({ email, code: z.string().regex(/^\d{6}$/, 'Nhập mã xác thực 6 chữ số.'), rememberMe: z.boolean().optional() }).parse(req.body);
      const found = await findAccount(payload.email);
      if (!found || found.account.emailVerified === true) return res.status(400).json({ message: 'Mã xác thực không hợp lệ hoặc đã hết hạn.' });
      const account = found.account;
      if (['suspended', 'rejected', 'disqualified', 'pending'].includes(account.status)) return res.status(403).json({ message: 'Tài khoản chưa được phép đăng nhập. Vui lòng liên hệ quản trị viên.' });
      if (!account.verificationExpiresAt || new Date(account.verificationExpiresAt).getTime() < Date.now()) return res.status(410).json({ message: 'Mã đã hết hạn. Hãy gửi mã mới.' });
      if ((account.verificationAttempts || 0) >= 5) return res.status(429).json({ message: 'Mã bảo mật bị khóa sau 5 lần nhập sai. Hãy gửi mã mới.' });
      const expected = Buffer.from(account.verificationCodeHash || '');
      const actual = Buffer.from(otpHash(account.email, payload.code));
      if (expected.length !== actual.length || !timingSafeEqual(expected, actual)) {
        await found.model.updateOne({ id: account.id }, { $inc: { verificationAttempts: 1 } });
        return res.status(400).json({ message: 'Mã xác thực không đúng.' });
      }
      await found.model.updateOne({ id: account.id }, { $set: { emailVerified: true, ...(account.status === 'unverified' ? { status: 'active' } : {}), emailVerifiedAt: new Date() }, $unset: { verificationCodeHash: 1, verificationExpiresAt: 1, verificationAttempts: 1, verificationSentAt: 1 } });
      const refreshed = await findAccount(account.email);
      res.json(await authenticate(req, refreshed, payload.rememberMe));
    } catch (error) { next(error); }
  });
  router.post('/resend-verification', async (req, res, next) => {
    try {
      const { email: address } = z.object({ email }).parse(req.body);
      const found = await findAccount(address);
      if (found && found.type !== 'admin' && found.account.emailVerified !== true) {
        const lastSent = new Date(found.account.verificationSentAt || 0).getTime();
        if (Date.now() - lastSent < 60_000) return res.status(429).json({ message: 'Hãy chờ 1 phút trước khi gửi mã mới.' });
        await issueVerification(found.model, found.account);
      }
      res.json({ message: 'Nếu email có tài khoản chưa xác thực, mã mới đã được gửi.' });
    } catch (error) { next(error); }
  });
  router.post('/login', async (req, res, next) => {
    try {
      const payload = z.object({ email, password: z.string().min(1, 'Nhập mật khẩu.').max(200), rememberMe: z.boolean().optional() }).parse(req.body);
      const attemptKey = loginKey(req);
      const found = await findAccount(payload.email);
      if (!found || !(await bcrypt.compare(payload.password, found.account.passwordHash || ''))) {
        const attempt = registerLoginFailure(attemptKey);
        if (attempt.count > loginLimit) {
          res.set('Retry-After', String(Math.ceil((attempt.expiresAt - Date.now()) / 1000)));
          return res.status(429).json({ message: 'Bạn đã thử đăng nhập quá nhiều lần. Hãy chờ 15 phút rồi thử lại.' });
        }
        return res.status(401).json({ message: 'Email hoặc mật khẩu không đúng.' });
      }
      if (found.type !== 'admin' && verificationRequired && found.account.emailVerified !== true) {
        if (!process.env.RESEND_API_KEY && sendVerificationEmail === deliverVerificationEmail) return res.status(503).json({ message: 'Máy chủ chưa cấu hình dịch vụ gửi email xác thực.' });
        const lastSent = new Date(found.account.verificationSentAt || 0).getTime();
        if (Date.now() - lastSent >= 60_000) await issueVerification(found.model, found.account);
        return res.status(403).json({ verificationRequired: true, email: found.account.email, message: 'Hãy xác thực email để đăng nhập. Mã 6 số đã được gửi tới hộp thư của bạn.' });
      }
      if (!canSignIn(found.account, verificationRequired && found.type !== 'admin')) return res.status(403).json({ message: 'Tài khoản chưa được phép đăng nhập. Vui lòng liên hệ quản trị viên.' });
      failedLoginAttempts.delete(attemptKey);
      res.json(await authenticate(req, found, payload.rememberMe));
    } catch (error) { next(error); }
  });
  router.get('/me', async (req, res, next) => {
    try {
      if (!req.session.user) return res.status(401).json({ message: 'Chưa đăng nhập.' });
      const found = await findAccount(req.session.user.email);
      if (!found || found.account.id !== req.session.user.id || !canSignIn(found.account, verificationRequired && found.type !== 'admin')) {
        req.session.destroy(() => {});
        res.clearCookie('portfolio.sid');
        return res.status(401).json({ message: 'Phiên đăng nhập không còn hợp lệ.' });
      }
      res.json({ type: found.type, user: sanitizeAccount(found.account) });
    } catch (error) { next(error); }
  });
  router.post('/logout', (req, res, next) => req.session.destroy(error => {
    if (error) return next(error);
    res.clearCookie('portfolio.sid');
    res.json({ ok: true });
  }));
  router.post('/change-password', async (req, res, next) => {
    try {
      if (!req.session.user) return res.status(401).json({ message: 'Chưa đăng nhập.' });
      const payload = z.object({ currentPassword: z.string().min(1), newPassword: password }).parse(req.body);
      const found = await findAccount(req.session.user.email);
      if (!found || !canSignIn(found.account, verificationRequired && found.type !== 'admin') || !(await bcrypt.compare(payload.currentPassword, found.account.passwordHash || ''))) {
        return res.status(400).json({ message: 'Mật khẩu hiện tại không đúng hoặc tài khoản không khả dụng.' });
      }
      await found.model.updateOne({ id: found.account.id }, { passwordHash: await bcrypt.hash(payload.newPassword, 12) });
      await authenticate(req, found);
      res.json({ ok: true });
    } catch (error) { next(error); }
  });
  const resetMessage = 'Nếu email có tài khoản, mã đặt lại mật khẩu đã được gửi. Hãy kiểm tra cả thư rác.';
  router.post('/forgot-password', async (req, res, next) => {
    try {
      const { email: address } = z.object({ email }).parse(req.body);
      if (!process.env.RESEND_API_KEY && sendVerificationEmail === deliverVerificationEmail) return res.status(503).json({ message: 'Dịch vụ email chưa khả dụng. Vui lòng thử lại sau.' });
      const key = loginKey(req);
      const now = Date.now();
      const window = resetRequests.get(key);
      if (window && window.expiresAt > now && window.count >= 5) return res.status(429).json({ message: 'Đã yêu cầu quá nhiều mã. Vui lòng thử lại sau 15 phút.' });
      resetRequests.set(key, { count: window?.expiresAt > now ? window.count + 1 : 1, expiresAt: window?.expiresAt > now ? window.expiresAt : now + loginWindowMs });
      if (resetRequests.size > 10000) {
        for (const [entryKey, entry] of resetRequests) if (entry.expiresAt <= now) resetRequests.delete(entryKey);
        while (resetRequests.size > 10000) resetRequests.delete(resetRequests.keys().next().value);
      }
      const found = await findAccount(address);
      if (found && found.account.status !== 'suspended' && now - new Date(found.account.resetSentAt || 0).getTime() >= 60_000) {
        const code = String(randomInt(0, 1_000_000)).padStart(6, '0');
        const hash = otpHash(address, `reset:${code}`);
        await found.model.updateOne({ id: found.account.id }, { $set: { resetCodeHash: hash, resetExpiresAt: new Date(now + 10 * 60_000), resetAttempts: 0, resetSentAt: new Date(now) } });
        try { await sendVerificationEmail(address, code, found.account.name, 'password-reset'); }
        catch {
          await found.model.updateOne({ id: found.account.id, resetCodeHash: hash }, { $unset: { resetCodeHash: 1, resetExpiresAt: 1, resetAttempts: 1, resetSentAt: 1 } });
          return res.status(503).json({ message: 'Chưa gửi được mã. Vui lòng thử lại sau.' });
        }
      }
      res.json({ message: resetMessage });
    } catch (error) { next(error); }
  });
  router.post('/reset-password', async (req, res, next) => {
    try {
      const payload = z.object({ email, code: z.string().regex(/^\d{6}$/, 'Nhập mã 6 chữ số.'), newPassword: password }).parse(req.body);
      const found = await findAccount(payload.email);
      const account = found?.account;
      const invalid = () => res.status(400).json({ message: 'Mã không hợp lệ hoặc đã hết hạn. Hãy yêu cầu mã mới.' });
      if (!account?.resetCodeHash || !account.resetExpiresAt || new Date(account.resetExpiresAt).getTime() <= Date.now() || account.status === 'suspended') return invalid();
      if ((account.resetAttempts || 0) >= 5) return res.status(429).json({ message: 'Mã đã bị khóa sau 5 lần nhập sai. Hãy yêu cầu mã mới.' });
      const expected = Buffer.from(account.resetCodeHash);
      const actual = Buffer.from(otpHash(payload.email, `reset:${payload.code}`));
      if (expected.length !== actual.length || !timingSafeEqual(expected, actual)) {
        await found.model.updateOne({ id: account.id, resetCodeHash: account.resetCodeHash }, { $inc: { resetAttempts: 1 } });
        return invalid();
      }
      const result = await found.model.updateOne({ id: account.id, resetCodeHash: account.resetCodeHash, resetAttempts: { $lt: 5 }, resetExpiresAt: { $gt: new Date() } }, {
        $set: { passwordHash: await bcrypt.hash(payload.newPassword, 12) },
        $unset: { resetCodeHash: 1, resetExpiresAt: 1, resetAttempts: 1, resetSentAt: 1 }
      });
      if (!result?.matchedCount) return invalid();
      res.json({ message: 'Đã đổi mật khẩu. Hãy đăng nhập bằng mật khẩu mới.' });
    } catch (error) { next(error); }
  });
  router.use((error, _req, res, next) => {
    if (error instanceof z.ZodError) {
      const fieldErrors = Object.fromEntries(error.issues.map(issue => [issue.path[0], issue.message]));
      return res.status(400).json({ message: 'Vui lòng kiểm tra thông tin đã nhập.', fieldErrors });
    }
    if (error.code === 11000) return res.status(409).json({ message: 'Email đã được sử dụng.', fieldErrors: { email: 'Email đã được sử dụng.' } });
    if (error.status) return res.status(error.status).json({ message: error.message });
    next(error);
  });
  return router;
}

export async function deliverVerificationEmail(address, code, name, purpose = 'account') {
  const from = process.env.EMAIL_FROM;
  if (!process.env.RESEND_API_KEY || !from) throw new Error('Email delivery is not configured');
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST', signal: AbortSignal.timeout(10_000),
    headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ from, to: [address], subject: purpose === 'payment' ? 'Mã xác nhận thanh toán Portfolio FPT Hub' : purpose === 'password-reset' ? 'Mã đặt lại mật khẩu Portfolio FPT Hub' : 'Mã xác thực tài khoản Portfolio FPT Hub', text: `Xin chào ${name}, mã ${purpose === 'payment' ? 'xác nhận thanh toán' : purpose === 'password-reset' ? 'đặt lại mật khẩu' : 'xác thực tài khoản'} của bạn là ${code}. Mã có hiệu lực trong 10 phút. Nếu bạn không thực hiện thao tác này, hãy bỏ qua email và kiểm tra tài khoản của mình.` })
  });
  if (!response.ok) throw new Error(`Email provider returned ${response.status}`);
}
