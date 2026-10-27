// Site-wide <head> tags, built from Site settings at build time (see vite.config.js).
// Pages override the SEO tags per route; the organisation schema stays on every page.

import { SITE } from '../data/site.js';
import { isPlaceholder } from './format.js';

const esc = (s) => String(s ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
const abs = (path) => (/^https?:/.test(path) ? path : `${SITE.url}${path.startsWith('/') ? '' : '/'}${path}`);
const real = (v) => (v && !isPlaceholder(v) ? v : undefined);

export const SHARE_IMAGE = { width: 1200, height: 630 };

/** Default title, description, canonical and share tags (the home page's). Marked data-rh so
 *  each page's own tags replace them once the app runs. */
export function defaultSeoTags() {
  const title = `${SITE.name} — ${SITE.tagline}`;
  const image = abs(SITE.ogImage || '/og-image.jpg');
  return [
    `<title data-rh="true">${esc(title)}</title>`,
    `<meta data-rh="true" name="description" content="${esc(SITE.description)}" />`,
    `<link data-rh="true" rel="canonical" href="${esc(SITE.url)}/" />`,
    `<meta data-rh="true" property="og:type" content="website" />`,
    `<meta data-rh="true" property="og:site_name" content="${esc(SITE.name)}" />`,
    `<meta data-rh="true" property="og:title" content="${esc(title)}" />`,
    `<meta data-rh="true" property="og:description" content="${esc(SITE.description)}" />`,
    `<meta data-rh="true" property="og:url" content="${esc(SITE.url)}/" />`,
    `<meta data-rh="true" property="og:image" content="${esc(image)}" />`,
    `<meta data-rh="true" property="og:image:width" content="${SHARE_IMAGE.width}" />`,
    `<meta data-rh="true" property="og:image:height" content="${SHARE_IMAGE.height}" />`,
    `<meta data-rh="true" property="og:image:alt" content="${esc(title)}" />`,
    `<meta data-rh="true" property="og:locale" content="en_IN" />`,
    `<meta data-rh="true" name="twitter:card" content="summary_large_image" />`,
    `<meta data-rh="true" name="twitter:title" content="${esc(title)}" />`,
    `<meta data-rh="true" name="twitter:description" content="${esc(SITE.description)}" />`,
    `<meta data-rh="true" name="twitter:image" content="${esc(image)}" />`,
  ].join('\n  ');
}

/** Organisation + WebSite structured data, shared by every page. */
export function organizationLd() {
  const a = SITE.address || {};
  const org = {
    '@type': ['AccountingService', 'ProfessionalService'],
    '@id': `${SITE.url}/#organization`,
    name: SITE.name,
    legalName: real(SITE.legalName),
    slogan: SITE.tagline,
    url: SITE.url,
    logo: { '@type': 'ImageObject', url: abs('/favicon-512.png'), width: 512, height: 512 },
    image: abs(SITE.ogImage || '/og-image.jpg'),
    description: SITE.description,
    telephone: real(SITE.phone?.tel),
    email: real(SITE.email),
    taxID: real(SITE.gstin),
    hasMap: real(a.mapUrl),
    foundingDate: real(SITE.founded),
    address: {
      '@type': 'PostalAddress',
      streetAddress: real(a.street),
      addressLocality: real(a.city),
      addressRegion: real(a.region),
      postalCode: real(a.postalCode),
      addressCountry: a.countryCode || 'IN',
    },
    areaServed: [
      { '@type': 'Country', name: 'India' },
      { '@type': 'Country', name: 'United States' },
      { '@type': 'Country', name: 'United Arab Emirates' },
      { '@type': 'Country', name: 'Singapore' },
      { '@type': 'Place', name: 'Hong Kong' },
      { '@type': 'Country', name: 'China' },
      { '@type': 'Country', name: 'United Kingdom' },
    ],
    currenciesAccepted: 'INR',
    priceRange: '₹₹',
    knowsAbout: [
      'GST registration', 'GST return filing', 'Income tax return filing', 'TDS compliance', 'Tax audit', 'Statutory audit',
      'ROC compliance', 'Company registration in India', 'Company registration in USA', 'Company registration in UAE',
      'Company registration in Singapore', 'Company registration in Hong Kong', 'Company registration in China',
      'Company registration in UK', 'Overseas Direct Investment (ODI)', 'FEMA compliance', 'Trademark registration',
      'Accounting and bookkeeping', 'PF and ESIC', 'MSME Udyam registration', 'FSSAI licence', 'Import Export Code',
    ],
    sameAs: Object.values(SITE.social || {}).filter((v) => real(v)),
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: real(SITE.phone?.tel),
      email: real(SITE.email),
      contactType: 'customer service',
      areaServed: 'IN',
      availableLanguage: ['English', 'Hindi'],
    },
  };
  if (!org.sameAs.length) delete org.sameAs;
  const website = {
    '@type': 'WebSite',
    '@id': `${SITE.url}/#website`,
    url: SITE.url,
    name: SITE.name,
    publisher: { '@id': `${SITE.url}/#organization` },
    inLanguage: 'en-IN',
  };
  const json = JSON.stringify({ '@context': 'https://schema.org', '@graph': [org, website] }, null, 2);
  // "</" would end the script tag early
  return `<script type="application/ld+json">\n${json.replace(/<\//g, '<\\/')}\n  </script>`;
}
