import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  BadgeCheck,
  Blocks,
  BookOpen,
  BriefcaseBusiness,
  Check,
  ChevronsUp,
  CircleDollarSign,
  Clock,
  Compass,
  CreditCard,
  Crown,
  Edit3,
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

const supplementalChallengeCatalog = {
  dev: [
    ['dev-frontend-ui-states', 'Frontend', 'Bộ UI state cho sản phẩm SaaS', 'Sơ cấp', 380, '7 ngày', 'Mina Lê', ['React', 'State', 'UI'], 'Xây các state loading, empty, error, success cho dashboard sản phẩm.'],
    ['dev-frontend-accessibility-audit', 'Frontend', 'Audit accessibility landing page', 'Trung cấp', 520, '9 ngày', 'Mina Lê', ['A11y', 'WCAG', 'Report'], 'Kiểm tra contrast, keyboard flow, aria label và đề xuất backlog sửa lỗi.'],
    ['dev-backend-auth-rbac', 'Backend', 'API phân quyền RBAC', 'Trung cấp', 610, '12 ngày', 'Anh Trần', ['Node', 'JWT', 'RBAC'], 'Thiết kế đăng nhập, refresh token, role permission và middleware kiểm tra quyền.'],
    ['dev-backend-payment-webhook', 'Backend', 'Webhook thanh toán an toàn', 'Cao cấp', 760, '14 ngày', 'Anh Trần', ['Webhook', 'Security', 'MongoDB'], 'Xử lý webhook idempotent, xác thực chữ ký, retry và log giao dịch.'],
    ['dev-fullstack-booking-crud', 'Full Stack', 'Web đặt lịch dịch vụ', 'Trung cấp', 640, '13 ngày', 'Linh Đào', ['React', 'API', 'Booking'], 'Làm CRUD lịch hẹn, kiểm tra slot trống, trạng thái booking và trang quản trị.'],
    ['dev-fullstack-saas-billing', 'Full Stack', 'Mini SaaS subscription', 'Cao cấp', 820, '18 ngày', 'Khoa Vũ', ['Billing', 'Plan', 'Dashboard'], 'Mô phỏng gói free/premium, usage limit, invoice và dashboard người dùng.'],
    ['dev-mobile-offline-notes', 'Mobile', 'Ứng dụng ghi chú offline-first', 'Trung cấp', 620, '12 ngày', 'Linh Đào', ['Flutter', 'Offline', 'Sync'], 'Lưu local, đồng bộ khi có mạng, xử lý conflict và trạng thái pending.'],
    ['dev-mobile-push-notification', 'Mobile', 'Push notification lịch học', 'Cao cấp', 720, '15 ngày', 'Linh Đào', ['FCM', 'Mobile', 'Scheduler'], 'Thiết kế lịch nhắc học, segment người dùng và theo dõi trạng thái gửi.'],
    ['dev-devops-monitoring-dashboard', 'DevOps', 'Dashboard giám sát uptime', 'Trung cấp', 650, '10 ngày', 'Nora Vũ', ['Monitoring', 'Docker', 'Alert'], 'Dựng health check, log, alert rule và dashboard trạng thái service.'],
    ['dev-devops-k8s-rollout', 'DevOps', 'Kế hoạch rollout Kubernetes', 'Cao cấp', 860, '18 ngày', 'Nora Vũ', ['K8s', 'Rollback', 'SLO'], 'Viết manifest, chiến lược rolling update, rollback và tiêu chí SLO.'],
    ['dev-ai-rag-faq', 'AI / Data', 'FAQ bot có nguồn trích dẫn', 'Cao cấp', 840, '16 ngày', 'Nam Hồ', ['RAG', 'Vector DB', 'Citations'], 'Xây workflow ingest tài liệu, truy vấn, trả lời có nguồn và kiểm tra hallucination.'],
    ['dev-ai-data-pipeline', 'AI / Data', 'Pipeline dữ liệu tuyển dụng', 'Cao cấp', 790, '14 ngày', 'Nam Hồ', ['Python', 'ETL', 'Dashboard'], 'Thu thập, làm sạch, phân loại job post và trực quan hóa kỹ năng nổi bật.'],
    ['dev-architecture-migration-plan', 'Software Architecture', 'Kế hoạch tách microservice', 'Lead', 920, '20 ngày', 'Khoa Vũ', ['C4', 'ADR', 'Migration'], 'Phân tích monolith, chọn boundary, vẽ C4 và viết ADR cho migration.'],
    ['dev-security-api-hardening', 'Backend', 'Hardening API production', 'Cao cấp', 780, '13 ngày', 'Anh Trần', ['Security', 'Rate limit', 'Audit'], 'Bổ sung validation, rate limit, audit log, kiểm tra secret và checklist deploy.'],
    ['dev-test-automation-suite', 'Frontend', 'Bộ test tự động cho web app', 'Trung cấp', 660, '11 ngày', 'Mina Lê', ['Vitest', 'Playwright', 'CI'], 'Viết unit, integration, e2e smoke test và chạy trong CI.']
  ],
  mkt: [
    ['mkt-content-editorial-calendar', 'Content', 'Editorial calendar 30 ngày', 'Sơ cấp', 360, '7 ngày', 'Mai Nguyễn', ['Content', 'Calendar', 'Persona'], 'Lên lịch nội dung đa kênh theo funnel, persona và mục tiêu tuần.'],
    ['mkt-content-short-video-series', 'Content', 'Series video ngắn ra mắt sản phẩm', 'Trung cấp', 540, '9 ngày', 'Mai Nguyễn', ['Short Video', 'Hook', 'Script'], 'Viết concept, hook, kịch bản 10 video và cách đo retention.'],
    ['mkt-seo-topic-cluster', 'SEO', 'Topic cluster cho blog ngành', 'Trung cấp', 590, '12 ngày', 'Minh Phan', ['SEO', 'Cluster', 'Keyword'], 'Xây pillar page, cluster keyword, internal link và kế hoạch publish.'],
    ['mkt-seo-technical-fix-plan', 'SEO', 'Technical SEO backlog', 'Cao cấp', 720, '14 ngày', 'Minh Phan', ['Core Web Vitals', 'Indexing', 'Audit'], 'Audit index, schema, tốc độ, duplicate content và ưu tiên backlog sửa lỗi.'],
    ['mkt-performance-meta-funnel', 'Performance Marketing', 'Funnel Meta Ads tuyển lead', 'Trung cấp', 630, '10 ngày', 'Trang Bùi', ['Meta Ads', 'Funnel', 'Creative'], 'Chia campaign theo awareness, consideration, conversion và creative testing.'],
    ['mkt-performance-google-search', 'Performance Marketing', 'Google Search campaign 20 triệu', 'Cao cấp', 760, '13 ngày', 'Trang Bùi', ['Google Ads', 'Budget', 'ROAS'], 'Xây cấu trúc campaign, keyword match type, landing page và đo hiệu quả.'],
    ['mkt-social-community-playbook', 'Social Media', 'Playbook cộng đồng 4 tuần', 'Sơ cấp', 390, '8 ngày', 'Mai Nguyễn', ['Community', 'Social', 'Engagement'], 'Thiết kế nhịp đăng bài, format tương tác và rule quản trị cộng đồng.'],
    ['mkt-social-influencer-brief', 'Social Media', 'Influencer brief cho chiến dịch', 'Trung cấp', 560, '9 ngày', 'Trang Bùi', ['KOL', 'Brief', 'Tracking'], 'Chọn tiêu chí KOL, brief nội dung, mã tracking và KPI đánh giá.'],
    ['mkt-brand-positioning-map', 'Thương hiệu', 'Bản đồ định vị thương hiệu', 'Trung cấp', 610, '11 ngày', 'Khoa Phạm', ['Brand', 'Positioning', 'Competitor'], 'So sánh đối thủ, xác định điểm khác biệt và tuyên bố định vị.'],
    ['mkt-brand-launch-deck', 'Thương hiệu', 'Deck ra mắt thương hiệu', 'Cao cấp', 790, '15 ngày', 'Khoa Phạm', ['Brand', 'Deck', 'Campaign'], 'Tạo big idea, key message, visual direction và kế hoạch launch đa kênh.'],
    ['mkt-growth-referral-loop', 'Growth', 'Referral loop cho app học tập', 'Cao cấp', 820, '16 ngày', 'Khoa Phạm', ['Referral', 'Experiment', 'Activation'], 'Thiết kế cơ chế giới thiệu, reward, tracking và thí nghiệm A/B.'],
    ['mkt-growth-retention-experiment', 'Growth', 'Thí nghiệm giữ chân người dùng', 'Cao cấp', 780, '14 ngày', 'Khoa Phạm', ['Retention', 'Cohort', 'Experiment'], 'Tìm điểm rơi churn, đặt giả thuyết, thiết kế cohort và đo tác động.'],
    ['mkt-crm-onboarding-journey', 'CRM / Lifecycle', 'Journey onboarding 7 ngày', 'Trung cấp', 600, '10 ngày', 'Vy Hoàng', ['CRM', 'Lifecycle', 'Email'], 'Thiết kế email, push, segmentation và trigger giúp người dùng kích hoạt.'],
    ['mkt-crm-winback-segment', 'CRM / Lifecycle', 'Chiến dịch win-back khách hàng', 'Cao cấp', 740, '13 ngày', 'Vy Hoàng', ['CRM', 'Segment', 'Offer'], 'Phân nhóm churn risk, xây ưu đãi, automation flow và chỉ số thành công.'],
    ['mkt-research-competitor-map', 'Research', 'Market competitor map', 'Trung cấp', 620, '12 ngày', 'Duy Lâm', ['Research', 'Benchmark', 'Insight'], 'Phân tích đối thủ, bảng tính năng, giá và cơ hội định vị sản phẩm.']
  ],
  design: [
    ['design-ui-component-states', 'UI Design', 'Component states cho design system', 'Sơ cấp', 410, '8 ngày', 'Vy Hoàng', ['Figma', 'Component', 'State'], 'Thiết kế state default, hover, focus, disabled, error cho form và card.'],
    ['design-ui-responsive-dashboard', 'UI Design', 'Dashboard responsive đa breakpoint', 'Trung cấp', 620, '11 ngày', 'Vy Hoàng', ['Dashboard', 'Responsive', 'UI'], 'Thiết kế desktop, tablet, mobile với grid, density và ưu tiên thông tin.'],
    ['design-ux-checkout-test', 'UX Design', 'Usability test luồng checkout', 'Trung cấp', 640, '12 ngày', 'Phúc Lê', ['UX Test', 'Checkout', 'Insight'], 'Lập kịch bản test, ghi nhận friction và đề xuất cải thiện có ưu tiên.'],
    ['design-ux-information-architecture', 'UX Design', 'Information architecture cho app học', 'Cao cấp', 730, '14 ngày', 'Phúc Lê', ['IA', 'Card Sort', 'Flow'], 'Tổ chức menu, luồng tìm bài học, taxonomy và sơ đồ điều hướng.'],
    ['design-product-feature-prd', 'Product Design', 'PRD cho tính năng portfolio public', 'Trung cấp', 660, '12 ngày', 'An Phạm', ['PRD', 'Prototype', 'Metric'], 'Viết mục tiêu, user story, luồng chính, edge case và metric thành công.'],
    ['design-product-metric-prototype', 'Product Design', 'Prototype gắn metric sản phẩm', 'Cao cấp', 820, '16 ngày', 'An Phạm', ['Prototype', 'Metric', 'Experiment'], 'Thiết kế prototype kèm giả thuyết, event tracking và plan kiểm chứng.'],
    ['design-graphic-social-kit', 'Graphic Design', 'Social kit cho chiến dịch tuyển sinh', 'Sơ cấp', 390, '7 ngày', 'An Chi', ['Social', 'Template', 'Brand'], 'Tạo bộ template post, story, banner với guideline sử dụng rõ ràng.'],
    ['design-graphic-event-poster', 'Graphic Design', 'Poster sự kiện cộng đồng', 'Trung cấp', 560, '9 ngày', 'An Chi', ['Poster', 'Layout', 'Print'], 'Thiết kế poster online/offline với hierarchy, CTA và file xuất bản chuẩn.'],
    ['design-motion-onboarding-lottie', 'Motion Design', 'Onboarding motion bằng Lottie', 'Trung cấp', 650, '12 ngày', 'Huy Võ', ['Lottie', 'Storyboard', 'Motion'], 'Tạo storyboard, motion timing và file animation cho onboarding app.'],
    ['design-motion-product-reveal', 'Motion Design', 'Video product reveal 15 giây', 'Cao cấp', 760, '14 ngày', 'Huy Võ', ['Motion', 'Video', 'Brand'], 'Thiết kế rhythm, transition, CTA và guideline export cho social.'],
    ['design-brand-logo-system', 'Brand Design', 'Logo system cho startup', 'Trung cấp', 630, '11 ngày', 'An Chi', ['Logo', 'System', 'Brand'], 'Tạo logo chính, biến thể, vùng an toàn, màu và rule sử dụng.'],
    ['design-brand-guideline-book', 'Brand Design', 'Brand guideline mini book', 'Cao cấp', 800, '15 ngày', 'An Chi', ['Guideline', 'Brand', 'Template'], 'Biên soạn guideline gồm tone, visual language, layout và ứng dụng mẫu.'],
    ['design-research-interview-plan', 'UX Research', 'Kế hoạch phỏng vấn người dùng', 'Sơ cấp', 420, '8 ngày', 'Hà My', ['Interview', 'Research', 'Script'], 'Xác định mục tiêu nghiên cứu, chọn mẫu, viết câu hỏi và consent form.'],
    ['design-research-insight-report', 'UX Research', 'Insight report từ phỏng vấn', 'Cao cấp', 780, '14 ngày', 'Hà My', ['Insight', 'Synthesis', 'Journey'], 'Tổng hợp pattern, quote, opportunity và khuyến nghị sản phẩm.'],
    ['design-accessibility-redesign', 'UX Design', 'Redesign màn hình theo accessibility', 'Cao cấp', 740, '13 ngày', 'Phúc Lê', ['A11y', 'UI', 'WCAG'], 'Sửa contrast, focus state, copy lỗi và trải nghiệm keyboard cho form.']
  ]
};

Object.entries(supplementalChallengeCatalog).forEach(([majorKey, items]) => {
  const currentCount = challenges.filter((item) => item.majorKey === majorKey).length;
  const existingIds = new Set(challenges.map((item) => item.id));
  items.slice(0, Math.max(0, 20 - currentCount)).forEach(([id, track, title, difficulty, xp, due, mentor, tags, summary]) => {
    if (!existingIds.has(id)) challenges.push({ id, majorKey, track, title, difficulty, xp, due, mentor, tags, summary });
  });
});

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
    school: 'FPT University',
    academicMajor: 'Software Engineering',
    academicYear: 'Năm 3',
    currentSkills: ['React', 'Node.js', 'MongoDB', 'UI Responsive'],
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
    school: 'University of Information Technology',
    academicMajor: 'Information Systems',
    academicYear: 'Năm 4',
    currentSkills: ['Node.js', 'Express', 'SQL', 'Docker'],
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
    school: 'RMIT Vietnam',
    academicMajor: 'Digital Design',
    academicYear: 'Năm 2',
    currentSkills: ['Figma', 'Wireframe', 'Prototype', 'User Research'],
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
    school: 'UEH',
    academicMajor: 'Digital Marketing',
    academicYear: 'Năm 3',
    currentSkills: ['SEO', 'Content', 'Google Analytics', 'Campaign Planning'],
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
  { id: 'fb-demo-api', userId: 'demo-student', challengeId: 'dev-api', score: 91, title: 'API có cấu trúc review tốt', strengths: ['Tách module product/order/auth rõ ràng', 'Có Swagger để mentor kiểm thử nhanh', 'Seed data giúp demo mượt'], improvements: ['Bổ sung rate limit cho auth', 'Viết thêm test cho validation đơn hàng'], reviewer: 'Anh Tran', createdAt: '09:45', reviewedAt: '18/07/2026' },
  { id: 'fb-bao-api', userId: 'student-dev-backend', challengeId: 'dev-api', score: 84, title: 'Backend ổn, cần làm rõ database design', strengths: ['Endpoint chính chạy đúng', 'Có phân quyền cơ bản', 'README có hướng dẫn setup'], improvements: ['Thêm ERD hoặc schema diagram', 'Chuẩn hóa error response', 'Giải thích transaction cho checkout'], reviewer: 'Anh Tran', createdAt: '10:55', reviewedAt: '19/07/2026' },
  { id: 'fb-bao-devops', userId: 'student-dev-backend', challengeId: 'dev-devops', score: 79, title: 'Pipeline đã chạy, cần tăng khả năng quan sát', strengths: ['Có build và deploy step', 'Rollback được mô tả rõ', 'Dockerfile gọn'], improvements: ['Thêm health check endpoint', 'Bổ sung log/metric dashboard', 'Gắn trạng thái failed deployment vào README'], reviewer: 'Anh Tran', createdAt: '16:20', reviewedAt: '20/07/2026' },
  { id: 'fb-oanh-app', userId: 'student-design-ui', challengeId: 'design-app', score: 88, title: 'Prototype rõ luồng người dùng', strengths: ['User flow dễ theo dõi', 'Component state đầy đủ', 'Có rationale cho onboarding'], improvements: ['Bổ sung empty/error state', 'Chuẩn hóa spacing token', 'Thêm kết quả test với 3 người dùng'], reviewer: 'Linh Đào', createdAt: '11:40', reviewedAt: '18/07/2026' },
  { id: 'fb-oanh-system', userId: 'student-design-ui', challengeId: 'design-system', score: 82, title: 'Design system có nền tảng tốt', strengths: ['Token màu và typography rõ', 'Button/input có trạng thái hover/focus', 'Tài liệu component dễ đọc'], improvements: ['Thêm accessibility contrast note', 'Bổ sung usage guideline cho form', 'Tạo trang release note cho component'], reviewer: 'Nora Vũ', createdAt: '14:25', reviewedAt: '21/07/2026' },
  { id: 'fb-khanh-seo', userId: 'student-mkt-seo', challengeId: 'mkt-seo', score: 72, title: 'Cần bổ sung dữ liệu cạnh tranh', strengths: ['Keyword map rõ', 'Có cấu trúc audit'], improvements: ['Thêm benchmark đối thủ', 'Bổ sung timeline 30 ngày'], reviewer: 'Duy Lam', createdAt: '13:50', reviewedAt: '17/07/2026' },
  { id: 'fb-khanh-campaign', userId: 'student-mkt-seo', challengeId: 'mkt-campaign', score: 80, title: 'Campaign plan đã có funnel nhưng thiếu KPI phụ', strengths: ['Persona mô tả đúng pain point', 'Thông điệp nhất quán theo kênh', 'Timeline triển khai hợp lý'], improvements: ['Thêm KPI theo từng giai đoạn funnel', 'Nêu giả định ngân sách rõ hơn', 'Bổ sung rủi ro và phương án xử lý'], reviewer: 'Mai Nguyễn', createdAt: '08:35', reviewedAt: '20/07/2026' },
  { id: 'fb-demo-mobile', userId: 'demo-student', challengeId: 'dev-mobile', score: 87, title: 'Mobile booking đủ điều kiện đưa vào portfolio', strengths: ['Luồng đặt lịch liền mạch', 'Có trạng thái trống lịch sử', 'Firebase auth tích hợp ổn'], improvements: ['Bổ sung rule bảo mật Firestore', 'Thêm loading skeleton khi tải lịch', 'Quay video walkthrough 60 giây'], reviewer: 'Linh Đào', createdAt: '17:10', reviewedAt: '21/07/2026' },
  { id: 'fb-demo-ai', userId: 'demo-student', challengeId: 'dev-ai', score: 90, title: 'AI search có bằng chứng kỹ thuật tốt', strengths: ['Có trích dẫn nguồn theo từng câu trả lời', 'Pipeline ingest tài liệu rõ', 'UI thể hiện confidence score'], improvements: ['Thêm đánh giá hallucination case', 'Bổ sung fallback khi vector search rỗng', 'Ghi rõ chi phí chạy demo'], reviewer: 'Nam Hồ', createdAt: '09:15', reviewedAt: '22/07/2026' }
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

const premiumCapabilities = [
  {
    title: 'Không giới hạn toàn bộ',
    detail: 'Mở khóa toàn bộ challenge free/premium, không giới hạn số lần tham gia và nộp lại trong thời hạn gói.',
    icon: Trophy
  },
  {
    title: 'Public portfolio chuyên nghiệp',
    detail: 'Tạo trang portfolio công khai có headline, case study, link dự án, kỹ năng xác thực và lịch sử mentor review.',
    icon: LinkIcon
  },
  {
    title: 'Báo cáo tiến độ theo tháng',
    detail: 'Theo dõi challenge hoàn thành, submission, feedback, kỹ năng mới và mục tiêu tháng tiếp theo.',
    icon: LayoutDashboard
  },
  {
    title: 'Badge xác thực kỹ năng',
    detail: 'Tự động tạo badge khi bài được mentor chấm đạt, giúp hồ sơ có minh chứng rõ ràng hơn.',
    icon: BadgeCheck
  },
  {
    title: 'Ưu tiên mentor theo chuyên ngành',
    detail: 'Khi nộp bài, hệ thống match mentor có expertise gần nhất với ngành, chuyên ngành và bộ kỹ năng của challenge.',
    icon: GraduationCap
  },
  {
    title: 'Chứng nhận hoàn thành lộ trình',
    detail: 'Khi hoàn thành đủ vị trí, challenge và feedback, người học nhận chứng nhận demo để đưa vào portfolio.',
    icon: Crown
  }
];

const demoPremiumSubscriptions = [
  { id: 'sub-premium-1', userId: 'demo-student', userName: 'Quang Nguyễn', planId: 'premium-quarter', planName: 'Premium 3 Tháng', status: 'active', startedAt: '01/07/2026', expiresAt: '01/10/2026', revenue: 199000 },
  { id: 'sub-premium-2', userId: 'student-dev-backend', userName: 'Bao Le', planId: 'premium-month', planName: 'Premium Tháng', status: 'active', startedAt: '10/07/2026', expiresAt: '10/08/2026', revenue: 79000 },
  { id: 'sub-premium-3', userId: 'student-design-ui', userName: 'Oanh Do', planId: 'premium-year', planName: 'Premium Năm', status: 'active', startedAt: '15/06/2026', expiresAt: '15/06/2027', revenue: 499000 },
  { id: 'sub-premium-4', userId: 'student-mkt-seo', userName: 'Khanh Tran', planId: 'free', planName: 'Free', status: 'free', startedAt: '-', expiresAt: '-', revenue: 0 }
];

const trustedMarketSources = [
  { name: 'ITviec Salary Report 2025-2026', type: 'Lương IT Việt Nam', url: 'https://itviec.com/report/vietnam-it-salary-and-recruitment-market' },
  { name: 'Adecco Vietnam Salary Guide 2026', type: 'Khung lương đa ngành', url: 'https://adecco.com.vn/en/knowledge-center/detail/adecco-vietnam-salary-guide-2026' },
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

const workGalleryBase = {
  dev: [
    ['Code review', 'Pull request', '#2563eb'],
    ['API design', 'Endpoint map', '#06b6d4'],
    ['Database', 'Schema flow', '#10b981'],
    ['Dashboard', 'UI states', '#8b5cf6'],
    ['Deploy', 'CI/CD', '#f59e0b'],
    ['Testing', 'Edge cases', '#ef4444'],
    ['Architecture', 'System map', '#0f766e'],
    ['Debugging', 'Logs', '#334155'],
    ['Team sync', 'Sprint board', '#ec4899'],
    ['Demo day', 'Portfolio proof', '#14b8a6']
  ],
  mkt: [
    ['SEO audit', 'Keyword map', '#0ea5e9'],
    ['Campaign', 'Funnel plan', '#10b981'],
    ['Content', 'Calendar', '#f59e0b'],
    ['Ads', 'A/B test', '#8b5cf6'],
    ['Analytics', 'KPI board', '#ef4444'],
    ['Persona', 'Insight', '#14b8a6'],
    ['Landing page', 'CRO', '#2563eb'],
    ['Budget', 'Media mix', '#64748b'],
    ['Report', 'Executive deck', '#ec4899'],
    ['Market scan', 'Competitor', '#0f766e']
  ],
  design: [
    ['User flow', 'Journey map', '#06b6d4'],
    ['Wireframe', 'Low-fi', '#8b5cf6'],
    ['UI system', 'Components', '#10b981'],
    ['Prototype', 'Interaction', '#f59e0b'],
    ['Usability', 'Testing', '#ef4444'],
    ['Research', 'Interview', '#14b8a6'],
    ['Brand', 'Visual kit', '#2563eb'],
    ['Motion', 'Micro UX', '#ec4899'],
    ['Handoff', 'Specs', '#0f766e'],
    ['Case study', 'Rationale', '#64748b']
  ]
};

const specializationDescriptions = {
  dev: {
    Frontend: 'Xây giao diện người dùng, tối ưu trải nghiệm trên web và đảm bảo sản phẩm hiển thị tốt trên nhiều thiết bị.',
    Backend: 'Thiết kế API, xử lý dữ liệu, bảo mật và xây nền tảng vận hành ổn định cho sản phẩm.',
    'Full Stack': 'Kết nối frontend, backend và database để tạo tính năng end-to-end có thể demo được.',
    Mobile: 'Phát triển ứng dụng di động, xử lý luồng đăng nhập, dữ liệu, trạng thái và trải nghiệm người dùng trên app.',
    DevOps: 'Tự động hóa build, test, deploy, giám sát hệ thống và giúp sản phẩm vận hành đáng tin cậy.',
    'AI / Data': 'Xử lý dữ liệu, xây tính năng AI, tìm kiếm thông minh và dashboard hỗ trợ ra quyết định.',
    'Software Architecture': 'Thiết kế kiến trúc hệ thống, phân rã module, định hướng kỹ thuật và kiểm soát khả năng mở rộng.'
  },
  mkt: {
    Content: 'Lên ý tưởng, viết nội dung và biến thông điệp thương hiệu thành bài viết, kịch bản, landing page hoặc case campaign.',
    SEO: 'Nghiên cứu từ khóa, tối ưu nội dung và cấu trúc website để tăng lượng truy cập tự nhiên từ Google.',
    'Performance Marketing': 'Chạy quảng cáo, tối ưu ngân sách, đo CPA/ROAS và cải thiện hiệu quả chuyển đổi theo dữ liệu.',
    'Social Media': 'Quản lý kênh mạng xã hội, xây lịch nội dung, tương tác cộng đồng và tăng nhận diện thương hiệu.',
    'Brand Marketing': 'Xây định vị thương hiệu, thông điệp, campaign concept và đảm bảo trải nghiệm thương hiệu nhất quán.',
    Growth: 'Thiết kế thử nghiệm tăng trưởng, phân tích funnel và tìm cách kéo người dùng mới hoặc tăng retention.',
    'CRM / Lifecycle': 'Chăm sóc vòng đời khách hàng qua email, automation, phân nhóm người dùng và chiến dịch giữ chân.',
    'Market Research': 'Thu thập insight thị trường, phân tích đối thủ, khảo sát khách hàng và đề xuất hướng đi sản phẩm.'
  },
  design: {
    'Product Design': 'Thiết kế luồng sản phẩm từ problem, user flow, wireframe đến prototype có thể kiểm thử.',
    'UI Design': 'Xây giao diện đẹp, dễ dùng, nhất quán về màu sắc, typography, spacing và component.',
    'UX Research': 'Nghiên cứu người dùng, phỏng vấn, tổng hợp insight và biến dữ liệu thành quyết định thiết kế.',
    'Design System': 'Xây bộ component, token, guideline và quy chuẩn giúp đội ngũ thiết kế/phát triển nhanh hơn.',
    'Brand Design': 'Tạo nhận diện thương hiệu, visual direction, key visual và tài sản truyền thông nhất quán.',
    'Motion Design': 'Thiết kế chuyển động, micro-interaction và animation giúp sản phẩm sinh động, dễ hiểu hơn.',
    'Service Design': 'Thiết kế trải nghiệm dịch vụ nhiều điểm chạm, kết nối quy trình, con người và công cụ vận hành.'
  }
};

function getSpecializationDescription(majorKey, column) {
  return specializationDescriptions[majorKey]?.[column.title]
    ?? `Tập trung xây năng lực thực hành trong ${column.title}, từ kỹ năng nền tảng đến sản phẩm có thể đưa vào portfolio.`;
}

function normalizeLookupText(value) {
  return String(value ?? '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

function findMentorForName(name, mentors = []) {
  const normalizedName = normalizeLookupText(name);
  return mentors.find((mentor) => normalizeLookupText(mentor.name) === normalizedName)
    ?? mentors.find((mentor) => normalizeLookupText(mentor.name).includes(normalizedName) || normalizedName.includes(normalizeLookupText(mentor.name)))
    ?? { name, level: 'Mentor', strongestField: 'Career review', currentCompany: 'Portfolio Mentor Network', yearsOfExperience: '5+', expertise: [], rating: 4.8, availability: 'Theo lịch review' };
}

const workPhotoUrls = [
  'https://images.unsplash.com/photo-1522202176988-66273c2fd55f',
  'https://images.unsplash.com/photo-1519389950473-47ba0277781c',
  'https://images.unsplash.com/photo-1552664730-d307ca884978',
  'https://images.unsplash.com/photo-1556761175-b413da4baf72',
  'https://images.unsplash.com/photo-1497366811353-6870744d04b2',
  'https://images.unsplash.com/photo-1542744173-8e7e53415bb0',
  'https://images.unsplash.com/photo-1551836022-d5d88e9218df',
  'https://images.unsplash.com/photo-1559136555-9303baea8ebd',
  'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6',
  'https://images.unsplash.com/photo-1531482615713-2afd69097998',
  'https://images.unsplash.com/photo-1516321318423-f06f85e504b3',
  'https://images.unsplash.com/photo-1504384308090-c894fdcc538d'
];

function makeWorkIllustrationSrc(_, index) {
  const baseUrl = workPhotoUrls[index % workPhotoUrls.length];
  return `${baseUrl}?auto=format&fit=crop&w=900&q=82&sat=-4&sig=${index + 41}`;
}

function buildRoleReality({ currentMajor, selectedRole }) {
  const track = selectedRole.track;
  const title = selectedRole.title;
  const level = selectedRole.level;
  const coreSkill = selectedRole.skills?.[0] ?? `năng lực ${track}`;
  const coreKnowledge = selectedRole.knowledge?.[0] ?? `bối cảnh ${track}`;
  const coreTool = selectedRole.tools?.[0] ?? 'công cụ chuyên môn';

  const contextByMajor = {
    dev: {
      day: [
        `Bắt đầu ngày bằng cách đọc ticket, kiểm tra pull request và xác định phần ${track} nào đang ảnh hưởng tới người dùng.`,
        `Làm việc với designer/product để hiểu nghiệp vụ trước khi viết code, tránh xây tính năng đúng kỹ thuật nhưng sai nhu cầu.`,
        `Cuối ngày cập nhật tiến độ, ghi lại quyết định kỹ thuật và chuẩn bị minh chứng demo cho team review.`
      ],
      responsibility: [
        `Chịu trách nhiệm biến yêu cầu sản phẩm thành tính năng ${track} chạy được, có kiểm thử và có thể bảo trì.`,
        `Giải thích trade-off về hiệu năng, bảo mật, dữ liệu hoặc trải nghiệm khi team phải chọn hướng triển khai.`,
        `Đảm bảo sản phẩm có link demo, tài liệu chạy và bằng chứng rõ ràng để đưa vào portfolio.`
      ],
      situations: [
        `Khi bug xuất hiện sát deadline, bạn phải đọc log, khoanh vùng nguyên nhân và chọn cách sửa ít rủi ro nhất.`,
        `Khi yêu cầu thay đổi, bạn cần tách phần bắt buộc và phần có thể làm sau để không phá vỡ flow chính.`,
        `Khi mentor hoặc lead review code, bạn phải bảo vệ được quyết định kỹ thuật bằng lý do và dữ liệu.`
      ]
    },
    mkt: {
      day: [
        `Bắt đầu ngày bằng cách xem số liệu kênh, kiểm tra nội dung/campaign đang chạy và phát hiện điểm tụt hiệu quả.`,
        `Làm việc với designer, sales hoặc product để biến insight khách hàng thành thông điệp dễ đo lường.`,
        `Cuối ngày cập nhật KPI, ghi lại giả thuyết thử nghiệm và chuẩn bị báo cáo ngắn cho stakeholder.`
      ],
      responsibility: [
        `Chịu trách nhiệm tạo đầu ra ${track} có mục tiêu rõ, nhóm khách hàng cụ thể và chỉ số đánh giá được.`,
        `Biết giải thích vì sao chọn kênh, thông điệp, ngân sách hoặc nội dung đó thay vì chỉ làm theo cảm tính.`,
        `Biến kết quả campaign thành case study có insight, số liệu và bài học có thể đưa vào portfolio.`
      ],
      situations: [
        `Khi campaign không đạt KPI, bạn phải tìm nguyên nhân từ audience, creative, offer hoặc tracking.`,
        `Khi ngân sách hạn chế, bạn cần ưu tiên thử nghiệm nhỏ nhưng đủ dữ liệu để ra quyết định.`,
        `Khi dữ liệu mâu thuẫn với cảm nhận cá nhân, bạn phải dùng số liệu để điều chỉnh kế hoạch.`
      ]
    },
    design: {
      day: [
        `Bắt đầu ngày bằng cách xem lại user flow, feedback người dùng và điểm nghẽn trong trải nghiệm ${track}.`,
        `Làm việc với product/dev để biến vấn đề thành wireframe, prototype hoặc component có thể kiểm chứng.`,
        `Cuối ngày chuẩn bị rationale: vì sao chọn layout, hierarchy, interaction và cách đo thiết kế có hiệu quả.`
      ],
      responsibility: [
        `Chịu trách nhiệm tạo giải pháp ${track} vừa đẹp, vừa dễ dùng, vừa có logic sản phẩm rõ ràng.`,
        `Giải thích được quyết định thiết kế bằng insight, usability, accessibility và constraint kỹ thuật.`,
        `Biến màn hình/prototype thành case study có problem, process, result và learning.`
      ],
      situations: [
        `Khi stakeholder muốn thay đổi theo cảm tính, bạn cần đưa bằng chứng người dùng hoặc nguyên tắc thiết kế để thuyết phục.`,
        `Khi dev báo khó triển khai, bạn phải tìm phương án giữ trải nghiệm nhưng giảm độ phức tạp kỹ thuật.`,
        `Khi feedback trái chiều, bạn cần phân loại vấn đề thật thay vì sửa giao diện theo từng ý kiến rời rạc.`
      ]
    }
  };

  const context = contextByMajor[currentMajor.key] ?? contextByMajor.dev;
  return {
    day: context.day,
    responsibility: context.responsibility,
    situations: context.situations,
    proof: [
      `${level}: cần chứng minh ${coreSkill} qua sản phẩm thật, không chỉ ghi trong CV.`,
      `Hiểu ${coreKnowledge} đủ để giải thích quyết định khi mentor hoặc nhà tuyển dụng hỏi sâu.`,
      `Sử dụng ${coreTool} trong workflow và trình bày được kết quả trước/sau khi xử lý.`,
      `${title} nên có ít nhất một project thể hiện rõ bài toán, cách làm, minh chứng và kết quả.`
    ]
  };
}

function getMarketUpdatedLabel() {
  return new Date().toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

const marketEvidenceByMajor = {
  dev: {
    metrics: [
      { value: '1.839', label: 'IT professionals', source: 'ITviec Salary Report 2025-2026', note: 'Báo cáo khảo sát 1.839 chuyên gia IT tại Việt Nam.' },
      { value: '37,8 triệu', label: 'Back-end median/month', source: 'ITviec Salary Report 2025-2026', note: 'Median total salary Back-end Developer; dải theo kinh nghiệm từ khoảng 12,4 tới 54,9 triệu VND/tháng.' },
      { value: '50,1 triệu', label: 'Product Owner/Manager median', source: 'ITviec Salary Report 2025-2026', note: 'Product Owner/Manager có median total salary khoảng 50,1 triệu VND/tháng; nhóm >8 năm khoảng 75 triệu.' },
      { value: '40,65 triệu', label: 'Data Analyst/Scientist median', source: 'ITviec Salary Report 2025-2026', note: 'Data Analyst/Scientist median khoảng 40,65 triệu VND/tháng; Data Engineer 3-4 năm khoảng 56,9 triệu.' }
    ],
    reasoning: ['Ưu tiên Backend/Full Stack vì số liệu lương có band rõ và dễ chứng minh bằng sản phẩm chạy được.', 'AI/Data nên đi kèm case có dữ liệu, pipeline hoặc workflow cụ thể thay vì chỉ ghi tên công cụ.', 'Portfolio Dev cần README, demo, test case và giải thích trade-off để mentor/nhà tuyển dụng kiểm tra nhanh.']
  },
  mkt: {
    metrics: [
      { value: '10.000+', label: 'salary data points', source: 'Adecco Vietnam Salary Guide 2026', note: 'Adecco công bố bộ dữ liệu hơn 10.000 điểm tham chiếu lương.' },
      { value: '1.000+', label: 'job titles tracked', source: 'Adecco Vietnam Salary Guide 2026', note: 'Theo dõi hơn 1.000 chức danh, hữu ích khi so Marketing với sales, product và operations.' },
      { value: '11+', label: 'industry categories', source: 'Adecco Vietnam Salary Guide 2026', note: 'Salary guide phân loại hơn 11 nhóm ngành để đối chiếu bối cảnh tuyển dụng đa ngành.' },
      { value: 'KPI-first', label: 'portfolio logic', source: 'Portfolio business rule', note: 'Marketing portfolio nên chứng minh CAC, CTR, CVR, retention hoặc revenue proxy, không chỉ trình bày ý tưởng.' }
    ],
    reasoning: ['Marketing không nên chỉ làm bài “ý tưởng chiến dịch”; phải có mục tiêu, giả định, ngân sách và KPI.', 'Performance/CRM/SEO dễ demo năng lực vì có bảng số liệu, dashboard hoặc audit trước-sau.', 'Case study tốt cần nói được insight nào dẫn đến thông điệp, kênh nào được ưu tiên và nếu KPI thấp thì tối ưu gì.']
  },
  design: {
    metrics: [
      { value: '10.000+', label: 'salary data points', source: 'Adecco Vietnam Salary Guide 2026', note: 'Nguồn lương đa ngành giúp đặt Design trong bối cảnh product, tech và marketing.' },
      { value: '1.000+', label: 'job titles tracked', source: 'Adecco Vietnam Salary Guide 2026', note: 'Dữ liệu nhiều chức danh giúp so sánh UI/UX/Product Design với các vị trí liên quan.' },
      { value: '2 case', label: 'portfolio depth', source: 'Portfolio business rule', note: 'Một case UX flow và một case UI system thường thuyết phục hơn nhiều màn hình rời không có lý do thiết kế.' },
      { value: '4 state', label: 'minimum UI proof', source: 'Design review rubric', note: 'Component quan trọng nên có default, hover/focus, loading/disabled và error/success state.' }
    ],
    reasoning: ['Design được đánh giá bằng lý do ra quyết định, không chỉ bằng ảnh đẹp.', 'Product/UI Design nên chứng minh problem framing, flow, prototype, component state và accessibility.', 'UX Research cần có câu hỏi nghiên cứu, cách lấy mẫu, insight và đề xuất hành động sau research.']
  }
};

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
  const [flowNotice, setFlowNotice] = useState('');
  const [autoOpenPublicPortfolio, setAutoOpenPublicPortfolio] = useState(false);
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
  const remoteChallenges = appData?.challenges?.length ? appData.challenges : [];
  const challengeList = remoteChallenges.length
    ? [
        ...remoteChallenges,
        ...challenges.filter((challenge) => !remoteChallenges.some((remoteChallenge) => remoteChallenge.id === challenge.id))
      ]
    : challenges;
  const managementData = { ...appData, challenges: challengeList };
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
    const premiumSubscription = {
      planId: plan.id,
      planName: plan.name,
      status: 'active',
      startedAt: '20/07/2026',
      expiresAt
    };
    setCurrentUser((current) => {
      const role = current?.type ?? current?.user?.role;
      if (!current?.user || role !== 'student') {
        const baseUser = appData?.demoUser ?? demoUsers[0];
        return {
          type: 'student',
          user: {
            ...baseUser,
            role: 'student',
            selectedMajorKey,
            path: path.length ? path : baseUser.path,
            subscription: premiumSubscription
          }
        };
      }
      return {
        ...current,
        user: {
          ...current.user,
          role: current.user.role ?? 'student',
          subscription: premiumSubscription
        }
      };
    });
    setAdminNotice(`Đã nâng cấp ${plan.name}. Các tính năng Premium đã được mở khóa.`);
    setAutoOpenPublicPortfolio(true);
    setPage('portfolio');
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

  const go = (id) => {
    if (id === 'submit' && currentRole === 'student') {
      if (!selectedChallenge?.id) {
        setFlowNotice('Bạn nên chọn một thử thách trước khi nộp bài.');
        setPage('hub');
        return;
      }
      if (!joinedChallengeIds.includes(selectedChallenge.id)) {
        setFlowNotice('Bạn cần tham gia thử thách trước, sau đó hệ thống mới mở form nộp bài.');
        setPage('join');
        return;
      }
    }
    if (id === 'feedback' && currentRole === 'student') {
      const hasSubmission = Boolean(submissionStatus[selectedChallenge.id])
        || submissionList.some((item) => item.userId === userId && item.challengeId === selectedChallenge.id);
      if (!hasSubmission) {
        setFlowNotice('Bạn chưa nộp bài nên chưa có feedback. Hãy nộp sản phẩm trước để mentor review.');
        setPage(joinedChallengeIds.includes(selectedChallenge.id) ? 'submit' : 'join');
        return;
      }
    }
    setFlowNotice('');
    setPage(id);
  };
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
    const selectedDemoUser = demoUsers.find((user) => user.selectedMajorKey === selectedMajorKey) ?? appData?.demoUser ?? demoUsers[0];
    const buildStudentForSelectedMajor = (baseUser = selectedDemoUser) => {
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
        : { email: selectedDemoUser.email, password: '123456' });

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
      student: ['roadmap', 'trends', 'hub', 'join', 'submit', 'feedback', 'portfolio', 'submissionHistory', 'premium'],
      mentor: ['mentor', 'roadmap', 'trends'],
      admin: ['admin', 'roadmap', 'trends']
    };
    const publicPages = ['auth', 'roadmap', 'trends', 'about'];
    if (!currentUser && !publicPages.includes(page)) {
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

  const updateStudentProfile = (profilePatch) => {
    const nextPortfolioLinks = [profilePatch.portfolioLink].filter(Boolean);

    const mergeUser = (user) => ({
      ...user,
      school: profilePatch.school,
      academicMajor: profilePatch.academicMajor,
      academicYear: profilePatch.academicYear,
      portfolio: {
        ...(user?.portfolio ?? {}),
        links: nextPortfolioLinks.length ? nextPortfolioLinks : (user?.portfolio?.links ?? [])
      }
    });

    setCurrentUser((current) => {
      if (!current?.user) return current;
      return {
        ...current,
        user: mergeUser(current.user)
      };
    });

    setRemoteData((current) => {
      const source = current ?? appData;
      const activeId = demoUser?.id ?? userId;
      return {
        ...source,
        demoUser: source?.demoUser?.id === activeId ? mergeUser(source.demoUser) : source?.demoUser,
        users: (source?.users ?? []).map((user) => user.id === activeId ? mergeUser(user) : user)
      };
    });

    if (apiStatus !== 'mongo') return Promise.resolve();

    const activeId = demoUser?.id ?? userId;
    return fetch(`${API_BASE_URL}/api/users/${activeId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(mergeUser(demoUser ?? {}))
    })
      .then((response) => response.ok ? response.json() : Promise.reject(new Error('profile update failed')))
      .then((user) => {
        setCurrentUser((current) => ({ ...(current ?? { type: 'student' }), type: 'student', user }));
        setRemoteData((current) => ({
          ...current,
          demoUser: current?.demoUser?.id === user.id ? user : current?.demoUser,
          users: (current?.users ?? []).map((item) => item.id === user.id ? user : item)
        }));
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

  const createFeedback = (challengeId, submissionUserId = userId, overrides = {}) => {
    const challenge = challengeList.find((item) => item.id === challengeId);
    const fallbackFeedback = {
      id: overrides.id || `fb-${submissionUserId}-${challengeId}`,
      userId: submissionUserId,
      challengeId,
      score: Number(overrides.score ?? 88),
      reviewer: overrides.reviewer ?? challenge?.mentor ?? 'Mentor Demo',
      title: overrides.title ?? `Feedback cho ${challenge?.title ?? challengeId}`,
      strengths: overrides.strengths ?? [
        'B\u00e0i l\u00e0m b\u00e1m \u0111\u00fang m\u1ee5c ti\u00eau challenge v\u00e0 c\u00f3 link \u0111\u1ec3 mentor ki\u1ec3m tra.',
        'C\u00e1ch tr\u00ecnh b\u00e0y s\u1ea3n ph\u1ea9m \u0111\u00e3 \u0111\u1ee7 r\u00f5 \u0111\u1ec3 chuy\u1ec3n th\u00e0nh case study portfolio.',
        'Minh ch\u1ee9ng n\u1ed9p b\u00e0i ph\u00f9 h\u1ee3p v\u1edbi chuy\u00ean ng\u00e0nh ' + (challenge?.track ?? 'hi\u1ec7n t\u1ea1i') + '.'
      ],
      improvements: overrides.improvements ?? [
        'B\u1ed5 sung README ng\u1eafn: c\u00e1ch ch\u1ea1y, t\u00e0i kho\u1ea3n demo, c\u00e1c m\u00e0n h\u00ecnh ho\u1eb7c endpoint quan tr\u1ecdng.',
        'Vi\u1ebft r\u00f5 trade-off: v\u00ec sao ch\u1ecdn c\u00f4ng ngh\u1ec7 n\u00e0y, ph\u1ea7n n\u00e0o c\u00f3 th\u1ec3 m\u1edf r\u1ed9ng khi l\u00e0m th\u1eadt.',
        'Th\u00eam \u1ea3nh/video walkthrough \u0111\u1ec3 nh\u00e0 tuy\u1ec3n d\u1ee5ng ho\u1eb7c gi\u1ea3ng vi\u00ean xem nhanh trong 1 ph\u00fat.'
      ],
      createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    const applyFeedback = (feedback = fallbackFeedback) => {
      setRemoteData((current) => {
        const source = current ?? fallbackData;
        return {
          ...source,
          mentorFeedback: [
            ...(source?.mentorFeedback ?? []).filter((item) => !(item.userId === submissionUserId && item.challengeId === challengeId)),
            feedback
          ],
          submissions: (source?.submissions ?? []).map((item) => (
            item.userId === submissionUserId && item.challengeId === challengeId
              ? { ...item, status: 'reviewed', feedbackId: feedback.id, updatedAt: feedback.createdAt }
              : item
          ))
        };
      });
      setSubmissionStatus((current) => ({
        ...current,
        [challengeId]: { ...(current[challengeId] ?? {}), status: 'reviewed', updatedAt: feedback.createdAt }
      }));
      return feedback;
    };
    if (apiStatus !== 'mongo') {
      return Promise.resolve(applyFeedback(fallbackFeedback));
    }
    return fetch(`${API_BASE_URL}/api/feedback`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...fallbackFeedback,
        ...overrides
      })
    })
      .then((response) => response.ok ? response.json() : Promise.reject(new Error('feedback failed')))
      .then((feedback) => applyFeedback(feedback))
      .catch(() => applyFeedback(fallbackFeedback));
  };
  const updateSubmissionFromMentor = (submission, updates = {}) => {
    const updatedAt = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const payload = { ...submission, ...updates, updatedAt };
    setRemoteData((current) => {
      const source = current ?? fallbackData;
      const exists = (source?.submissions ?? []).some((item) => item.userId === payload.userId && item.challengeId === payload.challengeId);
      return {
        ...source,
        submissions: exists
          ? (source?.submissions ?? []).map((item) => item.userId === payload.userId && item.challengeId === payload.challengeId ? { ...item, ...payload } : item)
          : [...(source?.submissions ?? []), payload]
      };
    });
    setSubmissionStatus((current) => ({
      ...current,
      [payload.challengeId]: { ...(current[payload.challengeId] ?? {}), status: payload.status, updatedAt }
    }));
    if (apiStatus === 'mongo') {
      fetch(`${API_BASE_URL}/api/submissions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      }).catch(() => undefined);
    }
    return payload;
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
        {flowNotice && <div className="flow-notice status-banner warning"><ShieldCheck size={17} /> {flowNotice}</div>}
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
            challenges={challengeList}
            setSelectedChallengeId={setSelectedChallengeId}
            go={go}
          />
        )}
        {page === 'trends' && <MarketTrendsPage majors={catalog} currentMajor={currentMajor} changeMajor={changeMajor} go={go} />}
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
            mentors={appData.mentors ?? []}
            go={go}
          />
        )}
        {page === 'join' && <JoinChallengePage challenge={selectedChallenge} currentMajor={currentMajor} joined={joinedChallengeIds.includes(selectedChallenge.id)} submission={submissionStatus[selectedChallenge.id]} joinChallenge={joinChallenge} isPremium={isPremium} go={go} />}
        {page === 'submit' && <SubmitProjectPage challenge={selectedChallenge} currentMajor={currentMajor} joined={joinedChallengeIds.includes(selectedChallenge.id)} submission={submissionStatus[selectedChallenge.id]} mentors={appData.mentors ?? []} joinChallenge={joinChallenge} saveDraft={saveDraft} submitChallenge={submitChallenge} submissionRulesData={rulesByMajor} isPremium={isPremium} go={go} />}
        {page === 'feedback' && <MentorFeedbackPage go={go} challenge={selectedChallenge} submission={submissionList.find((item) => item.userId === userId && item.challengeId === selectedChallenge.id)} feedback={feedbackList.find((item) => item.userId === userId && item.challengeId === selectedChallenge.id)} mentors={appData.mentors ?? []} createFeedback={() => createFeedback(selectedChallenge.id, userId)} />}
        {page === 'portfolio' && <PortfolioPage pathRoles={pathRoles} currentMajor={currentMajor} go={go} demoUser={demoUser} apiStatus={apiStatus} submissions={submissionList} challenges={challengeList} updatePortfolio={updatePortfolio} updateStudentProfile={updateStudentProfile} isPremium={isPremium} autoOpenPublicPortfolio={autoOpenPublicPortfolio} onPublicPortfolioOpened={() => setAutoOpenPublicPortfolio(false)} />}
        {page === 'submissionHistory' && <SubmissionHistoryPage demoUser={demoUser} submissions={submissionList} challenges={challengeList} feedbackList={feedbackList} setSelectedChallengeId={setSelectedChallengeId} go={go} />}
        {page === 'premium' && <PremiumPage plans={premiumPlans} activeSubscription={activeSubscription} upgradePlan={upgradePlan} go={go} />}
        {page === 'about' && <AboutPage go={go} />}
        {page === 'mentor' && <MentorPage apiStatus={apiStatus} data={managementData} currentUser={currentUser} refreshData={refreshData} createFeedback={createFeedback} updateSubmissionFromMentor={updateSubmissionFromMentor} setNotice={setAdminNotice} notice={adminNotice} />}
        {page === 'admin' && <AdminPage apiStatus={apiStatus} data={managementData} notice={adminNotice} currentUser={currentUser} refreshData={refreshData} setAdminNotice={setAdminNotice} createFeedback={createFeedback} />}
      </main>
    </div>
  );
}

function Header({ page, go, currentUser, theme, setTheme, logout }) {
  const [openNavGroup, setOpenNavGroup] = useState(null);
  const [accountOpen, setAccountOpen] = useState(false);
  const currentRole = currentUser?.type ?? currentUser?.user?.role;
  const roleFlow = currentRole === 'student'
    ? flow.filter((item) => ['roadmap', 'trends', 'hub', 'join', 'submit', 'feedback', 'portfolio', 'premium'].includes(item.id))
    : currentRole === 'mentor'
      ? flow.filter((item) => item.id === 'mentor')
      : currentRole === 'admin'
        ? flow.filter((item) => item.id === 'admin')
        : flow.filter((item) => item.id === 'auth');
  const publicFlow = [
    { id: 'intro', label: 'Gi\u1edbi thi\u1ec7u', icon: Sparkles, target: 'auth', matches: ['auth'] },
    { id: 'roadmap-preview', label: 'B\u1ea3n \u0111\u1ed3 ngh\u1ec1', icon: Compass, target: 'roadmap' },
    { id: 'trends-preview', label: 'Xu h\u01b0\u1edbng', icon: Sparkles, target: 'trends' },
    { id: 'about', label: 'About us', icon: BookOpen, target: 'about' }
  ];
  const navItems = currentUser ? roleFlow : publicFlow;
  const byId = (id) => navItems.find((item) => item.id === id);
  const navGroups = currentRole === 'student'
    ? [
        { id: 'roadmap', label: 'Bản đồ nghề', icon: Compass, target: 'roadmap' },
        { id: 'trends', label: 'Xu hướng', icon: Sparkles, target: 'trends' },
        { id: 'practice', label: 'Luyện tập', icon: LayoutDashboard, items: ['hub', 'join', 'submit', 'feedback'].map(byId).filter(Boolean) },
        { id: 'premium-direct', label: 'Premium', icon: Crown, target: 'premium' }
      ]
    : currentRole === 'mentor'
      ? [
          { id: 'mentor-workspace', label: 'Mentor Workspace', icon: GraduationCap, target: 'mentor', matches: ['mentor'] },
          { id: 'trends-workspace', label: 'Xu hướng thị trường', icon: Sparkles, target: 'trends', matches: ['trends'] },
          { id: 'roadmap-workspace', label: 'Bản đồ nghề nghiệp', icon: Compass, target: 'roadmap', matches: ['roadmap'] }
        ]
      : currentRole === 'admin'
        ? [
            { id: 'admin-workspace', label: 'Admin Workspace', icon: ShieldCheck, target: 'admin', matches: ['admin'] },
            { id: 'trends-workspace', label: 'Xu hướng thị trường', icon: Sparkles, target: 'trends', matches: ['trends'] },
            { id: 'roadmap-workspace', label: 'Bản đồ nghề nghiệp', icon: Compass, target: 'roadmap', matches: ['roadmap'] }
          ]
        : [
            { id: 'intro', label: 'Giới thiệu', icon: Sparkles, target: 'auth', matches: ['auth'] },
            { id: 'roadmap-preview', label: 'Bản đồ nghề', icon: Compass, target: 'roadmap' },
            { id: 'trends-preview', label: 'Xu hướng thị trường', icon: Sparkles, target: 'trends' },
            { id: 'about', label: 'About us', icon: BookOpen, target: 'about' }
          ];
  const isNavItemActive = (item) => page === item.id || item.target === page || item.matches?.includes(page);
  const isGroupActive = (group) => group.items?.some(isNavItemActive) || isNavItemActive(group);
  const navigateNavItem = (item) => {
    go(item.target ?? item.id);
    setOpenNavGroup(null);
    setAccountOpen(false);
  };
  const homePage = currentRole === 'student' ? 'roadmap' : currentRole ?? 'auth';
  const roleLabel = currentUser ? `${(currentRole ?? 'student').toUpperCase()} · ${currentUser.user?.name ?? currentUser.user?.email}` : 'Guest';
  return (
    <header className="topbar">
      <button className="brand" onClick={() => go(homePage)} aria-label="Ch?n chuy?n ng?nh h?p">
        <span className="brand-mark"><ChevronsUp size={20} /></span>
        <span>Portfolio</span>
      </button>
      <nav className="flow-nav role-nav" aria-label="Điều hướng theo vai trò">
        {navGroups.map((group) => {
          const Icon = group.icon;
          const active = isGroupActive(group);
          const open = openNavGroup === group.id;
          return (
            <div className="nav-group" key={group.id}>
            <button
              type="button"
              className={`flow-pill nav-group-trigger ${active ? 'active visited' : ''} ${open ? 'open' : ''}`}
              onClick={() => group.items ? setOpenNavGroup(open ? null : group.id) : navigateNavItem(group)}
              title={group.label}
            >
              <Icon size={15} />
              <span>{group.label}</span>
              {group.items && <MoveDown size={13} />}
            </button>
            {group.items && open && (
              <div className="nav-dropdown" onClick={(event) => event.stopPropagation()}>
                {group.items.map((item) => {
                  const ItemIcon = item.icon;
                  return (
                    <button
                      type="button"
                      key={item.id}
                      className={`nav-dropdown-item ${isNavItemActive(item) ? 'active' : ''}`}
                      onClick={(event) => { event.stopPropagation(); navigateNavItem(item); }}
                    >
                      <ItemIcon size={15} />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            )}
            </div>
          );
        })}
      </nav>
      <div className="topbar-actions">
      <button className={`role-chip account-trigger ${!currentUser ? 'guest-hidden' : ''}`} type="button" onClick={() => setAccountOpen((open) => !open)}>
        <UserRound size={15} />
        <span>{roleLabel}</span>
        <MoveDown size={13} />
      </button>
      {currentUser && accountOpen && (
        <div className="nav-dropdown account-dropdown">
          {currentRole === 'student' && (
            <>
              <button type="button" className={`nav-dropdown-item ${page === 'portfolio' ? 'active' : ''}`} onClick={() => navigateNavItem({ id: 'portfolio' })}>
                <UserRound size={15} />
                <span>Hồ sơ</span>
              </button>
              <button type="button" className={`nav-dropdown-item ${page === 'submissionHistory' ? 'active' : ''}`} onClick={() => navigateNavItem({ id: 'submissionHistory' })}>
                <FileUp size={15} />
                <span>Lịch sử nộp bài</span>
              </button>
            </>
          )}
          <button type="button" className="nav-dropdown-item danger" onClick={() => { setAccountOpen(false); logout(); }}>
            <LogOut size={15} />
            <span>Đăng xuất</span>
          </button>
        </div>
      )}
      {currentUser && (
        <button className="logout-chip" type="button" onClick={logout} title="Đăng xuất để test tài khoản khác">
          <LogOut size={15} />
          <span>Đăng xuất</span>
        </button>
      )}
      {!currentUser && (
        <button className="login-chip" type="button" onClick={() => go('auth')}>
          <LockKeyhole size={15} />
          <span>Đăng nhập</span>
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
  const isSignup = authMode === 'signup';
  const selectedDemoStudent = demoUsers.find((user) => user.selectedMajorKey === selectedMajorKey) ?? demoUsers[0];
  const selectedDemoCredentials = {
    email: selectedDemoStudent.email,
    password: '123456'
  };
  const [credentials, setCredentials] = useState({
    email: selectedDemoCredentials.email,
    password: selectedDemoCredentials.password
  });
  const [signupType, setSignupType] = useState('student');
  const [signupForm, setSignupForm] = useState({
    name: 'Người dùng mới',
    goal: 'Xây portfolio xin thực tập',
    school: 'FPT University',
    academicMajor: 'Software Engineering',
    academicYear: 'Năm 3',
    studentSkills: 'HTML, CSS, JavaScript, React',
    mentorTitle: 'Senior Mentor',
    mentorCompany: 'Tech Company',
    mentorExpertise: 'Backend, Full Stack, Career Review',
    mentorExperience: '5',
    mentorProof: 'LinkedIn, chứng chỉ hoặc portfolio đã review'
  });
  const updateCredentials = (key, value) => setCredentials((current) => ({ ...current, [key]: value }));
  const updateSignupForm = (key, value) => setSignupForm((current) => ({ ...current, [key]: value }));
  useEffect(() => {
    if (!isSignup) setCredentials(selectedDemoCredentials);
  }, [selectedMajorKey, authMode]);
  const submitLogin = () => {
    if (!credentials.email || !credentials.password) return;
    loginAs('student', credentials);
  };
  const submitSignup = () => {
    loginAs(signupType === 'mentor' ? 'mentor' : 'student');
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
            <Stat value="60+" label={'b\u00e0i t\u1eadp m\u1eabu'} />
          </div>
        </div>
      </div>
      <div className="auth-panel">
        <div className="auth-title">
          <h2>{authMode === 'login' ? 'Đăng nhập Portfolio' : 'Tạo tài khoản Portfolio'}</h2>
        </div>
        <div className="segmented">
          <button className={authMode === 'login' ? 'active' : ''} onClick={() => setAuthMode('login')}>Đăng nhập</button>
          <button className={authMode === 'signup' ? 'active' : ''} onClick={() => setAuthMode('signup')}>Đăng ký</button>
        </div>
        {isSignup && (
          <div className="signup-type-switch">
            <button className={signupType === 'student' ? 'active' : ''} onClick={() => setSignupType('student')}>
              <UserRound size={16} />
              Student
            </button>
            <button className={signupType === 'mentor' ? 'active' : ''} onClick={() => setSignupType('mentor')}>
              <GraduationCap size={16} />
              Mentor
            </button>
          </div>
        )}
        <div className="auth-fields">
          <label>Email<input type="email" value={credentials.email} onChange={(event) => updateCredentials('email', event.target.value)} placeholder="ban@example.com" /></label>
          <label>Mật khẩu<input type="password" value={credentials.password} onChange={(event) => updateCredentials('password', event.target.value)} placeholder="Nhập mật khẩu" /></label>
          {isSignup && <label>Họ tên<input value={signupForm.name} onChange={(event) => updateSignupForm('name', event.target.value)} placeholder="Tên hiển thị" /></label>}
        </div>
        {!isSignup && <div className="auth-helper forgot-password-row">
          <button type="button" className="forgot-password-link">Quên mật khẩu?</button>
          <button
            type="button"
            className="demo-account-chip"
            onClick={() => setCredentials(selectedDemoCredentials)}
            title={`Dùng tài khoản học sinh mẫu ngành ${selectedMajor.title}`}
          >
            Demo {selectedMajor.short}: {selectedDemoCredentials.email} / {selectedDemoCredentials.password}
          </button>
        </div>}
        {(!isSignup || signupType === 'student' || signupType === 'mentor') && <div className="major-picker">
          {majors.map((major) => (
            <button
              key={major.key}
              className={`major-card ${selectedMajorKey === major.key ? 'active' : ''}`}
              style={{ '--accent': major.accent }}
              onClick={() => changeMajor(major.key)}
              >
                <span>{major.short}</span>
                <strong>{major.title}</strong>
              </button>
            ))}
        </div>}
        {(!isSignup || signupType === 'student' || signupType === 'mentor') && <div className="selected-major-note" style={{ '--accent': selectedMajor.accent }}>
          <strong>{selectedMajor.title}</strong>
          <span>{signupType === 'mentor' && isSignup ? 'Mentor sẽ bổ sung hồ sơ chuyên môn sau khi được duyệt.' : `${selectedMajor.columns.length} specializations · ${submissionRulesData[selectedMajor.key].accepted}`}</span>
        </div>}
        {isSignup && (
          <button className="primary-action" onClick={submitSignup}>
            <LockKeyhole size={18} />
            {`Tạo tài khoản ${signupType === 'mentor' ? 'Mentor' : 'Student'} demo`}
          </button>
        )}
        {!isSignup && <button className="ghost-action" onClick={() => loginAs('student', selectedDemoCredentials)}>
          <Rocket size={18} />
          Student demo {selectedMajor.short}: {selectedDemoStudent.name}
        </button>}
        {!isSignup && <button className="ghost-action" onClick={() => loginAs('admin')}>
          <ShieldCheck size={18} />
          Đăng nhập Admin demo
        </button>}
        {!isSignup && <button className="ghost-action" onClick={() => loginAs('mentor')}>
          <GraduationCap size={18} />
          Đăng nhập Mentor demo
        </button>}
      </div>
    </section>
  );
}

function CareerMapPage({ majors, currentMajor, changeMajor, columns, levels, selectedColumn, selectedRole, selectedRoleId, setSelectedRoleId, path, pathRoles, allRoles, addToPath, removeFromPath, movePath, clearPath, savePath, savedPathName, canBuildPath, userMajorKey, challenges, setSelectedChallengeId, go }) {
  const [tab, setTab] = useState('skills');
  const [query, setQuery] = useState('');
  const [careerStep, setCareerStep] = useState('specialization');
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
  const suggestedChallenges = (challenges ?? [])
    .filter((challenge) => challenge.majorKey === currentMajor.key && challenge.track === selectedRole.track)
    .slice(0, 3);
  const roleReality = buildRoleReality({ currentMajor, selectedRole });
  const dailyWork = roleReality.day;
  const roleResponsibilities = roleReality.responsibility;
  const roleSituations = roleReality.situations;
  const roleProof = roleReality.proof;
  const workIllustrations = (workGalleryBase[currentMajor.key] ?? workGalleryBase.dev).map(([title, subtitle, accent], index) => ({
    title,
    subtitle,
    src: makeWorkIllustrationSrc({ title, subtitle, accent, roleTitle: selectedRole.title, majorShort: currentMajor.short }, index)
  }));

  useEffect(() => {
    document.querySelector('.career-page')?.scrollTo({ left: 0, top: 0 });
    setCareerStep('specialization');
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

      <div className="career-step-progress">
        {[
          ['specialization', '01', 'Chuyên ngành', selectedColumn.title],
          ['role', '02', 'Chức vụ', selectedRole.title],
          ['detail', '03', 'Chi tiết', selectedRole.level]
        ].map(([key, index, label, value]) => (
          <button key={key} className={`${careerStep === key ? 'active' : ''} ${key === 'role' || key === 'detail' ? 'enabled' : ''}`} onClick={() => setCareerStep(key)}>
            <b>{index}</b>
            <span>{label}</span>
            <small>{value}</small>
          </button>
        ))}
      </div>

      {careerStep === 'specialization' && (
        <section className="career-step-card career-focus-panel">
          <div className="step-heading">
            <b>01</b>
            <div>
              <p className="mono-label">Chọn hướng đi</p>
              <h2>Chọn chuyên ngành hẹp muốn khám phá</h2>
            </div>
          </div>
          <div className="specialization-list step-list step-card-grid">
            {columns.map((column) => {
              const active = selectedColumn.key === column.key;
              const hiddenBySearch = filteredRoleIds && !column.roles.some((item) => filteredRoleIds.has(item.id));
              return (
                <button
                  key={column.key}
                  className={`${active ? 'active' : ''} ${hiddenBySearch ? 'dimmed' : ''}`}
                  style={{ '--accent': column.accent }}
                  onClick={() => { setSelectedRoleId(column.roles[2].id); setCareerStep('role'); }}
                >
                  <span>{column.title}</span>
                  <small>{getSpecializationDescription(currentMajor.key, column)}</small>
                </button>
              );
            })}
          </div>
        </section>
      )}

      {careerStep === 'role' && (
        <section className="career-step-card timeline-panel career-focus-panel" style={{ '--accent': selectedColumn.accent }}>
          <div className="timeline-head">
            <div>
              <div className="step-heading compact">
                <b>02</b>
                <div>
                  <p className="mono-label">Chọn level</p>
                  <h2>Chọn chức vụ trong {selectedColumn.title}</h2>
                </div>
              </div>
            </div>
            <div className="step-actions">
              <button className="ghost-action compact" onClick={() => setCareerStep('specialization')}>
                <Compass size={15} />
                Đổi chuyên ngành
              </button>
            </div>
          </div>
          <div className="vertical-roadmap role-step-list">
            {levels.map((level, index) => {
              const roleItem = selectedColumn.roles[index];
              const picked = path.includes(roleItem.id);
              const hiddenBySearch = filteredRoleIds && !filteredRoleIds.has(roleItem.id);
              return (
                <button
                  key={level.key}
                  className={`${selectedRoleId === roleItem.id ? 'active' : ''} ${picked ? 'picked' : ''} ${hiddenBySearch ? 'dimmed' : ''}`}
                  onClick={() => { setSelectedRoleId(roleItem.id); setCareerStep('detail'); }}
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
      )}

      {careerStep === 'detail' && (
        <section className="career-step-card detail-panel role-detail-page">
          <div className="step-heading">
            <b>03</b>
            <div>
              <p className="mono-label">{currentMajor.short} / {selectedRole.track} / {selectedRole.level}</p>
              <h2>{selectedRole.title}</h2>
            </div>
          </div>
          <div className="role-detail-hero">
            <div className="role-visual-scene" style={{ '--role-photo': `url("${workIllustrations[0]?.src}")` }}>
              <span>{selectedRole.track}</span>
              <strong>{selectedRole.level}</strong>
              <i>{currentMajor.short}</i>
            </div>
            <div className="role-detail-summary">
              <p>{selectedRole.title} là vị trí tập trung vào {selectedRole.track}, yêu cầu kết hợp kỹ năng thực hành, tư duy sản phẩm và khả năng tạo đầu ra có thể chứng minh trong portfolio.</p>
              <div className="focus-meta">
                <span>{selectedRole.experience}</span>
                <span>{selectedRole.salary}</span>
                <span>{suggestedChallenges.length || 3} bài tập phù hợp</span>
              </div>
              <div className="step-actions">
                <button className="ghost-action compact" onClick={() => setCareerStep('role')}>
                  <MoveUp size={15} />
                  Chọn chức vụ khác
                </button>
                <button className="primary-action compact" disabled={!canBuildPath} onClick={() => addToPath(selectedRole.id)}>
                  <Plus size={15} />
                  {canBuildPath ? 'Lưu vị trí quan tâm' : 'Chỉ xem tham khảo'}
                </button>
              </div>
            </div>
          </div>
          {!canBuildPath && (
            <div className="status-banner muted">
              <ShieldCheck size={17} />
              Chỉ xem tham khảo. Bạn chỉ có thể lập lộ trình cho ngành đã chọn khi đăng nhập.
            </div>
          )}
          <section className="role-work-gallery">
            <div className="card-topline">
              <span>Ảnh minh họa công việc</span>
              <strong>{workIllustrations.length} ảnh</strong>
            </div>
            <div className="work-gallery-grid">
              {workIllustrations.map((item) => (
                <figure className="work-gallery-card" key={`${selectedRole.id}-${item.title}`}>
                  <img src={item.src} alt={`${item.title} - ${selectedRole.title}`} loading="lazy" />
                  <figcaption>
                    <strong>{item.title}</strong>
                    <span>{item.subtitle}</span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </section>
          <div className="role-detail-grid">
            <article className="role-reality-card">
              <p className="mono-label">Trong một ngày làm việc</p>
              <h3>Một ngày của {selectedRole.title}</h3>
              {dailyWork.map((item) => <div className="requirement-item compact narrative" key={item}><Check size={16} /><span>{item}</span></div>)}
            </article>
            <article className="role-reality-card">
              <p className="mono-label">Trách nhiệm nghề nghiệp</p>
              <h3>Bạn chịu trách nhiệm gì?</h3>
              {roleResponsibilities.map((item) => <div className="requirement-item compact narrative" key={item}><BadgeCheck size={16} /><span>{item}</span></div>)}
            </article>
            <article className="role-reality-card">
              <p className="mono-label">Áp lực thực tế</p>
              <h3>Tình huống thường gặp</h3>
              {roleSituations.map((item) => <div className="requirement-item compact narrative" key={item}><ShieldCheck size={16} /><span>{item}</span></div>)}
            </article>
            <article className="role-reality-card">
              <p className="mono-label">Portfolio proof</p>
              <h3>Năng lực cần chứng minh</h3>
              {roleProof.map((item) => (
                <div className="requirement-item compact narrative" key={item}>
                  <BadgeCheck size={16} />
                  <span>{item}</span>
                </div>
              ))}
              <div className="tabs compact-tabs">
                {Object.entries(tabItems).map(([key, value]) => (
                  <button key={key} className={tab === key ? 'active' : ''} onClick={() => setTab(key)}>{value.label}</button>
                ))}
              </div>
              <div className="proof-tab-panel">
                <p className="mono-label">{tabItems[tab].label} cần thể hiện</p>
                {tabItems[tab].items.slice(0, 5).map((item) => (
                  <div className="requirement-item compact narrative proof-row" key={item}>
                    <BadgeCheck size={15} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </article>
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

          <div className="recommended-challenge-panel embedded">
            <div className="step-heading">
              <b>04</b>
              <div>
                <p className="mono-label">Bài tập đề xuất</p>
                <h2>Để đạt vị trí {selectedRole.title}</h2>
              </div>
            </div>
            <div className="recommended-challenge-grid">
              {(suggestedChallenges.length ? suggestedChallenges : (challenges ?? []).filter((challenge) => challenge.majorKey === currentMajor.key).slice(0, 3)).map((challenge) => (
                <article className="recommended-challenge-card" key={challenge.id}>
                  <div className="challenge-illustration mini" data-track={challenge.track}>
                    <span>{challenge.track}</span>
                  </div>
                  <div>
                    <strong>{challenge.title}</strong>
                    <span>{challenge.difficulty} · {challenge.xp} XP · {challenge.due}</span>
                  </div>
                  <button className="ghost-action compact" onClick={() => { setSelectedChallengeId(challenge.id); go('join'); }}>
                    Xem bài
                    <Rocket size={15} />
                  </button>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}
    </section>
  );
}

function MarketTrendsPage({ majors, currentMajor, changeMajor, go }) {
  const signal = marketSignalsByMajor[currentMajor.key] ?? marketSignalsByMajor.dev;
  const evidence = marketEvidenceByMajor[currentMajor.key] ?? marketEvidenceByMajor.dev;
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
        <div className="trend-heading-actions">
          <div className="major-switcher trend-major-switcher">
            {majors.map((major) => (
              <button key={major.key} className={currentMajor.key === major.key ? 'active' : ''} onClick={() => changeMajor(major.key)}>
                {major.short}
              </button>
            ))}
          </div>
          <div className="market-freshness-card">
            <Sparkles size={20} />
            <div>
              <strong>Cập nhật {updatedLabel}</strong>
              <span>Trạng thái nguồn: đang theo dõi</span>
            </div>
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

      <div className="evidence-grid">
        {evidence.metrics.map((item) => (
          <article className="evidence-card" key={`${item.label}-${item.value}`}>
            <span>{item.source}</span>
            <h2>{item.value}</h2>
            <strong>{item.label}</strong>
            <p>{item.note}</p>
          </article>
        ))}
      </div>

      <article className="trend-reasoning-card">
        <p className="mono-label">Lý luận đề xuất lộ trình</p>
        {evidence.reasoning.map((item) => (
          <div className="activity-row" key={item}><ShieldCheck size={15} /><span>{item}</span></div>
        ))}
      </article>

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

function AboutPage({ go }) {
  const companyStats = [
    { value: '3', label: 'career domains', note: 'Developer, Marketing, Designer' },
    { value: '22+', label: 'specializations', note: 'lộ trình hẹp theo từng ngành' },
    { value: '60+', label: 'portfolio challenges', note: '20 bài tập cho mỗi ngành lớn' },
    { value: '1:1', label: 'mentor workflow', note: 'match mentor theo chuyên ngành' }
  ];
  const operatingPrinciples = ['Không chỉ chọn nghề, phải chứng minh được năng lực bằng sản phẩm.', 'Dữ liệu thị trường cần có nguồn, ngày cập nhật và mức độ tin cậy.', 'Mỗi challenge phải dẫn tới một artifact có thể đưa vào portfolio.', 'Mentor feedback phải cụ thể: điểm mạnh, điểm yếu, hành động cần sửa.'];
  return (
    <section className="content-page about-page">
      <div className="about-hero">
        <p className="mono-label">About Portfolio</p>
        <h1>Chúng tôi giúp người trẻ biến định hướng nghề nghiệp thành bằng chứng năng lực.</h1>
        <p>Portfolio là nền tảng career-tech dành cho sinh viên và người mới đi làm. Sản phẩm kết hợp bản đồ nghề, dữ liệu thị trường, thử thách thực tế, mentor feedback và hồ sơ portfolio để người học không bị mắc kẹt ở câu hỏi “mình nên học gì tiếp theo?”.</p>
        <div className="submit-actions">
          <button className="primary-action" onClick={() => go('roadmap')}><Compass size={17} /> Khám phá bản đồ nghề</button>
          <button className="ghost-action" onClick={() => go('hub')}><LayoutDashboard size={17} /> Xem thử thách</button>
        </div>
      </div>

      <div className="about-stat-grid">
        {companyStats.map((item) => (
          <article className="evidence-card" key={item.label}>
            <h2>{item.value}</h2>
            <strong>{item.label}</strong>
            <p>{item.note}</p>
          </article>
        ))}
      </div>

      <div className="about-grid">
        <article className="about-card">
          <p className="mono-label">Our mission</p>
          <h2>Career guidance phải thực tế, đo được và có thể demo.</h2>
          <p>Thay vì đưa lời khuyên chung chung, Portfolio biến mỗi ngành thành lộ trình có level, skill, knowledge, ability, công cụ, challenge và tiêu chuẩn nộp bài. Người dùng nhìn thấy họ đang thiếu gì, cần làm gì và sản phẩm nào chứng minh được năng lực đó.</p>
        </article>
        <article className="about-card">
          <p className="mono-label">Product model</p>
          <h2>Từ chọn ngành đến portfolio có mentor review.</h2>
          <div className="activity-row"><Check size={15} /><span>Chọn ngành lớn: Dev, Marketing hoặc Design.</span></div>
          <div className="activity-row"><Check size={15} /><span>Xem chuyên ngành hẹp và xây lộ trình cá nhân.</span></div>
          <div className="activity-row"><Check size={15} /><span>Tham gia challenge, nộp sản phẩm, match mentor phù hợp.</span></div>
          <div className="activity-row"><Check size={15} /><span>Nhận feedback và cập nhật thành case study portfolio.</span></div>
        </article>
        <article className="about-card">
          <p className="mono-label">Data trust</p>
          <h2>Career data phải đáng tin, cập nhật và dễ kiểm chứng.</h2>
          <p>Portfolio tổng hợp tín hiệu từ báo cáo lương, job board công khai và nguồn tuyển dụng có uy tín để người học hiểu bức tranh thị trường trước khi chọn lộ trình. Mỗi insight quan trọng đều đi kèm nguồn tham khảo, thời điểm cập nhật và phần giải thích ngắn để người dùng biết vì sao thông tin đó đáng dùng.</p>
        </article>
      </div>

      <article className="trend-reasoning-card">
        <p className="mono-label">Nguyên tắc vận hành</p>
        {operatingPrinciples.map((item) => (
          <div className="activity-row" key={item}><ShieldCheck size={15} /><span>{item}</span></div>
        ))}
      </article>

      <footer className="company-footer">
        <div className="footer-brand">
          <span className="brand-mark"><ChevronsUp size={20} /></span>
          <div>
            <h2>Portfolio Career Tech</h2>
            <p>Biến kỹ năng hôm nay thành cơ hội ngày mai.</p>
          </div>
        </div>

        <div className="footer-grid">
          <div>
            <p className="mono-label">Công ty</p>
            <strong>Công ty TNHH Portfolio Career Tech</strong>
            <span>MST: 0318 2026 301</span>
            <span>Trụ sở: Khu công nghệ phần mềm, TP. Hồ Chí Minh</span>
          </div>
          <div>
            <p className="mono-label">Liên hệ</p>
            <a href="mailto:hello@portfolio.vn">hello@portfolio.vn</a>
            <a href="tel:+842812345678">(+84) 28 1234 5678</a>
            <span>Thứ 2 - Thứ 6, 09:00 - 18:00</span>
          </div>
          <div>
            <p className="mono-label">Sản phẩm</p>
            <button type="button" onClick={() => go('roadmap')}>Bản đồ nghề</button>
            <button type="button" onClick={() => go('hub')}>Thử thách portfolio</button>
            <button type="button" onClick={() => go('premium')}>Gói Premium</button>
          </div>
          <div>
            <p className="mono-label">Pháp lý</p>
            <span>Điều khoản sử dụng</span>
            <span>Chính sách bảo mật</span>
            <span>Quy chuẩn mentor review</span>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© 2026 Portfolio Career Tech. All rights reserved.</span>
          <span>Career map, challenge practice and mentor feedback platform.</span>
        </div>
      </footer>
    </section>
  );
}

function ChallengeHubPage({ currentMajor, activeTrack, setActiveTrack, visibleChallenges, setSelectedChallengeId, joinedChallengeIds, submissionStatus, joinChallenge, isPremium, mentors, go }) {
  const tracks = ['Tất cả', ...currentMajor.columns.map((item) => item.title)];
  const premiumChallengeCount = visibleChallenges.filter(isPremiumChallenge).length;
  const reviewedCount = visibleChallenges.filter((challenge) => submissionStatus[challenge.id]?.status === 'reviewed').length;
  const joinedCount = visibleChallenges.filter((challenge) => joinedChallengeIds.includes(challenge.id)).length;
  return (
    <section className="content-page challenge-hub-page">
      <div className="challenge-hub-hero">
        <div>
          <p className="mono-label">Trung tâm thử thách {currentMajor.short}</p>
          <h1>Luyện tập bằng bài tập có thể đưa vào portfolio</h1>
          <p>Chọn bài theo chuyên ngành, tham gia, nộp link sản phẩm và nhận feedback từ mentor phù hợp.</p>
        </div>
        <div className="challenge-hub-stats">
          <span><strong>{visibleChallenges.length}</strong>bài tập</span>
          <span><strong>{joinedCount}</strong>đã tham gia</span>
          <span><strong>{reviewedCount}</strong>có feedback</span>
        </div>
      </div>

      <div className="challenge-filter-panel">
        <span><Filter size={17} /> Lọc theo hướng đi</span>
        <div className="filter-row compact-filter-row">
          {tracks.map((track) => <button key={track} className={activeTrack === track ? 'active' : ''} onClick={() => setActiveTrack(track)}>{track}</button>)}
        </div>
        <button className="ghost-action compact" onClick={() => setActiveTrack('Tất cả')}>Đặt lại</button>
      </div>

      {!visibleChallenges.length && (
        <div className="empty-state challenge-empty-state">
          <LayoutDashboard size={24} />
          <h2>Chưa có bài tập cho bộ lọc này</h2>
          <p>Hãy chọn `Tất cả` hoặc đổi chuyên ngành hẹp để xem lại danh sách bài tập phù hợp.</p>
          <button className="primary-action compact" onClick={() => setActiveTrack('Tất cả')}>Xem tất cả bài tập</button>
        </div>
      )}

      <div className="challenge-grid">
        {visibleChallenges.map((challenge, index) => {
          const joined = joinedChallengeIds.includes(challenge.id);
          const submission = submissionStatus[challenge.id];
          const locked = isPremiumChallenge(challenge) && !isPremium;
          const photo = makeWorkIllustrationSrc(null, index + (currentMajor.key === 'mkt' ? 4 : currentMajor.key === 'design' ? 8 : 0));
          const mentor = findMentorForName(challenge.mentor, mentors);
          return (
            <article className={`challenge-card ${locked ? 'premium-locked-card' : ''}`} key={challenge.id}>
              <div className="challenge-photo" style={{ '--challenge-photo': `url("${photo}")` }}>
                <span>{challenge.track}</span>
                <b>{locked ? 'Premium' : challenge.difficulty}</b>
              </div>
              <div className="card-topline">
                <span>{challenge.track}</span>
                <strong>{locked ? 'Premium' : submission?.status ? statusLabels[submission.status] ?? submission.status : joined ? 'Đã tham gia' : `${challenge.xp} XP`}</strong>
              </div>
              <h2>{challenge.title}</h2>
              <p>{challenge.summary}</p>
              <div className="challenge-business-row">
                <span><Sparkles size={15} /> {challenge.xp} XP</span>
                <button type="button" className="mentor-peek">
                  <GraduationCap size={15} />
                  {challenge.mentor}
                  <div className="mentor-hover-card">
                    <strong>{mentor.name}</strong>
                    <small>{mentor.level ?? 'Mentor'} · {mentor.strongestField ?? challenge.track}</small>
                    <span>{mentor.currentCompany ?? 'Portfolio Mentor Network'} · {mentor.yearsOfExperience ?? '5+'} năm kinh nghiệm</span>
                    <span>Chuyên môn: {(mentor.expertise ?? [challenge.track]).slice(0, 3).join(', ') || challenge.track}</span>
                    <span>Review: {mentor.availability ?? 'Theo lịch mentor'}</span>
                    <b>{mentor.rating ?? 4.8}/5 mentor score</b>
                  </div>
                </button>
                <span><Clock size={15} /> {challenge.due}</span>
              </div>
              {locked && <div className="status-banner premium-banner"><Crown size={16} /> Cần Premium để nộp bài và nhận mentor review sâu.</div>}
              <div className="tag-row">{challenge.tags.slice(0, 4).map((tag) => <span key={tag}>{tag}</span>)}</div>
              <div className="card-actions">
                <button className="ghost-action compact" onClick={() => { setSelectedChallengeId(challenge.id); if (!locked) joinChallenge(challenge.id); go(locked ? 'premium' : 'join'); }}>
                  {locked ? 'Xem gói' : joined ? 'Chi tiết' : 'Tham gia'}
                  <Rocket size={16} />
                </button>
                <button className="primary-action compact" onClick={() => { setSelectedChallengeId(challenge.id); if (locked) { go('premium'); return; } joinChallenge(challenge.id); go(submission?.status === 'reviewed' ? 'feedback' : 'submit'); }}>
                  {locked ? 'Mở khóa' : submission?.status === 'reviewed' ? 'Feedback' : submission?.status === 'submitted' ? 'Bài đã nộp' : 'Nộp bài'}
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
            <label className="submit-check-item" key={item}>
              <input type="checkbox" defaultChecked />
              <span>{item}</span>
            </label>
          ))}
        </div>
        {isDraft && <div className="status-banner"><Save size={17} /> Đã lưu bản nháp lúc {submission.updatedAt}. Bạn có thể nộp khi đã đủ checklist.</div>}
        {isSubmitted && <div className="status-banner"><Check size={17} /> Đã nộp sản phẩm lúc {submission.updatedAt}. Góp ý từ người hướng dẫn đã sẵn sàng để demo.</div>}
        {isRejected && <div className="status-banner warning"><X size={17} /> Mentor yêu cầu bổ sung minh chứng. Cập nhật link hoặc ghi chú rồi nộp lại.</div>}
        {isReviewed && <div className="status-banner"><Check size={17} /> Mentor đã nhận xét bài này. Mở trang góp ý để cập nhật portfolio.</div>}
        {locked && <div className="status-banner premium-banner"><Crown size={17} /> Đây là challenge nâng cao. Free có thể xem yêu cầu, Premium mới được nộp bài và nhận review.</div>}
        {!locked && (
          <div className={`status-banner ${isPremium ? 'premium-unlocked-banner' : ''}`}>
            <Crown size={17} />
            {isPremium
              ? 'Premium: được nộp lại nhiều lần, ưu tiên mentor theo chuyên ngành và lưu lịch sử phiên bản cho portfolio.'
              : 'Free: được nộp bài cơ bản. Nâng cấp Premium để nộp lại nhiều lần và nhận review sâu hơn.'}
          </div>
        )}
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
function PortfolioPage({ pathRoles, currentMajor, go, demoUser, apiStatus, submissions, challenges, updatePortfolio, updateStudentProfile, isPremium, autoOpenPublicPortfolio, onPublicPortfolioOpened }) {
  const [showPublicPreview, setShowPublicPreview] = useState(false);
  const [isEditingProfileInfo, setIsEditingProfileInfo] = useState(false);
  const mainSpecs = currentMajor.columns.slice(0, 5);
  const stats = demoUser?.stats ?? { completedChallenges: 6, mentorRating: 4.8, portfolioProjects: 4, verifiedSkills: 18 };
  const profileName = demoUser?.name ?? 'Quang Nguyễn';
  const careerGoal = demoUser?.careerGoal ?? pathRoles[pathRoles.length - 1]?.title ?? `Lead ${currentMajor.short}`;
  const userSubmissions = submissions.filter((item) => item.userId === (demoUser?.id ?? 'demo-student'));
  const challengeName = (challengeId) => challenges.find((item) => item.id === challengeId)?.title ?? challengeId;
  const reviewedSubmissions = userSubmissions.filter((item) => ['reviewed', 'accepted'].includes(item.status)).length;
  const publicPortfolioUrl = `https://portfolio.vn/u/${String(profileName).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'student'}`;
  const initialProfileForm = () => ({
    school: demoUser?.school ?? '',
    academicMajor: demoUser?.academicMajor ?? currentMajor.title,
    academicYear: demoUser?.academicYear ?? '',
    portfolioLink: demoUser?.portfolio?.links?.[0] ?? publicPortfolioUrl
  });
  const [profileForm, setProfileForm] = useState(initialProfileForm);
  const updateProfileField = (field, value) => setProfileForm((current) => ({ ...current, [field]: value }));
  const resetProfileForm = () => setProfileForm(initialProfileForm());
  const saveProfileInfo = () => {
    updateStudentProfile?.(profileForm);
    setIsEditingProfileInfo(false);
  };
  const monthlyReport = [
    { label: 'Challenge đã tham gia', value: Math.max(userSubmissions.length, 3) },
    { label: 'Feedback mentor', value: Math.max(reviewedSubmissions, 2) },
    { label: 'Kỹ năng mới', value: Math.max(Math.round((stats.verifiedSkills ?? 0) / 3), 6) }
  ];
  const premiumBadges = [
    `${currentMajor.short} Skill Verified`,
    'Mentor Reviewed',
    'Portfolio Ready',
    'Career Path Certified'
  ];
  const certificateCode = `PF-${currentMajor.short.toUpperCase()}-${String(demoUser?.id ?? 'demo').slice(-4).toUpperCase()}-2026`;
  const portfolioProjectDetails = (userSubmissions.length ? userSubmissions : [
    { challengeId: 'dev-dashboard', status: 'reviewed', updatedAt: '15:10' },
    { challengeId: 'dev-api', status: 'submitted', updatedAt: '09:30' },
    { challengeId: 'dev-mobile', status: 'reviewed', updatedAt: '17:10' }
  ]).slice(0, 4).map((submission, index) => {
    const challenge = challenges.find((item) => item.id === submission.challengeId)
      ?? challenges.find((item) => item.majorKey === currentMajor.key)
      ?? { title: challengeName(submission.challengeId), track: currentMajor.columns[0]?.title ?? currentMajor.title, summary: 'Bài tập portfolio theo ngành đã chọn.', tags: currentMajor.columns.slice(0, 3).map((item) => item.title), xp: 420 };
    const score = [92, 88, 86, 84][index] ?? 82;
    return {
      id: `${submission.challengeId}-${index}`,
      title: challenge.title,
      track: challenge.track,
      status: statusLabels[submission.status] ?? submission.status,
      score,
      summary: challenge.summary,
      tags: challenge.tags ?? [],
      outcome: [
        `Hoàn thiện ${challenge.track} artifact có thể đưa vào CV/portfolio.`,
        `Có minh chứng link, ghi chú nghiệp vụ và checklist nộp bài.`,
        `Tích lũy ${challenge.xp ?? 420} XP cho hồ sơ ${currentMajor.title}.`
      ],
      mentorHighlight: score >= 88
        ? 'Mentor đánh giá cao vì bài có cấu trúc rõ, minh chứng dễ kiểm tra và có khả năng trình bày thành case study.'
        : 'Bài có nền tảng tốt, cần bổ sung thêm bằng chứng kết quả và giải thích quyết định triển khai.'
    };
  });
  useEffect(() => {
    if (autoOpenPublicPortfolio && isPremium) {
      setShowPublicPreview(true);
      onPublicPortfolioOpened?.();
    }
  }, [autoOpenPublicPortfolio, isPremium, onPublicPortfolioOpened]);
  useEffect(() => {
    if (!isEditingProfileInfo) resetProfileForm();
  }, [demoUser?.school, demoUser?.academicMajor, demoUser?.academicYear, demoUser?.portfolio?.links?.[0], currentMajor.title]);
  return (
    <section className="content-page portfolio-page">
      {showPublicPreview && (
        <section className="public-portfolio-preview">
          <div className="public-preview-hero">
            <div>
              <p className="mono-label">Public portfolio preview</p>
              <h2>{profileName}</h2>
              <span>{careerGoal} · {currentMajor.title}</span>
            </div>
            <button className="ghost-action compact" onClick={() => setShowPublicPreview(false)}>
              <X size={16} />
              Đóng preview
            </button>
          </div>
          <div className="public-url-row">
            <LinkIcon size={17} />
            <strong>{publicPortfolioUrl}</strong>
            <span>Đang public trong bản demo</span>
          </div>
          <div className="public-preview-grid">
            <article>
              <p className="mono-label">Case study nổi bật</p>
              <h3>Case study {currentMajor.title}</h3>
              <span>Gồm lộ trình, challenge đã nộp, minh chứng sản phẩm và mentor feedback.</span>
            </article>
            <article>
              <p className="mono-label">Kỹ năng xác thực</p>
              <div className="tag-row">
                {premiumBadges.slice(0, 3).map((item) => <span key={item}>{item}</span>)}
              </div>
            </article>
            <article>
              <p className="mono-label">Chứng nhận</p>
              <h3>{certificateCode}</h3>
              <span>Chứng nhận hoàn thành lộ trình Premium.</span>
            </article>
          </div>
        </section>
      )}
      {isPremium && (
        <div className="premium-portfolio-grid">
          <article>
            <p className="mono-label">Public portfolio</p>
            <h2>{publicPortfolioUrl}</h2>
            <span>Trang công khai có case study, kỹ năng xác thực và lịch sử mentor feedback.</span>
          </article>
          <article>
            <p className="mono-label">Báo cáo tháng này</p>
            <div className="mini-metric-row">
              {monthlyReport.map((item) => (
                <span key={item.label}><strong>{item.value}</strong>{item.label}</span>
              ))}
            </div>
          </article>
          <article>
            <p className="mono-label">Badge xác thực</p>
            <div className="tag-row">
              {premiumBadges.map((item) => <span key={item}>{item}</span>)}
            </div>
          </article>
          <article>
            <p className="mono-label">Mentor ưu tiên</p>
            <h2>{currentMajor.title} specialist</h2>
            <span>Ưu tiên match mentor theo chuyên ngành, challenge và kỹ năng đang cần review.</span>
          </article>
          <article>
            <p className="mono-label">Chứng nhận lộ trình</p>
            <h2>{certificateCode}</h2>
            <span>Cấp khi hoàn thành đủ lộ trình, challenge bắt buộc và mentor feedback đạt chuẩn.</span>
          </article>
        </div>
      )}
      <div className="cv-layout">
        <aside className="cv-sidebar">
          <div className="cv-avatar-card">
            <div className="cv-avatar">{profileName.split(' ').map((item) => item[0]).slice(0, 2).join('')}</div>
            <p className="mono-label">Student profile</p>
            <h2>{profileName}</h2>
            <span>{careerGoal}</span>
            <div className="cv-plan-actions">
              <span className={`cv-plan-badge ${isPremium ? 'premium' : 'free'}`}>
                {isPremium ? <Crown size={14} /> : <ShieldCheck size={14} />}
                {isPremium ? 'Premium' : 'Free'}
              </span>
              <button type="button" className="ghost-action tiny print-cv-button" onClick={() => window.print()}>
                <FileUp size={14} />
                Xuất CV PDF
              </button>
            </div>
          </div>
          <div className="cv-info-list editable-profile-info">
            <div className="editable-info-head">
              <span>Thông tin học tập</span>
              <button
                type="button"
                className="ghost-action tiny"
                onClick={() => {
                  if (isEditingProfileInfo) resetProfileForm();
                  setIsEditingProfileInfo((current) => !current);
                }}
              >
                {isEditingProfileInfo ? <X size={14} /> : <Edit3 size={14} />}
                {isEditingProfileInfo ? 'Hủy' : 'Sửa'}
              </button>
            </div>
            {isEditingProfileInfo ? (
              <div className="editable-info-form">
                <label>
                  <BookOpen size={15} />
                  <input value={profileForm.school} onChange={(event) => updateProfileField('school', event.target.value)} placeholder="Trường đang học" />
                </label>
                <label>
                  <BriefcaseBusiness size={15} />
                  <input value={profileForm.academicMajor} onChange={(event) => updateProfileField('academicMajor', event.target.value)} placeholder="Chuyên ngành đang học" />
                </label>
                <label>
                  <Trophy size={15} />
                  <input value={profileForm.academicYear} onChange={(event) => updateProfileField('academicYear', event.target.value)} placeholder="Năm học" />
                </label>
                <label>
                  <LinkIcon size={15} />
                  <input value={profileForm.portfolioLink} onChange={(event) => updateProfileField('portfolioLink', event.target.value)} placeholder="Link portfolio / GitHub" />
                </label>
                <button type="button" className="primary-action compact" onClick={saveProfileInfo}>
                  <Save size={15} />
                  Lưu thông tin
                </button>
              </div>
            ) : (
              <>
                <div><BookOpen size={16} /><span>{demoUser?.school ?? 'Chưa cập nhật trường học'}</span></div>
                <div><BriefcaseBusiness size={16} /><span>{demoUser?.academicMajor ?? currentMajor.title}</span></div>
                <div><Trophy size={16} /><span>{demoUser?.academicYear ?? 'Năm học chưa cập nhật'}</span></div>
                <div><LinkIcon size={16} /><span>{demoUser?.portfolio?.links?.[0] ?? publicPortfolioUrl}</span></div>
              </>
            )}
          </div>
          <div className="cv-stat-list">
            <StatCard icon={Trophy} title="Thử thách" value={stats.completedChallenges} />
            <StatCard icon={Star} title="Mentor score" value={stats.mentorRating} />
            <StatCard icon={BriefcaseBusiness} title="Projects" value={stats.portfolioProjects} />
            <StatCard icon={BookOpen} title="Verified skills" value={stats.verifiedSkills} />
          </div>
          <article className="cv-side-section">
            <h3>Career path</h3>
            {pathRoles.map((item, index) => (
              <div className="profile-timeline-item" key={item.id}>
                <b>{index + 1}</b>
                <span>{item.title}</span>
                <small>{item.track} · {item.level}</small>
              </div>
            ))}
          </article>
        </aside>

        <section className="cv-main">
          <div className="cv-two-col profile-skill-wide">
            <article className="cv-section">
              <h2>Kỹ năng & mức độ sẵn sàng</h2>
              {mainSpecs.map((item, index) => (
                <div className="progress-line" key={item.key}>
                  <span>{item.title}</span>
                  <b><i style={{ width: `${88 - index * 10}%` }} /></b>
                </div>
              ))}
              <div className="tag-row cv-skill-tags">
                {(demoUser?.currentSkills ?? currentMajor.columns.slice(0, 5).map((item) => item.title)).map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </article>
          </div>

          <article className="cv-section featured-projects-section">
            <div className="card-topline">
              <span>Project nổi bật</span>
              <strong>{portfolioProjectDetails.length} project</strong>
            </div>
            <div className="featured-project-list">
              {portfolioProjectDetails.slice(0, 3).map((project) => (
                <article className="featured-project-card" key={project.id}>
                  <div className="project-score-pill">
                    <strong>{project.score}</strong>
                    <span>/100</span>
                  </div>
                  <div className="featured-project-body">
                    <span className="mono-label">{project.track} · {project.status}</span>
                    <h3>{project.title}</h3>
                    <p>{project.summary} {project.outcome[0]}</p>
                    <div className="tag-row">
                      {project.tags.slice(0, 3).map((tag) => <span key={tag}>{tag}</span>)}
                    </div>
                  </div>
                  <button className="ghost-action compact"><LinkIcon size={15} /> Xem project</button>
                </article>
              ))}
            </div>
          </article>
        </section>
      </div>
    </section>
  );
}

function SubmissionHistoryPage({ demoUser, submissions, challenges, feedbackList, setSelectedChallengeId, go }) {
  const userSubmissions = submissions.filter((item) => item.userId === (demoUser?.id ?? 'demo-student'));
  const historyItems = userSubmissions.length ? userSubmissions : [
    { id: 'empty-history', challengeId: 'demo', status: 'draft', updatedAt: 'Chưa có', primaryLink: 'Chưa có link nộp' }
  ];
  const challengeName = (challengeId) => challenges.find((item) => item.id === challengeId)?.title ?? challengeId;
  const challengeTrack = (challengeId) => challenges.find((item) => item.id === challengeId)?.track ?? 'Portfolio';
  const feedbackFor = (challengeId) => feedbackList.find((item) => item.userId === (demoUser?.id ?? 'demo-student') && item.challengeId === challengeId);

  return (
    <section className="content-page submission-history-page">
      <div className="section-heading inline">
        <div>
          <p className="mono-label">Account history</p>
          <h1>Lịch sử nộp bài</h1>
          <p>Xem lại các bài đã nộp, trạng thái review, link minh chứng và feedback liên quan.</p>
        </div>
        <button className="primary-action compact" onClick={() => go('hub')}>
          <LayoutDashboard size={16} />
          Xem thử thách
        </button>
      </div>
      <div className="submission-history-list">
        {historyItems.map((item) => {
          const feedback = feedbackFor(item.challengeId);
          return (
            <article className="submission-history-card" key={`${item.challengeId}-${item.updatedAt}`}>
              <div className="history-status-pill">
                <FileUp size={17} />
                <span>{item.status}</span>
              </div>
              <div className="history-main">
                <span className="mono-label">{challengeTrack(item.challengeId)} · {item.updatedAt}</span>
                <h2>{challengeName(item.challengeId)}</h2>
                <p>{item.notes ?? 'Bài nộp đã được ghi nhận trong hệ thống Portfolio. Người dùng có thể mở lại link minh chứng hoặc xem feedback khi mentor đã review.'}</p>
                <div className="history-links">
                  <span>{item.primaryLink ?? 'Chưa có link chính'}</span>
                  {item.secondaryLink && <span>{item.secondaryLink}</span>}
                </div>
              </div>
              <div className="history-actions">
                {feedback && <strong>{feedback.score}/100</strong>}
                <button className="ghost-action compact" onClick={() => { setSelectedChallengeId(item.challengeId); go(feedback ? 'feedback' : 'submit'); }}>
                  <LinkIcon size={15} />
                  {feedback ? 'Xem feedback' : 'Mở bài nộp'}
                </button>
              </div>
            </article>
          );
        })}
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
          <h1>Nâng cấp Premium để được mentor góp ý và hoàn thiện portfolio xin việc.</h1>
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

      <div className="premium-capability-grid">
        {premiumCapabilities.map((item) => {
          const Icon = item.icon;
          return (
            <article className="premium-capability-card" key={item.title}>
              <Icon size={22} />
              <h2>{item.title}</h2>
              <p>{item.detail}</p>
            </article>
          );
        })}
      </div>

      <div className="admin-grid compact premium-admin-only">
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

function MentorPage({ apiStatus, data, currentUser, refreshData, createFeedback, updateSubmissionFromMentor, setNotice, notice }) {
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
  const [mentorProfileDraft, setMentorProfileDraft] = useState({
    title: mentorProfile.jobTitle ?? mentorProfile.level ?? 'Senior Mentor',
    company: mentorProfile.currentCompany ?? 'Portfolio Mentor Network',
    strongestField: mentorProfile.strongestField ?? 'Project Review',
    bio: mentorProfile.reviewStyle ?? 'Review theo yêu cầu, chất lượng trình bày và khả năng đưa vào portfolio.'
  });
  const [mentorCertificates, setMentorCertificates] = useState(mentorProfile.certifications ?? [
    'Google UX Design Certificate',
    'AWS Cloud Practitioner',
    'Portfolio Mentor Certification'
  ]);
  const [certificateInput, setCertificateInput] = useState('');
  const [mentorSection, setMentorSection] = useState('overview');
  const [selectedFeedbackId, setSelectedFeedbackId] = useState(null);
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
  const filteredFeedbackHistory = feedbackData.filter((feedback) => {
    const submission = submissionsData.find((item) => item.userId === feedback.userId && item.challengeId === feedback.challengeId) ?? { userId: feedback.userId, challengeId: feedback.challengeId, status: 'reviewed' };
    const challenge = challengesData.find((item) => item.id === feedback.challengeId);
    const student = students.find((item) => item.id === feedback.userId);
    const keyword = mentorFilters.keyword.trim().toLowerCase();
    if (mentorFilters.status !== 'all' && submission.status !== mentorFilters.status) return false;
    if (mentorFilters.majorKey !== 'all' && challenge?.majorKey !== mentorFilters.majorKey) return false;
    if (mentorFilters.track !== 'all' && challenge?.track !== mentorFilters.track) return false;
    if (mentorFilters.studentId !== 'all' && feedback.userId !== mentorFilters.studentId) return false;
    if (!keyword) return true;
    return [feedback.title, feedback.reviewer, feedback.score, feedback.reviewedAt, challenge?.title, challenge?.track, challenge?.majorKey, student?.name, student?.email]
      .some((value) => String(value ?? '').toLowerCase().includes(keyword));
  });
  const selectedFeedback = filteredFeedbackHistory.find((item) => item.id === selectedFeedbackId) ?? filteredFeedbackHistory[0];
  const selectedFeedbackChallenge = selectedFeedback ? challengesData.find((item) => item.id === selectedFeedback.challengeId) : null;
  const selectedFeedbackStudent = selectedFeedback ? students.find((item) => item.id === selectedFeedback.userId) : null;

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
    setMentorSection('review');
    setNotice(`Đang mở bài nộp của ${studentName(submission.userId)} để review`);
  };

  const updateReviewForm = (key, value) => {
    setReviewForm((current) => ({ ...current, [key]: value }));
  };

  const submitMentorReview = () => {
    if (!activeSubmission) return;
    createFeedback(activeSubmission.challengeId, activeSubmission.userId, {
      score: Number(reviewForm.score || 0),
      title: reviewForm.title,
      strengths: reviewForm.strengths.split('\n').map((item) => item.trim()).filter(Boolean),
      improvements: reviewForm.improvements.split('\n').map((item) => item.trim()).filter(Boolean),
      reviewer: mentorProfile.name ?? currentUser?.user?.name ?? 'Mentor Demo'
    })
      .then(() => {
        setNotice(`Đã chấm ${studentName(activeSubmission.userId)} - ${challengeName(activeSubmission.challengeId)}`);
        setActiveSubmission(null);
      })
      .catch(() => setNotice('Không lưu được feedback. Vui lòng thử lại.'));
  };

  const rejectSubmission = (submission) => {
    if (!submission) return;
    updateSubmissionFromMentor(submission, {
      status: 'rejected',
      notes: `${submission.notes || ''} Cần bổ sung minh chứng trước khi review.`
    });
    setNotice(`Đã yêu cầu nộp lại ${challengeName(submission.challengeId)}`);
    if (activeSubmission?.id === submission.id || (activeSubmission?.userId === submission.userId && activeSubmission?.challengeId === submission.challengeId)) {
      setActiveSubmission(null);
    }
  };
  const updateMentorProfileDraft = (key, value) => {
    setMentorProfileDraft((current) => ({ ...current, [key]: value }));
  };
  const saveMentorProfileDraft = () => {
    setNotice('Đã cập nhật hồ sơ mentor demo. Thông tin này dùng để match mentor và hiển thị cho student.');
  };
  const addMentorCertificate = () => {
    const value = certificateInput.trim();
    if (!value) return;
    setMentorCertificates((current) => [...current, value]);
    setCertificateInput('');
    setNotice(`Đã thêm chứng chỉ: ${value}`);
  };

  return (
    <section className="content-page admin-page">
      <div className="section-heading inline">
        <div>
          <p className="mono-label">Mentor dashboard</p>
          <h1>{currentUser?.user?.name ?? 'Mentor'} review project</h1>
        </div>
        <button className="primary-action compact" onClick={refreshData}>
          <Save size={16} />
          Tải lại
        </button>
      </div>

      {notice && <div className="status-banner"><Check size={17} /> {notice}</div>}

      <aside className="workspace-sidebar">
        <p className="mono-label">Mentor menu</p>
        <button className={mentorSection === 'overview' ? 'active' : ''} onClick={() => setMentorSection('overview')}><LayoutDashboard size={16} /> Tổng quan</button>
        <button className={mentorSection === 'profile' ? 'active' : ''} onClick={() => setMentorSection('profile')}><UserRound size={16} /> Hồ sơ mentor</button>
        <button className={mentorSection === 'review' ? 'active' : ''} onClick={() => setMentorSection('review')}><FileUp size={16} /> Bộ lọc & review</button>
        <button className={mentorSection === 'feedback' ? 'active' : ''} onClick={() => setMentorSection('feedback')}><MessageSquareText size={16} /> Feedback</button>
      </aside>

      <div className={`mentor-profile-grid workspace-section ${mentorSection === 'profile' ? 'active' : ''}`} id="mentor-profile">
        <article className="mentor-hero-card">
          <p className="mono-label">Mentor profile</p>
          <h2>{mentorProfile.name ?? 'Mentor'}</h2>
          <strong>{mentorProfileDraft.title} · {mentorProfileDraft.strongestField}</strong>
          <p>{mentorProfileDraft.bio}</p>
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
        <article className="admin-panel mentor-profile-editor">
          <p className="mono-label">Chỉnh sửa hồ sơ</p>
          <h2>Profile công khai</h2>
          <div className="admin-form">
            <label>Chức danh<input value={mentorProfileDraft.title} onChange={(event) => updateMentorProfileDraft('title', event.target.value)} /></label>
            <label>Công ty hiện tại<input value={mentorProfileDraft.company} onChange={(event) => updateMentorProfileDraft('company', event.target.value)} /></label>
            <label>Lĩnh vực mạnh<input value={mentorProfileDraft.strongestField} onChange={(event) => updateMentorProfileDraft('strongestField', event.target.value)} /></label>
            <label className="wide">Mô tả mentor<textarea value={mentorProfileDraft.bio} onChange={(event) => updateMentorProfileDraft('bio', event.target.value)} /></label>
          </div>
          <button className="primary-action compact" onClick={saveMentorProfileDraft}><Save size={16} /> Lưu hồ sơ</button>
        </article>
        <article className="admin-panel mentor-profile-editor">
          <p className="mono-label">Certifications</p>
          <h2>Chứng chỉ mentor</h2>
          <div className="admin-list">
            {mentorCertificates.map((item) => (
              <div className="activity-row" key={item}><BadgeCheck size={16} /><span>{item}</span></div>
            ))}
          </div>
          <div className="certificate-add-row">
            <input value={certificateInput} onChange={(event) => setCertificateInput(event.target.value)} placeholder="VD: Google Analytics, AWS, UX Research..." />
            <button onClick={addMentorCertificate}><Plus size={16} /> Thêm</button>
          </div>
        </article>
        <article className="admin-panel mentor-profile-editor mentor-work-history-card">
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

      <div className={`admin-stats workspace-section ${mentorSection === 'overview' ? 'active' : ''}`} id="mentor-overview">
        <StatCard icon={FileUp} title="Pending reviews" value={pending.length} />
        <StatCard icon={UserRound} title="Active students" value={students.length} />
        <StatCard icon={LayoutDashboard} title="Submissions" value={submissionsData.length} />
        <StatCard icon={Star} title="Average score" value={averageScore || '-'} />
      </div>

      <div className={`admin-grid compact workspace-section ${mentorSection === 'overview' ? 'active' : ''}`}>
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

      <div className={`workspace-section mentor-review-tab ${mentorSection === 'review' ? 'active' : ''}`} id="mentor-review">
      <section className="management-filters mentor-review-filter" id="mentor-filter">
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
              <button className="ghost-action compact" onClick={() => {
                setActiveSubmission(null);
                if (notice?.startsWith('Đang mở bài nộp')) setNotice('');
              }}>
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

        </div>
      </div>

      <div className={`mentor-feedback-history workspace-section ${mentorSection === 'feedback' ? 'active' : ''}`} id="mentor-history">
        <article className="admin-panel feedback-history-list">
          <div className="section-heading inline compact-heading">
            <div>
              <p className="mono-label">Feedback history</p>
              <h2>{filteredFeedbackHistory.length} feedback đã tạo</h2>
            </div>
            <button className="ghost-action compact" onClick={resetMentorFilters}><Filter size={16} /> Xóa lọc</button>
          </div>
          <div className="management-filters feedback-history-filter">
            <label>
              Tìm kiếm
              <input value={mentorFilters.keyword} onChange={(event) => updateMentorFilter('keyword', event.target.value)} placeholder="Tên học sinh, bài tập, reviewer..." />
            </label>
            <label>
              Ngành
              <select value={mentorFilters.majorKey} onChange={(event) => updateMentorFilter('majorKey', event.target.value)}>
                <option value="all">Tất cả</option>
                {mentorMajorOptions.map((item) => <option value={item} key={item}>{item}</option>)}
              </select>
            </label>
            <label>
              Học sinh
              <select value={mentorFilters.studentId} onChange={(event) => updateMentorFilter('studentId', event.target.value)}>
                <option value="all">Tất cả</option>
                {students.map((student) => <option value={student.id} key={student.id}>{student.name}</option>)}
              </select>
            </label>
          </div>
          <div className="feedback-history-scroll">
            {filteredFeedbackHistory.map((feedback) => (
              <button
                type="button"
                className={`feedback-history-item ${selectedFeedback?.id === feedback.id ? 'active' : ''}`}
                key={feedback.id}
                onClick={() => setSelectedFeedbackId(feedback.id)}
              >
                <span>{feedback.score}/100</span>
                <div>
                  <strong>{challengeName(feedback.challengeId)}</strong>
                  <small>{studentName(feedback.userId)} · {feedback.reviewer} · {feedback.reviewedAt ?? feedback.createdAt}</small>
                </div>
              </button>
            ))}
            {!filteredFeedbackHistory.length && <div className="empty-state">Chưa có feedback phù hợp với bộ lọc.</div>}
          </div>
        </article>

        <article className="admin-panel feedback-detail-panel">
          {selectedFeedback ? (
            <>
              <p className="mono-label">Chi tiết feedback cũ</p>
              <div className="feedback-detail-head">
                <div>
                  <h2>{selectedFeedback.title}</h2>
                  <span>{selectedFeedbackStudent?.name ?? selectedFeedback.userId} · {selectedFeedbackChallenge?.track ?? selectedFeedback.challengeId} · {selectedFeedback.reviewedAt ?? selectedFeedback.createdAt}</span>
                </div>
                <strong>{selectedFeedback.score}/100</strong>
              </div>
              <div className="submission-evidence-grid compact">
                <article>
                  <p className="mono-label">Student</p>
                  <h3>{selectedFeedbackStudent?.name ?? selectedFeedback.userId}</h3>
                  <span>{selectedFeedbackStudent?.email ?? 'Demo student'}</span>
                </article>
                <article>
                  <p className="mono-label">Challenge</p>
                  <h3>{challengeName(selectedFeedback.challengeId)}</h3>
                  <span>{selectedFeedbackChallenge?.majorKey ?? 'portfolio'} · {selectedFeedbackChallenge?.difficulty ?? 'reviewed'}</span>
                </article>
                <article>
                  <p className="mono-label">Reviewer</p>
                  <h3>{selectedFeedback.reviewer}</h3>
                  <span>Mentor feedback đã lưu</span>
                </article>
              </div>
              <div className="feedback-detail-grid">
                <div>
                  <h3>Điểm mạnh</h3>
                  {(selectedFeedback.strengths ?? []).map((item) => (
                    <div className="activity-row" key={item}><Check size={15} /><span>{item}</span></div>
                  ))}
                </div>
                <div>
                  <h3>Cần cải thiện</h3>
                  {(selectedFeedback.improvements ?? []).map((item) => (
                    <div className="activity-row" key={item}><Sparkles size={15} /><span>{item}</span></div>
                  ))}
                </div>
              </div>
              <button className="primary-action compact" onClick={() => {
                const submission = submissionsData.find((item) => item.userId === selectedFeedback.userId && item.challengeId === selectedFeedback.challengeId);
                if (submission) reviewSubmission(submission);
              }}>
                <FileUp size={16} />
                Mở lại bài nộp
              </button>
            </>
          ) : (
            <div className="empty-state">Chọn một feedback để xem chi tiết.</div>
          )}
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
  const [adminListPages, setAdminListPages] = useState({
    challenges: 1,
    users: 1,
    mentors: 1,
    submissions: 1
  });
  const [adminSection, setAdminSection] = useState('overview');
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
  const updateAdminFilter = (key, value) => {
    setAdminFilters((current) => ({ ...current, [key]: value }));
    setAdminListPages({ challenges: 1, users: 1, mentors: 1, submissions: 1 });
  };
  const resetAdminFilters = () => {
    setAdminFilters({
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
    setAdminListPages({ challenges: 1, users: 1, mentors: 1, submissions: 1 });
  };
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
  const filteredMentors = mentors.filter((mentor) => {
    const keyword = adminFilters.userKeyword.trim().toLowerCase();
    if (!keyword) return true;
    return [mentor.name, mentor.email, mentor.jobTitle, mentor.currentCompany, mentor.strongestField, mentor.expertise?.join(' '), mentor.certifications?.join(' ')]
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
  const pageSize = 5;
  const paginate = (items, key) => {
    const totalPages = Math.max(1, Math.ceil(items.length / pageSize));
    const currentPage = Math.min(adminListPages[key] ?? 1, totalPages);
    return {
      items: items.slice((currentPage - 1) * pageSize, currentPage * pageSize),
      currentPage,
      totalPages,
      totalItems: items.length
    };
  };
  const challengePage = paginate(filteredChallenges, 'challenges');
  const userPage = paginate(filteredUsers, 'users');
  const mentorPage = paginate(filteredMentors, 'mentors');
  const submissionPage = paginate(filteredSubmissions, 'submissions');
  const changeAdminListPage = (key, direction) => {
    setAdminListPages((current) => {
      const source = key === 'challenges' ? filteredChallenges : key === 'users' ? filteredUsers : key === 'mentors' ? filteredMentors : filteredSubmissions;
      const totalPages = Math.max(1, Math.ceil(source.length / pageSize));
      return {
        ...current,
        [key]: Math.min(totalPages, Math.max(1, (current[key] ?? 1) + direction))
      };
    });
  };

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
    setAdminSection('challenges');
  };
  const editChallenge = (challenge) => {
    setAdminSection('challenges');
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

      <aside className="workspace-sidebar">
        <p className="mono-label">Admin menu</p>
        <button className={adminSection === 'overview' ? 'active' : ''} onClick={() => setAdminSection('overview')}><LayoutDashboard size={16} /> Tổng quan</button>
        <button className={adminSection === 'profile' ? 'active' : ''} onClick={() => setAdminSection('profile')}><ShieldCheck size={16} /> Vận hành</button>
        <button className={adminSection === 'commerce' ? 'active' : ''} onClick={() => setAdminSection('commerce')}><Crown size={16} /> Premium</button>
        <button className={adminSection === 'challenges' ? 'active' : ''} onClick={() => setAdminSection('challenges')}><Blocks size={16} /> Bộ lọc & challenge</button>
        <button className={adminSection === 'users' ? 'active' : ''} onClick={() => setAdminSection('users')}><UserRound size={16} /> Sinh viên & mentor</button>
        <button className={adminSection === 'system' ? 'active' : ''} onClick={() => setAdminSection('system')}><Save size={16} /> Hệ thống</button>
      </aside>

      <div className={`admin-stats workspace-section ${adminSection === 'overview' ? 'active' : ''}`} id="admin-overview">
        <StatCard icon={Blocks} title="Ngành lớn" value={overview.majors} />
        <StatCard icon={LayoutDashboard} title="Challenge" value={overview.challenges} />
        <StatCard icon={UserRound} title="Người dùng" value={overview.users} />
        <StatCard icon={FileUp} title="Lượt nộp bài" value={overview.submissions} />
        <StatCard icon={GraduationCap} title="Mentor" value={mentors.length} />
        <StatCard icon={Crown} title="Premium active" value={activePremiumCount} />
      </div>

      <div className={`admin-grid compact workspace-section ${adminSection === 'profile' ? 'active' : ''}`} id="admin-profile">
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

      <div className={`admin-grid compact workspace-section ${adminSection === 'commerce' ? 'active' : ''}`} id="admin-commerce">
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

      <div className={`workspace-section admin-challenge-tab ${adminSection === 'challenges' ? 'active' : ''}`} id="admin-challenges">
      <section className="management-filters admin-management-filters" id="admin-filter">
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
            {challengePage.items.map((challenge) => (
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
          <ListPager page={challengePage} onPrev={() => changeAdminListPage('challenges', -1)} onNext={() => changeAdminListPage('challenges', 1)} />
        </article>
      </div>
      </div>

      <div className={`admin-grid compact workspace-section ${adminSection === 'users' ? 'active' : ''}`} id="admin-users">
        <article className="admin-panel">
          <p className="mono-label">Student accounts</p>
          <h2>Sinh viên</h2>
          {userPage.items.map((user) => (
            <div className="admin-row" key={user.id}>
              <div>
                <strong>{user.name}</strong>
                <span>{user.email} · ngành {user.selectedMajorKey} · {user.status ?? 'active'} · {user.path?.length ?? 0} vị trí</span>
                <small>{user.school ?? 'Chưa cập nhật trường'} · {user.academicMajor ?? 'Chưa cập nhật chuyên ngành'} · {user.academicYear ?? 'Chưa cập nhật năm học'}</small>
              </div>
              <button onClick={() => updateUser(user.id, { status: user.status === 'locked' ? 'active' : 'locked' })}>
                {user.status === 'locked' ? 'Mở khóa' : 'Khóa'}
              </button>
            </div>
          ))}
          {!filteredUsers.length && <div className="empty-state">Không có sinh viên phù hợp.</div>}
          <ListPager page={userPage} onPrev={() => changeAdminListPage('users', -1)} onNext={() => changeAdminListPage('users', 1)} />
        </article>
        <article className="admin-panel">
          <p className="mono-label">Mentor accounts</p>
          <h2>Mentor</h2>
          {mentorPage.items.map((mentor) => (
            <div className="admin-row mentor-admin-row" key={mentor.id}>
              <div>
                <strong>{mentor.name}</strong>
                <span>{mentor.email} · {mentor.jobTitle ?? mentor.level} · {mentor.currentCompany ?? 'Portfolio Network'}</span>
                <small>{mentor.strongestField ?? 'Project Review'} · {(mentor.expertise ?? []).slice(0, 3).join(', ')}</small>
              </div>
              <button onClick={() => setAdminNotice(`Đã duyệt hồ sơ mentor ${mentor.name} trong bản demo`)}>
                Duyệt
              </button>
              <button onClick={() => setAdminNotice(`Đã yêu cầu ${mentor.name} bổ sung chứng chỉ/chuyên môn`)}>
                Yêu cầu bổ sung
              </button>
            </div>
          ))}
          {!filteredMentors.length && <div className="empty-state">Không có mentor phù hợp.</div>}
          <ListPager page={mentorPage} onPrev={() => changeAdminListPage('mentors', -1)} onNext={() => changeAdminListPage('mentors', 1)} />
        </article>
        <article className="admin-panel wide-admin-panel">
          <h2>Lịch sử nộp bài</h2>
          {submissionPage.items.map((submission) => (
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
          <ListPager page={submissionPage} onPrev={() => changeAdminListPage('submissions', -1)} onNext={() => changeAdminListPage('submissions', 1)} />
        </article>
      </div>

      <div className={`admin-grid compact workspace-section ${adminSection === 'system' ? 'active' : ''}`} id="admin-system">
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

function ListPager({ page, onPrev, onNext }) {
  if (!page.totalItems) return null;
  return (
    <div className="list-pager">
      <span>Hiển thị {page.items.length}/{page.totalItems} mục · Trang {page.currentPage}/{page.totalPages}</span>
      <div>
        <button onClick={onPrev} disabled={page.currentPage <= 1}>Trước</button>
        <button onClick={onNext} disabled={page.currentPage >= page.totalPages}>Sau</button>
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, title, value }) {
  return <article className="stat-card"><Icon size={22} /><strong>{value}</strong><span>{title}</span></article>;
}

createRoot(document.getElementById('root')).render(<App />);
