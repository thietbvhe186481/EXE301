import React, { useEffect, useMemo, useState } from 'react';
import {
  BookOpen,
  Compass,
  ExternalLink,
  FileCheck2,
  GraduationCap,
  MessageSquare,
  Rocket,
  ShieldCheck,
  Star
} from 'lucide-react';
import { CHALLENGES, RESOURCES } from '../../shared/catalog.js';
import { apiService } from '../services/api';


export function AboutPage({ go, onOpenUpgrade, onOpenFooterModal, currentUser }) {
  const [studentReviews, setStudentReviews] = useState([]);
  const [completedChallenges, setCompletedChallenges] = useState([]);
  const [loadingReviews, setLoadingReviews] = useState(true);
  const [loadingHistory, setLoadingHistory] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [submitSuccessNotice, setSubmitSuccessNotice] = useState('');
  const [newReviewForm, setNewReviewForm] = useState({ challengeId: '', rating: 5, outcome: '', quote: '' });
  const role = currentUser?.type || currentUser?.user?.role || currentUser?.role || 'guest';
  const isStudent = role === 'student';

  const companyStats = [
    { value: CHALLENGES.length, label: 'Thử thách thực hành', note: 'Có bối cảnh, yêu cầu nộp và tiêu chí đánh giá theo từng lĩnh vực.' },
    { value: '3 lĩnh vực', label: 'Lộ trình nghề nghiệp', note: 'Công nghệ & dữ liệu, marketing, thiết kế & UX.' },
    { value: '2 cách', label: 'Nhận phản hồi', note: 'Xem kiểm tra sơ bộ hoặc nhận góp ý từ mentor đã được duyệt.' },
    { value: 'Chủ động', label: 'Chia sẻ hồ sơ', note: 'Bạn quyết định có cho mentor xem bài nổi bật của mình hay không.' }
  ];

  const learningSources = useMemo(() => {
    const seen = new Set();
    return RESOURCES.filter(resource => {
      if (!resource.url || seen.has(resource.url)) return false;
      seen.add(resource.url);
      return /^https?:\/\//i.test(resource.url);
    }).slice(0, 8);
  }, []);

  useEffect(() => {
    let cancelled = false;
    apiService.getReviews().then(rows => {
      if (!cancelled) setStudentReviews(Array.isArray(rows) ? rows : []);
    }).finally(() => {
      if (!cancelled) setLoadingReviews(false);
    });
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    if (!isStudent) {
      setCompletedChallenges([]);
      return undefined;
    }
    let cancelled = false;
    setLoadingHistory(true);
    apiService.getWorkflowState().then(state => {
      if (cancelled) return;
      const catalog = new Map((state.catalog || CHALLENGES).map(challenge => [challenge.id, challenge]));
      const seen = new Set();
      const done = (state.submissions || [])
        .filter(submission => submission.status === 'completed' && !seen.has(submission.challengeId) && seen.add(submission.challengeId))
        .map(submission => catalog.get(submission.challengeId))
        .filter(Boolean);
      setCompletedChallenges(done);
      setNewReviewForm(form => ({ ...form, challengeId: done.some(challenge => challenge.id === form.challengeId) ? form.challengeId : done[0]?.id || '' }));
    }).catch(() => {
      if (!cancelled) setSubmitError('Chưa tải được lịch sử thử thách. Vui lòng đăng nhập lại hoặc thử tải lại trang.');
    }).finally(() => {
      if (!cancelled) setLoadingHistory(false);
    });
    return () => { cancelled = true; };
  }, [isStudent, currentUser?.user?.id]);

  const handleReviewSubmit = async event => {
    event.preventDefault();
    setSubmitError('');
    setSubmitSuccessNotice('');
    if (!isStudent) {
      setSubmitError('Vui lòng đăng nhập bằng tài khoản sinh viên để gửi chia sẻ.');
      return;
    }
    if (!newReviewForm.challengeId || newReviewForm.quote.trim().length < 30) {
      setSubmitError('Chọn một thử thách đã hoàn thành và viết chia sẻ ít nhất 30 ký tự.');
      return;
    }
    setSubmitting(true);
    try {
      await apiService.createReview({
        challengeId: newReviewForm.challengeId,
        rating: Number(newReviewForm.rating),
        outcome: newReviewForm.outcome.trim(),
        quote: newReviewForm.quote.trim()
      });
      setNewReviewForm({ challengeId: newReviewForm.challengeId, rating: 5, outcome: '', quote: '' });
      setSubmitSuccessNotice('Đã gửi chia sẻ. Nội dung sẽ được hiển thị sau khi quản trị viên kiểm duyệt.');
    } catch (error) {
      setSubmitError(error.message || 'Chưa gửi được chia sẻ. Vui lòng thử lại.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="content-page about-company-page">
      <div className="section-heading inline">
        <div>
          <p className="mono-label">BEELEARN</p>
          <h1>Biến kỹ năng thành sản phẩm có thể trình bày.</h1>
          <p>Chọn một thử thách vừa sức, hoàn thiện sản phẩm theo yêu cầu rõ ràng, rồi nhận góp ý để biết bước tiếp theo cần làm.</p>
        </div>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <button className="primary-action compact" onClick={() => go('roadmap')}><Compass size={16} /> Khám phá lộ trình</button>
          <button className="ghost-action compact" onClick={() => go('hub')}><Rocket size={16} /> Chọn thử thách</button>
        </div>
      </div>

      <div className="company-stats-grid">
        {companyStats.map(stat => (
          <div className="company-stat-card" key={stat.label}>
            <span className="stat-big-val">{stat.value}</span>
            <strong className="stat-main-label">{stat.label}</strong>
            <p className="stat-sub-note">{stat.note}</p>
          </div>
        ))}
      </div>

      <article className="about-block">
        <div className="block-header"><FileCheck2 size={22} /><div><h2>Cách học và nhận review</h2><p>Mỗi bước đều cho bạn biết cần chuẩn bị gì và kết quả tiếp theo là gì.</p></div></div>
        <div className="company-stats-grid">
          <div className="company-stat-card"><span className="stat-big-val">01</span><strong className="stat-main-label">Chọn thử thách</strong><p className="stat-sub-note">Lọc theo lĩnh vực, cấp độ và quyền truy cập. Đọc kết quả cần có, thời gian dự kiến và tiêu chí đánh giá trước khi bắt đầu.</p></div>
          <div className="company-stat-card"><span className="stat-big-val">02</span><strong className="stat-main-label">Nộp minh chứng</strong><p className="stat-sub-note">Gửi tối đa ba đường dẫn và mô tả ngắn. Bạn có thể cập nhật bài trên dịch vụ lưu trữ mình đang dùng.</p></div>
          <div className="company-stat-card"><span className="stat-big-val">03</span><strong className="stat-main-label">Nhận phản hồi</strong><p className="stat-sub-note">Xem phần kiểm tra sơ bộ hoặc nhận góp ý của mentor theo từng tiêu chí của bài.</p></div>
        </div>
      </article>

      <article className="about-block">
        <div className="block-header"><BookOpen size={22} /><div><h2>Nguồn học liệu tham khảo</h2><p>Liên kết đến trang công khai của đơn vị cung cấp; BeeLearn không đại diện hoặc tuyên bố hợp tác với các đơn vị này.</p></div></div>
        <div className="learning-source-list">
          {learningSources.map(resource => (
            <a className="learning-source-card" href={resource.url} target="_blank" rel="noreferrer" key={resource.id}>
              <span><strong>{resource.title}</strong><small>{resource.source || resource.schoolSource || 'Nguồn công khai'} · {resource.note || 'Điều kiện sử dụng do nhà cung cấp quy định.'}</small></span><ExternalLink size={16} />
            </a>
          ))}
          {!learningSources.length && <p className="empty-state">Học liệu đang được cập nhật.</p>}
        </div>
      </article>

      <article className="about-block">
        <div className="block-header"><MessageSquare size={22} /><div><h2>Chia sẻ đã được xác minh</h2><p>Chỉ chia sẻ gắn với thử thách đã hoàn thành mới được gửi kiểm duyệt. Tên và lĩnh vực lấy từ hồ sơ tài khoản.</p></div></div>
        {loadingReviews ? <p className="status-banner" role="status">Đang tải chia sẻ…</p> : studentReviews.length ? (
          <div className="student-reviews-waterfall">
            {studentReviews.map(review => (
              <div className="student-review-card animate-in" key={review.id}>
                <div className="rev-header"><div className="rev-avatar" style={{ background: review.avatarBg || '#10b981' }}>{String(review.name || 'S').charAt(0)}</div><div><strong>{review.name}</strong><span>{review.major} · {review.school}</span></div><div className="rev-stars">{Array.from({ length: Number(review.rating) || 0 }).map((_, index) => <Star key={index} size={14} fill="#f59e0b" color="#f59e0b" />)}</div></div>
                {review.outcome && <div className="rev-outcome-tag">{review.outcome}</div>}
                <p className="rev-quote">“{review.quote}”</p>
                <div className="rev-footer"><span className="track-badge">{review.roleTrack || 'Thử thách đã hoàn thành'}</span><span className="rev-date">{review.date}</span></div>
              </div>
            ))}
          </div>
        ) : <div className="empty-state"><MessageSquare size={22} /><p>Chưa có chia sẻ nào được duyệt. Bạn có thể gửi chia sẻ sau khi hoàn thành thử thách.</p></div>}

        <div className="add-review-section">
          <h3>Chia sẻ trải nghiệm của bạn</h3>
          <p>Chia sẻ được quản trị viên kiểm duyệt trước khi xuất hiện công khai. Không nhập thông tin cá nhân nhạy cảm.</p>
          {submitError && <div className="status-banner error" role="alert">{submitError}</div>}
          {submitSuccessNotice && <div className="status-banner success" role="status"><ShieldCheck size={16} /> {submitSuccessNotice}</div>}
          {!isStudent ? <div className="empty-state"><GraduationCap size={22} /><p>Đăng nhập bằng tài khoản sinh viên để gửi chia sẻ gắn với thử thách đã hoàn thành.</p><button type="button" className="primary-action compact" onClick={() => go('auth')}>Đăng nhập / đăng ký</button></div> : loadingHistory ? <p className="status-banner" role="status">Đang kiểm tra lịch sử thử thách…</p> : !completedChallenges.length ? <div className="empty-state"><GraduationCap size={22} /><p>Bạn cần hoàn thành ít nhất một thử thách trước khi gửi chia sẻ.</p><button type="button" className="primary-action compact" onClick={() => go('hub')}>Tìm thử thách phù hợp</button></div> : (
            <form onSubmit={handleReviewSubmit} className="review-submit-form">
              <div className="form-group"><label htmlFor="testimonial-challenge">Thử thách đã hoàn thành</label><select id="testimonial-challenge" value={newReviewForm.challengeId} onChange={event => setNewReviewForm({ ...newReviewForm, challengeId: event.target.value })}>{completedChallenges.map(challenge => <option key={challenge.id} value={challenge.id}>{challenge.title}</option>)}</select></div>
              <div className="form-row"><div className="form-group"><label htmlFor="testimonial-rating">Đánh giá trải nghiệm</label><select id="testimonial-rating" value={newReviewForm.rating} onChange={event => setNewReviewForm({ ...newReviewForm, rating: Number(event.target.value) })}>{[5, 4, 3, 2, 1].map(rating => <option key={rating} value={rating}>{rating} sao</option>)}</select></div><div className="form-group"><label htmlFor="testimonial-outcome">Kết quả (không bắt buộc)</label><input id="testimonial-outcome" maxLength={180} value={newReviewForm.outcome} onChange={event => setNewReviewForm({ ...newReviewForm, outcome: event.target.value })} placeholder="Ví dụ: hoàn thiện được bản demo đầu tiên" /></div></div>
              <div className="form-group"><label htmlFor="testimonial-quote">Trải nghiệm và góp ý *</label><textarea id="testimonial-quote" required minLength={30} maxLength={2000} rows={4} value={newReviewForm.quote} onChange={event => setNewReviewForm({ ...newReviewForm, quote: event.target.value })} placeholder="Điều gì hữu ích, khó khăn nào bạn gặp và bạn muốn cải thiện gì?" /></div>
              <button type="submit" className="primary-action compact" disabled={submitting}><Rocket size={16} />{submitting ? 'Đang gửi…' : 'Gửi để kiểm duyệt'}</button>
            </form>
          )}
        </div>
      </article>

      <footer className="company-footer">
        <div className="footer-brand"><img className="beelearn-about-mark" src={`${import.meta.env.BASE_URL}beelearn-brand.png`} alt="" /><div><h2>BeeLearn</h2><p>Biến kỹ năng hôm nay thành cơ hội ngày mai.</p></div></div>
        <div className="footer-grid">
          <div><p className="mono-label">Dự án</p><strong>BeeLearn</strong><span>Nền tảng thực hành và nhận phản hồi nghề nghiệp.</span></div>
          <div><p className="mono-label">Liên hệ</p><a href="mailto:portfolio.exe@gmail.com">portfolio.exe@gmail.com</a><span>Gửi câu hỏi qua email nếu bạn cần hỗ trợ.</span></div>
          <div><p className="mono-label">Sản phẩm</p><button type="button" onClick={() => go('roadmap')}>Bản đồ nghề</button><button type="button" onClick={() => go('hub')}>Thử thách portfolio</button><button type="button" onClick={onOpenUpgrade}>Gói Premium</button></div>
          <div><p className="mono-label">Pháp lý & quy chuẩn</p><button type="button" onClick={() => onOpenFooterModal?.('terms')}>Điều khoản dịch vụ</button><button type="button" onClick={() => onOpenFooterModal?.('privacy')}>Chính sách bảo mật</button><button type="button" onClick={() => onOpenFooterModal?.('mentor-rubric')}>Quy chuẩn Mentor Review</button></div>
        </div>
      </footer>
    </section>
  );
}
