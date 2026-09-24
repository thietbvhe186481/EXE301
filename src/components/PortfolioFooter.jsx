import React from 'react';
import { ArrowRight, FileText, Rocket } from 'lucide-react';

export function PortfolioFooter({ go, onOpenUpgrade, onOpenFooterModal }) {
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
            Tham gia cùng hơn 250+ sinh viên FPT — hoàn thiện hồ sơ năng lực thực chiến, nhận góp ý từ Mentor và tự tin ứng tuyển doanh nghiệp.
          </p>
          <div className="jr-cta-actions-v2">
            <button className="jr-btn-gold-action" onClick={() => go('roadmap')}>
              <span>Bắt đầu tạo Portfolio ngay</span>
              <ArrowRight size={17} />
            </button>
            <button className="jr-btn-glass-action" onClick={onOpenUpgrade}>
              <FileText size={17} />
              <span>Xem các gói đồng hành VIP</span>
            </button>
          </div>
        </div>

        {/* FOOTER COLUMNS */}
        <div className="jr-footer-top">
          {/* Brand Column */}
          <div className="jr-footer-brand-wrap">
            <div className="jr-footer-logo-line">
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                <Rocket size={24} color="#f59e0b" />
                <span className="jr-footer-logo-text">Portfolio</span>
                <span style={{ background: '#0284c7', color: '#fff', padding: '2px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: 800, letterSpacing: '0.5px' }}>
                  FPT HUB
                </span>
              </span>
            </div>
            <p className="jr-footer-tagline">
              Hệ thống xây dựng hồ sơ năng lực & định hướng nghề nghiệp sinh viên — Đồng hành cùng Mentor FPT & Doanh nghiệp.
            </p>
            <div className="jr-footer-socials">
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="jr-social-btn" title="Facebook">
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="jr-social-btn" title="LinkedIn">
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="jr-social-btn" title="Twitter / X">
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="jr-social-btn" title="Instagram">
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
            </div>
          </div>

          {/* Col 1: Về chúng tôi */}
          <div className="jr-footer-col">
            <h4>Về Chúng Tôi</h4>
            <ul className="jr-footer-links-list">
              <li><button type="button" className="jr-footer-link-btn" onClick={() => onOpenFooterModal('about')}>Giới thiệu Portfolio</button></li>
              <li><button type="button" className="jr-footer-link-btn" onClick={() => onOpenFooterModal('contact')}>Thông tin liên hệ</button></li>
              <li><button type="button" className="jr-footer-link-btn" onClick={() => onOpenFooterModal('terms')}>Điều khoản sử dụng</button></li>
              <li><button type="button" className="jr-footer-link-btn" onClick={() => onOpenFooterModal('privacy')}>Chính sách bảo mật</button></li>
              <li><button type="button" className="jr-footer-link-btn highlight" onClick={() => onOpenFooterModal('mentor-rubric')}>Quy chuẩn Mentor Review</button></li>
            </ul>
          </div>

          {/* Col 2: Sinh viên */}
          <div className="jr-footer-col">
            <h4>Sinh Viên</h4>
            <ul className="jr-footer-links-list">
              <li><button type="button" className="jr-footer-link-btn" onClick={() => go('roadmap')}>Bản đồ nghề nghiệp</button></li>
              <li><button type="button" className="jr-footer-link-btn" onClick={() => go('hub')}>Thử thách dự án FPT & Coursera</button></li>
              <li><button type="button" className="jr-footer-link-btn" onClick={() => go('hub')}>Nộp bài & Nhận review</button></li>
              <li><button type="button" className="jr-footer-link-btn" onClick={() => go('portfolio')}>Phân tích CV chuẩn ATS</button></li>
              <li><button type="button" className="jr-footer-link-btn highlight" onClick={onOpenUpgrade}>Nâng cấp gói VIP</button></li>
            </ul>
          </div>

          {/* Col 3: Mentor đồng hành */}
          <div className="jr-footer-col">
            <h4>Mentor Đồng Hành</h4>
            <ul className="jr-footer-links-list">
              <li><button type="button" className="jr-footer-link-btn highlight" onClick={() => onOpenFooterModal('mentor-rubric')}>Tiêu chuẩn Mentor Review</button></li>
              <li><button type="button" className="jr-footer-link-btn" onClick={() => onOpenFooterModal('mentor-rubric')}>Quy chế thù lao & Quỹ thưởng</button></li>
              <li><button type="button" className="jr-footer-link-btn" onClick={() => onOpenFooterModal('mentor-rubric')}>Đánh giá chất lượng 2 chiều</button></li>
              <li><button type="button" className="jr-footer-link-btn" onClick={() => onOpenFooterModal('contact')}>Đăng ký làm Mentor</button></li>
              <li><button type="button" className="jr-footer-link-btn" onClick={() => onOpenFooterModal('employer')}>Hợp tác Doanh nghiệp tuyển dụng</button></li>
            </ul>
          </div>
        </div>

        {/* BOTTOM COPYRIGHT */}
        <div className="jr-footer-bottom">
          <div>
            © 2026 Portfolio FPT HUB. Tất cả các quyền được bảo lưu.
          </div>
          <div>
            Dự án nghiên cứu & khởi nghiệp của nhóm sinh viên <b>EXE301 - Đại học FPT</b>
          </div>
        </div>
      </div>
    </footer>
  );
}
