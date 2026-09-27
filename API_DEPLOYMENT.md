# Kết nối API cho website Portfolio FPT Hub

Website đang chạy trên GitHub Pages, nơi chỉ phục vụ file tĩnh. Đăng nhập, đăng ký và các nghiệp vụ cần API Express cùng MongoDB. Repo đã có `render.yaml` để triển khai API lên Render và cấu hình cookie phiên đăng nhập giữa hai domain.

## Triển khai lần đầu

1. Tạo MongoDB Atlas cluster và database user. Cho phép Render kết nối mạng đến cluster, sau đó lấy connection string dạng `mongodb+srv://...`.
2. Trong Render, tạo Blueprint mới từ repo `thietbvhe186481/EXE301`. Render đọc `render.yaml` và yêu cầu nhập `MONGODB_URI`; `SESSION_SECRET` được Render tự tạo.
3. Chờ service `exe301-portfolio-api` chạy xong. Kiểm tra `https://<service>.onrender.com/api/health`, cần nhận JSON có `"ok":true`.
4. Trong GitHub repo, vào **Settings → Secrets and variables → Actions → Variables** và tạo repository variable `VITE_API_URL` với origin API, ví dụ `https://exe301-portfolio-api.onrender.com` (không thêm `/api`).
5. Chạy lại workflow **Deploy Portfolio to GitHub Pages** trong tab **Actions**. Workflow build nhúng URL này vào frontend. Sau khi deploy xong, tải lại website.

`CLIENT_ORIGIN`, cookie `SameSite=None; Secure` và proxy trust đã được khai báo trong Blueprint cho GitHub Pages. Nếu đổi domain website, hãy cập nhật `CLIENT_ORIGIN` trên Render về origin mới (chỉ scheme + host, không có đường dẫn).

## Email OTP khi đăng ký và thanh toán Premium

Production yêu cầu sinh viên/mentor xác thực email trước khi đăng nhập. Khi mua hoặc gia hạn Premium, sinh viên nhập thêm mã 6 số gửi tới email của chính tài khoản đó trước khi hệ thống tạo đơn. Mỗi mã chỉ áp dụng cho gói đã chọn, có hạn 10 phút, chỉ lưu dạng băm, giới hạn 5 lần nhập và gửi lại sau ít nhất 60 giây. Admin seed hiện tại vẫn đăng nhập bình thường.

1. Tạo tài khoản Resend, xác minh domain gửi email và tạo API key.
2. Trên Render, đặt `RESEND_API_KEY` và `EMAIL_FROM` (địa chỉ gửi thuộc domain đã xác minh). `EMAIL_VERIFICATION_REQUIRED=1` được bật trong Blueprint.
3. Thử tạo tài khoản sinh viên/mentor trên production: màn hình sẽ yêu cầu mã email trước khi tạo session. Không có khóa gửi mail, API từ chối đăng ký rõ ràng, không tạo tài khoản chưa thể xác minh.

Resend dùng HTTPS API để gửi email; xem [tài liệu gửi email](https://resend.com/docs/api-reference/emails/send-email). Có thể thay adapter bằng SMTP nếu nhà vận hành muốn dùng nhà cung cấp khác.

## Thanh toán và gia hạn Premium bằng PayOS

Website tiếp tục gia hạn cộng dồn từ ngày hết hạn hiện tại. Với PayOS, đơn chỉ chuyển sang đã thanh toán khi webhook có chữ ký hợp lệ, đúng mã đơn và đúng số tiền; callback lặp được xử lý idempotent. Return URL trên trình duyệt chỉ để quay lại website, không phải bằng chứng thanh toán.

1. Tạo tài khoản PayOS, xác minh cá nhân/tổ chức, liên kết ngân hàng và tạo kênh thanh toán.
2. Trên Render, nhập `PAYOS_CLIENT_ID`, `PAYOS_API_KEY`, `PAYOS_CHECKSUM_KEY` từ kênh thanh toán.
3. Đặt `PAYOS_RETURN_URL` và `PAYOS_CANCEL_URL`, ví dụ `https://thietbvhe186481.github.io/EXE301/?payment=return` và `https://thietbvhe186481.github.io/EXE301/?payment=cancel`.
4. Trong kênh PayOS, đăng ký webhook `https://<service>.onrender.com/api/workflow/payments/payos-webhook`. PayOS sẽ gửi callback sau giao dịch; API kiểm tra HMAC-SHA256, mã đơn và số tiền rồi tự kích hoạt/cộng dồn gói.
5. Trong GitHub repo, thêm Actions variable `VITE_PAYMENT_PROVIDER=payos`, rồi chạy lại workflow deploy. Khóa PayOS chỉ nằm trên API, tuyệt đối không tạo biến `VITE_PAYOS_*`.

Hướng dẫn tạo link và xác thực webhook nằm trong [tài liệu API PayOS](https://payos.vn/docs/api/) và [hướng dẫn chữ ký](https://payos.vn/docs/tich-hop-webhook/kiem-tra-du-lieu-voi-signature/). PayOS yêu cầu tài khoản/kênh thanh toán đã xác thực và cấp ba khóa tích hợp. Nếu chưa cấu hình PayOS, production chỉ cho tạo đơn chuyển khoản thủ công khi `PAYMENT_BANK`, `PAYMENT_ACCOUNT`, `PAYMENT_ACCOUNT_NAME` đã được đặt trên API; admin vẫn phải đối soát tiền thực nhận.

## AI phản hồi bài tập

Để mở gợi ý, đặt `OPENAI_API_KEY` và `OPENAI_REVIEW_MODEL` trên Render. Sinh viên phải đồng ý trước mỗi lần gửi phần ghi chú/kỹ năng. API không truy cập các link hoặc chạy mã; kết quả phân tích theo rubric và nêu rõ phần nào có bằng chứng trong mô tả, phần nào còn thiếu dữ liệu. Không dùng nhận xét này thay cho mentor hoặc quyết định tuyển dụng.

## Dữ liệu tài khoản

Sinh viên và mentor có thể đăng ký trực tiếp sau khi API được kết nối. Một database Atlas mới chưa có tài khoản admin hoặc dữ liệu mẫu. Có thể nạp dữ liệu demo bằng `npm run seed` **chỉ trên database mới, rỗng**. Script seed hiện xóa collection trước khi nạp lại; không chạy trên database có dữ liệu cần giữ. Tài khoản mẫu sau seed: `student@portfolio.vn / 123456`, `mentor@portfolio.vn / mentor123`, `admin@portfolio.vn / admin123`.

Gói Render Free có thể đưa API vào trạng thái ngủ khi không có lượt truy cập; lượt đầu sau khi ngủ có thể chậm. Dữ liệu được lưu trong MongoDB Atlas.
