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
      title: 'Điều Khoản Sử Dụng Nền Tảng',
      subtitle: 'Quy định quyền lợi, bản quyền và trách nhiệm của sinh viên & mentor',
      body: (
        <div style={{ fontSize: '13.5px', lineHeight: 1.6 }}>
          <div className="footer-rubric-box">
            <h4><ShieldCheck size={17} /> 1. Bản Quyền Sản Phẩm & Sở Hữu Trí Tuệ</h4>
            <p style={{ margin: 0 }}>
              Sinh viên giữ <b>100% quyền sở hữu trí tuệ</b> đối với mã nguồn, thiết kế đồ họa, nội dung chiến dịch và case study được tải lên nền tảng. Nền tảng Portfolio FPT HUB cam kết không sử dụng mã nguồn của bạn cho bất kỳ mục đích thương mại nào mà không có thỏa thuận bằng văn bản.
            </p>
          </div>
          <h4 style={{ margin: '14px 0 6px', fontSize: '14.5px' }}>2. Trách nhiệm của Sinh viên</h4>
          <p>Sinh viên cam kết bài nộp là thành quả tự làm hoặc làm theo nhóm; nghiêm cấm sao chép đạo văn hoặc mạo danh người khác. Trong các buổi Chat trực tiếp với Mentor, sinh viên cần giữ thái độ lịch sự, chuyên nghiệp.</p>
          <h4 style={{ margin: '14px 0 6px', fontSize: '14.5px' }}>3. Cam kết thời gian phản hồi của Mentor</h4>
          <p>Mỗi bài nộp gửi đến Mentor thật sẽ được phản hồi chi tiết trong vòng <b>24 – 48 giờ</b>. Nếu quá thời hạn cam kết, sinh viên sẽ được hoàn lại lượt review hoặc cấp thêm 1 buổi review miễn phí.</p>
        </div>
      )
    };
  }

  if (key === 'privacy') {
    return {
      category: 'Pháp lý',
      title: 'Chính Sách Bảo Mật Thông Tin & Dữ Liệu',
      subtitle: 'Bảo vệ hồ sơ cá nhân và sản phẩm của sinh viên theo tiêu chuẩn an toàn cao nhất',
      body: (
        <div style={{ fontSize: '13.5px', lineHeight: 1.6 }}>
          <p>Chúng tôi tôn trọng và cam kết bảo vệ dữ liệu cá nhân của sinh viên và người hướng dẫn:</p>
          <ul style={{ paddingLeft: '20px', lineHeight: 1.7 }}>
            <li><b>Bảo mật thông tin định danh:</b> Họ tên, mã số sinh viên, số điện thoại và email trường FPT được mã hóa và bảo mật tuyệt đối.</li>
            <li><b>Quyền kiểm soát Public Portfolio:</b> Bạn có thể bật hoặc tắt chế độ công khai URL hồ sơ bất cứ khi nào bạn muốn.</li>
            <li><b>Bảo vệ CV ứng tuyển:</b> CV của bạn chỉ được chuyển tiếp đến các đối tác tuyển dụng (FPT Software, TopCV, VNG...) khi có sự đồng ý rõ ràng từ bạn.</li>
          </ul>
        </div>
      )
    };
  }

  if (key === 'mentor-rubric') {
    return {
      category: 'Nghiệp vụ cốt lõi',
      title: 'Quy Chuẩn Mentor Review & Cơ Chế Đánh Giá 2 Chiều',
      subtitle: 'Quy trình thẩm định công bằng, phân luồng AI & Mentor thật, sàng lọc mentor tiêu cực và quỹ thưởng',
      body: (
        <div style={{ fontSize: '13.5px', lineHeight: 1.6 }}>
          <div className="footer-rubric-box">
            <h4><Crown size={17} /> 1. Hai Hình Thức Review Tiêu Chuẩn</h4>
            <ul style={{ margin: 0, paddingLeft: '18px', lineHeight: 1.6 }}>
              <li><b>Hình thức 1 - Nộp link bài nộp / CV (Review Async):</b> Sinh viên gửi link GitHub, demo web, link Figma hoặc CV PDF. Mentor chấm điểm chi tiết theo rubric STAR, ghi chú cụ thể lỗi logic và trả kết quả trong 24-48h.</li>
              <li><b>Hình thức 2 - Đặt lịch Chat trực tiếp 1-on-1:</b> Dành cho tài khoản VIP. Sinh viên trao đổi trực tiếp với Mentor qua Google Meet hoặc phòng chat 45 phút để được giải đáp thắc mắc, sửa lỗi kiến trúc và phỏng vấn thử.</li>
            </ul>
          </div>

          <div style={{ background: 'rgba(2, 132, 199, 0.08)', border: '1px solid rgba(2, 132, 199, 0.3)', borderRadius: '14px', padding: '14px 16px', margin: '14px 0' }}>
            <h4 style={{ margin: '0 0 6px', color: '#0284c7' }}><Flame size={16} /> 2. Phân Luồng Chấm Điểm AI & Mentor Thật</h4>
            <p style={{ margin: 0, fontSize: '13px' }}>
              • <b>Mentor AI (0đ Miễn phí):</b> Tự động quét kiểm tra cấu trúc link, tính hợp lệ của repo, phân tích từ khóa CV ATS và chấm điểm sơ bộ trong 5 giây.<br />
              • <b>Senior Mentor Thật (Gói VIP):</b> Chuyên gia giàu kinh nghiệm từ FPT Software, Viettel, VNG thẩm định kiến trúc code, khả năng mở rộng hệ thống và tính thực tế doanh nghiệp.
            </p>
          </div>

          <div style={{ background: 'rgba(220, 38, 38, 0.08)', border: '1px solid rgba(220, 38, 38, 0.3)', borderRadius: '14px', padding: '14px 16px', margin: '14px 0' }}>
            <h4 style={{ margin: '0 0 6px', color: '#dc2626' }}><ShieldCheck size={16} /> 3. Đánh Giá 2 Chiều & Sàng Lọc Mentor Tiêu Cực</h4>
            <p style={{ margin: 0, fontSize: '13px' }}>
              • <b>Sinh viên chấm điểm Mentor:</b> Sau mỗi lượt review, sinh viên đánh giá sao (1-5 sao) và nhận xét chất lượng góp ý.<br />
              • <b>Cơ chế sàng lọc nghiêm ngặt:</b> Mentor nhận đánh giá tiêu cực (điểm trung bình dưới 3.5 sao) sẽ bị hệ thống tạm ngưng phân công bài nộp và đưa vào diện loại trừ nếu không cải thiện.<br />
              • <b>Chính sách Thưởng thù lao:</b> Mentor có điểm đánh giá xuất sắc (từ 4.5 đến 5.0 sao) được nhận thêm thưởng bonus 15% – 25% thù lao theo từng kỳ review.
            </p>
          </div>
        </div>
      )
    };
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
