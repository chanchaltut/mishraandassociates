import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import Seo, { breadcrumbLd, faqLd } from '../lib/seo';
import { FAQ_GROUPS } from '../data/faqs';
import { PageHero, Accordion } from '../components/ui';
import { CTABand } from '../components/Blocks';

export default function FAQ() {
  const [query, setQuery] = useState('');
  const crumbs = [{ name: 'Home', path: '/' }, { name: 'FAQs', path: '/faqs' }];

  const groups = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return FAQ_GROUPS;
    return FAQ_GROUPS.map((g) => ({
      ...g,
      items: g.items.filter((it) => `${it.q} ${it.a}`.toLowerCase().includes(q)),
    })).filter((g) => g.items.length);
  }, [query]);

  const total = FAQ_GROUPS.reduce((n, g) => n + g.items.length, 0);

  return (
    <>
      <Seo
        title="Frequently Asked Questions — Tax, GST, ROC & Company Registration"
        description="Answers to common questions on income tax returns, GST, TDS, tax audit, ROC compliance, company registration in India and abroad, and how Mishra and Associates works."
        path="/faqs"
        jsonLd={[breadcrumbLd(crumbs), faqLd(FAQ_GROUPS.flatMap((g) => g.items))]}
      />
      <PageHero
        crumbs={crumbs}
        eyebrow="Frequently asked questions"
        title="Clear answers to"
        accent="common questions."
        intro={`${total} answers on tax, GST, company law and overseas incorporation — written by our team and reviewed regularly.`}
      >
        <div className="relative mt-8 max-w-xl">
          <i className="ri-search-line pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-ink-900" aria-hidden="true" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search the FAQs, e.g. “late fee” or “ITR-3”"
            className="input !h-14 !rounded-full !border-ink-900 !pl-12"
            aria-label="Search frequently asked questions"
          />
        </div>
      </PageHero>

      <section className="bg-white py-16 sm:py-24">
        <div className="container-site grid gap-12 lg:grid-cols-[260px_1fr] lg:gap-16">
          <nav aria-label="FAQ topics" className="lg:sticky lg:top-28 lg:self-start">
            <p className="text-sm font-semibold text-ink-900">Topics</p>
            <ul className="scrollbar-none -mx-4 mt-4 flex gap-2 overflow-x-auto px-4 lg:mx-0 lg:block lg:space-y-0 lg:border-l lg:border-ink-900 lg:px-0">
              {FAQ_GROUPS.map((g) => (
                <li key={g.id} className="shrink-0">
                  <a
                    href={`#${g.id}`}
                    className="chip lg:flex lg:justify-between lg:rounded-none lg:border-0 lg:bg-transparent lg:py-2 lg:pl-4 lg:text-[0.9375rem] lg:hover:bg-sun-light lg:hover:underline"
                  >
                    {g.title}
                    <span className="hidden text-2xs tabular-nums text-muted lg:inline">{g.items.length}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="space-y-14">
            {groups.length === 0 && (
              <p className="border-y border-line py-10 text-center text-muted">
                No questions match “{query}”. <Link to="/contact" className="link-underline text-ink-900">Ask us directly</Link>.
              </p>
            )}
            {groups.map((g, gi) => (
              <div key={g.id} id={g.id} className="scroll-mt-28">
                <div className="mb-2 flex items-baseline justify-between gap-4">
                  <h2 className="h-display text-[2rem] leading-tight sm:text-[2.5rem]">{g.title}</h2>
                  {g.href && (
                    <Link to={g.href} className="text-link shrink-0 text-sm">
                      View service
                    </Link>
                  )}
                </div>
                <Accordion key={query} items={g.items} defaultOpen={query || gi === 0 ? 0 : -1} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABand title="Didn’t find your answer?" accent="Ask an adviser." text="Send us your question by phone, WhatsApp or email. We usually reply within one working day." />
    </>
  );
}
