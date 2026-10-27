import React, { useMemo, useState } from 'react';
import Seo, { breadcrumbLd } from '../lib/seo';
import { getDueDates, daysUntil, CALENDAR_CATEGORIES } from '../data/calendar';
import { dayMonth } from '../lib/format';
import { PageHero } from '../components/ui';
import NewsletterForm from '../components/NewsletterForm';
import { CTABand } from '../components/Blocks';

const CAT_STYLE = {
  'Income Tax': 'bg-cornflower text-ink-900',
  GST: 'bg-sun-light text-ink-900',
  Payroll: 'bg-mint text-ink-900',
  Corporate: 'bg-peach text-ink-900',
};

export default function ComplianceCalendar() {
  const [category, setCategory] = useState('All');
  const all = useMemo(() => getDueDates(new Date(), 4), []);
  const items = all.filter((d) => category === 'All' || d.category === category);

  const byMonth = items.reduce((acc, d) => {
    const key = d.date.toLocaleDateString('en-IN', { month: 'long', year: 'numeric' });
    (acc[key] = acc[key] || []).push(d);
    return acc;
  }, {});

  const crumbs = [{ name: 'Home', path: '/' }, { name: 'Compliance Calendar', path: '/compliance-calendar' }];

  return (
    <>
      <Seo
        title="Compliance Calendar — GST, TDS, ITR, ROC & Payroll Due Dates"
        description="Upcoming statutory due dates in India for GST returns, TDS deposits and returns, advance tax, ITR, ROC filings and PF/ESIC — compiled by Mishra and Associates."
        path="/compliance-calendar"
        jsonLd={breadcrumbLd(crumbs)}
      />
      <PageHero
        crumbs={crumbs}
        eyebrow="Knowledge hub"
        title="Compliance"
        accent="calendar."
        intro="Statutory due dates for the next four months. Dates shown are the default due dates — government extensions, when notified, will be reflected here."
      />

      <section className="bg-white py-14 sm:py-20">
        <div className="container-site grid gap-12 lg:grid-cols-[1fr_340px] lg:gap-16">
          <div>
            <div className="scrollbar-none -mx-4 flex gap-2 overflow-x-auto px-4 lg:mx-0 lg:px-0">
              {CALENDAR_CATEGORIES.map((c) => (
                <button key={c} onClick={() => setCategory(c)} className={`chip shrink-0 !py-2 ${c === category ? 'chip-active' : ''}`}>{c}</button>
              ))}
            </div>

            <div className="mt-8 space-y-10">
              {Object.entries(byMonth).map(([month, list]) => (
                <div key={month}>
                  <h2 className="font-serif text-[2rem] leading-tight tracking-[-0.025em] text-ink-900">{month}</h2>
                  <ul className="mt-4 divide-y divide-line overflow-hidden rounded-card border border-ink-900 bg-white">
                    {list.map((d) => {
                      const dm = dayMonth(d.date);
                      const left = daysUntil(d.date);
                      return (
                        <li key={`${d.title}-${d.date}`} className="flex items-center gap-4 px-5 py-4 sm:gap-6">
                          <span className="w-12 shrink-0 text-center">
                            <span className="block font-serif text-[1.75rem] leading-none text-ink-900">{dm.day}</span>
                            <span className="text-2xs font-medium text-muted">{dm.weekday}</span>
                          </span>
                          <span className="flex-1">
                            <span className="block text-[0.9375rem] font-medium text-ink-900">{d.title}</span>
                            <span className={`tag mt-1.5 ${CAT_STYLE[d.category]}`}>{d.category}</span>
                          </span>
                          <span className={`tag shrink-0 ${left <= 5 ? 'bg-sun text-ink-900' : 'bg-paper text-ink-800'}`}>
                            {left === 0 ? 'Today' : left === 1 ? 'Tomorrow' : `${left} days`}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>
            <p className="mt-8 text-xs leading-relaxed text-ink-800">
              Due dates are statutory defaults and may differ for specific taxpayers (e.g. QRMP filers by state) or be extended by CBDT, CBIC or MCA.
              Always confirm before filing.
            </p>
          </div>

          <aside className="space-y-4 lg:sticky lg:top-28 lg:self-start">
            <div className="on-dark rounded-panel bg-ink-900 p-7 text-white">
              <span className="grid h-12 w-12 place-items-center rounded-full bg-sun text-2xl text-ink-900"><i className="ri-notification-badge-line" /></span>
              <p className="mt-5 font-serif text-[1.625rem] leading-tight tracking-[-0.02em]">Never miss a <em className="italic">due date</em></p>
              <p className="mt-2 text-sm text-white/75">Get reminders a few days before each deadline, with our weekly brief.</p>
              <div className="mt-5"><NewsletterForm dark stacked /></div>
            </div>
          </aside>
        </div>
      </section>
      <CTABand />
    </>
  );
}
