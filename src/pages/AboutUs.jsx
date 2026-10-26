import React from 'react';
import Seo, { breadcrumbLd } from '../lib/seo';
import { ABOUT, TEAM, WHY_US, STATS } from '../data/content';
import { SITE } from '../data/site';
import { PageHero, SectionHeading } from '../components/ui';
import Ph from '../components/ui/Ph';
import { CTABand } from '../components/Blocks';
import { Process, Testimonials } from '../components/home/Sections';
import { isPlaceholder } from '../lib/format';

const initials = (name) =>
  isPlaceholder(name) ? '—' : name.split(' ').map((w) => w[0]).slice(0, 2).join('');

export default function AboutUs() {
  const crumbs = [{ name: 'Home', path: '/' }, { name: 'About', path: '/about' }];
  return (
    <>
      <Seo
        title="About Us — Tax, Compliance & Global Setup Advisers in Delhi"
        description="Mishra and Associates is a Delhi-based tax and compliance firm advising individuals, founders and companies in India and across six international jurisdictions."
        path="/about"
        jsonLd={breadcrumbLd(crumbs)}
      />
      <PageHero crumbs={crumbs} eyebrow="About the firm" title="Precise advice," accent="personally delivered." intro={ABOUT.paragraphs[0]} />

      <section className="bg-white py-16 sm:py-24">
        <div className="container-site grid gap-14 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Our story" title={ABOUT.heading} />
            {ABOUT.paragraphs.slice(1).map((p) => (
              <p key={p} className="mt-5 leading-relaxed text-muted"><Ph>{p}</Ph></p>
            ))}
            <ul className="mt-8 space-y-3">
              {ABOUT.highlights.map((h) => (
                <li key={h} className="flex gap-3 text-ink-800"><i className="ri-check-line mt-0.5 text-lg text-brand-600" /> {h}</li>
              ))}
            </ul>
          </div>
          <div>
            <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-line bg-line">
              {STATS.map((s) => (
                <div key={s.label} className="flex flex-col-reverse bg-paper p-7">
                  <dt className="mt-1 text-sm font-semibold text-muted">{s.label}</dt>
                  <dd className="font-serif text-4xl text-ink-900"><Ph>{s.value}</Ph></dd>
                </div>
              ))}
            </dl>
            <div className="mt-6 rounded-3xl border border-line p-7">
              <p className="eyebrow">Who we work with</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {ABOUT.clientTypes.map((c) => <span key={c} className="chip">{c}</span>)}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="bg-paper py-16 sm:py-24">
        <div className="container-site">
          <SectionHeading eyebrow="Our people" title="The team behind" accent="your filings." />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {TEAM.map((m, i) => (
              <article key={i} className="overflow-hidden rounded-3xl border border-line bg-white">
                <div className="relative grid aspect-[4/3] place-items-center bg-ink-900">
                  {m.image ? (
                    <img src={m.image} alt={m.name} className="h-full w-full object-cover" />
                  ) : (
                    <span className="font-serif text-6xl italic text-brass-300/80">{initials(m.name)}</span>
                  )}
                  {!m.image && SITE.demoMode && (
                    <span className="absolute bottom-3 left-3 rounded-full bg-white/90 px-2.5 py-1 text-2xs font-bold text-muted">Photo to be provided</span>
                  )}
                </div>
                <div className="p-6">
                  <p className="font-serif text-xl text-ink-900"><Ph>{m.name}</Ph></p>
                  <p className="mt-1 text-sm font-semibold text-brand-700"><Ph>{m.role}</Ph></p>
                  <p className="mt-0.5 text-xs text-muted"><Ph>{m.qualification}</Ph></p>
                  <p className="mt-4 text-sm leading-relaxed text-muted"><Ph>{m.bio}</Ph></p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-white py-16 sm:py-24">
        <div className="container-site">
          <SectionHeading eyebrow="Why clients choose us" title="How we" accent="practise." />
          <div className="mt-12 grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {WHY_US.map((w) => (
              <div key={w.title} className="bg-white p-8">
                <i className={`${w.icon} text-3xl text-brand-600`} />
                <p className="mt-5 text-lg font-bold text-ink-900">{w.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted">{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Process />
      <Testimonials />
      <CTABand />
    </>
  );
}
