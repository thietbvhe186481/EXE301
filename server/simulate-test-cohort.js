import { createHash } from 'node:crypto';
import { readFile, writeFile } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';
import { CHALLENGES, readinessCheck } from '../shared/catalog.js';

const MAJORS = ['dev', 'mkt', 'design'];
const EMAIL_RE = /^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@gmail\.com$/i;

export function parseTestEmails(text) {
  const emails = String(text).split(/[\s,;]+/).map(value => value.trim().toLowerCase()).filter(Boolean);
  const invalid = emails.filter(email => !EMAIL_RE.test(email));
  if (invalid.length) throw new Error(`Địa chỉ Gmail không hợp lệ: ${invalid.slice(0, 3).join(', ')}`);
  if (new Set(emails).size !== emails.length) throw new Error('Danh sách có email trùng.');
  return emails;
}

const fingerprint = value => createHash('sha256').update(value).digest('hex');

export function simulateTestCohort(emails, now = new Date()) {
  if (!(now instanceof Date) || Number.isNaN(now.getTime())) throw new Error('Thời điểm chạy không hợp lệ.');
  const generatedAt = now.toISOString();
  const learners = emails.map((email, index) => {
    const majorKey = MAJORS[index % MAJORS.length];
    const pool = CHALLENGES.filter(challenge => challenge.majorKey === majorKey && challenge.access === 'free');
    if (!pool.length) throw new Error(`Không có thử thách miễn phí cho ${majorKey}.`);
    const challenge = pool[index % pool.length];
    const scenario = index % 4;
    const testId = `test-${fingerprint(email).slice(0, 16)}`;
    const note = `BÀI KIỂM THỬ — ${challenge.summary} Người kiểm thử mô tả giả định, cách thực hiện và cách đối chiếu từng yêu cầu của đề bài. Đây là nội dung mô phỏng, không phải bài làm của sinh viên thật.`;
    const payload = {
      links: [], format: 'chat', notes: note,
      skills: ['Phân tích yêu cầu', 'Trình bày giải pháp'], linksAccessible: true
    };
    const steps = [
      { action: 'xem_danh_sach_thu_thach', challengeId: challenge.id },
      { action: 'doc_de_bai', challengeId: challenge.id }
    ];
    if (scenario >= 1) steps.push({ action: 'tao_ban_nhap', challengeId: challenge.id });
    if (scenario >= 2) steps.push({ action: 'nop_bai_mo_phong', challengeId: challenge.id, readiness: readinessCheck(payload) });
    if (scenario === 3) steps.push({ action: 'xem_phan_hoi_quy_tac', challengeId: challenge.id });
    return {
      testId, email, kind: 'synthetic_test', accountCreated: false,
      emailSent: false, emailVerified: false, majorKey,
      challenge: { id: challenge.id, title: challenge.title, level: challenge.level },
      steps
    };
  });
  return {
    kind: 'synthetic_test', generatedAt,
    productionAccountsCreated: 0, emailsSent: 0,
    summary: {
      learners: learners.length,
      viewedBrief: learners.length,
      drafted: learners.filter(item => item.steps.some(step => step.action === 'tao_ban_nhap')).length,
      simulatedSubmissions: learners.filter(item => item.steps.some(step => step.action === 'nop_bai_mo_phong')).length,
      simulatedFeedbackViews: learners.filter(item => item.steps.some(step => step.action === 'xem_phan_hoi_quy_tac')).length
    },
    learners
  };
}

async function main() {
  const args = process.argv.slice(2);
  const source = args[args.indexOf('--emails-file') + 1];
  const destination = args[args.indexOf('--out') + 1];
  if (!source || !destination || source.startsWith('--') || destination.startsWith('--')) {
    throw new Error('Cách dùng: node server/simulate-test-cohort.js --emails-file <đường dẫn> --out <đường dẫn>');
  }
  const emails = parseTestEmails(await readFile(source, 'utf8'));
  const report = simulateTestCohort(emails);
  await writeFile(destination, `${JSON.stringify(report, null, 2)}\n`, { flag: 'w' });
  process.stdout.write(`${JSON.stringify({ output: destination, ...report.summary })}\n`);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch(error => { console.error(error.message); process.exitCode = 1; });
}
