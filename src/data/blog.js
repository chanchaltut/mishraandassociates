// ═══════════════════════════════════════════════════════════
//  Blog posts — defaults for admin → "Blog".
//  Body paragraphs support **bold** lead-ins and \n line breaks.
// ═══════════════════════════════════════════════════════════

import { fromContent } from '../lib/content.js';
import { byDateDesc } from '../lib/format.js';

export const BLOG_POSTS_DEFAULT = [
  {
    "slug": "incorporating-abroad-indian-founders-fema-guide",
    "title": "Incorporating Abroad as an Indian Founder: Choosing a Jurisdiction and Staying FEMA-Compliant",
    "category": "Global Setup",
    "date": "2026-10-20",
    "author": "Mishra and Associates Editorial Team",
    "readTime": "7 min read",
    "image": "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=800&q=80",
    "excerpt": "USA, UAE, Singapore, Hong Kong, China or the UK? How Indian founders should compare jurisdictions — and the India-side overseas investment filings that most people forget.",
    "content": [
      "More Indian founders now operate through an overseas company — to sell to global customers, raise foreign capital or hold intellectual property. Choosing the jurisdiction is only half the work. The other half is staying compliant in India, where the investment originates.",
      "**Start with the business reason**\nPick the jurisdiction that matches what the company will actually do. A Delaware C-Corporation is the default for startups planning to raise US venture capital. The UAE suits trading and regional service businesses that want a Gulf base and residence visas. Singapore and Hong Kong are common regional holding and trading hubs in Asia. A UK limited company gives credibility with European clients. A Chinese WFOE is needed when you must invoice, hire and operate inside mainland China.",
      "**Compare the practical requirements**\nCheck whether a local resident director is required (Singapore: yes; USA, UK and Hong Kong: no, though Hong Kong needs a local company secretary), how long formation takes, whether an audit is mandatory every year (for example, Hong Kong), and how the company will open a bank account. These factors often matter more than the headline tax rate.",
      "**Tax: look at both ends**\nThe overseas corporate tax rate is only one part of the picture. Consider how profits will reach you in India — dividends, salary or service fees — and how India taxes them, including the effect of the tax treaty with that country. If the company is effectively managed from India, Indian tax residence rules may apply to it as well.",
      "**The India side: overseas investment rules under FEMA**\nWhen an Indian resident invests in a foreign company, the investment must comply with the overseas investment framework under FEMA. In practice, this means routing the investment through your Authorised Dealer (AD) bank, making the prescribed filing so that a Unique Identification Number is allotted, and filing annual reports for as long as you hold the investment. Individuals investing under the Liberalised Remittance Scheme must also stay within the permitted annual limit.",
      "**Common mistakes we see**\nPaying incorporation costs or capital from a personal account without the required filings; holding shares in a foreign company that itself has subsidiaries without checking whether that structure is permitted for resident individuals; and missing annual reporting after the first year. Late filings can usually be regularised, but it costs time and late-submission fees.",
      "**Our recommendation:** Decide the jurisdiction with your two-to-three-year plan in mind, then set up both sides together — overseas incorporation and India-side reporting. We handle both, so your structure is compliant from day one."
    ]
  },
  {
    "slug": "how-to-file-itr-online-salaried-guide",
    "title": "How to File ITR Online in 2025: A Complete Guide for Salaried Employees",
    "category": "Income Tax",
    "date": "2025-09-15",
    "author": "Mishra and Associates Editorial Team",
    "readTime": "6 min read",
    "image": "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&q=80",
    "excerpt": "Every salaried person earning above ₹4 lakh (new regime, FY 2025-26) must file an ITR. Here is exactly how to do it step by step, which form to pick, and the most common mistakes to avoid.",
    "content": [
      "Filing your Income Tax Return (ITR) online doesn't have to be stressful. With a bit of preparation and the right guidance, most salaried employees can get it done in under an hour. Here's a simple, plain-English walkthrough of the entire process.",
      "**Who must file ITR?**\nIf your gross income exceeds ₹4 lakh under the new tax regime for FY 2025-26 (or ₹2.5 lakh under the old regime), you are legally required to file an ITR — even if no tax is owed. Additionally, if you have foreign assets, multiple sources of income, or want to carry forward a capital loss, filing is mandatory regardless of income.",
      "**Which ITR form should you use?**\nFor most salaried employees with one employer, one house property, and no business income, ITR-1 (Sahaj) is the right form. If you have capital gains from stocks or mutual funds, you'll need ITR-2. Freelancers and consultants earning professional income should file ITR-3 or ITR-4 (Sugam).",
      "**Documents you'll need**\nBefore you start, keep these ready: your Form 16 from your employer, AIS (Annual Information Statement) from the income tax portal, bank statements, investment proofs under Section 80C (LIC, PPF, ELSS), 80D (health insurance premiums), home loan interest certificate, and your PAN and Aadhaar.",
      "**Step-by-step filing process**\nVisit incometax.gov.in and log in with your PAN. Go to e-File → Income Tax Returns → File Income Tax Return. Select Assessment Year 2025-26 and choose Online mode. Select the appropriate ITR form. The portal pre-fills most of your data — verify it against your Form 16 and AIS carefully. Enter your deductions, compute tax, verify using Aadhaar OTP or Net Banking, and submit. You'll receive an acknowledgment (ITR-V) in your email within minutes.",
      "**Deadlines and penalties**\nThe usual last date is July 31 for individuals. Filing after this attracts a late fee of ₹1,000 (if income ≤ ₹5 lakh) or ₹5,000. More importantly, late filing means you cannot carry forward losses from stocks or business, and you may face interest under Section 234A.",
      "**Pro tip:** Always download and cross-check your AIS before filing. Many clients get notices simply because they forgot to report a fixed deposit interest or mutual fund redemption that already appears in the AIS.",
      "If you have capital gains, NRI income, foreign assets, or received a tax notice — it's best to get professional help. The cost of getting it wrong is always higher than the professional fees."
    ]
  },
  {
    "slug": "gst-registration-india-threshold-limits",
    "title": "GST Registration in India 2025: Who Needs It, Threshold Limits & How to Apply",
    "category": "GST",
    "date": "2025-09-08",
    "author": "Mishra and Associates Editorial Team",
    "readTime": "5 min read",
    "image": "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80",
    "excerpt": "If your business turnover crosses ₹40 lakh (goods) or ₹20 lakh (services), GST registration is mandatory. Here is everything you need to know before applying.",
    "content": [
      "GST registration is not just a legal requirement — it's actually a business advantage if you're dealing with other registered businesses. Let's break down who needs it, what the thresholds are, and what the process looks like.",
      "**Threshold limits for GST registration**\nFor businesses selling goods: ₹40 lakh annual turnover (₹20 lakh in some states like Manipur, Mizoram, Tripura, Nagaland). For service providers: ₹20 lakh turnover. Special category states have lower thresholds of ₹10 lakh for services. These are aggregate turnover limits — that means all your India-wide sales combined.",
      "**Cases where registration is mandatory regardless of turnover**\nEven if you earn below the threshold, you must register if you: sell goods inter-state (across state borders), sell through e-commerce platforms like Amazon or Flipkart, are an e-commerce operator, need to pay GST under reverse charge mechanism, or are a non-resident taxable person operating in India.",
      "**Documents required for GST registration**\nFor proprietorships: PAN card, Aadhaar card, bank account statement, photograph, and proof of principal place of business (electricity bill or rent agreement). For companies: certificate of incorporation, MoA/AoA, board resolution, director's PAN & Aadhaar, and bank statement.",
      "**The registration process**\nVisit gst.gov.in and fill Form GST REG-01 with your business details, bank account info, and upload documents. You'll receive an Application Reference Number (ARN) by SMS and email. After verification (usually 3-7 working days), your GSTIN is issued. If the GST officer raises queries, respond via the portal within 7 working days or the application gets rejected.",
      "**Benefits of being GST registered**\nYou can charge GST on your invoices and claim Input Tax Credit (ITC) on your business purchases — which directly reduces your cost. It also makes you a credible business partner for other registered companies that need tax invoices from their suppliers.",
      "**Important:** Doing business without GST registration when you're liable is an offence. The penalty is ₹10,000 or the amount of tax evaded — whichever is higher. If the GST department detects it, you'll also owe all the back taxes with interest."
    ]
  },
  {
    "slug": "old-vs-new-tax-regime-comparison",
    "title": "Old Tax Regime vs New Tax Regime 2025: Which One Saves You More Money?",
    "category": "Income Tax",
    "date": "2025-08-28",
    "author": "Mishra and Associates Editorial Team",
    "readTime": "7 min read",
    "image": "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80",
    "excerpt": "The government made the new tax regime the default in 2023. But that doesn't mean it's better for everyone. Here's a straightforward comparison with real numbers to help you decide.",
    "content": [
      "Every year, one of the most common questions we get is: \"Which tax regime should I choose?\" The answer depends on your income level, how many deductions you can claim, and your lifestyle. Let's lay out the facts.",
      "**Tax slabs comparison for FY 2025-26**\n\nOld Regime: Up to ₹2.5L — Nil | ₹2.5L-₹5L — 5% | ₹5L-₹10L — 20% | Above ₹10L — 30%\n\nNew Regime (Default): Up to ₹4L — Nil | ₹4L-₹8L — 5% | ₹8L-₹12L — 10% | ₹12L-₹16L — 15% | ₹16L-₹20L — 20% | ₹20L-₹24L — 25% | Above ₹24L — 30%\n\nUnder the new regime, the Section 87A rebate makes tax nil if taxable income is up to ₹12 lakh, and salaried individuals also get a ₹75,000 standard deduction — so salary up to ₹12.75 lakh effectively attracts no tax.",
      "**Who benefits from the old regime?**\nThe old regime is better if you have significant deductions: HRA (House Rent Allowance) for rent-paying employees, ₹1.5 lakh under Section 80C (LIC, PPF, ELSS, home loan principal), home loan interest (up to ₹2 lakh under Section 24b), health insurance under Section 80D, and NPS contribution under Section 80CCD.",
      "**A quick example:** A salaried employee earning ₹20 lakh claims ₹1.5L (80C) + ₹3L (HRA) + ₹2L (home-loan interest) + ₹25K (80D), plus the ₹50,000 standard deduction — ₹7.25L in total. Taxable income under the old regime is ₹12.75L and tax (with cess) is about ₹2,02,800. Under the new regime, taxable income after the ₹75,000 standard deduction is ₹19.25L and tax is about ₹1,92,400. Even with heavy deductions, the new regime is slightly cheaper here — which is why you should always run both numbers.",
      "**Who benefits from the new regime?**\nIf you have minimal deductions, are renting informally (no formal HRA), have no home loan, or your investments are small — the new regime's simpler slabs often work out better. For a salaried person earning up to ₹12.75 lakh, the tax is nil under the new regime thanks to the Section 87A rebate and the ₹75,000 standard deduction.",
      "**The default trap:** From FY 2023-24, the new regime became the default. If you don't explicitly choose the old regime, you'll automatically be put in the new one. To choose the old regime, you must file Form 10-IEA (for business income) or select it when filing your ITR.",
      "**Our advice:** Do a rough calculation both ways before filing. After the FY 2025-26 changes, the new regime is cheaper for most taxpayers. The old regime still makes sense mainly when deductions are very large — typically high HRA plus home-loan interest plus full 80C and 80D claims. When in doubt, consult a qualified professional — the right choice can save you tens of thousands of rupees."
    ]
  },
  {
    "slug": "tds-rates-thresholds-filing-guide",
    "title": "TDS on Salary, Rent & Professional Fees: Rates, Thresholds & Filing Guide 2025",
    "category": "TDS",
    "date": "2025-08-15",
    "author": "Mishra and Associates Editorial Team",
    "readTime": "6 min read",
    "image": "https://images.unsplash.com/photo-1543286386-713bdd548da4?w=800&q=80",
    "excerpt": "If you're paying salary, rent above ₹50,000/month, or professional fees above ₹50,000 — you're probably required to deduct TDS. Here's a complete guide to the rates, due dates, and filing process.",
    "content": [
      "Tax Deducted at Source (TDS) is a mechanism where the payer deducts tax before making a payment and deposits it with the government. It's not optional — failing to deduct or deposit TDS on time leads to penalties, disallowed business expenses, and interest charges.",
      "**Common TDS sections and rates:**\n\nSection 192 — Salary: Rate based on the employee's applicable income tax slab (no fixed rate). Threshold: No minimum; deduct if annual salary exceeds basic exemption limit.\n\nSection 194C — Contractor/Sub-contractor payments: 1% (individual/HUF) or 2% (others). Single payment threshold: ₹30,000; annual aggregate: ₹1 lakh.\n\nSection 194J — Professional/Technical fees: 10% for professional fees (2% for technical services). Threshold: ₹50,000 in a financial year (from 1 April 2025).\n\nSection 194I — Rent: 10% for land/building; 2% for machinery. Threshold: ₹50,000 per month.\n\nSection 194Q — Purchase of goods: 0.1% if buyer's annual turnover > ₹10 crore. Threshold: Purchase > ₹50 lakh from one seller.",
      "**When to deduct and deposit TDS**\nDeduct TDS at the time of payment or at the time of credit — whichever is earlier. Deposit to the government by the 7th of the following month (except March, where the deadline is April 30). For government deductors, it's the same day of deduction.",
      "**Quarterly TDS returns**\nYou must file quarterly TDS returns: 24Q for salary, 26Q for non-salary payments to residents, 27Q for payments to non-residents, 27EQ for TCS. Due dates: Q1 (Apr-Jun) → July 31 | Q2 (Jul-Sep) → October 31 | Q3 (Oct-Dec) → January 31 | Q4 (Jan-Mar) → May 31.",
      "**Form 16 and 16A**\nAfter filing quarterly returns, you must issue Form 16 (for employees) and Form 16A (for others) showing the TDS deducted and deposited on their behalf. Employees use this to file their ITR. Failure to issue Form 16 on time attracts ₹100 per day penalty.",
      "**What happens if you don't deduct TDS?**\n30% of the expense is disallowed (100% for payments to non-residents) — meaning you can't claim it as a business deduction until the TDS is paid. You also owe interest at 1% per month (failure to deduct) or 1.5% per month (failure to deposit), plus a penalty of ₹10,000 to ₹1 lakh under Section 271H. The income tax department does scrutiny assessments specifically for TDS defaults, especially on rent and contractor payments.",
      "TDS compliance might seem tedious, but it's one of the areas where businesses get caught most often. Keeping a simple TDS calendar and working with a qualified professional for quarterly filing is the smartest investment for any business paying more than a few lakh rupees a year."
    ]
  },
  {
    "slug": "income-tax-notice-what-to-do",
    "title": "Received an Income Tax Notice? Here's Exactly What to Do",
    "category": "Income Tax",
    "date": "2025-08-05",
    "author": "Mishra and Associates Editorial Team",
    "readTime": "5 min read",
    "image": "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&q=80",
    "excerpt": "Getting an income tax notice is scary — but it's not always a big deal. Most notices are informational or routine. Here's how to understand which notice you got and how to respond correctly.",
    "content": [
      "Every year, millions of taxpayers receive income tax notices. Most people panic — but the reality is that a significant portion of these notices are automated, routine, and can be resolved easily if you respond correctly and on time.",
      "**The most common types of income tax notices:**\n\nIntimation u/s 143(1): This is the most common. It's an automated communication after your ITR is processed. It may show a demand (tax payable) or a refund. Common reasons: mismatch between your ITR and Form 26AS, incorrect computation, or deductions not matching. This is NOT a scrutiny notice. You can respond online.",
      "Notice u/s 139(9): Sent when your ITR has a defect — like selecting the wrong form, a field that doesn't add up, or missing a mandatory schedule. You have 15 days to correct and re-file.",
      "Notice u/s 148/148A: Sent when the IT department believes income has escaped assessment (i.e., you earned income and didn't declare it). This is a serious notice. Always get professional help here.",
      "Notice u/s 143(2): Scrutiny notice. The department wants to verify specific claims in your return. This triggers a full assessment proceeding and requires detailed documentation.",
      "**What to do immediately after receiving a notice:**\nDon't ignore it — there are strict response deadlines. Log in to incometax.gov.in and find the notice under \"Pending Actions\" or \"e-Proceedings\". Read it carefully to understand the specific reason. Gather your relevant documents — bank statements, investment proofs, AIS, Form 16. If it's a simple mismatch, you can respond directly online. For anything beyond a 143(1) intimation, consult a qualified professional.",
      "**Documents to always keep ready:**\nSave your ITR acknowledgment (ITR-V) for at least 6 years. Keep Form 26AS / AIS printouts for the year. Retain investment receipts, rent agreements, loan certificates, and salary slips. Anything you claimed as a deduction or exemption should have supporting documentation.",
      "**Never miss the deadline.** Most notices give you 15-30 days to respond. Missing the deadline converts a simple issue into a contested assessment. If you're unsure about a notice, the safest approach is to call your professional the same day you receive it — most issues are sorted within a week when handled promptly."
    ]
  },
  {
    "slug": "gstr-1-gstr-3b-gstr-9-explained",
    "title": "GSTR-1, GSTR-3B & GSTR-9: Which GST Return Do You Need to File?",
    "category": "GST",
    "date": "2025-07-25",
    "author": "Mishra and Associates Editorial Team",
    "readTime": "5 min read",
    "image": "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80&sat=-100",
    "excerpt": "GST compliance involves multiple returns with different due dates. If you're confused about which return to file when, this guide breaks it down in simple terms with actual due dates.",
    "content": [
      "If you're newly registered under GST, the compliance calendar can feel overwhelming. GSTR-1, GSTR-3B, GSTR-9... what is each one, and when is it due? Let's cut through the confusion.",
      "**GSTR-1 — Outward Supply Statement**\nThis is where you declare all your sales (outward supplies) for the month or quarter. Include B2B invoices, B2C sales, credit notes, debit notes, and export invoices. Your customers see your GSTR-1 in their GSTR-2A/2B to claim Input Tax Credit (ITC). Getting GSTR-1 right is critical — mistakes here mean your customer can't claim ITC, which damages your business relationships.\n\nDue date: 11th of the following month (monthly filers) or 13th after the end of the quarter (QRMP scheme filers with turnover < ₹5 crore).",
      "**GSTR-3B — Monthly Summary Return**\nThis is a self-declared summary return where you report total outward supplies, total ITC claimed, and pay the GST payable. You must pay the tax liability by the due date even if your full GSTR-1 isn't ready. Think of it as the payment return.\n\nDue date: 20th of the following month (large taxpayers) or 22nd/24th of the following month (smaller states vs. other states, for quarterly filers).",
      "**GSTR-9 — Annual Return**\nFiled once a year, GSTR-9 consolidates all your monthly returns for the financial year. It reconciles your outward supplies and ITC — any differences from your monthly returns need to be explained. Mandatory for taxpayers with annual turnover > ₹2 crore. Optional for those below ₹2 crore.\n\nDue date: December 31 of the following financial year.",
      "**GSTR-2A and GSTR-2B — ITC Tracking**\nThese are not returns you file — they're auto-generated statements showing you the ITC available based on your suppliers' GSTR-1 filings. GSTR-2A is dynamic (updates as suppliers file). GSTR-2B is static (generated on the 14th of each month and doesn't change). Most professional firms now use GSTR-2B for reconciliation as it's more reliable.",
      "**Common GST compliance mistakes:**\nNot filing GSTR-1 on time (your buyers can't claim ITC), claiming more ITC than what appears in GSTR-2B, not reversing ITC on exempt supplies or personal-use goods, forgetting reverse charge liability (RCM), and missing the annual return deadline.",
      "**Late fees:** ₹50/day (₹25 CGST + ₹25 SGST) for delays in GSTR-1 and GSTR-3B, capped between ₹2,000 and ₹10,000 per return depending on turnover. For nil returns, the late fee is ₹20/day. Interest on tax liability: 18% per annum from the due date of GSTR-3B.",
      "GST compliance is genuinely manageable when you have a system. Most businesses benefit from outsourcing their monthly GST filing to a professional — it's typically priced between ₹500-₹2,000/month depending on transaction volume, which is far less than a late fee or a notice."
    ]
  },
  {
    "slug": "proprietorship-vs-private-limited-vs-llp",
    "title": "Sole Proprietorship vs Private Limited Company vs LLP: Which Business Structure Should You Choose?",
    "category": "Business Registration",
    "date": "2025-07-10",
    "author": "Mishra and Associates Editorial Team",
    "readTime": "8 min read",
    "image": "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
    "excerpt": "Choosing the right business structure at the start saves you years of headache later. Here's a no-fluff comparison of the three most popular options for Indian businesses.",
    "content": [
      "One of the first decisions every new business owner faces is: what structure should I register under? Each option has different tax implications, compliance requirements, liability protection, and future fundraising potential. Here's a practical breakdown.",
      "**Sole Proprietorship**\nThe simplest structure — your business and you are legally the same entity. No formal registration required (though you may need GST, FSSAI, or Shop & Establishment registration depending on your business). Perfect for freelancers, small traders, local shops, and service providers just starting out.\n\nAdvantages: Zero setup cost, minimal compliance, all profit is yours. Disadvantages: Unlimited personal liability (your personal assets can be attached if there's a business debt), limited access to bank credit, no legal separation between you and the business.",
      "**Private Limited Company (Pvt Ltd)**\nThe most credible and investor-friendly structure. A separate legal entity from its shareholders — your personal assets are protected (limited liability). Minimum 2 directors and 2 shareholders (can be the same people).\n\nAdvantages: Limited liability, easy to raise funding, high credibility with clients and vendors, can issue ESOPs, best for B2B businesses. Disadvantages: Higher compliance cost (ROC filings, statutory audit mandatory, MCA forms), minimum ₹15,000-₹20,000/year in compliance costs, more paperwork to close or exit.",
      "**Limited Liability Partnership (LLP)**\nThe best of both worlds for professional service firms (professional firms, consultants, architects). Partners have limited liability, but compliance is lighter than a Pvt Ltd. Minimum 2 partners.\n\nAdvantages: Limited liability, flexible profit sharing, no mandatory statutory audit (below ₹40L turnover), lighter compliance than Pvt Ltd. Disadvantages: Cannot issue equity shares (can't raise venture capital), less preferred by investors.",
      "**Which one should you choose?**\n\nChoose Sole Proprietorship if: You're just starting, turnover is under ₹40 lakh, you have no partners, and you want zero compliance burden.\n\nChoose LLP if: You're in a professional service business (consulting, accounting, architecture), have 2+ partners, and want liability protection without heavy compliance.\n\nChoose Private Limited if: You're a startup seeking investment, you need high credibility with large clients (especially corporates or government), you plan to hire employees on a large scale, or you want to list on a stock exchange someday.",
      "**Tax comparison:**\nSole Proprietorship: Taxed at individual slab rates (up to 30%). LLP: Taxed at 30% flat (plus AMT provisions). Private Limited: Taxed at 25% (if turnover < ₹400 crore) or 22% (new concessional regime under 115BAA, but surrenders exemptions).",
      "**Our practical observation:** Most small businesses start as proprietorships and convert to Pvt Ltd when they either cross ₹1 crore turnover or start dealing with corporate clients. The conversion itself is a simple process. Don't over-engineer your structure at the start — get the basics right first."
    ]
  },
  {
    "slug": "gst-for-freelancers-consultants-india",
    "title": "GST for Freelancers & Consultants in India: Everything You Need to Know",
    "category": "GST",
    "date": "2025-06-20",
    "author": "Mishra and Associates Editorial Team",
    "readTime": "6 min read",
    "image": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    "excerpt": "Are you a freelancer or consultant? Here's whether you need GST registration, how to raise compliant invoices, and what to do about clients who pay you from abroad.",
    "content": [
      "Freelancers and independent consultants are one of the fastest-growing segments in India's workforce — but GST compliance for them is often misunderstood. Let's set the record straight.",
      "**Does a freelancer need GST registration?**\nIf your annual income from services exceeds ₹20 lakh (₹10 lakh in some states), you must register for GST. Registration is also compulsory in specified cases regardless of turnover — for example, if you sell through an e-commerce operator that collects tax at source or are liable under reverse charge. Many freelancers also register voluntarily, to claim ITC on business expenses (laptop, software, etc.) or because clients insist on GST invoices.",
      "**What rate of GST applies?**\nMost professional services (IT services, content writing, marketing, design, etc.) attract 18% GST. If you're registered, you must add 18% GST to every invoice for Indian clients and deposit it with the government after claiming ITC on your expenses.",
      "**Export of services — zero-rated supply**\nGood news for freelancers working with overseas clients: services exported to foreign clients (where payment is received in foreign currency) are treated as zero-rated exports. This means no GST is charged on such invoices. You need to file a LUT (Letter of Undertaking) with the GST department before invoicing foreign clients, and you can claim refund of ITC on your business inputs.",
      "**How to raise a compliant GST invoice?**\nEvery GST invoice must include: your firm's name, GSTIN, address, invoice number and date, client name and GSTIN (for B2B), description of service, HSN/SAC code, taxable value, GST rate (CGST + SGST or IGST), and total amount. Missing any of these elements makes it a non-compliant invoice.",
      "**Input Tax Credit — what you can claim**\nIf you're GST-registered, you can claim ITC on business expenses: your laptop, software subscriptions, internet connection, co-working space rent, stationery, etc. This effectively reduces your GST liability — you pay only the net GST (output tax minus input tax credit).",
      "**Reverse Charge Mechanism (RCM)**\nSome services trigger RCM — where the recipient (not the supplier) pays GST. Common examples are legal services from advocates and goods transport agency services. If you are registered, check whether any of the services you receive fall within the notified RCM list — this is a common area of non-compliance for consultants.",
      "**Our recommendation:** If you're a freelancer earning between ₹15-30 lakh per year and working with a mix of Indian and foreign clients, a GST-registered setup with quarterly filings managed by a qualified professional is the most tax-efficient approach. The ITC alone often offsets 80-90% of your GST burden."
    ]
  }
];

export const BLOG_POSTS = byDateDesc(fromContent('blog', 'posts', BLOG_POSTS_DEFAULT));

export const BLOG_CATEGORIES = ['All', ...new Set(BLOG_POSTS.map((p) => p.category))];

export const getPost = (slug) => BLOG_POSTS.find((p) => p.slug === slug);
