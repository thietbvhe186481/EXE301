import { Router } from 'express';
import { randomUUID } from 'node:crypto';
import { z } from 'zod';
import { CHALLENGES } from '../shared/catalog.js';

export function createTestimonialsRouter({ StudentReview, UserProfile, ReviewSubmission, Submission }) {
  const router = Router();
  const fail = (status, message) => { const error = new Error(message); error.status = status; throw error; };
  const run = handler => async (req, res, next) => { try { await handler(req, res); } catch (error) { next(error); } };

  router.get('/', run(async (req, res) => {
    const filter = req.session?.user?.role === 'admin'
      ? {}
      : { status: 'approved', studentId: { $type: 'string', $gt: '' } };
    res.json(await StudentReview.find(filter).sort({ createdAt: -1 }).lean());
  }));

  router.post('/', run(async (req, res) => {
    if (req.session?.user?.role !== 'student') fail(403, 'Chỉ sinh viên mới có thể gửi câu chuyện trải nghiệm.');
    const payload = z.object({
      challengeId: z.string().min(1).max(120),
      rating: z.number().int().min(1).max(5),
      outcome: z.string().trim().max(180).default(''),
      quote: z.string().trim().min(30).max(2000)
    }).strict().parse(req.body);
    const student = await UserProfile.findOne({ id: req.session.user.id, status: 'active' }).lean();
    if (!student) fail(403, 'Tài khoản sinh viên không còn hoạt động.');
    const challenge = CHALLENGES.find(item => item.id === payload.challengeId);
    if (!challenge) fail(404, 'Không tìm thấy thử thách đã hoàn thành.');
    const [workflowSubmission, legacySubmission] = await Promise.all([
      ReviewSubmission.findOne({ userId: student.id, challengeId: payload.challengeId, status: 'completed' }).lean(),
      Submission.findOne({ userId: student.id, challengeId: payload.challengeId, status: 'reviewed' }).lean()
    ]);
    if (!workflowSubmission && !legacySubmission) fail(409, 'Chỉ có thể chia sẻ trải nghiệm sau khi hoàn thành thử thách này.');

    const existing = await StudentReview.findOne({ studentId: student.id }).lean();
    if (existing && existing.status !== 'rejected') fail(409, 'Bạn đã gửi một câu chuyện; câu chuyện mới chỉ nhận sau khi quản trị viên từ chối bản trước.');
    const major = student.academicMajor || ({ dev: 'Công nghệ & dữ liệu', mkt: 'Marketing', design: 'Thiết kế & UX' }[student.selectedMajorKey || student.majorKey]) || 'Sinh viên';
    const review = {
      id: existing?.id || `rev-${randomUUID()}`,
      studentId: student.id,
      challengeId: payload.challengeId,
      name: student.name,
      school: student.school || 'Sinh viên Portfolio FPT Hub',
      major,
      roleTrack: challenge.track,
      rating: payload.rating,
      outcome: payload.outcome,
      quote: payload.quote,
      status: 'pending',
      statusReason: '',
      date: new Date().toLocaleDateString('vi-VN'),
      createdAt: new Date(),
      statusHistory: [...(existing?.statusHistory || []), { status: 'pending', changedBy: student.id, changedAt: new Date(), note: 'Gửi để quản trị viên kiểm duyệt.' }]
    };
    const saved = existing
      ? await StudentReview.findOneAndUpdate({ id: existing.id, status: 'rejected' }, { $set: review }, { new: true })
      : await StudentReview.create(review);
    if (!saved) fail(409, 'Câu chuyện vừa được gửi ở một phiên khác. Hãy tải lại trang.');
    res.status(202).json({ review: saved, message: 'Đã nhận câu chuyện và chuyển vào hàng chờ kiểm duyệt.' });
  }));

  router.patch('/:id/status', run(async (req, res) => {
    if (req.session?.user?.role !== 'admin') fail(403, 'Chỉ quản trị viên mới có thể kiểm duyệt câu chuyện.');
    const { status, reason } = z.object({
      status: z.enum(['approved', 'flagged', 'rejected']),
      reason: z.string().trim().min(10).max(1000)
    }).parse(req.body);
    const review = await StudentReview.findOneAndUpdate({ id: req.params.id }, {
      $set: { status, statusReason: reason, moderatedBy: req.session.user.id, moderatedAt: new Date() },
      $push: { statusHistory: { status, changedBy: req.session.user.id, changedAt: new Date(), note: reason } }
    }, { new: true });
    if (!review) fail(404, 'Không tìm thấy câu chuyện cần kiểm duyệt.');
    res.json({ review });
  }));

  router.delete('/:id', run(async (req, res) => {
    if (req.session?.user?.role !== 'admin') fail(403, 'Chỉ quản trị viên mới có thể xóa câu chuyện.');
    const result = await StudentReview.deleteOne({ id: req.params.id });
    if (!result.deletedCount) fail(404, 'Không tìm thấy câu chuyện cần xóa.');
    res.json({ ok: true });
  }));

  router.use((error, _req, res, _next) => {
    if (error instanceof z.ZodError) return res.status(422).json({ message: error.issues[0].message, fieldErrors: Object.fromEntries(error.issues.map(item => [item.path[0], item.message])) });
    if (error.code === 11000) return res.status(409).json({ message: 'Bạn đã gửi câu chuyện hoặc dữ liệu vừa thay đổi. Hãy tải lại.' });
    if (error.status) return res.status(error.status).json({ message: error.message });
    console.error('Testimonial error:', error.message);
    res.status(500).json({ message: 'Chưa thể gửi câu chuyện. Hãy thử lại sau.' });
  });
  return router;
}
