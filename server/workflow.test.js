import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import express from 'express';
import { createWorkflowRouter, mentorSummary, hasPaidAccess } from './workflow.js';
import { CHALLENGES, scoreReview, qualityFromRatings, readinessCheck } from '../shared/catalog.js';
import { generateAiAdvice } from './ai-review.js';

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
    await models.MentorAccount.create({ id, name: id, status: 'active', expertise: ['React'] });
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
  for (const item of CHALLENGES) { assert.equal(item.rubric.reduce((sum, criterion) => sum + criterion.weight, 0), 100); assert.match(item.source.url, /^https:\/\/www.coursera.org\//); }
  assert.equal((await request('/state')).status, 401);
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
  assert.equal((await request(`/admin/payouts/${submissionId}`, 'admin', { reference: 'BANK-001' })).status, 409);
  const results = await Promise.all([request(`/submissions/${submissionId}/rating`, 'student', { stars: 5 }), request(`/submissions/${submissionId}/rating`, 'student', { stars: 4 })]);
  assert.deepEqual(results.map(item => item.status).sort(), [200, 409]);
  const voted = results.find(item => item.status === 200).data.submission;
  assert.equal(voted.reward.bonus, voted.rating.stars === 5 ? 1250 : 750);
  assert.equal((await request(`/admin/payouts/${submissionId}`, 'mentor', { reference: 'BANK-001' })).status, 403);
  assert.equal((await request(`/admin/payouts/${submissionId}`, 'admin', { reference: 'BANK-001' })).status, 200);
  assert.equal((await request(`/admin/payouts/${submissionId}`, 'admin', { reference: 'BANK-002' })).status, 409);
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
      return { ok: true, json: async () => ({ status: 'completed', output: [{ content: [{ type: 'output_text', text: JSON.stringify({ summary: 'Cần bổ sung minh chứng.', improvements: ['Nêu cách kiểm thử.'] }) }] }] }) };
    });
    assert.equal(advice.improvements.length, 1);
  } finally {
    if (oldKey === undefined) delete process.env.OPENAI_API_KEY; else process.env.OPENAI_API_KEY = oldKey;
    if (oldModel === undefined) delete process.env.OPENAI_REVIEW_MODEL; else process.env.OPENAI_REVIEW_MODEL = oldModel;
  }
});
