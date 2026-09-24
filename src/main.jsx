import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  AlertCircle,
  ArrowRight,
  Award,
  BadgeCheck,
  BarChart2,
  Blocks,
  BookOpen,
  BriefcaseBusiness,
  Check,
  CheckCircle2,
  ChevronRight,
  ChevronsUp,
  CircleDollarSign,
  Clock,
  Compass,
  CreditCard,
  Crown,
  Download,
  Edit3,
  FileText,
  FileUp,
  Filter,
  Flame,
  Github,
  GraduationCap,
  LayoutDashboard,
  Link as LinkIcon,
  LockKeyhole,
  LogOut,
  MessageSquareText,
  Mic,
  MicOff,
  Moon,
  MoveDown,
  MoveUp,
  Play,
  Plus,
  RefreshCw,
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
  Users,
  WandSparkles,
  X,
  Zap
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
    primaryLabel: 'Repository GitHub / GitLab (Bắt buộc)',
    secondaryLabel: 'Link Live Demo (Vercel / Render / Netlify)',
    tertiaryLabel: 'Link API Docs / Swagger / README',
    primaryPlaceholder: 'https://github.com/fpt-student/se-project',
    secondaryPlaceholder: 'https://se-project.vercel.app',
    tertiaryPlaceholder: 'https://api-docs.fpt.edu.vn hoặc swagger link',
    skillPlaceholder: 'React, Node.js, PostgreSQL, Docker, REST API...',
    notePlaceholder: 'Mô tả kiến trúc hệ thống, luồng dữ liệu, API chính, cách chạy project và trade-off kỹ thuật.',
    checklist: ['README có hướng dẫn setup & seed data', 'Có link demo chạy được hoặc API docs', 'Không commit file chứa credentials bí mật (.env)', 'Mô tả rõ các quyết định kỹ thuật và trade-offs'],
    accepted: 'GitHub, GitLab, Live Demo URL (Vercel/Render), Swagger/Postman API Docs'
  },
  mkt: {
    primaryLabel: 'Pitch Deck / Slide Chiến dịch (Bắt buộc)',
    secondaryLabel: 'Kế hoạch chiến dịch chi tiết (Google Docs / Notion)',
    tertiaryLabel: 'Bảng KPI & Analytics Dashboard (Sheets / Looker)',
    primaryPlaceholder: 'https://docs.google.com/presentation/d/... (Slides/Deck)',
    secondaryPlaceholder: 'https://docs.google.com/document/d/... (Campaign Plan)',
    tertiaryPlaceholder: 'https://lookerstudio.google.com/... hoặc Google Sheets KPI',
    skillPlaceholder: 'SEO Audit, Content Strategy, Meta Ads, GA4, Funnel...',
    notePlaceholder: 'Mục tiêu chiến dịch, chân dung khách hàng (Persona), insight, kênh triển khai, ngân sách, KPI và kế hoạch tối ưu.',
    checklist: ['Mục tiêu và chỉ số KPI đo lường được', 'Chân dung khách hàng mục tiêu & Pain point', 'Lịch triển khai đa kênh và phân bổ ngân sách', 'Phương án tối ưu hóa khi chỉ số chuyển đổi thấp'],
    accepted: 'Google Slides, Google Docs, Notion, Looker Studio, Google Sheets'
  },
  design: {
    primaryLabel: 'File thiết kế Figma (Bắt buộc)',
    secondaryLabel: 'Interactive Prototype URL (Figma Proto / Framer)',
    tertiaryLabel: 'Case Study chi tiết (Behance / Notion)',
    primaryPlaceholder: 'https://www.figma.com/file/... (Figma canvas)',
    secondaryPlaceholder: 'https://www.figma.com/proto/... (Figma interactive prototype)',
    tertiaryPlaceholder: 'https://www.behance.net/gallery/... (Case study chi tiết)',
    skillPlaceholder: 'Figma, UI Design System, UX Research, Prototype, Usability...',
    notePlaceholder: 'Vấn đề người dùng (Problem framing), User Flow, quyết định UI/UX, component states và kết quả usability test.',
    checklist: ['File Figma view-only có quyền truy cập', 'Prototype có thể click trải nghiệm luồng chính', 'Component có trạng thái: default, hover, focus, disabled', 'Case study nêu rõ lý do ra quyết định thiết kế'],
    accepted: 'Figma URL, Interactive Prototype, Behance Case Study, Notion'
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
    email: 'quang.se@fpt.edu.vn',
    studentId: 'SE174281',
    role: 'student',
    selectedMajorKey: 'dev',
    school: 'Đại học FPT TP.HCM',
    academicMajor: 'Kỹ thuật Phần mềm (Software Engineering - SE)',
    academicYear: 'Năm 3 (K17)',
    currentSkills: ['React', 'Node.js', 'PostgreSQL', 'Docker', 'REST API', 'Git'],
    careerGoal: 'Senior Software Architect',
    path: ['dev-frontend-so-cap', 'dev-fullstack-trung-cap', 'dev-architecture-cao-cap'],
    joinedChallengeIds: ['dev-api', 'dev-dashboard', 'dev-devops'],
    subscription: { planId: 'free', planName: 'FPT Student', status: 'free', expiresAt: null },
    stats: { completedChallenges: 6, mentorRating: 4.9, portfolioProjects: 4, verifiedSkills: 18 },
    portfolio: {
      headline: 'Software Engineer Portfolio - Full Stack & Architecture',
      bio: 'Sinh viên Kỹ thuật Phần mềm Đại học FPT, đam mê xây dựng hệ thống web chịu tải cao và kiến trúc phần mềm sạch.',
      publishedProjects: ['API thương mại điện tử', 'Dashboard nghề nghiệp', 'Case study kiến trúc booking'],
      links: ['https://github.com/fpt-student/se-portfolio', 'https://se-portfolio.fpt.edu.vn']
    },
    badges: ['Lộ trình FPT SE', 'Mentor Verified', 'Đã duyệt Portfolio', 'Chuẩn OJT Ready']
  },
  {
    id: 'student-mkt-seo',
    name: 'Khánh Trần',
    email: 'khanh.mkt@fpt.edu.vn',
    studentId: 'MK160342',
    role: 'student',
    selectedMajorKey: 'mkt',
    school: 'Đại học FPT TP.HCM',
    academicMajor: 'Digital Marketing (MKT)',
    academicYear: 'Năm 3 (K17)',
    currentSkills: ['SEO Audit', 'Content Strategy', 'Meta Ads', 'GA4 Analytics', 'Email Automation'],
    careerGoal: 'Growth & Performance Lead',
    path: ['mkt-seo-so-cap', 'mkt-content-trung-cap', 'mkt-growth-cao-cap'],
    joinedChallengeIds: ['mkt-seo', 'mkt-campaign'],
    subscription: { planId: 'free', planName: 'FPT Student', status: 'free', expiresAt: null },
    stats: { completedChallenges: 5, mentorRating: 4.8, portfolioProjects: 3, verifiedSkills: 16 },
    portfolio: {
      headline: 'Digital Marketing Portfolio - Growth & Data-Driven Strategy',
      bio: 'Sinh viên Digital Marketing Đại học FPT, tập trung vào chiến lược tăng trưởng, SEO audit và tối ưu phễu chuyển đổi.',
      publishedProjects: ['Kế hoạch ra mắt chiến dịch', 'Báo cáo audit SEO website FPT', 'Funnel Meta Ads đa kênh'],
      links: ['https://docs.google.com/presentation/d/demo-mkt-deck', 'https://mkt-portfolio.fpt.edu.vn']
    },
    badges: ['Lộ trình FPT MKT', 'Mentor Verified', 'Data-Driven Campaign', 'Chuẩn OJT Ready']
  },
  {
    id: 'student-design-ui',
    name: 'Oanh Đỗ',
    email: 'oanh.dg@fpt.edu.vn',
    studentId: 'GD170195',
    role: 'student',
    selectedMajorKey: 'design',
    school: 'Đại học FPT TP.HCM',
    academicMajor: 'Thiết kế Mỹ thuật số (Digital Art & Design - DG)',
    academicYear: 'Năm 3 (K17)',
    currentSkills: ['Figma UI/UX', 'Design System', 'User Research', 'Interactive Prototype', 'Brand Identity'],
    careerGoal: 'Senior Product Designer',
    path: ['design-ui-so-cap', 'design-product-trung-cap', 'design-brand-cao-cap'],
    joinedChallengeIds: ['design-app', 'design-system'],
    subscription: { planId: 'free', planName: 'FPT Student', status: 'free', expiresAt: null },
    stats: { completedChallenges: 5, mentorRating: 4.9, portfolioProjects: 3, verifiedSkills: 17 },
    portfolio: {
      headline: 'Product & UI/UX Designer Portfolio - Human-Centered Design',
      bio: 'Sinh viên Thiết kế Mỹ thuật số Đại học FPT, chuyên sâu thiết kế sản phẩm số, hệ thống UI nhất quán và trải nghiệm người dùng.',
      publishedProjects: ['Prototype ứng dụng di động FPT Life', 'Mini design system', 'Case study UX research booking app'],
      links: ['https://figma.com/@fpt-student/portfolio-design', 'https://behance.net/fpt-dg-portfolio']
    },
    badges: ['Lộ trình FPT DG', 'Mentor Verified', 'Design System Ready', 'Chuẩn OJT Ready']
  }
];

const demoMentors = [
  {
    id: 'mentor-demo',
    name: 'Anh Trần',
    email: 'mentor@portfolio.vn',
    role: 'mentor',
    majorKey: 'dev',
    expertise: ['Backend', 'Full Stack', 'Software Architecture', 'DevOps', 'Frontend'],
    strongestField: 'Backend API & Clean Architecture (FPT Software Alumnus)',
    level: 'Senior Mentor / Solution Architect',
    jobTitle: 'Solution Architect',
    currentCompany: 'FPT Software / FinTech SaaS Lab',
    yearsOfExperience: 8,
    strongestTools: ['Node.js', 'PostgreSQL', 'Docker', 'AWS', 'System Design', 'React'],
    reviewCapacity: 12,
    menteeLevels: ['Junior', 'Mid-level', 'Senior'],
    languages: ['Vietnamese', 'English'],
    education: ['B.S. Software Engineering - FPT University', 'AWS Solutions Architect Professional'],
    domains: ['E-commerce', 'Booking system', 'High-traffic API', 'SaaS Platform', 'FPT SWP391 Capstone'],
    reviewStyle: 'Review chi tiết theo rubric: cấu trúc mã nguồn, thiết kế database, xử lý edge-cases, bảo mật và khả năng trình bày vào Portfolio.',
    availability: 'Thứ 3 / Thứ 5 / Chủ nhật 19:30 - 22:00',
    rating: 4.9,
    activeStudents: ['demo-student']
  },
  {
    id: 'mentor-mkt-head',
    name: 'Mai Nguyễn',
    email: 'mai.mkt@portfolio.vn',
    role: 'mentor',
    majorKey: 'mkt',
    expertise: ['Content', 'SEO', 'Performance Marketing', 'Brand Marketing', 'Social Media'],
    strongestField: 'Integrated Digital Marketing & Growth Strategy',
    level: 'Lead Mentor / Head of Marketing',
    jobTitle: 'Head of Growth Marketing',
    currentCompany: 'FPT Online & E-Commerce Partners',
    yearsOfExperience: 7,
    strongestTools: ['GA4', 'Looker Studio', 'Meta Ads', 'Ahrefs', 'Notion', 'HubSpot'],
    reviewCapacity: 10,
    menteeLevels: ['Junior', 'Mid-level', 'Specialist'],
    languages: ['Vietnamese', 'English'],
    education: ['B.A. Digital Marketing - FPT University', 'Google Analytics & Ads Certified'],
    domains: ['Omnichannel Campaign', 'SEO Topic Cluster', 'Performance Funnel', 'Brand Positioning'],
    reviewStyle: 'Review chặt chẽ về dữ liệu: insight khách hàng, tính khả thi của KPI, phân bổ ngân sách và cách thể hiện thành case study thuyết phục.',
    availability: 'Thứ 2 / Thứ 4 / Thứ 7 20:00 - 22:00',
    rating: 4.9,
    activeStudents: ['student-mkt-seo']
  },
  {
    id: 'mentor-design-ui',
    name: 'Vy Hoàng',
    email: 'vy.ui@portfolio.vn',
    role: 'mentor',
    majorKey: 'design',
    expertise: ['UI Design', 'Product Design', 'UX Research', 'Design System', 'Brand Design'],
    strongestField: 'Design Systems & Product Interface (FPT Design Lab)',
    level: 'Lead Mentor / Product Design Lead',
    jobTitle: 'Product Design Lead',
    currentCompany: 'FPT Software Design Lab & FinTech Studio',
    yearsOfExperience: 7,
    strongestTools: ['Figma', 'FigJam', 'Miro', 'Maze Usability', 'Storybook', 'Adobe Suite'],
    reviewCapacity: 10,
    menteeLevels: ['Junior', 'Mid-level', 'Senior'],
    languages: ['Vietnamese', 'English'],
    education: ['B.A. Digital Art & Design - FPT University', 'Nielsen Norman UX Master Certified'],
    domains: ['Design Systems', 'Mobile App UX', 'SaaS Dashboard', 'Interactive Prototyping'],
    reviewStyle: 'Review theo tư duy sản phẩm: problem framing, trải nghiệm người dùng, tính đồng bộ của component states và lý do ra quyết định thiết kế.',
    availability: 'Thứ 3 / Thứ 6 / Chủ nhật 19:00 - 21:30',
    rating: 4.8,
    activeStudents: ['student-design-ui']
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
  { id: 'sub-demo-mobile', userId: 'demo-student', challengeId: 'dev-mobile', status: 'reviewed', primaryLink: 'https://github.com/demo/mobile-booking-app', secondaryLink: 'https://mobile-booking.demo/walkthrough', notes: 'Mobile booking có auth, đặt lịch, lịch sử và video walkthrough.', updatedAt: '17:10' },
  { id: 'sub-demo-ai', userId: 'demo-student', challengeId: 'dev-ai', status: 'reviewed', primaryLink: 'https://github.com/demo/ai-knowledge-search', secondaryLink: 'https://ai-search.demo/report', notes: 'AI search có ingest pipeline, citation và trang đánh giá chất lượng câu trả lời.', updatedAt: '09:15' },
  { id: 'sub-demo-devops', userId: 'demo-student', challengeId: 'dev-devops', status: 'submitted', primaryLink: 'https://github.com/demo/deploy-pipeline', secondaryLink: 'https://deploy-pipeline.demo/status', notes: 'Pipeline đã nộp, đang chờ mentor kiểm tra rollback và monitoring.', updatedAt: '14:05' },
  { id: 'sub-demo-ui-states', userId: 'demo-student', challengeId: 'dev-frontend-ui-states', status: 'reviewed', primaryLink: 'https://github.com/demo/saas-ui-states', secondaryLink: 'https://saas-ui-states.demo', notes: 'Bộ UI states còn thiếu error copy và accessibility contrast.', updatedAt: '12:25' },
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
  { id: 'fb-demo-ai', userId: 'demo-student', challengeId: 'dev-ai', score: 90, title: 'AI search có bằng chứng kỹ thuật tốt', strengths: ['Có trích dẫn nguồn theo từng câu trả lời', 'Pipeline ingest tài liệu rõ', 'UI thể hiện confidence score'], improvements: ['Thêm đánh giá hallucination case', 'Bổ sung fallback khi vector search rỗng', 'Ghi rõ chi phí chạy demo'], reviewer: 'Nam Hồ', createdAt: '09:15', reviewedAt: '22/07/2026' },
  { id: 'fb-demo-ui-states', userId: 'demo-student', challengeId: 'dev-frontend-ui-states', score: 64, title: 'UI states cần cải thiện trước khi đưa vào CV', strengths: ['Đã có loading và empty state cơ bản', 'Component tách thành file riêng'], improvements: ['Bổ sung error/success state có nội dung rõ', 'Kiểm tra contrast ở light mode', 'Thêm case responsive mobile và mô tả quyết định thiết kế'], reviewer: 'Mina Lê', createdAt: '12:25', reviewedAt: '22/07/2026' }
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
  { name: 'ITviec Salary Report 2025-2026', type: 'Lương IT Việt Nam', url: 'https://itviec.com/report/vietnam-it-salary-and-recruitment-market', reliability: 'Primary survey', useFor: 'Salary median, hiring plan, IT role demand', majorKeys: ['dev'] },
  { name: 'Adecco Vietnam Salary Guide 2026', type: 'Khung lương đa ngành', url: 'https://www.adecco.com/en-vn/salary-guide', reliability: 'Recruitment benchmark', useFor: 'Salary range, job category, hiring outlook', majorKeys: ['mkt', 'design', 'dev'] },
  { name: 'TopDev Vietnam IT Market 2024', type: 'Nhu cầu tuyển dụng IT', url: 'https://topdev.vn/vietnam-tech-talents-report-topdev-2024', reliability: 'Tech hiring report', useFor: 'AI, cloud, data, cybersecurity demand', majorKeys: ['dev'] },
  { name: 'VietnamWorks HR Insider', type: 'Tuyển dụng & hành vi ứng viên', url: 'https://www.vietnamworks.com/hrinsider/', reliability: 'Job market media', useFor: 'Candidate behavior and employer demand', majorKeys: ['mkt', 'design', 'dev'] },
  { name: 'LinkedIn Jobs on the Rise', type: 'Vai trò tăng trưởng toàn cầu', url: 'https://www.linkedin.com/pulse/topics/jobs-c1/job-search-c27/jobs-on-the-rise-t6975/', reliability: 'Global trend signal', useFor: 'Emerging roles and cross-market skill signals', majorKeys: ['mkt', 'design', 'dev'] },
  { name: 'Nielsen Norman Group UX Research', type: 'UX/Product evidence', url: 'https://www.nngroup.com/articles/', reliability: 'UX research reference', useFor: 'UX method, usability, design evidence quality', majorKeys: ['design'] }
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

const marketResearchBriefByMajor = {
  dev: {
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
  },
  mkt: {
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
  },
  design: {
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
  const majorKey = currentMajor?.key || challenge?.majorKey || 'dev';
  const primary = String(payload.primaryLink || '').trim();
  const secondary = String(payload.secondaryLink || '').trim();
  const tertiary = String(payload.tertiaryLink || '').trim();
  const skills = splitSkillInput(payload.skills);
  const noteLength = String(payload.notes || '').trim().length;

  let primaryCheck = { ok: false, label: '', detail: '' };
  let secondaryCheck = { ok: true, label: '', detail: '' };
  let tertiaryCheck = { ok: true, label: '', detail: '' };

  if (majorKey === 'dev') {
    const isGithub = isValidHttpUrl(primary) && (primary.includes('github.com') || primary.includes('gitlab.com'));
    primaryCheck = {
      key: 'primaryLink',
      label: 'Repository GitHub / GitLab (Bắt buộc)',
      ok: isGithub || isValidHttpUrl(primary),
      detail: isGithub ? 'Link repository GitHub/GitLab hợp lệ để mentor xem mã nguồn và kiến trúc.' : isValidHttpUrl(primary) ? 'Đã có URL repository code.' : 'Vui lòng điền link GitHub/GitLab (http/https).'
    };
    secondaryCheck = {
      key: 'secondaryLink',
      label: 'Live Demo URL (Khuyến khích)',
      ok: !secondary || isValidHttpUrl(secondary),
      detail: secondary ? (isValidHttpUrl(secondary) ? 'Link demo chạy thực tế (Vercel/Render/Netlify) hợp lệ.' : 'Link demo không đúng định dạng URL.') : 'Tùy chọn: Thêm link demo live để mentor trải nghiệm ngay.'
    };
    tertiaryCheck = {
      key: 'tertiaryLink',
      label: 'API Docs / Swagger (Tùy chọn)',
      ok: !tertiary || isValidHttpUrl(tertiary),
      detail: tertiary ? 'Có tài liệu API / Swagger docs.' : 'Tùy chọn: Link Swagger, Postman docs hoặc README API.'
    };
  } else if (majorKey === 'mkt') {
    const isSlide = isValidHttpUrl(primary);
    primaryCheck = {
      key: 'primaryLink',
      label: 'Pitch Deck / Slide Chiến dịch (Bắt buộc)',
      ok: isSlide,
      detail: isSlide ? 'Link Google Slides / Canva / Presentation hợp lệ.' : 'Vui lòng điền link Pitch Deck chiến dịch (Google Slides/Drive URL).'
    };
    secondaryCheck = {
      key: 'secondaryLink',
      label: 'Kế hoạch chiến dịch chi tiết (Khuyến khích)',
      ok: !secondary || isValidHttpUrl(secondary),
      detail: secondary ? (isValidHttpUrl(secondary) ? 'Link Google Docs / Notion kế hoạch chiến dịch hợp lệ.' : 'Link kế hoạch không đúng định dạng URL.') : 'Tùy chọn: Link Google Docs kế hoạch chi tiết.'
    };
    tertiaryCheck = {
      key: 'tertiaryLink',
      label: 'Bảng KPI & Analytics Dashboard (Tùy chọn)',
      ok: !tertiary || isValidHttpUrl(tertiary),
      detail: tertiary ? 'Có bảng số liệu đo lường Looker Studio / Sheets.' : 'Tùy chọn: Link Google Sheets đo lường chỉ số hoặc Looker Studio.'
    };
  } else {
    // Design
    const isFigma = isValidHttpUrl(primary) && (primary.includes('figma.com') || primary.includes('behance.net'));
    primaryCheck = {
      key: 'primaryLink',
      label: 'File thiết kế Figma (Bắt buộc)',
      ok: isFigma || isValidHttpUrl(primary),
      detail: isFigma ? 'Link Figma file / canvas hợp lệ để mentor xem component và flow.' : isValidHttpUrl(primary) ? 'Đã có link thiết kế (khuyến khích dùng figma.com).' : 'Vui lòng dán link file thiết kế Figma (figma.com).'
    };
    secondaryCheck = {
      key: 'secondaryLink',
      label: 'Interactive Prototype (Khuyến khích)',
      ok: !secondary || isValidHttpUrl(secondary),
      detail: secondary ? (isValidHttpUrl(secondary) ? 'Link prototype bấm được (Figma proto / Framer).' : 'Link prototype không đúng định dạng URL.') : 'Tùy chọn: Link prototype có thể tương tác.'
    };
    tertiaryCheck = {
      key: 'tertiaryLink',
      label: 'Case Study chi tiết (Tùy chọn)',
      ok: !tertiary || isValidHttpUrl(tertiary),
      detail: tertiary ? 'Có link Behance / Notion / Drive case study.' : 'Tùy chọn: Link case study phân tích bài toán UX.'
    };
  }

  const skillCheck = {
    key: 'skills',
    label: 'Khai báo kỹ năng chuyên môn',
    ok: skills.length >= 2,
    detail: skills.length >= 2 ? `${skills.length} kỹ năng chuyên ngành được ghi nhận.` : 'Nhập ít nhất 2 kỹ năng chuyên ngành (ví dụ: React, API, UX).'
  };

  const noteCheck = {
    key: 'notes',
    label: 'Ghi chú nghiệp vụ thực tế',
    ok: noteLength >= 20,
    detail: noteLength >= 20 ? 'Ghi chú nghiệp vụ đủ để mentor nắm bối cảnh và trade-offs.' : 'Mô tả ngắn ít nhất 20 ký tự về bài toán nghiệp vụ đã xử lý.'
  };

  const checks = [primaryCheck, secondaryCheck, tertiaryCheck, skillCheck, noteCheck];
  return {
    checks,
    errors: checks.filter((item) => !item.ok),
    score: Math.round((checks.filter((item) => item.ok).length / checks.length) * 100),
    skills
  };
}

function matchMentorForChallenge(challenge, mentors = []) {
  const challengeMajor = challenge?.majorKey;
  const normalizedTrack = String(challenge?.track || '').toLowerCase();
  const normalizedMentor = String(challenge?.mentor || '').toLowerCase();

  // 1. Direct ID / Name match
  const byId = mentors.find((mentor) => mentor.id === challenge?.mentorId);
  if (byId) return byId;

  const byName = mentors.find((mentor) => String(mentor.name || '').toLowerCase() === normalizedMentor);
  if (byName) return byName;

  // 2. Track & Major match
  const byMajorAndTrack = mentors.find((mentor) => {
    const majorMatch = !challengeMajor || mentor.majorKey === challengeMajor;
    const trackMatch = (mentor.expertise ?? []).some((item) => {
      const expertise = String(item).toLowerCase();
      return expertise === normalizedTrack || expertise.includes(normalizedTrack) || normalizedTrack.includes(expertise);
    });
    return majorMatch && trackMatch;
  });
  if (byMajorAndTrack) return byMajorAndTrack;

  // 3. Major match fallback
  const byMajor = mentors.find((mentor) => mentor.majorKey === challengeMajor);
  if (byMajor) return byMajor;

  // 4. Default mentor
  return mentors.find((mentor) => String(mentor.role || '').toLowerCase() === 'mentor')
    ?? { id: 'mentor-auto', name: challenge?.mentor || 'Mentor Demo', expertise: [challenge?.track].filter(Boolean), currentCompany: 'Đại học FPT & Doanh nghiệp đối tác' };
}

function App() {
  const [qrModalPlan, setQrModalPlan] = useState(null);
  const [isVipModalOpen, setIsVipModalOpen] = useState(false);
  const [footerModalData, setFooterModalData] = useState(null);
  const [page, setPage] = useState('home');
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
  const [cvResultData, setCvResultData] = useState(null);
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
      student: ['home', 'learning', 'pricing', 'about', 'roadmap', 'trends', 'hub', 'join', 'submit', 'feedback', 'portfolio', 'submissionHistory', 'premium'],
      mentor: ['mentor', 'home', 'learning', 'pricing', 'about', 'roadmap', 'trends'],
      admin: ['admin', 'home', 'learning', 'pricing', 'about', 'roadmap', 'trends']
    };
    const publicPages = ['home', 'learning', 'pricing', 'about', 'roadmap', 'trends', 'hub', 'portfolio', 'auth'];
    if (!currentUser && !publicPages.includes(page)) {
      setPage('home');
      return;
    }
    if (currentUser && page === 'auth') {
      setPage(activeRole === 'student' ? 'roadmap' : activeRole);
      return;
    }
    if (currentUser && !rolePages[activeRole]?.includes(page)) {
      setPage(activeRole === 'student' ? 'home' : activeRole);
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
      <Header
        page={page}
        go={go}
        currentUser={currentUser}
        theme={theme}
        setTheme={setTheme}
        logout={logout}
        loginAs={loginAs}
        onOpenQrPayment={() => setIsVipModalOpen(true)}
      />
      <VipUpgradeModal
        isOpen={isVipModalOpen || Boolean(qrModalPlan)}
        onClose={() => {
          setIsVipModalOpen(false);
          setQrModalPlan(null);
        }}
        initialPlan={qrModalPlan || premiumPlans[1]}
        currentUser={currentUser}
        onPaymentSuccess={(plan) => {
          upgradePlan(plan);
          alert(`🎉 Chúc mừng bạn đã nâng cấp thành công gói ${plan.name}! Quyền lợi Mentor Review và Chat 1-on-1 đã được kích hoạt.`);
        }}
      />
      <FooterDetailModal
        isOpen={Boolean(footerModalData)}
        onClose={() => setFooterModalData(null)}
        data={footerModalData}
        go={go}
        onOpenUpgrade={() => {
          setFooterModalData(null);
          setIsVipModalOpen(true);
        }}
      />
      <main>
        {flowNotice && <div className="flow-notice status-banner warning"><ShieldCheck size={17} /> {flowNotice}</div>}
        {page === 'home' && (
          <HomePage
            go={go}
            onOpenUpgrade={() => setIsVipModalOpen(true)}
            onOpenFooterModal={(key) => setFooterModalData(getFooterModalContent(key))}
          />
        )}
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
        {page === 'learning' && <LearningPage go={go} />}
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
        {page === 'feedback' && <MentorFeedbackPage go={go} challenge={selectedChallenge} submissions={submissionList} feedbackList={feedbackList} challenges={challengeList} userId={userId} mentors={appData.mentors ?? []} setSelectedChallengeId={setSelectedChallengeId} createFeedback={() => createFeedback(selectedChallenge.id, userId)} />}
        {page === 'portfolio' && <PortfolioPage pathRoles={pathRoles} currentMajor={currentMajor} go={go} demoUser={demoUser} apiStatus={apiStatus} submissions={submissionList} challenges={challengeList} updatePortfolio={updatePortfolio} updateStudentProfile={updateStudentProfile} isPremium={isPremium} autoOpenPublicPortfolio={autoOpenPublicPortfolio} onPublicPortfolioOpened={() => setAutoOpenPublicPortfolio(false)} />}
        {page === 'submissionHistory' && <SubmissionHistoryPage demoUser={demoUser} submissions={submissionList} challenges={challengeList} feedbackList={feedbackList} setSelectedChallengeId={setSelectedChallengeId} go={go} />}
        {(page === 'premium' || page === 'pricing') && (
          <PremiumPage
            plans={premiumPlans}
            activeSubscription={activeSubscription}
            upgradePlan={upgradePlan}
            onOpenQr={(p) => {
              setQrModalPlan(p);
              setIsVipModalOpen(true);
            }}
            go={go}
          />
        )}
        {page === 'about' && (
          <AboutPage
            go={go}
            onOpenUpgrade={() => setIsVipModalOpen(true)}
            onOpenFooterModal={(key) => setFooterModalData(getFooterModalContent(key))}
          />
        )}
        {page === 'mentor' && <MentorPage apiStatus={apiStatus} data={managementData} currentUser={currentUser} refreshData={refreshData} createFeedback={createFeedback} updateSubmissionFromMentor={updateSubmissionFromMentor} setNotice={setAdminNotice} notice={adminNotice} />}
        {page === 'admin' && <AdminPage apiStatus={apiStatus} data={managementData} notice={adminNotice} currentUser={currentUser} refreshData={refreshData} setAdminNotice={setAdminNotice} createFeedback={createFeedback} />}
      </main>
    </div>
  );
}

function Header({ page, go, currentUser, theme, setTheme, logout, loginAs, onOpenQrPayment }) {
  const [accountOpen, setAccountOpen] = useState(false);
  const [demoMenuOpen, setDemoMenuOpen] = useState(false);
  const currentRole = currentUser?.type ?? currentUser?.user?.role;
  const userPlan = currentUser?.user?.subscription?.planName || 'Free';
  const isVipOrPro = userPlan.toLowerCase().includes('pro') || userPlan.toLowerCase().includes('vip') || userPlan.toLowerCase().includes('premium');

  const studentNav = [
    { id: 'home', label: 'Trang chủ', icon: Compass, target: 'home' },
    { id: 'roadmap', label: 'Bản đồ nghề', icon: LayoutDashboard, target: 'roadmap' },
    { id: 'trends', label: 'Xu hướng', icon: BarChart2, target: 'trends' },
    { id: 'hub', label: 'Thử thách', icon: Rocket, target: 'hub' },
    { id: 'submit', label: 'Nộp bài', icon: FileUp, target: 'submit' },
    { id: 'feedback', label: 'Góp ý Mentor', icon: MessageSquareText, target: 'feedback' },
    { id: 'portfolio', label: 'Hồ sơ Portfolio', icon: UserRound, target: 'portfolio' },
    { id: 'learning', label: 'Học liệu FPT', icon: GraduationCap, target: 'learning' },
    { id: 'pricing', label: 'Gói Premium', icon: Crown, target: 'pricing' }
  ];

  const publicNav = [
    { id: 'home', label: 'Trang chủ', icon: Compass, target: 'home' },
    { id: 'roadmap', label: 'Bản đồ nghề', icon: LayoutDashboard, target: 'roadmap' },
    { id: 'trends', label: 'Xu hướng thị trường', icon: BarChart2, target: 'trends' },
    { id: 'hub', label: 'Thử thách dự án', icon: Rocket, target: 'hub' },
    { id: 'portfolio', label: 'Hồ sơ Portfolio', icon: UserRound, target: 'portfolio' },
    { id: 'learning', label: 'Học liệu FPT', icon: GraduationCap, target: 'learning' },
    { id: 'pricing', label: 'Gói Premium', icon: Crown, target: 'pricing' },
    { id: 'about', label: 'Về chúng tôi', icon: BookOpen, target: 'about' }
  ];

  const mentorNav = [
    { id: 'mentor', label: 'Mentor Workspace', icon: GraduationCap, target: 'mentor' },
    { id: 'portfolio', label: 'Duyệt Portfolio SV', icon: UserRound, target: 'portfolio' },
    { id: 'hub', label: 'Kho thử thách', icon: Rocket, target: 'hub' },
    { id: 'learning', label: 'Học liệu FPT', icon: GraduationCap, target: 'learning' },
    { id: 'home', label: 'Trang chủ', icon: Compass, target: 'home' }
  ];

  const adminNav = [
    { id: 'admin', label: 'Admin Workspace', icon: ShieldCheck, target: 'admin' },
    { id: 'portfolio', label: 'Quản lý Portfolio', icon: UserRound, target: 'portfolio' },
    { id: 'learning', label: 'Học liệu FPT', icon: GraduationCap, target: 'learning' },
    { id: 'home', label: 'Trang chủ', icon: Compass, target: 'home' }
  ];

  const currentNav = currentRole === 'student' ? studentNav : currentRole === 'mentor' ? mentorNav : currentRole === 'admin' ? adminNav : publicNav;

  const roleBadgeLabel = currentUser
    ? `${currentUser.user?.name || 'Sinh viên'} (${(currentUser.user?.selectedMajorKey || 'SE').toUpperCase()})`
    : 'Guest';

  return (
    <header className="topbar">
      <button className="brand" onClick={() => go('home')} aria-label="Portfolio Trang chủ">
        <Rocket size={22} color="#0284c7" />
        <span style={{ fontWeight: 800, fontSize: '18px', color: 'inherit', letterSpacing: '-0.5px' }}>Portfolio</span>
        <span style={{ fontSize: '10px', background: 'linear-gradient(135deg, #0284c7, #6366f1)', color: '#fff', padding: '2px 8px', borderRadius: '999px', fontWeight: 700, letterSpacing: '0.5px' }}>FPT HUB</span>
      </button>

      <nav className="flow-nav role-nav" aria-label="Điều hướng chính">
        {currentNav.map((item) => {
          const Icon = item.icon;
          const isActive = page === item.id || item.target === page;
          return (
            <button
              type="button"
              key={item.id}
              className={`flow-pill ${isActive ? 'active' : ''}`}
              onClick={() => go(item.target)}
            >
              <Icon size={15} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="topbar-actions">
        {!currentUser && (
          <>
            <div style={{ position: 'relative' }}>
              <button
                type="button"
                className="ghost-action compact"
                onClick={() => setDemoMenuOpen((o) => !o)}
                title="Chọn tài khoản demo 1-click"
                style={{ fontSize: '13px', fontWeight: 600 }}
              >
                🎓 Thử Demo <MoveDown size={12} />
              </button>
              {demoMenuOpen && (
                <div className="nav-dropdown" style={{ minWidth: '220px', right: 0, left: 'auto', transform: 'none' }} onClick={(e) => e.stopPropagation()}>
                  <button type="button" className="nav-dropdown-item" onClick={() => { setDemoMenuOpen(false); loginAs('student', { email: 'quang.se@fpt.edu.vn', password: '123456' }); }}>
                    <Rocket size={14} /> <span>SV SE: Quang Nguyễn</span>
                  </button>
                  <button type="button" className="nav-dropdown-item" onClick={() => { setDemoMenuOpen(false); loginAs('student', { email: 'khanh.mkt@fpt.edu.vn', password: '123456' }); }}>
                    <Rocket size={14} /> <span>SV MKT: Khánh Trần</span>
                  </button>
                  <button type="button" className="nav-dropdown-item" onClick={() => { setDemoMenuOpen(false); loginAs('student', { email: 'oanh.dg@fpt.edu.vn', password: '123456' }); }}>
                    <Rocket size={14} /> <span>SV GD: Oanh Đỗ</span>
                  </button>
                  <button type="button" className="nav-dropdown-item" onClick={() => { setDemoMenuOpen(false); loginAs('mentor'); }}>
                    <GraduationCap size={14} /> <span>Mentor Doanh nghiệp</span>
                  </button>
                  <button type="button" className="nav-dropdown-item" onClick={() => { setDemoMenuOpen(false); loginAs('admin'); }}>
                    <ShieldCheck size={14} /> <span>Admin Quản trị</span>
                  </button>
                </div>
              )}
            </div>

            <button className="login-chip" type="button" onClick={() => go('auth')} title="Đăng nhập tài khoản thật">
              <LockKeyhole size={14} />
              <span>Đăng nhập</span>
            </button>
          </>
        )}

        {currentUser && (
          <div style={{ position: 'relative' }}>
            <button className="role-chip" type="button" onClick={() => setAccountOpen((open) => !open)}>
              <UserRound size={15} />
              <span>{roleBadgeLabel}</span>
              <span style={{ fontSize: '10px', background: isVipOrPro ? '#10b981' : '#64748b', color: '#fff', padding: '1px 6px', borderRadius: '4px', textTransform: 'uppercase' }}>
                {userPlan}
              </span>
              <MoveDown size={12} />
            </button>

            {accountOpen && (
              <div className="nav-dropdown account-dropdown" onClick={(e) => e.stopPropagation()}>
                {currentRole === 'student' && (
                  <>
                    <button type="button" className="nav-dropdown-item" onClick={() => { setAccountOpen(false); go('portfolio'); }}>
                      <UserRound size={14} /> <span>Hồ sơ Portfolio</span>
                    </button>
                    <button type="button" className="nav-dropdown-item" onClick={() => { setAccountOpen(false); go('submissionHistory'); }}>
                      <FileUp size={14} /> <span>Lịch sử nộp bài</span>
                    </button>
                    <button type="button" className="nav-dropdown-item" onClick={() => { setAccountOpen(false); onOpenQrPayment?.(); }}>
                      <Crown size={14} color="#f59e0b" /> <span>Quét QR Nâng cấp VIP</span>
                    </button>
                  </>
                )}
                <button type="button" className="nav-dropdown-item danger" onClick={() => { setAccountOpen(false); logout(); }}>
                  <LogOut size={14} /> <span>Đăng xuất</span>
                </button>
              </div>
            )}
          </div>
        )}

        <button
          className="theme-toggle"
          type="button"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          title={theme === 'dark' ? 'Chuyển sang Light mode' : 'Chuyển sang Dark mode'}
        >
          {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
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
  const research = marketResearchBriefByMajor[currentMajor.key] ?? marketResearchBriefByMajor.dev;
  const updatedLabel = getMarketUpdatedLabel();
  const sourcePreview = trustedMarketSources.filter((source) => source.majorKeys?.includes(currentMajor.key));
  const sourceByName = Object.fromEntries(trustedMarketSources.map((source) => [source.name, source]));
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

      <div className="research-brief-grid">
        <article className="research-method-card">
          <p className="mono-label">Research question</p>
          <h2>{research.researchQuestion}</h2>
          <strong>Kết luận analyst</strong>
          <p>{research.analystConclusion}</p>
          <div className="method-list">
            {research.methodology.map((item) => (
              <span key={item}><ShieldCheck size={15} /> {item}</span>
            ))}
          </div>
        </article>
      </div>

      <div className="research-finding-grid">
        {research.findings.map((finding, index) => (
          <article className="research-finding-card" key={finding.claim}>
            <b>{String(index + 1).padStart(2, '0')}</b>
            <div>
              <h3>{finding.claim}</h3>
              <p>{finding.evidence}</p>
              <div className="source-badge-row">
                {finding.sources.map((name) => {
                  const source = sourceByName[name];
                  return source ? (
                    <a href={source.url} target="_blank" rel="noreferrer" key={name}>{name}</a>
                  ) : (
                    <span key={name}>{name}</span>
                  );
                })}
              </div>
            </div>
          </article>
        ))}
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

      <div className="analyst-action-grid">
        <article className="trend-reasoning-card">
          <p className="mono-label">Khuyến nghị hành động</p>
          {research.implications.map((item) => (
            <div className="activity-row" key={item}><Check size={15} /><span>{item}</span></div>
          ))}
        </article>
        <article className="trend-reasoning-card warning">
          <p className="mono-label">Rủi ro khi diễn giải</p>
          {research.riskNotes.map((item) => (
            <div className="activity-row" key={item}><Sparkles size={15} /><span>{item}</span></div>
          ))}
        </article>
      </div>

      <div className="source-grid">
        {sourcePreview.map((source) => (
          <a className="source-card" href={source.url} target="_blank" rel="noreferrer" key={source.name}>
            <span>{source.type}</span>
            <strong>{source.name}</strong>
            <p>{source.useFor}</p>
            <small>{source.reliability}</small>
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

function AboutPage({ go, onOpenUpgrade, onOpenFooterModal }) {
  const companyStats = [
    { value: '238/300', label: 'KPI người dùng', note: 'Giai đoạn 1: Đã đạt 79.3% KPI 200-300 Sinh viên' },
    { value: '2 đối tác', label: 'Nguồn học liệu chính quy', note: 'Giáo trình & Đề án chuẩn từ Đại học FPT, Coursera & AWS Academy' },
    { value: '2 loại', label: 'Mentor Review Flow', note: '🤖 Mentor AI tự động & 👨‍🏫 Mentor Thật 1-on-1' },
    { value: '2 quy chuẩn', label: 'Hình thức Review', note: 'Nộp CV / Link bài tập HOẶC Chat trực tiếp với Mentor' }
  ];

  const universityPartners = [
    { school: 'Đại học FPT', field: 'Software Engineering & AI/Data', code: 'PRN231, SWP391, SEP490' },
    { school: 'Coursera (Google)', field: 'Google Professional Certificates & IT Automation', code: 'COURSERA-G01' },
    { school: 'Coursera (Meta)', field: 'Meta Front-End & Back-End Developer Specialization', code: 'COURSERA-META' },
    { school: 'Coursera (DeepLearning.AI)', field: 'Machine Learning & Generative AI Specialization', code: 'COURSERA-AI' },
    { school: 'AWS Academy', field: 'Cloud Architecting & Serverless Development', code: 'AWS-ACADEMY' }
  ];

  const initialStudentReviews = [
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

  const [studentReviews, setStudentReviews] = useState(initialStudentReviews);
  const [newReviewForm, setNewReviewForm] = useState({
    name: '',
    school: 'Đại học FPT TP.HCM',
    major: 'Software Engineering',
    roleTrack: 'Developer',
    rating: 5,
    outcome: '',
    quote: ''
  });
  const [submitSuccessNotice, setSubmitSuccessNotice] = useState('');

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!newReviewForm.name.trim() || !newReviewForm.quote.trim()) return;

    const colors = ['#8b5cf6', '#ec4899', '#10b981', '#f59e0b', '#38bdf8', '#06b6d4'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    const createdReview = {
      id: `rev-${Date.now()}`,
      name: newReviewForm.name,
      school: newReviewForm.school,
      major: newReviewForm.major,
      roleTrack: newReviewForm.roleTrack,
      rating: Number(newReviewForm.rating),
      avatarBg: randomColor,
      outcome: newReviewForm.outcome ? `✨ ${newReviewForm.outcome}` : '⭐ Đã hoàn thành lộ trình & được Mentor chứng nhận',
      quote: newReviewForm.quote,
      date: new Date().toLocaleDateString('vi-VN')
    };

    setStudentReviews([createdReview, ...studentReviews]);
    setNewReviewForm({ name: '', school: 'Đại học FPT TP.HCM', major: 'Software Engineering', roleTrack: 'Developer', rating: 5, outcome: '', quote: '' });
    setSubmitSuccessNotice('Cảm ơn bạn! Đánh giá cảm nhận của bạn đã được in lên website công khai.');
  };

  const operatingPrinciples = [
    'KPI giai đoạn 1: Thu hút 200-300 người dùng sinh viên năng nổ tham gia xây dựng Portfolio.',
    'Nguồn tài liệu học tập được đối soát chuẩn giáo trình, bài giảng và đề án tốt nghiệp từ các trường Đại học.',
    'Phân loại rõ ràng: Trình độ (Intern, Junior, Mid-level, Senior, Lead), Loại tài khoản (Student, Mentor AI, Mentor Thật, Admin), và Trạng thái Trả phí (Free vs Premium Pro).',
    'Quy chuẩn Mentor Review 2 hình thức: Nộp CV / Link bài tập HOẶC Chat trực tiếp 1-on-1 với Mentor.',
    'Minh bạch trả tiền Mentor: Thù lao theo bài review (150,000 VND/bài) + Thưởng theo điểm chấm từ sinh viên (+15% đến +25%).',
    'Sàng lọc & loại bỏ Mentor: Người dùng trả phí có quyền đánh giá mentor (1-5 sao). Mentor bị đánh giá thấp (<3.5★) hoặc tiêu cực sẽ bị đưa vào sàng lọc, quá thấp (<3.0★) sẽ loại khỏi hệ thống.',
    'Phân luồng chấm điểm song song: Mentor AI chấm tự động 0s (Checklist 0-100) vs Mentor Thật chấm chuyên sâu 1-on-1.'
  ];

  return (
    <section className="content-page about-page">
      <div className="about-hero">
        <p className="mono-label">About Portfolio Career Tech</p>
        <h1>Kết nối sinh viên và chuyên gia qua lộ trình thử thách & nguồn tài liệu trường Đại học.</h1>
        <p>Portfolio là nền tảng career-tech chuẩn hóa lộ trình nghề nghiệp cho sinh viên. Chúng tôi tích hợp giáo trình từ các Trường Đại học hàng đầu, phân luồng chấm điểm Mentor AI & Mentor Thật, cùng cơ chế đánh giá và trả thù lao mentor minh bạch.</p>

        <div className="kpi-highlight-banner">
          <div className="kpi-badge"><Rocket size={18} /> <span>Mục tiêu KPI Giai đoạn 1</span></div>
          <div className="kpi-info">
            <strong>Thu hút 200 - 300 Người Dùng Sinh Viên</strong>
            <p>Hiện tại: 238 / 300 sinh viên đã đăng ký và tham gia làm bài (Đạt 79.3% KPI target).</p>
            <div className="kpi-progress-bar">
              <div className="kpi-progress-fill" style={{ width: '79.3%' }}></div>
            </div>
          </div>
        </div>

        <div className="submit-actions">
          <button className="primary-action" onClick={() => go('roadmap')}><Compass size={17} /> Khám phá bản đồ nghề</button>
          <button className="ghost-action" onClick={() => go('hub')}><LayoutDashboard size={17} /> Xem thử thách portfolio</button>
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
          <p className="mono-label">Nguồn tài liệu trường đại học</p>
          <h2>Giáo trình & Đề án chuẩn từ các trường ĐH hàng đầu.</h2>
          <p>Mỗi thử thách và lộ trình học tập trên nền tảng được biên soạn tham chiếu từ giáo trình, bài giảng và đề án tốt nghiệp xuất sắc của các Trường Đại học uy tín:</p>
          <div className="university-partner-list">
            {universityPartners.map((item) => (
              <div className="activity-row" key={item.school}>
                <GraduationCap size={16} />
                <span><b>{item.school}</b> - {item.field} ({item.code})</span>
              </div>
            ))}
          </div>
        </article>

        <article className="about-card">
          <p className="mono-label">Phân luồng Mentor AI & Mentor Thật</p>
          <h2>Quy chuẩn Review bài & Đánh giá chất lượng.</h2>
          <div className="activity-row"><Sparkles size={15} /><span><b>Mentor AI (Tự động):</b> Kiểm tra link, checklist 0-100 điểm, gợi ý ngay trong 0s.</span></div>
          <div className="activity-row"><GraduationCap size={15} /><span><b>Mentor Thật (Chuyên gia):</b> Review CV, chấm điểm chuyên sâu & Chat trực tiếp 1-on-1.</span></div>
          <div className="activity-row"><Crown size={15} /><span><b>Tài khoản Trả phí (Premium):</b> Mở khóa Mentor Thật review 1-on-1 & Quyền chấm điểm Mentor.</span></div>
          <div className="activity-row"><Star size={15} /><span><b>Thưởng & Sàng lọc Mentor:</b> Thưởng +15-25% thù lao nếu điểm cao (&gt;=4.5★); Cảnh báo / Loại mentor nếu điểm thấp (&lt;3.5★).</span></div>
        </article>

        <article className="about-card">
          <p className="mono-label">Giải quyết trả tiền Mentor</p>
          <h2>Cơ chế Thù lao & Thưởng minh bạch cho Mentor.</h2>
          <p>Mentor nhận 150,000 VND / bài review thành công + Thưởng hiệu suất dựa trên đánh giá của sinh viên. Hệ thống tự động đối soát, tính bonus và thực hiện chuyển khoản thanh toán hàng kỳ.</p>
        </article>
      </div>

      <section className="user-testimonials-section">
        <div className="section-heading centered">
          <p className="mono-label">Cảm nhận từ người dùng & sinh viên</p>
          <h2>Những câu chuyện truyền cảm hứng từ sinh viên thực tế</h2>
          <p>Trải nghiệm thực tế từ sinh viên Đại học FPT và người học chứng chỉ Coursera đã hoàn thiện Portfolio và chinh phục nhà tuyển dụng.</p>
        </div>

        <div className="testimonials-grid">
          {studentReviews.map((rev) => (
            <article className="testimonial-card" key={rev.id}>
              <div className="testimonial-top">
                <div className="user-avatar" style={{ backgroundColor: rev.avatarBg }}>
                  {rev.name.split(' ').slice(-2).map((n) => n[0]).join('')}
                </div>
                <div className="user-meta">
                  <strong>{rev.name}</strong>
                  <span><GraduationCap size={13} /> {rev.school}</span>
                  <small>{rev.major} · {rev.roleTrack}</small>
                </div>
              </div>

              <div className="star-rating">
                {[...Array(rev.rating)].map((_, i) => (
                  <Star key={i} size={15} fill="#f59e0b" color="#f59e0b" />
                ))}
                <span className="review-date">{rev.date}</span>
              </div>

              <div className="outcome-pill">
                {rev.outcome}
              </div>

              <p className="testimonial-quote">
                "{rev.quote}"
              </p>
            </article>
          ))}
        </div>

        <div className="submit-user-review-box">
          <h3><MessageSquareText size={18} /> Chia sẻ cảm nhận của bạn để truyền cảm hứng cho cộng đồng</h3>
          <p>Nếu bạn đã có trải nghiệm tuyệt vời khi học lộ trình hoặc được Mentor review, hãy viết cảm nhận của bạn để in lên website nhé!</p>
          
          <form className="user-review-form" onSubmit={handleReviewSubmit}>
            <div className="form-grid-2">
              <label>
                Họ và tên
                <input
                  required
                  placeholder="VD: Nguyễn Văn A"
                  value={newReviewForm.name}
                  onChange={(e) => setNewReviewForm({ ...newReviewForm, name: e.target.value })}
                />
              </label>
              <label>
                Trường Đại Học
                <select
                  value={newReviewForm.school}
                  onChange={(e) => setNewReviewForm({ ...newReviewForm, school: e.target.value })}
                >
                  <option value="Đại học Bách Khoa TP.HCM">Đại học Bách Khoa TP.HCM</option>
                  <option value="Đại học FPT">Đại học FPT</option>
                  <option value="Đại học Kinh tế UEH">Đại học Kinh tế UEH</option>
                  <option value="Đại học RMIT Vietnam">Đại học RMIT Vietnam</option>
                  <option value="Đại học KHTN TP.HCM">Đại học KHTN TP.HCM</option>
                  <option value="Trường Đại học khác">Trường Đại học khác</option>
                </select>
              </label>
            </div>

            <div className="form-grid-2">
              <label>
                Chuyên ngành & Năm học
                <input
                  placeholder="VD: Software Engineering (Năm 3)"
                  value={newReviewForm.major}
                  onChange={(e) => setNewReviewForm({ ...newReviewForm, major: e.target.value })}
                />
              </label>
              <label>
                Kết quả / Thành tựu đạt được
                <input
                  placeholder="VD: Pass vòng CV tại FPT Software / Nhận offer Intern"
                  value={newReviewForm.outcome}
                  onChange={(e) => setNewReviewForm({ ...newReviewForm, outcome: e.target.value })}
                />
              </label>
            </div>

            <label>
              Lời cảm nhận & Chia sẻ của bạn
              <textarea
                required
                rows={3}
                placeholder="Chia sẻ trải nghiệm làm thử thách, nhận feedback từ Mentor hoặc cách Portfolio đã giúp ích cho bạn..."
                value={newReviewForm.quote}
                onChange={(e) => setNewReviewForm({ ...newReviewForm, quote: e.target.value })}
              />
            </label>

            <button type="submit" className="primary-action">
              <Send size={16} /> Đăng cảm nhận lên Website
            </button>
            {submitSuccessNotice && <div className="status-banner">{submitSuccessNotice}</div>}
          </form>
        </div>
      </section>

      <article className="trend-reasoning-card">
        <p className="mono-label">Nguyên tắc vận hành & KPI tiêu chuẩn</p>
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
            <button type="button" onClick={onOpenUpgrade}>Gói Premium VIP</button>
          </div>
          <div>
            <p className="mono-label">Pháp lý & Quy chuẩn</p>
            <button type="button" style={{ background: 'none', border: 'none', padding: 0, color: 'inherit', font: 'inherit', textAlign: 'left', cursor: 'pointer' }} onClick={() => onOpenFooterModal?.('terms')}>Điều khoản sử dụng</button>
            <button type="button" style={{ background: 'none', border: 'none', padding: 0, color: 'inherit', font: 'inherit', textAlign: 'left', cursor: 'pointer' }} onClick={() => onOpenFooterModal?.('privacy')}>Chính sách bảo mật</button>
            <button type="button" style={{ background: 'none', border: 'none', padding: 0, color: '#f59e0b', font: 'inherit', textAlign: 'left', cursor: 'pointer', fontWeight: 700 }} onClick={() => onOpenFooterModal?.('mentor-rubric')}>Quy chuẩn Mentor Review & Trao thưởng</button>
          </div>
        </div>
      </footer>
    </section>
  );
}


/* ==========================================================================
   CUTE FOUNDER AVATAR SVG ILLUSTRATION COMPONENT
   ========================================================================== */
function CuteFounderAvatar({ id, name, role }) {
  // SVG avatar illustrations representing the 6 founders with cute, expressive styles
  if (id === 'founder-huy') {
    // Nguyễn Sỹ Huy - CEO
    return (
      <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="120" height="120" rx="20" fill="#1e293b"/>
        <circle cx="60" cy="52" r="28" fill="#fed7aa"/>
        {/* Hair: modern styled dark hair */}
        <path d="M34 46C34 30 46 22 62 22C76 22 86 28 86 42C86 45 83 45 81 40C77 30 70 28 60 28C48 28 42 34 38 46Z" fill="#18181b"/>
        <path d="M33 46C32 40 37 32 44 28C37 34 36 44 33 46Z" fill="#27272a"/>
        {/* Cool modern glasses */}
        <rect x="42" y="46" width="14" height="10" rx="3" stroke="#f59e0b" strokeWidth="2.5" fill="none"/>
        <rect x="64" y="46" width="14" height="10" rx="3" stroke="#f59e0b" strokeWidth="2.5" fill="none"/>
        <line x1="56" y1="51" x2="64" y2="51" stroke="#f59e0b" strokeWidth="2"/>
        {/* Eyes behind glasses */}
        <circle cx="49" cy="51" r="2" fill="#0f172a"/>
        <circle cx="71" cy="51" r="2" fill="#0f172a"/>
        {/* Cheerful confident smile */}
        <path d="M52 64C56 68 64 68 68 64" stroke="#e11d48" strokeWidth="2.5" strokeLinecap="round"/>
        {/* Blush */}
        <ellipse cx="40" cy="58" rx="4" ry="2.5" fill="#fda4af" opacity="0.6"/>
        <ellipse cx="80" cy="58" rx="4" ry="2.5" fill="#fda4af" opacity="0.6"/>
        {/* Body / Navy Hoodie with gold strings */}
        <path d="M28 110C28 88 42 80 60 80C78 80 92 88 92 110H28Z" fill="#0284c7"/>
        <path d="M52 80L50 96M68 80L70 96" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round"/>
        <path d="M54 80C54 84 66 84 66 80" stroke="#bae6fd" strokeWidth="2"/>
      </svg>
    );
  }
  if (id === 'founder-thiet') {
    // Bùi Văn Thiết - CTO
    return (
      <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="120" height="120" rx="20" fill="#0f172a"/>
        <circle cx="60" cy="52" r="28" fill="#fde68a"/>
        {/* Tech hair with stylish fade */}
        <path d="M35 44C35 26 48 20 60 20C74 20 85 27 85 44C78 30 70 26 58 26C45 26 38 34 35 44Z" fill="#09090b"/>
        {/* Headphones on head */}
        <path d="M32 50C32 34 44 26 60 26C76 26 88 34 88 50" stroke="#f59e0b" strokeWidth="3.5" strokeLinecap="round" fill="none"/>
        <rect x="29" y="46" width="6" height="14" rx="3" fill="#ea580c"/>
        <rect x="85" y="46" width="6" height="14" rx="3" fill="#ea580c"/>
        {/* Focused smiling eyes */}
        <circle cx="48" cy="50" r="2.5" fill="#18181b"/>
        <circle cx="72" cy="50" r="2.5" fill="#18181b"/>
        <path d="M53 63C57 67 63 67 67 63" stroke="#d97706" strokeWidth="2.5" strokeLinecap="round"/>
        <ellipse cx="41" cy="57" rx="3.5" ry="2" fill="#fbbf24" opacity="0.7"/>
        <ellipse cx="79" cy="57" rx="3.5" ry="2" fill="#fbbf24" opacity="0.7"/>
        {/* Tech Developer Dark Jacket */}
        <path d="M26 110C26 86 40 78 60 78C80 78 94 86 94 110H26Z" fill="#334155"/>
        <path d="M60 78V110" stroke="#0ea5e9" strokeWidth="2"/>
        <circle cx="44" cy="92" r="3" fill="#38bdf8"/>
      </svg>
    );
  }
  if (id === 'founder-linh') {
    // Lê Phương Linh - COO
    return (
      <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="120" height="120" rx="20" fill="#1e1b4b"/>
        {/* Long cute hair behind */}
        <path d="M32 50C32 75 34 98 42 105C46 100 48 85 48 70C48 50 72 50 72 70C72 85 74 100 78 105C86 98 88 75 88 50C88 30 76 22 60 22C44 22 32 30 32 50Z" fill="#78350f"/>
        <circle cx="60" cy="52" r="26" fill="#fef08a"/>
        {/* Front cute fringe/bangs */}
        <path d="M36 44C42 36 50 34 60 34C70 34 78 36 84 44C80 34 72 26 60 26C48 26 40 34 36 44Z" fill="#92400e"/>
        {/* Cute sparkling eyes with lashes */}
        <circle cx="48" cy="50" r="3" fill="#1e1b4b"/>
        <circle cx="50" cy="48" r="1" fill="#ffffff"/>
        <path d="M44 46L46 48" stroke="#1e1b4b" strokeWidth="1.5"/>
        <circle cx="72" cy="50" r="3" fill="#1e1b4b"/>
        <circle cx="74" cy="48" r="1" fill="#ffffff"/>
        <path d="M76 46L74 48" stroke="#1e1b4b" strokeWidth="1.5"/>
        {/* Sweet smile */}
        <path d="M53 62C57 66 63 66 67 62" stroke="#f43f5e" strokeWidth="2.5" strokeLinecap="round"/>
        {/* Pink cheeks */}
        <ellipse cx="42" cy="57" rx="4.5" ry="3" fill="#f43f5e" opacity="0.5"/>
        <ellipse cx="78" cy="57" rx="4.5" ry="3" fill="#f43f5e" opacity="0.5"/>
        {/* Cute star hair pin */}
        <circle cx="36" cy="38" r="3" fill="#f59e0b"/>
        {/* Coral/Amber professional blouse */}
        <path d="M28 110C28 88 42 78 60 78C78 78 92 88 92 110H28Z" fill="#f97316"/>
        <path d="M60 78L52 92H68L60 78Z" fill="#ffedd5"/>
      </svg>
    );
  }
  if (id === 'founder-ngoc') {
    // Lương Hồng Ngọc - CPO
    return (
      <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="120" height="120" rx="20" fill="#311042"/>
        {/* Soft wavy hair */}
        <path d="M30 52C28 72 32 94 40 102C44 95 45 80 45 68C45 52 75 52 75 68C75 80 76 95 80 102C88 94 92 72 90 52C90 32 78 22 60 22C42 22 30 32 30 52Z" fill="#4c1d95"/>
        <circle cx="60" cy="52" r="26" fill="#fde047"/>
        {/* Chic side bangs */}
        <path d="M35 42C44 32 54 30 64 30C74 30 82 34 85 42C80 30 70 24 58 24C46 24 38 32 35 42Z" fill="#581c87"/>
        {/* Bright designer eyes */}
        <circle cx="49" cy="50" r="3" fill="#3b0764"/>
        <circle cx="51" cy="48" r="1.2" fill="#ffffff"/>
        <circle cx="71" cy="50" r="3" fill="#3b0764"/>
        <circle cx="73" cy="48" r="1.2" fill="#ffffff"/>
        {/* Soft designer smile */}
        <path d="M53 62C57 66 63 66 67 62" stroke="#ec4899" strokeWidth="2.5" strokeLinecap="round"/>
        {/* Cheeks */}
        <ellipse cx="43" cy="57" rx="4" ry="2.5" fill="#f472b6" opacity="0.6"/>
        <ellipse cx="77" cy="57" rx="4" ry="2.5" fill="#f472b6" opacity="0.6"/>
        {/* Lavender creative blazer */}
        <path d="M28 110C28 88 42 78 60 78C78 78 92 88 92 110H28Z" fill="#8b5cf6"/>
        <path d="M60 78L50 95M60 78L70 95" stroke="#e9d5ff" strokeWidth="2"/>
      </svg>
    );
  }
  if (id === 'founder-giang') {
    // Tạ Thị Minh Giang - CMO
    return (
      <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="120" height="120" rx="20" fill="#042f2e"/>
        {/* Dynamic ponytail hair */}
        <circle cx="60" cy="52" r="26" fill="#fef08a"/>
        <path d="M34 46C34 28 46 22 60 22C74 22 86 28 86 46C82 32 72 26 60 26C48 26 38 32 34 46Z" fill="#1c1917"/>
        <path d="M78 28C88 24 98 32 94 48C90 42 86 36 78 28Z" fill="#292524"/>
        {/* Energetic eyes */}
        <circle cx="48" cy="50" r="2.8" fill="#0f172a"/>
        <circle cx="50" cy="48" r="1" fill="#ffffff"/>
        <circle cx="72" cy="50" r="2.8" fill="#0f172a"/>
        <circle cx="74" cy="48" r="1" fill="#ffffff"/>
        {/* Bright cheerful marketing smile */}
        <path d="M51 61C55 67 65 67 69 61" stroke="#059669" strokeWidth="2.5" strokeLinecap="round"/>
        <ellipse cx="42" cy="56" rx="4" ry="2.5" fill="#34d399" opacity="0.6"/>
        <ellipse cx="78" cy="56" rx="4" ry="2.5" fill="#34d399" opacity="0.6"/>
        {/* Teal growth marketer outfit */}
        <path d="M28 110C28 86 42 78 60 78C78 78 92 86 92 110H28Z" fill="#0d9488"/>
        <circle cx="60" cy="92" r="3" fill="#facc15"/>
      </svg>
    );
  }
  // Phạm Khắc Nghĩa - CFO
  return (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="120" height="120" rx="20" fill="#1e293b"/>
      <circle cx="60" cy="52" r="28" fill="#fed7aa"/>
      {/* Neat smart executive hair */}
      <path d="M36 44C36 28 48 22 62 22C74 22 84 27 84 42C80 30 72 26 62 26C50 26 42 32 36 44Z" fill="#27272a"/>
      {/* Smart finance glasses */}
      <rect x="42" y="47" width="14" height="9" rx="2.5" stroke="#0284c7" strokeWidth="2" fill="none"/>
      <rect x="64" y="47" width="14" height="9" rx="2.5" stroke="#0284c7" strokeWidth="2" fill="none"/>
      <line x1="56" y1="51.5" x2="64" y2="51.5" stroke="#0284c7" strokeWidth="1.5"/>
      <circle cx="49" cy="51.5" r="2" fill="#0f172a"/>
      <circle cx="71" cy="51.5" r="2" fill="#0f172a"/>
      {/* Friendly trustworthy smile */}
      <path d="M53 64C57 68 63 68 67 64" stroke="#0284c7" strokeWidth="2.5" strokeLinecap="round"/>
      <ellipse cx="40" cy="58" rx="3.5" ry="2" fill="#38bdf8" opacity="0.5"/>
      <ellipse cx="80" cy="58" rx="3.5" ry="2" fill="#38bdf8" opacity="0.5"/>
      {/* Finance Executive Suit & Tie */}
      <path d="M26 110C26 86 40 78 60 78C80 78 94 86 94 110H26Z" fill="#1e3a8a"/>
      <path d="M60 78L52 92H68L60 78Z" fill="#ffffff"/>
      <path d="M60 84L58 106L60 110L62 106L60 84Z" fill="#f59e0b"/>
    </svg>
  );
}

/* ==========================================================================
   FOUNDERS SECTION (NGƯỜI SÁNG LẬP)
   ========================================================================== */
function FoundersSection() {
  const foundersList = [
    {
      id: 'founder-huy',
      name: 'Nguyễn Sỹ Huy',
      role: 'CEO',
      roleFull: 'Chief Executive Officer',
      bio: 'Định hướng chiến lược & phát triển hệ sinh thái Portfolio sinh viên'
    },
    {
      id: 'founder-thiet',
      name: 'Bùi Văn Thiết',
      role: 'CTO',
      roleFull: 'Chief Technology Officer',
      bio: 'Kiến trúc sư hệ thống nền tảng, tích hợp AI & phân luồng chấm điểm'
    },
    {
      id: 'founder-linh',
      name: 'Lê Phương Linh',
      role: 'COO',
      roleFull: 'Chief Operating Officer',
      bio: 'Quản trị vận hành, quy chuẩn Mentor Review & kết nối doanh nghiệp'
    },
    {
      id: 'founder-ngoc',
      name: 'Lương Hồng Ngọc',
      role: 'CPO',
      roleFull: 'Chief Product Officer',
      bio: 'Thiết kế trải nghiệm người dùng, Bản đồ nghề & Trung tâm thử thách'
    },
    {
      id: 'founder-giang',
      name: 'Tạ Thị Minh Giang',
      role: 'CMO',
      roleFull: 'Chief Marketing Officer',
      bio: 'Chiến dịch thu hút 200-300 sinh viên & xây dựng cộng đồng FPT'
    },
    {
      id: 'founder-nghia',
      name: 'Phạm Khắc Nghĩa',
      role: 'CFO',
      roleFull: 'Chief Financial Officer',
      bio: 'Quản trị tài chính, các gói Premium & Quỹ thưởng thù lao Mentor'
    }
  ];

  return (
    <section className="jr-founders-section">
      <div className="jr-founders-badge">
        <Sparkles size={14} color="#f59e0b" />
        <span>ĐỘI NGŨ</span>
      </div>

      <h2 className="jr-founders-title">
        <span className="white-text">NGƯỜI</span>
        <span className="gold-text">SÁNG LẬP</span>
      </h2>

      <p className="jr-founders-subtitle">
        Những con người đam mê công nghệ và khát vọng khởi nghiệp
      </p>

      <div className="jr-founders-grid">
        {foundersList.map((founder) => (
          <div className="jr-founder-card" key={founder.id}>
            <div className="jr-founder-avatar-frame">
              <CuteFounderAvatar id={founder.id} name={founder.name} role={founder.role} />
            </div>
            <strong className="jr-founder-name">{founder.name}</strong>
            <span className="jr-founder-role">{founder.role}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ==========================================================================
   VIP UPGRADE MODAL (3 PLANS SELECTION & VIETQR PAYMENT FLOW)
   ========================================================================== */
function VipUpgradeModal({ isOpen, onClose, initialPlan, currentUser, onPaymentSuccess }) {
  const [step, setStep] = useState('select_plan'); // 'select_plan' | 'payment' | 'success'
  const [selectedPlan, setSelectedPlan] = useState(initialPlan || premiumPlans[1]);
  const [copyNotice, setCopyNotice] = useState('');

  useEffect(() => {
    if (initialPlan) {
      setSelectedPlan(initialPlan);
    }
    if (isOpen) {
      setStep('select_plan');
    }
  }, [initialPlan, isOpen]);

  if (!isOpen) return null;

  const studentMssv = currentUser?.user?.id || currentUser?.user?.mssv || 'SE174281';
  const studentName = currentUser?.user?.name || 'Sinh viên FPT';
  const planCode = (selectedPlan.id || 'PRO').replace('premium-', '').toUpperCase();
  const transferContent = `EXE301 ${planCode} ${studentMssv}`;
  const qrPrice = selectedPlan.price || 199000;
  const qrUrl = `https://img.vietqr.io/image/MB-0348888888-compact2.png?amount=${qrPrice}&addInfo=${encodeURIComponent(transferContent)}&accountName=EXE301%20FPT%20PORTFOLIO`;

  const copyToClipboard = (text, label) => {
    navigator.clipboard.writeText(text);
    setCopyNotice(`Đã sao chép ${label}!`);
    setTimeout(() => setCopyNotice(''), 2500);
  };

  const handleConfirmPaid = () => {
    setStep('success');
    onPaymentSuccess(selectedPlan);
  };

  return (
    <div className="vietqr-modal-overlay" onClick={onClose}>
      <div className="vip-upgrade-modal-card animate-in" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '18px' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#f59e0b', fontSize: '13px', fontWeight: 800, textTransform: 'uppercase', marginBottom: '4px' }}>
              <Crown size={17} color="#f59e0b" />
              <span>Nâng Cấp Tài Khoản VIP</span>
            </div>
            <h2 style={{ fontSize: '22px', fontWeight: 900, margin: 0, color: 'var(--jr-text-main, #0f172a)' }}>
              {step === 'select_plan' && 'Chọn Gói Đồng Hành Chuẩn Tuyển Dụng'}
              {step === 'payment' && `Thanh toán VietQR - ${selectedPlan.name}`}
              {step === 'success' && '🎉 Nâng Cấp VIP Thành Công!'}
            </h2>
          </div>
          <button type="button" onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b', padding: '6px' }}>
            <X size={22} />
          </button>
        </div>

        {/* STEP 1: CHỌN 1 TRONG 3 GÓI */}
        {step === 'select_plan' && (
          <div>
            <p style={{ color: '#64748b', fontSize: '14px', margin: '0 0 20px', lineHeight: 1.5 }}>
              Mở khóa toàn bộ kho thử thách thực tế FPT & Coursera, nhận review 1-on-1 từ Mentor doanh nghiệp và tự động tối ưu CV chuẩn ATS.
            </p>

            <div className="vip-plans-grid-v2">
              {premiumPlans.map((plan) => {
                const isSelected = selectedPlan.id === plan.id;
                return (
                  <div
                    key={plan.id}
                    className={`vip-plan-card-v2 ${isSelected ? 'active-selected' : ''}`}
                    onClick={() => setSelectedPlan(plan)}
                  >
                    {plan.badge && <span className="vip-plan-badge-top">{plan.badge}</span>}
                    <span style={{ fontSize: '12px', fontWeight: 700, color: '#f59e0b', textTransform: 'uppercase' }}>
                      {plan.highlight}
                    </span>
                    <h3 className="vip-plan-name-v2">{plan.name}</h3>
                    <div className="vip-plan-price-line">
                      <strong>{plan.displayPrice}</strong>
                      <span>/ {plan.duration}</span>
                    </div>
                    <p style={{ fontSize: '12.5px', color: '#64748b', margin: '0 0 12px', minHeight: '36px' }}>
                      {plan.description}
                    </p>

                    <div style={{ borderTop: '1px solid rgba(148, 163, 184, 0.2)', paddingTop: '12px' }}>
                      <strong style={{ fontSize: '12.5px', display: 'block', marginBottom: '8px' }}>Đặc quyền gói:</strong>
                      <ul className="vip-features-list-v2">
                        {plan.features.map((feat, idx) => (
                          <li key={idx}>
                            <CheckCircle2 size={15} color="#10b981" style={{ flexShrink: 0, marginTop: '2px' }} />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <button
                      type="button"
                      style={{
                        marginTop: 'auto',
                        width: '100%',
                        padding: '10px 14px',
                        borderRadius: '10px',
                        fontWeight: 800,
                        fontSize: '13.5px',
                        cursor: 'pointer',
                        border: isSelected ? 'none' : '1.5px solid rgba(245, 158, 11, 0.4)',
                        background: isSelected ? '#f59e0b' : 'transparent',
                        color: isSelected ? '#000' : 'var(--jr-text-main, #0f172a)'
                      }}
                      onClick={() => setSelectedPlan(plan)}
                    >
                      {isSelected ? '✓ Đang chọn gói này' : 'Chọn gói'}
                    </button>
                  </div>
                );
              })}
            </div>

            <div style={{ background: 'rgba(245, 158, 11, 0.08)', borderRadius: '14px', padding: '14px 18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <span style={{ fontSize: '13px', color: '#64748b' }}>Gói bạn chọn:</span>
                <strong style={{ marginLeft: '6px', fontSize: '16px', color: '#d97706' }}>
                  {selectedPlan.name} ({selectedPlan.displayPrice})
                </strong>
              </div>
              <button
                type="button"
                className="jr-btn-gold-action"
                style={{ padding: '10px 22px', fontSize: '14px' }}
                onClick={() => setStep('payment')}
              >
                Tiến hành thanh toán VietQR cho gói này <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: THANH TOÁN VIETQR THEO GÓI ĐÃ CHỌN */}
        {step === 'payment' && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
              <button
                type="button"
                className="ghost-action compact"
                onClick={() => setStep('select_plan')}
                style={{ padding: '6px 12px', fontSize: '12.5px' }}
              >
                ← Chọn lại gói khác
              </button>
              <span style={{ fontSize: '13px', color: '#64748b' }}>
                Đang xử lý thanh toán cho gói: <b>{selectedPlan.name}</b> ({selectedPlan.displayPrice})
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: '24px', alignItems: 'center' }}>
              <div style={{ textAlign: 'center' }}>
                <div className="vietqr-image-wrapper" style={{ margin: 0 }}>
                  <img src={qrUrl} alt="Mã VietQR Chuyển Khoản" />
                </div>
                <span style={{ display: 'block', fontSize: '12px', color: '#64748b', marginTop: '8px' }}>
                  Mở App Ngân hàng hoặc MoMo để quét mã
                </span>
              </div>

              <div>
                <table className="vietqr-details-table" style={{ margin: '0 0 16px' }}>
                  <tbody>
                    <tr>
                      <td>Ngân hàng thụ hưởng</td>
                      <td><b>MB Bank (Ngân hàng Quân Đội)</b></td>
                    </tr>
                    <tr>
                      <td>Số tài khoản</td>
                      <td>
                        <span style={{ fontFamily: 'monospace', fontWeight: 800, fontSize: '15px' }}>0348888888</span>
                        <button
                          type="button"
                          onClick={() => copyToClipboard('0348888888', 'STK')}
                          style={{ marginLeft: '8px', background: 'none', border: 'none', color: '#0284c7', cursor: 'pointer', fontSize: '12px', textDecoration: 'underline' }}
                        >
                          Sao chép
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td>Chủ tài khoản</td>
                      <td><b>EXE301 FPT PORTFOLIO</b></td>
                    </tr>
                    <tr>
                      <td>Gói cước</td>
                      <td><b>{selectedPlan.name} ({selectedPlan.duration})</b></td>
                    </tr>
                    <tr>
                      <td>Số tiền thanh toán</td>
                      <td style={{ color: '#059669', fontSize: '18px', fontWeight: 900 }}>
                        {selectedPlan.displayPrice}
                      </td>
                    </tr>
                    <tr>
                      <td>Nội dung chuyển khoản</td>
                      <td>
                        <span style={{ fontFamily: 'monospace', color: '#2563eb', fontWeight: 800, background: 'rgba(37,99,235,0.08)', padding: '2px 8px', borderRadius: '4px' }}>
                          {transferContent}
                        </span>
                        <button
                          type="button"
                          onClick={() => copyToClipboard(transferContent, 'Nội dung CK')}
                          style={{ marginLeft: '8px', background: 'none', border: 'none', color: '#0284c7', cursor: 'pointer', fontSize: '12px', textDecoration: 'underline' }}
                        >
                          Sao chép
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>

                {copyNotice && (
                  <div style={{ color: '#059669', fontSize: '13px', fontWeight: 700, marginBottom: '10px' }}>
                    ✓ {copyNotice}
                  </div>
                )}

                <div style={{ display: 'flex', gap: '10px', marginTop: '16px' }}>
                  <button type="button" className="ghost-action" onClick={() => setStep('select_plan')}>
                    Đổi gói cước
                  </button>
                  <button
                    type="button"
                    className="primary-action"
                    style={{ flex: 1, background: 'linear-gradient(135deg, #10b981, #059669)', border: 'none', color: '#fff', fontWeight: 800 }}
                    onClick={handleConfirmPaid}
                  >
                    <CheckCircle2 size={17} /> Tôi đã chuyển khoản thành công
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: THÀNH CÔNG */}
        {step === 'success' && (
          <div style={{ textAlign: 'center', padding: '24px 0' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#dcfce7', color: '#16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
              <CheckCircle2 size={36} />
            </div>
            <h3 style={{ fontSize: '22px', fontWeight: 900, margin: '0 0 10px', color: '#16a34a' }}>
              Chúc mừng bạn đã kích hoạt thành công {selectedPlan.name}!
            </h3>
            <p style={{ color: '#64748b', fontSize: '14.5px', maxWidth: '480px', margin: '0 auto 24px', lineHeight: 1.5 }}>
              Hệ thống đã cập nhật đặc quyền VIP cho tài khoản của bạn: Mở khóa quyền nộp bài nhận Mentor Review 1-on-1, đặt lịch chat trực tiếp và chứng thực Portfolio công khai.
            </p>
            <button
              type="button"
              className="jr-btn-gold-action"
              onClick={onClose}
              style={{ margin: '0 auto' }}
            >
              Bắt đầu trải nghiệm ngay
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

/* ==========================================================================
   FOOTER DETAIL MODAL CONTENT HELPER
   ========================================================================== */
function getFooterModalContent(key) {
  if (key === 'about') {
    return {
      category: 'Về chúng tôi',
      title: 'Giới Thiệu Nền Tảng Portfolio JobReady',
      subtitle: 'Dự án khởi nghiệp công nghệ giáo dục từ sinh viên EXE301 - Đại học FPT',
      body: (
        <div>
          <p style={{ lineHeight: 1.6 }}>
            <b>Portfolio JobReady</b> là nền tảng định hướng nghề nghiệp thực chiến và xây dựng hồ sơ năng lực dành cho sinh viên công nghệ thông tin, marketing và thiết kế đồ họa.
          </p>
          <div className="footer-rubric-box">
            <h4><Rocket size={17} /> Sứ Mệnh & KPI Giai Đoạn 1</h4>
            <p style={{ margin: 0, fontSize: '13.5px', lineHeight: 1.6 }}>
              Giải quyết bài toán lớn nhất của sinh viên đại học: <b>"Học xong lý thuyết nhưng thiếu sản phẩm thực tế có minh chứng năng lực và thiếu sự phản biện của chuyên gia"</b>. Mục tiêu dự án giai đoạn 1 là thu hút và đồng hành cùng <b>200 - 300 sinh viên</b> Đại học FPT và người học Coursera hoàn thiện Portfolio đạt chuẩn tuyển dụng doanh nghiệp.
            </p>
          </div>
          <h4 style={{ margin: '18px 0 8px', fontSize: '15px' }}>4 Trụ cột cốt lõi của nền tảng:</h4>
          <ul style={{ paddingLeft: '20px', lineHeight: 1.7, fontSize: '13.5px' }}>
            <li><b>Bản đồ nghề nghiệp tương tác:</b> Cung cấp lộ trình kỹ năng từ Junior đến Senior cho từng chuyên ngành.</li>
            <li><b>Trung tâm thử thách dự án:</b> Đề bài thực tế tham chiếu từ đồ án môn học FPT (SWP391, PRN231) và chứng chỉ Coursera (Google, Meta, AWS).</li>
            <li><b>Phân luồng Mentor 2 cấp độ:</b> Mentor AI chấm cú pháp tự động 0đ và Senior Mentor doanh nghiệp review 1:1 chuyên sâu.</li>
            <li><b>Trang Portfolio cá nhân chuẩn ATS:</b> URL công khai chứng thực kỹ năng, tích hợp CV chuẩn hóa và minh chứng sản phẩm.</li>
          </ul>
        </div>
      )
    };
  }

  if (key === 'contact') {
    return {
      category: 'Về chúng tôi',
      title: 'Thông Tin Liên Hệ & Hỗ Trợ Sinh Viên',
      subtitle: 'Đội ngũ phát triển EXE301 - Đại học FPT luôn sẵn sàng đồng hành cùng bạn',
      body: (
        <div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', margin: '14px 0 20px' }}>
            <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(148,163,184,0.2)', padding: '14px', borderRadius: '12px' }}>
              <strong style={{ display: 'block', color: '#0284c7', marginBottom: '4px' }}>Campus TP. Hồ Chí Minh</strong>
              <span style={{ fontSize: '13px', color: '#64748b' }}>Lô E2a-7, Đường D1, Khu Công nghệ cao, TP. Thủ Đức, TP.HCM</span>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(148,163,184,0.2)', padding: '14px', borderRadius: '12px' }}>
              <strong style={{ display: 'block', color: '#0284c7', marginBottom: '4px' }}>Campus Hòa Lạc (Hà Nội)</strong>
              <span style={{ fontSize: '13px', color: '#64748b' }}>Khu CNC Hòa Lạc, Km29 Đại lộ Thăng Long, H. Thạch Thất, TP. Hà Nội</span>
            </div>
          </div>

          <table className="vietqr-details-table">
            <tbody>
              <tr><td>Hotline hỗ trợ sinh viên</td><td><b>1900 6868 (Nhánh 2)</b> hoặc <b>028 7300 5588</b></td></tr>
              <tr><td>Email chính thức</td><td><b>support@jobready.io.vn</b> / <b>exe301.fpt@gmail.com</b></td></tr>
              <tr><td>Thời gian hỗ trợ</td><td>Thứ 2 – Thứ 7: 08:30 – 21:00 (Hỗ trợ khẩn cấp qua Discord 24/7)</td></tr>
            </tbody>
          </table>

          <div style={{ marginTop: '16px' }}>
            <h4 style={{ margin: '0 0 10px', fontSize: '14.5px' }}>Gửi thắc mắc hoặc yêu cầu hỗ trợ:</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <input type="text" placeholder="Họ tên của bạn..." style={{ padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1' }} />
              <input type="email" placeholder="Email sinh viên (@fpt.edu.vn)..." style={{ padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1' }} />
              <textarea rows={3} placeholder="Nội dung cần hỗ trợ về Portfolio, Mentor hoặc tài khoản..." style={{ padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1' }} />
              <button type="button" className="jr-btn-gold-action" style={{ alignSelf: 'flex-start', padding: '9px 20px', fontSize: '13.5px' }} onClick={() => alert('Cảm ơn bạn! Yêu cầu hỗ trợ đã được gửi tới đội ngũ vận hành FPT.')}>
                Gửi tin nhắn liên hệ
              </button>
            </div>
          </div>
        </div>
      )
    };
  }

  if (key === 'terms') {
    return {
      category: 'Pháp lý',
      title: 'Điều Khoản Sử Dụng Nền Tảng',
      subtitle: 'Quy định quyền lợi, bản quyền và trách nhiệm của sinh viên & mentor',
      body: (
        <div style={{ fontSize: '13.5px', lineHeight: 1.6 }}>
          <div className="footer-rubric-box">
            <h4><ShieldCheck size={17} /> 1. Bản Quyền Sản Phẩm & Sở Hữu Trí Tuệ</h4>
            <p style={{ margin: 0 }}>
              Sinh viên giữ <b>100% quyền sở hữu trí tuệ</b> đối với mã nguồn, thiết kế đồ họa, nội dung chiến dịch và case study được tải lên nền tảng. Nền tảng Portfolio JobReady cam kết không sử dụng mã nguồn của bạn cho bất kỳ mục đích thương mại nào mà không có thỏa thuận bằng văn bản.
            </p>
          </div>
          <h4 style={{ margin: '14px 0 6px', fontSize: '14.5px' }}>2. Trách nhiệm của Sinh viên</h4>
          <p>Sinh viên cam kết bài nộp là thành quả tự làm hoặc làm theo nhóm; nghiêm cấm sao chép đạo văn hoặc mạo danh người khác. Trong các buổi Chat trực tiếp với Mentor, sinh viên cần giữ thái độ lịch sự, chuyên nghiệp.</p>
          <h4 style={{ margin: '14px 0 6px', fontSize: '14.5px' }}>3. Cam kết thời gian phản hồi của Mentor</h4>
          <p>Mỗi bài nộp gửi đến Mentor thật sẽ được phản hồi chi tiết trong vòng <b>24 – 48 giờ</b>. Nếu quá thời hạn cam kết, sinh viên sẽ được hoàn lại lượt review hoặc cấp thêm 1 buổi review miễn phí.</p>
        </div>
      )
    };
  }

  if (key === 'privacy') {
    return {
      category: 'Pháp lý',
      title: 'Chính Sách Bảo Mật Thông Tin & Dữ Liệu',
      subtitle: 'Bảo vệ hồ sơ cá nhân và sản phẩm của sinh viên theo tiêu chuẩn an toàn cao nhất',
      body: (
        <div style={{ fontSize: '13.5px', lineHeight: 1.6 }}>
          <p>Chúng tôi tôn trọng và cam kết bảo vệ dữ liệu cá nhân của sinh viên và người hướng dẫn:</p>
          <ul style={{ paddingLeft: '20px', lineHeight: 1.7 }}>
            <li><b>Bảo mật thông tin định danh:</b> Họ tên, mã số sinh viên, số điện thoại và email trường FPT được mã hóa và bảo mật tuyệt đối.</li>
            <li><b>Quyền kiểm soát Public Portfolio:</b> Bạn có thể bật hoặc tắt chế độ công khai URL hồ sơ bất cứ khi nào bạn muốn.</li>
            <li><b>Bảo vệ CV ứng tuyển:</b> CV của bạn chỉ được chuyển tiếp đến các đối tác tuyển dụng (FPT Software, TopCV, VNG...) khi có sự đồng ý rõ ràng từ bạn.</li>
          </ul>
        </div>
      )
    };
  }

  if (key === 'mentor-rubric') {
    return {
      category: 'Nghiệp vụ cốt lõi',
      title: 'Quy Chuẩn Mentor Review & Cơ Chế Đánh Giá 2 Chiều',
      subtitle: 'Quy trình thẩm định công bằng, phân luồng AI & Mentor thật, sàng lọc mentor tiêu cực và quỹ thưởng',
      body: (
        <div style={{ fontSize: '13.5px', lineHeight: 1.6 }}>
          <div className="footer-rubric-box">
            <h4><Crown size={17} /> 1. Hai Hình Thức Review Tiêu Chuẩn</h4>
            <ul style={{ margin: 0, paddingLeft: '18px', lineHeight: 1.6 }}>
              <li><b>Hình thức 1 - Nộp link bài nộp / CV (Review Async):</b> Sinh viên gửi link GitHub, demo web, link Figma hoặc CV PDF. Mentor chấm điểm chi tiết theo rubric STAR, ghi chú cụ thể lỗi logic và trả kết quả trong 24-48h.</li>
              <li><b>Hình thức 2 - Đặt lịch Chat trực tiếp 1-on-1:</b> Dành cho tài khoản VIP. Sinh viên trao đổi trực tiếp với Mentor qua Google Meet hoặc phòng chat 45 phút để được giải đáp thắc mắc, sửa lỗi trực tiếp và phỏng vấn thử.</li>
            </ul>
          </div>

          <div style={{ background: 'rgba(2, 132, 199, 0.08)', border: '1px solid rgba(2, 132, 199, 0.3)', borderRadius: '14px', padding: '14px 16px', margin: '14px 0' }}>
            <h4 style={{ margin: '0 0 6px', color: '#0284c7' }}><Flame size={16} /> 2. Phân Luồng Chấm Điểm AI & Mentor Thật</h4>
            <p style={{ margin: 0, fontSize: '13px' }}>
              • <b>Mentor AI (0đ Miễn phí):</b> Tự động quét kiểm tra cấu trúc link, tính hợp lệ của repo, phân tích từ khóa CV ATS và chấm điểm sơ bộ trong 5 giây.<br />
              • <b>Senior Mentor Thật (Gói VIP):</b> Chuyên gia giàu kinh nghiệm từ FPT Software, Viettel, VNG thẩm định kiến trúc code, khả năng mở rộng hệ thống và tính thực tế doanh nghiệp.
            </p>
          </div>

          <div style={{ background: 'rgba(220, 38, 38, 0.08)', border: '1px solid rgba(220, 38, 38, 0.3)', borderRadius: '14px', padding: '14px 16px', margin: '14px 0' }}>
            <h4 style={{ margin: '0 0 6px', color: '#dc2626' }}><ShieldCheck size={16} /> 3. Đánh Giá 2 Chiều & Sàng Lọc Mentor Tiêu Cực</h4>
            <p style={{ margin: 0, fontSize: '13px' }}>
              • <b>Sinh viên chấm điểm Mentor:</b> Sau mỗi lượt review, sinh viên đánh giá sao (1-5 sao) và nhận xét chất lượng góp ý.<br />
              • <b>Cơ chế sàng lọc nghiêm ngặt:</b> Mentor nhận đánh giá tiêu cực (điểm trung bình dưới 3.5 sao) sẽ bị hệ thống tạm ngưng phân công bài nộp và đưa vào diện loại trừ nếu không cải thiện.<br />
              • <b>Chính sách Thưởng thù lao:</b> Mentor có điểm đánh giá xuất sắc (từ 4.5 đến 5.0 sao) được nhận thêm thưởng bonus 15% – 25% thù lao theo từng kỳ review.
            </p>
          </div>
        </div>
      )
    };
  }

  // Employer & Partner
  return {
    category: 'Nhà tuyển dụng & Đối tác',
    title: 'Cổng Kết Nối Doanh Nghiệp & Tuyển Dụng Tài Năng FPT',
    subtitle: 'Tiếp cận 250+ hồ sơ sinh viên đã hoàn thành thử thách thực chiến và được mentor xác thực',
    body: (
      <div style={{ fontSize: '13.5px', lineHeight: 1.6 }}>
        <p>Chúng tôi kết nối trực tiếp các doanh nghiệp công nghệ hàng đầu (FPT Software, TopCV, VNG, VNPT...) với nguồn nhân lực trẻ xuất sắc:</p>
        <ul style={{ paddingLeft: '20px', lineHeight: 1.7 }}>
          <li><b>Xem Portfolio có minh chứng thực:</b> Thay vì chỉ xem CV mô tả suông, nhà tuyển dụng được xem mã nguồn GitHub thật, bản vẽ Figma và video demo sản phẩm của ứng viên.</li>
          <li><b>Kỹ năng được chứng thực bởi Mentor:</b> Điểm đánh giá độc lập từ các Senior Engineer giúp rút ngắn 70% thời gian thẩm định ứng viên.</li>
          <li><b>Đăng đề bài tuyển dụng dạng Challenge:</b> Doanh nghiệp có thể đưa bài toán thực tế của công ty thành thử thách trên nền tảng để thu hút những ứng viên giải quyết tốt nhất.</li>
        </ul>
        <div style={{ background: 'rgba(245, 158, 11, 0.1)', padding: '14px', borderRadius: '12px', marginTop: '16px' }}>
          <strong>Bộ phận Hợp tác Doanh nghiệp:</strong><br />
          <span>Hotline: <b>0908 123 456</b> · Email: <b>partnership@jobready.io.vn</b></span>
        </div>
      </div>
    )
  };
}

/* ==========================================================================
   FOOTER DETAIL MODAL COMPONENT
   ========================================================================== */
function FooterDetailModal({ isOpen, onClose, data, go, onOpenUpgrade }) {
  if (!isOpen || !data) return null;

  return (
    <div className="vietqr-modal-overlay" onClick={onClose}>
      <div className="footer-info-modal-card animate-in" onClick={(e) => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
          <div>
            <span className="footer-info-category-pill">{data.category}</span>
            <h2 style={{ fontSize: '21px', fontWeight: 900, margin: '4px 0 6px', color: 'var(--jr-text-main, #0f172a)' }}>
              {data.title}
            </h2>
            <p style={{ color: '#64748b', fontSize: '13.5px', margin: 0 }}>
              {data.subtitle}
            </p>
          </div>
          <button type="button" onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b', padding: '6px' }}>
            <X size={22} />
          </button>
        </div>

        <div style={{ margin: '20px 0 24px' }}>
          {data.body}
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', borderTop: '1px solid rgba(148,163,184,0.2)', paddingTop: '16px' }}>
          <button type="button" className="ghost-action" onClick={onClose}>
            Đóng
          </button>
          <button type="button" className="jr-btn-gold-action" style={{ padding: '8px 18px', fontSize: '13.5px' }} onClick={onOpenUpgrade}>
            <Crown size={15} /> Xem các gói nâng cấp VIP
          </button>
        </div>
      </div>
    </div>
  );
}

/* ==========================================================================
   JOBREADY FOOTER & CTA BANNER COMPONENT
   ========================================================================== */
function JobReadyFooter({ go, onOpenUpgrade, onOpenFooterModal }) {
  return (
    <footer className="jr-main-footer">
      <div className="jr-footer-container">
        {/* CTA BANNER */}
        <div className="jr-cta-banner-v2" style={{ marginBottom: '56px', marginTop: 0 }}>
          <h2 className="jr-cta-title-v2">
            <span className="white-text">SẴN SÀNG BẮT ĐẦU</span>
            <span className="gold-text">HÀNH TRÌNH MỚI?</span>
          </h2>
          <p className="jr-cta-desc-v2">
            Tham gia cộng đồng Portfolio JobReady — luyện thử thách thực tế, nhận góp ý từ Mentor FPT và kết nối với nhà tuyển dụng hàng đầu.
          </p>
          <div className="jr-cta-actions-v2">
            <button className="jr-btn-gold-action" onClick={() => go('auth')}>
              <span>Đăng ký miễn phí</span>
              <ArrowRight size={17} />
            </button>
            <button className="jr-btn-glass-action" onClick={onOpenUpgrade}>
              <FileText size={17} />
              <span>Xem bảng giá</span>
            </button>
          </div>
        </div>

        {/* FOOTER COLUMNS */}
        <div className="jr-footer-top">
          {/* Brand Column */}
          <div className="jr-footer-brand-wrap">
            <div className="jr-footer-logo-line">
              <span className="jr-footer-logo-badge">JR</span>
              <span className="jr-footer-logo-text">JOBREADY</span>
            </div>
            <p className="jr-footer-tagline">
              Nâng cao kỹ năng phỏng vấn cùng AI & hoàn thiện Portfolio cùng Mentor — tự tin chinh phục mọi nhà tuyển dụng.
            </p>
            <div className="jr-footer-socials">
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="jr-social-btn" title="Facebook">
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="jr-social-btn" title="LinkedIn">
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="jr-social-btn" title="Twitter / X">
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="jr-social-btn" title="Instagram">
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
            </div>
          </div>

          {/* Col 1: Về chúng tôi */}
          <div className="jr-footer-col">
            <h4>Về Chúng Tôi</h4>
            <ul className="jr-footer-links-list">
              <li><button type="button" className="jr-footer-link-btn" onClick={() => onOpenFooterModal('about')}>Giới thiệu</button></li>
              <li><button type="button" className="jr-footer-link-btn" onClick={() => onOpenFooterModal('contact')}>Liên hệ</button></li>
              <li><button type="button" className="jr-footer-link-btn" onClick={() => onOpenFooterModal('terms')}>Điều khoản sử dụng</button></li>
              <li><button type="button" className="jr-footer-link-btn" onClick={() => onOpenFooterModal('privacy')}>Chính sách bảo mật</button></li>
              <li><button type="button" className="jr-footer-link-btn highlight" onClick={() => onOpenFooterModal('mentor-rubric')}>Quy chuẩn Mentor Review</button></li>
            </ul>
          </div>

          {/* Col 2: Ứng viên */}
          <div className="jr-footer-col">
            <h4>Ứng Viên</h4>
            <ul className="jr-footer-links-list">
              <li><button type="button" className="jr-footer-link-btn" onClick={() => go('hub')}>Tìm việc làm & Thử thách</button></li>
              <li><button type="button" className="jr-footer-link-btn" onClick={() => go('roadmap')}>Lộ trình nghề nghiệp</button></li>
              <li><button type="button" className="jr-footer-link-btn highlight" onClick={() => onOpenFooterModal('mentor-rubric')}>Luyện phỏng vấn AI</button></li>
              <li><button type="button" className="jr-footer-link-btn" onClick={() => go('portfolio')}>Phân tích CV chuẩn ATS</button></li>
              <li><button type="button" className="jr-footer-link-btn" onClick={onOpenUpgrade}>Bảng giá dịch vụ VIP</button></li>
            </ul>
          </div>

          {/* Col 3: Nhà tuyển dụng */}
          <div className="jr-footer-col">
            <h4>Nhà Tuyển Dụng</h4>
            <ul className="jr-footer-links-list">
              <li><button type="button" className="jr-footer-link-btn" onClick={() => onOpenFooterModal('employer')}>Đăng tin tuyển dụng</button></li>
              <li><button type="button" className="jr-footer-link-btn" onClick={() => onOpenFooterModal('employer')}>Bảng giá dịch vụ doanh nghiệp</button></li>
              <li><button type="button" className="jr-footer-link-btn highlight" onClick={() => go('portfolio')}>Tìm ứng viên nổi bật</button></li>
              <li><button type="button" className="jr-footer-link-btn" onClick={() => onOpenFooterModal('contact')}>Liên hệ hợp tác</button></li>
            </ul>
          </div>
        </div>

        {/* BOTTOM COPYRIGHT */}
        <div className="jr-footer-bottom">
          <div>
            © 2026 Portfolio JobReady Career Tech. Tất cả các quyền được bảo lưu.
          </div>
          <div>
            Dự án nghiên cứu & khởi nghiệp của nhóm sinh viên <b>EXE301 - Đại học FPT</b>
          </div>
        </div>
      </div>
    </footer>
  );
}

function HomePage({ go, onOpenUpgrade, onOpenFooterModal }) {
  return (
    <div className="jr-home-wrapper">
      {/* Hero Section */}
      <section className="jr-hero">
        <div className="jr-hero-badge">
          <span className="jr-badge-pulse" />
          <span>HỆ THỐNG XÂY DỰNG PORTFOLIO NGHỀ NGHIỆP · SINH VIÊN ĐẠI HỌC FPT & COURSERA</span>
        </div>

        <h1 className="jr-hero-title">
          Xây Dựng Portfolio Chuẩn Doanh Nghiệp, <br />
          <span className="jr-gradient-text">Chinh Phục Mọi Nhà Tuyển Dụng</span>
        </h1>

        <p className="jr-hero-subtitle">
          Nền tảng hướng nghiệp thực chiến dành cho sinh viên đại học: Định hình lộ trình nghề nghiệp (Roadmap), 
          thực hiện các dự án thực tế chuẩn doanh nghiệp (Challenge Hub), nhận đánh giá 2 chiều từ AI & Mentor chuyên gia, 
          và tự động tạo trang Portfolio cá nhân chuyên nghiệp để gửi nhà tuyển dụng.
        </p>

        <div className="jr-hero-actions">
          <button className="jr-btn-primary" onClick={() => go('roadmap')}>
            <Rocket size={18} />
            <span>Bắt đầu tạo Portfolio ngay</span>
            <ArrowRight size={16} />
          </button>
          <button className="jr-btn-secondary" onClick={() => go('portfolio')}>
            <UserRound size={18} color="#38bdf8" />
            <span>Xem mẫu Portfolio cá nhân</span>
          </button>
          <button className="ghost-action" onClick={() => go('hub')}>
            <LayoutDashboard size={18} />
            <span>Khám phá Thử thách dự án</span>
          </button>
        </div>

        {/* Live Stats */}
        <div className="jr-stats-grid">
          <div className="jr-stat-card">
            <span className="jr-stat-num">250+</span>
            <span className="jr-stat-label">Sinh viên ĐH đã tạo Portfolio (KPI 200-300)</span>
          </div>
          <div className="jr-stat-card">
            <span className="jr-stat-num">95%</span>
            <span className="jr-stat-label">Portfolio đạt chuẩn tuyển dụng doanh nghiệp</span>
          </div>
          <div className="jr-stat-card">
            <span className="jr-stat-num">100+</span>
            <span className="jr-stat-label">Dự án & Thử thách thực tế đưa vào hồ sơ</span>
          </div>
          <div className="jr-stat-card">
            <span className="jr-stat-num">50+</span>
            <span className="jr-stat-label">Mentor chuyên gia (FPT, VNG, Viettel)</span>
          </div>
        </div>
      </section>

      {/* 4-Step Portfolio Building Process */}
      <section className="content-page">
        <div className="jr-section-title-wrap">
          <span className="jr-sub-pill">Quy trình 4 bước tạo Portfolio hoàn chỉnh</span>
          <h2 className="jr-section-title">Hành Trình Xây Dựng Hồ Sơ Năng Lực Chuẩn Ngành</h2>
          <p className="jr-section-desc">
            Từ việc chọn lộ trình đến hoàn thành dự án có minh chứng thực tế và nhận chứng thực từ Mentor cấp cao.
          </p>
        </div>

        <div className="jr-process-grid">
          <div className="jr-process-card">
            <div className="jr-step-badge">1</div>
            <h3>1. Định Hình Lộ Trình Nghề Nghiệp</h3>
            <p>Chọn chuyên ngành (Frontend, Backend, AI...) và thiết lập cột mốc phát triển kỹ năng từ Foundation đến Senior.</p>
            <button className="jr-step-link-btn" onClick={() => go('roadmap')}>
              Thiết lập lộ trình <ArrowRight size={13} />
            </button>
          </div>

          <div className="jr-process-card">
            <div className="jr-step-badge">2</div>
            <h3>2. Thực Hiện Thử Thách Dự Án</h3>
            <p>Làm các challenge kỹ thuật thực tế từ nguồn đề thi của trường ĐH và doanh nghiệp để tích lũy sản phẩm vào Portfolio.</p>
            <button className="jr-step-link-btn" onClick={() => go('hub')}>
              Khám phá Thử thách <ArrowRight size={13} />
            </button>
          </div>

          <div className="jr-process-card">
            <div className="jr-step-badge">3</div>
            <h3>3. Mentor & AI Đánh Giá 2 Chiều</h3>
            <p>Nộp mã nguồn GitHub/Demo, nhận điểm AI tức thì và Mentor doanh nghiệp review chuyên sâu theo khung chuẩn STAR.</p>
            <button className="jr-step-link-btn" onClick={() => go('hub')}>
              Nộp bài & Nhận review <ArrowRight size={13} />
            </button>
          </div>

          <div className="jr-process-card">
            <div className="jr-step-badge">4</div>
            <h3>4. Xuất Bản Trang Portfolio Cá Nhân</h3>
            <p>Tự động tạo trang Public Portfolio công khai có link riêng, xuất CV PDF chuyên nghiệp, thẩm định ATS và sẵn sàng ứng tuyển.</p>
            <button className="jr-step-link-btn" onClick={() => go('portfolio')}>
              Xem trang Portfolio <ArrowRight size={13} />
            </button>
          </div>
        </div>
      </section>

      {/* Feature Showcase Grid */}
      <section className="content-page">
        <div className="jr-section-title-wrap">
          <span className="jr-sub-pill">Tính năng nền tảng</span>
          <h2 className="jr-section-title">Hệ Sinh Thái Hỗ Trợ Xây Dựng Portfolio Toàn Diện</h2>
          <p className="jr-section-desc">Kết hợp giữa bài tập thực tế, đánh giá chuyên gia và công nghệ AI để chuẩn hóa hồ sơ ứng tuyển.</p>
        </div>

        <div className="jr-features-grid">
          <div className="jr-feature-card">
            <div className="jr-feat-icon blue"><Compass size={26} /></div>
            <h3>Bản Đồ Nghề Nghiệp Tương Tác</h3>
            <p>Khám phá cây kỹ năng, vai trò công việc và các cấp độ chuyên môn. Tự do tùy biến lộ trình nghề nghiệp phù hợp với định hướng cá nhân.</p>
          </div>

          <div className="jr-feature-card">
            <div className="jr-feat-icon gold"><Rocket size={26} /></div>
            <h3>Trung Tâm Thử Thách Dự Án (Hub)</h3>
            <p>Kho bài tập thực tế từ cơ bản đến nâng cao. Mỗi thử thách hoàn thành sẽ trở thành một case study chất lượng trong Portfolio của bạn.</p>
          </div>

          <div className="jr-feature-card">
            <div className="jr-feat-icon emerald"><UserRound size={26} /></div>
            <h3>Trang Portfolio Cá Nhân Công Khai</h3>
            <p>Trang Portfolio sinh viên có URL riêng, hiển thị đầy đủ dự án đã làm, kỹ năng đã được xác thực, đánh giá từ mentor và nút xuất CV PDF.</p>
          </div>

          <div className="jr-feature-card">
            <div className="jr-feat-icon emerald"><GraduationCap size={26} /></div>
            <h3>Nguồn Học Liệu Chuẩn Đại Học FPT & Coursera</h3>
            <p>Tổng hợp giáo trình, đề án môn học FPT (SWP391, PRN231, EXE301...) và chứng chỉ chuyên nghiệp Coursera (Google, Meta, AWS) để sinh viên xây dựng dự án thực chiến.</p>
          </div>

          <div className="jr-feature-card">
            <div className="jr-feat-icon blue"><FileUp size={26} /></div>
            <h3>Thẩm Định CV & Portfolio Chuẩn ATS</h3>
            <p>Quét độ tương thích hồ sơ với JD tuyển dụng trong 30 giây. Phát hiện từ khóa thiếu sót và tối ưu điểm số trước khi nộp cho nhà tuyển dụng.</p>
          </div>

          <div className="jr-feature-card">
            <div className="jr-feat-icon gold"><ShieldCheck size={26} /></div>
            <h3>Phân Luồng Mentor & Quỹ Thưởng Phạt</h3>
            <p>AI chấm điểm sơ cấp 0đ, Senior Mentor review 1:1 chuyên sâu. Đánh giá 2 chiều minh bạch, lọc mentor tiêu cực và thưởng mentor xuất sắc.</p>
          </div>
        </div>
      </section>

      {/* Founders Section (Ngay tren Sinh vien noi ve chung toi) */}
      <section className="content-page" style={{ paddingBottom: 0 }}>
        <FoundersSection />
      </section>

      {/* Student Testimonials / Reviews */}
      <section className="content-page">
        <div className="jr-section-title-wrap">
          <span className="jr-sub-pill">Sinh viên nói gì về chúng tôi</span>
          <h2 className="jr-section-title">Review Từ Các Bạn Sinh Viên Đã Sử Dụng</h2>
          <p className="jr-section-desc">Hơn 250+ sinh viên Đại học FPT và người học Coursera đã xây dựng Portfolio chuyên nghiệp và nhận được offer từ doanh nghiệp hàng đầu.</p>
        </div>

        <div className="jr-testimonials-grid">
          <article className="jr-testimonial-card">
            <div className="jr-testimonial-stars">
              {[1,2,3,4,5].map(s => <Star key={s} size={14} fill="#f59e0b" color="#f59e0b" />)}
            </div>
            <p className="jr-testimonial-quote">"Mình đã từng không biết bắt đầu từ đâu khi làm CV. Nhờ hệ thống Portfolio này, mình có ngay lộ trình rõ ràng, làm 3 dự án thực tế và gửi portfolio trực tiếp cho nhà tuyển dụng. Kết quả: nhận intern tại FPT Software chỉ sau 2 tuần!"</p>
            <div className="jr-testimonial-author">
              <div className="jr-testimonial-avatar">TH</div>
              <div>
                <strong>Trần Hương</strong>
                <span>Frontend Developer Intern · ĐH FPT HCM</span>
              </div>
            </div>
          </article>

          <article className="jr-testimonial-card featured">
            <div className="jr-testimonial-stars">
              {[1,2,3,4,5].map(s => <Star key={s} size={14} fill="#f59e0b" color="#f59e0b" />)}
            </div>
            <p className="jr-testimonial-quote">"Điều mình thích nhất là mentor review chuyên sâu theo khung STAR. Không chỉ chấm điểm mà còn gợi ý cách trình bày case study sao cho nhà tuyển dụng ấn tượng. Portfolio của mình sau khi hoàn thiện đã giúp mình pass vòng CV ở Viettel Digital."</p>
            <div className="jr-testimonial-author">
              <div className="jr-testimonial-avatar">NM</div>
              <div>
                <strong>Nguyễn Minh</strong>
                <span>Backend Engineer · ĐH FPT Hà Nội</span>
              </div>
            </div>
          </article>

          <article className="jr-testimonial-card">
            <div className="jr-testimonial-stars">
              {[1,2,3,4,5].map(s => <Star key={s} size={14} fill="#f59e0b" color="#f59e0b" />)}
            </div>
            <p className="jr-testimonial-quote">"Tính năng thẩm định CV chuẩn ATS cực kỳ hữu ích. Mình đã quét CV qua hệ thống, phát hiện thiếu từ khóa quan trọng và sửa ngay. Điểm ATS từ 45 lên 92. HR của Shopee gọi phỏng vấn ngay tuần sau!"</p>
            <div className="jr-testimonial-author">
              <div className="jr-testimonial-avatar">LT</div>
              <div>
                <strong>Lê Thảo</strong>
                <span>Data Analyst Intern · ĐH FPT Cần Thơ</span>
              </div>
            </div>
          </article>

          <article className="jr-testimonial-card">
            <div className="jr-testimonial-stars">
              {[1,2,3,4,5].map(s => <Star key={s} size={14} fill="#f59e0b" color="#f59e0b" />)}
            </div>
            <p className="jr-testimonial-quote">"Bản đồ nghề nghiệp giúp mình nhìn rõ career path từ Junior đến Senior. Mình chọn track DevOps, làm challenge về Docker + CI/CD và được mentor đánh giá 95/100. Case study này trở thành highlight trong portfolio xin việc."</p>
            <div className="jr-testimonial-author">
              <div className="jr-testimonial-avatar">PD</div>
              <div>
                <strong>Phạm Đức</strong>
                <span>DevOps Engineer · ĐH FPT Đà Nẵng</span>
              </div>
            </div>
          </article>

          <article className="jr-testimonial-card">
            <div className="jr-testimonial-stars">
              {[1,2,3,4,5].map(s => <Star key={s} size={14} fill="#f59e0b" color="#f59e0b" />)}
            </div>
            <p className="jr-testimonial-quote">"Mình ấn tượng với tính năng phỏng vấn AI. Nó giả lập phỏng vấn thật, hỏi behavioral + technical questions và cho feedback tức thì. Sau 5 lần luyện, mình pass vòng phỏng vấn cuối ở MoMo mà không run."</p>
            <div className="jr-testimonial-author">
              <div className="jr-testimonial-avatar">VL</div>
              <div>
                <strong>Vũ Linh</strong>
                <span>Mobile Developer · ĐH FPT TP.HCM</span>
              </div>
            </div>
          </article>

          <article className="jr-testimonial-card">
            <div className="jr-testimonial-stars">
              {[1,2,3,4,5].map(s => <Star key={s} size={14} fill="#f59e0b" color="#f59e0b" />)}
            </div>
            <p className="jr-testimonial-quote">"Gói Premium rất xứng đáng. Mình được mentor senior ở VNG review từng bài, gợi ý cải thiện code quality và portfolio layout. Public portfolio link mình gửi thẳng cho HR, không cần CV truyền thống nữa."</p>
            <div className="jr-testimonial-author">
              <div className="jr-testimonial-avatar">HA</div>
              <div>
                <strong>Hoàng Anh</strong>
                <span>Fullstack Developer · Coursera & ĐH FPT</span>
              </div>
            </div>
          </article>
        </div>
      </section>

      <JobReadyFooter go={go} onOpenUpgrade={onOpenUpgrade} onOpenFooterModal={onOpenFooterModal} />
    </div>
  );
}

function LearningPage({ go }) {
  const [selectedMajor, setSelectedMajor] = useState('Tất cả');
  const [downloadNotice, setDownloadNotice] = useState('');
  const [previewItem, setPreviewItem] = useState(null);

  const fptResources = [
    // Software Engineering (SE)
    {
      id: 'fpt-se-swp391',
      code: 'SWP391',
      title: 'Đề Án Thực Chiến Phần Mềm SWP391 & Khung Chuẩn OJT FPT',
      majorKey: 'dev',
      majorLabel: 'Kỹ thuật Phần mềm (SE)',
      uni: 'Đại học FPT',
      cat: 'Giáo trình & Đồ án thực chiến',
      downloads: 3420,
      rating: 5.0,
      format: 'PDF · 52 trang',
      desc: 'Tài liệu hướng dẫn xây dựng dự án Full Stack, quản trị quy trình Scrum, thiết kế API, viết Unit Test và checklist nghiệm thu OJT tại FPT Software.'
    },
    {
      id: 'fpt-se-prn211',
      code: 'PRN211',
      title: 'Giáo Trình .NET Core, C# & Clean Architecture Doanh Nghiệp',
      majorKey: 'dev',
      majorLabel: 'Kỹ thuật Phần mềm (SE)',
      uni: 'Đại học FPT',
      cat: 'Tài liệu môn học chính quy',
      downloads: 2180,
      rating: 4.9,
      format: 'PDF / Slides · 78 trang',
      desc: 'Bộ bài giảng chi tiết về Entity Framework Core, Repository Pattern, Dependency Injection, RESTful API và tối ưu hiệu năng cơ sở dữ liệu SQL Server.'
    },
    {
      id: 'fpt-se-prj301',
      code: 'PRJ301',
      title: 'Xây Dựng Web App Phân Tầng Với Java Servlet & Spring Boot',
      majorKey: 'dev',
      majorLabel: 'Kỹ thuật Phần mềm (SE)',
      uni: 'Đại học FPT',
      cat: 'Giáo trình & Code mẫu',
      downloads: 2890,
      rating: 4.9,
      format: 'PDF · 64 trang',
      desc: 'Mô hình MVC phân tầng, xác thực JWT, bảo mật Spring Security, tích hợp thanh toán VNPAY/MoMo và cấu trúc dự án chuẩn để nộp bài Portfolio.'
    },
    {
      id: 'fpt-se-swe201c',
      code: 'SWE201c',
      title: 'Tiêu Chuẩn Thiết Kế Kiến Trúc Phần Mềm C4 Model & Agile',
      majorKey: 'dev',
      majorLabel: 'Kỹ thuật Phần mềm (SE)',
      uni: 'Đại học FPT',
      cat: 'Tài liệu chuẩn kiến trúc',
      downloads: 1650,
      rating: 4.8,
      format: 'PDF · 40 trang',
      desc: 'Hướng dẫn vẽ sơ đồ hệ thống 4 cấp độ (Context, Container, Component, Code), phân tích Trade-off và viết tài liệu kiến trúc ADR chuyên nghiệp.'
    },

    // Digital Marketing (MKT)
    {
      id: 'fpt-mkt-mkt304',
      code: 'MKT304',
      title: 'Chiến Lược Digital Marketing Đa Kênh & Tối Ưu Paid Ads Funnel',
      majorKey: 'mkt',
      majorLabel: 'Digital Marketing (MKT)',
      uni: 'Đại học FPT',
      cat: 'Kế hoạch chiến dịch mẫu',
      downloads: 2750,
      rating: 5.0,
      format: 'Slides / Deck · 45 slide',
      desc: 'Bộ khung lập kế hoạch chiến dịch đa kênh từ Awareness đến Conversion, phân bổ ngân sách Meta/Google Ads và xây dựng bảng đo lường ROAS/CAC.'
    },
    {
      id: 'fpt-mkt-dmm301',
      code: 'DMM301',
      title: 'Cẩm Nang Kỹ Thuật SEO Audit, Topic Cluster & On-Page FPT',
      majorKey: 'mkt',
      majorLabel: 'Digital Marketing (MKT)',
      uni: 'Đại học FPT',
      cat: 'Tài liệu chuyên môn',
      downloads: 1980,
      rating: 4.9,
      format: 'PDF · 56 trang',
      desc: 'Phương pháp phân tích từ khóa theo Search Intent, cấu trúc website dạng Topic Cluster, audit Core Web Vitals và lập kế hoạch biên tập nội dung 30 ngày.'
    },
    {
      id: 'fpt-mkt-mkt101',
      code: 'MKT101',
      title: 'Nguyên Lý Tiếp Thị & Khung Nghiên Cứu Chân Dung Khách Hàng (Persona)',
      majorKey: 'mkt',
      majorLabel: 'Digital Marketing (MKT)',
      uni: 'Đại học FPT',
      cat: 'Giáo trình nền tảng',
      downloads: 3120,
      rating: 4.8,
      format: 'PDF · 48 trang',
      desc: 'Lý thuyết tiếp thị hiện đại kết hợp thực hành: xác định phân khúc thị trường, định vị thương hiệu, thấu hiểu Insight và thiết kế thông điệp truyền thông.'
    },
    {
      id: 'fpt-mkt-brd201',
      code: 'BRD201',
      title: 'Bộ Khung Chiến Dịch Truyền Thông Tích Hợp (IMC) & Định Vị Thương Hiệu',
      majorKey: 'mkt',
      majorLabel: 'Digital Marketing (MKT)',
      uni: 'Đại học FPT',
      cat: 'Case study doanh nghiệp',
      downloads: 1840,
      rating: 4.9,
      format: 'Slides · 38 slide',
      desc: 'Case study phân tích chiến dịch ra mắt sản phẩm của các thương hiệu hàng đầu Việt Nam, mẫu Pitch Deck báo cáo cho Ban giám đốc.'
    },

    // Digital Art & Design (DG)
    {
      id: 'fpt-dg-uxd301',
      code: 'UXD301',
      title: 'Quy Trình Thiết Kế Sản Phẩm UI/UX & Nghiên Cứu Người Dùng',
      majorKey: 'design',
      majorLabel: 'Thiết kế Mỹ thuật số (DG)',
      uni: 'Đại học FPT',
      cat: 'Giáo trình thực hành UI/UX',
      downloads: 3600,
      rating: 5.0,
      format: 'PDF / Figma · 60 trang',
      desc: 'Quy trình Design Thinking 5 bước: Empathize, Define, Ideate, Prototype, Test. Bao gồm mẫu câu hỏi phỏng vấn UX, user journey map và wireframe luồng chính.'
    },
    {
      id: 'fpt-dg-dsn301',
      code: 'DSN301',
      title: 'Cẩm Nang Xây Dựng Design System & Token Component Trên Figma',
      majorKey: 'design',
      majorLabel: 'Thiết kế Mỹ thuật số (DG)',
      uni: 'Đại học FPT',
      cat: 'Bộ thư viện Figma mẫu',
      downloads: 2950,
      rating: 5.0,
      format: 'Figma File / PDF',
      desc: 'Hệ thống Color Tokens, Typography Scale, Spacing Grid, Auto Layout 5.0, Variant states và hướng dẫn Handoff cho lập trình viên Frontend.'
    },
    {
      id: 'fpt-dg-gra201',
      code: 'GRA201',
      title: 'Nguyên Lý Thị Giác, Bố Cục & Nhận Diện Thương Hiệu Kỹ Thuật Số',
      majorKey: 'design',
      majorLabel: 'Thiết kế Mỹ thuật số (DG)',
      uni: 'Đại học FPT',
      cat: 'Tài liệu môn học chính quy',
      downloads: 2150,
      rating: 4.9,
      format: 'PDF · 50 trang',
      desc: 'Lý thuyết màu sắc, nghệ thuật chữ (Digital Typography), visual hierarchy, quy chuẩn thiết kế logo và brand guidelines chuyên nghiệp cho Portfolio.'
    },
    {
      id: 'fpt-dg-anm201',
      code: 'ANM201',
      title: 'Nguyên Tắc Chuyển Động Motion Graphics & Micro-interactions',
      majorKey: 'design',
      majorLabel: 'Thiết kế Mỹ thuật số (DG)',
      uni: 'Đại học FPT',
      cat: 'Tài liệu kỹ thuật số',
      downloads: 1720,
      rating: 4.8,
      format: 'PDF / Video · 35 trang',
      desc: '12 nguyên lý hoạt họa Disney ứng dụng trong sản phẩm số, thiết kế transition tương tác, xuất file Lottie/JSON tối ưu cho Web và Mobile App.'
    }
  ];

  const filtered = fptResources.filter((item) => {
    return selectedMajor === 'Tất cả' || item.majorLabel.includes(selectedMajor) || item.majorKey === selectedMajor;
  });

  const handleDownload = (item) => {
    setDownloadNotice(`Đang tải xuống tài liệu chính quy FPT: "${item.code} - ${item.title}"...`);
    setTimeout(() => {
      setDownloadNotice(`✅ Đã tải xuống thành công tài liệu Đại học FPT: "${item.code} - ${item.title}" (${item.format})!`);
      setTimeout(() => setDownloadNotice(''), 3500);
    }, 800);
  };

  return (
    <section className="content-page fpt-learning-page">
      <div className="section-heading inline">
        <div>
          <p className="mono-label">FPT University Academic Hub</p>
          <h1>Học Liệu & Giáo Trình Chính Quy Đại Học FPT</h1>
          <p>Kho học liệu, đồ án OJT và khung tham chiếu kỹ năng chính quy từ ĐH FPT dành cho sinh viên 3 chuyên ngành SE, MKT và DG để xây dựng Portfolio đạt chuẩn doanh nghiệp.</p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button className="ghost-action compact" onClick={() => go('roadmap')}>
            <Compass size={15} /> Bản đồ nghề
          </button>
          <button className="primary-action compact" onClick={() => go('hub')}>
            <Rocket size={15} /> Làm thử thách ngay
          </button>
        </div>
      </div>

      {downloadNotice && <div className="status-banner info mb-3">{downloadNotice}</div>}

      <div className="filter-bar mb-4" style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
        <span style={{ fontSize: '13px', fontWeight: 600, marginRight: '6px' }}>Lọc theo chuyên ngành:</span>
        {[
          { key: 'Tất cả', label: 'Tất cả chuyên ngành (12 tài liệu)' },
          { key: 'dev', label: '💻 Kỹ thuật Phần mềm (SE)' },
          { key: 'mkt', label: '📊 Digital Marketing (MKT)' },
          { key: 'design', label: '🎨 Thiết kế Mỹ thuật số (DG)' }
        ].map((m) => (
          <button
            key={m.key}
            type="button"
            className={`ghost-action compact ${selectedMajor === m.key ? 'active' : ''}`}
            onClick={() => setSelectedMajor(m.key)}
          >
            {m.label}
          </button>
        ))}
      </div>

      <div className="learning-resources-grid">
        {filtered.map((item) => (
          <article className="resource-card fpt-resource-card" key={item.id} style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
              <span className="resource-uni-badge">{item.uni} · {item.code}</span>
              <span className="chip-tag">{item.majorLabel.split(' ')[0]}</span>
            </div>
            <h3 style={{ fontSize: '16px', fontWeight: 700, margin: '0 0 10px', color: 'var(--jr-text-main)', lineHeight: 1.4 }}>{item.title}</h3>
            <p style={{ fontSize: '13px', color: 'var(--jr-text-sub)', flexGrow: 1, margin: '0 0 14px', lineHeight: 1.5 }}>{item.desc}</p>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '12px', color: 'var(--jr-text-sub)', borderTop: '1px solid var(--jr-card-border)', paddingTop: '12px', marginBottom: '14px' }}>
              <span>📥 {item.downloads.toLocaleString()} lượt tải</span>
              <span>⭐ {item.rating} / 5.0</span>
              <span className="chip-tag">{item.format}</span>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button className="ghost-action compact" style={{ flex: 1 }} onClick={() => setPreviewItem(item)}>
                👁️ Xem tóm tắt
              </button>
              <button className="primary-action compact" style={{ flex: 1 }} onClick={() => handleDownload(item)}>
                <Download size={14} /> Tải tài liệu
              </button>
            </div>
          </article>
        ))}
      </div>

      {previewItem && (
        <div className="modal-backdrop" onClick={() => setPreviewItem(null)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '640px' }}>
            <div className="modal-header">
              <h3>[{previewItem.code}] {previewItem.title}</h3>
              <button className="icon-btn" onClick={() => setPreviewItem(null)}><X size={18} /></button>
            </div>
            <div className="modal-body">
              <span className="resource-uni-badge mb-2">{previewItem.uni} · {previewItem.majorLabel}</span>
              <p style={{ margin: '14px 0', lineHeight: 1.6 }}>{previewItem.desc}</p>
              <div style={{ background: 'rgba(255,255,255,0.05)', padding: '16px', borderRadius: '12px', margin: '16px 0' }}>
                <h4 style={{ margin: '0 0 8px', fontSize: '14px' }}>📄 Nội dung trọng tâm giáo trình:</h4>
                <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '13px', color: 'var(--jr-text-sub)' }}>
                  <li>Chương 1: Kiến thức nền tảng và chuẩn đầu ra môn học của Đại học FPT</li>
                  <li>Chương 2: Hướng dẫn thực hành dự án thực tế và checklist nghiệm thu OJT</li>
                  <li>Chương 3: Bộ rubric chấm điểm của Giảng viên & Mentor doanh nghiệp</li>
                  <li>Chương 4: Tiêu chuẩn đóng gói sản phẩm để đưa vào Portfolio cá nhân</li>
                </ul>
              </div>
            </div>
            <div className="modal-footer" style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button className="ghost-action" onClick={() => setPreviewItem(null)}>Đóng</button>
              <button className="primary-action" onClick={() => { handleDownload(previewItem); setPreviewItem(null); }}>
                <Download size={16} /> Tải toàn bộ tài liệu ({previewItem.format})
              </button>
            </div>
          </div>
        </div>
      )}
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

      <div className="user-acquisition-banner">
        <div className="acquisition-badge"><Rocket size={18} /> <span>Chiến dịch Thu hút 200 - 300 Sinh viên</span></div>
        <div className="acquisition-content">
          <div>
            <h2>Xây dựng Portfolio chuẩn tuyển dụng với Nguồn tài liệu Trường ĐH & Mentor</h2>
            <p>🎁 <b>Ưu đãi Sinh viên .edu.vn:</b> Giảm 50% gói Premium. <b>Chương trình giới thiệu:</b> Mời 2 bạn học nhận 1 buổi Review CV 1-on-1 từ Mentor Thật. Dùng thử Mentor AI chấm tự động 0đ!</p>
          </div>
          <button className="primary-action compact" onClick={() => go('about')}>
            <Sparkles size={16} /> Tìm hiểu chiến dịch 200-300 SV
          </button>
        </div>
      </div>

      <div className="university-resources-widget">
        <div className="widget-header">
          <GraduationCap size={20} />
          <div>
            <h2>Nguồn tài liệu học tập chuẩn Đại học FPT & Coursera</h2>
            <p>Giáo trình, slide bài giảng & đề án môn học thực chiến tham chiếu trực tiếp từ Đại học FPT và các chứng chỉ chuyên nghiệp trên Coursera (Google, Meta, AWS).</p>
          </div>
        </div>
        <div className="university-resource-chips">
          <span className="uni-chip fpt"><GraduationCap size={14} /> ĐH FPT (SWP391)</span>
          <span className="uni-chip fpt"><GraduationCap size={14} /> ĐH FPT (PRN231)</span>
          <span className="uni-chip coursera"><Award size={14} /> Coursera (Google Professional)</span>
          <span className="uni-chip coursera"><Award size={14} /> Coursera (Meta Developer)</span>
          <span className="uni-chip aws"><BookOpen size={14} /> AWS Academy Cloud</span>
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
    tertiaryLink: submission?.tertiaryLink ?? '',
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
                    <div style={{ marginTop: '14px', display: 'flex', gap: '8px' }}>
                      <button type="button" className="jr-btn-primary compact" style={{ padding: '8px 16px', fontSize: '13px' }} onClick={() => go('feedback')}>
                        <MessageSquareText size={15} /> Xem nhận xét & góp ý của Mentor
                      </button>
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
        <label>{rules.primaryLabel}<input value={form.primaryLink} onChange={(event) => updateForm('primaryLink', event.target.value)} placeholder={rules.primaryPlaceholder || 'Dán link chính của sản phẩm'} /></label>
        <label>{rules.secondaryLabel}<input value={form.secondaryLink} onChange={(event) => updateForm('secondaryLink', event.target.value)} placeholder={rules.secondaryPlaceholder || 'Dán link minh chứng hoặc demo'} /></label>
        <label>{rules.tertiaryLabel}<input value={form.tertiaryLink} onChange={(event) => updateForm('tertiaryLink', event.target.value)} placeholder={rules.tertiaryPlaceholder || 'Link tài liệu phụ / dashboard / docs'} /></label>
        <label>Kỹ năng sử dụng<input value={form.skills} onChange={(event) => updateForm('skills', event.target.value)} placeholder={rules.skillPlaceholder} /></label>
        <label>Ghi chú sản phẩm<textarea value={form.notes} onChange={(event) => updateForm('notes', event.target.value)} placeholder={rules.notePlaceholder} /></label>

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

function MentorFeedbackPage({ go, challenge, submissions, feedbackList, challenges, userId, mentors, setSelectedChallengeId }) {
  const [feedbackFilter, setFeedbackFilter] = useState('all');
  const [feedbackKeyword, setFeedbackKeyword] = useState('');
  const [dualMode, setDualMode] = useState('human');
  const [studentRating, setStudentRating] = useState(5);
  const [studentComment, setStudentComment] = useState('');
  const [ratingNotice, setRatingNotice] = useState('');

  const userSubmissions = submissions.filter((item) => item.userId === userId);
  const userFeedback = feedbackList.filter((item) => item.userId === userId);
  const recordMap = new Map();

  userSubmissions.forEach((submission) => {
    const itemChallenge = challenges.find((item) => item.id === submission.challengeId) ?? challenge;
    const itemFeedback = userFeedback.find((item) => item.challengeId === submission.challengeId);
    recordMap.set(submission.challengeId, { challenge: itemChallenge, submission, feedback: itemFeedback });
  });
  userFeedback.forEach((feedback) => {
    if (recordMap.has(feedback.challengeId)) return;
    const itemChallenge = challenges.find((item) => item.id === feedback.challengeId) ?? challenge;
    recordMap.set(feedback.challengeId, { challenge: itemChallenge, submission: null, feedback });
  });

  const records = Array.from(recordMap.values()).sort((a, b) => Number(b.feedback?.score ?? 0) - Number(a.feedback?.score ?? 0));
  const currentRecord = records.find((item) => item.challenge.id === challenge.id) ?? records[0];
  const [activeFeedbackChallengeId, setActiveFeedbackChallengeId] = useState(currentRecord?.challenge.id ?? challenge.id);
  const activeRecord = records.find((item) => item.challenge.id === activeFeedbackChallengeId) ?? currentRecord;
  const activeChallenge = activeRecord?.challenge ?? challenge;
  const activeSubmission = activeRecord?.submission;
  const activeFeedback = activeRecord?.feedback;
  const hasFeedback = Boolean(activeFeedback);
  const matchedMentor = mentors.find((item) => item.id === activeSubmission?.mentorId)
    ?? mentors.find((item) => item.name === activeSubmission?.mentor)
    ?? mentors.find((item) => item.name === activeFeedback?.reviewer)
    ?? matchMentorForChallenge(activeChallenge, mentors);
  const reviewerName = activeFeedback?.reviewer ?? activeSubmission?.mentor ?? matchedMentor?.name ?? activeChallenge.mentor;
  const feedbackStats = {
    reviewed: records.filter((item) => item.feedback).length,
    waiting: records.filter((item) => item.submission && !item.feedback && item.submission.status === 'submitted').length,
    high: records.filter((item) => Number(item.feedback?.score ?? 0) >= 85).length,
    low: records.filter((item) => item.submission?.status === 'rejected' || (item.feedback && Number(item.feedback.score) < 80)).length
  };
  const filterOptions = [
    { id: 'all', label: 'Tất cả', count: records.length },
    { id: 'reviewed', label: 'Đã đánh giá', count: feedbackStats.reviewed },
    { id: 'waiting', label: 'Chờ đánh giá', count: feedbackStats.waiting },
    { id: 'high', label: 'Đánh giá cao', count: feedbackStats.high },
    { id: 'improve', label: 'Cần cải thiện', count: feedbackStats.low }
  ];
  const filteredRecords = records.filter((item) => {
    const keyword = feedbackKeyword.trim().toLowerCase();
    const score = Number(item.feedback?.score ?? 0);
    const isWaiting = item.submission && !item.feedback && item.submission.status === 'submitted';
    const isImprove = item.submission?.status === 'rejected' || (item.feedback && score < 80);
    if (feedbackFilter === 'reviewed' && !item.feedback) return false;
    if (feedbackFilter === 'waiting' && !isWaiting) return false;
    if (feedbackFilter === 'high' && score < 85) return false;
    if (feedbackFilter === 'improve' && !isImprove) return false;
    if (!keyword) return true;
    return [item.challenge.title, item.challenge.track, item.feedback?.title, item.feedback?.reviewer, item.submission?.notes]
      .filter(Boolean)
      .some((value) => value.toLowerCase().includes(keyword));
  });
  const strengths = activeFeedback?.strengths ?? [
    'Bài đã được ghi nhận trong hệ thống và đang nằm đúng luồng mentor review.',
    activeSubmission?.primaryLink ? 'Có link chính để mentor mở sản phẩm, repo hoặc tài liệu bài làm.' : 'Cần bổ sung link chính trước khi mentor đánh giá sâu.',
    activeSubmission?.secondaryLink ? 'Có minh chứng phụ giúp kiểm tra demo, API docs hoặc tài liệu thiết kế.' : 'Có thể thêm demo URL, Figma, deck hoặc video walkthrough.'
  ];
  const improvements = activeFeedback?.improvements ?? [
    'Chờ mentor kiểm tra link, README, minh chứng và mức độ bám rubric.',
    'Nên chuẩn bị mô tả ngắn về nghiệp vụ, quyết định triển khai và phần bản thân trực tiếp làm.',
    'Nếu mentor yêu cầu nộp lại, hãy cập nhật link và ghi rõ thay đổi so với phiên bản trước.'
  ];

  const openRecord = (record) => {
    setActiveFeedbackChallengeId(record.challenge.id);
    setSelectedChallengeId(record.challenge.id);
  };

  const submitStudentMentorRating = () => {
    if (!matchedMentor?.id) return;
    fetch(`${API_BASE_URL}/api/mentors/${matchedMentor.id}/rate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ rating: studentRating, comment: studentComment, studentId: userId })
    })
      .then((res) => res.json())
      .then(() => {
        setRatingNotice(`Cảm ơn bạn đã đánh giá ${studentRating}★ cho ${reviewerName}! Đánh giá này giúp hỗ trợ thưởng / sàng lọc mentor.`);
        setStudentComment('');
      })
      .catch(() => {
        setRatingNotice(`Đã ghi nhận đánh giá ${studentRating}★ cho ${reviewerName}.`);
        setStudentComment('');
      });
  };

  const aiAnalysis = {
    score: activeSubmission?.validationScore ?? 82,
    strengths: [
      '🤖 [Mentor AI]: Cấu trúc URL link chính bắt đầu hợp lệ bằng HTTPS.',
      '🤖 [Mentor AI]: Khai báo đủ từ 2 kỹ năng chuyên ngành trở lên.',
      '🤖 [Mentor AI]: Kiểm tra tiêu chuẩn README & thông tin chạy bài tập đạt điểm hợp lệ 80%.'
    ],
    improvements: [
      '🤖 [Mentor AI]: Đề xuất bổ sung file tài liệu hướng dẫn chạy dự án chi tiết hơn.',
      '🤖 [Mentor AI]: Thêm link demo video walkthrough 1 phút để tăng điểm thuyết phục recruiter.'
    ]
  };

  return (
    <section className="content-page feedback-dashboard-page">
      <div className="section-heading inline">
        <div>
          <p className="mono-label">Mentor feedback center</p>
          <h1>Góp ý từ mentor</h1>
          <p>Xem lại bài đã được đánh giá, bài đang chờ mentor và những phần cần cải thiện trước khi đưa vào portfolio.</p>
        </div>
        <button className="primary-action compact" onClick={() => go('portfolio')}>
          <WandSparkles size={16} />
          Cập nhật portfolio
        </button>
      </div>

      <div className="feedback-summary-grid">
        <StatCard icon={BadgeCheck} title="Đã đánh giá" value={feedbackStats.reviewed} />
        <StatCard icon={Clock} title="Chờ đánh giá" value={feedbackStats.waiting} />
        <StatCard icon={Star} title="Điểm cao" value={feedbackStats.high} />
        <StatCard icon={Sparkles} title="Cần cải thiện" value={feedbackStats.low} />
      </div>

      <section className="feedback-review-layout">
        <aside className="feedback-review-list">
          <div className="feedback-filter-panel">
            <label>
              Tìm bài / mentor
              <input value={feedbackKeyword} onChange={(event) => setFeedbackKeyword(event.target.value)} placeholder="VD: API, Mobile, Anh Trần..." />
            </label>
            <div className="feedback-filter-tabs">
              {filterOptions.map((item) => (
                <button key={item.id} className={feedbackFilter === item.id ? 'active' : ''} onClick={() => setFeedbackFilter(item.id)}>
                  {item.label}
                  <span>{item.count}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="feedback-record-list">
            {filteredRecords.map((record) => {
              const score = Number(record.feedback?.score ?? 0);
              const statusLabel = record.feedback
                ? score >= 85 ? 'Đánh giá cao' : score < 80 ? 'Cần cải thiện' : 'Đã đánh giá'
                : record.submission?.status === 'submitted' ? 'Chờ đánh giá' : record.submission?.status === 'rejected' ? 'Cần nộp lại' : 'Bản nháp';
              return (
                <button key={record.challenge.id} className={`feedback-record-card ${activeRecord?.challenge.id === record.challenge.id ? 'active' : ''}`} onClick={() => openRecord(record)}>
                  <span className={`feedback-status-dot ${record.feedback ? score >= 85 ? 'high' : score < 80 ? 'low' : 'reviewed' : 'waiting'}`}>{record.feedback ? `${score}` : '...'}</span>
                  <div>
                    <strong>{record.challenge.title}</strong>
                    <small>{record.challenge.track} · {statusLabel} · {record.feedback?.reviewer ?? record.submission?.mentor ?? record.challenge.mentor}</small>
                  </div>
                </button>
              );
            })}
            {!filteredRecords.length && <div className="empty-state">Không có bài phù hợp với bộ lọc hiện tại.</div>}
          </div>
        </aside>

        <article className="feedback-detail-card">
          <div className="mentor-dual-flow-tabs">
            <button className={`dual-tab ${dualMode === 'human' ? 'active' : ''}`} onClick={() => setDualMode('human')}>
              <GraduationCap size={16} /> 👨‍🏫 Mentor Thật (Chuyên gia {reviewerName})
            </button>
            <button className={`dual-tab ${dualMode === 'ai' ? 'active' : ''}`} onClick={() => setDualMode('ai')}>
              <Sparkles size={16} /> 🤖 Mentor AI (Chấm tự động 0s)
            </button>
          </div>

          <div className="feedback-detail-hero">
            <span className={`feedback-score-badge ${dualMode === 'ai' ? 'high' : hasFeedback && Number(activeFeedback.score) < 80 ? 'low' : hasFeedback ? 'high' : 'waiting'}`}>
              {dualMode === 'ai' ? aiAnalysis.score : activeFeedback?.score ?? '...'}
            </span>
            <div>
              <p className="mono-label">
                {dualMode === 'ai' ? '🤖 Đánh giá tự động từ Mentor AI' : hasFeedback ? '👨‍🏫 Bài đã được Mentor Thật đánh giá' : '👨‍🏫 Bài đang chờ Mentor Thật review'}
              </p>
              <h2>{activeChallenge.title}</h2>
              <p>
                {dualMode === 'ai'
                  ? 'Phân tích tự động tức thì dựa trên tiêu chuẩn repository, link minh chứng và khai báo kỹ năng.'
                  : hasFeedback
                  ? `${activeFeedback.title}. Reviewer: ${reviewerName}.`
                  : `Bài đang ở trạng thái ${activeSubmission?.status ?? 'chưa nộp'}. Mentor ${reviewerName} sẽ kiểm tra và trả feedback.`}
              </p>
            </div>
          </div>

          <article className="matched-mentor-card feedback-mentor-card feedback-mentor-main">
            <button type="button">
              <span>
                <i className="mono-label">{dualMode === 'ai' ? 'Trợ lý AI' : hasFeedback ? 'Mentor đã feedback' : 'Mentor phụ trách'}</i>
                <strong>{dualMode === 'ai' ? 'Portfolio AI Evaluator' : reviewerName}</strong>
              </span>
              {dualMode === 'ai' ? <Sparkles size={18} /> : <GraduationCap size={18} />}
            </button>
            <div className="matched-mentor-detail">
              <p>{dualMode === 'ai' ? 'Mentor AI chấm điểm checklist 0-100%, kiểm tra độ hợp lệ của URL và định dạng bài nộp.' : matchedMentor.reviewStyle ?? 'Mentor xem link nộp, kiểm tra minh chứng, chấm điểm và gợi ý cách đưa bài vào portfolio.'}</p>
              <div className="tag-row">
                {(matchedMentor.expertise ?? [activeChallenge.track]).map((item) => <span key={item}>{item}</span>)}
              </div>
            </div>
          </article>

          <div className="feedback-grid">
            <article>
              <h3>Điểm mạnh</h3>
              {(dualMode === 'ai' ? aiAnalysis.strengths : strengths).map((item) => <p key={item}>{item}</p>)}
            </article>
            <article>
              <h3>Cần cải thiện</h3>
              {(dualMode === 'ai' ? aiAnalysis.improvements : improvements).map((item) => <p key={item}>{item}</p>)}
            </article>
          </div>

          <div className="student-rating-box">
            <h3><Star size={16} /> Đánh giá Mentor (Quyền lợi Tài khoản Trả phí)</h3>
            <p>Hệ thống tự động dùng đánh giá này để <b>Thưởng thù lao mentor (+15-25%)</b> nếu điểm tốt, hoặc <b>Sàng lọc / Loại bỏ mentor</b> nếu phản hồi tiêu cực.</p>
            <div className="star-rating-selector">
              {[1, 2, 3, 4, 5].map((star) => (
                <button key={star} type="button" className={`star-btn ${studentRating >= star ? 'active' : ''}`} onClick={() => setStudentRating(star)}>
                  <Star size={20} fill={studentRating >= star ? 'gold' : 'none'} color={studentRating >= star ? 'gold' : '#888'} />
                </button>
              ))}
              <span className="rating-num-label">{studentRating} / 5 sao</span>
            </div>
            <textarea
              placeholder="Nhập nhận xét chi tiết về chất lượng góp ý hoặc thái độ hỗ trợ của Mentor..."
              value={studentComment}
              onChange={(e) => setStudentComment(e.target.value)}
            />
            <button className="primary-action compact" type="button" onClick={submitStudentMentorRating}>
              <Send size={15} /> Gửi đánh giá Mentor
            </button>
            {ratingNotice && <div className="status-banner">{ratingNotice}</div>}
          </div>

          <div className="feedback-evidence-grid">
            <div className="code-note">
              <strong>Link chính</strong>
              <span>{activeSubmission?.primaryLink ?? 'Chưa có link chính'}</span>
              <p>{activeSubmission?.notes ?? 'Bài chưa có ghi chú nộp kèm.'}</p>
            </div>
            <div className="code-note">
              <strong>Minh chứng phụ</strong>
              <span>{activeSubmission?.secondaryLink ?? 'Chưa có link phụ'}</span>
              <p>{activeFeedback?.reviewedAt ? `Đánh giá lúc ${activeFeedback.reviewedAt}` : 'Khi mentor chấm xong, thời gian review sẽ hiện tại đây.'}</p>
            </div>
          </div>

          <div className="submit-actions">
            <button className="ghost-action" onClick={() => go(activeFeedback ? 'portfolio' : 'submit')}>
              {activeFeedback ? 'Đưa vào portfolio' : 'Mở bài nộp'}
              <LinkIcon size={16} />
            </button>
            <button className="primary-action" onClick={() => go('hub')}>
              Xem thử thách khác
              <LayoutDashboard size={16} />
            </button>
          </div>
        </article>
      </section>
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
      <div className="portfolio-action-hub-banner" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--jr-card)', border: '1px solid var(--jr-card-border)', borderRadius: '18px', padding: '18px 24px', marginBottom: '20px', flexWrap: 'wrap', gap: '14px' }}>
        <div>
          <span className="mono-label" style={{ color: '#38bdf8' }}>Hồ Sơ Năng Lực Sinh Viên · Portfolio Workspace</span>
          <h1 style={{ margin: '4px 0 2px', fontSize: '22px', fontWeight: 800 }}>Hồ Sơ Portfolio Của {profileName}</h1>
          <p style={{ margin: 0, fontSize: '13px', color: 'var(--jr-text-sub)' }}>
            Lộ trình: <b>{careerGoal}</b> · Trường: <b>{demoUser?.school || 'Đại học FPT'}</b> · {portfolioProjectDetails.length} Dự án đã xác thực
          </p>
        </div>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <button type="button" className="ghost-action compact" onClick={() => setShowPublicPreview((v) => !v)}>
            <LinkIcon size={14} /> {showPublicPreview ? 'Ẩn Public Preview' : 'Trang công khai'}
          </button>
          <button type="button" className="ghost-action compact" onClick={() => go('hub')}>
            <Rocket size={14} /> Thêm dự án mới
          </button>
          <button type="button" className="ghost-action compact" onClick={() => go('feedback')}>
            <BadgeCheck size={14} /> Xem góp ý Mentor
          </button>
          <button type="button" className="jr-btn-primary compact" style={{ padding: '8px 16px', fontSize: '13px' }} onClick={() => setShowPublicPreview(true)}>
            <Sparkles size={14} /> Xem trước Portfolio công khai
          </button>
        </div>
      </div>

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


function VietQrPaymentModal({ isOpen, onClose, plan, currentUser, onPaymentSuccess }) {
  if (!isOpen || !plan) return null;
  const studentMssv = currentUser?.user?.id || currentUser?.user?.mssv || 'SE174281';
  const studentName = currentUser?.user?.name || 'Sinh viên FPT';
  const transferContent = `EXE301 ${plan.id || 'PRO'} ${studentMssv}`;
  const qrPrice = plan.price || 99000;
  const qrUrl = `https://img.vietqr.io/image/MB-0348888888-compact2.png?amount=${qrPrice}&addInfo=${encodeURIComponent(transferContent)}&accountName=EXE301%20FPT%20PORTFOLIO`;

  return (
    <div className="vietqr-modal-overlay" onClick={onClose}>
      <div className="vietqr-modal-card animate-in" onClick={(e) => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
          <h2 style={{ fontSize: '19px', fontWeight: 800, margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Crown size={20} color="#f59e0b" /> Nâng cấp tài khoản {plan.name}
          </h2>
          <button type="button" onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}>
            <X size={20} />
          </button>
        </div>

        <p style={{ fontSize: '13.5px', color: '#64748b', marginBottom: '12px' }}>
          Quét mã VietQR bằng bất kỳ App Ngân hàng hoặc MoMo để kích hoạt đặc quyền {plan.name} và kết nối Mentor trực tiếp.
        </p>

        <div className="vietqr-image-wrapper">
          <img src={qrUrl} alt="VietQR Thanh toán FPT Portfolio" />
        </div>

        <table className="vietqr-details-table">
          <tbody>
            <tr><td>Ngân hàng thụ hưởng</td><td>MB Bank (Ngân hàng Quân Đội)</td></tr>
            <tr><td>Số tài khoản</td><td>0348888888</td></tr>
            <tr><td>Tên chủ tài khoản</td><td>EXE301 FPT PORTFOLIO</td></tr>
            <tr><td>Số tiền</td><td style={{ color: '#059669', fontSize: '16px' }}>{plan.displayPrice || '99.000 đ'}</td></tr>
            <tr><td>Nội dung chuyển khoản</td><td style={{ color: '#2563eb' }}>{transferContent}</td></tr>
            <tr><td>Sinh viên thụ hưởng</td><td>{studentName} ({studentMssv})</td></tr>
          </tbody>
        </table>

        <div style={{ display: 'flex', gap: '10px', marginTop: '16px' }}>
          <button type="button" className="ghost-action" style={{ flex: 1 }} onClick={onClose}>
            Đóng
          </button>
          <button
            type="button"
            className="primary-action"
            style={{ flex: 2, background: 'linear-gradient(135deg, #10b981, #059669)', border: 'none', color: '#fff', fontWeight: 700 }}
            onClick={() => {
              onPaymentSuccess(plan);
              onClose();
            }}
          >
            <CheckCircle2 size={16} /> Tôi đã chuyển khoản thành công
          </button>
        </div>
      </div>
    </div>
  );
}

function PremiumPage({ plans, activeSubscription, upgradePlan, onOpenQr, go }) {
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
            <button className={isActive(plan) ? 'ghost-action' : 'primary-action'} onClick={() => onOpenQr ? onOpenQr(plan) : upgradePlan(plan)}>
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
    <section className="content-page admin-page mentor-page">
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

      <div className="workspace-body mentor-workspace-body">
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
        <button className={adminSection === 'mentors' ? 'active' : ''} onClick={() => setAdminSection('mentors')}><GraduationCap size={16} /> Thanh toán & Sàng lọc Mentor</button>
        <button className={adminSection === 'challenges' ? 'active' : ''} onClick={() => setAdminSection('challenges')}><Blocks size={16} /> Bộ lọc & challenge</button>
        <button className={adminSection === 'users' ? 'active' : ''} onClick={() => setAdminSection('users')}><UserRound size={16} /> Sinh viên & mentor</button>
        <button className={adminSection === 'system' ? 'active' : ''} onClick={() => setAdminSection('system')}><Save size={16} /> Hệ thống</button>
      </aside>

      <div className={`admin-stats workspace-section ${adminSection === 'overview' ? 'active' : ''}`} id="admin-overview">
        <StatCard icon={Rocket} title="KPI Người dùng" value="238 / 300 SV (79.3%)" />
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

      <div className={`admin-grid workspace-section ${adminSection === 'mentors' ? 'active' : ''}`} id="admin-mentors">
        <article className="admin-panel full-width">
          <div className="section-heading inline">
            <div>
              <p className="mono-label">Quản lý Mentor & Thù lao</p>
              <h2>Đối soát Thù lao, Thưởng & Sàng lọc Chất lượng Mentor</h2>
            </div>
          </div>
          <div className="admin-mentor-table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Mentor</th>
                  <th>Chuyên môn</th>
                  <th>Điểm đánh giá SV</th>
                  <th>Chế độ Thưởng</th>
                  <th>Bài đã review</th>
                  <th>Chờ thanh toán</th>
                  <th>Trạng thái</th>
                  <th>Thao tác Admin</th>
                </tr>
              </thead>
              <tbody>
                {mentors.map((mentor) => {
                  const rating = mentor.rating ?? 4.8;
                  const rewardTier = mentor.rewardTier ?? (rating >= 4.8 ? 'Top Rated Mentor (+25%)' : rating >= 4.5 ? 'Mentor Ưu Tú (+15%)' : 'Tiêu chuẩn');
                  const pendingAmount = mentor.pendingPayout ?? 1200000;
                  const status = mentor.status ?? (rating < 3.5 ? 'warning' : 'active');
                  return (
                    <tr key={mentor.id}>
                      <td>
                        <strong>{mentor.name}</strong>
                        <small>{mentor.email}</small>
                      </td>
                      <td>{(mentor.expertise ?? []).slice(0, 2).join(', ') || 'General'}</td>
                      <td>
                        <b>{rating} ★</b> ({mentor.ratingCount ?? 12} đánh giá)
                      </td>
                      <td>
                        <span className={`reward-tag ${rating >= 4.5 ? 'bonus' : ''}`}>{rewardTier}</span>
                      </td>
                      <td>{mentor.completedReviewsCount ?? 15} bài</td>
                      <td><b>{formatVnd(pendingAmount)}</b></td>
                      <td>
                        <span className={`status-tag ${status}`}>{status === 'active' ? 'Hoạt động' : status === 'warning' ? 'Cần sàng lọc' : 'Đã loại'}</span>
                      </td>
                      <td>
                        <div className="table-actions">
                          {pendingAmount > 0 && (
                            <button
                              className="action-btn success"
                              onClick={() => {
                                fetch(`${API_BASE_URL}/api/mentors/${mentor.id}/payout`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ method: 'Chuyển khoản Ngân hàng (Auto-settlement)' }) })
                                  .then(() => { setAdminNotice(`Đã chuyển khoản thanh toán ${formatVnd(pendingAmount)} cho ${mentor.name}`); refreshData(); });
                              }}
                            >
                              <CircleDollarSign size={14} /> Thanh toán
                            </button>
                          )}
                          <button
                            className="action-btn warn"
                            onClick={() => {
                              const newStatus = status === 'warning' ? 'active' : 'warning';
                              fetch(`${API_BASE_URL}/api/mentors/${mentor.id}/status`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status: newStatus, warningReason: 'Cảnh báo chất lượng từ Admin' }) })
                                .then(() => { setAdminNotice(`Đã cập nhật trạng thái mentor ${mentor.name} thành ${newStatus}`); refreshData(); });
                            }}
                          >
                            <ShieldCheck size={14} /> {status === 'warning' ? 'Gỡ cảnh báo' : 'Cảnh báo'}
                          </button>
                          <button
                            className="action-btn danger"
                            onClick={() => {
                              const newStatus = status === 'disqualified' ? 'active' : 'disqualified';
                              fetch(`${API_BASE_URL}/api/mentors/${mentor.id}/status`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status: newStatus, warningReason: 'Tạm loại khỏi hệ thống do đánh giá thấp' }) })
                                .then(() => { setAdminNotice(`Đã ${newStatus === 'disqualified' ? 'loại' : 'kích hoạt lại'} mentor ${mentor.name}`); refreshData(); });
                            }}
                          >
                            <Trash2 size={14} /> {status === 'disqualified' ? 'Mở lại' : 'Loại mentor'}
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
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
