# Vận hành thanh toán Premium và thù lao Mentor

## Cấu hình

Sao chép `.env.example` thành `.env` **trên máy chủ API** và cấu hình MongoDB, `SESSION_SECRET`, `CLIENT_ORIGIN`. Tài khoản nhận gói mặc định là TPBank / 33313052004 / NGUYEN SY HUY. Khi thay đổi chủ tài khoản, cập nhật đồng bộ `PAYMENT_BANK` (mã BIN), `PAYMENT_BANK_NAME`, `PAYMENT_ACCOUNT`, `PAYMENT_ACCOUNT_NAME`; đơn đã tạo giữ nguyên bản chụp tài khoản cũ để đối soát. Trước khi nhận tiền thật, chủ tài khoản cần tự quét thử QR với một đơn thử và kiểm tra tên người nhận trong ứng dụng ngân hàng.

`PAYMENT_PROVIDER=manual` dùng VietQR và admin đối soát sao kê. Nếu sử dụng PayOS, đặt `PAYMENT_PROVIDER=payos` cùng bộ khóa PayOS và URL callback trên máy chủ. Không đưa khóa PayOS, `SESSION_SECRET`, `RESEND_API_KEY` hoặc MongoDB URI vào biến `VITE_*` hay GitHub Pages. Để giữ OTP khi **đăng ký/xác thực email**, đặt `EMAIL_VERIFICATION_REQUIRED=1` và cấu hình `RESEND_API_KEY`, `EMAIL_FROM`; bước **thanh toán** không yêu cầu OTP riêng.

GitHub Pages chỉ triển khai giao diện. Cần triển khai API Node và MongoDB riêng, cấu hình `VITE_API_URL` trong GitHub Actions trỏ tới URL HTTPS của API, đồng thời đặt `CLIENT_ORIGIN` trên API thành địa chỉ website. Nếu thiếu API, các nút tạo đơn và trả lương sẽ không thể ghi dữ liệu.

## Đối soát Premium

1. Sinh viên chọn gói và tạo đơn. API lấy giá từ bảng gói, tạo nội dung chuyển khoản `PFH...` duy nhất và trả về VietQR có số tiền, tài khoản, nội dung tương ứng. Không dùng giá hay nội dung do trình duyệt tự gửi.
2. Sinh viên chuyển khoản rồi chọn **Tôi đã chuyển khoản**. Đơn vẫn ở trạng thái `pending`; hành động này chỉ ghi thời điểm thông báo và lịch sử, không cấp Premium.
3. Admin vào **Đối soát & chi trả**, đối chiếu số tiền, tài khoản nhận, nội dung và mã giao dịch trên sao kê thực tế. Sau khi đánh dấu đã kiểm tra và nhập mã tham chiếu, admin xác nhận; lúc đó hệ thống mới gia hạn. Nếu tiền chưa đến, không xác nhận. Đơn chưa chuyển tiền có thể hủy.
4. Nếu bật PayOS, chỉ webhook được xác thực chữ ký và số tiền chính xác mới tự kích hoạt gói. Đường dẫn QR thủ công không cung cấp bằng chứng tiền đã vào.

## Chi trả Mentor

Mentor gửi hồ sơ; chỉ khi admin duyệt trạng thái `approved` mentor mới được nhận và hoàn thành review có thù lao. Mentor cập nhật tài khoản ngân hàng ở tab **Thu nhập**. Mỗi bài hoàn thành tạo phí cơ bản 5.000 đ; đánh giá 4★/5★ có thể cộng thưởng. Khoản chỉ đủ điều kiện chi sau đánh giá hoặc sau 7 ngày để sinh viên có thời gian đánh giá.

Admin xem tổng số bài, tiền chờ chi/đã chi theo mentor, rồi chuyển khoản ngoài hệ thống. Sau khi kiểm tra giao dịch ngân hàng, admin nhập mã giao dịch, ghi chú và đánh dấu xác nhận cho từng khoản. Hệ thống lưu vào MongoDB trong `ReviewSubmission.reward.payoutLog`: số tiền, phí cơ bản, thưởng, tài khoản đích tại thời điểm chi, mã giao dịch, ghi chú, admin và thời gian xác nhận. Một khoản không thể đánh dấu chi hai lần; mentor đổi tài khoản sau đó không làm thay đổi chứng từ cũ. Nút xác nhận chỉ **ghi nhận** việc chuyển khoản thực tế, không tự tạo lệnh chuyển tiền.
