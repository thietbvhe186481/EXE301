// Observable thresholds for each rubric criterion, in the same order as each brief's rubric.
// [minimum evidence for 5–7, additional evidence for 8–10]. A missing minimum maps to 0–4.
export const RUBRIC_EVIDENCE = {
  'practice-dev-profile': [
    ['nội dung không tràn ở 375px và 1280px', 'menu, ảnh và nút dẫn dự án vẫn dễ dùng khi đổi kích thước'],
    ['thứ bậc heading, alt cho ảnh có ý nghĩa và tên link rõ', 'điều hướng bàn phím có focus nhìn thấy'],
    ['phần giới thiệu, kỹ năng và ít nhất một dự án mở được', 'mô tả rõ vai trò và kết quả của bản thân trong dự án'],
    ['README ghi cách chạy và cấu trúc repository', 'người khác có thể chạy dự án chỉ bằng hướng dẫn đó']
  ],
  'practice-dev-dashboard': [
    ['lọc, tìm kiếm cùng trạng thái tải/rỗng/lỗi hoạt động', 'cập nhật bộ lọc không làm mất dữ liệu hoặc hiển thị kết quả cũ'],
    ['component tách theo trách nhiệm và state có nguồn rõ', 'giải thích luồng dữ liệu khi lọc và tải lại'],
    ['ba ca kiểm thử cho luồng chính và trạng thái lỗi', 'minh chứng kết quả chạy test và cách tái hiện lỗi'],
    ['ghi lý do chọn cấu trúc component và trạng thái', 'nêu đánh đổi giữa ít nhất hai hướng xử lý']
  ],
  'practice-dev-capstone': [
    ['đặt, xem và hủy lịch cập nhật đúng chỗ trống', 'ngăn hai người xác nhận cùng khung giờ bằng kiểm tra có thể tái hiện'],
    ['mô hình dữ liệu cho lịch, mentor và người đặt', 'giải thích ranh giới giao dịch khi nhiều người thao tác đồng thời'],
    ['kiểm tra quyền và ít nhất một tình huống lỗi mạng', 'bộ test chứng minh không đặt trùng và không sửa lịch của người khác'],
    ['hướng dẫn chạy với dữ liệu mẫu và sơ đồ luồng', 'người khác triển khai thử và hiểu giới hạn giải pháp']
  ],
  'practice-mkt-persona': [
    ['persona có mục tiêu, khó khăn và nguồn hình thành', 'phân biệt rõ điều phỏng đoán với điều đã quan sát'],
    ['thông điệp trả lời một nhu cầu cụ thể của persona', 'giải thích vì sao chọn giọng điệu và lời kêu gọi hành động'],
    ['bảy nội dung có ngày, kênh và mục tiêu', 'lịch có người thực hiện và cách điều chỉnh khi thiếu nguồn lực'],
    ['nguồn được dẫn tới và slide/tài liệu đọc được', 'người xem truy lại được các giả định quan trọng']
  ],
  'practice-mkt-campaign': [
    ['mục tiêu, chân dung khách hàng và các kênh ăn khớp', 'luận cứ ưu tiên kênh theo hành vi khách hàng'],
    ['bảng ngân sách có tổng không vượt mức giả định', 'phương án chuyển ngân sách khi kênh không đạt KPI'],
    ['định nghĩa KPI ở từng bước phễu và cách tính', 'mốc kiểm tra hằng tuần và quyết định khi lệch mục tiêu'],
    ['mẫu thông điệp phù hợp một kênh và persona', 'giải thích được khác biệt thông điệp giữa hai kênh']
  ],
  'practice-mkt-experiment': [
    ['giả thuyết A/B chỉ đổi một yếu tố chính', 'nêu cỡ mẫu hoặc điều kiện dừng trước khi xem kết quả'],
    ['chỉ số chính có công thức và nguồn dữ liệu', 'phân biệt tín hiệu với biến động ngẫu nhiên hay dữ liệu thiếu'],
    ['quy tắc tiếp tục/dừng gắn với kết quả thử nghiệm', 'đề xuất bước tiếp theo theo nhiều kịch bản kết quả'],
    ['nêu giới hạn mẫu và rủi ro kết luận quá mức', 'cách bảo vệ quyền riêng tư khi thu thập sự kiện']
  ],
  'practice-design-wireframe': [
    ['user flow nối liên tục từ chọn sự kiện tới xác nhận', 'có đường quay lại và sửa lỗi không mất dữ liệu'],
    ['bốn màn hình thể hiện nội dung và nút chính theo thứ bậc', 'người dùng biết đang ở bước nào mà không cần giải thích'],
    ['trạng thái lỗi có thông điệp gần trường liên quan', 'thứ tự focus và kích thước mục tiêu chạm được kiểm tra'],
    ['lý do bỏ/chọn trường và bước được ghi rõ', 'quyết định được đối chiếu với mục tiêu đăng ký nhanh']
  ],
  'practice-design-prototype': [
    ['prototype bấm được từ tìm bài đến học tiếp', 'có trạng thái tải, chưa có dữ liệu và quay lại'],
    ['component và trạng thái dùng nhất quán giữa màn hình', 'biến thể và quy tắc sử dụng giúp người khác mở rộng'],
    ['ghi cách tuyển người, tác vụ thử và quan sát ẩn danh', 'tách quan sát thực tế khỏi suy đoán của người nghiên cứu'],
    ['ít nhất một thay đổi gắn với phản hồi cụ thể', 'kiểm tra lại thay đổi bằng tác vụ hoặc số liệu phù hợp']
  ],
  'practice-design-case-study': [
    ['vấn đề đặt lịch được hỗ trợ bởi bằng chứng đã ẩn danh', 'nêu cỡ mẫu và giới hạn của nghiên cứu'],
    ['giải pháp xử lý đúng bước xác nhận gây khó khăn', 'so sánh phương án đã loại bỏ và lý do'],
    ['có phương pháp kiểm chứng trước/sau', 'đặt kết quả cạnh giới hạn để tránh phóng đại tác động'],
    ['case study nối vấn đề, quyết định và minh chứng', 'người đọc truy lại được prototype và kết quả kiểm tra']
  ],
  'practice-dev-api': [
    ['endpoint CRUD và phân trang có request/response mẫu', 'mã trạng thái đúng cho tạo, thiếu dữ liệu và không tìm thấy'],
    ['đầu vào sai được từ chối với lỗi có thể hiểu', 'kiểm tra giới hạn trang, chuỗi rỗng và dữ liệu trùng'],
    ['hạn chế sửa/xóa theo quyền hoặc nêu phạm vi không có xác thực', 'minh chứng ca thử truy cập trái phép'],
    ['tài liệu endpoint có tham số, ví dụ và cách chạy', 'người khác gọi thử API mà không cần hỏi tác giả']
  ],
  'practice-dev-data': [
    ['nguồn dữ liệu và bước xử lý thiếu/trùng được ghi', 'giải thích tác động của việc loại hoặc thay giá trị'],
    ['câu hỏi phân tích có phép tính và dữ liệu hỗ trợ', 'so sánh ít nhất một cách giải thích khác cho kết quả'],
    ['biểu đồ có nhãn, đơn vị và tiêu đề chính xác', 'thang đo không bóp méo khác biệt giữa nhóm'],
    ['mã, dữ liệu mẫu và hướng dẫn chạy lại có đủ', 'người khác thu được cùng kết quả và biết giới hạn dữ liệu']
  ],
  'practice-dev-security': [
    ['phạm vi được phép và tài sản/rủi ro chính được ghi', 'threat model phân biệt tác nhân, đường tấn công và mức ảnh hưởng'],
    ['mỗi phát hiện có vị trí, điều kiện tái hiện và bằng chứng an toàn', 'phân loại mức ưu tiên dựa trên khả năng khai thác và tác động'],
    ['biện pháp sửa gắn đúng nguyên nhân từng phát hiện', 'có ca tái kiểm tra chứng minh lỗi đã được chặn'],
    ['không công khai token, dữ liệu thật hoặc cách khai thác mục tiêu ngoài phạm vi', 'báo cáo giúp đội sửa lỗi mà không phát tán thông tin nhạy cảm']
  ],
  'practice-mkt-research': [
    ['phân khúc đầu tiên có tiêu chí chọn rõ', 'giải thích vì sao bỏ các phân khúc còn lại'],
    ['nguồn công khai có ngày và liên kết truy lại', 'đánh dấu nguồn cũ hoặc số liệu không cùng định nghĩa'],
    ['insight nối dữ liệu với nhu cầu giả định', 'đề xuất phép kiểm tra nhu cầu trước khi đầu tư lớn'],
    ['báo cáo có cấu trúc vấn đề, bằng chứng, kết luận', 'người đọc nhận ra ngay phần nào còn là giả thuyết']
  ],
  'practice-mkt-seo': [
    ['nhóm từ khóa theo ý định và giai đoạn tìm hiểu', 'giải thích khác biệt giữa truy vấn thông tin và truy vấn mua'],
    ['topic cluster có trang trụ cột và liên kết nội bộ', 'brief trang đích trả lời câu hỏi trọng tâm trước khi quảng bá'],
    ['đề xuất title, heading và nội dung theo ý định', 'nêu vấn đề kỹ thuật có thể kiểm tra mà không nhồi từ khóa'],
    ['chỉ số đo như nhấp, chuyển đổi hoặc tương tác có nguồn', 'không tuyên bố thứ hạng khi chưa có dữ liệu']
  ],
  'practice-mkt-analytics': [
    ['mỗi bước phễu có mẫu số và định nghĩa chỉ số', 'cùng một cửa sổ thời gian được dùng khi so sánh'],
    ['xác định điểm rơi từ dữ liệu mẫu/ẩn danh', 'kiểm tra khác biệt theo nhóm trước khi kết luận nguyên nhân'],
    ['thử nghiệm gắn trực tiếp điểm nghẽn và KPI', 'nêu chi phí, điều kiện dừng và cách đánh giá sau thử'],
    ['không đưa dữ liệu nhận dạng vào báo cáo', 'ghi giới hạn mẫu, sai lệch chọn mẫu và giả định']
  ],
  'practice-design-audit': [
    ['kiểm tra tương phản, bàn phím và nhãn trên một luồng', 'ghi rõ màn hình, công cụ và trường hợp chưa kiểm tra'],
    ['mỗi lỗi có vị trí và bước tái hiện', 'ảnh/ghi chú đủ để kỹ thuật kiểm chứng độc lập'],
    ['đề xuất sửa phục vụ người dùng bàn phím hoặc thị lực thấp', 'ưu tiên sửa theo tác động lên khả năng hoàn thành tác vụ'],
    ['báo cáo tách lỗi, bằng chứng và hướng sửa', 'người khác có thể tái kiểm tra sau khi giao diện thay đổi']
  ],
  'practice-design-research': [
    ['câu hỏi nghiên cứu bám tác vụ người dùng bỏ dở', 'câu phỏng vấn mở không dẫn tới câu trả lời có sẵn'],
    ['phương pháp và tiêu chí tuyển người có lý do', 'dự kiến cách xử lý khi quan sát trái giả thuyết'],
    ['biểu mẫu đồng ý và cách ẩn danh ghi chép được nêu', 'giới hạn thời gian lưu và quyền rút lui của người tham gia'],
    ['kế hoạch mã hóa ghi chép thành chủ đề insight', 'phân biệt câu nói cá nhân với mẫu lặp có bằng chứng']
  ],
  'practice-design-system': [
    ['token màu, chữ và khoảng cách có tên theo vai trò', 'quy tắc đặt tên tránh gắn cứng vào một màn hình'],
    ['component có trạng thái mặc định, hover, focus và lỗi', 'ví dụ cho cả web và di động dùng cùng nguyên tắc'],
    ['hai màn hình dùng cùng token và biến thể', 'ngoại lệ được ghi lý do thay vì tạo token trùng'],
    ['thư viện có cách dùng và ví dụ bàn giao', 'kỹ thuật có thể triển khai mà không phải đoán spacing hoặc trạng thái']
  ],
  'practice-dev-product-page': [
    ['chọn biến thể cập nhật đúng giá và tồn kho', 'không cho thêm hàng hết vào giỏ và có thông báo kết quả'],
    ['không tràn ngang ở 375px, ảnh và nút chính dễ chạm', 'bố cục vẫn rõ ở máy tính và ảnh không che nội dung'],
    ['ảnh có văn bản thay thế, nút có nhãn và focus rõ', 'hoàn thành chọn biến thể, thêm giỏ chỉ bằng bàn phím'],
    ['demo và README ghi cách chạy', 'người khác thử đủ trạng thái bằng dữ liệu mẫu']
  ],
  'practice-dev-auth-api': [
    ['chặn sửa/xem tài nguyên không thuộc người đăng nhập', 'ca thử chứng minh quyền ở cả đọc, sửa và xóa'],
    ['đăng nhập/đăng xuất và hết phiên có kết quả đúng', 'lỗi sai mật khẩu không tiết lộ tài khoản có tồn tại'],
    ['test sai mật khẩu, hết phiên và truy cập trái quyền', 'kết quả test tự động hoặc bước tái hiện độc lập'],
    ['endpoint, dữ liệu mẫu và biến môi trường được mô tả', 'người khác chạy thử mà không cần bí mật thật']
  ],
  'practice-dev-explore-data': [
    ['nguồn công khai, tác giả và giấy phép được dẫn', 'nêu giới hạn tái sử dụng hoặc tập con được chọn'],
    ['thống kê dữ liệu thiếu/trùng và cách xử lý', 'nêu thay đổi kết quả khi chọn cách xử lý khác'],
    ['hai biểu đồ có trục, đơn vị, nhãn nhóm', 'không dùng thang đo gây hiểu sai độ lớn'],
    ['kết luận trả lời câu hỏi bằng số liệu', 'phân biệt tương quan với nguyên nhân và nêu giới hạn']
  ],
  'practice-dev-demand-forecast': [
    ['tập train/test tách theo thời gian', 'kiểm tra feature không chứa dữ liệu sau thời điểm dự báo'],
    ['baseline mùa vụ hoặc giá trị trước đó được tính', 'mô hình chỉ được chọn khi tốt hơn baseline trên tập chưa thấy'],
    ['chỉ số sai số có công thức và kết quả theo giai đoạn', 'phân tích tuần dự báo sai lớn và tác động tồn kho'],
    ['mã, dữ liệu mẫu và khuyến nghị triển khai được ghi', 'nêu khi nào phải bỏ dự báo hoặc cập nhật mô hình']
  ],
  'practice-dev-session-audit': [
    ['đối tượng là ứng dụng mẫu hoặc nơi được cho phép', 'giới hạn kiểm thử và người chịu trách nhiệm được ghi'],
    ['cookie, logout và ba header có bảng kiểm kết quả', 'thử phiên cũ sau logout và ghi tác động của thiếu header'],
    ['bằng chứng trước/sau không lộ token hoặc dữ liệu cá nhân', 'mỗi phát hiện có bước tái hiện độc lập'],
    ['đề xuất sửa gắn với lỗi phiên/header', 'ca tái kiểm tra xác nhận bản sửa không phá luồng đăng nhập']
  ],
  'practice-mkt-social-calendar': [
    ['sản phẩm và nhóm khách hàng mục tiêu được xác định', 'nội dung giải quyết mục tiêu cụ thể của nhóm đó'],
    ['14 ngày có kênh, người làm và định dạng', 'khối lượng công việc phù hợp nguồn lực đã nêu'],
    ['mỗi bài có thông điệp và CTA phù hợp kênh', 'có biến thể thử nghiệm thay vì lặp một mẫu suốt hai tuần'],
    ['chỉ số tương tác hoặc hành động được định nghĩa', 'nêu khi nào sẽ điều chỉnh lịch theo kết quả']
  ],
  'practice-mkt-positioning': [
    ['ba đối thủ phục vụ cùng phân khúc', 'giải thích vì sao loại đối thủ không tương đương'],
    ['mỗi tiêu chí có nguồn và ngày thu thập', 'nguồn đối lập hoặc thông tin thiếu được chỉ ra'],
    ['bản đồ định vị có hai trục dễ hiểu', 'thông điệp đề xuất bám khoảng trống có bằng chứng'],
    ['quan sát được tách khỏi giả định', 'nêu cách thử thông điệp với khách hàng thật']
  ],
  'practice-mkt-ad-brief': [
    ['giả thuyết nêu điều muốn thay đổi và kết quả kỳ vọng', 'hai biến thể chỉ khác một yếu tố chính'],
    ['mẫu quảng cáo có tiêu đề, hình/ý tưởng và CTA', 'thông điệp khớp persona và đích đến'],
    ['ngân sách mô phỏng cộng đúng và đối tượng rõ', 'có cách phân phối để hai biến thể được so sánh công bằng'],
    ['KPI có công thức và điều kiện dừng', 'nêu rủi ro sai lệch mẫu và cách tránh kết luận sớm']
  ],
  'practice-mkt-email-onboarding': [
    ['ba email có thời điểm và mục tiêu khác nhau', 'quy tắc dừng chuỗi khi người dùng hoàn thành hành động'],
    ['tiêu đề, nội dung và CTA cho cả ba email', 'lời hứa trong tiêu đề khớp nội dung và giọng thương hiệu'],
    ['chỉ số mở/nhấp/hành động có cách đo', 'nêu giới hạn của tỷ lệ mở và ưu tiên hành động thực'],
    ['mỗi email có cách hủy đăng ký dễ thấy', 'nêu điều kiện đồng ý nhận và tránh gửi cho người đã từ chối']
  ],
  'practice-mkt-retention': [
    ['cohort và hành động quay lại có định nghĩa rõ', 'loại hoặc đánh dấu cohort chưa đủ thời gian quan sát'],
    ['bảng giữ chân theo tuần có mẫu số đúng', 'kiểm tra lại một cohort bằng tính toán thủ công'],
    ['đọc xu hướng mà không gán nguyên nhân khi thiếu thử nghiệm', 'phân biệt biến động do cỡ mẫu nhỏ'],
    ['hai giả thuyết gắn điểm rời bỏ', 'ưu tiên thử nghiệm theo tác động và khả năng đo']
  ],
  'practice-design-interview': [
    ['mục tiêu và người tham gia phù hợp tác vụ thanh toán', 'tiêu chí tuyển chọn tránh chỉ hỏi người dùng thuận tiện'],
    ['tám câu hỏi mở không gợi đáp án', 'có câu đào sâu về hành vi đã xảy ra thay vì ý định giả định'],
    ['lời mở đầu, câu chuyển chủ đề và kết thúc trong 20 phút', 'dành thời gian để người tham gia mô tả ví dụ cụ thể'],
    ['xin đồng ý và ghi chép ẩn danh', 'nêu quyền bỏ qua câu hỏi hoặc dừng phỏng vấn']
  ],
  'practice-design-checkout': [
    ['prototype đi từ kiểm tra đơn tới xác nhận', 'quay lại sửa địa chỉ không làm mất lựa chọn trước'],
    ['tổng tiền và phí xuất hiện trước nút đặt hàng', 'thay đổi phí được báo lại ngay khi địa chỉ đổi'],
    ['lỗi địa chỉ hiển thị cạnh trường liên quan', 'có hướng sửa cụ thể và giữ dữ liệu hợp lệ'],
    ['ít nhất bốn trạng thái bấm thử được', 'chú thích đủ để kỹ thuật hiểu logic phí và lỗi']
  ],
  'practice-design-accessible-form': [
    ['trường có nhãn, ví dụ và yêu cầu nhập rõ', 'thông tin không chỉ được truyền bằng màu'],
    ['thứ tự tab đi theo luồng đọc và focus thấy rõ', 'hoàn tất toàn bộ biểu mẫu không cần chuột'],
    ['lỗi gắn đúng trường và nói cách sửa', 'người dùng không mất dữ liệu đúng sau khi sửa lỗi'],
    ['bảng kiểm tương phản, nhãn và 320px có kết quả', 'prototype thể hiện trạng thái mặc định, focus và lỗi']
  ],
  'practice-design-tokens': [
    ['token đặt tên theo vai trò như màu hành động', 'có quy tắc phân biệt token nền với token thành phần'],
    ['hai màn hình và ba trạng thái nút dùng token', 'đổi một token cập nhật nhất quán cả hai màn hình'],
    ['bảng kiểm tương phản và ngữ cảnh nền/chữ', 'biến thể focus/lỗi vẫn phân biệt được không chỉ nhờ màu'],
    ['thư viện có cách áp dụng và ví dụ mã/thuộc tính', 'người nhận bàn giao không phải đoán khoảng cách hoặc màu']
  ],
  'practice-design-service-blueprint': [
    ['hành trình có quan sát từ sinh viên và nhân sự hỗ trợ', 'đánh dấu rõ bước nào chỉ là mô phỏng'],
    ['frontstage/backstage và trạng thái chờ được phân lớp', 'mỗi điểm tiếp xúc có người hoặc hệ thống chịu trách nhiệm'],
    ['điểm bàn giao có điều kiện và rủi ro chậm', 'nêu cách phát hiện yêu cầu bị kẹt và chuyển tiếp'],
    ['ba cải tiến có ưu tiên và chỉ số đo', 'nêu người phụ trách cùng cách kiểm tra sau triển khai']
  ]
};
