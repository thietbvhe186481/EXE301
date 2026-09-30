# Trợ lý hỗ trợ ở góc màn hình

- Câu hỏi mẫu được trả lời bằng nội dung hướng dẫn cố định, không gọi mô hình.
- Câu hỏi sinh viên tự nhập chỉ được gửi tới Groq khi họ chọn đồng ý trong khung chat. Máy chủ chỉ gửi câu hỏi cùng một đoạn hướng dẫn liên quan; không gửi phiên đăng nhập, hồ sơ, bài nộp hoặc lịch sử trò chuyện.
- Câu trả lời do mô hình tạo chỉ được hiển thị khi là đoạn trích nguyên văn từ hướng dẫn đã kiểm chứng. Nếu mô hình thêm tiêu chí hoặc thông tin khác, máy chủ tự chuyển sang câu trả lời chuẩn.
- Với câu hỏi ngoài phạm vi website, trợ lý chuyển người dùng tới mục Hỗ trợ. Nếu Groq không khả dụng hoặc hết lượt, hướng dẫn cố định vẫn hoạt động.
- Mỗi IP được tối đa 4 lượt AI/ngày UTC, toàn website tối đa 60 lượt AI/ngày UTC và 18 yêu cầu/giờ/IP. Bộ đếm trong bộ nhớ máy chủ sẽ đặt lại khi dịch vụ khởi động lại; giới hạn từ phía Groq vẫn áp dụng. Không cam kết chi phí nhà cung cấp luôn bằng 0 khi tài khoản Groq thay đổi gói hoặc chính sách.
- Khóa `GROQ_API_KEY` chỉ nằm ở Render; không đặt khóa vào frontend. Theo dõi hạn mức Groq để điều chỉnh giới hạn trước khi tăng lưu lượng.
