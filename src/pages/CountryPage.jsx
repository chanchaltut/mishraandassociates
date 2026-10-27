import React from 'react';
import { Link, useParams } from 'react-router-dom';
import Seo, { breadcrumbLd, faqLd, ORG_ID, absUrl } from '../lib/seo';
import { COUNTRIES, getCountry } from '../data/countries';
import { SITE, waLink } from '../data/site';
import { PageHero, Flag, SectionHeading } from '../components/ui';
import Ph from '../components/ui/Ph';
import { FAQBlock, CTABand } from '../components/Blocks';
import NotFound from './NotFound';

export default function CountryPage() {
  const { country } = useParams();
  const c = getCountry(country);
  if (!c) return <NotFound />;

  const path = `/company-registration/${c.slug}`;
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Company Registration', path: '/company-registration' },
    { name: c.shortName || c.name, path },
  ];
  const msg = `Hello ${SITE.name}, I would like to register a company in ${c.name}.`;

  return (
    <>
      <Seo
        title={`${c.headline} — ${c.facts[0].value}`}
        description={`${c.tagline} Requirements, documents, timeline and compliance explained by Mishra and Associates.`}
        path={path}
        jsonLd={[
          breadcrumbLd(crumbs),
          faqLd(c.faqs),
          {
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: c.headline,
            description: c.intro,
            url: absUrl(path),
            provider: { '@id': ORG_ID },
            serviceType: 'Company incorporation',
            areaServed: { '@type': 'Country', name: c.name },
          },
        ]}
      />

      <PageHero
        crumbs={crumbs}
        eyebrow={`Global setup · ${c.name}`}
        title={c.headline}
        intro={c.tagline}
        aside={
          <div className="overflow-hidden rounded-panel border border-ink-900 bg-white">
            <div className="flex items-center gap-4 border-b border-line px-7 py-6">
              <Flag code={c.flag} name={c.name} className="h-10 w-14" />
              <div>
                <p className="label">Professional fee</p>
                <p className="font-serif text-[1.75rem] leading-tight tracking-[-0.02em] text-ink-900"><Ph>{c.startingPrice}</Ph></p>
              </div>
            </div>
            <div className="grid gap-3 p-7">
              <Link to={`/contact?service=${encodeURIComponent(c.headline)}`} className="btn-primary">Start incorporation</Link>
              <a href={waLink(msg)} target="_blank" rel="noopener noreferrer" className="btn-whatsapp"><i className="ri-whatsapp-line" /> Discuss on WhatsApp</a>
              <p className="mt-1 text-center text-xs text-ink-800">Government / registry fees at actuals.</p>
            </div>
          </div>
        }
      />

      {/* Key facts */}
      <section className="bg-white pb-6 pt-16 sm:pt-20">
        <div className="container-site">
          <dl className="grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {c.facts.map((f) => (
              <div key={f.label} className="border-t border-ink-900 pt-4">
                <dt className="text-[0.8125rem] text-ink-800">{f.label}</dt>
                <dd className="mt-1 font-serif text-[1.5rem] leading-tight tracking-[-0.015em] text-ink-900">{f.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="bg-white py-16 sm:pb-24">
        <div className="container-site grid gap-14 lg:grid-cols-[1fr_340px]">
          <div className="space-y-16">
            <div>
              <h2 className="h-display text-[2.25rem] leading-[1.05] sm:text-[2.75rem]">Overview</h2>
              <p className="mt-5 text-[1.0625rem] leading-relaxed text-ink-800">{c.intro}</p>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {c.why.map((w) => (
                  <li key={w} className="flex gap-3 text-[15px] text-ink-800">
                    <i className="ri-check-line mt-0.5 text-lg text-brand-600" /> {w}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="h-display text-[2.25rem] leading-[1.05] sm:text-[2.75rem]">Entity <em className="italic">options</em></h2>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {c.entities.map((e) => (
                  <div key={e.name} className="rounded-card bg-paper p-6">
                    <p className="font-serif text-[1.375rem] leading-tight tracking-[-0.015em] text-ink-900">{e.name}</p>
                    <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-800">{e.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="h-display text-[2.25rem] leading-[1.05] sm:text-[2.75rem]">The <em className="italic">process</em></h2>
              <ol className="mt-8 grid gap-3 sm:grid-cols-2">
                {c.process.map((s, i) => (
                  <li key={s.title} className={`rounded-card p-6 ${['bg-cornflower', 'bg-mint', 'bg-rose', 'bg-peach'][i % 4]}`}>
                    <span className="font-serif text-[2.5rem] leading-none text-ink-900">{i + 1}</span>
                    <p className="mt-6 font-serif text-[1.375rem] leading-tight tracking-[-0.015em] text-ink-900">{s.title}</p>
                    <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-ink-800">{s.desc}</p>
                  </li>
                ))}
              </ol>
            </div>

            <div className="grid gap-10 sm:grid-cols-2">
              <div>
                <h2 className="h-display text-[1.75rem] leading-tight">Documents required</h2>
                <ul className="mt-5 space-y-3">
                  {c.documents.map((d) => (
                    <li key={d} className="flex gap-3 text-[15px] text-ink-800"><i className="ri-file-text-line mt-0.5 text-ink-900" /> {d}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h2 className="h-display text-[1.75rem] leading-tight">After incorporation</h2>
                <ul className="mt-5 space-y-3">
                  {c.compliance.map((d) => (
                    <li key={d} className="flex gap-3 text-[15px] text-ink-800"><i className="ri-calendar-check-line mt-0.5 text-ink-900" /> {d}</li>
                  ))}
                </ul>
              </div>
            </div>

            {c.indiaNote && (
              <div className="on-dark rounded-panel bg-brand-800 p-8 text-white sm:p-12">
                <p className="eyebrow eyebrow-light">India-side compliance</p>
                <h2 className="mt-3 font-serif text-[2rem] leading-[1.05] tracking-[-0.025em] !text-white sm:text-[2.5rem]">{c.indiaNote.title}</h2>
                <p className="mt-3 leading-relaxed text-white/75">{c.indiaNote.body}</p>
                <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                  {c.indiaNote.points.map((p) => (
                    <li key={p} className="flex gap-3 text-sm text-white/85"><i className="ri-check-line text-sun" /> {p}</li>
                  ))}
                </ul>
              </div>
            )}

            <p className="text-xs leading-relaxed text-ink-800">
              Information on this page is indicative and based on generally applicable rules. Requirements, fees and processing times vary by
              activity and change from time to time — we confirm the current position before you proceed.
            </p>
          </div>

          <aside className="space-y-4 lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-card bg-cream p-6">
              <p className="eyebrow">Other jurisdictions</p>
              <ul className="mt-4 space-y-1">
                {COUNTRIES.filter((x) => x.slug !== c.slug).map((x) => (
                  <li key={x.slug}>
                    <Link to={`/company-registration/${x.slug}`} className="flex items-center gap-3 rounded-lg px-2 py-2.5 text-[0.9375rem] font-medium text-ink-900 hover:bg-white hover:underline">
                      <Flag code={x.flag} className="h-4 w-6" /> {x.name}
                    </Link>
                  </li>
                ))}
              </ul>
              <Link to="/company-registration" className="text-link mx-2 mt-3 inline-block text-sm">Compare all</Link>
            </div>
          </aside>
        </div>
      </section>

      <FAQBlock items={c.faqs} title={`${c.shortName || c.name} incorporation`} accent="questions." />
      <CTABand title={`Ready to incorporate in ${c.shortName || c.name}?`} accent="We’ll take it from here." />
    </>
  );
}
