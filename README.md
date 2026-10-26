# Mishra and Associates — Website

Public website for Mishra and Associates (mishraandassociates.in): tax, compliance and global company formation.

## Stack
React 18 · Vite · Tailwind CSS · React Router · react-helmet-async

## Scripts
```bash
npm install
npm run dev       # local development
npm run build     # regenerates sitemap.xml + llms.txt, then builds to dist/
npm run preview   # serve the production build
```

## Where things live
- `src/data/` — all site content (settings, services, jurisdictions, blog, news, notifications, calendar). Each file maps to a future admin-panel collection.
- `src/data/site.js` — contact details, address, social links, logo, and `demoMode`.
- `src/index.css` — colour tokens (`:root`). Change these to re-theme the site.
- `src/components/ui/Logo.jsx` — placeholder logo; set `SITE.logo` once the final artwork is available.
- `scripts/generate-seo-files.mjs` — builds `public/sitemap.xml` and `public/llms.txt` from the data.

## Placeholders
Any string wrapped in `[square brackets]` is a placeholder. With `SITE.demoMode = true` these are highlighted on the site. See `docs/CLIENT_INPUTS.md` for the list of details needed from the client.

## Backend
Form submissions use `VITE_API_URL` (see `.env.example`). Until it is set, forms succeed in demo mode without sending anything. See `docs/BACKEND_PLAN.md`.
