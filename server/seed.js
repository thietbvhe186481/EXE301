import 'dotenv/config';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import { connectDb } from './config/db.js';
import { AdminAccount, Category, Challenge, Major, MentorAccount, MentorFeedback, Notification, Resource, Submission, SubmissionRule, UserProfile, StudentReview, Founder, PremiumPlan, MarketData } from './models.js';
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
    Founder.deleteMany({}),
    PremiumPlan.deleteMany({}),
    MarketData.deleteMany({})
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

  const initialPremiumPlans = [
    {
      id: 'premium-month',
      name: 'Premium Tháng',
      price: 79000,
      displayPrice: '79.000đ',
      duration: '1 tháng',
      highlight: 'Dùng thử nghiêm túc',
      description: 'Phù hợp sinh viên muốn thử mentor feedback và mở khóa thêm challenge.',
      features: ['10 challenge/tháng', 'Mentor feedback cơ bản', 'Lưu nhiều lộ trình', 'Xem đầy đủ skills/knowledge/tools'],
      limits: ['Chưa có public portfolio nâng cao', 'Chưa ưu tiên mentor chuyên ngành'],
      order: 1,
      status: 'active'
    },
    {
      id: 'premium-quarter',
      name: 'Premium 3 Tháng',
      price: 199000,
      displayPrice: '199.000đ',
      duration: '3 tháng',
      badge: 'Được chọn nhiều nhất',
      highlight: 'Hoàn thiện portfolio',
      description: 'Tối ưu cho một chu kỳ xây portfolio có review, chỉnh sửa và nộp lại.',
      features: ['Không giới hạn challenge trong 3 tháng', 'Mentor review ưu tiên', 'Nộp lại nhiều lần', 'Gợi ý bài tập theo career goal', 'Export portfolio template đẹp'],
      limits: ['Chưa có báo cáo tiến độ dài hạn'],
      order: 2,
      status: 'active'
    },
    {
      id: 'premium-year',
      name: 'Premium Năm',
      price: 499000,
      displayPrice: '499.000đ',
      duration: '12 tháng',
      highlight: 'Theo lộ trình dài hạn',
      description: 'Dành cho sinh viên theo một ngành đến khi có portfolio đủ mạnh để ứng tuyển.',
      features: ['Không giới hạn toàn bộ', 'Public portfolio chuyên nghiệp', 'Báo cáo tiến độ theo tháng', 'Badge xác thực kỹ năng', 'Ưu tiên mentor theo chuyên ngành', 'Chứng nhận hoàn thành lộ trình'],
      limits: [],
      order: 3,
      status: 'active'
    }
  ];

  const initialMarketData = [
    {
      id: 'src-itviec',
      type: 'source',
      order: 1,
      data: { name: 'ITviec Salary Report 2025-2026', type: 'Lương IT Việt Nam', url: 'https://itviec.com/report/vietnam-it-salary-and-recruitment-market', reliability: 'Primary survey', useFor: 'Salary median, hiring plan, IT role demand', majorKeys: ['dev'] }
    },
    {
      id: 'src-adecco',
      type: 'source',
      order: 2,
      data: { name: 'Adecco Vietnam Salary Guide 2026', type: 'Khung lương đa ngành', url: 'https://www.adecco.com/en-vn/salary-guide', reliability: 'Recruitment benchmark', useFor: 'Salary range, job category, hiring outlook', majorKeys: ['mkt', 'design', 'dev'] }
    },
    {
      id: 'src-topdev',
      type: 'source',
      order: 3,
      data: { name: 'TopDev Vietnam IT Market 2024', type: 'Nhu cầu tuyển dụng IT', url: 'https://topdev.vn/vietnam-tech-talents-report-topdev-2024', reliability: 'Tech hiring report', useFor: 'AI, cloud, data, cybersecurity demand', majorKeys: ['dev'] }
    },
    {
      id: 'src-vnw',
      type: 'source',
      order: 4,
      data: { name: 'VietnamWorks HR Insider', type: 'Tuyển dụng & hành vi ứng viên', url: 'https://www.vietnamworks.com/hrinsider/', reliability: 'Job market media', useFor: 'Candidate behavior and employer demand', majorKeys: ['mkt', 'design', 'dev'] }
    },
    {
      id: 'src-linkedin',
      type: 'source',
      order: 5,
      data: { name: 'LinkedIn Jobs on the Rise', type: 'Vai trò tăng trưởng toàn cầu', url: 'https://www.linkedin.com/pulse/topics/jobs-c1/job-search-c27/jobs-on-the-rise-t6975/', reliability: 'Global trend signal', useFor: 'Emerging roles and cross-market skill signals', majorKeys: ['mkt', 'design', 'dev'] }
    },
    {
      id: 'src-nngroup',
      type: 'source',
      order: 6,
      data: { name: 'Nielsen Norman Group UX Research', type: 'UX/Product evidence', url: 'https://www.nngroup.com/articles/', reliability: 'UX research reference', useFor: 'UX method, usability, design evidence quality', majorKeys: ['design'] }
    },
    {
      id: 'sig-dev',
      type: 'signal',
      majorKey: 'dev',
      order: 1,
      data: {
        headline: 'AI-assisted engineering, backend API và full stack vẫn là nhóm kỹ năng dễ chuyển thành portfolio nhất.',
        confidence: 'Cao',
        updatedPolicy: 'Tổng hợp hằng ngày từ báo cáo lương, job board và nguồn tuyển dụng công khai.',
        signals: [
          { label: 'Nhu cầu tuyển dụng', value: 'Cao', note: 'Backend, Full Stack, DevOps và AI/Data thường xuất hiện trong JD sản phẩm số.' },
          { label: 'Kỹ năng nổi bật', value: 'API + Cloud + AI', note: 'Nhà tuyển dụng ưu tiên ứng viên có demo chạy được, README rõ và hiểu trade-off.' },
          { label: 'Portfolio nên có', value: '2-3 case study', note: 'Một API/backend, một dashboard/full stack và một bài có AI hoặc automation.' }
        ],
        hotSkills: ['REST API', 'System Design', 'Cloud Deploy', 'Testing', 'AI workflow', 'Observability']
      }
    },
    {
      id: 'sig-mkt',
      type: 'signal',
      majorKey: 'mkt',
      order: 2,
      data: {
        headline: 'Marketing đang dịch chuyển sang dữ liệu, automation và đo lường hiệu quả từng kênh.',
        confidence: 'Trung bình cao',
        updatedPolicy: 'Theo dõi báo cáo tuyển dụng, xu hướng nền tảng quảng cáo và benchmark campaign.',
        signals: [
          { label: 'Nhu cầu tuyển dụng', value: 'Ổn định', note: 'Performance, CRM, SEO và Growth có lợi thế khi chứng minh được số liệu.' },
          { label: 'Kỹ năng nổi bật', value: 'Analytics + Content', note: 'Ứng viên cần đọc dữ liệu, viết insight và biến thành kế hoạch hành động.' },
          { label: 'Portfolio nên có', value: 'Case campaign', note: 'Gồm mục tiêu, persona, ngân sách, kênh, KPI và bài học sau chiến dịch.' }
        ],
        hotSkills: ['GA4', 'SEO Audit', 'Paid Ads', 'CRM Flow', 'Content Strategy', 'Market Research']
      }
    },
    {
      id: 'sig-design',
      type: 'signal',
      majorKey: 'design',
      order: 3,
      data: {
        headline: 'Design cần chứng minh tư duy sản phẩm, hệ thống UI và khả năng giải thích quyết định thiết kế.',
        confidence: 'Trung bình cao',
        updatedPolicy: 'Tổng hợp từ salary guide, design job board và xu hướng product/design system.',
        signals: [
          { label: 'Nhu cầu tuyển dụng', value: 'Chọn lọc', note: 'Product Design, UX Research và UI system có lợi thế hơn portfolio chỉ đẹp hình ảnh.' },
          { label: 'Kỹ năng nổi bật', value: 'UX + System', note: 'Nhà tuyển dụng muốn thấy problem framing, flow, prototype và component states.' },
          { label: 'Portfolio nên có', value: '2 case study sâu', note: 'Một case product flow, một case visual/system có rationale rõ ràng.' }
        ],
        hotSkills: ['Figma', 'UX Research', 'Design System', 'Prototype', 'Accessibility', 'Storytelling']
      }
    },
    {
      id: 'evi-dev',
      type: 'evidence',
      majorKey: 'dev',
      order: 1,
      data: {
        metrics: [
          { value: '1.839', label: 'IT professionals', source: 'ITviec Salary Report 2025-2026', note: 'Báo cáo khảo sát 1.839 chuyên gia IT tại Việt Nam.' },
          { value: '37,8 triệu', label: 'Back-end median/month', source: 'ITviec Salary Report 2025-2026', note: 'Median total salary Back-end Developer; dải theo kinh nghiệm từ khoảng 12,4 tới 54,9 triệu VND/tháng.' },
          { value: '50,1 triệu', label: 'Product Owner/Manager median', source: 'ITviec Salary Report 2025-2026', note: 'Product Owner/Manager có median total salary khoảng 50,1 triệu VND/tháng; nhóm >8 năm khoảng 75 triệu.' },
          { value: '40,65 triệu', label: 'Data Analyst/Scientist median', source: 'ITviec Salary Report 2025-2026', note: 'Data Analyst/Scientist median khoảng 40,65 triệu VND/tháng; Data Engineer 3-4 năm khoảng 56,9 triệu.' }
        ],
        reasoning: ['Ưu tiên Backend/Full Stack vì số liệu lương có band rõ và dễ chứng minh bằng sản phẩm chạy được.', 'AI/Data nên đi kèm case có dữ liệu, pipeline hoặc workflow cụ thể thay vì chỉ ghi tên công cụ.', 'Portfolio Dev cần README, demo, test case và giải thích trade-off để mentor/nhà tuyển dụng kiểm tra nhanh.']
      }
    },
    {
      id: 'evi-mkt',
      type: 'evidence',
      majorKey: 'mkt',
      order: 2,
      data: {
        metrics: [
          { value: '10.000+', label: 'salary data points', source: 'Adecco Vietnam Salary Guide 2026', note: 'Adecco công bố bộ dữ liệu hơn 10.000 điểm tham chiếu lương.' },
          { value: '1.000+', label: 'job titles tracked', source: 'Adecco Vietnam Salary Guide 2026', note: 'Theo dõi hơn 1.000 chức danh, hữu ích khi so Marketing với sales, product và operations.' },
          { value: '11+', label: 'industry categories', source: 'Adecco Vietnam Salary Guide 2026', note: 'Salary guide phân loại hơn 11 nhóm ngành để đối chiếu bối cảnh tuyển dụng đa ngành.' },
          { value: 'KPI-first', label: 'portfolio logic', source: 'Portfolio business rule', note: 'Marketing portfolio nên chứng minh CAC, CTR, CVR, retention hoặc revenue proxy, không chỉ trình bày ý tưởng.' }
        ],
        reasoning: ['Marketing không nên chỉ làm bài “ý tưởng chiến dịch”; phải có mục tiêu, giả định, ngân sách và KPI.', 'Performance/CRM/SEO dễ demo năng lực vì có bảng số liệu, dashboard hoặc audit trước-sau.', 'Case study tốt cần nói được insight nào dẫn đến thông điệp, kênh nào được ưu tiên và nếu KPI thấp thì tối ưu gì.']
      }
    },
    {
      id: 'evi-design',
      type: 'evidence',
      majorKey: 'design',
      order: 3,
      data: {
        metrics: [
          { value: '10.000+', label: 'salary data points', source: 'Adecco Vietnam Salary Guide 2026', note: 'Nguồn lương đa ngành giúp đặt Design trong bối cảnh product, tech và marketing.' },
          { value: '1.000+', label: 'job titles tracked', source: 'Adecco Vietnam Salary Guide 2026', note: 'Dữ liệu nhiều chức danh giúp so sánh UI/UX/Product Design với các vị trí liên quan.' },
          { value: '2 case', label: 'portfolio depth', source: 'Portfolio business rule', note: 'Một case UX flow và một case UI system thường thuyết phục hơn nhiều màn hình rời không có lý do thiết kế.' },
          { value: '4 state', label: 'minimum UI proof', source: 'Design review rubric', note: 'Component quan trọng nên có default, hover/focus, loading/disabled và error/success state.' }
        ],
        reasoning: ['Design được đánh giá bằng lý do ra quyết định, không chỉ bằng ảnh đẹp.', 'Product/UI Design nên chứng minh problem framing, flow, prototype, component state và accessibility.', 'UX Research cần có câu hỏi nghiên cứu, cách lấy mẫu, insight và đề xuất hành động sau research.']
      }
    },
    {
      id: 'res-dev',
      type: 'research',
      majorKey: 'dev',
      order: 1,
      data: {
        researchQuestion: 'Sinh viên Dev nên ưu tiên chuyên ngành nào để vừa có cơ hội tuyển dụng tốt, vừa tạo được bằng chứng năng lực trong portfolio?',
        analystConclusion: 'Backend, Full Stack và AI/Data là nhóm đáng ưu tiên vì có nhu cầu tuyển dụng rõ, có thể chứng minh năng lực bằng sản phẩm chạy được và có nhiều điểm để mentor/nhà tuyển dụng kiểm tra trực tiếp.',
        methodology: ['Đối chiếu salary report IT tại Việt Nam với nhóm kỹ năng xuất hiện thường xuyên trong JD.', 'Ưu tiên nguồn có survey hoặc dữ liệu tuyển dụng, sau đó kiểm tra logic bằng yêu cầu portfolio thực tế.', 'Không dùng một con số đơn lẻ để kết luận; chỉ dùng khi có thể giải thích bằng kỹ năng, artifact và lộ trình học.'],
        findings: [
          {
            claim: 'Backend và Full Stack vẫn là lựa chọn có khả năng tạo portfolio mạnh nhất cho sinh viên.',
            evidence: 'Các vị trí này cho phép chứng minh API, database, auth, deploy, test và business rules trong một sản phẩm chạy được.',
            sources: ['ITviec Salary Report 2025-2026', 'TopDev Vietnam IT Market 2024']
          },
          {
            claim: 'AI/Data nên được xem là lớp năng lực bổ sung, không chỉ là tên công cụ.',
            evidence: 'Nhà tuyển dụng cần thấy dữ liệu đầu vào, pipeline, cách đánh giá kết quả và giới hạn của mô hình hoặc workflow.',
            sources: ['TopDev Vietnam IT Market 2024', 'LinkedIn Jobs on the Rise']
          },
          {
            claim: 'Portfolio Dev thuyết phục khi có bằng chứng kiểm thử và vận hành.',
            evidence: 'README, API docs, seed data, logging, deploy link và video walkthrough giúp mentor mở bài và đánh giá nhanh hơn.',
            sources: ['ITviec Salary Report 2025-2026', 'Portfolio review rubric']
          }
        ],
        implications: ['Chọn Backend/Full Stack nếu muốn lộ trình an toàn và dễ demo.', 'Chọn DevOps/AI khi đã có nền tảng code và muốn khác biệt hóa.', 'Mỗi bài tập nên có link chạy được, dữ liệu mẫu và giải thích trade-off.'],
        riskNotes: ['Mức lương thay đổi theo kinh nghiệm, tiếng Anh, domain sản phẩm và chất lượng công ty.', 'AI trend mạnh nhưng portfolio hời hợt dễ bị hỏi sâu trong phỏng vấn.']
      }
    },
    {
      id: 'res-mkt',
      type: 'research',
      majorKey: 'mkt',
      order: 2,
      data: {
        researchQuestion: 'Marketing nên học theo hướng sáng tạo nội dung hay performance/data để tăng cơ hội tuyển dụng?',
        analystConclusion: 'Marketing hiện đại cần kết hợp creative với measurement. Performance, SEO, CRM và Growth có lợi thế vì kết quả có thể đo bằng KPI, dashboard, funnel và giả thuyết tối ưu.',
        methodology: ['So sánh salary guide đa ngành với yêu cầu JD Marketing hiện nay.', 'Chấm điểm từng hướng theo khả năng tạo case study có số liệu và khả năng giải thích quyết định.', 'Tách rõ insight, kênh, ngân sách, KPI và hành động tối ưu sau chiến dịch.'],
        findings: [
          {
            claim: 'Performance/CRM/SEO dễ chứng minh năng lực hơn các bài ý tưởng thuần sáng tạo.',
            evidence: 'Có thể đưa vào case study các chỉ số như CTR, CVR, CAC, retention, cohort hoặc ranking/audit trước-sau.',
            sources: ['Adecco Vietnam Salary Guide 2026', 'VietnamWorks HR Insider']
          },
          {
            claim: 'Content và Brand vẫn quan trọng nhưng cần gắn với phân khúc khách hàng và mục tiêu kinh doanh.',
            evidence: 'Một campaign tốt phải trả lời được vì sao chọn persona này, kênh này, thông điệp này và đo thành công như thế nào.',
            sources: ['LinkedIn Jobs on the Rise', 'VietnamWorks HR Insider']
          },
          {
            claim: 'Market Research là năng lực nền giúp mọi hướng Marketing có lập luận tốt hơn.',
            evidence: 'Research giúp biến quan sát thị trường thành insight, giả thuyết, positioning và roadmap thử nghiệm.',
            sources: ['Adecco Vietnam Salary Guide 2026', 'Portfolio review rubric']
          }
        ],
        implications: ['Ưu tiên SEO/Performance/CRM nếu muốn case study dễ đo lường.', 'Nếu đi Content/Brand, cần thêm research, KPI và rationale.', 'Mỗi bài nên có bảng giả định, ngân sách, funnel, KPI và next action.'],
        riskNotes: ['Số liệu campaign demo có thể là giả lập, vì vậy cần ghi rõ giả định.', 'Marketing thay đổi nhanh theo nền tảng quảng cáo, nên case study cần thể hiện khả năng học và tối ưu.']
      }
    },
    {
      id: 'res-design',
      type: 'research',
      majorKey: 'design',
      order: 3,
      data: {
        researchQuestion: 'Designer nên chứng minh “đẹp” hay chứng minh khả năng giải quyết vấn đề sản phẩm?',
        analystConclusion: 'Product/UI/UX Design thuyết phục hơn khi có problem framing, flow, prototype, component states và bằng chứng test. Nhà tuyển dụng không chỉ xem hình, họ xem quá trình ra quyết định.',
        methodology: ['Đối chiếu salary guide đa ngành với chuẩn UX/Product portfolio.', 'Đánh giá mỗi chuyên ngành theo artifact có thể kiểm tra: Figma, prototype, research note, design system, handoff spec.', 'Ưu tiên bằng chứng người dùng và quyết định thiết kế hơn số lượng màn hình.'],
        findings: [
          {
            claim: 'Product Design và UI System có lợi thế khi portfolio cần thể hiện tư duy sản phẩm.',
            evidence: 'Prototype, user flow, component states và handoff giúp nhà tuyển dụng thấy khả năng đi từ vấn đề đến giải pháp.',
            sources: ['Adecco Vietnam Salary Guide 2026', 'Nielsen Norman Group UX Research']
          },
          {
            claim: 'UX Research giúp designer khác biệt nếu trình bày được phương pháp và insight.',
            evidence: 'Một report tốt cần research question, sample, script, pattern, quote, insight và quyết định sản phẩm sau nghiên cứu.',
            sources: ['Nielsen Norman Group UX Research', 'LinkedIn Jobs on the Rise']
          },
          {
            claim: 'Portfolio Design yếu khi chỉ có mockup đẹp nhưng thiếu rationale.',
            evidence: 'Thiếu before/after, trade-off, accessibility, edge state và kết quả test khiến nhà tuyển dụng khó đánh giá vai trò thật của ứng viên.',
            sources: ['Nielsen Norman Group UX Research', 'Portfolio review rubric']
          }
        ],
        implications: ['Làm 2 case sâu thay vì nhiều màn hình rời.', 'Mỗi case cần problem, process, decision, result và artifact có thể click.', 'Ưu tiên accessibility, component states và usability note trong bài nộp.'],
        riskNotes: ['Design trend hình ảnh thay đổi nhanh, nhưng năng lực research và giải thích quyết định bền hơn.', 'Figma đẹp không đủ nếu không chứng minh được user problem và business context.']
      }
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
  await PremiumPlan.insertMany(initialPremiumPlans);
  await MarketData.insertMany(initialMarketData);

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
