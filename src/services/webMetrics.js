import { fetchWithAuth } from './api';
// Anonymous measurements: no email, account ID, page URL or form contents.
export function startWebMetrics() {
  if (navigator.doNotTrack === '1' || navigator.globalPrivacyControl) return;
  const id = crypto.randomUUID();
  let activeSeconds = 0;
  let last = performance.now();
  let loadMs = null;
  let visible = document.visibilityState === 'visible';
  const send = () => fetchWithAuth('/api/web-metrics', { method: 'POST', keepalive: true, body: JSON.stringify({ id, loadMs, activeSeconds }) }).catch(() => {});
  const sample = () => { const now = performance.now(); if (visible) activeSeconds = Math.min(86400, activeSeconds + Math.floor(Math.min(35000, now - last) / 1000)); last = now; visible = document.visibilityState === 'visible'; };
  const ready = () => { const nav = performance.getEntriesByType('navigation')[0]; loadMs = nav?.loadEventEnd > 0 ? Math.round(nav.loadEventEnd - nav.startTime) : null; send(); };
  if (document.readyState === 'complete') setTimeout(ready, 0); else window.addEventListener('load', () => setTimeout(ready, 0), { once: true });
  setInterval(() => { sample(); send(); }, 30000);
  document.addEventListener('visibilitychange', () => { sample(); send(); });
  window.addEventListener('pagehide', () => { sample(); send(); });
}

