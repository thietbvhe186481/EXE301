import { CHALLENGES } from '../shared/catalog.js';
import { readinessCheck } from '../shared/catalog.js';

export const DEMO_TARGET = 63;
export const DEMO_BATCH = 'beelearn-2026-10';

const familyNames = ['Nguyễn', 'Trần', 'Lê', 'Phạm', 'Hoàng', 'Vũ', 'Đặng', 'Bùi', 'Đỗ', 'Hồ', 'Ngô', 'Dương', 'Mai', 'Lý', 'Đinh', 'Tạ', 'Phan', 'Hà', 'Cao', 'Lương', 'Trịnh'];
const givenNames = ['Minh Anh', 'Gia Huy', 'Khánh Linh', 'Đức Anh', 'Phương Thảo', 'Tuấn Kiệt', 'Bảo Ngọc', 'Nhật Minh', 'Quỳnh Anh', 'Hoàng Long', 'Thùy Dương', 'Anh Khoa', 'Hải Yến', 'Đình Phúc', 'Thanh Hà', 'Quốc Bảo', 'Ngọc Mai', 'Việt Anh', 'Lan Chi', 'Hữu Đạt', 'Hồng Nhung'];
const campuses = ['Đại học FPT Hà Nội', 'Đại học FPT TP.HCM', 'Đại học FPT Đà Nẵng', 'Đại học FPT Cần Thơ'];
const majorDetails = {
  dev: { label: 'Công nghệ thông tin', tracks: ['Front-end', 'Back-end & API', 'Dữ liệu', 'An toàn ứng dụng'], skills: ['HTML/CSS', 'JavaScript', 'React', 'Node.js', 'SQL', 'Git', 'Kiểm thử'] },
  mkt: { label: 'Digital Marketing', tracks: ['Nghiên cứu thị trường', 'Nội dung số', 'SEO & quảng cáo', 'Phân tích tăng trưởng'], skills: ['Nghiên cứu khách hàng', 'SEO', 'Content', 'Google Analytics', 'Báo cáo'] },
  design: { label: 'Thiết kế đồ họa & trải nghiệm số', tracks: ['Nghiên cứu UX', 'Thiết kế giao diện', 'Thiết kế tiếp cận', 'Design system'], skills: ['Figma', 'Wireframe', 'Prototype', 'User flow', 'Kiểm thử UX'] }
};
const sampleNotes = {
  dev: [
    'Bản minh họa có cấu trúc giao diện, trạng thái màn hình và ghi chú kiểm tra trên điện thoại. Tôi ưu tiên luồng chính, sau đó bổ sung trạng thái lỗi và hướng dẫn chạy thử.',
    'Bản minh họa mô tả cách tổ chức dữ liệu và kiểm tra đầu vào. Tôi ghi rõ giả định, các trường hợp lỗi và cách người đọc có thể tự đối chiếu với yêu cầu đề bài.'
  ],
  mkt: [
    'Bản minh họa nêu chân dung khách hàng, giả thuyết, lựa chọn kênh và chỉ số đo lường. Các con số là giả định học tập, không phải kết quả của chiến dịch thật.',
    'Bản minh họa trình bày kế hoạch nội dung theo từng giai đoạn, ngân sách giả định và cách kiểm tra hiệu quả. Tôi ghi rõ nguồn tham khảo và giới hạn của dữ liệu.'
  ],
  design: [
    'Bản minh họa đi từ nhu cầu người dùng tới luồng thao tác và nguyên tắc giao diện. Tôi bổ sung các trạng thái trống, lỗi và ghi chú khả năng tiếp cận.',
    'Bản minh họa giải thích lựa chọn bố cục, thành phần giao diện và cách kiểm tra prototype với người dùng. Đây là bài mẫu, chưa phải dự án khách hàng thật.'
  ]
};

const candidate = (index) => {
  const number = String(index).padStart(3, '0');
  const majorKey = ['dev', 'mkt', 'design'][(index - 1) % 3];
  const detail = majorDetails[majorKey];
  const name = `${familyNames[(index - 1) % familyNames.length]} ${givenNames[(index * 5 + Math.floor((index - 1) / familyNames.length)) % givenNames.length]}`;
  const challengePool = CHALLENGES.filter(item => item.majorKey === majorKey && item.access === 'free');
  const challenge = challengePool[(index - 1) % challengePool.length];
  const completed = index % 3 !== 0;
  const createdAt = new Date(Date.UTC(2026, 8, 2 + (index % 28), 2 + (index % 9), 0));
  const id = `demo-beelearn-${number}`;
  const note = sampleNotes[majorKey][index % 2];
  const artifactUrl = `https://portfolio.id.vn/demo-work.html?id=${id}`;
  const user = {
    id, name, email: `beelearn-demo-${number}@example.com`, role: 'student',
    passwordHash: '', emailVerified: false, status: 'unverified', demoData: true, demoBatch: DEMO_BATCH,
    selectedMajorKey: majorKey, majorKey, specialization: detail.tracks[(index - 1) % detail.tracks.length],
    school: campuses[(index - 1) % campuses.length], academicYear: 1 + (index % 4),
    careerGoal: `${detail.tracks[(index - 1) % detail.tracks.length]} · thực tập / junior`,
    headline: `Sinh viên ${detail.label} quan tâm ${detail.tracks[(index - 1) % detail.tracks.length]}`,
    bio: `Đang học ${detail.label}, tập trung thực hành ${detail.tracks[(index - 1) % detail.tracks.length].toLowerCase()} và xây dựng portfolio từ các bài có yêu cầu rõ ràng.`,
    skills: detail.skills.slice(index % 3, index % 3 + 3),
    path: [], joinedChallengeIds: [challenge.id],
    stats: { completedChallenges: completed ? 1 : 0, mentorRating: 0, portfolioProjects: completed ? 1 : 0, verifiedSkills: 0 },
    portfolio: { headline: `Portfolio học tập · ${detail.label}`, bio: note, publishedProjects: completed ? [challenge.title] : [], links: completed ? [artifactUrl] : [] },
    badges: completed ? ['Bài thực hành đầu tiên'] : [],
    isPremium: false, isPublic: false, createdAt
  };
  const payload = { challengeId: challenge.id, mode: 'ai', format: 'project', links: completed ? [artifactUrl] : [],
    skills: detail.skills.slice(0, 2), notes: note, linksAccessible: completed, shareTalent: false,
    acceptDelay: false, status: completed ? 'queued' : 'draft' };
  const submission = {
    id: `demo-submission-${number}`, userId: id, studentName: name, challengeId: challenge.id,
    mode: 'ai', format: 'project', links: payload.links, skills: payload.skills, notes: note,
    linksAccessible: completed, shareTalent: false, paidAtSubmission: false,
    status: completed ? 'completed' : 'draft', revision: 1, demoData: true, demoBatch: DEMO_BATCH,
    ...(completed ? { ai: readinessCheck(payload) } : {}),
    createdAt, updatedAt: new Date(createdAt.getTime() + (completed ? 3 : 1) * 86400000)
  };
  return { user, submission, artifact: { id, studentName: name, school: user.school, major: detail.label, title: challenge.title, summary: challenge.summary,
    requirement: challenge.requirements?.slice(0, 3) || [], note, skills: payload.skills, completed } };
};

export const DEMO_CANDIDATES = Array.from({ length: DEMO_TARGET }, (_, index) => candidate(index + 1));

export function planDemoSeed(existingUsers, target = DEMO_TARGET) {
  const remaining = Math.max(0, target - existingUsers.length);
  const existingIds = new Set(existingUsers.map(user => user.id));
  const existingEmails = new Set(existingUsers.map(user => String(user.email || '').toLowerCase()));
  const selected = DEMO_CANDIDATES.filter(({ user }) => !existingIds.has(user.id) && !existingEmails.has(user.email)).slice(0, remaining);
  if (selected.length !== remaining) throw new Error('Not enough unique demo identities to reach the requested target.');
  return selected;
}

export async function ensureDemoStudents({ UserProfile, ReviewSubmission, target = DEMO_TARGET }) {
  const existing = await UserProfile.find({}, { id: 1, email: 1, _id: 0 }).lean();
  const selected = planDemoSeed(existing, target);
  if (selected.length) {
    await UserProfile.bulkWrite(selected.map(({ user }) => ({ updateOne: { filter: { id: user.id }, update: { $setOnInsert: user }, upsert: true } })));
  }
  const batchUsers = await UserProfile.find({ demoBatch: DEMO_BATCH }, { id: 1, _id: 0 }).lean();
  const batchIds = new Set(batchUsers.map(user => user.id));
  const expectedSubmissions = DEMO_CANDIDATES.filter(({ user }) => batchIds.has(user.id));
  if (expectedSubmissions.length) await ReviewSubmission.bulkWrite(expectedSubmissions.map(({ submission }) => ({ updateOne: { filter: { id: submission.id }, update: { $setOnInsert: submission }, upsert: true } })), { timestamps: false });
  if (expectedSubmissions.length) await ReviewSubmission.updateMany({ id: { $in: expectedSubmissions.map(({ submission }) => submission.id) }, userId: { $in: [...batchIds] } }, { $set: { demoData: true, demoBatch: DEMO_BATCH } }, { timestamps: false });
  const [total, demoTotal, demoSubmissions] = await Promise.all([
    UserProfile.countDocuments(), UserProfile.countDocuments({ demoBatch: DEMO_BATCH }), ReviewSubmission.countDocuments({ demoBatch: DEMO_BATCH })
  ]);
  console.log(`Demo seed ${DEMO_BATCH}: existing=${existing.length} inserted=${selected.length} users=${total} demoUsers=${demoTotal} demoSubmissions=${demoSubmissions}`);
  if (total !== target) console.warn(`Demo seed expected ${target} users, found ${total}; check for signups during migration.`);
  return { existing: existing.length, inserted: selected.length, total, demoTotal, demoSubmissions };
}
