// Public endpoints: the published snapshot (read by the site build) and form submissions.
import express from 'express';
import rateLimit from 'express-rate-limit';
import { Content, Publish, Submission, SUBMISSION_TYPES } from '../models.js';
import { asyncRoute, HttpError } from '../http.js';
import { toSnapshot } from '../content.js';
import { sendEmail, submissionEmail } from '../services.js';

export const publicRouter = express.Router();

publicRouter.get(
  '/snapshot',
  asyncRoute(async (req, res) => {
    const latest = await Publish.findOne().sort({ createdAt: -1 });
    if (!latest) return res.status(404).json({ ok: false, reason: 'unpublished' });
    res.set('Cache-Control', 'no-store');
    res.json({ ok: true, snapshot: toSnapshot(latest) });
  })
);

// ─── Forms ───────────────────────────────────────────────────
const formLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  limit: 12,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  message: { ok: false, error: 'Too many submissions. Please try again in a few minutes, or call us.' },
});

const KEY_RE = /^[a-zA-Z][a-zA-Z0-9_]{0,30}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^[+\d][\d\s()-]{6,19}$/;

/** Keeps only short scalar fields (and short lists of them) from a visitor's submission. */
function cleanSubmission(body) {
  if (typeof body !== 'object' || body === null || Array.isArray(body)) throw new HttpError(400, 'Malformed submission.');
  const data = {};
  for (const [key, raw] of Object.entries(body).slice(0, 30)) {
    if (!KEY_RE.test(key) || key === 'page' || key === 'website') continue;
    if (typeof raw === 'string' || typeof raw === 'number' || typeof raw === 'boolean') {
      const v = String(raw).trim().slice(0, 4000);
      if (v) data[key] = v;
    } else if (Array.isArray(raw)) {
      const v = raw.filter((x) => typeof x === 'string' || typeof x === 'number').slice(0, 50).map((x) => String(x).trim().slice(0, 200)).filter(Boolean);
      if (v.length) data[key] = v;
    }
  }
  return data;
}

async function notifyEmails() {
  const inbox = await Content.findOne({ key: 'inbox' }).lean();
  return String(inbox?.draft?.notifyEmails || '')
    .split(',')
    .map((s) => s.trim())
    .filter((s) => EMAIL_RE.test(s));
}

publicRouter.post(
  '/:type',
  formLimiter,
  asyncRoute(async (req, res) => {
    const { type } = req.params;
    if (!SUBMISSION_TYPES[type]) throw new HttpError(404, 'Unknown form.');

    // Honeypot: bots fill every field; real visitors never see this one
    if (req.body?.website) return res.json({ ok: true });

    const data = cleanSubmission(req.body);
    if (data.email && !EMAIL_RE.test(data.email)) throw new HttpError(400, 'Please enter a valid email address.');
    if (data.phone && !PHONE_RE.test(data.phone)) throw new HttpError(400, 'Please enter a valid phone number.');
    if (type === 'subscribers' ? !data.email : !data.email && !data.phone) {
      throw new HttpError(400, 'Please include a phone number or email so we can reach you.');
    }
    const page = typeof req.body.page === 'string' ? req.body.page.slice(0, 200) : '';

    if (type === 'subscribers') {
      data.email = data.email.toLowerCase();
      const existing = await Submission.findOne({ type, 'data.email': data.email });
      if (existing) return res.json({ ok: true });
    }

    await Submission.create({ type, data, page });
    res.json({ ok: true });

    // Email alert after responding, so the visitor never waits on it
    if (type !== 'subscribers') {
      const to = await notifyEmails();
      const who = data.name || data.email || data.phone;
      sendEmail({
        to,
        subject: `${SUBMISSION_TYPES[type].replace(/s$/, '')}: ${who}${data.service ? ` — ${data.service}` : ''}`,
        html: submissionEmail(SUBMISSION_TYPES[type].replace(/s$/, ''), data, page),
        replyTo: data.email,
      });
    }
  })
);
