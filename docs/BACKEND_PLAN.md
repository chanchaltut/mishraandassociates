# Backend & Admin Panel Plan — Mishra and Associates

Goal: give the owner a simple **Website Management** panel to control every piece of content on the site, plus an inbox for enquiries and subscribers. The admin UI uses the same design tokens as the public site.

---

## 1. Stack

Your proposal — **Node/Express on Render + MongoDB Atlas + Cloudinary** — is a good fit. Keep it, with these adjustments:

| Concern | Recommendation | Why |
|---|---|---|
| API hosting | Render **Starter** plan (not Free) | Free instances sleep after ~15 min idle; the first request then takes 30–60 s. That makes the admin feel broken and can drop enquiries. |
| Frontend hosting | Keep on **Vercel** (static) | Fast CDN, already configured (`vercel.json`). |
| Database | MongoDB Atlas | Free M0 tier has **no automated backups**. Add a weekly `mongodump` job (GitHub Action) or move to a paid tier at launch. |
| Images / PDFs | Cloudinary, **signed direct uploads** from the browser | Files never pass through the API, and uploads stay restricted to one folder. |
| Email | **Resend** or **Brevo** | Enquiry alerts to the owner and newsletter confirmations. Needs SPF/DKIM DNS records on the domain. |
| Mailbox | Zoho Mail (free) or Google Workspace for `contact@mishraandassociates.in` | The address is on the site but needs a real inbox. |
| SEO / AEO | Prerender public routes at build; admin "Publish" triggers a Vercel deploy hook | Google runs JavaScript, but most AI crawlers (GPTBot, PerplexityBot, ClaudeBot) don't. Prerendered HTML makes content visible to them. |

**Alternative worth considering later:** migrating the public site to Next.js gives server rendering out of the box. It isn't needed for launch if prerendering is in place.

---

## 2. How content flows

```
Admin panel ──► Express API ──► MongoDB
                    │
                    ├──► Public read API ──► website (runtime fetch, cached)
                    └──► "Publish" ──► Vercel deploy hook ──► prerendered HTML + sitemap.xml + llms.txt
```

- Every file in `src/data/` maps 1:1 to a collection or settings document below.
- A **seed script** imports `src/data/*.js` into Mongo, so on day one the admin contains exactly what the client saw in the demo.
- The site keeps `src/data/` as a fallback if the API is unreachable.

---

## 3. Data model (Mongoose collections)

| Collection | Source file today | Key fields |
|---|---|---|
| `settings` (single doc) | `data/site.js` | name, tagline, description, phone, whatsapp, email, address{}, hours, founded, registration, social{}, logo, favicon, ogImage, seo defaults, `demoMode` |
| `blocks` (keyed docs) | `data/content.js` | `key` (hero, stats, about, whyUs, process, testimonials, privacy, terms) + `data` validated per key with zod |
| `faqs` | `data/faqs.js` + `data/content.js → FAQS` | question, answer, group (`general`, `global-setup` or a service slug), order, visible — feeds `/faqs`, service pages and FAQPage schema |
| `team` | `data/content.js → TEAM` | name, role, qualification, bio, photo, linkedin, order, visible |
| `serviceCategories` | `data/services.js → PARENT_SERVICES` | slug, title, shortTitle, icon, startingPrice, badge, shortDesc, order, visible, `subcategories[]` {name, price, href, popular, order} |
| `servicePages` | `data/services.js → SERVICES` | slug, title, overview, services[], startingPrice, timeline, seo{} |
| `jurisdictions` | `data/countries.js` | slug, name, flag, headline, tagline, intro, startingPrice, facts[], entities[], why[], documents[], process[], compliance[], faqs[], comparison row, order, visible |
| `posts` | `data/blog.js` | slug, title, excerpt, category, coverImage, body (Markdown or TipTap JSON), author, status (draft/published/scheduled), publishedAt, seo{} |
| `news` | `data/news.js` | slug, title, summary, category, body, sourceUrl, status, publishedAt |
| `notifications` | `data/notifications.js` | authority, type, number, date, title, summary, pdf (Cloudinary) or sourceUrl, status |
| `dueDates` | `data/calendar.js` | overrides on top of generated dates: date, title, category, note, kind (`extension` / `custom` / `hide`) |
| `enquiries` | contact form | name, email, phone, service, message, page, status (new/contacted/closed), notes, createdAt |
| `subscribers` | newsletter forms | email, source, status, createdAt |
| `users` | — | name, email, passwordHash (bcrypt), role (`owner` / `editor`), lastLoginAt |
| `media` | — | Cloudinary publicId, url, type, alt, uploadedBy |

---

## 4. API

**Public** (no auth, cached with ETag / `Cache-Control: max-age=300`)

```
GET  /api/public/bootstrap            settings + blocks + serviceCategories + jurisdictions
GET  /api/public/service-pages/:slug
GET  /api/public/posts?category=&q=&page=      GET /api/public/posts/:slug
GET  /api/public/news?category=&page=          GET /api/public/news/:slug
GET  /api/public/notifications?authority=&q=&page=
GET  /api/public/due-dates?from=&to=
POST /api/public/enquiries            rate-limited + honeypot (+ optional Cloudflare Turnstile); saves + emails owner
POST /api/public/subscribers
```

The frontend already calls the two POST endpoints — see `src/lib/api.js`. Set `VITE_API_URL` and they go live.

**Auth**

```
POST /api/auth/login    POST /api/auth/logout    GET /api/auth/me
POST /api/auth/change-password    POST /api/auth/forgot    POST /api/auth/reset
```

JWT in an `httpOnly`, `Secure`, `SameSite=Strict` cookie. Login attempts rate-limited.

**Admin** (requires auth)

```
GET/PUT          /api/admin/settings
GET/PUT          /api/admin/blocks/:key
CRUD + reorder   /api/admin/team | services | service-pages | jurisdictions
CRUD             /api/admin/posts | news | notifications | due-dates
GET/PATCH        /api/admin/enquiries        (+ /export.csv)
GET/DELETE       /api/admin/subscribers      (+ /export.csv)
POST             /api/admin/media/sign       → Cloudinary signature for direct upload
DELETE           /api/admin/media/:id
POST             /api/admin/publish          → triggers Vercel deploy hook
GET              /api/admin/dashboard        → counts, latest enquiries
```

**Packages:** express, mongoose, zod, bcrypt, jsonwebtoken, cookie-parser, helmet, cors (allowlist the site origin), express-rate-limit, cloudinary, resend, slugify, sanitize-html, pino.

---

## 5. Admin panel (UI)

Lives at `/admin` inside the same Vite app as a lazy-loaded chunk (`noindex`, blocked in `robots.txt`), reusing the site's Tailwind tokens, fonts and components.

```
Login
Dashboard              new enquiries · subscribers · upcoming due dates · quick actions · Publish button
Website Management
  ├─ Site Settings     brand, logo/favicon, contact, address + map, hours, social links, SEO defaults, demo-mode toggle
  ├─ Homepage          hero, stats, about, why-us, process, testimonials
  ├─ FAQs              grouped questions (general, global setup, per service), reorder, hide
  ├─ Services          practice areas + sub-services (drag to reorder, price, badge, show/hide)
  ├─ Service Pages     the 10 detailed service pages
  ├─ Global Setup      7 jurisdiction pages + comparison table
  ├─ Team              people, photos, order
  └─ Legal Pages       privacy, terms
Knowledge Hub
  ├─ Blog              rich-text editor (TipTap), cover image, category, SEO fields, draft / publish / schedule
  ├─ News              same editor, lighter form
  ├─ Notifications     authority, number, date, subject, PDF upload or source link
  └─ Due Dates         add extensions / custom dates / hide a default date
Inbox
  ├─ Enquiries         status, notes, CSV export
  └─ Subscribers       CSV export
Media Library
Account                change password
```

Keep the forms simple: a handful of reusable field components (text, textarea, list editor for arrays, image upload, rich text, toggle) cover every screen.

---

## 6. Frontend changes needed

1. `src/lib/content.jsx` — `ContentProvider` loads `/api/public/bootstrap` once and falls back to `src/data/*` on failure.
2. Replace direct imports of `SITE`, `PARENT_SERVICES`, `COUNTRIES`, `HERO`, etc. with a `useContent()` hook.
3. Blog, news and notifications fetch per page, with pagination.
4. `scripts/generate-seo-files.mjs` reads from the API at build time instead of `src/data`.
5. Add prerendering for public routes (e.g. `vite-plugin-prerender` or a small Puppeteer script run after `vite build`).

---

## 7. Server folder structure

```
server/
  src/
    index.js
    config/           env, db, cloudinary
    models/           one file per collection
    routes/           public.js, auth.js, admin/*.js
    middleware/       auth.js, validate.js, rateLimit.js, errors.js
    services/         mail.js, cloudinary.js, deployHook.js
  scripts/seed.js     imports ../src/data/*.js into Mongo + creates owner user
  .env.example
```

**Environment variables**

```
MONGODB_URI=
JWT_SECRET=
CLIENT_ORIGIN=https://mishraandassociates.in
OWNER_EMAIL=
OWNER_INITIAL_PASSWORD=          # seed only, change on first login
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
RESEND_API_KEY=
ENQUIRY_NOTIFY_TO=contact@mishraandassociates.in
VERCEL_DEPLOY_HOOK_URL=
TURNSTILE_SECRET=                # optional
```

Frontend: `VITE_API_URL=https://api.mishraandassociates.in`

---

## 8. Build order (tomorrow)

1. Scaffold `server/`, connect Atlas, write models, run the seed from `src/data`.
2. Auth + owner account.
3. Public read endpoints, then enquiries/subscribers (with email alert).
4. Admin CRUD + Cloudinary signing + publish hook.
5. Admin UI: login → layout + dashboard → Website Management forms → Knowledge Hub editors → Inbox.
6. Switch the public site to `ContentProvider`.
7. Deploy: API on Render, `VITE_API_URL` on Vercel, DNS (`mishraandassociates.in` → Vercel, `api.` → Render), mailbox + Resend domain verification.

## 9. Pre-launch checklist

- [ ] `SITE.demoMode = false` (or toggle in admin)
- [ ] Final logo in `SITE.logo`; regenerate favicon and `og-image.jpg`
- [ ] All `[placeholders]` filled (see `docs/CLIENT_INPUTS.md`)
- [ ] Sample news / notifications replaced with real entries
- [ ] Google Search Console + Bing Webmaster Tools, submit `sitemap.xml`
- [ ] Google Business Profile for the Delhi office (biggest win for local search)
- [ ] Analytics (GA4 or Plausible)
- [ ] Test the enquiry form end to end (database + email)
