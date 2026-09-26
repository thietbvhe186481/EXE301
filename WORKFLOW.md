# Luồng review Portfolio FPT Hub

## Sinh viên
Đăng ký → chọn ngành, trình độ và thử thách → đọc yêu cầu/rubric → lưu nháp hoặc nộp tối đa 3 liên kết. Bài nâng cao và mentor thật cần Premium còn hạn. Không tải file lên máy chủ.

Kiểm tra tự động là checklist thông tin khai báo, không đọc repo/CV. Nếu cấu hình AI, sinh viên có thể đồng ý gửi mô tả và kỹ năng để nhận gợi ý. Điểm chuyên môn do mentor chấm theo rubric từng bài.

Chọn mentor theo phạm vi chấm, sao và hàng đợi. Mentor quá tải vẫn được chọn sau xác nhận thời gian chậm. Bài có chat, có thể yêu cầu sửa và nộp lại cùng mentor. Bài hoàn tất được đánh giá một lần; sau đối soát khoản phí, đánh giá đóng.

## Mentor và quản trị
Mentor gửi hồ sơ qua liên kết CV hoặc yêu cầu trao đổi để admin duyệt. Mentor chọn thử thách tự tin chấm, sức chứa và bật/tắt nhận bài mới. Bài đang sửa vẫn quay lại mentor cũ dù đã ngừng nhận bài mới.

Hoàn tất một bài tạo khoản 5.000đ, không tự chuyển tiền. 4 sao thưởng 750đ, 5 sao thưởng 1.250đ. Nền tảng chi từ doanh thu Premium; sinh viên không bị thu thêm 5.000đ. Admin đối soát thực tế, ghi mã chuyển khoản sau đánh giá hoặc sau 7 ngày.

Đánh giá ≤2 sao tạo cảnh báo; ≥3 đánh giá trung bình <3,5 cũng cảnh báo. ≥5 đánh giá trung bình <2,5 loại khỏi danh sách nhận bài mới. Admin có thể đình chỉ sau xem xét.

Hồ sơ nổi bật: bài mentor chấm ≥85 điểm, sinh viên bật chia sẻ. Có thể thu hồi; không công khai email. Đây là khám phá ứng viên, chưa có hệ thống tuyển dụng/đăng tin đầy đủ.

## Tài liệu
Thử thách do nền tảng biên soạn, tham khảo liên kết khóa học chính thức Coursera. Cổng FPT chỉ dẫn tới nguồn nội bộ có quyền truy cập. Không sao chép bài tập có bản quyền hoặc tuyên bố cấp chứng chỉ của trường/khóa học.

## Chạy và triển khai
1. `npm ci`; sao chép `.env.example` thành `.env`, cấu hình MongoDB, SESSION_SECRET, CLIENT_ORIGIN.
2. `npm run server` và `npm run dev`. Dùng cơ chế quản trị hiện có để tạo tài khoản admin và gói Premium active; không công khai thông tin admin mẫu.
3. GitHub Pages chỉ xuất bản frontend. Triển khai Node backend riêng, đặt repository variable `VITE_API_URL` là HTTPS URL của backend. Cấu hình CLIENT_ORIGIN đúng origin frontend.
4. Backend khác site: `COOKIE_CROSS_SITE=1`, HTTPS, `TRUST_PROXY=1` khi sau một reverse proxy đáng tin. Trình duyệt có thể chặn cookie bên thứ ba; ưu tiên frontend/backend cùng site. Session hiện dùng memory store, mất khi khởi động lại; cần store dùng chung trước khi chạy nhiều instance.
5. Đặt repository variables `VITE_PAYMENT_BANK`, `VITE_PAYMENT_ACCOUNT`, `VITE_PAYMENT_ACCOUNT_NAME` bằng thông tin nhận tiền đã xác minh. Để trống sẽ khóa xác nhận chuyển khoản. Admin phải đối soát thật trước khi duyệt đơn; đơn pending chưa cấp Premium.
6. AI tùy chọn: OPENAI_API_KEY và OPENAI_REVIEW_MODEL chỉ đặt trên backend, không đưa vào VITE hoặc Git. Không có cấu hình thì chỉ checklist hoạt động.

## Kiểm chứng
`npm run test:auth`, `npm run test:workflow`, `npm run build`. Test HTTP dùng model giả lập, chưa thay thế kiểm thử tích hợp MongoDB hoặc kiểm thử trực quan. Cần kiểm tra backend thật, cookie HTTPS, tài khoản theo vai trò và đối soát ngân hàng trước khi nhận người dùng trả phí. Ước tính hàng đợi là ảnh chụp tại thời điểm gửi, không giữ chỗ cứng.
