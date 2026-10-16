import { useState } from 'react';
import { fetchWithAuth } from '../services/api';

export default function AiEvidenceInput({ base, busy, mutate }) {
  const [source, setSource] = useState('paste');
  const [text, setText] = useState('');
  const [consent, setConsent] = useState(false);
  const [githubUrl, setGithubUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [importInfo, setImportInfo] = useState(null);
  const disabled = busy || loading;
  async function importEvidence(file) {
    setError(''); setConsent(false);
    if (file && (!/\.(pdf|docx)$/i.test(file.name) || file.size > 2 * 1024 * 1024)) {
      setError('Chọn tệp PDF hoặc DOCX không quá 2 MB.'); return;
    }
    setLoading(true);
    try {
      const format = file?.name.split('.').pop().toLowerCase();
      const result = await fetchWithAuth(`/api/workflow${base}/ai-evidence${file ? `?format=${format}` : ''}`, {
        method: 'POST',
        headers: { 'Content-Type': file ? 'application/octet-stream' : 'application/json' },
        body: file || JSON.stringify({ githubUrl: githubUrl.trim() }),
        signal: AbortSignal.timeout(45000),
      });
      setText(result.evidenceText || ''); setImportInfo(result);
    } catch (e) { setError(e.message || 'Chưa thể đọc nội dung. Bạn có thể dán trích đoạn bên dưới.'); }
    finally { setLoading(false); }
  }
  return <div className="rw-ai-reader">
    <p>Đưa nội dung bài làm vào ô bên dưới, kiểm tra rồi gửi AI đối chiếu từng tiêu chí. Mỗi bài một kết quả, tối đa 2 bài/ngày; dịch vụ có thể tạm dừng khi hết hạn mức.</p>
    <fieldset className="rw-ai-sources" disabled={disabled}><legend>1. Chọn nguồn bài làm</legend>
      {[['paste', 'Dán nội dung'], ['file', 'PDF / DOCX'], ['github', 'GitHub công khai']].map(([value, label]) => <label key={value} className={source === value ? 'is-selected' : ''}><input type="radio" name={`ai-source-${base}`} checked={source === value} onChange={() => { setSource(value); setConsent(false); setError(''); setImportInfo(null); }} />{label}</label>)}
    </fieldset>
    {source === 'file' && <label className="rw-field rw-ai-import"><span>Chọn tệp để trích xuất văn bản</span><input type="file" accept=".pdf,.docx" disabled={disabled} onChange={e => { const file = e.target.files?.[0]; if (file) importEvidence(file); e.target.value = ''; }} /><small>Tối đa 2 MB; PDF đọc 20 trang đầu. Không đọc chữ trong ảnh quét. Tệp được gửi tới BeeLearn để trích xuất, không lưu tệp gốc.</small></label>}
    {source === 'github' && <div className="rw-ai-import"><label className="rw-field"><span>Đường dẫn kho GitHub công khai</span><input type="url" value={githubUrl} disabled={disabled} onChange={e => { setGithubUrl(e.target.value); setConsent(false); setImportInfo(null); }} placeholder="https://github.com/ten-ban/ten-kho" /></label><button type="button" className="rw-secondary" disabled={disabled || !githubUrl.trim()} onClick={() => importEvidence()}>Đọc nội dung kho</button><small>Đọc README và các tệp mã nguồn phù hợp, tối đa 6 tệp từ nhánh mặc định. Không chạy hoặc kiểm thử code.</small></div>}
    {loading && <p role="status">Đang đọc và trích xuất nội dung…</p>}
    {error && <p className="rw-ai-import-error" role="alert">{error}</p>}
    {importInfo && <div className="rw-ai-import-result" role="status"><strong>{importInfo.sourceLabel}</strong><p>{importInfo.note || 'Đã trích xuất. Hãy kiểm tra nội dung bên dưới trước khi gửi AI.'}{importInfo.truncated && ' Chỉ giữ tối đa 6.000 ký tự đầu.'}</p></div>}
    <label className="rw-field"><span>2. Kiểm tra trích đoạn AI sẽ đọc</span><textarea rows={8} minLength={120} maxLength={6000} disabled={disabled} value={text} onChange={e => { setText(e.target.value); setConsent(false); setImportInfo(null); }} placeholder="Dán hoặc nhập nội dung từ tệp: kết quả đã làm, đoạn mã, kế hoạch hay giải thích thiết kế…" /><small>{text.trim().length}/6000 ký tự · Tối thiểu 120 ký tự. Có thể sửa trích đoạn trước khi gửi; bỏ mật khẩu, thông tin cá nhân và bí mật.</small></label>
    <label className="rw-check"><input type="checkbox" disabled={disabled} checked={consent} onChange={e => setConsent(e.target.checked)} />Tôi đồng ý gửi trích đoạn đã kiểm tra ở trên tới Groq để nhận đánh giá AI tham khảo.</label>
    <button type="button" className="rw-primary" disabled={disabled || !consent || text.trim().length < 120} onClick={() => mutate(`${base}/ai-advice`, { consent: true, evidenceText: text.trim() }, 'POST', 'Đã nhận đánh giá AI sơ bộ.')}>{busy ? 'Đang đối chiếu…' : '3. Nhận đánh giá AI'}</button>
  </div>;
}
