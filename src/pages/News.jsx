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
      <PageHero crumbs={crumbs} eyebrow="Knowledge hub" title="News &" accent="updates." intro="The developments that affect your filings and your business — summarised, with what to do next." tone="cream" />

      <section className="bg-white py-14 sm:py-20">
        <div className="container-site grid gap-12 lg:grid-cols-[1fr_340px] lg:gap-16">
          <div>
            <div className="scrollbar-none -mx-4 flex gap-2 overflow-x-auto px-4 lg:mx-0 lg:px-0">
              {NEWS_CATEGORIES.map((c) => (
                <button key={c} onClick={() => setParams(c === 'All' ? {} : { category: c }, { replace: true })} className={`chip shrink-0 !py-2 ${c === category ? 'chip-active' : ''}`}>
                  {c}
                </button>
              ))}
            </div>

            <ul className="mt-8 divide-y divide-line border-y border-ink-900">
              {items.length === 0 && <li className="py-10 text-center text-muted">No updates in this category yet.</li>}
              {items.map((n) => {
                const dm = dayMonth(n.date);
                return (
                  <li key={n.slug}>
                    <Link to={`/news/${n.slug}`} className="group grid grid-cols-[64px_1fr] gap-5 py-7 sm:grid-cols-[80px_1fr]">
                      <span className="text-center">
                        <span className="block font-serif text-[2.75rem] leading-none tracking-[-0.03em] text-ink-900">{dm.day}</span>
                        <span className="label mt-1 block">{dm.month}</span>
                      </span>
                      <span>
                        <span className="flex items-center gap-2 label font-semibold text-ink-900">
                          {n.category} <SampleBadge item={n} />
                        </span>
                        <span className="mt-2 block font-serif text-[1.75rem] leading-[1.12] tracking-[-0.02em] text-ink-900 group-hover:underline">{n.title}</span>
                        <span className="mt-2 block text-[1.0625rem] leading-relaxed text-ink-800">{n.summary}</span>
                        <span className="mt-4 inline-block text-sm font-medium text-ink-900 underline underline-offset-[3px]">Read update</span>
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          <aside className="space-y-4 lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-card border border-ink-900 p-6">
              <div className="flex items-center justify-between">
                <p className="font-serif text-[1.375rem] tracking-[-0.015em] text-ink-900">Latest notifications</p>
                <Link to="/notifications" className="text-link text-sm">All</Link>
              </div>
              <ul className="mt-4 space-y-4">
                {NOTIFICATIONS.slice(0, 5).map((n) => (
                  <li key={n.id}>
                    <Link to={`/notifications?authority=${n.authority}`} className="group block">
                      <p className="label">
                        <span className="font-semibold text-ink-900">{authorityOf(n.authority)?.name}</span> · {formatDate(n.date, { day: 'numeric', month: 'short' })}
                      </p>
                      <p className="mt-1 text-sm leading-snug text-ink-900 group-hover:underline">{n.title}</p>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-card bg-cream p-6">
              <p className="font-serif text-[1.375rem] tracking-[-0.015em] text-ink-900">Weekly brief</p>
              <p className="mt-1 text-sm text-ink-800">Updates and due dates in your inbox.</p>
              <div className="mt-4"><NewsletterForm stacked /></div>
            </div>
          </aside>
        </div>
      </section>
      <CTABand />
    </>
  );
}
