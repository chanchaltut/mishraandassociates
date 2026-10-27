// ═══════════════════════════════════════════════════════════
//  Mishra and Associates — Site settings and menus
//  Defaults for admin → "Site settings" and "Menus". Published
//  content from the admin panel overrides these (src/lib/content.js).
//
//  Any value wrapped in [square brackets] is a PLACEHOLDER awaiting
//  the client's input. Placeholders are never shown on the live site:
//  the element that would display one is skipped instead.
// ═══════════════════════════════════════════════════════════

import { fromContent } from '../lib/content.js';

export const SITE_DEFAULT = {
  demoMode: false, // true highlights [placeholders] and sample entries for content review

  name: 'Mishra and Associates',
  legalName: 'Mishra and Associates',
  tagline: 'Tax, Compliance & Global Company Formation',
  description:
    'Mishra and Associates is a Delhi-based tax and compliance firm offering GST, income tax, TDS, audit, ROC and accounting services in India, and company registration in India, the USA, UAE, Singapore, Hong Kong, China and the UK.',

  url: 'https://mishraandassociates.in',
  domain: 'mishraandassociates.in',

  phone: {
    display: '+91 11 6926 6597',
    tel: '+911169266597',
  },
  whatsapp: '919911681113',
  whatsappDisplay: '+91 99116 81113',
  email: 'contact@mishraandassociates.in',

  address: {
    street: 'L1A/22A, Mohan Garden, Uttam Nagar',
    city: 'New Delhi',
    region: 'Delhi',
    postalCode: '110059',
    country: 'India',
    countryCode: 'IN',
    mapUrl: 'https://maps.app.goo.gl/x2TSKaR7K1sEiTeG7',
    mapEmbedUrl: 'https://maps.google.com/maps?q=L1A%2F22A%2C%20Mohan%20Garden%2C%20Uttam%20Nagar%2C%20New%20Delhi%20110059&z=16&output=embed',
  },

  hours: '[Mon – Sat, 10:00 AM – 7:00 PM]',
  founded: '[Year established]',
  yearsOfPractice: 10,
  gstin: '07CWJPM0585R2ZN',

  // Blank links are hidden
  social: {
    linkedin: '',
    facebook: '',
    instagram: '',
    x: '',
    youtube: '',
  },

  logo: '', // uploaded from the admin panel; blank = typographic logo

  ogImage: '/og-image.jpg',

  announcement: { enabled: false, text: '', linkLabel: '', href: '', startsAt: '', endsAt: '' },
  features: { ticker: true, floatingButtons: true, incorporationPopup: true, incorporationPrice: '₹2,999' },
  footerDisclaimer:
    'Disclaimer: Information on this website is for general guidance only and does not constitute professional advice. Laws, rates and due dates change; please consult us before acting on any information. Government and statutory fees are charged at actuals.',
};

export const SITE = fromContent('settings', null, SITE_DEFAULT);

export const fullAddress = () => {
  const a = SITE.address;
  return [a.street, a.city, a.postalCode, a.country].filter(Boolean).join(', ');
};

export const waLink = (message = `Hello ${SITE.name}, I would like to enquire about your services.`) =>
  `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(message)}`;

export const NAV_DEFAULT = [
  { name: 'Services', href: '/services', menu: 'services' },
  { name: 'Global Setup', href: '/company-registration', menu: 'global' },
  { name: 'Tenders', href: '/tenders' },
  { name: 'Knowledge Hub', href: '/news', menu: 'knowledge' },
  { name: 'Clients', href: '/clients' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

export const KNOWLEDGE_LINKS_DEFAULT = [
  { name: 'News & Updates', href: '/news', icon: 'ri-newspaper-line', desc: 'Developments in tax, corporate and cross-border law' },
  { name: 'Notifications & Circulars', href: '/notifications', icon: 'ri-notification-3-line', desc: 'CBDT, CBIC, MCA, RBI, SEBI & DGFT releases' },
  { name: 'Blog & Guides', href: '/blog', icon: 'ri-quill-pen-line', desc: 'Plain-English explainers by our team' },
  { name: 'Compliance Calendar', href: '/compliance-calendar', icon: 'ri-calendar-check-line', desc: 'Upcoming statutory due dates' },
  { name: 'FAQs', href: '/faqs', icon: 'ri-question-answer-line', desc: 'Straight answers on tax, GST, ROC and global setup' },
  { name: 'Tender Notifications', href: '/tenders', icon: 'ri-auction-line', desc: 'Government & PSU tenders with daily alerts' },
  { name: 'Trademark Search', href: '/trademark-search', icon: 'ri-search-eye-line', desc: 'Check if your brand name is available' },
];

export const NAV = fromContent('navigation', 'main', NAV_DEFAULT);
export const KNOWLEDGE_LINKS = fromContent('navigation', 'knowledge', KNOWLEDGE_LINKS_DEFAULT);
