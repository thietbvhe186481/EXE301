import mongoose from 'mongoose';

function flexibleSchema() {
  return new mongoose.Schema({}, { strict: false, id: false });
}

export const Major = mongoose.model('Major', flexibleSchema());
export const Challenge = mongoose.model('Challenge', flexibleSchema());
export const SubmissionRule = mongoose.model('SubmissionRule', flexibleSchema());
export const UserProfile = mongoose.model('UserProfile', flexibleSchema());
export const MentorFeedback = mongoose.model('MentorFeedback', flexibleSchema());
export const Submission = mongoose.model('Submission', flexibleSchema());
export const AdminAccount = mongoose.model('AdminAccount', flexibleSchema());
export const MentorAccount = mongoose.model('MentorAccount', flexibleSchema());
export const Category = mongoose.model('Category', flexibleSchema());
export const Resource = mongoose.model('Resource', flexibleSchema());
export const Notification = mongoose.model('Notification', flexibleSchema());
