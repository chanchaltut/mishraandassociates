# Website Management Plan — Mishra and Associates

> **Status (Oct 2026): built.** Deployment steps are in `docs/SETUP_GUIDE.md`; the client guide is `docs/ADMIN_GUIDE.md`.
> Differences from this plan:
> - Content is stored as one versioned document per section (driven by `shared/schema.js`), instead of one collection per type.
> - `/api` is forwarded through Vercel, so the admin session cookie is first-party.
> - Prerendering and in-build browser smoke tests are not included yet. The build validates the content, every page section has an error boundary, and every field falls back to the built-in default.

**Goal:** the firm can change everything on the website from an admin panel, without a developer.

The panel must not slow the site down. A broken save or an API outage must never break the site.

---

## 0. Principles

1. **Visitors never wait on the database.** Published content is built into the site at deploy time: the HTML is pre-rendered and the data is bundled. The hero, menus, services, prices and contact details appear on first paint, with no loading spinners or empty boxes.
2. **Four layers of fallback.**
   1. Content built into the current deploy.
   2. The last good published snapshot, stored on a CDN.
   3. The defaults in `src/data/` in the repo.
   4. In the browser:
      - A section with missing data hides itself rather than crashing.
      - A broken image falls back to a solid colour.
      - Each section is wrapped in an error boundary.
3. **A bad save cannot reach visitors.**
   - Every save is checked against a schema.
   - Every publish is checked again as a whole snapshot.
   - The build runs smoke tests before going live.
   - If any check fails, Vercel keeps serving the previous deployment.
4. **Drafts → preview → publish.** Editors see exactly what will go live before it does. Every publish is versioned and can be rolled back in one click.
5. **Structured fields, not raw HTML.** Editors fill forms with clear labels, character counters and image croppers. They never edit code, so they cannot break the layout.
6. **One schema per content type** (zod, in `shared/schemas`). The admin form, the API validator and the site's fallback defaults all use it, so they cannot disagree.

---

## 1. Architecture

```
                    ┌──────────── Admin panel (/admin, lazy chunk, noindex) ────────────┐
                    │  forms · drafts · preview · publish · inbox · media · users       │
                    └──────────────────────────────┬────────────────────────────────────┘
                                                   │ HTTPS + httpOnly cookie
                                    ┌──────────────▼──────────────┐
                                    │  Express API (Render)       │──► MongoDB Atlas (drafts, published, versions, inbox)
                                    │  zod validation · auth      │──► Cloudinary (images, PDFs — signed direct upload)
                                    │  audit log · rate limits    │──► Resend (enquiry alerts, auto-replies)
                                    └──────┬───────────────┬──────┘
                                           │ Publish       │ public forms (POST)
                     snapshot.json ◄───────┘               │
                     (versioned, also copied to CDN)       │
                                           │               │
                                           ▼               │
                          Vercel deploy hook → build:      │
                          fetch snapshot → validate →      │
                          bundle data → prerender all      │
                          routes → sitemap/llms.txt →      │
                          smoke tests → go live            │
                                           │               │
                                           ▼               │
                          Public site (static, CDN) ───────┘
```

### Why build-time, not runtime fetching

| | Runtime fetch (rejected) | Build-time snapshot (chosen) |
|---|---|---|
| First paint | Waits for the API (and a 30–60 s Render cold start) | Instant, served from the CDN |
| API down | Blank or broken sections | Site unaffected |
| SEO / AI crawlers | Content invisible to crawlers that don't run JS | Full HTML on every route |
| Cost of a change | None | 1–2 min rebuild after "Publish" |

The 1–2 minute wait is acceptable. The admin shows a live status after each publish: *Publishing… → Live ✓*, or *Failed — previous version still live*, with the reason.

### What stays dynamic (runtime API calls)

Only things that genuinely need it, and each has a fallback:

| Feature | Runtime call | Fallback if the API fails |
|---|---|---|
| Enquiry, newsletter, tender-subscription, trademark-report forms | `POST` | Message showing phone, WhatsApp and email, with the typed message kept so it can be sent by WhatsApp in one tap |
| Archive pages beyond the latest N items (notifications, news, tenders) | `GET` paginated | The latest N items bundled in the build are always shown |
| Admin "Preview" | `GET` drafts | — (admin only) |

### Bundle size control

Only the latest items are bundled: 30 notifications, 30 news items, 50 tenders and every blog post (they are few). Older items load on demand from the API. This keeps the JS small however much content builds up.

---

## 2. Frontend refactor (minimal and safe)

Components keep importing from `src/data/*`. Only the inside of those modules changes:

```js
// src/data/site.js
import snapshot from '../generated/snapshot.json';   // written by the build; committed default = current data
import { siteSchema } from '../../shared/schemas';
export const SITE = withDefaults(siteSchema, snapshot.settings, DEFAULT_SITE);
```

- **`scripts/fetch-snapshot.mjs` (prebuild).** Tries, in order: API → CDN copy of the last good snapshot → the committed `src/generated/snapshot.json`. Each source is validated, and the first valid one wins. It logs which source was used, and the build never fails just because the API is down.
- **`withDefaults`.** Field-level merge: a missing or invalid field falls back to its default; the page never throws.
- **Prerendering.** After `vite build`, every route in the sitemap is rendered to static HTML with Puppeteer and hydrated on load.
- **Section guards** (already started in this commit):
  - `shown()` and `ready()` in `components/ui/Ph.jsx` skip unfilled content.
  - The hero image hides itself on error and sits on a dark base colour.
  - Next: add a per-section `<SafeSection>` error boundary that renders nothing if its children throw.
- **Smoke tests in the build** (Playwright, about 30 s). Every route must:
  - return 200
  - contain an `<h1>`
  - contain no `[placeholder]` text
  - log no console errors

  The home page must also show the phone number and the hero. If any check fails, the deploy is aborted and the previous version stays live.

---

## 3. What the admin can change — full inventory

Every item below is a form in the panel. Items marked ★ are new (not on the site yet) but are commonly needed, so the firm never has to ask.

### 3.1 Site settings
- Firm name, legal name, tagline, meta description
- Logo (light and dark), favicon (generated from one upload), default share image
- Phones (display and dial format generated from one field), WhatsApp number, default WhatsApp message, emails
- Address fields, **Google Maps link**, map embed (generated from the address), office hours
- **GSTIN**, ICAI firm registration no. (optional), **year established** → "years of practice" calculated automatically so it never goes stale
- Social links. A blank link hides that icon, so there are no dead `#` links.
- Footer disclaimer text, copyright line
- ★ Analytics and verification IDs (GA4, Google Search Console, Bing, Meta pixel), entered as IDs only, never raw scripts
- ★ Maintenance banner (on/off, message)

### 3.2 Header, footer and global UI
- Main navigation: rename, reorder, show/hide, and edit the mega-menu descriptions
- Top "Latest updates" ticker: on/off, sources (notifications, news, custom items)
- ★ **Announcement bar**, e.g. "ITR due date extended to 15 Dec". Includes text, link, colour, and start/end dates so it switches on and off automatically.
- Floating call/WhatsApp buttons: on/off
- Incorporation popup: on/off, delay, pages to skip, heading, text, entity options
- Footer columns: which links appear
- Newsletter band heading and text

### 3.3 Home page
- **Hero:**
  - eyebrow, title, accent words, description
  - both buttons (text and link)
  - background image, with a focal-point picker so the subject stays in frame on phones
  - proof figures (10+ / 7 / 100+)
  - optional star rating (score, count, source, link)
  - GSTIN line on/off
  - search suggestion chips
- **Sections:** reorder and show/hide all 10 home sections, and edit each section's heading and intro
- Stats, "Why us", process steps, testimonials
- About-the-firm block: photo, founder quote, paragraph

### 3.4 Services and pricing
- Practice areas: title, icon picker, badge, description, order, show/hide
- Sub-services:
  - name, link, "Popular" flag, order, show/hide
  - **price, with a per-item and per-category "Hide price" toggle** (as just done for ROC)
  - a global "Show prices on site" switch
- 10+ detailed service pages: overview, what's included, timeline, fee text, FAQs, SEO
- ★ Add a new service page from a template; its URL is created automatically

### 3.5 Global setup
- Each jurisdiction: headline, intro, starting fee, quick facts, entity types, documents, process, compliance, FAQs, order, show/hide
- Comparison table rows
- ★ Add a new country

### 3.6 Knowledge hub
- **Blog:**
  - rich-text editor (TipTap) with headings, lists, tables, images and callouts
  - cover image, category, author, reading time (automatic)
  - draft / scheduled / published
  - SEO fields
- **News:** same editor, simpler form, plus a source link
- **Notifications:** authority, type, number, date, title, summary, PDF upload or source link
  - ★ Bulk import from CSV
- **Compliance calendar:** the default dates stay generated; the admin can add extensions, add custom dates or hide a date
- **Tenders:** live tenders, results, sectors, states, subscription plan price and period
  - ★ CSV / Excel bulk upload
  - Tenders expire automatically after their due date
- **Trademark search:** classes text, recent-filings list (or turn the section off), report-request form options
- FAQs: grouped (general, global setup, per service, tenders, trademark), reorder, show/hide

### 3.7 Firm pages
- About: story paragraphs, highlights, "who we work with" chips
- **Team:** name, role, qualifications, bio, photo (cropped to 4:3), LinkedIn, order, show/hide
- **Clients:** logos (with a "permission received" checkbox; a logo can't go live without it), industries, case studies
- Legal pages (privacy, terms) in the rich-text editor, with "last updated" set automatically

### 3.8 Pages and SEO
- For every route: page title, meta description (with length counter and Google preview), share image, noindex toggle
- Hero heading and intro of every inner page (Services, Contact, Tenders, and the rest)
- ★ **Redirects manager:**
  - changing a slug creates a 301 redirect automatically, so old links never 404
  - redirects can also be added by hand
- Sitemap, `llms.txt` and `robots.txt` are generated on every publish (no manual step)

### 3.9 Inbox (forms)
- Enquiries (contact form, incorporation popup):
  - status (new / contacted / converted / closed), assignee, internal notes
  - one-tap call / WhatsApp / email links
  - CSV export
- Newsletter subscribers: export, unsubscribe
- Tender-alert subscriptions: payment status, plan expiry date, renewal reminder
- Trademark report requests: status, report PDF upload
- ★ **Form settings:** which email(s) get each form's alerts, the auto-reply text sent to the visitor, the "thank you" message
- Spam protection: honeypot field, rate limit, Cloudflare Turnstile (invisible)

### 3.10 Media library
- Upload images and PDFs directly to Cloudinary
- Automatic WebP/AVIF, responsive sizes, and compression of oversize uploads
- Alt text required for images
- "Used on" list, so an image in use can't be deleted by mistake

### 3.11 Users, safety and history
- Roles:
  - **Owner:** everything, including users and settings
  - **Editor:** content and publish
  - **Contributor:** drafts only, someone else publishes
- **Version history** on every document, with compare and restore
- **Publish history** with one-click rollback of the whole site
- **Audit log** (who changed what, when)
- Trash: deleted items kept for 30 days
- Unsaved-changes warning
- **Edit locking:** if two people edit the same item, the second save is refused with "someone else changed this — reload". Nothing is silently overwritten.
- Optional 2FA (authenticator app) for the owner
- Password reset by email
- Session expiry

---

## 4. Data model (MongoDB)

Every content document carries `{ status: 'draft'|'published', version, updatedBy, updatedAt, deletedAt }`, plus a `versions` collection with full prior copies.

| Collection | Replaces | Notes |
|---|---|---|
| `settings` (1 doc) | `site.js` | includes nav, ticker, popup, floating actions, form routing |
| `pages` | inline page heroes + SEO | keyed by route |
| `blocks` | `content.js` | hero, stats, about, whyUs, process, home section order |
| `announcements` | — | scheduled banners |
| `serviceCategories` | `PARENT_SERVICES` | embedded sub-services with `price`, `hidePrice` |
| `servicePages` | `SERVICES` | |
| `jurisdictions` + `comparison` | `countries.js` | |
| `faqs` | `faqs.js` + `FAQS` | `group`, `order` |
| `team`, `clients`, `caseStudies`, `testimonials` | `content.js` | `visible`, `order`, `permission` |
| `posts`, `news`, `notifications` | `blog.js`, `news.js`, `notifications.js` | `publishedAt`, scheduled publish |
| `dueDateOverrides` | `calendar.js` | `kind: extension / custom / hide` |
| `tenders`, `tenderResults`, `tenderPlan` | `tenders.js` | `expiresAt` index |
| `trademarkSettings`, `recentFilings` | `trademarks.js` | |
| `redirects` | — | from, to, code |
| `media` | — | Cloudinary id, alt, usage refs |
| `enquiries`, `subscribers`, `tenderSubscriptions`, `trademarkRequests` | form POSTs | status, notes, assignee |
| `users`, `auditLog`, `publishes` | — | `publishes` stores each snapshot + build status |

A **seed script** imports today's `src/data/*.js`, so on day one the admin shows exactly what is live.

---

## 5. API

**Public** (no auth; rate-limited; CORS limited to the site's domain)
```
GET  /api/public/snapshot                 latest published snapshot (used by the build)
GET  /api/public/{notifications|news|tenders}?page=&q=&filters   archive pages beyond bundled items
POST /api/public/{enquiries|subscribers|tender-subscriptions|trademark-searches}
```
`src/lib/api.js` already posts to these four paths.

**Auth:** login, logout, me, change-password, forgot, reset, 2FA setup/verify. Uses a JWT in an `httpOnly; Secure; SameSite=Strict` cookie, plus a CSRF token on writes.

**Admin**
- CRUD, reorder and restore for each collection
- `GET /preview-snapshot` (drafts merged in)
- `POST /publish` → validate the full snapshot → store it → copy it to the CDN → call the Vercel deploy hook → poll the deployment status
- `POST /rollback/:publishId`
- `POST /media/sign`
- Inbox endpoints, plus CSV export
- `GET /dashboard`

**Packages:** express, mongoose, zod, bcrypt, jsonwebtoken, cookie-parser, helmet, cors, express-rate-limit, cloudinary, resend, sanitize-html (for rich text), otplib (2FA), pino.

---

## 6. Admin panel UI

`/admin` lives in the same Vite app as a separate lazy chunk, so visitors never download it. It reuses the site's tokens and fonts, and works on phones (the owner will often edit from a phone).

```
Dashboard        new enquiries · subscriptions due · upcoming due dates · last publish status · [Publish]
Website          Settings · Header & Footer · Announcements · Home page · Pages & SEO · Redirects
Services         Practice areas & prices · Service pages · Global setup
Knowledge Hub    Blog · News · Notifications · Due dates · Tenders · Trademark · FAQs
Firm             About · Team · Clients & case studies · Testimonials · Legal pages
Inbox            Enquiries · Subscribers · Tender subscriptions · Trademark requests · Form settings
Media
Account          Profile · Password · 2FA · Users (owner) · Audit log · Publish history
```

**Shared form components** (built once, used on every screen):
- text (with counter)
- textarea
- rich text
- image (crop + focal point)
- file
- toggle
- select
- icon picker
- price (with "hide" checkbox)
- date / date range
- list editor (add / reorder / remove rows)
- slug (auto + editable, warns on change)
- SEO panel with Google preview

**Every screen has:** Save draft · Preview (opens the real site with drafts) · Publish · History.

---

## 7. Security and reliability checklist

- [ ] Passwords hashed with bcrypt; 5 failed logins → 15-minute lockout
- [ ] All input validated with zod; rich text sanitised; uploads go only to a signed Cloudinary folder, with type and size limits
- [ ] helmet, strict CORS, CSRF token, rate limits on every public POST
- [ ] Render **Starter** plan (no cold starts) with a health check
- [ ] Atlas daily backups (paid tier), or a GitHub Action running a nightly `mongodump` to private storage
- [ ] Error alerts by email when a publish or build fails
- [ ] Uptime monitor on the site and the API (e.g. UptimeRobot, free)

---

## 8. Build order

| Phase | Work | Result |
|---|---|---|
| 1 | Shared zod schemas; `snapshot.json` generated from current `src/data`; `withDefaults`; `<SafeSection>`; prerendering; smoke tests | Site no longer depends on hand-edited JS; safe to accept admin data |
| 2 | API scaffold, models, seed, auth, users, audit log | Admin login works |
| 3 | Public form endpoints + email alerts + auto-replies; set `VITE_API_URL` | **Enquiries actually delivered** (today they are not stored anywhere, see below) |
| 4 | Admin shell, dashboard, shared field components, media library | |
| 5 | Settings, header/footer, home page, services & prices, pages & SEO | Most-requested changes self-serve |
| 6 | Publish pipeline: snapshot → CDN → deploy hook → status → rollback | End-to-end publishing |
| 7 | Knowledge hub editors, tenders/notifications CSV import, archives API | |
| 8 | Firm pages, inbox screens, redirects, announcements, version history UI | |
| 9 | Deploy: Render, Atlas, Cloudinary, Resend domain (SPF/DKIM), DNS for `api.` subdomain, monitoring | Live |

---

## 9. Forms

Forms report success only after the API confirms the save. If it fails, the contact form offers to send the same message on WhatsApp in one tap.

---

## 10. Pre-launch checklist

- [x] Demo preview bar removed; placeholders hidden on the live site
- [x] GSTIN, 10+ years, maps link, ROC prices removed
- [ ] Final logo → favicon and `og-image.jpg` regenerated
- [ ] Remaining inputs in `docs/CLIENT_INPUTS.md`
- [ ] Sample news / notifications / tenders replaced with real entries
- [ ] Google Search Console + Bing Webmaster Tools; submit `sitemap.xml`
- [ ] Google Business Profile for the office (use the same maps pin)
- [ ] Analytics
- [ ] Every form tested end to end (database + email)
