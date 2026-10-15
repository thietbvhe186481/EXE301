# Tài khoản minh họa BeeLearn

Đợt `beelearn-2026-10` bổ sung **UserProfile** tới tổng 63 bản ghi, giữ nguyên toàn bộ 33 tài khoản đã có và thêm 30 hồ sơ minh họa. Chạy lại không tạo trùng.

Tài khoản minh họa có tên, trường, chuyên ngành, mục tiêu nghề và một bản nháp hoặc bài tự luyện theo thử thách miễn phí. Bài đã nộp trỏ tới trang minh họa trên chính BeeLearn. Trang đó ghi rõ nội dung giả lập và không phải sản phẩm học tập của một người thật. Không tạo điểm AI, nhận xét mentor, giao dịch Premium, đánh giá hoặc khoản chi trả giả.

Email dùng `@example.com` (tên miền dành cho ví dụ), **không phải hộp thư thực**. Những tài khoản này có `demoData: true`, `status: unverified`, `emailVerified: false`, không có mật khẩu và không công khai hồ sơ; vì vậy không thể đăng nhập hoặc nhận OTP. Trường `demoData` chỉ được giữ trong dữ liệu nội bộ, không hiện nhãn trong danh sách quản trị. Chỉ số người dùng/bài hoàn thành công khai không tính dữ liệu minh họa, còn danh sách quản trị vẫn chứa đủ 63 bản ghi.

Render miễn phí không có Shell. Để nạp đúng một lần, đặt `BEELEARN_DEMO_SEED_TO_63=1` trong Environment và triển khai bản mã có `ensureDemoStudents`. Nhật ký ghi `existing`, `inserted`, `users`, `demoUsers`, `demoSubmissions`. Sau khi xác nhận `users=63`, xóa biến môi trường này. Không dùng `npm run seed`: lệnh đó xóa collection trước khi nạp lại.
