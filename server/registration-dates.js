import { DEMO_BATCH } from './demo-users.js';

const START = Date.UTC(2026, 9, 3);
const END = Date.UTC(2026, 9, 16);

export function inRequestedWindow(value) {
  const time = new Date(value).getTime();
  return Number.isFinite(time) && time >= START && time < END;
}

export function demoRegistrationDate(id) {
  const index = Number(String(id).match(/^demo-beelearn-(\d{3})$/)?.[1]);
  if (!Number.isInteger(index) || index < 1 || index > 63) return null;
  return new Date(Date.UTC(2026, 9, 3 + ((index - 1) % 13), 1 + (index % 13), (index * 7) % 60));
}

export function missingRealRegistrationDate(profile) {
  for (const observed of [profile.termsAcceptedAt, profile._id?.getTimestamp?.()]) {
    if (inRequestedWindow(observed)) return { date: new Date(observed), estimated: false };
  }
  // Older records have no reliable registration timestamp. Keep the estimate identifiable in data.
  const id = String(profile.id || profile._id || '');
  const hash = [...id].reduce((value, letter) => (value * 31 + letter.charCodeAt(0)) >>> 0, 17);
  return { date: new Date(Date.UTC(2026, 9, 3 + (hash % 13), 1 + ((hash >>> 4) % 13), hash % 60)), estimated: true };
}

export async function alignRegistrationDates({ UserProfile, ReviewSubmission }) {
  const profiles = await UserProfile.find({}, { id: 1, demoBatch: 1, createdAt: 1, termsAcceptedAt: 1 }).lean();
  const demoUpdates = [];
  const missingRealUpdates = [];
  const demoSubmissionUpdates = [];
  let estimatedReal = 0;
  for (const profile of profiles) {
    if (profile.demoBatch === DEMO_BATCH) {
      const date = demoRegistrationDate(profile.id);
      if (!date) continue;
      if (new Date(profile.createdAt).getTime() !== date.getTime()) {
        demoUpdates.push({ updateOne: { filter: { _id: profile._id, demoBatch: DEMO_BATCH }, update: { $set: { createdAt: date } } } });
      }
      demoSubmissionUpdates.push({ updateOne: { filter: { id: `demo-submission-${String(profile.id).split('-').at(-1)}`, userId: profile.id, demoBatch: DEMO_BATCH }, update: { $set: { createdAt: new Date(date.getTime() + 60 * 60_000), updatedAt: new Date(date.getTime() + 3 * 60 * 60_000) } } } });
      continue;
    }
    if (profile.createdAt != null && Number.isFinite(new Date(profile.createdAt).getTime())) continue;
    const { date, estimated } = missingRealRegistrationDate(profile);
    if (estimated) estimatedReal++;
    missingRealUpdates.push({ updateOne: { filter: { _id: profile._id, $or: [{ createdAt: { $exists: false } }, { createdAt: null }, { createdAt: '' }] }, update: { $set: { createdAt: date, ...(estimated ? { registrationDateEstimated: true } : {}) } } } });
  }
  if (demoUpdates.length) await UserProfile.bulkWrite(demoUpdates, { timestamps: false });
  if (missingRealUpdates.length) await UserProfile.bulkWrite(missingRealUpdates, { timestamps: false });
  if (demoSubmissionUpdates.length) await ReviewSubmission.bulkWrite(demoSubmissionUpdates, { timestamps: false });
  const demoOutsideWindow = await UserProfile.countDocuments({ demoBatch: DEMO_BATCH, $or: [{ createdAt: { $lt: new Date(START) } }, { createdAt: { $gte: new Date(END) } }, { createdAt: { $exists: false } }, { createdAt: null }] });
  const remainingMissingReal = await UserProfile.countDocuments({ demoBatch: { $ne: DEMO_BATCH }, $or: [{ createdAt: { $exists: false } }, { createdAt: null }, { createdAt: '' }] });
  console.log(`Registration dates 2026-10-03..15: demos=${demoUpdates.length} realMissing=${missingRealUpdates.length} realEstimated=${estimatedReal} demoOutsideWindow=${demoOutsideWindow} remainingMissingReal=${remainingMissingReal}`);
  return { demoUpdated: demoUpdates.length, realMissingUpdated: missingRealUpdates.length, estimatedReal, demoOutsideWindow, remainingMissingReal };
}
