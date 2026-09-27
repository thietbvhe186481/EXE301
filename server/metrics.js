import { qualityFromRatings } from '../shared/catalog.js';

const completed = submission => ['reviewed', 'completed'].includes(submission.status);
const submissionKey = submission => `${submission.userId || ''}:${submission.challengeId || ''}`;

export function buildPlatformMetrics({ students = [], mentors = [], reviewerProfiles = [], legacySubmissions = [], workflowSubmissions = [], target = 300 }) {
  const profilesByMentor = new Map(reviewerProfiles.map(profile => [profile.mentorId, profile]));
  const ratingsByMentor = new Map();
  for (const submission of workflowSubmissions) {
    const stars = submission.status === 'completed' && submission.mode === 'human' ? Number(submission.rating?.stars) : NaN;
    if (!submission.mentorId || !Number.isFinite(stars)) continue;
    const values = ratingsByMentor.get(submission.mentorId) || [];
    values.push(stars);
    ratingsByMentor.set(submission.mentorId, values);
  }
  const activeMentors = mentors.filter(mentor => {
    const profile = profilesByMentor.get(mentor.id);
    return mentor.status === 'active'
      && profile?.application?.status === 'approved'
      && profile.available !== false
      && qualityFromRatings(ratingsByMentor.get(mentor.id) || []).qualityStatus !== 'excluded';
  }).length;
  const uniqueSubmissions = new Map();
  for (const submission of [...legacySubmissions, ...workflowSubmissions]) {
    if (completed(submission)) uniqueSubmissions.set(submissionKey(submission), submission);
  }
  const ratings = workflowSubmissions
    .filter(item => item.status === 'completed' && item.mode === 'human')
    .map(item => Number(item.rating?.stars))
    .filter(stars => Number.isFinite(stars) && stars >= 1 && stars <= 5);
  const countTarget = Number.isFinite(Number(target)) && Number(target) > 0 ? Number(target) : 300;
  const breakdown = { dev: 0, mkt: 0, design: 0 };
  for (const student of students) {
    const major = student.selectedMajorKey || student.majorKey;
    if (Object.hasOwn(breakdown, major)) breakdown[major] += 1;
  }
  return {
    kpiTarget: countTarget,
    currentUserCount: students.length,
    progressPercent: Number((students.length / countTarget * 100).toFixed(1)),
    activeMentors,
    completedSubmissions: uniqueSubmissions.size,
    ratingAvg: ratings.length ? Number((ratings.reduce((sum, value) => sum + value, 0) / ratings.length).toFixed(2)) : 0,
    ratingCount: ratings.length,
    breakdown
  };
}

export function buildMentorMetrics(mentors = [], submissions = [], reviewerProfiles = []) {
  const profilesByMentor = new Map(reviewerProfiles.map(profile => [profile.mentorId, profile]));
  const byMentor = new Map();
  for (const submission of submissions) {
    if (submission.mode !== 'human' || submission.status !== 'completed' || !submission.mentorId) continue;
    const row = byMentor.get(submission.mentorId) || { completedReviewsCount: 0, ratingTotal: 0, ratingCount: 0, ratingValues: [], totalEarnings: 0, pendingPayout: 0 };
    row.completedReviewsCount += 1;
    const stars = Number(submission.rating?.stars);
    if (Number.isFinite(stars) && stars >= 1 && stars <= 5) {
      row.ratingTotal += stars;
      row.ratingCount += 1;
      row.ratingValues.push(stars);
    }
    const reward = submission.reward || {};
    const earned = Math.max(0, Number(reward.base) || 0) + Math.max(0, Number(reward.bonus) || 0);
    row.totalEarnings += earned;
    if (!reward.paid) row.pendingPayout += earned;
    byMentor.set(submission.mentorId, row);
  }
  return mentors.map(mentor => {
    const metric = byMentor.get(mentor.id) || { completedReviewsCount: 0, ratingTotal: 0, ratingCount: 0, ratingValues: [], totalEarnings: 0, pendingPayout: 0 };
    const { ratingTotal, ratingValues, ...publicMetric } = metric;
    const ratingAvg = metric.ratingCount ? Number((ratingTotal / metric.ratingCount).toFixed(2)) : 0;
    const profile = profilesByMentor.get(mentor.id);
    const quality = qualityFromRatings(ratingValues);
    const applicationStatus = profile?.application?.status || 'pending';
    const reviewStatus = quality.qualityStatus === 'excluded' ? 'disqualified'
      : quality.qualityStatus === 'warning' && applicationStatus === 'approved' ? 'warning'
        : applicationStatus === 'approved' && mentor.status === 'active' && profile?.available !== false ? 'active'
          : applicationStatus;
    return { ...mentor, ...publicMetric, ratingAvg, rating: ratingAvg, reviewStatus };
  });
}
