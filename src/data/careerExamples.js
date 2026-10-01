// A concrete sample assignment for each specialty. Each row is:
// request from the team, work at five levels, and a tangible sample output.
export const careerExamples = {
  dev: {
    frontend: [
      'Nhóm cần trang đăng ký dễ dùng trên điện thoại, kể cả khi mạng chậm.',
      ['Dựng biểu mẫu theo bản thiết kế có sẵn.', 'Tự làm biểu mẫu và báo lỗi khi nhập sai.', 'Phụ trách toàn bộ luồng đăng ký trên giao diện.', 'Xử lý mạng chậm, lỗi máy chủ và cách dùng bằng bàn phím.', 'Đặt mẫu giao diện và cách kiểm tra để cả nhóm cùng dùng.'],
      ['Màn biểu mẫu mẫu', 'Biểu mẫu có thể dùng thử', 'Luồng đăng ký có kiểm thử', 'Luồng đăng ký hoạt động ổn định', 'Bộ mẫu giao diện và hướng dẫn']
    ],
    backend: [
      'Ứng dụng cần lưu hồ sơ mà không để người này xem dữ liệu của người khác.',
      ['Viết một API đọc hồ sơ theo hướng dẫn.', 'Tự làm API tạo và sửa hồ sơ có kiểm tra dữ liệu.', 'Phụ trách API hồ sơ và kiểm tra quyền từng tài khoản.', 'Thiết kế cách xử lý lỗi và theo dõi truy cập.', 'Đặt quy ước API và phân quyền cho nhiều nhóm.'],
      ['API đọc hồ sơ mẫu', 'API tạo và sửa hồ sơ', 'Bộ API có kiểm thử phân quyền', 'Thiết kế API và cách xử lý lỗi', 'Tài liệu API và quy tắc phân quyền']
    ],
    fullstack: [
      'Một phòng tư vấn muốn khách đặt lịch trực tuyến mà không bị trùng giờ.',
      ['Dựng màn chọn giờ từ dữ liệu mẫu.', 'Tự làm luồng tạo và xem lịch hẹn.', 'Làm màn chọn giờ, API kiểm tra giờ trống, lưu lịch và thử hai người đặt cùng lúc.', 'Xử lý khi nhiều người cùng chọn một giờ.', 'Chia việc và thống nhất cách các nhóm phát triển hệ thống đặt lịch.'],
      ['Màn chọn giờ mẫu', 'Bản demo tạo lịch hẹn', 'Luồng đặt lịch có kiểm thử', 'Phương án chống trùng lịch', 'Tài liệu và quy ước hệ thống đặt lịch']
    ],
    mobile: [
      'Ứng dụng học tập cần giữ câu trả lời khi sinh viên chuyển sang ứng dụng khác.',
      ['Dựng màn trả lời câu hỏi trên điện thoại.', 'Tự lưu câu trả lời khi rời màn hình.', 'Phụ trách luồng làm bài và khôi phục bài dở dang.', 'Xử lý mất mạng và kiểm tra trên nhiều thiết bị.', 'Đặt cách lưu bài và kiểm thử cho cả ứng dụng.'],
      ['Màn trả lời mẫu', 'Bản demo tự lưu', 'Luồng làm bài có thể khôi phục', 'Bản kiểm thử khi mất mạng', 'Hướng dẫn lưu bài và kiểm thử thiết bị']
    ],
    devops: [
      'Nhóm muốn đưa bản cập nhật lên web, phát hiện lỗi và quay lại bản cũ khi cần.',
      ['Thêm một bước kiểm tra tự động theo hướng dẫn.', 'Tạo quy trình kiểm tra rồi triển khai bản thử.', 'Phụ trách phát hành và cảnh báo khi có lỗi.', 'Thiết kế cách quay lui và theo dõi hệ thống.', 'Thống nhất cách phát hành và xử lý sự cố cho nhiều nhóm.'],
      ['Bước kiểm tra tự động', 'Quy trình triển khai bản thử', 'Quy trình phát hành có cảnh báo', 'Kế hoạch quay lui đã thử nghiệm', 'Tài liệu phát hành và xử lý sự cố']
    ],
    ai: [
      'Nhóm muốn phát hiện sinh viên có nguy cơ bỏ dở khóa học từ dữ liệu học tập.',
      ['Làm sạch một bảng dữ liệu theo hướng dẫn.', 'Tạo báo cáo và thử một mô hình đơn giản.', 'Phụ trách dữ liệu và cách đánh giá dự đoán.', 'Tìm trường hợp dự đoán sai và cách cải thiện.', 'Đặt quy tắc dùng dữ liệu và đánh giá mô hình cho cả nhóm.'],
      ['Bảng dữ liệu đã làm sạch', 'Báo cáo và mô hình thử', 'Báo cáo đánh giá mô hình', 'Phân tích lỗi dự đoán', 'Quy trình dữ liệu và đánh giá mô hình']
    ],
    architecture: [
      'Nhiều nhóm cùng sửa hệ thống đơn hàng và thường làm hỏng phần việc của nhau.',
      ['Vẽ sơ đồ các phần của hệ thống hiện tại.', 'Tách một phần xử lý đơn hàng theo hướng dẫn.', 'Đề xuất ranh giới giữa các phần và cách trao đổi dữ liệu.', 'Lập kế hoạch chuyển đổi mà không gián đoạn đơn hàng.', 'Thống nhất kiến trúc và trách nhiệm của các nhóm.'],
      ['Sơ đồ hệ thống hiện tại', 'Bản thiết kế phần xử lý đơn hàng', 'Sơ đồ các phần và cách kết nối', 'Kế hoạch chuyển đổi có bước quay lui', 'Tài liệu kiến trúc dùng chung']
    ]
  },
  mkt: {
    content: [
      'Một khóa học mới cần nội dung giúp người học biết chương trình có phù hợp với mình không.',
      ['Viết một bài giới thiệu theo dàn ý có sẵn.', 'Tự lên và viết nhóm bài cho một kênh.', 'Phụ trách kế hoạch nội dung từ câu hỏi của người đọc đến bài đăng.', 'Đổi chủ đề khi người đọc quan tâm ít hơn dự kiến.', 'Đặt cách lập kế hoạch và đánh giá nội dung cho cả nhóm.'],
      ['Bài giới thiệu khóa học', 'Bộ bài đăng cho một kênh', 'Lịch nội dung và các bài mẫu', 'Kế hoạch nội dung đã điều chỉnh', 'Hướng dẫn biên tập và đo hiệu quả']
    ],
    seo: [
      'Người học tìm khóa học trên Google nhưng chưa thấy trang trả lời đúng câu hỏi của họ.',
      ['Tìm những câu hỏi người học thường gõ để tìm kiếm.', 'Viết và chỉnh một trang trả lời nhóm câu hỏi đó.', 'Phụ trách nhóm trang nội dung và đo lượt truy cập từ tìm kiếm.', 'Tìm nguyên nhân trang khó được tìm thấy rồi ưu tiên sửa.', 'Lập kế hoạch nội dung tìm kiếm cho nhiều nhóm sản phẩm.'],
      ['Danh sách câu hỏi tìm kiếm', 'Trang nội dung đã chỉnh', 'Nhóm trang và báo cáo đo lường', 'Bản kiểm tra lỗi và kế hoạch sửa', 'Kế hoạch nội dung tìm kiếm chung']
    ],
    performance: [
      'Một khóa học có ngân sách quảng cáo giới hạn; nhóm cần biết mẫu nào đưa đúng người đến trang đăng ký.',
      ['Chuẩn bị mẫu quảng cáo và đường dẫn để đo kết quả.', 'Chạy thử một nhóm quảng cáo với ngân sách nhỏ.', 'Theo dõi mẫu nào đem lại đăng ký, dừng mẫu kém và chuyển ngân sách.', 'So sánh nhiều kênh và xử lý số liệu đo lường sai.', 'Đặt quy tắc ngân sách và báo cáo cho nhiều chiến dịch.'],
      ['Mẫu quảng cáo và bảng theo dõi', 'Kế hoạch và kết quả chạy thử', 'Báo cáo chiến dịch và thay đổi đã thử', 'Kế hoạch phân bổ ngân sách', 'Quy trình quảng cáo và báo cáo chung']
    ],
    social: [
      'Thương hiệu muốn trả lời thắc mắc của người mua và đăng bài đều trên mạng xã hội.',
      ['Soạn một bài đăng theo chủ đề có sẵn.', 'Lên lịch và trả lời bình luận cho một kênh.', 'Phụ trách lịch đăng và phản hồi của cộng đồng.', 'Xử lý chủ đề gây tranh cãi và chỉnh nội dung theo phản hồi.', 'Đặt cách vận hành các kênh và xử lý phản hồi.'],
      ['Bài đăng mẫu', 'Lịch đăng của một kênh', 'Lịch nội dung và báo cáo phản hồi', 'Phương án xử lý tình huống', 'Hướng dẫn vận hành cộng đồng']
    ],
    brand: [
      'Sản phẩm mới được giới thiệu mỗi nơi một kiểu; khách hàng khó nhớ sản phẩm dành cho ai.',
      ['Thu thập cách thương hiệu đang tự giới thiệu.', 'Viết thử thông điệp cho một nhóm khách hàng.', 'Phụ trách thông điệp chính và cách dùng trên các kênh.', 'Kiểm tra thông điệp bằng phản hồi của khách hàng.', 'Đặt hướng dẫn thương hiệu để các nhóm dùng nhất quán.'],
      ['Bảng tổng hợp thông điệp hiện có', 'Bộ thông điệp thử', 'Thông điệp và ví dụ áp dụng', 'Báo cáo thử thông điệp', 'Hướng dẫn thương hiệu chung']
    ],
    growth: [
      'Nhiều người đăng ký ứng dụng nhưng rời đi trước khi dùng tính năng đầu tiên.',
      ['Vẽ các bước từ đăng ký đến lần dùng đầu.', 'Tìm bước có nhiều người rời đi.', 'Thử một thay đổi để tăng số người dùng được tính năng.', 'Ưu tiên nhiều thử nghiệm và kiểm tra tác dụng của chúng.', 'Đặt quy trình thử nghiệm tăng trưởng cho cả nhóm.'],
      ['Sơ đồ các bước đăng ký', 'Báo cáo điểm rời đi', 'Kết quả một thử nghiệm', 'Kế hoạch thử nghiệm và cách đo', 'Quy trình và bảng theo dõi thử nghiệm']
    ],
    crm: [
      'Người mới đăng ký và người sắp hết hạn đang nhận cùng một email dù cần thông tin khác nhau.',
      ['Viết email hướng dẫn người mới.', 'Tạo chuỗi email cho một nhóm người dùng.', 'Phân nhóm và chọn thời điểm gửi từng thông điệp.', 'Kiểm tra việc gửi sai nhóm và chỉnh chuỗi chăm sóc.', 'Đặt quy tắc chăm sóc và bảo vệ dữ liệu khách hàng.'],
      ['Email hướng dẫn mẫu', 'Chuỗi email cho một nhóm', 'Sơ đồ gửi email theo từng nhóm', 'Bản kiểm tra và sửa lỗi gửi', 'Hướng dẫn chăm sóc khách hàng']
    ],
    research: [
      'Nhóm muốn mở khóa học mới nhưng chưa biết người học thực sự cần kỹ năng nào.',
      ['Tổng hợp những câu hỏi người học đã gửi.', 'Soạn khảo sát và phỏng vấn một nhóm nhỏ.', 'Nghiên cứu và tách ý kiến cá nhân khỏi nhu cầu lặp lại.', 'Kiểm tra kết luận với nhóm người học khác.', 'Đặt cách nghiên cứu để nhiều nhóm cùng ra quyết định.'],
      ['Bảng tổng hợp câu hỏi', 'Bộ câu hỏi và ghi chép ẩn danh', 'Báo cáo nhu cầu người học', 'Kết luận đã được kiểm tra lại', 'Hướng dẫn nghiên cứu và lưu dữ liệu']
    ]
  },
  design: {
    ui: [
      'Trang thanh toán khó đọc trên điện thoại; người dùng không biết nút xác nhận ở đâu.',
      ['Sắp xếp lại một màn hình theo bản thiết kế có sẵn.', 'Thiết kế màn thanh toán cho điện thoại.', 'Phụ trách các màn thanh toán và trạng thái thành công, thất bại.', 'Kiểm tra độ dễ đọc và cách dùng bằng bàn phím.', 'Đặt bộ mẫu giao diện để cả nhóm dùng nhất quán.'],
      ['Màn thanh toán mẫu', 'Bản thiết kế màn thanh toán', 'Bộ màn hình và trạng thái', 'Thiết kế đã kiểm tra khả năng sử dụng', 'Bộ mẫu giao diện và hướng dẫn']
    ],
    ux: [
      'Nhiều người bỏ dở khi đặt lịch vì không biết bước tiếp theo hoặc giờ nào còn trống.',
      ['Vẽ các bước đặt lịch từ yêu cầu có sẵn.', 'Thiết kế lại bước khiến người dùng dừng lại.', 'Quan sát người dùng đặt lịch, sửa bước chọn giờ rồi thử lại bản mẫu.', 'Ưu tiên điểm vướng khi luồng đặt lịch liên quan nhiều nhóm.', 'Đặt cách nhóm nghiên cứu và kiểm tra trải nghiệm thường xuyên.'],
      ['Sơ đồ các bước đặt lịch', 'Bản mẫu có thể bấm thử', 'Bản mẫu và ghi chép kiểm tra', 'Kế hoạch sửa các điểm vướng', 'Hướng dẫn nghiên cứu và kiểm tra trải nghiệm']
    ],
    product: [
      'Ứng dụng muốn nhắc lịch nhưng chưa rõ người dùng cần được nhắc khi nào.',
      ['Vẽ một màn nhắc lịch theo yêu cầu có sẵn.', 'Làm bản mẫu cho một tình huống nhắc lịch.', 'Tìm nhu cầu, thiết kế và thử chức năng nhắc lịch.', 'Xử lý tình huống thông báo gây phiền.', 'Đặt nguyên tắc thiết kế thông báo cho nhiều tính năng.'],
      ['Màn nhắc lịch mẫu', 'Bản mẫu có thể bấm thử', 'Bản thiết kế và kết quả thử', 'Phương án thông báo đã điều chỉnh', 'Hướng dẫn thiết kế thông báo']
    ],
    graphic: [
      'Một sự kiện cần poster dùng được cả trên mạng xã hội lẫn bản in.',
      ['Dàn trang poster theo nội dung có sẵn.', 'Thiết kế poster cho một kích thước.', 'Phụ trách bộ poster cho nhiều kênh và kiểm tra chữ, hình.', 'Đổi thiết kế khi nội dung thay sát ngày nhưng vẫn giữ nhất quán.', 'Đặt quy cách file và cách duyệt ấn phẩm cho cả nhóm.'],
      ['Poster mẫu', 'Poster hoàn chỉnh', 'Bộ poster cho nhiều kênh', 'Bộ poster đã cập nhật', 'Quy cách file và mẫu ấn phẩm']
    ],
    motion: [
      'Ứng dụng cần báo bài đã được lưu, thay vì để người dùng bấm lại nhiều lần.',
      ['Làm một chuyển động xác nhận theo mẫu.', 'Thiết kế chuyển động sau khi lưu bài.', 'Phụ trách trạng thái lưu, chờ và lỗi bằng chuyển động rõ ràng.', 'Kiểm tra chuyển động có gây khó chịu hoặc chậm thao tác không.', 'Đặt quy tắc chuyển động để các màn dùng thống nhất.'],
      ['Chuyển động xác nhận mẫu', 'Video minh họa thao tác lưu', 'Bộ chuyển động cho các trạng thái', 'Bộ chuyển động đã kiểm tra', 'Hướng dẫn chuyển động cho sản phẩm']
    ],
    brand: [
      'Thương hiệu mới cần hình ảnh nhận ra được trên bao bì, website và bài đăng.',
      ['Thu thập hình ảnh tham khảo theo brief.', 'Thiết kế thử một hướng logo và màu.', 'Phụ trách bộ nhận diện trên ba điểm chạm.', 'Kiểm tra logo và màu khi dùng nhỏ hoặc trên nền khác.', 'Đặt hướng dẫn dùng nhận diện cho nhiều nhóm.'],
      ['Bảng hình ảnh tham khảo', 'Phương án logo và màu', 'Bộ nhận diện cơ bản', 'Bộ nhận diện đã kiểm tra nhiều bối cảnh', 'Hướng dẫn dùng nhận diện thương hiệu']
    ],
    research: [
      'Nhóm không biết vì sao người dùng dừng ở bước tải hồ sơ.',
      ['Soạn câu hỏi quan sát theo hướng dẫn.', 'Quan sát một nhóm nhỏ dùng màn tải hồ sơ.', 'Nghiên cứu và tổng hợp nguyên nhân người dùng dừng lại.', 'Kiểm tra nguyên nhân có lặp lại ở nhóm người dùng khác.', 'Đặt cách nghiên cứu và chia sẻ kết quả cho các nhóm sản phẩm.'],
      ['Bộ câu hỏi quan sát', 'Ghi chép quan sát ẩn danh', 'Báo cáo nguyên nhân và ví dụ', 'Kết quả đã kiểm tra với nhóm khác', 'Hướng dẫn nghiên cứu người dùng']
    ]
  }
};

// Three things the learner actually uses in the assignment above.
export const careerSkillsByTrack = {
  dev: {
    frontend: ['Dựng biểu mẫu rõ ràng trên điện thoại', 'Báo lỗi nhập liệu bằng lời dễ hiểu', 'Kiểm tra khi mạng chậm và khi dùng bàn phím'],
    backend: ['Kiểm tra dữ liệu trước khi lưu', 'Chỉ cho chủ tài khoản xem hồ sơ của mình', 'Thử trường hợp không có quyền truy cập'],
    fullstack: ['Làm màn chọn giờ và báo giờ không còn trống', 'Viết API kiểm tra giờ trống trước khi lưu', 'Thử hai người cùng đặt một giờ'],
    mobile: ['Lưu câu trả lời trước khi rời màn hình', 'Khôi phục bài đang làm khi mở lại ứng dụng', 'Thử khi điện thoại mất mạng'],
    devops: ['Tự động kiểm tra trước khi phát hành', 'Nhận biết bản cập nhật bị lỗi', 'Quay về bản cũ khi cần'],
    ai: ['Làm sạch dữ liệu học tập', 'Đo mô hình dự đoán đúng và sai ở đâu', 'Giải thích giới hạn của kết quả'],
    architecture: ['Vẽ các phần của hệ thống đơn hàng', 'Xác định phần việc của từng nhóm', 'Lập các bước chuyển đổi an toàn']
  },
  mkt: {
    content: ['Tìm câu hỏi thật của người học', 'Viết bài trả lời ngắn và rõ', 'Kiểm tra bài có giúp người đọc quyết định không'],
    seo: ['Tìm câu hỏi người học gõ trên Google', 'Viết trang trả lời đúng câu hỏi', 'Theo dõi trang có được tìm thấy không'],
    performance: ['Gắn đường dẫn để biết người đăng ký đến từ mẫu nào', 'So sánh chi phí với số lượt đăng ký', 'Dừng mẫu kém và thử lại với ngân sách còn lại'],
    social: ['Lên lịch bài cho một kênh', 'Trả lời câu hỏi thường gặp', 'Chỉnh nội dung theo phản hồi của người theo dõi'],
    brand: ['Nói rõ sản phẩm dành cho ai', 'Viết một thông điệp dùng được ở nhiều nơi', 'Kiểm tra khách hàng có hiểu đúng không'],
    growth: ['Nhìn ra bước người dùng thường bỏ dở', 'Đề xuất một thay đổi nhỏ', 'Đo xem thay đổi có giúp nhiều người hoàn tất hơn không'],
    crm: ['Chia người nhận theo nhu cầu', 'Viết email cho từng giai đoạn', 'Kiểm tra không gửi sai người hoặc gửi quá nhiều'],
    research: ['Hỏi người học bằng câu không dẫn dắt', 'Ghi lại câu trả lời ẩn danh', 'Tách điều nhiều người cùng nói khỏi ý kiến riêng']
  },
  design: {
    ui: ['Sắp xếp thông tin để nút xác nhận dễ thấy', 'Thiết kế trạng thái lỗi và thành công', 'Kiểm tra chữ và nút trên điện thoại'],
    ux: ['Quan sát người dùng chọn giờ', 'Vẽ lại bước khiến họ dừng', 'Cho người dùng thử bản mẫu mới'],
    product: ['Hỏi khi nào người dùng cần được nhắc', 'Làm bản mẫu thông báo có thể bấm thử', 'Kiểm tra thông báo có gây phiền không'],
    graphic: ['Sắp xếp chữ và hình trên poster', 'Xuất file đúng kích thước cho từng kênh', 'Kiểm tra chữ còn đọc được khi thu nhỏ'],
    motion: ['Cho người dùng biết bài đang lưu hay đã lưu', 'Giữ chuyển động ngắn và dễ hiểu', 'Cung cấp cách giảm chuyển động khi cần'],
    brand: ['Tạo logo và màu dễ nhận ra', 'Thử trên bao bì, web và bài đăng', 'Kiểm tra ở kích thước nhỏ và nhiều nền'],
    research: ['Quan sát người dùng tải hồ sơ', 'Ghi nhận chỗ họ dừng lại', 'Kiểm tra nguyên nhân với nhóm người dùng khác']
  }
};

export const careerLevelHeadings = [
  'Mới bắt đầu', 'Tự làm một đầu việc', 'Phụ trách một phần việc',
  'Giải quyết việc phức tạp', 'Dẫn dắt cả nhóm'
];

export const careerLevelDescriptions = [
  'Bạn làm một phần nhỏ với hướng dẫn và được góp ý thường xuyên.',
  'Bạn tự hoàn thành một việc có phạm vi rõ, rồi nhờ người khác kiểm tra.',
  'Bạn theo việc từ lúc nhận yêu cầu đến khi bàn giao và tự kiểm tra kết quả.',
  'Bạn xử lý những trường hợp khó và giúp người khác chọn cách làm phù hợp.',
  'Bạn định hướng công việc chung, phân chia trách nhiệm và hỗ trợ cả nhóm.'
];
