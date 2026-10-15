import React from 'react';
import { ArrowRight, FileText } from 'lucide-react';

export function PortfolioFooter({ go, isGuest, onOpenUpgrade, onOpenFooterModal, onRegisterMentor }) {
  return (
    <footer className="jr-main-footer">
      <div className="jr-footer-container">
        {/* CTA BANNER */}
        <div className="jr-cta-banner-v2" style={{ marginBottom: '52px', marginTop: 0 }}>
          <h2 className="jr-cta-title-v2">
            <span className="white-text">SẴN SÀNG XÂY DỰNG</span>
            <span className="gold-text">PORTFOLIO NGHỀ NGHIỆP?</span>
          </h2>
          <p className="jr-cta-desc-v2">
            Hoàn thiện hồ sơ năng lực qua dự án thực hành, nhận góp ý từ mentor và chuẩn bị cho hành trình ứng tuyển của bạn.
          </p>
          <div className="jr-cta-actions-v2">
            <button className="jr-btn-gold-action" onClick={() => go('roadmap')}>
              <span>Khám phá lộ trình</span>
              <ArrowRight size={17} />
            </button>
            <button className="jr-btn-glass-action" onClick={onOpenUpgrade}>
              <FileText size={17} />
              <span>Xem gói Premium</span>
            </button>
          </div>
        </div>

        {/* FOOTER COLUMNS */}
        <div className="jr-footer-top">
          {/* Brand Column */}
          <div className="jr-footer-brand-wrap">
            <div className="jr-footer-logo-line">
              <span className="beelearn-footer-brand">
                <img src={`${import.meta.env.BASE_URL}beelearn-brand.png`} alt="" />
                <span className="jr-footer-logo-text">BeeLearn</span>
              </span>
            </div>
            <p className="jr-footer-tagline">
              Hệ thống xây dựng hồ sơ năng lực & định hướng nghề nghiệp sinh viên — Học qua dự án, đồng hành cùng mentor.
            </p>
            <div className="jr-footer-socials">
              <a href="https://www.facebook.com/profile.php?id=61594472743445" target="_blank" rel="noopener noreferrer" className="jr-social-btn" title="Facebook" aria-label="Facebook BeeLearn">
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
            </div>
          </div>

          {/* Col 1: Về chúng tôi */}
          <div className="jr-footer-col">
            <h4>Về Chúng Tôi</h4>
            <ul className="jr-footer-links-list">
              <li><button type="button" className="jr-footer-link-btn" onClick={() => onOpenFooterModal('about')}>Giới thiệu BeeLearn</button></li>
              <li><button type="button" className="jr-footer-link-btn" onClick={() => onOpenFooterModal('contact')}>Thông tin liên hệ</button></li>
              <li><button type="button" className="jr-footer-link-btn" onClick={() => onOpenFooterModal('terms')}>Điều khoản sử dụng</button></li>
              <li><button type="button" className="jr-footer-link-btn" onClick={() => onOpenFooterModal('privacy')}>Chính sách bảo mật</button></li>
               <li><button type="button" className="jr-footer-link-btn highlight" onClick={() => onOpenFooterModal('mentor-rubric')}>Cách mentor góp ý bài làm</button></li>
            </ul>
          </div>

          {/* Col 2: Sinh viên */}
          <div className="jr-footer-col">
            <h4>Sinh Viên</h4>
            <ul className="jr-footer-links-list">
              <li><button type="button" className="jr-footer-link-btn" onClick={() => go('roadmap')}>Bản đồ nghề nghiệp</button></li>
              <li><button type="button" className="jr-footer-link-btn" onClick={() => go('hub')}>Thử thách dự án thực hành</button></li>
              <li><button type="button" className="jr-footer-link-btn" onClick={() => go('hub')}>Nộp bài & Nhận review</button></li>
              <li><button type="button" className="jr-footer-link-btn" onClick={() => go('portfolio')}>{isGuest ? 'Tạo hồ sơ năng lực' : 'Hồ sơ năng lực cá nhân'}</button></li>
              <li><button type="button" className="jr-footer-link-btn highlight" onClick={onOpenUpgrade}>Nâng cấp gói VIP</button></li>
            </ul>
          </div>

          {/* Col 3: Mentor đồng hành */}
          <div className="jr-footer-col">
            <h4>Mentor Đồng Hành</h4>
            <ul className="jr-footer-links-list">
              <li><button type="button" className="jr-footer-link-btn highlight" onClick={() => onOpenFooterModal('mentor-rubric')}>Tiêu chuẩn Mentor Review</button></li>
              <li><button type="button" className="jr-footer-link-btn" onClick={() => onOpenFooterModal('mentor-agreement')}>Thỏa thuận cộng tác Mentor</button></li>
              <li><button type="button" className="jr-footer-link-btn" onClick={() => onOpenFooterModal('mentor-rubric')}>Đánh giá chất lượng 2 chiều</button></li>
              <li><button type="button" className="jr-footer-link-btn" onClick={onRegisterMentor}>Đăng ký làm Mentor</button></li>
              <li><button type="button" className="jr-footer-link-btn" onClick={() => onOpenFooterModal('employer')}>Hợp tác Doanh nghiệp tuyển dụng</button></li>
            </ul>
          </div>
        </div>

        {/* BOTTOM COPYRIGHT */}
        <div className="jr-footer-bottom">
          <div>
            © 2026 BeeLearn. Tất cả các quyền được bảo lưu.
          </div>
          <div>
            Dự án nghiên cứu & khởi nghiệp của nhóm sinh viên <b>EXE201 - Đại học FPT</b>
          </div>
        </div>
      </div>
    </footer>
  );
}
