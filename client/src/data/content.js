// ═══════════════════════════════════════════════════════════
//  Page content blocks — hero, stats, about, team, testimonials,
//  process, FAQs. Defaults for admin → "Home page", "Team",
//  "Clients", "FAQs" and "Legal pages".
//  [Bracketed] values are placeholders: hidden on the live site.
// ═══════════════════════════════════════════════════════════

import { fromContent } from '../lib/content.js';

export const HERO_DEFAULT = {
  eyebrow: 'Tax · Compliance · Global Company Formation',
  title: 'Counsel for your business,',
  titleAccent: 'at home and abroad.',
  description:
    'From GST returns and income-tax filings in India to incorporating your company in the USA, UAE, Singapore, Hong Kong, China or the UK — one accountable team, end to end.',
  primaryCta: { label: 'Book a consultation', href: '/contact' },
  secondaryCta: { label: 'Explore services', href: '/services' },
  searchChips: ['GST registration', 'ITR filing', 'Delaware LLC', 'UAE free zone', 'Trademark'],
  // Background photo. Self-hosted in public/images so the hero never waits on a third party;
  // the dark overlay keeps text readable even if the image fails to load.
  image: {
    src: '/images/hero-1600.webp',
    alt: 'Adviser reviewing and signing client documents',
  },
  // Figures shown in the trust strip under the description.
  proof: [
    { value: '10+', label: 'Years of practice' },
    { value: '7', label: 'Jurisdictions' },
    { value: '100+', label: 'Services' },
  ],
  // Optional review rating — shown as stars only when set, e.g.
  //   { score: 4.9, count: 120, source: 'Google', href: 'https://g.page/r/...' }
  rating: null,
};

export const STATS_DEFAULT = [
  { value: '10+', label: 'Years of practice' },
  { value: '[000+]', label: 'Clients served' },
  { value: '7', label: 'Jurisdictions covered' },
  { value: '100+', label: 'Services offered' },
];

export const ABOUT_DEFAULT = {
  heading: 'A practice built on precision and accountability',
  paragraphs: [
    'Mishra and Associates advises individuals, founders and growing companies on tax, regulatory compliance and company formation. We combine the rigour of a traditional practice with the responsiveness of a modern, digital-first firm.',
    '[A short paragraph about the firm’s history, founding partner and areas of strength — to be provided by the client.]',
  ],
  highlights: [
    'Single point of contact for India and overseas entities',
    'Fixed, upfront professional fees — government fees at actuals',
    'Documents handled securely; work tracked against a compliance calendar',
    'Proper tax invoice for every engagement',
  ],
  image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=900&q=80&auto=format&fit=crop',
  founderQuote: {
    text: '[A short quote from the founder about the firm’s philosophy.]',
    name: '[Founder name]',
    role: '[Designation]',
  },
  clientTypes: [
    'Salaried professionals', 'Freelancers & consultants', 'Startups', 'Private limited companies',
    'Traders & manufacturers', 'Importers & exporters', 'NRIs', 'NGOs, trusts & societies',
  ],
};

export const TEAM_DEFAULT = [
  {
    name: '[Founder name]',
    role: '[Founder & Managing Partner]',
    qualification: '[Qualification, e.g. FCA / CS / LLB]',
    bio: '[Two or three lines about the founder’s experience, specialisations and approach.]',
    image: null,
    linkedin: '#',
  },
  {
    name: '[Partner / Associate name]',
    role: '[Designation]',
    qualification: '[Qualification]',
    bio: '[Short profile — areas handled, years of experience.]',
    image: null,
    linkedin: '#',
  },
  {
    name: '[Partner / Associate name]',
    role: '[Designation]',
    qualification: '[Qualification]',
    bio: '[Short profile — areas handled, years of experience.]',
    image: null,
    linkedin: '#',
  },
];

export const WHY_US_DEFAULT = [
  { icon: 'ri-earth-line', title: 'India and abroad, one desk', desc: 'Domestic compliance and overseas incorporations handled together — including FEMA/ODI reporting that ties them up.' },
  { icon: 'ri-calendar-check-line', title: 'Calendar-driven compliance', desc: 'Every client is mapped to a statutory calendar, so filings are prepared ahead of due dates, not on them.' },
  { icon: 'ri-price-tag-3-line', title: 'Transparent fees', desc: 'Professional fees quoted upfront. Government fees are passed through at actuals with receipts.' },
  { icon: 'ri-lock-2-line', title: 'Confidential by default', desc: 'Your financial records are handled on need-to-know basis and stored securely.' },
  { icon: 'ri-chat-check-line', title: 'Reachable advisers', desc: 'A named relationship manager on phone, email and WhatsApp — not a ticket queue.' },
  { icon: 'ri-file-text-line', title: 'Documented advice', desc: 'Positions taken in your filings are documented, so they hold up if questioned later.' },
];

export const PROCESS_STEPS_DEFAULT = [
  { title: 'Consultation', desc: 'Tell us what you need. We confirm scope, timelines and a fixed fee.' },
  { title: 'Documents', desc: 'You receive a tailored checklist and share documents securely.' },
  { title: 'Execution', desc: 'Our team prepares, reviews and files on the relevant portals.' },
  { title: 'Delivery', desc: 'You receive acknowledgements, certificates and a compliance calendar.' },
];

export const TESTIMONIALS_DEFAULT = [
  { quote: '[Client testimonial — to be provided by the firm. Two or three sentences about the experience.]', name: '[Client name]', role: '[Designation, Company]', city: '[City]' },
  { quote: '[Client testimonial — to be provided by the firm. Two or three sentences about the experience.]', name: '[Client name]', role: '[Designation, Company]', city: '[City]' },
  { quote: '[Client testimonial — to be provided by the firm. Two or three sentences about the experience.]', name: '[Client name]', role: '[Designation, Company]', city: '[City]' },
];

// ─── Our clients page ─────────────────────────────────────────
// Add each client's logo (import the file and set `logo`) once the firm
// confirms which names can be shown publicly.
export const CLIENTS_DEFAULT = Array.from({ length: 12 }, (_, i) => ({ name: `[Client ${i + 1}]`, industry: '[Industry]', logo: '' }));

export const CLIENT_INDUSTRIES_DEFAULT = [
  { icon: 'ri-store-2-line', name: 'Traders & distributors' },
  { icon: 'ri-settings-3-line', name: 'Manufacturers' },
  { icon: 'ri-rocket-2-line', name: 'Startups & tech companies' },
  { icon: 'ri-ship-line', name: 'Importers & exporters' },
  { icon: 'ri-building-line', name: 'Government contractors' },
  { icon: 'ri-restaurant-2-line', name: 'Food & hospitality' },
  { icon: 'ri-hospital-line', name: 'Healthcare & pharma' },
  { icon: 'ri-user-star-line', name: 'Professionals & NRIs' },
  { icon: 'ri-hand-heart-line', name: 'NGOs, trusts & societies' },
];

export const CASE_STUDIES_DEFAULT = [
  { client: '[Client / industry]', service: 'Company registration — UAE', challenge: '[What the client needed]', outcome: '[What we delivered and the result]' },
  { client: '[Client / industry]', service: 'GST & accounting', challenge: '[What the client needed]', outcome: '[What we delivered and the result]' },
  { client: '[Client / industry]', service: 'Trademark registration', challenge: '[What the client needed]', outcome: '[What we delivered and the result]' },
];

export const FAQS_DEFAULT = [
  {
    q: 'What services does Mishra and Associates offer?',
    a: 'We offer GST registration and returns, income tax return filing, TDS compliance, tax audits, tax litigation support, ROC/MCA compliance, accounting and bookkeeping, PF & ESIC, trademark, MSME, FSSAI and import-export registrations — and company registration in India, the USA, UAE, Singapore, Hong Kong, China and the UK.',
  },
  {
    q: 'Can you help me register a company outside India?',
    a: 'Yes. We handle company formation in the USA, UAE, Singapore, Hong Kong, China and the UK, and the India-side FEMA overseas investment (ODI) filings required when an Indian resident invests in a foreign company.',
  },
  {
    q: 'Do I need to visit your office?',
    a: 'No. Most engagements are completed entirely online — documents are shared digitally and filings are made on government portals. You are welcome to meet us at our Delhi office if you prefer.',
  },
  {
    q: 'How are your fees structured?',
    a: 'We quote a fixed professional fee upfront for each engagement. Government and statutory fees are charged at actuals and shown separately. A proper tax invoice is issued for every payment.',
  },
  {
    q: 'What documents are required for ITR filing?',
    a: 'Typically PAN, Aadhaar, Form 16 (for salaried individuals), AIS and Form 26AS, bank statements, investment and deduction proofs, home-loan interest certificate and capital-gains statements. Business owners also need their profit & loss account and balance sheet.',
  },
  {
    q: 'How can I contact Mishra and Associates?',
    a: 'Call +91 11 6926 6597, WhatsApp +91 99116 81113, email contact@mishranassociates.com, or use the enquiry form on our contact page. We respond to enquiries within one working day.',
  },
];

export const LEGAL_UPDATED_DEFAULT = 'October 2026';

export const HOME_SECTIONS_DEFAULT = {
  jurisdictionStrip: true,
  practiceAreas: true,
  globalSetup: true,
  knowledgeDesk: true,
  dueDates: true,
  aboutFirm: true,
  process: true,
  testimonials: true,
  faq: true,
  cta: true,
};

// ─── Published values (admin panel), falling back to the defaults above ───
export const HERO = fromContent('home', 'hero', HERO_DEFAULT);
export const STATS = fromContent('home', 'stats', STATS_DEFAULT);
export const ABOUT = fromContent('home', 'about', ABOUT_DEFAULT);
export const WHY_US = fromContent('home', 'whyUs', WHY_US_DEFAULT);
export const PROCESS_STEPS = fromContent('home', 'process', PROCESS_STEPS_DEFAULT);
export const TESTIMONIALS = fromContent('home', 'testimonials', TESTIMONIALS_DEFAULT);
export const HOME_SECTIONS = fromContent('home', 'sections', HOME_SECTIONS_DEFAULT);
export const TEAM = fromContent('team', 'members', TEAM_DEFAULT);
export const CLIENTS = fromContent('clients', 'clients', CLIENTS_DEFAULT);
export const CLIENT_INDUSTRIES = fromContent('clients', 'industries', CLIENT_INDUSTRIES_DEFAULT);
export const CASE_STUDIES = fromContent('clients', 'caseStudies', CASE_STUDIES_DEFAULT);
export const FAQS = fromContent('faqs', 'general', FAQS_DEFAULT);
export const LEGAL_UPDATED = fromContent('legal', 'updated', LEGAL_UPDATED_DEFAULT);
