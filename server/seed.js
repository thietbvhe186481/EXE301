import 'dotenv/config';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import { connectDb } from './config/db.js';
import { AdminAccount, Category, Challenge, Major, MentorAccount, MentorFeedback, Notification, Resource, Submission, SubmissionRule, UserProfile } from './models.js';
import { adminAccounts, categories, challenges, majors, mentorAccounts, mentorFeedback, notifications, resources, submissionRules, submissions, userProfiles } from './seed-data.js';
import { augmentSeedData } from './supplemental-data.js';

augmentSeedData({ adminAccounts, categories, challenges, majors, mentorAccounts, mentorFeedback, notifications, resources, submissions, userProfiles });

async function withHashedPasswords(accounts) {
  return Promise.all(accounts.map(async (account) => ({
    ...account,
    passwordHash: await bcrypt.hash(account.password, 10),
    password: undefined
  })));
}

async function seed() {
  await connectDb();

  await Promise.all([
    Major.deleteMany({}),
    Challenge.deleteMany({}),
    SubmissionRule.deleteMany({}),
    UserProfile.deleteMany({}),
    MentorFeedback.deleteMany({}),
    Submission.deleteMany({}),
    AdminAccount.deleteMany({}),
    MentorAccount.deleteMany({}),
    Category.deleteMany({}),
    Resource.deleteMany({}),
    Notification.deleteMany({})
  ]);

  await Major.insertMany(majors);
  await Challenge.insertMany(challenges);
  await SubmissionRule.insertMany(Object.entries(submissionRules).map(([majorKey, rule]) => ({ majorKey, ...rule })));
  await UserProfile.insertMany(await withHashedPasswords(userProfiles));
  await MentorFeedback.insertMany(mentorFeedback);
  await Submission.insertMany(submissions);
  await AdminAccount.insertMany(await withHashedPasswords(adminAccounts));
  await MentorAccount.insertMany(await withHashedPasswords(mentorAccounts));
  await Category.insertMany(categories);
  await Resource.insertMany(resources);
  await Notification.insertMany(notifications);

  console.log('Seeded MongoDB demo data successfully.');
  console.log(`Majors: ${majors.length}, specializations: ${majors.reduce((sum, item) => sum + item.columns.length, 0)}, roles: ${majors.reduce((sum, item) => sum + item.columns.reduce((inner, column) => inner + column.roles.length, 0), 0)}`);
  console.log(`Challenges: ${challenges.length}, submissions: ${submissions.length}, feedback: ${mentorFeedback.length}, admins: ${adminAccounts.length}, mentors: ${mentorAccounts.length}`);
}

seed()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await mongoose.connection.close();
  });
