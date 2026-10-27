// ═══════════════════════════════════════════════════════════
//  Privacy policy and terms of use — defaults for admin → "Legal pages".
// ═══════════════════════════════════════════════════════════

import { fromContent } from '../lib/content.js';
import { SITE } from './site.js';

export const PRIVACY_DEFAULT = [
  { heading: 'Who we are', body: `${SITE.legalName} (“we”, “us”) provides tax, compliance, accounting and company formation services. This policy explains how we handle personal information collected through ${SITE.domain} and in the course of our engagements.` },
  { heading: 'Information we collect', body: 'Details you provide through forms, email, phone or WhatsApp — such as your name, contact details, the service you need and any documents you share for an engagement. We also collect basic technical data (browser type, pages visited) to keep the site secure and improve it.' },
  { heading: 'How we use it', body: 'To respond to enquiries, deliver the services you engage us for, meet our legal and professional obligations, send updates you have subscribed to, and improve our website. We do not sell personal information.' },
  { heading: 'Sharing', body: 'We share information only where necessary to deliver a service (for example, with government portals, registrars, banks or partner firms in other jurisdictions), with service providers who host our systems under confidentiality obligations, or where required by law.' },
  { heading: 'Retention & security', body: 'We keep records for as long as needed for the engagement and to meet statutory record-keeping requirements. Access is limited to people who need it, and reasonable technical and organisational safeguards are applied.' },
  { heading: 'Your choices', body: 'You can ask us to access, correct or delete your personal information, subject to legal retention requirements, and unsubscribe from emails at any time using the link in each email.' },
  { heading: 'Cookies', body: 'The site uses essential storage to remember simple preferences. If analytics are enabled, they are used in aggregate to understand how the site is used.' },
  { heading: 'Contact', body: `Questions about this policy can be sent to ${SITE.email}.` },
];

export const TERMS_DEFAULT = [
  { heading: 'Acceptance', body: `By using ${SITE.domain}, you agree to these terms. If you do not agree, please do not use the website.` },
  { heading: 'Information only', body: 'Content on this website — including articles, news, notifications and the compliance calendar — is for general information and is not professional advice. Laws, rates and due dates change; please consult us before acting on any information.' },
  { heading: 'Engagements', body: 'Services are provided under a separate engagement letter or quotation that sets out scope, fees and responsibilities. Prices shown on the website are indicative “starting from” professional fees; government and statutory fees are charged at actuals.' },
  { heading: 'Third-party links & sources', body: 'We link to government portals and external sources for convenience. We are not responsible for their content or availability.' },
  { heading: 'Intellectual property', body: `Website content, design and branding belong to ${SITE.legalName} unless stated otherwise and may not be reproduced without permission, except for sharing links to our articles.` },
  { heading: 'Liability', body: `To the extent permitted by law, ${SITE.legalName} is not liable for loss arising from reliance on general website content. Our liability for engagements is governed by the relevant engagement terms.` },
  { heading: 'Governing law', body: 'These terms are governed by the laws of India, and courts at Delhi shall have exclusive jurisdiction.' },
  { heading: 'Changes', body: 'We may update these terms from time to time. The date of the latest update is shown on this page.' },
];

export const PRIVACY = fromContent('legal', 'privacy', PRIVACY_DEFAULT);
export const TERMS = fromContent('legal', 'terms', TERMS_DEFAULT);
