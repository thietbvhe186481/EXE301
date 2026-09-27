# Báo cáo rà soát hệ thống Portfolio FPT Hub

Ngày rà soát: 27/09/2026

## Phạm vi và kết quả

Rà soát vai trò, luồng học tập, review AI/mentor, thanh toán Premium, hoa hồng mentor, khiếu nại, kiểm duyệt mentor, quyền API, dữ liệu hiển thị, đăng nhập/đăng ký và giao diện công khai. Đã sửa các lỗi có thể xử lý trong mã nguồn, bổ sung kiểm thử nghiệp vụ và chạy bản production preview.

Kết quả tự động: **36/36 kiểm thử đạt**, `npm run build` thành công, `npm audit --audit-level=moderate` báo **0 lỗ hổng**, kiểm tra cú pháp các module server và `git diff --check` đạt.

## Vai trò và luồng nghiệp vụ

| Vai trò | Mục tiêu và luồng chính | Quyền và dữ liệu |
|---|---|---|
| Khách | Xem trang chủ, bản đồ nghề nghiệp, thử thách, học liệu và gói Premium; gửi liên hệ. | Chỉ đọc dữ liệu công khai; chưa tạo submission hay đọc hồ sơ tài khoản. |
| Sinh viên | Đăng ký → hoàn thiện hồ sơ → chọn thử thách theo ngành/trình độ → lưu nháp hoặc nộp link minh chứng → chọn kiểm tra sẵn sàng AI hoặc mentor thật → nhận góp ý/yêu cầu sửa → hoàn tất → đánh giá mentor trả phí → tùy chọn chia sẻ hồ sơ nổi bật. | Chỉ đọc/sửa hồ sơ của mình; submission giới hạn tối đa 3 link, ghi chú có giới hạn, từ chối URL không an toàn; bài Premium và mentor thật cần thuê bao còn hiệu lực. |
| Mentor | Đăng ký tài khoản → nộp hồ sơ bằng CV hoặc nội dung trao đổi → chờ admin duyệt → chọn thử thách tự tin chấm, sức chứa và trạng thái nhận bài → nhận hàng đợi → bắt đầu bài được giao → chấm theo rubric hoặc yêu cầu sửa → trao đổi với sinh viên → theo dõi thu nhập và khiếu nại. | Chỉ thấy bài được giao; không tự nhận/chấm bài của mentor khác. Chỉ được phân công khi tài khoản và hồ sơ đã duyệt, còn nhận bài và đạt ngưỡng chất lượng. |
| Admin | Duyệt hồ sơ mentor, xử lý khiếu nại, kiểm tra giao dịch Premium, đối soát trả phí mentor, xem số liệu và kiểm duyệt lời chứng thực. | Có quyền quản trị; xác nhận trạng thái thanh toán qua mã giao dịch/tham chiếu do admin kiểm tra thủ công. |

Luồng thử thách có các trạng thái `draft → queued → in_review → needs_revision → in_review → completed`; sinh viên có thể hủy khi chưa bắt đầu. Mỗi sinh viên có một hồ sơ phiên bản cho một thử thách để tránh tạo thưởng lặp. AI readiness là kiểm tra định dạng/link/ghi chú; AI sinh phản hồi chỉ hoạt động khi cấu hình nhà cung cấp. Mentor thật dùng rubric theo thử thách. Khi mentor quá tải, API yêu cầu sinh viên xác nhận thời gian chậm và cung cấp lựa chọn mentor khác.

Đơn Premium đi qua `pending → completed` hoặc `pending → cancelled`; API lấy giá từ gói trong cơ sở dữ liệu, không nhận giá do trình duyệt tự quyết định. Admin phải nhập mã đối soát. Gia hạn cộng tiếp từ ngày hết hạn còn hiệu lực; xác minh lại một đơn đã hoàn tất không cộng thêm thời gian.

Review mentor tạo khoản cơ bản **5.000₫** khi hoàn tất. Sinh viên được đánh giá một lần cho review trả phí đã hoàn thành, trước khi quyết toán; thưởng theo sao được ghi vào cùng khoản. Admin chỉ quyết toán khi đã có đánh giá hoặc đã qua 7 ngày, và phải nhập mã tham chiếu chuyển khoản. Đây là ghi nhận nghiệp vụ; hệ thống hiện không tự chuyển tiền.

## Những điểm đã cải thiện

- Chặn các API ghi dữ liệu nếu chưa đăng nhập; giới hạn sinh viên ở dữ liệu cá nhân và ngăn gọi các API cũ để tự nâng Premium, ghi sao hoặc ghi nhận trả lương.
- Thêm kiểm tra origin cho yêu cầu thay đổi dữ liệu, giới hạn login sai, giới hạn spam form liên hệ, kiểm tra dữ liệu đầu vào và giới hạn kích thước request.
- Dùng Mongo session store khi chạy production; yêu cầu `SESSION_SECRET` và `MONGODB_URI`, không trả chi tiết lỗi máy chủ cho người dùng production.
- Tách trạng thái đăng ký mentor khỏi việc được duyệt nhận chấm; không gán sẵn điểm 5 sao hay thu nhập giả. KPI, đánh giá và tiền công lấy từ bài review hoàn tất thật.
- Bổ sung kiểm duyệt lời chứng thực: chỉ sinh viên đã hoàn thành thử thách mới gửi được, bài chờ admin duyệt và chỉ lời chứng thực hợp lệ đã duyệt mới xuất hiện công khai. Gỡ nội dung, đối tác, số liệu và lời khen demo dễ bị hiểu là dữ liệu thật khỏi trang giới thiệu.
- Chuyển học liệu sang các liên kết nguồn công khai FPT/Coursera đã tuyển chọn; loại URL `portfolio.demo` giả. Thử thách hiển thị yêu cầu, đầu ra, tiêu chí chấm và giới hạn nộp rõ hơn. Mã nguồn không tải lại hay phân phối trái phép nội dung có bản quyền.
- Thống nhất URL API giữa màn hình và service đăng nhập; màn đăng nhập/đăng ký giải thích nguyên nhân khi backend chưa cấu hình. Luồng đánh giá mentor cũ không còn báo thành công giả và tuân thủ điều kiện review trả phí.
- Thêm 36 kiểm thử cho xác thực, chống dò mật khẩu, quyền API, chống request chéo nguồn, form liên hệ, KPI, kiểm duyệt chứng thực, mentor capacity, rubric, sửa bài, khoản thưởng, khiếu nại, quyền chia sẻ hồ sơ, đơn Premium và tính lặp an toàn.

## Kiểm thử giao diện

Đã mở preview production và kiểm tra trang chủ, trang học liệu, danh sách thử thách, nội dung hướng dẫn/nộp thử thách, trang giới thiệu, và giao diện đăng nhập/đăng ký. Các trang công khai tải được, danh mục học liệu lọc được, phần chi tiết thử thách có đầu ra/rubric/giới hạn link, không phát hiện lỗi JavaScript trên các màn đã xem.

Đã thử gửi thông tin đăng nhập/đăng ký giả lập trên preview. Giao diện phát hiện đúng môi trường chưa có API và hiện hướng dẫn cấu hình `VITE_API_URL`; không dùng tài khoản hay thông tin xác thực thật. Do đó xác thực với MongoDB, cookie session trên tên miền triển khai và phân quyền dashboard chưa thể xác nhận end-to-end.

## Việc còn cần cấu hình hoặc quyết định trước khi dùng thật

| Ưu tiên | Hạng mục còn thiếu | Tác động / bước cần làm |
|---|---|---|
| Chặn triển khai thật | Chưa có API production kết nối từ GitHub Pages. | Triển khai `server/` lên host Node.js, kết nối MongoDB Atlas, rồi thêm GitHub repository variable `VITE_API_URL` (URL gốc API) và cấu hình `CLIENT_ORIGIN` theo domain Pages. Dịch vụ API phải cho phép cookie credentials; nếu frontend/backend khác site cần HTTPS, `COOKIE_CROSS_SITE=1`, `TRUST_PROXY=1` và cấu hình CORS đúng origin. |
| Cao | Không có email OTP hoặc đặt lại mật khẩu hoạt động; `/api/auth/forgot-password` hiện trả 501 và đăng ký chưa xác minh email. | Cần nhà cung cấp SMTP/email và chính sách hết hạn, giới hạn, dùng một lần cho OTP/reset token trước khi bật xác minh. Hiện có đổi mật khẩu khi đã đăng nhập. |
| Cao | Premium và lương mentor đang đối soát thủ công, không có cổng thanh toán/webhook hay lệnh chuyển khoản. | Chỉ admin xác nhận sau khi tự kiểm tra ngân hàng. Trước vận hành cần tích hợp nhà cung cấp thanh toán, webhook có chữ ký và idempotency; quy trình hoàn tiền cần xác định rõ. Không đánh dấu đã trả tiền nếu chưa đối soát giao dịch thật. |
| Cao | Thông báo email/push và hộp thư sự kiện chưa được nối xuyên suốt mọi lần chuyển trạng thái. | Bổ sung notification/event delivery để sinh viên, mentor và admin nhận biết assignment, yêu cầu sửa, quyết toán và phản hồi khiếu nại. |
| Trung bình | Quyền xóa tài khoản và dữ liệu cá nhân chưa hoàn thiện ở API dù chính sách quyền riêng tư mô tả quyền yêu cầu xóa. | Bổ sung xác nhận danh tính, xóa/ẩn danh hóa theo quan hệ dữ liệu, xử lý nghĩa vụ lưu chứng từ giao dịch và nhật ký trước khi công bố cam kết xóa ngay lập tức. |
| Trung bình | Chưa có vai trò nhà tuyển dụng độc lập. Chia sẻ hồ sơ nổi bật hiện là tùy chọn cho mentor đã duyệt. | Nếu muốn tuyển dụng qua nền tảng, cần thêm quyền employer, xác minh doanh nghiệp, consent riêng cho từng hồ sơ và nhật ký truy cập. |
| Trung bình | Chấm AI dựa vào dữ liệu sinh viên khai và tài liệu/link được cung cấp; hệ thống không tải/chạy repository hay xác minh sự thật của nội dung link. | Hiển thị rõ AI chỉ hỗ trợ sàng lọc, không thay thế đánh giá chuyên môn; cân nhắc sandbox riêng nếu muốn chạy mã nguồn do sinh viên nộp. |

Số liệu demo/seed còn hữu ích cho môi trường xem thử. Chỉ chạy seed trên cơ sở dữ liệu phát triển mới; không nhập demo data vào MongoDB production. Cần bật sao lưu và kiểm tra phục hồi cơ sở dữ liệu trước khi nhận dữ liệu sinh viên thật.

## Tệp và bằng chứng

- Bộ kiểm thử: `server/*.test.js`, chạy qua `npm test`.
- Ảnh màn đăng nhập giải thích API chưa cấu hình: `audit-evidence/auth-api-not-configured.png`.
- Pipeline GitHub Actions chạy kiểm thử trước build/deploy GitHub Pages.
