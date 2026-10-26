import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Seo, { breadcrumbLd } from '../lib/seo';
import { NEWS, NEWS_CATEGORIES } from '../data/news';
import { NOTIFICATIONS, authorityOf } from '../data/notifications';
import { formatDate, dayMonth } from '../lib/format';
import { PageHero, SampleBadge } from '../components/ui';
import NewsletterForm from '../components/NewsletterForm';
import { CTABand } from '../components/Blocks';

export default function News() {
  const [params, setParams] = useSearchParams();
  const category = params.get('category') || 'All';
  const items = NEWS.filter((n) => category === 'All' || n.category === category);
  const crumbs = [{ name: 'Home', path: '/' }, { name: 'News', path: '/news' }];

  return (
    <>
      <Seo
        title="News & Updates — Income Tax, GST, Company Law, FEMA"
        description="Latest updates on income tax, GST, corporate law, FEMA and international company compliance, summarised by Mishra and Associates."
        path="/news"
        jsonLd={breadcrumbLd(crumbs)}
      />
      <PageHero crumbs={crumbs} eyebrow="Knowledge hub" title="News &" accent="updates." intro="The developments that affect your filings and your business — summarised, with what to do next." />

      <section className="bg-white py-12 sm:py-16">
        <div className="container-site grid gap-12 lg:grid-cols-[1fr_320px]">
          <div>
            <div className="scrollbar-none -mx-4 flex gap-2 overflow-x-auto px-4 lg:mx-0 lg:px-0">
              {NEWS_CATEGORIES.map((c) => (
                <button key={c} onClick={() => setParams(c === 'All' ? {} : { category: c }, { replace: true })} className={`chip shrink-0 !py-2 ${c === category ? 'chip-active' : ''}`}>
                  {c}
                </button>
              ))}
            </div>

            <ul className="mt-8 divide-y divide-line border-y border-line">
              {items.length === 0 && <li className="py-10 text-center text-muted">No updates in this category yet.</li>}
              {items.map((n) => {
                const dm = dayMonth(n.date);
                return (
                  <li key={n.slug}>
                    <Link to={`/news/${n.slug}`} className="group grid grid-cols-[64px_1fr] gap-5 py-7 sm:grid-cols-[80px_1fr]">
                      <span className="text-center">
                        <span className="block font-serif text-4xl leading-none text-ink-900">{dm.day}</span>
                        <span className="mt-1 block text-2xs font-bold uppercase tracking-wider text-muted">{dm.month}</span>
                      </span>
                      <span>
                        <span className="flex items-center gap-2 text-2xs font-bold uppercase tracking-wider text-brand-600">
                          {n.category} <SampleBadge item={n} />
                        </span>
                        <span className="mt-2 block font-serif text-2xl leading-snug text-ink-900 group-hover:text-brand-700">{n.title}</span>
                        <span className="mt-2 block leading-relaxed text-muted">{n.summary}</span>
                        <span className="mt-3 inline-flex items-center gap-1 text-sm font-bold text-brand-700">Read update <i className="ri-arrow-right-line" /></span>
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          <aside className="space-y-4 lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-3xl border border-line p-6">
              <div className="flex items-center justify-between">
                <p className="font-bold text-ink-900">Latest notifications</p>
                <Link to="/notifications" className="text-xs font-bold text-brand-700">All →</Link>
              </div>
              <ul className="mt-4 space-y-4">
                {NOTIFICATIONS.slice(0, 5).map((n) => (
                  <li key={n.id}>
                    <Link to={`/notifications?authority=${n.authority}`} className="group block">
                      <p className="text-2xs font-bold uppercase tracking-wider text-muted">
                        <span className="text-brand-600">{authorityOf(n.authority)?.name}</span> · {formatDate(n.date, { day: 'numeric', month: 'short' })}
                      </p>
                      <p className="mt-1 text-sm font-semibold leading-snug text-ink-800 group-hover:text-brand-700">{n.title}</p>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-3xl bg-paper p-6">
              <p className="font-bold text-ink-900">Weekly brief</p>
              <p className="mt-1 text-sm text-muted">Updates and due dates in your inbox.</p>
              <div className="mt-4"><NewsletterForm stacked /></div>
            </div>
          </aside>
        </div>
      </section>
      <CTABand />
    </>
  );
}
