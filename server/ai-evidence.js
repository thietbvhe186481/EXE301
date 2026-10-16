import { fork } from 'node:child_process';

export const MAX_FILE_BYTES = 2 * 1024 * 1024;
const error = (message, status = 422) => Object.assign(new Error(message), { status });
let activeParsers = 0;

export function previewEvidence(text, sourceLabel, note = '', partial = false) {
  const clean = String(text || '').replace(/\u0000/g, '').trim();
  if (clean.length < 120) throw error('Chưa đọc được đủ nội dung. PDF ảnh quét hoặc tệp chỉ chứa hình chưa được hỗ trợ; hãy dán phần văn bản bài làm.');
  return { evidenceText: clean.slice(0, 6000), sourceLabel, truncated: partial || clean.length > 6000,
    note: `${note} ${partial || clean.length > 6000 ? 'Đây là phần trích chọn, tối đa 6.000 ký tự; hãy xem và chỉnh lại trước khi chấm.' : 'Hãy kiểm tra nội dung trước khi gửi AI.'}`.trim() };
}

// Parse untrusted documents off the HTTP event loop, with bounded lifetime/heap.
// Only plain text is returned. Files and embedded links are never executed/fetched.
export async function readDocument(buffer, format) {
  if (!Buffer.isBuffer(buffer) || !buffer.length || buffer.length > MAX_FILE_BYTES) throw error('Tệp phải có nội dung và không vượt quá 2 MB.');
  if (!['pdf', 'docx'].includes(format)) throw error('Chỉ hỗ trợ PDF và DOCX.');
  if (format === 'pdf' ? !buffer.subarray(0, 5).equals(Buffer.from('%PDF-')) : !buffer.subarray(0, 4).equals(Buffer.from([80, 75, 3, 4]))) throw error('Nội dung tệp không đúng định dạng PDF/DOCX đã chọn.');
  if (activeParsers >= 2) throw error('Hệ thống đang đọc bài khác. Vui lòng thử lại sau ít phút.', 429);
  activeParsers++;
  try {
    const result = await new Promise((resolve, reject) => {
      const worker = fork(new URL('./ai-document-worker.js', import.meta.url), [], {
        execArgv: ['--max-old-space-size=128'], stdio: ['ignore', 'ignore', 'ignore', 'ipc'], windowsHide: true
      });
      const timer = setTimeout(() => { reject(error('Tệp quá phức tạp để đọc. Hãy xuất bản PDF ngắn hơn hoặc dán văn bản.')); worker.kill(); }, 12000);
      worker.once('message', result => { clearTimeout(timer); result.error ? reject(error(result.error)) : resolve(result); });
      worker.once('error', () => { clearTimeout(timer); reject(error('Không đọc được tệp. Hãy kiểm tra tệp không bị khóa hoặc hỏng.')); });
      worker.once('exit', () => { clearTimeout(timer); reject(error('Không đọc được tệp. Hãy dán nội dung bài làm để tiếp tục.')); });
      worker.send({ buffer: buffer.toString('base64'), format });
    });
    return previewEvidence(result.text, format === 'pdf' ? 'Tệp PDF' : 'Tệp DOCX', format === 'pdf' ? 'Chỉ đọc văn bản trong tối đa 20 trang đầu; không đọc ảnh hoặc sơ đồ.' : 'Chỉ đọc văn bản; không đánh giá hình ảnh và bố cục.', result.partial);
  } finally { activeParsers--; }
}

export function parseGithubRepository(value) {
  let url;
  try { url = new URL(value); } catch { throw error('Nhập link kho mã công khai dạng https://github.com/chusohuu/ten-kho.'); }
  const match = url.pathname.match(/^\/([A-Za-z0-9-]{1,39})\/([A-Za-z0-9_.-]{1,100})\/?$/);
  if (url.protocol !== 'https:' || url.hostname !== 'github.com' || url.port || url.username || url.password || url.search || url.hash || !match || ['.', '..'].includes(match[2])) throw error('Chỉ nhận link gốc kho GitHub công khai, không nhận link đăng nhập hoặc link tới máy chủ khác.');
  return { owner: match[1], repo: match[2].replace(/\.git$/, '') };
}

async function githubJson(path, transport, signal, maxBytes = 1024 * 1024) {
  const response = await transport(`https://api.github.com${path}`, {
    redirect: 'error', signal, headers: { Accept: 'application/vnd.github+json', 'User-Agent': 'BeeLearn-evidence-reader', 'X-GitHub-Api-Version': '2022-11-28' }
  });
  if (!response.ok) throw error(response.status === 403 || response.status === 429 ? 'GitHub đang giới hạn lượt đọc. Hãy dán đoạn mã hoặc thử lại sau.' : 'Không đọc được kho GitHub. Hãy kiểm tra kho công khai và có nội dung.', response.status === 403 || response.status === 429 ? 429 : 422);
  if (Number(response.headers.get('content-length')) > maxBytes) throw error('Kho GitHub quá lớn. Hãy dán phần mã liên quan tới đề bài.');
  const chunks = []; let total = 0;
  for await (const chunk of response.body) {
    total += chunk.length;
    if (total > maxBytes) throw error('Dữ liệu GitHub quá lớn. Hãy dán phần mã liên quan tới đề bài.');
    chunks.push(Buffer.from(chunk));
  }
  return JSON.parse(Buffer.concat(chunks).toString('utf8'));
}

export async function readGithub(value, transport = fetch) {
  const { owner, repo } = parseGithubRepository(value);
  const root = `/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}`;
  const signal = AbortSignal.timeout(12000);
  try {
    const info = await githubJson(root, transport, signal);
    if (info.private || !info.default_branch) throw error('Chỉ hỗ trợ kho GitHub công khai có nhánh mặc định.');
    const tree = await githubJson(`${root}/git/trees/${encodeURIComponent(info.default_branch)}?recursive=1`, transport, signal);
    if (!Array.isArray(tree.tree)) throw error('Kho GitHub chưa có tệp để đọc.');
    const candidates = tree.tree.filter(file => file.type === 'blob' && /^[a-f0-9]{40,64}$/.test(file.sha) && file.size > 0 && file.size <= 60000 &&
      !/(^|\/)(node_modules|vendor|dist|build|\.git|\.next|coverage|secrets?)(\/|$)/i.test(file.path) &&
      !/(lock|\.min\.|secret|credential|password|\.env)/i.test(file.path) &&
      /(^|\/)readme(?:\.md|\.txt)?$|\.(jsx?|tsx?|py|java|css|html|sql|cs|go|vue|svelte)$/i.test(file.path));
    candidates.sort((a, b) => Number(/(^|\/)readme/i.test(b.path)) - Number(/(^|\/)readme/i.test(a.path)) || a.path.length - b.path.length || a.path.localeCompare(b.path));
    const selected = candidates.slice(0, 6);
    if (!selected.length) throw error('Chưa tìm thấy README hoặc mã nguồn phù hợp. Hãy dán phần bài làm cần chấm.');
    const perFile = Math.floor(5700 / selected.length);
    let partial = Boolean(tree.truncated || candidates.length > selected.length);
    const excerpts = await Promise.all(selected.map(async file => {
      const blob = await githubJson(`${root}/git/blobs/${file.sha}`, transport, signal, 100000);
      if (blob.encoding !== 'base64' || typeof blob.content !== 'string') throw error('Không đọc được nội dung mã nguồn.');
      const text = Buffer.from(blob.content, 'base64').toString('utf8').replace(/\u0000/g, '').trim();
      if (text.length > perFile) partial = true;
      return `--- ${file.path.slice(0, 160)} ---\n${text.slice(0, perFile)}`;
    }));
    return previewEvidence(excerpts.join('\n\n'), `GitHub · ${owner}/${repo}`, `Đọc ${selected.length} tệp từ nhánh mặc định. Chỉ đọc đoạn mã, không chạy chương trình hay kiểm thử.`, partial);
  } catch (cause) {
    if (cause.status) throw cause;
    throw error('GitHub chưa phản hồi hoặc dữ liệu không đọc được. Hãy dán bài làm hoặc thử lại sau.');
  }
}
