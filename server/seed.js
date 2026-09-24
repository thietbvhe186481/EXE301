import 'dotenv/config';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import { connectDb } from './config/db.js';
import { AdminAccount, Category, Challenge, Major, MentorAccount, MentorFeedback, Notification, Resource, Submission, SubmissionRule, UserProfile, StudentReview, Founder } from './models.js';
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
    Notification.deleteMany({}),
    StudentReview.deleteMany({}),
    Founder.deleteMany({})
  ]);

  const initialFounders = [
    { id: 'founder-huy', name: 'Nguyễn Sỹ Huy', role: 'CEO', roleFull: 'Chief Executive Officer', bio: 'Định hướng chiến lược & phát triển hệ sinh thái Portfolio sinh viên' },
    { id: 'founder-thiet', name: 'Bùi Văn Thiết', role: 'CTO', roleFull: 'Chief Technology Officer', bio: 'Kiến trúc sư hệ thống nền tảng, tích hợp AI & phân luồng chấm điểm' },
    { id: 'founder-linh', name: 'Lê Phương Linh', role: 'COO', roleFull: 'Chief Operating Officer', bio: 'Quản trị vận hành, quy chuẩn Mentor Review & kết nối doanh nghiệp' },
    { id: 'founder-ngoc', name: 'Lương Hồng Ngọc', role: 'CPO', roleFull: 'Chief Product Officer', bio: 'Thiết kế trải nghiệm người dùng, Bản đồ nghề & Trung tâm thử thách' },
    { id: 'founder-giang', name: 'Tạ Thị Minh Giang', role: 'CMO', roleFull: 'Chief Marketing Officer', bio: 'Chiến dịch thu hút 200-300 sinh viên & xây dựng cộng đồng FPT' },
    { id: 'founder-nghia', name: 'Phạm Khắc Nghĩa', role: 'CFO', roleFull: 'Chief Financial Officer', bio: 'Quản trị tài chính, các gói Premium & Quỹ thưởng thù lao Mentor' }
  ];

  const initialReviews = [
    {
      id: 'rev-01',
      name: 'Nguyễn Hoàng Nam',
      school: 'Đại học FPT TP.HCM',
      major: 'Software Engineering (Năm 4)',
      roleTrack: 'Backend Architecture',
      rating: 5,
      avatarBg: '#8b5cf6',
      outcome: '🎉 Nhận offer Intern Backend Engineer tại FPT Software',
      quote: 'Trước đây khi đi phỏng vấn em chỉ có lý thuyết trên trường nên rất tự ti. Nhờ làm thử thách API Ecommerce từ đề án SWP391 và được Mentor FPT góp ý từng dòng code, em có ngay một project xịn để show trong CV. Nhà tuyển dụng rất ấn tượng với README và sơ đồ hệ thống của em!',
      date: '22/09/2026'
    },
    {
      id: 'rev-02',
      name: 'Lê Minh Thu',
      school: 'Đại học FPT Hà Nội',
      major: 'Digital Art & Design (Năm 3)',
      roleTrack: 'UI/UX Design Systems',
      rating: 5,
      avatarBg: '#ec4899',
      outcome: '🚀 Tăng 300% tương tác Behance & nhận job UI/UX Design Studio',
      quote: 'Em cực kỳ ấn tượng với quy chuẩn nộp bài của nền tảng. Không chỉ làm UI đẹp mà còn phải giải thích User Flow, Design System Token theo chuẩn Google UX Coursera. Feedback từ Mentor Vy Hoàng vô cùng tỉ mỉ và sát thực tế doanh nghiệp!',
      date: '20/09/2026'
    },
    {
      id: 'rev-03',
      name: 'Trần Việt Anh',
      school: 'Đại học FPT',
      major: 'Software Engineering (Năm 3)',
      roleTrack: 'Full Stack Web',
      rating: 5,
      avatarBg: '#10b981',
      outcome: '💼 Pass vòng CV & Technical Test tại VNG',
      quote: 'Phân luồng chấm điểm Mentor AI và Mentor Thật cực kỳ tiện! Mentor AI chấm checklist kiểm tra link và code 0s giúp em biết thiếu sót ngay. Sau đó Mentor Thật review 1-on-1 cho em lời khuyên về tối ưu SQL và Docker rất giá trị.',
      date: '18/09/2026'
    },
    {
      id: 'rev-04',
      name: 'Phạm Quỳnh Anh',
      school: 'Đại học FPT Đà Nẵng',
      major: 'Digital Marketing (Năm 4)',
      roleTrack: 'Performance Marketing',
      rating: 5,
      avatarBg: '#f59e0b',
      outcome: '📈 Quản lý ngân sách Ads 30M thực tế cho doanh nghiệp',
      quote: 'Tài liệu tham khảo từ giáo trình FPT kết hợp với bài tập lập kế hoạch paid ads trên nền tảng giúp em hiểu sâu về CAC, LTV và A/B Testing. Sự hỗ trợ từ Mentor Trang Võ giúp em có một bộ Case Study Marketing ăn điểm!',
      date: '15/09/2026'
    },
    {
      id: 'rev-05',
      name: 'Vũ Quốc Bảo',
      school: 'Coursera & ĐH FPT',
      major: 'Trí tuệ Nhân tạo (Năm 3)',
      roleTrack: 'AI / Data Engineer',
      rating: 5,
      avatarBg: '#38bdf8',
      outcome: '🌟 Xuất bản thành công trợ lý AI RAG FAQ có trích dẫn',
      quote: 'Hệ thống bản đồ nghề rất rõ ràng, kết hợp chứng chỉ DeepLearning.AI Coursera và đề tài môn AI tại FPT. Nhờ đó em không bị lạc hướng giữa hàng trăm công nghệ AI hiện tại.',
      date: '12/09/2026'
    }
  ];

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
  await Founder.insertMany(initialFounders);
  await StudentReview.insertMany(initialReviews);

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
