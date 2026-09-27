import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import express from 'express';
import { createApiAccessMiddleware } from './api-access.js';

const app = express();
app.use(express.json());
app.use((req, _res, next) => {
  const role = req.get('x-test-role');
  if (role) req.session = { user: { id: req.get('x-test-id') || 'test-user', role } };
  next();
});
app.use('/api', createApiAccessMiddleware(['https://portfolio.example']));
app.get('/api/challenges', (_req, res) => res.json({ ok: true }));
app.get('/api/workflow/catalog', (_req, res) => res.json({ ok: true }));
app.get('/api/workflow/state', (req, res) => res.status(req.session ? 200 : 401).json({ ok: Boolean(req.session) }));
app.post('/api/auth/login', (_req, res) => res.json({ ok: true }));
app.post('/api/inquiries', (_req, res) => res.status(201).json({ ok: true }));
app.post('/api/reviews', (req, res) => res.status(req.session?.user.role === 'admin' ? 201 : 202).json({ ok: true }));
app.post('/api/users/:id/joined-challenges', (_req, res) => res.json({ ok: true }));
app.put('/api/users/:id', (req, res) => res.json({ body: req.body }));

let server, base;
before(async () => {
  server = app.listen(0, '127.0.0.1');
  await new Promise(resolve => server.once('listening', resolve));
  base = `http://127.0.0.1:${server.address().port}/api`;
});
after(() => new Promise(resolve => server.close(resolve)));

async function request(path, { method = 'GET', role, id, origin, body } = {}) {
  const response = await fetch(`${base}${path}`, {
    method,
    headers: {
      ...(role ? { 'x-test-role': role, 'x-test-id': id || 'test-user' } : {}),
      ...(origin ? { origin } : {}),
      ...(body === undefined ? {} : { 'content-type': 'application/json' })
    },
    ...(body === undefined ? {} : { body: JSON.stringify(body) })
  });
  return { status: response.status, data: await response.json() };
}

test('public reads, catalog and auth remain reachable while protected writes require an account', async () => {
  assert.equal((await request('/challenges')).status, 200);
  assert.equal((await request('/workflow/catalog')).status, 200);
  assert.equal((await request('/workflow/state')).status, 401);
  assert.equal((await request('/workflow/state', { role: 'student' })).status, 200);
  assert.equal((await request('/auth/login', { method: 'POST' })).status, 200);
  assert.equal((await request('/challenges', { method: 'POST' })).status, 401);
});

test('students may submit a verified testimonial for moderation; mentors cannot submit as students', async () => {
  assert.equal((await request('/reviews', { method: 'POST', role: 'student' })).status, 202);
  assert.equal((await request('/reviews', { method: 'POST', role: 'mentor' })).status, 403);
  assert.equal((await request('/reviews', { method: 'POST', role: 'admin' })).status, 201);
});

test('unsafe cross-site requests are blocked, allowed-site inquiries stay public', async () => {
  assert.equal((await request('/inquiries', { method: 'POST', origin: 'https://attacker.example' })).status, 403);
  assert.equal((await request('/inquiries', { method: 'POST', origin: 'https://portfolio.example' })).status, 201);
});

test('students can update only their own profile fields and joined challenges', async () => {
  const own = await request('/users/student-1', { method: 'PUT', role: 'student', id: 'student-1', body: { name: 'Updated', role: 'admin', status: 'active' } });
  assert.deepEqual(own.data.body, { name: 'Updated' });
  assert.equal((await request('/users/student-2', { method: 'PUT', role: 'student', id: 'student-1' })).status, 403);
  assert.equal((await request('/users/student-1/joined-challenges', { method: 'POST', role: 'student', id: 'student-1' })).status, 200);
});
