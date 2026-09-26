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
export const ReviewSubmission = mongoose.models.ReviewSubmission || mongoose.model('ReviewSubmission', submission);
export const ReviewerProfile = mongoose.models.ReviewerProfile || mongoose.model('ReviewerProfile', profile);
