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
            <Link key={c.slug} to={`/company-registration/${c.slug}`} className="chip !py-2">
              <Flag code={c.flag} className="h-3.5 w-5" /> {c.shortName || c.name}
            </Link>
          ))}
        </div>
      </PageHero>

      {/* Country cards */}
      <section className="bg-paper py-16 sm:py-20">
        <div className="container-site grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {COUNTRIES.map((c) => (
            <Link key={c.slug} to={`/company-registration/${c.slug}`} className="group flex flex-col rounded-sm border border-line bg-white p-7 transition-all">
              <div className="flex items-center justify-between">
                <Flag code={c.flag} name={c.name} className="h-9 w-14" />
                <i className="ri-arrow-right-line text-xl text-muted transition-colors group-hover:text-brand-600" />
              </div>
              <h2 className="mt-6 font-serif text-2xl text-ink-900">{c.name}</h2>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{c.tagline}</p>
              <div className="mt-6 flex items-center justify-between border-t border-line pt-4 text-sm">
                <span className="text-muted">{c.facts[0].value}</span>
                <span className="font-semibold text-brand-700"><Ph>{c.startingPrice}</Ph></span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Comparison table */}
      <section className="bg-white py-16 sm:py-24">
        <div className="container-site">
          <SectionHeading eyebrow="At a glance" title="Compare jurisdictions" accent="side by side." intro="Indicative information for the most common entity in each country. Requirements and rates change — we confirm the current position during consultation." />
          <div className="mt-10 overflow-x-auto rounded-sm border border-line">
            <table className="w-full min-w-[820px] text-left text-sm">
              <thead className="bg-ink-900 text-white">
                <tr>
                  {['Jurisdiction', 'Common entity', 'Typical timeline', 'Local director', 'Headline tax', 'Minimum capital'].map((h) => (
                    <th key={h} className="px-5 py-4 text-2xs font-semibold uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {COMPARISON.map((row) => {
                  const c = getCountry(row.slug);
                  return (
                    <tr key={row.slug} className="transition-colors hover:bg-paper">
                      <td className="px-5 py-4">
                        <Link to={`/company-registration/${row.slug}`} className="flex items-center gap-3 font-semibold text-ink-900 hover:text-brand-700">
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
          <p className="mt-3 text-xs text-muted">Tax rates are headline corporate rates before surcharges, cess, exemptions or local taxes.</p>
        </div>
      </section>

      {/* India outbound */}
      <section className="on-dark bg-ink-950 py-16 text-white sm:py-24">
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
              <li key={t} className="rounded-sm border border-white/10 bg-white/[0.04] p-5">
                <span className="font-serif text-3xl text-brass-300">0{i + 1}</span>
                <p className="mt-3 font-semibold">{t}</p>
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
