import React from 'react';
import { Link } from 'react-router-dom';
import Seo, { breadcrumbLd, faqLd } from '../lib/seo';
import { COUNTRIES, COMPARISON, getCountry } from '../data/countries';
import { PageHero, Flag, SectionHeading } from '../components/ui';
import Ph from '../components/ui/Ph';
import { FAQBlock, CTABand } from '../components/Blocks';
import { GLOBAL_FAQS as FAQS } from '../data/faqs';


export default function GlobalIncorporation() {
  const crumbs = [{ name: 'Home', path: '/' }, { name: 'Company Registration', path: '/company-registration' }];

  return (
    <>
      <Seo
        title="Company Registration in India, USA, UAE, Singapore, Hong Kong, China & UK"
        description="Compare company registration in India, the USA, UAE, Singapore, Hong Kong, China and the UK — entity types, timelines, local director rules and tax — with FEMA/ODI compliance for Indian founders."
        path="/company-registration"
        jsonLd={[breadcrumbLd(crumbs), faqLd(FAQS)]}
      />

      <PageHero
        crumbs={crumbs}
        eyebrow="Global setup · 7 jurisdictions"
        title="Company registration,"
        accent="wherever you’re building."
        intro="Incorporate in India or abroad with one team that also handles the India-side FEMA filings, tax registrations and ongoing compliance."
      >
        <div className="mt-8 flex flex-wrap gap-2">
          {COUNTRIES.map((c) => (
            <Link key={c.slug} to={`/company-registration/${c.slug}`} className="chip !border-ink-900/30 !py-2 hover:!border-ink-900">
              <Flag code={c.flag} className="h-3.5 w-5" /> {c.shortName || c.name}
            </Link>
          ))}
        </div>
      </PageHero>

      {/* Country cards */}
      <section className="bg-white py-20 sm:py-24">
        <div className="container-site grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {COUNTRIES.map((c, i) => (
            <Link key={c.slug} to={`/company-registration/${c.slug}`} className={`group flex flex-col rounded-panel p-7 sm:p-8 ${['bg-cream', 'bg-cornflower', 'bg-mint', 'bg-rose', 'bg-peach', 'bg-paper'][i % 6]}`}>
              <div className="flex items-center justify-between">
                <Flag code={c.flag} name={c.name} className="h-9 w-14" />
                <span className="grid h-10 w-10 place-items-center rounded-full border border-ink-900 text-ink-900 transition-colors group-hover:bg-ink-900 group-hover:text-white">
                  <i className="ri-arrow-right-line" />
                </span>
              </div>
              <h2 className="mt-10 font-serif text-[2rem] leading-none tracking-[-0.025em] text-ink-900 group-hover:underline">{c.name}</h2>
              <p className="mt-3 flex-1 text-[0.9375rem] leading-relaxed text-ink-800">{c.tagline}</p>
              <div className="mt-7 flex items-center justify-between border-t border-ink-900/20 pt-4 text-sm">
                <span className="text-ink-800">{c.facts[0].value}</span>
                <span className="font-semibold text-ink-900"><Ph>{c.startingPrice}</Ph></span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Comparison table */}
      <section className="bg-paper py-20 sm:py-28">
        <div className="container-site">
          <SectionHeading eyebrow="At a glance" title="Compare jurisdictions" accent="side by side." intro="Indicative information for the most common entity in each country. Requirements and rates change — we confirm the current position during consultation." />
          <div className="mt-12 overflow-x-auto rounded-panel border border-ink-900 bg-white">
            <table className="w-full min-w-[820px] text-left text-sm">
              <thead className="border-b border-ink-900 bg-texture text-ink-900">
                <tr>
                  {['Jurisdiction', 'Common entity', 'Typical timeline', 'Local director', 'Headline tax', 'Minimum capital'].map((h) => (
                    <th key={h} className="px-5 py-4 text-[0.8125rem] font-semibold">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {COMPARISON.map((row) => {
                  const c = getCountry(row.slug);
                  return (
                    <tr key={row.slug} className="transition-colors hover:bg-sun-light">
                      <td className="px-5 py-4">
                        <Link to={`/company-registration/${row.slug}`} className="flex items-center gap-3 font-serif text-[1.125rem] text-ink-900 hover:underline">
                          <Flag code={c.flag} className="h-4 w-6" /> {c.name}
                        </Link>
                      </td>
                      <td className="px-5 py-4 text-ink-800">{row.entity}</td>
                      <td className="px-5 py-4 text-ink-800">{row.timeline}</td>
                      <td className="px-5 py-4 text-ink-800">{row.localDirector}</td>
                      <td className="px-5 py-4 text-ink-800">{row.tax}</td>
                      <td className="px-5 py-4 text-ink-800">{row.capital}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-xs text-ink-800">Tax rates are headline corporate rates before surcharges, cess, exemptions or local taxes.</p>
        </div>
      </section>

      {/* India outbound */}
      <section className="on-dark bg-ink-900 py-20 text-white sm:py-28">
        <div className="container-site grid gap-10 lg:grid-cols-2 lg:items-center">
          <SectionHeading
            light
            eyebrow="For Indian promoters"
            title="Overseas investment,"
            accent="done by the book."
            intro="Funding a foreign company from India requires filings with your AD bank under FEMA. We run both tracks in parallel so your incorporation never waits on compliance."
          />
          <ol className="grid gap-3 sm:grid-cols-2">
            {['Eligibility & structure review', 'ODI filing & UIN allotment', 'Remittance & valuation documents', 'Annual Performance Report'].map((t, i) => (
              <li key={t} className="rounded-card border border-white/20 p-6">
                <span className="font-serif text-[2.5rem] leading-none text-sun">{i + 1}</span>
                <p className="mt-6 font-serif text-[1.25rem] leading-tight tracking-[-0.01em]">{t}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <FAQBlock items={FAQS} title="Global setup" accent="questions." />
      <CTABand title="Planning a company abroad?" accent="Let’s map it out." />
    </>
  );
}
