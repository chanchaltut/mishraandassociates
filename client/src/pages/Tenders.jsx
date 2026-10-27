import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import Seo, { breadcrumbLd, faqLd } from '../lib/seo';
import {
  TENDERS, TENDER_RESULTS, TENDER_SECTORS, TENDER_STATES, TENDER_PLAN, VALUE_BANDS, sectorOf, daysLeft,
} from '../data/tenders';
import { TENDER_FAQS } from '../data/faqs';
import { SITE, waLink } from '../data/site';
import { submitForm } from '../lib/api';
import { formatDate } from '../lib/format';
import { PageHero, SectionHeading, SampleBadge } from '../components/ui';
import Ph from '../components/ui/Ph';
import Modal from '../components/ui/Modal';
import { FAQBlock, CTABand } from '../components/Blocks';

const escapeRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

function Highlight({ text, query }) {
  const q = query.trim();
  if (!q) return text;
  const parts = text.split(new RegExp(`(${escapeRe(q)})`, 'ig'));
  return parts.map((p, i) => (p.toLowerCase() === q.toLowerCase() ? <mark key={i} className="rounded bg-sun px-0.5 text-ink-900">{p}</mark> : p));
}

function ClosingBadge({ due }) {
  const left = daysLeft(due);
  if (left <= 0) return <span className="tag bg-rose text-ink-900">Closing today</span>;
  if (left === 1) return <span className="tag bg-peach text-ink-900">Closes tomorrow</span>;
  return <span className={`tag ${left <= 3 ? 'bg-peach' : 'bg-paper'} text-ink-900`}>{left} days left</span>;
}

// Subscriber-only value. The real figure is never rendered for visitors.
function Locked({ label, onUnlock }) {
  return (
    <button type="button" onClick={onUnlock} className="group text-left" aria-label={`${label} — subscribe to view`}>
      <span className="block text-xs text-muted">{label}</span>
      <span className="mt-0.5 flex items-center gap-1.5 text-[0.9375rem] font-medium text-ink-900">
        <i className="ri-lock-2-line" />
        <span className="select-none tracking-widest text-ink-900/40">•••••</span>
        <span className="text-xs text-ink-800 underline-offset-2 group-hover:underline">Unlock</span>
      </span>
    </button>
  );
}

function TenderCard({ t, index, query, onUnlock }) {
  const sector = sectorOf(t.sector);
  const share = waLink(`Tender: ${t.title} (${t.city}, ${t.state}) — due ${formatDate(t.due)}. ${SITE.url}/tenders`);
  return (
    <article className="rounded-card border border-line bg-white p-5 transition-colors hover:border-ink-900 sm:p-6">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-[0.8125rem] text-ink-800">
        <span className="grid h-6 min-w-6 place-items-center rounded-full bg-ink-900 px-1.5 text-2xs font-semibold text-white">{index}</span>
        <span>TID: <span className="font-semibold text-ink-900"><Ph>{t.tid}</Ph></span></span>
        <span className="flex items-center gap-1"><i className={sector.icon} /> {sector.name}</span>
        <span className="flex items-center gap-1"><i className="ri-map-pin-line" /> {t.city}, {t.state}</span>
        <span className="tag bg-cream text-ink-900">{t.source}</span>
        <SampleBadge item={t} />
      </div>

      <h3 className="mt-3 font-serif text-[1.375rem] leading-snug tracking-[-0.01em] text-ink-900">
        <Highlight text={t.title} query={query} />
      </h3>

      <div className="mt-5 grid grid-cols-2 gap-4 border-t border-line pt-4 sm:grid-cols-4">
        <Locked label="Worth" onUnlock={onUnlock} />
        <Locked label="EMD" onUnlock={onUnlock} />
        <Locked label="Department" onUnlock={onUnlock} />
        <div>
          <span className="block text-xs text-muted">Due date</span>
          <span className="mt-0.5 block text-[0.9375rem] font-medium text-ink-900">{formatDate(t.due)}</span>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <ClosingBadge due={t.due} />
          <span className="text-xs text-muted">{t.type} · Published {formatDate(t.published, { day: 'numeric', month: 'short' })}</span>
        </div>
        <div className="flex items-center gap-2">
          <a href={share} target="_blank" rel="noopener noreferrer" aria-label="Share on WhatsApp" className="grid h-9 w-9 place-items-center rounded-full border border-ink-900 text-ink-900 transition-colors hover:bg-whatsapp hover:text-white">
            <i className="ri-whatsapp-line" />
          </a>
          <button onClick={onUnlock} className="btn-outline btn-sm"><i className="ri-file-download-line" /> Documents</button>
          <button onClick={onUnlock} className="btn-dark btn-sm">View details</button>
        </div>
      </div>
    </article>
  );
}

function ResultRow({ r, onUnlock }) {
  const sector = sectorOf(r.sector);
  return (
    <li className="grid gap-4 p-5 sm:grid-cols-[1fr_auto] sm:items-center sm:p-6">
      <div>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.8125rem] text-ink-800">
          <span>TID: <span className="font-semibold text-ink-900"><Ph>{r.tid}</Ph></span></span>
          <span className="flex items-center gap-1"><i className={sector.icon} /> {sector.name}</span>
          <span className="flex items-center gap-1"><i className="ri-map-pin-line" /> {r.state}</span>
          <SampleBadge item={r} />
        </div>
        <p className="mt-2 font-serif text-[1.25rem] leading-snug text-ink-900">{r.title}</p>
        <p className="mt-1 text-xs text-muted">{r.bids} bids received · Awarded {formatDate(r.awarded)}</p>
      </div>
      <div className="flex gap-6">
        <Locked label="Winning bidder" onUnlock={onUnlock} />
        <Locked label="Awarded value" onUnlock={onUnlock} />
      </div>
    </li>
  );
}

function SubscribeModal({ open, onClose }) {
  const [form, setForm] = useState({ name: '', company: '', phone: '', email: '', interests: '' });
  const [status, setStatus] = useState('idle');
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    const res = await submitForm('tender-subscriptions', { ...form, plan: TENDER_PLAN.name, price: `${TENDER_PLAN.price}/${TENDER_PLAN.period}` });
    setStatus(res.ok ? 'done' : 'error');
  };

  return (
    <Modal open={open} onClose={onClose} label="Subscribe to tender alerts" className="max-w-4xl">
      <div className="grid md:grid-cols-[0.95fr_1.05fr]">
        <div className="on-dark bg-ink-900 p-7 pt-16 text-white sm:p-10">
          <p className="text-sm font-semibold text-sun">{TENDER_PLAN.name}</p>
          <p className="mt-4 font-serif text-[3.5rem] leading-none tracking-[-0.03em]">
            {TENDER_PLAN.price}
            <span className="font-sans text-base text-white/70"> / {TENDER_PLAN.period}</span>
          </p>
          <p className="mt-1 text-xs text-white/60">Taxes as applicable</p>
          <ul className="mt-7 space-y-3 text-[0.9375rem] text-white/90">
            {TENDER_PLAN.features.map((f) => (
              <li key={f} className="flex gap-3"><i className="ri-check-line mt-0.5 text-sun" /> {f}</li>
            ))}
          </ul>
        </div>

        <div className="p-7 sm:p-10 md:pt-16">
          {status === 'done' ? (
            <div className="flex h-full flex-col justify-center text-center">
              <i className="ri-checkbox-circle-line text-5xl text-ink-900" />
              <p className="mt-3 font-serif text-[1.75rem] leading-tight tracking-[-0.02em] text-ink-900">Request received.</p>
              <p className="mt-2 text-ink-800">We’ll confirm your alert preferences and share a payment link within one working day.</p>
              <button onClick={onClose} className="btn-outline mt-6 self-center">Back to tenders</button>
            </div>
          ) : (
            <>
              <p className="font-serif text-[1.75rem] leading-tight tracking-[-0.02em] text-ink-900">Unlock full tender details</p>
              <p className="mt-1 text-sm text-ink-800">Subscribe to see tender value, EMD, department and documents for every tender.</p>
              <form onSubmit={onSubmit} className="mt-6 grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-2 block text-sm font-semibold text-ink-900">Name *</span>
                  <input required value={form.name} onChange={set('name')} className="input" autoComplete="name" />
                </label>
                <label className="block">
                  <span className="mb-2 block text-sm font-semibold text-ink-900">Company</span>
                  <input value={form.company} onChange={set('company')} className="input" autoComplete="organization" />
                </label>
                <label className="block">
                  <span className="mb-2 block text-sm font-semibold text-ink-900">Phone *</span>
                  <input required type="tel" value={form.phone} onChange={set('phone')} className="input" autoComplete="tel" />
                </label>
                <label className="block">
                  <span className="mb-2 block text-sm font-semibold text-ink-900">Email *</span>
                  <input required type="email" value={form.email} onChange={set('email')} className="input" autoComplete="email" />
                </label>
                <label className="block sm:col-span-2">
                  <span className="mb-2 block text-sm font-semibold text-ink-900">Keywords, sectors or states to track</span>
                  <input value={form.interests} onChange={set('interests')} placeholder="e.g. solar, civil works, Delhi" className="input" />
                </label>
                <button type="submit" disabled={status === 'sending'} className="btn-primary sm:col-span-2">
                  {status === 'sending' ? 'Sending…' : `Subscribe — ${TENDER_PLAN.price}/${TENDER_PLAN.period}`}
                </button>
                {status === 'error' && <p className="text-sm text-red-700 sm:col-span-2">Something went wrong — please call {SITE.phone.display}.</p>}
              </form>
              <a href={waLink(`Hello ${SITE.name}, I would like to subscribe to tender alerts (${TENDER_PLAN.price}/${TENDER_PLAN.period}).`)} target="_blank" rel="noopener noreferrer" className="text-link mt-4 inline-block text-sm">
                Or subscribe on WhatsApp
              </a>
            </>
          )}
        </div>
      </div>
    </Modal>
  );
}

const SORTS = { closing: 'Closing soonest', newest: 'Newest first' };

export default function Tenders() {
  const [tab, setTab] = useState('tenders');
  const [query, setQuery] = useState('');
  const [state, setState] = useState('all');
  const [sector, setSector] = useState('all');
  const [band, setBand] = useState('all');
  const [sort, setSort] = useState('closing');
  const [modal, setModal] = useState(false);
  const unlock = () => setModal(true);

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    const range = VALUE_BANDS.find((b) => b.id === band);
    return TENDERS.filter((t) => {
      if (q && !`${t.title} ${t.city} ${t.state} ${sectorOf(t.sector).name}`.toLowerCase().includes(q)) return false;
      if (state !== 'all' && t.state !== state) return false;
      if (sector !== 'all' && t.sector !== sector) return false;
      if (band !== 'all' && (t.value == null || (range.min && t.value < range.min) || (range.max && t.value >= range.max))) return false;
      return daysLeft(t.due) >= 0;
    }).sort((a, b) => (sort === 'closing' ? new Date(a.due) - new Date(b.due) : new Date(b.published) - new Date(a.published)));
  }, [query, state, sector, band, sort]);

  const closingToday = TENDERS.filter((t) => daysLeft(t.due) === 0).length;
  const reset = () => { setQuery(''); setState('all'); setSector('all'); setBand('all'); };
  const filtered = query || state !== 'all' || sector !== 'all' || band !== 'all';
  const crumbs = [{ name: 'Home', path: '/' }, { name: 'Tenders', path: '/tenders' }];

  return (
    <>
      <Seo
        title="Tender Notifications — Government & PSU Tenders in India"
        description="Search government, PSU and GeM tenders across India by keyword, state, sector and value. Daily tender alerts on email and WhatsApp with the Mishra and Associates annual plan."
        path="/tenders"
        jsonLd={[breadcrumbLd(crumbs), faqLd(TENDER_FAQS)]}
      />

      <PageHero
        crumbs={crumbs}
        eyebrow="Tender notifications"
        title="Find the right tender,"
        accent="before it closes."
        intro="Government, PSU and GeM tenders from across India — searchable by keyword, state, sector and value, with daily alerts for subscribers."
      >
        <form onSubmit={(e) => e.preventDefault()} className="mt-9 max-w-3xl rounded-panel border border-ink-900 bg-white p-2">
          <div className="flex items-center gap-2">
            <i className="ri-search-line pl-3 text-lg text-ink-900" aria-hidden="true" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search tenders — e.g. solar, furniture, security"
              className="h-11 min-w-0 flex-1 bg-transparent text-[0.9375rem] text-ink-900 outline-none placeholder:text-muted"
              aria-label="Search tenders"
            />
            <button type="submit" className="btn-dark btn-sm">Search</button>
          </div>
          <div className="mt-2 grid gap-2 border-t border-line px-1 pt-2 sm:grid-cols-3">
            <select value={state} onChange={(e) => setState(e.target.value)} className="h-10 rounded-full bg-paper px-4 text-sm text-ink-900 outline-none" aria-label="State">
              <option value="all">All states</option>
              {TENDER_STATES.map((s) => <option key={s}>{s}</option>)}
            </select>
            <select value={sector} onChange={(e) => setSector(e.target.value)} className="h-10 rounded-full bg-paper px-4 text-sm text-ink-900 outline-none" aria-label="Sector">
              <option value="all">All sectors</option>
              {TENDER_SECTORS.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
            </select>
            <select value={band} onChange={(e) => setBand(e.target.value)} className="h-10 rounded-full bg-paper px-4 text-sm text-ink-900 outline-none" aria-label="Tender value">
              {VALUE_BANDS.map((b) => <option key={b.id} value={b.id}>{b.label}</option>)}
            </select>
          </div>
        </form>
      </PageHero>

      <section className="bg-white py-12 sm:py-16">
        <div className="container-site grid gap-10 lg:grid-cols-[1fr_340px] lg:gap-12">
          <div>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="inline-flex gap-1 rounded-full bg-paper p-1" role="tablist">
                {[['tenders', 'Live tenders'], ['results', 'Tender results']].map(([id, label]) => (
                  <button
                    key={id}
                    role="tab"
                    aria-selected={tab === id}
                    onClick={() => setTab(id)}
                    className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${tab === id ? 'bg-ink-900 text-white' : 'text-ink-900 hover:bg-white'}`}
                  >
                    {label}
                  </button>
                ))}
              </div>
              {tab === 'tenders' && (
                <label className="flex items-center gap-2 text-sm text-ink-800">
                  Sort
                  <select value={sort} onChange={(e) => setSort(e.target.value)} className="h-9 rounded-full border border-line bg-white px-3 text-sm text-ink-900 outline-none">
                    {Object.entries(SORTS).map(([id, label]) => <option key={id} value={id}>{label}</option>)}
                  </select>
                </label>
              )}
            </div>

            {tab === 'tenders' ? (
              <>
                <p className="mt-6 text-sm text-ink-800">
                  Showing <strong className="text-ink-900">{rows.length}</strong> live tender{rows.length === 1 ? '' : 's'}
                  {closingToday > 0 && <> · <span className="font-semibold text-ink-900">{closingToday} closing today</span></>}
                  {filtered && <> · <button onClick={reset} className="text-link">Clear filters</button></>}
                </p>
                <div className="mt-4 space-y-3">
                  {rows.map((t, i) => <TenderCard key={t.id} t={t} index={i + 1} query={query} onUnlock={unlock} />)}
                  {rows.length === 0 && (
                    <div className="rounded-card border border-dashed border-line p-10 text-center">
                      <p className="font-serif text-2xl tracking-[-0.015em] text-ink-900">No live tenders match these filters.</p>
                      <p className="mt-2 text-sm text-ink-800">Subscribe and we’ll alert you as soon as a matching tender is published.</p>
                      <button onClick={unlock} className="btn-primary mt-5">Set up tender alerts</button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <ul className="mt-6 divide-y divide-line overflow-hidden rounded-card border border-line">
                {TENDER_RESULTS.map((r) => <ResultRow key={r.id} r={r} onUnlock={unlock} />)}
              </ul>
            )}
          </div>

          <aside className="space-y-4 lg:sticky lg:top-28 lg:self-start">
            <div className="on-dark rounded-panel bg-ink-900 p-7 text-white">
              <p className="text-sm font-semibold text-sun">Tender alerts</p>
              <p className="mt-3 font-serif text-[2.75rem] leading-none tracking-[-0.03em]">
                {TENDER_PLAN.price}<span className="font-sans text-base text-white/70"> / {TENDER_PLAN.period}</span>
              </p>
              <ul className="mt-6 space-y-2.5 text-sm text-white/85">
                {TENDER_PLAN.features.slice(0, 4).map((f) => (
                  <li key={f} className="flex gap-2.5"><i className="ri-check-line mt-0.5 text-sun" /> {f}</li>
                ))}
              </ul>
              <button onClick={unlock} className="btn-primary mt-7 w-full">Subscribe now</button>
            </div>
            <div className="rounded-panel bg-cream p-7">
              <p className="font-serif text-[1.375rem] tracking-[-0.015em] text-ink-900">Browse by sector</p>
              <ul className="mt-4 space-y-1">
                {TENDER_SECTORS.map((s) => (
                  <li key={s.id}>
                    <button
                      onClick={() => { setTab('tenders'); setSector(s.id); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                      className="flex w-full items-center gap-3 rounded-lg px-2 py-2 text-left text-[0.9375rem] text-ink-900 hover:bg-white hover:underline"
                    >
                      <i className={s.icon} /> {s.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>

      <section className="bg-paper py-20 sm:py-24">
        <div className="container-site">
          <SectionHeading eyebrow="Bidding for a tender?" title="We handle the paperwork" accent="behind the bid." intro="Most bids fail on eligibility documents, not price. Our team gets you registered and bid-ready." />
          <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ['ri-key-2-line', 'DSC & portal registration', 'Class 3 digital signature, GeM, CPPP and state e-procurement registration.', '/services?category=Incorporation'],
              ['ri-store-3-line', 'MSME / NSIC registration', 'Udyam and NSIC registration for EMD exemption and purchase preference.', '/services?category=MSME'],
              ['ri-award-line', 'CA certificates', 'Turnover, net-worth and solvency certificates in the format tenders ask for.', '/services/ca-certificates'],
              ['ri-medal-line', 'ISO certification', 'ISO 9001 and sector standards often required for eligibility.', '/services/iso-certification'],
            ].map(([icon, title, desc, href], i) => (
              <Link key={title} to={href} className={`group flex flex-col rounded-panel p-7 ${['bg-cornflower', 'bg-mint', 'bg-rose', 'bg-peach'][i]}`}>
                <span className="grid h-11 w-11 place-items-center rounded-full bg-white text-xl text-ink-900"><i className={icon} /></span>
                <p className="mt-8 font-serif text-[1.5rem] leading-tight tracking-[-0.015em] text-ink-900 group-hover:underline">{title}</p>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-800">{desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <FAQBlock items={TENDER_FAQS} title="Tender alerts:" accent="common questions." />
      <CTABand title="Never miss a tender" accent="in your sector." text={`Daily alerts, full tender details and bid support — ${TENDER_PLAN.price} a ${TENDER_PLAN.period}.`} />

      <SubscribeModal open={modal} onClose={() => setModal(false)} />
    </>
  );
}
