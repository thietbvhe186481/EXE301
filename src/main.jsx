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
      student: ['home', 'cv-gate', 'interview', 'learning', 'pricing', 'about', 'roadmap', 'trends', 'hub', 'join', 'submit', 'feedback', 'portfolio', 'submissionHistory', 'premium'],
      mentor: ['mentor', 'home', 'cv-gate', 'interview', 'learning', 'pricing', 'about', 'roadmap', 'trends'],
      admin: ['admin', 'home', 'cv-gate', 'interview', 'learning', 'pricing', 'about', 'roadmap', 'trends']
    };
    const publicPages = ['home', 'cv-gate', 'interview', 'learning', 'pricing', 'about', 'roadmap', 'trends', 'auth'];
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
      <Header page={page} go={go} currentUser={currentUser} theme={theme} setTheme={setTheme} logout={logout} loginAs={loginAs} />
      <main>
        {flowNotice && <div className="flow-notice status-banner warning"><ShieldCheck size={17} /> {flowNotice}</div>}
        {page === 'home' && <HomePage go={go} />}
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
        {page === 'cv-gate' && <CvGatePage go={go} onUnlockInterview={(res) => setCvResultData(res)} />}
        {page === 'interview' && <InterviewPracticePage go={go} cvResult={cvResultData} mentors={appData.mentors ?? []} />}
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
        {(page === 'premium' || page === 'pricing') && <PremiumPage plans={premiumPlans} activeSubscription={activeSubscription} upgradePlan={upgradePlan} go={go} />}
        {page === 'about' && <AboutPage go={go} />}
        {page === 'mentor' && <MentorPage apiStatus={apiStatus} data={managementData} currentUser={currentUser} refreshData={refreshData} createFeedback={createFeedback} updateSubmissionFromMentor={updateSubmissionFromMentor} setNotice={setAdminNotice} notice={adminNotice} />}
        {page === 'admin' && <AdminPage apiStatus={apiStatus} data={managementData} notice={adminNotice} currentUser={currentUser} refreshData={refreshData} setAdminNotice={setAdminNotice} createFeedback={createFeedback} />}
      </main>
    </div>
  );
}

function Header({ page, go, currentUser, theme, setTheme, logout, loginAs }) {
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
    { id: 'intro', label: 'Trang chủ', icon: Compass, target: 'home' },
    { id: 'roadmap-preview', label: 'Bản đồ nghề', icon: LayoutDashboard, target: 'roadmap' },
    { id: 'hub-preview', label: 'Thử thách dự án', icon: Rocket, target: 'hub' },
    { id: 'portfolio-preview', label: 'Hồ sơ Portfolio', icon: UserRound, target: 'portfolio' },
    { id: 'cv-gate-preview', label: 'Thẩm định CV & ATS', icon: FileUp, target: 'cv-gate' },
    { id: 'interview-preview', label: 'Phỏng vấn AI', icon: MessageSquareText, target: 'interview' },
    { id: 'learning-preview', label: 'Học liệu ĐH', icon: GraduationCap, target: 'learning' },
    { id: 'pricing-preview', label: 'Gói Premium', icon: Crown, target: 'pricing' },
    { id: 'about', label: 'Về chúng tôi', icon: BookOpen, target: 'about' }
  ];
  const navItems = currentUser ? roleFlow : publicFlow;
  const byId = (id) => navItems.find((item) => item.id === id);
  const navGroups = currentRole === 'student'
    ? [
        { id: 'home-nav', label: 'Trang chủ', icon: Compass, target: 'home' },
        { id: 'roadmap', label: 'Bản đồ nghề', icon: LayoutDashboard, target: 'roadmap' },
        { id: 'practice', label: 'Thử thách dự án', icon: Rocket, items: ['hub', 'join', 'submit', 'feedback'].map(byId).filter(Boolean) },
        { id: 'portfolio-nav', label: 'Hồ sơ Portfolio', icon: UserRound, target: 'portfolio' },
        { id: 'cv-gate-nav', label: 'Thẩm định CV', icon: FileUp, target: 'cv-gate' },
        { id: 'interview-nav', label: 'Phỏng Vấn AI', icon: MessageSquareText, target: 'interview' },
        { id: 'learning-nav', label: 'Học liệu ĐH', icon: GraduationCap, target: 'learning' },
        { id: 'premium-direct', label: 'Gói Premium', icon: Crown, target: 'pricing' }
      ]
    : currentRole === 'mentor'
      ? [
          { id: 'mentor-workspace', label: 'Mentor Workspace', icon: GraduationCap, target: 'mentor', matches: ['mentor'] },
          { id: 'portfolio-workspace', label: 'Duyệt Portfolio', icon: UserRound, target: 'portfolio' },
          { id: 'cv-gate-workspace', label: 'Thẩm định CV', icon: FileUp, target: 'cv-gate' },
          { id: 'interview-workspace', label: 'Phỏng vấn AI', icon: MessageSquareText, target: 'interview' },
          { id: 'learning-workspace', label: 'Học liệu ĐH', icon: GraduationCap, target: 'learning' },
          { id: 'home-workspace', label: 'Trang chủ', icon: Compass, target: 'home' }
        ]
      : currentRole === 'admin'
        ? [
            { id: 'admin-workspace', label: 'Admin Workspace', icon: ShieldCheck, target: 'admin', matches: ['admin'] },
            { id: 'portfolio-workspace', label: 'Quản lý Portfolio', icon: UserRound, target: 'portfolio' },
            { id: 'cv-gate-workspace', label: 'Thẩm định CV', icon: FileUp, target: 'cv-gate' },
            { id: 'interview-workspace', label: 'Phỏng vấn AI', icon: MessageSquareText, target: 'interview' },
            { id: 'learning-workspace', label: 'Học liệu ĐH', icon: GraduationCap, target: 'learning' },
            { id: 'home-workspace', label: 'Trang chủ', icon: Compass, target: 'home' }
          ]
        : [
            { id: 'home-public', label: 'Trang chủ', icon: Compass, target: 'home' },
            { id: 'roadmap-preview', label: 'Bản đồ nghề', icon: LayoutDashboard, target: 'roadmap' },
            { id: 'hub-preview', label: 'Thử thách dự án', icon: Rocket, target: 'hub' },
            { id: 'portfolio-public', label: 'Hồ sơ Portfolio', icon: UserRound, target: 'portfolio' },
            { id: 'cv-gate-public', label: 'Thẩm định CV & ATS', icon: FileUp, target: 'cv-gate' },
            { id: 'interview-public', label: 'Luyện phỏng vấn AI', icon: MessageSquareText, target: 'interview' },
            { id: 'learning-public', label: 'Học liệu ĐH', icon: GraduationCap, target: 'learning' },
            { id: 'pricing-public', label: 'Gói Premium', icon: Crown, target: 'pricing' },
            { id: 'about', label: 'Về chúng tôi', icon: BookOpen, target: 'about' }
          ];
  const isNavItemActive = (item) => page === item.id || item.target === page || item.matches?.includes(page);
  const isGroupActive = (group) => group.items?.some(isNavItemActive) || isNavItemActive(group);
  const navigateNavItem = (item) => {
    go(item.target ?? item.id);
    setOpenNavGroup(null);
    setAccountOpen(false);
  };
  const roleLabel = currentUser ? `${(currentRole ?? 'student').toUpperCase()} · ${currentUser.user?.name ?? currentUser.user?.email}` : 'Guest';
  return (
    <header className="topbar">
      <button className="brand" onClick={() => go('home')} aria-label="Portfolio Trang chủ">
        <span className="jr-brand-logo">
          <Rocket size={22} color="#3b82f6" />
          <span>Portfolio</span>
          <span className="jr-brand-badge">CAREER BUILDER</span>
        </span>
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
      {!currentUser && (
        <div className="quick-demo-roles" style={{ display: 'flex', gap: '6px', marginRight: '6px' }}>
          <button type="button" className="ghost-action compact" onClick={() => loginAs('student')} title="Đăng nhập tài khoản Sinh viên FPT">🎓 SV FPT</button>
          <button type="button" className="ghost-action compact" onClick={() => loginAs('mentor')} title="Đăng nhập tài khoản Mentor Doanh nghiệp">👨‍🏫 Mentor</button>
          <button type="button" className="ghost-action compact" onClick={() => loginAs('admin')} title="Đăng nhập tài khoản Admin">🛡️ Admin</button>
        </div>
      )}
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

function AboutPage({ go }) {
  const companyStats = [
    { value: '238/300', label: 'KPI người dùng', note: 'Giai đoạn 1: Đã đạt 79.3% KPI 200-300 Sinh viên' },
    { value: '5+', label: 'Trường ĐH đối tác', note: 'Giáo trình & Đề án từ ĐH Bách Khoa, ĐH FPT, UEH, RMIT, KHTN' },
    { value: '2 loại', label: 'Mentor Review Flow', note: '🤖 Mentor AI tự động & 👨‍🏫 Mentor Thật 1-on-1' },
    { value: '2 quy chuẩn', label: 'Hình thức Review', note: 'Nộp CV / Link bài tập HOẶC Chat trực tiếp với Mentor' }
  ];

  const universityPartners = [
    { school: 'Đại học Bách Khoa TP.HCM', field: 'Công nghệ Thông tin & Khoa học Máy tính', code: 'CO2011, CO3001' },
    { school: 'Đại học FPT', field: 'Software Engineering & AI/Data', code: 'PRN231, SEP490' },
    { school: 'Đại học KHTN TP.HCM', field: 'Kiến trúc phần mềm & Công nghệ dữ liệu', course: 'SE402, CS300' },
    { school: 'Đại học Kinh tế UEH', field: 'Digital Marketing & Content Strategy', code: 'MKT301, MKT502' },
    { school: 'Đại học RMIT Vietnam', field: 'Digital Design & UI UX Design Systems', code: 'DES204, DES310' }
  ];

  const initialStudentReviews = [
    {
      id: 'rev-01',
      name: 'Nguyễn Hoàng Nam',
      school: 'Đại học Bách Khoa TP.HCM',
      major: 'Software Engineering (Năm 4)',
      roleTrack: 'Backend Architecture',
      rating: 5,
      avatarBg: '#8b5cf6',
      outcome: '🎉 Nhận offer Intern Backend Engineer tại Shopee',
      quote: 'Trước đây khi đi phỏng vấn em chỉ có lý thuyết trên trường nên rất tự ti. Nhờ làm thử thách API Ecommerce trên Portfolio và được Mentor Anh Trần góp ý từng dòng code, em có ngay một project xịn để show trong CV. Nhà tuyển dụng rất ấn tượng với README và sơ đồ hệ thống của em!',
      date: '22/09/2026'
    },
    {
      id: 'rev-02',
      name: 'Lê Minh Thu',
      school: 'Đại học RMIT Vietnam',
      major: 'Digital Design (Năm 3)',
      roleTrack: 'UI/UX Design Systems',
      rating: 5,
      avatarBg: '#ec4899',
      outcome: '🚀 Tăng 300% tương tác Behance & nhận job Design Studio',
      quote: 'Em cực kỳ ấn tượng với quy chuẩn nộp bài của nền tảng. Không chỉ làm UI đẹp mà còn phải giải thích User Flow, Design System Token và làm Usability Test. Feedback từ Mentor Vy Hoàng vô cùng tỉ mỉ và sát thực tế doanh nghiệp!',
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
      school: 'Đại học Kinh tế UEH',
      major: 'Digital Marketing (Năm 4)',
      roleTrack: 'Performance Marketing',
      rating: 5,
      avatarBg: '#f59e0b',
      outcome: '📈 Quản lý ngân sách Ads 30M thực tế cho doanh nghiệp',
      quote: 'Tài liệu tham khảo từ giáo trình UEH kết hợp với bài tập lập kế hoạch paid ads trên nền tảng giúp em hiểu sâu về CAC, LTV và A/B Testing. Sự hỗ trợ từ Mentor Trang Võ giúp em có một bộ Case Study Marketing ăn điểm!',
      date: '15/09/2026'
    },
    {
      id: 'rev-05',
      name: 'Vũ Quốc Bảo',
      school: 'Đại học KHTN TP.HCM',
      major: 'Khoa học Máy tính (Năm 3)',
      roleTrack: 'AI / Data Engineer',
      rating: 5,
      avatarBg: '#38bdf8',
      outcome: '🌟 Xuất bản thành công trợ lý AI RAG FAQ có trích dẫn',
      quote: 'Hệ thống bản đồ nghề rất rõ ràng, từng level đều có tiêu chuẩn nộp bài minh bạch. Nhờ đó em không bị lạc hướng giữa hàng trăm công nghệ AI hiện tại.',
      date: '12/09/2026'
    }
  ];

  const [studentReviews, setStudentReviews] = useState(initialStudentReviews);
  const [newReviewForm, setNewReviewForm] = useState({
    name: '',
    school: 'Đại học Bách Khoa TP.HCM',
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
    setNewReviewForm({ name: '', school: 'Đại học Bách Khoa TP.HCM', major: 'Software Engineering', roleTrack: 'Developer', rating: 5, outcome: '', quote: '' });
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
          <p>Trải nghiệm thực tế từ sinh viên các trường ĐH Bách Khoa, ĐH FPT, RMIT, UEH, KHTN đã hoàn thiện Portfolio và chinh phục nhà tuyển dụng.</p>
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
            <button type="button" onClick={() => go('premium')}>Gói Premium</button>
          </div>
          <div>
            <p className="mono-label">Pháp lý & Quy chuẩn</p>
            <span>Điều khoản sử dụng</span>
            <span>Chính sách bảo mật</span>
            <span>Quy chuẩn Mentor Review & Trao thưởng</span>
          </div>
        </div>
      </footer>
    </section>
  );
}

function HomePage({ go }) {
  return (
    <div className="jr-home-wrapper">
      {/* Hero Section */}
      <section className="jr-hero">
        <div className="jr-hero-badge">
          <span className="jr-badge-pulse" />
          <span>HỆ THỐNG XÂY DỰNG PORTFOLIO NGHỀ NGHIỆP · SINH VIÊN ĐẠI HỌC FPT, BÁCH KHOA, KHTN</span>
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
            <h3>Nguồn Học Liệu Đại Học FPT, BK, KHTN</h3>
            <p>Tổng hợp slide bài giảng, ngân hàng câu hỏi và case study thực chiến từ các trường đại học hàng đầu để sinh viên làm dự án.</p>
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

      {/* Student Testimonials / Reviews */}
      <section className="content-page">
        <div className="jr-section-title-wrap">
          <span className="jr-sub-pill">Sinh viên nói gì về chúng tôi</span>
          <h2 className="jr-section-title">Review Từ Các Bạn Sinh Viên Đã Sử Dụng</h2>
          <p className="jr-section-desc">Hơn 250+ sinh viên từ ĐH FPT, Bách Khoa, KHTN đã xây dựng Portfolio chuyên nghiệp và nhận được offer từ doanh nghiệp hàng đầu.</p>
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
                <span>Backend Engineer · ĐH Bách Khoa HN</span>
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
                <span>Data Analyst Intern · ĐH KHTN HCM</span>
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
                <span>Mobile Developer · ĐH Bách Khoa HCM</span>
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
                <span>Fullstack Developer · ĐH KHTN HN</span>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* CTA Bottom Banner */}
      <section className="content-page">
        <div className="jr-cta-banner">
          <h2>Sẵn Sàng Xây Dựng Portfolio Chuẩn Doanh Nghiệp?</h2>
          <p>Tham gia cùng hơn 250+ sinh viên các trường đại học đã sở hữu Portfolio chuyên nghiệp và tự tin nhận offer tuyển dụng.</p>
          <div className="jr-hero-actions" style={{ marginBottom: 0 }}>
            <button className="jr-btn-primary" onClick={() => go('roadmap')}>
              <Rocket size={18} />
              <span>Bắt đầu tạo Portfolio ngay</span>
            </button>
            <button className="jr-btn-secondary" onClick={() => go('portfolio')}>
              <UserRound size={18} />
              <span>Xem mẫu Hồ sơ Portfolio</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

function LearningPage({ go }) {
  const [selectedUni, setSelectedUni] = useState('Tất cả');
  const [downloadNotice, setDownloadNotice] = useState('');
  const [previewItem, setPreviewItem] = useState(null);

  const resources = [
    {
      id: 'res-fpt-1',
      title: 'Bộ 100 Câu Hỏi Phỏng Vấn Frontend & ReactJS Chuyên Sâu',
      uni: 'Đại học FPT',
      cat: 'Bộ đề phỏng vấn',
      downloads: 1240,
      rating: 4.9,
      format: 'PDF · 45 trang',
      desc: 'Tổng hợp từ các buổi phỏng vấn OJT & On-the-job training tại FPT Software, FPT Telecom, VNG.'
    },
    {
      id: 'res-bk-1',
      title: 'Slide Bài Giảng Kiến Trúc Microservices & Distributed System',
      uni: 'Đại học Bách Khoa',
      cat: 'Slide bài giảng',
      downloads: 980,
      rating: 5.0,
      format: 'PDF / Slides · 68 trang',
      desc: 'Giáo trình thiết kế hệ thống chịu tải cao, API Gateway, Docker Container, Message Queue Kafka.'
    },
    {
      id: 'res-khtn-1',
      title: 'Ngân Hàng 50 Case Study Phỏng Vấn System Design & Database Tuning',
      uni: 'Đại học KHTN',
      cat: 'Case study doanh nghiệp',
      downloads: 850,
      rating: 4.8,
      format: 'PDF · 38 trang',
      desc: 'Phân tích các bài toán thiết kế hệ thống thực tế: URL Shortener, Chat Realtime, Rate Limiting.'
    },
    {
      id: 'res-fpt-2',
      title: 'Bộ Template CV Chuẩn ATS Quốc Tế Vượt Qua Vòng Quét Tuyển Dụng',
      uni: 'Đại học FPT',
      cat: 'Template CV chuẩn ATS',
      downloads: 2450,
      rating: 5.0,
      format: 'DOCX / PDF · 5 mẫu',
      desc: 'Mẫu CV cấu trúc 1 cột chuẩn ATS được các nhà tuyển dụng tại Shopee, Momo, FPT Software khuyên dùng.'
    },
    {
      id: 'res-bk-2',
      title: 'Bộ Câu Hỏi Phỏng Vấn Tình Huống Behavioral & Khung STAR Chuẩn',
      uni: 'Đại học Bách Khoa',
      cat: 'Bộ đề phỏng vấn',
      downloads: 1530,
      rating: 4.9,
      format: 'PDF · 30 trang',
      desc: 'Hướng dẫn cách trả lời các câu hỏi hành vi, xử lý xung đột trong team và thương lượng lương thưởng.'
    },
    {
      id: 'res-khtn-2',
      title: 'Tài Liệu Ôn Tập Thuật Toán & Cấu Trúc Dữ Liệu Thi Tuyển Dụng',
      uni: 'Đại học KHTN',
      cat: 'Bộ đề phỏng vấn',
      downloads: 1120,
      rating: 4.9,
      format: 'PDF · 80 trang',
      desc: 'Trọng tâm LeetCode Medium/Easy, Dynamic Programming, Graph, Tree thường gặp trong vòng Tech Test.'
    }
  ];

  const filtered = resources.filter((item) => {
    return selectedUni === 'Tất cả' || item.uni === selectedUni;
  });

  const handleDownload = (item) => {
    setDownloadNotice(`Đang tải xuống "${item.title}" (${item.format})...`);
    setTimeout(() => {
      setDownloadNotice(`✅ Đã tải xuống thành công tài liệu "${item.title}"!`);
      setTimeout(() => setDownloadNotice(''), 3000);
    }, 800);
  };

  return (
    <section className="content-page">
      <div className="section-heading inline">
        <div>
          <p className="mono-label">University Learning Hub</p>
          <h1>Học Liệu & Đề Thi Phỏng Vấn Từ Các Trường Đại Học</h1>
          <p>Kho học liệu liên kết từ ĐH FPT, Bách Khoa, KHTN... giúp sinh viên chuẩn bị kiến thức kỹ thuật và tình huống phỏng vấn vững chắc.</p>
        </div>
      </div>

      {downloadNotice && <div className="status-banner info mb-3">{downloadNotice}</div>}

      <div className="filter-bar mb-4" style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        <span style={{ fontSize: '13px', fontWeight: 600, alignSelf: 'center', marginRight: '6px' }}>Trường ĐH:</span>
        {['Tất cả', 'Đại học FPT', 'Đại học Bách Khoa', 'Đại học KHTN'].map((u) => (
          <button
            key={u}
            type="button"
            className={`ghost-action compact ${selectedUni === u ? 'active' : ''}`}
            onClick={() => setSelectedUni(u)}
          >
            {u}
          </button>
        ))}
      </div>

      <div className="learning-resources-grid">
        {filtered.map((item) => (
          <article className="resource-card" key={item.id}>
            <span className="resource-uni-badge">{item.uni}</span>
            <h3 style={{ fontSize: '16px', fontWeight: 700, margin: '0 0 10px', color: 'var(--jr-text-main)' }}>{item.title}</h3>
            <p style={{ fontSize: '13px', color: 'var(--jr-text-sub)', flexGrow: 1, margin: '0 0 14px', lineHeight: 1.5 }}>{item.desc}</p>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '12px', color: 'var(--jr-text-sub)', borderTop: '1px solid var(--jr-card-border)', paddingTop: '12px', marginBottom: '14px' }}>
              <span>📥 {item.downloads} lượt tải</span>
              <span>⭐ {item.rating} / 5.0</span>
              <span className="chip-tag">{item.format}</span>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button className="ghost-action compact" style={{ flex: 1 }} onClick={() => setPreviewItem(item)}>
                👁️ Xem trước
              </button>
              <button className="primary-action compact" style={{ flex: 1 }} onClick={() => handleDownload(item)}>
                <Download size={14} /> Tải về
              </button>
            </div>
          </article>
        ))}
      </div>

      {previewItem && (
        <div className="modal-backdrop" onClick={() => setPreviewItem(null)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '640px' }}>
            <div className="modal-header">
              <h3>{previewItem.title}</h3>
              <button className="icon-btn" onClick={() => setPreviewItem(null)}><X size={18} /></button>
            </div>
            <div className="modal-body">
              <span className="resource-uni-badge mb-2">{previewItem.uni} · {previewItem.cat}</span>
              <p style={{ margin: '14px 0', lineHeight: 1.6 }}>{previewItem.desc}</p>
              <div style={{ background: 'rgba(255,255,255,0.05)', padding: '16px', borderRadius: '12px', margin: '16px 0' }}>
                <h4 style={{ margin: '0 0 8px', fontSize: '14px' }}>📄 Nội dung tóm tắt:</h4>
                <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '13px', color: 'var(--jr-text-sub)' }}>
                  <li>Chương 1: Khái niệm cốt lõi & Những câu hỏi thường xuyên xuất hiện ở vòng 1</li>
                  <li>Chương 2: Xử lý các câu hỏi bẫy (Tricky questions) của Nhà tuyển dụng</li>
                  <li>Chương 3: Hướng dẫn trả lời theo cấu trúc STAR chi tiết từng bước</li>
                  <li>Chương 4: Bộ tiêu chí đánh giá của Tech Lead & Senior Mentor</li>
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

function CvGatePage({ go, onUnlockInterview }) {
  const [cvText, setCvText] = useState('');
  const [targetRole, setTargetRole] = useState('Frontend Developer');
  const [targetUni, setTargetUni] = useState('Đại học FPT');
  const [targetLevel, setTargetLevel] = useState('Junior');
  const [analyzing, setAnalyzing] = useState(false);
  const [cvResult, setCvResult] = useState(null);
  const [uploadedFileName, setUploadedFileName] = useState('');
  const [isDragOver, setIsDragOver] = useState(false);

  const sampleCVs = {
    'Frontend Developer': `Họ và tên: Trần Hoàng Nam\nEmail: hoangnam.dev@fpt.edu.vn | Điện thoại: 0987654321\nTrường: Đại học FPT (GPA: 3.45/4.0 - Chuyên ngành Kỹ thuật Phần mềm)\nVị trí mong muốn: Frontend Developer (ReactJS / TypeScript)\n\nKINH NGHIỆM & DỰ ÁN:\n1. Dự án E-commerce Web App (Thành viên chính)\n- Công nghệ: ReactJS, TypeScript, Redux Toolkit, TailwindCSS, REST API, Vite, Jest.\n- Xây dựng giao diện responsive, tích hợp giỏ hàng và thanh toán trực tuyến.\n- Tối ưu hiệu năng Lighthouse từ 65 lên 92 điểm nhờ Lazy loading và Memoization.\n\n2. Dự án Quản lý Tuyển dụng Nội bộ (Đồ án tốt nghiệp tại ĐH FPT)\n- Phát triển module ATS lọc hồ sơ và chat realtime bằng Socket.IO.\n- Viết Unit Test với Jest đạt 80% code coverage.\n\nKỸ NĂNG CHUYÊN MÔN:\n- Ngôn ngữ: JavaScript (ES6+), TypeScript, HTML5, CSS3, SCSS\n- Frameworks/Libs: ReactJS, Next.js, Redux Toolkit, React Query\n- Công cụ: Git, Docker, Postman, Figma, CI/CD GitHub Actions`,
    'Backend Developer': `Họ và tên: Lê Tuấn Anh\nEmail: anh.letuan@hcmut.edu.vn | Điện thoại: 0912345678\nTrường: Đại học Bách Khoa TP.HCM (GPA: 3.3/4.0)\nVị trí mong muốn: Backend Developer (Node.js / Express / MongoDB)\n\nKINH NGHIỆM & DỰ ÁN:\n1. Hệ thống Backend Xử lý Đơn hàng E-commerce\n- Công nghệ: Node.js, Express, MongoDB, Redis, Docker, JWT Authentication.\n- Thiết kế kiến trúc RESTful API phục vụ 10,000+ request/phút, giảm 40% latency nhờ cache Redis.\n- Triển khai phân quyền RBAC và mã hóa mật khẩu an toàn.\n\n2. Hệ thống Notification & Message Queue\n- Sử dụng RabbitMQ để xử lý bất đồng bộ gửi email và push notification.\n\nKỸ NĂNG CHUYÊN MÔN:\n- Backend: Node.js, Express, Go, RESTful API, GraphQL\n- Database: MongoDB, PostgreSQL, Redis, MySQL\n- DevOps/Tools: Docker, Git, CI/CD, Linux, Postman`,
    'AI / Data Engineer': `Họ và tên: Đặng Minh Triết\nEmail: triet.dang@hcmus.edu.vn | Điện thoại: 0903334444\nTrường: Đại học Khoa học Tự nhiên TP.HCM (GPA: 3.6/4.0)\nVị trí mong muốn: AI / Data Engineer (Python / Machine Learning)\n\nKINH NGHIỆM & DỰ ÁN:\n1. Mô hình Phân loại Hồ sơ Tuyển dụng & Matching JD\n- Sử dụng Python, PyTorch, Transformers (BERT), Sentence-BERT để tính toán vector similarity.\n- Độ chính xác F1-score đạt 89% trên tập dữ liệu 5,000 hồ sơ.\n\n2. Xây dựng Pipeline ETL Dữ liệu Tài chính\n- Sử dụng Apache Spark, Pandas, SQL và PostgreSQL để làm sạch dữ liệu lớn.\n\nKỸ NĂNG CHUYÊN MÔN:\n- Ngôn ngữ: Python, SQL, C++\n- Frameworks: PyTorch, Scikit-learn, TensorFlow, Pandas, NumPy, FastAPI\n- Công cụ: Git, Docker, Jupyter, MLflow`
  };

  const applySampleCV = (role) => {
    setTargetRole(role);
    setCvText(sampleCVs[role] || sampleCVs['Frontend Developer']);
    setUploadedFileName(`Sample_${role.replace(/\s+/g, '_')}_CV.pdf`);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFileName(file.name);
      if (file.type === 'text/plain' || file.name.endsWith('.txt')) {
        const reader = new FileReader();
        reader.onload = (event) => setCvText(event.target.result);
        reader.readAsText(file);
      } else {
        // Simulated ATS text extraction for PDF/Word
        setCvText(`[Đã trích xuất văn bản từ ${file.name} - Kích thước ${(file.size / 1024).toFixed(1)} KB]\n\nHọ và tên: Ứng viên ${targetUni}\nVị trí: ${targetRole}\nHọc vấn: ${targetUni} (GPA: 3.4/4.0)\nKinh nghiệm: 1+ năm phát triển ứng dụng công nghệ, tham gia dự án thực tế.\nKỹ năng: React, Node.js, TypeScript, REST API, Git, Docker, Agile/Scrum, HTML5, CSS3.\nDự án: Xây dựng hệ thống web responsive và tối ưu trải nghiệm người dùng.`);
      }
    }
  };

  const handleAnalyze = () => {
    if (!cvText.trim()) return;
    setAnalyzing(true);

    setTimeout(() => {
      const text = cvText.toLowerCase();

      // Role-specific keyword dictionaries
      const roleKeywords = {
        'Frontend Developer': ['react', 'typescript', 'javascript', 'html', 'css', 'redux', 'api', 'git', 'vite', 'tailwind', 'jest', 'responsive'],
        'Backend Developer': ['node', 'express', 'mongodb', 'sql', 'database', 'docker', 'redis', 'api', 'jwt', 'rest', 'git', 'microservices'],
        'AI / Data Engineer': ['python', 'pytorch', 'machine learning', 'sql', 'pandas', 'nlp', 'data', 'spark', 'fastapi', 'git', 'docker', 'model']
      };

      const expectedKeywords = roleKeywords[targetRole] || ['git', 'api', 'project', 'agile', 'database', 'teamwork', 'communication'];
      const foundKeywords = expectedKeywords.filter((kw) => text.includes(kw));
      const missingKeywords = expectedKeywords.filter((kw) => !text.includes(kw));

      const keywordScore = Math.min(25, Math.round((foundKeywords.length / expectedKeywords.length) * 25));
      const hasMetrics = text.includes('%') || text.includes('kpi') || text.includes('tối ưu') || text.includes('latency') || text.includes('gpa');
      const metricsScore = hasMetrics ? 23 : 14;
      const lengthScore = Math.min(25, Math.floor(cvText.length / 40) + 12);
      const uniScore = text.includes('đại học') || text.includes('fpt') || text.includes('bách khoa') || text.includes('khtn') ? 25 : 18;

      const totalScore = Math.min(96, Math.max(55, Math.round((keywordScore + metricsScore + lengthScore + uniScore) / 4 * 3.8)));
      const isQualified = totalScore >= 60;

      const result = {
        totalScore,
        isQualified,
        targetRole,
        targetUni,
        targetLevel,
        foundKeywords,
        missingKeywords,
        breakdown: {
          techStack: Math.min(100, Math.round((keywordScore / 25) * 100)),
          atsFormat: Math.min(100, Math.round((lengthScore / 25) * 100)),
          impactMetrics: Math.min(100, Math.round((metricsScore / 25) * 100)),
          education: Math.min(100, Math.round((uniScore / 25) * 100))
        },
        strengths: [
          `Định dạng bố cục rõ ràng, ATS đọc và trích xuất thông tin thuận lợi.`,
          `Tìm thấy ${foundKeywords.length}/${expectedKeywords.length} từ khóa chuyên môn cốt lõi của vị trí ${targetRole}.`,
          `Nêu rõ thông tin học vấn từ ${targetUni}, tạo sự tin cậy cao với nhà tuyển dụng.`
        ],
        improvements: missingKeywords.length > 0 ? [
          `Nên bổ sung các từ khóa công nghệ còn thiếu: ${missingKeywords.slice(0, 4).join(', ')}.`,
          `Cần thêm các con số định lượng kết quả (% cải thiện tốc độ, số lượng người dùng thực tế, doanh thu).`,
          `Đính kèm đường dẫn GitHub hoặc link sản phẩm demo trực tiếp để chứng minh năng lực thực tế.`
        ] : [
          `Bổ sung thêm chứng chỉ chuyên ngành quốc tế (AWS, Google Cloud, Microsoft).`,
          `Nêu bật vai trò lãnh đạo hoặc làm việc nhóm theo mô hình Agile/Scrum.`
        ]
      };

      setCvResult(result);
      setAnalyzing(false);
    }, 1100);
  };

  return (
    <section className="content-page cv-gate-container">
      <div className="section-heading inline">
        <div>
          <p className="mono-label">CV Gate · Tiêu Chuẩn Thẩm Định ATS JobReady</p>
          <h1>Thẩm Định & Chấm Điểm CV Bằng AI Trong 30 Giây</h1>
          <p>Tải lên file CV hoặc dán nội dung để hệ thống kiểm tra độ tương thích ATS, phát hiện từ khóa còn thiếu và mở khóa phòng phỏng vấn.</p>
        </div>
      </div>

      <div className="cv-gate-grid">
        <article className="cv-input-card">
          <h3 style={{ fontSize: '17px', fontWeight: 700, marginBottom: '14px' }}>1. Thiết lập vị trí ứng tuyển & Tải lên hồ sơ</h3>
          
          <div className="form-grid-2 mb-3">
            <div className="form-group">
              <label>Vị trí ứng tuyển mục tiêu:</label>
              <select value={targetRole} onChange={(e) => setTargetRole(e.target.value)}>
                <option value="Frontend Developer">Frontend Developer (React / TS)</option>
                <option value="Backend Developer">Backend Developer (Node / Go / DB)</option>
                <option value="AI / Data Engineer">AI / Data Engineer (Python / ML)</option>
              </select>
            </div>

            <div className="form-group">
              <label>Trường Đại học đào tạo:</label>
              <select value={targetUni} onChange={(e) => setTargetUni(e.target.value)}>
                <option value="Đại học FPT">Đại học FPT</option>
                <option value="Đại học Bách Khoa">Đại học Bách Khoa TP.HCM / HN</option>
                <option value="Đại học KHTN">Đại học Khoa học Tự nhiên</option>
                <option value="Trường ĐH khác">Trường Đại học khác</option>
              </select>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '8px', marginBottom: '14px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '12px', color: 'var(--jr-text-sub)', alignSelf: 'center' }}>Thử nhanh với mẫu:</span>
            <button type="button" className="ghost-action compact" onClick={() => applySampleCV('Frontend Developer')}>Mẫu CV Frontend FPT</button>
            <button type="button" className="ghost-action compact" onClick={() => applySampleCV('Backend Developer')}>Mẫu CV Backend Bách Khoa</button>
            <button type="button" className="ghost-action compact" onClick={() => applySampleCV('AI / Data Engineer')}>Mẫu CV AI KHTN</button>
          </div>

          <div
            className={`cv-upload-zone ${isDragOver ? 'dragover' : ''}`}
            onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
            onDragLeave={() => setIsDragOver(false)}
            onDrop={(e) => {
              e.preventDefault();
              setIsDragOver(false);
              const file = e.dataTransfer.files?.[0];
              if (file) {
                setUploadedFileName(file.name);
                setCvText(`[File ${file.name}] Họ và tên: Ứng viên ${targetUni}\nVị trí: ${targetRole}\nKỹ năng: React, Node.js, TypeScript, REST API, Git, Docker, Jest.`);
              }
            }}
          >
            <div className="cv-upload-icon"><FileUp size={28} /></div>
            <p style={{ margin: '0 0 6px', fontWeight: 600, color: 'var(--jr-text-main)' }}>
              Kéo thả file CV (PDF, DOCX, TXT) vào đây hoặc click để chọn file
            </p>
            <span style={{ fontSize: '12px', color: 'var(--jr-text-sub)' }}>Hỗ trợ định dạng PDF, DOCX, TXT dưới 10MB</span>
            <input
              type="file"
              accept=".pdf,.doc,.docx,.txt"
              onChange={handleFileUpload}
              style={{ display: 'none' }}
              id="cv-file-input"
            />
            <div style={{ marginTop: '12px' }}>
              <label htmlFor="cv-file-input" className="jr-btn-secondary" style={{ padding: '8px 18px', fontSize: '13px' }}>
                Chọn file từ máy tính
              </label>
            </div>
            {uploadedFileName && (
              <div style={{ marginTop: '10px', fontSize: '13px', color: '#38bdf8', fontWeight: 600 }}>
                📄 {uploadedFileName} (Đã nạp thành công)
              </div>
            )}
          </div>

          <div className="or-divider">— hoặc dán văn bản CV trực tiếp —</div>

          <textarea
            rows={7}
            value={cvText}
            onChange={(e) => setCvText(e.target.value)}
            placeholder="Dán toàn bộ nội dung CV của bạn vào đây (Họ tên, Vị trí, Học vấn, Kinh nghiệm dự án, Kỹ năng công nghệ, Thành tựu...)..."
            style={{ width: '100%', borderRadius: '12px', padding: '14px', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--jr-card-border)', color: 'inherit' }}
          />

          <button
            className="jr-btn-primary wide mt-3"
            style={{ width: '100%', justifyContent: 'center' }}
            onClick={handleAnalyze}
            disabled={analyzing || !cvText.trim()}
          >
            {analyzing ? (
              <>
                <RefreshCw size={18} className="spin" />
                <span>AI đang phân tích từ khóa & ATS...</span>
              </>
            ) : (
              <>
                <Sparkles size={18} />
                <span>Thẩm Định & Chấm Điểm CV Chuẩn ATS Ngay</span>
              </>
            )}
          </button>
        </article>

        {cvResult && (
          <article className="cv-result-card animate-in">
            <div className="cv-score-gauge-card">
              <div className="gauge-circle" style={{ borderColor: cvResult.totalScore >= 70 ? '#10b981' : '#f59e0b' }}>
                <span className="score-val" style={{ color: cvResult.totalScore >= 70 ? '#10b981' : '#f59e0b' }}>{cvResult.totalScore}</span>
                <span className="score-max">/ 100 ĐIỂM</span>
              </div>
              <div>
                <span className={`status-badge-pill ${cvResult.isQualified ? 'pass' : 'fail'}`}>
                  {cvResult.isQualified ? '🎉 ĐẠT CHUẨN ATS (ĐỦ ĐIỀU KIỆN PHỎNG VẤN)' : '⚠️ CẦN BỔ SUNG TỪ KHÓA (>= 60 ĐIỂM)'}
                </span>
                <h3 style={{ margin: '8px 0 4px', fontSize: '18px' }}>
                  {cvResult.isQualified ? 'Hồ sơ đạt tiêu chuẩn tuyển dụng!' : 'Hồ sơ chưa tối ưu chuẩn ATS!'}
                </h3>
                <p style={{ margin: 0, fontSize: '13px', color: 'var(--jr-text-sub)' }}>
                  Vị trí đánh giá: <b>{cvResult.targetRole}</b> · Đối chiếu tiêu chuẩn tuyển dụng 2026
                </p>
              </div>
            </div>

            {/* 4 Pillars */}
            <div className="score-breakdown-grid mb-3">
              <div className="breakdown-item">
                <span>Chuyên Môn & Kỹ Thuật</span>
                <strong>{cvResult.breakdown.techStack}%</strong>
              </div>
              <div className="breakdown-item">
                <span>Định Dạng Chuẩn ATS</span>
                <strong>{cvResult.breakdown.atsFormat}%</strong>
              </div>
              <div className="breakdown-item">
                <span>Số Liệu Đo Lường (Impact)</span>
                <strong>{cvResult.breakdown.impactMetrics}%</strong>
              </div>
              <div className="breakdown-item">
                <span>Học Vấn & Trường ĐH</span>
                <strong>{cvResult.breakdown.education}%</strong>
              </div>
            </div>

            {/* Found vs Missing Keywords */}
            <div className="cv-keywords-grid">
              <div className="keywords-card">
                <h4 style={{ color: '#34d399' }}><CheckCircle2 size={16} /> Từ khóa tìm thấy ({cvResult.foundKeywords.length})</h4>
                <div className="keyword-chips">
                  {cvResult.foundKeywords.map((kw, i) => (
                    <span key={i} className="chip-tag found">{kw}</span>
                  ))}
                </div>
              </div>
              <div className="keywords-card">
                <h4 style={{ color: '#f87171' }}><AlertCircle size={16} /> Từ khóa nên bổ sung ({cvResult.missingKeywords.length})</h4>
                <div className="keyword-chips">
                  {cvResult.missingKeywords.length > 0 ? (
                    cvResult.missingKeywords.map((kw, i) => (
                      <span key={i} className="chip-tag missing">+{kw}</span>
                    ))
                  ) : (
                    <span style={{ fontSize: '12px', color: 'var(--jr-text-sub)' }}>Đầy đủ từ khóa trọng tâm!</span>
                  )}
                </div>
              </div>
            </div>

            {/* Detailed feedback */}
            <div className="cv-analysis-details">
              <div className="details-box strengths">
                <h4><Check size={16} /> Điểm mạnh nổi bật</h4>
                <ul>
                  {cvResult.strengths.map((item, idx) => <li key={idx}>{item}</li>)}
                </ul>
              </div>
              <div className="details-box improvements">
                <h4><Sparkles size={16} /> Khuyến nghị cải thiện quan trọng</h4>
                <ul>
                  {cvResult.improvements.map((item, idx) => <li key={idx}>{item}</li>)}
                </ul>
              </div>
            </div>

            {cvResult.isQualified && (
              <button
                className="jr-btn-primary wide mt-4"
                style={{ width: '100%', justifyContent: 'center', padding: '16px 24px', fontSize: '16px' }}
                onClick={() => {
                  if (onUnlockInterview) onUnlockInterview(cvResult);
                  go('interview');
                }}
              >
                <Mic size={20} />
                <span>Mở Khóa & Bắt Đầu Phỏng Vấn AI Với CV Này Ngay</span>
                <ArrowRight size={18} />
              </button>
            )}
          </article>
        )}
      </div>
    </section>
  );
}

function InterviewPracticePage({ go, cvResult, mentors }) {
  const [step, setStep] = useState('setup');
  const [position, setPosition] = useState(cvResult?.targetRole || 'Frontend Developer');
  const [level, setLevel] = useState('Junior');
  const [mode, setMode] = useState('mixed');
  const [interviewer, setInterviewer] = useState('ai');
  
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState({});
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [hint, setHint] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [speechNotice, setSpeechNotice] = useState('');
  const [aiEval, setAiEval] = useState(null);
  const [evaluating, setEvaluating] = useState(false);
  const [report, setReport] = useState(null);

  const questionBank = {
    'Frontend Developer': [
      {
        id: 1,
        type: 'Technical',
        question: 'Giải thích sự khác biệt giữa State và Props trong ReactJS. Khi nào bạn sử dụng Context API hoặc Redux Toolkit để quản lý state toàn cục?',
        sampleAnswer: 'Props là dữ liệu truyền từ component cha xuống con (read-only), còn State là dữ liệu nội bộ mà component tự quản lý. Tôi dùng State cục bộ cho form/toggle, và dùng Redux Toolkit cho dữ liệu chia sẻ toàn ứng dụng như Authentication state và Giỏ hàng để tránh hiện tượng prop drilling và tối ưu re-render.'
      },
      {
        id: 2,
        type: 'Technical',
        question: 'Bạn áp dụng các kỹ thuật nào (Lazy loading, Code splitting, useMemo, React.memo, Virtualization) để tối ưu trang web React có hàng nghìn phần tử?',
        sampleAnswer: 'Tôi sử dụng React.lazy kết hợp Suspense để code-splitting theo router, thư viện react-window để render danh sách dài 10,000 item chỉ trong viewport. Ngoài ra dùng useMemo cho các hàm tính toán nặng và React.memo để ngăn chặn re-render không cần thiết.'
      },
      {
        id: 3,
        type: 'Behavioral',
        question: 'Mô tả một tình huống bạn tranh luận với Designer hoặc Backend Developer về giao diện/API và cách bạn tìm ra giải pháp tối ưu theo chuẩn STAR?',
        sampleAnswer: 'Tình huống (S): Designer yêu cầu animation 3D phức tạp gây giật khung hình trên mobile. Nhiệm vụ (T): Giữ trải nghiệm mượt mà 60fps mà không phá vỡ thiết kế. Hành động (A): Tôi đo đạc FPS bằng Chrome DevTools, họp cùng Designer đề xuất giải pháp CSS transform kết hợp Lottie animation nhẹ hơn 80%. Kết quả (R): Trang load nhanh gấp 3 lần và được Designer đồng thuận.'
      }
    ],
    'Backend Developer': [
      {
        id: 1,
        type: 'Technical',
        question: 'Phân biệt RESTful API và GraphQL. Cách bạn triển khai xác thực JWT (Access Token & Refresh Token) an toàn trong Node.js?',
        sampleAnswer: 'REST tổ chức theo endpoints tài nguyên, trong khi GraphQL cho phép client chỉ định chính xác các field cần lấy để tránh over-fetching. Khi triển khai JWT, tôi lưu Access Token trong Memory/Header với thời hạn 15 phút, và lưu Refresh Token trong HttpOnly Secure Cookie với thời hạn 7 ngày kèm cơ chế Token Rotation trong Redis.'
      },
      {
        id: 2,
        type: 'Technical',
        question: 'Tránh lỗi N+1 Query trong ORM như thế nào? Cách bạn đánh chỉ mục (Index) database để tăng tốc truy vấn MongoDB/PostgreSQL?',
        sampleAnswer: 'Tôi tránh N+1 Query bằng cách sử dụng Eager Loading (populate/include hoặc join thay vì lặp qua từng bản ghi). Về indexing, tôi đánh Composite Index trên các trường thường xuyên xuất hiện trong WHERE và ORDER BY, đồng thời dùng EXPLAIN ANALYZE để đo thời gian quét index.'
      },
      {
        id: 3,
        type: 'Behavioral',
        question: 'Kể lại một sự cố Production nghẽn mạng hoặc tràn RAM và các bước bạn truy vết log & khắc phục sự cố?',
        sampleAnswer: 'Tình huống (S): Server Node.js bị restart liên tục do Memory Leak vào giờ cao điểm. Nhiệm vụ (T): Xác định nguyên nhân và đưa hệ thống hoạt động ổn định trong 30 phút. Hành động (A): Tôi kiểm tra log Grafana/Kibana, phát hiện hàm xử lý file PDF đọc toàn bộ file vào Buffer thay vì dùng Stream. Tôi sửa lại dùng Streams pipe trực tiếp ra S3. Kết quả (R): RAM giảm từ 95% về 25% và không còn tình trạng crash server.'
      }
    ],
    'AI / Data Engineer': [
      {
        id: 1,
        type: 'Technical',
        question: 'Giải thích hiện tượng Overfitting trong Machine Learning. Bạn sử dụng các phương pháp nào (Regularization, Dropout, Cross-validation, Early stopping) để khắc phục?',
        sampleAnswer: 'Overfitting xảy ra khi mô hình học quá kỹ nhiễu của tập Train và không tổng quát hóa tốt trên tập Test. Tôi áp dụng L2 Regularization, Dropout rate 0.2 - 0.5 trong mạng nơ-ron, K-Fold Cross Validation và Early Stopping theo dõi validation loss.'
      },
      {
        id: 2,
        type: 'Technical',
        question: 'Quy trình xây dựng Pipeline xử lý dữ liệu lớn (ETL) từ thu thập, làm sạch đến nạp vào Data Warehouse được bạn thiết kế ra sao?',
        sampleAnswer: 'Tôi sử dụng Apache Kafka để ingest streaming data, Apache Spark để xử lý batch và deduplicate dữ liệu lỗi, sau đó nạp vào PostgreSQL/ClickHouse với schema star schema và lập lịch bằng Airflow.'
      },
      {
        id: 3,
        type: 'Behavioral',
        question: 'Bạn xử lý như thế nào khi dữ liệu khách hàng cung cấp bị thiếu sót nghiêm trọng hoặc gán nhãn sai lệch?',
        sampleAnswer: 'Tôi thống kê tỷ lệ missing values, phân tích xem có ngẫu nhiên hay không. Dùng KNN Imputation hoặc Median cho dữ liệu số, gán nhãn Unspecified cho dữ liệu phân loại, và tổ chức buổi làm việc với Domain Expert để chuẩn hóa lại quy tắc gán nhãn.'
      }
    ]
  };

  const questions = questionBank[position] || questionBank['Frontend Developer'];

  const toggleSpeechRecognition = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setSpeechNotice('Trình duyệt của bạn chưa hỗ trợ Web Speech API trực tiếp. Bạn có thể nhập câu trả lời vào ô văn bản bên dưới!');
      return;
    }

    if (isRecording) {
      if (window._currentRecognition) {
        window._currentRecognition.stop();
      }
      setIsRecording(false);
      setSpeechNotice('');
    } else {
      try {
        const recognition = new SpeechRecognition();
        recognition.lang = 'vi-VN';
        recognition.continuous = true;
        recognition.interimResults = true;

        recognition.onresult = (event) => {
          let text = '';
          for (let i = event.resultIndex; i < event.results.length; i++) {
            text += event.results[i][0].transcript;
          }
          if (text) {
            setCurrentAnswer((prev) => (prev ? prev + ' ' : '') + text);
          }
        };

        recognition.onerror = () => {
          setIsRecording(false);
        };

        recognition.onend = () => {
          setIsRecording(false);
        };

        window._currentRecognition = recognition;
        recognition.start();
        setIsRecording(true);
        setSpeechNotice('🎙️ Đang lắng nghe giọng nói của bạn bằng Tiếng Việt... Hãy tự tin nói!');
      } catch {
        setSpeechNotice('Không thể kích hoạt microphone. Vui lòng cấp quyền micro cho trình duyệt!');
        setIsRecording(false);
      }
    }
  };

  const startInterview = () => {
    setStep('room');
    setCurrentIdx(0);
    setAnswers({});
    setCurrentAnswer('');
    setHint('');
    setAiEval(null);
    if (isRecording && window._currentRecognition) {
      window._currentRecognition.stop();
      setIsRecording(false);
    }
  };

  const showAiHint = () => {
    const q = questions[currentIdx];
    if (q.type === 'Technical') {
      setHint('💡 Gợi ý AI: Hãy nêu rõ bản chất khái niệm cốt lõi, đưa ra ví dụ bằng dòng lệnh/code minh họa và phân tích ưu/nhược điểm.');
    } else {
      setHint('💡 Gợi ý AI: Trả lời theo cấu trúc STAR (S - Situation: Tình huống -> T - Task: Nhiệm vụ -> A - Action: Hành động công nghệ -> R - Result: Kết quả đo lường).');
    }
  };

  const handleEvaluateAnswer = () => {
    if (!currentAnswer.trim()) return;
    setEvaluating(true);

    setTimeout(() => {
      const len = currentAnswer.length;
      const text = currentAnswer.toLowerCase();
      const hasSTAR = text.includes('tình huống') || text.includes('kết quả') || text.includes('giải pháp') || text.includes('dự án') || text.includes('tối ưu');
      const score = Math.min(95, Math.max(68, Math.floor(len / 10) + (hasSTAR ? 35 : 20)));

      setAiEval({
        score,
        star: {
          situation: 'Bối cảnh dự án được mô tả rõ ràng, đúng trọng tâm câu hỏi.',
          task: 'Xác định chính xác trách nhiệm và thách thức cần giải quyết.',
          action: 'Các giải pháp kỹ thuật và bước thực thi mạch lạc, tự tin.',
          result: hasSTAR ? 'Có con số và kết quả đo lường cụ thể.' : 'Nên bổ sung thêm % đo lường hiệu năng hoặc số liệu cụ thể.'
        },
        strengths: [
          'Tư duy logic tốt, ngôn ngữ diễn đạt gãy gọn chuẩn thuật ngữ chuyên ngành.',
          'Nêu đúng bản chất vấn đề và giải pháp thực thi khả thi.'
        ],
        improvements: [
          'Có thể nhấn mạnh thêm các trade-off (rủi ro và điểm đánh đổi) khi chọn giải pháp này.'
        ],
        sample: questions[currentIdx].sampleAnswer
      });
      setEvaluating(false);
    }, 900);
  };

  const handleNext = () => {
    const updatedAnswers = { ...answers, [currentIdx]: currentAnswer };
    setAnswers(updatedAnswers);
    setCurrentAnswer('');
    setHint('');
    setAiEval(null);
    if (isRecording && window._currentRecognition) {
      window._currentRecognition.stop();
      setIsRecording(false);
    }

    if (currentIdx < questions.length - 1) {
      setCurrentIdx(currentIdx + 1);
    } else {
      const overall = 88;
      const sessionReport = {
        overallScore: overall,
        technicalScore: 90,
        communicationScore: 86,
        starScore: 88,
        problemSolvingScore: 88,
        position,
        level,
        date: new Date().toLocaleDateString('vi-VN'),
        strengths: [
          'Nắm vững bản chất cốt lõi của công nghệ và cấu trúc trả lời mạch lạc.',
          'Giải thích rõ ràng các ví dụ thực tế và giải pháp tối ưu theo chuẩn STAR.',
          'Thái độ tự tin, tư duy logic phản biện sắc bén.'
        ],
        improvements: [
          'Cần bổ sung thêm ví dụ đo lường cụ thể (thời gian phản hồi API, chỉ số Lighthouse).',
          'Nêu rõ các phương án dự phòng khi hệ thống gặp tải cao bất ngờ.'
        ]
      };
      setReport(sessionReport);
      try {
        const history = JSON.parse(localStorage.getItem('jr_interview_history') || '[]');
        history.unshift(sessionReport);
        localStorage.setItem('jr_interview_history', JSON.stringify(history.slice(0, 10)));
      } catch {
        // ignore storage errors
      }
      setStep('report');
    }
  };

  return (
    <section className="content-page interview-practice-page">
      <div className="section-heading inline">
        <div>
          <p className="mono-label">Interactive AI & Mentor Room</p>
          <h1>Luyện Tập Phỏng Vấn Thích Ứng (AI & Mentor Thật)</h1>
          <p>Mô phỏng phỏng vấn thực tế với công nghệ nhận diện giọng nói tiếng Việt. Nhận phản hồi tức thì từ AI hoặc đặt lịch mock interview 1-on-1 với Mentor chuyên gia!</p>
        </div>
      </div>

      {step === 'setup' && (
        <article className="interview-setup-card">
          <h2>1. Cấu Hình Buổi Phỏng Vấn</h2>
          <div className="setup-form-grid">
            <div className="form-group">
              <label>Vị trí phỏng vấn:</label>
              <select value={position} onChange={(e) => setPosition(e.target.value)}>
                <option value="Frontend Developer">Frontend Developer (React / TS)</option>
                <option value="Backend Developer">Backend Developer (Node.js / Express / DB)</option>
                <option value="AI / Data Engineer">AI / Data Engineer (Python / ML)</option>
              </select>
            </div>

            <div className="form-group">
              <label>Cấp độ mong muốn (Level):</label>
              <select value={level} onChange={(e) => setLevel(e.target.value)}>
                <option value="Intern">Intern (Thực tập sinh)</option>
                <option value="Junior">Junior (1-2 năm kinh nghiệm)</option>
                <option value="Mid-level">Mid-level (2-4 năm kinh nghiệm)</option>
                <option value="Senior">Senior (4+ năm kinh nghiệm)</option>
              </select>
            </div>

            <div className="form-group">
              <label>Dạng câu hỏi:</label>
              <select value={mode} onChange={(e) => setMode(e.target.value)}>
                <option value="mixed">Hỗn hợp (Technical + Khung STAR Behavioral)</option>
                <option value="technical">Kỹ thuật chuyên sâu (Technical Deep-dive)</option>
                <option value="behavioral">Tình huống & Hành vi (Behavioral STAR)</option>
              </select>
            </div>

            <div className="form-group">
              <label>Người phỏng vấn (Interviewer):</label>
              <select value={interviewer} onChange={(e) => setInterviewer(e.target.value)}>
                <option value="ai">🤖 Trợ lý AI Phỏng Vấn (Phản hồi tức thì 0đ)</option>
                <option value="mentor">👨‍🏫 Đặt Lịch Mock Interview 1-on-1 Với Mentor Thật</option>
              </select>
            </div>
          </div>

          <div className="setup-actions mt-4">
            <button className="jr-btn-primary wide" style={{ width: '100%', justifyContent: 'center' }} onClick={startInterview}>
              <Mic size={18} />
              <span>Bắt Đầu Vào Phòng Phỏng Vấn Ngay</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </article>
      )}

      {step === 'room' && (
        <article className="interview-room-box animate-in">
          <div className="interviewer-header">
            <div className="interviewer-avatar">
              <Mic size={24} />
            </div>
            <div style={{ flexGrow: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                <span style={{ fontWeight: 800, fontSize: '16px', color: 'var(--jr-text-main)' }}>AI Senior Tech Interviewer</span>
                <span className="chip-tag found" style={{ fontSize: '10px' }}>LIVE SESSION</span>
              </div>
              <p style={{ margin: 0, fontSize: '13px', color: 'var(--jr-text-sub)' }}>
                Vị trí: <b>{position}</b> ({level}) · Câu hỏi {currentIdx + 1} / {questions.length} ({questions[currentIdx].type})
              </p>
            </div>
          </div>

          <div className="question-box" style={{ background: 'rgba(37, 99, 235, 0.08)', border: '1px solid rgba(37, 99, 235, 0.25)', borderRadius: '16px', padding: '20px', marginBottom: '20px' }}>
            <h3 style={{ margin: 0, fontSize: '17px', lineHeight: 1.5, color: 'var(--jr-text-main)' }}>
              {questions[currentIdx].question}
            </h3>
          </div>

          {hint && <div className="ai-hint-box mb-3">{hint}</div>}
          {speechNotice && <div className="status-banner info mb-3">{speechNotice}</div>}

          <div className="mic-action-bar">
            <button
              type="button"
              className={`btn-mic-record ${isRecording ? 'recording' : ''}`}
              onClick={toggleSpeechRecognition}
            >
              {isRecording ? <MicOff size={16} /> : <Mic size={16} />}
              <span>{isRecording ? 'Dừng nói (Đang ghi âm)' : 'Bật Micro để nói (Tiếng Việt)'}</span>
            </button>

            {isRecording && (
              <div className="audio-wave-visualizer">
                <span className="audio-bar" />
                <span className="audio-bar" />
                <span className="audio-bar" />
                <span className="audio-bar" />
                <span className="audio-bar" />
              </div>
            )}

            <button type="button" className="ghost-action compact" onClick={showAiHint} style={{ marginLeft: 'auto' }}>
              💡 Xem gợi ý AI
            </button>
          </div>

          <textarea
            rows={6}
            value={currentAnswer}
            onChange={(e) => setCurrentAnswer(e.target.value)}
            placeholder="Bạn có thể bấm 'Bật Micro để nói' hoặc nhập câu trả lời của bạn tại đây (Áp dụng khung STAR: Tình huống -> Nhiệm vụ -> Hành động -> Kết quả)..."
            style={{ width: '100%', borderRadius: '14px', padding: '14px', background: 'rgba(0,0,0,0.25)', border: '1px solid var(--jr-card-border)', color: 'inherit', fontSize: '14px', lineHeight: 1.5 }}
          />

          <div style={{ display: 'flex', gap: '10px', marginTop: '14px' }}>
            <button
              type="button"
              className="jr-btn-secondary"
              onClick={handleEvaluateAnswer}
              disabled={evaluating || !currentAnswer.trim()}
              style={{ fontSize: '13px', padding: '10px 18px' }}
            >
              {evaluating ? '⏳ AI đang chấm điểm...' : '✨ Chấm điểm câu này trước'}
            </button>
          </div>

          {aiEval && (
            <div className="ai-star-feedback-card animate-in">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                <h4 style={{ margin: 0, fontSize: '15px', color: '#38bdf8' }}>
                  🎯 Đánh Giá AI Câu Trả Lời: <b>{aiEval.score} / 100 điểm</b>
                </h4>
                <span className="chip-tag found">STAR Framework</span>
              </div>

              <div className="star-grid">
                <div className="star-cell">
                  <strong>S - Tình huống</strong>
                  <p>{aiEval.star.situation}</p>
                </div>
                <div className="star-cell">
                  <strong>T - Nhiệm vụ</strong>
                  <p>{aiEval.star.task}</p>
                </div>
                <div className="star-cell">
                  <strong>A - Hành động</strong>
                  <p>{aiEval.star.action}</p>
                </div>
                <div className="star-cell">
                  <strong>R - Kết quả</strong>
                  <p>{aiEval.star.result}</p>
                </div>
              </div>

              <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: '12px', padding: '14px', marginTop: '12px' }}>
                <strong style={{ fontSize: '13px', color: '#f59e0b', display: 'block', marginBottom: '6px' }}>
                  🌟 Câu trả lời mẫu xuất sắc (Tham khảo điểm 10):
                </strong>
                <p style={{ margin: 0, fontSize: '13px', color: 'var(--jr-text-main)', lineHeight: 1.5 }}>
                  {aiEval.sample}
                </p>
              </div>
            </div>
          )}

          <div className="room-footer-actions mt-4" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <button className="ghost-action" onClick={() => setStep('setup')}>
              Thoát phòng
            </button>
            <button className="jr-btn-primary" onClick={handleNext} disabled={!currentAnswer.trim() && !aiEval}>
              <span>{currentIdx < questions.length - 1 ? 'Chuyển sang câu hỏi tiếp theo' : 'Hoàn thành buổi phỏng vấn & Xem báo cáo'}</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </article>
      )}

      {step === 'report' && report && (
        <article className="interview-report-card animate-in" style={{ maxWidth: '960px', margin: '0 auto' }}>
          <div className="report-header">
            <div className="overall-score-circle" style={{ borderColor: '#10b981' }}>
              <strong style={{ color: '#10b981' }}>{report.overallScore}</strong>
              <span>/ 100 điểm</span>
            </div>
            <div>
              <span className="pass-status">🎉 ĐẠT KẾT QUẢ PHỎNG VẤN XUẤT SẮC</span>
              <h2>Báo Cáo Đánh Giá Năng Lực Toàn Diện</h2>
              <p>Vị trí: <b>{report.position}</b> ({report.level}) · Thực hiện ngày: {report.date}</p>
            </div>
          </div>

          <div className="report-competencies-grid">
            <div className="comp-item">
              <span>Kiến thức Kỹ thuật</span>
              <strong>{report.technicalScore}%</strong>
            </div>
            <div className="comp-item">
              <span>Cấu trúc STAR</span>
              <strong>{report.starScore}%</strong>
            </div>
            <div className="comp-item">
              <span>Kỹ năng Giao tiếp</span>
              <strong>{report.communicationScore}%</strong>
            </div>
            <div className="comp-item">
              <span>Giải quyết Tình huống</span>
              <strong>{report.problemSolvingScore}%</strong>
            </div>
          </div>

          <div className="report-details-grid">
            <div className="details-box strengths">
              <h4><Check size={16} /> Điểm mạnh nổi bật</h4>
              <ul>
                {report.strengths.map((item, idx) => <li key={idx}>{item}</li>)}
              </ul>
            </div>
            <div className="details-box improvements">
              <h4><Sparkles size={16} /> Lộ trình cải thiện thêm</h4>
              <ul>
                {report.improvements.map((item, idx) => <li key={idx}>{item}</li>)}
              </ul>
            </div>
          </div>

          <div className="report-footer-actions" style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', marginTop: '24px' }}>
            <button className="ghost-action" onClick={() => setStep('setup')}>
              🔄 Luyện tập lại vị trí khác
            </button>
            <button className="jr-btn-secondary" onClick={() => go('learning')}>
              📚 Ôn tập tài liệu ĐH
            </button>
            <button className="jr-btn-primary" onClick={() => go('mentor')}>
              👨‍🏫 Đặt lịch Mock Interview 1-on-1 với Senior Mentor
            </button>
          </div>
        </article>
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
            <h2>Nguồn tài liệu học tập chuẩn các Trường Đại Học</h2>
            <p>Giáo trình, slide bài giảng & đề án tốt nghiệp tham chiếu từ ĐH Bách Khoa, ĐH FPT, KHTN, UEH, RMIT.</p>
          </div>
        </div>
        <div className="university-resource-chips">
          <span className="uni-chip bk"><GraduationCap size={14} /> ĐH Bách Khoa (CO2011)</span>
          <span className="uni-chip fpt"><GraduationCap size={14} /> ĐH FPT (PRN231)</span>
          <span className="uni-chip khtn"><GraduationCap size={14} /> ĐH KHTN (SE402)</span>
          <span className="uni-chip ueh"><GraduationCap size={14} /> UEH (MKT301)</span>
          <span className="uni-chip rmit"><GraduationCap size={14} /> RMIT (DES204)</span>
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
        <label>{rules.primaryLabel}<input value={form.primaryLink} onChange={(event) => updateForm('primaryLink', event.target.value)} placeholder="Dán link chính của sản phẩm (ví dụ: GitHub/Figma/Drive CV)" /></label>
        <label>{rules.secondaryLabel}<input value={form.secondaryLink} onChange={(event) => updateForm('secondaryLink', event.target.value)} placeholder="Dán link minh chứng hoặc demo" /></label>
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
            Lộ trình: <b>{careerGoal}</b> · Trường: <b>{demoUser?.school || 'Đại học FPT / Bách Khoa / KHTN'}</b> · {portfolioProjectDetails.length} Dự án đã xác thực
          </p>
        </div>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <button type="button" className="ghost-action compact" onClick={() => setShowPublicPreview((v) => !v)}>
            <LinkIcon size={14} /> {showPublicPreview ? 'Ẩn Public Preview' : 'Trang công khai'}
          </button>
          <button type="button" className="ghost-action compact" onClick={() => go('hub')}>
            <Rocket size={14} /> Thêm dự án mới
          </button>
          <button type="button" className="ghost-action compact" onClick={() => go('cv-gate')}>
            <FileUp size={14} /> Thẩm định ATS
          </button>
          <button type="button" className="jr-btn-primary compact" style={{ padding: '8px 16px', fontSize: '13px' }} onClick={() => go('interview')}>
            <Mic size={14} /> Luyện phỏng vấn bảo vệ dự án
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
