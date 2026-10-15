const skillsBySpecialization = {
  frontend: ['HTML ngữ nghĩa', 'CSS responsive', 'JavaScript', 'React', 'Quản lý trạng thái', 'Khả năng tiếp cận', 'Kiểm thử giao diện', 'Git và README'],
  backend: ['Thiết kế API', 'Cơ sở dữ liệu', 'Xác thực và phân quyền', 'Kiểm tra dữ liệu đầu vào', 'Xử lý lỗi', 'Kiểm thử API', 'Tài liệu API', 'Git và README'],
  data: ['Làm sạch dữ liệu', 'SQL', 'Python', 'Phân tích dữ liệu', 'Trực quan hóa dữ liệu', 'Diễn giải kết quả', 'Kiểm tra chất lượng dữ liệu', 'Tái lập phân tích'],
  security: ['Mô hình hóa rủi ro', 'Kiểm tra cấu hình', 'Kiểm soát truy cập', 'Rà soát mã nguồn', 'Phân tích lỗ hổng', 'Đánh giá tác động', 'Báo cáo bảo mật', 'Kiểm thử lại'],
  'market-research': ['Phân khúc khách hàng', 'Nghiên cứu đối thủ', 'Thu thập nguồn', 'Phân tích thị trường', 'Xây dựng persona', 'Tổng hợp insight', 'Kiểm chứng giả định'],
  content: ['Lập kế hoạch nội dung', 'Viết nội dung', 'Thông điệp thương hiệu', 'Thiết kế nội dung', 'Quản lý mạng xã hội', 'Phân tích đối tượng', 'Đo lường nội dung'],
  performance: ['Nghiên cứu từ khóa', 'SEO on-page', 'Lập kế hoạch quảng cáo', 'Phân bổ ngân sách', 'Thiết lập KPI', 'Phân tích chiến dịch', 'Tối ưu chuyển đổi'],
  'marketing-analytics': ['Phân tích phễu', 'Định nghĩa chỉ số', 'Làm sạch dữ liệu', 'Trực quan hóa dữ liệu', 'Thiết kế A/B test', 'Diễn giải kết quả', 'Đề xuất tối ưu'],
  'ux-research': ['Phỏng vấn người dùng', 'Thiết kế khảo sát', 'Lập kế hoạch nghiên cứu', 'Phân tích hành vi', 'Tổng hợp insight', 'User flow', 'Kiểm thử khả dụng'],
  ui: ['Figma', 'Wireframe', 'Bố cục giao diện', 'Typography', 'Màu sắc và tương phản', 'Prototype', 'Thiết kế responsive', 'Bàn giao thiết kế'],
  accessibility: ['Kiểm tra tương phản', 'Điều hướng bàn phím', 'Nhãn và ngữ nghĩa', 'Thiết kế bao trùm', 'Đánh giá WCAG', 'Kiểm thử với người dùng', 'Ưu tiên vấn đề'],
  'design-system': ['Design token', 'Thiết kế component', 'Trạng thái tương tác', 'Tài liệu thiết kế', 'Tính nhất quán', 'Khả năng tiếp cận', 'Bàn giao cho lập trình viên']
};

export function skillOptionsFor(challenge, selectedSkills = []) {
  const options = skillsBySpecialization[challenge?.specializationKey]
    || Object.values(skillsBySpecialization).flat();
  return [...new Set([...selectedSkills, ...options])];
}
