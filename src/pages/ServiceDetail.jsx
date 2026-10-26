import React from 'react';
import { Link, useParams } from 'react-router-dom';
import Seo, { breadcrumbLd, ORG_ID, absUrl } from '../lib/seo';
import { SERVICES } from '../data/services';
import { PROCESS_STEPS } from '../data/content';
import { SITE, waLink } from '../data/site';
import { PageHero } from '../components/ui';
import { FAQBlock, CTABand } from '../components/Blocks';
import NotFound from './NotFound';

export default function ServiceDetail() {
  const { slug } = useParams();
  const service = SERVICES.find((s) => s.slug === slug);
  if (!service) return <NotFound />;

  const path = `/services/${service.slug}`;
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: service.shortTitle, path },
  ];
  const others = SERVICES.filter((s) => s.slug !== slug);
  const related = [
    ...others.filter((s) => s.category === service.category),
    ...others.filter((s) => s.category !== service.category),
  ].slice(0, 4);
  const msg = `Hello ${SITE.name}, I need help with ${service.title}.`;

  return (
    <>
      <Seo
        title={service.title}
        description={`${service.shortDesc} Starting from ${service.startingPrice}. Mishra and Associates, Delhi — serving clients across India.`}
        path={path}
        jsonLd={[
          breadcrumbLd(crumbs),
          {
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: service.title,
            description: service.overview,
            url: absUrl(path),
            provider: { '@id': ORG_ID },
            areaServed: { '@type': 'Country', name: 'India' },
            serviceType: service.category,
          },
        ]}
      />

      <PageHero
        crumbs={crumbs}
        eyebrow={service.category}
        title={service.title}
        intro={service.overview}
        aside={
          <div className="card p-6 shadow-soft">
            <dl className="grid grid-cols-2 gap-5">
              <div>
                <dt className="text-2xs font-bold uppercase tracking-wider text-muted">Starting from</dt>
                <dd className="mt-1 font-serif text-2xl text-ink-900">{service.startingPrice}</dd>
              </div>
              <div>
                <dt className="text-2xs font-bold uppercase tracking-wider text-muted">Timeline</dt>
                <dd className="mt-1 font-serif text-2xl text-ink-900">{service.timeline}</dd>
              </div>
            </dl>
            <p className="mt-4 text-xs text-muted">Professional fee. Government fees at actuals.</p>
            <div className="mt-5 grid gap-2">
              <Link to={`/contact?service=${encodeURIComponent(service.title)}`} className="btn-primary">Request a quote</Link>
              <a href={waLink(msg)} target="_blank" rel="noopener noreferrer" className="btn-whatsapp"><i className="ri-whatsapp-line" /> WhatsApp us</a>
            </div>
          </div>
        }
      />

      <section className="bg-white py-16 sm:py-20">
        <div className="container-site grid gap-12 lg:grid-cols-[1fr_340px]">
          <div>
            <h2 className="h-display text-3xl">What’s included</h2>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {service.services.map((item) => (
                <li key={item} className="flex items-start gap-3 rounded-2xl border border-line bg-paper p-4">
                  <i className="ri-checkbox-circle-fill mt-0.5 text-lg text-brand-500" />
                  <span className="text-[15px] font-medium text-ink-900">{item}</span>
                </li>
              ))}
            </ul>

            <h2 className="h-display mt-16 text-3xl">How it works</h2>
            <ol className="mt-8 space-y-6 border-l border-line pl-8">
              {PROCESS_STEPS.map((s, i) => (
                <li key={s.title} className="relative">
                  <span className="absolute -left-[45px] grid h-8 w-8 place-items-center rounded-full border border-line bg-white font-serif text-sm italic text-brass-600">{i + 1}</span>
                  <p className="font-bold text-ink-900">{s.title}</p>
                  <p className="mt-1 text-sm text-muted">{s.desc}</p>
                </li>
              ))}
            </ol>
          </div>

          <aside className="space-y-4 lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-3xl bg-paper p-6">
              <p className="eyebrow">Related services</p>
              <ul className="mt-4 space-y-1">
                {related.map((r) => (
                  <li key={r.slug}>
                    <Link to={`/services/${r.slug}`} className="flex items-center gap-3 rounded-xl px-2 py-2.5 text-sm font-semibold text-ink-800 hover:bg-white hover:text-brand-700">
                      <i className={`${r.icon} text-brand-600`} /> {r.shortTitle}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <Link to="/company-registration" className="on-dark block rounded-3xl bg-ink-900 p-6 text-white">
              <p className="text-2xs font-bold uppercase tracking-[0.18em] text-brass-300">Expanding abroad?</p>
              <p className="mt-2 font-serif text-xl leading-snug">Company registration in 7 jurisdictions →</p>
            </Link>
          </aside>
        </div>
      </section>

      <FAQBlock />
      <CTABand />
    </>
  );
}
