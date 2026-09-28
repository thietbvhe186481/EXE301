import React from 'react';
import {
  ArrowRight,
  Compass,
  BarChart3,
  CheckCircle2,
  GraduationCap,
  LayoutDashboard,
  Rocket,
  Star,
  UserRound
} from 'lucide-react';
import { FoundersSection } from '../components/FoundersSection';
import { PortfolioFooter } from '../components/PortfolioFooter';
import { CHALLENGES } from '../../shared/catalog.js';

const exampleJourneys = [
  ['01', 'Bắt đầu từ định hướng', 'Sinh viên mới bắt đầu', 'Chọn một ngành phù hợp, xem yêu cầu kỹ năng và bắt đầu với thử thách cơ bản.'],
  ['02', 'Biến kiến thức thành sản phẩm', 'Luyện tập qua dự án', 'Đọc yêu cầu, tham khảo học liệu và lưu liên kết sản phẩm cùng phần giải thích cách làm.'],
  ['03', 'Kiểm tra trước khi nộp', 'Chuẩn bị minh chứng', 'Đối chiếu bài làm với yêu cầu, kiểm tra liên kết và mô tả rõ phần bạn đã thực hiện.'],
  ['04', 'Nhận góc nhìn chuyên môn', 'Sinh viên Premium', 'Chọn mentor phù hợp với bài tập, xem tình trạng hàng đợi và nhận góp ý theo tiêu chí của bài.'],
  ['05', 'Cải thiện qua phản hồi', 'Hoàn thiện bài làm', 'Trao đổi với mentor trong bài nộp và chỉnh sửa khi được yêu cầu. Đánh giá sao sau khi hoàn tất.'],
  ['06', 'Sẵn sàng giới thiệu năng lực', 'Xây dựng hồ sơ cá nhân', 'Tổng hợp sản phẩm đã hoàn thành và chủ động quyết định có chia sẻ hồ sơ nổi bật với mentor hay không.']
];

export function HomePage({ go, onOpenUpgrade, onOpenFooterModal, onRegisterMentor }) {
  return (
    <div className="jr-home-wrapper">
      {/* Hero Section */}
      <section className="jr-hero">
        <div className="jr-hero-badge">
          <span className="jr-badge-pulse" />
          <span>HỆ THỐNG XÂY DỰNG PORTFOLIO NGHỀ NGHIỆP · HỌC QUA DỰ ÁN · PHÁT TRIỂN NĂNG LỰC</span>
        </div>

        <h1 className="jr-hero-title">
          <span>Học qua dự án thực tế.</span>
          <span className="jr-gradient-text">Xây portfolio có minh chứng.</span>
        </h1>

        <p className="jr-hero-subtitle">
          Chọn lộ trình nghề nghiệp, thực hành với thử thách vừa sức và lưu lại sản phẩm có minh chứng.
          Nhận góp ý theo tiêu chí rõ ràng để từng bước hoàn thiện hồ sơ của bạn.
        </p>

        <div className="jr-hero-actions">
          <button className="jr-btn-primary" onClick={() => go('roadmap')}>
            <Rocket size={18} />
            <span>Khám phá lộ trình</span>
            <ArrowRight size={16} />
          </button>
          <button className="jr-btn-secondary" onClick={() => go('hub')}>
            <LayoutDashboard size={18} />
            <span>Xem thử thách dự án</span>
          </button>
        </div>

        {/* Catalogue summary */}
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
          <h2 className="jr-section-title">Từ định hướng đến sản phẩm đầu tiên</h2>
          <p className="jr-section-desc">
            Bốn bước dễ theo dõi để biến điều bạn học thành bài làm có thể giới thiệu trong portfolio.
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
            <h3>3. Nhận Phản Hồi Theo Tiêu Chí</h3>
            <p>Nộp liên kết sản phẩm và mô tả cách làm. Xem kiểm tra thông tin ban đầu hoặc chọn mentor góp ý theo từng tiêu chí của bài.</p>
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
          <h2 className="jr-section-title">Những công cụ giúp bạn tiến bộ qua từng bài làm</h2>
          <p className="jr-section-desc">Tìm hướng học, hiểu yêu cầu bài tập và biết nên cải thiện điều gì ở bước tiếp theo.</p>
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
            <p>Kho bài tập từ cơ bản đến nâng cao. Bạn có thể đưa bài làm vào portfolio khi trình bày rõ quá trình, kết quả và minh chứng.</p>
          </div>

          <div className="jr-feature-card">
            <div className="jr-feat-icon emerald"><UserRound size={26} /></div>
            <h3>Hồ Sơ Năng Lực Cá Nhân</h3>
            <p>Theo dõi dự án đã làm, kỹ năng và đánh giá từ mentor. Bạn chủ động quản lý thông tin và quyền chia sẻ hồ sơ nổi bật.</p>
          </div>

          <div className="jr-feature-card">
            <div className="jr-feat-icon emerald"><GraduationCap size={26} /></div>
            <h3>Học liệu từ FPT & Coursera</h3>
            <p>Liên kết đến cổng học tập FPT và các chương trình Google, Meta trên Coursera. Tài liệu nội bộ cần tài khoản và quyền truy cập hợp lệ.</p>
          </div>

          <div className="jr-feature-card">
            <div className="jr-feat-icon blue"><CheckCircle2 size={26} /></div>
            <h3>Biết rõ tiêu chí trước khi làm bài</h3>
            <p>Mỗi thử thách nêu đầu ra cần có, mức độ khó và tiêu chí đánh giá. Bạn có thể tự kiểm tra bài làm trước khi nộp và xem phần góp ý theo từng tiêu chí.</p>
          </div>

          <div className="jr-feature-card">
            <div className="jr-feat-icon gold"><BarChart3 size={26} /></div>
            <h3>Nhìn thấy tiến độ học tập</h3>
            <p>Quản lý các dự án đã làm trong hồ sơ cá nhân, xem trạng thái bài nộp và tiếp tục hoàn thiện sản phẩm từ phản hồi nhận được.</p>
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

      <PortfolioFooter go={go} onOpenUpgrade={onOpenUpgrade} onOpenFooterModal={onOpenFooterModal} onRegisterMentor={onRegisterMentor} />
    </div>
  );
}
