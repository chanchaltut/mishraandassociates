import React from 'react';
import { Link, useParams } from 'react-router-dom';
import Seo, { breadcrumbLd, faqLd, ORG_ID, absUrl } from '../lib/seo';
import { SERVICES } from '../data/services';
import { PROCESS_STEPS } from '../data/content';
import { SERVICE_FAQS } from '../data/faqs';
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
  const faqs = SERVICE_FAQS[service.slug];
  const msg = `Hello ${SITE.name}, I need help with ${service.title}.`;

  return (
    <>
      <Seo
        title={service.title}
        description={`${service.shortDesc}${service.startingPrice ? ` Starting from ${service.startingPrice}.` : ''} Mishra and Associates, Delhi — serving clients across India.`}
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
          faqLd(faqs),
        ]}
      />

      <PageHero
        crumbs={crumbs}
        eyebrow={service.category}
        title={service.title}
        intro={service.overview}
        aside={
          <div className="rounded-panel border border-ink-900 bg-white p-7">
            <dl className="grid grid-cols-2 gap-5">
              <div>
                <dt className="label">{service.startingPrice ? 'Starting from' : 'Fee'}</dt>
                <dd className="mt-1 font-serif text-[1.75rem] leading-tight tracking-[-0.02em] text-ink-900">{service.startingPrice || 'On request'}</dd>
              </div>
              <div>
                <dt className="label">Timeline</dt>
                <dd className="mt-1 font-serif text-[1.75rem] leading-tight tracking-[-0.02em] text-ink-900">{service.timeline}</dd>
              </div>
            </dl>
            <p className="mt-4 text-xs text-ink-800">Professional fee. Government fees at actuals.</p>
            <div className="mt-6 grid gap-3">
              <Link to={`/contact?service=${encodeURIComponent(service.title)}`} className="btn-primary">Request a quote</Link>
              <a href={waLink(msg)} target="_blank" rel="noopener noreferrer" className="btn-whatsapp"><i className="ri-whatsapp-line" /> WhatsApp us</a>
            </div>
          </div>
        }
      />

      <section className="bg-white py-20 sm:py-24">
        <div className="container-site grid gap-12 lg:grid-cols-[1fr_340px]">
          <div>
            <h2 className="h-display text-[2.25rem] leading-[1.05] sm:text-[2.75rem]">What’s <em className="italic">included</em></h2>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {service.services.map((item) => (
                <li key={item} className="flex items-start gap-3 rounded-card bg-paper p-5">
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-sun text-sm text-ink-900"><i className="ri-check-line" /></span>
                  <span className="text-[0.9375rem] font-medium text-ink-900">{item}</span>
                </li>
              ))}
            </ul>

            <h2 className="h-display mt-20 text-[2.25rem] leading-[1.05] sm:text-[2.75rem]">How it <em className="italic">works</em></h2>
            <ol className="mt-8 space-y-7 border-l border-ink-900 pl-9">
              {PROCESS_STEPS.map((s, i) => (
                <li key={s.title} className="relative">
                  <span className="absolute -left-[53px] grid h-9 w-9 place-items-center rounded-full border border-ink-900 bg-white font-serif text-lg text-ink-900">{i + 1}</span>
                  <p className="font-serif text-[1.375rem] leading-tight tracking-[-0.015em] text-ink-900">{s.title}</p>
                  <p className="mt-1 text-[0.9375rem] leading-relaxed text-ink-800">{s.desc}</p>
                </li>
              ))}
            </ol>
          </div>

          <aside className="space-y-4 lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-card bg-cream p-6">
              <p className="eyebrow">Related services</p>
              <ul className="mt-4 space-y-1">
                {related.map((r) => (
                  <li key={r.slug}>
                    <Link to={`/services/${r.slug}`} className="flex items-center gap-3 rounded-lg px-2 py-2.5 text-[0.9375rem] font-medium text-ink-900 hover:bg-white hover:underline">
                      <i className={`${r.icon} text-ink-900`} /> {r.shortTitle}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <Link to="/company-registration" className="on-dark block rounded-panel bg-ink-900 p-7 text-white">
              <p className="text-sm font-semibold text-sun">Expanding abroad?</p>
              <p className="mt-2 font-serif text-[1.5rem] leading-tight tracking-[-0.015em]">Company registration in 7 jurisdictions</p>
              <span className="btn-primary btn-sm mt-5">Compare jurisdictions</span>
            </Link>
          </aside>
        </div>
      </section>

      <FAQBlock
        items={faqs}
        title={`${service.shortTitle}:`}
        accent="common questions."
        intro={<>Quick answers before you get in touch. More in our <Link to="/faqs" className="link-underline text-ink-900">full FAQ</Link>.</>}
      />
      <CTABand />
    </>
  );
}
