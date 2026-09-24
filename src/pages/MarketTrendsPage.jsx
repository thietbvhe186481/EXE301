import React, { useState } from 'react';
import {
  Sparkles,
  BadgeCheck,
  BookOpen,
  ShieldCheck,
  LayoutDashboard,
  ExternalLink,
  Compass,
  TrendingUp,
  BarChart3,
  FileSpreadsheet,
  CheckCircle2,
  Lightbulb
} from 'lucide-react';

export function MarketTrendsPage({
  majors,
  currentMajor,
  changeMajor,
  go,
  marketSignalsByMajor,
  marketResearchBriefByMajor,
  trustedMarketSources,
  getMarketUpdatedLabel
}) {
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'metrics' | 'research' | 'sources'

  const signal = marketSignalsByMajor?.[currentMajor.key] ?? marketSignalsByMajor?.dev ?? {
    headline: 'Thị trường công nghệ & sản phẩm số đang có nhu cầu cao về kỹ năng thực chiến.',
    confidence: 'Cao',
    updatedPolicy: 'Tổng hợp từ các báo cáo tuyển dụng công nghệ uy tín tại Việt Nam.',
    signals: [],
    hotSkills: []
  };

  const research = marketResearchBriefByMajor?.[currentMajor.key] ?? marketResearchBriefByMajor?.dev ?? {
    researchQuestion: 'Sinh viên nên ưu tiên kỹ năng nào?',
    analystConclusion: 'Ưu tiên các kỹ năng có sản phẩm chứng minh trong Portfolio.',
    methodology: [],
    findings: [],
    implications: [],
    riskNotes: []
  };

  const updatedLabel = getMarketUpdatedLabel ? getMarketUpdatedLabel() : 'Tháng 09/2026';
  const relevantSources = (trustedMarketSources || []).filter(
    (source) => !source.majorKeys || source.majorKeys.includes(currentMajor.key)
  );
  const sourceByName = Object.fromEntries((trustedMarketSources || []).map((source) => [source.name, source]));

  return (
    <section className="content-page trend-page" style={{ padding: '24px 20px', maxWidth: '1240px', margin: '0 auto', overflowY: 'auto', height: 'calc(100vh - 64px)' }}>
      {/* HEADER WITH MAJOR SWITCHER */}
      <div className="section-heading inline" style={{ marginBottom: '20px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <span style={{ background: '#0284c7', color: '#fff', fontSize: '11px', fontWeight: 800, padding: '3px 9px', borderRadius: '6px', letterSpacing: '0.5px' }}>
              MARKET INTELLIGENCE
            </span>
            <span style={{ fontSize: '13px', color: '#64748b', fontWeight: 600 }}>
              Dữ liệu tuyển dụng thực tế · FPT Career HUB
            </span>
          </div>
          <h1 style={{ fontSize: 'clamp(24px, 3.2vw, 32px)', fontWeight: 900, margin: '0 0 8px', color: 'var(--jr-text-main, #0f172a)' }}>
            Xu hướng thị trường {currentMajor.title}
          </h1>
          <p style={{ color: 'var(--jr-text-sub, #64748b)', fontSize: '14.5px', maxWidth: '720px', margin: 0, lineHeight: 1.5 }}>
            Dữ liệu tổng hợp từ các báo cáo lương, khảo sát tuyển dụng hàng đầu (TopDev, ITviec, Adecco). Được phân loại theo từng chuyên ngành giúp sinh viên dễ tiếp cận và xây dựng Portfolio đúng trọng tâm.
          </p>
        </div>

        <div className="trend-heading-actions" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '12px' }}>
          <div className="major-switcher trend-major-switcher">
            {majors.map((major) => (
              <button
                key={major.key}
                className={currentMajor.key === major.key ? 'active' : ''}
                onClick={() => changeMajor(major.key)}
                style={{ fontWeight: 700 }}
              >
                {major.short}
              </button>
            ))}
          </div>

          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', borderRadius: '10px', background: 'rgba(2, 132, 199, 0.08)', border: '1px solid rgba(2, 132, 199, 0.2)', fontSize: '12.5px', color: '#0284c7', fontWeight: 600 }}>
            <Sparkles size={15} />
            <span>Cập nhật: <strong>{updatedLabel}</strong> (Đang theo dõi realtime)</span>
          </div>
        </div>
      </div>

      {/* INTERACTIVE NAVIGATION TABS */}
      <div className="interactive-subnav-tabs" style={{ display: 'flex', gap: '8px', borderBottom: '1px solid var(--jr-border, #e2e8f0)', paddingBottom: '10px', marginBottom: '24px' }}>
        <button
          className={`interactive-tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          <Lightbulb size={16} />
          <span>1. Tổng quan & Kỹ năng Hot</span>
        </button>

        <button
          className={`interactive-tab-btn ${activeTab === 'metrics' ? 'active' : ''}`}
          onClick={() => setActiveTab('metrics')}
        >
          <BarChart3 size={16} />
          <span>2. Chỉ số thị trường & Nhu cầu ({signal.signals?.length || 3})</span>
        </button>

        <button
          className={`interactive-tab-btn ${activeTab === 'research' ? 'active' : ''}`}
          onClick={() => setActiveTab('research')}
        >
          <TrendingUp size={16} />
          <span>3. Báo cáo nghiên cứu & Nhận định ({research.findings?.length || 3})</span>
        </button>

        <button
          className={`interactive-tab-btn ${activeTab === 'sources' ? 'active' : ''}`}
          onClick={() => setActiveTab('sources')}
        >
          <BookOpen size={16} />
          <span>4. Nguồn tham khảo ({relevantSources.length})</span>
        </button>
      </div>

      {/* TAB 1: TỔNG QUAN & KỸ NĂNG HOT */}
      {activeTab === 'overview' && (
        <div style={{ display: 'grid', gap: '20px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '20px' }}>
            {/* Main Signal Card */}
            <article style={{ background: 'var(--jr-card, #ffffff)', border: '1px solid var(--jr-border, #e2e8f0)', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 16px rgba(0,0,0,0.03)' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#0284c7', fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '10px' }}>
                <Sparkles size={14} />
                <span>TÍN HIỆU ĐỊNH HƯỚNG CHÍNH</span>
              </div>
              <h2 style={{ fontSize: '20px', fontWeight: 800, lineHeight: 1.4, margin: '0 0 12px', color: 'var(--jr-text-main, #0f172a)' }}>
                {signal.headline}
              </h2>
              <p style={{ color: 'var(--jr-text-sub, #64748b)', fontSize: '14px', lineHeight: 1.6, margin: '0 0 20px' }}>
                {signal.updatedPolicy}
              </p>

              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', paddingTop: '16px', borderTop: '1px solid var(--jr-border, #e2e8f0)' }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#059669', fontSize: '13px', fontWeight: 700 }}>
                  <BadgeCheck size={16} />
                  <span>Độ tin cậy: {signal.confidence}</span>
                </div>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#64748b', fontSize: '13px', fontWeight: 600 }}>
                  <BookOpen size={16} />
                  <span>Dựa trên {relevantSources.length} nguồn tuyển dụng lớn</span>
                </div>
              </div>
            </article>

            {/* Hot Skills Cloud */}
            <article style={{ background: 'var(--jr-card, #ffffff)', border: '1px solid var(--jr-border, #e2e8f0)', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 16px rgba(0,0,0,0.03)' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#d97706', fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '10px' }}>
                <TrendingUp size={14} />
                <span>TOP KỸ NĂNG NÊN ƯU TIÊN VÀO PORTFOLIO</span>
              </div>
              <p style={{ color: 'var(--jr-text-sub, #64748b)', fontSize: '13.5px', margin: '0 0 16px' }}>
                Các từ khóa kỹ năng xuất hiện với tần suất cao nhất trong JD của nhà tuyển dụng đối với sinh viên ngành {currentMajor.short}:
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {(signal.hotSkills || []).map((skill) => (
                  <span
                    key={skill}
                    style={{
                      background: 'rgba(2, 132, 199, 0.08)',
                      color: '#0284c7',
                      border: '1px solid rgba(2, 132, 199, 0.2)',
                      padding: '6px 14px',
                      borderRadius: '8px',
                      fontWeight: 700,
                      fontSize: '13px'
                    }}
                  >
                    #{skill}
                  </span>
                ))}
              </div>
            </article>
          </div>

          {/* Key Conclusion Card */}
          <article style={{ background: 'linear-gradient(135deg, rgba(2, 132, 199, 0.04) 0%, rgba(14, 165, 233, 0.08) 100%)', border: '1px solid rgba(2, 132, 199, 0.2)', borderRadius: '16px', padding: '22px 24px' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#0284c7', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <CheckCircle2 size={22} />
              </div>
              <div>
                <strong style={{ display: 'block', fontSize: '15px', color: '#0f172a', marginBottom: '4px' }}>
                  Lời khuyên từ Analyst dành cho sinh viên {currentMajor.short}
                </strong>
                <p style={{ color: '#334155', fontSize: '14px', lineHeight: 1.6, margin: 0 }}>
                  {research.analystConclusion}
                </p>
              </div>
            </div>
          </article>
        </div>
      )}

      {/* TAB 2: CHỈ SỐ THỊ TRƯỜNG & NHU CẦU */}
      {activeTab === 'metrics' && (
        <div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '18px', marginBottom: '24px' }}>
            {(signal.signals || []).map((item, idx) => (
              <article
                key={item.label}
                style={{
                  background: 'var(--jr-card, #ffffff)',
                  border: '1px solid var(--jr-border, #e2e8f0)',
                  borderRadius: '16px',
                  padding: '22px',
                  boxShadow: '0 4px 14px rgba(0,0,0,0.03)',
                  transition: 'all 0.2s ease'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--jr-text-sub, #64748b)' }}>
                    {item.label}
                  </span>
                  <span style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'rgba(2, 132, 199, 0.1)', color: '#0284c7', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 800 }}>
                    0{idx + 1}
                  </span>
                </div>

                <div style={{ fontSize: '24px', fontWeight: 900, color: '#0284c7', margin: '0 0 10px', letterSpacing: '-0.3px' }}>
                  {item.value}
                </div>

                <p style={{ fontSize: '13.5px', color: 'var(--jr-text-sub, #64748b)', lineHeight: 1.5, margin: 0 }}>
                  {item.note}
                </p>
              </article>
            ))}
          </div>

          {/* Implications / Lời khuyên hành động */}
          {research.implications && research.implications.length > 0 && (
            <article style={{ background: 'var(--jr-card, #ffffff)', border: '1px solid var(--jr-border, #e2e8f0)', borderRadius: '16px', padding: '22px 24px', marginTop: '16px' }}>
              <strong style={{ display: 'block', fontSize: '15px', color: '#0f172a', marginBottom: '12px' }}>
                🎯 Các hành động sinh viên nên thực hiện ngay:
              </strong>
              <div style={{ display: 'grid', gap: '10px' }}>
                {research.implications.map((imp, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13.5px', color: '#334155' }}>
                    <CheckCircle2 size={16} color="#059669" style={{ flexShrink: 0 }} />
                    <span>{imp}</span>
                  </div>
                ))}
              </div>
            </article>
          )}
        </div>
      )}

      {/* TAB 3: BÁO CÁO NGHIÊN CỨU & NHẬN ĐỊNH */}
      {activeTab === 'research' && (
        <div style={{ display: 'grid', gap: '20px' }}>
          {/* Research Question */}
          <article style={{ background: 'var(--jr-card, #ffffff)', border: '1px solid var(--jr-border, #e2e8f0)', borderRadius: '16px', padding: '22px 24px' }}>
            <span style={{ fontSize: '12px', fontWeight: 800, color: '#0284c7', textTransform: 'uppercase', letterSpacing: '0.8px', display: 'block', marginBottom: '6px' }}>
              CÂU HỎI NGHIÊN CỨU CỐT LÕI
            </span>
            <h2 style={{ fontSize: '18px', fontWeight: 800, margin: '0 0 16px', color: 'var(--jr-text-main, #0f172a)' }}>
              "{research.researchQuestion}"
            </h2>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {(research.methodology || []).map((method, idx) => (
                <div key={idx} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(2, 132, 199, 0.06)', border: '1px solid rgba(2, 132, 199, 0.15)', padding: '6px 12px', borderRadius: '8px', fontSize: '12.5px', color: '#0284c7' }}>
                  <ShieldCheck size={14} />
                  <span>{method}</span>
                </div>
              ))}
            </div>
          </article>

          {/* Detailed Findings List */}
          <div style={{ display: 'grid', gap: '14px' }}>
            {(research.findings || []).map((finding, index) => (
              <article
                key={finding.claim}
                style={{
                  background: 'var(--jr-card, #ffffff)',
                  border: '1px solid var(--jr-border, #e2e8f0)',
                  borderRadius: '14px',
                  padding: '20px 22px',
                  display: 'grid',
                  gridTemplateColumns: '44px 1fr',
                  gap: '16px',
                  alignItems: 'start'
                }}
              >
                <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(2, 132, 199, 0.1)', color: '#0284c7', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '16px' }}>
                  {String(index + 1).padStart(2, '0')}
                </div>
                <div>
                  <h3 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--jr-text-main, #0f172a)', margin: '0 0 8px' }}>
                    {finding.claim}
                  </h3>
                  <p style={{ fontSize: '14px', color: 'var(--jr-text-sub, #64748b)', lineHeight: 1.5, margin: '0 0 12px' }}>
                    {finding.evidence}
                  </p>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {(finding.sources || []).map((sourceName) => {
                      const srcObj = sourceByName[sourceName];
                      return srcObj ? (
                        <a
                          key={sourceName}
                          href={srcObj.url}
                          target="_blank"
                          rel="noreferrer"
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px',
                            background: '#f1f5f9',
                            border: '1px solid #cbd5e1',
                            padding: '3px 9px',
                            borderRadius: '6px',
                            fontSize: '12px',
                            color: '#0284c7',
                            textDecoration: 'none',
                            fontWeight: 600
                          }}
                        >
                          <span>{sourceName}</span>
                          <ExternalLink size={12} />
                        </a>
                      ) : (
                        <span key={sourceName} style={{ background: '#f1f5f9', border: '1px solid #e2e8f0', padding: '3px 8px', borderRadius: '6px', fontSize: '12px', color: '#64748b' }}>
                          {sourceName}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: NGUỒN THAM KHẢO UY TÍN */}
      {activeTab === 'sources' && (
        <div style={{ background: 'var(--jr-card, #ffffff)', border: '1px solid var(--jr-border, #e2e8f0)', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 16px rgba(0,0,0,0.03)' }}>
          <div style={{ marginBottom: '18px' }}>
            <h3 style={{ fontSize: '17px', fontWeight: 800, margin: '0 0 6px', color: 'var(--jr-text-main, #0f172a)' }}>
              Báo cáo & Khảo sát tuyển dụng được xác thực
            </h3>
            <p style={{ color: 'var(--jr-text-sub, #64748b)', fontSize: '13.5px', margin: 0 }}>
              Nền tảng cam kết sử dụng dữ liệu uy tín, công khai và minh bạch từ các tổ chức nhân sự hàng đầu tại Việt Nam và quốc tế:
            </p>
          </div>

          <div style={{ display: 'grid', gap: '12px' }}>
            {relevantSources.map((source) => (
              <div
                key={source.name}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '14px 18px',
                  borderRadius: '12px',
                  border: '1px solid var(--jr-border, #e2e8f0)',
                  background: 'var(--jr-surface, #f8fafc)',
                  gap: '16px'
                }}
              >
                <div>
                  <strong style={{ display: 'block', fontSize: '14.5px', color: 'var(--jr-text-main, #0f172a)', marginBottom: '4px' }}>
                    {source.name}
                  </strong>
                  <span style={{ fontSize: '12.5px', color: '#64748b' }}>
                    Loại dữ liệu: {source.type} · Độ tin cậy: <span style={{ color: '#059669', fontWeight: 700 }}>{source.reliability}</span>
                  </span>
                </div>

                <a
                  href={source.url}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '8px 14px',
                    borderRadius: '8px',
                    background: '#0284c7',
                    color: '#ffffff',
                    fontSize: '13px',
                    fontWeight: 700,
                    textDecoration: 'none',
                    whiteSpace: 'nowrap'
                  }}
                >
                  <span>Mở báo cáo gốc</span>
                  <ExternalLink size={14} />
                </a>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* QUICK ACTIONS FOOTER */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '14px', padding: '18px 24px', borderRadius: '16px', background: 'var(--jr-card, #ffffff)', border: '1px solid var(--jr-border, #e2e8f0)', marginTop: '28px' }}>
        <div>
          <strong style={{ display: 'block', fontSize: '15px', color: 'var(--jr-text-main, #0f172a)' }}>
            Sẵn sàng áp dụng xu hướng thị trường vào Portfolio của bạn?
          </strong>
          <span style={{ fontSize: '13px', color: 'var(--jr-text-sub, #64748b)' }}>
            Chọn các thử thách bám sát thực tế để hoàn thiện hồ sơ năng lực ngay hôm nay.
          </span>
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <button
            className="ghost-action"
            onClick={() => go('roadmap')}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '10px 18px', borderRadius: '10px', fontWeight: 700, cursor: 'pointer' }}
          >
            <Compass size={16} />
            <span>Khám phá Bản đồ nghề</span>
          </button>
          <button
            className="primary-action"
            onClick={() => go('hub')}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '10px 18px', borderRadius: '10px', fontWeight: 700, cursor: 'pointer', background: '#0284c7', color: '#fff', border: 'none' }}
          >
            <LayoutDashboard size={16} />
            <span>Xem thử thách theo xu hướng</span>
          </button>
        </div>
      </div>
    </section>
  );
}
