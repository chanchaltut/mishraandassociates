// Generates public/sitemap.xml and public/llms.txt from the site data.
// Runs automatically before every build (see "prebuild" in package.json).
import fs from 'node:fs';
import { SITE } from '../src/data/site.js';
import { PARENT_SERVICES, SERVICES } from '../src/data/services.js';
import { COUNTRIES } from '../src/data/countries.js';
import { BLOG_POSTS } from '../src/data/blog.js';
import { NEWS } from '../src/data/news.js';

const today = new Date().toISOString().slice(0, 10);
const url = (path) => `${SITE.url}${path}`;

const pages = [
  ['/', 'weekly', '1.0'],
  ['/services', 'weekly', '0.9'],
  ['/company-registration', 'monthly', '0.9'],
  ...COUNTRIES.map((c) => [`/company-registration/${c.slug}`, 'monthly', '0.9']),
  ...SERVICES.map((s) => [`/services/${s.slug}`, 'monthly', '0.8']),
  ['/news', 'daily', '0.8'],
  ['/notifications', 'daily', '0.8'],
  ['/compliance-calendar', 'weekly', '0.7'],
  ['/tenders', 'daily', '0.8'],
  ['/trademark-search', 'monthly', '0.8'],
  ['/faqs', 'monthly', '0.7'],
  ['/blog', 'weekly', '0.7'],
  ...BLOG_POSTS.map((p) => [`/blog/${p.slug}`, 'monthly', '0.6', p.date]),
  ...NEWS.map((n) => [`/news/${n.slug}`, 'monthly', '0.5', n.date]),
  ['/about', 'monthly', '0.6'],
  ['/clients', 'monthly', '0.6'],
  ['/contact', 'yearly', '0.6'],
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map(([p, freq, pri, mod]) => `  <url><loc>${url(p)}</loc><lastmod>${mod || today}</lastmod><changefreq>${freq}</changefreq><priority>${pri}</priority></url>`)
  .join('\n')}
</urlset>
`;
fs.writeFileSync(new URL('../public/sitemap.xml', import.meta.url), sitemap);

const llms = `# ${SITE.name}

> ${SITE.description}

- Website: ${SITE.url}
- Phone: ${SITE.phone.display}
- Email: ${SITE.email}
- Location: ${SITE.address.city}, ${SITE.address.country} (services delivered online across India and internationally)

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
console.log(`sitemap.xml: ${pages.length} URLs · llms.txt written`);
