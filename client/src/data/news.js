// ═══════════════════════════════════════════════════════════
//  News & updates — defaults for admin → "News".
//  These are SAMPLE entries for the demo (flagged `sample: true`).
//  They describe recurring compliance events and will be replaced
//  by updates the firm publishes from the admin panel.
// ═══════════════════════════════════════════════════════════

import { fromContent } from '../lib/content.js';
import { byDateDesc } from '../lib/format.js';

export const NEWS_CATEGORIES = ['All', 'Income Tax', 'GST', 'Corporate Law', 'FEMA & RBI', 'International'];

export const NEWS_DEFAULT = [
  {
    slug: 'tds-returns-q2-due-31-october',
    title: 'TDS returns for the July–September quarter are due by 31 October',
    category: 'Income Tax',
    date: '2026-10-24',
    sample: true,
    summary: 'Deductors must file quarterly TDS statements for Q2 by 31 October. Late statements attract a fee for each day of delay and can trigger penalties.',
    body: [
      'Quarterly TDS statements for the second quarter of the financial year (July to September) — Form 24Q for salaries and Form 26Q for other resident payments — fall due on 31 October.',
      '**What to check before filing**\nReconcile challans with deductions, verify PAN of every deductee, and confirm that lower-deduction certificates are reflected correctly. Mismatches lead to defaults on TRACES and short-credit complaints from deductees.',
      '**After filing**\nDownload the justification report once the statement is processed and issue Form 16A to vendors within the prescribed time.',
    ],
  },
  {
    slug: 'company-annual-filings-aoc-4-mgt-7',
    title: 'Company annual filing season: AOC-4 and MGT-7 timelines',
    category: 'Corporate Law',
    date: '2026-10-21',
    sample: true,
    summary: 'Companies that held their AGM by 30 September must file financial statements within 30 days and the annual return within 60 days of the meeting.',
    body: [
      'For most companies, the annual general meeting for the previous financial year is held by 30 September. Two key ROC filings follow: Form AOC-4 (financial statements) within 30 days of the AGM, and Form MGT-7 or MGT-7A (annual return) within 60 days.',
      '**Additional fees for delay**\nLate filings attract additional fees for each day of delay, and continued default can lead to the company and its directors being marked as non-compliant.',
      '**Our suggestion**\nKeep signed financial statements, the auditor’s report and the board’s report ready immediately after the AGM so that both forms can be filed together.',
    ],
  },
  {
    slug: 'gstr-9-annual-return-reconciliation',
    title: 'GSTR-9 and GSTR-9C for FY 2025-26: start reconciliations early',
    category: 'GST',
    date: '2026-10-17',
    sample: true,
    summary: 'The annual return and reconciliation statement are due by 31 December. Reconciling books, GSTR-1, GSTR-3B and GSTR-2B now avoids last-minute surprises.',
    body: [
      'The GST annual return (GSTR-9) and, where applicable, the reconciliation statement (GSTR-9C) for FY 2025-26 are due by 31 December 2026, unless extended.',
      '**What to reconcile**\nCompare turnover in books with GSTR-1 and GSTR-3B, match input tax credit with GSTR-2B, and identify ITC to be reversed. Differences found now can still be corrected in the current period’s returns.',
    ],
  },
  {
    slug: 'advance-tax-third-instalment-15-december',
    title: 'Advance tax: third instalment due on 15 December',
    category: 'Income Tax',
    date: '2026-10-14',
    sample: true,
    summary: 'Taxpayers liable to advance tax should have paid 75% of their estimated liability by 15 December to avoid interest.',
    body: [
      'Advance tax is payable in instalments through the year. By 15 December, cumulative payments should reach 75% of the estimated tax liability for the year.',
      '**Who should review now**\nBusinesses with uneven income, professionals, investors with large capital gains and salaried individuals with substantial other income should revisit their estimates before the due date.',
    ],
  },
  {
    slug: 'uk-companies-house-identity-verification',
    title: 'UK: identity verification now part of Companies House filings',
    category: 'International',
    date: '2026-10-10',
    sample: true,
    summary: 'Directors and persons with significant control of UK companies must verify their identity with Companies House — including overseas founders.',
    body: [
      'Under the UK’s corporate transparency reforms, directors and people with significant control (PSCs) are required to verify their identity with Companies House.',
      '**What this means for Indian founders**\nIf you are incorporating a UK company or are already a director of one, plan identity verification into your timeline. We coordinate the process as part of UK incorporation and annual compliance.',
    ],
  },
  {
    slug: 'uae-corporate-tax-registration-new-companies',
    title: 'UAE corporate tax: registration reminders for newly licensed companies',
    category: 'International',
    date: '2026-10-06',
    sample: true,
    summary: 'New UAE companies — including free zone entities — must register for corporate tax within the prescribed time after licensing.',
    body: [
      'The UAE corporate tax regime applies to mainland and free zone companies alike. Newly incorporated entities should register for corporate tax within the time allowed after obtaining their licence, even if they expect to qualify for the 0% rate.',
      '**Free zone companies**\nAccess to the 0% rate on qualifying income depends on meeting substance and other conditions, so record-keeping from day one matters.',
    ],
  },
  {
    slug: 'odi-annual-performance-report-reminder',
    title: 'ODI: annual reporting for Indian investors in foreign companies',
    category: 'FEMA & RBI',
    date: '2026-10-02',
    sample: true,
    summary: 'Indian residents holding overseas investments must file annual reports through their AD bank based on the foreign entity’s audited accounts.',
    body: [
      'Indian residents who have made an overseas direct investment must submit an Annual Performance Report for each foreign entity through their Authorised Dealer bank, based on the foreign entity’s financial statements.',
      '**Avoiding late fees**\nDelays attract late submission fees and can restrict further overseas investment until regularised. Align the foreign entity’s accounting calendar with this reporting from the outset.',
    ],
  },
  {
    slug: 'delaware-franchise-tax-planning',
    title: 'Delaware corporations: plan ahead for the 1 March franchise tax deadline',
    category: 'International',
    date: '2026-09-28',
    sample: true,
    summary: 'Delaware corporations must file an annual report and pay franchise tax by 1 March. The calculation method chosen can change the amount significantly.',
    body: [
      'Delaware corporations file an annual franchise tax report and pay franchise tax by 1 March each year. Startups with a large number of authorised shares should compare calculation methods, as the default method can produce an unexpectedly high figure.',
      '**Related India-side filings**\nIndian resident shareholders should also keep their ODI annual reporting aligned with the company’s financial year.',
    ],
  },
];

export const NEWS = byDateDesc(fromContent('news', 'items', NEWS_DEFAULT));

export const getNews = (slug) => NEWS.find((n) => n.slug === slug);
