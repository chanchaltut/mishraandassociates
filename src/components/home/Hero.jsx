import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HERO } from '../../data/content';
import { NOTIFICATIONS, authorityOf } from '../../data/notifications';
import { NEWS } from '../../data/news';
import { getDueDates, daysUntil } from '../../data/calendar';
import { searchSite } from '../../lib/search';
import { formatDate, dayMonth } from '../../lib/format';
import { Flag, SampleBadge } from '../ui';

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
    <div className="relative mt-10 max-w-xl">
      <form onSubmit={submit} className="flex items-center gap-2 rounded-full border border-ink-900 bg-white p-1.5 focus-within:ring-2 focus-within:ring-brand-500">
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

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <span className="text-[0.8125rem] font-medium text-ink-900">Popular:</span>
        {HERO.searchChips.map((c) => (
          <button key={c} onClick={() => setQ(c)} className="rounded-full border border-ink-900/30 px-3 py-1 text-[0.8125rem] text-ink-900 transition-colors hover:border-ink-900 hover:bg-white">{c}</button>
        ))}
      </div>
    </div>
  );
}

const TABS = ['Notifications', 'News', 'Due dates'];

function UpdatesDesk() {
  const [tab, setTab] = useState(0);
  const due = getDueDates(new Date(), 2).slice(0, 5);

  return (
    <div className="overflow-hidden rounded-panel border border-ink-900 bg-white">
      <div className="flex items-start justify-between gap-4 px-6 pt-6 sm:px-7 sm:pt-7">
        <div>
          <p className="text-sm font-semibold text-ink-900">The Updates Desk</p>
          <p className="mt-1 font-serif text-[1.75rem] leading-[1.1] tracking-[-0.02em] text-ink-900">This week in tax &amp; regulation</p>
        </div>
        <p className="label hidden shrink-0 pt-0.5 sm:block">{formatDate(new Date())}</p>
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
            const left = daysUntil(d.date);
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

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-sun">
      <div className="container-site relative grid gap-14 pb-20 pt-14 sm:pt-20 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-16 lg:pb-28 lg:pt-24">
        <div className="animate-rise">
          <p className="eyebrow">{HERO.eyebrow}</p>
          <h1 className="h-display mt-5 text-[3rem] leading-[1] sm:text-[4.25rem] lg:text-[5.25rem]">
            {HERO.title} <em className="italic">{HERO.titleAccent}</em>
          </h1>
          <p className="mt-7 max-w-xl text-[1.0625rem] leading-relaxed text-ink-900 sm:text-xl">{HERO.description}</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link to={HERO.primaryCta.href} className="btn-dark !px-7 !py-3.5">
              {HERO.primaryCta.label}
            </Link>
            <Link to={HERO.secondaryCta.href} className="btn-light !px-7 !py-3.5">
              {HERO.secondaryCta.label}
            </Link>
          </div>
          <HeroSearch />
        </div>

        <div className="animate-rise [animation-delay:150ms] lg:pr-2">
          <UpdatesDesk />
        </div>
      </div>
    </section>
  );
}
