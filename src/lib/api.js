// Form submissions (enquiries, newsletter) go to the backend once it is live.
// Set VITE_API_URL in .env (e.g. https://api.mishraandassociates.in).
// Until then, submissions resolve successfully in demo mode so the flow can be previewed.

const API_URL = import.meta.env.VITE_API_URL;

export const isBackendConnected = Boolean(API_URL);

export async function submitForm(collection, payload) {
  if (!API_URL) {
    await new Promise((r) => setTimeout(r, 700));
    return { ok: true, demo: true };
  }
  try {
    const res = await fetch(`${API_URL}/api/public/${collection}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...payload, page: window.location.pathname }),
    });
    const data = await res.json().catch(() => ({}));
    return { ok: res.ok, data };
  } catch {
    return { ok: false };
  }
}
