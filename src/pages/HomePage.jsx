import React from 'react';
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
import { CHALLENGES } from '../../shared/catalog.js';

const exampleJourneys = [
  ['01', 'Bắt đầu từ định hướng', 'Sinh viên mới bắt đầu', 'Chọn một ngành phù hợp, xem yêu cầu kỹ năng và bắt đầu với thử thách cơ bản.'],
  ['02', 'Biến kiến thức thành sản phẩm', 'Luyện tập qua dự án', 'Đọc yêu cầu, tham khảo học liệu và lưu liên kết sản phẩm cùng phần giải thích cách làm.'],
  ['03', 'Kiểm tra trước khi nộp', 'Chuẩn bị minh chứng', 'Kiểm tra liên kết, mô tả và kỹ năng. Gợi ý AI chỉ xuất hiện khi dịch vụ được cấu hình và bạn đồng ý.'],
  ['04', 'Nhận góc nhìn chuyên môn', 'Sinh viên Premium', 'Chọn mentor phù hợp với bài tập, xem tình trạng hàng đợi và nhận góp ý theo tiêu chí của bài.'],
  ['05', 'Cải thiện qua phản hồi', 'Hoàn thiện bài làm', 'Trao đổi với mentor trong bài nộp và chỉnh sửa khi được yêu cầu. Đánh giá sao sau khi hoàn tất.'],
  ['06', 'Sẵn sàng giới thiệu năng lực', 'Xây dựng hồ sơ cá nhân', 'Tổng hợp sản phẩm đã hoàn thành và chủ động quyết định có chia sẻ hồ sơ nổi bật với mentor hay không.']
];

export function HomePage({ go, onOpenUpgrade, onOpenFooterModal }) {
  return (
    <div className="jr-home-wrapper">
      {/* Hero Section */}
      <section className="jr-hero">
        <div className="jr-hero-badge">
          <span className="jr-badge-pulse" />
          <span>HỆ THỐNG XÂY DỰNG PORTFOLIO NGHỀ NGHIỆP · HỌC QUA DỰ ÁN · PHÁT TRIỂN NĂNG LỰC</span>
        </div>

        <h1 className="jr-hero-title">
          Xây Dựng Portfolio Chuẩn Doanh Nghiệp, <br />
          <span className="jr-gradient-text">Chinh Phục Mọi Nhà Tuyển Dụng</span>
        </h1>

        <p className="jr-hero-subtitle">
          Nền tảng hướng nghiệp thực chiến dành cho sinh viên đại học: Định hình lộ trình nghề nghiệp (Roadmap),
          thực hiện các bài tập dự án (Challenge Hub), kiểm tra bài nộp và nhận góp ý từ Mentor,
          và xây dựng Portfolio cá nhân từ những sản phẩm bạn thực sự hoàn thành.
        </p>

        <div className="jr-hero-actions">
          <button className="jr-btn-primary" onClick={() => go('roadmap')}>
            <Rocket size={18} />
            <span>Bắt đầu tạo Portfolio ngay</span>
            <ArrowRight size={16} />
          </button>
          <button className="jr-btn-secondary" onClick={() => go('portfolio')}>
            <UserRound size={18} color="#38bdf8" />
            <span>Khám phá Portfolio cá nhân</span>
          </button>
          <button className="ghost-action" onClick={() => go('hub')}>
            <LayoutDashboard size={18} />
            <span>Khám phá Thử thách dự án</span>
          </button>
        </div>

        {/* Live Stats from MongoDB */}
        <div className="jr-stats-grid">
          <div className="jr-stat-card">
            <span className="jr-stat-num">{CHALLENGES.length}</span>
            <span className="jr-stat-label">Thử thách dự án có tiêu chí rõ ràng</span>
          </div>
          <div className="jr-stat-card">
            <span className="jr-stat-num">3</span>
            <span className="jr-stat-label">Nhóm ngành: lập trình, marketing, thiết kế</span>
          </div>
          <div className="jr-stat-card">
            <span className="jr-stat-num">3</span>
            <span className="jr-stat-label">Trình độ từ cơ bản đến nâng cao</span>
          </div>
          <div className="jr-stat-card">
            <span className="jr-stat-num">4</span>
            <span className="jr-stat-label">Bước xây dựng hồ sơ năng lực</span>
          </div>
        </div>
      </section>

      {/* 4-Step Portfolio Building Process */}
      <section className="content-page">
        <div className="jr-section-title-wrap">
          <span className="jr-sub-pill">Quy trình 4 bước tạo Portfolio hoàn chỉnh</span>
          <h2 className="jr-section-title">Hành Trình Xây Dựng Hồ Sơ Năng Lực Chuẩn Ngành</h2>
          <p className="jr-section-desc">
            Từ việc chọn lộ trình đến hoàn thành dự án có minh chứng thực tế và nhận góp ý từ mentor phù hợp.
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
            <p>Luyện tập với bài tập do nền tảng biên soạn, tham khảo học liệu FPT và Coursera qua các liên kết nguồn.</p>
            <button className="jr-step-link-btn" onClick={() => go('hub')}>
              Khám phá Thử thách <ArrowRight size={13} />
            </button>
          </div>

          <div className="jr-process-card">
            <div className="jr-step-badge">3</div>
            <h3>3. Mentor & AI Đánh Giá 2 Chiều</h3>
            <p>Nộp liên kết GitHub, demo hoặc CV. Kiểm tra tự động trước khi chọn mentor chấm theo rubric riêng của từng bài.</p>
            <button className="jr-step-link-btn" onClick={() => go('hub')}>
              Nộp bài & Nhận review <ArrowRight size={13} />
            </button>
          </div>

          <div className="jr-process-card">
            <div className="jr-step-badge">4</div>
            <h3>4. Hoàn Thiện Hồ Sơ Năng Lực</h3>
            <p>Tổng hợp bài làm đã hoàn thành, kỹ năng và nhận xét của mentor thành hồ sơ năng lực để tiếp tục phát triển.</p>
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
            <h3>Hồ Sơ Năng Lực Cá Nhân</h3>
            <p>Theo dõi dự án đã làm, kỹ năng và đánh giá từ mentor. Bạn chủ động quản lý thông tin và quyền chia sẻ hồ sơ nổi bật.</p>
          </div>

          <div className="jr-feature-card">
            <div className="jr-feat-icon emerald"><GraduationCap size={26} /></div>
            <h3>Nguồn Học Liệu Chuẩn Đại Học FPT & Coursera</h3>
            <p>Liên kết đến cổng học tập FPT và các chương trình Google, Meta trên Coursera. Tài liệu nội bộ cần tài khoản và quyền truy cập hợp lệ.</p>
          </div>

          <div className="jr-feature-card">
            <div className="jr-feat-icon blue"><FileUp size={26} /></div>
            <h3>Gửi CV & Trao Đổi Với Mentor</h3>
            <p>Gửi liên kết CV hoặc trao đổi trong bài nộp để làm rõ mục tiêu và nhận góp ý. Không cần tải nhiều tệp lên hệ thống.</p>
          </div>

          <div className="jr-feature-card">
            <div className="jr-feat-icon gold"><ShieldCheck size={26} /></div>
            <h3>Phân Luồng Mentor & Quỹ Thưởng Phạt</h3>
            <p>Tách biệt kiểm tra tự động và mentor thật. Mentor nhận phí 5.000đ cho bài hoàn tất và thưởng theo sao; chất lượng được theo dõi minh bạch.</p>
          </div>
        </div>
      </section>

      {/* Founders Section (Ngay tren Sinh vien noi ve chung toi) */}
      <section className="content-page" style={{ paddingBottom: 0 }}>
        <FoundersSection />
      </section>

      {/* Example journeys retain the original testimonial layout without invented endorsements. */}
      <section className="content-page">
        <div className="jr-section-title-wrap">
          <span className="jr-sub-pill">Bạn có thể bắt đầu như thế nào?</span>
          <h2 className="jr-section-title">Mỗi Bước Nhỏ Đều Làm Hồ Sơ Tốt Hơn</h2>
          <p className="jr-section-desc">Các hành trình minh họa để bạn hình dung cách sử dụng nền tảng, không phải lời chứng thực hay cam kết tuyển dụng.</p>
        </div>
        <div className="jr-testimonials-grid">
          {exampleJourneys.map(([number, title, audience, description], index) => <article key={number} className={`jr-testimonial-card${index === 1 ? ' featured' : ''}`}>
            <div className="jr-testimonial-stars"><Star size={18} color="#d97706" /><span>HÀNH TRÌNH MINH HỌA</span></div>
            <p className="jr-testimonial-quote">{description}</p>
            <div className="jr-testimonial-author">
              <div className="jr-testimonial-avatar">{number}</div>
              <div><strong>{title}</strong><span>{audience}</span></div>
            </div>
          </article>)}
        </div>
      </section>

      <PortfolioFooter go={go} onOpenUpgrade={onOpenUpgrade} onOpenFooterModal={onOpenFooterModal} />
    </div>
  );
}
