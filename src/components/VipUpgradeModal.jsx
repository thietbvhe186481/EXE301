import React, { useEffect, useState } from 'react';
import { ArrowRight, CheckCircle2, Copy, Crown, ExternalLink, RefreshCw, X } from 'lucide-react';
import { apiService } from '../services/api';
import './VipUpgradeModal.css';

const money = value => `${Number(value || 0).toLocaleString('vi-VN')} đ`;

export function VipUpgradeModal({ isOpen, onClose, plans = [], initialPlan, currentUser, onLogin, onPaymentSuccess, paymentReturnCode, onClearPaymentReturn }) {
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

  useEffect(() => {
    if (!isOpen || !paymentReturnCode || (currentUser?.type || currentUser?.user?.role) !== 'student') return;
    let cancelled = false;
    apiService.getWorkflowState().then(state => {
      if (cancelled) return;
      const returnedOrder = (state.orders || []).find(item => Number(item.providerOrderCode) === paymentReturnCode);
      onClearPaymentReturn?.();
      if (!returnedOrder) { setError('Không tìm thấy đơn thanh toán trong tài khoản này. Hãy kiểm tra đúng tài khoản sinh viên.'); return; }
      if (returnedOrder.status === 'completed') { onPaymentSuccess?.(returnedOrder); onClose(); return; }
      if (returnedOrder.status === 'cancelled') { setStep('select'); setNotice('Giao dịch đã hủy. Gói chưa được kích hoạt.'); return; }
      setOrder(returnedOrder);
      setPayment({ checkoutUrl: returnedOrder.checkoutUrl, provider: 'payOS' });
      setSelectedPlan(plans.find(plan => plan.id === returnedOrder.planId) || null);
      setStep('payment');
      setNotice('Đã trở lại từ cổng thanh toán. Hệ thống đang chờ xác nhận chính thức từ payOS.');
    }).catch(() => { if (!cancelled) setError('Chưa tải được trạng thái thanh toán. Hãy thử lại sau.'); });
    return () => { cancelled = true; };
  }, [isOpen, paymentReturnCode, currentUser?.type]);

  useEffect(() => {
    if (!isOpen || !order?.orderId || !payment?.checkoutUrl) return;
    let stopped = false;
    let checking = false;
    const timer = window.setInterval(async () => {
      if (checking || stopped) return;
      checking = true;
      try {
        const state = await apiService.getWorkflowState();
        const latest = (state.orders || []).find(item => item.orderId === order.orderId);
        if (latest?.status === 'completed' && !stopped) {
          stopped = true;
          window.clearInterval(timer);
          onPaymentSuccess?.(latest);
          onClose();
        } else if (latest?.status === 'cancelled' && !stopped) {
          stopped = true;
          window.clearInterval(timer);
          setOrder(latest);
          setError('Giao dịch đã bị hủy. Bạn có thể tạo đơn mới.');
        }
      } catch { /* Nút kiểm tra trạng thái cho phép thử lại khi kết nối gián đoạn. */ }
      finally { checking = false; }
    }, 6000);
    return () => { stopped = true; window.clearInterval(timer); };
  }, [isOpen, order?.orderId, payment?.checkoutUrl]);

  if (!isOpen) return null;

  async function createOrder() {
    if (!selectedPlan?.id || busy) return;
    if (!currentUser) { onClose(); onLogin?.(); return; }
    if ((currentUser.type || currentUser.user?.role) !== 'student') { setError('Chỉ tài khoản sinh viên mới có thể gia hạn Premium.'); return; }
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
    if (!window.confirm('Bạn xác nhận chưa chuyển tiền cho đơn này? Nếu đã chuyển, đừng hủy; hãy kiểm tra trạng thái hoặc liên hệ hỗ trợ.')) return;
    setBusy(true); setError('');
    try {
      await apiService.cancelPaymentOrder(order.orderId);
      setOrder(null); setPayment(null); setStep('select');
      setNotice('Đã xác nhận hủy đơn chưa thanh toán. Bạn có thể chọn gói khác.');
    } catch (cause) { setError(cause.message || 'Không thể hủy đơn.'); }
    finally { setBusy(false); }
  }

  async function checkStatus() {
    setBusy(true); setError('');
    try {
      const state = await apiService.getWorkflowState();
      const latest = (state.orders || []).find(item => item.orderId === order?.orderId);
      if (latest?.status === 'completed') { onPaymentSuccess?.(latest); onClose(); }
      else setNotice(payment?.checkoutUrl ? 'Cổng thanh toán chưa xác nhận giao dịch. Hệ thống sẽ tự kích hoạt gói khi nhận thông báo thành công.' : 'Đơn đang chờ xác nhận khoản tiền đã chuyển. Vui lòng kiểm tra lại sau.');
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
      <header className="vip-checkout-head"><div><span className="vip-checkout-kicker"><Crown size={17} /> PORTFOLIO PREMIUM</span><h2>{step === 'select' ? 'Chọn thời hạn phù hợp' : step === 'waiting' ? 'Đang chờ xác nhận thanh toán' : 'Kiểm tra đơn thanh toán'}</h2><p>{step === 'select' ? 'Cùng quyền lợi Premium, khác thời hạn và mức giá.' : 'Gói có hiệu lực sau khi giao dịch được xác nhận.'}</p></div><button className="vip-close" type="button" onClick={onClose} aria-label="Đóng"><X size={22} /></button></header>
      {error && <p className="vip-message vip-error" role="alert">{error}</p>}
      {notice && <p className="vip-message" role="status">{notice}</p>}
      {step === 'select' && <>
        <div className="vip-choice-layout">
          <div className="vip-choice-list" role="group" aria-label="Chọn gói Premium">
            {plans.map(plan => <button type="button" key={plan.id} className={`vip-choice ${selectedPlan?.id === plan.id ? 'selected' : ''}`} aria-pressed={selectedPlan?.id === plan.id} onClick={() => setSelectedPlan(plan)}>
              <span className="vip-choice-radio" aria-hidden="true" />
              <span className="vip-choice-copy"><strong>{plan.name}</strong><small>{plan.description}</small></span>
              <span className="vip-choice-price"><strong>{Number(plan.price) > 0 ? money(plan.price) : plan.displayPrice}</strong><small>{plan.duration}</small></span>
            </button>)}
          </div>
          <aside className="vip-choice-benefits"><span className="vip-choice-label">TRONG MỌI GÓI PREMIUM</span><h3>Học, làm và nhận góp ý</h3><ul>{(selectedPlan?.features || []).map(feature => <li key={feature}><CheckCircle2 size={17} />{feature}</li>)}</ul><p>Mentor phù hợp được chọn theo thử thách và tình trạng nhận bài.</p></aside>
        </div>
        <div className="vip-checkout-actions vip-select-actions"><span>Bạn sẽ thấy số tiền và thông tin thanh toán trước khi trả.</span><button type="button" className="vip-button-primary" disabled={!selectedPlan} onClick={() => setStep('payment')}>Tiếp tục với {selectedPlan?.name} <ArrowRight size={16} /></button></div>
      </>}
      {step === 'payment' && <><div className="vip-order-intro"><strong>{selectedPlan?.name}</strong><span>{Number(selectedPlan?.price) > 0 ? money(selectedPlan.price) : selectedPlan?.displayPrice}</span></div>{!order && <><p>Tiếp tục để tạo đơn và kiểm tra thông tin thanh toán trên payOS. Bước này chưa chuyển tiền.</p><div className="vip-checkout-actions"><button type="button" className="vip-button-secondary" onClick={() => setStep('select')}>Đổi gói</button><button type="button" className="vip-button-primary" disabled={busy} onClick={createOrder}>{busy ? 'Đang tạo đơn…' : 'Tiếp tục thanh toán'} <ArrowRight size={16} /></button></div></>}
      {order && <><p className="vip-order-id">Mã đơn: <strong>{order.orderId}</strong></p>{manual && payment?.legacyOrder && <p className="vip-message" role="status">Đơn này được tạo theo cách thanh toán cũ. Nếu chưa chuyển tiền, hãy hủy để tạo đơn mới. Nếu đã chuyển, giữ đơn và chờ xác nhận.</p>}{manual && bank && <div className="vip-payment-layout"><div className="vip-qr-card"><img src={payment.qrUrl} alt={`Mã VietQR chuyển ${money(order.price)} tới ${bank.accountHolder}`} /><small>Quét bằng ứng dụng ngân hàng</small></div><div className="vip-bank-details"><dl><div><dt>Ngân hàng</dt><dd>{bank.bankName}</dd></div><div><dt>Chủ tài khoản</dt><dd>{bank.accountHolder}</dd></div><div><dt>Số tài khoản</dt><dd><strong>{bank.accountNumber}</strong><button type="button" onClick={() => copy(bank.accountNumber, 'số tài khoản')} aria-label="Sao chép số tài khoản"><Copy size={16} /></button></dd></div><div><dt>Số tiền</dt><dd><strong>{money(order.price)}</strong></dd></div><div><dt>Nội dung chuyển khoản</dt><dd><strong>{order.transactionCode}</strong><button type="button" onClick={() => copy(order.transactionCode, 'nội dung chuyển khoản')} aria-label="Sao chép nội dung chuyển khoản"><Copy size={16} /></button></dd></div></dl><p className="vip-payment-note">Chuyển đúng số tiền và nội dung. Gói chỉ có hiệu lực sau khi khoản tiền được xác nhận.</p></div></div>}{checkout && <div className="vip-checkout-link"><p>Hoàn tất thanh toán trên payOS. Gói Premium sẽ tự kích hoạt sau khi giao dịch thành công.</p><a className="vip-button-primary" href={checkout} target="_blank" rel="noopener noreferrer">Mở trang thanh toán <ExternalLink size={16} /></a></div>}{!manual && !checkout && <p role="alert">Đã tìm thấy đơn đang chờ. Tải thông tin thanh toán của đơn hoặc hủy nếu bạn chưa chuyển tiền.</p>}<div className="vip-checkout-actions">{!manual && !checkout && <button type="button" className="vip-button-secondary" disabled={busy} onClick={createOrder}>Tải QR của đơn</button>}{!order.reportedPaidAt && <button type="button" className="vip-button-secondary" disabled={busy} onClick={cancelOrder}>{checkout ? 'Hủy yêu cầu thanh toán' : 'Chưa chuyển tiền · hủy đơn'}</button>}{manual && !order.reportedPaidAt && <button type="button" className="vip-button-primary" disabled={busy} onClick={markTransferred}>{busy ? 'Đang ghi nhận…' : 'Tôi đã chuyển khoản'} <CheckCircle2 size={16} /></button>}{checkout && <button type="button" className="vip-button-secondary" disabled={busy} onClick={checkStatus}><RefreshCw size={16} /> Kiểm tra trạng thái</button>}</div></>}</>}
      {step === 'waiting' && <div className="vip-waiting"><CheckCircle2 size={44} /><h3>Đã ghi nhận thông báo chuyển khoản</h3><p>Đơn <strong>{order?.orderId}</strong> đang chờ xác nhận khoản tiền đã chuyển. Gói {selectedPlan?.name} chỉ có hiệu lực sau khi xác nhận.</p><div className="vip-checkout-actions"><button type="button" className="vip-button-secondary" disabled={busy} onClick={checkStatus}><RefreshCw size={16} /> Kiểm tra trạng thái</button><button type="button" className="vip-button-primary" onClick={onClose}>Đóng</button></div></div>}
    </div>
  </div>;
}
