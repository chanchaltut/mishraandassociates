// ═══════════════════════════════════════════════════════════
//  Global company registration — one entry per jurisdiction.
//  Defaults for admin → "Global setup".
//
//  Facts are indicative and should be reviewed by the firm before
//  launch; rules and fees change. Professional fees are placeholders.
// ═══════════════════════════════════════════════════════════

import { fromContent } from '../lib/content.js';

// Shown on every non-India page: what an Indian promoter must do at home.
export const INDIA_NOTE_DEFAULT = {
  title: 'Investing from India? Stay FEMA-compliant.',
  body: 'Indian residents setting up or funding a foreign company must route the investment through an Authorised Dealer bank under the Overseas Investment framework under FEMA. We handle the ODI filings, valuation and annual reporting alongside the overseas incorporation, so both sides of the structure stay compliant.',
  points: [
    'Eligibility review under FEMA overseas investment rules',
    'ODI filing through your AD bank and UIN allotment',
    'Valuation and pricing documentation where required',
    'Annual Performance Report and ongoing reporting',
  ],
};

export const COUNTRIES_DEFAULT = [
  {
    slug: 'india',
    name: 'India',
    flag: 'in',
    headline: 'Company Registration in India',
    tagline: 'Private Limited, LLP or OPC — incorporated online through the MCA, with PAN, TAN and bank-ready documents.',
    intro:
      'India offers a fully online incorporation process through the Ministry of Corporate Affairs. We help you choose between a Private Limited Company, LLP and One Person Company, secure the name, prepare the charter documents and obtain the Certificate of Incorporation with PAN and TAN.',
    startingPrice: '₹999 + Govt Fee',
    facts: [
      { label: 'Popular entity', value: 'Private Limited Company' },
      { label: 'Registrar', value: 'Ministry of Corporate Affairs (ROC)' },
      { label: 'Typical timeline', value: '7–15 working days' },
      { label: 'Minimum directors', value: '2 (1 for OPC)' },
      { label: 'Resident director', value: 'At least one required' },
      { label: 'Minimum capital', value: 'No statutory minimum' },
    ],
    entities: [
      { name: 'Private Limited Company', desc: 'Separate legal entity with limited liability. Preferred by investors and suitable for scaling businesses.' },
      { name: 'Limited Liability Partnership (LLP)', desc: 'Partnership flexibility with limited liability and lighter compliance — common for professional firms.' },
      { name: 'One Person Company (OPC)', desc: 'Limited-liability company for a single founder who is an Indian citizen.' },
      { name: 'Section 8 Company', desc: 'Non-profit company for charitable, educational or social objectives.' },
    ],
    why: [
      'Fully digital incorporation — no office visit needed',
      'Access to one of the world’s largest domestic markets',
      'Startup India recognition and related benefits for eligible companies',
      'Limited liability and easy transfer of ownership',
    ],
    documents: [
      'PAN and Aadhaar of directors and shareholders',
      'Passport (for foreign nationals), notarised / apostilled as applicable',
      'Address proof — recent bank statement or utility bill',
      'Passport-size photographs',
      'Registered office proof — utility bill plus owner’s NOC or rent agreement',
    ],
    process: [
      { title: 'Structure & name', desc: 'We advise on the entity type and check name availability.' },
      { title: 'DSC & documents', desc: 'Digital signatures are issued and charter documents (MoA/AoA) drafted.' },
      { title: 'SPICe+ filing', desc: 'Incorporation forms are filed with the MCA along with PAN/TAN applications.' },
      { title: 'Incorporation', desc: 'Certificate of Incorporation, PAN and TAN are issued; we hand over the bank-account kit.' },
    ],
    compliance: [
      'Auditor appointment within 30 days of incorporation',
      'Declaration of commencement of business',
      'Annual filings — financial statements and annual return',
      'Income tax return and, where applicable, tax audit',
      'GST, TDS and payroll compliance as the business operates',
    ],
    faqs: [
      { q: 'How long does company registration take in India?', a: 'A Private Limited Company is typically incorporated in 7–15 working days, depending on name approval and how quickly documents and digital signatures are ready.' },
      { q: 'Can a foreign national be a director of an Indian company?', a: 'Yes. Foreign nationals can be directors and shareholders, but every Indian company must have at least one director who is resident in India. Foreign investment must also follow FDI rules for the sector.' },
      { q: 'Is there a minimum capital requirement?', a: 'No. There is no statutory minimum paid-up capital for a Private Limited Company; you can start with a nominal amount and increase it later.' },
    ],
    isHome: true,
  },
  {
    slug: 'usa',
    name: 'United States',
    shortName: 'USA',
    flag: 'us',
    headline: 'Company Registration in the USA',
    tagline: 'Delaware C-Corp or Wyoming/Delaware LLC — formed remotely, with EIN, registered agent and India-side ODI compliance.',
    intro:
      'US entities are formed at state level. Most founders choose a Delaware C-Corporation when they plan to raise venture capital, or an LLC in Delaware or Wyoming for trading, services and holding structures. Owners and directors do not need to be US residents and the process can be completed remotely.',
    startingPrice: 'Fee on request',
    facts: [
      { label: 'Popular entity', value: 'Delaware C-Corp / LLC' },
      { label: 'Registrar', value: 'State Secretary of State' },
      { label: 'Typical timeline', value: 'Formation in days; EIN can take longer' },
      { label: 'Minimum directors', value: '1' },
      { label: 'Residency requirement', value: 'None — registered agent required' },
      { label: 'Minimum capital', value: 'No statutory minimum' },
    ],
    entities: [
      { name: 'C-Corporation (Delaware)', desc: 'Standard choice for startups raising institutional investment and issuing stock options.' },
      { name: 'Limited Liability Company (LLC)', desc: 'Flexible ownership and pass-through options; popular for services, e-commerce and holding entities.' },
    ],
    why: [
      'Access to US customers, payment gateways and marketplaces',
      'Investor-friendly corporate law in Delaware',
      'No residency requirement for owners or directors',
      'Remote formation and banking options for non-residents',
    ],
    documents: [
      'Passport copies of all owners / directors',
      'Residential address proof',
      'Proposed company name and business activity',
      'Ownership structure and share / membership split',
    ],
    process: [
      { title: 'State & entity choice', desc: 'We compare C-Corp vs LLC and Delaware vs other states for your plans.' },
      { title: 'Formation filing', desc: 'Certificate of Incorporation / Formation is filed with the state through a registered agent.' },
      { title: 'EIN & documents', desc: 'We obtain the federal EIN and prepare bylaws or operating agreement.' },
      { title: 'Banking & ODI', desc: 'Support with US bank account opening and India-side ODI reporting.' },
    ],
    compliance: [
      'State annual report and franchise tax',
      'Federal and state tax returns',
      'Information returns for foreign-owned entities, where applicable',
      'Registered agent renewal',
      'India: ODI annual reporting for Indian resident owners',
    ],
    faqs: [
      { q: 'Can an Indian resident own a US company?', a: 'Yes. Indian residents can own US companies, but the investment must comply with India’s overseas investment rules under FEMA and be reported through an Authorised Dealer bank.' },
      { q: 'Should I choose an LLC or a C-Corp?', a: 'A Delaware C-Corp is usually preferred if you plan to raise venture capital. An LLC is often simpler for services, trading or holding structures. The right choice depends on your funding plans and tax position in India and the US.' },
      { q: 'Do I need to visit the US?', a: 'No. Formation, EIN and most banking steps can be completed remotely.' },
    ],
  },
  {
    slug: 'uae',
    name: 'United Arab Emirates',
    shortName: 'UAE',
    flag: 'ae',
    headline: 'Company Registration in the UAE',
    tagline: 'Free Zone or Mainland — 100% foreign ownership, residence visas and a competitive corporate tax regime.',
    intro:
      'The UAE offers Free Zone companies (100% foreign owned, with activities largely within the zone or abroad) and Mainland companies (trade anywhere in the UAE). Most commercial activities now permit 100% foreign ownership on the Mainland too. We help you pick the right zone, licence and visa package.',
    startingPrice: 'Fee on request',
    facts: [
      { label: 'Popular entity', value: 'Free Zone LLC / FZCO' },
      { label: 'Registrar', value: 'Free Zone authority or Department of Economy' },
      { label: 'Typical timeline', value: '1–4 weeks' },
      { label: 'Minimum shareholders', value: '1' },
      { label: 'Local partner', value: 'Not required for most activities' },
      { label: 'Corporate tax', value: '9% above AED 375,000 taxable income' },
    ],
    entities: [
      { name: 'Free Zone Company', desc: '100% foreign ownership with simplified set-up; ideal for trading, consulting and holding structures.' },
      { name: 'Mainland LLC', desc: 'Trade directly across the UAE market and bid for government contracts.' },
      { name: 'Branch of a foreign / Indian company', desc: 'Extend your existing company into the UAE without a new legal entity.' },
    ],
    why: [
      'Strategic hub for the Middle East, Africa and South Asia',
      'Residence visas for owners, family and staff',
      'No personal income tax',
      'Strong banking and logistics infrastructure',
    ],
    documents: [
      'Passport copies of shareholders and managers',
      'Passport-size photographs',
      'Residential address proof',
      'Business plan / activity details (for certain zones)',
      'Board resolution and charter documents (corporate shareholders)',
    ],
    process: [
      { title: 'Zone & licence', desc: 'We match your activity to the right free zone or mainland licence.' },
      { title: 'Name & approvals', desc: 'Trade name reservation and initial approval from the authority.' },
      { title: 'Licence issuance', desc: 'Charter documents signed and trade licence issued.' },
      { title: 'Visa & bank', desc: 'Establishment card, residence visas and corporate bank account support.' },
    ],
    compliance: [
      'Annual trade licence renewal',
      'Corporate tax registration and annual return',
      'VAT registration once the threshold is crossed',
      'Ultimate Beneficial Owner (UBO) register',
      'Audited financial statements where required by the zone',
    ],
    faqs: [
      { q: 'Free Zone or Mainland — which is better?', a: 'A Free Zone company suits businesses serving international clients or trading through the zone. Mainland is better if you need to sell directly to UAE customers or work with government entities.' },
      { q: 'Is there corporate tax in the UAE?', a: 'Yes. The UAE levies corporate tax at 9% on taxable income above AED 375,000, with 0% below that threshold. Qualifying Free Zone persons may access a 0% rate on qualifying income subject to conditions.' },
      { q: 'Can I get a residence visa through my company?', a: 'Yes. Most licences allow residence visas for owners and employees; the number depends on the licence and office package.' },
    ],
  },
  {
    slug: 'singapore',
    name: 'Singapore',
    flag: 'sg',
    headline: 'Company Registration in Singapore',
    tagline: 'Private Limited (Pte. Ltd.) with ACRA — fast incorporation, nominee director options and a respected tax regime.',
    intro:
      'Singapore Private Limited companies are registered with ACRA and are among the fastest to incorporate once documents are ready. Every company needs at least one locally resident director and a qualified company secretary — we arrange both if you do not have them.',
    startingPrice: 'Fee on request',
    facts: [
      { label: 'Popular entity', value: 'Private Limited (Pte. Ltd.)' },
      { label: 'Registrar', value: 'ACRA' },
      { label: 'Typical timeline', value: '1–3 working days after KYC' },
      { label: 'Minimum directors', value: '1 locally resident director' },
      { label: 'Company secretary', value: 'Required within 6 months' },
      { label: 'Minimum capital', value: 'S$1' },
    ],
    entities: [
      { name: 'Private Limited (Pte. Ltd.)', desc: 'The standard vehicle for operating businesses and regional holding companies.' },
      { name: 'Branch Office', desc: 'Extension of a foreign company, registered with ACRA.' },
    ],
    why: [
      'Gateway to Southeast Asian markets',
      'Extensive tax treaty network, including with India',
      'Stable, transparent regulatory environment',
      'Preferred holding jurisdiction for regional structures',
    ],
    documents: [
      'Passport and address proof of directors and shareholders',
      'Details of the local resident director (or nominee)',
      'Company name, activity (SSIC code) and constitution',
      'Registered Singapore address',
    ],
    process: [
      { title: 'Name & structure', desc: 'Name check, activity codes and shareholding finalised.' },
      { title: 'KYC & director', desc: 'KYC completed and local resident director arranged.' },
      { title: 'ACRA filing', desc: 'Incorporation filed on BizFile; certificate and business profile issued.' },
      { title: 'Post-incorporation', desc: 'Secretary appointment, share certificates and bank account support.' },
    ],
    compliance: [
      'Annual return filing with ACRA',
      'Estimated Chargeable Income (ECI) and corporate tax return with IRAS',
      'Statutory registers and AGM requirements',
      'GST registration once the turnover threshold is crossed',
      'India: ODI annual reporting for Indian resident owners',
    ],
    faqs: [
      { q: 'Do I need a local director in Singapore?', a: 'Yes. Every Singapore company needs at least one director who is ordinarily resident in Singapore — a citizen, permanent resident or eligible pass holder. A nominee director service can meet this requirement.' },
      { q: 'What is the corporate tax rate in Singapore?', a: 'The headline corporate tax rate is 17%, with partial exemptions and start-up exemptions that reduce the effective rate on the first tranche of income.' },
      { q: 'Can the company be 100% foreign owned?', a: 'Yes. Singapore allows 100% foreign shareholding for a Private Limited company.' },
    ],
  },
  {
    slug: 'hong-kong',
    name: 'Hong Kong',
    flag: 'hk',
    headline: 'Company Registration in Hong Kong',
    tagline: 'Private Company Limited by Shares — no local director needed, territorial tax system and access to Greater China.',
    intro:
      'A Hong Kong private company can be fully foreign owned and directed. You will need a local company secretary and a registered office in Hong Kong, both of which we can provide. Incorporation and business registration are completed together with the Companies Registry.',
    startingPrice: 'Fee on request',
    facts: [
      { label: 'Popular entity', value: 'Private Company Limited by Shares' },
      { label: 'Registrar', value: 'Companies Registry' },
      { label: 'Typical timeline', value: 'Around 1 week after KYC' },
      { label: 'Minimum directors', value: '1 (any nationality)' },
      { label: 'Company secretary', value: 'Hong Kong resident or company' },
      { label: 'Profits tax', value: '8.25% / 16.5% two-tier' },
    ],
    entities: [
      { name: 'Private Company Limited by Shares', desc: 'The most common vehicle for trading, sourcing and holding businesses.' },
      { name: 'Branch Office', desc: 'Registration of a non-Hong Kong company carrying on business in Hong Kong.' },
    ],
    why: [
      'Territorial taxation — offshore profits may be exempt',
      'No restrictions on foreign ownership or currency movement',
      'Gateway to mainland China and Asian trade',
      'Simple, common-law-based corporate regime',
    ],
    documents: [
      'Passport and address proof of directors and shareholders',
      'Proposed company name (English and/or Chinese)',
      'Share capital and shareholding details',
      'Business nature and description',
    ],
    process: [
      { title: 'Name & structure', desc: 'Name search and share structure finalised.' },
      { title: 'Secretary & office', desc: 'Local company secretary and registered office arranged.' },
      { title: 'Incorporation', desc: 'Filing with the Companies Registry with simultaneous business registration.' },
      { title: 'Kit & banking', desc: 'Company kit, statutory registers and bank account support.' },
    ],
    compliance: [
      'Annual return with the Companies Registry',
      'Business registration renewal',
      'Audited financial statements and profits tax return',
      'Significant Controllers Register',
      'India: ODI annual reporting for Indian resident owners',
    ],
    faqs: [
      { q: 'Does a Hong Kong company need a local director?', a: 'No. Directors can be of any nationality and reside anywhere. However, the company secretary must be a Hong Kong resident individual or a Hong Kong company.' },
      { q: 'Is an audit mandatory?', a: 'Yes. Hong Kong companies must have their financial statements audited by a Hong Kong practising auditor every year.' },
      { q: 'How is profit taxed?', a: 'Hong Kong uses a two-tier profits tax: 8.25% on the first HK$2 million of assessable profits and 16.5% thereafter for corporations, applied on a territorial basis.' },
    ],
  },
  {
    slug: 'china',
    name: 'China',
    flag: 'cn',
    headline: 'Company Registration in China',
    tagline: 'Wholly Foreign-Owned Enterprise (WFOE) — full control of your China operations, from licence to bank account.',
    intro:
      'Foreign investors typically enter China through a Wholly Foreign-Owned Enterprise (a foreign-invested limited liability company), a joint venture or a representative office. Set-up involves business licence registration, company seals, bank accounts and tax registration, and depends on the city and the activity.',
    startingPrice: 'Fee on request',
    facts: [
      { label: 'Popular entity', value: 'WFOE (foreign-invested LLC)' },
      { label: 'Registrar', value: 'Local Administration for Market Regulation' },
      { label: 'Typical timeline', value: '1–3 months' },
      { label: 'Key officers', value: 'Legal representative, director, supervisor' },
      { label: 'Office', value: 'Commercial lease required' },
      { label: 'Corporate income tax', value: '25% standard rate' },
    ],
    entities: [
      { name: 'Wholly Foreign-Owned Enterprise (WFOE)', desc: 'Full ownership and control; can invoice in RMB and hire locally.' },
      { name: 'Joint Venture', desc: 'Partnership with a Chinese party — sometimes required for restricted sectors.' },
      { name: 'Representative Office', desc: 'Liaison and market-research presence; cannot conduct direct profit-making business.' },
    ],
    why: [
      'Direct access to the Chinese market and supply chains',
      'Ability to invoice locally and repatriate profits',
      'Full management control with a WFOE',
      'Sourcing and quality-control presence near manufacturers',
    ],
    documents: [
      'Investor’s certificate of incorporation / passport (notarised and legalised)',
      'Bank reference letter for the investor',
      'Lease agreement for the registered office in China',
      'Details of legal representative, director and supervisor',
      'Articles of association and business scope',
    ],
    process: [
      { title: 'Feasibility', desc: 'Check the business scope against China’s foreign investment negative list.' },
      { title: 'Name & office', desc: 'Name pre-approval and registered office lease.' },
      { title: 'Business licence', desc: 'Registration with the market regulation authority and seal engraving.' },
      { title: 'Bank & tax', desc: 'Bank accounts, tax registration and foreign exchange registration.' },
    ],
    compliance: [
      'Annual report to the market regulator',
      'Annual statutory audit and corporate income tax filing',
      'Monthly / quarterly VAT and tax filings',
      'Capital contribution within the statutory period',
      'India: ODI annual reporting for Indian resident owners',
    ],
    faqs: [
      { q: 'What is a WFOE?', a: 'A Wholly Foreign-Owned Enterprise is a limited liability company in China owned entirely by foreign investors. It can conduct business, issue local invoices and employ staff within its approved business scope.' },
      { q: 'How long does it take to set up a company in China?', a: 'Typically one to three months, depending on the city, the business scope and how quickly the office lease and legalised documents are ready.' },
      { q: 'Is there a minimum registered capital?', a: 'There is generally no fixed statutory minimum for most sectors, but the subscribed capital should be realistic for the business and must be contributed within the period required under Chinese company law.' },
    ],
  },
  {
    slug: 'uk',
    name: 'United Kingdom',
    shortName: 'UK',
    flag: 'gb',
    headline: 'Company Registration in the UK',
    tagline: 'Private Limited Company with Companies House — quick online incorporation, no residency requirement.',
    intro:
      'A UK private limited company can be incorporated online with Companies House, usually within a day once identity checks and documents are complete. Directors and shareholders can be non-residents, but the company needs a registered office address in the UK, which we can arrange.',
    startingPrice: 'Fee on request',
    facts: [
      { label: 'Popular entity', value: 'Private Limited Company (Ltd)' },
      { label: 'Registrar', value: 'Companies House' },
      { label: 'Typical timeline', value: 'Often within 24 hours online' },
      { label: 'Minimum directors', value: '1 (natural person)' },
      { label: 'Residency requirement', value: 'None — UK registered office needed' },
      { label: 'Corporation tax', value: '19%–25% depending on profits' },
    ],
    entities: [
      { name: 'Private Limited Company (Ltd)', desc: 'The most common UK vehicle for trading and holding businesses.' },
      { name: 'Limited Liability Partnership (LLP)', desc: 'Suitable for professional partnerships seeking limited liability.' },
      { name: 'UK Establishment (Branch)', desc: 'Registration of an overseas company’s UK presence.' },
    ],
    why: [
      'Fast, fully online incorporation',
      'Credible jurisdiction for European and global clients',
      'Extensive treaty network, including with India',
      'No minimum capital and no residency requirement',
    ],
    documents: [
      'Passport and address proof of directors and shareholders (PSCs)',
      'Identity verification with Companies House',
      'Company name and SIC (activity) code',
      'UK registered office and service address',
    ],
    process: [
      { title: 'Name & structure', desc: 'Name availability, share structure and articles finalised.' },
      { title: 'Identity verification', desc: 'Directors and persons with significant control verify their identity.' },
      { title: 'Companies House filing', desc: 'Incorporation filed; certificate of incorporation issued.' },
      { title: 'Tax & banking', desc: 'Corporation tax and VAT registration as needed, plus bank account support.' },
    ],
    compliance: [
      'Annual confirmation statement',
      'Annual accounts filed with Companies House',
      'Corporation tax return with HMRC',
      'VAT returns once registered',
      'India: ODI annual reporting for Indian resident owners',
    ],
    faqs: [
      { q: 'Can a non-resident form a UK company?', a: 'Yes. There is no residency requirement for directors or shareholders. The company must, however, have a registered office address in the UK.' },
      { q: 'How quickly can a UK company be registered?', a: 'Online incorporation with Companies House is often completed within 24 hours once identity verification and documents are in order.' },
      { q: 'What is the UK corporation tax rate?', a: 'Corporation tax is 19% for companies with profits up to £50,000 and 25% for profits above £250,000, with marginal relief in between.' },
    ],
  },
];

const INDIA_NOTE = fromContent('countries', 'indiaNote', INDIA_NOTE_DEFAULT);

export const COUNTRIES = fromContent('countries', 'countries', COUNTRIES_DEFAULT).map((c) =>
  c.isHome ? c : { ...c, indiaNote: INDIA_NOTE }
);

export const getCountry = (slug) => COUNTRIES.find((c) => c.slug === slug);

// Comparison table on /company-registration
export const COMPARISON_DEFAULT = [
  { slug: 'india', entity: 'Private Limited', timeline: '7–15 working days', localDirector: 'Yes — 1 resident', tax: '22% / 25% base rate', capital: 'No minimum' },
  { slug: 'usa', entity: 'C-Corp / LLC', timeline: 'Days (EIN extra)', localDirector: 'No', tax: '21% federal + state', capital: 'No minimum' },
  { slug: 'uae', entity: 'Free Zone / Mainland', timeline: '1–4 weeks', localDirector: 'No', tax: '9% above AED 375k', capital: 'Varies by zone' },
  { slug: 'singapore', entity: 'Pte. Ltd.', timeline: '1–3 working days', localDirector: 'Yes — 1 resident', tax: '17% headline', capital: 'S$1' },
  { slug: 'hong-kong', entity: 'Private Ltd', timeline: '~1 week', localDirector: 'No (local secretary)', tax: '8.25% / 16.5%', capital: 'No minimum' },
  { slug: 'china', entity: 'WFOE', timeline: '1–3 months', localDirector: 'Legal rep. required', tax: '25% standard', capital: 'Subscribed, paid in stages' },
  { slug: 'uk', entity: 'Private Ltd', timeline: 'Often 24 hours', localDirector: 'No', tax: '19% – 25%', capital: 'No minimum' },
];

export const COMPARISON = fromContent('countries', 'comparison', COMPARISON_DEFAULT);
