export const REVIEW_FEE = 5000;
export const MAJOR_LABELS = { dev: 'Developer', mkt: 'Marketing', design: 'Thiết kế' };
export const LEVEL_LABELS = { beginner: 'Nền tảng', intermediate: 'Trung cấp', advanced: 'Nâng cao' };
const sources = {
  dev: { name: 'Meta Front-End Developer · Coursera', url: 'https://www.coursera.org/professional-certificates/meta-front-end-developer' },
  mkt: { name: 'Google Digital Marketing & E-commerce · Coursera', url: 'https://www.coursera.org/professional-certificates/google-digital-marketing-ecommerce' },
  design: { name: 'Google UX Design · Coursera', url: 'https://www.coursera.org/professional-certificates/google-ux-design' }
};
const make = (id, title, majorKey, level, summary, requirements, criteria) => ({
  id, title, majorKey, level, access: level === 'advanced' ? 'premium' : 'free',
  summary, requirements, estimatedHours: { beginner: 4, intermediate: 8, advanced: 16 }[level],
  source: { ...sources[majorKey], note: 'Bài thực hành do Portfolio FPT Hub biên soạn theo chủ đề của khóa học; không phải đề thi chính thức hoặc chứng chỉ của đơn vị nguồn.' },
  rubric: criteria.map(([key, label, weight]) => ({ key, label, weight }))
});
export const CHALLENGES = [
  make('practice-dev-profile', 'Trang giới thiệu cá nhân responsive', 'dev', 'beginner', 'Xây một trang giới thiệu dự án rõ ràng trên điện thoại và máy tính.', ['Link repository và README hướng dẫn chạy', 'Trang có giới thiệu, kỹ năng và ít nhất một dự án', 'Minh chứng giao diện ở 375px và 1280px'], [['layout', 'Bố cục responsive', 35], ['semantics', 'HTML ngữ nghĩa và khả năng truy cập', 25], ['content', 'Nội dung và minh chứng dự án', 20], ['readme', 'README và tổ chức mã nguồn', 20]]),
  make('practice-dev-dashboard', 'Dashboard theo dõi tiến độ học tập', 'dev', 'intermediate', 'Tạo ứng dụng React có lọc, tìm kiếm và trạng thái dữ liệu rõ ràng.', ['Link repo, demo hoặc video walkthrough', 'Có loading, empty và error state', 'Nêu tối thiểu ba ca kiểm thử và kết quả'], [['behavior', 'Luồng thao tác và xử lý trạng thái', 35], ['components', 'Thiết kế component và state', 25], ['testing', 'Kiểm thử và xử lý lỗi', 25], ['explanation', 'Giải thích quyết định kỹ thuật', 15]]),
  make('practice-dev-capstone', 'Ứng dụng đặt lịch tư vấn', 'dev', 'advanced', 'Thiết kế sản phẩm có luồng chọn lịch, xác nhận và hủy, kèm minh chứng kiểm thử.', ['Repo và hướng dẫn chạy với dữ liệu mẫu', 'Mô tả xử lý xung đột lịch và phân quyền', 'Báo cáo kiểm thử các luồng chính'], [['flow', 'Tính đúng đắn của luồng đặt lịch', 35], ['architecture', 'Kiến trúc và quản lý dữ liệu', 25], ['reliability', 'Bảo mật, lỗi và kiểm thử', 25], ['handoff', 'Tài liệu bàn giao', 15]]),
  make('practice-mkt-persona', 'Chân dung khách hàng và kế hoạch nội dung', 'mkt', 'beginner', 'Xác định đối tượng cho một sản phẩm bạn chọn và xây lịch nội dung một tuần.', ['Slide hoặc tài liệu chỉ đọc', 'Nêu nguồn thông tin và phân biệt giả định với dữ liệu thật', 'Lịch bảy ngày với mục tiêu từng nội dung'], [['audience', 'Hiểu đối tượng mục tiêu', 30], ['message', 'Thông điệp phù hợp', 30], ['calendar', 'Tính khả thi của lịch nội dung', 25], ['sources', 'Nguồn và cách trình bày', 15]]),
  make('practice-mkt-campaign', 'Chiến dịch marketing có ngân sách và KPI', 'mkt', 'intermediate', 'Lập chiến dịch bốn tuần với mục tiêu, kênh và phương án đo lường.', ['Link kế hoạch và bảng ngân sách', 'Phễu chuyển đổi và cách tính KPI', 'Đánh dấu số liệu mô phỏng, nêu giả định'], [['strategy', 'Chiến lược và insight', 30], ['budget', 'Ngân sách và phân bổ kênh', 25], ['measurement', 'KPI và phương pháp đo lường', 30], ['creative', 'Thông điệp sáng tạo', 15]]),
  make('practice-mkt-experiment', 'Thử nghiệm tăng trưởng cho thương mại điện tử', 'mkt', 'advanced', 'Thiết kế thử nghiệm cải thiện chuyển đổi và báo cáo cách ra quyết định.', ['Link báo cáo và bảng tính', 'Giả thuyết A/B, chỉ số và điều kiện dừng', 'Phân tích giới hạn dữ liệu và rủi ro'], [['hypothesis', 'Giả thuyết và thiết kế thử nghiệm', 30], ['analysis', 'Phân tích dữ liệu', 30], ['decision', 'Đề xuất và tính khả thi', 25], ['ethics', 'Minh bạch và giới hạn đo lường', 15]]),
  make('practice-design-wireframe', 'User flow và wireframe đăng ký sự kiện', 'design', 'beginner', 'Thiết kế luồng đăng ký ngắn gọn cho người dùng di động.', ['Link Figma hoặc tài liệu xem được', 'User flow và ít nhất bốn màn hình', 'Giải thích lỗi nhập liệu và cách hỗ trợ người dùng'], [['flow', 'Luồng người dùng', 35], ['structure', 'Cấu trúc thông tin', 30], ['accessibility', 'Khả năng tiếp cận', 20], ['rationale', 'Giải thích quyết định', 15]]),
  make('practice-design-prototype', 'Prototype ứng dụng học tập', 'design', 'intermediate', 'Xây prototype tương tác và kiểm tra khả năng sử dụng với một nhóm nhỏ.', ['File thiết kế và prototype', 'Component và trạng thái màn hình', 'Ghi chép usability test, không tiết lộ danh tính người tham gia'], [['interaction', 'Tương tác và tính hoàn chỉnh', 30], ['system', 'Hệ thống giao diện nhất quán', 25], ['research', 'Kiểm tra với người dùng', 30], ['iteration', 'Cải tiến sau phản hồi', 15]]),
  make('practice-design-case-study', 'Case study cải tiến trải nghiệm đặt dịch vụ', 'design', 'advanced', 'Trình bày từ nghiên cứu đến giải pháp, kiểm chứng và bài học.', ['Link case study và prototype', 'Bằng chứng nghiên cứu đã ẩn danh', 'So sánh trước/sau và giới hạn của kết quả'], [['research', 'Nghiên cứu và xác định vấn đề', 30], ['solution', 'Chất lượng giải pháp', 30], ['validation', 'Kiểm chứng và đo lường', 25], ['story', 'Trình bày case study', 15]])
];
export const RESOURCES = [
  ...Object.entries(sources).map(([majorKey, source]) => ({ id: `source-${majorKey}`, title: source.name, majorKey, source: 'Coursera', url: source.url, note: 'Học tại trang nguồn; học phí, quyền truy cập và chứng chỉ do đơn vị cung cấp quy định.' })),
  { id: 'source-fpt', title: 'Cổng thông tin đào tạo FPT University', majorKey: 'all', source: 'FPT University', url: 'https://fap.fpt.edu.vn/', note: 'Dành cho người học có tài khoản FPT. Tài liệu và đề bài nội bộ chỉ sử dụng theo quyền truy cập được trường cấp; nền tảng không sao chép hoặc phân phối lại.' }
];

export const ratingBonus = stars => stars === 5 ? 1250 : stars === 4 ? 750 : 0;
export function qualityFromRatings(ratings) {
  const count = ratings.length;
  const average = count ? ratings.reduce((sum, item) => sum + Number(item), 0) / count : 0;
  const excluded = count >= 5 && average < 2.5;
  const warning = ratings.some(star => star <= 2) || (count >= 3 && average < 3.5);
  return { ratingCount: count, ratingAvg: Number(average.toFixed(2)), qualityStatus: excluded ? 'excluded' : warning ? 'warning' : 'good' };
}
export function scoreReview(challenge, scores) {
  if (!scores || challenge.rubric.some(item => typeof scores[item.key] !== 'number' || scores[item.key] < 0 || scores[item.key] > 10 || !Number.isFinite(scores[item.key]))) throw new Error('Điền điểm 0–10 cho từng tiêu chí.');
  return Math.round(challenge.rubric.reduce((sum, item) => sum + scores[item.key] * item.weight / 10, 0));
}
export function readinessCheck(payload) {
  const checks = [
    { label: 'Có link minh chứng hoặc yêu cầu trao đổi', ok: payload.links.length > 0 || payload.format === 'chat' },
    { label: 'Mô tả đủ bối cảnh (ít nhất 80 ký tự)', ok: payload.notes.trim().length >= 80 },
    { label: 'Khai báo ít nhất hai kỹ năng', ok: payload.skills.length >= 2 },
    { label: 'Đã xác nhận quyền xem minh chứng', ok: payload.linksAccessible === true }
  ];
  return { score: Math.round(checks.filter(item => item.ok).length / checks.length * 100), checks, engine: 'rules', note: 'Kiểm tra mức độ sẵn sàng bằng quy tắc, chưa phải chấm chất lượng bằng mô hình AI. Hệ thống không mở link, chạy code hay đọc nội dung tài liệu.' };
}
