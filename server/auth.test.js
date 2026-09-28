import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import express from 'express';
import session from 'express-session';
import bcrypt from 'bcryptjs';
import { createAuthRouter } from './auth.js';
import { MENTOR_AGREEMENT_VERSION } from '../shared/mentorAgreement.js';

const makeModel = () => {
  const records = [];
  return {
    records,
    async findOne(query) { return records.find(row => Object.entries(query).every(([k, v]) => v && typeof v === 'object' && !(v instanceof Date) ? ('$lt' in v ? row[k] < v.$lt : '$gt' in v ? row[k] > v.$gt : false) : row[k] === v)) ?? null; },
    async create(data) { records.push({ ...data }); return records.at(-1); },
    async updateOne(query, update) {
      const row = await this.findOne(query); if (!row) return { matchedCount: 0 };
      Object.assign(row, update.$set || Object.fromEntries(Object.entries(update).filter(([key]) => !key.startsWith('$'))));
      for (const key of Object.keys(update.$unset || {})) delete row[key];
      for (const [key, value] of Object.entries(update.$inc || {})) row[key] = (row[key] || 0) + value;
      return { matchedCount: 1 };
    },
    async deleteOne(query) { const index = records.findIndex(row => Object.entries(query).every(([key, value]) => row[key] === value)); if (index >= 0) records.splice(index, 1); }
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
  ...student(email), role: 'mentor', acceptedMentorAgreement: true, title: 'Product Designer', company: 'Studio kiểm thử',
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
  assert.equal(result.data.user.mentorAgreementVersion, MENTOR_AGREEMENT_VERSION);
  assert.ok(result.data.user.mentorAgreementAcceptedAt);
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
  const noAgreement = await request('/register', { ...mentor('missing-agreement@example.test'), acceptedMentorAgreement: false });
  assert.equal(noAgreement.status, 400);
  assert.ok(noAgreement.data.fieldErrors.acceptedMentorAgreement);
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
test('repeated failed login attempts are rate limited and successful login clears the counter', async () => {
  const failed = [];
  for (let index = 0; index < 11; index += 1) {
    failed.push(await request('/login', { email: 'throttled@example.test', password: 'WrongPass123' }));
  }
  assert.deepEqual(failed.slice(0, 10).map(result => result.status), Array(10).fill(401));
  assert.equal(failed[10].status, 429);
  assert.equal(failed[10].cookie, undefined);
  const valid = await request('/login', { email: 'student@example.test', password: 'Testing123' });
  assert.equal(valid.status, 200);
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

test('production email verification issues a short-lived OTP and only creates a session after a valid code', async () => {
  const Users = makeModel(), Mentors = makeModel(), Admins = makeModel();
  let sentCode = '';
  const app = express(); app.use(express.json());
  app.use(session({ name: 'otp.sid', secret: 'test-only-session-secret', resave: false, saveUninitialized: false }));
  app.use('/api/auth', createAuthRouter({ UserProfile: Users, MentorAccount: Mentors, AdminAccount: Admins, verificationRequired: true, sendVerificationEmail: async (_to, code) => { sentCode = code; } }));
  const otpServer = app.listen(0, '127.0.0.1'); await new Promise(resolve => otpServer.once('listening', resolve));
  const otpBase = `http://127.0.0.1:${otpServer.address().port}/api/auth`;
  const call = async (path, body) => { const response = await fetch(otpBase + path, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(body) }); return { status: response.status, data: await response.json(), cookie: response.headers.get('set-cookie') }; };
  try {
    const registered = await call('/register', student('otp@example.test'));
    assert.equal(registered.status, 202); assert.equal(registered.data.verificationRequired, true); assert.match(sentCode, /^\d{6}$/);
    assert.equal((await call('/login', { email: 'otp@example.test', password: 'Testing123' })).status, 403);
    const wrongCode = String((Number(sentCode) + 1) % 1_000_000).padStart(6, '0');
    assert.equal((await call('/verify-email', { email: 'otp@example.test', code: wrongCode })).status, 400);
    const verified = await call('/verify-email', { email: 'otp@example.test', code: sentCode });
    assert.equal(verified.status, 200); assert.equal(verified.data.type, 'student'); assert.ok(verified.cookie);
    assert.equal(Users.records[0].emailVerified, true); assert.equal(Users.records[0].verificationCodeHash, undefined);
    assert.equal((await call('/verify-email', { email: 'otp@example.test', code: sentCode })).status, 400);
  } finally { await new Promise(resolve => otpServer.close(resolve)); }
});
test('password change checks old password and saves a hash of new password', async () => {
  const login = await request('/login', { email: 'student@example.test', password: 'Testing123' });
  assert.equal((await request('/change-password', { currentPassword: 'wrong', newPassword: 'Changed123' }, login.cookie)).status, 400);
  const result = await request('/change-password', { currentPassword: 'Testing123', newPassword: 'Changed123' }, login.cookie);
  assert.equal(result.status, 200);
  assert.equal((await request('/login', { email: 'student@example.test', password: 'Testing123' })).status, 401);
  assert.equal((await request('/login', { email: 'student@example.test', password: 'Changed123' })).status, 200);
});

test('email password reset recovers admin access and never exposes or reuses a code', async () => {
  const Users = makeModel(), Mentors = makeModel(), Admins = makeModel();
  let sentCode = '', sentPurpose = '';
  await Admins.create({ id: 'recovery-admin', name: 'Quản trị', email: 'recovery@example.test', status: 'active', passwordHash: await bcrypt.hash('OldPassword123', 4) });
  const app = express(); app.use(express.json());
  app.use(session({ name: 'recovery.sid', secret: 'test-only-session-secret', resave: false, saveUninitialized: false }));
  app.use('/api/auth', createAuthRouter({ UserProfile: Users, MentorAccount: Mentors, AdminAccount: Admins, sendVerificationEmail: async (_to, code, _name, purpose) => { sentCode = code; sentPurpose = purpose; } }));
  const resetServer = app.listen(0, '127.0.0.1'); await new Promise(resolve => resetServer.once('listening', resolve));
  const call = async (path, body) => { const response = await fetch(`http://127.0.0.1:${resetServer.address().port}/api/auth${path}`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(body) }); return { status: response.status, data: await response.json() }; };
  try {
    const unknown = await call('/forgot-password', { email: 'unknown@example.test' });
    const requested = await call('/forgot-password', { email: 'RECOVERY@example.test' });
    assert.equal(requested.status, 200);
    assert.equal(requested.data.message, unknown.data.message);
    assert.equal(sentPurpose, 'password-reset');
    assert.match(sentCode, /^\d{6}$/);
    assert.equal(requested.data.code, undefined);
    assert.equal(Admins.records[0].resetCodeHash.includes(sentCode), false);
    const wrong = String((Number(sentCode) + 1) % 1_000_000).padStart(6, '0');
    assert.equal((await call('/reset-password', { email: 'recovery@example.test', code: wrong, newPassword: 'NewPassword123' })).status, 400);
    assert.equal(Admins.records[0].resetAttempts, 1);
    assert.equal((await call('/reset-password', { email: 'recovery@example.test', code: sentCode, newPassword: 'NewPassword123' })).status, 200);
    assert.equal((await call('/reset-password', { email: 'recovery@example.test', code: sentCode, newPassword: 'AnotherPass123' })).status, 400);
    assert.equal((await call('/login', { email: 'recovery@example.test', password: 'OldPassword123' })).status, 401);
    const login = await call('/login', { email: 'recovery@example.test', password: 'NewPassword123' });
    assert.equal(login.status, 200);
    assert.equal(login.data.type, 'admin');
    assert.equal(login.data.user.resetCodeHash, undefined);
  } finally { await new Promise(resolve => resetServer.close(resolve)); }
});
