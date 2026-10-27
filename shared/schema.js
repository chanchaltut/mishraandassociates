// ═══════════════════════════════════════════════════════════
//  Content schema — single source of truth for website management.
//
//  Each content key is one editable document (Site settings, Home page,
//  Services, …). The same definitions drive:
//    • the admin forms        (src/admin)
//    • server-side validation (server/src)
//    • build-time validation  (scripts/fetch-snapshot.mjs)
//
//  Plain JavaScript with no dependencies, so it runs in the browser,
//  in Node and at build time unchanged.
// ═══════════════════════════════════════════════════════════

// ─── Field helpers ──────────────────────────────────────────
const f = (type) => (label, opts = {}) => ({ type, label, ...opts });
const text = f('text');
const textarea = f('textarea');
const paragraphs = f('paragraphs'); // array of strings edited as one text box, blank line = new paragraph
const number = f('number');
const toggle = f('toggle');
const url = f('url');
const image = f('image');
const file = f('file');
const date = f('date');
const icon = f('icon');
const strings = f('strings'); // array of short strings
const select = (label, options, opts = {}) => ({ type: 'select', label, options, ...opts });
const group = (label, fields, opts = {}) => ({ type: 'group', label, fields, ...opts });
const list = (label, fields, opts = {}) => ({ type: 'list', label, fields, ...opts });

const qa = { q: text('Question', { required: true, max: 300 }), a: textarea('Answer', { required: true, max: 2000 }) };
const faqList = (label, help) => list(label, qa, { itemLabel: 'q', addLabel: 'Add question', help });
const slug = (label = 'URL slug') =>
  text(label, { required: true, slug: true, unique: true, help: 'Lowercase letters, numbers and hyphens. Changing it changes the page address.' });
const ICON_HELP = 'Remix icon class, e.g. ri-file-list-3-line — browse at remixicon.com';
const HIDE_HELP = 'Leave blank to hide.';

export const NEWS_CATEGORIES = ['Income Tax', 'GST', 'Corporate Law', 'FEMA & RBI', 'International'];
export const CALENDAR_CATEGORIES = ['Income Tax', 'GST', 'Payroll', 'Corporate'];
export const AUTHORITY_OPTIONS = [
  ['cbdt', 'CBDT'], ['cbic-gst', 'CBIC — GST'], ['cbic-customs', 'CBIC — Customs'], ['mca', 'MCA'],
  ['rbi', 'RBI'], ['sebi', 'SEBI'], ['dgft', 'DGFT'],
];
export const TENDER_SECTOR_OPTIONS = [
  ['construction', 'Construction & Civil Works'], ['power', 'Power & Energy'], ['it', 'IT & Software'],
  ['medical', 'Medical & Healthcare'], ['water', 'Water & Sanitation'], ['transport', 'Roads & Transport'],
  ['consultancy', 'Consultancy & Services'], ['supply', 'Supply of Goods'], ['security', 'Security & Manpower'],
  ['education', 'Education & Training'],
];
export const TM_STATUS_OPTIONS = ['Formalities Chk Pass', 'Marked for Exam', 'Objected', 'Accepted & Advertised', 'Opposed', 'Registered'];
export const PAGE_PATHS = [
  '/', '/services', '/company-registration', '/blog', '/news', '/notifications', '/compliance-calendar', '/tenders',
  '/trademark-search', '/faqs', '/about', '/clients', '/contact', '/privacy-policy', '/terms-conditions',
];

// ─── Content keys ───────────────────────────────────────────
export const CONTENT = {
  settings: {
    title: 'Site settings',
    section: 'Website',
    icon: 'ri-settings-3-line',
    description: 'Firm name, contact details, address, GSTIN, social links, announcement bar and site-wide switches.',
    fields: {
      name: text('Firm name', { required: true, max: 80 }),
      legalName: text('Legal name', { required: true, max: 120 }),
      tagline: text('Tagline', { max: 120 }),
      description: textarea('Short description', { max: 400, help: 'Used in the footer and as the default Google description.' }),
      phone: group('Phone', {
        display: text('Phone (as shown)', { required: true, max: 30 }),
        tel: text('Phone (for dialling)', { required: true, max: 20, help: 'With country code, no spaces, e.g. +911169266597' }),
      }),
      whatsapp: text('WhatsApp number', { required: true, max: 20, help: 'Digits only with country code, e.g. 919911681113' }),
      whatsappDisplay: text('WhatsApp (as shown)', { max: 30 }),
      email: text('Email', { required: true, max: 120 }),
      address: group('Office address', {
        street: text('Street', { required: true }),
        city: text('City', { required: true }),
        region: text('State / region'),
        postalCode: text('PIN code'),
        country: text('Country'),
        countryCode: text('Country code', { max: 2 }),
        mapUrl: url('Google Maps link', { help: 'Used for “Get directions”.' }),
        mapEmbedUrl: url('Map embed URL', { help: 'Google Maps → Share → Embed a map → copy only the src="…" link.' }),
      }),
      hours: text('Office hours', { help: HIDE_HELP }),
      yearsOfPractice: number('Years of practice'),
      founded: text('Year established', { help: HIDE_HELP }),
      gstin: text('GSTIN', { max: 15, help: HIDE_HELP }),
      social: group('Social links', {
        linkedin: url('LinkedIn', { help: HIDE_HELP }),
        facebook: url('Facebook', { help: HIDE_HELP }),
        instagram: url('Instagram', { help: HIDE_HELP }),
        x: url('X (Twitter)', { help: HIDE_HELP }),
        youtube: url('YouTube', { help: HIDE_HELP }),
      }),
      logo: image('Logo', { help: 'SVG or transparent PNG. Leave blank to use the text logo.' }),
      ogImage: image('Default share image', { help: '1200 × 630 px — shown when a page is shared on WhatsApp, LinkedIn, etc.' }),
      announcement: group('Announcement bar', {
        enabled: toggle('Show announcement bar'),
        text: text('Message', { max: 160 }),
        linkLabel: text('Link text', { max: 40 }),
        href: text('Link', { help: 'A page path such as /compliance-calendar, or a full URL.' }),
        startsAt: date('Show from', { help: 'Optional.' }),
        endsAt: date('Show until', { help: 'Optional — hides automatically after this date.' }),
      }),
      features: group('Site features', {
        ticker: toggle('“Latest updates” ticker at the top'),
        floatingButtons: toggle('Floating call & WhatsApp buttons'),
        incorporationPopup: toggle('Company-registration popup'),
      }),
      footerDisclaimer: textarea('Footer disclaimer', { max: 600 }),
      url: url('Website address', { required: true, help: 'Only change this if the domain changes.' }),
      domain: text('Domain', { required: true }),
      demoMode: toggle('Review mode', { help: 'Highlights missing [placeholder] content and sample entries. Keep off on the live site.' }),
    },
  },

  navigation: {
    title: 'Menus',
    section: 'Website',
    icon: 'ri-menu-line',
    description: 'Header menu items and the Knowledge Hub menu.',
    fields: {
      main: list('Main menu', {
        name: text('Label', { required: true, max: 30 }),
        href: text('Link', { required: true }),
        menu: select('Drop-down', [['', 'None'], ['services', 'Services'], ['global', 'Global setup'], ['knowledge', 'Knowledge hub']]),
      }, { itemLabel: 'name', addLabel: 'Add menu item' }),
      knowledge: list('Knowledge Hub menu', {
        name: text('Label', { required: true }),
        href: text('Link', { required: true }),
        icon: icon('Icon', { help: ICON_HELP }),
        desc: text('Description', { max: 90 }),
      }, { itemLabel: 'name', addLabel: 'Add link' }),
    },
  },

  home: {
    title: 'Home page',
    section: 'Website',
    icon: 'ri-home-4-line',
    description: 'Hero, figures, about block, why-us, process, testimonials and which sections are shown.',
    fields: {
      hero: group('Hero', {
        eyebrow: text('Small heading', { max: 80 }),
        title: text('Headline', { required: true, max: 80 }),
        titleAccent: text('Headline — highlighted words', { max: 60, help: 'Shown in gold italics after the headline.' }),
        description: textarea('Description', { max: 320 }),
        primaryCta: group('Main button', { label: text('Text', { required: true }), href: text('Link', { required: true }) }),
        secondaryCta: group('Second button', { label: text('Text'), href: text('Link') }),
        image: group('Background photo', {
          src: image('Photo', { help: 'Landscape, at least 1600 px wide. A dark overlay is added automatically.' }),
          alt: text('Description of the photo'),
        }),
        proof: list('Figures', { value: text('Figure', { required: true, max: 10 }), label: text('Label', { required: true, max: 30 }) }, { itemLabel: 'label', max: 4 }),
        rating: group('Review rating (optional)', {
          score: number('Rating out of 5', { help: 'Leave blank to hide the stars.' }),
          count: number('Number of reviews'),
          source: text('Review site', { help: 'e.g. Google' }),
          href: url('Link to reviews'),
        }),
        searchChips: strings('Search suggestions'),
      }),
      stats: list('Firm figures', { value: text('Figure', { required: true }), label: text('Label', { required: true }) }, { itemLabel: 'label', help: 'Shown on the home, about and clients pages.' }),
      about: group('About the firm', {
        heading: text('Heading', { required: true }),
        paragraphs: strings('Paragraphs', { multiline: true }),
        image: image('Photo'),
        founderQuote: group('Founder quote', { text: textarea('Quote', { help: HIDE_HELP }), name: text('Name'), role: text('Designation') }),
        highlights: strings('Highlights'),
        clientTypes: strings('Who we work with'),
      }),
      whyUs: list('Why choose us', { icon: icon('Icon', { help: ICON_HELP }), title: text('Title', { required: true }), desc: textarea('Text') }, { itemLabel: 'title' }),
      process: list('How we work', { title: text('Step', { required: true }), desc: textarea('Text') }, { itemLabel: 'title' }),
      testimonials: list('Testimonials', { quote: textarea('Quote', { required: true }), name: text('Name', { required: true }), role: text('Designation, company'), city: text('City') }, { itemLabel: 'name' }),
      sections: group('Show sections', {
        jurisdictionStrip: toggle('Country strip'),
        practiceAreas: toggle('Practice areas'),
        globalSetup: toggle('Global setup'),
        knowledgeDesk: toggle('Knowledge desk'),
        dueDates: toggle('Due dates'),
        aboutFirm: toggle('About the firm'),
        process: toggle('How we work'),
        testimonials: toggle('Testimonials'),
        faq: toggle('FAQs'),
        cta: toggle('Closing call-to-action'),
      }),
    },
  },

  pages: {
    title: 'Pages & SEO',
    section: 'Website',
    icon: 'ri-pages-line',
    description: 'Google title and description, and the heading block, of each inner page. Only fill in what you want to change.',
    fields: {
      items: list('Page overrides', {
        path: select('Page', PAGE_PATHS, { required: true, unique: true }),
        title: text('Google title', { max: 70, help: 'About 50–60 characters.' }),
        description: textarea('Google description', { max: 170, help: 'About 140–160 characters.' }),
        eyebrow: text('Small heading'),
        heading: text('Page heading'),
        accent: text('Heading — italic words'),
        intro: textarea('Intro text'),
        noindex: toggle('Hide from Google'),
      }, { itemLabel: 'path', addLabel: 'Add page' }),
    },
  },

  services: {
    title: 'Services & prices',
    section: 'Services',
    icon: 'ri-price-tag-3-line',
    description: 'Practice areas, every sub-service and its price. Clear a price to hide it.',
    fields: {
      categories: list('Practice areas', {
        title: text('Title', { required: true }),
        shortTitle: text('Short title', { required: true }),
        id: slug('ID'),
        category: text('Category name', { required: true, unique: true, help: 'Used for filtering on the Services page.' }),
        icon: icon('Icon', { help: ICON_HELP }),
        startingPrice: text('Starting price', { help: `e.g. ₹499. ${HIDE_HELP}` }),
        badge: text('Badge', { help: `e.g. Most Popular. ${HIDE_HELP}` }),
        shortDesc: textarea('Description', { max: 300 }),
        subcategories: list('Services', {
          name: text('Service', { required: true }),
          price: text('Price', { help: `e.g. Starting from ₹999. ${HIDE_HELP}` }),
          href: text('Link', { help: 'Optional — a page for this service.' }),
          popular: toggle('Mark as popular'),
        }, { itemLabel: 'name', addLabel: 'Add service' }),
      }, { itemLabel: 'title', addLabel: 'Add practice area' }),
    },
  },

  servicePages: {
    title: 'Service pages',
    section: 'Services',
    icon: 'ri-file-text-line',
    description: 'The detailed pages under /services/…, including their FAQs.',
    fields: {
      pages: list('Pages', {
        title: text('Title', { required: true }),
        shortTitle: text('Short title', { required: true }),
        slug: slug(),
        icon: icon('Icon', { help: ICON_HELP }),
        category: text('Category', { help: 'Should match a practice-area category name.' }),
        shortDesc: textarea('Short description', { max: 300 }),
        overview: textarea('Overview', { required: true }),
        services: strings('What’s included'),
        startingPrice: text('Starting price', { help: `${HIDE_HELP} Shown as “On request”.` }),
        timeline: text('Timeline'),
        faqs: faqList('FAQs'),
      }, { itemLabel: 'title', addLabel: 'Add service page' }),
    },
  },

  countries: {
    title: 'Global setup',
    section: 'Services',
    icon: 'ri-earth-line',
    description: 'Country pages for company registration and the comparison table.',
    fields: {
      countries: list('Countries', {
        name: text('Country', { required: true }),
        shortName: text('Short name'),
        slug: slug(),
        flag: text('Flag code', { required: true, max: 2, help: 'Two-letter country code, e.g. ae' }),
        headline: text('Headline', { required: true }),
        tagline: textarea('Tagline', { max: 250 }),
        intro: textarea('Introduction'),
        startingPrice: text('Starting fee', { help: 'e.g. Fee on request' }),
        facts: list('Quick facts', { label: text('Label', { required: true }), value: text('Value', { required: true }) }, { itemLabel: 'label' }),
        entities: list('Entity types', { name: text('Name', { required: true }), desc: textarea('Description') }, { itemLabel: 'name' }),
        why: strings('Why this country'),
        documents: strings('Documents required'),
        process: list('Process', { title: text('Step', { required: true }), desc: textarea('Text') }, { itemLabel: 'title' }),
        compliance: strings('Ongoing compliance'),
        faqs: faqList('FAQs'),
        isHome: toggle('This is India (no FEMA note)'),
      }, { itemLabel: 'name', addLabel: 'Add country' }),
      indiaNote: group('FEMA note on non-India pages', { title: text('Heading'), body: textarea('Text'), points: strings('Points') }),
      comparison: list('Comparison table', {
        slug: text('Country slug', { required: true }),
        entity: text('Entity'),
        timeline: text('Timeline'),
        localDirector: text('Local director'),
        tax: text('Tax'),
        capital: text('Capital'),
      }, { itemLabel: 'slug' }),
    },
  },

  faqs: {
    title: 'FAQs',
    section: 'Knowledge Hub',
    icon: 'ri-question-answer-line',
    description: 'General, global-setup, tender and trademark FAQs. Service and country FAQs are edited on their own pages.',
    fields: {
      general: faqList('General', 'Shown on the home page and the FAQs page.'),
      global: faqList('Global company registration'),
      tenders: faqList('Tenders page'),
      trademark: faqList('Trademark search page'),
    },
  },

  blog: {
    title: 'Blog',
    section: 'Knowledge Hub',
    icon: 'ri-quill-pen-line',
    description: 'Articles and guides.',
    fields: {
      posts: list('Articles', {
        title: text('Title', { required: true, max: 160 }),
        slug: slug(),
        category: text('Category', { required: true }),
        date: date('Date', { required: true }),
        author: text('Author'),
        readTime: text('Reading time', { help: 'e.g. 6 min read' }),
        image: image('Cover image'),
        excerpt: textarea('Summary', { required: true, max: 320 }),
        content: paragraphs('Article', { required: true, help: 'Leave an empty line between paragraphs. Start a paragraph with **Bold text** on its own line to make a sub-heading.' }),
      }, { itemLabel: 'title', addLabel: 'Add article', newestFirst: true }),
    },
  },

  news: {
    title: 'News',
    section: 'Knowledge Hub',
    icon: 'ri-newspaper-line',
    description: 'News and updates.',
    fields: {
      items: list('News', {
        title: text('Title', { required: true, max: 160 }),
        slug: slug(),
        category: select('Category', NEWS_CATEGORIES, { required: true }),
        date: date('Date', { required: true }),
        summary: textarea('Summary', { required: true, max: 320 }),
        body: paragraphs('Full text', { required: true, help: 'Leave an empty line between paragraphs. **Bold text** on its own line becomes a sub-heading.' }),
        sample: toggle('Sample entry', { help: 'Turn off once this is a real update.' }),
      }, { itemLabel: 'title', addLabel: 'Add news', newestFirst: true }),
    },
  },

  notifications: {
    title: 'Notifications',
    section: 'Knowledge Hub',
    icon: 'ri-notification-3-line',
    description: 'Government notifications and circulars.',
    fields: {
      items: list('Notifications', {
        authority: select('Authority', AUTHORITY_OPTIONS, { required: true }),
        type: text('Type', { required: true, help: 'e.g. Notification, Circular, Press Release' }),
        number: text('Number', { help: 'e.g. No. 12/2026 – Central Tax' }),
        date: date('Date', { required: true }),
        title: textarea('Subject', { required: true, max: 300 }),
        pdfUrl: file('PDF or source link', { help: 'Upload the PDF or paste the government link.' }),
        sample: toggle('Sample entry'),
      }, { itemLabel: 'title', addLabel: 'Add notification', newestFirst: true }),
    },
  },

  calendar: {
    title: 'Compliance calendar',
    section: 'Knowledge Hub',
    icon: 'ri-calendar-check-line',
    description: 'Standard due dates are generated automatically. Add extensions or extra dates here, or hide a standard date.',
    fields: {
      custom: list('Extra dates and extensions', {
        date: date('Due date', { required: true }),
        title: text('Title', { required: true }),
        category: select('Category', CALENDAR_CATEGORIES, { required: true }),
      }, { itemLabel: 'title', addLabel: 'Add date' }),
      hidden: strings('Hide standard dates', { help: 'Paste the exact title of a standard date to hide it, e.g. “GSTR-1 — monthly filers”.' }),
    },
  },

  tenders: {
    title: 'Tenders',
    section: 'Knowledge Hub',
    icon: 'ri-auction-line',
    description: 'Tender listings, results and the alerts subscription plan.',
    fields: {
      plan: group('Subscription plan', {
        name: text('Plan name', { required: true }),
        price: text('Price', { required: true, help: 'e.g. ₹10,000' }),
        period: text('Per', { required: true, help: 'e.g. year' }),
        features: strings('What’s included'),
      }),
      tenders: list('Live tenders', {
        title: textarea('Title', { required: true }),
        tid: text('Tender ID'),
        sector: select('Sector', TENDER_SECTOR_OPTIONS, { required: true }),
        type: select('Type', ['Goods', 'Works', 'Services'], { required: true }),
        city: text('City'),
        state: text('State', { required: true }),
        source: text('Portal', { help: 'e.g. GeM, CPPP, State e-Procurement' }),
        value: number('Estimated value (₹)', { help: 'Leave blank for “Refer document”.' }),
        emd: number('EMD (₹)'),
        published: date('Published on', { required: true }),
        due: date('Bid closes on', { required: true }),
        sample: toggle('Sample entry'),
      }, { itemLabel: 'title', addLabel: 'Add tender', newestFirst: true }),
      results: list('Tender results', {
        title: text('Title', { required: true }),
        tid: text('Tender ID'),
        sector: select('Sector', TENDER_SECTOR_OPTIONS, { required: true }),
        state: text('State'),
        bids: number('Number of bids'),
        awarded: date('Awarded on', { required: true }),
        sample: toggle('Sample entry'),
      }, { itemLabel: 'title', addLabel: 'Add result', newestFirst: true }),
    },
  },

  trademarks: {
    title: 'Trademark search',
    section: 'Knowledge Hub',
    icon: 'ri-search-eye-line',
    description: 'The “recent filings” list on the trademark search page.',
    fields: {
      showRecent: toggle('Show recent filings'),
      recent: list('Recent filings', {
        mark: text('Trademark', { required: true }),
        applicant: text('Applicant'),
        state: text('State'),
        cls: number('Class (1–45)', { required: true }),
        status: select('Status', TM_STATUS_OPTIONS, { required: true }),
        filed: date('Filed on', { required: true }),
        sample: toggle('Sample entry'),
      }, { itemLabel: 'mark', addLabel: 'Add filing', newestFirst: true }),
    },
  },

  team: {
    title: 'Team',
    section: 'Firm',
    icon: 'ri-team-line',
    description: 'People shown on the About page. The section is hidden until at least one profile is filled in.',
    fields: {
      members: list('People', {
        name: text('Name', { required: true }),
        role: text('Designation'),
        qualification: text('Qualifications'),
        bio: textarea('Short profile', { max: 500 }),
        image: image('Photo', { help: 'Landscape 4:3 works best.' }),
        linkedin: url('LinkedIn'),
      }, { itemLabel: 'name', addLabel: 'Add person' }),
    },
  },

  clients: {
    title: 'Clients',
    section: 'Firm',
    icon: 'ri-building-line',
    description: 'Client logos, industries and client stories. Sections stay hidden until filled in.',
    fields: {
      clients: list('Client logos', {
        name: text('Client name', { required: true }),
        industry: text('Industry'),
        logo: image('Logo'),
      }, { itemLabel: 'name', addLabel: 'Add client', help: 'Only list clients who have given permission.' }),
      industries: list('Industries', { icon: icon('Icon', { help: ICON_HELP }), name: text('Industry', { required: true }) }, { itemLabel: 'name' }),
      caseStudies: list('Client stories', {
        client: text('Client / industry', { required: true }),
        service: text('Service'),
        challenge: textarea('What they needed'),
        outcome: textarea('What we delivered'),
      }, { itemLabel: 'client', addLabel: 'Add story' }),
    },
  },

  legal: {
    title: 'Legal pages',
    section: 'Firm',
    icon: 'ri-scales-3-line',
    description: 'Privacy policy and terms of use.',
    fields: {
      updated: text('Last updated', { required: true, help: 'e.g. October 2026' }),
      privacy: list('Privacy policy', { heading: text('Heading', { required: true }), body: textarea('Text', { required: true }) }, { itemLabel: 'heading', addLabel: 'Add section' }),
      terms: list('Terms of use', { heading: text('Heading', { required: true }), body: textarea('Text', { required: true }) }, { itemLabel: 'heading', addLabel: 'Add section' }),
    },
  },

  inbox: {
    title: 'Form settings',
    section: 'Inbox',
    icon: 'ri-mail-settings-line',
    description: 'Who is emailed when a form is submitted. Never shown on the website.',
    private: true,
    fields: {
      notifyEmails: text('Send form alerts to', { help: 'One or more email addresses, separated by commas.' }),
    },
  },
};

export const CONTENT_KEYS = Object.keys(CONTENT);
export const PUBLIC_KEYS = CONTENT_KEYS.filter((k) => !CONTENT[k].private);

// ─── Validation ─────────────────────────────────────────────
const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const DATE_RE = /^\d{4}-\d{2}-\d{2}/;
const isBlank = (v) => v == null || (typeof v === 'string' && v.trim() === '') || (Array.isArray(v) && v.length === 0);
const optionValue = (o) => (Array.isArray(o) ? o[0] : o);

function validateField(field, value, path, errors) {
  if (isBlank(value)) {
    if (field.required) errors.push({ path, message: `${field.label} is required` });
    return;
  }
  switch (field.type) {
    case 'text':
    case 'textarea':
    case 'icon':
    case 'url':
    case 'image':
    case 'file':
      if (typeof value !== 'string') return errors.push({ path, message: `${field.label} must be text` });
      if (field.max && value.length > field.max) errors.push({ path, message: `${field.label} is too long (max ${field.max} characters)` });
      if (field.slug && !SLUG_RE.test(value)) errors.push({ path, message: `${field.label} may only contain lowercase letters, numbers and hyphens` });
      return;
    case 'date':
      if (typeof value !== 'string' || !DATE_RE.test(value) || Number.isNaN(Date.parse(value))) errors.push({ path, message: `${field.label} must be a valid date` });
      return;
    case 'number':
      if (typeof value !== 'number' || !Number.isFinite(value)) errors.push({ path, message: `${field.label} must be a number` });
      return;
    case 'toggle':
      if (typeof value !== 'boolean') errors.push({ path, message: `${field.label} must be on or off` });
      return;
    case 'select':
      if (!field.options.map(optionValue).includes(value)) errors.push({ path, message: `${field.label} has an unknown value` });
      return;
    case 'strings':
    case 'paragraphs':
      if (!Array.isArray(value) || value.some((s) => typeof s !== 'string')) errors.push({ path, message: `${field.label} must be a list of text` });
      return;
    case 'group':
      if (typeof value !== 'object' || Array.isArray(value)) return errors.push({ path, message: `${field.label} is malformed` });
      validateFields(field.fields, value, path, errors);
      return;
    case 'list': {
      if (!Array.isArray(value)) return errors.push({ path, message: `${field.label} must be a list` });
      if (field.max && value.length > field.max) errors.push({ path, message: `${field.label}: at most ${field.max} items` });
      value.forEach((item, i) => {
        if (typeof item !== 'object' || item === null || Array.isArray(item)) return errors.push({ path: `${path}.${i}`, message: `${field.label} item ${i + 1} is malformed` });
        validateFields(field.fields, item, `${path}.${i}`, errors);
      });
      Object.entries(field.fields).forEach(([k, sub]) => {
        if (!sub.unique) return;
        const seen = new Map();
        value.forEach((item, i) => {
          const v = item?.[k];
          if (isBlank(v)) return;
          if (seen.has(v)) errors.push({ path: `${path}.${i}.${k}`, message: `${sub.label} “${v}” is used twice in ${field.label}` });
          seen.set(v, i);
        });
      });
      return;
    }
    default:
  }
}

function validateFields(fields, obj, path, errors) {
  Object.entries(fields).forEach(([k, field]) => validateField(field, obj?.[k], path ? `${path}.${k}` : k, errors));
}

/** Returns a list of { path, message }; empty when the document is valid. Unknown keys are allowed and kept. */
export function validateContent(key, data) {
  const def = CONTENT[key];
  if (!def) return [{ path: '', message: `Unknown content “${key}”` }];
  if (typeof data !== 'object' || data === null || Array.isArray(data)) return [{ path: '', message: 'Content is malformed' }];
  const errors = [];
  validateFields(def.fields, data, '', errors);
  return errors;
}

/** Validates every public key of a published snapshot's content. */
export function validateSnapshot(content) {
  const errors = [];
  if (typeof content !== 'object' || content === null) return [{ path: '', message: 'Snapshot is empty' }];
  Object.entries(content).forEach(([key, data]) => {
    if (!CONTENT[key] || CONTENT[key].private) return;
    validateContent(key, data).forEach((e) => errors.push({ ...e, path: `${key}.${e.path}` }));
  });
  return errors;
}

/** An empty value of the right shape for a new list item or group. */
export function emptyValue(field) {
  switch (field.type) {
    case 'toggle': return false;
    case 'number': return null;
    case 'strings':
    case 'paragraphs':
    case 'list': return [];
    case 'group': return Object.fromEntries(Object.entries(field.fields).map(([k, sub]) => [k, emptyValue(sub)]));
    case 'select': return field.required ? optionValue(field.options[0]) : '';
    default: return '';
  }
}
