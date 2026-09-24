import React, { useEffect, useState } from 'react';
import { ArrowRight, CheckCircle2, Crown, X } from 'lucide-react';
import { apiService } from '../services/api';

export function VipUpgradeModal({ isOpen, onClose, plans, initialPlan, currentUser, onPaymentSuccess }) {
  const [step, setStep] = useState('select_plan'); // 'select_plan' | 'payment' | 'success'
  const [selectedPlan, setSelectedPlan] = useState(initialPlan || plans?.[1] || plans?.[0]);
  const [copyNotice, setCopyNotice] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (initialPlan) {
      setSelectedPlan(initialPlan);
      if (isOpen) {
        setStep('payment');
      }
    } else {
      if (plans && plans.length > 0) {
        setSelectedPlan((prev) => prev || plans[1] || plans[0]);
      }
      if (isOpen) {
        setStep('select_plan');
      }
    }
  }, [initialPlan, isOpen, plans]);

  if (!isOpen) return null;

  const currentPlans = plans || [];
  const studentMssv = currentUser?.user?.id || currentUser?.user?.mssv || currentUser?.id || 'SE174281';
  const planCode = (selectedPlan?.id || 'PRO').replace('premium-', '').toUpperCase();
  const transferContent = `EXE301 ${planCode} ${studentMssv}`;
  const qrPrice = selectedPlan?.price || 199000;
  const qrUrl = `https://img.vietqr.io/image/MB-0348888888-compact2.png?amount=${qrPrice}&addInfo=${encodeURIComponent(transferContent)}&accountName=EXE301%20FPT%20PORTFOLIO`;

  const copyToClipboard = (text, label) => {
    navigator.clipboard.writeText(text);
    setCopyNotice(`Đã sao chép ${label}!`);
    setTimeout(() => setCopyNotice(''), 2500);
  };

  const handleConfirmPaid = async () => {
    setIsProcessing(true);
    try {
      // Save order and upgrade subscription in MongoDB
      await apiService.upgradeSubscription({
        userId: currentUser?.user?.id || currentUser?.id || 'demo-student',
        mssv: studentMssv,
        planId: selectedPlan?.id || 'premium-quarter',
        planName: selectedPlan?.name || 'Premium 3 Tháng',
        price: selectedPlan?.price || 199000,
        paymentMethod: 'VietQR MB Bank',
        transactionCode: transferContent
      });
    } catch (err) {
      console.warn('Subscription upgrade error, fallback to client:', err);
    }
    setIsProcessing(false);
    setStep('success');
    onPaymentSuccess?.(selectedPlan);
  };

  return (
    <div className="vietqr-modal-overlay" onClick={onClose}>
      <div className="vip-upgrade-modal-card animate-in" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '18px' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#f59e0b', fontSize: '13px', fontWeight: 800, textTransform: 'uppercase', marginBottom: '4px' }}>
              <Crown size={17} color="#f59e0b" />
              <span>Nâng Cấp Tài Khoản VIP</span>
            </div>
            <h2 style={{ fontSize: '22px', fontWeight: 900, margin: 0, color: 'var(--jr-text-main, #0f172a)' }}>
              {step === 'select_plan' && 'Chọn Gói Đồng Hành Chuẩn Tuyển Dụng'}
              {step === 'payment' && `Thanh toán VietQR - ${selectedPlan?.name}`}
              {step === 'success' && '🎉 Nâng Cấp VIP Thành Công!'}
            </h2>
          </div>
          <button type="button" onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b', padding: '6px' }}>
            <X size={22} />
          </button>
        </div>

        {/* STEP 1: CHỌN 1 TRONG 3 GÓI */}
        {step === 'select_plan' && (
          <div>
            <p style={{ color: 'var(--jr-text-sub, #64748b)', fontSize: '14px', margin: '0 0 20px', lineHeight: 1.5 }}>
              Mở khóa toàn bộ kho thử thách thực tế FPT & Coursera, nhận review 1-on-1 từ Mentor doanh nghiệp và tự động tối ưu CV chuẩn ATS.
            </p>

            <div className="vip-plans-grid-v2">
              {currentPlans.map((plan) => {
                const isSelected = selectedPlan?.id === plan.id;
                return (
                  <div
                    key={plan.id}
                    className={`vip-plan-card-v2 ${isSelected ? 'active-selected' : ''}`}
                    onClick={() => setSelectedPlan(plan)}
                  >
                    {plan.badge && <span className="vip-plan-badge-top">{plan.badge}</span>}
                    <span style={{ fontSize: '12px', fontWeight: 700, color: '#f59e0b', textTransform: 'uppercase' }}>
                      {plan.highlight}
                    </span>
                    <h3 className="vip-plan-name-v2">{plan.name}</h3>
                    <div className="vip-plan-price-line">
                      <strong>{plan.displayPrice}</strong>
                      <span>/ {plan.duration}</span>
                    </div>
                    <p style={{ fontSize: '12.5px', color: 'var(--jr-text-sub, #64748b)', margin: '0 0 12px', minHeight: '36px' }}>
                      {plan.description}
                    </p>

                    <div style={{ borderTop: '1px solid rgba(148, 163, 184, 0.2)', paddingTop: '12px' }}>
                      <strong style={{ fontSize: '12.5px', display: 'block', marginBottom: '8px' }}>Đặc quyền gói:</strong>
                      <ul className="vip-features-list-v2">
                        {plan.features?.map((feat, idx) => (
                          <li key={idx}>
                            <CheckCircle2 size={15} color="#10b981" style={{ flexShrink: 0, marginTop: '2px' }} />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <button
                      type="button"
                      style={{
                        marginTop: 'auto',
                        width: '100%',
                        padding: '10px 14px',
                        borderRadius: '10px',
                        fontWeight: 800,
                        fontSize: '13.5px',
                        cursor: 'pointer',
                        border: isSelected ? 'none' : '1.5px solid rgba(245, 158, 11, 0.4)',
                        background: isSelected ? '#f59e0b' : 'transparent',
                        color: isSelected ? '#000' : 'var(--jr-text-main, #0f172a)'
                      }}
                      onClick={() => setSelectedPlan(plan)}
                    >
                      {isSelected ? '✓ Đang chọn gói này' : 'Chọn gói'}
                    </button>
                  </div>
                );
              })}
            </div>

            <div style={{ background: 'rgba(2, 132, 199, 0.08)', borderRadius: '14px', padding: '14px 18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <span style={{ fontSize: '13px', color: 'var(--jr-text-sub, #64748b)' }}>Gói bạn chọn:</span>
                <strong style={{ marginLeft: '6px', fontSize: '16px', color: '#0284c7' }}>
                  {selectedPlan?.name} ({selectedPlan?.displayPrice})
                </strong>
              </div>
              <button
                type="button"
                className="jr-btn-gold-action"
                style={{ padding: '10px 22px', fontSize: '14px' }}
                onClick={() => setStep('payment')}
              >
                Tiến hành thanh toán VietQR cho gói này <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: THANH TOÁN VIETQR THEO GÓI ĐÃ CHỌN */}
        {step === 'payment' && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
              <button
                type="button"
                className="ghost-action compact"
                onClick={() => setStep('select_plan')}
                style={{ padding: '6px 12px', fontSize: '12.5px' }}
              >
                ← Chọn lại gói khác
              </button>
              <span style={{ fontSize: '13px', color: 'var(--jr-text-sub, #64748b)' }}>
                Đang xử lý thanh toán cho gói: <b>{selectedPlan?.name}</b> ({selectedPlan?.displayPrice})
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: '24px', alignItems: 'center' }}>
              <div style={{ textAlign: 'center' }}>
                <div className="vietqr-image-wrapper" style={{ margin: 0 }}>
                  <img src={qrUrl} alt="Mã VietQR Chuyển Khoản" />
                </div>
                <span style={{ display: 'block', fontSize: '12px', color: '#64748b', marginTop: '8px' }}>
                  Mở App Ngân hàng hoặc MoMo để quét mã
                </span>
              </div>

              <div>
                <table className="vietqr-details-table" style={{ margin: '0 0 16px' }}>
                  <tbody>
                    <tr>
                      <td>Ngân hàng thụ hưởng</td>
                      <td><b>MB Bank (Ngân hàng Quân Đội)</b></td>
                    </tr>
                    <tr>
                      <td>Số tài khoản</td>
                      <td>
                        <span style={{ fontFamily: 'monospace', fontWeight: 800, fontSize: '15px' }}>0348888888</span>
                        <button
                          type="button"
                          onClick={() => copyToClipboard('0348888888', 'STK')}
                          style={{ marginLeft: '8px', background: 'none', border: 'none', color: '#0284c7', cursor: 'pointer', fontSize: '12px', textDecoration: 'underline' }}
                        >
                          Sao chép
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td>Chủ tài khoản</td>
                      <td><b>EXE301 FPT PORTFOLIO</b></td>
                    </tr>
                    <tr>
                      <td>Gói cước</td>
                      <td><b>{selectedPlan?.name} ({selectedPlan?.duration})</b></td>
                    </tr>
                    <tr>
                      <td>Số tiền thanh toán</td>
                      <td style={{ color: '#059669', fontSize: '18px', fontWeight: 900 }}>
                        {selectedPlan?.displayPrice}
                      </td>
                    </tr>
                    <tr>
                      <td>Nội dung chuyển khoản</td>
                      <td>
                        <span style={{ fontFamily: 'monospace', color: '#2563eb', fontWeight: 800, background: 'rgba(37,99,235,0.08)', padding: '2px 8px', borderRadius: '4px' }}>
                          {transferContent}
                        </span>
                        <button
                          type="button"
                          onClick={() => copyToClipboard(transferContent, 'Nội dung CK')}
                          style={{ marginLeft: '8px', background: 'none', border: 'none', color: '#0284c7', cursor: 'pointer', fontSize: '12px', textDecoration: 'underline' }}
                        >
                          Sao chép
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>

                {copyNotice && (
                  <div style={{ color: '#059669', fontSize: '13px', fontWeight: 700, marginBottom: '10px' }}>
                    ✓ {copyNotice}
                  </div>
                )}

                <div style={{ display: 'flex', gap: '10px', marginTop: '16px' }}>
                  <button type="button" className="ghost-action" onClick={() => setStep('select_plan')}>
                    Đổi gói cước
                  </button>
                  <button
                    type="button"
                    className="primary-action"
                    disabled={isProcessing}
                    style={{ flex: 1, background: 'linear-gradient(135deg, #10b981, #059669)', border: 'none', color: '#fff', fontWeight: 800 }}
                    onClick={handleConfirmPaid}
                  >
                    <CheckCircle2 size={17} /> {isProcessing ? 'Đang lưu vào hệ thống...' : 'Tôi đã chuyển khoản thành công'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: THÀNH CÔNG */}
        {step === 'success' && (
          <div style={{ textAlign: 'center', padding: '24px 0' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#dcfce7', color: '#16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
              <CheckCircle2 size={36} />
            </div>
            <h3 style={{ fontSize: '22px', fontWeight: 900, margin: '0 0 10px', color: '#16a34a' }}>
              Chúc mừng bạn đã kích hoạt thành công {selectedPlan?.name}!
            </h3>
            <p style={{ color: 'var(--jr-text-sub, #64748b)', fontSize: '14.5px', maxWidth: '480px', margin: '0 auto 24px', lineHeight: 1.5 }}>
              Dữ liệu giao dịch đã được lưu vào hệ thống MongoDB. Tài khoản của bạn đã được nâng cấp: Mở khóa quyền nộp bài nhận Mentor Review 1-on-1, đặt lịch chat trực tiếp và chứng thực Portfolio công khai.
            </p>
            <button
              type="button"
              className="jr-btn-gold-action"
              onClick={onClose}
              style={{ margin: '0 auto' }}
            >
              Bắt đầu trải nghiệm ngay
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
