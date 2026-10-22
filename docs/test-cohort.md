# Mô phỏng nhóm người dùng kiểm thử

Chạy kịch bản offline với danh sách Gmail một dòng một địa chỉ:

```powershell
node server/simulate-test-cohort.js --emails-file C:\path\emails.txt --out C:\path\report.json
```

Kịch bản dùng catalog thử thách miễn phí và hàm `readinessCheck` của BeeLearn để mô phỏng các bước xem đề, tạo nháp, nộp bài và xem phản hồi quy tắc. Báo cáo luôn có `kind: synthetic_test`, `accountCreated: false`, `productionAccountsCreated: 0` và `emailsSent: 0`. Nó không tạo tài khoản trên website, không kiểm tra quyền sở hữu Gmail, không gửi email, không chấm chất lượng bằng AI và không thay thế kiểm thử trực tiếp trong trình duyệt.

Giữ danh sách email và báo cáo bên ngoài Git; không đưa dữ liệu cá nhân này vào repository công khai. Nếu cần vận hành tài khoản đăng nhập được trên môi trường staging, phải cấp một MongoDB và bản triển khai staging riêng, rồi chạy luồng xác nhận quyền sở hữu email theo thiết kế của môi trường đó.
