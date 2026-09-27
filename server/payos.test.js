import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createHmac } from 'node:crypto';
import { createPayosLink, payosConfigured, payosPaymentSignature, verifyPayosWebhook } from './payos.js';

const keys = ['PAYOS_CLIENT_ID', 'PAYOS_API_KEY', 'PAYOS_CHECKSUM_KEY', 'PAYOS_RETURN_URL', 'PAYOS_CANCEL_URL'];
const withPayos = async fn => {
  const old = Object.fromEntries(keys.map(key => [key, process.env[key]]));
  Object.assign(process.env, { PAYOS_CLIENT_ID: 'client-id', PAYOS_API_KEY: 'api-key', PAYOS_CHECKSUM_KEY: 'checksum-key', PAYOS_RETURN_URL: 'https://portfolio.example/return', PAYOS_CANCEL_URL: 'https://portfolio.example/cancel' });
  try { await fn(); } finally { for (const key of keys) old[key] === undefined ? delete process.env[key] : process.env[key] = old[key]; }
};

test('PayOS checkout uses server credentials and HMAC signature without exposing them to payload', async () => withPayos(async () => {
  assert.equal(payosConfigured(), true);
  const link = await createPayosLink({ orderCode: 1900000100, amount: 79000, description: 'JR000001', buyerName: 'Student', buyerEmail: 'student@example.test' }, async (url, options) => {
    assert.equal(url, 'https://api-merchant.payos.vn/v2/payment-requests');
    assert.equal(options.headers['x-client-id'], 'client-id'); assert.equal(options.headers['x-api-key'], 'api-key');
    const body = JSON.parse(options.body);
    assert.equal(body.signature, payosPaymentSignature({ amount: 79000, cancelUrl: process.env.PAYOS_CANCEL_URL, description: 'JR000001', orderCode: 1900000100, returnUrl: process.env.PAYOS_RETURN_URL }));
    assert.equal(JSON.stringify(body).includes('checksum-key'), false);
    return { ok: true, json: async () => ({ code: '00', data: { checkoutUrl: 'https://pay.payos.vn/web/example', paymentLinkId: 'link-1', qrCode: 'qr' } }) };
  });
  assert.equal(link.checkoutUrl, 'https://pay.payos.vn/web/example');
}));

test('PayOS webhook HMAC is verified over sorted data and rejects tampering', async () => withPayos(async () => {
  const data = { amount: 79000, orderCode: 1900000100, code: '00', reference: 'bank-ref' };
  const source = Object.keys(data).sort().map(key => `${key}=${data[key]}`).join('&');
  const signature = createHmac('sha256', process.env.PAYOS_CHECKSUM_KEY).update(source).digest('hex');
  assert.equal(verifyPayosWebhook({ data, signature }), true);
  assert.equal(verifyPayosWebhook({ data: { ...data, amount: 1 }, signature }), false);
  assert.equal(verifyPayosWebhook({ data, signature: '00' }), false);
}));
