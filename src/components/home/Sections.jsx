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
    <section className="border-y border-line bg-white">
      <div className="container-site flex flex-col gap-5 py-6 lg:flex-row lg:items-center lg:gap-10">
        <p className="shrink-0 text-2xs font-bold uppercase tracking-[0.2em] text-muted">
          Company registration in
        </p>
        <div className="scrollbar-none -mx-4 flex flex-1 gap-2 overflow-x-auto px-4 lg:mx-0 lg:justify-between lg:px-0">
          {COUNTRIES.map((c) => (
            <Link
              key={c.slug}
              to={`/company-registration/${c.slug}`}
              className="group flex shrink-0 items-center gap-2.5 rounded-full border border-line py-1.5 pl-1.5 pr-4 transition-all hover:border-brand-500 hover:shadow-soft"
            >
              <Flag code={c.flag} className="h-7 w-7 !rounded-full" />
              <span className="text-sm font-bold text-ink-900 group-hover:text-brand-700">{c.shortName || c.name}</span>
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

        <div className="mt-10 grid grid-cols-2 gap-3 sm:mt-12 sm:gap-4 lg:grid-cols-4">
          {/* Featured: global company registration */}
          <Link
            to="/company-registration"
            className="reveal on-dark group relative col-span-2 flex flex-col overflow-hidden rounded-3xl bg-ink-900 p-6 text-white sm:p-7 lg:row-span-2"
          >
            <div className="bg-grid-dark pointer-events-none absolute inset-0" />
            <div className="relative flex items-center justify-between">
              <span className="tag bg-brass-400 text-ink-950">{global.badge}</span>
              <i className="ri-arrow-right-up-line text-2xl text-white/50 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brass-300" />
            </div>
            <h3 className="relative mt-6 font-serif text-[1.7rem] leading-tight !text-white sm:mt-10 sm:text-4xl">
              Company registration — <em className="italic text-brass-300">India &amp; worldwide</em>
            </h3>
            <p className="relative mt-4 max-w-md text-sm leading-relaxed text-white/70">{global.shortDesc}</p>
            <div className="relative mt-auto grid grid-cols-2 gap-2 pt-8 sm:grid-cols-4">
              {COUNTRIES.map((c) => (
                <span key={c.slug} className="flex items-center gap-2 rounded-xl bg-white/5 px-3 py-2 text-xs font-semibold text-white/85">
                  <Flag code={c.flag} className="h-3.5 w-5" />
                  {c.shortName || c.name}
                </span>
              ))}
            </div>
          </Link>

          {rest.map((p, i) => (
            <Link
              key={p.id}
              to={`/services?category=${encodeURIComponent(p.category)}`}
              className="reveal group flex flex-col rounded-2xl border border-line bg-white p-4 transition-all hover:-translate-y-1 hover:border-brand-200 hover:shadow-lift sm:rounded-3xl sm:p-6"
              style={{ transitionDelay: `${(i % 4) * 60}ms` }}
            >
              <div className="flex items-start justify-between">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-50 text-lg text-brand-700 transition-colors group-hover:bg-brand-700 group-hover:text-white sm:h-11 sm:w-11 sm:rounded-2xl sm:text-xl">
                  <i className={p.icon} />
                </span>
                <span className="hidden text-2xs font-bold uppercase tracking-wider text-muted sm:inline">{p.subcategories.length} services</span>
              </div>
              <h3 className="mt-4 text-[15px] font-bold leading-snug sm:mt-6 sm:text-lg">{p.title}</h3>
              <div className="hidden sm:block"><p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted">{p.shortDesc}</p></div>
              <p className="mt-auto pt-3 text-xs sm:pt-5 sm:text-sm">
                <span className="text-muted">From </span>
                <span className="font-bold text-brand-700">{p.startingPrice}</span>
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
      <div className="bg-grid-dark pointer-events-none absolute inset-0" />
      <div className="pointer-events-none absolute -left-32 bottom-0 h-96 w-96 rounded-full bg-brand-600/30 blur-3xl" />
      <div className="container-site relative grid gap-14 xl:grid-cols-[0.9fr_1.1fr]">
        <div className="xl:sticky xl:top-32 xl:self-start">
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

        <div className="grid gap-3 sm:grid-cols-2">
          {COUNTRIES.map((c, i) => (
            <Link
              key={c.slug}
              to={`/company-registration/${c.slug}`}
              className={`reveal group rounded-3xl border border-white/10 bg-white/[0.03] p-6 transition-all hover:border-brass-400/50 hover:bg-white/[0.06] ${i === 0 ? 'sm:col-span-2' : ''}`}
              style={{ transitionDelay: `${(i % 2) * 80}ms` }}
            >
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-3">
                  <Flag code={c.flag} name={c.name} className="h-7 w-10" />
                  <span className="font-serif text-xl">{c.name}</span>
                </span>
                <i className="ri-arrow-right-up-line text-xl text-white/40 transition-colors group-hover:text-brass-300" />
              </div>
              <dl className="mt-5 grid grid-cols-2 gap-4 text-sm">
                <div>
                  <dt className="text-2xs font-bold uppercase tracking-wider text-white/45">Entity</dt>
                  <dd className="mt-1 text-white/85">{c.facts[0].value}</dd>
                </div>
                <div>
                  <dt className="text-2xs font-bold uppercase tracking-wider text-white/45">Timeline</dt>
                  <dd className="mt-1 text-white/85">{c.facts[2].value}</dd>
                </div>
              </dl>
            </Link>
          ))}
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
              <h3 className="text-2xs font-bold uppercase tracking-[0.18em]">From the blog</h3>
              <Link to="/blog" className="text-xs font-bold text-brand-700 hover:underline">All articles →</Link>
            </div>
            <Link to={`/blog/${featured.slug}`} className="group block">
              <div className="aspect-[16/10] overflow-hidden rounded-2xl bg-paper-2">
                <img src={featured.image} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <p className="mt-5 text-2xs font-bold uppercase tracking-wider text-brass-600">{featured.category} · {featured.readTime}</p>
              <h4 className="mt-2 font-serif text-2xl leading-snug group-hover:text-brand-700">{featured.title}</h4>
              <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted">{featured.excerpt}</p>
            </Link>
            <ul className="mt-6 divide-y divide-line border-t border-line">
              {posts.slice(0, 3).map((p) => (
                <li key={p.slug}>
                  <Link to={`/blog/${p.slug}`} className="group flex gap-4 py-4">
                    <span className="text-2xs font-bold uppercase tracking-wider text-muted">{p.category}</span>
                    <span className="flex-1 text-sm font-semibold leading-snug text-ink-900 group-hover:text-brand-700">{p.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* News */}
          <div className="reveal lg:col-span-4" style={{ transitionDelay: '80ms' }}>
            <div className="mb-5 flex items-center justify-between border-b border-ink-900 pb-3">
              <h3 className="text-2xs font-bold uppercase tracking-[0.18em]">News &amp; updates</h3>
              <Link to="/news" className="text-xs font-bold text-brand-700 hover:underline">All news →</Link>
            </div>
            <ul className="divide-y divide-line">
              {NEWS.slice(0, 5).map((n) => (
                <li key={n.slug}>
                  <Link to={`/news/${n.slug}`} className="group block py-4 first:pt-0">
                    <p className="flex items-center gap-2 text-2xs font-bold uppercase tracking-wider text-muted">
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
              <h3 className="text-2xs font-bold uppercase tracking-[0.18em]">Notifications</h3>
              <Link to="/notifications" className="text-xs font-bold text-brand-700 hover:underline">All →</Link>
            </div>
            <ul className="space-y-3">
              {NOTIFICATIONS.slice(0, 6).map((n) => (
                <li key={n.id}>
                  <Link to={`/notifications?authority=${n.authority}`} className="group block rounded-xl border border-line p-3.5 transition-colors hover:border-brand-200 hover:bg-paper">
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
    <section ref={ref} className="border-y border-line bg-paper-2/60 py-20 sm:py-24">
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
            <p className="font-bold">Coming up</p>
            <Link to="/compliance-calendar" className="text-sm font-bold text-brand-700 hover:underline">Full calendar →</Link>
          </div>
          <ul className="divide-y divide-line">
            {items.map((d) => {
              const dm = dayMonth(d.date);
              const left = daysUntil(d.date);
              return (
                <li key={`${d.title}-${d.date}`} className="flex items-center gap-5 px-6 py-4">
                  <span className="w-14 shrink-0 text-center">
                    <span className="block font-serif text-3xl leading-none text-ink-900">{dm.day}</span>
                    <span className="mt-1 block text-2xs font-bold uppercase tracking-wider text-muted">{dm.month} · {dm.weekday}</span>
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
          <div className="relative aspect-[4/5] overflow-hidden rounded-[32px] bg-ink-900">
            <img
              src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=900&q=80&auto=format&fit=crop"
              alt="Mishra and Associates office"
              loading="lazy"
              className="h-full w-full object-cover opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-transparent" />
            <div className="on-dark absolute inset-x-6 bottom-6 text-white">
              <p className="text-2xs font-bold uppercase tracking-[0.2em] text-brass-300">Since <Ph>{SITE.founded}</Ph></p>
              <p className="mt-2 font-serif text-2xl leading-snug">“<Ph>{'[A short quote from the founder about the firm’s philosophy.]'}</Ph>”</p>
              <p className="mt-3 text-sm text-white/70">— <Ph>[Founder name]</Ph>, <Ph>[Designation]</Ph></p>
            </div>
          </div>
          {SITE.demoMode && (
            <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-2xs font-bold text-muted">Stock photo — replace with office / team photo</span>
          )}
        </div>

        <div>
          <SectionHeading eyebrow="About the firm" title={ABOUT.heading} />
          {ABOUT.paragraphs.map((p) => (
            <p key={p} className="mt-5 leading-relaxed text-muted"><Ph>{p}</Ph></p>
          ))}

          <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-4">
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
                  <p className="font-bold text-ink-900">{w.title}</p>
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
        <ol className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-line bg-line sm:mt-14 lg:grid-cols-4">
          {PROCESS_STEPS.map((s, i) => (
            <li key={s.title} className="reveal bg-white p-5 sm:p-8" style={{ transitionDelay: `${i * 80}ms` }}>
              <span className="font-serif text-4xl italic text-brass-500 sm:text-5xl">0{i + 1}</span>
              <p className="mt-4 text-base font-bold text-ink-900 sm:mt-6 sm:text-lg">{s.title}</p>
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
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <figure key={i} className="reveal flex flex-col rounded-3xl border border-line bg-paper p-7" style={{ transitionDelay: `${i * 80}ms` }}>
              <i className="ri-double-quotes-l text-4xl text-brass-400" aria-hidden="true" />
              <blockquote className="mt-4 flex-1 font-serif text-lg leading-relaxed text-ink-900"><Ph>{t.quote}</Ph></blockquote>
              <figcaption className="mt-6 border-t border-line pt-5 text-sm">
                <p className="font-bold text-ink-900"><Ph>{t.name}</Ph></p>
                <p className="text-muted"><Ph>{t.role}</Ph> · <Ph>{t.city}</Ph></p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
