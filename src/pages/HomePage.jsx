import React, { useEffect, useState } from 'react';
import {
  ArrowRight,
  Compass,
  FileUp,
  GraduationCap,
  LayoutDashboard,
  Rocket,
  ShieldCheck,
  Star,
  UserRound
} from 'lucide-react';
import { FoundersSection } from '../components/FoundersSection';
import { PortfolioFooter } from '../components/PortfolioFooter';
import { apiService } from '../services/api';

const defaultReviews = [
  {
    id: 'rev-01',
    name: 'Trần Hương',
    school: 'ĐH FPT HCM',
    roleTrack: 'Frontend Developer Intern',
    quote: 'Mình đã từng không biết bắt đầu từ đâu khi làm CV. Nhờ hệ thống Portfolio này, mình có ngay lộ trình rõ ràng, làm 3 dự án thực tế và gửi portfolio trực tiếp cho nhà tuyển dụng. Kết quả: nhận intern tại FPT Software chỉ sau 2 tuần!',
    avatarBg: '#8b5cf6'
  },
  {
    id: 'rev-02',
    name: 'Nguyễn Minh',
    school: 'ĐH FPT Hà Nội',
    roleTrack: 'Backend Engineer',
    quote: 'Điều mình thích nhất là mentor review chuyên sâu theo khung STAR. Không chỉ chấm điểm mà còn gợi ý cách trình bày case study sao cho nhà tuyển dụng ấn tượng. Portfolio của mình sau khi hoàn thiện đã giúp mình pass vòng CV ở Viettel Digital.',
    avatarBg: '#10b981',
    featured: true
  },
  {
    id: 'rev-03',
    name: 'Lê Thảo',
    school: 'ĐH FPT Cần Thơ',
    roleTrack: 'Data Analyst Intern',
    quote: 'Tính năng thẩm định CV chuẩn ATS cực kỳ hữu ích. Mình đã quét CV qua hệ thống, phát hiện thiếu từ khóa quan trọng và sửa ngay. Điểm ATS từ 45 lên 92. HR gọi phỏng vấn ngay tuần sau!',
    avatarBg: '#0284c7'
  },
  {
    id: 'rev-04',
    name: 'Phạm Đức',
    school: 'ĐH FPT Đà Nẵng',
    roleTrack: 'DevOps Engineer',
    quote: 'Bản đồ nghề nghiệp giúp mình nhìn rõ career path từ Junior đến Senior. Mình chọn track DevOps, làm challenge về Docker + CI/CD và được mentor đánh giá 95/100. Case study này trở thành highlight trong portfolio xin việc.',
    avatarBg: '#f59e0b'
  },
  {
    id: 'rev-05',
    name: 'Vũ Linh',
    school: 'ĐH FPT TP.HCM',
    roleTrack: 'Mobile Developer',
    quote: 'Mình ấn tượng với tính năng phỏng vấn AI. Nó giả lập phỏng vấn thật, hỏi behavioral + technical questions và cho feedback tức thì. Sau 5 lần luyện, mình pass vòng phỏng vấn cuối ở MoMo mà không run.',
    avatarBg: '#ec4899'
  },
  {
    id: 'rev-06',
    name: 'Hoàng Anh',
    school: 'Coursera & ĐH FPT',
    roleTrack: 'Fullstack Developer',
    quote: 'Gói Premium rất xứng đáng. Mình được mentor senior ở VNG review từng bài, gợi ý cải thiện code quality và portfolio layout. Public portfolio link mình gửi thẳng cho HR, không cần CV truyền thống nữa.',
    avatarBg: '#14b8a6'
  }
];

export function HomePage({ go, onOpenUpgrade, onOpenFooterModal, appData }) {
  const [reviews, setReviews] = useState(defaultReviews);
  const [kpiStats, setKpiStats] = useState({
    currentUserCount: 250,
    activeMentors: 50,
    completedSubmissions: 100,
    progressPercent: 83.3
  });

  useEffect(() => {
    // 1. Fetch live student reviews from MongoDB
    apiService.getReviews().then((data) => {
      if (data && data.length > 0) {
        setReviews(data);
      }
    }).catch(() => {});

    // 2. Fetch live KPI stats from MongoDB
    fetch('http://127.0.0.1:4000/api/kpi')
      .then((res) => res.json())
      .then((data) => {
        if (data && data.currentUserCount) {
          setKpiStats(data);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <div className="jr-home-wrapper">
      {/* Hero Section */}
      <section className="jr-hero">
        <div className="jr-hero-badge">
          <span className="jr-badge-pulse" />
          <span>HỆ THỐNG XÂY DỰNG PORTFOLIO NGHỀ NGHIỆP · SINH VIÊN ĐẠI HỌC FPT & COURSERA</span>
        </div>

        <h1 className="jr-hero-title">
          Xây Dựng Portfolio Chuẩn Doanh Nghiệp, <br />
          <span className="jr-gradient-text">Chinh Phục Mọi Nhà Tuyển Dụng</span>
        </h1>

        <p className="jr-hero-subtitle">
          Nền tảng hướng nghiệp thực chiến dành cho sinh viên đại học: Định hình lộ trình nghề nghiệp (Roadmap), 
          thực hiện các dự án thực tế chuẩn doanh nghiệp (Challenge Hub), nhận đánh giá 2 chiều từ AI & Mentor chuyên gia, 
          và tự động tạo trang Portfolio cá nhân chuyên nghiệp để gửi nhà tuyển dụng.
        </p>

        <div className="jr-hero-actions">
          <button className="jr-btn-primary" onClick={() => go('roadmap')}>
            <Rocket size={18} />
            <span>Bắt đầu tạo Portfolio ngay</span>
            <ArrowRight size={16} />
          </button>
          <button className="jr-btn-secondary" onClick={() => go('portfolio')}>
            <UserRound size={18} color="#38bdf8" />
            <span>Xem mẫu Portfolio cá nhân</span>
          </button>
          <button className="ghost-action" onClick={() => go('hub')}>
            <LayoutDashboard size={18} />
            <span>Khám phá Thử thách dự án</span>
          </button>
        </div>

        {/* Live Stats from MongoDB */}
        <div className="jr-stats-grid">
          <div className="jr-stat-card">
            <span className="jr-stat-num">{kpiStats.currentUserCount}+</span>
            <span className="jr-stat-label">Sinh viên ĐH đã tạo Portfolio (KPI 200-300)</span>
          </div>
          <div className="jr-stat-card">
            <span className="jr-stat-num">95%</span>
            <span className="jr-stat-label">Portfolio đạt chuẩn tuyển dụng doanh nghiệp</span>
          </div>
          <div className="jr-stat-card">
            <span className="jr-stat-num">{kpiStats.completedSubmissions || 100}+</span>
            <span className="jr-stat-label">Dự án & Thử thách thực tế đưa vào hồ sơ</span>
          </div>
          <div className="jr-stat-card">
            <span className="jr-stat-num">{kpiStats.activeMentors || 50}+</span>
            <span className="jr-stat-label">Mentor chuyên gia (FPT Software, VNG, Viettel)</span>
          </div>
        </div>
      </section>

      {/* 4-Step Portfolio Building Process */}
      <section className="content-page">
        <div className="jr-section-title-wrap">
          <span className="jr-sub-pill">Quy trình 4 bước tạo Portfolio hoàn chỉnh</span>
          <h2 className="jr-section-title">Hành Trình Xây Dựng Hồ Sơ Năng Lực Chuẩn Ngành</h2>
          <p className="jr-section-desc">
            Từ việc chọn lộ trình đến hoàn thành dự án có minh chứng thực tế và nhận chứng thực từ Mentor cấp cao.
          </p>
        </div>

        <div className="jr-process-grid">
          <div className="jr-process-card">
            <div className="jr-step-badge">1</div>
            <h3>1. Định Hình Lộ Trình Nghề Nghiệp</h3>
            <p>Chọn chuyên ngành (Frontend, Backend, AI...) và thiết lập cột mốc phát triển kỹ năng từ Foundation đến Senior.</p>
            <button className="jr-step-link-btn" onClick={() => go('roadmap')}>
              Thiết lập lộ trình <ArrowRight size={13} />
            </button>
          </div>

          <div className="jr-process-card">
            <div className="jr-step-badge">2</div>
            <h3>2. Thực Hiện Thử Thách Dự Án</h3>
            <p>Làm các challenge kỹ thuật thực tế từ đề án môn học ĐH FPT (SWP391, PRN231) và chứng chỉ Coursera để tích lũy sản phẩm.</p>
            <button className="jr-step-link-btn" onClick={() => go('hub')}>
              Khám phá Thử thách <ArrowRight size={13} />
            </button>
          </div>

          <div className="jr-process-card">
            <div className="jr-step-badge">3</div>
            <h3>3. Mentor & AI Đánh Giá 2 Chiều</h3>
            <p>Nộp mã nguồn GitHub/Demo, nhận điểm AI tức thì và Mentor doanh nghiệp review chuyên sâu theo khung chuẩn STAR.</p>
            <button className="jr-step-link-btn" onClick={() => go('hub')}>
              Nộp bài & Nhận review <ArrowRight size={13} />
            </button>
          </div>

          <div className="jr-process-card">
            <div className="jr-step-badge">4</div>
            <h3>4. Xuất Bản Trang Portfolio Cá Nhân</h3>
            <p>Tự động tạo trang Public Portfolio công khai có link riêng, xuất CV PDF chuyên nghiệp, thẩm định ATS và sẵn sàng ứng tuyển.</p>
            <button className="jr-step-link-btn" onClick={() => go('portfolio')}>
              Xem trang Portfolio <ArrowRight size={13} />
            </button>
          </div>
        </div>
      </section>

      {/* Feature Showcase Grid */}
      <section className="content-page">
        <div className="jr-section-title-wrap">
          <span className="jr-sub-pill">Tính năng nền tảng</span>
          <h2 className="jr-section-title">Hệ Sinh Thái Hỗ Trợ Xây Dựng Portfolio Toàn Diện</h2>
          <p className="jr-section-desc">Kết hợp giữa bài tập thực tế, đánh giá chuyên gia và công nghệ AI để chuẩn hóa hồ sơ ứng tuyển.</p>
        </div>

        <div className="jr-features-grid">
          <div className="jr-feature-card">
            <div className="jr-feat-icon blue"><Compass size={26} /></div>
            <h3>Bản Đồ Nghề Nghiệp Tương Tác</h3>
            <p>Khám phá cây kỹ năng, vai trò công việc và các cấp độ chuyên môn. Tự do tùy biến lộ trình nghề nghiệp phù hợp với định hướng cá nhân.</p>
          </div>

          <div className="jr-feature-card">
            <div className="jr-feat-icon gold"><Rocket size={26} /></div>
            <h3>Trung Tâm Thử Thách Dự Án (Hub)</h3>
            <p>Kho bài tập thực tế từ cơ bản đến nâng cao. Mỗi thử thách hoàn thành sẽ trở thành một case study chất lượng trong Portfolio của bạn.</p>
          </div>

          <div className="jr-feature-card">
            <div className="jr-feat-icon emerald"><UserRound size={26} /></div>
            <h3>Trang Portfolio Cá Nhân Công Khai</h3>
            <p>Trang Portfolio sinh viên có URL riêng, hiển thị đầy đủ dự án đã làm, kỹ năng đã được xác thực, đánh giá từ mentor và nút xuất CV PDF.</p>
          </div>

          <div className="jr-feature-card">
            <div className="jr-feat-icon emerald"><GraduationCap size={26} /></div>
            <h3>Nguồn Học Liệu Chuẩn Đại Học FPT & Coursera</h3>
            <p>Tổng hợp giáo trình, đề án môn học FPT (SWP391, PRN231, EXE301...) và chứng chỉ chuyên nghiệp Coursera (Google, Meta, AWS) để sinh viên xây dựng dự án thực chiến.</p>
          </div>

          <div className="jr-feature-card">
            <div className="jr-feat-icon blue"><FileUp size={26} /></div>
            <h3>Thẩm Định CV & Portfolio Chuẩn ATS</h3>
            <p>Quét độ tương thích hồ sơ với JD tuyển dụng trong 30 giây. Phát hiện từ khóa thiếu sót và tối ưu điểm số trước khi nộp cho nhà tuyển dụng.</p>
          </div>

          <div className="jr-feature-card">
            <div className="jr-feat-icon gold"><ShieldCheck size={26} /></div>
            <h3>Phân Luồng Mentor & Quỹ Thưởng Phạt</h3>
            <p>AI chấm điểm sơ cấp 0đ, Senior Mentor review 1:1 chuyên sâu. Đánh giá 2 chiều minh bạch, lọc mentor tiêu cực và thưởng mentor xuất sắc.</p>
          </div>
        </div>
      </section>

      {/* Founders Section (Ngay tren Sinh vien noi ve chung toi) */}
      <section className="content-page" style={{ paddingBottom: 0 }}>
        <FoundersSection />
      </section>

      {/* Student Testimonials / Reviews */}
      <section className="content-page">
        <div className="jr-section-title-wrap">
          <span className="jr-sub-pill">Sinh viên nói gì về chúng tôi</span>
          <h2 className="jr-section-title">Review Từ Các Bạn Sinh Viên Đã Sử Dụng</h2>
          <p className="jr-section-desc">Hơn 250+ sinh viên Đại học FPT và người học Coursera đã xây dựng Portfolio chuyên nghiệp và nhận được offer từ doanh nghiệp hàng đầu.</p>
        </div>

        <div className="jr-testimonials-grid">
          <article className="jr-testimonial-card">
            <div className="jr-testimonial-stars">
              {[1,2,3,4,5].map(s => <Star key={s} size={14} fill="#f59e0b" color="#f59e0b" />)}
            </div>
            <p className="jr-testimonial-quote">"Mình đã từng không biết bắt đầu từ đâu khi làm CV. Nhờ hệ thống Portfolio này, mình có ngay lộ trình rõ ràng, làm 3 dự án thực tế và gửi portfolio trực tiếp cho nhà tuyển dụng. Kết quả: nhận intern tại FPT Software chỉ sau 2 tuần!"</p>
            <div className="jr-testimonial-author">
              <div className="jr-testimonial-avatar">TH</div>
              <div>
                <strong>Trần Hương</strong>
                <span>Frontend Developer Intern · ĐH FPT HCM</span>
              </div>
            </div>
          </article>

          <article className="jr-testimonial-card featured">
            <div className="jr-testimonial-stars">
              {[1,2,3,4,5].map(s => <Star key={s} size={14} fill="#f59e0b" color="#f59e0b" />)}
            </div>
            <p className="jr-testimonial-quote">"Điều mình thích nhất là mentor review chuyên sâu theo khung STAR. Không chỉ chấm điểm mà còn gợi ý cách trình bày case study sao cho nhà tuyển dụng ấn tượng. Portfolio của mình sau khi hoàn thiện đã giúp mình pass vòng CV ở Viettel Digital."</p>
            <div className="jr-testimonial-author">
              <div className="jr-testimonial-avatar">NM</div>
              <div>
                <strong>Nguyễn Minh</strong>
                <span>Backend Engineer · ĐH FPT Hà Nội</span>
              </div>
            </div>
          </article>

          <article className="jr-testimonial-card">
            <div className="jr-testimonial-stars">
              {[1,2,3,4,5].map(s => <Star key={s} size={14} fill="#f59e0b" color="#f59e0b" />)}
            </div>
            <p className="jr-testimonial-quote">"Tính năng thẩm định CV chuẩn ATS cực kỳ hữu ích. Mình đã quét CV qua hệ thống, phát hiện thiếu từ khóa quan trọng và sửa ngay. Điểm ATS từ 45 lên 92. HR gọi phỏng vấn ngay tuần sau!"</p>
            <div className="jr-testimonial-author">
              <div className="jr-testimonial-avatar">LT</div>
              <div>
                <strong>Lê Thảo</strong>
                <span>Data Analyst Intern · ĐH FPT Cần Thơ</span>
              </div>
            </div>
          </article>

          <article className="jr-testimonial-card">
            <div className="jr-testimonial-stars">
              {[1,2,3,4,5].map(s => <Star key={s} size={14} fill="#f59e0b" color="#f59e0b" />)}
            </div>
            <p className="jr-testimonial-quote">"Bản đồ nghề nghiệp giúp mình nhìn rõ career path từ Junior đến Senior. Mình chọn track DevOps, làm challenge về Docker + CI/CD và được mentor đánh giá 95/100. Case study này trở thành highlight trong portfolio xin việc."</p>
            <div className="jr-testimonial-author">
              <div className="jr-testimonial-avatar">PD</div>
              <div>
                <strong>Phạm Đức</strong>
                <span>DevOps Engineer · ĐH FPT Đà Nẵng</span>
              </div>
            </div>
          </article>

          <article className="jr-testimonial-card">
            <div className="jr-testimonial-stars">
              {[1,2,3,4,5].map(s => <Star key={s} size={14} fill="#f59e0b" color="#f59e0b" />)}
            </div>
            <p className="jr-testimonial-quote">"Mình ấn tượng với tính năng phỏng vấn AI. Nó giả lập phỏng vấn thật, hỏi behavioral + technical questions và cho feedback tức thì. Sau 5 lần luyện, mình pass vòng phỏng vấn cuối ở MoMo mà không run."</p>
            <div className="jr-testimonial-author">
              <div className="jr-testimonial-avatar">VL</div>
              <div>
                <strong>Vũ Linh</strong>
                <span>Mobile Developer · ĐH FPT TP.HCM</span>
              </div>
            </div>
          </article>

          <article className="jr-testimonial-card">
            <div className="jr-testimonial-stars">
              {[1,2,3,4,5].map(s => <Star key={s} size={14} fill="#f59e0b" color="#f59e0b" />)}
            </div>
            <p className="jr-testimonial-quote">"Gói Premium rất xứng đáng. Mình được mentor senior ở VNG review từng bài, gợi ý cải thiện code quality và portfolio layout. Public portfolio link mình gửi thẳng cho HR, không cần CV truyền thống nữa."</p>
            <div className="jr-testimonial-author">
              <div className="jr-testimonial-avatar">HA</div>
              <div>
                <strong>Hoàng Anh</strong>
                <span>Fullstack Developer · Coursera & ĐH FPT</span>
              </div>
            </div>
          </article>
        </div>
      </section>

      <PortfolioFooter go={go} onOpenUpgrade={onOpenUpgrade} onOpenFooterModal={onOpenFooterModal} />
    </div>
  );
}
