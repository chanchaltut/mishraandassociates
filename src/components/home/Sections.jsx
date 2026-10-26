import React from 'react';
import { Link } from 'react-router-dom';
import { PARENT_SERVICES } from '../../data/services';
import { COUNTRIES } from '../../data/countries';
import { NEWS } from '../../data/news';
import { NOTIFICATIONS, authorityOf } from '../../data/notifications';
import { BLOG_POSTS } from '../../data/blog';
import { getDueDates, daysUntil } from '../../data/calendar';
import { ABOUT, STATS, WHY_US, PROCESS_STEPS, TESTIMONIALS } from '../../data/content';
import { SITE } from '../../data/site';
import { formatDate, dayMonth } from '../../lib/format';
import { SectionHeading, Flag, SampleBadge, useReveal } from '../ui';
import Ph from '../ui/Ph';
import NewsletterForm from '../NewsletterForm';

// ─── Jurisdiction strip ───────────────────────────────────────
export function JurisdictionStrip() {
  return (
    <section className="border-b border-line bg-white">
      <div className="container-site flex flex-col gap-4 py-5 lg:flex-row lg:items-center lg:gap-10">
        <p className="shrink-0 text-2xs font-semibold uppercase tracking-[0.18em] text-muted">
          Company registration in
        </p>
        <div className="scrollbar-none -mx-4 flex flex-1 overflow-x-auto px-4 lg:mx-0 lg:px-0">
          {COUNTRIES.map((c) => (
            <Link
              key={c.slug}
              to={`/company-registration/${c.slug}`}
              className="group flex shrink-0 items-center gap-2.5 border-l border-line px-4 py-1 first:border-l-0 first:pl-0 lg:flex-1 lg:justify-center lg:first:justify-start"
            >
              <Flag code={c.flag} className="h-4 w-6" />
              <span className="text-sm font-medium text-ink-900 group-hover:text-brand-700">{c.shortName || c.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Practice areas ───────────────────────────────────────────
export function PracticeAreas() {
  const ref = useReveal();
  const global = PARENT_SERVICES.find((p) => p.isGlobal);
  const rest = PARENT_SERVICES.filter((p) => !p.isGlobal);

  return (
    <section ref={ref} className="bg-paper py-20 sm:py-28">
      <div className="container-site">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Practice areas"
            title="Thirteen practice areas."
            accent="One accountable team."
            intro="Over a hundred services, each with a fixed starting fee. Government fees are always shown separately, at actuals."
          />
          <Link to="/services" className="btn-outline shrink-0">Browse all services <i className="ri-arrow-right-line" /></Link>
        </div>

        <div className="reveal mt-10 grid grid-cols-2 border-l border-t border-line sm:mt-12 lg:grid-cols-4">
          {/* Featured: global company registration */}
          <Link
            to="/company-registration"
            className="on-dark group relative col-span-2 flex flex-col border-b border-r border-ink-900 bg-ink-900 p-6 text-white sm:p-8 lg:row-span-2"
          >
            <div className="flex items-center justify-between">
              <span className="text-2xs font-semibold uppercase tracking-[0.18em] text-brass-300">{global.badge}</span>
              <i className="ri-arrow-right-line text-xl text-white/40 transition-transform group-hover:translate-x-1 group-hover:text-brass-300" />
            </div>
            <h3 className="mt-6 font-serif text-[1.7rem] leading-tight !text-white sm:mt-10 sm:text-[2.2rem]">
              Company registration in India and worldwide
            </h3>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-white/70">{global.shortDesc}</p>
            <div className="mt-auto pt-8">
              <div className="grid grid-cols-2 gap-x-6 border-t border-white/10 pt-5 sm:grid-cols-4">
                {COUNTRIES.map((c) => (
                  <span key={c.slug} className="flex items-center gap-2 py-1.5 text-xs font-medium text-white/80">
                    <Flag code={c.flag} className="h-3 w-[18px]" />
                    {c.shortName || c.name}
                  </span>
                ))}
              </div>
            </div>
          </Link>

          {rest.map((p, i) => (
            <Link
              key={p.id}
              to={`/services?category=${encodeURIComponent(p.category)}`}
              className="group flex flex-col border-b border-r border-line bg-white p-4 transition-colors hover:bg-paper sm:p-6"
            >
              <div className="flex items-center justify-between">
                <span className="font-serif text-sm tabular-nums text-muted">{String(i + 1).padStart(2, '0')}</span>
                <i className={`${p.icon} text-lg text-brand-700 sm:text-xl`} aria-hidden="true" />
              </div>
              <h3 className="mt-4 font-serif text-[1.05rem] leading-snug sm:mt-8 sm:text-[1.3rem]">{p.title}</h3>
              <div className="hidden sm:block"><p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted">{p.shortDesc}</p></div>
              <p className="mt-auto flex items-center justify-between pt-4 text-xs sm:pt-6 sm:text-sm">
                <span>
                  <span className="text-muted">From </span>
                  <span className="font-semibold text-ink-900">{p.startingPrice}</span>
                </span>
                <i className="ri-arrow-right-line text-muted transition-transform group-hover:translate-x-1 group-hover:text-brand-700" aria-hidden="true" />
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Global setup (dark) ──────────────────────────────────────
export function GlobalSetup() {
  const ref = useReveal();
  return (
    <section ref={ref} className="on-dark relative overflow-hidden bg-ink-950 py-20 text-white sm:py-28">
      <div className="container-site relative grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionHeading
            light
            eyebrow="Global setup"
            title="Incorporate abroad."
            accent="Stay compliant at home."
            intro="We form your company overseas and handle the India side — FEMA overseas-investment filings, valuation, remittances and annual reporting — so one team owns the whole structure."
          />
          <ul className="mt-8 space-y-3 text-sm text-white/80">
            {['Entity and jurisdiction selection', 'Incorporation, registered agent / office and company secretary', 'Bank account and tax registration support', 'ODI filings through your AD bank and annual reporting'].map((t) => (
              <li key={t} className="flex gap-3">
                <i className="ri-check-line mt-0.5 text-brass-300" /> {t}
              </li>
            ))}
          </ul>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link to="/company-registration" className="btn-brass">Compare jurisdictions</Link>
            <Link to="/contact" className="btn-outline-light">Talk to an adviser</Link>
          </div>
        </div>

        <div className="reveal">
          <div className="hidden grid-cols-[1.2fr_1fr_0.7fr_24px] gap-6 border-b border-white/20 pb-3 text-2xs font-semibold uppercase tracking-[0.16em] text-white/45 sm:grid">
            <span>Jurisdiction</span>
            <span>Typical entity</span>
            <span>Timeline</span>
            <span />
          </div>
          <ul className="divide-y divide-white/10 border-b border-white/10">
            {COUNTRIES.map((c) => (
              <li key={c.slug}>
                <Link
                  to={`/company-registration/${c.slug}`}
                  className="group grid grid-cols-[1fr_24px] items-center gap-x-6 gap-y-1 py-5 transition-colors sm:grid-cols-[1.2fr_1fr_0.7fr_24px]"
                >
                  <span className="flex items-center gap-3">
                    <Flag code={c.flag} name={c.name} className="h-5 w-[30px]" />
                    <span className="font-serif text-xl text-white group-hover:text-brass-300">{c.name}</span>
                  </span>
                  <i className="ri-arrow-right-line row-span-2 text-lg text-white/35 transition-transform group-hover:translate-x-1 group-hover:text-brass-300 sm:order-last sm:row-span-1" />
                  <span className="text-sm text-white/75">{c.facts[0].value}</span>
                  <span className="hidden text-sm text-white/75 sm:block">{c.facts[2].value}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

// ─── Knowledge desk ───────────────────────────────────────────
export function KnowledgeDesk() {
  const ref = useReveal();
  const [featured, ...posts] = BLOG_POSTS;
  return (
    <section ref={ref} className="bg-white py-20 sm:py-28">
      <div className="container-site">
        <SectionHeading
          eyebrow="Knowledge hub"
          title="The desk that keeps you"
          accent="ahead of the deadline."
          intro="Notifications from CBDT, CBIC, MCA and RBI, news that matters, and plain-English guides from our team."
        />

        <div className="mt-12 grid gap-10 lg:grid-cols-12">
          {/* Blog */}
          <div className="reveal lg:col-span-5">
            <div className="mb-5 flex items-center justify-between border-b border-ink-900 pb-3">
              <h3 className="text-2xs font-semibold uppercase tracking-[0.18em]">From the blog</h3>
              <Link to="/blog" className="text-xs font-semibold text-brand-700 hover:underline">All articles →</Link>
            </div>
            <Link to={`/blog/${featured.slug}`} className="group block">
              <div className="aspect-[16/10] overflow-hidden rounded-sm bg-paper-2">
                <img src={featured.image} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <p className="mt-5 text-2xs font-semibold uppercase tracking-wider text-brass-600">{featured.category} · {featured.readTime}</p>
              <h4 className="mt-2 font-serif text-2xl leading-snug group-hover:text-brand-700">{featured.title}</h4>
              <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted">{featured.excerpt}</p>
            </Link>
            <ul className="mt-6 divide-y divide-line border-t border-line">
              {posts.slice(0, 3).map((p) => (
                <li key={p.slug}>
                  <Link to={`/blog/${p.slug}`} className="group flex gap-4 py-4">
                    <span className="text-2xs font-semibold uppercase tracking-wider text-muted">{p.category}</span>
                    <span className="flex-1 text-sm font-semibold leading-snug text-ink-900 group-hover:text-brand-700">{p.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* News */}
          <div className="reveal lg:col-span-4" style={{ transitionDelay: '80ms' }}>
            <div className="mb-5 flex items-center justify-between border-b border-ink-900 pb-3">
              <h3 className="text-2xs font-semibold uppercase tracking-[0.18em]">News &amp; updates</h3>
              <Link to="/news" className="text-xs font-semibold text-brand-700 hover:underline">All news →</Link>
            </div>
            <ul className="divide-y divide-line">
              {NEWS.slice(0, 5).map((n) => (
                <li key={n.slug}>
                  <Link to={`/news/${n.slug}`} className="group block py-4 first:pt-0">
                    <p className="flex items-center gap-2 text-2xs font-semibold uppercase tracking-wider text-muted">
                      <span className="text-brand-600">{n.category}</span> · {formatDate(n.date)} <SampleBadge item={n} />
                    </p>
                    <p className="mt-1.5 font-serif text-lg leading-snug text-ink-900 group-hover:text-brand-700">{n.title}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Notifications */}
          <div className="reveal lg:col-span-3" style={{ transitionDelay: '160ms' }}>
            <div className="mb-5 flex items-center justify-between border-b border-ink-900 pb-3">
              <h3 className="text-2xs font-semibold uppercase tracking-[0.18em]">Notifications</h3>
              <Link to="/notifications" className="text-xs font-semibold text-brand-700 hover:underline">All →</Link>
            </div>
            <ul className="divide-y divide-line">
              {NOTIFICATIONS.slice(0, 6).map((n) => (
                <li key={n.id}>
                  <Link to={`/notifications?authority=${n.authority}`} className="group block py-3.5 first:pt-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className="tag bg-ink-900 text-white">{authorityOf(n.authority)?.name}</span>
                      <span className="text-2xs font-semibold text-muted">{formatDate(n.date, { day: 'numeric', month: 'short' })}</span>
                    </div>
                    <p className="mt-2 line-clamp-2 text-[13px] font-semibold leading-snug text-ink-800 group-hover:text-brand-700">{n.title}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Due dates + newsletter ───────────────────────────────────
export function DueDates() {
  const ref = useReveal();
  const items = getDueDates(new Date(), 2).slice(0, 6);
  return (
    <section ref={ref} className="border-y border-line bg-paper py-20 sm:py-24">
      <div className="container-site grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-start">
        <div>
          <SectionHeading
            eyebrow="Compliance calendar"
            title="Due dates,"
            accent="before they’re due."
            intro="Statutory due dates for income tax, GST, payroll and company law — updated automatically. Subscribe to get reminders and our weekly brief."
          />
          <div className="mt-8 max-w-md">
            <NewsletterForm />
          </div>
        </div>

        <div className="reveal card overflow-hidden">
          <div className="flex items-center justify-between border-b border-line px-6 py-4">
            <p className="text-2xs font-semibold uppercase tracking-[0.16em] text-ink-900">Coming up</p>
            <Link to="/compliance-calendar" className="text-sm font-semibold text-brand-700 hover:underline">Full calendar →</Link>
          </div>
          <ul className="divide-y divide-line">
            {items.map((d) => {
              const dm = dayMonth(d.date);
              const left = daysUntil(d.date);
              return (
                <li key={`${d.title}-${d.date}`} className="flex items-center gap-5 px-6 py-4">
                  <span className="w-14 shrink-0 text-center">
                    <span className="block font-serif text-3xl leading-none text-ink-900">{dm.day}</span>
                    <span className="mt-1 block text-2xs font-semibold uppercase tracking-wider text-muted">{dm.month} · {dm.weekday}</span>
                  </span>
                  <span className="flex-1">
                    <span className="block text-sm font-semibold text-ink-900">{d.title}</span>
                    <span className="mt-0.5 block text-xs text-muted">{d.category}</span>
                  </span>
                  <span className={`tag shrink-0 ${left <= 5 ? 'bg-brass-100 text-brass-600' : 'bg-paper-2 text-muted'}`}>
                    {left === 0 ? 'Today' : left === 1 ? 'Tomorrow' : `In ${left} days`}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}

// ─── About the firm ───────────────────────────────────────────
export function AboutFirm() {
  const ref = useReveal();
  return (
    <section ref={ref} className="bg-white py-20 sm:py-28">
      <div className="container-site grid gap-14 lg:grid-cols-2 lg:items-center">
        <div className="reveal relative">
          <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-ink-900">
            <img
              src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=900&q=80&auto=format&fit=crop"
              alt="Mishra and Associates office"
              loading="lazy"
              className="h-full w-full object-cover opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-transparent" />
            <div className="on-dark absolute inset-x-6 bottom-6 text-white">
              <p className="text-2xs font-semibold uppercase tracking-[0.2em] text-brass-300">Since <Ph>{SITE.founded}</Ph></p>
              <p className="mt-2 font-serif text-2xl leading-snug">“<Ph>{'[A short quote from the founder about the firm’s philosophy.]'}</Ph>”</p>
              <p className="mt-3 text-sm text-white/70">— <Ph>[Founder name]</Ph>, <Ph>[Designation]</Ph></p>
            </div>
          </div>
          {SITE.demoMode && (
            <span className="absolute left-4 top-4 rounded-sm bg-white/90 px-3 py-1 text-2xs font-semibold text-muted">Stock photo — replace with office / team photo</span>
          )}
        </div>

        <div>
          <SectionHeading eyebrow="About the firm" title={ABOUT.heading} />
          {ABOUT.paragraphs.map((p) => (
            <p key={p} className="mt-5 leading-relaxed text-muted"><Ph>{p}</Ph></p>
          ))}

          <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-sm border border-line bg-line sm:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.label} className="flex flex-col-reverse bg-white p-5">
                <dt className="mt-1 text-xs font-semibold text-muted">{s.label}</dt>
                <dd className="font-serif text-3xl text-ink-900"><Ph>{s.value}</Ph></dd>
              </div>
            ))}
          </dl>

          <ul className="mt-10 grid gap-x-8 gap-y-6 sm:grid-cols-2">
            {WHY_US.slice(0, 4).map((w) => (
              <li key={w.title} className="flex gap-4">
                <i className={`${w.icon} mt-0.5 text-2xl text-brand-600`} />
                <div>
                  <p className="font-semibold text-ink-900">{w.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted">{w.desc}</p>
                </div>
              </li>
            ))}
          </ul>
          <Link to="/about" className="btn-outline mt-10">More about us <i className="ri-arrow-right-line" /></Link>
        </div>
      </div>
    </section>
  );
}

// ─── Process ──────────────────────────────────────────────────
export function Process() {
  const ref = useReveal();
  return (
    <section ref={ref} className="bg-paper py-20 sm:py-28">
      <div className="container-site">
        <SectionHeading eyebrow="How we work" title="Four steps." accent="No surprises." align="center" />
        <ol className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-sm border border-line bg-line sm:mt-14 lg:grid-cols-4">
          {PROCESS_STEPS.map((s, i) => (
            <li key={s.title} className="reveal bg-white p-5 sm:p-8" style={{ transitionDelay: `${i * 80}ms` }}>
              <span className="font-serif text-3xl tabular-nums text-brass-500 sm:text-4xl">0{i + 1}</span>
              <p className="mt-4 font-serif text-lg text-ink-900 sm:mt-8 sm:text-xl">{s.title}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted">{s.desc}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

// ─── Testimonials ─────────────────────────────────────────────
export function Testimonials() {
  const ref = useReveal();
  return (
    <section ref={ref} className="bg-white py-20 sm:py-28">
      <div className="container-site">
        <SectionHeading eyebrow="Client voices" title="What our clients" accent="say about us." />
        <div className="mt-12 grid gap-10 md:grid-cols-3 md:gap-8">
          {TESTIMONIALS.map((t, i) => (
            <figure key={i} className="reveal flex flex-col border-t-2 border-ink-900 pt-6" style={{ transitionDelay: `${i * 80}ms` }}>
              <span className="font-serif text-5xl leading-none text-brass-400" aria-hidden="true">“</span>
              <blockquote className="mt-2 flex-1 font-serif text-lg leading-relaxed text-ink-900"><Ph>{t.quote}</Ph></blockquote>
              <figcaption className="mt-6 border-t border-line pt-5 text-sm">
                <p className="font-semibold text-ink-900"><Ph>{t.name}</Ph></p>
                <p className="text-muted"><Ph>{t.role}</Ph> · <Ph>{t.city}</Ph></p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
