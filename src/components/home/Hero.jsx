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
      <form onSubmit={submit} className="flex items-center gap-2 rounded-2xl border border-line bg-white p-1.5 shadow-soft focus-within:border-brand-500">
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
        <ul className="absolute inset-x-0 top-full z-30 mt-2 overflow-hidden rounded-2xl border border-line bg-white p-1.5 shadow-lift">
          {results.length === 0 && <li className="px-3 py-3 text-sm text-muted">No matches — try “GST”, “ITR” or “UAE”.</li>}
          {results.map((r) => (
            <li key={`${r.href}-${r.title}`}>
              <Link to={r.href} className="flex items-center gap-3 rounded-xl px-3 py-2.5 hover:bg-paper">
                {r.flag ? <Flag code={r.flag} className="h-3.5 w-5" /> : <i className={`${r.icon} text-brand-600`} />}
                <span className="flex-1 truncate text-sm font-semibold text-ink-900">{r.title}</span>
                <span className="text-2xs font-bold uppercase tracking-wider text-muted">{r.kind}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <span className="text-xs font-semibold text-muted">Popular:</span>
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
    <div className="on-dark relative overflow-hidden rounded-[28px] bg-ink-900 text-white shadow-lift">
      <div className="bg-grid-dark pointer-events-none absolute inset-0" />
      <div className="relative">
        <div className="flex items-center justify-between px-6 pt-6">
          <div>
            <p className="text-2xs font-bold uppercase tracking-[0.2em] text-brass-300">The Updates Desk</p>
            <p className="mt-1 font-serif text-xl">What changed this week</p>
          </div>
          <span className="flex items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-1 text-2xs font-bold text-white/80">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> Live
          </span>
        </div>

        <div className="mt-5 flex gap-1 px-4" role="tablist">
          {TABS.map((t, i) => (
            <button
              key={t}
              role="tab"
              aria-selected={tab === i}
              onClick={() => setTab(i)}
              className={`rounded-full px-3.5 py-1.5 text-xs font-bold transition-colors ${tab === i ? 'bg-brass-400 text-ink-950' : 'text-white/65 hover:text-white'}`}
            >
              {t}
            </button>
          ))}
        </div>

        <ul className="mt-3 divide-y divide-white/10 px-6">
          {tab === 0 &&
            NOTIFICATIONS.slice(0, 5).map((n) => (
              <li key={n.id} className="py-3.5">
                <Link to={`/notifications?authority=${n.authority}`} className="group block">
                  <div className="flex items-center gap-2 text-2xs font-bold uppercase tracking-wider text-white/50">
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
                  <div className="flex items-center gap-2 text-2xs font-bold uppercase tracking-wider text-white/50">
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
                  <span className="grid w-12 shrink-0 place-items-center rounded-xl border border-white/15 py-1.5 text-center">
                    <span className="font-serif text-lg leading-none">{dm.day}</span>
                    <span className="text-2xs font-bold uppercase text-white/55">{dm.month}</span>
                  </span>
                  <span className="flex-1 text-sm leading-snug text-white/85">{d.title}</span>
                  <span className={`shrink-0 text-2xs font-bold ${left <= 3 ? 'text-brass-300' : 'text-white/45'}`}>
                    {left === 0 ? 'Today' : `${left}d`}
                  </span>
                </li>
              );
            })}
        </ul>

        <div className="mt-2 border-t border-white/10 px-6 py-4">
          <Link
            to={['/notifications', '/news', '/compliance-calendar'][tab]}
            className="flex items-center justify-between text-sm font-bold text-brass-300 hover:text-brass-100"
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
    <section className="relative overflow-hidden bg-paper">
      <div className="bg-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_top_left,#000_30%,transparent_75%)]" />
      <div className="pointer-events-none absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full bg-brand-100/60 blur-3xl" />

      <div className="container-site relative grid gap-12 pb-16 pt-12 sm:pt-16 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16 lg:pb-24 lg:pt-20">
        <div className="animate-rise">
          <p className="eyebrow">{HERO.eyebrow}</p>
          <h1 className="h-display mt-6 text-[2.6rem] leading-[1.02] sm:text-6xl lg:text-[4.4rem]">
            {HERO.title}
            <br />
            <em className="italic text-brand-600">{HERO.titleAccent}</em>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">{HERO.description}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to={HERO.primaryCta.href} className="btn-primary !px-6 !py-3.5">
              {HERO.primaryCta.label} <i className="ri-arrow-right-up-line" />
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
