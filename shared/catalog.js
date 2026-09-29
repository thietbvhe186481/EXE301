import { RUBRIC_EVIDENCE } from './rubricEvidence.js';

export const REVIEW_FEE = 5000;
export const MAJOR_LABELS = { dev: 'Công nghệ thông tin', mkt: 'Marketing', design: 'Thiết kế' };
export const LEVEL_LABELS = { beginner: 'Nền tảng', intermediate: 'Trung cấp', advanced: 'Nâng cao' };
export const SPECIALIZATIONS = [
  { key: 'frontend', majorKey: 'dev', label: 'Front-end' },
  { key: 'backend', majorKey: 'dev', label: 'Back-end & API' },
  { key: 'data', majorKey: 'dev', label: 'Dữ liệu' },
  { key: 'security', majorKey: 'dev', label: 'An toàn ứng dụng' },
  { key: 'market-research', majorKey: 'mkt', label: 'Nghiên cứu thị trường' },
  { key: 'content', majorKey: 'mkt', label: 'Nội dung & mạng xã hội' },
  { key: 'performance', majorKey: 'mkt', label: 'SEO & quảng cáo' },
  { key: 'marketing-analytics', majorKey: 'mkt', label: 'Phân tích tăng trưởng' },
  { key: 'ux-research', majorKey: 'design', label: 'Nghiên cứu UX' },
  { key: 'ui', majorKey: 'design', label: 'Thiết kế giao diện' },
  { key: 'accessibility', majorKey: 'design', label: 'Thiết kế tiếp cận' },
  { key: 'design-system', majorKey: 'design', label: 'Design system' }
];
const sources = {
  dev: { name: 'Meta Front-End Developer · Coursera', url: 'https://www.coursera.org/professional-certificates/meta-front-end-developer' },
  mkt: { name: 'Google Digital Marketing & E-commerce · Coursera', url: 'https://www.coursera.org/professional-certificates/google-digital-marketing-ecommerce' },
  design: { name: 'Google UX Design · Coursera', url: 'https://www.coursera.org/professional-certificates/google-ux-design' }
};
const LEVEL_GUIDANCE = {
  beginner: 'Nền tảng · Làm theo brief từng bước, tập trung đúng yêu cầu và trình bày sản phẩm rõ ràng.',
  intermediate: 'Trung cấp · Tự lập kế hoạch, xử lý tình huống phát sinh và giải thích lựa chọn của mình.',
  advanced: 'Nâng cao · Giải quyết bài toán nhiều ràng buộc, chứng minh quyết định bằng dữ liệu và bàn giao như sản phẩm thực tế.'
};
const OUTCOMES = {
  dev: {
    beginner: 'Một sản phẩm nhỏ chạy được, có mã nguồn, hướng dẫn sử dụng và ảnh minh chứng.',
    intermediate: 'Một ứng dụng có luồng chính hoàn chỉnh, xử lý trạng thái lỗi và có kiểm thử hoặc demo.',
    advanced: 'Một giải pháp gần production, có thiết kế kiến trúc, kiểm soát rủi ro và tài liệu bàn giao.'
  },
  mkt: {
    beginner: 'Một bản nghiên cứu hoặc kế hoạch nội dung có đối tượng, thông điệp và nguồn tham khảo rõ ràng.',
    intermediate: 'Một kế hoạch chiến dịch có kênh, ngân sách, KPI và cách đo kết quả.',
    advanced: 'Một báo cáo tối ưu dựa trên dữ liệu, có giả thuyết thử nghiệm và nêu giới hạn kết luận.'
  },
  design: {
    beginner: 'Một user flow và bộ wireframe/prototype giải quyết đúng nhu cầu được giao.',
    intermediate: 'Một prototype có trạng thái tương tác, được kiểm tra và cải tiến theo phản hồi.',
    advanced: 'Một case study từ nghiên cứu đến giải pháp, có minh chứng kiểm chứng và quyết định thiết kế.'
  }
};
const make = (id, title, majorKey, level, summary, requirements, criteria) => ({
  id, title, majorKey, level, access: level === 'advanced' ? 'premium' : 'free',
  levelDescription: LEVEL_GUIDANCE[level], learningOutcome: OUTCOMES[majorKey][level],
  summary, requirements, estimatedHours: { beginner: 4, intermediate: 8, advanced: 16 }[level],
  source: { ...sources[majorKey], note: 'Bài thực hành do Portfolio FPT Hub biên soạn theo chủ đề của khóa học; không phải đề thi chính thức hoặc chứng chỉ của đơn vị nguồn.' },
  rubric: criteria.map(([key, label, weight]) => ({ key, label, weight,
    expectation: `Chỉ ra cách bài làm đáp ứng “${label.toLocaleLowerCase('vi')}” và dẫn tới minh chứng cụ thể trong sản phẩm.`,
    anchors: {
      basic: `0–4: Thiếu hoặc chưa có minh chứng rõ cho ${label.toLocaleLowerCase('vi')}.`,
      adequate: `5–7: Đáp ứng phần chính về ${label.toLocaleLowerCase('vi')} nhưng còn điểm cần sửa.`,
      strong: `8–10: Đáp ứng đầy đủ, có minh chứng và giải thích lựa chọn về ${label.toLocaleLowerCase('vi')}.`
    }
  }))
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

// Additional locally authored practice briefs mapped to verified, publisher-hosted courses.
const moreChallenges = [
  ['practice-dev-api', 'API quản lý sự kiện', 'dev', 'beginner', 'Thiết kế API CRUD có phân trang và kiểm tra dữ liệu đầu vào.', ['Link repository và tài liệu endpoint', 'Minh chứng ít nhất ba tình huống lỗi'], [['api', 'Thiết kế endpoint và mã trạng thái', 35], ['validation', 'Kiểm tra dữ liệu', 25], ['security', 'Quyền truy cập cơ bản', 20], ['docs', 'Tài liệu và ví dụ', 20]]],
  ['practice-dev-data', 'Ứng dụng phân tích dữ liệu nhỏ', 'dev', 'intermediate', 'Làm sạch dữ liệu công khai và trình bày kết quả bằng biểu đồ.', ['Link mã nguồn và dữ liệu có giấy phép phù hợp', 'Giải thích bước làm sạch và giới hạn dữ liệu'], [['quality', 'Chất lượng xử lý dữ liệu', 30], ['analysis', 'Phân tích có căn cứ', 30], ['visuals', 'Biểu đồ dễ hiểu', 20], ['reproducible', 'Khả năng tái lập', 20]]],
  ['practice-dev-security', 'Rà soát bảo mật ứng dụng web', 'dev', 'advanced', 'Lập threat model, rà soát cấu hình và trình bày kế hoạch giảm thiểu rủi ro.', ['Báo cáo không chứa dữ liệu nhạy cảm', 'Nêu phạm vi, mức độ ảnh hưởng và cách tái kiểm tra'], [['scope', 'Phạm vi và threat model', 25], ['findings', 'Bằng chứng phát hiện', 30], ['mitigation', 'Biện pháp giảm thiểu', 30], ['ethics', 'Thực hành có trách nhiệm', 15]]],
  ['practice-mkt-research', 'Nghiên cứu thị trường cho sản phẩm mới', 'mkt', 'beginner', 'Xác định phân khúc, đối thủ và giả thuyết nhu cầu bằng nguồn công khai.', ['Link báo cáo ngắn và nguồn dữ liệu', 'Phân biệt dữ liệu với giả định'], [['audience', 'Phân khúc rõ ràng', 25], ['sources', 'Nguồn đáng tin cậy', 25], ['insight', 'Insight có căn cứ', 30], ['clarity', 'Trình bày mạch lạc', 20]]],
  ['practice-mkt-seo', 'Kế hoạch SEO theo ý định tìm kiếm', 'mkt', 'intermediate', 'Xây topic cluster và kế hoạch tối ưu một trang đích.', ['Link nghiên cứu từ khóa và brief nội dung', 'Không dùng số liệu thứ hạng bịa đặt'], [['intent', 'Phân tích search intent', 30], ['structure', 'Cấu trúc nội dung', 25], ['onpage', 'Đề xuất on-page', 25], ['measurement', 'Kế hoạch đo lường', 20]]],
  ['practice-mkt-analytics', 'Báo cáo phân tích phễu chuyển đổi', 'mkt', 'advanced', 'Dùng bộ dữ liệu mẫu hoặc dữ liệu đã ẩn danh để tìm điểm nghẽn và đề xuất thử nghiệm.', ['Link dashboard hoặc báo cáo', 'Ghi rõ nguồn và giới hạn dữ liệu'], [['metrics', 'Chọn chỉ số phù hợp', 25], ['analysis', 'Phân tích phễu', 30], ['experiments', 'Thử nghiệm khả thi', 25], ['privacy', 'Ẩn danh và minh bạch', 20]]],
  ['practice-design-audit', 'Đánh giá khả năng tiếp cận giao diện', 'design', 'beginner', 'Kiểm tra một luồng giao diện với checklist tương phản, bàn phím và nhãn.', ['Link prototype hoặc ảnh đã được phép chia sẻ', 'Ghi rõ tiêu chí đã dùng'], [['coverage', 'Độ bao phủ kiểm tra', 30], ['findings', 'Mô tả vấn đề cụ thể', 30], ['accessibility', 'Đề xuất bao trùm', 25], ['communication', 'Trình bày rõ ràng', 15]]],
  ['practice-design-research', 'Kế hoạch nghiên cứu trải nghiệm người dùng', 'design', 'intermediate', 'Soạn kế hoạch nghiên cứu, câu hỏi trung lập và cách tổng hợp insight.', ['Link kế hoạch và biểu mẫu đồng thuận mẫu', 'Không nộp dữ liệu nhận dạng người tham gia'], [['questions', 'Câu hỏi nghiên cứu', 30], ['method', 'Phương pháp phù hợp', 25], ['ethics', 'Đạo đức và riêng tư', 25], ['synthesis', 'Tổng hợp insight', 20]]],
  ['practice-design-system', 'Bộ quy chuẩn giao diện đa nền tảng', 'design', 'advanced', 'Tạo token, component và trạng thái tương tác cho một sản phẩm số.', ['Link thư viện thiết kế và ví dụ sử dụng', 'Ghi chú quyết định hỗ trợ accessibility'], [['tokens', 'Token có cấu trúc', 25], ['components', 'Component và trạng thái', 30], ['consistency', 'Tính nhất quán', 25], ['handoff', 'Bàn giao cho kỹ thuật', 20]]]
].map(([id, title, major, level, summary, requirements, rubric]) => make(id, title, major, level, summary, requirements, rubric));
CHALLENGES.push(...moreChallenges);

// Local project briefs. Course links provide learning context, not copied assignments.
const challengeContexts = {
  'practice-dev-profile': ['Bạn chuẩn bị ứng tuyển vị trí thực tập và chỉ có hai phút để nhà tuyển dụng hiểu bạn đã làm được gì. Hãy thiết kế trang cá nhân để họ mở được dự án tiêu biểu trên cả điện thoại lẫn máy tính.', 'Người xem có tìm được dự án, xem được minh chứng và đọc được cách chạy mã nguồn ở hai kích thước màn hình không?'],
  'practice-dev-dashboard': ['Một nhóm học tập cần theo dõi tiến độ của nhiều thành viên mà không bị lạc trong bảng dữ liệu. Hãy tạo dashboard để người phụ trách lọc, tìm và nhận biết ngay khi dữ liệu đang tải hoặc gặp lỗi.', 'Các thao tác tìm/lọc có nhất quán với trạng thái loading, rỗng và lỗi; ba ca kiểm thử có chứng minh điều đó không?'],
  'practice-dev-capstone': ['Một nhóm tư vấn có nhiều mentor và các khung giờ có thể trùng nhau. Hãy xây luồng để sinh viên chọn lịch, xác nhận, hủy và nhìn thấy lịch còn trống sau mỗi thay đổi.', 'Có thể đặt trùng một khung giờ hoặc thao tác sai quyền không; tài liệu kiểm thử và thiết kế dữ liệu giải thích cách ngăn chặn ra sao?'],
  'practice-mkt-persona': ['Một sản phẩm mới cần nội dung trong tuần đầu nhưng đội marketing chưa hiểu rõ người dùng. Chọn một sản phẩm cụ thể, xác định nhóm khách hàng ưu tiên rồi lập lịch bảy ngày.', 'Mỗi nội dung có mục tiêu và thông điệp phù hợp persona; dữ liệu và giả định có được phân biệt rõ không?'],
  'practice-mkt-campaign': ['Một thương hiệu nhỏ chỉ có ngân sách giới hạn cho chiến dịch bốn tuần. Hãy phân bổ ngân sách theo kênh và giải thích cách biết chiến dịch đang đi đúng hướng.', 'Tổng ngân sách, KPI và phễu chuyển đổi có khớp nhau; nhóm có biết khi nào cần điều chỉnh chiến dịch không?'],
  'practice-mkt-experiment': ['Một cửa hàng có lượng truy cập nhưng ít đơn hàng. Hãy đề xuất thử nghiệm A/B cho một điểm nghẽn cụ thể và cách quyết định tiếp tục hay dừng.', 'Giả thuyết, chỉ số chính, điều kiện dừng và giới hạn kết luận có đủ để tránh tuyên bố thắng cuộc khi dữ liệu chưa thuyết phục không?'],
  'practice-design-wireframe': ['Người dùng muốn đăng ký một sự kiện trên điện thoại trong vài bước, kể cả khi nhập sai thông tin. Hãy vẽ luồng và wireframe để họ biết đang ở bước nào và sửa lỗi ra sao.', 'Bốn màn hình có tạo thành luồng liên tục; lỗi nhập liệu và lựa chọn điều hướng có dễ hiểu không?'],
  'practice-design-prototype': ['Một nhóm học trực tuyến gặp khó khi tìm bài đang học dở. Hãy tạo prototype có thể bấm thử, kiểm tra với người dùng và ghi rõ điều bạn thay đổi sau phản hồi.', 'Prototype có đủ trạng thái để hoàn thành tác vụ; thay đổi sau usability test có căn cứ từ ghi chép đã ẩn danh không?'],
  'practice-design-case-study': ['Một dịch vụ đặt lịch nhận nhiều phàn nàn ở bước xác nhận. Hãy điều tra nguyên nhân, đề xuất trải nghiệm mới và kể lại cách bạn kiểm chứng.', 'Case study có nối được vấn đề, bằng chứng, quyết định thiết kế và kết quả kiểm chứng mà không phóng đại tác động không?'],
  'practice-dev-api': ['Một câu lạc bộ cần quản lý sự kiện và cho thành viên tìm danh sách theo trang. Hãy thiết kế API để tạo, sửa, xem, xóa và từ chối dữ liệu không hợp lệ.', 'Tài liệu endpoint và ví dụ lỗi có đủ để một lập trình viên khác gọi API đúng mà không phải hỏi tác giả không?'],
  'practice-dev-data': ['Một nhóm cần hiểu xu hướng từ bộ dữ liệu công khai nhỏ. Hãy làm sạch dữ liệu, chọn câu hỏi phân tích và trình bày biểu đồ có thể tái tạo.', 'Người xem có truy lại nguồn, bước làm sạch và giới hạn của kết luận từ mã nguồn cùng dữ liệu được chia sẻ không?'],
  'practice-dev-security': ['Một ứng dụng web chuẩn bị mở cho người dùng thật. Hãy rà soát trong phạm vi được phép, mô tả rủi ro ưu tiên và cách đội phát triển kiểm tra lại sau khi sửa.', 'Mỗi phát hiện có phạm vi, bằng chứng an toàn và biện pháp giảm thiểu đủ cụ thể để tái kiểm tra không?'],
  'practice-mkt-research': ['Một nhóm muốn ra mắt sản phẩm ở thị trường đã có đối thủ. Hãy lập báo cáo ngắn để chọn phân khúc đầu tiên và kiểm tra giả thuyết nhu cầu.', 'Insight có bám nguồn công khai, đối thủ được so sánh công bằng và giả định còn thiếu được nêu rõ không?'],
  'practice-mkt-seo': ['Một trang đích có nội dung rời rạc và chưa trả lời đúng điều người tìm kiếm muốn biết. Hãy xây topic cluster, brief bài viết và kế hoạch đo kết quả.', 'Mỗi nhóm từ khóa có ý định tìm kiếm rõ, nội dung đề xuất có cấu trúc và chỉ số đo không dựa vào thứ hạng tự bịa không?'],
  'practice-mkt-analytics': ['Một phễu chuyển đổi có nhiều lượt truy cập nhưng ít người hoàn tất. Hãy dùng dữ liệu mẫu hoặc dữ liệu đã ẩn danh để chỉ ra điểm nghẽn và đề xuất phép thử.', 'Báo cáo có định nghĩa chỉ số, kích thước mẫu, giới hạn dữ liệu và giả thuyết kiểm chứng được không?'],
  'practice-design-audit': ['Một giao diện hiện có khó dùng bằng bàn phím và chữ có thể thiếu tương phản. Hãy kiểm tra một luồng cụ thể rồi ưu tiên cách sửa.', 'Mỗi vấn đề có vị trí, bước tái hiện, tiêu chí kiểm tra và đề xuất sửa có thể thực hiện không?'],
  'practice-design-research': ['Nhóm sản phẩm chưa biết vì sao người dùng bỏ dở một tác vụ. Hãy lập kế hoạch nghiên cứu trước khi phỏng vấn, gồm cách tuyển người tham gia và xin đồng ý.', 'Câu hỏi có trung lập, phương pháp phù hợp và kế hoạch tổng hợp insight bảo vệ được danh tính người tham gia không?'],
  'practice-design-system': ['Một sản phẩm có web và di động đang dùng màu, khoảng cách và trạng thái nút không nhất quán. Hãy thiết kế thư viện nhỏ để hai đội sử dụng chung.', 'Token, component, trạng thái tương tác và ví dụ bàn giao có giúp kỹ thuật áp dụng nhất quán và tiếp cận được không?']
};
for (const challenge of CHALLENGES) {
  const [scenario, reviewQuestion] = challengeContexts[challenge.id] || [];
  challenge.scenario = scenario || challenge.summary;
  challenge.reviewQuestion = reviewQuestion || 'Đầu ra và minh chứng có đáp ứng đầy đủ yêu cầu và rubric của thử thách không?';
}

// Bài thực hành do nền tảng tự biên soạn; các khóa học chỉ là nguồn học theo chủ đề.
const sourceBySpecialization = {
  frontend: sources.dev,
  backend: { name: 'Meta Back-End Developer · Coursera', url: 'https://www.coursera.org/professional-certificates/meta-back-end-developer' },
  data: { name: 'IBM Data Science · Coursera', url: 'https://www.coursera.org/professional-certificates/ibm-data-science' },
  security: { name: 'Google Cybersecurity · Coursera', url: 'https://www.coursera.org/professional-certificates/google-cybersecurity' },
  'market-research': sources.mkt,
  content: { name: 'Meta Social Media Marketing · Coursera', url: 'https://www.coursera.org/professional-certificates/facebook-social-media-marketing' },
  performance: sources.mkt,
  'marketing-analytics': sources.mkt,
  'ux-research': { name: 'User Experience: Research & Prototyping · Coursera', url: 'https://www.coursera.org/learn/user-research' },
  ui: { name: 'Introduction to UI Design · Coursera', url: 'https://www.coursera.org/learn/ui-design' },
  accessibility: sources.design,
  'design-system': sources.design
};
const sourceNote = 'Bài thực hành do Portfolio FPT Hub tự biên soạn theo chủ đề; liên kết dẫn tới khóa học tham khảo, không phải đề thi hoặc chứng chỉ của đơn vị nguồn.';
const existingDetails = {
  'practice-dev-profile': ['frontend', 5, 'Trang portfolio chạy trên di động và máy tính, có liên kết tới dự án thật cùng README tái hiện được.'],
  'practice-dev-dashboard': ['frontend', 10, 'Dashboard React có tìm kiếm, lọc và ba trạng thái tải/rỗng/lỗi kèm ca kiểm thử.'],
  'practice-dev-capstone': ['backend', 20, 'Ứng dụng đặt lịch có dữ liệu mẫu, xử lý trùng lịch và tài liệu kiểm thử phân quyền.'],
  'practice-mkt-persona': ['market-research', 5, 'Persona có căn cứ và lịch nội dung bảy ngày, ghi rõ giả định chưa được kiểm chứng.'],
  'practice-mkt-campaign': ['performance', 10, 'Kế hoạch chiến dịch bốn tuần có ngân sách, phễu chuyển đổi và công thức đo KPI.'],
  'practice-mkt-experiment': ['marketing-analytics', 16, 'Thiết kế A/B test có giả thuyết, điều kiện dừng và quy tắc ra quyết định từ dữ liệu.'],
  'practice-design-wireframe': ['ui', 5, 'User flow và bốn wireframe cho luồng đăng ký, gồm cách sửa lỗi nhập liệu trên di động.'],
  'practice-design-prototype': ['ui', 11, 'Prototype tương tác cho tác vụ học tiếp, kèm ghi chép usability test và thay đổi sau phản hồi.'],
  'practice-design-case-study': ['ux-research', 18, 'Case study nối được vấn đề, bằng chứng nghiên cứu, giải pháp và giới hạn kiểm chứng.'],
  'practice-dev-api': ['backend', 7, 'API CRUD sự kiện có ví dụ request/response, phân trang và minh chứng kiểm tra lỗi.'],
  'practice-dev-data': ['data', 11, 'Notebook hoặc ứng dụng phân tích có dữ liệu hợp lệ, bước làm sạch và biểu đồ tái lập được.'],
  'practice-dev-security': ['security', 17, 'Báo cáo threat model trong phạm vi được phép, ưu tiên rủi ro và cách tái kiểm tra sau sửa.'],
  'practice-mkt-research': ['market-research', 6, 'Báo cáo phân khúc và đối thủ từ nguồn công khai, tách insight với giả định cần kiểm chứng.'],
  'practice-mkt-seo': ['performance', 9, 'Topic cluster và brief trang đích theo search intent, kèm chỉ số đo không bịa thứ hạng.'],
  'practice-mkt-analytics': ['marketing-analytics', 16, 'Báo cáo phễu chuyển đổi có định nghĩa chỉ số, điểm nghẽn và thử nghiệm ưu tiên.'],
  'practice-design-audit': ['accessibility', 6, 'Bảng kiểm giao diện ghi vị trí lỗi, bước tái hiện, mức ưu tiên và phương án sửa.'],
  'practice-design-research': ['ux-research', 10, 'Kế hoạch phỏng vấn có câu hỏi trung lập, tuyển chọn người tham gia và cách bảo vệ dữ liệu.'],
  'practice-design-system': ['design-system', 19, 'Thư viện token và component cho web/di động, có trạng thái, hướng dẫn dùng và bàn giao.']
};
for (const challenge of CHALLENGES) {
  const [specializationKey, estimatedHours, learningOutcome] = existingDetails[challenge.id];
  challenge.specializationKey = specializationKey;
  challenge.estimatedHours = estimatedHours;
  challenge.learningOutcome = learningOutcome;
  challenge.source = { ...sourceBySpecialization[specializationKey], note: sourceNote };
}

const extraBriefs = [
  { id: 'practice-dev-product-page', title: 'Trang sản phẩm thương mại điện tử', major: 'dev', specialization: 'frontend', level: 'beginner', hours: 6,
    summary: 'Xây trang sản phẩm có ảnh, biến thể và trạng thái giỏ hàng trên màn hình nhỏ.',
    scenario: 'Một cửa hàng muốn khách xem chi tiết sản phẩm và chọn biến thể trước khi thêm vào giỏ trên điện thoại.',
    outcome: 'Trang sản phẩm responsive có trạng thái hết hàng, chọn biến thể và minh chứng thao tác bằng bàn phím.',
    requirements: ['Link demo và mã nguồn có hướng dẫn chạy', 'Chọn biến thể cập nhật giá hoặc tình trạng hàng', 'Ảnh và nút thao tác dùng được ở 375px, có trạng thái focus'],
    question: 'Khách có chọn đúng biến thể và biết rõ kết quả thao tác trong mọi trạng thái không?',
    rubric: [['interaction', 'Thao tác chọn biến thể', 35], ['responsive', 'Giao diện di động', 25], ['accessibility', 'Bàn phím và nhãn', 25], ['handoff', 'Demo và hướng dẫn chạy', 15]] },
  { id: 'practice-dev-auth-api', title: 'API đăng nhập và phân quyền', major: 'dev', specialization: 'backend', level: 'intermediate', hours: 12,
    summary: 'Thiết kế API tài khoản có phiên đăng nhập, quyền truy cập và thông báo lỗi an toàn.',
    scenario: 'Một ứng dụng nhóm cần người dùng đăng nhập và chỉ sửa dữ liệu thuộc về mình.',
    outcome: 'API đăng nhập và tài nguyên có phân quyền, kiểm thử các trường hợp sai mật khẩu và truy cập trái quyền.',
    requirements: ['Repository và hướng dẫn tạo dữ liệu mẫu không chứa bí mật', 'Endpoint đăng nhập/đăng xuất và một tài nguyên có kiểm tra quyền', 'Bảng ca kiểm thử cho sai mật khẩu, hết phiên và truy cập trái quyền'],
    question: 'Người dùng có thể sửa dữ liệu của người khác hoặc xem dữ liệu sau khi hết phiên không?',
    rubric: [['authorization', 'Kiểm tra quyền truy cập', 35], ['session', 'Xử lý phiên và lỗi', 30], ['tests', 'Kiểm thử trường hợp biên', 25], ['docs', 'Tài liệu API', 10]] },
  { id: 'practice-dev-explore-data', title: 'Khám phá bộ dữ liệu công khai', major: 'dev', specialization: 'data', level: 'beginner', hours: 7,
    summary: 'Đặt một câu hỏi có thể trả lời bằng dữ liệu và phân tích trên notebook.',
    scenario: 'Nhóm dự án nhận một bộ dữ liệu công khai nhưng chưa biết dữ liệu thiếu hay lệch ở đâu.',
    outcome: 'Notebook ghi nguồn dữ liệu, kiểm tra chất lượng, hai biểu đồ và một kết luận có giới hạn.',
    requirements: ['Dẫn nguồn và giấy phép bộ dữ liệu công khai', 'Mô tả cột, dữ liệu thiếu và cách xử lý', 'Hai biểu đồ có nhãn, mã chạy lại được'],
    question: 'Người khác có chạy lại notebook và hiểu dữ liệu nào hỗ trợ kết luận không?',
    rubric: [['provenance', 'Nguồn và giấy phép', 20], ['cleaning', 'Kiểm tra dữ liệu thiếu', 30], ['visualization', 'Biểu đồ có ngữ cảnh', 25], ['conclusion', 'Kết luận thận trọng', 25]] },
  { id: 'practice-dev-demand-forecast', title: 'Dự báo nhu cầu từ dữ liệu bán hàng', major: 'dev', specialization: 'data', level: 'advanced', hours: 20,
    summary: 'So sánh baseline và mô hình dự báo trên dữ liệu mẫu, tránh rò rỉ dữ liệu tương lai.',
    scenario: 'Một cửa hàng cần ước lượng nhu cầu tuần tới để lên kế hoạch tồn kho.',
    outcome: 'Báo cáo dự báo có baseline, tách tập theo thời gian, sai số và khuyến nghị sử dụng thực tế.',
    requirements: ['Dữ liệu mẫu/ẩn danh và mã tái lập kết quả', 'So sánh baseline với ít nhất một phương pháp dự báo', 'Nêu sai số, rủi ro rò rỉ dữ liệu và trường hợp không nên dùng'],
    question: 'Phép đánh giá có phản ánh dữ liệu tương lai chưa biết và cho thấy mô hình có tốt hơn baseline không?',
    rubric: [['split', 'Tách tập theo thời gian', 30], ['baseline', 'So sánh baseline', 25], ['evaluation', 'Sai số và phân tích lỗi', 30], ['handoff', 'Khuyến nghị sử dụng', 15]] },
  { id: 'practice-dev-session-audit', title: 'Kiểm tra phiên và cấu hình web', major: 'dev', specialization: 'security', level: 'intermediate', hours: 10,
    summary: 'Rà soát một ứng dụng mẫu được phép kiểm thử: cookie, logout và security headers.',
    scenario: 'Đội phát triển muốn chắc chắn phiên hết hiệu lực khi đăng xuất và trình duyệt nhận cấu hình bảo vệ phù hợp.',
    outcome: 'Báo cáo kiểm tra phiên/cookie/header có bước tái hiện an toàn và bản sửa đề xuất.',
    requirements: ['Chỉ dùng ứng dụng mẫu hoặc hệ thống bạn được phép thử', 'Bảng kiểm cookie, logout và tối thiểu ba header liên quan', 'Bằng chứng trước/sau và cách tái kiểm tra không tiết lộ token'],
    question: 'Mỗi phát hiện có tái hiện được và đề xuất sửa có tránh tạo tác dụng phụ không?',
    rubric: [['scope', 'Phạm vi được phép', 20], ['checks', 'Kiểm tra phiên và cấu hình', 35], ['evidence', 'Bằng chứng an toàn', 25], ['mitigation', 'Đề xuất và tái kiểm tra', 20]] },
  { id: 'practice-mkt-social-calendar', title: 'Lịch nội dung mạng xã hội hai tuần', major: 'mkt', specialization: 'content', level: 'beginner', hours: 6,
    summary: 'Lập lịch bài đăng phù hợp một nhóm khách hàng và mục tiêu truyền thông cụ thể.',
    scenario: 'Thương hiệu nhỏ có ít nhân sự nhưng cần duy trì nội dung đều đặn trong hai tuần ra mắt.',
    outcome: 'Lịch 14 ngày có ý tưởng, định dạng, thông điệp, CTA và tiêu chí theo dõi từng bài.',
    requirements: ['Chọn một sản phẩm và nêu nhóm khách hàng mục tiêu', 'Lịch 14 ngày ghi kênh, nội dung, CTA và người thực hiện', 'Nêu cách đo tương tác và giả định chưa kiểm chứng'],
    question: 'Lịch có khả thi với nguồn lực đã nêu và mỗi bài có mục tiêu đo được không?',
    rubric: [['audience', 'Phù hợp khách hàng', 25], ['plan', 'Lịch khả thi', 30], ['creative', 'Thông điệp và CTA', 25], ['measurement', 'Đo kết quả', 20]] },
  { id: 'practice-mkt-positioning', title: 'Bản đồ định vị ba đối thủ', major: 'mkt', specialization: 'market-research', level: 'beginner', hours: 7,
    summary: 'So sánh sản phẩm với ba đối thủ bằng tiêu chí có nguồn và nêu khoảng trống thị trường.',
    scenario: 'Một sản phẩm mới cần quyết định nên nhấn mạnh lợi ích nào trước khi viết thông điệp quảng bá.',
    outcome: 'Ma trận so sánh ba đối thủ, bản đồ định vị và giả thuyết thông điệp cần kiểm chứng.',
    requirements: ['Ghi rõ sản phẩm, phân khúc và ba đối thủ', 'Mỗi tiêu chí so sánh có nguồn công khai và ngày thu thập', 'Tách quan sát khỏi giả định trong đề xuất định vị'],
    question: 'Lợi thế đề xuất có thực sự được chứng minh bằng nguồn và phù hợp phân khúc chọn không?',
    rubric: [['sampling', 'Chọn đối thủ phù hợp', 25], ['evidence', 'Nguồn so sánh', 30], ['positioning', 'Lập luận định vị', 30], ['limits', 'Giới hạn kết luận', 15]] },
  { id: 'practice-mkt-ad-brief', title: 'Thử nghiệm quảng cáo ngân sách nhỏ', major: 'mkt', specialization: 'performance', level: 'intermediate', hours: 10,
    summary: 'Lập hai phương án quảng cáo, phân bổ ngân sách giả định và tiêu chí dừng thử nghiệm.',
    scenario: 'Một cửa hàng cần biết thông điệp nào đáng đầu tư trước khi tăng ngân sách quảng cáo.',
    outcome: 'Ad brief hai biến thể có đối tượng, ngân sách, KPI, cách đo và quy tắc dừng.',
    requirements: ['Nêu sản phẩm, mục tiêu và số tiền mô phỏng', 'Hai biến thể chỉ khác một yếu tố cần kiểm chứng', 'Công thức KPI, điều kiện dừng và rủi ro sai lệch mẫu'],
    question: 'Thiết kế thử nghiệm có cho phép so sánh hai biến thể mà không nhầm tác động từ nhiều thay đổi không?',
    rubric: [['hypothesis', 'Giả thuyết rõ', 25], ['creative', 'Biến thể quảng cáo', 25], ['budget', 'Ngân sách và đối tượng', 20], ['measurement', 'Đo lường và điều kiện dừng', 30]] },
  { id: 'practice-mkt-email-onboarding', title: 'Chuỗi email chào mừng khách hàng', major: 'mkt', specialization: 'content', level: 'intermediate', hours: 9,
    summary: 'Viết chuỗi ba email theo hành trình người dùng và tôn trọng quyền từ chối nhận thư.',
    scenario: 'Người dùng mới đăng ký nhưng chưa hoàn tất hành động đầu tiên trong sản phẩm.',
    outcome: 'Ba email có mục tiêu riêng, CTA, điều kiện gửi và cách đo hiệu quả không phóng đại.',
    requirements: ['Sơ đồ thời điểm gửi và mục tiêu từng email', 'Bản nháp tiêu đề, nội dung, CTA cho ba email', 'Cách đo và cơ chế hủy đăng ký rõ ràng'],
    question: 'Chuỗi email có dẫn người dùng tới hành động hữu ích mà không gửi quá dày hoặc gây hiểu lầm không?',
    rubric: [['journey', 'Hành trình và thời điểm', 30], ['copy', 'Nội dung và CTA', 30], ['measurement', 'Đo kết quả', 20], ['consent', 'Quyền từ chối nhận thư', 20]] },
  { id: 'practice-mkt-retention', title: 'Phân tích giữ chân theo cohort', major: 'mkt', specialization: 'marketing-analytics', level: 'advanced', hours: 18,
    summary: 'Đọc dữ liệu mẫu theo nhóm đăng ký và xác định điểm người dùng rời bỏ.',
    scenario: 'Số lượt đăng ký tăng nhưng nhóm sản phẩm chưa biết người dùng có quay lại sau tuần đầu hay không.',
    outcome: 'Bảng cohort có định nghĩa quay lại, biểu đồ giữ chân và đề xuất thử nghiệm ưu tiên.',
    requirements: ['Dùng dữ liệu mẫu/ẩn danh và ghi định nghĩa cohort', 'Tính tỷ lệ theo tuần, xử lý nhóm chưa đủ thời gian quan sát', 'Nêu ít nhất hai giả thuyết và giới hạn suy luận'],
    question: 'Báo cáo có tránh so sánh sai nhóm chưa đủ thời gian quan sát và đưa ra thử nghiệm khả thi không?',
    rubric: [['definition', 'Định nghĩa cohort', 25], ['calculation', 'Tính toán và xử lý dữ liệu', 30], ['interpretation', 'Đọc xu hướng thận trọng', 25], ['action', 'Thử nghiệm tiếp theo', 20]] },
  { id: 'practice-design-interview', title: 'Kịch bản phỏng vấn người dùng', major: 'design', specialization: 'ux-research', level: 'beginner', hours: 5,
    summary: 'Soạn kịch bản 20 phút để tìm hiểu khó khăn thật khi hoàn thành một tác vụ.',
    scenario: 'Nhóm thiết kế chưa hiểu vì sao người dùng bỏ dở bước thanh toán trên điện thoại.',
    outcome: 'Kịch bản phỏng vấn có lời xin đồng ý, câu hỏi mở và bảng ghi chép không chứa định danh.',
    requirements: ['Nêu mục tiêu nghiên cứu và tiêu chí chọn người tham gia', 'Ít nhất tám câu hỏi mở, không gợi ý đáp án', 'Lời giới thiệu, xin đồng ý và cách lưu ghi chép ẩn danh'],
    question: 'Câu hỏi có giúp khám phá hành vi thực tế mà không dẫn người tham gia tới kết luận có sẵn không?',
    rubric: [['objective', 'Mục tiêu nghiên cứu', 25], ['questions', 'Câu hỏi trung lập', 35], ['flow', 'Nhịp phỏng vấn', 20], ['ethics', 'Đồng ý và riêng tư', 20]] },
  { id: 'practice-design-checkout', title: 'Giao diện thanh toán trên di động', major: 'design', specialization: 'ui', level: 'intermediate', hours: 11,
    summary: 'Thiết kế luồng kiểm tra đơn, nhập địa chỉ và xác nhận có trạng thái lỗi rõ.',
    scenario: 'Khách hàng thường bỏ dở vì không hiểu phí cuối cùng và lỗi địa chỉ xuất hiện quá muộn.',
    outcome: 'Prototype checkout di động có giá cuối, lỗi nhập liệu và trang xác nhận minh bạch.',
    requirements: ['Link prototype có thể bấm qua ít nhất bốn trạng thái', 'Hiển thị tổng tiền/phí trước khi xác nhận', 'Thiết kế trạng thái lỗi địa chỉ và cách sửa không mất dữ liệu'],
    question: 'Người dùng có biết chính xác sẽ trả bao nhiêu và sửa lỗi ở đâu trước khi đặt hàng không?',
    rubric: [['flow', 'Luồng thanh toán', 30], ['clarity', 'Minh bạch tổng tiền', 25], ['error', 'Xử lý lỗi', 30], ['handoff', 'Prototype và chú thích', 15]] },
  { id: 'practice-design-accessible-form', title: 'Biểu mẫu đăng ký dễ tiếp cận', major: 'design', specialization: 'accessibility', level: 'intermediate', hours: 9,
    summary: 'Thiết kế lại biểu mẫu để dùng được với bàn phím, màn hình nhỏ và thông báo lỗi rõ.',
    scenario: 'Người dùng không thể hoàn thành biểu mẫu khi dùng bàn phím hoặc phóng to màn hình.',
    outcome: 'Prototype biểu mẫu có nhãn, focus, lỗi gắn đúng trường và bảng kiểm tiếp cận.',
    requirements: ['Link prototype có trạng thái bình thường, focus và lỗi', 'Luồng bàn phím và thứ tự đọc được mô tả', 'Bảng kiểm tương phản, nhãn, thông báo lỗi và màn hình 320px'],
    question: 'Người dùng có nhận ra trường lỗi và hoàn thành biểu mẫu mà không cần chuột không?',
    rubric: [['labels', 'Nhãn và hướng dẫn', 25], ['keyboard', 'Thứ tự bàn phím và focus', 30], ['errors', 'Thông báo lỗi hữu ích', 30], ['evidence', 'Bảng kiểm và minh chứng', 15]] },
  { id: 'practice-design-tokens', title: 'Token màu và khoảng cách cho sản phẩm', major: 'design', specialization: 'design-system', level: 'intermediate', hours: 10,
    summary: 'Tạo bộ token nhỏ để hai màn hình dùng nhất quán và có trạng thái giao diện rõ.',
    scenario: 'Hai nhóm đang dùng màu và khoảng cách khác nhau cho cùng một kiểu nút, gây khó bảo trì.',
    outcome: 'Bộ token có tên theo vai trò, ví dụ áp dụng trên hai màn hình và tài liệu bàn giao.',
    requirements: ['Link thư viện thiết kế và quy tắc đặt tên token', 'Áp dụng token cho ít nhất hai màn hình và ba trạng thái nút', 'Ghi kết quả kiểm tra tương phản và cách dùng khi bàn giao'],
    question: 'Người khác có áp dụng token đúng ngữ cảnh mà không phải đoán mã màu hoặc khoảng cách không?',
    rubric: [['naming', 'Tên token theo vai trò', 30], ['coverage', 'Màn hình và trạng thái', 30], ['accessibility', 'Tương phản và ngữ cảnh', 25], ['handoff', 'Hướng dẫn bàn giao', 15]] },
  { id: 'practice-design-service-blueprint', title: 'Service blueprint cho hỗ trợ sinh viên', major: 'design', specialization: 'ux-research', level: 'advanced', hours: 17,
    summary: 'Mô tả toàn bộ hành trình gửi yêu cầu hỗ trợ và các bước xử lý phía sau.',
    scenario: 'Sinh viên gửi yêu cầu nhưng không biết ai xử lý, khi nào phản hồi và cách theo dõi tiến độ.',
    outcome: 'Service blueprint có hành trình người dùng, trách nhiệm vận hành, điểm nghẽn và kế hoạch cải thiện.',
    requirements: ['Phỏng vấn hoặc mô phỏng minh bạch tối thiểu hai góc nhìn', 'Sơ đồ frontstage/backstage, điểm bàn giao và trạng thái chờ', 'Ưu tiên ba cải tiến kèm cách đo thời gian hoặc tỷ lệ hoàn thành'],
    question: 'Bản đồ có chỉ ra đúng điểm gây chậm và quy trách nhiệm xử lý rõ cho từng bước không?',
    rubric: [['research', 'Căn cứ hành trình', 25], ['blueprint', 'Frontstage và backstage', 30], ['handoffs', 'Điểm bàn giao và rủi ro', 25], ['priorities', 'Ưu tiên và đo kết quả', 20]] }
];
for (const brief of extraBriefs) {
  const challenge = make(brief.id, brief.title, brief.major, brief.level, brief.summary, brief.requirements, brief.rubric);
  Object.assign(challenge, { specializationKey: brief.specialization, estimatedHours: brief.hours, learningOutcome: brief.outcome,
    scenario: brief.scenario, reviewQuestion: brief.question, source: { ...sourceBySpecialization[brief.specialization], note: sourceNote } });
  CHALLENGES.push(challenge);
}
for (const challenge of CHALLENGES) {
  challenge.rubric.forEach((criterion, index) => {
    const [minimum, excellent] = RUBRIC_EVIDENCE[challenge.id]?.[index] || [];
    if (!minimum || !excellent) return;
    criterion.expectation = `Minh chứng cần thấy: ${minimum}.`;
    criterion.anchors = {
      basic: `0–4 · Chưa thể kiểm chứng: ${minimum}.`,
      adequate: `5–7 · Có thể kiểm chứng: ${minimum}.`,
      strong: `8–10 · Đạt mức trên; thêm ${excellent}.`
    };
  });
}

RESOURCES.push(
  { id: 'source-meta-backend', title: 'Meta Back-End Developer', majorKey: 'dev', source: 'Coursera', url: 'https://www.coursera.org/professional-certificates/meta-back-end-developer', note: 'Trang chương trình chính thức; lộ trình, giá và quyền truy cập theo nhà cung cấp.' },
  { id: 'source-google-it', title: 'Google IT Support', majorKey: 'dev', source: 'Coursera', url: 'https://www.coursera.org/professional-certificates/google-it-support', note: 'Trang chương trình chính thức; lộ trình, giá và quyền truy cập theo nhà cung cấp.' },
  { id: 'source-google-ai', title: 'Google AI', majorKey: 'dev', source: 'Coursera', url: 'https://www.coursera.org/professional-certificates/google-ai', note: 'Trang chương trình chính thức; nội dung và điều kiện truy cập có thể thay đổi.' },
  { id: 'source-ibm-data', title: 'IBM Data Science', majorKey: 'dev', source: 'Coursera', url: 'https://www.coursera.org/professional-certificates/ibm-data-science', note: 'Trang chương trình chính thức; lộ trình, giá và quyền truy cập theo nhà cung cấp.' },
  { id: 'source-google-pm', title: 'Google Project Management', majorKey: 'all', source: 'Coursera', url: 'https://www.coursera.org/professional-certificates/google-project-management', note: 'Trang chương trình chính thức; lộ trình, giá và quyền truy cập theo nhà cung cấp.' },
  { id: 'source-google-cyber', title: 'Google Cybersecurity', majorKey: 'dev', source: 'Coursera', url: 'https://www.coursera.org/professional-certificates/google-cybersecurity', note: 'Trang chương trình chính thức; lộ trình, giá và quyền truy cập theo nhà cung cấp.' },
  { id: 'source-meta-social', title: 'Meta Social Media Marketing', majorKey: 'mkt', source: 'Coursera', url: 'https://www.coursera.org/professional-certificates/facebook-social-media-marketing', note: 'Trang chương trình chính thức; lộ trình, giá và quyền truy cập theo nhà cung cấp.' },
  { id: 'source-ixd-capstone', title: 'Interaction Design Capstone', majorKey: 'design', source: 'Coursera', url: 'https://www.coursera.org/learn/interaction-design-capstone', note: 'Khóa học chính thức; nội dung và quyền truy cập do Coursera quy định.' },
  { id: 'source-xbox-ux', title: 'Interaction Design and UX/UI Principles', majorKey: 'design', source: 'Coursera', url: 'https://www.coursera.org/learn/xbox-interaction-design-and-ux-ui-principles', note: 'Khóa học chính thức; nội dung và quyền truy cập do Coursera quy định.' },
  { id: 'source-ui-design', title: 'Introduction to UI Design', majorKey: 'design', source: 'Coursera', url: 'https://www.coursera.org/learn/ui-design', note: 'Khóa học chính thức; nội dung và quyền truy cập do Coursera quy định.' },
  { id: 'source-user-research', title: 'User Experience: Research & Prototyping', majorKey: 'design', source: 'Coursera', url: 'https://www.coursera.org/learn/user-research', note: 'Khóa học chính thức; nội dung và quyền truy cập do Coursera quy định.' },
  { id: 'source-fpt-guide', title: 'Hướng dẫn sử dụng cổng đào tạo FAP', majorKey: 'all', source: 'FPT University', url: 'https://daihoc.fpt.edu.vn/tin-tuc-chung-2/huong-dan-su-dung-cong-thong-tin-dao-tao-fap-cho-tan-sinh-vien-dai-hoc-fpt/', note: 'Hướng dẫn công khai của FPT University về cổng FAP.' },
  { id: 'source-fpt-handbook', title: 'Sổ tay sinh viên FPT University (K18 Hà Nội, 2022)', majorKey: 'all', source: 'FPT University', url: 'https://daihoc.fpt.edu.vn/wp-content/uploads/2022/10/sotaysinhvienK18HN.pdf', note: 'Tài liệu công khai theo khóa/cơ sở và năm phát hành; hãy kiểm tra quy định mới nhất tại trường.' }
);

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
