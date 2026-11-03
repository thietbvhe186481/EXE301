import { test } from 'node:test';
import assert from 'node:assert/strict';
import { buildAdminAnalytics, vietnamDay } from './admin-analytics.js';

test('Vietnam date bucketing respects midnight and separates real submissions, ratings and testimonials', () => {
  assert.equal(vietnamDay('2026-10-21T18:00:00Z'), '2026-10-22');
  const report = buildAdminAnalytics({
    now: '2026-10-22T10:00:00+07:00', days: 7,
    students: [{ role: 'student', createdAt: '2026-10-21T18:00:00Z' }, { role: 'student', createdAt: '2026-10-20T00:00:00Z' }, { role: 'student', demoData: true, createdAt: '2026-10-22T00:00:00Z' }],
    mentors: [{ createdAt: '2026-10-22T00:00:00Z' }],
    submissions: [
      { status: 'draft', createdAt: '2026-10-22T00:00:00Z' },
      { status: 'completed', queuedAt: '2026-10-21T18:00:00Z', rating: { stars: 5, at: '2026-10-22T02:00:00Z' } },
      { status: 'completed', queuedAt: '2026-10-20T00:00:00Z', rating: { stars: 2, at: '2026-10-22T02:00:00Z' } },
      { status: 'completed', queuedAt: '2026-10-22T00:00:00Z', demoData: true, rating: { stars: 5, at: '2026-10-22T02:00:00Z' } }
    ],
    reviews: [{ studentId: 's1', status: 'approved', rating: 5 }, { status: 'approved', rating: 5 }, { studentId: 's2', status: 'pending', rating: 5 }]
  });
  assert.deepEqual(report.totals, { students: 2, mentors: 1, submissions: 2, completed: 2, ratedMentorReviews: 2, positiveMentorReviews: 1, approvedTestimonials: 1, positiveTestimonials: 1 });
  assert.deepEqual(report.series.at(-1), { date: '2026-10-22', students: 1, mentors: 1, submissions: 1, positiveRatings: 1, cumulativeStudents: 2 });
});

test('revenue counts completed payments by Vietnam activation day and separates payouts', () => {
  const report = buildAdminAnalytics({ now: '2026-11-03T12:00:00+07:00', days: 7, orders: [
    { status: 'completed', price: 79000, activatedAt: '2026-11-02T18:00:00Z', planId: 'month' },
    { status: 'cancelled', price: 199000, activatedAt: '2026-11-03T00:00:00Z' },
    { status: 'completed', price: 499000, demoData: true, activatedAt: '2026-11-03T00:00:00Z' },
    { status: 'completed', price: 199000 }
  ], submissions: [{ reward: { paid: true, paidAt: '2026-11-03T00:00:00Z', payoutLog: { amount: 5000 } } }] });
  assert.equal(report.revenue.total, 278000);
  assert.equal(report.revenue.period, 79000);
  assert.equal(report.revenue.orders, 1);
  assert.equal(report.revenue.series.at(-1).revenue, 79000);
  assert.equal(report.revenue.mentorPaid, 5000);
  assert.equal(report.revenue.undatedOrders, 1);
});
