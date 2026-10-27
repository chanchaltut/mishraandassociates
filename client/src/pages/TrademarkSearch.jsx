import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Seo, { breadcrumbLd, faqLd } from '../lib/seo';
import { TM_CLASSES, TM_STATUSES, RECENT_FILINGS, SHOW_RECENT_FILINGS, IP_INDIA_SEARCH_URL, timeAgo } from '../data/trademarks';
import { TRADEMARK_SEARCH_FAQS } from '../data/faqs';
import { SITE, waLink } from '../data/site';
import { submitForm } from '../lib/api';
import { PageHero, SectionHeading, SampleBadge } from '../components/ui';
import { FAQBlock, CTABand } from '../components/Blocks';
import { useNow } from '../lib/clock';

const statusTone = (name) => TM_STATUSES.find((s) => s.name === name)?.tone || 'bg-paper';
const classLabel = (n) => (n === 'all' ? 'all classes' : `class ${n}`);

function ReportRequest({ search, onReset }) {
  const [form, setForm] = useState({ name: '', phone: '', email: '' });
  const [status, setStatus] = useState('idle');
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    const res = await submitForm('trademark-searches', { ...form, mark: search.query, type: search.mode, class: search.cls });
    setStatus(res.ok ? 'done' : 'error');
  };

  return (
    <div className="grid overflow-hidden rounded-panel border border-ink-900 bg-white lg:grid-cols-[1.1fr_1fr]">
      <div className="p-7 sm:p-10">
        <p className="text-sm font-semibold text-ink-900">Your search</p>
        <p className="mt-2 font-serif text-[2.25rem] leading-[1.05] tracking-[-0.025em] text-ink-900 sm:text-[2.75rem]">
          “{search.query}” <em className="text-[0.6em] italic text-ink-800">in {classLabel(search.cls)}</em>
        </p>
        <p className="mt-5 text-[1.0625rem] leading-relaxed text-ink-800">
          Our team will check {search.mode === 'logo' ? 'your logo' : 'this name'} against the IP India register — identical marks, phonetic and visual look-alikes,
          and related classes — and send you a free availability report within one working day.
        </p>
        <ul className="mt-6 space-y-2.5 text-[0.9375rem] text-ink-900">
          {['Word & phonetic matches', 'Similar logos and device marks', 'Class-wise risk and the classes you should file in', 'Our recommendation before you file'].map((t) => (
            <li key={t} className="flex gap-3"><span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-sun text-sm"><i className="ri-check-line" /></span>{t}</li>
          ))}
        </ul>
        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
          <a href={IP_INDIA_SEARCH_URL} target="_blank" rel="noopener noreferrer" className="text-link text-sm">
            Search the IP India register yourself <i className="ri-external-link-line" />
          </a>
          <button onClick={onReset} className="text-link text-sm">New search</button>
        </div>
      </div>

      <div className="bg-cream p-7 sm:p-10">
        {status === 'done' ? (
          <div className="flex h-full flex-col justify-center text-center">
            <i className="ri-checkbox-circle-line text-5xl text-ink-900" />
            <p className="mt-3 font-serif text-[1.75rem] leading-tight tracking-[-0.02em] text-ink-900">Report requested.</p>
            <p className="mt-2 text-ink-800">We’ll send your availability report within one working day.</p>
            {search.mode === 'logo' && (
              <a href={waLink(`Hello ${SITE.name}, here is my logo for the trademark search: ${search.query}`)} target="_blank" rel="noopener noreferrer" className="btn-whatsapp mt-6 self-center">
                <i className="ri-whatsapp-line" /> Send logo on WhatsApp
              </a>
            )}
          </div>
        ) : (
          <>
            <p className="font-serif text-[1.625rem] leading-tight tracking-[-0.02em] text-ink-900">Get the free report</p>
            <form onSubmit={onSubmit} className="mt-5 space-y-4">
              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-ink-900">Name *</span>
                <input required value={form.name} onChange={set('name')} className="input" autoComplete="name" />
              </label>
              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-ink-900">Phone *</span>
                <input required type="tel" value={form.phone} onChange={set('phone')} className="input" autoComplete="tel" />
              </label>
              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-ink-900">Email</span>
                <input type="email" value={form.email} onChange={set('email')} className="input" autoComplete="email" />
              </label>
              <button type="submit" disabled={status === 'sending'} className="btn-dark w-full">
                {status === 'sending' ? 'Sending…' : 'Send me the report'}
              </button>
              {status === 'error' && <p className="text-sm text-red-700">Something went wrong — please call {SITE.phone.display}.</p>}
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default function TrademarkSearch() {
  const now = useNow();
  const [mode, setMode] = useState('name');
  const [query, setQuery] = useState('');
  const [cls, setCls] = useState('all');
  const [search, setSearch] = useState(null);
  const resultRef = useRef(null);
  const formRef = useRef(null);
  const crumbs = [{ name: 'Home', path: '/' }, { name: 'Trademark Search', path: '/trademark-search' }];

  const onSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    setSearch({ query: query.trim(), mode, cls });
    setTimeout(() => resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50);
  };

  const pickClass = (n) => {
    setCls(String(n));
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <>
      <Seo
        title="Trademark Search — Check Brand Name Availability in India"
        description="Check if your brand name or logo is available before filing. Free trademark availability report across all 45 classes, plus trademark registration, objection replies and renewals."
        path="/trademark-search"
        jsonLd={[breadcrumbLd(crumbs), faqLd(TRADEMARK_SEARCH_FAQS)]}
      />

      <PageHero
        crumbs={crumbs}
        eyebrow="Trademark search"
        title="Is your brand name"
        accent="still available?"
        intro="A trademark search checks registered and applied marks so your proposed brand name, logo or tagline is unique and safe to file."
      >
        <form ref={formRef} onSubmit={onSearch} className="mt-9 max-w-3xl rounded-panel border border-ink-900 bg-white p-2">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <div className="inline-flex shrink-0 gap-1 rounded-full bg-paper p-1" role="tablist" aria-label="Search by">
              {[['name', 'ri-text', 'Brand name'], ['logo', 'ri-image-line', 'Logo']].map(([id, icon, label]) => (
                <button
                  key={id}
                  type="button"
                  role="tab"
                  aria-selected={mode === id}
                  onClick={() => setMode(id)}
                  className={`flex items-center gap-1.5 rounded-full px-3.5 py-2 text-sm font-medium transition-colors ${mode === id ? 'bg-ink-900 text-white' : 'text-ink-900 hover:bg-white'}`}
                >
                  <i className={icon} /> {label}
                </button>
              ))}
            </div>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={mode === 'name' ? 'Enter the brand name you want to register' : 'Describe your logo or the words in it'}
              className="h-11 min-w-0 flex-1 bg-transparent px-3 text-[0.9375rem] text-ink-900 outline-none placeholder:text-muted"
              aria-label={mode === 'name' ? 'Brand name' : 'Logo description'}
              required
            />
          </div>
          <div className="mt-2 flex flex-col gap-2 border-t border-line px-1 pt-2 sm:flex-row">
            <select value={cls} onChange={(e) => setCls(e.target.value)} className="h-11 flex-1 rounded-full bg-paper px-4 text-sm text-ink-900 outline-none" aria-label="Trademark class">
              <option value="all">All 45 classes</option>
              {TM_CLASSES.map((c) => <option key={c.n} value={c.n}>Class {c.n} — {c.name}</option>)}
            </select>
            <button type="submit" className="btn-dark"><i className="ri-search-line" /> Search</button>
          </div>
        </form>
        <p className="mt-4 text-sm text-ink-900">Free availability report · Word, phonetic and logo matches · Reply within one working day</p>
      </PageHero>

      {search && (
        <section ref={resultRef} className="scroll-mt-24 bg-white pt-12 sm:pt-16">
          <div className="container-site">
            <ReportRequest key={`${search.query}-${search.cls}-${search.mode}`} search={search} onReset={() => { setSearch(null); setQuery(''); formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' }); }} />
          </div>
        </section>
      )}

      <section className="bg-white py-20 sm:py-24">
        <div className="container-site grid gap-14 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
          {SHOW_RECENT_FILINGS && RECENT_FILINGS.length > 0 && (
          <div>
            <SectionHeading eyebrow="New trademarks" title="Latest filings" accent="in India." />
            <ul className="mt-10 divide-y divide-line border-y border-ink-900">
              {RECENT_FILINGS.map((f) => (
                <li key={f.id} className="flex items-start gap-4 py-5">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-ink-900 font-serif text-lg text-white">™</span>
                  <div className="min-w-0 flex-1">
                    <p className="flex flex-wrap items-baseline gap-x-2">
                      <span className="font-serif text-[1.375rem] leading-tight tracking-[-0.01em] text-ink-900">{f.mark}</span>
                      <span className="text-[0.9375rem] text-ink-800">{f.applicant}</span>
                    </p>
                    <div className="mt-2 flex flex-wrap items-center gap-2 text-xs">
                      <span className="rounded-full border border-ink-900 px-2 py-0.5 text-ink-900">{f.state}</span>
                      <span className="rounded-full border border-line px-2 py-0.5 text-ink-800">Class {f.cls}</span>
                      <span className={`tag ${statusTone(f.status)} text-ink-900`}>{f.status}</span>
                      <SampleBadge item={f} />
                    </div>
                  </div>
                  <span className="hidden shrink-0 text-xs text-muted sm:block">{timeAgo(f.filed, now)}</span>
                </li>
              ))}
            </ul>
          </div>
          )}

          <div className={SHOW_RECENT_FILINGS && RECENT_FILINGS.length > 0 ? 'lg:pt-24' : 'lg:col-span-2'}>
            <div className="rounded-panel bg-paper p-7 sm:p-8">
              <p className="font-serif text-[1.625rem] leading-tight tracking-[-0.02em] text-ink-900">What the status means</p>
              <dl className="mt-6 space-y-5">
                {TM_STATUSES.map((s) => (
                  <div key={s.name}>
                    <dt><span className={`tag ${s.tone} text-ink-900`}>{s.name}</span></dt>
                    <dd className="mt-1.5 text-[0.9375rem] leading-relaxed text-ink-800">{s.desc}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-cream py-20 sm:py-24">
        <div className="container-site">
          <SectionHeading eyebrow="Trademark tools" title="Everything after" accent="the search." />
          <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[
              ['ri-copyright-line', 'Trademark registration', 'Class selection, TM-A filing and tracking to registration.', '/services/trademark-registration'],
              ['ri-chat-quote-line', 'Objection reply', 'Reply to the examination report within 30 days, with hearing support.', '/services?category=Trademark'],
              ['ri-refresh-line', 'Trademark renewal', 'Registrations last 10 years — renew on time to keep protection.', '/services?category=Trademark'],
              ['ri-scales-3-line', 'Opposition', 'Oppose a conflicting mark, or defend yours, after journal publication.', '/services?category=Trademark'],
              ['ri-exchange-line', 'Assignment & transfer', 'Transfer ownership of a mark with a proper deed and filing.', '/services?category=Trademark'],
              ['ri-quill-pen-line', 'Copyright & design', 'Protect creative works and product designs alongside your brand.', '/services?category=Trademark'],
            ].map(([icon, title, desc, href]) => (
              <Link key={title} to={href} className="group flex gap-5 rounded-card bg-white p-6 transition-colors hover:bg-sun-light">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-ink-900 text-xl text-ink-900"><i className={icon} /></span>
                <span>
                  <span className="block font-serif text-[1.375rem] leading-tight tracking-[-0.015em] text-ink-900 group-hover:underline">{title}</span>
                  <span className="mt-1.5 block text-[0.9375rem] leading-relaxed text-ink-800">{desc}</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20 sm:py-24">
        <div className="container-site">
          <SectionHeading
            eyebrow="Trademark classes"
            title="Find your class"
            accent="in the 45."
            intro="Goods fall in classes 1–34 and services in classes 35–45. Pick a class to search within it."
          />
          {[['Goods', 1, 34], ['Services', 35, 45]].map(([label, from, to]) => (
            <div key={label} className="mt-12">
              <p className="border-b border-ink-900 pb-3 text-[0.9375rem] font-semibold text-ink-900">{label} · classes {from}–{to}</p>
              <ul className="mt-4 grid gap-x-6 gap-y-1 sm:grid-cols-2 lg:grid-cols-3">
                {TM_CLASSES.filter((c) => c.n >= from && c.n <= to).map((c) => (
                  <li key={c.n}>
                    <button onClick={() => pickClass(c.n)} className="group flex w-full items-baseline gap-3 rounded-lg px-2 py-2 text-left hover:bg-sun-light">
                      <span className="w-7 shrink-0 font-serif text-lg text-ink-900">{c.n}</span>
                      <span className="text-[0.9375rem] text-ink-900 group-hover:underline">{c.name}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <FAQBlock items={TRADEMARK_SEARCH_FAQS} title="Trademark search:" accent="common questions." />
      <CTABand title="Found your name?" accent="Let’s file it today." text="Trademark registration from ₹999 + government fee. Use ™ from the day we file." />
    </>
  );
}
