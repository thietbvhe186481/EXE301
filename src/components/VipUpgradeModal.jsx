import React, { useEffect, useState } from 'react';
import { ArrowRight, CheckCircle2, Copy, Crown, ExternalLink, RefreshCw, X } from 'lucide-react';
import { apiService } from '../services/api';
import './VipUpgradeModal.css';

const money = value => `${Number(value || 0).toLocaleString('vi-VN')} đ`;

export function VipUpgradeModal({ isOpen, onClose, plans = [], initialPlan, currentUser, onPaymentSuccess }) {
  const [step, setStep] = useState('select');
  const [selectedPlan, setSelectedPlan] = useState(initialPlan || plans[1] || plans[0]);
  const [order, setOrder] = useState(null);
  const [payment, setPayment] = useState(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');

  useEffect(() => {
    if (!isOpen) return;
    setSelectedPlan(initialPlan || plans[1] || plans[0]);
    setStep(initialPlan ? 'payment' : 'select');
    setOrder(null); setPayment(null); setError(''); setNotice('');
  }, [isOpen, initialPlan, plans]);

  if (!isOpen) return null;

  async function createOrder() {
    if (!selectedPlan?.id || busy) return;
    setBusy(true); setError('');
    try {
      const result = await apiService.upgradeSubscription({ planId: selectedPlan.id });
      setOrder(result.order); setPayment(result.payment);
      if (result.order?.reportedPaidAt) setStep('waiting');
    } catch (cause) {
      setError(cause.message || 'Không thể tạo đơn. Vui lòng thử lại.');
      try {
        const state = await apiService.getWorkflowState();
        const pending = (state.orders || []).find(item => item.status === 'pending');
        if (pending) { setOrder(pending); setPayment(null); setSelectedPlan(plans.find(plan => plan.id === pending.planId) || selectedPlan); }
      } catch { /* Original request error remains visible. */ }
    }
    finally { setBusy(false); }
  }

  async function markTransferred() {
    if (!order?.orderId || busy) return;
    setBusy(true); setError('');
    try {
      await apiService.markPaymentTransferred(order.orderId);
      setOrder({ ...order, reportedPaidAt: new Date().toISOString() }); setStep('waiting');
    } catch (cause) { setError(cause.message || 'Không thể ghi nhận thông báo chuyển khoản.'); }
    finally { setBusy(false); }
  }

  async function cancelOrder() {
    if (!order?.orderId || busy) return;
    setBusy(true); setError('');
    try {
      await apiService.cancelPaymentOrder(order.orderId);
      setOrder(null); setPayment(null); setStep('select');
      setNotice('Đã hủy đơn chưa chuyển khoản. Bạn có thể chọn gói khác.');
    } catch (cause) { setError(cause.message || 'Không thể hủy đơn.'); }
    finally { setBusy(false); }
  }

  async function checkStatus() {
    setBusy(true); setError('');
    try {
      const state = await apiService.getWorkflowState();
      const latest = (state.orders || []).find(item => item.orderId === order?.orderId);
      if (latest?.status === 'completed') { onPaymentSuccess?.(latest); onClose(); }
      else setNotice('Đơn vẫn đang chờ đối soát giao dịch thực tế. Vui lòng kiểm tra lại sau.');
    } catch (cause) { setError(cause.message || 'Không thể kiểm tra trạng thái.'); }
    finally { setBusy(false); }
  }

  async function copy(value, label) {
    try { await navigator.clipboard.writeText(value); setNotice(`Đã sao chép ${label}.`); }
    catch { setError('Không thể sao chép tự động. Hãy chọn và sao chép thủ công.'); }
  }

  const manual = payment?.provider === 'manual-vietqr';
  const bank = payment?.receivingBank || order?.receivingBank;
  const checkout = payment?.checkoutUrl;
  return <div className="vietqr-modal-overlay" onClick={onClose}>
    <div className="vip-upgrade-modal-card vip-checkout" role="dialog" aria-modal="true" aria-label="Thanh toán gói Premium" onClick={event => event.stopPropagation()}>
      <header className="vip-checkout-head"><div><span className="vip-checkout-kicker"><Crown size={17} /> PREMIUM</span><h2>{step === 'select' ? 'Chọn gói phù hợp' : step === 'waiting' ? 'Đang chờ xác nhận thanh toán' : 'Thanh toán gói Premium'}</h2><p>Chỉ kích hoạt gói sau khi giao dịch được đối soát.</p></div><button className="vip-close" type="button" onClick={onClose} aria-label="Đóng"><X size={22} /></button></header>
      {error && <p className="vip-message vip-error" role="alert">{error}</p>}
      {notice && <p className="vip-message" role="status">{notice}</p>}
      {step === 'select' && <><div className="vip-plans-grid-v2">{plans.map(plan => <article key={plan.id} className={`vip-plan-card-v2 ${selectedPlan?.id === plan.id ? 'active-selected' : ''}`}><div className="vip-plan-name-v2">{plan.name}</div><div className="vip-plan-price-line"><strong>{plan.displayPrice || money(plan.price)}</strong><span>/ {plan.duration}</span></div><p>{plan.description}</p><ul className="vip-features-list-v2">{(plan.features || []).map(feature => <li key={feature}><CheckCircle2 size={16} />{feature}</li>)}</ul><button type="button" className={selectedPlan?.id === plan.id ? 'vip-button-primary' : 'vip-button-secondary'} onClick={() => setSelectedPlan(plan)}>{selectedPlan?.id === plan.id ? 'Đang chọn' : 'Chọn gói'}</button></article>)}</div><div className="vip-checkout-actions"><button type="button" className="vip-button-primary" disabled={!selectedPlan} onClick={() => setStep('payment')}>Tiếp tục với {selectedPlan?.name} <ArrowRight size={16} /></button></div></>}
      {step === 'payment' && <><div className="vip-order-intro"><strong>{selectedPlan?.name}</strong><span>{selectedPlan?.displayPrice || money(selectedPlan?.price)}</span></div>{!order && <><p>Nhấn tạo đơn để nhận QR với số tiền và nội dung chuyển khoản dành riêng cho lần gia hạn này.</p><div className="vip-checkout-actions"><button type="button" className="vip-button-secondary" onClick={() => setStep('select')}>Đổi gói</button><button type="button" className="vip-button-primary" disabled={busy} onClick={createOrder}>{busy ? 'Đang tạo đơn…' : 'Tạo đơn & xem mã thanh toán'} <ArrowRight size={16} /></button></div></>}
      {order && <><p className="vip-order-id">Mã đơn: <strong>{order.orderId}</strong></p>{manual && bank && <div className="vip-payment-layout"><div className="vip-qr-card"><img src={payment.qrUrl} alt={`Mã VietQR chuyển ${money(order.price)} tới ${bank.accountHolder}`} /><small>Quét bằng ứng dụng ngân hàng</small></div><div className="vip-bank-details"><dl><div><dt>Ngân hàng</dt><dd>{bank.bankName}</dd></div><div><dt>Chủ tài khoản</dt><dd>{bank.accountHolder}</dd></div><div><dt>Số tài khoản</dt><dd><strong>{bank.accountNumber}</strong><button type="button" onClick={() => copy(bank.accountNumber, 'số tài khoản')} aria-label="Sao chép số tài khoản"><Copy size={16} /></button></dd></div><div><dt>Số tiền</dt><dd><strong>{money(order.price)}</strong></dd></div><div><dt>Nội dung chuyển khoản</dt><dd><strong>{order.transactionCode}</strong><button type="button" onClick={() => copy(order.transactionCode, 'nội dung chuyển khoản')} aria-label="Sao chép nội dung chuyển khoản"><Copy size={16} /></button></dd></div></dl><p className="vip-payment-note">Chuyển đúng số tiền và nội dung để quản trị viên đối soát. Thông báo đã chuyển khoản không tự kích hoạt gói.</p></div></div>}{checkout && <div className="vip-checkout-link"><p>Thanh toán qua cổng PayOS. Gói được kích hoạt khi cổng thanh toán xác nhận giao dịch.</p><a className="vip-button-primary" href={checkout} target="_blank" rel="noopener noreferrer">Mở trang thanh toán <ExternalLink size={16} /></a></div>}{!manual && !checkout && <p role="alert">Đã tìm thấy đơn đang chờ. Tải thông tin thanh toán của đơn hoặc hủy nếu bạn chưa chuyển tiền.</p>}<div className="vip-checkout-actions">{!manual && !checkout && <button type="button" className="vip-button-secondary" disabled={busy} onClick={createOrder}>Tải QR của đơn</button>}{!checkout && !order.reportedPaidAt && <button type="button" className="vip-button-secondary" disabled={busy} onClick={cancelOrder}>Chưa chuyển tiền · hủy đơn</button>}{manual && !order.reportedPaidAt && <button type="button" className="vip-button-primary" disabled={busy} onClick={markTransferred}>{busy ? 'Đang ghi nhận…' : 'Tôi đã chuyển khoản'} <CheckCircle2 size={16} /></button>}{checkout && <button type="button" className="vip-button-secondary" disabled={busy} onClick={checkStatus}><RefreshCw size={16} /> Kiểm tra trạng thái</button>}</div></>}</>}
      {step === 'waiting' && <div className="vip-waiting"><CheckCircle2 size={44} /><h3>Đã ghi nhận thông báo chuyển khoản</h3><p>Đơn <strong>{order?.orderId}</strong> đang chờ quản trị viên đối chiếu tiền thực nhận tại ngân hàng. Gói {selectedPlan?.name} chỉ có hiệu lực sau khi xác nhận.</p><div className="vip-checkout-actions"><button type="button" className="vip-button-secondary" disabled={busy} onClick={checkStatus}><RefreshCw size={16} /> Kiểm tra trạng thái</button><button type="button" className="vip-button-primary" onClick={onClose}>Đóng</button></div></div>}
    </div>
  </div>;
}
