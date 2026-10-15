import assert from 'node:assert/strict';
import test from 'node:test';
import { DEMO_CANDIDATES, planDemoSeed } from './demo-users.js';
import { ReviewSubmission } from './workflow-models.js';

test('fills only the gap to 63 and never changes existing users', () => {
  for (const count of [26, 27]) {
    const existing = Array.from({ length: count }, (_, index) => ({ id: `real-${index}`, email: `student-${index}@example.org` }));
    const before = structuredClone(existing);
    const additions = planDemoSeed(existing);
    assert.equal(additions.length, 63 - count);
    assert.equal(existing.length + additions.length, 63);
    assert.deepEqual(existing, before);
  }
  assert.deepEqual(planDemoSeed(Array.from({ length: 63 }, (_, index) => ({ id: `real-${index}` }))), []);
});

test('demo identities and evidence are unique, non-login, and visibly synthetic', () => {
  assert.ok(ReviewSubmission.schema.path('demoData'));
  assert.ok(ReviewSubmission.schema.path('demoBatch'));
  assert.equal(new Set(DEMO_CANDIDATES.map(item => item.user.id)).size, 63);
  assert.equal(new Set(DEMO_CANDIDATES.map(item => item.user.email)).size, 63);
  assert.equal(new Set(DEMO_CANDIDATES.map(item => item.user.name)).size, 63);
  assert.ok(DEMO_CANDIDATES.every(({ user, submission, artifact }) => user.email.endsWith('@example.com')
    && user.demoData && user.status === 'unverified' && !user.emailVerified && !user.passwordHash
    && !user.isPublic && submission.demoData && submission.userId === user.id && artifact.id === user.id));
  assert.ok(DEMO_CANDIDATES.some(({ submission }) => submission.status === 'completed'));
  assert.ok(DEMO_CANDIDATES.some(({ submission }) => submission.status === 'draft'));
  assert.ok(DEMO_CANDIDATES.filter(({ submission }) => submission.status === 'completed')
    .every(({ submission }) => submission.links[0]?.startsWith('https://portfolio.id.vn/demo-work.html?id=')));
});
