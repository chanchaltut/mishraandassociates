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

      <section className="bg-white py-20 sm:py-28">
        <div className="container-site grid gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionHeading eyebrow="Our story" title={ABOUT.heading} />
            {ABOUT.paragraphs.slice(1).map((p) => (
              <p key={p} className="mt-5 text-[1.0625rem] leading-relaxed text-ink-800"><Ph>{p}</Ph></p>
            ))}
            <ul className="mt-8 space-y-3">
              {ABOUT.highlights.map((h) => (
                <li key={h} className="flex gap-3 text-ink-900"><span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-sun text-sm"><i className="ri-check-line" /></span> {h}</li>
              ))}
            </ul>
          </div>
          <div>
            <dl className="grid grid-cols-2 gap-3">
              {STATS.map((s, i) => (
                <div key={s.label} className={`flex flex-col-reverse rounded-card p-7 ${['bg-cream', 'bg-cornflower', 'bg-mint', 'bg-peach'][i % 4]}`}>
                  <dt className="mt-2 text-sm text-ink-800">{s.label}</dt>
                  <dd className="font-serif text-[3rem] leading-none tracking-[-0.03em] text-ink-900"><Ph>{s.value}</Ph></dd>
                </div>
              ))}
            </dl>
            <div className="mt-3 rounded-card border border-ink-900 p-7">
              <p className="eyebrow">Who we work with</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {ABOUT.clientTypes.map((c) => <span key={c} className="chip">{c}</span>)}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="bg-paper py-20 sm:py-28">
        <div className="container-site">
          <SectionHeading eyebrow="Our people" title="The team behind" accent="your filings." />
          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {TEAM.map((m, i) => (
              <article key={i} className="overflow-hidden rounded-panel bg-white">
                <div className={`relative grid aspect-[4/3] place-items-center ${['bg-sun', 'bg-cornflower', 'bg-mint'][i % 3]}`}>
                  {m.image ? (
                    <img src={m.image} alt={m.name} className="h-full w-full object-cover" />
                  ) : (
                    <span className="font-serif text-7xl italic tracking-[-0.04em] text-ink-900">{initials(m.name)}</span>
                  )}
                  {!m.image && SITE.demoMode && (
                    <span className="absolute bottom-3 left-3 rounded-full bg-white px-2.5 py-1 text-2xs font-medium text-ink-800">Photo to be provided</span>
                  )}
                </div>
                <div className="p-7">
                  <p className="font-serif text-[1.625rem] leading-tight tracking-[-0.02em] text-ink-900"><Ph>{m.name}</Ph></p>
                  <p className="mt-1 text-sm font-semibold text-ink-900"><Ph>{m.role}</Ph></p>
                  <p className="mt-0.5 text-xs text-ink-800"><Ph>{m.qualification}</Ph></p>
                  <p className="mt-4 text-[0.9375rem] leading-relaxed text-ink-800"><Ph>{m.bio}</Ph></p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-white py-20 sm:py-28">
        <div className="container-site">
          <SectionHeading eyebrow="Why clients choose us" title="How we" accent="practise." />
          <div className="mt-14 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {WHY_US.map((w, i) => (
              <div key={w.title} className="border-t border-ink-900 pt-7">
                <span className={`grid h-12 w-12 place-items-center rounded-full text-2xl text-ink-900 ${['bg-cream', 'bg-cornflower', 'bg-mint', 'bg-rose', 'bg-peach'][i % 5]}`}><i className={w.icon} /></span>
                <p className="mt-6 font-serif text-[1.5rem] leading-tight tracking-[-0.015em] text-ink-900">{w.title}</p>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-800">{w.desc}</p>
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
