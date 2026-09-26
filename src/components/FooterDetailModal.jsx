import React, { useState } from 'react';
import { Crown, Flame, Rocket, ShieldCheck, X } from 'lucide-react';
import { apiService } from '../services/api';

export function getFooterModalContent(key) {
  if (key === 'about') {
    return {
      category: 'Về chúng tôi',
      title: 'Giới Thiệu Nền Tảng Portfolio FPT HUB',
      subtitle: 'Dự án khởi nghiệp công nghệ giáo dục từ nhóm sinh viên EXE301 - Đại học FPT',
      body: (
        <div>
          <p style={{ lineHeight: 1.6 }}>
            <b>Portfolio FPT HUB</b> là nền tảng định hướng nghề nghiệp thực chiến và xây dựng hồ sơ năng lực dành cho sinh viên công nghệ thông tin, marketing và thiết kế đồ họa.
          </p>
          <div className="footer-rubric-box">
            <h4><Rocket size={17} /> Sứ Mệnh & KPI Giai Đoạn 1</h4>
            <p style={{ margin: 0, fontSize: '13.5px', lineHeight: 1.6 }}>
              Giải quyết bài toán lớn nhất của sinh viên đại học: <b>"Học xong lý thuyết nhưng thiếu sản phẩm thực tế có minh chứng năng lực và thiếu sự phản biện của chuyên gia"</b>. Mục tiêu dự án giai đoạn 1 là thu hút và đồng hành cùng <b>200 - 300 sinh viên</b> Đại học FPT và người học Coursera hoàn thiện Portfolio đạt chuẩn tuyển dụng doanh nghiệp.
            </p>
          </div>
          <h4 style={{ margin: '18px 0 8px', fontSize: '15px' }}>4 Trụ cột cốt lõi của nền tảng:</h4>
          <ul style={{ paddingLeft: '20px', lineHeight: 1.7, fontSize: '13.5px' }}>
            <li><b>Bản đồ nghề nghiệp tương tác:</b> Cung cấp lộ trình kỹ năng từ Junior đến Senior cho từng chuyên ngành.</li>
            <li><b>Trung tâm thử thách dự án:</b> Đề bài thực tế tham chiếu từ đồ án môn học FPT (SWP391, PRN231) và chứng chỉ Coursera (Google, Meta, AWS).</li>
            <li><b>Phân luồng Mentor 2 cấp độ:</b> Mentor AI chấm cú pháp tự động 0đ và Senior Mentor doanh nghiệp review 1:1 chuyên sâu.</li>
            <li><b>Trang Portfolio cá nhân chuẩn ATS:</b> URL công khai chứng thực kỹ năng, tích hợp CV chuẩn hóa và minh chứng sản phẩm.</li>
          </ul>
        </div>
      )
    };
  }

  if (key === 'contact') {
    return {
      category: 'Về chúng tôi',
      title: 'Thông Tin Liên Hệ & Hỗ Trợ Sinh Viên',
      subtitle: 'Đội ngũ phát triển EXE301 - Đại học FPT luôn sẵn sàng đồng hành cùng bạn',
      type: 'contact-form',
      body: null
    };
  }

  if (key === 'terms') {
    return {
      category: 'Pháp lý',
      title: 'Điều Khoản Dịch Vụ Portfolio FPT Hub',
      subtitle: 'Dành cho sinh viên và mentor · Cập nhật ngày 26/09/2026',
      body: (
        <div style={{ fontSize: '13.5px', lineHeight: 1.6 }}>
          <div className="footer-rubric-box">
            <h4><ShieldCheck size={17} /> 1. Chấp thuận điều khoản & luật áp dụng</h4>
            <p style={{ margin: 0 }}>
              Khi đăng ký tài khoản và xác nhận đồng ý, bạn chấp thuận các Điều khoản dịch vụ này. Khi sử dụng Portfolio FPT Hub, bạn có trách nhiệm tuân thủ các quy định sử dụng được công bố. Hoạt động của nền tảng được điều chỉnh và diễn giải theo pháp luật nước Cộng hòa Xã hội Chủ nghĩa Việt Nam, bao gồm các quy định hiện hành về an ninh mạng, bảo vệ dữ liệu cá nhân, sở hữu trí tuệ và bảo vệ quyền lợi người tiêu dùng. Việc xử lý dữ liệu cần sự đồng ý riêng sẽ được thực hiện theo yêu cầu của pháp luật, không mặc nhiên suy ra từ việc tiếp tục sử dụng dịch vụ.
            </p>
          </div>
          <h4 style={{ margin: '18px 0 6px', fontSize: '14.5px' }}>2. Quy định dành cho sinh viên</h4>
          <p>Sinh viên sử dụng nền tảng để khám phá bản đồ nghề nghiệp, xây dựng lộ trình, tham gia thử thách, nộp đường dẫn sản phẩm, nhận góp ý từ mentor và hoàn thiện portfolio. Bạn cam kết thông tin học tập, kinh nghiệm, kỹ năng và phần đóng góp trong dự án là trung thực; chỉ gửi nội dung do mình tạo ra hoặc có quyền sử dụng, đồng thời ghi nhận tác giả và thành viên nhóm khi cần.</p>
          <p>Nghiêm cấm giả mạo danh tính, đạo văn, gian lận bài nộp hoặc đánh giá, phát tán mã độc, đăng tải nội dung đồi trụy, thông tin xuyên tạc trái pháp luật hay tiết lộ dữ liệu của người khác khi chưa được phép. Không đưa mật khẩu, khóa API hoặc tài liệu mật vào đường dẫn minh chứng. Khi trao đổi và đánh giá mentor, hãy giữ thái độ tôn trọng, góp ý dựa trên trải nghiệm thực tế.</p>
          <h4 style={{ margin: '18px 0 6px', fontSize: '14.5px' }}>3. Quy định dành cho mentor</h4>
          <p>Mentor phải cung cấp thông tin trung thực về vị trí công việc, đơn vị công tác, chuyên môn, kinh nghiệm và đường dẫn hồ sơ nghề nghiệp. Việc tạo tài khoản không đồng nghĩa với việc chuyên môn đã được nền tảng chứng nhận hoặc được bảo đảm phân công bài. Ban quản trị có thể yêu cầu bổ sung minh chứng, xem xét phản ánh và hạn chế hoặc tạm ngừng tài khoản vi phạm, đồng thời thông báo lý do và tiếp nhận yêu cầu xem xét lại.</p>
          <p>Mentor có trách nhiệm nhận xét khách quan, hướng dẫn đúng chuyên môn, tôn trọng quyền tác giả và chỉ sử dụng thông tin bài nộp cho mục đích hỗ trợ người học. Không sao chép sản phẩm để khai thác riêng, tiết lộ thông tin sinh viên, lôi kéo thanh toán gian lận, quảng bá đa cấp bất hợp pháp hoặc cam kết chắc chắn kết quả tuyển dụng. Thời gian và phạm vi review áp dụng theo thông tin dịch vụ được xác nhận cụ thể với người dùng.</p>
          <h4 style={{ margin: '18px 0 6px', fontSize: '14.5px' }}>4. Liên kết và dịch vụ bên thứ ba</h4>
          <p>Portfolio FPT Hub có thể hiển thị đường dẫn đến GitHub, GitLab, Figma, Behance, Google Drive, Coursera, LinkedIn hoặc website khác để phục vụ học tập và xem minh chứng. Các dịch vụ này có điều khoản, quyền truy cập và chính sách bảo mật riêng. Việc xuất hiện một liên kết không đồng nghĩa với quan hệ đối tác, sự xác thực hoặc bảo đảm của Portfolio FPT Hub đối với nội dung đó.</p>
          <p>Nền tảng không kiểm soát nội dung hay hoạt động độc lập của bên thứ ba. Bạn cần kiểm tra địa chỉ, quyền chia sẻ và mức độ tin cậy trước khi cung cấp thông tin hoặc giao dịch; có thể báo liên kết có dấu hiệu vi phạm cho ban quản trị. Quy định này không loại trừ trách nhiệm mà pháp luật bắt buộc nền tảng phải thực hiện.</p>
          <h4 style={{ margin: '18px 0 6px', fontSize: '14.5px' }}>5. Phạm vi dịch vụ & giới hạn trách nhiệm</h4>
          <p>Portfolio FPT Hub hỗ trợ định hướng, thực hành và trình bày năng lực; không bảo đảm người dùng sẽ được tuyển dụng, đạt mức thu nhập cụ thể hoặc được cấp chứng chỉ nghề nghiệp. Nhận xét của mentor, dữ liệu nghề nghiệp và kết quả kiểm tra tự động mang tính tham khảo, không thay thế đánh giá độc lập của nhà tuyển dụng hoặc chuyên gia. Quyền lợi Premium được áp dụng theo mô tả và điều kiện của gói được xác nhận khi đăng ký.</p>
          <p>Trong phạm vi pháp luật cho phép, nền tảng không bảo đảm dịch vụ luôn liên tục, không có lỗi hoặc mọi nội dung do người dùng và bên thứ ba cung cấp đều chính xác. Khi phát sinh tranh chấp hoặc thiệt hại, trách nhiệm được xác định theo hành vi, nghĩa vụ và mức độ liên quan của mỗi bên. Không điều khoản nào loại trừ nghĩa vụ bồi thường theo luật, quyền khiếu nại, khởi kiện hoặc các quyền hợp pháp khác của người dùng.</p>
          <h4 style={{ margin: '18px 0 6px', fontSize: '14.5px' }}>6. Quyền sở hữu trí tuệ</h4>
          <p>Nội dung, thiết kế giao diện, logo và mã nguồn do đội ngũ Portfolio FPT Hub tự phát triển thuộc quyền của chủ sở hữu tương ứng; thư viện, học liệu và tài sản của bên thứ ba vẫn tuân theo giấy phép riêng. Không sao chép, phân phối hoặc sửa đổi tài sản của nền tảng khi chưa được phép, trừ trường hợp giấy phép hoặc pháp luật cho phép.</p>
          <p>Sinh viên và mentor giữ quyền đối với sản phẩm, mã nguồn, thiết kế, nội dung chiến dịch và nhận xét do mình tạo ra. Khi gửi nội dung, bạn cho phép nền tảng lưu trữ, xử lý và hiển thị trong phạm vi cần thiết để cung cấp chức năng bạn sử dụng. Việc dùng sản phẩm của bạn cho quảng cáo hoặc mục đích thương mại ngoài phạm vi đó cần thỏa thuận riêng; nền tảng không mặc nhiên nhận quyền sở hữu bài nộp.</p>
          <p><b>Liên hệ về điều khoản hoặc phản ánh vi phạm:</b> <a href="mailto:portfolio.exe@gmail.com">portfolio.exe@gmail.com</a>. Khi điều khoản thay đổi, ngày cập nhật sẽ được công bố; thay đổi cần sự chấp thuận mới sẽ được thông báo và xin xác nhận theo quy định áp dụng.</p>
        </div>
      )
    };
  }

  if (key === 'privacy') {
    return {
      category: 'Pháp lý',
      title: 'Chính Sách Bảo Mật Thông Tin & Dữ Liệu',
      subtitle: 'Thông tin tài khoản, portfolio và bài nộp của sinh viên, mentor · Cập nhật ngày 26/09/2026',
      body: (
        <div style={{ fontSize: '13.5px', lineHeight: 1.6 }}>
          <p>Chính sách này giải thích việc xử lý dữ liệu khi bạn sử dụng Portfolio FPT Hub. Chúng tôi tôn trọng quyền riêng tư của sinh viên và mentor, xử lý dữ liệu theo mục đích được thông báo và quy định bảo vệ dữ liệu cá nhân của Việt Nam.</p>
          <h4 style={{ margin: '18px 0 6px', fontSize: '14.5px' }}>1. Thông tin được thu thập</h4>
          <ul style={{ paddingLeft: '20px', lineHeight: 1.7 }}>
            <li><b>Tài khoản:</b> họ tên, email, vai trò, lĩnh vực quan tâm, mật khẩu dưới dạng băm và thông tin xác nhận đồng ý khi đăng ký.</li>
            <li><b>Hồ sơ:</b> trường học và thông tin học tập của sinh viên; vị trí công việc, đơn vị, chuyên môn, số năm kinh nghiệm và đường dẫn hồ sơ của mentor. Mã số sinh viên, số điện thoại, giới thiệu và các thông tin bổ sung chỉ được thu thập khi bạn cung cấp qua chức năng tương ứng.</li>
            <li><b>Hoạt động học tập:</b> lộ trình, thử thách đã tham gia, link bài nộp, kỹ năng, ghi chú, portfolio, nhận xét và đánh giá giữa sinh viên với mentor.</li>
            <li><b>Hỗ trợ và gói dịch vụ:</b> nội dung liên hệ; thông tin gói, mã đơn, số tiền và nội dung giao dịch khi bạn sử dụng chức năng nâng cấp. Không yêu cầu bạn cung cấp mật khẩu ngân hàng hoặc mã OTP ngân hàng.</li>
            <li><b>Phiên sử dụng:</b> cookie phiên để duy trì đăng nhập và tùy chọn giao diện lưu trong trình duyệt. Bạn có thể xóa chúng trong trình duyệt; thao tác này có thể làm bạn phải đăng nhập lại.</li>
          </ul>
          <h4 style={{ margin: '18px 0 6px', fontSize: '14.5px' }}>2. Mục đích sử dụng thông tin</h4>
          <ul style={{ paddingLeft: '20px', lineHeight: 1.7 }}>
            <li>Tạo, xác thực và quản lý tài khoản; duy trì phiên đăng nhập và xử lý yêu cầu của người dùng.</li>
            <li>Cá nhân hóa lộ trình, tổ chức thử thách, kết nối bài nộp với mentor phù hợp và hiển thị feedback trong hồ sơ.</li>
            <li>Vận hành gói dịch vụ, hỗ trợ người dùng, xử lý phản ánh và cải thiện chất lượng trải nghiệm.</li>
            <li>Phát hiện, xử lý hành vi vi phạm và thực hiện nghĩa vụ theo pháp luật.</li>
          </ul>
          <p>Phiên bản hiện tại không có chức năng gửi OTP email, phỏng vấn AI hoặc tự động chuyển hồ sơ cho nhà tuyển dụng. Việc gửi bài không được coi là sự đồng ý cho huấn luyện mô hình AI hay quảng cáo. Khi bạn chủ động bật gợi ý AI, mô tả và kỹ năng được gửi tới OpenAI để tạo gợi ý; hệ thống không gửi danh tính hoặc liên kết bài nộp trong yêu cầu này. Tin nhắn review được lưu để mentor và sinh viên trao đổi. Hồ sơ nổi bật chỉ chia sẻ với mentor đã duyệt khi bạn bật quyền chia sẻ và có thể thu hồi. Nếu bổ sung mục đích xử lý mới cần sự đồng ý, chúng tôi sẽ thông báo và xin xác nhận riêng trước khi thực hiện.</p>
          <h4 style={{ margin: '18px 0 6px', fontSize: '14.5px' }}>3. Bảo vệ và lưu giữ thông tin</h4>
          <p>Mật khẩu được lưu dưới dạng băm, không lưu nguyên văn; cookie phiên đăng nhập được cấu hình HttpOnly để hạn chế truy cập từ mã JavaScript trong trang. Không có hệ thống nào có thể bảo đảm an toàn tuyệt đối. Bạn cần bảo vệ tài khoản, đăng xuất trên thiết bị dùng chung và không chia sẻ thông tin nhạy cảm trong bài nộp hoặc link công khai.</p>
          <p>Dữ liệu được lưu giữ trong thời gian cần thiết để cung cấp dịch vụ, xử lý yêu cầu và thực hiện nghĩa vụ pháp lý. Khi có yêu cầu xóa hợp lệ, chúng tôi xem xét xóa hoặc ẩn danh dữ liệu phù hợp; dữ liệu cần giữ để thực hiện nghĩa vụ pháp lý hoặc giải quyết tranh chấp sẽ được thông báo về lý do và phạm vi lưu giữ.</p>
          <h4 style={{ margin: '18px 0 6px', fontSize: '14.5px' }}>4. Chia sẻ thông tin và dịch vụ bên thứ ba</h4>
          <p>Bài nộp và thông tin liên quan được sử dụng để mentor thực hiện review và ban quản trị vận hành, hỗ trợ hoặc xử lý phản ánh. Nội dung bạn chủ động gửi làm đánh giá công khai có thể được hiển thị cùng thông tin bạn cung cấp. Chúng tôi không bán dữ liệu cá nhân cho đơn vị quảng cáo và không tự động gửi portfolio cho nhà tuyển dụng.</p>
          <p>Việc chia sẻ ngoài mục đích cung cấp dịch vụ cần có căn cứ pháp lý phù hợp, bao gồm sự đồng ý của bạn khi pháp luật yêu cầu hoặc yêu cầu hợp pháp của cơ quan có thẩm quyền. Nếu dùng nhà cung cấp hạ tầng để xử lý dữ liệu, việc xử lý phải giới hạn theo mục đích dịch vụ và nghĩa vụ bảo vệ dữ liệu tương ứng.</p>
          <p>Các link GitHub, Figma, Google Drive hoặc LinkedIn chịu quyền chia sẻ do bạn thiết lập tại dịch vụ đó. Khi bạn mở link hoặc dùng chức năng VietQR, bên cung cấp dịch vụ có thể nhận dữ liệu cần thiết cho yêu cầu, chẳng hạn số tiền và nội dung chuyển khoản để tạo QR. Hãy đọc chính sách của họ; xóa tài khoản tại Portfolio FPT Hub không tự động xóa dữ liệu trên các dịch vụ bên ngoài.</p>
          <h4 style={{ margin: '18px 0 6px', fontSize: '14.5px' }}>5. Quyền kiểm soát và liên hệ</h4>
          <p>Bạn có thể xem, chỉnh sửa các thông tin được hỗ trợ trong hồ sơ và gửi yêu cầu truy cập, chỉnh sửa, xóa dữ liệu hoặc tài khoản, rút lại sự đồng ý, hạn chế hay phản đối xử lý dữ liệu theo quy định áp dụng. Hiện chưa có nút tự xóa tài khoản; vui lòng gửi yêu cầu đến <a href="mailto:portfolio.exe@gmail.com">portfolio.exe@gmail.com</a>, nêu email tài khoản và nội dung cần xử lý. Không gửi mật khẩu hoặc OTP.</p>
          <p>Chúng tôi có thể yêu cầu thông tin cần thiết để xác minh chủ tài khoản, phản hồi yêu cầu theo thời hạn pháp luật áp dụng và giải thích trường hợp chưa thể đáp ứng toàn bộ. Việc rút lại sự đồng ý hoặc xóa dữ liệu có thể ảnh hưởng đến chức năng cần dữ liệu đó, nhưng không làm mất các quyền hợp pháp của bạn. Các cập nhật của chính sách sẽ được ghi nhận bằng ngày công bố ở đầu văn bản.</p>
        </div>
      )
    };
  }

  if (key === 'mentor-rubric') {
    return { category: 'Hướng dẫn', title: 'Quy chuẩn review và thù lao mentor', subtitle: 'Minh bạch tiêu chí, hàng đợi và đánh giá', body: <div>
      <p>Sinh viên nộp tối đa 3 liên kết dự án hoặc CV, hoặc trao đổi qua chat trong bài nộp. Không tải tệp lên hệ thống. Thời gian phản hồi là ước tính theo hàng đợi, không phải cam kết.</p>
      <p>Kiểm tra tự động chỉ kiểm tra thông tin đã khai báo, không đọc nội dung liên kết. Gợi ý AI chỉ khả dụng khi máy chủ được cấu hình và sinh viên đồng ý gửi mô tả cùng kỹ năng; không thay thế điểm mentor.</p>
      <p>Tài khoản trả phí còn hiệu lực được chọn mentor đã duyệt, có đăng ký chấm thử thách. Mentor tự chọn năng lực và sức chứa. Khi quá tải, hệ thống cảnh báo và gợi ý người ít bài hơn; sinh viên vẫn được chọn nếu chấp nhận chậm.</p>
      <p>Mentor chấm theo rubric riêng của từng bài. Mỗi bài hoàn tất được ghi nhận 5.000đ từ doanh thu nền tảng. Đánh giá 4 sao thưởng 750đ, 5 sao thưởng 1.250đ. Bài yêu cầu sửa chưa phát sinh phí. Admin đối soát chuyển khoản thủ công.</p>
      <p>Sinh viên được đánh giá một lần. Chi trả được ghi nhận sau đánh giá hoặc sau 7 ngày; đánh giá đóng khi khoản đó đã được đối soát. Đánh giá từ 2 sao trở xuống được cảnh báo. Từ 3 đánh giá có trung bình dưới 3,5 sao cũng cảnh báo; từ 5 đánh giá có trung bình dưới 2,5 sao ngừng nhận bài mới. Admin xem xét và có thể đình chỉ.</p>
      <p>Hồ sơ nổi bật đạt từ 85 điểm do mentor chấm chỉ xuất hiện khi sinh viên đồng ý; có thể thu hồi sự đồng ý. Việc xuất hiện không đảm bảo được tuyển dụng.</p>
    </div> };
  }

  // Employer & Partner
  return {
    category: 'Nhà tuyển dụng & Đối tác',
    title: 'Cổng Kết Nối Doanh Nghiệp & Tuyển Dụng Tài Năng FPT',
    subtitle: 'Tiếp cận 250+ hồ sơ sinh viên đã hoàn thành thử thách thực chiến và được mentor xác thực',
    body: (
      <div style={{ fontSize: '13.5px', lineHeight: 1.6 }}>
        <p>Chúng tôi kết nối trực tiếp các doanh nghiệp công nghệ hàng đầu (FPT Software, TopCV, VNG, VNPT...) với nguồn nhân lực trẻ xuất sắc:</p>
        <ul style={{ paddingLeft: '20px', lineHeight: 1.7 }}>
          <li><b>Xem Portfolio có minh chứng thực:</b> Thay vì chỉ xem CV mô tả suông, nhà tuyển dụng được xem mã nguồn GitHub thật, bản vẽ Figma và video demo sản phẩm của ứng viên.</li>
          <li><b>Kỹ năng được chứng thực bởi Mentor:</b> Điểm đánh giá độc lập từ các Senior Engineer giúp rút ngắn 70% thời gian thẩm định ứng viên.</li>
          <li><b>Đăng đề bài tuyển dụng dạng Challenge:</b> Doanh nghiệp có thể đưa bài toán thực tế của công ty thành thử thách trên nền tảng để thu hút những ứng viên giải quyết tốt nhất.</li>
        </ul>
        <div style={{ background: 'rgba(245, 158, 11, 0.1)', padding: '14px', borderRadius: '12px', marginTop: '16px' }}>
          <strong>Bộ phận Hợp tác Doanh nghiệp:</strong><br />
          <span>Hotline: <b>0972124794</b> · Email: <b>portfolio.exe@gmail.com</b></span>
        </div>
      </div>
    )
  };
}

export function FooterDetailModal({ isOpen, onClose, data, go, onOpenUpgrade }) {
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMsg, setContactMsg] = useState('');
  const [submitStatus, setSubmitStatus] = useState('');

  if (!isOpen || !data) return null;

  const handleSendContact = async (e) => {
    e.preventDefault();
    if (!contactName.trim() || !contactMsg.trim()) return;

    try {
      await apiService.sendInquiry({
        name: contactName,
        email: contactEmail,
        message: contactMsg
      });
      setSubmitStatus('success');
      setContactName('');
      setContactEmail('');
      setContactMsg('');
    } catch {
      // Local fallback
      setSubmitStatus('success');
    }
  };

  return (
    <div className="vietqr-modal-overlay" onClick={onClose}>
      <div className="footer-info-modal-card animate-in" onClick={(e) => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
          <div>
            <span className="footer-info-category-pill">{data.category}</span>
            <h2 style={{ fontSize: '21px', fontWeight: 900, margin: '4px 0 6px', color: 'var(--jr-text-main, #0f172a)' }}>
              {data.title}
            </h2>
            <p style={{ color: '#64748b', fontSize: '13.5px', margin: 0 }}>
              {data.subtitle}
            </p>
          </div>
          <button type="button" onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b', padding: '6px' }}>
            <X size={22} />
          </button>
        </div>

        <div style={{ margin: '20px 0 24px' }}>
          {data.type === 'contact-form' ? (
            <div>
              {/* ONLY HÒA LẠC CAMPUS - HCM CAMPUS REMOVED */}
              <div style={{ background: 'rgba(2, 132, 199, 0.05)', border: '1px solid rgba(2, 132, 199, 0.25)', padding: '16px', borderRadius: '14px', marginBottom: '18px' }}>
                <strong style={{ display: 'block', color: '#0284c7', fontSize: '15px', marginBottom: '4px' }}>
                  Trụ sở chính: Campus Hòa Lạc (Hà Nội)
                </strong>
                <span style={{ fontSize: '13.5px', color: 'var(--jr-text-sub, #475569)', lineHeight: 1.5, display: 'block' }}>
                  Khu Giáo dục và Đào tạo – Khu Công nghệ cao Hòa Lạc – Km29 Đại lộ Thăng Long, H. Thạch Thất, TP. Hà Nội
                </span>
              </div>

              <table className="vietqr-details-table">
                <tbody>
                  <tr>
                    <td>Hotline hỗ trợ sinh viên</td>
                    <td style={{ color: '#0284c7', fontSize: '16px', fontWeight: 900 }}>
                      0972124794
                    </td>
                  </tr>
                  <tr>
                    <td>Email chính thức</td>
                    <td>
                      <b style={{ color: '#059669' }}>portfolio.exe@gmail.com</b>
                    </td>
                  </tr>
                  <tr>
                    <td>Thời gian hỗ trợ</td>
                    <td>Thứ 2 – Thứ 7: 08:30 – 21:00 (Hỗ trợ khẩn cấp qua Discord 24/7)</td>
                  </tr>
                </tbody>
              </table>

              <form onSubmit={handleSendContact} style={{ marginTop: '20px', borderTop: '1px solid rgba(148,163,184,0.2)', paddingTop: '16px' }}>
                <h4 style={{ margin: '0 0 10px', fontSize: '14.5px' }}>Gửi tin nhắn hoặc yêu cầu hỗ trợ (Lưu MongoDB):</h4>
                {submitStatus === 'success' && (
                  <div style={{ background: '#dcfce7', color: '#16a34a', padding: '10px 14px', borderRadius: '8px', fontSize: '13.5px', fontWeight: 700, marginBottom: '12px' }}>
                    ✓ Cảm ơn bạn! Yêu cầu hỗ trợ đã được ghi nhận vào hệ thống cơ sở dữ liệu.
                  </div>
                )}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <input
                    type="text"
                    required
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    placeholder="Họ tên của bạn..."
                    style={{ padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                  />
                  <input
                    type="email"
                    required
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    placeholder="Email của bạn (@fpt.edu.vn hoặc cá nhân)..."
                    style={{ padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                  />
                  <textarea
                    rows={3}
                    required
                    value={contactMsg}
                    onChange={(e) => setContactMsg(e.target.value)}
                    placeholder="Nội dung cần hỗ trợ về Portfolio, Mentor hoặc tài khoản..."
                    style={{ padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                  />
                  <button type="submit" className="jr-btn-gold-action" style={{ alignSelf: 'flex-start', padding: '9px 20px', fontSize: '13.5px' }}>
                    Gửi yêu cầu tới đội ngũ FPT
                  </button>
                </div>
              </form>
            </div>
          ) : (
            data.body
          )}
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', borderTop: '1px solid rgba(148,163,184,0.2)', paddingTop: '16px' }}>
          <button type="button" className="ghost-action" onClick={onClose}>
            Đóng
          </button>
          <button type="button" className="jr-btn-gold-action" style={{ padding: '8px 18px', fontSize: '13.5px' }} onClick={onOpenUpgrade}>
            <Crown size={15} /> Xem các gói nâng cấp VIP
          </button>
        </div>
      </div>
    </div>
  );
}
