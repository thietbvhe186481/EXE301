import { after, before, test } from 'node:test';
import assert from 'node:assert/strict';
import express from 'express';
import { createInquiriesRouter } from './inquiries.js';

const saved = [];
const app = express();
app.use(express.json());
app.use('/api/inquiries', createInquiriesRouter({ ContactInquiry: { create: async value => { saved.push(value); return value; } } }));
let server, base;
before(async () => {
  server = app.listen(0, '127.0.0.1');
  await new Promise(resolve => server.once('listening', resolve));
  base = `http://127.0.0.1:${server.address().port}/api/inquiries`;
});
after(() => new Promise(resolve => server.close(resolve)));

async function send(body) {
  const response = await fetch(base, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(body) });
  return { status: response.status, headers: response.headers, data: await response.json() };
}

test('inquiries validate bounded fields, normalize email and apply per-IP spam limits', async () => {
  assert.equal((await send({ name: 'A', email: 'invalid', message: 'short' })).status, 422);
  const payload = { name: '  Lan Nguyễn  ', email: '  Lan@Example.COM ', message: 'Tôi muốn biết thêm về hệ thống mentor.' };
  const created = await send(payload);
  assert.equal(created.status, 201);
  assert.equal(created.data.inquiry.name, 'Lan Nguyễn');
  assert.equal(created.data.inquiry.email, 'lan@example.com');
  assert.equal(created.data.inquiry.phone, '');
  for (let attempt = 0; attempt < 3; attempt += 1) assert.equal((await send(payload)).status, 201);
  const limited = await send(payload);
  assert.equal(limited.status, 429);
  assert(Number(limited.headers.get('retry-after')) > 0);
  assert.equal(saved.length, 4);
});
