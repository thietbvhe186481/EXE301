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
| `api` | CNAME | `exe301-portfolio-api.onrender.com` |

Xóa bản ghi A/CNAME mặc định của TenTen **chỉ nếu trùng Host** với các bản ghi trên. Đừng xóa MX/TXT phục vụ email. Tránh wildcard `*`. Nếu TenTen yêu cầu tên đầy đủ thay vì `@`, điền `portfolio.id.vn`; một số giao diện tự nối hậu tố tên miền, nên kiểm tra bản ghi sau khi lưu.

## 2. Liên kết GitHub Pages

Trong [GitHub repo > Settings > Pages](https://github.com/thietbvhe186481/EXE301/settings/pages), đặt **Custom domain** là `portfolio.id.vn` rồi Save. Repo này xuất bản bằng GitHub Actions nên không cần file `CNAME`. Khi DNS và chứng chỉ đã sẵn sàng, bật **Enforce HTTPS**. GitHub sẽ chuyển `www.portfolio.id.vn` về tên miền chính nếu cả hai bản ghi được cấu hình đúng.

Build mặc định dùng đường dẫn asset tương đối (`VITE_BASE_PATH=./`), nên chạy được ở cả tên miền riêng và [địa chỉ GitHub Pages cũ](https://thietbvhe186481.github.io/EXE301/). Để trống biến `VITE_BASE_PATH` trong [Settings > Secrets and variables > Actions > Variables](https://github.com/thietbvhe186481/EXE301/settings/variables/actions), hoặc đặt `./`; không dùng `/EXE301/` khi tên miền riêng đã hoạt động. Không đặt khóa bí mật vào biến `VITE_*`.

## 3. Triển khai API và dữ liệu

Atlas đã có cụm Free `portfolio-prod` tại AWS Singapore và tài khoản ứng dụng `portfolio_app` được giới hạn vào cụm này. IP Access List chỉ gồm IP quản trị cá nhân và hai dải outbound Render Singapore `74.220.52.0/24`, `74.220.60.0/24`; khi Render thay đổi dải outbound, cập nhật danh sách này theo **Connect > Outbound IP Addresses** của service.

Render Web Service `exe301-portfolio-api` được tạo thủ công từ nhánh `main`, dùng `npm ci`, `npm run server`, Singapore, Free, và health check `/api/health`. Render đã xác minh `api.portfolio.id.vn`; hãy kiểm tra trạng thái chứng chỉ TLS trong **Settings > Custom Domains**. Dịch vụ tạo thủ công không tự nhận các biến trong `render.yaml`: trong **Environment**, đặt `NODE_ENV=production`, `CLIENT_ORIGIN=https://portfolio.id.vn,https://thietbvhe186481.github.io`, `COOKIE_CROSS_SITE=1`, `TRUST_PROXY=1`, `SESSION_SECRET` ngẫu nhiên đủ dài, `MONGODB_USERNAME=portfolio_app`, `MONGODB_HOST=portfolio-prod.dfh3ilg.mongodb.net`, `MONGODB_DATABASE=portfolio_career` và `MONGODB_PASSWORD` do chủ tài khoản tự nhập. API tự mã hóa mật khẩu để tạo URI; không đưa mật khẩu vào Git hoặc chat. Biến `MONGODB_URI` nguyên chuỗi vẫn được hỗ trợ nếu muốn dùng cách cũ. Kiểm tra `https://api.portfolio.id.vn/api/health` trả `ok: true` sau khi Render báo service live.

Trên database mới, chạy `npm run bootstrap:production` với `MONGODB_URI`, `BOOTSTRAP_ADMIN_EMAIL` và `BOOTSTRAP_ADMIN_PASSWORD` (ít nhất 14 ký tự) trong môi trường chạy lệnh. Lệnh tạo admin, gói Premium và danh mục công khai còn thiếu; có thể chạy lại, không thêm tài khoản demo hoặc xóa/ghi đè dữ liệu hiện có. Bỏ mật khẩu bootstrap khỏi môi trường sau khi chạy. **Không chạy `npm run seed` trên database đang có dữ liệu**: lệnh đó xóa nhiều collection trước khi nạp dữ liệu demo.

Sau khi API có HTTPS, đặt `VITE_API_URL=https://api.portfolio.id.vn` (không thêm `/api` phía cuối) trong GitHub Actions Variables rồi chạy lại workflow. Chỉ khi biến này được đặt và API hoạt động, đăng nhập, đăng ký, Premium và quản trị mới kết nối được database từ web công khai.

## 4. Email và thanh toán

Trong Resend, xác thực tên miền gửi mail bằng **các bản ghi DNS mà Resend cấp**; không tự tạo giá trị TXT/MX. Đặt `EMAIL_FROM=Portfolio FPT Hub <no-reply@portfolio.id.vn>` và `EMAIL_VERIFICATION_REQUIRED=1` trên API sau khi xác thực xong. OTP chỉ dùng khi đăng ký/xác minh email, không dùng cho thanh toán.

`PAYMENT_PROVIDER=manual` dùng TPBank/VietQR và admin đối soát sao kê trước khi kích hoạt Premium. Nếu muốn PayOS, cấu hình đầy đủ khóa và callback trên API trước khi đổi provider. Xem [quy trình thanh toán](payment-operations.md).

Sau cùng, kiểm thử đăng ký/OTP, đăng nhập từng role, duyệt mentor, tạo đơn Premium, đối soát, kích hoạt gói và log chi trả mentor. Kiểm tra cả `portfolio.id.vn`, `www.portfolio.id.vn` và API qua HTTPS. Không gửi mật khẩu, MongoDB URI hoặc API key trong tin nhắn; nhập trực tiếp vào Render/Resend.
