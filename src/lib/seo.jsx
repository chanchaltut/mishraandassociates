import React from 'react';
import { Helmet } from 'react-helmet-async';
import { SITE } from '../data/site';
import { isPlaceholder } from './format';

export const absUrl = (path = '/') => `${SITE.url}${path.startsWith('/') ? path : `/${path}`}`;

export const ORG_ID = `${SITE.url}/#organization`;

export const breadcrumbLd = (items) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((it, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: it.name,
    item: absUrl(it.path),
  })),
});

export const faqLd = (faqs) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
});

// Drop placeholder values so structured data never contains "[...]" text.
export const clean = (obj) =>
  JSON.parse(JSON.stringify(obj, (_, val) => (isPlaceholder(val) ? undefined : val)));

/**
 * Per-page SEO: title, description, canonical, Open Graph, Twitter and JSON-LD.
 * Site-wide Organization / WebSite schema lives in index.html.
 */
export default function Seo({
  title,
  description = SITE.description,
  path = '/',
  image = SITE.ogImage,
  type = 'website',
  noindex = false,
  jsonLd = [],
  children,
}) {
  const fullTitle = title ? `${title} | ${SITE.name}` : `${SITE.name} — ${SITE.tagline}`;
  const url = absUrl(path);
  const img = image.startsWith('http') ? image : absUrl(image);
  const blocks = (Array.isArray(jsonLd) ? jsonLd : [jsonLd]).filter(Boolean);

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      {noindex && <meta name="robots" content="noindex, follow" />}

      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={SITE.name} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={img} />
      <meta property="og:locale" content="en_IN" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={img} />

      {blocks.map((b, i) => (
        <script key={i} type="application/ld+json">{JSON.stringify(clean(b))}</script>
      ))}
      {children}
    </Helmet>
  );
}
