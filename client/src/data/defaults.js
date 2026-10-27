// ═══════════════════════════════════════════════════════════
//  The site's built-in content, shaped as admin-panel documents.
//  The API imports this on first start, so the admin panel opens
//  with exactly what the website shows. Runs in Node and the browser.
// ═══════════════════════════════════════════════════════════

import { SITE_DEFAULT, NAV_DEFAULT, KNOWLEDGE_LINKS_DEFAULT } from './site.js';
import {
  HERO_DEFAULT, STATS_DEFAULT, ABOUT_DEFAULT, WHY_US_DEFAULT, PROCESS_STEPS_DEFAULT, TESTIMONIALS_DEFAULT,
  HOME_SECTIONS_DEFAULT, TEAM_DEFAULT, CLIENTS_DEFAULT, CLIENT_INDUSTRIES_DEFAULT, CASE_STUDIES_DEFAULT,
  FAQS_DEFAULT, LEGAL_UPDATED_DEFAULT,
} from './content.js';
import { PARENT_SERVICES_DEFAULT, SERVICES_DEFAULT } from './services.js';
import { COUNTRIES_DEFAULT, INDIA_NOTE_DEFAULT, COMPARISON_DEFAULT } from './countries.js';
import { GLOBAL_FAQS_DEFAULT, SERVICE_FAQS_DEFAULT, TENDER_FAQS_DEFAULT, TRADEMARK_SEARCH_FAQS_DEFAULT } from './faqs.js';
import { BLOG_POSTS_DEFAULT } from './blog.js';
import { NEWS_DEFAULT } from './news.js';
import { NOTIFICATIONS_DEFAULT } from './notifications.js';
import { TENDER_PLAN_DEFAULT, TENDERS_DEFAULT, TENDER_RESULTS_DEFAULT } from './tenders.js';
import { RECENT_FILINGS_DEFAULT } from './trademarks.js';
import { PRIVACY_DEFAULT, TERMS_DEFAULT } from './legal.js';

// JSON round-trip drops functions and undefined values
const plain = (value) => JSON.parse(JSON.stringify(value));

export function buildDefaults() {
  return plain({
    settings: SITE_DEFAULT,
    navigation: { main: NAV_DEFAULT.map((n) => ({ menu: '', ...n })), knowledge: KNOWLEDGE_LINKS_DEFAULT },
    home: {
      hero: HERO_DEFAULT,
      stats: STATS_DEFAULT,
      about: ABOUT_DEFAULT,
      whyUs: WHY_US_DEFAULT,
      process: PROCESS_STEPS_DEFAULT,
      testimonials: TESTIMONIALS_DEFAULT,
      sections: HOME_SECTIONS_DEFAULT,
    },
    pages: { items: [] },
    services: { categories: PARENT_SERVICES_DEFAULT },
    servicePages: { pages: SERVICES_DEFAULT.map((s) => ({ ...s, faqs: SERVICE_FAQS_DEFAULT[s.slug] || [] })) },
    countries: {
      countries: COUNTRIES_DEFAULT.map((c) => ({ isHome: false, ...c })),
      indiaNote: INDIA_NOTE_DEFAULT,
      comparison: COMPARISON_DEFAULT,
    },
    faqs: { general: FAQS_DEFAULT, global: GLOBAL_FAQS_DEFAULT, tenders: TENDER_FAQS_DEFAULT, trademark: TRADEMARK_SEARCH_FAQS_DEFAULT },
    blog: { posts: BLOG_POSTS_DEFAULT },
    news: { items: NEWS_DEFAULT },
    notifications: { items: NOTIFICATIONS_DEFAULT },
    calendar: { custom: [], hidden: [] },
    tenders: { plan: TENDER_PLAN_DEFAULT, tenders: TENDERS_DEFAULT, results: TENDER_RESULTS_DEFAULT },
    trademarks: { showRecent: true, recent: RECENT_FILINGS_DEFAULT },
    team: { members: TEAM_DEFAULT },
    clients: { clients: CLIENTS_DEFAULT, industries: CLIENT_INDUSTRIES_DEFAULT, caseStudies: CASE_STUDIES_DEFAULT },
    legal: { updated: LEGAL_UPDATED_DEFAULT, privacy: PRIVACY_DEFAULT, terms: TERMS_DEFAULT },
    inbox: { notifyEmails: SITE_DEFAULT.email },
  });
}
