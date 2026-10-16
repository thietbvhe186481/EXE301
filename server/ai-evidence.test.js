import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readDocument, readGithub, parseGithubRepository, previewEvidence, MAX_FILE_BYTES } from './ai-evidence.js';

const prose = 'The project implements accessible forms with labelled inputs and keyboard navigation. Automated tests check invalid input and successful submission. Responsive layout uses CSS grid and readable error messages.';

// Small original fixtures, generated in-memory; no student files or network needed.
function pdfFixture() {
  const stream = `BT /F1 11 Tf 30 750 Td (${prose}) Tj ET`;
  const objects = ['<< /Type /Catalog /Pages 2 0 R >>', '<< /Type /Pages /Kids [3 0 R] /Count 1 >>', '<< /Type /Page /Parent 2 0 R /MediaBox [0 0 1000 800] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>', '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>', `<< /Length ${stream.length} >>\nstream\n${stream}\nendstream`];
  let doc = '%PDF-1.4\n'; const offsets = [0];
  objects.forEach((obj, i) => { offsets.push(Buffer.byteLength(doc)); doc += `${i + 1} 0 obj\n${obj}\nendobj\n`; });
  const xref = Buffer.byteLength(doc);
  doc += `xref\n0 6\n0000000000 65535 f \n${offsets.slice(1).map(n => `${String(n).padStart(10, '0')} 00000 n \n`).join('')}trailer\n<< /Size 6 /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF`;
  return Buffer.from(doc);
}
function zipFixture(files) {
  const local = [], central = []; let offset = 0;
  for (const [name, value] of Object.entries(files)) {
    const path = Buffer.from(name), data = Buffer.from(value);
    let crc = 0xffffffff;
    for (const byte of data) { crc ^= byte; for (let i = 0; i < 8; i++) crc = (crc >>> 1) ^ (0xedb88320 & -(crc & 1)); }
    crc = (crc ^ 0xffffffff) >>> 0;
    const header = Buffer.alloc(30); header.writeUInt32LE(0x04034b50); header.writeUInt16LE(20, 4); header.writeUInt32LE(crc, 14); header.writeUInt32LE(data.length, 18); header.writeUInt32LE(data.length, 22); header.writeUInt16LE(path.length, 26);
    const dir = Buffer.alloc(46); dir.writeUInt32LE(0x02014b50); dir.writeUInt16LE(20, 4); dir.writeUInt16LE(20, 6); dir.writeUInt32LE(crc, 16); dir.writeUInt32LE(data.length, 20); dir.writeUInt32LE(data.length, 24); dir.writeUInt16LE(path.length, 28); dir.writeUInt32LE(offset, 42);
    local.push(header, path, data); central.push(dir, path); offset += header.length + path.length + data.length;
  }
  const directory = Buffer.concat(central), end = Buffer.alloc(22); end.writeUInt32LE(0x06054b50); end.writeUInt16LE(central.length / 2, 8); end.writeUInt16LE(central.length / 2, 10); end.writeUInt32LE(directory.length, 12); end.writeUInt32LE(offset, 16);
  return Buffer.concat([...local, directory, end]);
}

test('document readers extract actual PDF and DOCX text without keeping files', async () => {
  const pdf = await readDocument(pdfFixture(), 'pdf');
  assert.match(pdf.evidenceText, /accessible forms/);
  const docx = zipFixture({
    '[Content_Types].xml': '<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/></Types>',
    'word/document.xml': `<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:body><w:p><w:r><w:t>${prose}</w:t></w:r></w:p></w:body></w:document>`
  });
  const result = await readDocument(docx, 'docx');
  assert.equal(result.evidenceText, prose);
  assert.equal(result.truncated, false);
});

test('reject invalid, oversized and unreadable documents; bound preview length', async () => {
  await assert.rejects(readDocument(Buffer.from('not a pdf'), 'pdf'), /định dạng/);
  await assert.rejects(readDocument(Buffer.alloc(MAX_FILE_BYTES + 1), 'pdf'), /2 MB/);
  await assert.rejects(readDocument(Buffer.from('%PDF-1.4 broken'), 'pdf'), /Không đọc được/);
  await assert.rejects(readDocument(Buffer.from([80, 75, 3, 4]), 'docx'), /Không đọc được/);
  assert.throws(() => previewEvidence('short', 'PDF'), /Chưa đọc được/);
  assert.equal(previewEvidence('A'.repeat(9000), 'PDF').evidenceText.length, 6000);
  assert.equal(previewEvidence('A'.repeat(9000), 'PDF').truncated, true);
});

test('GitHub reader restricts host/protocol and uses bounded public API blobs only', async () => {
  for (const url of ['http://github.com/a/b', 'https://github.com.evil.test/a/b', 'https://127.0.0.1/a/b', 'https://user@github.com/a/b', 'https://github.com/a/b/tree/main', 'https://github.com/a/b?token=x', 'https://github.com:444/a/b']) assert.throws(() => parseGithubRepository(url));
  const calls = [], sha = 'a'.repeat(40);
  const transport = async (url, options) => {
    calls.push(url); assert.equal(options.redirect, 'error');
    if (url.endsWith('/repo')) return Response.json({ private: false, default_branch: 'main' });
    if (url.includes('/git/trees/')) return Response.json({ tree: [{ type: 'blob', path: 'README.md', size: 500, sha }, { type: 'blob', path: '.env.js', size: 100, sha: 'b'.repeat(40) }] });
    return Response.json({ encoding: 'base64', content: Buffer.from(prose).toString('base64') });
  };
  const result = await readGithub('https://github.com/owner/repo', transport);
  assert.match(result.evidenceText, /README.md/); assert.match(result.evidenceText, /accessible forms/);
  assert.equal(calls.length, 3); assert.ok(calls.every(url => url.startsWith('https://api.github.com/repos/owner/repo')));
  await assert.rejects(readGithub('https://github.com/owner/repo', async () => Response.json({}, { status: 403 })), /giới hạn/);
  await assert.rejects(readGithub('https://github.com/owner/repo', async () => new Response('A'.repeat(1024 * 1024 + 1))), /quá lớn/);
});
