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
      <form onSubmit={submit} className="flex items-center gap-2 rounded-sm border border-line bg-white p-1 focus-within:border-ink-900">
        <i className="ri-search-2-line pl-3 text-lg text-muted" aria-hidden="true" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setTimeout(() => setFocused(false), 150)}
          placeholder="What do you need help with?"
          className="h-11 flex-1 bg-transparent text-[15px] text-ink-900 outline-none placeholder:text-muted/70"
          aria-label="Search services"
        />
        <button type="submit" className="btn-primary !px-4 !py-2.5">Search</button>
      </form>

      {focused && q && (
        <ul className="absolute inset-x-0 top-full z-30 mt-2 overflow-hidden rounded-sm border border-line bg-white p-1.5 shadow-lift">
          {results.length === 0 && <li className="px-3 py-3 text-sm text-muted">No matches — try “GST”, “ITR” or “UAE”.</li>}
          {results.map((r) => (
            <li key={`${r.href}-${r.title}`}>
              <Link to={r.href} className="flex items-center gap-3 rounded-sm px-3 py-2.5 hover:bg-paper">
                {r.flag ? <Flag code={r.flag} className="h-3.5 w-5" /> : <i className={`${r.icon} text-brand-600`} />}
                <span className="flex-1 truncate text-sm font-semibold text-ink-900">{r.title}</span>
                <span className="text-2xs font-semibold uppercase tracking-wider text-muted">{r.kind}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <span className="text-xs font-medium text-muted">Popular searches</span>
        {HERO.searchChips.map((c) => (
          <button key={c} onClick={() => setQ(c)} className="chip !py-1">{c}</button>
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
    <div className="on-dark relative overflow-hidden rounded-sm border-t-2 border-brass-400 bg-ink-900 text-white">
      <div className="relative">
        <div className="flex items-end justify-between gap-4 px-6 pt-6">
          <div>
            <p className="text-2xs font-semibold uppercase tracking-[0.18em] text-brass-300">The Updates Desk</p>
            <p className="mt-1.5 font-serif text-[1.35rem] leading-tight">This week in tax &amp; regulation</p>
          </div>
          <p className="hidden shrink-0 text-2xs font-medium text-white/45 sm:block">{formatDate(new Date())}</p>
        </div>

        <div className="mt-5 flex gap-6 border-b border-white/10 px-6" role="tablist">
          {TABS.map((t, i) => (
            <button
              key={t}
              role="tab"
              aria-selected={tab === i}
              onClick={() => setTab(i)}
              className={`-mb-px border-b-2 pb-3 text-xs font-semibold uppercase tracking-[0.1em] transition-colors ${tab === i ? 'border-brass-400 text-white' : 'border-transparent text-white/50 hover:text-white'}`}
            >
              {t}
            </button>
          ))}
        </div>

        <ul className="mt-1 divide-y divide-white/10 px-6">
          {tab === 0 &&
            NOTIFICATIONS.slice(0, 5).map((n) => (
              <li key={n.id} className="py-3.5">
                <Link to={`/notifications?authority=${n.authority}`} className="group block">
                  <div className="flex items-center gap-2 text-2xs font-semibold uppercase tracking-wider text-white/50">
                    <span className="text-brass-300">{authorityOf(n.authority)?.name}</span>·<span>{formatDate(n.date)}</span>
                    <SampleBadge item={n} />
                  </div>
                  <p className="mt-1 line-clamp-2 text-sm leading-snug text-white/85 group-hover:text-white">{n.title}</p>
                </Link>
              </li>
            ))}
          {tab === 1 &&
            NEWS.slice(0, 5).map((n) => (
              <li key={n.slug} className="py-3.5">
                <Link to={`/news/${n.slug}`} className="group block">
                  <div className="flex items-center gap-2 text-2xs font-semibold uppercase tracking-wider text-white/50">
                    <span className="text-brass-300">{n.category}</span>·<span>{formatDate(n.date)}</span>
                    <SampleBadge item={n} />
                  </div>
                  <p className="mt-1 line-clamp-2 text-sm leading-snug text-white/85 group-hover:text-white">{n.title}</p>
                </Link>
              </li>
            ))}
          {tab === 2 &&
            due.map((d) => {
              const dm = dayMonth(d.date);
              const left = daysUntil(d.date);
              return (
                <li key={`${d.title}-${d.date}`} className="flex items-center gap-4 py-3">
                  <span className="grid w-12 shrink-0 place-items-center border-r border-white/15 py-1 pr-3 text-center">
                    <span className="font-serif text-lg leading-none">{dm.day}</span>
                    <span className="text-2xs font-semibold uppercase text-white/55">{dm.month}</span>
                  </span>
                  <span className="flex-1 text-sm leading-snug text-white/85">{d.title}</span>
                  <span className={`shrink-0 text-2xs font-semibold ${left <= 3 ? 'text-brass-300' : 'text-white/45'}`}>
                    {left === 0 ? 'Today' : `${left}d`}
                  </span>
                </li>
              );
            })}
        </ul>

        <div className="mt-2 border-t border-white/10 px-6 py-4">
          <Link
            to={['/notifications', '/news', '/compliance-calendar'][tab]}
            className="flex items-center justify-between text-sm font-semibold text-brass-300 hover:text-brass-100"
          >
            View all {TABS[tab].toLowerCase()} <i className="ri-arrow-right-line" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-line bg-paper">
      <div className="container-site relative grid gap-12 pb-16 pt-12 sm:pt-16 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16 lg:pb-24 lg:pt-20">
        <div className="animate-rise">
          <p className="eyebrow">{HERO.eyebrow}</p>
          <h1 className="h-display mt-5 text-[2.5rem] leading-[1.05] sm:text-[3.6rem] lg:text-[4rem]">
            {HERO.title}
            <br />
            <span className="text-brand-700">{HERO.titleAccent}</span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">{HERO.description}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to={HERO.primaryCta.href} className="btn-primary !px-6 !py-3.5">
              {HERO.primaryCta.label} <i className="ri-arrow-right-line" />
            </Link>
            <Link to={HERO.secondaryCta.href} className="btn-outline !px-6 !py-3.5">
              {HERO.secondaryCta.label}
            </Link>
          </div>
          <HeroSearch />
        </div>

        <div className="animate-rise [animation-delay:150ms] lg:pt-4">
          <UpdatesDesk />
        </div>
      </div>
    </section>
  );
}
