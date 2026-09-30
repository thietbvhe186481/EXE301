import { createHmac, timingSafeEqual } from 'node:crypto';

const clientId = () => process.env.PAYOS_CLIENT_ID;
const apiKey = () => process.env.PAYOS_API_KEY;
const checksumKey = () => process.env.PAYOS_CHECKSUM_KEY;
export const payosConfigured = () => Boolean(clientId() && apiKey() && checksumKey() && process.env.PAYOS_RETURN_URL && process.env.PAYOS_CANCEL_URL);

const hmac = (message, key = checksumKey()) => createHmac('sha256', key).update(message).digest('hex');
const safeEqual = (left, right) => {
  if (typeof left !== 'string' || typeof right !== 'string') return false;
  const a = Buffer.from(left.toLowerCase()); const b = Buffer.from(right.toLowerCase());
  return a.length === b.length && timingSafeEqual(a, b);
};

export function payosPaymentSignature({ amount, cancelUrl, description, orderCode, returnUrl }) {
  return hmac(`amount=${amount}&cancelUrl=${cancelUrl}&description=${description}&orderCode=${orderCode}&returnUrl=${returnUrl}`);
}

export function verifyPayosWebhook(payload) {
  if (!checksumKey() || !payload?.data || typeof payload.signature !== 'string') return false;
  const message = Object.keys(payload.data).sort().map(key => `${key}=${payload.data[key] ?? ''}`).join('&');
  return safeEqual(hmac(message), payload.signature);
}

export async function createPayosLink({ orderCode, amount, description, buyerName, buyerEmail }, transport = fetch) {
  if (!payosConfigured()) throw new Error('PayOS chưa được cấu hình trên máy chủ.');
  const details = { amount, cancelUrl: process.env.PAYOS_CANCEL_URL, description, orderCode, returnUrl: process.env.PAYOS_RETURN_URL };
  const response = await transport('https://api-merchant.payos.vn/v2/payment-requests', {
    method: 'POST', signal: AbortSignal.timeout(15_000),
    headers: { 'x-client-id': clientId(), 'x-api-key': apiKey(), 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...details, buyerName: String(buyerName || '').slice(0, 50), buyerEmail, items: [{ name: String(description).slice(0, 25), quantity: 1, price: amount }], signature: payosPaymentSignature(details) })
  });
  const result = await response.json().catch(() => ({}));
  if (!response.ok || result.code !== '00' || !result.data?.checkoutUrl) throw new Error('PayOS chưa tạo được liên kết thanh toán. Kiểm tra cấu hình kênh thanh toán.');
  return result.data;
}

export async function getPayosLink(orderCode, transport = fetch) {
  if (!payosConfigured()) throw new Error('PayOS chưa được cấu hình trên máy chủ.');
  const response = await transport(`https://api-merchant.payos.vn/v2/payment-requests/${encodeURIComponent(orderCode)}`, {
    method: 'GET', signal: AbortSignal.timeout(15_000),
    headers: { 'x-client-id': clientId(), 'x-api-key': apiKey() }
  });
  const result = await response.json().catch(() => ({}));
  if (!response.ok || result.code !== '00' || !result.data) throw new Error('Không đọc được trạng thái thanh toán từ payOS.');
  return result.data;
}

export async function cancelPayosLink(orderCode, transport = fetch) {
  if (!payosConfigured()) throw new Error('PayOS chưa được cấu hình trên máy chủ.');
  const response = await transport(`https://api-merchant.payos.vn/v2/payment-requests/${encodeURIComponent(orderCode)}/cancel`, {
    method: 'POST', signal: AbortSignal.timeout(15_000),
    headers: { 'x-client-id': clientId(), 'x-api-key': apiKey(), 'Content-Type': 'application/json' },
    body: JSON.stringify({ cancellationReason: 'Sinh viên hủy đơn trên BeeLearn' })
  });
  const result = await response.json().catch(() => ({}));
  if (!response.ok || result.code !== '00' || result.data?.status !== 'CANCELLED') throw new Error('payOS chưa xác nhận hủy đơn.');
  return result.data;
}
