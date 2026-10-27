import React from 'react';
import Seo from '../lib/seo';
import { SITE } from '../data/site';
import { LEGAL_UPDATED } from '../data/content';
import { PageHero } from '../components/ui';
import Ph from '../components/ui/Ph';

const PRIVACY = [
  ['Who we are', `${SITE.legalName} (“we”, “us”) provides tax, compliance, accounting and company formation services. This policy explains how we handle personal information collected through ${SITE.domain} and in the course of our engagements.`],
  ['Information we collect', 'Details you provide through forms, email, phone or WhatsApp — such as your name, contact details, the service you need and any documents you share for an engagement. We also collect basic technical data (browser type, pages visited) to keep the site secure and improve it.'],
  ['How we use it', 'To respond to enquiries, deliver the services you engage us for, meet our legal and professional obligations, send updates you have subscribed to, and improve our website. We do not sell personal information.'],
  ['Sharing', 'We share information only where necessary to deliver a service (for example, with government portals, registrars, banks or partner firms in other jurisdictions), with service providers who host our systems under confidentiality obligations, or where required by law.'],
  ['Retention & security', 'We keep records for as long as needed for the engagement and to meet statutory record-keeping requirements. Access is limited to people who need it, and reasonable technical and organisational safeguards are applied.'],
  ['Your choices', 'You can ask us to access, correct or delete your personal information, subject to legal retention requirements, and unsubscribe from emails at any time using the link in each email.'],
  ['Cookies', 'The site uses essential storage to remember simple preferences. If analytics are enabled, they are used in aggregate to understand how the site is used.'],
  ['Contact', `Questions about this policy can be sent to ${SITE.email}.`],
];

const TERMS = [
  ['Acceptance', `By using ${SITE.domain}, you agree to these terms. If you do not agree, please do not use the website.`],
  ['Information only', 'Content on this website — including articles, news, notifications and the compliance calendar — is for general information and is not professional advice. Laws, rates and due dates change; please consult us before acting on any information.'],
  ['Engagements', 'Services are provided under a separate engagement letter or quotation that sets out scope, fees and responsibilities. Prices shown on the website are indicative “starting from” professional fees; government and statutory fees are charged at actuals.'],
  ['Third-party links & sources', 'We link to government portals and external sources for convenience. We are not responsible for their content or availability.'],
  ['Intellectual property', `Website content, design and branding belong to ${SITE.legalName} unless stated otherwise and may not be reproduced without permission, except for sharing links to our articles.`],
  ['Liability', `To the extent permitted by law, ${SITE.legalName} is not liable for loss arising from reliance on general website content. Our liability for engagements is governed by the relevant engagement terms.`],
  ['Governing law', 'These terms are governed by the laws of India, and courts at Delhi shall have exclusive jurisdiction.'],
  ['Changes', 'We may update these terms from time to time. The date of the latest update is shown on this page.'],
];

function LegalPage({ title, path, sections, description }) {
  return (
    <>
      <Seo title={title} description={description} path={path} noindex />
      <PageHero crumbs={[{ name: 'Home', path: '/' }, { name: title, path }]} eyebrow={`Last updated ${LEGAL_UPDATED}`} title={title} />
      <section className="bg-white py-14 sm:py-20">
        <div className="container-site max-w-3xl">
          <ol className="space-y-10">
            {sections.map(([h, body], i) => (
              <li key={h}>
                <h2 className="font-serif text-[1.75rem] leading-tight tracking-[-0.02em] text-ink-900"><span className="mr-2 italic">{i + 1}.</span>{h}</h2>
                <p className="mt-3 text-[1.0625rem] leading-relaxed text-ink-800">{body}</p>
              </li>
            ))}
          </ol>
          <div className="mt-14 rounded-card bg-cream p-7 text-sm leading-relaxed text-ink-800">
            <p className="font-semibold text-ink-900">{SITE.legalName}</p>
            <p><Ph>{SITE.address.street}</Ph>, {SITE.address.city} <Ph>{SITE.address.postalCode}</Ph>, {SITE.address.country}</p>
            <p>{SITE.phone.display} · {SITE.email}</p>
          </div>
        </div>
      </section>
    </>
  );
}

export const PrivacyPolicy = () => (
  <LegalPage title="Privacy Policy" path="/privacy-policy" sections={PRIVACY} description={`How ${SITE.name} collects, uses and protects personal information.`} />
);

export const TermsConditions = () => (
  <LegalPage title="Terms of Use" path="/terms-conditions" sections={TERMS} description={`Terms governing the use of the ${SITE.name} website.`} />
);
