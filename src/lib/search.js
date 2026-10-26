import { PARENT_SERVICES, SERVICES } from '../data/services';
import { COUNTRIES } from '../data/countries';
import { BLOG_POSTS } from '../data/blog';
import { NEWS } from '../data/news';
import { NOTIFICATIONS, authorityOf } from '../data/notifications';
import { FAQ_GROUPS } from '../data/faqs';

const categoryHref = (category) => `/services?category=${encodeURIComponent(category)}`;

let index;

export function getSearchIndex() {
  if (index) return index;
  index = [
    ...PARENT_SERVICES.flatMap((p) => [
      { kind: 'Service', title: p.title, meta: p.shortDesc, href: categoryHref(p.category), icon: p.icon },
      ...p.subcategories.map((s) => ({
        kind: 'Service',
        title: s.name,
        meta: p.title,
        href: s.href || categoryHref(p.category),
        icon: p.icon,
      })),
    ]),
    ...SERVICES.map((s) => ({ kind: 'Service', title: s.title, meta: s.shortDesc, href: `/services/${s.slug}`, icon: s.icon })),
    ...COUNTRIES.map((c) => ({ kind: 'Global Setup', title: c.headline, meta: c.tagline, href: `/company-registration/${c.slug}`, flag: c.flag })),
    ...BLOG_POSTS.map((p) => ({ kind: 'Blog', title: p.title, meta: p.excerpt, href: `/blog/${p.slug}`, icon: 'ri-quill-pen-line' })),
    ...NEWS.map((n) => ({ kind: 'News', title: n.title, meta: n.summary, href: `/news/${n.slug}`, icon: 'ri-newspaper-line' })),
    ...NOTIFICATIONS.map((n) => ({
      kind: 'Notification',
      title: n.title,
      meta: `${authorityOf(n.authority)?.name} · ${n.number}`,
      href: `/notifications?authority=${n.authority}`,
      icon: 'ri-notification-3-line',
    })),
    ...FAQ_GROUPS.flatMap((g) => g.items.map((f) => ({ kind: 'FAQ', title: f.q, meta: g.title, href: `/faqs#${g.id}`, icon: 'ri-question-answer-line' }))),
    { kind: 'Page', title: 'Compliance calendar — upcoming due dates', meta: 'GST, TDS, ITR, ROC and payroll deadlines', href: '/compliance-calendar', icon: 'ri-calendar-check-line' },
    { kind: 'Page', title: 'Contact us', meta: 'Phone, email and enquiry form', href: '/contact', icon: 'ri-phone-line' },
    { kind: 'Page', title: 'About the firm', meta: 'Our practice, people and approach', href: '/about', icon: 'ri-building-line' },
  ];
  return index;
}

export function searchSite(query, limit = 12) {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const terms = q.split(/\s+/);
  return getSearchIndex()
    .map((item) => {
      const title = item.title.toLowerCase();
      const hay = `${title} ${(item.meta || '').toLowerCase()} ${item.kind.toLowerCase()}`;
      if (!terms.every((t) => hay.includes(t))) return null;
      const score = (title.startsWith(q) ? 3 : 0) + (title.includes(q) ? 2 : 0) + (item.kind === 'Service' || item.kind === 'Global Setup' ? 1 : 0);
      return { ...item, score };
    })
    .filter(Boolean)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}
