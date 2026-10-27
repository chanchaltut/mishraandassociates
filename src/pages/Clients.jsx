import React from 'react';
import Seo, { breadcrumbLd } from '../lib/seo';
import { CLIENTS, CLIENT_INDUSTRIES, CASE_STUDIES, STATS } from '../data/content';
import { SITE } from '../data/site';
import { PageHero, SectionHeading } from '../components/ui';
import Ph from '../components/ui/Ph';
import { CTABand } from '../components/Blocks';
import { Testimonials } from '../components/home/Sections';

const FILLS = ['bg-cream', 'bg-cornflower', 'bg-mint', 'bg-rose', 'bg-peach'];

export default function Clients() {
  const crumbs = [{ name: 'Home', path: '/' }, { name: 'Our Clients', path: '/clients' }];
  return (
    <>
      <Seo
        title="Our Clients — Businesses We Work With"
        description="Startups, traders, manufacturers, exporters, government contractors and NRIs trust Mishra and Associates with tax, compliance and company registration in India and abroad."
        path="/clients"
        jsonLd={breadcrumbLd(crumbs)}
      />
      <PageHero
        crumbs={crumbs}
        eyebrow="Our clients"
        title="Businesses that trust us"
        accent="with what matters."
        intro="From first-time founders to established exporters, our clients rely on one accountable team for their tax, compliance and global setup."
      />

      {/* Logo wall */}
      <section className="bg-white py-20 sm:py-24">
        <div className="container-site">
          <p className="text-center text-[0.9375rem] font-medium text-ink-900">A few of the businesses we work with</p>
          <ul className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {CLIENTS.map((c, i) => (
              <li key={i} className="grid aspect-[3/2] place-items-center rounded-card bg-paper p-6 text-center">
                {c.logo ? (
                  <img src={c.logo} alt={c.name} loading="lazy" className="max-h-14 w-auto object-contain" />
                ) : (
                  <span>
                    <span className="block font-serif text-[1.25rem] tracking-[-0.015em] text-ink-900"><Ph>{c.name}</Ph></span>
                    <span className="mt-1 block text-xs text-ink-800"><Ph>{c.industry}</Ph></span>
                  </span>
                )}
              </li>
            ))}
          </ul>
          {SITE.demoMode && <p className="mt-4 text-center text-xs text-muted">Client logos to be provided — shown only with each client’s permission.</p>}
        </div>
      </section>

      {/* Stats */}
      <section className="bg-texture py-16 sm:py-20">
        <div className="container-site grid grid-cols-2 gap-x-8 gap-y-10 lg:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label} className="border-t border-ink-900 pt-5">
              <p className="font-serif text-[3.5rem] leading-none tracking-[-0.04em] text-ink-900 sm:text-[4.5rem]"><Ph>{s.value}</Ph></p>
              <p className="mt-2 text-[0.9375rem] text-ink-900">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Industries */}
      <section className="bg-white py-20 sm:py-28">
        <div className="container-site">
          <SectionHeading eyebrow="Who we work with" title="Every kind of business," accent="one standard of care." />
          <ul className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {CLIENT_INDUSTRIES.map((ind, i) => (
              <li key={ind.name} className="flex items-center gap-4 rounded-card bg-paper p-5">
                <span className={`grid h-12 w-12 shrink-0 place-items-center rounded-full text-xl text-ink-900 ${FILLS[i % FILLS.length]}`}><i className={ind.icon} /></span>
                <span className="font-serif text-[1.375rem] leading-tight tracking-[-0.015em] text-ink-900">{ind.name}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Case studies */}
      <section className="bg-paper py-20 sm:py-28">
        <div className="container-site">
          <SectionHeading eyebrow="Client stories" title="What we did," accent="and what changed." />
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {CASE_STUDIES.map((c, i) => (
              <article key={i} className="flex flex-col rounded-panel bg-white p-7 sm:p-8">
                <span className={`self-start rounded-full px-3 py-1 text-xs font-semibold text-ink-900 ${['bg-cornflower', 'bg-mint', 'bg-peach'][i % 3]}`}>{c.service}</span>
                <p className="mt-6 font-serif text-[1.625rem] leading-tight tracking-[-0.02em] text-ink-900"><Ph>{c.client}</Ph></p>
                <dl className="mt-5 space-y-4 text-[0.9375rem] leading-relaxed">
                  <div>
                    <dt className="font-semibold text-ink-900">The challenge</dt>
                    <dd className="mt-1 text-ink-800"><Ph>{c.challenge}</Ph></dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-ink-900">The outcome</dt>
                    <dd className="mt-1 text-ink-800"><Ph>{c.outcome}</Ph></dd>
                  </div>
                </dl>
              </article>
            ))}
          </div>
        </div>
      </section>

      <Testimonials />
      <CTABand title="Join businesses that" accent="file with confidence." />
    </>
  );
}
