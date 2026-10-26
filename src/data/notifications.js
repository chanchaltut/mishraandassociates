// ═══════════════════════════════════════════════════════════
//  Notifications & circulars — admin collection: "notifications".
//  SAMPLE entries for the demo: numbers are shown as [__] and every
//  row is flagged `sample: true`. The firm will publish actual
//  notifications (with PDF links) from the admin panel.
// ═══════════════════════════════════════════════════════════

export const AUTHORITIES = [
  { id: 'cbdt', name: 'CBDT', full: 'Central Board of Direct Taxes', area: 'Income Tax' },
  { id: 'cbic-gst', name: 'CBIC — GST', full: 'Central Board of Indirect Taxes & Customs', area: 'GST' },
  { id: 'cbic-customs', name: 'CBIC — Customs', full: 'Central Board of Indirect Taxes & Customs', area: 'Customs' },
  { id: 'mca', name: 'MCA', full: 'Ministry of Corporate Affairs', area: 'Corporate Law' },
  { id: 'rbi', name: 'RBI', full: 'Reserve Bank of India', area: 'FEMA' },
  { id: 'sebi', name: 'SEBI', full: 'Securities and Exchange Board of India', area: 'Securities' },
  { id: 'dgft', name: 'DGFT', full: 'Directorate General of Foreign Trade', area: 'Foreign Trade' },
];

export const NOTIFICATIONS = [
  { id: 1, authority: 'cbic-gst', type: 'Notification', number: 'No. [__]/2026 – Central Tax', date: '2026-10-23', title: 'Seeks to extend the due date for furnishing FORM GSTR-3B for specified districts', sample: true },
  { id: 2, authority: 'cbdt', type: 'Circular', number: 'Circular No. [__]/2026', date: '2026-10-22', title: 'Clarification on filing of updated returns and computation of additional tax', sample: true },
  { id: 3, authority: 'mca', type: 'Notification', number: 'G.S.R. [__](E)', date: '2026-10-20', title: 'Companies (Accounts) Amendment Rules — changes to e-forms for financial statements', sample: true },
  { id: 4, authority: 'cbic-customs', type: 'Notification', number: 'No. [__]/2026 – Customs (N.T.)', date: '2026-10-17', title: 'Rates of exchange of conversion of foreign currency for imported and export goods', sample: true },
  { id: 5, authority: 'rbi', type: 'Circular', number: 'A.P. (DIR Series) Circular No. [__]', date: '2026-10-15', title: 'Foreign Exchange Management (Overseas Investment) — reporting through FIRMS portal', sample: true },
  { id: 6, authority: 'cbdt', type: 'Notification', number: 'No. [__]/2026', date: '2026-10-13', title: 'Income-tax (Amendment) Rules — revision of forms for audit reports', sample: true },
  { id: 7, authority: 'dgft', type: 'Notification', number: 'No. [__]/2026-27', date: '2026-10-10', title: 'Amendment in import policy conditions under Schedule-I (Import Policy)', sample: true },
  { id: 8, authority: 'cbic-gst', type: 'Circular', number: 'Circular No. [__]/2026-GST', date: '2026-10-08', title: 'Clarification regarding availment of input tax credit on specified supplies', sample: true },
  { id: 9, authority: 'sebi', type: 'Circular', number: 'SEBI/HO/[__]/2026', date: '2026-10-06', title: 'Ease of doing business — revised timelines for disclosures by listed entities', sample: true },
  { id: 10, authority: 'mca', type: 'General Circular', number: 'General Circular No. [__]/2026', date: '2026-10-03', title: 'Relaxation of additional fees for filing of e-forms for a limited period', sample: true },
  { id: 11, authority: 'cbdt', type: 'Press Release', number: 'Press Release', date: '2026-09-30', title: 'Extension of due date for furnishing audit reports for the assessment year', sample: true },
  { id: 12, authority: 'cbic-gst', type: 'Notification', number: 'No. [__]/2026 – Central Tax (Rate)', date: '2026-09-26', title: 'Seeks to amend rates of tax on specified goods and services', sample: true },
].map((n) => ({ ...n, pdfUrl: '#' }));

export const authorityOf = (id) => AUTHORITIES.find((a) => a.id === id);
