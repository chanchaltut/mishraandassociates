// ═══════════════════════════════════════════════════════════
//  Page content blocks — hero, stats, about, team, testimonials,
//  process, FAQs. Admin section: "Website Management → Content".
//  [Bracketed] values are placeholders awaiting the client.
// ═══════════════════════════════════════════════════════════

export const HERO = {
  eyebrow: 'Tax · Compliance · Global Company Formation',
  title: 'Counsel for your business,',
  titleAccent: 'at home and abroad.',
  description:
    'From GST returns and income-tax filings in India to incorporating your company in the USA, UAE, Singapore, Hong Kong, China or the UK — one accountable team, end to end.',
  primaryCta: { label: 'Book a consultation', href: '/contact' },
  secondaryCta: { label: 'Explore services', href: '/services' },
  searchChips: ['GST registration', 'ITR filing', 'Delaware LLC', 'UAE free zone', 'Trademark'],
};

export const STATS = [
  { value: '[00]+', label: 'Years of practice' },
  { value: '[000]+', label: 'Clients served' },
  { value: '7', label: 'Jurisdictions covered' },
  { value: '100+', label: 'Services offered' },
];

export const ABOUT = {
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
  clientTypes: [
    'Salaried professionals', 'Freelancers & consultants', 'Startups', 'Private limited companies',
    'Traders & manufacturers', 'Importers & exporters', 'NRIs', 'NGOs, trusts & societies',
  ],
};

export const TEAM = [
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

export const WHY_US = [
  { icon: 'ri-earth-line', title: 'India and abroad, one desk', desc: 'Domestic compliance and overseas incorporations handled together — including FEMA/ODI reporting that ties them up.' },
  { icon: 'ri-calendar-check-line', title: 'Calendar-driven compliance', desc: 'Every client is mapped to a statutory calendar, so filings are prepared ahead of due dates, not on them.' },
  { icon: 'ri-price-tag-3-line', title: 'Transparent fees', desc: 'Professional fees quoted upfront. Government fees are passed through at actuals with receipts.' },
  { icon: 'ri-lock-2-line', title: 'Confidential by default', desc: 'Your financial records are handled on need-to-know basis and stored securely.' },
  { icon: 'ri-chat-check-line', title: 'Reachable advisers', desc: 'A named relationship manager on phone, email and WhatsApp — not a ticket queue.' },
  { icon: 'ri-file-text-line', title: 'Documented advice', desc: 'Positions taken in your filings are documented, so they hold up if questioned later.' },
];

export const PROCESS_STEPS = [
  { title: 'Consultation', desc: 'Tell us what you need. We confirm scope, timelines and a fixed fee.' },
  { title: 'Documents', desc: 'You receive a tailored checklist and share documents securely.' },
  { title: 'Execution', desc: 'Our team prepares, reviews and files on the relevant portals.' },
  { title: 'Delivery', desc: 'You receive acknowledgements, certificates and a compliance calendar.' },
];

export const TESTIMONIALS = [
  { quote: '[Client testimonial — to be provided by the firm. Two or three sentences about the experience.]', name: '[Client name]', role: '[Designation, Company]', city: '[City]' },
  { quote: '[Client testimonial — to be provided by the firm. Two or three sentences about the experience.]', name: '[Client name]', role: '[Designation, Company]', city: '[City]' },
  { quote: '[Client testimonial — to be provided by the firm. Two or three sentences about the experience.]', name: '[Client name]', role: '[Designation, Company]', city: '[City]' },
];

export const FAQS = [
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
    a: 'Call +91 11 6926 6597, WhatsApp +91 99116 81113, email contact@mishraandassociates.in, or use the enquiry form on our contact page. We respond to enquiries within one working day.',
  },
];

export const LEGAL_UPDATED = 'October 2026';
