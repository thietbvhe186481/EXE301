# Rà soát nghiệp vụ Portfolio FPT Hub

## Tình trạng đăng nhập đang triển khai

GitHub Pages chỉ phục vụ frontend, không chạy Express hoặc lưu MongoDB. Bản JS đang được phát hành gọi `http://127.0.0.1:4000` khi không có biến `VITE_API_URL`; địa chỉ đó trỏ về máy của từng khách truy cập. Vì repository chưa cấu hình URL API công khai nên đăng nhập và đăng ký trên trang online chắc chắn không kết nối được. Giao diện hiện cần báo lỗi cấu hình rõ ràng, không giả lập đăng nhập.

Muốn bật lại chức năng: triển khai `server/index.js` lên dịch vụ chạy Node có HTTPS; cấp MongoDB Atlas; cấu hình `MONGODB_URI`, `SESSION_SECRET`, `CLIENT_ORIGIN`, `NODE_ENV=production`. Vì frontend Pages và API khác origin, cấu hình cookie `COOKIE_CROSS_SITE=1` và `TRUST_PROXY=1` sau reverse proxy. Trình duyệt có thể chặn cookie bên thứ ba giữa hai site độc lập; giải pháp vững hơn là đặt API dưới cùng site (ví dụ `api.example.vn`) và đảm bảo CORS/cookie/SameSite được kiểm thử từ trình duyệt thật. Sau đó đặt GitHub Actions variable `VITE_API_URL=https://<api-host>` rồi build/deploy lại. Không seed dữ liệu demo lên production; seed hiện xóa một số collection trước khi nạp dữ liệu.

## Luồng sản phẩm đề xuất

### Tài khoản

1. Sinh viên đăng ký → xác minh email → chọn ngành/mục tiêu → vào catalog.
2. Mentor đăng ký → email xác minh → hồ sơ chờ duyệt, chưa được nhận/chấm bài → gửi CV/link hoặc yêu cầu trao đổi → admin duyệt → mentor khai báo phạm vi chuyên môn và sức chứa.
3. Admin tạo tài khoản có quy trình riêng; tuyệt đối không đăng ký admin công khai. Thêm quên/đặt lại mật khẩu, giới hạn thử đăng nhập, rate limit, nhật ký bảo mật và cơ chế khóa tài khoản.

### Bài tập và chấm bài

`catalog → draft → queued → in_review → completed | needs_revision → queued`. Người học nhìn trước trình độ, điều kiện gói, rubric, tiêu chí đạt, thời gian dự kiến, nguồn tham khảo và quyền dùng bài. Nộp URL allowlist HTTPS, tối đa 3 link; không nhận file nhị phân. Lưu snapshot rubric/version khi nộp để thay rubric sau này không đổi chuẩn bài đang chấm. Mỗi lần sửa có revision riêng và lịch sử audit; giới hạn dung lượng phần mô tả/chat.

Kiểm tra quy tắc chỉ xác nhận dữ liệu người học khai báo, không tuyên bố đọc hoặc chấm repo. AI là bước tùy chọn, cần đồng ý riêng, phải nói rõ dữ liệu gửi cho nhà cung cấp và tách hoàn toàn khỏi điểm mentor. Điểm chính thức chỉ được công nhận khi mentor hoàn tất rubric. Cho khiếu nại kết quả trong thời hạn cấu hình, người khác xử lý độc lập và có audit.

Quá tải được dự báo từ số bài đang mở, năng lực và SLA lịch sử; đề xuất mentor phù hợp tải nhẹ. Lựa chọn mentor quá tải phải ghi nhận xác nhận thời gian. Không coi con số tải tức thời là giữ chỗ; lúc phân công phải kiểm tra lại nguyên tử, xử lý rút mentor/nghỉ/bỏ SLA và cho sinh viên chuyển mentor có log.

### Tiền sinh viên và trả công mentor

Phân biệt bốn sổ, không dùng một cờ `paid` để biểu diễn toàn bộ vòng đời:

1. **Đơn mua gói của sinh viên**: `pending_payment → reported_paid → verifying → paid | rejected | refunded`. Gói chỉ hoạt động khi sao kê/cổng thanh toán xác nhận; webhook phải xác minh chữ ký, amount, currency, mã đơn và idempotency. Hiện tại `POST /orders` tạo đơn chờ nhưng UI “đã chuyển khoản” chưa gửi ảnh/chứng từ; admin nhập một chuỗi reference bất kỳ là xác nhận. Cần sửa trước khi nhận tiền thật.
2. **Khoản phải trả mentor**: khi bài hoàn tất hợp lệ tạo một khoản thu nhập 5.000đ trong sổ cái, trạng thái `pending_review_window`. Chỉ một lần cho mỗi revision đủ điều kiện; không trả khi bài bị hủy/yêu cầu sửa. Sau khi sinh viên đánh giá hoặc hết 7 ngày khiếu nại, chuyển `available`. Thưởng sao là dòng riêng, không ghi đè khoản gốc. Chính sách trước đó giả định nền tảng tài trợ từ doanh thu Premium, không thu sinh viên thêm 5.000đ; nếu doanh thu không đủ trả mentor thì tạm ngưng nhận việc hoặc điều chỉnh bảng giá công khai.
3. **Ví và sổ cái bất biến**: mỗi thay đổi là một ledger entry có `mentorId`, `submissionId`, loại, số tiền nguyên VND, trạng thái, thời điểm, actor, mã idempotency và tham chiếu điều chỉnh. Không sửa/xóa dòng đã ghi; sai thì tạo dòng đảo.
4. **Batch chi trả**: `draft → approved_by_finance → transfer_in_progress → partially_paid | paid | failed`. Tạo bảng kê theo kỳ, đối soát tổng tiền, người lập khác người duyệt, xuất danh sách ngân hàng, ghi mã giao dịch/biên nhận từng mentor; retry không sinh giao dịch kép. Mentor khai báo tên chủ tài khoản/ngân hàng/số tài khoản trong vùng riêng, xác nhận chính chủ và thay đổi có thời gian chờ. Tối thiểu chi trả, lịch kỳ, ngưỡng, thuế/chứng từ cần kế toán và tư vấn pháp lý cấu hình trước khi công bố; không tự đặt cam kết pháp lý.

Màn quản trị phải phân biệt “đã nhập reference” với “đã chuyển tiền”. Phiên bản hiện tại chỉ đánh dấu đã thanh toán khi admin nhập chuỗi reference; chưa tích hợp ngân hàng, webhook hay sổ cái. Vì vậy đây là đối soát thủ công mẫu, không dùng làm chứng từ kế toán.

### Đánh giá chất lượng và riêng tư

Chỉ người sở hữu bài có khoản trả phí được đánh giá một lần. Đánh giá được mở đến mốc quyết toán; đánh giá thấp tạo ticket kiểm tra, không tự động xóa mentor khỏi hệ thống chỉ từ một lượt vote. Dùng ngưỡng tối thiểu mẫu, rolling average, quyền giải trình, admin duyệt đình chỉ và quy trình kháng nghị. Thưởng sao chỉ xác định sau hết cửa sổ điều chỉnh để tránh khuyến khích xin điểm.

Hồ sơ nổi bật mặc định riêng tư. Sinh viên xem chính xác trường nào chia sẻ, cho mentor/doanh nghiệp nào, mục đích và thời hạn; consent riêng cho từng đợt tuyển dụng, thu hồi được. Mọi truy cập hồ sơ phải ghi log, không hiển thị email/số điện thoại khi chưa có đồng ý.

## Các việc cần ưu tiên trước khi mở người dùng thật

1. Deploy API và database, kết nối `VITE_API_URL`, kiểm tra auth cookie HTTPS/CORS từ domain Pages; thêm test khói deploy `/api/health`, đăng ký mới, đăng xuất, đăng nhập lại và chặn tài khoản.
2. Thêm email verification và reset password; giới hạn đăng nhập, CSRF phù hợp session cookie cross-site; production session store bền vững dùng chung. Hiện `express-session` dùng MemoryStore và API auth chưa email/CSRF.
3. Chuyển sang collection payout ledger/batches và order verification có idempotency; không ghi “đã trả” khi chỉ nhập một reference chưa xác minh.
4. Bổ sung dispute, SLA, đổi mentor và lưu audit event cho quyết định admin, review, rating, consent, order và transfer.
5. Xóa số liệu demo/seed khỏi KPI và hồ sơ portfolio production; kiểm tra phân quyền admin và quyền đọc dữ liệu cá nhân.
6. Kiểm tra tích hợp với MongoDB thật, cookie trên domain đã deploy và luồng thanh toán sandbox; bộ test model giả hiện có không thay thế kiểm tra này.
