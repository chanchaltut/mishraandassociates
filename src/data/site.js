// ═══════════════════════════════════════════════════════════
//  Mishra and Associates — Site settings
//  Will become the "Site Settings" document in the admin panel.
//
//  Any value wrapped in [square brackets] is a PLACEHOLDER awaiting
//  the client's input. In demo mode these are highlighted on the site.
// ═══════════════════════════════════════════════════════════

export const SITE = {
  demoMode: true, // set to false before going live — hides placeholder highlights and demo notices

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
    street: '[Office address — building, street, area]',
    city: 'Delhi',
    region: 'Delhi',
    postalCode: '[PIN code]',
    country: 'India',
    countryCode: 'IN',
    mapEmbedUrl: '', // Google Maps embed URL once address is confirmed
  },

  hours: '[Mon – Sat, 10:00 AM – 7:00 PM]',
  founded: '[Year established]',
  registration: '[Firm registration no. / GSTIN — if to be displayed]',

  social: {
    linkedin: '#',
    facebook: '#',
    instagram: '#',
    x: '#',
    youtube: '#',
  },

  // When the real logo arrives: import it and assign here, e.g.
  //   import logo from '../assets/logo.svg'  →  logo: logo
  logo: null,

  ogImage: '/og-image.jpg',
};

export const fullAddress = () => {
  const a = SITE.address;
  return [a.street, a.city, a.postalCode, a.country].filter(Boolean).join(', ');
};

export const waLink = (message = `Hello ${SITE.name}, I would like to enquire about your services.`) =>
  `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(message)}`;

export const NAV = [
  { name: 'Home', href: '/' },
  { name: 'Services', href: '/services', menu: 'services' },
  { name: 'Global Setup', href: '/company-registration', menu: 'global' },
  { name: 'Knowledge Hub', href: '/news', menu: 'knowledge' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

export const KNOWLEDGE_LINKS = [
  { name: 'News & Updates', href: '/news', icon: 'ri-newspaper-line', desc: 'Developments in tax, corporate and cross-border law' },
  { name: 'Notifications & Circulars', href: '/notifications', icon: 'ri-notification-3-line', desc: 'CBDT, CBIC, MCA, RBI, SEBI & DGFT releases' },
  { name: 'Blog & Guides', href: '/blog', icon: 'ri-quill-pen-line', desc: 'Plain-English explainers by our team' },
  { name: 'Compliance Calendar', href: '/compliance-calendar', icon: 'ri-calendar-check-line', desc: 'Upcoming statutory due dates' },
  { name: 'FAQs', href: '/faqs', icon: 'ri-question-answer-line', desc: 'Straight answers on tax, GST, ROC and global setup' },
];
