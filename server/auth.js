import { Router } from 'express';
import { randomUUID } from 'node:crypto';
import bcrypt from 'bcryptjs';
import { z } from 'zod';

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
  const { _id, __v, password: ignored, passwordHash, ...user } = doc.toObject ? doc.toObject() : doc;
  return user;
};
const canSignIn = account => !['pending', 'suspended', 'rejected', 'disqualified'].includes(account.status);
const regenerate = req => new Promise((resolve, reject) => req.session.regenerate(err => err ? reject(err) : resolve()));
const saveSession = req => new Promise((resolve, reject) => req.session.save(err => err ? reject(err) : resolve()));

// Models are injected so the same HTTP routes can be tested without a live database.
export function createAuthRouter({ UserProfile, MentorAccount, AdminAccount }) {
  const router = Router();
  const findAccount = async address => {
    for (const [type, model] of [['admin', AdminAccount], ['mentor', MentorAccount], ['student', UserProfile]]) {
      const account = await model.findOne({ email: address });
      if (account) return { type, account, model };
    }
    return null;
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
      const result = registrationQueue.then(async () => {
        if (await findAccount(payload.email)) return null;
        const common = {
          id: `${payload.role}-${randomUUID()}`, name: payload.name, email: payload.email,
          passwordHash: await bcrypt.hash(payload.password, 12), status: 'active',
          majorKey: payload.selectedMajorKey, selectedMajorKey: payload.selectedMajorKey,
          termsAcceptedAt: new Date(), termsVersion: '2026-09-26',
          privacyAcceptedAt: new Date(), privacyVersion: '2026-09-26', bio: payload.bio || ''
        };
        const account = payload.role === 'mentor'
          ? await MentorAccount.create({ ...common, role: 'mentor', title: payload.title,
            company: payload.company, currentCompany: payload.company, jobTitle: payload.title,
            expertise: payload.expertise, strongestField: payload.expertise[0],
            yearsExperience: payload.yearsExperience, profileUrl: payload.profileUrl,
            badge: 'Mentor mới', ratingAvg: 0, rating: 0, ratingCount: 0, totalReviews: 0 })
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
      res.status(201).json(await authenticate(req, found));
    } catch (error) { next(error); }
  });
  router.post('/login', async (req, res, next) => {
    try {
      const payload = z.object({ email, password: z.string().min(1, 'Nhập mật khẩu.').max(200), rememberMe: z.boolean().optional() }).parse(req.body);
      const found = await findAccount(payload.email);
      if (!found || !(await bcrypt.compare(payload.password, found.account.passwordHash || ''))) {
        return res.status(401).json({ message: 'Email hoặc mật khẩu không đúng.' });
      }
      if (!canSignIn(found.account)) return res.status(403).json({ message: 'Tài khoản chưa được phép đăng nhập. Vui lòng liên hệ quản trị viên.' });
      res.json(await authenticate(req, found, payload.rememberMe));
    } catch (error) { next(error); }
  });
  router.get('/me', async (req, res, next) => {
    try {
      if (!req.session.user) return res.status(401).json({ message: 'Chưa đăng nhập.' });
      const found = await findAccount(req.session.user.email);
      if (!found || found.account.id !== req.session.user.id || !canSignIn(found.account)) {
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
      if (!found || !canSignIn(found.account) || !(await bcrypt.compare(payload.currentPassword, found.account.passwordHash || ''))) {
        return res.status(400).json({ message: 'Mật khẩu hiện tại không đúng hoặc tài khoản không khả dụng.' });
      }
      await found.model.updateOne({ id: found.account.id }, { passwordHash: await bcrypt.hash(payload.newPassword, 12) });
      await authenticate(req, found);
      res.json({ ok: true });
    } catch (error) { next(error); }
  });
  router.post('/forgot-password', (_req, res) => res.status(501).json({ message: 'Chức năng đặt lại mật khẩu qua email chưa được hỗ trợ. Vui lòng liên hệ quản trị viên.' }));
  router.use((error, _req, res, next) => {
    if (error instanceof z.ZodError) {
      const fieldErrors = Object.fromEntries(error.issues.map(issue => [issue.path[0], issue.message]));
      return res.status(400).json({ message: 'Vui lòng kiểm tra thông tin đã nhập.', fieldErrors });
    }
    if (error.code === 11000) return res.status(409).json({ message: 'Email đã được sử dụng.', fieldErrors: { email: 'Email đã được sử dụng.' } });
    next(error);
  });
  return router;
}
