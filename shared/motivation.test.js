import test from 'node:test';
import assert from 'node:assert/strict';
import { pointsForChallenge, summarizeMotivation } from './motivation.js';

const catalog = [
  { id: 'a', level: 'beginner', specializationKey: 'frontend', access: 'free' },
  { id: 'b', level: 'intermediate', specializationKey: 'backend', access: 'premium' },
  { id: 'c', level: 'advanced', specializationKey: 'data', access: 'free' }
];

test('points reward first valid submission only, irrespective of paid access or revisions', () => {
  assert.equal(pointsForChallenge(catalog[0]), 40);
  assert.equal(pointsForChallenge(catalog[1]), 70);
  assert.equal(pointsForChallenge(catalog[2]), 110);
  const progress = summarizeMotivation([
    { challengeId: 'a', status: 'draft' },
    { challengeId: 'a', status: 'completed', mode: 'ai', revision: 5 },
    { challengeId: 'a', status: 'completed', mode: 'human', revision: 6 },
    { challengeId: 'b', status: 'cancelled' },
    { challengeId: 'missing', status: 'completed' }
  ], catalog);
  assert.equal(progress.totalPoints, 40);
  assert.equal(progress.submittedCount, 1);
  assert.equal(progress.level, 1);
  assert.equal(progress.pointsToNextLevel, 80);
  assert.equal(progress.stickers.find(item => item.id === 'first-step').earned, true);
  assert.equal(progress.stickers.find(item => item.id === 'steady-bee').earned, false);
});

test('progress and stickers follow persisted, distinct challenge records', () => {
  const progress = summarizeMotivation([
    { challengeId: 'a', status: 'completed', mode: 'ai' },
    { challengeId: 'b', status: 'queued', mode: 'human' },
    { challengeId: 'c', status: 'completed', mode: 'human' }
  ], catalog);
  assert.equal(progress.totalPoints, 220);
  assert.equal(progress.level, 2);
  assert.equal(progress.reviewedCount, 1);
  assert.equal(progress.pointsToNextLevel, 80);
  assert.ok(progress.stickers.every(item => item.earned));
  assert.equal(summarizeMotivation([], catalog).totalPoints, 0);
});
