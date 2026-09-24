import mongoose from 'mongoose';

const baseSchemaOptions = {
  timestamps: false,
  strict: false,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
};

// 1. User Profile (Student & General Account)
const UserProfileSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true, index: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true, index: true },
  passwordHash: { type: String, default: '' },
  role: { type: String, enum: ['student', 'mentor', 'admin'], default: 'student' },
  mssv: { type: String, default: '' },
  school: { type: String, default: 'Đại học FPT' },
  majorKey: { type: String, enum: ['dev', 'mkt', 'design'], default: 'dev' },
  specialization: { type: String, default: '' },
  phone: { type: String, default: '' },
  avatar: { type: String, default: '' },
  bio: { type: String, default: '' },
  headline: { type: String, default: '' },
  skills: { type: [String], default: [] },
  isPremium: { type: Boolean, default: false },
  planId: { type: String, default: '' },
  planName: { type: String, default: '' },
  subscriptionExpiresAt: { type: Date },
  status: { type: String, enum: ['active', 'pending', 'suspended', 'graduated'], default: 'active', index: true },
  statusReason: { type: String, default: '' },
  statusHistory: [{
    status: String,
    changedAt: { type: Date, default: Date.now },
    reason: String
  }],
  xp: { type: Number, default: 0 },
  level: { type: Number, default: 1 },
  githubUrl: { type: String, default: '' },
  linkedinUrl: { type: String, default: '' },
  portfolioSlug: { type: String, default: '' },
  isPublic: { type: Boolean, default: true }
}, baseSchemaOptions);

// 2. Mentor Account (Mentors & Reviewers)
const MentorAccountSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true, index: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  passwordHash: { type: String, default: '' },
  title: { type: String, default: 'Senior Tech Mentor' },
  company: { type: String, default: 'FPT Software' },
  avatar: { type: String, default: '' },
  bio: { type: String, default: '' },
  expertise: { type: [String], default: [] },
  hourlyRate: { type: Number, default: 0 },
  ratingAvg: { type: Number, default: 5.0 },
  totalReviews: { type: Number, default: 0 },
  status: { type: String, enum: ['active', 'pending', 'suspended', 'rejected'], default: 'active', index: true },
  statusReason: { type: String, default: '' },
  badge: { type: String, default: 'Top Rated' },
  rewardPoints: { type: Number, default: 0 },
  bankInfo: {
    bankName: { type: String, default: 'MB Bank' },
    accountNumber: { type: String, default: '' },
    accountHolder: { type: String, default: '' }
  }
}, baseSchemaOptions);

// 3. Admin Account
const AdminAccountSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true, index: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  passwordHash: { type: String, default: '' },
  role: { type: String, default: 'admin' },
  status: { type: String, enum: ['active', 'suspended'], default: 'active' }
}, baseSchemaOptions);

// 4. Major Catalog
const MajorSchema = new mongoose.Schema({
  id: { type: String, default: function() { return this.key; } },
  key: { type: String, required: true, unique: true },
  name: { type: String, default: function() { return this.title || this.key; } },
  title: { type: String },
  displayOrder: { type: Number, default: 0 },
  description: { type: String, default: '' },
  tracks: { type: Array, default: [] },
  roles: { type: Array, default: [] },
  status: { type: String, enum: ['active', 'hidden'], default: 'active' }
}, baseSchemaOptions);

// 5. Challenge (FPT & Coursera Practice)
const ChallengeSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true, index: true },
  title: { type: String, required: true },
  majorKey: { type: String, required: true, index: true },
  track: { type: String, default: '' },
  level: { type: String, enum: ['Cơ bản', 'Trung cấp', 'Nâng cao', 'Junior', 'Middle', 'Senior'], default: 'Junior' },
  xp: { type: Number, default: 100 },
  duration: { type: String, default: '2-3 ngày' },
  mentor: { type: String, default: '' },
  mentorId: { type: String, default: '' },
  source: { type: String, enum: ['FPT University', 'Coursera', 'Doanh nghiệp đối tác', 'FPT'], default: 'FPT University' },
  courseCode: { type: String, default: '' },
  summary: { type: String, default: '' },
  brief: { type: String, default: '' },
  requirements: { type: [String], default: [] },
  starterCode: { type: String, default: '' },
  checklist: { type: [String], default: [] },
  status: { type: String, enum: ['active', 'draft', 'archived'], default: 'active', index: true }
}, baseSchemaOptions);

// 6. Student Challenge Submission
const SubmissionSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true, index: true },
  userId: { type: String, required: true, index: true },
  challengeId: { type: String, required: true, index: true },
  majorKey: { type: String, default: 'dev' },
  primaryLink: { type: String, default: '' },
  secondaryLink: { type: String, default: '' },
  skills: { type: [String], default: [] },
  notes: { type: String, default: '' },
  status: { type: String, enum: ['submitted', 'under_review', 'reviewed', 'rejected', 'resubmitted', 'draft'], default: 'submitted', index: true },
  statusHistory: [{
    status: String,
    changedBy: String,
    changedAt: { type: Date, default: Date.now },
    note: String
  }],
  aiScore: { type: Number, default: null },
  mentorScore: { type: Number, default: null },
  passed: { type: Boolean, default: false },
  feedbackId: { type: String, default: '' },
  assignedMentorId: { type: String, default: '' },
  submittedAt: { type: Date, default: Date.now },
  reviewedAt: { type: Date }
}, baseSchemaOptions);

// 7. Mentor Feedback & Rubric Evaluation
const MentorFeedbackSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true, index: true },
  submissionId: { type: String, default: '' },
  userId: { type: String, required: true, index: true },
  challengeId: { type: String, required: true },
  mentorId: { type: String, default: '' },
  mentorName: { type: String, default: '' },
  title: { type: String, default: '' },
  type: { type: String, enum: ['ai', 'mentor', 'peer'], default: 'mentor' },
  overallComment: { type: String, default: function() { return this.title || ''; } },
  rubricScores: {
    cleanCode: { type: Number, default: 8 },
    functionality: { type: Number, default: 8 },
    bestPractices: { type: Number, default: 8 },
    presentation: { type: Number, default: 8 }
  },
  status: { type: String, enum: ['draft', 'published', 'archived'], default: 'published', index: true },
  statusReason: { type: String, default: '' }
}, baseSchemaOptions);

// 8. Student Review & Mentor Rating
const StudentReviewSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true, index: true },
  studentId: { type: String, default: '' },
  name: { type: String, required: true },
  school: { type: String, default: 'Đại học FPT' },
  major: { type: String, default: 'Software Engineering' },
  roleTrack: { type: String, default: 'Developer' },
  mentorId: { type: String, default: '' },
  mentorName: { type: String, default: '' },
  rating: { type: Number, min: 1, max: 5, default: 5 },
  outcome: { type: String, default: '' },
  quote: { type: String, required: true },
  status: { type: String, enum: ['approved', 'pending', 'flagged', 'rejected'], default: 'approved', index: true },
  statusReason: { type: String, default: '' },
  avatarBg: { type: String, default: '#10b981' },
  date: { type: String, default: '' }
}, baseSchemaOptions);

// 9. Subscription / VIP Upgrade Order
const SubscriptionOrderSchema = new mongoose.Schema({
  orderId: { type: String, required: true, unique: true, index: true },
  userId: { type: String, required: true, index: true },
  mssv: { type: String, default: '' },
  planId: { type: String, required: true },
  planName: { type: String, required: true },
  price: { type: Number, required: true },
  paymentMethod: { type: String, default: 'VietQR MB Bank' },
  transactionCode: { type: String, required: true },
  status: { type: String, enum: ['pending', 'completed', 'cancelled', 'refunded'], default: 'completed', index: true },
  statusHistory: [{
    status: String,
    changedAt: { type: Date, default: Date.now },
    note: String
  }],
  activatedAt: { type: Date, default: Date.now },
  expiresAt: { type: Date }
}, baseSchemaOptions);

// 10. Learning Resource & Curriculum
const ResourceSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true, index: true },
  code: { type: String, default: '' },
  title: { type: String, required: true },
  majorKey: { type: String, default: 'dev' },
  majorLabel: { type: String, default: 'Software Engineering' },
  uni: { type: String, default: 'Đại học FPT' },
  format: { type: String, default: 'PDF + Source Code' },
  desc: { type: String, default: '' },
  downloadUrl: { type: String, default: '' },
  status: { type: String, enum: ['active', 'hidden'], default: 'active', index: true }
}, baseSchemaOptions);

// 11. Contact Inquiry & Student Support
const ContactInquirySchema = new mongoose.Schema({
  inquiryId: { type: String, required: true, unique: true, index: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, default: '' },
  message: { type: String, required: true },
  status: { type: String, enum: ['new', 'in_progress', 'resolved', 'closed'], default: 'new', index: true },
  adminNotes: { type: String, default: '' },
  submittedAt: { type: Date, default: Date.now },
  resolvedAt: { type: Date }
}, baseSchemaOptions);

// 12. Founders
const FounderSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  role: { type: String, required: true },
  mssv: { type: String, default: '' },
  bio: { type: String, default: '' },
  avatarType: { type: String, default: 'cute-bear' },
  order: { type: Number, default: 0 },
  status: { type: String, enum: ['active', 'hidden'], default: 'active' }
}, baseSchemaOptions);

// 13. System Notification
const NotificationSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  userId: { type: String, index: true },
  role: { type: String, default: 'student' },
  title: { type: String, required: true },
  message: { type: String, default: '' },
  unread: { type: Boolean, default: true },
  status: { type: String, enum: ['unread', 'read', 'archived'], default: 'unread' }
}, baseSchemaOptions);

// 14. Submission Rule
const SubmissionRuleSchema = new mongoose.Schema({
  majorKey: { type: String, required: true, unique: true },
  primaryPlaceholder: { type: String },
  secondaryPlaceholder: { type: String },
  requirements: { type: Array, default: [] },
  checklist: { type: Array, default: [] },
  status: { type: String, enum: ['active', 'disabled'], default: 'active' }
}, baseSchemaOptions);

// 15. Category
const CategorySchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  majorKey: { type: String, required: true },
  description: { type: String, default: '' },
  status: { type: String, enum: ['active', 'hidden'], default: 'active' }
}, baseSchemaOptions);

// 16. Premium Plan
const PremiumPlanSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  displayPrice: { type: String, required: true },
  duration: { type: String, required: true },
  badge: { type: String, default: '' },
  highlight: { type: String, default: '' },
  description: { type: String, default: '' },
  features: { type: [String], default: [] },
  limits: { type: [String], default: [] },
  order: { type: Number, default: 0 },
  status: { type: String, enum: ['active', 'hidden'], default: 'active' }
}, baseSchemaOptions);

// 17. Market Data (signals, evidence, research, sources)
const MarketDataSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  type: { type: String, enum: ['signal', 'evidence', 'research', 'source'], required: true, index: true },
  majorKey: { type: String, default: '' },
  data: { type: mongoose.Schema.Types.Mixed, default: {} },
  order: { type: Number, default: 0 },
  status: { type: String, enum: ['active', 'hidden'], default: 'active' }
}, baseSchemaOptions);

export const Major = mongoose.models.Major || mongoose.model('Major', MajorSchema);
export const Challenge = mongoose.models.Challenge || mongoose.model('Challenge', ChallengeSchema);
export const SubmissionRule = mongoose.models.SubmissionRule || mongoose.model('SubmissionRule', SubmissionRuleSchema);
export const UserProfile = mongoose.models.UserProfile || mongoose.model('UserProfile', UserProfileSchema);
export const MentorFeedback = mongoose.models.MentorFeedback || mongoose.model('MentorFeedback', MentorFeedbackSchema);
export const Submission = mongoose.models.Submission || mongoose.model('Submission', SubmissionSchema);
export const AdminAccount = mongoose.models.AdminAccount || mongoose.model('AdminAccount', AdminAccountSchema);
export const MentorAccount = mongoose.models.MentorAccount || mongoose.model('MentorAccount', MentorAccountSchema);
export const Category = mongoose.models.Category || mongoose.model('Category', CategorySchema);
export const Resource = mongoose.models.Resource || mongoose.model('Resource', ResourceSchema);
export const Notification = mongoose.models.Notification || mongoose.model('Notification', NotificationSchema);
export const StudentReview = mongoose.models.StudentReview || mongoose.model('StudentReview', StudentReviewSchema);
export const SubscriptionOrder = mongoose.models.SubscriptionOrder || mongoose.model('SubscriptionOrder', SubscriptionOrderSchema);
export const ContactInquiry = mongoose.models.ContactInquiry || mongoose.model('ContactInquiry', ContactInquirySchema);
export const Founder = mongoose.models.Founder || mongoose.model('Founder', FounderSchema);
export const PremiumPlan = mongoose.models.PremiumPlan || mongoose.model('PremiumPlan', PremiumPlanSchema);
export const MarketData = mongoose.models.MarketData || mongoose.model('MarketData', MarketDataSchema);
