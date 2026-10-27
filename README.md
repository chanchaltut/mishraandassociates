# Mishra and Associates — Website

Public website and admin panel for Mishra and Associates (mishraandassociates.in): tax, compliance and global company formation.

## Project structure
```
client/    Website + admin panel (React, Vite, Tailwind) — deployed to Vercel (Root Directory: client)
server/    Website-management API (Node, Express, MongoDB) — deployed to Render (Root Directory: server)
shared/    Content model used by both: admin forms, API validation and build-time validation
docs/      Setup guide, admin guide, plans and client inputs
```

## Stack
- **Website:** React 18 · Vite · Tailwind CSS · React Router · react-helmet-async, hosted on Vercel
- **Admin panel:** `/admin`, part of the client app, loaded only when opened
- **API:** Node · Express · MongoDB (Atlas), hosted on Render
- **Uploads:** Cloudinary · **Email alerts:** Resend

Deployment: see **[docs/SETUP_GUIDE.md](docs/SETUP_GUIDE.md)**. Using the admin panel: see **[docs/ADMIN_GUIDE.md](docs/ADMIN_GUIDE.md)**.

## Scripts
Run from the repository root:
```bash
npm run install:all   # installs client/ and server/ dependencies
npm run dev           # website on :5173 (built-in content); /api is proxied to :4000
npm run dev:server    # API on :4000 — needs server/.env (copy server/.env.example)
npm run build         # client production build (see below)
npm run lint
```
Inside `client/`: `npm run build` pulls published content (`CONTENT_API_URL`), regenerates `sitemap.xml` and `llms.txt`, and builds `client/dist/`. `npm run preview` serves that build.

## How content works
1. Editors change content in `/admin` and press **Publish**.
2. The API stores a versioned snapshot and calls the Vercel deploy hook.
3. The build (`client/scripts/fetch-snapshot.mjs`) downloads the snapshot, validates it and bundles it into the site. Visitors never wait for the API.
4. If the API is unreachable or the content is invalid, the build stops and the previous deployment stays live.

On the website, every value is merged over the defaults in `client/src/data/` field by field (`client/src/lib/content.js`). Missing or broken fields fall back to the defaults. Each page section is wrapped in an error boundary.

On its first start, the API imports those same defaults (`client/src/data/defaults.js`) into the database.

## Where things live
- `shared/schema.js` — the content model. It defines every editable field and drives the admin forms and the validation on the server and at build time.
- `client/src/data/` — built-in content and defaults; each export reads published content first.
- `client/src/admin/` — admin panel (forms are generated from the schema).
- `client/src/index.css` — colour tokens (`:root`).
- `server/src/` — API: auth, content and publishing, inbox, media, users.

## Placeholders
Any string wrapped in `[square brackets]` is a placeholder. It is hidden on the live site, and the element that would show it is skipped. Turning on "Review mode" in Site settings highlights placeholders instead.
