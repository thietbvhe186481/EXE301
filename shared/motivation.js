import { CHALLENGES } from './catalog.js';

const POINTS_BY_LEVEL = Object.freeze({ beginner: 40, intermediate: 70, advanced: 110 });
const LEVELS = Object.freeze([
  { threshold: 0, name: 'Ong mới', stage: 'Ong mới' },
  { threshold: 120, name: 'Ong khám phá', stage: 'Ong khám phá' },
  { threshold: 300, name: 'Ong chăm chỉ', stage: 'Ong chăm chỉ' },
  { threshold: 600, name: 'Ong bền bỉ', stage: 'Ong bền bỉ' },
  { threshold: 1000, name: 'Ong dẫn đường', stage: 'Ong dẫn đường' }
]);
const SUBMITTED = new Set(['queued', 'in_review', 'needs_revision', 'completed']);

export function pointsForChallenge(challenge) {
  return POINTS_BY_LEVEL[challenge?.level] || 0;
}

// A submitted challenge is an activity milestone, not a verified skill score.
// One learner can earn its points only once, even after revisions or AI-to-mentor upgrades.
export function summarizeMotivation(submissions = [], catalog = CHALLENGES) {
  const challenges = new Map(catalog.map(item => [item.id, item]));
  const counted = new Map();
  for (const submission of submissions) {
    if (!SUBMITTED.has(submission?.status)) continue;
    const challenge = challenges.get(submission.challengeId);
    if (challenge && !counted.has(challenge.id)) counted.set(challenge.id, { challenge, submission });
  }

  const items = [...counted.values()];
  const totalPoints = items.reduce((sum, { challenge }) => sum + pointsForChallenge(challenge), 0);
  const currentIndex = LEVELS.findLastIndex(item => totalPoints >= item.threshold);
  const current = LEVELS[Math.max(0, currentIndex)];
  const next = LEVELS[currentIndex + 1];
  const reviewedCount = items.filter(({ submission }) => submission.mode === 'human' && submission.status === 'completed').length;
  const specializations = new Set(items.map(({ challenge }) => challenge.specializationKey).filter(Boolean));
  const stickers = [
    { id: 'first-step', title: 'Bước đầu tiên', description: 'Nộp thử thách đầu tiên', earned: items.length >= 1 },
    { id: 'steady-bee', title: 'Ong chăm chỉ', description: 'Nộp 3 thử thách khác nhau', earned: items.length >= 3 },
    { id: 'explorer', title: 'Khám phá rộng', description: 'Thử sức ở 3 chuyên ngành hẹp', earned: specializations.size >= 3 },
    { id: 'mentor-feedback', title: 'Lắng nghe góp ý', description: 'Hoàn tất 1 lượt review với mentor', earned: reviewedCount >= 1 }
  ];

  return {
    totalPoints,
    level: currentIndex + 1,
    levelName: current.name,
    nextLevelPoints: next?.threshold ?? null,
    pointsToNextLevel: next ? next.threshold - totalPoints : 0,
    submittedCount: items.length,
    reviewedCount,
    beeStage: current.stage,
    stickers
  };
}
