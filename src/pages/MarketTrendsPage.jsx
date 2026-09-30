import React, { useState } from 'react';
import { ArrowRight, BookOpen, Check, Compass, ExternalLink, FileText, Lightbulb, MoveUpRight, SearchCheck, Sparkles } from 'lucide-react';
import './MarketTrendsPage.css';

const FALLBACK_SIGNAL = { headline: 'Chọn kỹ năng có thể chứng minh bằng một sản phẩm hoặc case study cụ thể.', hotSkills: [] };
const FALLBACK_RESEARCH = { researchQuestion: 'Tôi nên ưu tiên kỹ năng và minh chứng nào cho hồ sơ?', analystConclusion: 'Bắt đầu từ yêu cầu công việc và tạo một bài thực hành có thể kiểm tra.', methodology: [], findings: [], implications: [], riskNotes: [] };

const sourceNotes = [
  { match: 'Adecco Vietnam Salary Guide 2026', period: 'Báo cáo 2026', scope: 'Lương và tuyển dụng đa ngành', note: 'Khảo sát nghiêng về nhóm có kinh nghiệm; không suy ra mức lương cho sinh viên mới ra trường.' },
  { match: 'ITviec Salary Report 2025-2026', period: 'Báo cáo 2025–2026', scope: 'Khảo sát thị trường IT Việt Nam', note: 'Số liệu lương chia theo kinh nghiệm; không xem mức trung vị như lương khởi điểm.' },
  { match: 'TopDev Vietnam IT Market 2024', period: 'Báo cáo 2024–2025', scope: 'Thị trường IT Việt Nam', note: 'Trang giới thiệu công khai; nội dung đầy đủ cần đăng ký tải báo cáo.' },
  { match: 'Nielsen Norman Group UX Research', period: 'Bài hướng dẫn', scope: 'Phương pháp UX', note: 'Nguồn hướng dẫn portfolio và phương pháp UX, không phải thống kê tuyển dụng.' },
  { match: 'VietnamWorks HR Insider', period: 'Bài viết cập nhật theo nguồn', scope: 'Nghề nghiệp và nhân sự', note: 'Nguồn tham khảo biên tập; xem từng bài để kiểm tra thời điểm và dữ liệu gốc.' },
  { match: 'LinkedIn Jobs on the Rise', period: 'Bài viết cập nhật theo nguồn', scope: 'Xu hướng nghề nghiệp quốc tế', note: 'Tín hiệu toàn cầu; không đại diện riêng cho thị trường Việt Nam.' }
];

function moveToSection(id) {
  const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  document.getElementById(id)?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
}

function SourceReference({ name, sourceByName }) {
  const source = sourceByName.get(name);
  if (!source?.url) return <span className="market-v2-source-chip market-v2-source-chip-internal" title="Quy chuẩn biên tập của nền tảng">{name}</span>;
  return <a className="market-v2-source-chip" href={source.url} target="_blank" rel="noopener noreferrer">{name}<ExternalLink size={12} aria-hidden="true" /><span className="sr-only">(mở trong thẻ mới)</span></a>;
}

export function MarketTrendsPage({ majors = [], currentMajor, changeMajor, go, marketSignalsByMajor, marketResearchBriefByMajor, trustedMarketSources }) {
  const [selectedTrackKey, setSelectedTrackKey] = useState('');
  const major = currentMajor ?? majors[0] ?? { key: 'dev', title: 'Công nghệ', short: 'Công nghệ' };
  const signal = marketSignalsByMajor?.[major.key] ?? marketSignalsByMajor?.dev ?? FALLBACK_SIGNAL;
  const research = marketResearchBriefByMajor?.[major.key] ?? marketResearchBriefByMajor?.dev ?? FALLBACK_RESEARCH;
  const allSources = Array.isArray(trustedMarketSources) ? trustedMarketSources : [];
  const relevantSources = allSources.filter((source) => !source.majorKeys?.length || source.majorKeys.includes(major.key));
  const sourceByName = new Map(allSources.map((source) => [source.name, source]));
  const findings = Array.isArray(research.findings) ? research.findings : [];
  const implications = Array.isArray(research.implications) ? research.implications : [];
  const skills = Array.isArray(signal.hotSkills) ? signal.hotSkills : [];
  const methods = Array.isArray(research.methodology) ? research.methodology : [];
  const risks = Array.isArray(research.riskNotes) ? research.riskNotes : [];
  const tracks = Array.isArray(major.columns) ? major.columns : [];
  const selectedTrack = tracks.find((track) => track.key === selectedTrackKey) ?? tracks[0];
  const foundationRole = selectedTrack?.roles?.[0];

  return <section className="content-page trend-page market-v2">
    <header className="market-v2-hero">
      <div className="market-v2-hero-copy">
        <span className="market-v2-eyebrow"><Sparkles size={15} aria-hidden="true" />GÓC NHÌN NGHỀ NGHIỆP</span>
        <h1>Hiểu thị trường.<br /><span>Biết mình nên làm gì tiếp theo.</span></h1>
        <p>Chọn lĩnh vực, đọc những nhận định có nguồn tham khảo và biến chúng thành kỹ năng, bài thực hành cho portfolio của bạn.</p>
        <button className="market-v2-hero-link" type="button" onClick={() => moveToSection('market-v2-insights')}>Xem phân tích theo ngành <ArrowRight size={17} aria-hidden="true" /></button>
      </div>
      <div className="market-v2-hero-path" aria-label="Cách dùng trang này">
        <div><span>01</span><strong>Đọc nhận định</strong><small>Biết điều gì đáng chú ý</small></div>
        <div><span>02</span><strong>Xem nguồn</strong><small>Kiểm tra cơ sở thông tin</small></div>
        <div><span>03</span><strong>Thực hành</strong><small>Đưa minh chứng vào portfolio</small></div>
      </div>
    </header>

    <section className="market-v2-selector" aria-labelledby="market-v2-selector-heading">
      <div><span className="market-v2-section-kicker">BẮT ĐẦU TẠI ĐÂY</span><h2 id="market-v2-selector-heading">Bạn quan tâm lĩnh vực nào?</h2><p>Thông tin và gợi ý bên dưới sẽ thay đổi theo lĩnh vực bạn chọn.</p></div>
      <div className="market-v2-major-options" role="group" aria-label="Chọn lĩnh vực nghề nghiệp">
        {majors.map((option) => <button key={option.key} type="button" aria-pressed={major.key === option.key} className={major.key === option.key ? 'is-selected' : ''} onClick={() => changeMajor?.(option.key)}><span>{option.title ?? option.short}</span><MoveUpRight size={16} aria-hidden="true" /></button>)}
      </div>
    </section>

    <nav className="market-v2-jump" aria-label="Các mục trên trang"><span>ĐI ĐẾN</span><button type="button" onClick={() => moveToSection('market-v2-insights')}>Nhận định</button><button type="button" onClick={() => moveToSection('market-v2-actions')}>Kế hoạch hành động</button><button type="button" onClick={() => moveToSection('market-v2-tracks')}>Nhánh nghề</button><button type="button" onClick={() => moveToSection('market-v2-sources')}>Nguồn tham khảo</button><button type="button" onClick={() => moveToSection('market-v2-method')}>Cách tổng hợp</button></nav>

    <section className="market-v2-block" id="market-v2-insights" aria-labelledby="market-v2-insights-heading">
      <div className="market-v2-title-row"><div><span className="market-v2-section-kicker">01 / ĐỌC ĐỂ ĐỊNH HƯỚNG</span><h2 id="market-v2-insights-heading">Góc nhìn về {major.title}</h2><p>Nhận định do nền tảng tổng hợp và biên tập từ các nguồn bên dưới; đây không phải số liệu tuyển dụng theo thời gian thực.</p></div><span className="market-v2-context"><BookOpen size={15} aria-hidden="true" />{relevantSources.length} nguồn phù hợp</span></div>
      <div className="market-v2-editorial"><div className="market-v2-editorial-marker"><Lightbulb size={19} aria-hidden="true" /><span>NHẬN ĐỊNH CHÍNH</span></div><p>{signal.headline || FALLBACK_SIGNAL.headline}</p><div className="market-v2-editorial-bottom"><span>Câu hỏi cần trả lời</span><strong>{research.researchQuestion || FALLBACK_RESEARCH.researchQuestion}</strong></div></div>
      {findings.length ? <div className="market-v2-findings" aria-label="Các phân tích theo lĩnh vực">{findings.map((finding, index) => <article className="market-v2-finding" key={`${major.key}-${finding.claim || index}`}><div className="market-v2-finding-number">{String(index + 1).padStart(2, '0')}</div><div className="market-v2-finding-content"><span className="market-v2-finding-label">PHÂN TÍCH CỦA NỀN TẢNG</span><h3>{finding.claim}</h3><p>{finding.evidence}</p>{implications[index] && <div className="market-v2-finding-next"><ArrowRight size={16} aria-hidden="true" /><span><strong>Áp dụng:</strong> {implications[index]}</span></div>}{!!finding.sources?.length && <div className="market-v2-finding-sources"><span>Tham chiếu</span>{finding.sources.map((name) => <SourceReference key={name} name={name} sourceByName={sourceByName} />)}</div>}</div></article>)}</div> : <p className="market-v2-empty">Chưa có phân tích chi tiết cho lĩnh vực này. Hãy xem các nguồn tham khảo và quay lại sau.</p>}
    </section>

    <section className="market-v2-block" id="market-v2-actions" aria-labelledby="market-v2-actions-heading"><div className="market-v2-title-row"><div><span className="market-v2-section-kicker">02 / BIẾN THÔNG TIN THÀNH NĂNG LỰC</span><h2 id="market-v2-actions-heading">Từ xu hướng đến một bài làm cụ thể</h2><p>Đây là gợi ý học và xây hồ sơ của nền tảng, không phải cam kết tuyển dụng từ các nguồn báo cáo.</p></div></div><div className="market-v2-action-grid"><div className="market-v2-action-main"><span className="market-v2-action-icon"><Compass size={20} aria-hidden="true" /></span><h3>Ưu tiên chất lượng minh chứng</h3><p>{research.analystConclusion || FALLBACK_RESEARCH.analystConclusion}</p><ul>{implications.map((item, index) => <li key={`${item}-${index}`}><Check size={16} aria-hidden="true" />{item}</li>)}</ul><button className="market-v2-action-button" type="button" onClick={() => go?.('hub')}>Tìm bài thực hành phù hợp <ArrowRight size={17} aria-hidden="true" /></button></div><div className="market-v2-skills"><span className="market-v2-section-kicker">BỘ KỸ NĂNG GỢI Ý</span><h3>Bắt đầu từ những gì có thể chứng minh</h3><p>Các chủ đề để chọn bài thực hành và thể hiện trong portfolio; không phải bảng xếp hạng tần suất xuất hiện trong tin tuyển dụng.</p>{skills.length ? <ul>{skills.map((skill) => <li key={skill}><SearchCheck size={15} aria-hidden="true" />{skill}</li>)}</ul> : <p>Chưa có bộ kỹ năng riêng cho lĩnh vực này.</p>}<button className="market-v2-text-link" type="button" onClick={() => go?.('roadmap')}>Xem bản đồ nghề <MoveUpRight size={16} aria-hidden="true" /></button></div></div></section>

    {tracks.length > 0 && <section className="market-v2-block" id="market-v2-tracks" aria-labelledby="market-v2-tracks-heading"><div className="market-v2-title-row"><div><span className="market-v2-section-kicker">03 / CHỌN HƯỚNG ĐI SÂU HƠN</span><h2 id="market-v2-tracks-heading">Khám phá từng nhánh nghề</h2><p>Các kỹ năng và công cụ bên dưới thuộc bản đồ nghề của nền tảng, giúp bạn chọn hướng thực hành. Đây không phải danh sách vị trí đang tuyển.</p></div></div><div className="market-v2-track-tabs" role="group" aria-label="Chọn nhánh nghề">{tracks.map((track) => <button key={track.key} type="button" aria-pressed={selectedTrack?.key === track.key} className={selectedTrack?.key === track.key ? 'is-selected' : ''} onClick={() => setSelectedTrackKey(track.key)}>{track.title}</button>)}</div>{selectedTrack && <article className="market-v2-track-detail"><div className="market-v2-track-detail-head"><div><span>HƯỚNG THỰC HÀNH</span><h3>{selectedTrack.title}</h3></div><button className="market-v2-text-link" type="button" onClick={() => go?.('roadmap')}>Xem lộ trình <ArrowRight size={16} aria-hidden="true" /></button></div><div className="market-v2-track-detail-grid"><div><h4>Năng lực nền tảng</h4><ul>{foundationRole?.skills?.slice(0, 3).map((skill) => <li key={skill}>{skill}</li>)}</ul></div><div><h4>Kiến thức nên hiểu</h4><ul>{foundationRole?.knowledge?.slice(0, 3).map((item) => <li key={item}>{item}</li>)}</ul></div><div><h4>Công cụ tham khảo</h4><ul>{foundationRole?.tools?.slice(0, 4).map((tool) => <li key={tool}>{tool}</li>)}</ul></div></div></article>}</section>}

    <section className="market-v2-block" id="market-v2-sources" aria-labelledby="market-v2-sources-heading"><div className="market-v2-title-row"><div><span className="market-v2-section-kicker">04 / TỰ KIỂM CHỨNG</span><h2 id="market-v2-sources-heading">Nguồn tham khảo</h2><p>Mở trang gốc để xem phạm vi, thời điểm phát hành và phương pháp của từng nguồn trước khi đưa ra quyết định nghề nghiệp.</p></div><span className="market-v2-context"><FileText size={15} aria-hidden="true" />Nguồn công khai</span></div>{relevantSources.length ? <div className="market-v2-source-list">{relevantSources.map((source, index) => { const note = sourceNotes.find((entry) => source.name?.includes(entry.match)); return <article className="market-v2-source" key={`${source.name}-${index}`}><span className="market-v2-source-index">{String(index + 1).padStart(2, '0')}</span><div><h3>{source.name}</h3><div className="market-v2-source-meta"><span>{note?.period || 'Bài viết cập nhật theo nguồn'}</span><span>{note?.scope || source.type || 'Nguồn tham khảo công khai'}</span></div>{note?.note && <small>{note.note}</small>}</div><a href={source.url} target="_blank" rel="noopener noreferrer" aria-label={`Mở nguồn ${source.name} trong thẻ mới`}>Mở nguồn <ExternalLink size={15} aria-hidden="true" /></a></article>; })}</div> : <p className="market-v2-empty">Chưa có nguồn tham khảo riêng cho lĩnh vực này.</p>}</section>

    <aside className="market-v2-method market-v2-block" id="market-v2-method" aria-labelledby="market-v2-method-heading"><div className="market-v2-method-intro"><span className="market-v2-section-kicker">ĐỌC THÔNG TIN CÓ BỐI CẢNH</span><h2 id="market-v2-method-heading">Cách chúng tôi tổng hợp</h2><p>Trang này giúp định hướng, không thay thế tin tuyển dụng đang mở hoặc khảo sát lương dành riêng cho vị trí bạn ứng tuyển.</p></div><div className="market-v2-method-details"><div><h3>Phương pháp</h3><ul>{(methods.length ? methods : ['Đối chiếu nguồn công khai với yêu cầu công việc và bài thực hành.']).map((item, index) => <li key={`${item}-${index}`}>{item}</li>)}</ul></div>{risks.length > 0 && <div><h3>Điều cần lưu ý</h3><ul>{risks.map((item, index) => <li key={`${item}-${index}`}>{item}</li>)}</ul></div>}</div></aside>
  </section>;
}
