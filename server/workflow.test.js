import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import express from 'express';
import { createWorkflowRouter, mentorSummary, hasPaidAccess, nextPremiumExpiry } from './workflow.js';
import { CHALLENGES, scoreReview, qualityFromRatings, readinessCheck } from '../shared/catalog.js';
import { generateAiAdvice } from './ai-review.js';
import { createHmac } from 'node:crypto';
import { MENTOR_AGREEMENT_VERSION } from '../shared/mentorAgreement.js';

const get = (obj, path) => path.split('.').reduce((value, part) => value?.[part], obj);
const set = (obj, path, value) => { const parts = path.split('.'); const last = parts.pop(); let current = obj; for (const part of parts) current = current[part] ??= {}; current[last] = value; };
const compare = (actual, expected) => {
  if (expected && typeof expected === 'object' && !(expected instanceof Date)) return Object.entries(expected).every(([op, value]) => {
    if (op === '$in') return value.includes(actual);
    if (op === '$nin') return !value.includes(actual);
    if (op === '$exists') return (actual !== undefined) === value;
    const left = value instanceof Date ? new Date(actual).getTime() : actual;
    const right = value instanceof Date ? value.getTime() : value;
    if (op === '$gte') return left >= right;
    if (op === '$lte') return left <= right;
    if (op === '$lt') return left < right;
    return actual?.[op] === value;
  });
  return actual === expected;
};
const match = (row, query) => Object.entries(query).every(([key, value]) => key === '$or' ? value.some(item => match(row, item)) : compare(get(row, key), value));
function model(uniqueFields = []) {
  const rows = [];
  const query = value => ({ lean: async () => structuredClone(value), sort: () => query(value), then: (resolve, reject) => Promise.resolve(structuredClone(value)).then(resolve, reject) });
  const create = data => {
    if (uniqueFields.length && rows.some(row => uniqueFields.every(field => row[field] === data[field]))) throw Object.assign(new Error('duplicate'), { code: 11000 });
    const row = structuredClone(data); rows.push(row); return structuredClone(row);
  };
  const update = (filter, data, options = {}) => {
    let row = rows.find(item => match(item, filter));
    if (!row && options.upsert) { create({ ...Object.fromEntries(Object.entries(filter).filter(([, value]) => typeof value !== 'object')), ...data.$setOnInsert, ...data.$set }); row = rows.at(-1); }
    if (!row) return null;
    for (const [key, value] of Object.entries(data.$set || {})) if (value !== undefined) set(row, key, value);
    for (const [key, value] of Object.entries(data.$push || {})) { const array = get(row, key) || []; array.push(value); set(row, key, array); }
    for (const key of Object.keys(data.$unset || {})) { const parts = key.split('.'); const last = parts.pop(); const object = parts.length ? get(row, parts.join('.')) : row; if (object) delete object[last]; }
    return structuredClone(row);
  };
  return { rows, find: filter => query(rows.filter(row => match(row, filter))), findOne: filter => query(rows.find(row => match(row, filter)) || null), create: async data => create(data),
    findOneAndUpdate: async (...args) => update(...args), updateOne: async (...args) => update(...args) };
}
const models = { UserProfile: model(['id']), MentorAccount: model(['id']), AdminAccount: model(['id']), ReviewerProfile: model(['mentorId']), ReviewSubmission: model(['userId', 'challengeId']), SubscriptionOrder: model(['orderId']), PremiumPlan: model(['id']) };
let server, base;
const actors = { student: { id: 'student', role: 'student' }, free: { id: 'free', role: 'student' }, stranger: { id: 'stranger', role: 'student' }, mentor: { id: 'mentor', role: 'mentor' }, other: { id: 'other', role: 'mentor' }, admin: { id: 'admin', role: 'admin' } };
before(async () => {
  for (const id of ['student', 'free', 'stranger']) await models.UserProfile.create({ id, name: id, status: 'active', isPremium: id !== 'free', subscriptionExpiresAt: new Date(Date.now() + 86400000) });
  for (const id of ['mentor', 'other']) {
    await models.MentorAccount.create({ id, name: id, status: 'active', expertise: ['React'], bankInfo: { bankName: 'TPBank', accountNumber: '123456789', accountHolder: 'MENTOR TEST' }, mentorAgreementVersion: MENTOR_AGREEMENT_VERSION, mentorAgreementAcceptedAt: new Date() });
    await models.ReviewerProfile.create({ mentorId: id, capacity: 1, available: true, challengeIds: CHALLENGES.map(item => item.id), application: { status: 'approved' } });
  }
  await models.AdminAccount.create({ id: 'admin', status: 'active' });
  await models.PremiumPlan.create({ id: 'premium-month', name: 'Tháng', price: 79000, status: 'active' });
  const app = express(); app.use(express.json({ limit: '64kb' }));
  app.use((req, _res, next) => { req.session = { user: actors[req.headers['x-test-user']] }; next(); });
  app.use('/api/workflow', createWorkflowRouter(models));
  server = app.listen(0, '127.0.0.1'); await new Promise(resolve => server.once('listening', resolve));
  base = `http://127.0.0.1:${server.address().port}/api/workflow`;
});
after(() => new Promise(resolve => server.close(resolve)));
const request = async (path, actor, body, method = body === undefined ? 'GET' : 'POST') => {
  const response = await fetch(base + path, { method, headers: { 'Content-Type': 'application/json', ...(actor ? { 'x-test-user': actor } : {}) }, ...(body === undefined ? {} : { body: JSON.stringify(body) }) });
  return { status: response.status, data: await response.json() };
};
const payload = (challengeId = CHALLENGES[0].id) => ({ challengeId, mode: 'human', format: 'project', links: ['https://example.com/project'], skills: ['React', 'CSS'], notes: 'This project includes a clear explanation of the user flow, implementation tradeoffs and test cases.', shareTalent: false, linksAccessible: true, mentorId: 'mentor', acceptDelay: false, status: 'queued' });
const review = id => ({ decision: 'complete', scores: Object.fromEntries(CHALLENGES.find(item => item.id === id).rubric.map(item => [item.key, 9])), strengths: 'Có cấu trúc rõ ràng', improvements: 'Bổ sung kiểm thử lỗi', comment: 'Bài làm đáp ứng yêu cầu và có minh chứng phù hợp.' });
let submissionId;
test('public catalog has real sources and rubric weights total 100; private state requires authentication', async () => {
  assert.equal((await request('/catalog')).data.catalog.length, 18);
  for (const item of CHALLENGES) {
    assert.equal(item.rubric.reduce((sum, criterion) => sum + criterion.weight, 0), 100);
    assert.match(item.source.url, /^https:\/\/www.coursera.org\//);
    assert.ok(item.requirements.length >= 2);
    assert.ok(item.estimatedHours > 0 && item.levelDescription && item.learningOutcome);
    assert.ok(item.scenario?.length > item.summary.length && item.reviewQuestion?.length > 30);
  }
  assert.equal((await request('/state')).status, 401);
});
test('mentor needs current agreement before accepting new reviews but can finish assigned work', () => {
  const profile = { available: true, application: { status: 'approved' } };
  const legacy = mentorSummary({ id: 'legacy', status: 'active', mentorAgreementVersion: 'older' }, profile, []);
  assert.equal(legacy.eligible, false);
  assert.equal(legacy.canContinue, true);
  const current = mentorSummary({ id: 'current', status: 'active', mentorAgreementVersion: MENTOR_AGREEMENT_VERSION, mentorAgreementAcceptedAt: new Date() }, profile, []);
  assert.equal(current.eligible, true);
});
test('free student cannot submit premium challenges or human reviews', async () => {
  assert.equal((await request('/submissions', 'free', payload())).status, 403);
  assert.equal((await request('/submissions', 'free', { ...payload(CHALLENGES[2].id), mode: 'ai' })).status, 403);
  assert.equal(hasPaidAccess({ isPremium: true, subscriptionExpiresAt: new Date(0) }), false);
});
test('AI readiness is real rule output, owns its data, no file payloads or unsafe URL schemes', async () => {
  const result = await request('/submissions', 'free', { ...payload(), mode: 'ai' });
  assert.equal(result.status, 201); assert.equal(result.data.submission.ai.engine, 'rules');
  assert.equal(result.data.submission.reward, undefined);
  assert.equal((await request('/submissions', 'free', { ...payload(CHALLENGES[1].id), mode: 'ai', links: ['javascript:alert(1)'] })).status, 422);
  assert.equal((await request('/submissions', 'free', { ...payload(CHALLENGES[1].id), mode: 'ai', links: Array(4).fill('https://example.com') })).status, 422);
  assert.equal((await request('/submissions', 'free', { ...payload(CHALLENGES[1].id), mode: 'ai', notes: 'x'.repeat(3001) })).status, 422);
  assert.equal((await request('/state', 'stranger')).data.submissions.length, 0);
});
test('assignment requires confident mentor; overload requires acknowledgement and recommends alternatives', async () => {
  const result = await request('/submissions', 'student', payload());
  assert.equal(result.status, 201); submissionId = result.data.submission.id;
  const state = (await request('/state', 'student')).data;
  assert.equal(state.mentors[0].id, 'other');
  assert.equal(state.mentors.find(item => item.id === 'mentor').overloaded, true);
  assert.equal((await request('/submissions', 'stranger', payload())).status, 409);
  assert.equal((await request('/submissions', 'stranger', { ...payload(), acceptDelay: true })).status, 201);
  assert.equal((await request('/submissions', 'student', payload())).status, 409);
});
test('only assigned mentor starts review; rubric required; completion credits exactly once', async () => {
  assert.equal((await request(`/submissions/${submissionId}/start`, 'other', {})).status, 409);
  assert.equal((await request(`/submissions/${submissionId}/start`, 'mentor', {})).status, 200);
  assert.equal((await request(`/submissions/${submissionId}/review`, 'mentor', { ...review(CHALLENGES[0].id), scores: {} })).status, 422);
  const result = await request(`/submissions/${submissionId}/review`, 'mentor', review(CHALLENGES[0].id));
  assert.equal(result.status, 200); assert.equal(result.data.submission.review.score, 90);
  assert.equal(result.data.submission.reward.base, 5000);
  assert.equal((await request(`/submissions/${submissionId}/review`, 'mentor', review(CHALLENGES[0].id))).status, 409);
  assert.equal((await request(`/submissions/${submissionId}`, 'student', payload(), 'PUT')).status, 409);
});
test('rating belongs to paid owner, is single-use, bonus and payout are atomic and private', async () => {
  assert.equal((await request(`/submissions/${submissionId}/rating`, 'stranger', { stars: 5 })).status, 409);
  assert.equal((await request(`/admin/payouts/${submissionId}`, 'admin', { reference: 'BANK-001', confirmed: true })).status, 409);
  const results = await Promise.all([request(`/submissions/${submissionId}/rating`, 'student', { stars: 5 }), request(`/submissions/${submissionId}/rating`, 'student', { stars: 4 })]);
  assert.deepEqual(results.map(item => item.status).sort(), [200, 409]);
  const voted = results.find(item => item.status === 200).data.submission;
  assert.equal(voted.reward.bonus, voted.rating.stars === 5 ? 1250 : 750);
  assert.equal((await request(`/admin/payouts/${submissionId}`, 'mentor', { reference: 'BANK-001', confirmed: true })).status, 403);
  const payout = await request(`/admin/payouts/${submissionId}`, 'admin', { reference: 'BANK-001', note: 'Đối soát kỳ thử nghiệm', confirmed: true });
  assert.equal(payout.status, 200);
  assert.equal(payout.data.submission.reward.payoutLog.amount, 5000 + voted.reward.bonus);
  assert.equal(payout.data.submission.reward.payoutLog.accountNumber, '123456789');
  assert.equal(payout.data.submission.reward.payoutLog.confirmedBy, 'admin');
  assert.equal((await request(`/admin/payouts/${submissionId}`, 'admin', { reference: 'BANK-002', confirmed: true })).status, 409);
  assert.equal((await request('/state', 'student')).data.submissions.find(item => item.id === submissionId).reward.payoutLog, undefined);
  assert.equal((await request('/state', 'other')).data.earnings.total, 0);
});
test('talent discovery is opt-in and consent withdrawal removes the listing', async () => {
  assert.equal((await request('/state', 'other')).data.talents.length, 0);
  await request(`/submissions/${submissionId}/consent`, 'student', { shareTalent: true }, 'PATCH');
  const talent = (await request('/state', 'other')).data.talents[0];
  assert.equal(talent.id, submissionId); assert.equal(talent.email, undefined);
  await request(`/submissions/${submissionId}/consent`, 'student', { shareTalent: false }, 'PATCH');
  assert.equal((await request('/state', 'other')).data.talents.length, 0);
});
test('chat is scoped and bounded; cancellation and revisions release work safely', async () => {
  const job = (await request('/state', 'stranger')).data.submissions[0];
  assert.equal((await request(`/submissions/${job.id}/messages`, 'student', { text: 'Hello' })).status, 409);
  assert.equal((await request(`/submissions/${job.id}/messages`, 'mentor', { text: 'Bạn cần bổ sung điều gì?' })).status, 200);
  assert.equal((await request(`/submissions/${job.id}/messages`, 'stranger', { text: 'x'.repeat(2001) })).status, 422);
  await request(`/submissions/${job.id}/start`, 'mentor', {});
  const revise = await request(`/submissions/${job.id}/review`, 'mentor', { decision: 'revise', comment: 'Vui lòng bổ sung minh chứng và quyền xem repository.' });
  assert.equal(revise.status, 200); assert.equal(revise.data.submission.reward, undefined);
  assert.equal((await request(`/submissions/${job.id}/cancel`, 'stranger', {}, 'PATCH')).status, 200);
  assert.equal((await request(`/submissions/${job.id}/messages`, 'mentor', { text: 'Hello' })).status, 409);
});
test('orders do not self-activate, use server price and require admin verification', async () => {
  const result = await request('/orders', 'free', { planId: 'premium-month', transactionCode: 'BANK-123', price: 1, userId: 'student' });
  assert.equal(result.status, 201); assert.equal(result.data.order.price, 79000); assert.equal(result.data.order.userId, 'free');
  assert.equal((await request('/state', 'free')).data.paid, false);
  assert.equal((await request(`/admin/orders/${result.data.order.orderId}`, 'free', { status: 'completed', reference: 'BANK-123' }, 'PATCH')).status, 403);
  assert.equal((await request(`/admin/orders/${result.data.order.orderId}`, 'admin', { status: 'completed', reference: 'BANK-123' }, 'PATCH')).status, 200);
  assert.equal((await request('/state', 'free')).data.paid, true);
});
test('premium renewals extend the active term and re-verifying an order is idempotent', async () => {
  const student = await models.UserProfile.findOne({ id: 'student' }).lean();
  const priorExpiry = new Date(student.subscriptionExpiresAt);
  const result = await request('/orders', 'student', { planId: 'premium-month', transactionCode: 'BANK-RENEWAL-1' });
  assert.equal(result.status, 201);
  const orderId = result.data.order.orderId;
  const verified = await request(`/admin/orders/${orderId}`, 'admin', { status: 'completed', reference: 'BANK-RENEWAL-1' }, 'PATCH');
  assert.equal(verified.status, 200);
  assert.equal(new Date(verified.data.order.expiresAt).getTime(), priorExpiry.getTime() + 30 * 86400000);
  const expiryAfterFirstVerification = new Date((await models.UserProfile.findOne({ id: 'student' }).lean()).subscriptionExpiresAt).getTime();
  const repeated = await request(`/admin/orders/${orderId}`, 'admin', { status: 'completed', reference: 'BANK-RENEWAL-1' }, 'PATCH');
  assert.equal(repeated.status, 200);
  assert.equal(new Date((await models.UserProfile.findOne({ id: 'student' }).lean()).subscriptionExpiresAt).getTime(), expiryAfterFirstVerification);

  const second = await request('/orders', 'student', { planId: 'premium-month', transactionCode: 'BANK-RENEWAL-2' });
  const secondVerified = await request(`/admin/orders/${second.data.order.orderId}`, 'admin', { status: 'completed', reference: 'BANK-RENEWAL-2' }, 'PATCH');
  assert.equal(new Date(secondVerified.data.order.expiresAt).getTime(), expiryAfterFirstVerification + 30 * 86400000);
  assert.equal(nextPremiumExpiry(new Date(0), new Date('2030-01-01T00:00:00Z'), 'premium-quarter').toISOString(), '2030-04-01T00:00:00.000Z');
});

test('mentor approval moves the account into the eligible state and cannot be decided twice', async () => {
  await models.MentorAccount.create({ id: 'new-mentor', name: 'Ngọc Mentor', status: 'active', expertise: ['React'] });
  await models.ReviewerProfile.create({ mentorId: 'new-mentor', available: true, capacity: 5, challengeIds: CHALLENGES.map(item => item.id), application: { status: 'pending', method: 'cv', submittedAt: new Date() } });
  const result = await request('/admin/mentors/new-mentor', 'admin', { status: 'approved', reason: 'Hồ sơ và chuyên môn đáp ứng tiêu chí review.' }, 'PATCH');
  assert.equal(result.status, 200); assert.equal(result.data.profile.application.status, 'approved');
  assert.equal((await models.MentorAccount.findOne({ id: 'new-mentor' }).lean()).status, 'active');
  const state = await request('/state', 'admin');
  assert.ok(state.data.applications.some(item => item.mentorId === 'new-mentor'));
  assert.equal((await request('/admin/mentors/new-mentor', 'admin', { status: 'approved', reason: 'Thử duyệt lại hồ sơ đã xử lý.' }, 'PATCH')).status, 409);
});

test('PayOS webhook validates HMAC and exact amount, then activates and extends Premium once', async () => {
  const keys = ['PAYOS_CLIENT_ID', 'PAYOS_API_KEY', 'PAYOS_CHECKSUM_KEY', 'PAYOS_RETURN_URL', 'PAYOS_CANCEL_URL'];
  const old = Object.fromEntries(keys.map(key => [key, process.env[key]]));
  Object.assign(process.env, { PAYOS_CLIENT_ID: 'test-client', PAYOS_API_KEY: 'test-key', PAYOS_CHECKSUM_KEY: 'test-checksum', PAYOS_RETURN_URL: 'https://site.example/return', PAYOS_CANCEL_URL: 'https://site.example/cancel' });
  try {
    const code = 1900000123;
    await models.SubscriptionOrder.create({ orderId: 'ORD-PAYOS-TEST', providerOrderCode: code, userId: 'student', planId: 'premium-month', planName: 'Tháng', price: 79000, transactionCode: 'JR123', paymentMethod: 'PayOS · VietQR', status: 'pending' });
    const prior = new Date((await models.UserProfile.findOne({ id: 'student' }).lean()).subscriptionExpiresAt).getTime();
    const data = { orderCode: code, amount: 79000, reference: 'BANK-REF-1', code: '00', description: 'JR123' };
    const message = Object.keys(data).sort().map(key => `${key}=${data[key] ?? ''}`).join('&');
    const signature = createHmac('sha256', process.env.PAYOS_CHECKSUM_KEY).update(message).digest('hex');
    const webhook = { code: '00', desc: 'success', success: true, data, signature };
    assert.equal((await request('/payments/payos-webhook', null, { ...webhook, signature: 'bad' })).status, 400);
    assert.equal((await request('/payments/payos-webhook', null, { ...webhook, data: { ...data, amount: 1 } })).status, 400);
    const sampleData = { ...data, orderCode: 1900000999 };
    const sampleSignature = createHmac('sha256', process.env.PAYOS_CHECKSUM_KEY).update(Object.keys(sampleData).sort().map(key => `${key}=${sampleData[key] ?? ''}`).join('&')).digest('hex');
    assert.equal((await request('/payments/payos-webhook', null, { ...webhook, data: sampleData, signature: sampleSignature })).status, 200);
    assert.equal((await request('/payments/payos-webhook', null, webhook)).status, 200);
    assert.equal((await request('/payments/payos-webhook', null, webhook)).status, 200);
    assert.equal((await models.SubscriptionOrder.findOne({ orderId: 'ORD-PAYOS-TEST' }).lean()).status, 'completed');
    assert.equal(new Date((await models.UserProfile.findOne({ id: 'student' }).lean()).subscriptionExpiresAt).getTime(), prior + 30 * 86400000);
  } finally { for (const key of keys) old[key] === undefined ? delete process.env[key] : process.env[key] = old[key]; }
});

test('AI completion can be upgraded to human without duplicate challenge record', async () => {
  const job = (await request('/state', 'free')).data.submissions[0];
  const result = await request(`/submissions/${job.id}`, 'free', { ...payload(), mentorId: 'other' }, 'PUT');
  assert.equal(result.status, 200); assert.equal(result.data.submission.id, job.id);
  assert.equal(result.data.submission.mode, 'human');
});
test('mentor screening needs sufficient votes; rejected/offline profiles not assignable', () => {
  assert.equal(qualityFromRatings([1]).qualityStatus, 'warning');
  assert.equal(qualityFromRatings([1, 2, 2, 2, 2]).qualityStatus, 'excluded');
  assert.equal(mentorSummary({ id: 'm', status: 'active' }, { available: false, application: { status: 'approved' } }, []).eligible, false);
  assert.throws(() => scoreReview(CHALLENGES[0], {}));
  assert.equal(readinessCheck({ links: [], format: 'project', notes: '', skills: [], linksAccessible: false }).score, 0);
});
test('AI provider adapter sends only consented notes/skills and validates structured response', async () => {
  const oldKey = process.env.OPENAI_API_KEY, oldModel = process.env.OPENAI_REVIEW_MODEL;
  process.env.OPENAI_API_KEY = 'test-only'; process.env.OPENAI_REVIEW_MODEL = 'test-model';
  try {
    const advice = await generateAiAdvice(CHALLENGES[0], payload(), async (_url, options) => {
      const body = JSON.parse(options.body);
      assert.equal(body.store, false); assert.equal(body.input.includes('example.com'), false);
      const advice = { summary: 'Phần mô tả còn thiếu minh chứng.', rubricFeedback: CHALLENGES[0].rubric.map(item => ({ key: item.key, label: item.label, assessment: 'Chưa có minh chứng cụ thể trong ghi chú.', evidence: '' })), strengths: ['Đã nêu mục tiêu sản phẩm.'], improvements: ['Thêm ảnh giao diện ở hai kích thước.'] };
      assert.equal(body.text.format.schema.properties.rubricFeedback.type, 'array');
      return { ok: true, json: async () => ({ status: 'completed', output: [{ content: [{ type: 'output_text', text: JSON.stringify(advice) }] }] }) };
    });
    assert.equal(advice.improvements.length, 1);
    assert.equal(advice.rubricFeedback.length, CHALLENGES[0].rubric.length);
    assert.equal(advice.strengths.length, 1);
  } finally {
    if (oldKey === undefined) delete process.env.OPENAI_API_KEY; else process.env.OPENAI_API_KEY = oldKey;
    if (oldModel === undefined) delete process.env.OPENAI_REVIEW_MODEL; else process.env.OPENAI_REVIEW_MODEL = oldModel;
  }
});

test('manual payment uses a unique VietQR reference and requires bank reconciliation, never a payment OTP', async () => {
  const prior = process.env.EMAIL_VERIFICATION_REQUIRED;
  process.env.EMAIL_VERIFICATION_REQUIRED = '1';
  const testModels = { UserProfile: model(['id']), MentorAccount: model(['id']), AdminAccount: model(['id']), ReviewerProfile: model(['mentorId']), ReviewSubmission: model(['userId', 'challengeId']), SubscriptionOrder: model(['orderId']), PremiumPlan: model(['id']) };
  await testModels.UserProfile.create({ id: 'otp-student', name: 'Student', email: 'student@example.com', role: 'student', status: 'active', emailVerified: true });
  await testModels.PremiumPlan.create({ id: 'premium-month', name: 'Tháng', price: 79000, status: 'active' });
  const session = { user: { id: 'otp-student', role: 'student' } };
  const app = express(); app.use(express.json());
  app.use((req, _res, next) => { req.session = session; next(); });
  app.use('/api/workflow', createWorkflowRouter(testModels));
  const listener = app.listen(0, '127.0.0.1'); await new Promise(resolve => listener.once('listening', resolve));
  const url = `http://127.0.0.1:${listener.address().port}/api/workflow`;
  const post = async (path, body) => {
    const response = await fetch(url + path, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
    const raw = await response.text();
    return { status: response.status, data: raw.startsWith('{') ? JSON.parse(raw) : raw };
  };
  try {
    const first = await post('/orders', { planId: 'premium-month', price: 1, transactionCode: 'INJECTED' });
    assert.equal(first.status, 201);
    assert.equal(first.data.order.price, 79000);
    assert.equal(first.data.order.receivingBank.accountNumber, '33313052004');
    assert.equal(first.data.order.receivingBank.accountHolder, 'NGUYEN SY HUY');
    assert.match(first.data.order.transactionCode, /^PFH[A-F0-9]{16}$/);
    assert.equal(first.data.payment.provider, 'manual-vietqr');
    assert.match(first.data.payment.qrUrl, /img\.vietqr\.io/);
    assert.ok(first.data.payment.qrUrl.includes(first.data.order.transactionCode));
    assert.equal((await post('/payments/request-code', { planId: 'premium-month' })).status, 404);
    const again = await post('/orders', { planId: 'premium-month' });
    assert.equal(again.status, 200);
    assert.equal(again.data.order.orderId, first.data.order.orderId);
    const id = first.data.order.orderId;
    assert.equal((await post(`/orders/${id}/mark-transferred`, { confirmed: true })).status, 200);
    assert.equal((await post(`/orders/${id}/cancel`, { confirmNotTransferred: true })).status, 409);
    assert.equal((await testModels.SubscriptionOrder.findOne({ orderId: id }).lean()).status, 'pending');
  } finally {
    await new Promise(resolve => listener.close(resolve));
    if (prior === undefined) delete process.env.EMAIL_VERIFICATION_REQUIRED; else process.env.EMAIL_VERIFICATION_REQUIRED = prior;
  }
});

test('existing mentor explicitly accepts a new agreement once before receiving new work', async () => {
  const account = models.MentorAccount.rows.find(item => item.id === 'mentor');
  account.mentorAgreementVersion = 'old-version';
  account.mentorAgreementAcceptedAt = new Date(0);
  const beforeState = await request('/state', 'mentor');
  assert.equal(beforeState.data.mentorAgreement.accepted, false);
  assert.equal(beforeState.data.mentors.find(item => item.id === 'mentor').eligible, false);
  assert.equal((await request('/mentor/agreement', 'mentor', { accepted: false })).status, 422);
  const accepted = await request('/mentor/agreement', 'mentor', { accepted: true });
  assert.equal(accepted.status, 200);
  assert.equal(accepted.data.version, MENTOR_AGREEMENT_VERSION);
  assert.equal((await request('/state', 'mentor')).data.mentorAgreement.accepted, true);
  assert.equal(account.mentorAgreementHistory.length, 1);
  assert.equal((await request('/mentor/agreement', 'mentor', { accepted: true })).status, 200);
  assert.equal(account.mentorAgreementHistory.length, 1);
});

test('unapproved mentor cannot start or finish an assigned review, so no fee is credited', async () => {
  const id = 'approval-gate-job';
  await models.ReviewSubmission.create({ id, userId: 'student', mentorId: 'mentor', challengeId: 'approval-gate-challenge', mode: 'human', status: 'queued', paidAtSubmission: true });
  const profile = models.ReviewerProfile.rows.find(item => item.mentorId === 'mentor');
  profile.application.status = 'suspended';
  try {
    assert.equal((await request(`/submissions/${id}/start`, 'mentor', {})).status, 403);
    models.ReviewSubmission.rows.find(item => item.id === id).status = 'in_review';
    assert.equal((await request(`/submissions/${id}/review`, 'mentor', review(CHALLENGES[0].id))).status, 403);
    assert.equal((await models.ReviewSubmission.findOne({ id }).lean()).reward, undefined);
  } finally { profile.application.status = 'approved'; }
});

test('mentor can save a payout account, while a student cannot change it', async () => {
  const bankInfo = { bankName: 'TPBank', accountNumber: '33313052004', accountHolder: 'NGUYEN SY HUY' };
  assert.equal((await request('/mentor/payout-account', 'student', bankInfo, 'PUT')).status, 403);
  assert.equal((await request('/mentor/payout-account', 'mentor', { ...bankInfo, accountNumber: 'invalid' }, 'PUT')).status, 422);
  assert.equal((await request('/mentor/payout-account', 'mentor', bankInfo, 'PUT')).status, 200);
  assert.deepEqual((await request('/state', 'mentor')).data.payoutAccount, bankInfo);
  assert.equal((await request('/state', 'student')).data.payoutAccounts.length, 0);
  assert.equal((await models.ReviewSubmission.findOne({ id: submissionId }).lean()).reward.payoutLog.accountNumber, '123456789');
});
