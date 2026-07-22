import 'dotenv/config';
import bcrypt from 'bcryptjs';
import cors from 'cors';
import express from 'express';
import session from 'express-session';
import { z } from 'zod';
import { connectDb } from './config/db.js';
import { AdminAccount, Category, Challenge, Major, MentorAccount, MentorFeedback, Notification, Resource, Submission, SubmissionRule, UserProfile } from './models.js';

const app = express();
const port = process.env.PORT || 4000;

app.use(cors({ origin: process.env.CLIENT_ORIGIN || 'http://127.0.0.1:5173', credentials: true }));
app.use(express.json());
app.use(session({
  name: 'portfolio.sid',
  secret: process.env.SESSION_SECRET || 'portfolio-demo-session-secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    sameSite: 'lax',
    maxAge: 1000 * 60 * 60 * 8
  }
}));

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
  rememberMe: z.boolean().optional()
});

const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
  selectedMajorKey: z.enum(['dev', 'mkt', 'design']).default('dev')
});

function cleanDoc(doc) {
  if (!doc) return doc;
  const { _id, __v, password, passwordHash, ...rest } = doc.toObject ? doc.toObject() : doc;
  return rest;
}

async function findAccount(email) {
  if (typeof email !== 'string' || !email.includes('@')) return null;
  const normalizedEmail = email.trim().toLowerCase();
  const [admin, mentor, student] = await Promise.all([
    AdminAccount.findOne({ email: normalizedEmail }).lean(),
    MentorAccount.findOne({ email: normalizedEmail }).lean(),
    UserProfile.findOne({ email: normalizedEmail }).lean()
  ]);
  if (admin) return { type: 'admin', account: admin, model: AdminAccount };
  if (mentor) return { type: 'mentor', account: mentor, model: MentorAccount };
  if (student) return { type: 'student', account: student, model: UserProfile };

  const db = AdminAccount.db;
  const [rawAdmin, rawMentor, rawStudent] = await Promise.all([
    db.collection('adminaccounts').findOne({ email: normalizedEmail }),
    db.collection('mentoraccounts').findOne({ email: normalizedEmail }),
    db.collection('userprofiles').findOne({ email: normalizedEmail })
  ]);
  if (rawAdmin) return { type: 'admin', account: rawAdmin, model: AdminAccount };
  if (rawMentor) return { type: 'mentor', account: rawMentor, model: MentorAccount };
  if (rawStudent) return { type: 'student', account: rawStudent, model: UserProfile };
  return null;
}

function normalizeRules(rows) {
  return rows.reduce((acc, item) => {
    const data = item.toObject ? item.toObject() : item;
    const { majorKey, _id, __v, createdAt, updatedAt, ...rule } = data;
    acc[majorKey] = rule;
    return acc;
  }, {});
}

function dedupeBy(rows, keyFn) {
  const map = new Map();
  rows.forEach((row) => {
    map.set(keyFn(row), row);
  });
  return [...map.values()];
}

function isValidSubmissionUrl(value) {
  if (!value || typeof value !== 'string') return false;
  try {
    const url = new URL(value.trim());
    return ['http:', 'https:'].includes(url.protocol) && url.hostname.includes('.');
  } catch {
    return false;
  }
}

function splitSkills(value) {
  return String(value || '')
    .split(/[,;\n]/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function buildSubmissionChecks(body, challenge) {
  const primaryOk = isValidSubmissionUrl(body.primaryLink);
  const secondaryBlank = !body.secondaryLink?.trim();
  const secondaryOk = secondaryBlank || isValidSubmissionUrl(body.secondaryLink);
  const skills = splitSkills(body.skills);
  const notesOk = String(body.notes || '').trim().length >= 20;
  const checks = [
    { key: 'primaryLink', label: 'Link chính hợp lệ', ok: primaryOk, detail: primaryOk ? 'URL có thể mở để mentor xem bài.' : 'Link chính phải bắt đầu bằng http/https.' },
    { key: 'secondaryLink', label: 'Link minh chứng phù hợp', ok: secondaryOk, detail: secondaryOk ? 'Link phụ hợp lệ hoặc có thể bổ sung sau.' : 'Link phụ không đúng định dạng URL.' },
    { key: 'skills', label: 'Khai báo kỹ năng', ok: skills.length >= 2, detail: skills.length >= 2 ? `${skills.length} kỹ năng được ghi nhận.` : 'Cần ít nhất 2 kỹ năng.' },
    { key: 'notes', label: 'Ghi chú nghiệp vụ', ok: notesOk, detail: notesOk ? 'Ghi chú đủ để mentor nắm bối cảnh.' : 'Cần mô tả logic, nghiệp vụ hoặc phần cần review.' },
    { key: 'trackMatch', label: 'Khớp challenge', ok: Boolean(challenge?.id), detail: `Bài nộp gắn với ${challenge?.track ?? 'challenge'}.` }
  ];
  return {
    checks,
    errors: checks.filter((item) => !item.ok),
    score: Math.round((checks.filter((item) => item.ok).length / checks.length) * 100)
  };
}

async function findMatchedMentor(challenge) {
  const mentors = await MentorAccount.find({}).lean();
  const normalizedTrack = String(challenge?.track || '').toLowerCase();
  const normalizedMentor = String(challenge?.mentor || '').toLowerCase();
  return mentors.find((mentor) => mentor.id === challenge?.mentorId)
    ?? mentors.find((mentor) => String(mentor.name || '').toLowerCase() === normalizedMentor)
    ?? mentors.find((mentor) => (mentor.expertise ?? []).some((item) => {
      const expertise = String(item).toLowerCase();
      return expertise === normalizedTrack || expertise.includes(normalizedTrack) || normalizedTrack.includes(expertise);
    }))
    ?? mentors[0]
    ?? { id: 'mentor-auto', name: challenge?.mentor || 'Mentor Demo' };
}

app.get('/api/health', async (_req, res) => {
  res.json({ ok: true, service: 'portfolio-api', time: new Date().toISOString() });
});

app.get('/api/bootstrap', async (_req, res, next) => {
  try {
    const [majors, challenges, rules, profiles, feedback, submissions, admins, mentors, categories, resources, notifications] = await Promise.all([
      Major.find({}).sort({ displayOrder: 1 }).lean(),
      Challenge.find({}).sort({ majorKey: 1, track: 1, xp: 1 }).lean(),
      SubmissionRule.find({}).lean(),
      UserProfile.find({}).lean(),
      MentorFeedback.find({}).lean(),
      Submission.find({}).lean(),
      AdminAccount.find({}).lean(),
      MentorAccount.find({}).lean(),
      Category.find({}).lean(),
      Resource.find({}).lean(),
      Notification.find({}).lean()
    ]);

    const cleanSubmissions = dedupeBy(submissions, (item) => `${item.userId}:${item.challengeId}`);
    const cleanFeedback = dedupeBy(feedback, (item) => `${item.userId}:${item.challengeId}`);

    res.json({
      majors,
      challenges,
      submissionRules: normalizeRules(rules),
      demoUser: profiles[0] ? cleanDoc(profiles[0]) : null,
      users: profiles.map(cleanDoc),
      admins: admins.map(cleanDoc),
      mentors: mentors.map(cleanDoc),
      mentorFeedback: cleanFeedback,
      submissions: cleanSubmissions,
      categories,
      resources,
      notifications
    });
  } catch (error) {
    next(error);
  }
});

app.post('/api/auth/login', async (req, res, next) => {
  try {
    const { email, password, rememberMe } = loginSchema.parse(req.body);
    const found = await findAccount(email);
    if (!found || !(await bcrypt.compare(password, found.account.passwordHash || ''))) {
      res.status(401).json({ message: 'Email hoặc mật khẩu không đúng' });
      return;
    }
    if (rememberMe) {
      req.session.cookie.maxAge = 1000 * 60 * 60 * 24 * 14;
    }
    req.session.user = { id: found.account.id, email: found.account.email, role: found.type };
    res.json({ type: found.type, user: cleanDoc(found.account) });
  } catch (error) {
    next(error);
  }
});

app.post('/api/auth/register', async (req, res, next) => {
  try {
    const payload = registerSchema.parse(req.body);
    const exists = await findAccount(payload.email);
    if (exists) {
      res.status(409).json({ message: 'Email đã tồn tại' });
      return;
    }
    const user = await UserProfile.create({
      id: `student-${Date.now()}`,
      name: payload.name,
      email: payload.email,
      passwordHash: await bcrypt.hash(payload.password, 10),
      role: 'student',
      selectedMajorKey: payload.selectedMajorKey,
      careerGoal: 'Junior Portfolio Builder',
      path: [],
      joinedChallengeIds: [],
      stats: { completedChallenges: 0, mentorRating: 0, portfolioProjects: 0, verifiedSkills: 0 },
      portfolio: { headline: '', bio: '', publishedProjects: [], links: [] },
      badges: ['Tài khoản mới']
    });
    req.session.user = { id: user.id, email: user.email, role: 'student' };
    res.status(201).json({ type: 'student', user: cleanDoc(user) });
  } catch (error) {
    next(error);
  }
});

app.get('/api/auth/me', async (req, res, next) => {
  try {
    if (!req.session.user) {
      res.status(401).json({ message: 'Chưa đăng nhập' });
      return;
    }
    const found = await findAccount(req.session.user.email);
    if (!found) {
      res.status(401).json({ message: 'Phiên đăng nhập không hợp lệ' });
      return;
    }
    res.json({ type: found.type, user: cleanDoc(found.account) });
  } catch (error) {
    next(error);
  }
});

app.post('/api/auth/logout', (req, res) => {
  req.session.destroy(() => {
    res.clearCookie('portfolio.sid');
    res.json({ ok: true });
  });
});

app.post('/api/auth/change-password', async (req, res, next) => {
  try {
    if (!req.session.user) {
      res.status(401).json({ message: 'Chưa đăng nhập' });
      return;
    }
    const schema = z.object({ currentPassword: z.string().min(1), newPassword: z.string().min(6) });
    const payload = schema.parse(req.body);
    const found = await findAccount(req.session.user.email);
    if (!found || !(await bcrypt.compare(payload.currentPassword, found.account.passwordHash || ''))) {
      res.status(400).json({ message: 'Mật khẩu hiện tại không đúng' });
      return;
    }
    await found.model.updateOne({ id: found.account.id }, { passwordHash: await bcrypt.hash(payload.newPassword, 10) });
    res.json({ ok: true });
  } catch (error) {
    next(error);
  }
});

app.post('/api/auth/forgot-password', async (req, res, next) => {
  try {
    const email = z.string().email().parse(req.body.email);
    const found = await findAccount(email);
    res.json({ ok: true, message: found ? 'Đã tạo yêu cầu reset mật khẩu demo' : 'Nếu email tồn tại, hệ thống sẽ gửi hướng dẫn reset' });
  } catch (error) {
    next(error);
  }
});

app.get('/api/majors', async (_req, res, next) => {
  try {
    res.json(await Major.find({}).sort({ displayOrder: 1 }).lean());
  } catch (error) {
    next(error);
  }
});

app.get('/api/challenges', async (req, res, next) => {
  try {
    const page = Math.max(Number(req.query.page || 1), 1);
    const limit = Math.min(Math.max(Number(req.query.limit || 50), 1), 100);
    const filter = {};
    if (req.query.majorKey) filter.majorKey = req.query.majorKey;
    if (req.query.track) filter.track = req.query.track;
    if (req.query.difficulty) filter.difficulty = req.query.difficulty;
    if (req.query.search) {
      filter.$or = [
        { title: { $regex: req.query.search, $options: 'i' } },
        { summary: { $regex: req.query.search, $options: 'i' } },
        { tags: { $regex: req.query.search, $options: 'i' } }
      ];
    }
    const sortMap = {
      newest: { id: -1 },
      oldest: { id: 1 },
      popular: { xp: -1 },
      rated: { xp: -1 }
    };
    const sort = sortMap[req.query.sort] ?? { track: 1, xp: 1 };
    const [items, total] = await Promise.all([
      Challenge.find(filter).sort(sort).skip((page - 1) * limit).limit(limit).lean(),
      Challenge.countDocuments(filter)
    ]);
    res.json({ items, total, page, pages: Math.ceil(total / limit) || 1 });
  } catch (error) {
    next(error);
  }
});

app.post('/api/challenges', async (req, res, next) => {
  try {
    const payload = {
      id: req.body.id || `challenge-${Date.now()}`,
      majorKey: req.body.majorKey || 'dev',
      track: req.body.track || 'Frontend',
      title: req.body.title || 'Bài tập mới',
      difficulty: req.body.difficulty || 'Junior',
      xp: Number(req.body.xp || 300),
      due: req.body.due || '7 ngày',
      mentor: req.body.mentor || 'Mentor Demo',
      tags: Array.isArray(req.body.tags) ? req.body.tags : String(req.body.tags || 'Demo').split(',').map((item) => item.trim()).filter(Boolean),
      summary: req.body.summary || 'Mô tả bài tập demo.'
    };
    const saved = await Challenge.create(payload);
    res.status(201).json(saved);
  } catch (error) {
    next(error);
  }
});

app.put('/api/challenges/:id', async (req, res, next) => {
  try {
    const updates = { ...req.body };
    if (updates.xp) updates.xp = Number(updates.xp);
    if (typeof updates.tags === 'string') {
      updates.tags = updates.tags.split(',').map((item) => item.trim()).filter(Boolean);
    }
    const saved = await Challenge.findOneAndUpdate({ id: req.params.id }, updates, { new: true });
    if (!saved) {
      res.status(404).json({ message: 'Không tìm thấy challenge' });
      return;
    }
    res.json(saved);
  } catch (error) {
    next(error);
  }
});

app.delete('/api/challenges/:id', async (req, res, next) => {
  try {
    const result = await Challenge.deleteOne({ id: req.params.id });
    await Submission.deleteMany({ challengeId: req.params.id });
    res.json({ ok: result.deletedCount > 0 });
  } catch (error) {
    next(error);
  }
});

app.get('/api/users', async (_req, res, next) => {
  try {
    const filter = {};
    if (_req.query.search) {
      filter.$or = [
        { name: { $regex: _req.query.search, $options: 'i' } },
        { email: { $regex: _req.query.search, $options: 'i' } },
        { selectedMajorKey: { $regex: _req.query.search, $options: 'i' } }
      ];
    }
    const users = await UserProfile.find(filter).lean();
    res.json(users.map(cleanDoc));
  } catch (error) {
    next(error);
  }
});

app.get('/api/mentors', async (req, res, next) => {
  try {
    const filter = {};
    if (req.query.search) {
      filter.$or = [
        { name: { $regex: req.query.search, $options: 'i' } },
        { email: { $regex: req.query.search, $options: 'i' } },
        { expertise: { $regex: req.query.search, $options: 'i' } }
      ];
    }
    const mentors = await MentorAccount.find(filter).lean();
    res.json(mentors.map(cleanDoc));
  } catch (error) {
    next(error);
  }
});

app.get('/api/categories', async (_req, res, next) => {
  try {
    res.json(await Category.find({}).lean());
  } catch (error) {
    next(error);
  }
});

app.get('/api/resources', async (req, res, next) => {
  try {
    const filter = {};
    if (req.query.majorKey) filter.majorKey = req.query.majorKey;
    if (req.query.track) filter.track = req.query.track;
    if (req.query.difficulty) filter.difficulty = req.query.difficulty;
    if (req.query.search) {
      filter.$or = [
        { title: { $regex: req.query.search, $options: 'i' } },
        { type: { $regex: req.query.search, $options: 'i' } }
      ];
    }
    res.json(await Resource.find(filter).lean());
  } catch (error) {
    next(error);
  }
});

app.get('/api/notifications', async (req, res, next) => {
  try {
    const filter = {};
    if (req.query.userId) filter.userId = req.query.userId;
    if (req.query.role) filter.role = req.query.role;
    res.json(await Notification.find(filter).lean());
  } catch (error) {
    next(error);
  }
});

app.put('/api/users/:id', async (req, res, next) => {
  try {
    const saved = await UserProfile.findOneAndUpdate({ id: req.params.id }, req.body, { new: true });
    if (!saved) {
      res.status(404).json({ message: 'Không tìm thấy user' });
      return;
    }
    res.json(cleanDoc(saved));
  } catch (error) {
    next(error);
  }
});

app.put('/api/users/:id/path', async (req, res, next) => {
  try {
    const saved = await UserProfile.findOneAndUpdate(
      { id: req.params.id },
      { path: req.body.path || [], selectedMajorKey: req.body.selectedMajorKey, careerGoal: req.body.careerGoal },
      { new: true }
    );
    if (!saved) {
      res.status(404).json({ message: 'Không tìm thấy user' });
      return;
    }
    res.json(cleanDoc(saved));
  } catch (error) {
    next(error);
  }
});

app.put('/api/users/:id/portfolio', async (req, res, next) => {
  try {
    const saved = await UserProfile.findOneAndUpdate(
      { id: req.params.id },
      { portfolio: req.body.portfolio || {}, stats: req.body.stats },
      { new: true }
    );
    if (!saved) {
      res.status(404).json({ message: 'Không tìm thấy user' });
      return;
    }
    res.json(cleanDoc(saved));
  } catch (error) {
    next(error);
  }
});

app.post('/api/users/:id/joined-challenges', async (req, res, next) => {
  try {
    const saved = await UserProfile.findOneAndUpdate(
      { id: req.params.id },
      { $addToSet: { joinedChallengeIds: req.body.challengeId } },
      { new: true }
    );
    if (!saved) {
      res.status(404).json({ message: 'Không tìm thấy user' });
      return;
    }
    res.json(cleanDoc(saved));
  } catch (error) {
    next(error);
  }
});

app.get('/api/submissions', async (req, res, next) => {
  try {
    const filter = req.query.userId ? { userId: req.query.userId } : {};
    const submissions = await Submission.find(filter).sort({ updatedAt: -1 }).lean();
    res.json(dedupeBy(submissions, (item) => `${item.userId}:${item.challengeId}`));
  } catch (error) {
    next(error);
  }
});

app.post('/api/submissions', async (req, res, next) => {
  try {
    const challenge = await Challenge.findOne({ id: req.body.challengeId }).lean();
    const validation = buildSubmissionChecks(req.body, challenge);
    if ((req.body.status || 'draft') === 'submitted' && validation.errors.length) {
      res.status(422).json({ message: 'Submission validation failed', validation });
      return;
    }
    const mentor = await findMatchedMentor(challenge);
    const payload = {
      id: req.body.id || `sub-${req.body.userId || 'demo-student'}-${req.body.challengeId}`,
      userId: req.body.userId || 'demo-student',
      challengeId: req.body.challengeId,
      status: req.body.status || 'draft',
      primaryLink: req.body.primaryLink || '',
      secondaryLink: req.body.secondaryLink || '',
      skills: req.body.skills || '',
      notes: req.body.notes || '',
      mentorId: req.body.mentorId || mentor.id,
      mentor: req.body.mentor || mentor.name,
      validationChecks: req.body.validationChecks || validation.checks,
      validationScore: req.body.validationScore || validation.score,
      matchedAt: req.body.matchedAt || ((req.body.status || 'draft') === 'submitted' ? new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }) : ''),
      updatedAt: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
    };
    const saved = await Submission.findOneAndUpdate(
      { userId: payload.userId, challengeId: payload.challengeId },
      payload,
      { new: true, upsert: true }
    );
    res.status(201).json(saved);
  } catch (error) {
    next(error);
  }
});

app.delete('/api/submissions/:id', async (req, res, next) => {
  try {
    const result = await Submission.deleteOne({ id: req.params.id });
    res.json({ ok: result.deletedCount > 0 });
  } catch (error) {
    next(error);
  }
});

app.get('/api/feedback', async (req, res, next) => {
  try {
    const filter = {};
    if (req.query.userId) filter.userId = req.query.userId;
    if (req.query.challengeId) filter.challengeId = req.query.challengeId;
    res.json(await MentorFeedback.find(filter).lean());
  } catch (error) {
    next(error);
  }
});

app.post('/api/feedback', async (req, res, next) => {
  try {
    const payload = {
      id: req.body.id || `fb-${req.body.userId || 'demo-student'}-${req.body.challengeId}`,
      userId: req.body.userId || 'demo-student',
      challengeId: req.body.challengeId,
      score: Number(req.body.score || 88),
      title: req.body.title || 'Đủ tốt để đưa vào portfolio',
      strengths: Array.isArray(req.body.strengths) ? req.body.strengths : ['Sản phẩm bám đúng yêu cầu', 'Có minh chứng rõ ràng', 'Có thể đưa vào portfolio'],
      improvements: Array.isArray(req.body.improvements) ? req.body.improvements : ['Bổ sung số liệu đo lường', 'Viết case study ngắn gọn hơn', 'Thêm ảnh/video minh chứng'],
      reviewer: req.body.reviewer || 'Mentor Demo',
      createdAt: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
    };
    const saved = await MentorFeedback.findOneAndUpdate(
      { userId: payload.userId, challengeId: payload.challengeId },
      payload,
      { new: true, upsert: true }
    );
    await Submission.findOneAndUpdate(
      { userId: payload.userId, challengeId: payload.challengeId },
      { status: 'reviewed', feedbackId: payload.id, updatedAt: payload.createdAt },
      { new: true }
    );
    res.status(201).json(saved);
  } catch (error) {
    next(error);
  }
});

app.get('/api/admin/overview', async (_req, res, next) => {
  try {
    const [majorCount, challengeCount, userCount, submissionCount, feedbackCount] = await Promise.all([
      Major.countDocuments(),
      Challenge.countDocuments(),
      UserProfile.countDocuments(),
      Submission.countDocuments(),
      MentorFeedback.countDocuments()
    ]);
    res.json({ majorCount, challengeCount, userCount, submissionCount, feedbackCount });
  } catch (error) {
    next(error);
  }
});

app.use((error, _req, res, _next) => {
  console.error(error);
  res.status(500).json({ message: 'Server error', detail: error.message });
});

connectDb()
  .then(() => {
    app.listen(port, () => {
      console.log(`Portfolio API running at http://127.0.0.1:${port}`);
    });
  })
  .catch((error) => {
    console.error('Cannot connect to MongoDB:', error.message);
    process.exit(1);
  });
