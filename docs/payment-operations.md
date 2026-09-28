# Vận hành thanh toán Premium và thù lao Mentor

## Cấu hình

Sao chép `.env.example` thành `.env` **trên máy chủ API** và cấu hình MongoDB, `SESSION_SECRET`, `CLIENT_ORIGIN`. Tài khoản nhận gói mặc định là TPBank / 33313052004 / NGUYEN SY HUY. Khi thay đổi chủ tài khoản, cập nhật đồng bộ `PAYMENT_BANK` (mã BIN), `PAYMENT_BANK_NAME`, `PAYMENT_ACCOUNT`, `PAYMENT_ACCOUNT_NAME`; đơn đã tạo giữ nguyên bản chụp tài khoản cũ để đối soát. Trước khi nhận tiền thật, chủ tài khoản cần tự quét thử QR với một đơn thử và kiểm tra tên người nhận trong ứng dụng ngân hàng.

`PAYMENT_PROVIDER=manual` dùng VietQR và admin đối soát sao kê. Nếu sử dụng PayOS, đặt `PAYMENT_PROVIDER=payos` cùng bộ khóa PayOS và URL callback trên máy chủ. Không đưa khóa PayOS, `SESSION_SECRET`, `RESEND_API_KEY` hoặc MongoDB URI vào biến `VITE_*` hay GitHub Pages. Để giữ OTP khi **đăng ký/xác thực email**, đặt `EMAIL_VERIFICATION_REQUIRED=1` và cấu hình `RESEND_API_KEY`, `EMAIL_FROM`; bước **thanh toán** không yêu cầu OTP riêng.

### Bật xác nhận tự động qua payOS

1. Chủ tài khoản đăng ký tại [my.payos.vn](https://my.payos.vn/), hoàn tất xác thực chủ thể và liên kết tài khoản ngân hàng nhận tiền theo [hướng dẫn payOS](https://payos.vn/docs/huong-dan-su-dung/tao-kenh-thanh-toan/). Kiểm tra trong dashboard xem tài khoản TPBank dự kiến có được hỗ trợ cho **kênh thu** hay không; không tự đổi sang tài khoản nhận khác. Việc định danh và chấp thuận điều khoản do chủ tài khoản tự thực hiện.
2. Tạo kênh thanh toán Premium và lấy **Client ID, API Key, Checksum Key**. Chủ tài khoản tự nhập ba giá trị vào Render > `exe301-portfolio-api` > Environment dưới tên `PAYOS_CLIENT_ID`, `PAYOS_API_KEY`, `PAYOS_CHECKSUM_KEY`; không gửi khóa qua chat hoặc đưa vào frontend. Đặt `PAYOS_RETURN_URL=https://portfolio.id.vn/?payment=payos` và `PAYOS_CANCEL_URL=https://portfolio.id.vn/?payment=payos-cancel`.
3. Trong kênh payOS, khai báo webhook `https://api.portfolio.id.vn/api/workflow/payments/payos-webhook`. payOS gửi giao dịch mẫu để kiểm tra endpoint. Chỉ sau khi kênh thu, webhook và khóa hoạt động mới đặt `PAYMENT_PROVIDER=payos` trên Render, lưu và deploy. Nếu cấu hình chưa đủ, API từ chối tạo đơn thay vì cấp quyền sai.
4. Sinh viên tạo đơn và mở link payOS. Khi payOS gửi webhook có chữ ký hợp lệ, đúng mã đơn, mã link, nội dung và số tiền, API tự kích hoạt/gia hạn Premium **một lần**; admin không duyệt đơn payOS. Giao diện tự kiểm tra trạng thái mỗi 6 giây khi màn thanh toán còn mở và khôi phục trạng thái khi payOS chuyển về website. Tham số trên URL trả về không tự cấp quyền.
5. Trước khi mở bán, chủ tài khoản thực hiện một giao dịch thử giá trị nhỏ bằng tài khoản thanh toán khác, kiểm tra đơn chuyển sang `completed`, hạn gói tăng đúng một lần và tiền đến đúng tài khoản nhận. Không dùng QR VietQR thủ công để thử webhook payOS. Đơn VietQR thủ công đã tạo trước đó phải được hoàn tất hoặc hủy khi chưa chuyển tiền trước khi sinh viên tạo đơn payOS mới.

GitHub Pages chỉ triển khai giao diện. Cần triển khai API Node và MongoDB riêng, cấu hình `VITE_API_URL` trong GitHub Actions trỏ tới URL HTTPS của API, đồng thời đặt `CLIENT_ORIGIN` trên API thành địa chỉ website. Nếu thiếu API, các nút tạo đơn và trả lương sẽ không thể ghi dữ liệu.

## Đối soát Premium

1. Sinh viên chọn gói và tạo đơn. API lấy giá từ bảng gói, tạo nội dung chuyển khoản `PFH...` duy nhất và trả về VietQR có số tiền, tài khoản, nội dung tương ứng. Không dùng giá hay nội dung do trình duyệt tự gửi.
2. Sinh viên chuyển khoản rồi chọn **Tôi đã chuyển khoản**. Đơn vẫn ở trạng thái `pending`; hành động này chỉ ghi thời điểm thông báo và lịch sử, không cấp Premium.
3. Admin vào **Đối soát & chi trả**, đối chiếu số tiền, tài khoản nhận, nội dung và mã giao dịch trên sao kê thực tế. Sau khi đánh dấu đã kiểm tra và nhập mã tham chiếu, admin xác nhận; lúc đó hệ thống mới gia hạn. Nếu tiền chưa đến, không xác nhận. Đơn chưa chuyển tiền có thể hủy.
4. Nếu bật PayOS, chỉ webhook được xác thực chữ ký và số tiền chính xác mới tự kích hoạt gói. Đường dẫn QR thủ công không cung cấp bằng chứng tiền đã vào.

## Chi trả Mentor

Mentor gửi hồ sơ; chỉ khi admin duyệt trạng thái `approved` mentor mới được nhận và hoàn thành review có thù lao. Mentor cập nhật tài khoản ngân hàng ở tab **Thu nhập**. Mỗi bài hoàn thành tạo phí cơ bản 5.000 đ; đánh giá 4★/5★ có thể cộng thưởng. Khoản chỉ đủ điều kiện chi sau đánh giá hoặc sau 7 ngày để sinh viên có thời gian đánh giá.

Admin xem tổng số bài, tiền chờ chi/đã chi theo mentor, rồi chuyển khoản ngoài hệ thống. Sau khi kiểm tra giao dịch ngân hàng, admin nhập mã giao dịch, ghi chú và đánh dấu xác nhận cho từng khoản. Hệ thống lưu vào MongoDB trong `ReviewSubmission.reward.payoutLog`: số tiền, phí cơ bản, thưởng, tài khoản đích tại thời điểm chi, mã giao dịch, ghi chú, admin và thời gian xác nhận. Một khoản không thể đánh dấu chi hai lần; mentor đổi tài khoản sau đó không làm thay đổi chứng từ cũ. Nút xác nhận chỉ **ghi nhận** việc chuyển khoản thực tế, không tự tạo lệnh chuyển tiền.
