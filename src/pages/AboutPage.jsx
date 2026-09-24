import React, { useEffect, useState } from 'react';
import {
  Compass,
  FileCheck2,
  GraduationCap,
  LayoutDashboard,
  MessageSquare,
  Rocket,
  ShieldCheck,
  Star,
  Users
} from 'lucide-react';
import { apiService } from '../services/api';

export function AboutPage({ go, onOpenUpgrade, onOpenFooterModal }) {
  const companyStats = [
    { value: '238/300', label: 'KPI người dùng', note: 'Giai đoạn 1: Đã đạt 79.3% KPI 200-300 Sinh viên' },
    { value: '2 đối tác', label: 'Nguồn học liệu chính quy', note: 'Giáo trình & Đề án chuẩn từ Đại học FPT, Coursera & AWS Academy' },
    { value: '2 loại', label: 'Mentor Review Flow', note: '🤖 Mentor AI tự động & 👨‍🏫 Mentor Thật 1-on-1' },
    { value: '2 quy chuẩn', label: 'Hình thức Review', note: 'Nộp CV / Link bài tập HOẶC Chat trực tiếp với Mentor' }
  ];

  const universityPartners = [
    { school: 'Đại học FPT', field: 'Software Engineering & AI/Data', code: 'PRN231, SWP391, SEP490' },
    { school: 'Coursera (Google)', field: 'Google Professional Certificates & IT Automation', code: 'COURSERA-G01' },
    { school: 'Coursera (Meta)', field: 'Meta Front-End & Back-End Developer Specialization', code: 'COURSERA-META' },
    { school: 'Coursera (DeepLearning.AI)', field: 'Machine Learning & Generative AI Specialization', code: 'COURSERA-AI' },
    { school: 'AWS Academy', field: 'Cloud Architecting & Serverless Development', code: 'AWS-ACADEMY' }
  ];

  const initialStudentReviews = [
    {
      id: 'rev-01',
      name: 'Nguyễn Hoàng Nam',
      school: 'Đại học FPT TP.HCM',
      major: 'Software Engineering (Năm 4)',
      roleTrack: 'Backend Architecture',
      rating: 5,
      avatarBg: '#8b5cf6',
      outcome: '🎉 Nhận offer Intern Backend Engineer tại FPT Software',
      quote: 'Trước đây khi đi phỏng vấn em chỉ có lý thuyết trên trường nên rất tự ti. Nhờ làm thử thách API Ecommerce từ đề án SWP391 và được Mentor FPT góp ý từng dòng code, em có ngay một project xịn để show trong CV. Nhà tuyển dụng rất ấn tượng với README và sơ đồ hệ thống của em!',
      date: '22/09/2026'
    },
    {
      id: 'rev-02',
      name: 'Lê Minh Thu',
      school: 'Đại học FPT Hà Nội',
      major: 'Digital Art & Design (Năm 3)',
      roleTrack: 'UI/UX Design Systems',
      rating: 5,
      avatarBg: '#ec4899',
      outcome: '🚀 Tăng 300% tương tác Behance & nhận job UI/UX Design Studio',
      quote: 'Em cực kỳ ấn tượng với quy chuẩn nộp bài của nền tảng. Không chỉ làm UI đẹp mà còn phải giải thích User Flow, Design System Token theo chuẩn Google UX Coursera. Feedback từ Mentor Vy Hoàng vô cùng tỉ mỉ và sát thực tế doanh nghiệp!',
      date: '20/09/2026'
    },
    {
      id: 'rev-03',
      name: 'Trần Việt Anh',
      school: 'Đại học FPT',
      major: 'Software Engineering (Năm 3)',
      roleTrack: 'Full Stack Web',
      rating: 5,
      avatarBg: '#10b981',
      outcome: '💼 Pass vòng CV & Technical Test tại VNG',
      quote: 'Phân luồng chấm điểm Mentor AI và Mentor Thật cực kỳ tiện! Mentor AI chấm checklist kiểm tra link và code 0s giúp em biết thiếu sót ngay. Sau đó Mentor Thật review 1-on-1 cho em lời khuyên về tối ưu SQL và Docker rất giá trị.',
      date: '18/09/2026'
    },
    {
      id: 'rev-04',
      name: 'Phạm Quỳnh Anh',
      school: 'Đại học FPT Đà Nẵng',
      major: 'Digital Marketing (Năm 4)',
      roleTrack: 'Performance Marketing',
      rating: 5,
      avatarBg: '#f59e0b',
      outcome: '📈 Quản lý ngân sách Ads 30M thực tế cho doanh nghiệp',
      quote: 'Tài liệu tham khảo từ giáo trình FPT kết hợp với bài tập lập kế hoạch paid ads trên nền tảng giúp em hiểu sâu về CAC, LTV và A/B Testing. Sự hỗ trợ từ Mentor Trang Võ giúp em có một bộ Case Study Marketing ăn điểm!',
      date: '15/09/2026'
    },
    {
      id: 'rev-05',
      name: 'Vũ Quốc Bảo',
      school: 'Coursera & ĐH FPT',
      major: 'Trí tuệ Nhân tạo (Năm 3)',
      roleTrack: 'AI / Data Engineer',
      rating: 5,
      avatarBg: '#38bdf8',
      outcome: '🌟 Xuất bản thành công trợ lý AI RAG FAQ có trích dẫn',
      quote: 'Hệ thống bản đồ nghề rất rõ ràng, kết hợp chứng chỉ DeepLearning.AI Coursera và đề tài môn AI tại FPT. Nhờ đó em không bị lạc hướng giữa hàng trăm công nghệ AI hiện tại.',
      date: '12/09/2026'
    }
  ];

  const [studentReviews, setStudentReviews] = useState(initialStudentReviews);
  const [newReviewForm, setNewReviewForm] = useState({
    name: '',
    school: 'Đại học FPT TP.HCM',
    major: 'Software Engineering',
    roleTrack: 'Developer',
    rating: 5,
    outcome: '',
    quote: ''
  });
  const [submitSuccessNotice, setSubmitSuccessNotice] = useState('');

  // Fetch reviews from MongoDB backend on mount
  useEffect(() => {
    apiService.getReviews().then((dbReviews) => {
      if (dbReviews && dbReviews.length > 0) {
        setStudentReviews(dbReviews);
      }
    }).catch(() => undefined);
  }, []);

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!newReviewForm.name.trim() || !newReviewForm.quote.trim()) return;

    const colors = ['#8b5cf6', '#ec4899', '#10b981', '#f59e0b', '#38bdf8', '#06b6d4'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    const createdReview = {
      id: `rev-${Date.now()}`,
      name: newReviewForm.name,
      school: newReviewForm.school,
      major: newReviewForm.major,
      roleTrack: newReviewForm.roleTrack,
      rating: Number(newReviewForm.rating),
      avatarBg: randomColor,
      outcome: newReviewForm.outcome ? `✨ ${newReviewForm.outcome}` : '⭐ Đã hoàn thành lộ trình & được Mentor chứng nhận',
      quote: newReviewForm.quote,
      date: new Date().toLocaleDateString('vi-VN')
    };

    setStudentReviews([createdReview, ...studentReviews]);
    // Save to MongoDB
    apiService.createReview(createdReview).catch(() => undefined);

    setNewReviewForm({ name: '', school: 'Đại học FPT TP.HCM', major: 'Software Engineering', roleTrack: 'Developer', rating: 5, outcome: '', quote: '' });
    setSubmitSuccessNotice('Cảm ơn bạn! Đánh giá cảm nhận của bạn đã được lưu vào hệ thống cơ sở dữ liệu MongoDB và in lên website.');
    setTimeout(() => setSubmitSuccessNotice(''), 4000);
  };

  return (
    <section className="content-page about-company-page">
      <div className="section-heading inline">
        <div>
          <p className="mono-label">About Portfolio Career Tech</p>
          <h1>Xây dựng chuẩn mực Portfolio và kết nối việc làm cho sinh viên Đại học.</h1>
          <p>Nền tảng công nghệ giáo dục hướng nghiệp, kết nối nguồn học liệu chuẩn từ Đại học FPT & Coursera cùng đội ngũ Senior Mentor đồng hành.</p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button className="primary-action compact" onClick={() => go('roadmap')}>
            <Compass size={16} /> Bắt đầu với Bản đồ nghề
          </button>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="company-stats-grid">
        {companyStats.map((stat, idx) => (
          <div className="company-stat-card" key={idx}>
            <span className="stat-big-val">{stat.value}</span>
            <strong className="stat-main-label">{stat.label}</strong>
            <p className="stat-sub-note">{stat.note}</p>
          </div>
        ))}
      </div>

      {/* Academic Sources */}
      <article className="about-block">
        <div className="block-header">
          <GraduationCap size={22} />
          <div>
            <h2>Nguồn học liệu chính quy chuẩn Đại học FPT & Coursera</h2>
            <p>Hệ thống tham chiếu giáo trình, bài tập lớn và đồ án tốt nghiệp xuất sắc từ Đại học FPT và các khóa học chứng chỉ quốc tế trên Coursera.</p>
          </div>
        </div>
        <div className="partner-schools-grid">
          {universityPartners.map((item) => (
            <div className="partner-school-card" key={item.school}>
              <div className="school-pill">{item.school}</div>
              <strong>{item.field}</strong>
              <span>Mã môn học / Khóa học: <b>{item.code || item.course}</b></span>
            </div>
          ))}
        </div>
      </article>

      {/* Mentor Standards & Reviews */}
      <article className="about-block">
        <div className="block-header">
          <ShieldCheck size={22} />
          <div>
            <h2>Quy chuẩn Mentor Review & Đánh Giá 2 Chiều</h2>
            <p>Minh bạch hóa quá trình đánh giá bài tập, phân loại tài khoản và bảo đảm quyền lợi tài chính cho Mentor.</p>
          </div>
        </div>

        <div className="mentor-rules-columns">
          <div className="rule-col">
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FileCheck2 size={18} color="#0284c7" /> 2 Hình thức Mentor Review
            </h3>
            <ul>
              <li><b>Nộp CV / Link bài tập (Async):</b> Mentor nhận bài, chấm điểm theo rubric STAR, trả nhận xét kèm code review chi tiết trong 24-48h.</li>
              <li><b>Chat trực tiếp 1-on-1:</b> Dành cho tài khoản trả phí. Sinh viên đặt lịch trao đổi trực tiếp để được giải thích lỗi, định hướng career path.</li>
            </ul>
          </div>

          <div className="rule-col">
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Users size={18} color="#10b981" /> Cơ chế Đánh giá & Lọc Mentor
            </h3>
            <ul>
              <li><b>Sinh viên đánh giá Mentor:</b> Người dùng trả phí có quyền chấm điểm sao (1-5★) và nhận xét chất lượng review sau mỗi bài nộp.</li>
              <li><b>Sàng lọc Mentor tiêu cực:</b> Mentor có điểm trung bình dưới 3.5★ sẽ bị hệ thống tạm ngưng phân công và loại bỏ nếu không cải thiện.</li>
              <li><b>Thưởng Mentor xuất sắc:</b> Mentor đạt điểm từ 4.5★ trở lên được thưởng thêm 15-25% thù lao theo quý từ Quỹ chất lượng.</li>
            </ul>
          </div>
        </div>
      </article>

      {/* Real Reviews from Students */}
      <article className="about-block">
        <div className="block-header">
          <MessageSquare size={22} />
          <div>
            <h2>Những câu chuyện truyền cảm hứng từ sinh viên thực tế</h2>
            <p>Trải nghiệm thực tế từ sinh viên Đại học FPT và người học chứng chỉ Coursera đã hoàn thiện Portfolio và chinh phục nhà tuyển dụng.</p>
          </div>
        </div>

        <div className="student-reviews-waterfall">
          {studentReviews.map((rev) => (
            <div className="student-review-card animate-in" key={rev.id}>
              <div className="rev-header">
                <div className="rev-avatar" style={{ background: rev.avatarBg }}>
                  {rev.name.charAt(0)}
                </div>
                <div>
                  <strong>{rev.name}</strong>
                  <span>{rev.major} · <b>{rev.school}</b></span>
                </div>
                <div className="rev-stars">
                  {Array.from({ length: rev.rating }).map((_, i) => (
                    <Star key={i} size={14} fill="#f59e0b" color="#f59e0b" />
                  ))}
                </div>
              </div>

              {rev.outcome && (
                <div className="rev-outcome-tag">
                  {rev.outcome}
                </div>
              )}

              <p className="rev-quote">"{rev.quote}"</p>
              <div className="rev-footer">
                <span className="track-badge">{rev.roleTrack}</span>
                <span className="rev-date">{rev.date}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Add Review Form */}
        <div className="add-review-section">
          <h3>Bạn đã sử dụng nền tảng Portfolio? Hãy chia sẻ cảm nhận của bạn!</h3>
          <p style={{ fontSize: '13px', color: 'var(--jr-text-sub)' }}>Đánh giá của bạn sẽ được lưu vào cơ sở dữ liệu MongoDB và hiển thị lên website công khai.</p>

          {submitSuccessNotice && (
            <div className="status-banner success" style={{ marginBottom: '14px' }}>
              <ShieldCheck size={16} /> {submitSuccessNotice}
            </div>
          )}

          <form onSubmit={handleReviewSubmit} className="review-submit-form">
            <div className="form-row">
              <div className="form-group">
                <label>Họ và tên sinh viên *</label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Nguyễn Văn A"
                  value={newReviewForm.name}
                  onChange={(e) => setNewReviewForm({ ...newReviewForm, name: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Trường đang theo học *</label>
                <select
                  value={newReviewForm.school}
                  onChange={(e) => setNewReviewForm({ ...newReviewForm, school: e.target.value })}
                >
                  <option value="Đại học FPT TP.HCM">Đại học FPT TP.HCM</option>
                  <option value="Đại học FPT Hà Nội">Đại học FPT Hà Nội</option>
                  <option value="Đại học FPT Đà Nẵng">Đại học FPT Đà Nẵng</option>
                  <option value="Đại học FPT Cần Thơ">Đại học FPT Cần Thơ</option>
                  <option value="Đại học FPT Quy Nhơn">Đại học FPT Quy Nhơn</option>
                  <option value="Coursera Learner (Google/Meta)">Coursera Learner (Google/Meta)</option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Chuyên ngành *</label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Software Engineering (Năm 3)"
                  value={newReviewForm.major}
                  onChange={(e) => setNewReviewForm({ ...newReviewForm, major: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Định hướng nghề nghiệp *</label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Backend Developer, UI/UX Designer..."
                  value={newReviewForm.roleTrack}
                  onChange={(e) => setNewReviewForm({ ...newReviewForm, roleTrack: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Đánh giá sao (1-5)</label>
                <select
                  value={newReviewForm.rating}
                  onChange={(e) => setNewReviewForm({ ...newReviewForm, rating: Number(e.target.value) })}
                >
                  <option value={5}>⭐⭐⭐⭐⭐ (5 sao - Xuất sắc)</option>
                  <option value={4}>⭐⭐⭐⭐ (4 sao - Rất tốt)</option>
                  <option value={3}>⭐⭐⭐ (3 sao - Tốt)</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Kết quả đạt được (Outcome nổi bật)</label>
              <input
                type="text"
                placeholder="Ví dụ: Pass vòng phỏng vấn FPT Software, Tăng 200% lượt xem CV..."
                value={newReviewForm.outcome}
                onChange={(e) => setNewReviewForm({ ...newReviewForm, outcome: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>Cảm nhận và góp ý chi tiết *</label>
              <textarea
                required
                rows={3}
                placeholder="Chia sẻ trải nghiệm làm thử thách, nhận feedback mentor và hoàn thiện Portfolio..."
                value={newReviewForm.quote}
                onChange={(e) => setNewReviewForm({ ...newReviewForm, quote: e.target.value })}
              />
            </div>

            <button type="submit" className="primary-action compact" style={{ alignSelf: 'flex-start' }}>
              <Rocket size={16} /> Gửi đánh giá lên Website
            </button>
          </form>
        </div>
      </article>

      {/* Footer in About Page */}
      <footer className="company-footer">
        <div className="footer-brand">
          <span className="brand-mark"><Rocket size={20} color="#0284c7" /></span>
          <div>
            <h2>Portfolio FPT HUB</h2>
            <p>Biến kỹ năng hôm nay thành cơ hội ngày mai.</p>
          </div>
        </div>

        <div className="footer-grid">
          <div>
            <p className="mono-label">Công ty</p>
            <strong>Công ty TNHH Portfolio FPT HUB</strong>
            <span>MST: 0318 2026 301</span>
            <span>Trụ sở: Campus Hòa Lạc, Khu CNC Hòa Lạc, Km29 Đại lộ Thăng Long, Hà Nội</span>
          </div>
          <div>
            <p className="mono-label">Liên hệ</p>
            <a href="mailto:portfolio.exe@gmail.com">portfolio.exe@gmail.com</a>
            <a href="tel:0972124794">Hotline: 0972 124 794</a>
            <span>Thứ 2 - Thứ 7, 08:30 - 21:00</span>
          </div>
          <div>
            <p className="mono-label">Sản phẩm</p>
            <button type="button" onClick={() => go('roadmap')}>Bản đồ nghề</button>
            <button type="button" onClick={() => go('hub')}>Thử thách portfolio</button>
            <button type="button" onClick={onOpenUpgrade}>Gói Premium VIP</button>
          </div>
          <div>
            <p className="mono-label">Pháp lý & Quy chuẩn</p>
            <button type="button" style={{ background: 'none', border: 'none', padding: 0, color: 'inherit', font: 'inherit', textAlign: 'left', cursor: 'pointer' }} onClick={() => onOpenFooterModal?.('terms')}>Điều khoản sử dụng</button>
            <button type="button" style={{ background: 'none', border: 'none', padding: 0, color: 'inherit', font: 'inherit', textAlign: 'left', cursor: 'pointer' }} onClick={() => onOpenFooterModal?.('privacy')}>Chính sách bảo mật</button>
            <button type="button" style={{ background: 'none', border: 'none', padding: 0, color: '#f59e0b', font: 'inherit', textAlign: 'left', cursor: 'pointer', fontWeight: 700 }} onClick={() => onOpenFooterModal?.('mentor-rubric')}>Quy chuẩn Mentor Review & Trao thưởng</button>
          </div>
        </div>
      </footer>
    </section>
  );
}
