import test from 'node:test';
import assert from 'node:assert/strict';
import { parseTestEmails, simulateTestCohort } from './simulate-test-cohort.js';

test('test cohort uses real challenge catalog without creating accounts or sending mail', () => {
  const emails = parseTestEmails('one@gmail.com two@gmail.com three@gmail.com four@gmail.com');
  const report = simulateTestCohort(emails, new Date('2026-10-22T00:00:00.000Z'));
  assert.equal(report.kind, 'synthetic_test');
  assert.equal(report.summary.learners, 4);
  assert.equal(report.summary.simulatedSubmissions, 2);
  assert.equal(report.productionAccountsCreated, 0);
  assert.equal(report.emailsSent, 0);
  assert.ok(report.learners.every(item => item.accountCreated === false && item.steps.length >= 2));
  assert.equal(report.learners[3].steps.at(-1).action, 'xem_phan_hoi_quy_tac');
});

test('input rejects duplicates and malformed Gmail addresses', () => {
  assert.throws(() => parseTestEmails('one@gmail.com ONE@gmail.com'), /trùng/);
  assert.throws(() => parseTestEmails('one@example.com'), /không hợp lệ/);
});
