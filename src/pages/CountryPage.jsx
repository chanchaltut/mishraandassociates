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
          <div className="card overflow-hidden shadow-soft">
            <div className="flex items-center gap-4 border-b border-line bg-paper px-6 py-5">
              <Flag code={c.flag} name={c.name} className="h-10 w-14" />
              <div>
                <p className="text-2xs font-semibold uppercase tracking-wider text-muted">Professional fee</p>
                <p className="font-serif text-2xl text-ink-900"><Ph>{c.startingPrice}</Ph></p>
              </div>
            </div>
            <div className="grid gap-2 p-6">
              <Link to={`/contact?service=${encodeURIComponent(c.headline)}`} className="btn-primary">Start incorporation</Link>
              <a href={waLink(msg)} target="_blank" rel="noopener noreferrer" className="btn-whatsapp"><i className="ri-whatsapp-line" /> Discuss on WhatsApp</a>
              <p className="mt-1 text-center text-xs text-muted">Government / registry fees at actuals.</p>
            </div>
          </div>
        }
      />

      {/* Key facts */}
      <section className="bg-white py-14">
        <div className="container-site">
          <dl className="grid gap-px overflow-hidden rounded-sm border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {c.facts.map((f) => (
              <div key={f.label} className="bg-white p-6">
                <dt className="text-2xs font-semibold uppercase tracking-wider text-muted">{f.label}</dt>
                <dd className="mt-1 font-serif text-xl text-ink-900">{f.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="bg-white pb-20">
        <div className="container-site grid gap-14 lg:grid-cols-[1fr_340px]">
          <div className="space-y-16">
            <div>
              <h2 className="h-display text-3xl">Overview</h2>
              <p className="mt-4 text-[17px] leading-relaxed text-ink-800">{c.intro}</p>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {c.why.map((w) => (
                  <li key={w} className="flex gap-3 text-[15px] text-ink-800">
                    <i className="ri-check-line mt-0.5 text-lg text-brand-600" /> {w}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="h-display text-3xl">Entity options</h2>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {c.entities.map((e) => (
                  <div key={e.name} className="rounded-sm border border-line bg-paper p-5">
                    <p className="font-semibold text-ink-900">{e.name}</p>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted">{e.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="h-display text-3xl">The process</h2>
              <ol className="mt-8 grid gap-px overflow-hidden rounded-sm border border-line bg-line sm:grid-cols-2">
                {c.process.map((s, i) => (
                  <li key={s.title} className="bg-white p-6">
                    <span className="font-serif text-3xl text-brass-500">0{i + 1}</span>
                    <p className="mt-3 font-semibold text-ink-900">{s.title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-muted">{s.desc}</p>
                  </li>
                ))}
              </ol>
            </div>

            <div className="grid gap-10 sm:grid-cols-2">
              <div>
                <h2 className="h-display text-2xl">Documents required</h2>
                <ul className="mt-5 space-y-3">
                  {c.documents.map((d) => (
                    <li key={d} className="flex gap-3 text-[15px] text-ink-800"><i className="ri-file-text-line mt-0.5 text-brand-600" /> {d}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h2 className="h-display text-2xl">After incorporation</h2>
                <ul className="mt-5 space-y-3">
                  {c.compliance.map((d) => (
                    <li key={d} className="flex gap-3 text-[15px] text-ink-800"><i className="ri-calendar-check-line mt-0.5 text-brand-600" /> {d}</li>
                  ))}
                </ul>
              </div>
            </div>

            {c.indiaNote && (
              <div className="on-dark rounded-sm bg-ink-900 p-8 text-white sm:p-10">
                <p className="eyebrow eyebrow-light">India-side compliance</p>
                <h2 className="mt-3 font-serif text-2xl !text-white sm:text-3xl">{c.indiaNote.title}</h2>
                <p className="mt-3 leading-relaxed text-white/75">{c.indiaNote.body}</p>
                <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                  {c.indiaNote.points.map((p) => (
                    <li key={p} className="flex gap-3 text-sm text-white/85"><i className="ri-check-line text-brass-300" /> {p}</li>
                  ))}
                </ul>
              </div>
            )}

            <p className="text-xs leading-relaxed text-muted">
              Information on this page is indicative and based on generally applicable rules. Requirements, fees and processing times vary by
              activity and change from time to time — we confirm the current position before you proceed.
            </p>
          </div>

          <aside className="space-y-4 lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-sm bg-paper p-6">
              <p className="eyebrow">Other jurisdictions</p>
              <ul className="mt-4 space-y-1">
                {COUNTRIES.filter((x) => x.slug !== c.slug).map((x) => (
                  <li key={x.slug}>
                    <Link to={`/company-registration/${x.slug}`} className="flex items-center gap-3 rounded-sm px-2 py-2.5 text-sm font-semibold text-ink-800 hover:bg-white hover:text-brand-700">
                      <Flag code={x.flag} className="h-4 w-6" /> {x.name}
                    </Link>
                  </li>
                ))}
              </ul>
              <Link to="/company-registration" className="mt-3 block px-2 text-xs font-semibold text-brand-700 hover:underline">Compare all →</Link>
            </div>
          </aside>
        </div>
      </section>

      <FAQBlock items={c.faqs} title={`${c.shortName || c.name} incorporation`} accent="questions." />
      <CTABand title={`Ready to incorporate in ${c.shortName || c.name}?`} accent="We’ll take it from here." />
    </>
  );
}
