import React, { useEffect, useState } from 'react';
import { ArrowUpRight, Send, X } from 'lucide-react';
import { fetchWithAuth } from '../services/api';
import './HelpAssistant.css';

const suggestions = [
  { id: 'challenges', label: 'Tìm thử thách' },
  { id: 'submit', label: 'Nộp bài thế nào?' },
  { id: 'ai', label: 'AI góp ý ra sao?' },
  { id: 'premium', label: 'Quyền lợi Premium' }
];

const ENCOURAGEMENT_KEY = 'beelearn:bee-encouragement';
const SESSION_KEY = 'beelearn:bee-session';
const encouragements = {
  home: 'Một bài vừa sức hôm nay cũng là một bước tiến!',
  roadmap: 'Chọn hướng bạn thích rồi thử bài đầu tiên nhé.',
  hub: 'Không cần hoàn hảo ngay. Bắt đầu là tiến bộ!',
  join: 'Đọc kỹ yêu cầu trước khi bắt tay làm nhé.',
  submit: 'Kiểm tra liên kết bài làm rồi tự tin nộp nhé!',
  submissionHistory: 'Mỗi lần cải thiện đều đáng ghi nhận.',
  feedback: 'Góp ý giúp bạn làm bài tốt hơn từng chút.',
  learning: 'Học một chút mỗi ngày cũng tạo khác biệt.',
  portfolio: 'Sản phẩm bạn đã làm rất đáng để chia sẻ.'
};

function readStorage(storage, key, fallback) {
  try { return storage.getItem(key) ?? fallback; } catch { return fallback; }
}

function readSession() {
  try { return JSON.parse(readStorage(window.sessionStorage, SESSION_KEY, '{}')); }
  catch { return {}; }
}

export default function HelpAssistant({ go, currentUser, page, quiet = false }) {
  const [open, setOpen] = useState(false);
  const [question, setQuestion] = useState('');
  const [pendingAiQuestion, setPendingAiQuestion] = useState('');
  const [busy, setBusy] = useState(false);
  const [messages, setMessages] = useState([]);
  const [encouragementEnabled, setEncouragementEnabled] = useState(() => readStorage(window.localStorage, ENCOURAGEMENT_KEY, 'on') !== 'off');
  const [bubbleVisible, setBubbleVisible] = useState(false);
  const isQuietPage = quiet || ['auth', 'premium', 'pricing', 'admin', 'mentor'].includes(page) || ['admin', 'mentor'].includes(currentUser?.type ?? currentUser?.user?.role);

  useEffect(() => {
    if (isQuietPage) { setBubbleVisible(false); setOpen(false); }
  }, [isQuietPage]);

  useEffect(() => {
    if (isQuietPage) return undefined;
    const openFromPage = () => { setBubbleVisible(false); setOpen(true); };
    window.addEventListener('beelearn:open-assistant', openFromPage);
    return () => window.removeEventListener('beelearn:open-assistant', openFromPage);
  }, [isQuietPage]);

  useEffect(() => {
    setBubbleVisible(false);
    if (!encouragementEnabled || open || isQuietPage || !encouragements[page]) return undefined;
    const session = readSession();
    if (session.dismissed || (session.count ?? 0) >= 2 || session.pages?.includes(page)) return undefined;
    const showTimer = window.setTimeout(() => {
      if (window.matchMedia('(max-width: 640px)').matches) return;
      const next = { ...session, count: (session.count ?? 0) + 1, pages: [...(session.pages ?? []), page] };
      try { window.sessionStorage.setItem(SESSION_KEY, JSON.stringify(next)); } catch { /* Private browsing can block storage. */ }
      setBubbleVisible(true);
    }, 5000);
    return () => window.clearTimeout(showTimer);
  }, [encouragementEnabled, isQuietPage, open, page]);

  useEffect(() => {
    if (!bubbleVisible) return undefined;
    const hideTimer = window.setTimeout(() => setBubbleVisible(false), 10000);
    return () => window.clearTimeout(hideTimer);
  }, [bubbleVisible]);

  function dismissBubble() {
    setBubbleVisible(false);
    try { window.sessionStorage.setItem(SESSION_KEY, JSON.stringify({ ...readSession(), dismissed: true })); } catch { /* The bubble still closes. */ }
  }

  function toggleEncouragement() {
    const next = !encouragementEnabled;
    setEncouragementEnabled(next);
    setBubbleVisible(false);
    try { window.localStorage.setItem(ENCOURAGEMENT_KEY, next ? 'on' : 'off'); } catch { /* The setting still works for this page. */ }
    if (next) {
      try { window.sessionStorage.setItem(SESSION_KEY, JSON.stringify({ count: 0, pages: [], dismissed: false })); } catch { /* Ignore blocked storage. */ }
    }
  }
  function openRelatedPage(page) {
    if (!currentUser && ['submit', 'submissionHistory', 'feedback'].includes(page)) {
      if (page === 'submit') window.sessionStorage.setItem('rw:returnToSubmit', '1');
      go('auth');
    } else go(page);
    setOpen(false);
  }
  async function ask(text, topicId, consent = false) {
    const clean = String(text || '').trim();
    if (busy || clean.length < 3 || clean.length > 400) return;
    setQuestion(''); setPendingAiQuestion(''); setBusy(true);
    setMessages(prev => [...prev, { role: 'user', text: clean }].slice(-10));
    try {
      const reply = await fetchWithAuth('/api/assistant/ask', { method: 'POST', body: JSON.stringify({ question: clean, consent: Boolean(consent && !topicId), ...(topicId ? { topicId } : {}) }), signal: AbortSignal.timeout(12000) });
      setMessages(prev => [...prev, { role: 'assistant', text: reply.answer, source: reply.source, page: reply.page }].slice(-10));
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', text: 'Mình chưa kết nối được. Bạn thử lại sau hoặc vào mục Hỗ trợ để gửi câu hỏi.', page: 'feedback' }].slice(-10));
    } finally { setBusy(false); }
  }
  if (quiet) return null;
  return <div className="help-assistant">
    {open && <section className={`help-assistant-panel ${messages.length ? 'has-messages' : ''}`} aria-label="Trợ lý BeeLearn">
      <header className="help-assistant-header"><img src={`${import.meta.env.BASE_URL}beelearn-brand.png`} alt="" /><div><strong>BeeLearn hỗ trợ</strong><small>Hỏi nhanh về cách dùng website</small></div><button type="button" aria-label="Đóng trợ lý" onClick={() => setOpen(false)}><X size={18} /></button></header>
      <div className="help-assistant-body" aria-live="polite">
        {!messages.length && <div className="help-assistant-welcome"><strong>Chào bạn! Mình có thể giúp gì?</strong><p>Hỏi về thử thách, nộp bài, nhận góp ý hoặc tài khoản.</p><div className="help-assistant-suggestions">{suggestions.map(item => <button type="button" key={item.id} onClick={() => ask(item.label, item.id)}>{item.label}</button>)}</div></div>}
        {messages.map((message, index) => <div key={index} className={`help-assistant-message ${message.role === 'user' ? 'is-user' : 'is-assistant'}`}>{message.role === 'assistant' && <small>{message.source === 'ai' ? 'Gợi ý AI' : 'Hướng dẫn nhanh'}</small>}<p>{message.text}</p>{message.role === 'assistant' && message.page && <button type="button" className="help-assistant-link" onClick={() => openRelatedPage(message.page)}>{!currentUser && ['submit', 'submissionHistory', 'feedback'].includes(message.page) ? 'Đăng nhập để tiếp tục' : 'Mở trang liên quan'} <ArrowUpRight size={14} /></button>}</div>)}
        {busy && <p className="help-assistant-thinking">Đang tìm câu trả lời…</p>}
      </div>
      <form className="help-assistant-compose" onSubmit={event => { event.preventDefault(); ask(question); }}><label className="help-assistant-sr" htmlFor="help-assistant-question">Câu hỏi của bạn</label><input id="help-assistant-question" value={question} maxLength={400} onChange={event => setQuestion(event.target.value)} placeholder="Bạn cần hỗ trợ gì?" /><button type="submit" aria-label="Xem hướng dẫn nhanh" disabled={busy || question.trim().length < 3}><Send size={18} /></button></form>
      {question.trim().length >= 3 && !pendingAiQuestion && <button type="button" className="help-assistant-ai-trigger" disabled={busy} onClick={() => setPendingAiQuestion(question.trim())}>Muốn hỏi AI? <strong>Dùng AI cho câu này</strong></button>}
      {pendingAiQuestion && <div className="help-assistant-ai-confirm" role="group" aria-label="Xác nhận hỏi AI"><p>Gửi câu hỏi này tới Groq để nhận gợi ý AI?</p><blockquote>{pendingAiQuestion}</blockquote><small>Đừng gửi mật khẩu, OTP hoặc dữ liệu riêng tư.</small><div><button type="button" onClick={() => setPendingAiQuestion('')}>Để sau</button><button type="button" disabled={busy} onClick={() => ask(pendingAiQuestion, undefined, true)}>Đồng ý & gửi câu hỏi</button></div></div>}
      <button type="button" className="help-assistant-encouragement-setting" aria-pressed={encouragementEnabled} onClick={toggleEncouragement}><span aria-hidden="true">{encouragementEnabled ? '✦' : '○'}</span> {encouragementEnabled ? 'Tắt lời nhắc của Bee' : 'Bật lời nhắc của Bee'}</button>
    </section>}
    {bubbleVisible && !open && !isQuietPage && <div className="help-assistant-bubble"><button type="button" className="help-assistant-bubble-action" onClick={() => { setBubbleVisible(false); setOpen(true); }} aria-label={`${encouragements[page]} Mở trợ lý BeeLearn`}>{encouragements[page]}</button><button type="button" className="help-assistant-bubble-dismiss" aria-label="Ẩn lời nhắc của Bee trong phiên này" onClick={dismissBubble}><X size={14} /></button></div>}
    <button type="button" className={`help-assistant-launcher ${open ? 'is-open' : ''}`} aria-expanded={open} aria-label={open ? 'Đóng trợ lý BeeLearn' : 'Mở trợ lý BeeLearn'} onClick={() => { setBubbleVisible(false); setOpen(value => !value); }}>{open ? <X size={22} /> : <span className="help-assistant-bee" aria-hidden="true"><img src={`${import.meta.env.BASE_URL}beelearn-brand.png`} alt="" /></span>}<span className="help-assistant-launcher-label">{open ? 'Đóng' : 'Hỏi Bee'}</span></button>
  </div>;
}
