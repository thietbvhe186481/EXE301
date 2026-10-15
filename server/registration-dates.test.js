import assert from 'node:assert/strict';
import test from 'node:test';
import { DEMO_CANDIDATES } from './demo-users.js';
import { alignRegistrationDates, demoRegistrationDate, inRequestedWindow, missingRealRegistrationDate } from './registration-dates.js';

test('every sample registration falls on 3–15 October 2026', () => {
  for (const { user } of DEMO_CANDIDATES) {
    const date = demoRegistrationDate(user.id);
    assert.ok(date);
    assert.ok(inRequestedWindow(date));
    assert.equal(date.getTime(), user.createdAt.getTime());
  }
  assert.equal(demoRegistrationDate('student-real'), null);
  assert.equal(inRequestedWindow('2026-10-16T00:00:00Z'), false);
});

test('missing real date prefers observed registration and identifies estimates', () => {
  const actual = missingRealRegistrationDate({ id: 'student-1', termsAcceptedAt: new Date('2026-10-09T12:00:00Z') });
  assert.equal(actual.estimated, false);
  assert.equal(actual.date.toISOString(), '2026-10-09T12:00:00.000Z');
  const estimate = missingRealRegistrationDate({ id: 'legacy-student' });
  assert.equal(estimate.estimated, true);
  assert.ok(inRequestedWindow(estimate.date));
  assert.equal(estimate.date.getTime(), missingRealRegistrationDate({ id: 'legacy-student' }).date.getTime());
});

test('maintenance changes sample dates and only missing dates on genuine accounts', async () => {
  const userWrites = [];
  const submissionWrites = [];
  const profiles = [
    { _id: 'sample', id: 'demo-beelearn-001', demoBatch: 'beelearn-2026-10', createdAt: new Date('2026-09-03T03:00:00Z') },
    { _id: 'existing', id: 'real-existing', createdAt: new Date('2026-09-20T10:00:00Z') },
    { _id: 'missing', id: 'real-missing', termsAcceptedAt: new Date('2026-10-07T10:00:00Z') }
  ];
  const result = await alignRegistrationDates({
    UserProfile: {
      find: () => ({ lean: async () => profiles }),
      bulkWrite: async operations => userWrites.push(...operations),
      countDocuments: async () => 0
    },
    ReviewSubmission: { bulkWrite: async operations => submissionWrites.push(...operations) }
  });
  assert.equal(result.demoUpdated, 1);
  assert.equal(result.realMissingUpdated, 1);
  assert.equal(result.estimatedReal, 0);
  assert.equal(userWrites.length, 2);
  assert.ok(userWrites.every(item => item.updateOne.filter._id !== 'existing'));
  assert.equal(userWrites.find(item => item.updateOne.filter._id === 'missing').updateOne.update.$set.createdAt.toISOString(), '2026-10-07T10:00:00.000Z');
  assert.equal(submissionWrites.length, 1);
});
