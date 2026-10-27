# Mishra and Associates — Website

Public website and admin panel for Mishra and Associates (mishraandassociates.in): tax, compliance and global company formation.

## Stack
- **Website:** React 18 · Vite · Tailwind CSS · React Router · react-helmet-async, hosted on Vercel
- **Admin panel:** `/admin`, part of the same app, loaded only when opened
- **API:** Node · Express · MongoDB (Atlas), hosted on Render (`server/`)
- **Uploads:** Cloudinary · **Email alerts:** Resend

Deployment: see **[docs/SETUP_GUIDE.md](docs/SETUP_GUIDE.md)**. Using the admin panel: see **[docs/ADMIN_GUIDE.md](docs/ADMIN_GUIDE.md)**.

## Scripts
```bash
npm install && npm install --prefix server
npm run dev       # website on :5173 (built-in content); /api is proxied to :4000
npm run server    # API on :4000 — needs server/.env (copy server/.env.example)
npm run build     # pulls published content (CONTENT_API_URL), regenerates sitemap.xml + llms.txt, builds dist/
npm run preview   # serve the production build
```

## How content works
1. Editors change content in `/admin` and press **Publish**.
2. The API stores a versioned snapshot and calls the Vercel deploy hook.
3. The build (`scripts/fetch-snapshot.mjs`) downloads the snapshot, validates it and bundles it into the site. Visitors never wait for the API.
4. If the API is unreachable or the content is invalid, the build stops and the previous deployment stays live.

On the website, every value is merged over the defaults in `src/data/` field by field (`src/lib/content.js`). Missing or broken fields fall back to the defaults. Each page section is wrapped in an error boundary.

## Where things live
- `shared/schema.js` — the content model. It defines every editable field and drives the admin forms and the validation on the server and at build time.
- `src/data/` — built-in content and defaults; each export reads published content first.
- `src/admin/` — admin panel (forms are generated from the schema).
- `server/src/` — API: auth, content and publishing, inbox, media, users.
- `src/index.css` — colour tokens (`:root`).

## Placeholders
Any string wrapped in `[square brackets]` is a placeholder. It is hidden on the live site, and the element that would show it is skipped. Turning on "Review mode" in Site settings highlights placeholders instead.
