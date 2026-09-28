import 'dotenv/config';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import { connectDb, mongoUriFromEnvironment } from './config/db.js';
import { AdminAccount, Category, Challenge, Major, MentorAccount, PremiumPlan, Resource, SubmissionRule, UserProfile } from './models.js';
import { adminAccounts, categories, challenges, majors, mentorAccounts, mentorFeedback, notifications, resources, submissionRules, submissions, userProfiles } from './seed-data.js';
import { augmentSeedData } from './supplemental-data.js';
import { describePremiumPlan } from '../shared/premiumCopy.js';

// Run once for a fresh production database; repeated runs preserve user data,
// existing plan prices, and the admin's current password.
const plans = [
  { id: 'premium-month', name: 'Premium Tháng', price: 79000, displayPrice: '79.000đ', duration: '1 tháng', highlight: 'Dùng thử nghiêm túc', description: 'Phù hợp sinh viên muốn thử mentor feedback và mở khóa thêm challenge.', features: ['10 challenge/tháng', 'Mentor feedback cơ bản', 'Lưu nhiều lộ trình', 'Xem đầy đủ skills/knowledge/tools'], limits: ['Chưa có public portfolio nâng cao', 'Chưa ưu tiên mentor chuyên ngành'], order: 1, status: 'active' },
  { id: 'premium-quarter', name: 'Premium 3 Tháng', price: 199000, displayPrice: '199.000đ', duration: '3 tháng', badge: 'Được chọn nhiều nhất', highlight: 'Hoàn thiện portfolio', description: 'Tối ưu cho một chu kỳ xây portfolio có review, chỉnh sửa và nộp lại.', features: ['Không giới hạn challenge trong 3 tháng', 'Mentor review ưu tiên', 'Nộp lại nhiều lần', 'Gợi ý bài tập theo career goal', 'Export portfolio template đẹp'], limits: ['Chưa có báo cáo tiến độ dài hạn'], order: 2, status: 'active' },
  { id: 'premium-year', name: 'Premium Năm', price: 499000, displayPrice: '499.000đ', duration: '12 tháng', highlight: 'Theo lộ trình dài hạn', description: 'Dành cho sinh viên theo một ngành đến khi có portfolio đủ mạnh để ứng tuyển.', features: ['Không giới hạn toàn bộ', 'Public portfolio chuyên nghiệp', 'Báo cáo tiến độ theo tháng', 'Badge xác thực kỹ năng', 'Ưu tiên mentor chuyên ngành', 'Chứng nhận hoàn thành lộ trình'], limits: [], order: 3, status: 'active' }
];

async function insertMissingCatalog(Model, rows, key = 'id') {
  if (!rows.length) return;
  await Model.bulkWrite(rows.map((row) => ({
    updateOne: { filter: { [key]: row[key] }, update: { $setOnInsert: row }, upsert: true }
  })));
}

async function bootstrap() {
  const email = String(process.env.BOOTSTRAP_ADMIN_EMAIL || '').trim().toLowerCase();
  const password = process.env.BOOTSTRAP_ADMIN_PASSWORD || '';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || password.length < 14) {
    throw new Error('Set BOOTSTRAP_ADMIN_EMAIL and BOOTSTRAP_ADMIN_PASSWORD (at least 14 characters) in the process environment.');
  }
  if (!mongoUriFromEnvironment()) throw new Error('Set MongoDB connection settings explicitly; refusing to bootstrap a local fallback database.');
  await connectDb();
  const existing = await AdminAccount.findOne({ id: 'admin-primary' }).lean();
  if (!existing) {
    const collision = await Promise.all([AdminAccount.findOne({ email }).lean(), MentorAccount.findOne({ email }).lean(), UserProfile.findOne({ email }).lean()]);
    if (collision.some(Boolean)) throw new Error('The bootstrap email is already registered; choose another email or use the existing admin account.');
    await AdminAccount.create({ id: 'admin-primary', name: process.env.BOOTSTRAP_ADMIN_NAME || 'Quản trị viên', email, passwordHash: await bcrypt.hash(password, 12), role: 'admin', status: 'active' });
  }
  for (const plan of plans) await PremiumPlan.updateOne({ id: plan.id }, { $setOnInsert: describePremiumPlan(plan) }, { upsert: true, runValidators: true });
  // Generate the public catalog without inserting demo accounts, ratings or submissions.
  const catalog = structuredClone({ adminAccounts, categories, challenges, majors, mentorAccounts, mentorFeedback, notifications, resources, submissions, userProfiles });
  augmentSeedData(catalog);
  // Upsert defaults run without a document context in Mongoose; Major's
  // id/name defaults read `this.key`, so provide both explicitly here.
  await insertMissingCatalog(Major, catalog.majors.map(major => ({
    ...major,
    id: major.id || major.key,
    name: major.name || major.title || major.key
  })), 'key');
  await insertMissingCatalog(Challenge, catalog.challenges);
  await insertMissingCatalog(Category, catalog.categories);
  await insertMissingCatalog(Resource, catalog.resources);
  await insertMissingCatalog(SubmissionRule, Object.entries(submissionRules).map(([majorKey, rule]) => ({ majorKey, ...rule })), 'majorKey');
  console.log(`Production bootstrap ready: admin ${existing ? 'already exists' : 'created'}, ${plans.length} plans, ${catalog.challenges.length} challenges and ${catalog.resources.length} learning resources checked. Existing data was preserved.`);
}

bootstrap().catch(error => { console.error('Production bootstrap failed:', error.message); process.exitCode = 1; }).finally(() => mongoose.disconnect());
