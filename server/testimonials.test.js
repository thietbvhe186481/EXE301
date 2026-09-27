import { after, before, test } from 'node:test';
import assert from 'node:assert/strict';
import express from 'express';
import { createTestimonialsRouter } from './testimonials.js';

function query(value) {
  return { sort() { return this; }, lean: async () => value };
}

function createModels({ completed = true, existing = null } = {}) {
  const reviews = existing ? [existing] : [];
  const models = {
    reviews,
    lastPublicFilter: null,
    StudentReview: {
      find(filter) {
        models.lastPublicFilter = filter;
        return query(reviews.filter(row => filter.status ? row.status === filter.status && Boolean(row.studentId) : true));
      },
      findOne(filter) { return query(reviews.find(row => Object.entries(filter).every(([key, value]) => row[key] === value)) || null); },
      async create(row) { reviews.push(row); return row; },
      async findOneAndUpdate(filter, update) {
        const row = reviews.find(item => Object.entries(filter).every(([key, value]) => item[key] === value));
        if (!row) return null;
        Object.assign(row, update.$set);
        row.statusHistory.push(update.$push.statusHistory);
        return row;
      },
      async deleteOne(filter) {
        const index = reviews.findIndex(item => item.id === filter.id);
        if (index < 0) return { deletedCount: 0 };
        reviews.splice(index, 1);
        return { deletedCount: 1 };
      }
    },
    UserProfile: { findOne: () => query({ id: 'student-1', name: 'Nguyễn An', school: 'FPT', selectedMajorKey: 'dev', status: 'active' }) },
    ReviewSubmission: { findOne: () => query(completed ? { status: 'completed' } : null) },
    Submission: { findOne: () => query(null) }
  };
  return models;
}

const models = createModels();
const app = express();
app.use(express.json());
app.use((req, _res, next) => {
  const role = req.get('x-role');
  if (role) req.session = { user: { id: role === 'student' ? 'student-1' : `${role}-1`, role } };
  next();
});
app.use('/api/reviews', createTestimonialsRouter(models));

let server, base;
before(async () => {
  server = app.listen(0, '127.0.0.1');
  await new Promise(resolve => server.once('listening', resolve));
  base = `http://127.0.0.1:${server.address().port}/api/reviews`;
});
after(() => new Promise(resolve => server.close(resolve)));

async function request(path = '', { method = 'GET', role, body } = {}) {
  const response = await fetch(`${base}${path}`, {
    method,
    headers: { ...(role ? { 'x-role': role } : {}), ...(body ? { 'content-type': 'application/json' } : {}) },
    ...(body ? { body: JSON.stringify(body) } : {})
  });
  return { status: response.status, data: await response.json() };
}

test('public list is restricted to approved, account-verified reviews', async () => {
  models.reviews.push(
    { id: 'verified', studentId: 'student-1', status: 'approved' },
    { id: 'legacy', status: 'approved' },
    { id: 'pending', studentId: 'student-2', status: 'pending' }
  );
  const result = await request();
  assert.equal(result.status, 200);
  assert.deepEqual(result.data.map(item => item.id), ['verified']);
  assert.equal(models.lastPublicFilter.status, 'approved');
  assert.equal(models.lastPublicFilter.studentId.$gt, '');
  models.reviews.splice(0, models.reviews.length);
});

test('only an active student with a completed challenge can submit a pending story', async () => {
  const body = { challengeId: 'practice-dev-profile', rating: 5, outcome: 'Đã có bản demo', quote: 'Tôi đã hoàn thành thử thách và biết rõ cần cải thiện phần trình bày sản phẩm.' };
  assert.equal((await request('', { method: 'POST', body })).status, 403);
  assert.equal((await request('', { method: 'POST', role: 'mentor', body })).status, 403);
  const created = await request('', { method: 'POST', role: 'student', body });
  assert.equal(created.status, 202);
  assert.equal(created.data.review.status, 'pending');
  assert.equal(created.data.review.name, 'Nguyễn An');
  assert.equal(created.data.review.studentId, 'student-1');
});

test('submission completion and strict input are enforced', async () => {
  const body = { challengeId: 'practice-dev-profile', rating: 5, outcome: '', quote: 'Đây là một chia sẻ đủ dài để vượt qua kiểm tra đầu vào.' };
  const invalid = await request('', { method: 'POST', role: 'student', body: { ...body, name: 'Spoofed name' } });
  assert.equal(invalid.status, 422);
  const withoutCompletion = createModels({ completed: false });
  const isolated = express();
  isolated.use(express.json());
  isolated.use((req, _res, next) => { req.session = { user: { id: 'student-1', role: 'student' } }; next(); });
  isolated.use(createTestimonialsRouter(withoutCompletion));
  const server2 = isolated.listen(0, '127.0.0.1');
  await new Promise(resolve => server2.once('listening', resolve));
  try {
    const response = await fetch(`http://127.0.0.1:${server2.address().port}/`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(body) });
    assert.equal(response.status, 409);
  } finally {
    await new Promise(resolve => server2.close(resolve));
  }
});

test('only administrators may moderate and public stories do not expose pending rows', async () => {
  const pending = models.reviews.find(row => row.studentId === 'student-1');
  assert.equal((await request(`/${pending.id}/status`, { method: 'PATCH', role: 'student', body: { status: 'approved', reason: 'Đã đọc và phù hợp.' } })).status, 403);
  const approved = await request(`/${pending.id}/status`, { method: 'PATCH', role: 'admin', body: { status: 'approved', reason: 'Đã đọc và phù hợp.' } });
  assert.equal(approved.status, 200);
  const publicRows = await request();
  assert(publicRows.data.some(row => row.id === pending.id));
});
