import React from 'react';
import { Link } from 'react-router-dom';
import Seo, { breadcrumbLd, ORG_ID, absUrl } from '../lib/seo';
import { PARENT_SERVICES, SERVICES } from '../data/services';
import { PageHero, SectionHeading } from '../components/ui';
import ServiceExplorer from '../components/ServiceExplorer';
import { CTABand } from '../components/Blocks';

export default function Services() {
  const crumbs = [{ name: 'Home', path: '/' }, { name: 'Services', path: '/services' }];
  const total = PARENT_SERVICES.reduce((n, p) => n + p.subcategories.length, 0);

  return (
    <>
      <Seo
        title="Services — GST, ITR, TDS, ROC, Audit, Trademark & Company Registration"
        description={`Explore ${total}+ tax, compliance and registration services from Mishra and Associates across ${PARENT_SERVICES.length} practice areas, with transparent starting fees.`}
        path="/services"
        jsonLd={[
          breadcrumbLd(crumbs),
          {
            '@context': 'https://schema.org',
            '@type': 'OfferCatalog',
            name: 'Mishra and Associates — Services',
            url: absUrl('/services'),
            provider: { '@id': ORG_ID },
            itemListElement: PARENT_SERVICES.map((p) => ({
              '@type': 'OfferCatalog',
              name: p.title,
              itemListElement: p.subcategories.map((s) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: s.name } })),
            })),
          },
        ]}
      />
      <PageHero
        crumbs={crumbs}
        eyebrow={`${PARENT_SERVICES.length} practice areas · ${total}+ services`}
        title="Every filing, registration and"
        accent="return — handled."
        intro="Search or browse by practice area. Each service shows a starting professional fee; we confirm a fixed quote once we understand your scope."
      />

      <section className="bg-paper py-12 sm:py-16">
        <div className="container-site">
          <ServiceExplorer />
        </div>
      </section>

      <section className="bg-white py-20 sm:py-24">
        <div className="container-site">
          <SectionHeading eyebrow="Service guides" title="In-depth" accent="service pages." />
          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {SERVICES.map((s) => (
              <Link key={s.slug} to={`/services/${s.slug}`} className="group flex flex-col rounded-card bg-paper p-5 transition-colors hover:bg-sun-light">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-white text-xl text-ink-900"><i className={s.icon} /></span>
                <p className="mt-6 font-serif text-[1.25rem] leading-tight tracking-[-0.015em] text-ink-900 group-hover:underline">{s.shortTitle}</p>
                <p className="mt-auto pt-3 text-[0.8125rem] text-ink-800">
                  {s.startingPrice ? <>From <span className="font-semibold text-ink-900">{s.startingPrice}</span></> : 'Quote on request'}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTABand />
    </>
  );
}
