// Form submissions (enquiries, newsletter, tender subscriptions, trademark
// reports) go to the website API. On Vercel, /api/* is forwarded to the API
// server (see vercel.json), so no URL needs configuring. VITE_API_URL is only
// needed if the API is called directly on another domain.

const API_URL = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');

export async function submitForm(collection, payload) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 30000);
  try {
    const res = await fetch(`${API_URL}/api/public/${collection}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...payload, page: window.location.pathname }),
      signal: controller.signal,
    });
    const data = await res.json().catch(() => ({}));
    // Only a confirmed save counts — never report success the visitor can't rely on
    return { ok: res.ok && data.ok === true, data };
  } catch {
    return { ok: false };
  } finally {
    clearTimeout(timer);
  }
}
