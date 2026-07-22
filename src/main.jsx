import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  ArrowLeftRight,
  BadgeCheck,
  Blocks,
  BookOpen,
  BriefcaseBusiness,
  Check,
  ChevronsUp,
  CircleDollarSign,
  Compass,
  CreditCard,
  Crown,
  FileUp,
  Filter,
  Github,
  GraduationCap,
  LayoutDashboard,
  Link as LinkIcon,
  LockKeyhole,
  LogOut,
  MessageSquareText,
  Moon,
  MoveDown,
  MoveUp,
  Plus,
  Rocket,
  Save,
  Search,
  Send,
  ShieldCheck,
  Sparkles,
  Star,
  Sun,
  Trash2,
  Trophy,
  UserRound,
  WandSparkles,
  X
} from 'lucide-react';
import './styles.css';

const API_BASE_URL = import.meta.env.VITE_API_URL ?? 'http://127.0.0.1:4000';

const flow = [
  { id: 'auth', label: 'Đăng nhập', icon: LockKeyhole },
  { id: 'roadmap', label: 'Bản đồ nghề', icon: Compass },
  { id: 'hub', label: 'Thử thách', icon: LayoutDashboard },
  { id: 'join', label: 'Tham gia', icon: Rocket },
  { id: 'submit', label: 'Nộp bài', icon: FileUp },
  { id: 'feedback', label: 'Góp ý', icon: MessageSquareText },
  { id: 'portfolio', label: 'Hồ sơ', icon: UserRound },
  { id: 'premium', label: 'Premium', icon: Crown },
  { id: 'mentor', label: 'Mentor', icon: GraduationCap },
  { id: 'admin', label: 'Admin', icon: ShieldCheck }
];

flow.splice(2, 0, { id: 'trends', label: 'Xu h\u01b0\u1edbng', icon: Sparkles });

const levels = [
  { key: 'nen-tang', label: 'Foundation', short: '01' },
  { key: 'so-cap', label: 'Junior', short: '02' },
  { key: 'trung-cap', label: 'Mid-level', short: '03' },
  { key: 'cao-cap', label: 'Senior', short: '04' },
  { key: 'dan-dat', label: 'Lead', short: '05' }
];

const levelTitles = {
  'nen-tang': 'Intern',
  'so-cap': 'Junior',
  'trung-cap': 'Specialist',
  'cao-cap': 'Senior',
  'dan-dat': 'Lead'
};

const englishLevelTitles = {
  'nen-tang': 'Intern',
  'so-cap': 'Junior',
  'trung-cap': 'Specialist',
  'cao-cap': 'Senior',
  'dan-dat': 'Lead'
};

const levelSalary = ['7-12 triệu VND/tháng', '12-22 triệu VND/tháng', '22-45 triệu VND/tháng', '45-75 triệu VND/tháng', '75-120+ triệu VND/tháng'];
const levelExperience = ['0-1 năm', '1-2 năm', '2-4 năm', '4-7 năm', '7+ năm'];
const levelPrefix = ['Nắm nền tảng', 'Thực hành', 'Làm chủ', 'Tối ưu', 'Dẫn dắt'];

const majorCatalog = [
  {
    key: 'dev',
    short: 'Dev',
    title: 'Developer',
    accent: '#8b5cf6',
    summary: 'Software Engineering portfolio path.',
    salary: '12-120+ triệu VND/tháng',
    growth: 'Nhu cầu rất cao',
    difficulty: 'Thiên về kỹ thuật',
    labels: ['CODE', 'API', 'APP', 'AI'],
    columns: buildColumns('dev', [
      spec('frontend', 'Frontend', '#8b5cf6', ['Frontend'], ['React UI', 'quản lý trạng thái', 'giao diện responsive'], ['trình duyệt', 'khả năng truy cập', 'design system'], ['tỉ mỉ giao diện', 'tư duy trải nghiệm', 'chia nhỏ component'], ['React', 'Vite', 'Tailwind', 'Playwright']),
      spec('backend', 'Backend', '#14b8a6', ['Backend'], ['REST API', 'xác thực', 'thiết kế cơ sở dữ liệu'], ['HTTP', 'transaction', 'hệ thống phân tán'], ['mô hình dữ liệu', 'debug', 'tư duy ổn định'], ['Node.js', 'PostgreSQL', 'Redis', 'Docker']),
      spec('fullstack', 'Full Stack', '#f59e0b', ['Full Stack'], ['tính năng end-to-end', 'hợp đồng API', 'dashboard sản phẩm'], ['client-server', 'analytics', 'bảo mật cơ bản'], ['tư duy sản phẩm', 'sở hữu đầu việc', 'lặp nhanh'], ['Next.js', 'Prisma', 'Stripe', 'Sentry']),
      spec('mobile', 'Mobile', '#ec4899', ['Mobile'], ['điều hướng app', 'trạng thái offline', 'push notification'], ['vòng đời app', 'quyền thiết bị', 'quy trình store'], ['kiểm thử thiết bị', 'vẽ luồng UX', 'xử lý crash'], ['Flutter', 'React Native', 'Firebase', 'Fastlane']),
      spec('devops', 'DevOps', '#38bdf8', ['DevOps'], ['CI/CD', 'container', 'giám sát hệ thống'], ['networking', 'SLO', 'cloud IAM'], ['tự động hóa', 'xử lý sự cố', 'tư duy độ tin cậy'], ['Docker', 'Kubernetes', 'Terraform', 'Grafana']),
      spec('ai', 'AI / Data', '#a3e635', ['AI/Data'], ['Python', 'ETL', 'pipeline mô hình'], ['thống kê', 'vòng đời ML', 'vector search'], ['thiết kế thử nghiệm', 'phân tích dữ liệu', 'đánh giá rủi ro'], ['Pandas', 'Airflow', 'MLflow', 'OpenAI API']),
      spec('architecture', 'Software Architecture', '#ef4444', ['Architect'], ['sơ đồ hệ thống', 'ghi chú trade-off', 'kế hoạch migration'], ['design pattern', 'cloud service', 'enterprise architecture'], ['giao tiếp', 'định khung quyết định', 'lập kế hoạch chiến lược'], ['C4 Model', 'ADR', 'Miro', 'Cloud Well-Architected'])
    ])
  },
  {
    key: 'mkt',
    short: 'MKT',
    title: 'Marketing',
    accent: '#10b981',
    summary: 'Tăng trưởng sản phẩm bằng nội dung, thương hiệu, quảng cáo, nghiên cứu và chăm sóc khách hàng.',
    salary: '10-100+ triệu VND/tháng',
    growth: 'Nhu cầu cao',
    difficulty: 'Sáng tạo + dữ liệu',
    labels: ['SEO', 'ADS', 'CRM', 'BRAND'],
    columns: buildColumns('mkt', [
      spec('content', 'Content', '#10b981', ['Content'], ['viết nội dung', 'lịch đăng bài', 'kế hoạch biên tập'], ['persona', 'thông điệp', 'phân phối nội dung'], ['kể chuyện', 'duy trì nhịp', 'nghiên cứu'], ['Notion', 'Canva', 'Grammarly', 'CMS']),
      spec('seo', 'SEO', '#84cc16', ['SEO'], ['nghiên cứu từ khóa', 'on-page SEO', 'technical SEO'], ['search intent', 'SERP', 'cấu trúc website'], ['phân tích', 'ưu tiên', 'kiên nhẫn'], ['Ahrefs', 'Search Console', 'Screaming Frog', 'GA4']),
      spec('performance', 'Performance Marketing', '#f59e0b', ['Performance Marketer'], ['paid ads', 'phân bổ ngân sách', 'tracking chuyển đổi'], ['CAC/LTV', 'attribution', 'A/B testing'], ['đọc dữ liệu', 'kỷ luật ngân sách', 'thử nghiệm'], ['Google Ads', 'Meta Ads', 'Looker Studio', 'Hotjar']),
      spec('social', 'Social Media', '#38bdf8', ['Social'], ['nội dung ngắn', 'vận hành cộng đồng', 'brief KOL'], ['thuật toán nền tảng', 'vòng lặp tương tác', 'xu hướng'], ['cảm quan nội dung', 'tốc độ', 'đồng cảm với khán giả'], ['TikTok Studio', 'Meta Suite', 'Buffer', 'CapCut']),
      spec('brand', 'Brand Marketing', '#ec4899', ['Brand Marketer'], ['định vị', 'giọng nói thương hiệu', 'ý tưởng chiến dịch'], ['ngành hàng', 'khác biệt hóa', 'brand equity'], ['đánh giá sáng tạo', 'giao tiếp', 'nhất quán'], ['Brand book', 'Slides', 'Miro', 'Research panel']),
      spec('growth', 'Growth', '#a855f7', ['Growth'], ['phễu tăng trưởng', 'retention loop', 'backlog thử nghiệm'], ['AARRR metrics', 'activation', 'lifecycle'], ['tư duy hệ thống', 'ưu tiên', 'phối hợp nhóm'], ['Amplitude', 'Segment', 'HubSpot', 'Feature flags']),
      spec('crm', 'CRM / Lifecycle', '#06b6d4', ['CRM'], ['email journey', 'phân nhóm khách hàng', 'automation'], ['vòng đời khách hàng', 'cohort', 'cá nhân hóa'], ['đồng cảm', 'tỉ mỉ', 'thói quen kiểm thử'], ['Mailchimp', 'HubSpot', 'Customer.io', 'Excel']),
      spec('research', 'Market Research', '#f97316', ['Market Researcher'], ['thiết kế khảo sát', 'ghi chú phỏng vấn', 'phân tích đối thủ'], ['lấy mẫu', 'nghiên cứu định tính', 'market sizing'], ['lắng nghe', 'tổng hợp', 'báo cáo rõ ràng'], ['Typeform', 'Dovetail', 'Sheets', 'Slides'])
    ])
  },
  {
    key: 'design',
    short: 'Design',
    title: 'Designer',
    accent: '#38bdf8',
    summary: 'Tạo trải nghiệm sản phẩm, giao diện, nhận diện thương hiệu, nghiên cứu người dùng và chuyển động.',
    salary: '10-95+ triệu VND/tháng',
    growth: 'Nhu cầu cao',
    difficulty: 'Thị giác + sản phẩm',
    labels: ['UI', 'UX', 'BRAND', 'MOTION'],
    columns: buildColumns('design', [
      spec('ui', 'UI Design', '#38bdf8', ['UI'], ['layout', 'component', 'responsive UI'], ['typography', 'visual hierarchy', 'accessibility'], ['tỉ mỉ pixel', 'gu thẩm mỹ', 'lặp thiết kế'], ['Figma', 'FigJam', 'Adobe Illustrator', 'Maze']),
      spec('ux', 'UX Design', '#8b5cf6', ['UX'], ['user flow', 'wireframe', 'usability testing'], ['information architecture', 'heuristic', 'journey mapping'], ['định khung vấn đề', 'đồng cảm người dùng', 'facilitation'], ['Figma', 'Miro', 'UserTesting', 'Hotjar']),
      spec('product', 'Product Design', '#10b981', ['Product'], ['thiết kế tính năng', 'prototype', 'UX theo số liệu'], ['chiến lược sản phẩm', 'thử nghiệm', 'design system'], ['product sense', 'trade-off', 'thuyết phục'], ['Figma', 'Amplitude', 'Storybook', 'Dovetail']),
      spec('graphic', 'Graphic Design', '#f59e0b', ['Graphic'], ['asset marketing', 'bố cục', 'visual campaign'], ['quy chuẩn brand', 'file in/online', 'lý thuyết màu'], ['sáng tạo', 'tốc độ', 'tiếp nhận feedback'], ['Photoshop', 'Illustrator', 'Canva', 'InDesign']),
      spec('motion', 'Motion Design', '#ec4899', ['Motion'], ['animation', 'storyboard', 'transition'], ['timing', 'định dạng video', 'nguyên lý chuyển động'], ['nhịp điệu', 'kể chuyện thị giác', 'tỉ mỉ'], ['After Effects', 'Premiere', 'Lottie', 'Rive']),
      spec('brand', 'Brand Design', '#ef4444', ['Brand Design'], ['hệ thống logo', 'nhận diện', 'visual campaign'], ['định vị', 'brand strategy', 'ngôn ngữ thị giác'], ['concepting', 'nhất quán', 'trình bày'], ['Illustrator', 'Figma', 'Photoshop', 'Brand guideline']),
      spec('research', 'UX Research', '#a3e635', ['UX Research'], ['phỏng vấn', 'khảo sát', 'báo cáo insight'], ['phương pháp nghiên cứu', 'kiểm soát bias', 'phân tích hành vi'], ['lắng nghe', 'tổng hợp', 'diễn đạt rõ'], ['Dovetail', 'Maze', 'Typeform', 'Miro'])
    ])
  }
];

function spec(key, title, accent, titleRoots, skills, knowledge, abilities, tools) {
  return { key, title, accent, titleRoots, skills, knowledge, abilities, tools };
}

function buildColumns(majorKey, specs) {
  return specs.map((item) => ({
    key: item.key,
    title: item.title,
    accent: item.accent,
    roles: levels.map((level, index) => role(
      `${majorKey}-${item.key}-${level.key}`,
      `${englishLevelTitles[level.key]} ${item.titleRoots[0]}`,
      level.label,
      level.key,
      item.title,
      majorKey,
      levelSalary[index],
      levelExperience[index],
      boost(item.skills, index),
      boost(item.knowledge, index),
      boost(item.abilities, index),
      item.tools
    ))
  }));
}

function role(id, title, level, levelKey, track, majorKey, salary, experience, skills, knowledge, abilities, tools) {
  return { id, title, level, levelKey, track, majorKey, salary, experience, skills, knowledge, abilities, tools };
}

function boost(items, index) {
  return items.map((item) => `${levelPrefix[index]} ${item}`);
}

const challenges = [
  { id: 'dev-dashboard', majorKey: 'dev', track: 'Frontend', title: 'Xây dựng dashboard nghề nghiệp', difficulty: 'Sơ cấp', xp: 420, due: '10 ngày', mentor: 'Mina Lê', tags: ['React', 'API', 'Responsive'], summary: 'Tạo dashboard có bộ lọc, thẻ thông tin, form và xử lý trạng thái rõ ràng.' },
  { id: 'dev-api', majorKey: 'dev', track: 'Backend', title: 'API thương mại điện tử', difficulty: 'Trung cấp', xp: 560, due: '14 ngày', mentor: 'Anh Trần', tags: ['Node', 'Auth', 'MongoDB'], summary: 'Xây API sản phẩm, đơn hàng, đăng nhập và kiểm tra dữ liệu đầu vào.' },
  { id: 'dev-ai', majorKey: 'dev', track: 'AI / Data', title: 'Tìm kiếm tri thức bằng AI', difficulty: 'Cao cấp', xp: 820, due: '18 ngày', mentor: 'Nam Hồ', tags: ['Python', 'LLM', 'Vector DB'], summary: 'Tạo trợ lý tìm kiếm tài liệu có trích dẫn và ghi chú đánh giá.' },
  { id: 'dev-mobile', majorKey: 'dev', track: 'Mobile', title: 'Ứng dụng đặt lịch mobile', difficulty: 'Trung cấp', xp: 640, due: '13 ngày', mentor: 'Linh Đào', tags: ['Flutter', 'Firebase', 'UX'], summary: 'Xây app mobile có đăng nhập, đặt lịch, lịch sử và trạng thái trống dễ hiểu.' },
  { id: 'dev-devops', majorKey: 'dev', track: 'DevOps', title: 'Pipeline deploy tự động', difficulty: 'Cao cấp', xp: 780, due: '16 ngày', mentor: 'Nora Vũ', tags: ['Docker', 'CI/CD', 'Monitor'], summary: 'Thiết lập pipeline build, test, deploy, health check và rollback cơ bản.' },
  { id: 'mkt-campaign', majorKey: 'mkt', track: 'Content', title: 'Kế hoạch ra mắt chiến dịch', difficulty: 'Sơ cấp', xp: 460, due: '7 ngày', mentor: 'Mai Nguyễn', tags: ['Persona', 'Content', 'Funnel'], summary: 'Lập kế hoạch chiến dịch gồm chân dung khách hàng, kênh, nội dung và KPI.' },
  { id: 'mkt-growth', majorKey: 'mkt', track: 'Growth', title: 'Báo cáo thử nghiệm tăng trưởng', difficulty: 'Cao cấp', xp: 720, due: '12 ngày', mentor: 'Khoa Phạm', tags: ['A/B Test', 'CAC', 'Analytics'], summary: 'Thiết kế một thử nghiệm tăng trưởng với giả thuyết, ngân sách và cách đo lường.' },
  { id: 'mkt-brand', majorKey: 'mkt', track: 'Thương hiệu', title: 'Sprint định vị thương hiệu', difficulty: 'Trung cấp', xp: 610, due: '11 ngày', mentor: 'Trang Bùi', tags: ['Brand', 'Research', 'Slides'], summary: 'Xác định khách hàng, định vị, trụ cột thông điệp và concept chiến dịch.' },
  { id: 'mkt-seo', majorKey: 'mkt', track: 'SEO', title: 'Audit SEO cho landing page', difficulty: 'Sơ cấp', xp: 430, due: '6 ngày', mentor: 'Minh Phan', tags: ['SEO', 'Audit', 'Keyword'], summary: 'Phân tích từ khóa, lỗi kỹ thuật, cấu trúc nội dung và đề xuất backlog SEO.' },
  { id: 'mkt-crm', majorKey: 'mkt', track: 'CRM / Lifecycle', title: 'Chuỗi email chăm sóc khách hàng', difficulty: 'Trung cấp', xp: 590, due: '10 ngày', mentor: 'Vy Hoàng', tags: ['CRM', 'Email', 'Cohort'], summary: 'Thiết kế luồng email onboarding, kích hoạt lại và chăm sóc khách hàng theo phân khúc.' },
  { id: 'design-app', majorKey: 'design', track: 'Product Design', title: 'Prototype ứng dụng di động', difficulty: 'Sơ cấp', xp: 480, due: '9 ngày', mentor: 'Linh Đào', tags: ['Figma', 'Prototype', 'UX'], summary: 'Thiết kế luồng onboarding và đặt lịch với component tái sử dụng.' },
  { id: 'design-system', majorKey: 'design', track: 'UI Design', title: 'Mini design system', difficulty: 'Cao cấp', xp: 760, due: '15 ngày', mentor: 'Nora Vũ', tags: ['Token', 'Component', 'Docs'], summary: 'Tạo hệ thống màu, typography, component và quy tắc sử dụng.' },
  { id: 'design-motion', majorKey: 'design', track: 'Motion Design', title: 'Bộ chuyển động ra mắt sản phẩm', difficulty: 'Trung cấp', xp: 620, due: '12 ngày', mentor: 'Huy Võ', tags: ['Motion', 'Lottie', 'Story'], summary: 'Tạo hero animation, micro-interaction và tài liệu motion spec.' },
  { id: 'design-brand', majorKey: 'design', track: 'Brand Design', title: 'Bộ nhận diện thương hiệu cá nhân', difficulty: 'Trung cấp', xp: 600, due: '10 ngày', mentor: 'An Chi', tags: ['Logo', 'Brand', 'Guideline'], summary: 'Thiết kế logo, bảng màu, typography và guideline cho một thương hiệu cá nhân.' },
  { id: 'design-research', majorKey: 'design', track: 'UX Research', title: 'Báo cáo nghiên cứu người dùng', difficulty: 'Cao cấp', xp: 740, due: '14 ngày', mentor: 'Hà My', tags: ['Interview', 'Insight', 'Journey'], summary: 'Thực hiện phỏng vấn, tổng hợp insight và đề xuất cải tiến trải nghiệm.' }
];

const submissionRules = {
  dev: {
    primaryLabel: 'Repository GitHub',
    secondaryLabel: 'Link demo / API docs',
    skillPlaceholder: 'React, Node.js, PostgreSQL, Docker...',
    notePlaceholder: 'Kiến trúc, luồng dữ liệu, API chính, cách chạy project và trade-off kỹ thuật.',
    checklist: ['README có hướng dẫn chạy', 'Có link demo hoặc API docs', 'Không commit file .env', 'Có ảnh/video luồng chính'],
    accepted: 'GitHub, deploy URL, Swagger/Postman, video demo'
  },
  mkt: {
    primaryLabel: 'Link kế hoạch chiến dịch',
    secondaryLabel: 'Dashboard / slide báo cáo',
    skillPlaceholder: 'SEO, Content, Meta Ads, GA4, CRM...',
    notePlaceholder: 'Mục tiêu chiến dịch, persona, insight, kênh triển khai, KPI và ngân sách.',
    checklist: ['Có mục tiêu và KPI', 'Có persona rõ ràng', 'Có lịch triển khai', 'Có bảng đo hiệu quả'],
    accepted: 'Google Slides, Sheet, Looker Studio, PDF case study'
  },
  design: {
    primaryLabel: 'Link Figma / Behance',
    secondaryLabel: 'Prototype / case study',
    skillPlaceholder: 'Figma, UI, UX Research, Motion, Brand...',
    notePlaceholder: 'Vấn đề thiết kế, user flow, quyết định UI/UX, component và kết quả test.',
    checklist: ['Prototype bấm được', 'Có design rationale', 'Có màn hình responsive', 'Có guideline hoặc component'],
    accepted: 'Figma, Behance, Dribbble, PDF case study, video prototype'
  }
};

const feedbackItems = [
  { file: 'portfolio/lo-trinh:12', title: 'Cấu trúc lộ trình rõ', detail: 'Người xem hiểu ngay ngành lớn, chuyên ngành hẹp và cấp độ đang chọn.' },
  { file: 'portfolio/san-pham:27', title: 'Cần bổ sung minh chứng', detail: 'Thêm số liệu, ảnh chụp hoặc link demo để hồ sơ thuyết phục hơn.' },
  { file: 'portfolio/trinh-bay:44', title: 'Trình bày gọn hơn', detail: 'Rút gọn mô tả dự án và đưa kết quả nổi bật lên đầu.' }
];

const demoUsers = [
  {
    id: 'demo-student',
    name: 'Quang Nguyễn',
    email: 'student@portfolio.vn',
    role: 'student',
    selectedMajorKey: 'dev',
    careerGoal: 'Senior Architect',
    path: ['dev-frontend-so-cap', 'dev-fullstack-trung-cap', 'dev-architecture-cao-cap'],
    joinedChallengeIds: ['dev-api', 'dev-dashboard', 'dev-devops'],
    subscription: { planId: 'free', planName: 'Free', status: 'free', expiresAt: null },
    stats: { completedChallenges: 6, mentorRating: 4.8, portfolioProjects: 4, verifiedSkills: 18 },
    portfolio: {
      headline: 'Developer Portfolio - Backend/API oriented',
      bio: 'Sinh viên đang xây portfolio theo hướng Full Stack và Software Architecture.',
      publishedProjects: ['API thương mại điện tử', 'Dashboard nghề nghiệp', 'Case study kiến trúc booking'],
      links: ['https://github.com/demo/portfolio-api', 'https://portfolio.demo']
    },
    badges: ['Xây lộ trình', 'Sẵn sàng thử thách', 'Đã được góp ý', 'Có minh chứng portfolio']
  },
  {
    id: 'student-dev-backend',
    name: 'Bao Le',
    email: 'bao.backend@portfolio.vn',
    role: 'student',
    selectedMajorKey: 'dev',
    careerGoal: 'Lead Backend',
    path: ['dev-backend-so-cap', 'dev-devops-trung-cap', 'dev-architecture-cao-cap'],
    joinedChallengeIds: ['dev-api', 'dev-devops'],
    subscription: { planId: 'premium-month', planName: 'Premium Tháng', status: 'active', expiresAt: '10/08/2026' }
  },
  {
    id: 'student-design-ui',
    name: 'Oanh Do',
    email: 'oanh.ui@portfolio.vn',
    role: 'student',
    selectedMajorKey: 'design',
    careerGoal: 'Senior Product Designer',
    path: ['design-ui-so-cap', 'design-product-trung-cap', 'design-brand-cao-cap'],
    joinedChallengeIds: ['design-ui', 'design-product'],
    subscription: { planId: 'premium-year', planName: 'Premium Năm', status: 'active', expiresAt: '15/06/2027' }
  },
  {
    id: 'student-mkt-seo',
    name: 'Khanh Tran',
    email: 'khanh.seo@portfolio.vn',
    role: 'student',
    selectedMajorKey: 'mkt',
    careerGoal: 'Growth Lead',
    path: ['mkt-seo-so-cap', 'mkt-content-trung-cap', 'mkt-growth-cao-cap'],
    joinedChallengeIds: ['mkt-seo', 'mkt-ads'],
    subscription: { planId: 'free', planName: 'Free', status: 'free', expiresAt: null }
  }
];

const demoMentors = [
  {
    id: 'mentor-demo',
    name: 'Anh Tran',
    email: 'mentor@portfolio.vn',
    role: 'mentor',
    expertise: ['Backend', 'Full Stack', 'Software Architecture', 'DevOps'],
    strongestField: 'Backend API & System Design',
    level: 'Senior Mentor',
    jobTitle: 'Solution Architect',
    currentCompany: 'FinTech SaaS Lab',
    yearsOfExperience: 8,
    strongestTools: ['Node.js', 'MongoDB', 'Docker', 'AWS', 'System Design'],
    reviewCapacity: 12,
    menteeLevels: ['Junior', 'Mid-level', 'Senior'],
    languages: ['Vietnamese', 'English'],
    education: ['B.S. Computer Science', 'AWS Solutions Architect Associate', 'MongoDB Node.js Developer Path'],
    workHistory: [
      { company: 'FPT Software', role: 'Backend Engineer', period: '2018-2020' },
      { company: 'Tiki', role: 'Senior Backend Developer', period: '2020-2023' },
      { company: 'FinTech SaaS Lab', role: 'Solution Architect', period: '2023-2026' }
    ],
    domains: ['E-commerce', 'Booking system', 'Payment workflow', 'Career platform', 'API Security'],
    reviewStyle: 'Review theo checklist: đúng yêu cầu, kiến trúc, bảo mật, README, khả năng đưa vào portfolio.',
    availability: 'Tue/Thu/Sun 19:30-22:00',
    rating: 4.9,
    activeStudents: ['demo-student', 'student-dev-backend']
  },
  {
    id: 'mentor-design-ui',
    name: 'Vy Hoang',
    email: 'vy.ui@portfolio.vn',
    role: 'mentor',
    expertise: ['UI Design', 'Product Design', 'Brand Design'],
    strongestField: 'Product Interface Systems',
    level: 'Lead Mentor',
    currentCompany: 'FinTech Design',
    yearsOfExperience: 7,
    rating: 4.8
  }
];

const demoAdmins = [
  {
    id: 'admin-demo',
    name: 'Portfolio Admin',
    email: 'admin@portfolio.vn',
    role: 'admin',
    title: 'Platform Operations Manager',
    department: 'Career Platform Operations',
    seniority: 'Head Admin',
    permissions: ['manage_challenges', 'manage_users', 'review_submissions', 'edit_content', 'manage_mentors', 'view_reports'],
    responsibilities: ['Quản lý danh mục ngành và thử thách', 'Theo dõi tiến độ nộp bài', 'Điều phối mentor và báo cáo vận hành'],
    operatingMetrics: { weeklyActiveStudents: 126, pendingReviews: 18, publishedChallenges: 103, activeMentors: 10 },
    status: 'active'
  }
];

const demoSubmissions = [
  { id: 'sub-demo-dev-api', userId: 'demo-student', challengeId: 'dev-api', status: 'submitted', primaryLink: 'https://github.com/demo/portfolio-api', secondaryLink: 'https://portfolio-api.demo/swagger', notes: 'API có auth, product/order modules, seed data và Swagger docs.', updatedAt: '09:30' },
  { id: 'sub-demo-dashboard', userId: 'demo-student', challengeId: 'dev-dashboard', status: 'reviewed', primaryLink: 'https://github.com/demo/career-dashboard', secondaryLink: 'https://career-dashboard.demo', notes: 'Dashboard có filter, trạng thái trống và responsive.', updatedAt: '15:10' },
  { id: 'sub-bao-backend', userId: 'student-dev-backend', challengeId: 'dev-api', status: 'submitted', primaryLink: 'https://github.com/demo/student-dev-backend-api-review', secondaryLink: 'https://student-dev-backend-api-review.demo', notes: 'Cần review database design, validation flow và storytelling.', updatedAt: '10:45' },
  { id: 'sub-oanh-ui', userId: 'student-design-ui', challengeId: 'design-ui', status: 'submitted', primaryLink: 'https://figma.com/demo/onboarding-ui', secondaryLink: 'https://behance.net/demo/onboarding-case', notes: 'Prototype onboarding 4 bước với component states.', updatedAt: '11:20' },
  { id: 'sub-khanh-seo', userId: 'student-mkt-seo', challengeId: 'mkt-seo', status: 'rejected', primaryLink: 'https://docs.google.com/demo/seo-audit', secondaryLink: 'https://lookerstudio.google.com/demo/seo', notes: 'Cần bổ sung benchmark đối thủ và timeline 30 ngày.', updatedAt: '13:50' }
];

const demoMentorFeedback = [
  { id: 'fb-demo-dashboard', userId: 'demo-student', challengeId: 'dev-dashboard', score: 86, title: 'Dashboard đã đủ minh chứng portfolio', strengths: ['Luồng filter rõ', 'Có trạng thái trống', 'UI dễ scan'], improvements: ['Thêm số liệu trước-sau', 'Bổ sung test responsive'], reviewer: 'Anh Tran', createdAt: '15:10' },
  { id: 'fb-khanh-seo', userId: 'student-mkt-seo', challengeId: 'mkt-seo', score: 72, title: 'Cần bổ sung dữ liệu cạnh tranh', strengths: ['Keyword map rõ', 'Có cấu trúc audit'], improvements: ['Thêm benchmark đối thủ', 'Bổ sung timeline 30 ngày'], reviewer: 'Duy Lam', createdAt: '13:50' }
];

const demoCategories = [
  { id: 'cat-dev', name: 'Software Engineering', majorKey: 'dev', description: 'Web, backend, mobile, cloud, AI and system design.' },
  { id: 'cat-design', name: 'UI/UX Design', majorKey: 'design', description: 'Product design, interface design, research and motion.' },
  { id: 'cat-mkt', name: 'Digital Marketing', majorKey: 'mkt', description: 'SEO, content, paid ads, CRM, brand and growth.' }
];

const premiumPlans = [
  {
    id: 'premium-month',
    name: 'Premium Tháng',
    price: 79000,
    displayPrice: '79.000đ',
    duration: '1 tháng',
    highlight: 'Dùng thử nghiêm túc',
    description: 'Phù hợp sinh viên muốn thử mentor feedback và mở khóa thêm challenge.',
    features: ['10 challenge/tháng', 'Mentor feedback cơ bản', 'Lưu nhiều lộ trình', 'Xem đầy đủ skills/knowledge/tools'],
    limits: ['Chưa có public portfolio nâng cao', 'Chưa ưu tiên mentor chuyên ngành']
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
    limits: ['Chưa có báo cáo tiến độ dài hạn']
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
    limits: []
  }
];

const demoPremiumSubscriptions = [
  { id: 'sub-premium-1', userId: 'demo-student', userName: 'Quang Nguyễn', planId: 'premium-quarter', planName: 'Premium 3 Tháng', status: 'active', startedAt: '01/07/2026', expiresAt: '01/10/2026', revenue: 199000 },
  { id: 'sub-premium-2', userId: 'student-dev-backend', userName: 'Bao Le', planId: 'premium-month', planName: 'Premium Tháng', status: 'active', startedAt: '10/07/2026', expiresAt: '10/08/2026', revenue: 79000 },
  { id: 'sub-premium-3', userId: 'student-design-ui', userName: 'Oanh Do', planId: 'premium-year', planName: 'Premium Năm', status: 'active', startedAt: '15/06/2026', expiresAt: '15/06/2027', revenue: 499000 },
  { id: 'sub-premium-4', userId: 'student-mkt-seo', userName: 'Khanh Tran', planId: 'free', planName: 'Free', status: 'free', startedAt: '-', expiresAt: '-', revenue: 0 }
];

const trustedMarketSources = [
  { name: 'ITviec Salary Report', type: 'Lương IT Việt Nam', url: 'https://itviec.com/it-salary-report' },
  { name: 'TopDev Vietnam IT Market', type: 'Nhu cầu tuyển dụng IT', url: 'https://topdev.vn/page/bao-cao-thi-truong-it-viet-nam' },
  { name: 'Adecco Vietnam Salary Guide', type: 'Khung lương đa ngành', url: 'https://www.adecco.com.vn/en/knowledge-center/salary-guide/' },
  { name: 'VietnamWorks Career Report', type: 'Tuyển dụng & hành vi ứng viên', url: 'https://www.vietnamworks.com/hrinsider/' },
  { name: 'LinkedIn Jobs on the Rise', type: 'Vai trò tăng trưởng toàn cầu', url: 'https://www.linkedin.com/pulse/topics/jobs-c1/job-search-c27/jobs-on-the-rise-t6975/' }
];

const marketSignalsByMajor = {
  dev: {
    headline: 'AI-assisted engineering, backend API và full stack vẫn là nhóm kỹ năng dễ chuyển thành portfolio nhất.',
    confidence: 'Cao',
    updatedPolicy: 'Tổng hợp hằng ngày từ báo cáo lương, job board và nguồn tuyển dụng công khai.',
    signals: [
      { label: 'Nhu cầu tuyển dụng', value: 'Cao', note: 'Backend, Full Stack, DevOps và AI/Data thường xuất hiện trong JD sản phẩm số.' },
      { label: 'Kỹ năng nổi bật', value: 'API + Cloud + AI', note: 'Nhà tuyển dụng ưu tiên ứng viên có demo chạy được, README rõ và hiểu trade-off.' },
      { label: 'Portfolio nên có', value: '2-3 case study', note: 'Một API/backend, một dashboard/full stack và một bài có AI hoặc automation.' }
    ],
    hotSkills: ['REST API', 'System Design', 'Cloud Deploy', 'Testing', 'AI workflow', 'Observability']
  },
  mkt: {
    headline: 'Marketing đang dịch chuyển sang dữ liệu, automation và đo lường hiệu quả từng kênh.',
    confidence: 'Trung bình cao',
    updatedPolicy: 'Theo dõi báo cáo tuyển dụng, xu hướng nền tảng quảng cáo và benchmark campaign.',
    signals: [
      { label: 'Nhu cầu tuyển dụng', value: 'Ổn định', note: 'Performance, CRM, SEO và Growth có lợi thế khi chứng minh được số liệu.' },
      { label: 'Kỹ năng nổi bật', value: 'Analytics + Content', note: 'Ứng viên cần đọc dữ liệu, viết insight và biến thành kế hoạch hành động.' },
      { label: 'Portfolio nên có', value: 'Case campaign', note: 'Gồm mục tiêu, persona, ngân sách, kênh, KPI và bài học sau chiến dịch.' }
    ],
    hotSkills: ['GA4', 'SEO Audit', 'Paid Ads', 'CRM Flow', 'Content Strategy', 'Market Research']
  },
  design: {
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
};

function getMarketUpdatedLabel() {
  return new Date().toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

function isPremiumChallenge(challenge) {
  return ['Senior', 'Lead', 'Cao cấp'].includes(challenge?.difficulty) || Number(challenge?.xp ?? 0) >= 700;
}

function getChallengeGuide(challenge, currentMajor) {
  const tags = challenge?.tags ?? [];
  const baseDeliverables = {
    dev: ['Repository có README chạy được', 'Link demo hoặc API docs', 'Video walkthrough luồng chính', 'Ghi chú trade-off kỹ thuật'],
    mkt: ['Slide chiến dịch/case study', 'Bảng KPI và ngân sách', 'File nghiên cứu/persona', 'Báo cáo đo lường kết quả'],
    design: ['File Figma có prototype', 'Case study giải thích quyết định', 'Design system/component states', 'Ảnh/video demo luồng chính']
  };
  const guideByMajor = {
    dev: {
      techTitle: 'Công nghệ và kiến trúc bắt buộc',
      technologies: [...tags, 'Auth flow', 'Data model', 'Validation', 'Deploy/Demo'],
      skills: ['Tách module rõ ràng', 'Xử lý trạng thái loading/error/empty', 'Thiết kế luồng dữ liệu', 'Viết README để người khác chạy được'],
      businessRules: challenge?.track === 'Mobile'
        ? ['Người dùng đăng nhập mới được đặt lịch', 'Khung giờ đã được đặt không thể đặt trùng', 'Lịch có trạng thái: pending, confirmed, cancelled, completed', 'Người dùng xem được lịch sử và có thể hủy lịch trước giờ hẹn', 'Form phải validate ngày, giờ, ghi chú và thông tin liên hệ']
        : ['Phân quyền người dùng theo vai trò', 'Dữ liệu đầu vào phải được validate trước khi lưu', 'Không làm mất dữ liệu khi refresh hoặc lỗi mạng', 'Có trạng thái rỗng và thông báo lỗi để người dùng biết cần làm gì', 'Luôn có minh chứng cho hành động quan trọng'],
      steps: ['Phân tích user flow và vẽ sơ đồ màn hình/API', 'Tạo schema dữ liệu và rule validation', 'Làm luồng chính trước, sau đó bổ sung edge case', 'Test với 5-8 tình huống thật', 'Viết README, chụp ảnh và quay demo ngắn'],
      acceptance: ['Chạy được từ đầu theo hướng dẫn', 'Luôn có feedback khi thành công/thất bại', 'Code chia component/module để review', 'Có dữ liệu mẫu cho mentor test nhanh']
    },
    mkt: {
      techTitle: 'Công cụ và tài liệu cần có',
      technologies: [...tags, 'Google Sheets', 'Slides', 'GA4/Looker Studio', 'Persona canvas'],
      skills: ['Phân tích insight khách hàng', 'Đặt KPI đo được', 'Lập timeline và ngân sách', 'Giải thích lý do chọn kênh'],
      businessRules: ['Mỗi chiến dịch phải có mục tiêu kinh doanh rõ', 'KPI phải gắn với funnel: awareness, activation, conversion, retention', 'Ngân sách cần chia theo kênh và có lý do ưu tiên', 'Nội dung phải khớp persona và pain point', 'Báo cáo phải có phương án tối ưu sau khi có dữ liệu'],
      steps: ['Chọn sản phẩm và nhóm khách hàng mục tiêu', 'Viết persona, insight và thông điệp chính', 'Thiết kế funnel, kênh triển khai và lịch nội dung', 'Lập bảng KPI, ngân sách, rủi ro', 'Đóng gói thành slide/case study có số liệu'],
      acceptance: ['Có bảng KPI trước/sau', 'Có ít nhất 3 nội dung mẫu', 'Có timeline triển khai theo ngày/tuần', 'Có đề xuất hành động nếu kết quả thấp']
    },
    design: {
      techTitle: 'Công cụ và artifact thiết kế',
      technologies: [...tags, 'Figma', 'Prototype', 'Design system', 'Usability notes'],
      skills: ['Xây user flow', 'Thiết kế component có state', 'Giải thích visual hierarchy', 'Kiểm tra tính dễ dùng'],
      businessRules: ['Màn hình phải giải quyết đúng vấn đề người dùng', 'Mỗi CTA chính cần có trạng thái mặc định, hover, disabled/loading', 'Prototype phải bấm được luồng chính', 'Thiết kế cần tính đến empty/error/success state', 'Case study phải nói rõ trade-off và lý do ra quyết định'],
      steps: ['Xác định problem statement và user goal', 'Vẽ flow và wireframe trước khi làm UI', 'Tạo component/token và các state quan trọng', 'Làm prototype, test nhanh với 3-5 tình huống', 'Viết case study gồm problem, process, result'],
      acceptance: ['Prototype có thể click hết luồng chính', 'Có component states và responsive note', 'Có before/after hoặc lý do cải tiến', 'File Figma sắp xếp để mentor review']
    }
  };
  const selected = guideByMajor[currentMajor?.key] ?? guideByMajor.dev;
  return { ...selected, deliverables: baseDeliverables[currentMajor?.key] ?? baseDeliverables.dev };
}

function getSubmissionGuide(challenge, currentMajor) {
  const base = getChallengeGuide(challenge, currentMajor);
  const guideByMajor = {
    dev: {
      requiredSections: ['Problem statement va user flow', 'Tech stack va cach chay project', 'Database/API design', 'Test cases va edge cases', 'Demo link hoac video'],
      evidenceRules: ['README phai co lenh install, seed, run', 'Link demo/API docs phai truy cap duoc', 'Khong de lo secret, token, file .env', 'Mo ta it nhat 3 business rule da xu ly'],
      rejectionReasons: ['Repo khong chay duoc', 'Thieu huong dan test', 'Khong co validation/edge case', 'Link demo loi hoac khong cong khai'],
      reviewFlow: ['Student luu ban nhap', 'Student gui mentor', 'Mentor accept bai review', 'Mentor xem link + minh chung', 'Mentor cham diem va tra feedback']
    },
    mkt: {
      requiredSections: ['Business objective', 'Persona va insight', 'Channel plan va content calendar', 'KPI/ngan sach', 'Bao cao do luong va de xuat toi uu'],
      evidenceRules: ['KPI phai co cong thuc do', 'Persona phai co pain point ro', 'Ngan sach phai chia theo kenh', 'Slide/case study co ket luan hanh dong'],
      rejectionReasons: ['Chi co y tuong, khong co KPI', 'Thieu persona/insight', 'Khong co timeline trien khai', 'So lieu khong co nguon hoac khong giai thich'],
      reviewFlow: ['Student nop deck/sheet', 'Mentor kiem tra logic funnel', 'Mentor review KPI va ngan sach', 'Mentor yeu cau bo sung neu thieu so lieu', 'Student cap nhat case study portfolio']
    },
    design: {
      requiredSections: ['Problem statement', 'User flow/wireframe', 'UI screens va component states', 'Prototype link', 'Design rationale va usability notes'],
      evidenceRules: ['Figma link phai cho phep view', 'Prototype bam duoc luong chinh', 'Co empty/error/success state', 'Case study giai thich ly do thiet ke'],
      rejectionReasons: ['File Figma khong mo duoc', 'Chi co UI khong co process', 'Thieu state quan trong', 'Khong co prototype hoac minh chung test'],
      reviewFlow: ['Student nop Figma/case study', 'Mentor xem flow va problem fit', 'Mentor check UI system va state', 'Mentor gop y usability', 'Student sua va publish portfolio']
    }
  };
  const selected = guideByMajor[currentMajor?.key] ?? guideByMajor.dev;
  return {
    ...selected,
    submissionPackage: base.deliverables,
    acceptance: base.acceptance
  };
}

function formatVnd(value) {
  return `${Number(value || 0).toLocaleString('vi-VN')}đ`;
}

const statusLabels = {
  draft: 'B\u1ea3n nh\u00e1p',
  submitted: '\u0110ang review',
  reviewed: '\u0110\u00e3 c\u00f3 feedback',
  rejected: 'C\u1ea7n n\u1ed9p l\u1ea1i',
  validation_failed: 'C\u1ea7n ki\u1ec3m tra link'
};

function isValidHttpUrl(value) {
  if (!value?.trim()) return false;
  try {
    const url = new URL(value.trim());
    return ['http:', 'https:'].includes(url.protocol) && url.hostname.includes('.');
  } catch {
    return false;
  }
}

function splitSkillInput(value) {
  return String(value || '')
    .split(/[,;\n]/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function validateSubmissionPayload(payload, challenge, currentMajor) {
  const primaryOk = isValidHttpUrl(payload.primaryLink);
  const secondaryBlank = !payload.secondaryLink?.trim();
  const secondaryOk = secondaryBlank || isValidHttpUrl(payload.secondaryLink);
  const skills = splitSkillInput(payload.skills);
  const noteLength = String(payload.notes || '').trim().length;
  const challengeTags = challenge?.tags ?? [];
  const skillOverlap = skills.filter((skill) => (
    challengeTags.some((tag) => tag.toLowerCase().includes(skill.toLowerCase()) || skill.toLowerCase().includes(tag.toLowerCase()))
  ));
  const checks = [
    { key: 'primaryLink', label: 'Link ch\u00ednh h\u1ee3p l\u1ec7', ok: primaryOk, detail: primaryOk ? 'URL c\u00f3 th\u1ec3 m\u1edf \u0111\u1ec3 mentor xem b\u00e0i.' : 'D\u00e1n link GitHub, Figma, Google Docs ho\u1eb7c demo b\u1eaft \u0111\u1ea7u b\u1eb1ng http/https.' },
    { key: 'secondaryLink', label: 'Link minh ch\u1ee9ng ph\u00f9 h\u1ee3p', ok: secondaryOk, detail: secondaryOk ? 'Link ph\u1ee5 s\u1eb5n s\u00e0ng ho\u1eb7c c\u00f3 th\u1ec3 b\u1ed5 sung sau.' : 'Link ph\u1ee5 kh\u00f4ng \u0111\u00fang \u0111\u1ecbnh d\u1ea1ng URL.' },
    { key: 'skills', label: 'Khai b\u00e1o k\u1ef9 n\u0103ng', ok: skills.length >= 2, detail: skills.length >= 2 ? String(skills.length) + ' k\u1ef9 n\u0103ng \u0111\u01b0\u1ee3c ghi nh\u1eadn.' : 'Nh\u1eadp \u00edt nh\u1ea5t 2 k\u1ef9 n\u0103ng, v\u00ed d\u1ee5: React, API, UX.' },
    { key: 'notes', label: 'Ghi ch\u00fa nghi\u1ec7p v\u1ee5', ok: noteLength >= 20, detail: noteLength >= 20 ? 'Ghi ch\u00fa \u0111\u1ee7 \u0111\u1ec3 mentor n\u1eafm b\u1ed1i c\u1ea3nh.' : 'M\u00f4 t\u1ea3 ng\u1eafn lu\u1ed3ng x\u1eed l\u00fd, logic ch\u00ednh v\u00e0 ph\u1ea7n c\u1ea7n mentor xem.' }
  ];
  return {
    checks,
    errors: checks.filter((item) => !item.ok),
    score: Math.round((checks.filter((item) => item.ok).length / checks.length) * 100),
    skillOverlap
  };
}

function matchMentorForChallenge(challenge, mentors = []) {
  const normalizedTrack = String(challenge?.track || '').toLowerCase();
  const normalizedMentor = String(challenge?.mentor || '').toLowerCase();
  return mentors.find((mentor) => mentor.id === challenge?.mentorId)
    ?? mentors.find((mentor) => String(mentor.name || '').toLowerCase() === normalizedMentor)
    ?? mentors.find((mentor) => (mentor.expertise ?? []).some((item) => {
      const expertise = String(item).toLowerCase();
      return expertise === normalizedTrack || expertise.includes(normalizedTrack) || normalizedTrack.includes(expertise);
    }))
    ?? mentors.find((mentor) => String(mentor.role || '').toLowerCase() === 'mentor')
    ?? { id: 'mentor-auto', name: challenge?.mentor || 'Mentor Demo', expertise: [challenge?.track].filter(Boolean) };
}

function App() {
  const [page, setPage] = useState('auth');
  const [authMode, setAuthMode] = useState('login');
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem('portfolio-theme') || 'light';
    } catch {
      return 'light';
    }
  });
  const [remoteData, setRemoteData] = useState(null);
  const [apiStatus, setApiStatus] = useState('local');
  const [currentUser, setCurrentUser] = useState(null);
  const [adminNotice, setAdminNotice] = useState('');
  const [selectedMajorKey, setSelectedMajorKey] = useState('dev');
  const [selectedRoleId, setSelectedRoleId] = useState('dev-fullstack-trung-cap');
  const [path, setPath] = useState(['dev-frontend-so-cap', 'dev-fullstack-trung-cap', 'dev-architecture-cao-cap']);
  const [selectedChallengeId, setSelectedChallengeId] = useState('dev-api');
  const [activeTrack, setActiveTrack] = useState('Tất cả');
  const [savedPathName, setSavedPathName] = useState('');
  const [joinedChallengeIds, setJoinedChallengeIds] = useState([]);
  const [submissionStatus, setSubmissionStatus] = useState({});
  const currentRole = currentUser?.type ?? currentUser?.user?.role ?? null;
  const fallbackData = useMemo(() => ({
    majors: majorCatalog,
    challenges,
    submissionRules,
    demoUser: demoUsers[0],
    users: demoUsers,
    admins: demoAdmins,
    mentors: demoMentors,
    mentorFeedback: demoMentorFeedback,
    submissions: demoSubmissions,
    premiumPlans,
    premiumSubscriptions: demoPremiumSubscriptions,
    categories: demoCategories,
    resources: [],
    notifications: [
      { id: 'noti-demo-review', userId: 'mentor-demo', role: 'mentor', title: '3 bài đang chờ mentor review', unread: true, createdAt: '09:00' },
      { id: 'noti-demo-admin', userId: 'admin-demo', role: 'admin', title: 'Dashboard demo đã có user, mentor, challenge và submissions', unread: true, createdAt: '09:15' }
    ]
  }), []);
  const appData = remoteData ?? fallbackData;

  const loadBootstrap = () => {
    const controller = new AbortController();

    fetch(`${API_BASE_URL}/api/bootstrap`, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error('API bootstrap failed');
        return response.json();
      })
      .then((data) => {
        setRemoteData(data);
        setApiStatus('mongo');
      })
      .catch((error) => {
        if (error.name !== 'AbortError') {
          setApiStatus('local');
        }
      });

    return controller;
  };

  useEffect(() => {
    const controller = loadBootstrap();
    return () => controller.abort();
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem('portfolio-theme', theme);
    } catch {
      // Ignore storage errors in restricted browser contexts.
    }
  }, [theme]);

  const catalog = appData?.majors?.length ? appData.majors : majorCatalog;
  const challengeList = appData?.challenges?.length ? appData.challenges : challenges;
  const rulesByMajor = appData?.submissionRules && Object.keys(appData.submissionRules).length ? appData.submissionRules : submissionRules;
  const demoUser = currentRole === 'student' ? currentUser.user : appData?.demoUser;
  const userId = demoUser?.id ?? 'demo-student';
  const submissionList = appData?.submissions ?? [];
  const feedbackList = appData?.mentorFeedback ?? [];
  const userMajorKey = currentRole === 'student' ? (currentUser.user.selectedMajorKey ?? selectedMajorKey) : null;
  const activeSubscription = currentRole === 'student'
    ? (currentUser.user.subscription ?? { planId: 'free', planName: 'Free', status: 'free' })
    : { planId: 'free', planName: 'Free', status: 'free' };
  const isPremium = activeSubscription.status === 'active' && activeSubscription.planId !== 'free';
  const upgradePlan = (plan) => {
    const expiresAt = plan.id === 'premium-month' ? '20/08/2026' : plan.id === 'premium-quarter' ? '20/10/2026' : '20/07/2027';
    setCurrentUser((current) => {
      if (!current?.user) return current;
      return {
        ...current,
        user: {
          ...current.user,
          subscription: {
            planId: plan.id,
            planName: plan.name,
            status: 'active',
            startedAt: '20/07/2026',
            expiresAt
          }
        }
      };
    });
    setAdminNotice(`Đã nâng cấp ${plan.name}. Các tính năng Premium đã được mở khóa.`);
  };

  useEffect(() => {
    if (!appData?.demoUser) return;

    const activeRole = currentUser?.type ?? currentUser?.user?.role;

    if (activeRole === 'student' && currentUser.user?.path?.length) {
      setSelectedMajorKey(currentUser.user.selectedMajorKey ?? 'dev');
      setPath(currentUser.user.path);
    } else if (!currentUser && appData.demoUser.path?.length) {
      setPath(appData.demoUser.path);
    }
    const activeUser = activeRole === 'student' ? currentUser.user : appData.demoUser;
    const userSubmissions = (appData.submissions ?? []).filter((item) => item.userId === activeUser?.id);

    if (activeUser?.joinedChallengeIds?.length) {
      setJoinedChallengeIds(activeUser.joinedChallengeIds);
    }
    if (userSubmissions.length) {
      setJoinedChallengeIds((current) => [...new Set([...current, ...userSubmissions.map((item) => item.challengeId)])]);
      setSubmissionStatus(userSubmissions.reduce((acc, item) => ({
        ...acc,
        [item.challengeId]: { status: item.status, updatedAt: item.updatedAt }
      }), {}));
    }
  }, [appData, currentUser]);

  const currentMajor = catalog.find((item) => item.key === selectedMajorKey) ?? catalog[0];
  const canBuildPath = currentRole === 'student' && currentMajor?.key === userMajorKey;
  const careerColumns = currentMajor.columns;
  const allRoles = useMemo(() => careerColumns.flatMap((column) => column.roles), [careerColumns]);
  const selectedRole = allRoles.find((item) => item.id === selectedRoleId) ?? allRoles[0];
  const visibleChallenges = challengeList.filter((item) => item.majorKey === selectedMajorKey && (activeTrack === 'Tất cả' || item.track === activeTrack));
  const selectedChallenge = challengeList.find((item) => item.id === selectedChallengeId) ?? visibleChallenges[0] ?? challengeList[0];
  const selectedColumn = careerColumns.find((column) => column.title === selectedRole.track) ?? careerColumns[0];
  const pathRoles = path.map((roleId) => allRoles.find((roleItem) => roleItem.id === roleId)).filter(Boolean);

  const go = (id) => setPage(id);
  const changeMajor = (majorKey) => {
    const nextMajor = catalog.find((item) => item.key === majorKey) ?? catalog[0];
    const nextRole = nextMajor.columns[0].roles[2];
    const nextPath = nextMajor.columns.slice(0, 3).map((column, index) => column.roles[Math.min(index + 1, levels.length - 1)].id);
    const nextChallenge = challengeList.find((item) => item.majorKey === majorKey);
    setSelectedMajorKey(majorKey);
    setSelectedRoleId(nextRole.id);
    if (!currentUser || majorKey === userMajorKey) {
      setPath(currentRole === 'student' && currentUser.user.path?.length ? currentUser.user.path : nextPath);
    }
    setActiveTrack('Tất cả');
    setSelectedChallengeId(nextChallenge?.id ?? selectedChallengeId);
    setSavedPathName('');
  };
  const addToPath = (roleId) => {
    if (!canBuildPath) return;
    setPath((current) => (current.includes(roleId) ? current : [...current, roleId]));
  };
  const removeFromPath = (roleId) => {
    if (!canBuildPath) return;
    setPath((current) => current.filter((item) => item !== roleId));
  };
  const clearPath = () => {
    if (!canBuildPath) return;
    setPath([]);
  };
  const savePath = () => {
    if (!canBuildPath) {
      setSavedPathName('Chỉ ngành đã chọn khi đăng nhập mới được lưu lộ trình');
      return;
    }
    const savedAt = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setSavedPathName(`Đã lưu lộ trình ${currentMajor.short} lúc ${savedAt}`);
    if (apiStatus === 'mongo') {
      fetch(`${API_BASE_URL}/api/users/${userId}/path`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          path,
          selectedMajorKey,
          careerGoal: pathRoles[pathRoles.length - 1]?.title ?? currentMajor.title
        })
      })
        .then((response) => response.ok ? response.json() : null)
        .then((user) => {
          if (user) setCurrentUser((current) => ({ ...(current ?? { type: 'student' }), type: 'student', user }));
        })
        .catch(() => undefined);
    }
  };
  const loginAs = (type, customPayload = null) => {
    const buildStudentForSelectedMajor = (baseUser = appData?.demoUser ?? demoUsers[0]) => {
      const loginMajor = catalog.find((item) => item.key === selectedMajorKey) ?? catalog[0];
      const loginPath = baseUser.selectedMajorKey === selectedMajorKey && baseUser.path?.length
        ? baseUser.path
        : loginMajor.columns.slice(0, 3).map((column, index) => column.roles[Math.min(index + 1, levels.length - 1)].id);
      return {
        user: { ...baseUser, role: 'student', selectedMajorKey, path: loginPath },
        path: loginPath
      };
    };
    const payload = customPayload ?? (type === 'admin'
      ? { email: 'admin@portfolio.vn', password: 'admin123' }
      : type === 'mentor'
        ? { email: 'mentor@portfolio.vn', password: 'mentor123' }
        : { email: 'student@portfolio.vn', password: '123456' });

    fetch(`${API_BASE_URL}/api/auth/login`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
      .then((response) => response.ok ? response.json() : Promise.reject(new Error('login failed')))
      .then((data) => {
        const normalizedData = {
          ...data,
          type: data.type ?? data.user?.role ?? type,
          user: { ...data.user, role: data.user?.role ?? data.type ?? type }
        };
        setCurrentUser(normalizedData);
        if (normalizedData.type === 'admin') {
          setAdminNotice('Đã đăng nhập admin demo');
          setPage('admin');
          return;
        }
        if (normalizedData.type === 'mentor') {
          setAdminNotice('Đã đăng nhập mentor demo');
          setPage('mentor');
          return;
        }
        const { user: studentUser, path: loginPath } = buildStudentForSelectedMajor(normalizedData.user);
        setCurrentUser({ type: 'student', user: studentUser });
        setSelectedMajorKey(selectedMajorKey);
        setPath(loginPath);
        setJoinedChallengeIds(normalizedData.user.joinedChallengeIds ?? []);
        if (apiStatus === 'mongo') {
          fetch(`${API_BASE_URL}/api/users/${normalizedData.user.id}/path`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ path: loginPath, selectedMajorKey, careerGoal: loginPath[loginPath.length - 1] })
          }).catch(() => undefined);
        }
        setPage('roadmap');
      })
      .catch(() => {
        const fallback = type === 'admin'
          ? { type: 'admin', user: demoAdmins[0] }
          : type === 'mentor'
            ? { type: 'mentor', user: demoMentors[0] }
            : { type: 'student', user: buildStudentForSelectedMajor().user };
        setCurrentUser(fallback);
        if (type === 'student') {
          const { path: loginPath } = buildStudentForSelectedMajor(fallback.user);
          setSelectedMajorKey(selectedMajorKey);
          setPath(loginPath);
        }
        setPage(type === 'admin' ? 'admin' : type === 'mentor' ? 'mentor' : 'roadmap');
      });
  };

  useEffect(() => {
    const activeRole = currentUser?.type ?? currentUser?.user?.role;
    const rolePages = {
      student: ['roadmap', 'hub', 'join', 'submit', 'feedback', 'portfolio', 'premium'],
      mentor: ['mentor'],
      admin: ['admin']
    };
    if (!currentUser && page !== 'auth') {
      setPage('auth');
      return;
    }
    if (currentUser && page === 'auth') {
      setPage(activeRole === 'student' ? 'roadmap' : activeRole);
      return;
    }
    if (currentUser && !rolePages[activeRole]?.includes(page)) {
      setPage(activeRole === 'student' ? 'roadmap' : activeRole);
    }
  }, [currentUser, page]);

  const joinChallenge = (challengeId) => {
    setJoinedChallengeIds((current) => (current.includes(challengeId) ? current : [...current, challengeId]));
    if (apiStatus === 'mongo') {
      fetch(`${API_BASE_URL}/api/users/${userId}/joined-challenges`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ challengeId })
      }).catch(() => undefined);
    }
  };
  const persistSubmission = (challengeId, status, payload = {}) => {
    const optimisticSubmission = {
      id: payload.id || `sub-${demoUser?.id ?? 'demo-student'}-${challengeId}`,
      userId: demoUser?.id ?? 'demo-student',
      challengeId,
      status,
      ...payload,
      updatedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setRemoteData((current) => {
      const source = current ?? appData;
      return {
        ...source,
        submissions: [
          ...(source?.submissions ?? []).filter((item) => !(item.userId === optimisticSubmission.userId && item.challengeId === challengeId)),
          optimisticSubmission
        ]
      };
    });

    if (apiStatus !== 'mongo') return Promise.resolve(optimisticSubmission);

    return fetch(`${API_BASE_URL}/api/submissions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: optimisticSubmission.userId,
        challengeId,
        status,
        ...payload
      })
    })
      .then((response) => response.ok ? response.json() : Promise.reject(new Error('submission failed')))
      .then((submission) => {
        setRemoteData((current) => ({
          ...current,
          submissions: [
            ...(current?.submissions ?? []).filter((item) => !(item.userId === submission.userId && item.challengeId === challengeId)),
            submission
          ]
        }));
        setSubmissionStatus((current) => ({
          ...current,
          [challengeId]: {
            status: submission.status,
            updatedAt: submission.updatedAt,
            mentor: submission.mentor,
            mentorId: submission.mentorId,
            validationChecks: submission.validationChecks,
            validationScore: submission.validationScore
          }
        }));
        return submission;
      })
      .catch(() => optimisticSubmission);
  };

  const updatePortfolio = () => {
    const portfolio = {
      headline: `${currentMajor.title} Portfolio - ${pathRoles[pathRoles.length - 1]?.title ?? currentMajor.short}`,
      bio: `Hồ sơ đang theo ${currentMajor.title}, có ${pathRoles.length} vị trí trong lộ trình và ${joinedChallengeIds.length} thử thách đã tham gia.`,
      publishedProjects: visibleChallenges.slice(0, 3).map((item) => item.title),
      links: ['https://github.com/demo/portfolio-api', 'https://portfolio.demo']
    };

    if (apiStatus !== 'mongo') return;
    fetch(`${API_BASE_URL}/api/users/${userId}/portfolio`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        portfolio,
        stats: {
          completedChallenges: Object.values(submissionStatus).filter((item) => ['submitted', 'reviewed'].includes(item.status)).length,
          mentorRating: 4.8,
          portfolioProjects: portfolio.publishedProjects.length,
          verifiedSkills: Math.max(18, pathRoles.length * 4)
        }
      })
    })
      .then((response) => response.ok ? response.json() : null)
      .then((user) => {
        if (user) setCurrentUser((current) => ({ ...(current ?? { type: 'student' }), type: 'student', user }));
      })
      .catch(() => undefined);
  };

  const refreshData = () => loadBootstrap();
  const saveDraft = (challengeId, payload = {}) => {
    const challenge = challengeList.find((item) => item.id === challengeId);
    const mentor = matchMentorForChallenge(challenge, appData.mentors ?? []);
    const validation = validateSubmissionPayload(payload, challenge, currentMajor);
    setSubmissionStatus((current) => ({
      ...current,
      [challengeId]: { status: 'draft', updatedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), mentor: mentor.name, mentorId: mentor.id, validationChecks: validation.checks, validationScore: validation.score }
    }));
    persistSubmission(challengeId, 'draft', { ...payload, mentor: mentor.name, mentorId: mentor.id, validationChecks: validation.checks, validationScore: validation.score });
    return { ok: true, validation, mentor };
  };
  const submitChallenge = (challengeId, payload = {}) => {
    const challenge = challengeList.find((item) => item.id === challengeId);
    const mentor = matchMentorForChallenge(challenge, appData.mentors ?? []);
    const validation = validateSubmissionPayload(payload, challenge, currentMajor);
    if (validation.errors.length) {
      setSubmissionStatus((current) => ({
        ...current,
        [challengeId]: { status: 'validation_failed', updatedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), mentor: mentor.name, mentorId: mentor.id, validationChecks: validation.checks, validationScore: validation.score }
      }));
      return { ok: false, validation, mentor };
    }
    setSubmissionStatus((current) => ({
      ...current,
      [challengeId]: { status: 'submitted', updatedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), mentor: mentor.name, mentorId: mentor.id, validationChecks: validation.checks, validationScore: validation.score }
    }));
    persistSubmission(challengeId, 'submitted', { ...payload, mentor: mentor.name, mentorId: mentor.id, validationChecks: validation.checks, validationScore: validation.score, matchedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) });
    return { ok: true, validation, mentor };
  };

  const createFeedback = (challengeId, submissionUserId = userId) => {
    if (apiStatus !== 'mongo') return;
    const challenge = challengeList.find((item) => item.id === challengeId);
    fetch(`${API_BASE_URL}/api/feedback`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: submissionUserId,
        challengeId,
        score: 88,
        reviewer: challenge?.mentor ?? 'Mentor Demo',
        title: `Feedback cho ${challenge?.title ?? challengeId}`,
        strengths: [
          'B\u00e0i l\u00e0m b\u00e1m \u0111\u00fang m\u1ee5c ti\u00eau challenge v\u00e0 c\u00f3 link \u0111\u1ec3 mentor ki\u1ec3m tra.',
          'C\u00e1ch tr\u00ecnh b\u00e0y s\u1ea3n ph\u1ea9m \u0111\u00e3 \u0111\u1ee7 r\u00f5 \u0111\u1ec3 chuy\u1ec3n th\u00e0nh case study portfolio.',
          'Minh ch\u1ee9ng n\u1ed9p b\u00e0i ph\u00f9 h\u1ee3p v\u1edbi chuy\u00ean ng\u00e0nh ' + (challenge?.track ?? 'hi\u1ec7n t\u1ea1i') + '.'
        ],
        improvements: [
          'B\u1ed5 sung README ng\u1eafn: c\u00e1ch ch\u1ea1y, t\u00e0i kho\u1ea3n demo, c\u00e1c m\u00e0n h\u00ecnh ho\u1eb7c endpoint quan tr\u1ecdng.',
          'Vi\u1ebft r\u00f5 trade-off: v\u00ec sao ch\u1ecdn c\u00f4ng ngh\u1ec7 n\u00e0y, ph\u1ea7n n\u00e0o c\u00f3 th\u1ec3 m\u1edf r\u1ed9ng khi l\u00e0m th\u1eadt.',
          'Th\u00eam \u1ea3nh/video walkthrough \u0111\u1ec3 nh\u00e0 tuy\u1ec3n d\u1ee5ng ho\u1eb7c gi\u1ea3ng vi\u00ean xem nhanh trong 1 ph\u00fat.'
        ]
      })
    })
      .then((response) => response.ok ? response.json() : null)
      .then((feedback) => {
        if (!feedback) return;
        setRemoteData((current) => ({
          ...current,
          mentorFeedback: [
            ...(current?.mentorFeedback ?? []).filter((item) => !(item.userId === submissionUserId && item.challengeId === challengeId)),
            feedback
          ],
          submissions: (current?.submissions ?? []).map((item) => (
            item.userId === submissionUserId && item.challengeId === challengeId
              ? { ...item, status: 'reviewed', feedbackId: feedback.id, updatedAt: feedback.createdAt }
              : item
          ))
        }));
        setSubmissionStatus((current) => ({
          ...current,
          [challengeId]: { status: 'reviewed', updatedAt: feedback.createdAt }
        }));
      })
      .catch(() => undefined);
  };
  const movePath = (index, direction) => {
    setPath((current) => {
      const next = [...current];
      const target = index + direction;
      if (target < 0 || target >= next.length) return current;
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  };
  const logout = () => {
    fetch(`${API_BASE_URL}/api/auth/logout`, {
      method: 'POST',
      credentials: 'include'
    }).catch(() => undefined);
    setCurrentUser(null);
    setAdminNotice('');
    setJoinedChallengeIds([]);
    setSubmissionStatus({});
    setSavedPathName('');
    setPage('auth');
  };

  return (
    <div className={`app-shell page-${page}`} data-theme={theme}>
      <Header page={page} go={go} currentUser={currentUser} theme={theme} setTheme={setTheme} logout={logout} />
      <main>
        {page === 'auth' && (
          <AuthPage
            authMode={authMode}
            setAuthMode={setAuthMode}
            majors={catalog}
            selectedMajorKey={selectedMajorKey}
            changeMajor={changeMajor}
            submissionRulesData={rulesByMajor}
            loginAs={loginAs}
            go={go}
          />
        )}
        {page === 'roadmap' && (
          <CareerMapPage
            majors={catalog}
            currentMajor={currentMajor}
            changeMajor={changeMajor}
            columns={careerColumns}
            levels={levels}
            selectedColumn={selectedColumn}
            selectedRole={selectedRole}
            selectedRoleId={selectedRoleId}
            setSelectedRoleId={setSelectedRoleId}
            path={path}
            pathRoles={pathRoles}
            allRoles={allRoles}
            addToPath={addToPath}
            removeFromPath={removeFromPath}
            movePath={movePath}
            clearPath={clearPath}
            savePath={savePath}
            savedPathName={savedPathName}
            canBuildPath={canBuildPath}
            userMajorKey={userMajorKey}
            go={go}
          />
        )}
        {page === 'trends' && <MarketTrendsPage currentMajor={currentMajor} go={go} />}
        {page === 'hub' && (
          <ChallengeHubPage
            currentMajor={currentMajor}
            activeTrack={activeTrack}
            setActiveTrack={setActiveTrack}
            visibleChallenges={visibleChallenges}
            setSelectedChallengeId={setSelectedChallengeId}
            joinedChallengeIds={joinedChallengeIds}
            submissionStatus={submissionStatus}
            joinChallenge={joinChallenge}
            isPremium={isPremium}
            go={go}
          />
        )}
        {page === 'join' && <JoinChallengePage challenge={selectedChallenge} currentMajor={currentMajor} joined={joinedChallengeIds.includes(selectedChallenge.id)} submission={submissionStatus[selectedChallenge.id]} joinChallenge={joinChallenge} isPremium={isPremium} go={go} />}
        {page === 'submit' && <SubmitProjectPage challenge={selectedChallenge} currentMajor={currentMajor} joined={joinedChallengeIds.includes(selectedChallenge.id)} submission={submissionStatus[selectedChallenge.id]} mentors={appData.mentors ?? []} joinChallenge={joinChallenge} saveDraft={saveDraft} submitChallenge={submitChallenge} submissionRulesData={rulesByMajor} isPremium={isPremium} go={go} />}
        {page === 'feedback' && <MentorFeedbackPage go={go} challenge={selectedChallenge} submission={submissionList.find((item) => item.userId === userId && item.challengeId === selectedChallenge.id)} feedback={feedbackList.find((item) => item.userId === userId && item.challengeId === selectedChallenge.id)} mentors={appData.mentors ?? []} createFeedback={() => createFeedback(selectedChallenge.id, userId)} />}
        {page === 'portfolio' && <PortfolioPage pathRoles={pathRoles} currentMajor={currentMajor} go={go} demoUser={demoUser} apiStatus={apiStatus} submissions={submissionList} challenges={challengeList} updatePortfolio={updatePortfolio} isPremium={isPremium} />}
        {page === 'premium' && <PremiumPage plans={premiumPlans} activeSubscription={activeSubscription} upgradePlan={upgradePlan} go={go} />}
        {page === 'mentor' && <MentorPage apiStatus={apiStatus} data={appData} currentUser={currentUser} refreshData={refreshData} createFeedback={createFeedback} setNotice={setAdminNotice} notice={adminNotice} />}
        {page === 'admin' && <AdminPage apiStatus={apiStatus} data={appData} notice={adminNotice} currentUser={currentUser} refreshData={refreshData} setAdminNotice={setAdminNotice} createFeedback={createFeedback} />}
      </main>
    </div>
  );
}

function Header({ page, go, currentUser, theme, setTheme, logout }) {
  const currentRole = currentUser?.type ?? currentUser?.user?.role;
  const roleFlow = currentRole === 'student'
    ? flow.filter((item) => ['roadmap', 'trends', 'hub', 'join', 'submit', 'feedback', 'portfolio', 'premium'].includes(item.id))
    : currentRole === 'mentor'
      ? flow.filter((item) => item.id === 'mentor')
      : currentRole === 'admin'
        ? flow.filter((item) => item.id === 'admin')
        : flow.filter((item) => item.id === 'auth');
  const activeIndex = roleFlow.findIndex((item) => item.id === page);
  const homePage = currentRole === 'student' ? 'roadmap' : currentRole ?? 'auth';
  const roleLabel = currentUser ? `${(currentRole ?? 'student').toUpperCase()} · ${currentUser.user?.name ?? currentUser.user?.email}` : 'Guest';
  return (
    <header className="topbar">
      <button className="brand" onClick={() => go(homePage)} aria-label="Ch?n chuy?n ng?nh h?p">
        <span className="brand-mark"><ChevronsUp size={20} /></span>
        <span>Portfolio</span>
      </button>
      <nav className="flow-nav role-nav" aria-label="Điều hướng theo vai trò">
        {roleFlow.map((item, index) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              className={`flow-pill ${page === item.id ? 'active' : ''} ${index <= activeIndex ? 'visited' : ''}`}
              onClick={() => go(item.id)}
              title={item.label}
            >
              <Icon size={15} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
      <div className="topbar-actions">
      <div className="role-chip">
        <UserRound size={15} />
        <span>{roleLabel}</span>
      </div>
      {currentUser && (
        <button className="logout-chip" type="button" onClick={logout} title="Đăng xuất để test tài khoản khác">
          <LogOut size={15} />
          <span>Đăng xuất</span>
        </button>
      )}
      <button
        className="theme-toggle"
        type="button"
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        title={theme === 'dark' ? 'Chuyển sang Light mode' : 'Chuyển sang Dark mode'}
      >
        {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
        <span>{theme === 'dark' ? 'Light' : 'Dark'}</span>
      </button>
      </div>
    </header>
  );
}

function AuthPage({ authMode, setAuthMode, majors, selectedMajorKey, changeMajor, submissionRulesData, loginAs, go }) {
  const selectedMajor = majors.find((item) => item.key === selectedMajorKey) ?? majors[0];
  const [credentials, setCredentials] = useState({
    email: 'student@portfolio.vn',
    password: '123456'
  });
  const updateCredentials = (key, value) => setCredentials((current) => ({ ...current, [key]: value }));
  const submitLogin = () => {
    if (!credentials.email || !credentials.password) return;
    loginAs('student', credentials);
  };
  return (
    <section className="auth-page page-grid">
      <div className="auth-visual">
        <div className="auth-story">
          <p className="mono-label auth-kicker">Portfolio studio</p>
          <h1>{'Bi\u1ebfn k\u1ef9 n\u0103ng h\u00f4m nay th\u00e0nh c\u01a1 h\u1ed9i ng\u00e0y mai.'}</h1>
          <div className="auth-signal-strip">
            <span>{'Kh\u00e1m ph\u00e1 path'}</span>
            <span>{'B\u1eaft tay l\u00e0m'}</span>
            <span>{'Mentor g\u00f3p \u00fd'}</span>
            <span>{'N\u00e2ng c\u1ea5p h\u1ed3 s\u01a1'}</span>
          </div>
          <div className="hero-stats">
            <Stat value="3" label={'ng\u00e0nh l\u1edbn'} />
            <Stat value="22" label="specializations" />
            <Stat value="14+" label={'b\u00e0i t\u1eadp m\u1eabu'} />
          </div>
        </div>
      </div>
      <div className="auth-panel">
        <div className="auth-title">
          <p className="mono-label">Bắt đầu hồ sơ nghề nghiệp</p>
          <h2>{authMode === 'login' ? 'Đăng nhập Portfolio' : 'Tạo tài khoản Portfolio'}</h2>
        </div>
        <div className="segmented">
          <button className={authMode === 'login' ? 'active' : ''} onClick={() => setAuthMode('login')}>Đăng nhập</button>
          <button className={authMode === 'signup' ? 'active' : ''} onClick={() => setAuthMode('signup')}>Đăng ký</button>
        </div>
        <div className="auth-fields">
          <label>Email<input type="email" value={credentials.email} onChange={(event) => updateCredentials('email', event.target.value)} placeholder="ban@example.com" /></label>
          <label>Mật khẩu<input type="password" value={credentials.password} onChange={(event) => updateCredentials('password', event.target.value)} placeholder="Nhập mật khẩu" /></label>
        </div>
        <div className="auth-helper">
          <span>Demo account</span>
          <b>student@portfolio.vn / 123456</b>
        </div>
        <div className="major-picker">
          {majors.map((major) => (
            <button
              key={major.key}
              className={`major-card ${selectedMajorKey === major.key ? 'active' : ''}`}
              style={{ '--accent': major.accent }}
              onClick={() => changeMajor(major.key)}
            >
              <span>{major.short}</span>
              <strong>{major.title}</strong>
              <i>{major.salary} - {major.growth}</i>
            </button>
          ))}
        </div>
        <div className="selected-major-note" style={{ '--accent': selectedMajor.accent }}>
          <strong>{selectedMajor.title}</strong>
          <span>{selectedMajor.columns.length} specializations · {submissionRulesData[selectedMajor.key].accepted}</span>
        </div>
        <button className="primary-action" onClick={submitLogin}>
          <LockKeyhole size={18} />
          Đăng nhập bằng tài khoản đã nhập
        </button>
        <button className="ghost-action" onClick={() => loginAs('student')}>
          <Rocket size={18} />
          Student demo vào bản đồ {selectedMajor.short}
        </button>
        <button className="ghost-action" onClick={() => loginAs('admin')}>
          <ShieldCheck size={18} />
          Đăng nhập Admin demo
        </button>
        <button className="ghost-action" onClick={() => loginAs('mentor')}>
          <GraduationCap size={18} />
          Đăng nhập Mentor demo
        </button>
      </div>
    </section>
  );
}

function CareerMapPage({ majors, currentMajor, changeMajor, columns, levels, selectedColumn, selectedRole, selectedRoleId, setSelectedRoleId, path, pathRoles, allRoles, addToPath, removeFromPath, movePath, clearPath, savePath, savedPathName, canBuildPath, userMajorKey, go }) {
  const [tab, setTab] = useState('skills');
  const [query, setQuery] = useState('');
  const filteredRoleIds = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return null;
    return new Set(allRoles.filter((item) => (
      item.title.toLowerCase().includes(normalized) ||
      item.track.toLowerCase().includes(normalized) ||
      item.skills.join(' ').toLowerCase().includes(normalized) ||
      item.tools.join(' ').toLowerCase().includes(normalized)
    )).map((item) => item.id));
  }, [allRoles, query]);
  const tabItems = {
    skills: { label: 'Kỹ năng', items: selectedRole.skills },
    knowledge: { label: 'Kiến thức', items: selectedRole.knowledge },
    abilities: { label: 'Năng lực', items: selectedRole.abilities },
    tools: { label: 'Công cụ', items: selectedRole.tools }
  };

  const marketSignal = marketSignalsByMajor[currentMajor.key] ?? marketSignalsByMajor.dev;
  const updatedLabel = getMarketUpdatedLabel();

  useEffect(() => {
    document.querySelector('.career-planner')?.scrollTo({ left: 0, top: 0 });
  }, [currentMajor.key]);

  return (
    <section className="career-page">
      <div className="section-heading inline">
        <div>
          <p className="mono-label">Bản đồ nghề {currentMajor.short}</p>
          <h1>Bản đồ chuyên ngành {currentMajor.title}</h1>
        </div>
        <div className="major-switcher">
          {majors.map((major) => (
            <button key={major.key} className={currentMajor.key === major.key ? 'active' : ''} onClick={() => changeMajor(major.key)}>
              {major.short}
            </button>
          ))}
        </div>
      </div>

      <div className="career-planner">
        <aside className="specialization-panel">
          <p className="mono-label">Specializations</p>
          <h2>Chọn hướng đi</h2>
          <div className="specialization-list">
            {columns.map((column) => {
              const active = selectedColumn.key === column.key;
              const hiddenBySearch = filteredRoleIds && !column.roles.some((item) => filteredRoleIds.has(item.id));
              return (
                <button
                  key={column.key}
                  className={`${active ? 'active' : ''} ${hiddenBySearch ? 'dimmed' : ''}`}
                  style={{ '--accent': column.accent }}
                  onClick={() => setSelectedRoleId(column.roles[2].id)}
                >
                  <span>{column.title}</span>
                </button>
              );
            })}
          </div>
        </aside>

        <section className="timeline-panel" style={{ '--accent': selectedColumn.accent }}>
          <div className="timeline-head">
            <div>
              <p className="mono-label">Roadmap</p>
              <h2>{selectedColumn.title}</h2>
            </div>
            <div className="focus-meta">
              <span>{selectedRole.salary}</span>
              <span>{selectedRole.experience}</span>
            </div>
          </div>
          <div className="vertical-roadmap">
            {levels.map((level, index) => {
              const roleItem = selectedColumn.roles[index];
              const picked = path.includes(roleItem.id);
              const hiddenBySearch = filteredRoleIds && !filteredRoleIds.has(roleItem.id);
              return (
                <button
                  key={level.key}
                  className={`${selectedRoleId === roleItem.id ? 'active' : ''} ${picked ? 'picked' : ''} ${hiddenBySearch ? 'dimmed' : ''}`}
                  onClick={() => setSelectedRoleId(roleItem.id)}
                >
                  <b>{level.short}</b>
                  <div>
                    <span>{level.label}</span>
                    <strong>{roleItem.title}</strong>
                    <small>{roleItem.experience} - {roleItem.salary}</small>
                  </div>
                  <i className={!canBuildPath ? 'disabled' : ''} onClick={(event) => { event.stopPropagation(); if (canBuildPath) picked ? removeFromPath(roleItem.id) : addToPath(roleItem.id); }}>
                    {picked ? <Check size={15} /> : canBuildPath ? <Plus size={15} /> : <ShieldCheck size={15} />}
                  </i>
                </button>
              );
            })}
          </div>
        </section>

        <aside className="detail-panel">
          <p className="mono-label">{currentMajor.short} / {selectedRole.track} / {selectedRole.level}</p>
          <h2>{selectedRole.title}</h2>
          {!canBuildPath && (
            <div className="status-banner muted">
              <ShieldCheck size={17} />
              Chỉ xem tham khảo. Bạn chỉ có thể lập lộ trình cho ngành đã chọn khi đăng nhập.
            </div>
          )}
          <div className="detail-stats">
            <Stat value={selectedRole.salary} label="mức lương tham khảo" />
            <Stat value={selectedRole.experience} label="kinh nghiệm" />
          </div>
          <div className="tabs">
            {Object.entries(tabItems).map(([key, value]) => (
              <button key={key} className={tab === key ? 'active' : ''} onClick={() => setTab(key)}>{value.label}</button>
            ))}
          </div>
          <div className="requirement-list">
            {tabItems[tab].items.map((item) => (
              <div className="requirement-item" key={item}>
                <BadgeCheck size={17} />
                <span>{item}</span>
              </div>
            ))}
          </div>
          <article className="source-credibility-card">
            <div>
              <p className="mono-label">Nguồn & độ tin cậy</p>
              <strong>Cập nhật {updatedLabel}</strong>
            </div>
            <p>{marketSignal.headline}</p>
            <div className="source-mini-grid">
              <span><BadgeCheck size={14} /> {marketSignal.confidence}</span>
              <span><BookOpen size={14} /> {trustedMarketSources.length} nguồn</span>
            </div>
            <button className="ghost-action compact" onClick={() => go('trends')}>
              Xem xu hướng thị trường
              <Sparkles size={15} />
            </button>
          </article>
          <div className="next-roles">
            <p className="mono-label">Gợi ý bước tiếp theo</p>
            {allRoles.filter((item) => item.track === selectedRole.track || item.level === 'Senior').slice(0, 3).map((item) => (
              <button key={item.id} onClick={() => setSelectedRoleId(item.id)}>
                <ArrowLeftRight size={15} />
                {item.title}
              </button>
            ))}
          </div>
          <button className="primary-action" disabled={!canBuildPath} onClick={() => addToPath(selectedRole.id)}>
            <Plus size={18} />
            {canBuildPath ? 'Thêm vào lộ trình' : 'Chỉ xem tham khảo'}
          </button>
        </aside>
      </div>

      {canBuildPath ? <div className="path-builder">
        <div>
          <p className="mono-label">Lộ trình của tôi</p>
          <h3>{pathRoles.length} vị trí đã chọn</h3>
          {savedPathName && <small className="save-note"><Save size={14} /> {savedPathName}</small>}
        </div>
        <div className="path-strip">
          {pathRoles.map((item, index) => (
            <article className="path-card" key={item.id}>
              <b>{index + 1}</b>
              <span>{item.title}</span>
              <div className="path-actions">
                <button onClick={() => movePath(index, -1)} title="Đưa lên"><MoveUp size={14} /></button>
                <button onClick={() => movePath(index, 1)} title="Đưa xuống"><MoveDown size={14} /></button>
                <button onClick={() => removeFromPath(item.id)} title="Xóa"><X size={14} /></button>
              </div>
            </article>
          ))}
        </div>
        <div className="path-cta">
          <button className="ghost-action compact" onClick={savePath}>
            <Save size={16} />
            Lưu
          </button>
          <button className="ghost-action compact" onClick={clearPath}>
            <Trash2 size={16} />
            Xóa hết
          </button>
          <button className="primary-action compact" onClick={() => go('hub')}>
            Xem thử thách
            <Rocket size={16} />
          </button>
        </div>
      </div> : (
        <div className="path-builder locked-path">
          <div>
            <p className="mono-label">Chế độ xem tham khảo</p>
            <h3>Ngành đã chọn: {userMajorKey?.toUpperCase()}</h3>
          </div>
          <span>Chuyển về ngành của bạn để thêm vị trí, sắp xếp và lưu lộ trình.</span>
          <button className="primary-action compact" disabled={!userMajorKey} onClick={() => userMajorKey && changeMajor(userMajorKey)}>
            Về ngành của tôi
            <Compass size={16} />
          </button>
        </div>
      )}
    </section>
  );
}

function MarketTrendsPage({ currentMajor, go }) {
  const signal = marketSignalsByMajor[currentMajor.key] ?? marketSignalsByMajor.dev;
  const updatedLabel = getMarketUpdatedLabel();
  const sourcePreview = trustedMarketSources;
  return (
    <section className="content-page trend-page">
      <div className="section-heading inline">
        <div>
          <p className="mono-label">Market intelligence · {currentMajor.short}</p>
          <h1>Xu hướng thị trường {currentMajor.title}</h1>
          <p>Dữ liệu dùng để tham khảo khi chọn chuyên ngành, ưu tiên kỹ năng và chọn bài tập portfolio. Các chỉ báo được tổng hợp từ báo cáo lương, job board và nguồn tuyển dụng công khai.</p>
        </div>
        <div className="market-freshness-card">
          <Sparkles size={20} />
          <div>
            <strong>Cập nhật {updatedLabel}</strong>
            <span>Trạng thái nguồn: đang theo dõi</span>
          </div>
        </div>
      </div>

      <div className="trend-hero-grid">
        <article className="trend-summary-card">
          <p className="mono-label">Tín hiệu chính</p>
          <h2>{signal.headline}</h2>
          <p>{signal.updatedPolicy}</p>
          <div className="source-mini-grid">
            <span><BadgeCheck size={15} /> Độ tin cậy: {signal.confidence}</span>
            <span><BookOpen size={15} /> {trustedMarketSources.length} nguồn tham khảo</span>
          </div>
        </article>
        <article className="trend-skill-cloud">
          <p className="mono-label">Kỹ năng nên ưu tiên</p>
          <div className="tag-row">
            {signal.hotSkills.map((skill) => <span key={skill}>{skill}</span>)}
          </div>
        </article>
      </div>

      <div className="trend-signal-grid">
        {signal.signals.map((item) => (
          <article className="trend-signal-card" key={item.label}>
            <span>{item.label}</span>
            <h2>{item.value}</h2>
            <p>{item.note}</p>
          </article>
        ))}
      </div>

      <div className="source-grid">
        {sourcePreview.map((source) => (
          <a className="source-card" href={source.url} target="_blank" rel="noreferrer" key={source.name}>
            <span>{source.type}</span>
            <strong>{source.name}</strong>
            <i>{source.url.replace(/^https?:\/\//, '')}</i>
          </a>
        ))}
      </div>

      <div className="trend-note">
        <ShieldCheck size={18} />
        <span>Business rule demo: salary trong bản đồ nghề là mức tham khảo theo band, không phải cam kết. Khi nối API thật, hệ thống sẽ lưu snapshot nguồn theo ngày để admin kiểm duyệt trước khi hiển thị cho student.</span>
      </div>

      <div className="submit-actions">
        <button className="ghost-action" onClick={() => go('roadmap')}><Compass size={17} /> Quay lại bản đồ nghề</button>
        <button className="primary-action" onClick={() => go('hub')}><LayoutDashboard size={17} /> Chọn thử thách theo xu hướng</button>
      </div>
    </section>
  );
}

function ChallengeHubPage({ currentMajor, activeTrack, setActiveTrack, visibleChallenges, setSelectedChallengeId, joinedChallengeIds, submissionStatus, joinChallenge, isPremium, go }) {
  const tracks = ['Tất cả', ...currentMajor.columns.map((item) => item.title)];
  return (
    <section className="content-page">
      <div className="section-heading inline">
        <div>
          <p className="mono-label">Trung tâm thử thách {currentMajor.short}</p>
          <h1>Luyện tập bằng nhiệm vụ có thể đưa vào portfolio</h1>
        </div>
        <div className="filter-row">
          <Filter size={17} />
          {tracks.map((track) => <button key={track} className={activeTrack === track ? 'active' : ''} onClick={() => setActiveTrack(track)}>{track}</button>)}
        </div>
      </div>
      <div className="challenge-grid">
        {visibleChallenges.map((challenge) => {
          const joined = joinedChallengeIds.includes(challenge.id);
          const submission = submissionStatus[challenge.id];
          const locked = isPremiumChallenge(challenge) && !isPremium;
          return (
            <article className={`challenge-card ${locked ? 'premium-locked-card' : ''}`} key={challenge.id}>
              <div className="card-topline">
                <span>{challenge.track}</span>
                <strong>{locked ? 'Premium' : submission?.status ? statusLabels[submission.status] ?? submission.status : joined ? 'Đã tham gia' : `${challenge.xp} XP`}</strong>
              </div>
              <h2>{challenge.title}</h2>
              <p>{challenge.summary}</p>
              {locked && <div className="status-banner premium-banner"><Crown size={16} /> Challenge nâng cao cần Premium để nộp bài và nhận mentor review.</div>}
              <div className="tag-row">{challenge.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
              <div className="challenge-meta">
                <span><GraduationCap size={16} /> {challenge.mentor}</span>
                <span><CircleDollarSign size={16} /> {challenge.difficulty}</span>
                <span><Sparkles size={16} /> {challenge.due}</span>
              </div>
              <div className="card-actions">
                <button className="ghost-action compact" onClick={() => { setSelectedChallengeId(challenge.id); if (!locked) joinChallenge(challenge.id); go(locked ? 'premium' : 'join'); }}>
                  {locked ? 'Xem gói' : joined ? 'Xem chi tiết' : 'Tham gia'}
                  <Rocket size={16} />
                </button>
                <button className="primary-action compact" onClick={() => { setSelectedChallengeId(challenge.id); if (locked) { go('premium'); return; } joinChallenge(challenge.id); go(submission?.status === 'reviewed' ? 'feedback' : 'submit'); }}>
                  {locked ? 'Mở khóa Premium' : submission?.status === 'reviewed' ? 'Xem feedback' : submission?.status === 'submitted' ? 'Xem bài nộp' : 'Nộp bài'}
                  <Send size={16} />
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function GuideAccordion({ eyebrow, title, count, tone = '', children }) {
  const [open, setOpen] = useState(false);
  return (
    <article className={`guide-accordion ${tone}`}>
      <button className="guide-accordion-head" onClick={() => setOpen((current) => !current)} aria-expanded={open}>
        <span>
          <i className="mono-label">{eyebrow}</i>
          <strong>{title}</strong>
        </span>
        <b>{count} mục</b>
        <Plus size={18} />
      </button>
      {open && <div className="guide-accordion-body">{children}</div>}
    </article>
  );
}

function JoinChallengePage({ challenge, currentMajor, joined, submission, joinChallenge, isPremium, go }) {
  const isSubmitted = submission?.status === 'submitted';
  const isReviewed = submission?.status === 'reviewed';
  const isRejected = submission?.status === 'rejected';
  const locked = isPremiumChallenge(challenge) && !isPremium;
  const guide = getChallengeGuide(challenge, currentMajor);
  return (
    <section className="content-page two-column">
      <div className="mission-panel">
        <p className="mono-label">Tham gia thử thách</p>
        <h1>{challenge.title}</h1>
        <p className="lead">{challenge.summary}</p>
        <div className="tag-row large">{challenge.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
        <div className="join-status-grid">
          <Stat value={challenge.due} label="hạn nộp" />
          <Stat value={challenge.xp} label="điểm XP" />
          <Stat value={submission?.status ? statusLabels[submission.status] ?? submission.status : joined ? 'Đã tham gia' : 'Chưa tham gia'} label="trạng thái" />
        </div>
        <h3>Rubric chấm điểm</h3>
        <div className="challenge-deep-grid">
          <GuideAccordion eyebrow="Technology requirements" title={guide.techTitle} count={guide.technologies.length}>
            <div className="tech-stack-list">
              {guide.technologies.map((item) => <span key={item}>{item}</span>)}
            </div>
          </GuideAccordion>
          <GuideAccordion eyebrow="Skills evidence" title="Kỹ năng cần chứng minh" count={guide.skills.length}>
            {guide.skills.map((item) => (
              <div className="requirement-item compact" key={item}><BadgeCheck size={16} /><span>{item}</span></div>
            ))}
          </GuideAccordion>
          <GuideAccordion eyebrow="Business logic" title="Nghiệp vụ thực tế phải xử lý" count={guide.businessRules.length} tone="wide">
            <div className="business-rule-list">
              {guide.businessRules.map((item, index) => (
                <div className="business-rule-item" key={item}>
                  <b>{String(index + 1).padStart(2, '0')}</b>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </GuideAccordion>
          <GuideAccordion eyebrow="How to solve" title="Quy trình làm bài gợi ý" count={guide.steps.length}>
            <ol className="process-list">
              {guide.steps.map((item) => <li key={item}>{item}</li>)}
            </ol>
          </GuideAccordion>
          <GuideAccordion eyebrow="Acceptance" title="Tiêu chí nghiệm thu" count={guide.acceptance.length}>
            {guide.acceptance.map((item) => (
              <div className="requirement-item compact" key={item}><Check size={16} /><span>{item}</span></div>
            ))}
          </GuideAccordion>
          <GuideAccordion eyebrow="Submission package" title="Minh chứng cần chuẩn bị khi nộp" count={guide.deliverables.length} tone="wide">
            <div className="deliverable-grid">
              {guide.deliverables.map((item) => <span key={item}><FileUp size={15} />{item}</span>)}
            </div>
          </GuideAccordion>
        </div>
        <div className="rubric-grid">
          {['Đúng yêu cầu', 'Chất lượng trình bày', 'Minh chứng rõ ràng', 'Khả năng đưa vào portfolio'].map((item, index) => (
            <article key={item}>
              <strong>{25 - index * 2}%</strong>
              <span>{item}</span>
            </article>
          ))}
        </div>
      </div>
      <aside className="side-card">
        <p className="mono-label">Thông tin tham gia</p>
        <h2>{challenge.mentor}</h2>
        <div className="score-ring">92</div>
        <p>Mentor còn 4 slot review trong tuần. Sau khi tham gia, hệ thống tạo bản nháp nộp bài theo ngành {currentMajor.title}.</p>
        {joined && <div className="status-banner"><Check size={17} /> Đã tham gia thử thách. Sẵn sàng nộp bài.</div>}
        {isSubmitted && <div className="status-banner"><Check size={17} /> Đã nộp lúc {submission.updatedAt}. Có thể xem góp ý mentor.</div>}
        {isRejected && <div className="status-banner warning"><X size={17} /> Mentor yêu cầu bổ sung. Hãy mở form nộp bài để cập nhật phiên bản mới.</div>}
        {isReviewed && <div className="status-banner"><BadgeCheck size={17} /> Bài đã được review. Có thể mở góp ý để cập nhật portfolio.</div>}
        {locked && <div className="status-banner premium-banner"><Crown size={17} /> Gói Free chỉ xem thử thách nâng cao. Nâng cấp để tham gia, nộp bài và nhận mentor feedback.</div>}
        <button className="primary-action" onClick={() => { if (locked) { go('premium'); return; } joinChallenge(challenge.id); go(isReviewed ? 'feedback' : 'submit'); }}>
          {locked ? 'Nâng cấp Premium' : isReviewed ? 'Xem bài và feedback' : isRejected ? 'Nộp lại bài' : isSubmitted ? 'Xem bài đã nộp' : joined ? 'Tiếp tục nộp bài' : 'Tham gia và mở form nộp'}
          <Send size={17} />
        </button>
      </aside>
    </section>
  );
}

function SubmitProjectPage({ challenge, currentMajor, joined, submission, mentors, joinChallenge, saveDraft, submitChallenge, submissionRulesData, isPremium, go }) {
  const rules = submissionRulesData[currentMajor.key] ?? submissionRules[currentMajor.key];
  const isSubmitted = submission?.status === 'submitted';
  const isReviewed = submission?.status === 'reviewed';
  const isDraft = submission?.status === 'draft';
  const isRejected = submission?.status === 'rejected';
  const locked = isPremiumChallenge(challenge) && !isPremium;
  const submitGuide = getSubmissionGuide(challenge, currentMajor);
  const [form, setForm] = useState({
    primaryLink: submission?.primaryLink ?? '',
    secondaryLink: submission?.secondaryLink ?? '',
    skills: '',
    notes: submission?.notes ?? ''
  });
  const [validation, setValidation] = useState(() => ({
    checks: submission?.validationChecks ?? [],
    errors: [],
    score: submission?.validationScore ?? 0
  }));
  const [submitAttempted, setSubmitAttempted] = useState(Boolean(submission?.status && submission.status !== 'draft'));
  const [showMentorProfile, setShowMentorProfile] = useState(false);
  const matchedMentor = mentors.find((item) => item.id === submission?.mentorId)
    ?? mentors.find((item) => item.name === submission?.mentor)
    ?? matchMentorForChallenge(challenge, mentors);
  const assignedMentor = matchedMentor?.name || submission?.mentor || challenge.mentor;
  const showSubmitResult = submitAttempted && validation.checks.length > 0;
  const showMatchedMentor = showSubmitResult && validation.errors.length === 0;
  const updateForm = (key, value) => setForm((current) => ({ ...current, [key]: value }));
  return (
    <section className="content-page form-layout">
      <div className="section-heading">
        <p className="mono-label">Nộp sản phẩm</p>
        <h1>{challenge.title}</h1>
        <p>Form nộp bài tự thay đổi theo ngành {currentMajor.title}. Định dạng chấp nhận: {rules.accepted}.</p>
        <div className="submit-status-line">
          <span>{joined ? 'Đã tham gia' : 'Chưa tham gia'}</span>
          <span>{isReviewed ? `Đã được góp ý ${submission.updatedAt}` : isSubmitted ? `Đã nộp ${submission.updatedAt}` : isRejected ? `Cần nộp lại ${submission.updatedAt}` : isDraft ? `Bản nháp ${submission.updatedAt}` : 'Chưa có bản nháp'}</span>
          <span>{challenge.track}</span>
          {showMatchedMentor && <span>Mentor: {assignedMentor}</span>}
        </div>
        <div className="submission-guide-grid">
          <GuideAccordion eyebrow="Submission standard" title="Hồ sơ nộp bài cần có" count={submitGuide.submissionPackage.length} tone="wide">
            <div className="deliverable-grid">
              {submitGuide.submissionPackage.map((item) => <span key={item}><FileUp size={15} />{item}</span>)}
            </div>
          </GuideAccordion>
          <GuideAccordion eyebrow="Required content" title="Nội dung bắt buộc" count={submitGuide.requiredSections.length}>
            {submitGuide.requiredSections.map((item) => (
              <div className="requirement-item compact" key={item}><BadgeCheck size={16} /><span>{item}</span></div>
            ))}
          </GuideAccordion>
          <GuideAccordion eyebrow="Evidence rules" title="Quy định minh chứng" count={submitGuide.evidenceRules.length}>
            {submitGuide.evidenceRules.map((item) => (
              <div className="requirement-item compact" key={item}><ShieldCheck size={16} /><span>{item}</span></div>
            ))}
          </GuideAccordion>
          <GuideAccordion eyebrow="Review workflow" title="Luồng xử lý sau khi nộp" count={submitGuide.reviewFlow.length}>
            <ol className="process-list">
              {submitGuide.reviewFlow.map((item) => <li key={item}>{item}</li>)}
            </ol>
          </GuideAccordion>
          <GuideAccordion eyebrow="Common rejection" title="Lỗi dễ bị mentor trả bài" count={submitGuide.rejectionReasons.length} tone="danger">
            {submitGuide.rejectionReasons.map((item) => (
              <div className="requirement-item compact" key={item}><X size={16} /><span>{item}</span></div>
            ))}
          </GuideAccordion>
        </div>
        {showSubmitResult && (
          <div className="submit-result-stack">
            <div className="validation-panel">
              <div>
                <p className="mono-label">Kiểm tra bài nộp</p>
                <strong>{validation.score}/100 điểm hợp lệ</strong>
              </div>
              {validation.checks.map((item) => (
                <div className={`validation-row ${item.ok ? 'ok' : 'warn'}`} key={item.key}>
                  {item.ok ? <Check size={16} /> : <X size={16} />}
                  <span><b>{item.label}</b>{item.detail}</span>
                </div>
              ))}
            </div>
            {showMatchedMentor && (
              <article className="matched-mentor-card">
                <button onClick={() => setShowMentorProfile((current) => !current)}>
                  <span>
                    <i className="mono-label">Mentor được match</i>
                    <strong>{assignedMentor}</strong>
                  </span>
                  <GraduationCap size={18} />
                </button>
                {showMentorProfile && (
                  <div className="matched-mentor-detail">
                    <p>{matchedMentor.reviewStyle ?? 'Mentor sẽ xem link nộp, kiểm tra minh chứng, chấm điểm và gợi ý cách đưa bài vào portfolio.'}</p>
                    <div className="tag-row">
                      {(matchedMentor.expertise ?? [challenge.track]).map((item) => <span key={item}>{item}</span>)}
                    </div>
                    <div className="mentor-facts">
                      <span><b>{matchedMentor.level ?? 'Senior Mentor'}</b> trình độ</span>
                      <span><b>{matchedMentor.currentCompany ?? 'Portfolio Mentor Network'}</b> công ty</span>
                      <span><b>{matchedMentor.yearsOfExperience ?? 5}+ năm</b> kinh nghiệm</span>
                      <span><b>{matchedMentor.strongestField ?? challenge.track}</b> thế mạnh</span>
                    </div>
                  </div>
                )}
              </article>
            )}
          </div>
        )}
      </div>
      <div className="submission-form">
        <div className="submit-rule-card">
          <strong>Yêu cầu nộp cho {currentMajor.title}</strong>
          <span>{rules.accepted}</span>
        </div>
        <label>{rules.primaryLabel}<input value={form.primaryLink} onChange={(event) => updateForm('primaryLink', event.target.value)} placeholder="Dán link chính của sản phẩm" /></label>
        <label>{rules.secondaryLabel}<input value={form.secondaryLink} onChange={(event) => updateForm('secondaryLink', event.target.value)} placeholder="Dán link minh chứng hoặc demo" /></label>
        <label>Kỹ năng sử dụng<input value={form.skills} onChange={(event) => updateForm('skills', event.target.value)} placeholder={rules.skillPlaceholder} /></label>
        <label>Ghi chú sản phẩm<textarea value={form.notes} onChange={(event) => updateForm('notes', event.target.value)} placeholder={rules.notePlaceholder} /></label>
        <div className="upload-zone">
          <FileUp size={30} />
          <strong>Thả ảnh minh chứng tại đây</strong>
          <span>PNG, JPG hoặc video walkthrough</span>
        </div>
        <div className="checklist">
          {rules.checklist.map((item) => (
            <label key={item}><input type="checkbox" defaultChecked /> {item}</label>
          ))}
        </div>
        {isDraft && <div className="status-banner"><Save size={17} /> Đã lưu bản nháp lúc {submission.updatedAt}. Bạn có thể nộp khi đã đủ checklist.</div>}
        {isSubmitted && <div className="status-banner"><Check size={17} /> Đã nộp sản phẩm lúc {submission.updatedAt}. Góp ý từ người hướng dẫn đã sẵn sàng để demo.</div>}
        {isRejected && <div className="status-banner warning"><X size={17} /> Mentor yêu cầu bổ sung minh chứng. Cập nhật link hoặc ghi chú rồi nộp lại.</div>}
        {isReviewed && <div className="status-banner"><Check size={17} /> Mentor đã nhận xét bài này. Mở trang góp ý để cập nhật portfolio.</div>}
        {locked && <div className="status-banner premium-banner"><Crown size={17} /> Đây là challenge nâng cao. Free có thể xem yêu cầu, Premium mới được nộp bài và nhận review.</div>}
        <div className="submit-actions">
          <button className="ghost-action" disabled={locked} onClick={() => {
            joinChallenge(challenge.id);
            const result = saveDraft(challenge.id, form);
            setValidation(result.validation);
          }}>
            <Save size={17} />
            Lưu bản nháp
          </button>
          <button className="primary-action" onClick={() => {
            if (locked) {
              go('premium');
              return;
            }
            if (isReviewed) {
              go('feedback');
              return;
            }
            joinChallenge(challenge.id);
            const result = submitChallenge(challenge.id, form);
            setValidation(result.validation);
            setSubmitAttempted(true);
            setShowMentorProfile(result.ok);
            if (!result.ok) return;
          }}>
            {locked ? 'Nâng cấp để nộp bài' : isReviewed ? 'Xem góp ý mentor' : isRejected ? 'Nộp lại cho mentor' : 'Gửi người hướng dẫn góp ý'}
            <Send size={17} />
          </button>
        </div>
      </div>
    </section>
  );
}

function MentorFeedbackPage({ go, challenge, submission, feedback, mentors, createFeedback }) {
  const hasFeedback = Boolean(feedback);
  const matchedMentor = mentors.find((item) => item.id === submission?.mentorId)
    ?? mentors.find((item) => item.name === submission?.mentor)
    ?? mentors.find((item) => item.name === feedback?.reviewer)
    ?? matchMentorForChallenge(challenge, mentors);
  const reviewerName = feedback?.reviewer ?? submission?.mentor ?? matchedMentor?.name ?? challenge.mentor;
  const strengths = feedback?.strengths ?? [
    'Link ch\u00ednh \u0111\u00e3 \u0111\u01b0\u1ee3c ghi nh\u1eadn, mentor c\u00f3 th\u1ec3 m\u1edf v\u00e0 ki\u1ec3m tra s\u1ea3n ph\u1ea9m.',
    'B\u00e0i n\u1ed9p \u0111\u00e3 g\u1eafn \u0111\u00fang challenge "' + challenge.title + '" n\u00ean kh\u00f4ng b\u1ecb l\u1ea1c ng\u00e0nh.',
    submission?.secondaryLink ? 'C\u00f3 link minh ch\u1ee9ng ph\u1ee5 gi\u00fap mentor \u0111\u1ed1i chi\u1ebfu demo, API docs ho\u1eb7c t\u00e0i li\u1ec7u thi\u1ebft k\u1ebf.' : 'B\u00e0i \u0111\u00e3 c\u00f3 b\u1ea3n n\u1ed9p ban \u0111\u1ea7u \u0111\u1ec3 mentor review.'
  ];
  const improvements = feedback?.improvements ?? [
    'C\u1ea7n mentor x\u00e1c nh\u1eadn link c\u00f3 ch\u1ea1y \u0111\u01b0\u1ee3c, c\u00f3 README h\u01b0\u1edbng d\u1eabn v\u00e0 kh\u00f4ng thi\u1ebfu file quan tr\u1ecdng.',
    'N\u00ean b\u1ed5 sung m\u00f4 t\u1ea3 ng\u1eafn v\u1ec1 lu\u1ed3ng nghi\u1ec7p v\u1ee5 ch\u00ednh, vai tr\u00f2 ng\u01b0\u1eddi d\u00f9ng v\u00e0 c\u00e1ch x\u1eed l\u00fd case l\u1ed7i.',
    'Th\u00eam \u1ea3nh ho\u1eb7c video walkthrough 1-2 ph\u00fat \u0111\u1ec3 b\u00e0i d\u1ec5 \u0111\u01b0a v\u00e0o portfolio khi \u0111\u01b0\u1ee3c duy\u1ec7t.'
  ];
  return (
    <section className="content-page two-column feedback-page-layout">
      <div>
        <p className="mono-label">{'Nh\u1eadn g\u00f3p \u00fd t\u1eeb ng\u01b0\u1eddi h\u01b0\u1edbng d\u1eabn'}</p>
        <h1>{challenge.title}</h1>
        <div className="feedback-score">
          <span>{feedback?.score ?? '...'}</span>
          <div>
            <h2>{feedback?.title ?? '\u0110ang ch\u1edd mentor feedback'}</h2>
            <p>{hasFeedback
              ? 'Reviewer: ' + reviewerName + '. B\u00e0i \u0111\u00e3 \u0111\u01b0\u1ee3c nh\u1eadn x\u00e9t v\u00e0 c\u00f3 th\u1ec3 c\u1eadp nh\u1eadt v\u00e0o portfolio.'
              : 'B\u00e0i n\u1ed9p tr\u1ea1ng th\u00e1i ' + (submission?.status ?? 'ch\u01b0a n\u1ed9p') + '. Mentor ' + reviewerName + ' s\u1ebd xem b\u00e0i v\u00e0 tr\u1ea3 feedback ch\u00ednh th\u1ee9c.'}</p>
          </div>
        </div>

        <article className="matched-mentor-card feedback-mentor-card feedback-mentor-main">
          <button type="button">
            <span>
              <i className="mono-label">{hasFeedback ? 'Mentor \u0111\u00e3 feedback' : 'Mentor \u0111ang review'}</i>
              <strong>{reviewerName}</strong>
            </span>
            <GraduationCap size={18} />
          </button>
          <div className="matched-mentor-detail">
            <p>{matchedMentor.reviewStyle ?? 'Mentor xem link n\u1ed9p, ki\u1ec3m tra minh ch\u1ee9ng, ch\u1ea5m \u0111i\u1ec3m v\u00e0 g\u1ee3i \u00fd c\u00e1ch \u0111\u01b0a b\u00e0i v\u00e0o portfolio.'}</p>
            <div className="tag-row">
              {(matchedMentor.expertise ?? [challenge.track]).map((item) => <span key={item}>{item}</span>)}
            </div>
            <div className="mentor-facts">
              <span><b>{matchedMentor.level ?? 'Senior Mentor'}</b> {'tr\u00ecnh \u0111\u1ed9'}</span>
              <span><b>{matchedMentor.currentCompany ?? 'Portfolio Mentor Network'}</b> {'c\u00f4ng ty'}</span>
              <span><b>{matchedMentor.yearsOfExperience ?? 5}+ {'n\u0103m'}</b> {'kinh nghi\u1ec7m'}</span>
              <span><b>{matchedMentor.strongestField ?? challenge.track}</b> {'th\u1ebf m\u1ea1nh'}</span>
            </div>
          </div>
        </article>

        <div className="feedback-grid">
          <article><h3>{'\u0110i\u1ec3m m\u1ea1nh'}</h3>{strengths.map((item) => <p key={item}>{item}</p>)}</article>
          <article><h3>{'C\u1ea7n c\u1ea3i thi\u1ec7n'}</h3>{improvements.map((item) => <p key={item}>{item}</p>)}</article>
        </div>
      </div>
      <aside className="side-card">
        <p className="mono-label">{hasFeedback ? 'Ghi ch\u00fa ng\u01b0\u1eddi h\u01b0\u1edbng d\u1eabn' : 'Th\u00f4ng tin b\u00e0i n\u1ed9p'}</p>
        {(hasFeedback ? feedbackItems : [
          { file: challenge.id, title: 'Tr\u1ea1ng th\u00e1i submission', detail: submission ? submission.status + ' l\u00fac ' + submission.updatedAt : 'Ch\u01b0a c\u00f3 submission trong h\u1ec7 th\u1ed1ng.' },
          { file: submission?.primaryLink ?? 'Ch\u01b0a c\u00f3 link ch\u00ednh', title: 'Link ch\u00ednh', detail: submission?.primaryLink || 'Student c\u1ea7n b\u1ed5 sung link ch\u00ednh tr\u01b0\u1edbc khi mentor review.' },
          { file: submission?.secondaryLink ?? 'Ch\u01b0a c\u00f3 link ph\u1ee5', title: 'Link minh ch\u1ee9ng', detail: submission?.secondaryLink || 'C\u00f3 th\u1ec3 l\u00e0 demo URL, Figma, deck ho\u1eb7c API docs.' }
        ]).map((item) => (
          <div className="code-note" key={item.file}>
            <strong>{item.title}</strong>
            <span>{item.file}</span>
            <p>{item.detail}</p>
          </div>
        ))}
        <button className="primary-action" onClick={() => go('portfolio')}>
          {'C\u1eadp nh\u1eadt portfolio'}
          <WandSparkles size={17} />
        </button>
      </aside>
    </section>
  );
}
function PortfolioPage({ pathRoles, currentMajor, go, demoUser, apiStatus, submissions, challenges, updatePortfolio, isPremium }) {
  const mainSpecs = currentMajor.columns.slice(0, 5);
  const stats = demoUser?.stats ?? { completedChallenges: 6, mentorRating: 4.8, portfolioProjects: 4, verifiedSkills: 18 };
  const profileName = demoUser?.name ?? 'Quang Nguyễn';
  const careerGoal = demoUser?.careerGoal ?? pathRoles[pathRoles.length - 1]?.title ?? `Lead ${currentMajor.short}`;
  const userSubmissions = submissions.filter((item) => item.userId === (demoUser?.id ?? 'demo-student'));
  const challengeName = (challengeId) => challenges.find((item) => item.id === challengeId)?.title ?? challengeId;
  return (
    <section className="content-page portfolio-page">
      <div className="portfolio-header">
        <div>
          <p className="mono-label">Portfolio cá nhân</p>
          <h1>{profileName}</h1>
          <p>Định hướng {currentMajor.title}: {pathRoles.map((item) => item.title).join(' -> ')}</p>
        </div>
        <button className="primary-action compact" onClick={() => go('roadmap')}>
          Sửa lộ trình
          <Compass size={16} />
        </button>
        <button className="ghost-action compact" onClick={updatePortfolio}>
          <Save size={16} />
          Lưu portfolio
        </button>
        <button className="primary-action compact" onClick={() => go(isPremium ? 'portfolio' : 'premium')}>
          <Crown size={16} />
          {isPremium ? 'Public portfolio' : 'Mở khóa public portfolio'}
        </button>
      </div>
      {!isPremium && (
        <div className="status-banner premium-banner">
          <Crown size={17} />
          Free lưu hồ sơ nội bộ. Premium mở public portfolio, badge xác thực kỹ năng và template xuất bản chuyên nghiệp.
        </div>
      )}
      <div className="profile-summary">
        <article>
          <p className="mono-label">Career goal</p>
          <h2>{careerGoal}</h2>
          <span>Ưu tiên hiện tại: hoàn thành 2 thử thách, nhận góp ý mentor và xuất bản 1 case study.</span>
        </article>
        <article>
          <p className="mono-label">Business rule</p>
          <h2>Profile theo ngành</h2>
          <span>Kỹ năng, bài tập, phương thức nộp và case study thay đổi theo ngành {currentMajor.title}. Nguồn dữ liệu: {apiStatus === 'mongo' ? 'MongoDB' : 'Local fallback'}.</span>
        </article>
      </div>
      <div className="portfolio-grid">
        <StatCard icon={Trophy} title="Thử thách hoàn thành" value={stats.completedChallenges} />
        <StatCard icon={Star} title="Điểm hướng dẫn" value={stats.mentorRating} />
        <StatCard icon={BriefcaseBusiness} title="Dự án portfolio" value={stats.portfolioProjects} />
        <StatCard icon={BookOpen} title="Kỹ năng xác thực" value={stats.verifiedSkills} />
      </div>
      <div className="portfolio-body">
        <article className="project-card">
          <div className="card-topline"><span>Nổi bật</span><strong>88/100</strong></div>
          <h2>Case study {currentMajor.title}</h2>
          <p>Minh chứng được tạo từ ngành đã chọn, lộ trình chuyên ngành, thử thách đã nộp và góp ý từ người hướng dẫn.</p>
          <div className="tag-row">{currentMajor.columns.slice(0, 3).map((item) => <span key={item.key}>{item.title}</span>)}</div>
          <button className="ghost-action compact"><LinkIcon size={16} /> Xem case study</button>
        </article>
        <article className="skill-card">
          <h2>Tiến độ chuyên ngành</h2>
          {mainSpecs.map((item, index) => (
            <div className="progress-line" key={item.key}>
              <span>{item.title}</span>
              <b><i style={{ width: `${88 - index * 10}%` }} /></b>
            </div>
          ))}
        </article>
        <article className="skill-card">
          <h2>Huy hiệu</h2>
          <div className="badge-grid">
            {['Xây lộ trình', 'Sẵn sàng thử thách', 'Đã được góp ý', 'Có minh chứng portfolio'].map((item) => <span key={item}><Blocks size={16} />{item}</span>)}
          </div>
        </article>
      </div>
      <div className="profile-deep-grid">
        <article className="profile-panel">
          <h2>Lộ trình đang theo</h2>
          {pathRoles.map((item, index) => (
            <div className="profile-timeline-item" key={item.id}>
              <b>{index + 1}</b>
              <span>{item.title}</span>
              <small>{item.track} · {item.level} · {item.salary}</small>
            </div>
          ))}
        </article>
        <article className="profile-panel">
          <h2>Dự án mẫu</h2>
          {(demoUser?.portfolio?.publishedProjects ?? ['Case study chính', 'Bài tập mentor review', 'Mini project tự luyện']).map((item, index) => (
            <div className="project-row" key={item}>
              <span>{item}</span>
              <strong>{['Đã xuất bản', 'Đang review', 'Đang làm'][index]}</strong>
            </div>
          ))}
        </article>
        <article className="profile-panel">
          <h2>Lịch sử nộp bài</h2>
          {(userSubmissions.length ? userSubmissions : [{ challengeId: 'demo', status: 'draft', updatedAt: 'Chưa có' }]).map((item) => (
            <div className="activity-row" key={`${item.challengeId}-${item.updatedAt}`}>
              <Check size={15} />
              <span>{challengeName(item.challengeId)} - {item.status} - {item.updatedAt}</span>
            </div>
          ))}
        </article>
      </div>
    </section>
  );
}

function PremiumPage({ plans, activeSubscription, upgradePlan, go }) {
  const revenue = demoPremiumSubscriptions.reduce((sum, item) => sum + item.revenue, 0);
  const isActive = (plan) => activeSubscription?.status === 'active' && activeSubscription?.planId === plan.id;
  return (
    <section className="content-page premium-page">
      <div className="section-heading inline">
        <div>
          <p className="mono-label">Premium business model</p>
          <h1>Nâng cấp để có mentor feedback và portfolio xin việc</h1>
          <p>Free giúp khám phá nghề nghiệp. Premium mở khóa mentor review sâu, challenge nâng cao, nhiều lần nộp lại và public portfolio chuyên nghiệp.</p>
        </div>
        <div className="premium-current">
          <Crown size={20} />
          <div>
            <strong>{activeSubscription?.planName ?? 'Free'}</strong>
            <span>{activeSubscription?.status === 'active' ? `Hết hạn: ${activeSubscription.expiresAt}` : 'Đang dùng bản miễn phí'}</span>
          </div>
        </div>
      </div>

      <div className="pricing-grid">
        {plans.map((plan) => (
          <article className={`pricing-card ${plan.badge ? 'featured' : ''}`} key={plan.id}>
            {plan.badge && <span className="plan-badge">{plan.badge}</span>}
            <p className="mono-label">{plan.highlight}</p>
            <h2>{plan.name}</h2>
            <div className="price-line">
              <strong>{plan.displayPrice}</strong>
              <span>{plan.duration}</span>
            </div>
            <p>{plan.description}</p>
            <div className="plan-feature-list">
              {plan.features.map((item) => (
                <div className="activity-row" key={item}><BadgeCheck size={16} /><span>{item}</span></div>
              ))}
            </div>
            <button className={isActive(plan) ? 'ghost-action' : 'primary-action'} onClick={() => upgradePlan(plan)}>
              {isActive(plan) ? 'Đang sử dụng' : 'Nâng cấp gói này'}
              <CreditCard size={17} />
            </button>
          </article>
        ))}
      </div>

      <div className="admin-grid compact">
        <article className="admin-panel">
          <p className="mono-label">Free</p>
          <h2>Khám phá trước khi trả phí</h2>
          {['Xem Career Map cơ bản', 'Chọn 1 ngành chính', 'Làm challenge cơ bản', 'Lưu portfolio nội bộ'].map((item) => (
            <div className="activity-row" key={item}><Check size={16} /><span>{item}</span></div>
          ))}
        </article>
        <article className="admin-panel">
          <p className="mono-label">Premium</p>
          <h2>Lý do người dùng trả tiền</h2>
          {['Mentor feedback thật', 'Challenge nâng cao', 'Nộp lại nhiều lần', 'Public portfolio chuyên nghiệp', 'Badge xác thực kỹ năng'].map((item) => (
            <div className="activity-row" key={item}><Crown size={16} /><span>{item}</span></div>
          ))}
        </article>
        <article className="admin-panel">
          <p className="mono-label">Demo revenue</p>
          <h2>{formatVnd(revenue)}</h2>
          <div className="activity-row"><UserRound size={16} /><span>{demoPremiumSubscriptions.filter((item) => item.status === 'active').length} tài khoản Premium mẫu</span></div>
          <div className="activity-row"><Sparkles size={16} /><span>Gói 3 tháng là lựa chọn khuyến nghị cho chu kỳ làm portfolio</span></div>
        </article>
      </div>

      <div className="submit-actions">
        <button className="ghost-action" onClick={() => go('hub')}><LayoutDashboard size={17} /> Xem thử thách</button>
        <button className="primary-action" onClick={() => go('portfolio')}><UserRound size={17} /> Quay lại hồ sơ</button>
      </div>
    </section>
  );
}

function MentorPage({ apiStatus, data, currentUser, refreshData, createFeedback, setNotice, notice }) {
  const submissionsData = data?.submissions ?? [];
  const challengesData = data?.challenges ?? [];
  const feedbackData = data?.mentorFeedback ?? [];
  const students = data?.users?.length ? data.users : data?.demoUser ? [data.demoUser] : [];
  const [activeSubmission, setActiveSubmission] = useState(null);
  const [mentorFilters, setMentorFilters] = useState({
    keyword: '',
    status: 'all',
    majorKey: 'all',
    track: 'all',
    studentId: 'all'
  });
  const [reviewForm, setReviewForm] = useState({
    score: 88,
    title: 'Portfolio-ready review',
    strengths: 'Bài làm bám đúng yêu cầu\nCó minh chứng rõ ràng\nCó thể đưa vào portfolio',
    improvements: 'Bổ sung số liệu đo lường\nGiải thích trade-off ngắn gọn hơn\nThêm ảnh hoặc video walkthrough',
    decision: 'approved'
  });
  const mentorProfile = data?.mentors?.find((item) => item.id === currentUser?.user?.id) ?? currentUser?.user ?? {};
  const pending = submissionsData.filter((item) => item.status === 'submitted');
  const reviewed = submissionsData.filter((item) => item.status === 'reviewed' || feedbackData.some((feedback) => feedback.challengeId === item.challengeId && feedback.userId === item.userId));
  const averageScore = feedbackData.length
    ? Math.round(feedbackData.reduce((sum, item) => sum + Number(item.score || 0), 0) / feedbackData.length)
    : 0;
  const challengeName = (id) => challengesData.find((item) => item.id === id)?.title ?? id;
  const studentName = (id) => students.find((item) => item.id === id)?.name ?? id;
  const assignedToCurrentMentor = (submission) => {
    const challenge = challengesData.find((item) => item.id === submission.challengeId);
    const mentorName = String(mentorProfile.name || currentUser?.user?.name || '').toLowerCase();
    const mentorId = mentorProfile.id || currentUser?.user?.id;
    if (!mentorName && !mentorId) return true;
    return submission.mentorId === mentorId
      || String(submission.mentor || '').toLowerCase() === mentorName
      || String(challenge?.mentor || '').toLowerCase() === mentorName
      || (mentorProfile.expertise ?? []).some((item) => String(challenge?.track || '').toLowerCase().includes(String(item).toLowerCase()) || String(item).toLowerCase().includes(String(challenge?.track || '').toLowerCase()));
  };
  const activeChallenge = activeSubmission ? challengesData.find((item) => item.id === activeSubmission.challengeId) : null;
  const activeStudent = activeSubmission ? students.find((item) => item.id === activeSubmission.userId) : null;
  const mentorMajorOptions = [...new Set(challengesData.map((item) => item.majorKey).filter(Boolean))];
  const mentorTrackOptions = [...new Set(challengesData.map((item) => item.track).filter(Boolean))];
  const updateMentorFilter = (key, value) => setMentorFilters((current) => ({ ...current, [key]: value }));
  const resetMentorFilters = () => setMentorFilters({ keyword: '', status: 'all', majorKey: 'all', track: 'all', studentId: 'all' });
  const matchMentorSubmission = (submission) => {
    const challenge = challengesData.find((item) => item.id === submission.challengeId);
    const student = students.find((item) => item.id === submission.userId);
    const keyword = mentorFilters.keyword.trim().toLowerCase();
    if (mentorFilters.status !== 'all' && submission.status !== mentorFilters.status) return false;
    if (mentorFilters.majorKey !== 'all' && challenge?.majorKey !== mentorFilters.majorKey) return false;
    if (mentorFilters.track !== 'all' && challenge?.track !== mentorFilters.track) return false;
    if (mentorFilters.studentId !== 'all' && submission.userId !== mentorFilters.studentId) return false;
    if (!keyword) return true;
    return [
      challenge?.title,
      challenge?.track,
      challenge?.majorKey,
      student?.name,
      student?.email,
      submission.status,
      submission.notes
    ].some((value) => String(value ?? '').toLowerCase().includes(keyword));
  };
  const filteredPending = pending.filter(assignedToCurrentMentor).filter(matchMentorSubmission);
  const filteredReviewed = reviewed.filter(assignedToCurrentMentor).filter(matchMentorSubmission);

  const reviewSubmission = (submission) => {
    const challenge = challengesData.find((item) => item.id === submission.challengeId);
    const existingFeedback = feedbackData.find((item) => item.challengeId === submission.challengeId && item.userId === submission.userId);
    setActiveSubmission(submission);
    setReviewForm({
      score: existingFeedback?.score ?? 88,
      title: existingFeedback?.title ?? `Review cho ${challenge?.title ?? submission.challengeId}`,
      strengths: (existingFeedback?.strengths ?? ['Bài làm bám đúng yêu cầu', 'Có minh chứng rõ ràng', 'Có thể đưa vào portfolio']).join('\n'),
      improvements: (existingFeedback?.improvements ?? ['Bổ sung số liệu đo lường', 'Giải thích trade-off ngắn gọn hơn', 'Thêm ảnh hoặc video walkthrough']).join('\n'),
      decision: 'approved'
    });
    setNotice(`Đang mở bài nộp của ${studentName(submission.userId)} để review`);
    setTimeout(() => document.querySelector('.mentor-review-workspace')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 80);
  };

  const updateReviewForm = (key, value) => {
    setReviewForm((current) => ({ ...current, [key]: value }));
  };

  const submitMentorReview = () => {
    if (!activeSubmission) return;
    fetch(`${API_BASE_URL}/api/feedback`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: activeSubmission.userId,
        challengeId: activeSubmission.challengeId,
        score: Number(reviewForm.score || 0),
        title: reviewForm.title,
        strengths: reviewForm.strengths.split('\n').map((item) => item.trim()).filter(Boolean),
        improvements: reviewForm.improvements.split('\n').map((item) => item.trim()).filter(Boolean),
        reviewer: mentorProfile.name ?? currentUser?.user?.name ?? 'Mentor Demo'
      })
    })
      .then((response) => response.ok ? response.json() : Promise.reject(new Error('review failed')))
      .then(() => {
        setNotice(`Đã chấm ${studentName(activeSubmission.userId)} - ${challengeName(activeSubmission.challengeId)}`);
        setActiveSubmission(null);
        refreshData();
      })
      .catch(() => setNotice('Không lưu được feedback. Kiểm tra API/MongoDB.'));
  };

  const rejectSubmission = (submission) => {
    fetch(`${API_BASE_URL}/api/submissions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...submission,
        status: 'rejected',
        notes: `${submission.notes || ''} Cần bổ sung minh chứng trước khi review.`
      })
    })
      .then(() => {
        setNotice(`Đã yêu cầu nộp lại ${challengeName(submission.challengeId)}`);
        if (activeSubmission?.id === submission.id) setActiveSubmission(null);
        refreshData();
      })
      .catch(() => setNotice('Không cập nhật được trạng thái submission'));
  };

  return (
    <section className="content-page admin-page">
      <div className="section-heading inline">
        <div>
          <p className="mono-label">Mentor dashboard</p>
          <h1>{currentUser?.user?.name ?? 'Mentor'} review project</h1>
          <p>Nguồn dữ liệu: {apiStatus === 'mongo' ? 'MongoDB' : 'Local fallback'}. Mentor xem bài nộp, chấm điểm, accept/reject và tạo feedback cho student.</p>
        </div>
        <button className="primary-action compact" onClick={refreshData}>
          <Save size={16} />
          Tải lại
        </button>
      </div>

      {notice && <div className="status-banner"><Check size={17} /> {notice}</div>}

      <div className="mentor-profile-grid">
        <article className="mentor-hero-card">
          <p className="mono-label">Mentor profile</p>
          <h2>{mentorProfile.name ?? 'Mentor'}</h2>
          <strong>{mentorProfile.level ?? 'Senior Mentor'} · {mentorProfile.strongestField ?? 'Project Review'}</strong>
          <p>{mentorProfile.reviewStyle ?? 'Review theo yêu cầu, chất lượng trình bày và khả năng đưa vào portfolio.'}</p>
          <div className="tag-row">
            {(mentorProfile.expertise ?? ['Backend', 'Full Stack']).map((item) => <span key={item}>{item}</span>)}
          </div>
        </article>
        <article className="admin-panel mentor-info-card">
          <h2>Trình độ</h2>
          {(mentorProfile.education ?? ['Software Engineering Mentor']).map((item) => (
            <div className="activity-row" key={item}><GraduationCap size={16} /><span>{item}</span></div>
          ))}
        </article>
        <article className="admin-panel mentor-info-card">
          <h2>Lĩnh vực mạnh</h2>
          {(mentorProfile.domains ?? ['Career platform', 'Portfolio review']).map((item) => (
            <div className="activity-row" key={item}><BadgeCheck size={16} /><span>{item}</span></div>
          ))}
        </article>
      </div>

      <div className="admin-stats">
        <StatCard icon={FileUp} title="Pending reviews" value={pending.length} />
        <StatCard icon={UserRound} title="Active students" value={students.length} />
        <StatCard icon={LayoutDashboard} title="Submissions" value={submissionsData.length} />
        <StatCard icon={Star} title="Average score" value={averageScore || '-'} />
      </div>

      <div className="admin-grid compact">
        <article className="admin-panel">
          <p className="mono-label">Công việc hiện tại</p>
          <div className="admin-list">
            <div className="admin-row">
              <div>
                <strong>{mentorProfile.jobTitle ?? mentorProfile.level ?? 'Senior Mentor'}</strong>
                <span>{mentorProfile.currentCompany ?? 'Portfolio Mentor Network'} · {mentorProfile.yearsOfExperience ?? 5}+ năm kinh nghiệm</span>
              </div>
            </div>
            <div className="tag-row">
              {(mentorProfile.strongestTools ?? ['Portfolio Review', 'Career Coaching']).map((item) => <span key={item}>{item}</span>)}
            </div>
          </div>
        </article>
        <article className="admin-panel">
          <p className="mono-label">Năng lực review</p>
          <div className="admin-list">
            <div className="activity-row"><BadgeCheck size={16} /><span>{mentorProfile.reviewCapacity ?? 8} bài / tuần</span></div>
            <div className="activity-row"><UserRound size={16} /><span>Level phù hợp: {(mentorProfile.menteeLevels ?? ['Junior', 'Mid-level']).join(', ')}</span></div>
            <div className="activity-row"><BookOpen size={16} /><span>Ngôn ngữ: {(mentorProfile.languages ?? ['Vietnamese']).join(', ')}</span></div>
          </div>
        </article>
      </div>

      <section className="management-filters">
        <div>
          <p className="mono-label">Bộ lọc mentor</p>
          <strong>{filteredPending.length} bài chờ · {filteredReviewed.length} bài đã review</strong>
        </div>
        <label>
          Tìm kiếm
          <input value={mentorFilters.keyword} onChange={(event) => updateMentorFilter('keyword', event.target.value)} placeholder="Tên học sinh, challenge, ghi chú..." />
        </label>
        <label>
          Trạng thái
          <select value={mentorFilters.status} onChange={(event) => updateMentorFilter('status', event.target.value)}>
            <option value="all">Tất cả</option>
            <option value="draft">Draft</option>
            <option value="submitted">Submitted</option>
            <option value="reviewed">Reviewed</option>
            <option value="rejected">Rejected</option>
          </select>
        </label>
        <label>
          Ngành
          <select value={mentorFilters.majorKey} onChange={(event) => updateMentorFilter('majorKey', event.target.value)}>
            <option value="all">Tất cả</option>
            {mentorMajorOptions.map((item) => <option value={item} key={item}>{item}</option>)}
          </select>
        </label>
        <label>
          Chuyên ngành
          <select value={mentorFilters.track} onChange={(event) => updateMentorFilter('track', event.target.value)}>
            <option value="all">Tất cả</option>
            {mentorTrackOptions.map((item) => <option value={item} key={item}>{item}</option>)}
          </select>
        </label>
        <label>
          Học sinh
          <select value={mentorFilters.studentId} onChange={(event) => updateMentorFilter('studentId', event.target.value)}>
            <option value="all">Tất cả</option>
            {students.map((student) => <option value={student.id} key={student.id}>{student.name}</option>)}
          </select>
        </label>
        <button className="ghost-action compact" onClick={resetMentorFilters}>
          <Filter size={16} />
          Xóa lọc
        </button>
      </section>

      {activeSubmission && (
        <section className="mentor-review-workspace">
          <div className="review-main-panel">
            <div className="section-heading inline">
              <div>
                <p className="mono-label">Review workspace</p>
                <h2>{activeChallenge?.title ?? activeSubmission.challengeId}</h2>
                <p>{activeChallenge?.summary ?? 'Mentor xem bài làm, đối chiếu yêu cầu và chấm điểm trước khi gửi feedback.'}</p>
              </div>
              <button className="ghost-action compact" onClick={() => setActiveSubmission(null)}>
                <X size={16} />
                Đóng
              </button>
            </div>

            <div className="submission-evidence-grid">
              <article>
                <p className="mono-label">Học sinh</p>
                <h3>{activeStudent?.name ?? activeSubmission.userId}</h3>
                <span>{activeStudent?.email ?? 'Không có email'} · {activeStudent?.selectedMajorKey ?? 'unknown'}</span>
              </article>
              <article>
                <p className="mono-label">Trạng thái</p>
                <h3>{activeSubmission.status}</h3>
                <span>Cập nhật: {activeSubmission.updatedAt ?? 'Chưa rõ'}</span>
              </article>
              <article>
                <p className="mono-label">Challenge</p>
                <h3>{activeChallenge?.difficulty ?? 'Review'}</h3>
                <span>{activeChallenge?.track ?? 'Portfolio'} · {activeChallenge?.xp ?? 0} XP</span>
              </article>
            </div>

            <div className="submission-links">
              <a href={activeSubmission.primaryLink || '#'} target="_blank" rel="noreferrer">
                <Github size={17} />
                Repository / file chính
              </a>
              <a href={activeSubmission.secondaryLink || '#'} target="_blank" rel="noreferrer">
                <LinkIcon size={17} />
                Demo / tài liệu phụ
              </a>
            </div>

            <article className="review-notes">
              <h3>{'Checklist validate khi student n\u1ed9p'}</h3>
              <div className="validation-panel compact">
                {(activeSubmission.validationChecks?.length ? activeSubmission.validationChecks : validateSubmissionPayload(activeSubmission, activeChallenge, { key: activeChallenge?.majorKey, title: activeChallenge?.majorKey }).checks).map((item) => (
                  <div className={'validation-row ' + (item.ok ? 'ok' : 'warn')} key={item.key}>
                    {item.ok ? <Check size={16} /> : <X size={16} />}
                    <span><b>{item.label}</b>{item.detail}</span>
                  </div>
                ))}
              </div>
            </article>

            <article className="review-notes">
              <h3>Ghi chú bài nộp</h3>
              <p>{activeSubmission.notes || 'Học sinh chưa ghi chú thêm. Mentor nên kiểm tra README, demo và bằng chứng trong link nộp bài.'}</p>
            </article>

            <article className="review-notes">
              <h3>Rubric gợi ý</h3>
              {(activeChallenge?.rubric ?? ['Đúng yêu cầu', 'Chất lượng minh chứng', 'Khả năng trình bày portfolio', 'Hướng cải thiện tiếp theo']).map((item) => (
                <div className="activity-row" key={item}><Check size={15} /><span>{item}</span></div>
              ))}
            </article>
          </div>

          <aside className="review-score-panel">
            <p className="mono-label">Chấm điểm</p>
            <label>
              Điểm
              <input type="number" min="0" max="100" value={reviewForm.score} onChange={(event) => updateReviewForm('score', event.target.value)} />
            </label>
            <label>
              Tiêu đề feedback
              <input value={reviewForm.title} onChange={(event) => updateReviewForm('title', event.target.value)} />
            </label>
            <label>
              Điểm mạnh
              <textarea value={reviewForm.strengths} onChange={(event) => updateReviewForm('strengths', event.target.value)} />
            </label>
            <label>
              Cần cải thiện
              <textarea value={reviewForm.improvements} onChange={(event) => updateReviewForm('improvements', event.target.value)} />
            </label>
            <div className="review-action-row">
              <button className="primary-action" onClick={submitMentorReview}>
                <BadgeCheck size={17} />
                Lưu feedback
              </button>
              <button className="ghost-action" onClick={() => rejectSubmission(activeSubmission)}>
                <X size={17} />
                Yêu cầu nộp lại
              </button>
            </div>
          </aside>
        </section>
      )}

      <div className="admin-grid">
        <article className="admin-panel">
          <h2>Bài đang chờ review</h2>
          <div className="admin-list">
            {filteredPending.map((submission) => (
              <div className="admin-row review-row" key={`${submission.userId}-${submission.challengeId}`}>
                <div>
                  <strong>{challengeName(submission.challengeId)}</strong>
                  <span>{studentName(submission.userId)} · {submission.status} · {submission.updatedAt}</span>
                </div>
                <button onClick={() => reviewSubmission(submission)}>Mở bài</button>
                <button onClick={() => rejectSubmission(submission)}>Reject</button>
              </div>
            ))}
            {!filteredPending.length && <div className="empty-state">Không có bài phù hợp với bộ lọc.</div>}
          </div>
        </article>

        <article className="admin-panel">
          <h2>Công ty từng làm</h2>
          <div className="admin-list">
            {(mentorProfile.workHistory ?? []).map((job) => (
              <div className="admin-row" key={`${job.company}-${job.period}`}>
                <div>
                  <strong>{job.company}</strong>
                  <span>{job.role} · {job.period}</span>
                </div>
              </div>
            ))}
            <div className="status-banner muted"><Sparkles size={16} /> Lịch review: {mentorProfile.availability ?? 'Theo lịch mentor'}</div>
          </div>
        </article>
      </div>

      <div className="admin-grid compact">
        <article className="admin-panel">
          <h2>Active students</h2>
          {students.filter((student) => mentorFilters.studentId === 'all' || student.id === mentorFilters.studentId).map((student) => (
            <div className="admin-row" key={student.id}>
              <div>
                <strong>{student.name}</strong>
                <span>{student.email} · {student.selectedMajorKey} · {student.joinedChallengeIds?.length ?? 0} challenges</span>
              </div>
            </div>
          ))}
        </article>
        <article className="admin-panel">
          <h2>Feedback đã tạo</h2>
          {feedbackData.filter((feedback) => {
            const submission = submissionsData.find((item) => item.userId === feedback.userId && item.challengeId === feedback.challengeId) ?? { userId: feedback.userId, challengeId: feedback.challengeId, status: 'reviewed' };
            return matchMentorSubmission(submission);
          }).map((feedback) => (
            <div className="admin-row" key={feedback.id}>
              <div>
                <strong>{challengeName(feedback.challengeId)}</strong>
                <span>{feedback.reviewer} · {feedback.score}/100 · {feedback.title}</span>
              </div>
            </div>
          ))}
        </article>
      </div>
    </section>
  );
}

function AdminPage({ apiStatus, data, notice, currentUser, refreshData, setAdminNotice, createFeedback }) {
  const [form, setForm] = useState({
    id: '',
    title: '',
    majorKey: 'dev',
    track: 'Frontend',
    difficulty: 'Junior',
    xp: 350,
    due: '7 ngày',
    mentor: 'Mentor Demo',
    tags: 'Demo,Portfolio',
    summary: ''
  });
  const [editingId, setEditingId] = useState('');
  const [adminFilters, setAdminFilters] = useState({
    challengeKeyword: '',
    challengeMajor: 'all',
    challengeTrack: 'all',
    challengeDifficulty: 'all',
    challengeMentor: 'all',
    userKeyword: '',
    userMajor: 'all',
    submissionKeyword: '',
    submissionStatus: 'all',
    submissionMajor: 'all'
  });
  const isAdmin = (currentUser?.type ?? currentUser?.user?.role) === 'admin';
  const challengesData = data?.challenges ?? [];
  const users = data?.users?.length ? data.users : data?.demoUser ? [data.demoUser] : [];
  const submissionsData = data?.submissions ?? [];
  const categories = data?.categories ?? [];
  const mentors = data?.mentors ?? [];
  const notifications = data?.notifications ?? [];
  const adminProfile = data?.admins?.find((item) => item.id === currentUser?.user?.id) ?? currentUser?.user ?? {};
  const premiumSubscriptions = data?.premiumSubscriptions?.length ? data.premiumSubscriptions : demoPremiumSubscriptions;
  const premiumRevenue = premiumSubscriptions.reduce((sum, item) => sum + Number(item.revenue || 0), 0);
  const activePremiumCount = premiumSubscriptions.filter((item) => item.status === 'active').length;
  const overview = {
    majors: data?.majors?.length ?? 0,
    challenges: challengesData.length,
    submissions: submissionsData.length,
    users: users.length
  };
  const adminMajorOptions = [...new Set(challengesData.map((item) => item.majorKey).filter(Boolean))];
  const adminTrackOptions = [...new Set(challengesData.map((item) => item.track).filter(Boolean))];
  const adminDifficultyOptions = [...new Set(challengesData.map((item) => item.difficulty).filter(Boolean))];
  const adminMentorOptions = [...new Set(challengesData.map((item) => item.mentor).filter(Boolean))];
  const updateAdminFilter = (key, value) => setAdminFilters((current) => ({ ...current, [key]: value }));
  const resetAdminFilters = () => setAdminFilters({
    challengeKeyword: '',
    challengeMajor: 'all',
    challengeTrack: 'all',
    challengeDifficulty: 'all',
    challengeMentor: 'all',
    userKeyword: '',
    userMajor: 'all',
    submissionKeyword: '',
    submissionStatus: 'all',
    submissionMajor: 'all'
  });
  const challengeById = (id) => challengesData.find((item) => item.id === id);
  const userById = (id) => users.find((item) => item.id === id);
  const filteredChallenges = challengesData.filter((challenge) => {
    const keyword = adminFilters.challengeKeyword.trim().toLowerCase();
    if (adminFilters.challengeMajor !== 'all' && challenge.majorKey !== adminFilters.challengeMajor) return false;
    if (adminFilters.challengeTrack !== 'all' && challenge.track !== adminFilters.challengeTrack) return false;
    if (adminFilters.challengeDifficulty !== 'all' && challenge.difficulty !== adminFilters.challengeDifficulty) return false;
    if (adminFilters.challengeMentor !== 'all' && challenge.mentor !== adminFilters.challengeMentor) return false;
    if (!keyword) return true;
    return [challenge.title, challenge.summary, challenge.track, challenge.majorKey, challenge.mentor, challenge.tags?.join(' ')]
      .some((value) => String(value ?? '').toLowerCase().includes(keyword));
  });
  const filteredUsers = users.filter((user) => {
    const keyword = adminFilters.userKeyword.trim().toLowerCase();
    if (adminFilters.userMajor !== 'all' && user.selectedMajorKey !== adminFilters.userMajor) return false;
    if (!keyword) return true;
    return [user.name, user.email, user.selectedMajorKey, user.careerGoal, user.badges?.join(' ')]
      .some((value) => String(value ?? '').toLowerCase().includes(keyword));
  });
  const filteredSubmissions = submissionsData.filter((submission) => {
    const keyword = adminFilters.submissionKeyword.trim().toLowerCase();
    const challenge = challengeById(submission.challengeId);
    const user = userById(submission.userId);
    if (adminFilters.submissionStatus !== 'all' && submission.status !== adminFilters.submissionStatus) return false;
    if (adminFilters.submissionMajor !== 'all' && challenge?.majorKey !== adminFilters.submissionMajor) return false;
    if (!keyword) return true;
    return [submission.challengeId, submission.userId, submission.status, submission.notes, challenge?.title, challenge?.track, user?.name, user?.email]
      .some((value) => String(value ?? '').toLowerCase().includes(keyword));
  });

  const updateForm = (key, value) => setForm((current) => ({ ...current, [key]: value }));
  const resetForm = () => {
    setEditingId('');
    setForm({ id: '', title: '', majorKey: 'dev', track: 'Frontend', difficulty: 'Junior', xp: 350, due: '7 ngày', mentor: 'Mentor Demo', tags: 'Demo,Portfolio', summary: '' });
  };
  const saveChallenge = () => {
    if (!isAdmin) {
      setAdminNotice('Cần đăng nhập admin demo để quản lý dữ liệu');
      return;
    }
    const id = editingId || form.id || `custom-${Date.now()}`;
    const method = editingId ? 'PUT' : 'POST';
    const url = editingId ? `${API_BASE_URL}/api/challenges/${editingId}` : `${API_BASE_URL}/api/challenges`;
    fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, id })
    })
      .then((response) => response.ok ? response.json() : Promise.reject(new Error('save failed')))
      .then(() => {
        setAdminNotice(editingId ? 'Đã cập nhật challenge' : 'Đã thêm challenge mới');
        resetForm();
        refreshData();
      })
      .catch(() => setAdminNotice('Không lưu được challenge. Kiểm tra API/MongoDB.'));
  };
  const startCreate = () => {
    resetForm();
    setAdminNotice('Đang tạo challenge mới. Điền form rồi bấm Lưu thử thách.');
    document.querySelector('.admin-form')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };
  const editChallenge = (challenge) => {
    setEditingId(challenge.id);
    setForm({
      id: challenge.id,
      title: challenge.title,
      majorKey: challenge.majorKey,
      track: challenge.track,
      difficulty: challenge.difficulty,
      xp: challenge.xp,
      due: challenge.due,
      mentor: challenge.mentor,
      tags: challenge.tags?.join(',') ?? '',
      summary: challenge.summary
    });
  };
  const deleteChallenge = (id) => {
    if (!isAdmin) {
      setAdminNotice('Cần đăng nhập admin demo để xóa dữ liệu');
      return;
    }
    fetch(`${API_BASE_URL}/api/challenges/${id}`, { method: 'DELETE' })
      .then((response) => response.ok ? response.json() : Promise.reject(new Error('delete failed')))
      .then(() => {
        setAdminNotice('Đã xóa challenge và submission liên quan');
        refreshData();
      })
      .catch(() => setAdminNotice('Không xóa được challenge. Kiểm tra API/MongoDB.'));
  };
  const updateUser = (id, updates) => {
    if (!isAdmin) {
      setAdminNotice('Cần đăng nhập admin demo để quản lý user');
      return;
    }
    fetch(`${API_BASE_URL}/api/users/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates)
    })
      .then((response) => response.ok ? response.json() : Promise.reject(new Error('user update failed')))
      .then(() => {
        setAdminNotice('Đã cập nhật user');
        refreshData();
      })
      .catch(() => setAdminNotice('Không cập nhật được user. Kiểm tra API/MongoDB.'));
  };

  return (
    <section className="content-page admin-page">
      <div className="section-heading inline">
        <div>
          <p className="mono-label">Admin console</p>
          <h1>Quản lý dữ liệu Portfolio</h1>
          <p>Demo account: admin@portfolio.vn / admin123. Nguồn dữ liệu hiện tại: {apiStatus === 'mongo' ? 'MongoDB' : 'Local fallback'}.</p>
        </div>
        <button className="primary-action compact" onClick={refreshData}>
          <Save size={16} />
          Tải lại data
        </button>
        <button className="primary-action compact" onClick={startCreate}>
          <Plus size={16} />
          Thêm thử thách
        </button>
      </div>

      {notice && <div className="status-banner"><Check size={17} /> {notice}</div>}

      <div className="admin-stats">
        <StatCard icon={Blocks} title="Ngành lớn" value={overview.majors} />
        <StatCard icon={LayoutDashboard} title="Challenge" value={overview.challenges} />
        <StatCard icon={UserRound} title="Người dùng" value={overview.users} />
        <StatCard icon={FileUp} title="Lượt nộp bài" value={overview.submissions} />
        <StatCard icon={GraduationCap} title="Mentor" value={mentors.length} />
        <StatCard icon={Crown} title="Premium active" value={activePremiumCount} />
      </div>

      <div className="admin-grid compact">
        <article className="admin-panel">
          <p className="mono-label">Admin profile</p>
          <h2>{adminProfile.name ?? 'Portfolio Admin'}</h2>
          <div className="admin-list">
            <div className="admin-row">
              <div>
                <strong>{adminProfile.title ?? 'Platform Operations Manager'}</strong>
                <span>{adminProfile.department ?? 'Career Platform Operations'} · {adminProfile.seniority ?? 'Head Admin'}</span>
              </div>
            </div>
            <div className="tag-row">
              {(adminProfile.permissions ?? ['manage_challenges', 'manage_users', 'view_reports']).map((item) => <span key={item}>{item}</span>)}
            </div>
          </div>
        </article>
        <article className="admin-panel">
          <p className="mono-label">Nghiệp vụ quản trị</p>
          <div className="admin-list">
            {(adminProfile.responsibilities ?? ['Quản lý thử thách', 'Theo dõi submission', 'Điều phối mentor']).map((item) => (
              <div className="activity-row" key={item}><ShieldCheck size={16} /><span>{item}</span></div>
            ))}
          </div>
        </article>
        <article className="admin-panel">
          <p className="mono-label">Vận hành demo</p>
          <div className="admin-list">
            {Object.entries(adminProfile.operatingMetrics ?? {
              weeklyActiveStudents: users.length,
              pendingReviews: submissionsData.filter((item) => item.status === 'submitted').length,
              publishedChallenges: challengesData.length,
              activeMentors: mentors.length
            }).map(([key, value]) => (
              <div className="admin-row" key={key}>
                <div>
                  <strong>{value}</strong>
                  <span>{key}</span>
                </div>
              </div>
            ))}
          </div>
        </article>
      </div>

      <div className="admin-grid compact">
        <article className="admin-panel">
          <p className="mono-label">Premium & doanh thu</p>
          <h2>{formatVnd(premiumRevenue)}</h2>
          <div className="admin-list">
            <div className="activity-row"><Crown size={16} /><span>{activePremiumCount} người dùng Premium đang hoạt động</span></div>
            <div className="activity-row"><CreditCard size={16} /><span>{premiumSubscriptions.length} subscription mẫu trong hệ thống</span></div>
          </div>
        </article>
        <article className="admin-panel">
          <p className="mono-label">Quản lý subscription</p>
          <div className="admin-list">
            {premiumSubscriptions.slice(0, 5).map((item) => (
              <div className="admin-row" key={item.id}>
                <div>
                  <strong>{item.userName}</strong>
                  <span>{item.planName} · {item.status} · {item.expiresAt}</span>
                </div>
                <b>{formatVnd(item.revenue)}</b>
              </div>
            ))}
          </div>
        </article>
      </div>

      <section className="management-filters admin-management-filters">
        <div>
          <p className="mono-label">Bộ lọc admin</p>
          <strong>{filteredChallenges.length} challenges · {filteredUsers.length} users · {filteredSubmissions.length} submissions</strong>
        </div>
        <label>
          Tìm challenge
          <input value={adminFilters.challengeKeyword} onChange={(event) => updateAdminFilter('challengeKeyword', event.target.value)} placeholder="Tên, tag, mentor..." />
        </label>
        <label>
          Ngành challenge
          <select value={adminFilters.challengeMajor} onChange={(event) => updateAdminFilter('challengeMajor', event.target.value)}>
            <option value="all">Tất cả</option>
            {adminMajorOptions.map((item) => <option value={item} key={item}>{item}</option>)}
          </select>
        </label>
        <label>
          Chuyên ngành
          <select value={adminFilters.challengeTrack} onChange={(event) => updateAdminFilter('challengeTrack', event.target.value)}>
            <option value="all">Tất cả</option>
            {adminTrackOptions.map((item) => <option value={item} key={item}>{item}</option>)}
          </select>
        </label>
        <label>
          Độ khó
          <select value={adminFilters.challengeDifficulty} onChange={(event) => updateAdminFilter('challengeDifficulty', event.target.value)}>
            <option value="all">Tất cả</option>
            {adminDifficultyOptions.map((item) => <option value={item} key={item}>{item}</option>)}
          </select>
        </label>
        <label>
          Mentor
          <select value={adminFilters.challengeMentor} onChange={(event) => updateAdminFilter('challengeMentor', event.target.value)}>
            <option value="all">Tất cả</option>
            {adminMentorOptions.map((item) => <option value={item} key={item}>{item}</option>)}
          </select>
        </label>
        <label>
          Tìm user
          <input value={adminFilters.userKeyword} onChange={(event) => updateAdminFilter('userKeyword', event.target.value)} placeholder="Tên, email, mục tiêu..." />
        </label>
        <label>
          Ngành user
          <select value={adminFilters.userMajor} onChange={(event) => updateAdminFilter('userMajor', event.target.value)}>
            <option value="all">Tất cả</option>
            {adminMajorOptions.map((item) => <option value={item} key={item}>{item}</option>)}
          </select>
        </label>
        <label>
          Tìm submission
          <input value={adminFilters.submissionKeyword} onChange={(event) => updateAdminFilter('submissionKeyword', event.target.value)} placeholder="Học sinh, bài tập, ghi chú..." />
        </label>
        <label>
          Trạng thái nộp
          <select value={adminFilters.submissionStatus} onChange={(event) => updateAdminFilter('submissionStatus', event.target.value)}>
            <option value="all">Tất cả</option>
            <option value="draft">Draft</option>
            <option value="submitted">Submitted</option>
            <option value="reviewed">Reviewed</option>
            <option value="rejected">Rejected</option>
          </select>
        </label>
        <label>
          Ngành bài nộp
          <select value={adminFilters.submissionMajor} onChange={(event) => updateAdminFilter('submissionMajor', event.target.value)}>
            <option value="all">Tất cả</option>
            {adminMajorOptions.map((item) => <option value={item} key={item}>{item}</option>)}
          </select>
        </label>
        <button className="ghost-action compact" onClick={resetAdminFilters}>
          <Filter size={16} />
          Xóa lọc
        </button>
      </section>

      <div className="admin-grid">
        <article className="admin-panel">
          <h2>{editingId ? 'Sửa challenge' : 'Thêm challenge'}</h2>
          <div className="admin-form">
            <label>ID<input value={form.id} onChange={(event) => updateForm('id', event.target.value)} placeholder="custom-demo" disabled={Boolean(editingId)} /></label>
            <label>Tiêu đề<input value={form.title} onChange={(event) => updateForm('title', event.target.value)} placeholder="Tên bài tập" /></label>
            <label>Ngành
              <select value={form.majorKey} onChange={(event) => updateForm('majorKey', event.target.value)}>
                <option value="dev">Dev</option>
                <option value="mkt">MKT</option>
                <option value="design">Design</option>
              </select>
            </label>
            <label>Chuyên ngành<input value={form.track} onChange={(event) => updateForm('track', event.target.value)} placeholder="Frontend / SEO / UI Design" /></label>
            <label>Cấp độ<input value={form.difficulty} onChange={(event) => updateForm('difficulty', event.target.value)} /></label>
            <label>XP<input type="number" value={form.xp} onChange={(event) => updateForm('xp', event.target.value)} /></label>
            <label>Hạn nộp<input value={form.due} onChange={(event) => updateForm('due', event.target.value)} /></label>
            <label>Mentor<input value={form.mentor} onChange={(event) => updateForm('mentor', event.target.value)} /></label>
            <label>Tags<input value={form.tags} onChange={(event) => updateForm('tags', event.target.value)} /></label>
            <label className="wide">Mô tả<textarea value={form.summary} onChange={(event) => updateForm('summary', event.target.value)} /></label>
          </div>
          <div className="submit-actions">
            <button className="primary-action" onClick={saveChallenge}><Save size={17} /> {editingId ? 'Cập nhật thử thách' : 'Lưu thử thách mới'}</button>
            <button className="ghost-action" onClick={resetForm}><X size={17} /> Hủy</button>
          </div>
        </article>

        <article className="admin-panel">
          <h2>Challenge đang có</h2>
          <div className="admin-list">
            {filteredChallenges.map((challenge) => (
              <div className="admin-row" key={challenge.id}>
                <div>
                  <strong>{challenge.title}</strong>
                  <span>{challenge.majorKey} · {challenge.track} · {challenge.xp} XP</span>
                </div>
                <button onClick={() => editChallenge(challenge)}>Sửa</button>
                <button onClick={() => deleteChallenge(challenge.id)}>Xóa</button>
              </div>
            ))}
            {!filteredChallenges.length && <div className="empty-state">Không có challenge phù hợp với bộ lọc.</div>}
          </div>
        </article>
      </div>

      <div className="admin-grid compact">
        <article className="admin-panel">
          <h2>Người dùng</h2>
          {filteredUsers.map((user) => (
            <div className="admin-row" key={user.id}>
              <div>
                <strong>{user.name}</strong>
                <span>{user.email} · {user.selectedMajorKey} · {user.status ?? 'active'} · {user.path?.length ?? 0} vị trí</span>
              </div>
              <button onClick={() => updateUser(user.id, { status: user.status === 'locked' ? 'active' : 'locked' })}>
                {user.status === 'locked' ? 'Mở khóa' : 'Khóa'}
              </button>
              <button onClick={() => updateUser(user.id, { selectedMajorKey: user.selectedMajorKey === 'dev' ? 'mkt' : user.selectedMajorKey === 'mkt' ? 'design' : 'dev', path: [] })}>
                Đổi ngành
              </button>
            </div>
          ))}
          {!filteredUsers.length && <div className="empty-state">Không có người dùng phù hợp.</div>}
        </article>
        <article className="admin-panel">
          <h2>Lịch sử nộp bài</h2>
          {filteredSubmissions.map((submission) => (
            <div className="admin-row" key={`${submission.userId}-${submission.challengeId}`}>
              <div>
                <strong>{challengeById(submission.challengeId)?.title ?? submission.challengeId}</strong>
                <span>{userById(submission.userId)?.name ?? submission.userId} · {submission.status} · {submission.updatedAt}</span>
              </div>
              <button onClick={() => {
                createFeedback(submission.challengeId, submission.userId);
                setAdminNotice(`Đã tạo feedback cho ${submission.challengeId}`);
                setTimeout(refreshData, 500);
              }}>
                Review
              </button>
            </div>
          ))}
          {!filteredSubmissions.length && <div className="empty-state">Không có bài nộp phù hợp.</div>}
        </article>
      </div>

      <div className="admin-grid compact">
        <article className="admin-panel">
          <h2>Categories & Career Domains</h2>
          {categories.map((category) => (
            <div className="admin-row" key={category.id}>
              <div>
                <strong>{category.name}</strong>
                <span>{category.majorKey} · {category.description}</span>
              </div>
            </div>
          ))}
        </article>
        <article className="admin-panel">
          <h2>Reports & Settings</h2>
          <div className="admin-row">
            <div>
              <strong>Monthly activity</strong>
              <span>{submissionsData.length} submissions · {notifications.filter((item) => item.unread).length} unread notifications</span>
            </div>
          </div>
          <div className="admin-row">
            <div>
              <strong>Review policy</strong>
              <span>Mentor accept/reject submissions, admin manages challenge catalog.</span>
            </div>
          </div>
          <div className="admin-row">
            <div>
              <strong>System mode</strong>
              <span>{apiStatus === 'mongo' ? 'MongoDB connected' : 'Local fallback mode'}</span>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}

function Stat({ value, label }) {
  return <div className="stat"><strong>{value}</strong><span>{label}</span></div>;
}

function StatCard({ icon: Icon, title, value }) {
  return <article className="stat-card"><Icon size={22} /><strong>{value}</strong><span>{title}</span></article>;
}

createRoot(document.getElementById('root')).render(<App />);
