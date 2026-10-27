// Every public page, with its sitemap settings. Used by the sitemap
// (generate-seo-files.mjs) and by prerender.mjs, so the two never drift apart.
import { SERVICES } from '../src/data/services.js';
import { COUNTRIES } from '../src/data/countries.js';
import { BLOG_POSTS } from '../src/data/blog.js';
import { NEWS } from '../src/data/news.js';


/** [path, changefreq, priority, lastmod?] */
export const PAGES = [
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

/** Pages prerendered to HTML but kept out of the sitemap (they are noindex). */
export const EXTRA_PAGES = ['/privacy-policy', '/terms-conditions'];
