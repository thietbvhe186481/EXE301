// Occupational overviews for exploration, not job ads or promises about any employer.
// Sources are attached only where the referenced occupational family is applicable.
const sources = {
  web: { label: 'O*NET · Web Developers', url: 'https://www.onetonline.org/link/summary/15-1254.00' },
  software: { label: 'O*NET · Software Developers', url: 'https://www.onetonline.org/link/summary/15-1252.00' },
  search: { label: 'O*NET · Search Marketing Strategists', url: 'https://www.onetonline.org/link/summary/13-1161.01' },
  interface: { label: 'O*NET · Web and Digital Interface Designers', url: 'https://www.onetonline.org/link/summary/15-1255.00' },
  market: { label: 'O*NET · Market Research Analysts', url: 'https://www.onetonline.org/link/summary/13-1161.00' },
  pr: { label: 'O*NET · Public Relations Specialists', url: 'https://www.onetonline.org/link/details/27-3031.00' },
  graphic: { label: 'O*NET · Graphic Designers', url: 'https://www.onetonline.org/link/custom/27-1024.00' }
};

// Scope grows with autonomy. It does not prescribe a fixed number of years or an
// identical job description across organisations.
const scopes = [
  'Thực hiện phần việc được giao theo hướng dẫn, kiểm tra kết quả và nhận góp ý.',
  'Tự hoàn thành một đầu việc có phạm vi rõ, phối hợp khi gặp phụ thuộc.',
  'Phụ trách một mảng hoặc luồng từ yêu cầu đến bàn giao và theo dõi chất lượng.',
  'Giải quyết vấn đề phức tạp, cân nhắc rủi ro và hướng dẫn đồng nghiệp.',
  'Định hướng chuyên môn, thống nhất tiêu chuẩn và hỗ trợ nhiều người hoặc nhóm cùng làm việc.'
];

// Short headings follow each specialization's first three responsibilities.
const workAreas = {
  dev: {
    frontend: ['Giao diện sản phẩm', 'Luồng tương tác & API', 'Kiểm thử & tiếp cận'],
    backend: ['Dịch vụ & API', 'Dữ liệu & phân quyền', 'Vận hành dịch vụ'],
    fullstack: ['Hành trình người dùng', 'Giao diện đến dữ liệu', 'Kiểm thử tích hợp'],
    mobile: ['Màn hình & điều hướng', 'Kết nối & lưu trữ', 'Kiểm thử thiết bị'],
    devops: ['Quy trình triển khai', 'Giám sát & sự cố', 'Cấu hình & bảo mật'],
    ai: ['Bài toán & dữ liệu', 'Mô hình & tích hợp', 'Đánh giá rủi ro'],
    architecture: ['Yêu cầu & ràng buộc', 'Thiết kế thành phần', 'Đánh giá đánh đổi']
  },
  mkt: {
    content: ['Người đọc & chủ đề', 'Sản xuất nội dung', 'Biên tập & độ chính xác'],
    seo: ['Nhu cầu tìm kiếm', 'Cấu trúc & nội dung', 'Triển khai liên nhóm'],
    performance: ['Mục tiêu & ngân sách', 'Thiết lập chiến dịch', 'Thử nghiệm & tối ưu'],
    social: ['Nội dung theo kênh', 'Đối thoại cộng đồng', 'Xử lý tình huống'],
    brand: ['Khách hàng & định vị', 'Thông điệp thương hiệu', 'Triển khai nhất quán'],
    growth: ['Hành trình người dùng', 'Giả thuyết & thử nghiệm', 'Triển khai liên nhóm'],
    crm: ['Phân nhóm người dùng', 'Chuỗi chăm sóc', 'Quyền nhận tin'],
    research: ['Câu hỏi nghiên cứu', 'Thu thập dữ liệu', 'Phân tích bằng chứng']
  },
  design: {
    ui: ['Giao diện & tương tác', 'Trạng thái sử dụng', 'Hệ thống thành phần'],
    ux: ['Người dùng & bối cảnh', 'Luồng & bản mẫu', 'Kiểm tra thực tế'],
    product: ['Vấn đề sản phẩm', 'Phương án thiết kế', 'Phối hợp triển khai'],
    graphic: ['Brief & đối tượng', 'Phương án thị giác', 'Tệp in & kỹ thuật số'],
    motion: ['Mục đích chuyển động', 'Storyboard & bản mẫu', 'Khả năng tiếp cận'],
    brand: ['Định vị & đối tượng', 'Nhận diện thị giác', 'Ứng dụng đa kênh'],
    research: ['Câu hỏi & phương pháp', 'Người tham gia & quan sát', 'Phân tích phát hiện']
  }
};

export const careerRoleProfiles = {
  dev: {
    frontend: {
      summary: 'Phát triển giao diện web để người dùng hoàn thành công việc trên nhiều thiết bị, với trải nghiệm dễ hiểu, dễ tiếp cận và ổn định.',
      responsibilities: ['Chuyển yêu cầu sản phẩm và thiết kế thành giao diện có thể sử dụng.', 'Xử lý trạng thái tải, lỗi, nhập liệu và kết nối API với hệ thống.', 'Kiểm thử khả năng sử dụng, hiệu năng, trình duyệt và khả năng tiếp cận.', 'Phối hợp với thiết kế, sản phẩm và backend để phát hành và cải thiện tính năng.'],
      skills: ['HTML, CSS, JavaScript và framework giao diện phù hợp', 'Thiết kế đáp ứng, accessibility và hiệu năng web', 'Kiểm thử, đọc lỗi và làm việc với API'],
      lead: ['Định hướng kiến trúc frontend và cách sử dụng design system cho các nhóm.', 'Thiết lập tiêu chuẩn chất lượng, hiệu năng và khả năng tiếp cận; review code và hỗ trợ đồng đội.', 'Lập kế hoạch kỹ thuật, phối hợp với product, design và backend để giảm phụ thuộc, rủi ro.'],
      source: sources.web
    },
    backend: {
      summary: 'Xây dựng dịch vụ và xử lý dữ liệu phía máy chủ để ứng dụng hoạt động đúng, an toàn và có thể mở rộng.',
      responsibilities: ['Thiết kế, triển khai và kiểm thử API theo yêu cầu nghiệp vụ.', 'Quản lý dữ liệu, quyền truy cập, xác thực và lỗi.', 'Theo dõi hiệu năng, tính ổn định và xử lý sự cố dịch vụ.', 'Phối hợp với frontend và vận hành về giao diện dữ liệu và triển khai.'],
      skills: ['Ngôn ngữ máy chủ, API và cấu trúc dữ liệu', 'Cơ sở dữ liệu, bảo mật ứng dụng và kiểm thử', 'Quan sát hệ thống và xử lý lỗi'],
      source: sources.software
    },
    fullstack: {
      summary: 'Phát triển tính năng xuyên suốt từ giao diện đến API, dữ liệu và vận hành, giữ các phần hoạt động nhất quán.',
      responsibilities: ['Làm rõ hành trình người dùng và luồng dữ liệu của tính năng.', 'Xây dựng giao diện, dịch vụ và lưu trữ phù hợp.', 'Kiểm thử tích hợp, phân quyền và các trường hợp lỗi.', 'Phối hợp triển khai, theo dõi và cải tiến sau phát hành.'],
      skills: ['Giao diện web và API', 'Mô hình dữ liệu, xác thực và bảo mật', 'Kiểm thử tích hợp và triển khai'],
      source: sources.web
    },
    mobile: {
      summary: 'Phát triển ứng dụng trên điện thoại với thao tác phù hợp thiết bị, kết nối mạng thay đổi và vòng đời ứng dụng.',
      responsibilities: ['Thiết kế và xây dựng màn hình, điều hướng, trạng thái ứng dụng.', 'Tích hợp API, lưu trữ cục bộ và xử lý mất kết nối.', 'Kiểm thử trên thiết bị, phiên bản hệ điều hành và mức hiệu năng khác nhau.', 'Theo dõi lỗi, phát hành và cải thiện trải nghiệm sau sử dụng.'],
      skills: ['Nền tảng hoặc framework mobile', 'Vòng đời ứng dụng, lưu cục bộ và đồng bộ', 'Kiểm thử thiết bị và tối ưu hiệu năng'],
      source: sources.software
    },
    devops: {
      summary: 'Xây dựng và vận hành quy trình đưa phần mềm từ mã nguồn đến môi trường sử dụng một cách an toàn, lặp lại được.',
      responsibilities: ['Tự động hóa kiểm tra, đóng gói và triển khai.', 'Giám sát dịch vụ, cảnh báo và hỗ trợ xử lý sự cố.', 'Quản lý cấu hình, quyền truy cập và sao lưu.', 'Phối hợp với nhóm phát triển để cải thiện độ tin cậy và khả năng khôi phục.'],
      skills: ['CI/CD, hạ tầng và container', 'Quan sát hệ thống, log và cảnh báo', 'Bảo mật vận hành và ứng phó sự cố'],
      source: null
    },
    ai: {
      summary: 'Xử lý dữ liệu, xây dựng và đánh giá mô hình để hỗ trợ quyết định hoặc tự động hóa một nhiệm vụ có thể đo lường.',
      responsibilities: ['Làm rõ bài toán, chất lượng dữ liệu và thước đo kết quả.', 'Chuẩn bị dữ liệu, huấn luyện hoặc tích hợp mô hình.', 'Đánh giá sai lệch, giới hạn, rủi ro và khả năng giải thích.', 'Theo dõi chất lượng sau triển khai và cải thiện khi dữ liệu thay đổi.'],
      skills: ['Python, xử lý dữ liệu và thống kê', 'Đánh giá mô hình và thiết kế thử nghiệm', 'Quyền riêng tư, đạo đức và giám sát mô hình'],
      source: null
    },
    architecture: {
      summary: 'Thiết kế cấu trúc hệ thống phần mềm, ranh giới giữa các thành phần và cách phát triển chúng theo mục tiêu sản phẩm.',
      responsibilities: ['Phân tích yêu cầu chức năng, phi chức năng và các ràng buộc.', 'Đề xuất cách phân chia thành phần, dữ liệu và giao tiếp.', 'Đánh giá đánh đổi về bảo mật, hiệu năng, độ tin cậy và chi phí.', 'Ghi lại quyết định kiến trúc và hỗ trợ nhóm triển khai, chuyển đổi.'],
      skills: ['Thiết kế hệ thống và mô hình dữ liệu', 'Đánh giá kiến trúc, rủi ro và đánh đổi', 'Giao tiếp kỹ thuật và dẫn dắt quyết định'],
      source: sources.software
    }
  },
  mkt: {
    content: {
      summary: 'Lên kế hoạch và sản xuất nội dung giúp đúng nhóm người đọc hiểu sản phẩm, giải đáp nhu cầu và đưa ra quyết định.',
      responsibilities: ['Nghiên cứu người đọc, mục tiêu nội dung và chủ đề ưu tiên.', 'Viết, biên tập và phân phối nội dung trên kênh phù hợp.', 'Giữ giọng điệu nhất quán và kiểm tra tính chính xác của thông tin.', 'Theo dõi tương tác hoặc chuyển đổi để cải thiện nội dung.'],
      skills: ['Nghiên cứu đối tượng và viết nội dung', 'Biên tập, lịch xuất bản và phân phối', 'Đo lường hiệu quả nội dung'],
      source: null
    },
    seo: {
      summary: 'Cải thiện khả năng được tìm thấy trên công cụ tìm kiếm bằng nội dung hữu ích, cấu trúc trang phù hợp và đo lường.',
      responsibilities: ['Nghiên cứu nhu cầu tìm kiếm và đánh giá nội dung hiện có.', 'Đề xuất cấu trúc, nội dung và các cải thiện kỹ thuật cho trang.', 'Phối hợp với biên tập và kỹ thuật để triển khai thay đổi.', 'Theo dõi khả năng hiển thị, lưu lượng và kết quả kinh doanh.'],
      skills: ['Ý định tìm kiếm và nghiên cứu chủ đề', 'SEO on-page, kỹ thuật và cấu trúc website', 'Đo lường và phân tích dữ liệu tìm kiếm'],
      source: sources.search
    },
    performance: {
      summary: 'Quản lý chiến dịch quảng cáo có trả phí để tiếp cận đúng người, kiểm soát ngân sách và cải thiện hiệu quả.',
      responsibilities: ['Xác định mục tiêu, đối tượng và ngân sách chiến dịch.', 'Thiết lập nội dung, kênh quảng cáo và theo dõi chuyển đổi.', 'Đọc dữ liệu để thử nghiệm và điều chỉnh phân bổ ngân sách.', 'Báo cáo kết quả cùng giới hạn đo lường một cách minh bạch.'],
      skills: ['Lập kế hoạch quảng cáo và ngân sách', 'Đo lường chuyển đổi và phân tích dữ liệu', 'Thử nghiệm thông điệp và tối ưu chiến dịch'],
      source: sources.search
    },
    social: {
      summary: 'Vận hành kênh mạng xã hội để truyền tải thông điệp, lắng nghe cộng đồng và duy trì tương tác có trách nhiệm.',
      responsibilities: ['Lập lịch và biên tập nội dung phù hợp từng kênh.', 'Theo dõi thảo luận và phản hồi câu hỏi của cộng đồng.', 'Phối hợp xử lý vấn đề nhạy cảm hoặc khủng hoảng truyền thông.', 'Đo tương tác và điều chỉnh nội dung theo mục tiêu.'],
      skills: ['Nội dung và quy tắc từng nền tảng', 'Quản lý cộng đồng và xử lý phản hồi', 'Đo lường tương tác và báo cáo'],
      source: sources.pr
    },
    brand: {
      summary: 'Xác định và duy trì cách thương hiệu được nhận biết qua thông điệp, hình ảnh và trải nghiệm trên nhiều điểm chạm.',
      responsibilities: ['Nghiên cứu khách hàng, thị trường và định vị thương hiệu.', 'Xây dựng thông điệp và hướng dẫn sử dụng nhất quán.', 'Phối hợp với nội dung, thiết kế và sản phẩm để triển khai.', 'Theo dõi mức độ nhận biết và điều chỉnh khi cần.'],
      skills: ['Nghiên cứu khách hàng và định vị', 'Thông điệp và quản trị thương hiệu', 'Phối hợp đa kênh và đánh giá nhận biết'],
      source: null
    },
    growth: {
      summary: 'Tìm điểm nghẽn trong hành trình người dùng, thử nghiệm cải tiến và đo tác động đến việc sử dụng sản phẩm.',
      responsibilities: ['Phân tích các bước từ tiếp cận đến sử dụng và quay lại.', 'Đề xuất giả thuyết, thiết kế thử nghiệm có thước đo.', 'Phối hợp với sản phẩm, kỹ thuật và marketing để triển khai.', 'Phân tích kết quả, tránh kết luận vội từ mẫu dữ liệu nhỏ.'],
      skills: ['Phân tích hành trình và dữ liệu sản phẩm', 'Thiết kế thử nghiệm và đo lường', 'Ưu tiên cơ hội tăng trưởng'],
      source: null
    },
    crm: {
      summary: 'Xây dựng cách chăm sóc khách hàng phù hợp từng giai đoạn, trên cơ sở dữ liệu có đồng ý và bảo vệ quyền riêng tư.',
      responsibilities: ['Phân nhóm người dùng theo nhu cầu và hành vi được phép sử dụng.', 'Thiết kế thông điệp, chuỗi chăm sóc và thời điểm liên hệ.', 'Kiểm soát tần suất, nội dung và quyền từ chối nhận tin.', 'Đo mức độ phù hợp và cải thiện hành trình chăm sóc.'],
      skills: ['Phân khúc và hành trình khách hàng', 'Email/CRM automation và nội dung', 'Quyền riêng tư và đo lường duy trì'],
      source: null
    },
    research: {
      summary: 'Nghiên cứu khách hàng và thị trường để cung cấp bằng chứng cho quyết định về sản phẩm, định vị hoặc kênh tiếp cận.',
      responsibilities: ['Xác định câu hỏi nghiên cứu và phương pháp phù hợp.', 'Thu thập dữ liệu qua khảo sát, phỏng vấn hoặc nguồn thứ cấp.', 'Phân tích, kiểm tra thiên lệch và diễn giải phát hiện.', 'Trình bày khuyến nghị cùng giới hạn của dữ liệu.'],
      skills: ['Thiết kế nghiên cứu và chọn mẫu', 'Phỏng vấn, khảo sát và phân tích', 'Tổng hợp insight và trình bày bằng chứng'],
      source: sources.market
    }
  },
  design: {
    ui: {
      summary: 'Thiết kế giao diện số rõ ràng, nhất quán và dễ sử dụng trên các kích thước màn hình, trạng thái và thiết bị.',
      responsibilities: ['Tổ chức bố cục, chữ, màu và tương tác theo yêu cầu sản phẩm.', 'Thiết kế trạng thái thường, lỗi, tải và thành công.', 'Xây dựng hoặc áp dụng component và design system.', 'Kiểm tra khả năng tiếp cận, bàn giao và phối hợp với developer.'],
      skills: ['Bố cục, typography và hệ thống thành phần', 'Thiết kế đáp ứng và accessibility', 'Prototype và bàn giao thiết kế'],
      source: sources.interface
    },
    ux: {
      summary: 'Nghiên cứu và thiết kế hành trình sử dụng để người dùng hoàn thành mục tiêu với ít trở ngại và nhầm lẫn hơn.',
      responsibilities: ['Tìm hiểu người dùng, mục tiêu và bối cảnh sử dụng.', 'Vẽ luồng, kiến trúc thông tin và bản mẫu tương tác.', 'Kiểm tra với người dùng rồi điều chỉnh theo bằng chứng.', 'Phối hợp với sản phẩm, UI và kỹ thuật về tính khả thi.'],
      skills: ['Nghiên cứu người dùng và kiến trúc thông tin', 'User flow, wireframe và prototype', 'Usability testing và tổng hợp insight'],
      source: sources.interface
    },
    product: {
      summary: 'Thiết kế trải nghiệm của sản phẩm số từ nhu cầu người dùng đến luồng, giao diện và kết quả sử dụng.',
      responsibilities: ['Làm rõ vấn đề, người dùng và mục tiêu sản phẩm.', 'Phác thảo, tạo mẫu và kiểm tra phương án thiết kế.', 'Phối hợp với product manager và developer để triển khai.', 'Theo dõi phản hồi và dữ liệu sau phát hành để cải tiến.'],
      skills: ['Tư duy sản phẩm và giải quyết vấn đề', 'Thiết kế luồng, giao diện và prototype', 'Thử nghiệm và hợp tác đa chức năng'],
      source: sources.interface
    },
    graphic: {
      summary: 'Tạo sản phẩm truyền thông thị giác giúp thông tin dễ đọc, đúng mục đích và nhất quán với thương hiệu.',
      responsibilities: ['Đọc brief, xác định đối tượng và kênh sử dụng.', 'Phát triển bố cục, hình ảnh, chữ và phương án thiết kế.', 'Chuẩn bị tệp phù hợp cho in ấn hoặc kỹ thuật số.', 'Tiếp nhận phản hồi, kiểm tra chất lượng và bàn giao.'],
      skills: ['Bố cục, màu sắc và typography', 'Công cụ thiết kế đồ họa và xuất file', 'Thực hiện brief và quản lý phiên bản'],
      source: sources.graphic
    },
    motion: {
      summary: 'Thiết kế chuyển động để giải thích trạng thái, hướng sự chú ý hoặc truyền đạt câu chuyện bằng hình ảnh theo thời gian.',
      responsibilities: ['Làm rõ mục đích và thời lượng của chuyển động.', 'Tạo storyboard, keyframe và bản mẫu thử.', 'Đảm bảo chuyển động hỗ trợ nội dung, hiệu năng và khả năng tiếp cận.', 'Phối hợp sản xuất, xuất tệp và kiểm tra trên môi trường sử dụng.'],
      skills: ['Nhịp chuyển động, storyboard và keyframe', 'Công cụ motion và quy trình xuất', 'Khả năng tiếp cận và hiệu năng'],
      source: null
    },
    brand: {
      summary: 'Thiết kế hệ thống nhận diện để thương hiệu có hình ảnh nhất quán, dễ nhận biết trên các điểm chạm.',
      responsibilities: ['Tìm hiểu định vị, đối tượng và bối cảnh cạnh tranh.', 'Phát triển logo, chữ, màu và yếu tố thị giác.', 'Kiểm thử ứng dụng trên nhiều kích cỡ và chất liệu.', 'Viết hướng dẫn và phối hợp với đội triển khai.'],
      skills: ['Hệ thống nhận diện và nguyên lý thị giác', 'Ứng dụng đa kênh và kiểm tra khả năng nhận biết', 'Hướng dẫn thương hiệu và trình bày ý tưởng'],
      source: sources.graphic
    },
    research: {
      summary: 'Nghiên cứu trải nghiệm để hiểu nhu cầu, hành vi và điểm khó của người dùng trước và sau khi thiết kế.',
      responsibilities: ['Xây dựng câu hỏi nghiên cứu và chọn phương pháp.', 'Tuyển người tham gia, phỏng vấn hoặc quan sát sử dụng.', 'Phân tích mẫu hành vi, thiên lệch và giới hạn bằng chứng.', 'Chia sẻ insight và hỗ trợ nhóm kiểm tra giải pháp.'],
      skills: ['Thiết kế nghiên cứu định tính và định lượng', 'Phỏng vấn, quan sát và thử nghiệm khả dụng', 'Phân tích và truyền đạt insight'],
      source: sources.interface
    }
  }
};

export function getCareerRoleProfile(majorKey, trackKey, levelKey) {
  const profile = careerRoleProfiles[majorKey]?.[trackKey];
  if (!profile) return null;
  const index = ['nen-tang', 'so-cap', 'trung-cap', 'cao-cap', 'dan-dat'].indexOf(levelKey);
  const scope = scopes[Math.max(0, index)];
  return {
    ...profile,
    scope,
    responsibilities: levelKey === 'dan-dat' && profile.lead ? profile.lead : profile.responsibilities,
    workAreas: levelKey === 'dan-dat' && profile.lead && majorKey === 'dev' && trackKey === 'frontend'
      ? ['Kiến trúc & design system', 'Chất lượng & hướng dẫn', 'Kế hoạch & phối hợp']
      : workAreas[majorKey]?.[trackKey] || ['Phần việc chính', 'Công việc liên quan', 'Kiểm tra kết quả']
  };
}
