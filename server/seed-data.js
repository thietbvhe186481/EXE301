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

const levelSalary = [
  '7-12 triệu VND/tháng',
  '12-22 triệu VND/tháng',
  '22-45 triệu VND/tháng',
  '45-75 triệu VND/tháng',
  '75-120+ triệu VND/tháng'
];

const levelExperience = ['0-1 năm', '1-2 năm', '2-4 năm', '4-7 năm', '7+ năm'];
const levelPrefix = ['Nắm nền tảng', 'Thực hành', 'Làm chủ', 'Tối ưu', 'Dẫn dắt'];

function boost(items, levelIndex) {
  return items.map((item) => `${levelPrefix[levelIndex]} ${item}`);
}

function role(id, title, level, levelKey, track, majorKey, salary, experience, skills, knowledge, abilities, tools) {
  return { id, title, level, levelKey, track, majorKey, salary, experience, skills, knowledge, abilities, tools };
}

function spec(key, title, accent, titleRoot, skills, knowledge, abilities, tools) {
  return { key, title, accent, titleRoot, skills, knowledge, abilities, tools };
}

function buildColumns(majorKey, specs) {
  return specs.map((item) => ({
    key: item.key,
    title: item.title,
    accent: item.accent,
    roles: levels.map((level, index) => role(
      `${majorKey}-${item.key}-${level.key}`,
      `${levelTitles[level.key]} ${item.titleRoot}`,
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

export const majors = [
  {
    key: 'dev',
    displayOrder: 1,
    short: 'Dev',
    title: 'Developer',
    accent: '#8b5cf6',
    summary: 'Xây dựng sản phẩm số, website, API, mobile app, hệ thống vận hành và ứng dụng AI.',
    salary: '12-120+ triệu VND/tháng',
    growth: 'Nhu cầu rất cao',
    difficulty: 'Thiên về kỹ thuật',
    labels: ['CODE', 'API', 'APP', 'AI'],
    columns: buildColumns('dev', [
      spec('frontend', 'Frontend', '#8b5cf6', 'Frontend', ['React UI', 'quản lý trạng thái', 'giao diện responsive'], ['trình duyệt', 'accessibility', 'design system'], ['tỉ mỉ giao diện', 'tư duy trải nghiệm', 'chia nhỏ component'], ['React', 'Vite', 'Tailwind', 'Playwright']),
      spec('backend', 'Backend', '#14b8a6', 'Backend', ['REST API', 'xác thực', 'thiết kế cơ sở dữ liệu'], ['HTTP', 'transaction', 'hệ thống phân tán'], ['mô hình dữ liệu', 'debug', 'tư duy ổn định'], ['Node.js', 'MongoDB', 'Redis', 'Docker']),
      spec('fullstack', 'Full Stack', '#f59e0b', 'Full Stack', ['tính năng end-to-end', 'hợp đồng API', 'dashboard sản phẩm'], ['client-server', 'analytics', 'bảo mật cơ bản'], ['tư duy sản phẩm', 'sở hữu đầu việc', 'lặp nhanh'], ['Next.js', 'Prisma', 'Stripe', 'Sentry']),
      spec('mobile', 'Mobile', '#ec4899', 'Mobile', ['điều hướng app', 'trạng thái offline', 'push notification'], ['vòng đời app', 'quyền thiết bị', 'quy trình store'], ['kiểm thử thiết bị', 'vẽ luồng UX', 'xử lý crash'], ['Flutter', 'React Native', 'Firebase', 'Fastlane']),
      spec('devops', 'DevOps', '#38bdf8', 'DevOps', ['CI/CD', 'container', 'giám sát hệ thống'], ['networking', 'SLO', 'cloud IAM'], ['tự động hóa', 'xử lý sự cố', 'tư duy độ tin cậy'], ['Docker', 'Kubernetes', 'Terraform', 'Grafana']),
      spec('ai', 'AI / Data', '#a3e635', 'AI Engineer', ['Python', 'ETL', 'pipeline mô hình'], ['thống kê', 'vòng đời ML', 'vector search'], ['thiết kế thử nghiệm', 'phân tích dữ liệu', 'đánh giá rủi ro'], ['Pandas', 'Airflow', 'MLflow', 'OpenAI API']),
      spec('architecture', 'Software Architecture', '#ef4444', 'Architect', ['sơ đồ hệ thống', 'ghi chú trade-off', 'kế hoạch migration'], ['design pattern', 'cloud service', 'enterprise architecture'], ['giao tiếp', 'định khung quyết định', 'lập kế hoạch chiến lược'], ['C4 Model', 'ADR', 'Miro', 'Cloud Well-Architected'])
    ])
  },
  {
    key: 'mkt',
    displayOrder: 2,
    short: 'MKT',
    title: 'Marketing',
    accent: '#10b981',
    summary: 'Tăng trưởng sản phẩm bằng nội dung, thương hiệu, quảng cáo, nghiên cứu và chăm sóc khách hàng.',
    salary: '10-100+ triệu VND/tháng',
    growth: 'Nhu cầu cao',
    difficulty: 'Sáng tạo + dữ liệu',
    labels: ['SEO', 'ADS', 'CRM', 'BRAND'],
    columns: buildColumns('mkt', [
      spec('content', 'Content', '#10b981', 'Content Marketer', ['viết nội dung', 'lịch đăng bài', 'kế hoạch biên tập'], ['persona', 'thông điệp', 'phân phối nội dung'], ['kể chuyện', 'duy trì nhịp', 'nghiên cứu'], ['Notion', 'Canva', 'Grammarly', 'CMS']),
      spec('seo', 'SEO', '#84cc16', 'SEO Specialist', ['nghiên cứu từ khóa', 'on-page SEO', 'technical SEO'], ['search intent', 'SERP', 'cấu trúc website'], ['phân tích', 'ưu tiên', 'kiên nhẫn'], ['Ahrefs', 'Search Console', 'Screaming Frog', 'GA4']),
      spec('performance', 'Performance Marketing', '#f59e0b', 'Performance Marketer', ['paid ads', 'phân bổ ngân sách', 'tracking chuyển đổi'], ['CAC/LTV', 'attribution', 'A/B testing'], ['đọc dữ liệu', 'kỷ luật ngân sách', 'thử nghiệm'], ['Google Ads', 'Meta Ads', 'Looker Studio', 'Hotjar']),
      spec('social', 'Social Media', '#38bdf8', 'Social Media Specialist', ['nội dung ngắn', 'vận hành cộng đồng', 'brief KOL'], ['thuật toán nền tảng', 'vòng lặp tương tác', 'xu hướng'], ['cảm quan nội dung', 'tốc độ', 'đồng cảm với khán giả'], ['TikTok Studio', 'Meta Suite', 'Buffer', 'CapCut']),
      spec('brand', 'Brand Marketing', '#ec4899', 'Brand Marketer', ['định vị', 'giọng nói thương hiệu', 'ý tưởng chiến dịch'], ['ngành hàng', 'khác biệt hóa', 'brand equity'], ['đánh giá sáng tạo', 'giao tiếp', 'nhất quán'], ['Brand book', 'Slides', 'Miro', 'Research panel']),
      spec('growth', 'Growth', '#a855f7', 'Growth Marketer', ['phễu tăng trưởng', 'retention loop', 'backlog thử nghiệm'], ['AARRR metrics', 'activation', 'lifecycle'], ['tư duy hệ thống', 'ưu tiên', 'phối hợp nhóm'], ['Amplitude', 'Segment', 'HubSpot', 'Feature flags']),
      spec('crm', 'CRM / Lifecycle', '#06b6d4', 'CRM Specialist', ['email journey', 'phân nhóm khách hàng', 'automation'], ['vòng đời khách hàng', 'cohort', 'cá nhân hóa'], ['đồng cảm', 'tỉ mỉ', 'thói quen kiểm thử'], ['Mailchimp', 'HubSpot', 'Customer.io', 'Excel']),
      spec('research', 'Market Research', '#f97316', 'Market Researcher', ['thiết kế khảo sát', 'ghi chú phỏng vấn', 'phân tích đối thủ'], ['lấy mẫu', 'nghiên cứu định tính', 'market sizing'], ['lắng nghe', 'tổng hợp', 'báo cáo rõ ràng'], ['Typeform', 'Dovetail', 'Sheets', 'Slides'])
    ])
  },
  {
    key: 'design',
    displayOrder: 3,
    short: 'Design',
    title: 'Designer',
    accent: '#38bdf8',
    summary: 'Tạo trải nghiệm sản phẩm, giao diện, nhận diện thương hiệu, nghiên cứu người dùng và chuyển động.',
    salary: '10-95+ triệu VND/tháng',
    growth: 'Nhu cầu cao',
    difficulty: 'Thị giác + sản phẩm',
    labels: ['UI', 'UX', 'BRAND', 'MOTION'],
    columns: buildColumns('design', [
      spec('ui', 'UI Design', '#38bdf8', 'UI Designer', ['layout', 'component', 'responsive UI'], ['typography', 'visual hierarchy', 'accessibility'], ['tỉ mỉ pixel', 'gu thẩm mỹ', 'lặp thiết kế'], ['Figma', 'FigJam', 'Adobe Illustrator', 'Maze']),
      spec('ux', 'UX Design', '#8b5cf6', 'UX Designer', ['user flow', 'wireframe', 'usability testing'], ['information architecture', 'heuristic', 'journey mapping'], ['định khung vấn đề', 'đồng cảm người dùng', 'facilitation'], ['Figma', 'Miro', 'UserTesting', 'Hotjar']),
      spec('product', 'Product Design', '#10b981', 'Product Designer', ['thiết kế tính năng', 'prototype', 'UX theo số liệu'], ['chiến lược sản phẩm', 'thử nghiệm', 'design system'], ['product sense', 'trade-off', 'thuyết phục'], ['Figma', 'Amplitude', 'Storybook', 'Dovetail']),
      spec('graphic', 'Graphic Design', '#f59e0b', 'Graphic Designer', ['asset marketing', 'bố cục', 'visual campaign'], ['quy chuẩn brand', 'file in/online', 'lý thuyết màu'], ['sáng tạo', 'tốc độ', 'tiếp nhận feedback'], ['Photoshop', 'Illustrator', 'Canva', 'InDesign']),
      spec('motion', 'Motion Design', '#ec4899', 'Motion Designer', ['animation', 'storyboard', 'transition'], ['timing', 'định dạng video', 'nguyên lý chuyển động'], ['nhịp điệu', 'kể chuyện thị giác', 'tỉ mỉ'], ['After Effects', 'Premiere', 'Lottie', 'Rive']),
      spec('brand', 'Brand Design', '#ef4444', 'Brand Designer', ['hệ thống logo', 'nhận diện', 'visual campaign'], ['định vị', 'brand strategy', 'ngôn ngữ thị giác'], ['concepting', 'nhất quán', 'trình bày'], ['Illustrator', 'Figma', 'Photoshop', 'Brand guideline']),
      spec('research', 'UX Research', '#a3e635', 'UX Researcher', ['phỏng vấn', 'khảo sát', 'báo cáo insight'], ['phương pháp nghiên cứu', 'kiểm soát bias', 'phân tích hành vi'], ['lắng nghe', 'tổng hợp', 'diễn đạt rõ'], ['Dovetail', 'Maze', 'Typeform', 'Miro'])
    ])
  }
];

export const challenges = [
  { id: 'dev-dashboard', majorKey: 'dev', track: 'Frontend', title: 'Xây dựng dashboard nghề nghiệp', difficulty: 'Junior', xp: 420, due: '10 ngày', mentor: 'Mina Lê', tags: ['React', 'API', 'Responsive'], summary: 'Tạo dashboard có bộ lọc, thẻ thông tin, form và xử lý trạng thái rõ ràng.' },
  { id: 'dev-api', majorKey: 'dev', track: 'Backend', title: 'API thương mại điện tử', difficulty: 'Mid-level', xp: 560, due: '14 ngày', mentor: 'Anh Trần', tags: ['Node', 'Auth', 'MongoDB'], summary: 'Xây API sản phẩm, đơn hàng, đăng nhập và kiểm tra dữ liệu đầu vào.' },
  { id: 'dev-ai', majorKey: 'dev', track: 'AI / Data', title: 'Tìm kiếm tri thức bằng AI', difficulty: 'Senior', xp: 820, due: '18 ngày', mentor: 'Nam Hồ', tags: ['Python', 'LLM', 'Vector DB'], summary: 'Tạo trợ lý tìm kiếm tài liệu có trích dẫn và ghi chú đánh giá.' },
  { id: 'dev-mobile', majorKey: 'dev', track: 'Mobile', title: 'Ứng dụng đặt lịch mobile', difficulty: 'Mid-level', xp: 640, due: '13 ngày', mentor: 'Linh Đào', tags: ['Flutter', 'Firebase', 'UX'], summary: 'Xây app mobile có đăng nhập, đặt lịch, lịch sử và trạng thái trống dễ hiểu.' },
  { id: 'dev-devops', majorKey: 'dev', track: 'DevOps', title: 'Pipeline CI/CD cho startup', difficulty: 'Senior', xp: 780, due: '16 ngày', mentor: 'Huy Phạm', tags: ['Docker', 'CI/CD', 'Monitoring'], summary: 'Thiết kế pipeline build, test, deploy và dashboard theo dõi lỗi.' },
  { id: 'dev-architecture', majorKey: 'dev', track: 'Software Architecture', title: 'Thiết kế kiến trúc hệ thống booking', difficulty: 'Lead', xp: 900, due: '20 ngày', mentor: 'Khoa Vũ', tags: ['C4', 'ADR', 'Scale'], summary: 'Vẽ sơ đồ, phân tích trade-off và kế hoạch migration cho hệ thống booking.' },
  { id: 'mkt-content', majorKey: 'mkt', track: 'Content', title: 'Lịch nội dung ra mắt sản phẩm', difficulty: 'Junior', xp: 360, due: '7 ngày', mentor: 'Mai Nguyễn', tags: ['Content', 'Calendar', 'Persona'], summary: 'Lập kế hoạch nội dung 14 ngày với persona, thông điệp và kênh phân phối.' },
  { id: 'mkt-seo', majorKey: 'mkt', track: 'SEO', title: 'SEO audit website giáo dục', difficulty: 'Mid-level', xp: 520, due: '12 ngày', mentor: 'Duy Lâm', tags: ['SEO', 'Audit', 'GA4'], summary: 'Phân tích từ khóa, lỗi kỹ thuật, cấu trúc trang và đề xuất roadmap SEO.' },
  { id: 'mkt-ads', majorKey: 'mkt', track: 'Performance Marketing', title: 'Kế hoạch quảng cáo 30 triệu VND', difficulty: 'Mid-level', xp: 580, due: '10 ngày', mentor: 'Trang Võ', tags: ['Meta Ads', 'Budget', 'A/B Test'], summary: 'Chia ngân sách, viết creative brief, thiết lập chỉ số và kế hoạch tối ưu.' },
  { id: 'mkt-brand', majorKey: 'mkt', track: 'Brand Marketing', title: 'Brand campaign cho app học tập', difficulty: 'Senior', xp: 700, due: '15 ngày', mentor: 'Hà Đỗ', tags: ['Brand', 'Campaign', 'Insight'], summary: 'Tạo big idea, key visual direction, thông điệp và kế hoạch triển khai đa kênh.' },
  { id: 'mkt-crm', majorKey: 'mkt', track: 'CRM / Lifecycle', title: 'Email journey giữ chân người dùng', difficulty: 'Mid-level', xp: 540, due: '11 ngày', mentor: 'Quân Bùi', tags: ['CRM', 'Email', 'Automation'], summary: 'Thiết kế journey 5 email với phân nhóm khách hàng và chỉ số đo lường.' },
  { id: 'design-ui', majorKey: 'design', track: 'UI Design', title: 'Redesign màn hình onboarding', difficulty: 'Junior', xp: 400, due: '8 ngày', mentor: 'Vy Hoàng', tags: ['Figma', 'UI Kit', 'Mobile'], summary: 'Thiết kế onboarding 4 bước có component, state và guideline rõ ràng.' },
  { id: 'design-ux', majorKey: 'design', track: 'UX Design', title: 'Nghiên cứu luồng checkout', difficulty: 'Mid-level', xp: 560, due: '12 ngày', mentor: 'Phúc Lê', tags: ['UX', 'Flow', 'Testing'], summary: 'Vẽ journey, xác định friction và đề xuất prototype cải thiện checkout.' },
  { id: 'design-product', majorKey: 'design', track: 'Product Design', title: 'Feature spec cho portfolio builder', difficulty: 'Senior', xp: 760, due: '16 ngày', mentor: 'An Phạm', tags: ['Product', 'Prototype', 'Metric'], summary: 'Thiết kế tính năng mới với mục tiêu, luồng, prototype và metric thành công.' },
  { id: 'design-motion', majorKey: 'design', track: 'Motion Design', title: 'Motion kit cho landing page', difficulty: 'Mid-level', xp: 590, due: '9 ngày', mentor: 'Tú Trần', tags: ['Motion', 'Lottie', 'Storyboard'], summary: 'Tạo storyboard, animation states và guideline chuyển động cho landing page.' },
  { id: 'dev-frontend-ui-states', majorKey: 'dev', track: 'Frontend', title: 'Bộ UI state cho sản phẩm SaaS', difficulty: 'Junior', xp: 380, due: '7 ngày', mentor: 'Mina Lê', tags: ['React', 'State', 'UI'], summary: 'Xây các state loading, empty, error, success cho dashboard sản phẩm.' },
  { id: 'dev-frontend-accessibility-audit', majorKey: 'dev', track: 'Frontend', title: 'Audit accessibility landing page', difficulty: 'Mid-level', xp: 520, due: '9 ngày', mentor: 'Mina Lê', tags: ['A11y', 'WCAG', 'Report'], summary: 'Kiểm tra contrast, keyboard flow, aria label và đề xuất backlog sửa lỗi.' },
  { id: 'dev-backend-auth-rbac', majorKey: 'dev', track: 'Backend', title: 'API phân quyền RBAC', difficulty: 'Mid-level', xp: 610, due: '12 ngày', mentor: 'Anh Trần', tags: ['Node', 'JWT', 'RBAC'], summary: 'Thiết kế đăng nhập, refresh token, role permission và middleware kiểm tra quyền.' },
  { id: 'dev-backend-payment-webhook', majorKey: 'dev', track: 'Backend', title: 'Webhook thanh toán an toàn', difficulty: 'Senior', xp: 760, due: '14 ngày', mentor: 'Anh Trần', tags: ['Webhook', 'Security', 'MongoDB'], summary: 'Xử lý webhook idempotent, xác thực chữ ký, retry và log giao dịch.' },
  { id: 'dev-fullstack-booking-crud', majorKey: 'dev', track: 'Full Stack', title: 'Web đặt lịch dịch vụ', difficulty: 'Mid-level', xp: 640, due: '13 ngày', mentor: 'Linh Đào', tags: ['React', 'API', 'Booking'], summary: 'Làm CRUD lịch hẹn, kiểm tra slot trống, trạng thái booking và trang quản trị.' },
  { id: 'dev-fullstack-saas-billing', majorKey: 'dev', track: 'Full Stack', title: 'Mini SaaS subscription', difficulty: 'Senior', xp: 820, due: '18 ngày', mentor: 'Khoa Vũ', tags: ['Billing', 'Plan', 'Dashboard'], summary: 'Mô phỏng gói free/premium, usage limit, invoice và dashboard người dùng.' },
  { id: 'dev-mobile-offline-notes', majorKey: 'dev', track: 'Mobile', title: 'Ứng dụng ghi chú offline-first', difficulty: 'Mid-level', xp: 620, due: '12 ngày', mentor: 'Linh Đào', tags: ['Flutter', 'Offline', 'Sync'], summary: 'Lưu local, đồng bộ khi có mạng, xử lý conflict và trạng thái pending.' },
  { id: 'dev-mobile-push-notification', majorKey: 'dev', track: 'Mobile', title: 'Push notification lịch học', difficulty: 'Senior', xp: 720, due: '15 ngày', mentor: 'Linh Đào', tags: ['FCM', 'Mobile', 'Scheduler'], summary: 'Thiết kế lịch nhắc học, segment người dùng và theo dõi trạng thái gửi.' },
  { id: 'dev-devops-monitoring-dashboard', majorKey: 'dev', track: 'DevOps', title: 'Dashboard giám sát uptime', difficulty: 'Mid-level', xp: 650, due: '10 ngày', mentor: 'Nora Vũ', tags: ['Monitoring', 'Docker', 'Alert'], summary: 'Dựng health check, log, alert rule và dashboard trạng thái service.' },
  { id: 'dev-devops-k8s-rollout', majorKey: 'dev', track: 'DevOps', title: 'Kế hoạch rollout Kubernetes', difficulty: 'Senior', xp: 860, due: '18 ngày', mentor: 'Nora Vũ', tags: ['K8s', 'Rollback', 'SLO'], summary: 'Viết manifest, chiến lược rolling update, rollback và tiêu chí SLO.' },
  { id: 'dev-ai-rag-faq', majorKey: 'dev', track: 'AI / Data', title: 'FAQ bot có nguồn trích dẫn', difficulty: 'Senior', xp: 840, due: '16 ngày', mentor: 'Nam Hồ', tags: ['RAG', 'Vector DB', 'Citations'], summary: 'Xây workflow ingest tài liệu, truy vấn, trả lời có nguồn và kiểm tra hallucination.' },
  { id: 'dev-ai-data-pipeline', majorKey: 'dev', track: 'AI / Data', title: 'Pipeline dữ liệu tuyển dụng', difficulty: 'Senior', xp: 790, due: '14 ngày', mentor: 'Nam Hồ', tags: ['Python', 'ETL', 'Dashboard'], summary: 'Thu thập, làm sạch, phân loại job post và trực quan hóa kỹ năng nổi bật.' },
  { id: 'dev-architecture-migration-plan', majorKey: 'dev', track: 'Software Architecture', title: 'Kế hoạch tách microservice', difficulty: 'Lead', xp: 920, due: '20 ngày', mentor: 'Khoa Vũ', tags: ['C4', 'ADR', 'Migration'], summary: 'Phân tích monolith, chọn boundary, vẽ C4 và viết ADR cho migration.' },
  { id: 'dev-security-api-hardening', majorKey: 'dev', track: 'Backend', title: 'Hardening API production', difficulty: 'Senior', xp: 780, due: '13 ngày', mentor: 'Anh Trần', tags: ['Security', 'Rate limit', 'Audit'], summary: 'Bổ sung validation, rate limit, audit log, kiểm tra secret và checklist deploy.' },
  { id: 'mkt-content-editorial-calendar', majorKey: 'mkt', track: 'Content', title: 'Editorial calendar 30 ngày', difficulty: 'Junior', xp: 360, due: '7 ngày', mentor: 'Mai Nguyễn', tags: ['Content', 'Calendar', 'Persona'], summary: 'Lên lịch nội dung đa kênh theo funnel, persona và mục tiêu tuần.' },
  { id: 'mkt-content-short-video-series', majorKey: 'mkt', track: 'Content', title: 'Series video ngắn ra mắt sản phẩm', difficulty: 'Mid-level', xp: 540, due: '9 ngày', mentor: 'Mai Nguyễn', tags: ['Short Video', 'Hook', 'Script'], summary: 'Viết concept, hook, kịch bản 10 video và cách đo retention.' },
  { id: 'mkt-seo-topic-cluster', majorKey: 'mkt', track: 'SEO', title: 'Topic cluster cho blog ngành', difficulty: 'Mid-level', xp: 590, due: '12 ngày', mentor: 'Minh Phan', tags: ['SEO', 'Cluster', 'Keyword'], summary: 'Xây pillar page, cluster keyword, internal link và kế hoạch publish.' },
  { id: 'mkt-seo-technical-fix-plan', majorKey: 'mkt', track: 'SEO', title: 'Technical SEO backlog', difficulty: 'Senior', xp: 720, due: '14 ngày', mentor: 'Minh Phan', tags: ['Core Web Vitals', 'Indexing', 'Audit'], summary: 'Audit index, schema, tốc độ, duplicate content và ưu tiên backlog sửa lỗi.' },
  { id: 'mkt-performance-meta-funnel', majorKey: 'mkt', track: 'Performance Marketing', title: 'Funnel Meta Ads tuyển lead', difficulty: 'Mid-level', xp: 630, due: '10 ngày', mentor: 'Trang Bùi', tags: ['Meta Ads', 'Funnel', 'Creative'], summary: 'Chia campaign theo awareness, consideration, conversion và creative testing.' },
  { id: 'mkt-performance-google-search', majorKey: 'mkt', track: 'Performance Marketing', title: 'Google Search campaign 20 triệu', difficulty: 'Senior', xp: 760, due: '13 ngày', mentor: 'Trang Bùi', tags: ['Google Ads', 'Budget', 'ROAS'], summary: 'Xây cấu trúc campaign, keyword match type, landing page và đo hiệu quả.' },
  { id: 'mkt-social-community-playbook', majorKey: 'mkt', track: 'Social Media', title: 'Playbook cộng đồng 4 tuần', difficulty: 'Junior', xp: 390, due: '8 ngày', mentor: 'Mai Nguyễn', tags: ['Community', 'Social', 'Engagement'], summary: 'Thiết kế nhịp đăng bài, format tương tác và rule quản trị cộng đồng.' },
  { id: 'mkt-social-influencer-brief', majorKey: 'mkt', track: 'Social Media', title: 'Influencer brief cho chiến dịch', difficulty: 'Mid-level', xp: 560, due: '9 ngày', mentor: 'Trang Bùi', tags: ['KOL', 'Brief', 'Tracking'], summary: 'Chọn tiêu chí KOL, brief nội dung, mã tracking và KPI đánh giá.' },
  { id: 'mkt-brand-positioning-map', majorKey: 'mkt', track: 'Thương hiệu', title: 'Bản đồ định vị thương hiệu', difficulty: 'Mid-level', xp: 610, due: '11 ngày', mentor: 'Khoa Phạm', tags: ['Brand', 'Positioning', 'Competitor'], summary: 'So sánh đối thủ, xác định điểm khác biệt và tuyên bố định vị.' },
  { id: 'mkt-brand-launch-deck', majorKey: 'mkt', track: 'Thương hiệu', title: 'Deck ra mắt thương hiệu', difficulty: 'Senior', xp: 790, due: '15 ngày', mentor: 'Khoa Phạm', tags: ['Brand', 'Deck', 'Campaign'], summary: 'Tạo big idea, key message, visual direction và kế hoạch launch đa kênh.' },
  { id: 'mkt-growth-referral-loop', majorKey: 'mkt', track: 'Growth', title: 'Referral loop cho app học tập', difficulty: 'Senior', xp: 820, due: '16 ngày', mentor: 'Khoa Phạm', tags: ['Referral', 'Experiment', 'Activation'], summary: 'Thiết kế cơ chế giới thiệu, reward, tracking và thí nghiệm A/B.' },
  { id: 'mkt-growth-retention-experiment', majorKey: 'mkt', track: 'Growth', title: 'Thí nghiệm giữ chân người dùng', difficulty: 'Senior', xp: 780, due: '14 ngày', mentor: 'Khoa Phạm', tags: ['Retention', 'Cohort', 'Experiment'], summary: 'Tìm điểm rơi churn, đặt giả thuyết, thiết kế cohort và đo tác động.' },
  { id: 'mkt-crm-onboarding-journey', majorKey: 'mkt', track: 'CRM / Lifecycle', title: 'Journey onboarding 7 ngày', difficulty: 'Mid-level', xp: 600, due: '10 ngày', mentor: 'Vy Hoàng', tags: ['CRM', 'Lifecycle', 'Email'], summary: 'Thiết kế email, push, segmentation và trigger giúp người dùng kích hoạt.' },
  { id: 'mkt-crm-winback-segment', majorKey: 'mkt', track: 'CRM / Lifecycle', title: 'Chiến dịch win-back khách hàng', difficulty: 'Senior', xp: 740, due: '13 ngày', mentor: 'Vy Hoàng', tags: ['CRM', 'Segment', 'Offer'], summary: 'Phân nhóm churn risk, xây ưu đãi, automation flow và chỉ số thành công.' },
  { id: 'mkt-research-competitor-map', majorKey: 'mkt', track: 'Research', title: 'Market competitor map', difficulty: 'Mid-level', xp: 620, due: '12 ngày', mentor: 'Duy Lâm', tags: ['Research', 'Benchmark', 'Insight'], summary: 'Phân tích đối thủ, bảng tính năng, giá và cơ hội định vị sản phẩm.' },
  { id: 'design-ui-component-states', majorKey: 'design', track: 'UI Design', title: 'Component states cho design system', difficulty: 'Junior', xp: 410, due: '8 ngày', mentor: 'Vy Hoàng', tags: ['Figma', 'Component', 'State'], summary: 'Thiết kế state default, hover, focus, disabled, error cho form và card.' },
  { id: 'design-ui-responsive-dashboard', majorKey: 'design', track: 'UI Design', title: 'Dashboard responsive đa breakpoint', difficulty: 'Mid-level', xp: 620, due: '11 ngày', mentor: 'Vy Hoàng', tags: ['Dashboard', 'Responsive', 'UI'], summary: 'Thiết kế desktop, tablet, mobile với grid, density và ưu tiên thông tin.' },
  { id: 'design-ux-checkout-test', majorKey: 'design', track: 'UX Design', title: 'Usability test luồng checkout', difficulty: 'Mid-level', xp: 640, due: '12 ngày', mentor: 'Phúc Lê', tags: ['UX Test', 'Checkout', 'Insight'], summary: 'Lập kịch bản test, ghi nhận friction và đề xuất cải thiện có ưu tiên.' },
  { id: 'design-ux-information-architecture', majorKey: 'design', track: 'UX Design', title: 'Information architecture cho app học', difficulty: 'Senior', xp: 730, due: '14 ngày', mentor: 'Phúc Lê', tags: ['IA', 'Card Sort', 'Flow'], summary: 'Tổ chức menu, luồng tìm bài học, taxonomy và sơ đồ điều hướng.' },
  { id: 'design-product-feature-prd', majorKey: 'design', track: 'Product Design', title: 'PRD cho tính năng portfolio public', difficulty: 'Mid-level', xp: 660, due: '12 ngày', mentor: 'An Phạm', tags: ['PRD', 'Prototype', 'Metric'], summary: 'Viết mục tiêu, user story, luồng chính, edge case và metric thành công.' },
  { id: 'design-product-metric-prototype', majorKey: 'design', track: 'Product Design', title: 'Prototype gắn metric sản phẩm', difficulty: 'Senior', xp: 820, due: '16 ngày', mentor: 'An Phạm', tags: ['Prototype', 'Metric', 'Experiment'], summary: 'Thiết kế prototype kèm giả thuyết, event tracking và plan kiểm chứng.' },
  { id: 'design-graphic-social-kit', majorKey: 'design', track: 'Graphic Design', title: 'Social kit cho chiến dịch tuyển sinh', difficulty: 'Junior', xp: 390, due: '7 ngày', mentor: 'An Chi', tags: ['Social', 'Template', 'Brand'], summary: 'Tạo bộ template post, story, banner với guideline sử dụng rõ ràng.' },
  { id: 'design-graphic-event-poster', majorKey: 'design', track: 'Graphic Design', title: 'Poster sự kiện cộng đồng', difficulty: 'Mid-level', xp: 560, due: '9 ngày', mentor: 'An Chi', tags: ['Poster', 'Layout', 'Print'], summary: 'Thiết kế poster online/offline với hierarchy, CTA và file xuất bản chuẩn.' },
  { id: 'design-motion-onboarding-lottie', majorKey: 'design', track: 'Motion Design', title: 'Onboarding motion bằng Lottie', difficulty: 'Mid-level', xp: 650, due: '12 ngày', mentor: 'Huy Võ', tags: ['Lottie', 'Storyboard', 'Motion'], summary: 'Tạo storyboard, motion timing và file animation cho onboarding app.' },
  { id: 'design-motion-product-reveal', majorKey: 'design', track: 'Motion Design', title: 'Video product reveal 15 giây', difficulty: 'Senior', xp: 760, due: '14 ngày', mentor: 'Huy Võ', tags: ['Motion', 'Video', 'Brand'], summary: 'Thiết kế rhythm, transition, CTA và guideline export cho social.' },
  { id: 'design-brand-logo-system', majorKey: 'design', track: 'Brand Design', title: 'Logo system cho startup', difficulty: 'Mid-level', xp: 630, due: '11 ngày', mentor: 'An Chi', tags: ['Logo', 'System', 'Brand'], summary: 'Tạo logo chính, biến thể, vùng an toàn, màu và rule sử dụng.' },
  { id: 'design-brand-guideline-book', majorKey: 'design', track: 'Brand Design', title: 'Brand guideline mini book', difficulty: 'Senior', xp: 800, due: '15 ngày', mentor: 'An Chi', tags: ['Guideline', 'Brand', 'Template'], summary: 'Biên soạn guideline gồm tone, visual language, layout và ứng dụng mẫu.' },
  { id: 'design-research-interview-plan', majorKey: 'design', track: 'UX Research', title: 'Kế hoạch phỏng vấn người dùng', difficulty: 'Junior', xp: 420, due: '8 ngày', mentor: 'Hà My', tags: ['Interview', 'Research', 'Script'], summary: 'Xác định mục tiêu nghiên cứu, chọn mẫu, viết câu hỏi và consent form.' },
  { id: 'design-research-insight-report', majorKey: 'design', track: 'UX Research', title: 'Insight report từ phỏng vấn', difficulty: 'Senior', xp: 780, due: '14 ngày', mentor: 'Hà My', tags: ['Insight', 'Synthesis', 'Journey'], summary: 'Tổng hợp pattern, quote, opportunity và khuyến nghị sản phẩm.' },
  { id: 'design-accessibility-redesign', majorKey: 'design', track: 'UX Design', title: 'Redesign màn hình theo accessibility', difficulty: 'Senior', xp: 740, due: '13 ngày', mentor: 'Phúc Lê', tags: ['A11y', 'UI', 'WCAG'], summary: 'Sửa contrast, focus state, copy lỗi và trải nghiệm keyboard cho form.' },
  { id: 'design-designsystem-token-audit', majorKey: 'design', track: 'UI Design', title: 'Audit token cho design system', difficulty: 'Senior', xp: 760, due: '14 ngày', mentor: 'Vy Hoàng', tags: ['Token', 'Design System', 'Audit'], summary: 'Rà soát color, typography, spacing token và đề xuất quy tắc mở rộng hệ thống.' }
];

export const submissionRules = {
  dev: {
    primaryLabel: 'Repository GitHub',
    secondaryLabel: 'Link demo / API docs',
    skillPlaceholder: 'React, Node.js, MongoDB, Docker...',
    notePlaceholder: 'Mô tả kiến trúc, cách chạy, tài khoản demo và phần đã hoàn thành.',
    accepted: 'GitHub, deploy URL, Swagger/Postman, video demo',
    checklist: ['Có README hướng dẫn chạy', 'Có dữ liệu mẫu hoặc tài khoản demo', 'Có ảnh/video kết quả', 'Không commit secret hoặc mật khẩu thật']
  },
  mkt: {
    primaryLabel: 'Link campaign deck',
    secondaryLabel: 'Link file số liệu / dashboard',
    skillPlaceholder: 'SEO, Meta Ads, GA4, Content Plan...',
    notePlaceholder: 'Mô tả insight, KPI, kênh triển khai và cách đo hiệu quả.',
    accepted: 'PDF/Slides, Sheet, dashboard, creative assets',
    checklist: ['Có mục tiêu và KPI', 'Có chân dung khách hàng', 'Có kế hoạch ngân sách/kênh', 'Có kết luận từ dữ liệu']
  },
  design: {
    primaryLabel: 'Link Figma / prototype',
    secondaryLabel: 'Link case study / video walkthrough',
    skillPlaceholder: 'Figma, UI Kit, Prototype, UX Research...',
    notePlaceholder: 'Mô tả vấn đề, giải pháp, luồng người dùng và quyết định thiết kế.',
    accepted: 'Figma, prototype, case study, ảnh before-after',
    checklist: ['Có problem statement', 'Có user flow/prototype', 'Có design system cơ bản', 'Có giải thích quyết định thiết kế']
  }
};

export const userProfiles = [
  {
    id: 'demo-student',
    name: 'Quang Nguyễn',
    email: 'student@portfolio.vn',
    password: '123456',
    selectedMajorKey: 'dev',
    careerGoal: 'Senior Architect',
    path: ['dev-frontend-so-cap', 'dev-fullstack-trung-cap', 'dev-architecture-cao-cap'],
    joinedChallengeIds: ['dev-api', 'dev-dashboard'],
    stats: { completedChallenges: 6, mentorRating: 4.8, portfolioProjects: 4, verifiedSkills: 18 },
    portfolio: {
      headline: 'Developer Portfolio - Backend/API oriented',
      bio: 'Sinh viên đang xây portfolio theo hướng Full Stack và Software Architecture.',
      publishedProjects: ['API thương mại điện tử', 'Dashboard nghề nghiệp', 'Case study kiến trúc booking'],
      links: ['https://github.com/demo/portfolio-api', 'https://portfolio.demo']
    },
    badges: ['Xây lộ trình', 'Sẵn sàng thử thách', 'Đã được góp ý', 'Có minh chứng portfolio']
  }
];

export const mentorFeedback = [
  { id: 'fb-dev-api', userId: 'demo-student', challengeId: 'dev-api', score: 88, title: 'Đủ tốt để đưa vào portfolio', strengths: ['API rõ module', 'Có auth và validation', 'README dễ chạy'], improvements: ['Thêm test endpoint', 'Bổ sung sơ đồ database', 'Viết ngắn phần trade-off'], reviewer: 'Anh Trần' },
  { id: 'fb-design-ui', userId: 'demo-student', challengeId: 'design-ui', score: 91, title: 'Prototype rõ luồng', strengths: ['Visual hierarchy tốt', 'State đầy đủ'], improvements: ['Thêm accessibility note', 'Ghi rõ constraint'], reviewer: 'Vy Hoàng' },
  { id: 'fb-mkt-seo', userId: 'demo-student', challengeId: 'mkt-seo', score: 84, title: 'Audit có hướng hành động', strengths: ['Keyword map rõ', 'Ưu tiên hợp lý'], improvements: ['Thêm benchmark đối thủ', 'Bổ sung timeline 30 ngày'], reviewer: 'Duy Lâm' }
];

export const submissions = [
  { id: 'sub-dev-api', userId: 'demo-student', challengeId: 'dev-api', status: 'submitted', primaryLink: 'https://github.com/demo/portfolio-api', secondaryLink: 'https://portfolio-api.demo/swagger', updatedAt: '09:30' },
  { id: 'sub-dev-dashboard', userId: 'demo-student', challengeId: 'dev-dashboard', status: 'draft', primaryLink: 'https://github.com/demo/career-dashboard', secondaryLink: 'https://career-dashboard.demo', updatedAt: '14:15' }
];

export const adminAccounts = [
  {
    id: 'admin-demo',
    name: 'Portfolio Admin',
    email: 'admin@portfolio.vn',
    password: 'admin123',
    role: 'admin',
    title: 'Platform Operations Manager',
    department: 'Career Platform Operations',
    seniority: 'Head Admin',
    permissions: ['manage_challenges', 'manage_users', 'review_submissions', 'edit_content', 'manage_mentors', 'view_reports'],
    responsibilities: [
      'Quản lý danh mục ngành, chuyên ngành và thử thách',
      'Theo dõi tiến độ nộp bài và chất lượng feedback',
      'Phân quyền mentor, kiểm tra dữ liệu demo và báo cáo vận hành'
    ],
    managedModules: ['Career Map', 'Challenge Hub', 'Submissions', 'Mentor Reviews', 'User Portfolio'],
    operatingMetrics: {
      weeklyActiveStudents: 126,
      pendingReviews: 18,
      publishedChallenges: 103,
      activeMentors: 10
    },
    activityLog: [
      'Cập nhật bộ lọc quản lý challenge',
      'Duyệt mentor cho track Backend và Product Design',
      'Kiểm tra 18 submission đang chờ review'
    ],
    status: 'active'
  }
];

export const mentorAccounts = [
  {
    id: 'mentor-demo',
    name: 'Anh Trần',
    email: 'mentor@portfolio.vn',
    password: 'mentor123',
    role: 'mentor',
    expertise: ['Backend', 'Full Stack', 'Software Architecture'],
    strongestField: 'Backend API & System Design',
    level: 'Senior Mentor',
    education: [
      'B.S. Computer Science - University of Engineering and Technology',
      'AWS Solutions Architect Associate',
      'MongoDB Node.js Developer Path'
    ],
    workHistory: [
      { company: 'FPT Software', role: 'Backend Engineer', period: '2018-2020' },
      { company: 'Tiki', role: 'Senior Backend Developer', period: '2020-2023' },
      { company: 'FinTech SaaS Lab', role: 'Solution Architect', period: '2023-2026' }
    ],
    domains: ['E-commerce', 'Booking system', 'Payment workflow', 'Career platform'],
    reviewStyle: 'Review theo checklist: đúng yêu cầu, kiến trúc, bảo mật, README, khả năng đưa vào portfolio.',
    achievements: ['Reviewed 180+ student projects', 'Designed 12 production APIs', 'Mentored 35 junior developers'],
    availability: 'Thứ 3, Thứ 5, Chủ nhật - 19:30 đến 22:00',
    currentCompany: 'FinTech SaaS Lab',
    jobTitle: 'Solution Architect',
    yearsOfExperience: 8,
    strongestTools: ['Node.js', 'MongoDB', 'Docker', 'AWS', 'System Design'],
    reviewCapacity: 12,
    reviewQueue: ['dev-api', 'auto-dev-backend-case-study', 'auto-dev-fullstack-capstone'],
    menteeLevels: ['Junior', 'Mid-level', 'Senior'],
    languages: ['Vietnamese', 'English'],
    rating: 4.9,
    activeStudents: ['demo-student', 'student-dev-backend', 'student-dev-devops']
  }
];

export const categories = [
  { id: 'cat-dev', name: 'Software Engineering', majorKey: 'dev', description: 'Web, backend, mobile, cloud, AI and system design.' },
  { id: 'cat-design', name: 'UI/UX Design', majorKey: 'design', description: 'Product design, interface design, research and motion.' },
  { id: 'cat-mkt', name: 'Digital Marketing', majorKey: 'mkt', description: 'SEO, content, paid ads, CRM, brand and growth.' }
];

export const resources = [
  { id: 'res-react', majorKey: 'dev', track: 'Frontend', title: 'React Production Checklist', type: 'Course', url: 'https://react.dev', difficulty: 'Junior' },
  { id: 'res-node', majorKey: 'dev', track: 'Backend', title: 'Node.js API Design Notes', type: 'Article', url: 'https://nodejs.org', difficulty: 'Mid-level' },
  { id: 'res-figma', majorKey: 'design', track: 'UI Design', title: 'Figma Design System Starter', type: 'Template', url: 'https://figma.com', difficulty: 'Junior' },
  { id: 'res-seo', majorKey: 'mkt', track: 'SEO', title: 'SEO Audit Worksheet', type: 'Worksheet', url: 'https://search.google.com/search-console', difficulty: 'Mid-level' }
];

export const notifications = [
  { id: 'noti-1', userId: 'demo-student', role: 'student', title: 'Bài nộp dev-api đã sẵn sàng nhận xét', unread: true, createdAt: '09:30' },
  { id: 'noti-2', userId: 'mentor-demo', role: 'mentor', title: 'Có 2 bài nộp đang chờ review', unread: true, createdAt: '10:00' },
  { id: 'noti-3', userId: 'admin-demo', role: 'admin', title: 'Challenge mới có thể được thêm từ Admin Console', unread: false, createdAt: '10:15' }
];
