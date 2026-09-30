import React, { useState } from 'react';
import { ArrowUpRight, Send, X } from 'lucide-react';
import { fetchWithAuth } from '../services/api';
import './HelpAssistant.css';

const suggestions = [
  { id: 'challenges', label: 'Tìm thử thách' },
  { id: 'submit', label: 'Nộp bài thế nào?' },
  { id: 'ai', label: 'AI góp ý ra sao?' },
  { id: 'premium', label: 'Quyền lợi Premium' }
];

export default function HelpAssistant({ go, currentUser }) {
  const [open, setOpen] = useState(false);
  const [question, setQuestion] = useState('');
  const [aiConsent, setAiConsent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [messages, setMessages] = useState([]);
  function openRelatedPage(page) {
    if (!currentUser && ['submit', 'submissionHistory', 'feedback'].includes(page)) {
      if (page === 'submit') window.sessionStorage.setItem('rw:returnToSubmit', '1');
      go('auth');
    } else go(page);
    setOpen(false);
  }
  async function ask(text, topicId) {
    const clean = String(text || '').trim();
    if (busy || clean.length < 3 || clean.length > 400) return;
    setQuestion(''); setBusy(true);
    setMessages(prev => [...prev, { role: 'user', text: clean }].slice(-10));
    try {
      const reply = await fetchWithAuth('/api/assistant/ask', { method: 'POST', body: JSON.stringify({ question: clean, consent: aiConsent, ...(topicId ? { topicId } : {}) }), signal: AbortSignal.timeout(12000) });
      setMessages(prev => [...prev, { role: 'assistant', text: reply.answer, source: reply.source, page: reply.page }].slice(-10));
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', text: 'Mình chưa kết nối được. Bạn thử lại sau hoặc vào mục Hỗ trợ để gửi câu hỏi.', page: 'feedback' }].slice(-10));
    } finally { setBusy(false); }
  }
  return <div className="help-assistant">
    {open && <section className={`help-assistant-panel ${messages.length ? 'has-messages' : ''}`} aria-label="Trợ lý BeeLearn">
      <header className="help-assistant-header"><img src={`${import.meta.env.BASE_URL}beelearn-brand.png`} alt="" /><div><strong>BeeLearn hỗ trợ</strong><small>Hỏi nhanh về cách dùng website</small></div><button type="button" aria-label="Đóng trợ lý" onClick={() => setOpen(false)}><X size={18} /></button></header>
      <div className="help-assistant-body" aria-live="polite">
        {!messages.length && <div className="help-assistant-welcome"><strong>Chào bạn! Mình có thể giúp gì?</strong><p>Hỏi về thử thách, nộp bài, nhận góp ý hoặc tài khoản.</p><div className="help-assistant-suggestions">{suggestions.map(item => <button type="button" key={item.id} onClick={() => ask(item.label, item.id)}>{item.label}</button>)}</div></div>}
        {messages.map((message, index) => <div key={index} className={`help-assistant-message ${message.role === 'user' ? 'is-user' : 'is-assistant'}`}>{message.role === 'assistant' && <small>{message.source === 'ai' ? 'Gợi ý AI' : 'Hướng dẫn nhanh'}</small>}<p>{message.text}</p>{message.role === 'assistant' && message.page && <button type="button" className="help-assistant-link" onClick={() => openRelatedPage(message.page)}>{!currentUser && ['submit', 'submissionHistory', 'feedback'].includes(message.page) ? 'Đăng nhập để tiếp tục' : 'Mở trang liên quan'} <ArrowUpRight size={14} /></button>}</div>)}
        {busy && <p className="help-assistant-thinking">Đang tìm câu trả lời…</p>}
      </div>
      <label className="help-assistant-consent"><input type="checkbox" checked={aiConsent} onChange={event => setAiConsent(event.target.checked)} /><span>Cho phép gửi câu hỏi tới nhà cung cấp AI để nhận gợi ý. Bạn vẫn có thể hỏi đáp cơ bản khi không bật.</span></label>
      <form className="help-assistant-compose" onSubmit={event => { event.preventDefault(); ask(question); }}><label className="help-assistant-sr" htmlFor="help-assistant-question">Câu hỏi của bạn</label><input id="help-assistant-question" value={question} maxLength={400} onChange={event => setQuestion(event.target.value)} placeholder="Bạn cần hỗ trợ gì?" /><button type="submit" aria-label="Gửi câu hỏi" disabled={busy || question.trim().length < 3}><Send size={18} /></button></form>
      <p className="help-assistant-note">Đừng gửi mật khẩu, mã OTP hoặc dữ liệu riêng tư. Câu trả lời AI chỉ để tham khảo.</p>
    </section>}
    <button type="button" className="help-assistant-launcher" aria-expanded={open} aria-label={open ? 'Đóng trợ lý BeeLearn' : 'Mở trợ lý BeeLearn'} onClick={() => setOpen(value => !value)}>{open ? <X size={22} /> : <img src={`${import.meta.env.BASE_URL}beelearn-brand.png`} alt="" />}<span>{open ? 'Đóng' : 'Hỏi BeeLearn'}</span></button>
  </div>;
}
