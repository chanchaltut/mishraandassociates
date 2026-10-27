// ═══════════════════════════════════════════════════════════
//  Frequently asked questions — general, per service and global
//  setup. Feeds the /faqs page, each service page and the
//  FAQPage structured data. Defaults for admin → "FAQs"; service
//  FAQs are edited with each service page.
// ═══════════════════════════════════════════════════════════

import { fromContent, hasContent } from '../lib/content.js';
import { FAQS } from './content.js';
import { SERVICES } from './services.js';

export const GLOBAL_FAQS_DEFAULT = [
  { q: 'Which country is best for incorporating a company as an Indian founder?', a: 'It depends on your goal. A Delaware C-Corp suits startups raising US capital; the UAE suits trading and regional services with residence visas; Singapore and Hong Kong are common Asian holding and trading hubs; the UK offers fast setup and credibility with European clients; and a WFOE is needed to operate inside mainland China.' },
  { q: 'Do Indian residents need RBI approval to set up a company abroad?', a: 'Most overseas investments by Indian residents fall under the automatic route, but they must be made through an Authorised Dealer bank with the prescribed ODI filings and annual reporting under FEMA. We handle these filings alongside the overseas incorporation.' },
  { q: 'Can you provide the local director, secretary or registered address?', a: 'Yes. Where a jurisdiction requires a local resident director, company secretary, registered agent or registered office — for example in Singapore, Hong Kong, the USA or the UK — we arrange it through our partner network.' },
  { q: 'How long does international company registration take?', a: 'It ranges from about a day (UK online incorporation) to one to three months (China). Most jurisdictions complete within one to four weeks once KYC documents are ready.' },
];

export const SERVICE_FAQS_DEFAULT = {
  'income-tax': [
    { q: 'Which ITR form should I file?', a: 'ITR-1 is for resident individuals with income up to ₹50 lakh from salary, one house property and other sources. ITR-2 applies if you have capital gains, more than one house property or foreign assets, but no business income. ITR-3 is for business or professional income, and ITR-4 for those opting for presumptive taxation. We confirm the right form after reviewing your AIS.' },
    { q: 'What happens if I miss the ITR due date?', a: 'You can still file a belated return up to 31 December following the financial year, with a late fee of up to ₹5,000 (₹1,000 if total income does not exceed ₹5 lakh) and interest on any tax unpaid. Some losses cannot be carried forward in a belated return. After that window, an updated return (ITR-U) may still be possible on payment of additional tax.' },
    { q: 'Should I choose the old or the new tax regime?', a: 'The new regime is the default and usually works out better unless you claim substantial deductions such as home-loan interest, HRA and 80C investments. Salaried individuals can choose afresh each year while filing; those with business income can switch back only once. We compute both before filing.' },
    { q: 'I have received an income tax notice. Can you help?', a: 'Yes. We review the notice and your records, draft and file the response on the e-proceedings portal, and represent you through assessment if required. Do not ignore a notice — most have strict response deadlines.' },
  ],
  'gst-services': [
    { q: 'When is GST registration mandatory?', a: 'Generally when aggregate turnover exceeds ₹40 lakh for suppliers of goods or ₹20 lakh for service providers, with lower limits in certain special-category states. Registration is compulsory regardless of turnover for inter-state supplies of goods, most e-commerce sellers, and persons liable to pay tax under reverse charge.' },
    { q: 'How long does GST registration take?', a: 'Typically about seven working days from a complete application with Aadhaar authentication. It can take longer if the officer seeks clarification or orders physical verification of the place of business.' },
    { q: 'Which GST returns do I have to file?', a: 'Most regular taxpayers file GSTR-1 (outward supplies) and GSTR-3B (summary and tax payment) monthly, or quarterly under the QRMP scheme if turnover is up to ₹5 crore. The annual return GSTR-9 applies above ₹2 crore turnover, and the reconciliation statement GSTR-9C above ₹5 crore.' },
    { q: 'What if I file GST returns late?', a: 'A late fee is charged for each day of delay, subject to a cap, along with 18% annual interest on tax paid late. Continued non-filing can block e-way bills, restrict your customers’ input tax credit and lead to cancellation of registration.' },
  ],
  'tax-audit': [
    { q: 'Who needs a tax audit?', a: 'Businesses with turnover above ₹1 crore (₹10 crore where cash receipts and cash payments are each within 5% of the total), professionals with gross receipts above ₹50 lakh, and certain taxpayers who declare profits below the presumptive rate.' },
    { q: 'What is the due date for the tax audit report?', a: 'The audit report is generally due by 30 September of the assessment year, one month before the return due date of 31 October for audited taxpayers.' },
    { q: 'What is the penalty for not getting a tax audit done?', a: '0.5% of turnover or gross receipts, or ₹1.5 lakh — whichever is lower — unless there is reasonable cause for the failure.' },
    { q: 'Who can sign a tax audit report?', a: 'Only a practising Chartered Accountant can issue the tax audit report (Form 3CA or 3CB with Form 3CD). We prepare your books, reconciliations and schedules so the audit is completed well before the due date.' },
  ],
  'tds-compliance': [
    { q: 'By when must TDS be deposited?', a: 'By the 7th of the following month. TDS deducted in March can be deposited until 30 April.' },
    { q: 'What are the quarterly TDS return due dates?', a: '31 July, 31 October and 31 January for the first three quarters, and 31 May for the January–March quarter.' },
    { q: 'What happens if TDS returns are filed late?', a: 'A late fee of ₹200 per day applies until the return is filed, capped at the TDS amount. Interest is charged at 1% per month for late deduction and 1.5% per month for late deposit, and a penalty can apply if the return is delayed beyond a year.' },
    { q: 'When must Form 16 and Form 16A be issued?', a: 'Form 16 (salary) must be issued by 15 June after the financial year. Form 16A (non-salary) must be issued within 15 days of the due date of the quarterly TDS return.' },
  ],
  'business-registration': [
    { q: 'Which business structure should I choose?', a: 'A proprietorship is simplest for a single owner. A partnership or LLP suits professionals and small teams, with an LLP adding limited liability. A private limited company is best if you plan to raise investment, issue ESOPs or scale. A One Person Company gives a solo founder limited liability. We recommend a structure after understanding your plans.' },
    { q: 'How long does private limited company registration take?', a: 'Usually 7 to 15 working days through the SPICe+ form, depending on name approval and how quickly documents and digital signatures are ready.' },
    { q: 'Is there a minimum capital requirement?', a: 'No. There is no minimum paid-up capital requirement for a private limited company or an LLP. Capital can be decided based on your business needs.' },
    { q: 'What documents are required?', a: 'PAN and Aadhaar of all directors or partners, address proof, photographs, and proof of the registered office — such as a recent utility bill with a no-objection letter from the owner.' },
  ],
  'roc-compliance': [
    { q: 'What annual filings does a private limited company have?', a: 'Financial statements in Form AOC-4 within 30 days of the AGM, and the annual return in Form MGT-7 or MGT-7A within 60 days of the AGM. The AGM must generally be held by 30 September. Directors must also complete their KYC with the MCA.' },
    { q: 'What is the penalty for late ROC filing?', a: 'An additional fee of ₹100 per day of delay applies for each form, with no upper limit. Persistent non-filing can lead to director disqualification and the company being struck off.' },
    { q: 'Does a company with no business still need to file?', a: 'Yes. Every registered company must file its financial statements and annual return even if it had no transactions. If the company is not in use, applying for dormant status or strike-off may be more economical.' },
    { q: 'What are event-based filings?', a: 'Filings triggered by changes during the year, such as appointing or removing a director (DIR-12), shifting the registered office (INC-22) or allotting shares (PAS-3). Most are due within 30 days of the event.' },
  ],
  'project-reports': [
    { q: 'Who needs a project report?', a: 'Anyone applying for a term loan or working capital limit, government schemes such as PMEGP or Mudra, MSME subsidies, or presenting a business plan to investors.' },
    { q: 'What does a project report include?', a: 'Project cost and means of finance, projected profit and loss, balance sheet and cash flow, DSCR, break-even analysis, key ratios and the assumptions behind them, presented in the format lenders expect.' },
    { q: 'How long does it take to prepare?', a: 'Usually three to five working days once we have your business details, quotations and the loan amount required.' },
    { q: 'Does a project report guarantee loan approval?', a: 'No. Sanction is always the lender’s decision. A realistic, well-supported report does make the assessment smoother and reduces back-and-forth with the bank.' },
  ],
  'ca-certificates': [
    { q: 'Which certificates are commonly required?', a: 'Net worth certificates for visas and tenders, turnover certificates, Form 15CB for foreign remittances, fund utilisation certificates, and certificates required by banks and government departments.' },
    { q: 'Who can issue these certificates?', a: 'They must be issued by a practising Chartered Accountant and carry a UDIN (Unique Document Identification Number), which the recipient can verify on the ICAI portal.' },
    { q: 'How long does it take?', a: 'Usually one to two working days once the supporting documents are received and verified.' },
    { q: 'When is Form 15CB required?', a: 'Form 15CB is a Chartered Accountant’s certificate on the taxability of a payment to a non-resident. It is generally required for taxable remittances exceeding ₹5 lakh in a financial year, before Form 15CA is filed.' },
  ],
  'loan-documentation': [
    { q: 'What documents do banks usually ask for?', a: 'Income tax returns with computation for two to three years, audited or provisional financial statements, GST returns, bank statements, KYC of the business and promoters, and — for working capital — CMA data and stock statements.' },
    { q: 'What is CMA data?', a: 'Credit Monitoring Arrangement data is a set of historical and projected financial statements in the format banks use to assess working capital limits and term loans.' },
    { q: 'Can you help with Mudra or CGTMSE-backed loans?', a: 'Yes. We prepare the project report, financials and supporting documents for these schemes. The sanction decision rests with the bank.' },
    { q: 'How long does documentation take?', a: 'Typically three to seven working days, depending on how up to date your books and returns are.' },
  ],
  'fno-capital-gain': [
    { q: 'Is F&O income taxed as capital gains?', a: 'No. Futures and options trading is treated as non-speculative business income and is reported in ITR-3. Intraday equity trading is speculative business income. Delivery-based share sales are capital gains.' },
    { q: 'Do I need a tax audit for F&O trading?', a: 'An audit is required if your trading turnover — calculated as the total of absolute profits and losses on each trade — exceeds ₹10 crore, or in some cases where you declare a loss or low profit after opting out of presumptive taxation. We compute turnover trade by trade from your broker statements.' },
    { q: 'Can F&O losses be carried forward?', a: 'Yes. Non-speculative business losses can be carried forward for eight years and set off against business income — but only if the return is filed by the due date.' },
    { q: 'How are capital gains on listed shares taxed?', a: 'Short-term gains on listed equity (held up to 12 months) are taxed at 20%. Long-term gains are taxed at 12.5% on the amount exceeding ₹1.25 lakh in a financial year.' },
  ],
  'trademark-registration': [
    { q: 'What is the government fee for a trademark application?', a: 'For e-filing, the IP India fee is ₹4,500 per class for individuals, startups and small enterprises, and ₹9,000 per class for others. Our professional fee is charged separately.' },
    { q: 'Can I use the ™ and ® symbols?', a: 'You can use ™ as soon as the application is filed. The ® symbol can be used only after the mark is registered — using it earlier is an offence under the Trade Marks Act.' },
    { q: 'How long does registration take?', a: 'Filing takes a day or two once documents are ready. If the examiner raises no objection and nobody opposes the mark after it is advertised in the Trade Marks Journal, registration typically follows in about 6 to 18 months.' },
    { q: 'How long is a registered trademark valid?', a: 'Ten years from the date of application, renewable indefinitely for further ten-year periods.' },
  ],
  'iso-certification': [
    { q: 'Who issues the ISO certificate?', a: 'An accredited certification body issues the certificate after its own audit. We prepare your organisation for that audit and coordinate with the certification body — we do not issue certificates ourselves.' },
    { q: 'Which ISO standard do I need?', a: 'ISO 9001 (quality) is the most widely asked for in tenders and supplier onboarding. ISO 14001 covers environmental management, ISO 45001 workplace health and safety, ISO/IEC 27001 information security, and ISO 22000 food safety. We recommend based on your industry and customer requirements.' },
    { q: 'How long is ISO certification valid?', a: 'Certificates are generally valid for three years, with surveillance audits by the certification body in the first and second years, followed by a recertification audit.' },
    { q: 'Does ISO certification help in government tenders?', a: 'Many tenders list ISO 9001 or a sector-specific standard as an eligibility or scoring criterion. Check the tender document — we can help you plan certification well before the bid due date.' },
  ],
  'cha-customs-clearance': [
    { q: 'What is a Custom House Agent (CHA)?', a: 'A CHA — now called a Customs Broker — is licensed under the Customs Brokers Licensing Regulations, 2018 to transact business with Customs on behalf of importers and exporters, including filing Bills of Entry and Shipping Bills on ICEGATE.' },
    { q: 'What documents are needed for import clearance?', a: 'Typically the commercial invoice, packing list, bill of lading or airway bill, IEC, GSTIN, and — depending on the goods — certificate of origin, insurance, licences or product-specific approvals.' },
    { q: 'Do I need an IEC to import or export?', a: 'Yes, an Import Export Code from DGFT is required for most commercial imports and exports. We can obtain it for you before the first shipment.' },
    { q: 'What is an AD code and why is it needed?', a: 'The Authorised Dealer code links your bank account to the port of export. It must be registered at each port you export through so that export proceeds and incentives are credited correctly.' },
  ],
  'accounting-bookkeeping': [
    { q: 'Which accounting software do you work with?', a: 'Tally Prime, Zoho Books and QuickBooks are the most common. We can work in your existing setup or recommend one that suits your volume and reporting needs.' },
    { q: 'How do I share bills and statements with you?', a: 'Through a shared folder, email or WhatsApp — whatever is easiest. Bank feeds can be connected in supported software so statements do not have to be sent manually.' },
    { q: 'Will my books be ready for GST and TDS filings?', a: 'Yes. Bookkeeping is closed on a monthly calendar ahead of GST and TDS due dates, with input-credit and TDS reconciliations done every period.' },
    { q: 'Can you take over books that are behind?', a: 'Yes. We regularly catch up on pending months or years and then move you to a monthly routine.' },
  ],
};

export const TENDER_FAQS_DEFAULT = [
  { q: 'What does the ₹10,000 yearly subscription include?', a: 'Full tender details — tender value, EMD, issuing department, bid dates and document links — plus daily email and WhatsApp alerts for the keywords, sectors and states you choose, and access to tender results.' },
  { q: 'Which tenders do you cover?', a: 'Government and PSU tenders published on central, state and GeM portals across India. You can filter by keyword, state, sector and value.' },
  { q: 'Can you help us bid for a tender?', a: 'Yes. We help with DSC, GeM and e-procurement portal registration, MSME / NSIC registration for EMD exemption, financial documents, CA certificates and bid paperwork.' },
  { q: 'How do I pay for the subscription?', a: 'Submit the subscription form and our team will confirm your alert preferences and share a payment link. Your access is activated as soon as payment is received, and a GST invoice is issued.' },
];

export const TRADEMARK_SEARCH_FAQS_DEFAULT = [
  { q: 'What is a trademark search?', a: 'It checks the IP India register for existing marks that are identical or similar to your proposed brand name, logo or tagline in the classes you want to register in — so you can avoid objections and oppositions later.' },
  { q: 'Is a word search enough?', a: 'Not always. Examiners also look at phonetic similarity (marks that sound alike), similar logos and related classes. Our report covers word, phonetic and class-wise matches.' },
  { q: 'What are the 45 trademark classes?', a: 'Goods are grouped into classes 1 to 34 and services into classes 35 to 45 under the Nice Classification. You need a separate application (or a multi-class application) for each class you want to protect.' },
  { q: 'Does a clear search guarantee registration?', a: 'No search can guarantee registration — the examiner may still raise objections, and third parties can oppose the mark after publication. A careful search significantly reduces that risk.' },
];

export const GLOBAL_FAQS = fromContent('faqs', 'global', GLOBAL_FAQS_DEFAULT);
export const TENDER_FAQS = fromContent('faqs', 'tenders', TENDER_FAQS_DEFAULT);
export const TRADEMARK_SEARCH_FAQS = fromContent('faqs', 'trademark', TRADEMARK_SEARCH_FAQS_DEFAULT);

// Service FAQs are stored on each service page once the admin panel has published them
export const SERVICE_FAQS = hasContent('servicePages')
  ? Object.fromEntries(SERVICES.filter((s) => Array.isArray(s.faqs) && s.faqs.length).map((s) => [s.slug, s.faqs]))
  : SERVICE_FAQS_DEFAULT;

export const FAQ_GROUPS = [
  { id: 'general', title: 'General', items: FAQS },
  { id: 'global-setup', title: 'Global company registration', items: GLOBAL_FAQS },
  ...SERVICES.filter((s) => SERVICE_FAQS[s.slug]).map((s) => ({
    id: s.slug,
    title: s.shortTitle,
    href: `/services/${s.slug}`,
    items: SERVICE_FAQS[s.slug],
  })),
];
