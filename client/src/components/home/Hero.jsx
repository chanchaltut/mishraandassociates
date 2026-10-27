import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HERO } from '../../data/content';
import { NOTIFICATIONS, authorityOf } from '../../data/notifications';
import { NEWS } from '../../data/news';
import { getDueDates, daysUntil } from '../../data/calendar';
import { searchSite } from '../../lib/search';
import { formatDate, dayMonth } from '../../lib/format';
import { SITE } from '../../data/site';
import { img, srcSetFor } from '../../lib/images';
import { Flag, SampleBadge } from '../ui';
import SafeSection from '../SafeSection';
import { useNow } from '../../lib/clock';

function HeroSearch() {
  const [q, setQ] = useState('');
  const [focused, setFocused] = useState(false);
  const navigate = useNavigate();
  const results = searchSite(q, 6);

  const submit = (e) => {
    e.preventDefault();
    if (results[0]) navigate(results[0].href);
  };

  return (
    <div className="relative mt-8 max-w-xl">
      <form onSubmit={submit} className="flex items-center gap-2 rounded-full bg-white p-1.5 focus-within:ring-2 focus-within:ring-sun">
        <i className="ri-search-line pl-3 text-lg text-ink-900" aria-hidden="true" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setTimeout(() => setFocused(false), 150)}
          placeholder="What do you need help with?"
          className="h-10 min-w-0 flex-1 bg-transparent text-[0.9375rem] text-ink-900 outline-none placeholder:text-muted"
          aria-label="Search services"
        />
        <button type="submit" className="btn-dark btn-sm">Search</button>
      </form>

      {focused && q && (
        <ul className="absolute inset-x-0 top-[3.75rem] z-30 overflow-hidden rounded-card border border-ink-900 bg-white p-1.5 shadow-lift">
          {results.length === 0 && <li className="px-3 py-3 text-sm text-muted">No matches — try “GST”, “ITR” or “UAE”.</li>}
          {results.map((r) => (
            <li key={`${r.href}-${r.title}`}>
              <Link to={r.href} className="flex items-center gap-3 rounded-lg px-3 py-2.5 hover:bg-paper">
                {r.flag ? <Flag code={r.flag} className="h-3.5 w-5" /> : <i className={`${r.icon} text-ink-900`} />}
                <span className="flex-1 truncate text-sm font-medium text-ink-900">{r.title}</span>
                <span className="label">{r.kind}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-4 hidden flex-wrap items-center gap-2 sm:flex">
        <span className="text-[0.8125rem] font-medium text-white/80">Popular:</span>
        {HERO.searchChips.map((c) => (
          <button key={c} onClick={() => setQ(c)} className="rounded-full border border-white/30 px-3 py-1 text-[0.8125rem] text-white transition-colors hover:border-white hover:bg-white hover:text-ink-900">{c}</button>
        ))}
      </div>
    </div>
  );
}

const TABS = ['Notifications', 'News', 'Due dates'];

function UpdatesDesk() {
  const [tab, setTab] = useState(0);
  const now = useNow();
  const due = getDueDates(new Date(now), 2).slice(0, 5);

  return (
    <div className="overflow-hidden rounded-panel border border-ink-900 bg-white">
      <div className="flex items-start justify-between gap-4 px-6 pt-6 sm:px-7 sm:pt-7">
        <div>
          <p className="text-sm font-semibold text-ink-900">The Updates Desk</p>
          <p className="mt-1 font-serif text-[1.75rem] leading-[1.1] tracking-[-0.02em] text-ink-900">This week in tax &amp; regulation</p>
        </div>
        <p className="label hidden shrink-0 pt-0.5 sm:block">{formatDate(now)}</p>
      </div>

      <div className="mx-6 mt-5 inline-flex gap-1 rounded-full bg-paper p-1 sm:mx-7" role="tablist">
        {TABS.map((t, i) => (
          <button
            key={t}
            role="tab"
            aria-selected={tab === i}
            onClick={() => setTab(i)}
            className={`rounded-full px-3.5 py-1.5 text-[0.8125rem] font-medium transition-colors ${tab === i ? 'bg-ink-900 text-white' : 'text-ink-900 hover:bg-white'}`}
          >
            {t}
          </button>
        ))}
      </div>

      <ul className="mt-2 divide-y divide-line px-6 sm:px-7">
        {tab === 0 &&
          NOTIFICATIONS.slice(0, 5).map((n) => (
            <li key={n.id} className="py-3.5">
              <Link to={`/notifications?authority=${n.authority}`} className="group block">
                <div className="flex items-center gap-2 text-xs text-muted">
                  <span className="font-semibold text-ink-900">{authorityOf(n.authority)?.name}</span>·<span>{formatDate(n.date)}</span>
                  <SampleBadge item={n} />
                </div>
                <p className="mt-1 line-clamp-2 text-[0.9375rem] leading-snug text-ink-900 group-hover:underline">{n.title}</p>
              </Link>
            </li>
          ))}
        {tab === 1 &&
          NEWS.slice(0, 5).map((n) => (
            <li key={n.slug} className="py-3.5">
              <Link to={`/news/${n.slug}`} className="group block">
                <div className="flex items-center gap-2 text-xs text-muted">
                  <span className="font-semibold text-ink-900">{n.category}</span>·<span>{formatDate(n.date)}</span>
                  <SampleBadge item={n} />
                </div>
                <p className="mt-1 line-clamp-2 text-[0.9375rem] leading-snug text-ink-900 group-hover:underline">{n.title}</p>
              </Link>
            </li>
          ))}
        {tab === 2 &&
          due.map((d) => {
            const dm = dayMonth(d.date);
            const left = daysUntil(d.date, new Date(now));
            return (
              <li key={`${d.title}-${d.date}`} className="flex items-center gap-4 py-3">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-cream text-center">
                  <span>
                    <span className="block font-serif text-lg leading-none text-ink-900">{dm.day}</span>
                    <span className="block text-2xs font-medium text-ink-800">{dm.month}</span>
                  </span>
                </span>
                <span className="flex-1 text-[0.9375rem] leading-snug text-ink-900">{d.title}</span>
                <span className={`tag shrink-0 ${left <= 3 ? 'bg-sun text-ink-900' : 'bg-paper text-ink-800'}`}>
                  {left === 0 ? 'Today' : `${left}d`}
                </span>
              </li>
            );
          })}
      </ul>

      <div className="border-t border-line px-6 py-4 sm:px-7">
        <Link to={['/notifications', '/news', '/compliance-calendar'][tab]} className="text-link text-sm">
          View all {TABS[tab].toLowerCase()}
        </Link>
      </div>
    </div>
  );
}

function Stars({ score }) {
  return (
    <span className="flex gap-0.5 text-xl text-sun" aria-hidden="true">
      {[1, 2, 3, 4, 5].map((n) => (
        <i key={n} className={score >= n ? 'ri-star-fill' : score >= n - 0.5 ? 'ri-star-half-fill' : 'ri-star-line'} />
      ))}
    </span>
  );
}

// Proof strip: optional review rating, headline figures and GST registration
function TrustStrip() {
  const { proof = [] } = HERO;
  const rating = HERO.rating?.score ? HERO.rating : null;
  const RatingTag = rating?.href ? 'a' : 'div';
  return (
    <div className="mt-8 max-w-xl rounded-card border border-white/15 bg-white/[0.06] p-5 backdrop-blur-sm sm:p-6">
      {rating && (
        <RatingTag
          {...(rating.href ? { href: rating.href, target: '_blank', rel: 'noopener noreferrer' } : {})}
          className="mb-5 flex flex-col items-center gap-2 border-b border-white/15 pb-5 text-center sm:flex-row sm:gap-3 sm:text-left"
        >
          <Stars score={rating.score} />
          <span className="text-sm text-white/80">
            <span className="font-semibold text-white">{rating.score}/5</span>
            {rating.count ? ` from ${rating.count}+ reviews` : ''}{rating.source ? ` on ${rating.source}` : ''}
          </span>
        </RatingTag>
      )}

      {proof.length > 0 && (
        <dl className="grid grid-cols-3 divide-x divide-white/15">
          {proof.map((p) => (
            <div key={p.label} className="flex flex-col-reverse px-2 text-center first:pl-0 last:pr-0 sm:px-5 sm:text-left">
              <dt className="mt-1.5 text-xs leading-snug text-white/75 sm:text-[0.8125rem]">{p.label}</dt>
              <dd className="font-serif text-[2.125rem] leading-none tracking-[-0.03em] text-sun sm:text-[2.75rem]">{p.value}</dd>
            </div>
          ))}
        </dl>
      )}

      {SITE.gstin && (
        <p className={`flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-[0.8125rem] text-white/80 sm:justify-start ${proof.length ? 'mt-5 border-t border-white/15 pt-4' : ''}`}>
          <i className="ri-shield-check-fill text-base text-sun" aria-hidden="true" />
          <span className="font-semibold text-white">GST registered</span>
          <span className="text-white/40" aria-hidden="true">·</span>
          <span>GSTIN <span className="tracking-wide text-white">{SITE.gstin}</span></span>
        </p>
      )}
    </div>
  );
}

// Everything in the hero is bundled with the page — nothing waits on a network
// request. The dark base colour means the text stays legible even before (or
// without) the background photo.
export default function Hero() {
  const { image } = HERO;
  return (
    <section className="relative isolate z-10 bg-ink-950">
      {image?.src && (
        <img
          src={img(image.src, 1600)}
          srcSet={srcSetFor(image.src)}
          sizes="100vw"
          alt={image.alt || ''}
          fetchpriority="high"
          decoding="async"
          onError={(e) => { e.currentTarget.style.display = 'none'; }}
          className="absolute inset-0 -z-20 h-full w-full object-cover object-[65%_center]"
        />
      )}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-b from-ink-950/80 via-ink-950/75 to-ink-950/90 lg:bg-gradient-to-r lg:from-ink-950/95 lg:via-ink-950/80 lg:to-ink-950/50"
      />

      <div className="container-site grid gap-14 pb-16 pt-14 sm:pb-20 sm:pt-20 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-16 lg:pb-28 lg:pt-24">
        <div className="on-dark animate-rise text-white">
          <p className="eyebrow eyebrow-light">{HERO.eyebrow}</p>
          <h1 className="h-display mt-5 text-[2.75rem] leading-[1.02] text-white sm:text-[4.25rem] lg:text-[5rem]">
            {HERO.title} <em className="italic text-sun">{HERO.titleAccent}</em>
          </h1>
          <p className="mt-6 max-w-xl text-[1.0625rem] leading-relaxed text-white/85 sm:text-xl">{HERO.description}</p>

          <TrustStrip />

          <div className="mt-8 flex max-w-xl flex-col gap-3 sm:flex-row">
            <Link to={HERO.primaryCta.href} className="btn-primary !px-8 !py-4 !text-base">
              {HERO.primaryCta.label}
            </Link>
            <Link to={HERO.secondaryCta.href} className="btn-outline-light !px-8 !py-4 !text-base">
              {HERO.secondaryCta.label}
            </Link>
          </div>
          <HeroSearch />
        </div>

        {/* On phones the same updates appear further down the page (Knowledge Desk, Due Dates) */}
        <div className="hidden animate-rise [animation-delay:150ms] lg:block lg:pr-2">
          <SafeSection>
            <UpdatesDesk />
          </SafeSection>
        </div>
      </div>
    </section>
  );
}
