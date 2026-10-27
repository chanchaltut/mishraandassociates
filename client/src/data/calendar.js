// ═══════════════════════════════════════════════════════════
//  Compliance calendar — statutory default due dates (India).
//  Dates are generated relative to today so the widget never goes stale.
//  Government extensions are added from admin → "Compliance calendar"
//  (extra dates, or hiding a standard date by its title).
// ═══════════════════════════════════════════════════════════

import { fromContent } from '../lib/content.js';

export const CALENDAR_CATEGORIES = ['All', 'Income Tax', 'GST', 'Payroll', 'Corporate'];

const QUARTER_FOLLOW_MONTHS = [0, 3, 6, 9]; // Jan, Apr, Jul, Oct

// Recurring every month: [day, title, category, appliesTo(month) => bool]
const MONTHLY = [
  [7, 'TDS / TCS deposit for the previous month', 'Income Tax', (m) => m !== 3],
  [10, 'GSTR-7 & GSTR-8 — GST TDS / TCS returns', 'GST', () => true],
  [11, 'GSTR-1 — monthly filers', 'GST', () => true],
  [13, 'GSTR-1 — quarterly (QRMP) filers', 'GST', (m) => QUARTER_FOLLOW_MONTHS.includes(m)],
  [13, 'IFF — invoice furnishing for QRMP filers (optional)', 'GST', (m) => !QUARTER_FOLLOW_MONTHS.includes(m)],
  [15, 'PF & ESIC contributions for the previous month', 'Payroll', () => true],
  [20, 'GSTR-3B — monthly filers', 'GST', () => true],
  [22, 'GSTR-3B — quarterly (QRMP) filers (22nd / 24th by state)', 'GST', (m) => QUARTER_FOLLOW_MONTHS.includes(m)],
  [25, 'PMT-06 — monthly GST payment by QRMP filers', 'GST', (m) => !QUARTER_FOLLOW_MONTHS.includes(m)],
];

// Annual: [monthIndex, day, title, category]
const ANNUAL = [
  [0, 15, 'TCS return — Q3 (Form 27EQ)', 'Income Tax'],
  [0, 31, 'TDS returns — Q3 (Forms 24Q / 26Q)', 'Income Tax'],
  [2, 15, 'Advance tax — 4th instalment (100%)', 'Income Tax'],
  [3, 30, 'TDS deposit for March', 'Income Tax'],
  [4, 15, 'TCS return — Q4 (Form 27EQ)', 'Income Tax'],
  [4, 30, 'LLP Form 11 — annual return', 'Corporate'],
  [4, 31, 'TDS returns — Q4 (Forms 24Q / 26Q)', 'Income Tax'],
  [5, 15, 'Advance tax — 1st instalment (15%)', 'Income Tax'],
  [5, 15, 'Form 16 to be issued to employees', 'Payroll'],
  [6, 15, 'TCS return — Q1 (Form 27EQ)', 'Income Tax'],
  [6, 31, 'TDS returns — Q1 (Forms 24Q / 26Q)', 'Income Tax'],
  [6, 31, 'ITR — individuals and non-audit cases', 'Income Tax'],
  [8, 15, 'Advance tax — 2nd instalment (45%)', 'Income Tax'],
  [8, 30, 'Tax audit report', 'Income Tax'],
  [8, 30, 'DIR-3 KYC for directors', 'Corporate'],
  [8, 30, 'Annual general meeting — companies', 'Corporate'],
  [9, 15, 'TCS return — Q2 (Form 27EQ)', 'Income Tax'],
  [9, 30, 'AOC-4 — financial statements (30 days from AGM)', 'Corporate'],
  [9, 30, 'LLP Form 8 — statement of accounts & solvency', 'Corporate'],
  [9, 31, 'TDS returns — Q2 (Forms 24Q / 26Q)', 'Income Tax'],
  [9, 31, 'ITR — audit cases', 'Income Tax'],
  [10, 29, 'MGT-7 / MGT-7A — annual return (60 days from AGM)', 'Corporate'],
  [10, 30, 'ITR — transfer pricing cases', 'Income Tax'],
  [11, 15, 'Advance tax — 3rd instalment (75%)', 'Income Tax'],
  [11, 31, 'GSTR-9 / GSTR-9C — GST annual return', 'GST'],
];

const startOfDay = (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate());

const CUSTOM = fromContent('calendar', 'custom', [{ date: '', title: '', category: '' }]).filter((c) => c.title && !Number.isNaN(Date.parse(c.date)));
const HIDDEN = new Set(fromContent('calendar', 'hidden', ['']).map((t) => t.trim().toLowerCase()).filter(Boolean));

export function getDueDates(from = new Date(), monthsAhead = 3) {
  const today = startOfDay(from);
  const until = new Date(today.getFullYear(), today.getMonth() + monthsAhead, 1);
  const items = [];
  for (let i = 0; i < monthsAhead; i++) {
    const year = today.getFullYear() + Math.floor((today.getMonth() + i) / 12);
    const month = (today.getMonth() + i) % 12;
    MONTHLY.forEach(([day, title, category, applies]) => {
      if (applies(month)) items.push({ date: new Date(year, month, day), title, category, recurring: true });
    });
    ANNUAL.forEach(([m, day, title, category]) => {
      if (m === month) items.push({ date: new Date(year, month, day), title, category, recurring: false });
    });
  }
  CUSTOM.forEach((c) => {
    const [y, m, d] = c.date.slice(0, 10).split('-').map(Number);
    const date = new Date(y, m - 1, d);
    if (date < until) items.push({ date, title: c.title, category: c.category, recurring: false, custom: true });
  });
  return items
    .filter((it) => it.date >= today && !(HIDDEN.has(it.title.toLowerCase()) && !it.custom))
    .sort((a, b) => a.date - b.date || a.title.localeCompare(b.title));
}

export const daysUntil = (date, from = new Date()) =>
  Math.round((startOfDay(date) - startOfDay(from)) / 86400000);
