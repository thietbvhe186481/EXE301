import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createIpRateLimiter } from './rate-limit.js';

test('public IP limiter applies a fixed window, reports retry time and bounds stored keys', () => {
  let now = 1000;
  const limit = createIpRateLimiter({ maxRequests: 2, windowMs: 10000, maxBuckets: 2, now: () => now });
  const call = ip => {
    let response;
    const res = {
      headers: {},
      set(key, value) { this.headers[key] = value; },
      status(status) { this.statusCode = status; return this; },
      json(body) { response = { status: this.statusCode, headers: this.headers, body }; return this; }
    };
    let continued = false;
    limit({ ip }, res, () => { continued = true; });
    return { continued, response };
  };
  assert.equal(call('127.0.0.1').continued, true);
  assert.equal(call('127.0.0.1').continued, true);
  const blocked = call('127.0.0.1');
  assert.equal(blocked.response.status, 429);
  assert.equal(blocked.response.headers['Retry-After'], '10');
  now += 10001;
  assert.equal(call('127.0.0.1').continued, true);
  call('10.0.0.2');
  call('10.0.0.3');
  assert.equal(call('10.0.0.2').continued, true);
});
