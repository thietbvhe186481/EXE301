# Triển khai Portfolio FPT Hub tại portfolio.id.vn

Tên miền được quản lý tại TenTen. Địa chỉ chính của web là `https://portfolio.id.vn`; `https://www.portfolio.id.vn` chuyển hướng về địa chỉ chính. API dùng `https://api.portfolio.id.vn`. GitHub Pages chỉ chạy giao diện React; API Express cần Render (hoặc VPS) và MongoDB riêng.

## 1. Cấu hình DNS tại TenTen

Đăng nhập [id.tenten.vn](https://id.tenten.vn/) > danh sách tên miền > `portfolio.id.vn` > **Cài đặt DNS** (hoặc vào [domain.tenten.vn](https://domain.tenten.vn/) nếu TenTen đưa bạn tới đó). Thêm từng bản ghi bằng **Thêm > Lưu lại**; không dùng **Cấu hình theo IP**, vì lựa chọn đó có thể xóa các bản ghi cũ.

| Host | Loại | Giá trị |
| --- | --- | --- |
| `@` | A | `185.199.108.153` |
| `@` | A | `185.199.109.153` |
| `@` | A | `185.199.110.153` |
| `@` | A | `185.199.111.153` |
| `www` | CNAME | `thietbvhe186481.github.io` |
| `api` | CNAME | Hostname `*.onrender.com` **thực tế của service** do Render hiển thị; không đoán giá trị này |

Xóa bản ghi A/CNAME mặc định của TenTen **chỉ nếu trùng Host** với các bản ghi trên. Đừng xóa MX/TXT phục vụ email. Tránh wildcard `*`. Nếu TenTen yêu cầu tên đầy đủ thay vì `@`, điền `portfolio.id.vn`; một số giao diện tự nối hậu tố tên miền, nên kiểm tra bản ghi sau khi lưu.

## 2. Liên kết GitHub Pages

Trong [GitHub repo > Settings > Pages](https://github.com/thietbvhe186481/EXE301/settings/pages), đặt **Custom domain** là `portfolio.id.vn` rồi Save. Repo này xuất bản bằng GitHub Actions nên không cần file `CNAME`. Khi DNS và chứng chỉ đã sẵn sàng, bật **Enforce HTTPS**. GitHub sẽ chuyển `www.portfolio.id.vn` về tên miền chính nếu cả hai bản ghi được cấu hình đúng.

Trong [Settings > Secrets and variables > Actions > Variables](https://github.com/thietbvhe186481/EXE301/settings/variables/actions), đặt `VITE_BASE_PATH=/` **sau khi** tên miền đã được GitHub nhận. Chạy lại workflow **Deploy Portfolio to GitHub Pages**. Cho đến lúc đó, để trống biến này hoặc giữ `/EXE301/` để [địa chỉ GitHub Pages hiện tại](https://thietbvhe186481.github.io/EXE301/) không bị hỏng. Không đặt khóa bí mật vào biến `VITE_*`.

## 3. Triển khai API và dữ liệu

Tạo MongoDB Atlas và Render Web Service/Blueprint từ `render.yaml`. Trên Render cần nhập `MONGODB_URI`, `RESEND_API_KEY`, `EMAIL_FROM`; `SESSION_SECRET` và `OTP_SECRET` được Blueprint sinh ra. `CLIENT_ORIGIN` trong repo đã cho phép cả tên miền mới và địa chỉ GitHub Pages để chuyển tiếp. Kiểm tra `https://<hostname-thực-tế>.onrender.com/api/health` trả `ok: true` trước khi gắn `api.portfolio.id.vn` trong Render > Service > Settings > Custom Domains. Copy chính xác CNAME Render đưa ra vào TenTen, rồi Verify và kiểm tra `https://api.portfolio.id.vn/api/health`.

Trên database mới, chạy `npm run bootstrap:production` với `MONGODB_URI`, `BOOTSTRAP_ADMIN_EMAIL` và `BOOTSTRAP_ADMIN_PASSWORD` (ít nhất 14 ký tự) trong môi trường chạy lệnh. Lệnh tạo admin, gói Premium và danh mục công khai còn thiếu; có thể chạy lại, không thêm tài khoản demo hoặc xóa/ghi đè dữ liệu hiện có. Bỏ mật khẩu bootstrap khỏi môi trường sau khi chạy. **Không chạy `npm run seed` trên database đang có dữ liệu**: lệnh đó xóa nhiều collection trước khi nạp dữ liệu demo.

Sau khi API có HTTPS, đặt `VITE_API_URL=https://api.portfolio.id.vn` (không thêm `/api` phía cuối) trong GitHub Actions Variables rồi chạy lại workflow. Chỉ khi biến này được đặt và API hoạt động, đăng nhập, đăng ký, Premium và quản trị mới kết nối được database từ web công khai.

## 4. Email và thanh toán

Trong Resend, xác thực tên miền gửi mail bằng **các bản ghi DNS mà Resend cấp**; không tự tạo giá trị TXT/MX. Đặt `EMAIL_FROM=Portfolio FPT Hub <no-reply@portfolio.id.vn>` và `EMAIL_VERIFICATION_REQUIRED=1` trên API sau khi xác thực xong. OTP chỉ dùng khi đăng ký/xác minh email, không dùng cho thanh toán.

`PAYMENT_PROVIDER=manual` dùng TPBank/VietQR và admin đối soát sao kê trước khi kích hoạt Premium. Nếu muốn PayOS, cấu hình đầy đủ khóa và callback trên API trước khi đổi provider. Xem [quy trình thanh toán](payment-operations.md).

Sau cùng, kiểm thử đăng ký/OTP, đăng nhập từng role, duyệt mentor, tạo đơn Premium, đối soát, kích hoạt gói và log chi trả mentor. Kiểm tra cả `portfolio.id.vn`, `www.portfolio.id.vn` và API qua HTTPS. Không gửi mật khẩu, MongoDB URI hoặc API key trong tin nhắn; nhập trực tiếp vào Render/Resend.
