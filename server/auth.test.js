import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import express from 'express';
import session from 'express-session';
import bcrypt from 'bcryptjs';
import { createAuthRouter } from './auth.js';

const makeModel = () => {
  const records = [];
  return {
    records,
    async findOne(query) { return records.find(row => Object.entries(query).every(([k, v]) => row[k] === v)) ?? null; },
    async create(data) { records.push({ ...data }); return records.at(-1); },
    async updateOne(query, update) { Object.assign(await this.findOne(query), update); }
  };
};
const UserProfile = makeModel(), MentorAccount = makeModel(), AdminAccount = makeModel();
let server, base;
before(async () => {
  const app = express();
  app.use(express.json());
  app.use(session({ name: 'portfolio.sid', secret: 'test-only-session-secret', resave: false, saveUninitialized: false }));
  app.use('/api/auth', createAuthRouter({ UserProfile, MentorAccount, AdminAccount }));
  server = app.listen(0, '127.0.0.1');
  await new Promise(resolve => server.once('listening', resolve));
  base = `http://127.0.0.1:${server.address().port}/api/auth`;
});
after(() => new Promise(resolve => server.close(resolve)));
const request = async (path, body, cookie) => {
  const response = await fetch(base + path, {
    method: body === undefined ? 'GET' : 'POST',
    headers: { 'Content-Type': 'application/json', ...(cookie ? { Cookie: cookie } : {}) },
    ...(body === undefined ? {} : { body: JSON.stringify(body) })
  });
  return { status: response.status, data: await response.json(), cookie: response.headers.get('set-cookie')?.split(';')[0], rawCookie: response.headers.get('set-cookie') };
};
const student = (email = 'student@example.test') => ({
  role: 'student', name: 'Sinh viên kiểm thử', email, password: 'Testing123', confirmPassword: 'Testing123',
  acceptedTerms: true, selectedMajorKey: 'design', school: 'Trường kiểm thử'
});
const mentor = (email = 'mentor@example.test') => ({
  ...student(email), role: 'mentor', title: 'Product Designer', company: 'Studio kiểm thử',
  expertise: ['UX Design'], yearsExperience: 5, profileUrl: 'https://example.test/portfolio'
});

test('student registration hashes password, normalizes email, initializes empty profile and creates session', async () => {
  const result = await request('/register', student('  STUDENT@example.test  '));
  assert.equal(result.status, 201);
  assert.equal(result.data.type, 'student');
  assert.equal(result.data.user.email, 'student@example.test');
  assert.deepEqual(result.data.user.path, []);
  assert.equal(result.data.user.selectedMajorKey, 'design');
  assert.equal(result.data.user.passwordHash, undefined);
  assert.equal(result.data.user.password, undefined);
  assert.ok(await bcrypt.compare('Testing123', UserProfile.records[0].passwordHash));
  assert.match(result.rawCookie, /HttpOnly/i);
  const me = await request('/me', undefined, result.cookie);
  assert.equal(me.data.user.id, result.data.user.id);
  assert.equal((await request('/logout', {}, result.cookie)).status, 200);
  assert.equal((await request('/me', undefined, result.cookie)).status, 401);
});
test('mentor registration creates professional profile in mentor collection and authenticates correct role', async () => {
  const result = await request('/register', mentor());
  assert.equal(result.status, 201);
  assert.equal(result.data.type, 'mentor');
  assert.equal(result.data.user.company, 'Studio kiểm thử');
  assert.deepEqual(result.data.user.expertise, ['UX Design']);
  assert.equal(result.data.user.ratingAvg, 0);
  assert.equal((await request('/me', undefined, result.cookie)).data.type, 'mentor');
  const login = await request('/login', { email: 'MENTOR@example.test', password: 'Testing123', rememberMe: true });
  assert.equal(login.data.type, 'mentor');
  assert.notEqual(login.cookie, result.cookie);
});
test('rejects duplicate email across roles including concurrent registrations', async () => {
  assert.equal((await request('/register', mentor('student@example.test'))).status, 409);
  const results = await Promise.all([
    request('/register', student('race@example.test')),
    request('/register', mentor('race@example.test'))
  ]);
  assert.deepEqual(results.map(r => r.status).sort(), [201, 409]);
});
test('validates consent, passwords, role, email and required role-specific fields', async () => {
  for (const [patch, field] of [
    [{ acceptedTerms: false }, 'acceptedTerms'], [{ confirmPassword: 'different' }, 'confirmPassword'],
    [{ role: 'admin' }, 'role'], [{ email: 'invalid' }, 'email'], [{ school: '' }, 'school'],
    [{ password: 'short', confirmPassword: 'short' }, 'password']
  ]) {
    const result = await request('/register', { ...student('invalid@example.test'), ...patch });
    assert.equal(result.status, 400);
    assert.ok(result.data.fieldErrors[field]);
  }
  const result = await request('/register', { ...mentor('invalid@example.test'), expertise: [], profileUrl: 'javascript:alert(1)' });
  assert.equal(result.status, 400);
  assert.ok(result.data.fieldErrors.expertise);
  assert.ok(result.data.fieldErrors.profileUrl);
});
test('wrong credentials never create a session', async () => {
  const result = await request('/login', { email: 'student@example.test', password: 'wrong' });
  assert.equal(result.status, 401);
  assert.equal(result.cookie, undefined);
  assert.equal((await request('/me')).status, 401);
});
test('blocked account cannot log in or reuse an existing session', async () => {
  const result = await request('/register', student('blocked@example.test'));
  const account = await UserProfile.findOne({ email: 'blocked@example.test' });
  account.status = 'suspended';
  assert.equal((await request('/login', { email: account.email, password: 'Testing123' })).status, 403);
  assert.equal((await request('/me', undefined, result.cookie)).status, 401);
});
test('admin can log in through shared form without public admin registration', async () => {
  await AdminAccount.create({ id: 'test-admin', email: 'admin@example.test', passwordHash: await bcrypt.hash('Testing123', 4), status: 'active' });
  const result = await request('/login', { email: 'admin@example.test', password: 'Testing123' });
  assert.equal(result.status, 200);
  assert.equal(result.data.type, 'admin');
});
test('password change checks old password and saves a hash of new password', async () => {
  const login = await request('/login', { email: 'student@example.test', password: 'Testing123' });
  assert.equal((await request('/change-password', { currentPassword: 'wrong', newPassword: 'Changed123' }, login.cookie)).status, 400);
  const result = await request('/change-password', { currentPassword: 'Testing123', newPassword: 'Changed123' }, login.cookie);
  assert.equal(result.status, 200);
  assert.equal((await request('/login', { email: 'student@example.test', password: 'Testing123' })).status, 401);
  assert.equal((await request('/login', { email: 'student@example.test', password: 'Changed123' })).status, 200);
});
