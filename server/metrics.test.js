import { test } from 'node:test';
import assert from 'node:assert/strict';
import { buildMentorMetrics, buildPlatformMetrics } from './metrics.js';

test('platform metrics use persisted student, eligible mentor, submission and rating data', () => {
  const result = buildPlatformMetrics({
    students: [{ selectedMajorKey: 'dev' }, { majorKey: 'design' }, { selectedMajorKey: 'mkt' }],
    mentors: [{ id: 'approved', status: 'active' }, { id: 'pending', status: 'active' }, { id: 'suspended', status: 'suspended' }],
    reviewerProfiles: [
      { mentorId: 'approved', available: true, application: { status: 'approved' } },
      { mentorId: 'pending', available: true, application: { status: 'pending' } }
    ],
    legacySubmissions: [{ userId: 's1', challengeId: 'c1', status: 'reviewed' }],
    workflowSubmissions: [
      { userId: 's1', challengeId: 'c1', status: 'completed', mode: 'human', mentorId: 'approved', rating: { stars: 4 } },
      { userId: 's2', challengeId: 'c2', status: 'completed', mode: 'human', mentorId: 'approved', rating: { stars: 5 } },
      { userId: 's3', challengeId: 'c3', status: 'queued' }
    ]
  });
  assert.equal(result.currentUserCount, 3);
  assert.equal(result.progressPercent, 1);
  assert.equal(result.activeMentors, 1);
  assert.equal(result.completedSubmissions, 2);
  assert.equal(result.ratingAvg, 4.5);
  assert.equal(result.ratingCount, 2);
  assert.deepEqual(result.breakdown, { dev: 1, mkt: 1, design: 1 });
});

test('no ratings or students produce honest zero values rather than demo statistics', () => {
  const result = buildPlatformMetrics({ students: [], mentors: [], reviewerProfiles: [] });
  assert.equal(result.currentUserCount, 0);
  assert.equal(result.activeMentors, 0);
  assert.equal(result.completedSubmissions, 0);
  assert.equal(result.ratingAvg, 0);
  assert.equal(result.ratingCount, 0);
  assert.deepEqual(result.breakdown, { dev: 0, mkt: 0, design: 0 });
});

test('mentor pay and rating metrics come only from completed human reviews', () => {
  const result = buildMentorMetrics([{ id: 'm1', rating: 4.9, pendingPayout: 900000 }], [
    { mentorId: 'm1', mode: 'human', status: 'completed', rating: { stars: 5 }, reward: { base: 5000, bonus: 1250 } },
    { mentorId: 'm1', mode: 'human', status: 'completed', reward: { base: 5000, bonus: 0, paid: true } },
    { mentorId: 'm1', mode: 'ai', status: 'completed', reward: { base: 5000 } },
    { mentorId: 'm1', mode: 'human', status: 'queued', reward: { base: 5000 } }
  ])[0];
  assert.equal(result.rating, 5);
  assert.equal(result.ratingCount, 1);
  assert.equal(result.completedReviewsCount, 2);
  assert.equal(result.totalEarnings, 11250);
  assert.equal(result.pendingPayout, 6250);
  assert.equal(result.reviewStatus, 'pending');
});

test('mentor moderation state follows approved application and actual rating quality', () => {
  const rows = buildMentorMetrics(
    [{ id: 'approved', status: 'active' }, { id: 'pending', status: 'active' }],
    Array.from({ length: 5 }, (_, index) => ({ mentorId: 'approved', mode: 'human', status: 'completed', rating: { stars: index < 4 ? 1 : 2 } })),
    [
      { mentorId: 'approved', available: true, application: { status: 'approved' } },
      { mentorId: 'pending', available: true, application: { status: 'pending' } }
    ]
  );
  assert.equal(rows[0].reviewStatus, 'disqualified');
  assert.equal(rows[1].reviewStatus, 'pending');
});
