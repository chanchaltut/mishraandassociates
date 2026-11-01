// Generates public/sitemap.xml, public/robots.txt and public/llms.txt from the site data,
// using the website address from Site settings.
// Runs automatically before every build (see "prebuild" in package.json).
import fs from 'node:fs';
import { SITE } from '../src/data/site.js';
import { PARENT_SERVICES, SERVICES } from '../src/data/services.js';
import { COUNTRIES } from '../src/data/countries.js';
import { BLOG_POSTS } from '../src/data/blog.js';
import { PAGES } from './routes.mjs';
import { pageOverride } from '../src/data/pages.js';
import { isPlaceholder } from '../src/lib/format.js';

const today = new Date().toISOString().slice(0, 10);
const url = (path) => `${SITE.url}${path}`;

// Pages hidden from search in admin → "Pages & SEO" stay out of the sitemap too
const pages = PAGES.filter(([p]) => !pageOverride(p)?.noindex);

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map(([p, freq, pri, mod]) => `  <url><loc>${url(p)}</loc><lastmod>${mod || today}</lastmod><changefreq>${freq}</changefreq><priority>${pri}</priority></url>`)
  .join('\n')}
</urlset>
`;
fs.writeFileSync(new URL('../public/sitemap.xml', import.meta.url), sitemap);

// Firm facts for AI assistants; values still awaiting the client's input are left out
const real = (v) => v !== undefined && v !== null && v !== '' && !isPlaceholder(String(v));
const a = SITE.address || {};
const facts = [
  real(a.street) && `- Address: ${[a.street, a.city, a.postalCode, a.country].filter(real).join(', ')}`,
  real(SITE.whatsappDisplay) && `- WhatsApp: ${SITE.whatsappDisplay}`,
  real(SITE.hours) && `- Office hours: ${SITE.hours}`,
  real(SITE.founded) && `- Established: ${SITE.founded}`,
  real(SITE.yearsOfPractice) && `- Years of practice: ${SITE.yearsOfPractice}+`,
  real(SITE.gstin) && `- GSTIN: ${SITE.gstin}`,
  ...Object.values(SITE.social || {}).filter(real).map((u) => `- Profile: ${u}`),
].filter(Boolean).join('\n');

const llms = `# ${SITE.name}

> ${SITE.description}

- Website: ${SITE.url}
- Phone: ${SITE.phone.display}
- Email: ${SITE.email}
- Location: ${SITE.address.city}, ${SITE.address.country} (services delivered online across India and internationally)
${facts}

## Practice areas
${PARENT_SERVICES.map((p) => `- [${p.title}](${url(`/services?category=${encodeURIComponent(p.category)}`)}): ${p.shortDesc}`).join('\n')}

## Company registration by country
${COUNTRIES.map((c) => `- [${c.headline}](${url(`/company-registration/${c.slug}`)}): ${c.tagline}`).join('\n')}

## Service guides
${SERVICES.map((s) => `- [${s.title}](${url(`/services/${s.slug}`)}): ${s.shortDesc}`).join('\n')}

## Articles
${BLOG_POSTS.map((p) => `- [${p.title}](${url(`/blog/${p.slug}`)}): ${p.excerpt}`).join('\n')}

## Knowledge hub
- [News & updates](${url('/news')})
- [Notifications & circulars](${url('/notifications')}): CBDT, CBIC, MCA, RBI, SEBI, DGFT
- [Compliance calendar](${url('/compliance-calendar')}): upcoming statutory due dates in India
- [Tender notifications](${url('/tenders')}): government, PSU and GeM tenders across India, with an annual alerts subscription
- [Trademark search](${url('/trademark-search')}): free brand-name availability report across all 45 classes
- [Frequently asked questions](${url('/faqs')}): income tax, GST, TDS, audit, ROC and global company registration

## Contact
- [Contact page](${url('/contact')})
`;
fs.writeFileSync(new URL('../public/llms.txt', import.meta.url), llms);
const robotsFile = new URL('../public/robots.txt', import.meta.url);
const robots = fs.readFileSync(robotsFile, 'utf8').replace(/^Sitemap: .*$/m, `Sitemap: ${url('/sitemap.xml')}`);
fs.writeFileSync(robotsFile, robots);

console.log(`sitemap.xml: ${pages.length} URLs · robots.txt · llms.txt written for ${SITE.url}`);
