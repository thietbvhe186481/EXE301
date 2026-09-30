# AI góp ý bài thực hành

## Bật trên máy chủ

1. Tạo API key riêng cho môi trường production trong [Groq Console](https://console.groq.com/keys). Giữ khóa ở nơi an toàn; Groq chỉ hiển thị toàn bộ khóa khi tạo.
2. Trong Render của dịch vụ `exe301-portfolio-api`, thêm biến môi trường `GROQ_API_KEY` với giá trị khóa rồi lưu và triển khai lại. Không đặt khóa vào `VITE_*`, repository hoặc trình duyệt của sinh viên.
3. Đăng nhập tài khoản Sinh viên trên website, nộp một bài tự luyện, dán trích đoạn 120–6000 ký tự và chủ động đồng ý gửi nội dung cho Groq. Kiểm tra phản hồi hiện theo từng tiêu chí, có trích dẫn, việc cần sửa và được lưu sau khi tải lại trang.

Nếu khóa chưa được cấu hình, website chỉ kiểm tra độ đầy đủ thông tin nộp và vẫn cho phép chuyển sang mentor thật. Nếu khóa bị thu hồi, thay giá trị `GROQ_API_KEY` trong Render rồi triển khai lại; không cần đổi frontend.

## Phạm vi và giới hạn

- AI chỉ nhận trích đoạn sinh viên tự dán cùng đề bài và tiêu chí chấm. Ghi chú, kỹ năng, liên kết minh chứng, tệp và danh tính sinh viên không được gửi tự động cho Groq. Sinh viên cần tránh dán thông tin cá nhân hoặc bí mật vào trích đoạn.
- Nếu Groq từ chối phản hồi theo JSON Schema với mã `json_validate_failed`, máy chủ thử lại một lần bằng JSON Object Mode và vẫn kiểm tra cấu trúc cùng trích dẫn trước khi ghi điểm. Không tính lượt khi cả hai lần đều thất bại.
- Điểm là mức độ thể hiện trong trích đoạn, không phải điểm xác nhận cho toàn bộ sản phẩm. Tiêu chí thiếu câu trích dẫn khớp bị đánh dấu chưa có bằng chứng và không được tính điểm.
- Mỗi bài tự luyện có một lượt AI thành công; mỗi sinh viên tối đa hai lượt thành công trong một ngày UTC. Lỗi nhà cung cấp không ghi nhận lượt đã hoàn thành.
- Chỉ mentor được quản trị viên duyệt mới đưa ra đánh giá chính thức và có thể ghi nhận thù lao.

Theo dõi [Rate Limits của Groq](https://console.groq.com/docs/rate-limits) trước khi mở rộng lưu lượng hoặc thay đổi mô hình. Giới hạn và điều kiện gói miễn phí do Groq quyết định và có thể thay đổi.
