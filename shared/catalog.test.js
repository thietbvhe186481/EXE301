import test from 'node:test';
import assert from 'node:assert/strict';
import { CHALLENGES, SPECIALIZATIONS } from './catalog.js';
import { EXPANDED_BRIEFS } from './expandedChallenges.js';

test('every narrow specialization has a useful progression and access mix', () => {
  assert.ok(CHALLENGES.length >= 90);
  assert.equal(new Set(CHALLENGES.map(item => item.id)).size, CHALLENGES.length);
  for (const specialization of SPECIALIZATIONS) {
    const items = CHALLENGES.filter(item => item.specializationKey === specialization.key);
    assert.ok(items.length >= 5, specialization.key);
    assert.deepEqual(new Set(items.map(item => item.level)), new Set(['beginner', 'intermediate', 'advanced']), specialization.key);
    assert.ok(items.some(item => item.access === 'free'), specialization.key);
    assert.ok(items.some(item => item.access === 'premium'), specialization.key);
  }
});

test('new briefs have source attribution, task-specific evidence and a complete rubric', () => {
  for (const [key, rows] of Object.entries(EXPANDED_BRIEFS)) {
    for (const [slug] of rows) {
      const item = CHALLENGES.find(challenge => challenge.id === `practice-${key}-${slug}`);
      assert.ok(item, `${key}/${slug}`);
      assert.equal(item.requirements.length, 3);
      assert.equal(item.rubric.reduce((sum, criterion) => sum + criterion.weight, 0), 100);
      assert.ok(item.rubric.every(criterion => criterion.expectation.length > 35 && criterion.anchors.strong.includes(criterion.expectation)));
      assert.ok(item.submission.label && item.submission.evidence && item.submission.taskEvidence);
      assert.ok(item.source.url.startsWith('https://www.coursera.org/'));
      assert.ok(item.curriculum.url.startsWith('https://daihoc.fpt.edu.vn/'));
    }
  }
});
