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

const NUMBER_WORDS = ['Zero', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen', 'Twenty'];
const inWords = (n) => NUMBER_WORDS[n] || String(n);

// Soft fills rotated across card grids
const FILLS = ['bg-cream', 'bg-cornflower', 'bg-mint', 'bg-rose', 'bg-peach'];

// ─── Jurisdiction strip ───────────────────────────────────────
export function JurisdictionStrip() {
  return (
    <section className="border-b border-line bg-white">
      <div className="container-site flex flex-col gap-4 py-7 lg:flex-row lg:items-center lg:gap-10">
        <p className="shrink-0 text-[0.9375rem] font-medium text-ink-900">Company registration in</p>
        <div className="scrollbar-none -mx-4 flex flex-1 gap-2 overflow-x-auto px-4 lg:mx-0 lg:justify-between lg:px-0">
          {COUNTRIES.map((c) => (
            <Link
              key={c.slug}
              to={`/company-registration/${c.slug}`}
              className="group flex shrink-0 items-center gap-2.5 rounded-full border border-line px-4 py-2 transition-colors hover:border-ink-900"
            >
              <Flag code={c.flag} className="h-4 w-6" />
              <span className="text-[0.9375rem] text-ink-900">{c.shortName || c.name}</span>
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
    <section ref={ref} className="bg-white py-20 sm:py-28">
      <div className="container-site">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Practice areas"
            title={`${inWords(PARENT_SERVICES.length)} practice areas.`}
            accent="One accountable team."
            intro="Over a hundred services — from GST and income tax to trademarks, ISO certification and customs clearance — handled end to end by one team."
          />
          <Link to="/services" className="btn-outline shrink-0 self-start lg:self-auto">Browse all services</Link>
        </div>

        <div className="reveal mt-12 grid grid-cols-2 gap-3 sm:mt-16 sm:gap-4 lg:grid-cols-4">
          {/* Featured: global company registration */}
          <Link
            to="/company-registration"
            className="on-dark group relative col-span-2 flex flex-col rounded-panel bg-ink-900 p-7 text-white sm:p-10 lg:row-span-2"
          >
            <span className="text-sm font-semibold text-sun">{global.badge}</span>
            <h3 className="mt-6 font-serif text-[2rem] leading-[1.05] tracking-[-0.025em] !text-white sm:mt-10 sm:text-[2.75rem]">
              Company registration in India <em className="italic">and worldwide</em>
            </h3>
            <p className="mt-5 max-w-md text-[0.9375rem] leading-relaxed text-white/75">{global.shortDesc}</p>
            <div className="mt-auto pt-10">
              <div className="flex flex-wrap gap-2">
                {COUNTRIES.map((c) => (
                  <span key={c.slug} className="flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-[0.8125rem] text-white">
                    <Flag code={c.flag} className="h-3 w-[18px]" />
                    {c.shortName || c.name}
                  </span>
                ))}
              </div>
              <span className="btn-primary mt-8">Compare jurisdictions</span>
            </div>
          </Link>

          {rest.map((p, i) => (
            <Link
              key={p.id}
              to={`/services?category=${encodeURIComponent(p.category)}`}
              className="group flex flex-col rounded-card bg-paper p-5 transition-colors hover:bg-sun-light sm:p-6"
            >
              <span className={`grid h-11 w-11 place-items-center rounded-full text-xl text-ink-900 ${FILLS[i % FILLS.length]}`} aria-hidden="true">
                <i className={p.icon} />
              </span>
              <h3 className="mt-6 font-serif text-[1.25rem] leading-[1.15] tracking-[-0.015em] group-hover:underline sm:mt-8 sm:text-[1.5rem]">{p.title}</h3>
              <div className="hidden sm:block"><p className="mt-2 line-clamp-3 text-sm leading-relaxed text-ink-800">{p.shortDesc}</p></div>
            </Link>
          ))}

          {/* Fills the two empty cells left in the last row of the 4-column grid */}
          {rest.length % 4 === 2 && (
            <Link to="/services" className="group col-span-2 flex items-center justify-between gap-6 rounded-card bg-texture p-6 sm:p-8">
              <span className="font-serif text-[1.5rem] leading-tight tracking-[-0.02em] text-ink-900 sm:text-[1.875rem]">
                See every service <em className="italic">in one place</em>
              </span>
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-ink-900 text-xl text-ink-900 transition-colors group-hover:bg-ink-900 group-hover:text-white">
                <i className="ri-arrow-right-line" />
              </span>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}

// ─── Global setup (dark) ──────────────────────────────────────
export function GlobalSetup() {
  const ref = useReveal();
  return (
    <section ref={ref} className="on-dark relative overflow-hidden bg-ink-900 py-20 text-white sm:py-28">
      <div className="container-site relative grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionHeading
            light
            eyebrow="Global setup"
            title="Incorporate abroad."
            accent="Stay compliant at home."
            intro="We form your company overseas and handle the India side — FEMA overseas-investment filings, valuation, remittances and annual reporting — so one team owns the whole structure."
          />
          <ul className="mt-8 space-y-3 text-[0.9375rem] text-white/85">
            {['Entity and jurisdiction selection', 'Incorporation, registered agent / office and company secretary', 'Bank account and tax registration support', 'ODI filings through your AD bank and annual reporting'].map((t) => (
              <li key={t} className="flex gap-3">
                <i className="ri-check-line mt-0.5 text-sun" /> {t}
              </li>
            ))}
          </ul>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link to="/company-registration" className="btn-primary">Compare jurisdictions</Link>
            <Link to="/contact" className="btn-outline-light">Talk to an adviser</Link>
          </div>
        </div>

        <div className="reveal">
          <div className="hidden grid-cols-[1.2fr_1fr_0.7fr_40px] gap-6 border-b border-white/25 pb-3 text-[0.8125rem] font-medium text-white/60 sm:grid">
            <span>Jurisdiction</span>
            <span>Typical entity</span>
            <span>Timeline</span>
            <span />
          </div>
          <ul className="divide-y divide-white/15 border-b border-white/15">
            {COUNTRIES.map((c) => (
              <li key={c.slug}>
                <Link
                  to={`/company-registration/${c.slug}`}
                  className="group grid grid-cols-[1fr_40px] items-center gap-x-6 gap-y-1 py-5 sm:grid-cols-[1.2fr_1fr_0.7fr_40px]"
                >
                  <span className="flex items-center gap-3">
                    <Flag code={c.flag} name={c.name} className="h-5 w-[30px]" />
                    <span className="font-serif text-[1.5rem] tracking-[-0.02em] text-white group-hover:underline">{c.name}</span>
                  </span>
                  <span className="row-span-2 grid h-10 w-10 place-items-center rounded-full border border-white/40 text-white transition-colors group-hover:border-sun group-hover:bg-sun group-hover:text-ink-900 sm:order-last sm:row-span-1">
                    <i className="ri-arrow-right-line" />
                  </span>
                  <span className="text-[0.9375rem] text-white/75">{c.facts[0].value}</span>
                  <span className="hidden text-[0.9375rem] text-white/75 sm:block">{c.facts[2].value}</span>
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
function ColumnHead({ title, to, link }) {
  return (
    <div className="mb-5 flex items-center justify-between border-b border-ink-900 pb-3">
      <h3 className="text-[0.9375rem] font-semibold text-ink-900">{title}</h3>
      <Link to={to} className="text-link text-[0.8125rem]">{link}</Link>
    </div>
  );
}

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

        <div className="mt-14 grid gap-12 lg:grid-cols-12 lg:gap-10">
          {/* Blog */}
          <div className="reveal lg:col-span-5">
            <ColumnHead title="From the blog" to="/blog" link="All articles" />
            <Link to={`/blog/${featured.slug}`} className="group block">
              <div className="media aspect-[16/10]">
                <img src={featured.image} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <p className="label mt-5">{featured.category} · {featured.readTime}</p>
              <h4 className="mt-2 font-serif text-[1.75rem] leading-[1.1] tracking-[-0.02em] group-hover:underline">{featured.title}</h4>
              <p className="mt-3 line-clamp-2 text-[0.9375rem] leading-relaxed text-ink-800">{featured.excerpt}</p>
            </Link>
            <ul className="mt-6 divide-y divide-line border-t border-line">
              {posts.slice(0, 3).map((p) => (
                <li key={p.slug}>
                  <Link to={`/blog/${p.slug}`} className="group block py-4">
                    <span className="label">{p.category}</span>
                    <span className="mt-1 block text-[0.9375rem] font-medium leading-snug text-ink-900 group-hover:underline">{p.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* News */}
          <div className="reveal lg:col-span-4" style={{ transitionDelay: '80ms' }}>
            <ColumnHead title="News & updates" to="/news" link="All news" />
            <ul className="divide-y divide-line">
              {NEWS.slice(0, 5).map((n) => (
                <li key={n.slug}>
                  <Link to={`/news/${n.slug}`} className="group block py-4 first:pt-0">
                    <p className="label flex items-center gap-2">
                      <span className="font-semibold text-ink-900">{n.category}</span> · {formatDate(n.date)} <SampleBadge item={n} />
                    </p>
                    <p className="mt-1.5 font-serif text-[1.3rem] leading-[1.2] tracking-[-0.01em] text-ink-900 group-hover:underline">{n.title}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Notifications */}
          <div className="reveal lg:col-span-3" style={{ transitionDelay: '160ms' }}>
            <ColumnHead title="Notifications" to="/notifications" link="All" />
            <ul className="divide-y divide-line">
              {NOTIFICATIONS.slice(0, 6).map((n) => (
                <li key={n.id}>
                  <Link to={`/notifications?authority=${n.authority}`} className="group block py-3.5 first:pt-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className="tag bg-cream text-ink-900">{authorityOf(n.authority)?.name}</span>
                      <span className="label">{formatDate(n.date, { day: 'numeric', month: 'short' })}</span>
                    </div>
                    <p className="mt-2 line-clamp-2 text-sm leading-snug text-ink-900 group-hover:underline">{n.title}</p>
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
    <section ref={ref} className="bg-cream py-20 sm:py-28">
      <div className="container-site grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:items-center lg:gap-16">
        <div>
          <SectionHeading
            eyebrow="Compliance calendar"
            title="Due dates,"
            accent="before they’re due."
            intro="Statutory due dates for income tax, GST, payroll and company law — updated automatically. Subscribe to get reminders and our weekly brief."
          />
          <div className="mt-9 max-w-md">
            <NewsletterForm />
          </div>
        </div>

        <div className="reveal overflow-hidden rounded-panel border border-ink-900 bg-white">
          <div className="flex items-center justify-between border-b border-line px-6 py-5 sm:px-7">
            <p className="font-serif text-[1.5rem] tracking-[-0.02em] text-ink-900">Coming up</p>
            <Link to="/compliance-calendar" className="text-link text-sm">Full calendar</Link>
          </div>
          <ul className="divide-y divide-line">
            {items.map((d) => {
              const dm = dayMonth(d.date);
              const left = daysUntil(d.date);
              return (
                <li key={`${d.title}-${d.date}`} className="flex items-center gap-5 px-6 py-4 sm:px-7">
                  <span className="w-14 shrink-0 text-center">
                    <span className="block font-serif text-[2rem] leading-none text-ink-900">{dm.day}</span>
                    <span className="mt-1 block text-2xs font-medium text-muted">{dm.month} · {dm.weekday}</span>
                  </span>
                  <span className="flex-1">
                    <span className="block text-[0.9375rem] font-medium text-ink-900">{d.title}</span>
                    <span className="mt-0.5 block text-xs text-muted">{d.category}</span>
                  </span>
                  <span className={`tag shrink-0 ${left <= 5 ? 'bg-sun text-ink-900' : 'bg-paper text-ink-800'}`}>
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
      <div className="container-site grid gap-14 lg:grid-cols-2 lg:items-center lg:gap-20">
        <div className="reveal relative">
          <div className="media relative aspect-[4/5]">
            <img
              src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=900&q=80&auto=format&fit=crop"
              alt="Mishra and Associates office"
              loading="lazy"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-x-4 bottom-4 rounded-card bg-white p-6 sm:inset-x-6 sm:bottom-6">
              <p className="text-sm font-semibold text-ink-900">Since <Ph>{SITE.founded}</Ph></p>
              <p className="mt-2 font-serif text-[1.4rem] leading-snug tracking-[-0.01em] text-ink-900">“<Ph>{'[A short quote from the founder about the firm’s philosophy.]'}</Ph>”</p>
              <p className="mt-3 text-sm text-ink-800">— <Ph>[Founder name]</Ph>, <Ph>[Designation]</Ph></p>
            </div>
          </div>
          {SITE.demoMode && (
            <span className="absolute left-4 top-4 rounded-full bg-white px-3 py-1 text-2xs font-medium text-ink-800">Stock photo — replace with office / team photo</span>
          )}
        </div>

        <div>
          <SectionHeading eyebrow="About the firm" title={ABOUT.heading} />
          {ABOUT.paragraphs.map((p) => (
            <p key={p} className="mt-5 text-[1.0625rem] leading-relaxed text-ink-800"><Ph>{p}</Ph></p>
          ))}

          <dl className="mt-10 grid grid-cols-2 gap-x-8 gap-y-8">
            {STATS.map((s) => (
              <div key={s.label} className="flex flex-col-reverse justify-end border-t border-ink-900 pt-4">
                <dt className="mt-1 text-[0.8125rem] text-ink-800">{s.label}</dt>
                <dd className="font-serif text-[2.5rem] leading-none tracking-[-0.03em] text-ink-900"><Ph>{s.value}</Ph></dd>
              </div>
            ))}
          </dl>

          <ul className="mt-12 grid gap-x-8 gap-y-7 sm:grid-cols-2">
            {WHY_US.slice(0, 4).map((w, i) => (
              <li key={w.title} className="flex gap-4">
                <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-full text-lg text-ink-900 ${FILLS[i % FILLS.length]}`}>
                  <i className={w.icon} />
                </span>
                <div>
                  <p className="font-semibold text-ink-900">{w.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-ink-800">{w.desc}</p>
                </div>
              </li>
            ))}
          </ul>
          <Link to="/about" className="btn-outline mt-12">More about us</Link>
        </div>
      </div>
    </section>
  );
}

// ─── Process ──────────────────────────────────────────────────
const STEP_FILLS = ['bg-cornflower', 'bg-mint', 'bg-rose', 'bg-peach'];

export function Process() {
  const ref = useReveal();
  return (
    <section ref={ref} className="bg-paper py-20 sm:py-28">
      <div className="container-site">
        <SectionHeading eyebrow="How we work" title="Four steps." accent="No surprises." align="center" />
        <ol className="mt-12 grid grid-cols-1 gap-3 xs:grid-cols-2 sm:mt-16 sm:gap-4 lg:grid-cols-4">
          {PROCESS_STEPS.map((s, i) => (
            <li key={s.title} className={`reveal flex flex-col rounded-panel p-7 sm:p-8 ${STEP_FILLS[i % STEP_FILLS.length]}`} style={{ transitionDelay: `${i * 80}ms` }}>
              <span className="font-serif text-[3.5rem] leading-none tracking-[-0.04em] text-ink-900">{i + 1}</span>
              <p className="mt-10 font-serif text-[1.5rem] leading-tight tracking-[-0.02em] text-ink-900 sm:mt-14">{s.title}</p>
              <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-800">{s.desc}</p>
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
    <section ref={ref} className="on-dark bg-brand-800 py-20 text-white sm:py-28">
      <div className="container-site">
        <SectionHeading light eyebrow="Client voices" title="What our clients" accent="say about us." />
        <div className="mt-14 grid gap-12 md:grid-cols-3 md:gap-8">
          {TESTIMONIALS.map((t, i) => (
            <figure key={i} className="reveal flex flex-col border-t border-white/40 pt-7" style={{ transitionDelay: `${i * 80}ms` }}>
              <span className="font-serif text-[4rem] leading-[0.6] text-sun" aria-hidden="true">“</span>
              <blockquote className="mt-4 flex-1 font-serif text-[1.375rem] leading-snug tracking-[-0.01em] text-white"><Ph>{t.quote}</Ph></blockquote>
              <figcaption className="mt-7 text-sm">
                <p className="font-semibold text-white"><Ph>{t.name}</Ph></p>
                <p className="text-white/70"><Ph>{t.role}</Ph> · <Ph>{t.city}</Ph></p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
