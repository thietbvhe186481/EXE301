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
  { id: 'mentor', label: 'Mentor', icon: GraduationCap },
  { id: 'admin', label: 'Admin', icon: ShieldCheck }
];

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
    summary: 'Xây dựng sản phẩm số, website, API, mobile app, hệ thống vận hành và ứng dụng AI.',
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

const statusLabels = {
  draft: 'Bản nháp',
  submitted: 'Đang review',
  reviewed: 'Đã có feedback',
  rejected: 'Cần nộp lại'
};

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
  const [customRoles, setCustomRoles] = useState([]);
  const [savedPathName, setSavedPathName] = useState('');
  const [joinedChallengeIds, setJoinedChallengeIds] = useState([]);
  const [submissionStatus, setSubmissionStatus] = useState({});
  const currentRole = currentUser?.type ?? currentUser?.user?.role ?? null;

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

  const catalog = remoteData?.majors?.length ? remoteData.majors : majorCatalog;
  const challengeList = remoteData?.challenges?.length ? remoteData.challenges : challenges;
  const rulesByMajor = remoteData?.submissionRules && Object.keys(remoteData.submissionRules).length ? remoteData.submissionRules : submissionRules;
  const demoUser = currentRole === 'student' ? currentUser.user : remoteData?.demoUser;
  const userId = demoUser?.id ?? 'demo-student';
  const submissionList = remoteData?.submissions ?? [];
  const feedbackList = remoteData?.mentorFeedback ?? [];
  const userMajorKey = currentRole === 'student' ? (currentUser.user.selectedMajorKey ?? selectedMajorKey) : null;

  useEffect(() => {
    if (!remoteData?.demoUser) return;

    const activeRole = currentUser?.type ?? currentUser?.user?.role;

    if (activeRole === 'student' && currentUser.user?.path?.length) {
      setSelectedMajorKey(currentUser.user.selectedMajorKey ?? 'dev');
      setPath(currentUser.user.path);
    } else if (!currentUser && remoteData.demoUser.path?.length) {
      setPath(remoteData.demoUser.path);
    }
    const activeUser = activeRole === 'student' ? currentUser.user : remoteData.demoUser;
    const userSubmissions = (remoteData.submissions ?? []).filter((item) => item.userId === activeUser?.id);

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
  }, [remoteData, currentUser]);

  const currentMajor = catalog.find((item) => item.key === selectedMajorKey) ?? catalog[0];
  const canBuildPath = currentRole === 'student' && currentMajor?.key === userMajorKey;
  const careerColumns = currentMajor.columns;
  const allRoles = useMemo(() => [
    ...careerColumns.flatMap((column) => column.roles),
    ...customRoles.filter((item) => item.majorKey === selectedMajorKey)
  ], [careerColumns, customRoles, selectedMajorKey]);
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
  const addCustomRole = (title, track, levelKey) => {
    if (!canBuildPath) return;
    const level = levels.find((item) => item.key === levelKey) ?? levels[1];
    const nextRole = role(
      `custom-${selectedMajorKey}-${Date.now()}`,
      title,
      level.label,
      level.key,
      track,
      selectedMajorKey,
      'Thỏa thuận VND',
      'Tự đặt',
      ['Mục tiêu kỹ năng tự định nghĩa', 'Minh chứng trong portfolio', 'Kế hoạch luyện tập'],
      ['Nghiên cứu vị trí', 'Bối cảnh ngành', 'Nguồn học phù hợp'],
      ['Lập kế hoạch', 'Kiên trì', 'Chủ động nhận feedback'],
      ['Notion', 'Portfolio', 'Ghi chú hướng dẫn', 'Bảng lộ trình']
    );
    setCustomRoles((current) => [...current, nextRole]);
    setSelectedRoleId(nextRole.id);
    setPath((current) => [...current, nextRole.id]);
  };
  const loginAs = (type, customPayload = null) => {
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
        const loginMajor = catalog.find((item) => item.key === selectedMajorKey) ?? catalog[0];
        const loginPath = normalizedData.user.selectedMajorKey === selectedMajorKey && normalizedData.user.path?.length
          ? normalizedData.user.path
          : loginMajor.columns.slice(0, 3).map((column, index) => column.roles[Math.min(index + 1, levels.length - 1)].id);
        const studentUser = { ...normalizedData.user, role: 'student', selectedMajorKey, path: loginPath };
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
          ? { type: 'admin', user: { id: 'admin-demo', name: 'Portfolio Admin', email: 'admin@portfolio.vn', role: 'admin' } }
          : type === 'mentor'
            ? { type: 'mentor', user: { id: 'mentor-demo', name: 'Anh Trần', email: 'mentor@portfolio.vn', role: 'mentor' } }
            : { type: 'student', user: remoteData?.demoUser ?? { id: 'demo-student', name: 'Quang Nguyễn', email: 'student@portfolio.vn' } };
        setCurrentUser(fallback);
        setPage(type === 'admin' ? 'admin' : type === 'mentor' ? 'mentor' : 'roadmap');
      });
  };

  useEffect(() => {
    const activeRole = currentUser?.type ?? currentUser?.user?.role;
    const rolePages = {
      student: ['roadmap', 'hub', 'join', 'submit', 'feedback', 'portfolio'],
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
    if (apiStatus !== 'mongo') return;

    fetch(`${API_BASE_URL}/api/submissions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: demoUser?.id ?? 'demo-student',
        challengeId,
        status,
        ...payload
      })
    })
      .then((response) => response.ok ? response.json() : null)
      .then((submission) => {
        if (!submission) return;
        setRemoteData((current) => ({
          ...current,
          submissions: [
            ...(current?.submissions ?? []).filter((item) => !(item.userId === submission.userId && item.challengeId === challengeId)),
            submission
          ]
        }));
        setSubmissionStatus((current) => ({
          ...current,
          [challengeId]: { status: submission.status, updatedAt: submission.updatedAt }
        }));
      })
      .catch(() => undefined);
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
    setSubmissionStatus((current) => ({
      ...current,
      [challengeId]: { status: 'draft', updatedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
    }));
    persistSubmission(challengeId, 'draft', payload);
  };
  const submitChallenge = (challengeId, payload = {}) => {
    setSubmissionStatus((current) => ({
      ...current,
      [challengeId]: { status: 'submitted', updatedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
    }));
    persistSubmission(challengeId, 'submitted', payload);
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
        title: `Feedback cho ${challenge?.title ?? challengeId}`
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
            addCustomRole={addCustomRole}
            canBuildPath={canBuildPath}
            userMajorKey={userMajorKey}
            go={go}
          />
        )}
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
            go={go}
          />
        )}
        {page === 'join' && <JoinChallengePage challenge={selectedChallenge} currentMajor={currentMajor} joined={joinedChallengeIds.includes(selectedChallenge.id)} submission={submissionStatus[selectedChallenge.id]} joinChallenge={joinChallenge} go={go} />}
        {page === 'submit' && <SubmitProjectPage challenge={selectedChallenge} currentMajor={currentMajor} joined={joinedChallengeIds.includes(selectedChallenge.id)} submission={submissionStatus[selectedChallenge.id]} joinChallenge={joinChallenge} saveDraft={saveDraft} submitChallenge={submitChallenge} submissionRulesData={rulesByMajor} go={go} />}
        {page === 'feedback' && <MentorFeedbackPage go={go} challenge={selectedChallenge} submission={submissionList.find((item) => item.userId === userId && item.challengeId === selectedChallenge.id)} feedback={feedbackList.find((item) => item.userId === userId && item.challengeId === selectedChallenge.id)} createFeedback={() => createFeedback(selectedChallenge.id, userId)} />}
        {page === 'portfolio' && <PortfolioPage pathRoles={pathRoles} currentMajor={currentMajor} go={go} demoUser={demoUser} apiStatus={apiStatus} submissions={submissionList} challenges={challengeList} updatePortfolio={updatePortfolio} />}
        {page === 'mentor' && <MentorPage apiStatus={apiStatus} data={remoteData} currentUser={currentUser} refreshData={refreshData} createFeedback={createFeedback} setNotice={setAdminNotice} notice={adminNotice} />}
        {page === 'admin' && <AdminPage apiStatus={apiStatus} data={remoteData} notice={adminNotice} currentUser={currentUser} refreshData={refreshData} setAdminNotice={setAdminNotice} createFeedback={createFeedback} />}
      </main>
    </div>
  );
}

function Header({ page, go, currentUser, theme, setTheme, logout }) {
  const currentRole = currentUser?.type ?? currentUser?.user?.role;
  const roleFlow = currentRole === 'student'
    ? flow.filter((item) => ['roadmap', 'hub', 'join', 'submit', 'feedback', 'portfolio'].includes(item.id))
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
      <button className="brand" onClick={() => go(homePage)} aria-label="Mở trang chính">
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
        <div className="hero-map-art" aria-hidden="true">
          {selectedMajor.labels.concat(selectedMajor.short).slice(0, 6).map((label, index) => (
            <span key={label} style={{ '--i': index }}>{label}</span>
          ))}
        </div>
        <p className="mono-label">Bản đồ nghề Portfolio</p>
        <h1>Định hình sự nghiệp, xây portfolio chứng minh năng lực.</h1>
        <p className="lead">Portfolio giúp người học chọn Dev, Tiếp thị hoặc Thiết kế, sau đó mở bản đồ nghề chi tiết để xây lộ trình, làm thử thách và cập nhật hồ sơ cá nhân.</p>
        <div className="hero-stats">
          <Stat value="3" label="ngành lớn" />
          <Stat value="22" label="specializations" />
          <Stat value="14+" label="bài tập mẫu" />
        </div>
        <div className="login-rule-box">
          <strong>Business rule</strong>
          <span>Người dùng phải chọn một ngành lớn trước. Hệ thống sẽ lọc bản đồ nghề, bài tập, phương thức nộp và profile theo ngành đó.</span>
        </div>
      </div>
      <div className="auth-panel">
        <div className="auth-title">
          <p className="mono-label">Bắt đầu hồ sơ nghề nghiệp</p>
          <h2>{authMode === 'login' ? 'Chào mừng trở lại' : 'Tạo tài khoản Portfolio'}</h2>
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
              <small>{major.summary}</small>
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

function CareerMapPage({ majors, currentMajor, changeMajor, columns, levels, selectedColumn, selectedRole, selectedRoleId, setSelectedRoleId, path, pathRoles, allRoles, addToPath, removeFromPath, movePath, clearPath, savePath, savedPathName, addCustomRole, canBuildPath, userMajorKey, go }) {
  const [tab, setTab] = useState('skills');
  const [query, setQuery] = useState('');
  const [customTitle, setCustomTitle] = useState('');
  const [customTrack, setCustomTrack] = useState(columns[0]?.title ?? '');
  const [customLevel, setCustomLevel] = useState('so-cap');
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

  useEffect(() => {
    document.querySelector('.career-planner')?.scrollTo({ left: 0, top: 0 });
  }, [currentMajor.key]);

  return (
    <section className="career-page">
      <div className="section-heading inline">
        <div>
          <p className="mono-label">Bản đồ nghề {currentMajor.short}</p>
          <h1>Bản đồ chuyên ngành {currentMajor.title}</h1>
          <p>{currentMajor.summary} Người dùng chọn chuyên ngành hẹp, xem yêu cầu từng cấp độ, rồi xây lộ trình nghề nghiệp cá nhân.</p>
        </div>
        <div className="major-switcher">
          {majors.map((major) => (
            <button key={major.key} className={currentMajor.key === major.key ? 'active' : ''} onClick={() => { changeMajor(major.key); setCustomTrack(major.columns[0].title); }}>
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
                  <small>{column.roles[0].title} to {column.roles[4].title}</small>
                  <b>{column.roles.length} levels</b>
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
          {canBuildPath && (
            <div className="custom-role-card">
              <p className="mono-label">Vị trí tự tạo</p>
              <input value={customTitle} onChange={(event) => setCustomTitle(event.target.value)} placeholder="VD: AI Product Engineer" />
              <div className="custom-role-row">
                <select value={customTrack} onChange={(event) => setCustomTrack(event.target.value)}>
                  {columns.map((column) => <option key={column.key} value={column.title}>{column.title}</option>)}
                </select>
                <select value={customLevel} onChange={(event) => setCustomLevel(event.target.value)}>
                  {levels.map((level) => <option key={level.key} value={level.key}>{level.label}</option>)}
                </select>
              </div>
              <button
                className="ghost-action compact"
                onClick={() => {
                  if (!customTitle.trim()) return;
                  addCustomRole(customTitle.trim(), customTrack, customLevel);
                  setCustomTitle('');
                }}
              >
                <Plus size={16} />
                Thêm vị trí riêng
              </button>
            </div>
          )}
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

function ChallengeHubPage({ currentMajor, activeTrack, setActiveTrack, visibleChallenges, setSelectedChallengeId, joinedChallengeIds, submissionStatus, joinChallenge, go }) {
  const tracks = ['Tất cả', ...currentMajor.columns.map((item) => item.title)];
  return (
    <section className="content-page">
      <div className="section-heading inline">
        <div>
          <p className="mono-label">Trung tâm thử thách {currentMajor.short}</p>
          <h1>Luyện tập bằng nhiệm vụ có thể đưa vào portfolio</h1>
          <p>Business rule: chỉ hiển thị bài tập thuộc ngành đang chọn, filter theo specialization và mỗi bài có mentor, hạn nộp, XP riêng.</p>
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
          return (
            <article className="challenge-card" key={challenge.id}>
              <div className="card-topline">
                <span>{challenge.track}</span>
                <strong>{submission?.status ? statusLabels[submission.status] ?? submission.status : joined ? 'Đã tham gia' : `${challenge.xp} XP`}</strong>
              </div>
              <h2>{challenge.title}</h2>
              <p>{challenge.summary}</p>
              <div className="tag-row">{challenge.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
              <div className="challenge-meta">
                <span><GraduationCap size={16} /> {challenge.mentor}</span>
                <span><CircleDollarSign size={16} /> {challenge.difficulty}</span>
                <span><Sparkles size={16} /> {challenge.due}</span>
              </div>
              <div className="card-actions">
                <button className="ghost-action compact" onClick={() => { setSelectedChallengeId(challenge.id); joinChallenge(challenge.id); go('join'); }}>
                  {joined ? 'Xem chi tiết' : 'Tham gia'}
                  <Rocket size={16} />
                </button>
                <button className="primary-action compact" onClick={() => { setSelectedChallengeId(challenge.id); joinChallenge(challenge.id); go(submission?.status === 'reviewed' ? 'feedback' : 'submit'); }}>
                  {submission?.status === 'reviewed' ? 'Xem feedback' : submission?.status === 'submitted' ? 'Xem bài nộp' : 'Nộp bài'}
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

function JoinChallengePage({ challenge, currentMajor, joined, submission, joinChallenge, go }) {
  const isSubmitted = submission?.status === 'submitted';
  const isReviewed = submission?.status === 'reviewed';
  const isRejected = submission?.status === 'rejected';
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
        <h3>Điều kiện trước khi tham gia</h3>
        {[
          `Ngành hiện tại phải là ${currentMajor.title}`,
          `Bài tập thuộc specialization ${challenge.track}`,
          'Người học cần có ít nhất 1 vị trí trong lộ trình cá nhân',
          'Sau khi tham gia, bài tập sẽ mở form nộp theo đúng ngành'
        ].map((item) => (
          <div className="requirement-item" key={item}><ShieldCheck size={18} /><span>{item}</span></div>
        ))}
        <h3>Rubric chấm điểm</h3>
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
        <button className="primary-action" onClick={() => { joinChallenge(challenge.id); go(isReviewed ? 'feedback' : 'submit'); }}>
          {isReviewed ? 'Xem bài và feedback' : isRejected ? 'Nộp lại bài' : isSubmitted ? 'Xem bài đã nộp' : joined ? 'Tiếp tục nộp bài' : 'Tham gia và mở form nộp'}
          <Send size={17} />
        </button>
      </aside>
    </section>
  );
}

function SubmitProjectPage({ challenge, currentMajor, joined, submission, joinChallenge, saveDraft, submitChallenge, submissionRulesData, go }) {
  const rules = submissionRulesData[currentMajor.key] ?? submissionRules[currentMajor.key];
  const isSubmitted = submission?.status === 'submitted';
  const isReviewed = submission?.status === 'reviewed';
  const isDraft = submission?.status === 'draft';
  const isRejected = submission?.status === 'rejected';
  const [form, setForm] = useState({
    primaryLink: submission?.primaryLink ?? '',
    secondaryLink: submission?.secondaryLink ?? '',
    skills: '',
    notes: submission?.notes ?? ''
  });
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
        </div>
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
        <div className="submit-actions">
          <button className="ghost-action" onClick={() => { joinChallenge(challenge.id); saveDraft(challenge.id, form); }}>
            <Save size={17} />
            Lưu bản nháp
          </button>
          <button className="primary-action" onClick={() => {
            if (isReviewed) {
              go('feedback');
              return;
            }
            joinChallenge(challenge.id);
            submitChallenge(challenge.id, form);
            go('feedback');
          }}>
            {isReviewed ? 'Xem góp ý mentor' : isRejected ? 'Nộp lại cho mentor' : 'Gửi người hướng dẫn góp ý'}
            <Send size={17} />
          </button>
        </div>
      </div>
    </section>
  );
}

function MentorFeedbackPage({ go, challenge, submission, feedback, createFeedback }) {
  const hasFeedback = Boolean(feedback);
  const strengths = feedback?.strengths ?? ['Sản phẩm đã được nộp thành công', 'Có đủ link minh chứng để mentor xem xét', 'Đúng luồng nghiệp vụ của challenge'];
  const improvements = feedback?.improvements ?? ['Đang chờ mentor duyệt bài', 'Sau khi admin review, điểm và nhận xét sẽ xuất hiện tại đây', 'Có thể quay lại cập nhật bản nộp nếu cần'];
  return (
    <section className="content-page two-column">
      <div>
        <p className="mono-label">Nhận góp ý từ người hướng dẫn</p>
        <h1>{challenge.title}</h1>
        <div className="feedback-score">
          <span>{feedback?.score ?? '...'}</span>
          <div>
            <h2>{feedback?.title ?? 'Đang chờ mentor feedback'}</h2>
            <p>{hasFeedback ? `Reviewer: ${feedback.reviewer}. Bài đã được nhận xét và có thể cập nhật vào portfolio.` : `Bài nộp trạng thái ${submission?.status ?? 'chưa nộp'}. Admin hoặc mentor cần duyệt để tạo feedback chính thức.`}</p>
          </div>
        </div>
        <div className="feedback-grid">
          <article><h3>Điểm mạnh</h3>{strengths.map((item) => <p key={item}>{item}</p>)}</article>
          <article><h3>Cần cải thiện</h3>{improvements.map((item) => <p key={item}>{item}</p>)}</article>
        </div>
        {!hasFeedback && (
          <button className="ghost-action feedback-demo-action" onClick={createFeedback}>
            <MessageSquareText size={17} />
            Demo: tạo feedback mentor
          </button>
        )}
      </div>
      <aside className="side-card">
        <p className="mono-label">{hasFeedback ? 'Ghi chú người hướng dẫn' : 'Thông tin bài nộp'}</p>
        {(hasFeedback ? feedbackItems : [
          { file: challenge.id, title: 'Trạng thái submission', detail: submission ? `${submission.status} lúc ${submission.updatedAt}` : 'Chưa có submission trong hệ thống.' },
          { file: submission?.primaryLink ?? 'Chưa có link chính', title: 'Link chính', detail: submission?.primaryLink || 'Student cần bổ sung link chính trước khi mentor review.' },
          { file: submission?.secondaryLink ?? 'Chưa có link phụ', title: 'Link minh chứng', detail: submission?.secondaryLink || 'Có thể là demo URL, Figma, deck hoặc API docs.' }
        ]).map((item) => (
          <div className="code-note" key={item.file}>
            <strong>{item.title}</strong>
            <span>{item.file}</span>
            <p>{item.detail}</p>
          </div>
        ))}
        <button className="primary-action" onClick={() => go('portfolio')}>
          Cập nhật portfolio
          <WandSparkles size={17} />
        </button>
      </aside>
    </section>
  );
}

function PortfolioPage({ pathRoles, currentMajor, go, demoUser, apiStatus, submissions, challenges, updatePortfolio }) {
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
      </div>
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
  const filteredPending = pending.filter(matchMentorSubmission);
  const filteredReviewed = reviewed.filter(matchMentorSubmission);

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
