# Kết nối API cho website Portfolio FPT Hub

Website đang chạy trên GitHub Pages, nơi chỉ phục vụ file tĩnh. Đăng nhập, đăng ký và các nghiệp vụ cần API Express cùng MongoDB. Repo đã có `render.yaml` để triển khai API lên Render và cấu hình cookie phiên đăng nhập giữa hai domain.

## Triển khai lần đầu

1. Tạo MongoDB Atlas cluster và database user. Cho phép Render kết nối mạng đến cluster, sau đó lấy connection string dạng `mongodb+srv://...`.
2. Trong Render, tạo Blueprint mới từ repo `thietbvhe186481/EXE301`. Render đọc `render.yaml` và yêu cầu nhập `MONGODB_URI`; `SESSION_SECRET` được Render tự tạo.
3. Chờ service `exe301-portfolio-api` chạy xong. Kiểm tra `https://<service>.onrender.com/api/health`, cần nhận JSON có `"ok":true`.
4. Trong GitHub repo, vào **Settings → Secrets and variables → Actions → Variables** và tạo repository variable `VITE_API_URL` với origin API, ví dụ `https://exe301-portfolio-api.onrender.com` (không thêm `/api`).
5. Chạy lại workflow **Deploy Portfolio to GitHub Pages** trong tab **Actions**. Workflow build nhúng URL này vào frontend. Sau khi deploy xong, tải lại website.

`CLIENT_ORIGIN`, cookie `SameSite=None; Secure` và proxy trust đã được khai báo trong Blueprint cho GitHub Pages. Nếu đổi domain website, hãy cập nhật `CLIENT_ORIGIN` trên Render về origin mới (chỉ scheme + host, không có đường dẫn).

## Dữ liệu tài khoản

Sinh viên và mentor có thể đăng ký trực tiếp sau khi API được kết nối. Một database Atlas mới chưa có tài khoản admin hoặc dữ liệu mẫu. Có thể nạp dữ liệu demo bằng `npm run seed` **chỉ trên database mới, rỗng**. Script seed hiện xóa collection trước khi nạp lại; không chạy trên database có dữ liệu cần giữ. Tài khoản mẫu sau seed: `student@portfolio.vn / 123456`, `mentor@portfolio.vn / mentor123`, `admin@portfolio.vn / admin123`.

Gói Render Free có thể đưa API vào trạng thái ngủ khi không có lượt truy cập; lượt đầu sau khi ngủ có thể chậm. Dữ liệu được lưu trong MongoDB Atlas.
