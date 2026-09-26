import mongoose from 'mongoose';
const { Schema } = mongoose;
const submission = new Schema({
  id: { type: String, unique: true, required: true },
  userId: { type: String, required: true, index: true }, studentName: String,
  challengeId: { type: String, required: true }, mentorId: { type: String, default: '', index: true },
  mode: { type: String, enum: ['ai', 'human'], required: true },
  format: { type: String, enum: ['project', 'cv', 'chat'], required: true },
  links: [String], skills: [String], notes: String, linksAccessible: Boolean,
  shareTalent: { type: Boolean, default: false }, paidAtSubmission: Boolean,
  acceptDelay: Boolean, estimatedDays: Number,
  status: { type: String, enum: ['draft', 'queued', 'in_review', 'needs_revision', 'completed', 'cancelled'], required: true, index: true },
  revision: { type: Number, default: 1 },
  review: Schema.Types.Mixed, ai: Schema.Types.Mixed, rating: Schema.Types.Mixed,
  reward: Schema.Types.Mixed,
  queuedAt: Date, reviewedAt: Date,
  messages: { type: [new Schema({ id: String, senderId: String, senderName: String, text: String, at: Date }, { _id: false })], default: [] }
}, { timestamps: true, strict: true });
// A learner has one versioned record per challenge: resubmission cannot mint another reward.
submission.index({ userId: 1, challengeId: 1 }, { unique: true });
const profile = new Schema({
  mentorId: { type: String, required: true, unique: true },
  challengeIds: { type: [String], default: [] },
  capacity: { type: Number, min: 1, max: 20, default: 5 },
  available: { type: Boolean, default: true },
  application: {
    method: { type: String, enum: ['cv', 'chat'] }, profileUrl: String, notes: String,
    status: { type: String, enum: ['pending', 'approved', 'rejected', 'suspended'], default: 'pending' },
    reason: String, submittedAt: Date, reviewedAt: Date
  }
}, { timestamps: true, strict: true });
const complaint = new Schema({
  id: { type: String, required: true, unique: true },
  reporterId: { type: String, required: true, index: true }, reporterRole: { type: String, enum: ['student', 'mentor'], required: true },
  reporterName: String, kind: { type: String, enum: ['review', 'payout', 'account', 'other'], required: true },
  submissionId: { type: String, default: '', index: true }, description: { type: String, required: true },
  status: { type: String, enum: ['open', 'in_review', 'resolved', 'rejected'], default: 'open', index: true },
  resolution: String, resolvedBy: String, resolvedAt: Date
}, { timestamps: true, strict: true });
complaint.index({ reporterId: 1, createdAt: -1 });
export const ReviewSubmission = mongoose.models.ReviewSubmission || mongoose.model('ReviewSubmission', submission);
export const ReviewerProfile = mongoose.models.ReviewerProfile || mongoose.model('ReviewerProfile', profile);
export const Complaint = mongoose.models.WorkflowComplaint || mongoose.model('WorkflowComplaint', complaint);
