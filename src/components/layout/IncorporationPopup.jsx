import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { COUNTRIES } from '../../data/countries';
import { waLink } from '../../data/site';
import { submitForm } from '../../lib/api';
import { Flag } from '../ui';
import Modal from '../ui/Modal';

const SEEN_KEY = 'ma-incorporation-popup';
const ENTITY_TYPES = ['Private Limited Company', 'LLP', 'One Person Company (OPC)', 'Company outside India'];
// Pages with their own enquiry or subscription flow
const SKIP_PATHS = ['/contact', '/tenders'];

const seen = () => {
  try {
    return sessionStorage.getItem(SEEN_KEY) === '1';
  } catch {
    return false;
  }
};
const markSeen = () => {
  try {
    sessionStorage.setItem(SEEN_KEY, '1');
  } catch {
    /* storage unavailable — popup may show again next page load */
  }
};

/** Promotes company incorporation once per visit, shortly after the visitor's first click. */
export default function IncorporationPopup() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', entity: ENTITY_TYPES[0] });
  const [status, setStatus] = useState('idle');
  const { pathname } = useLocation();

  useEffect(() => {
    if (seen()) return undefined;
    let timer;
    const onClick = (e) => {
      // Ignore clicks that open the menu, search or another dialog
      if (e.target.closest('header, [role="dialog"]')) return;
      if (SKIP_PATHS.includes(window.location.pathname)) return;
      window.removeEventListener('pointerdown', onClick);
      timer = setTimeout(() => {
        // The click opened another dialog (e.g. a subscription form) — wait for a later click
        if (document.querySelector('[aria-modal="true"]')) {
          window.addEventListener('pointerdown', onClick);
          return;
        }
        markSeen();
        setOpen(true);
      }, 700);
    };
    window.addEventListener('pointerdown', onClick);
    return () => {
      window.removeEventListener('pointerdown', onClick);
      clearTimeout(timer);
    };
  }, []);

  // Navigating via a CTA inside the popup should close it
  useEffect(() => setOpen(false), [pathname]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    const res = await submitForm('enquiries', {
      name: form.name,
      phone: form.phone,
      service: `Company Incorporation — ${form.entity}`,
      message: 'Callback requested from the company incorporation popup.',
      source: 'incorporation-popup',
    });
    setStatus(res.ok ? 'done' : 'error');
  };

  const close = () => setOpen(false);

  return (
    <Modal open={open} onClose={close} label="Company incorporation" className="max-w-4xl">
      <div className="grid md:grid-cols-[1.05fr_1fr]">
        <div className="bg-texture p-7 pt-16 sm:p-10">
          <p className="text-sm font-semibold text-ink-900">Start your business the right way</p>
          <h2 className="mt-3 font-serif text-[2.5rem] leading-[1] tracking-[-0.03em] text-ink-900 sm:text-[3.25rem]">
            Company <em className="italic">Incorporation</em>
          </h2>
          <p className="mt-4 text-[1.0625rem] leading-relaxed text-ink-900">
            Private Limited, LLP or OPC in India — or a company in six international jurisdictions. Name approval, DSC, DIN, PAN and TAN, all handled for you.
          </p>
          <p className="mt-6 font-serif text-[1.5rem] leading-none text-ink-900">
            From ₹999 <span className="font-sans text-sm text-ink-800">+ govt fee</span>
          </p>
          <div className="mt-6 flex flex-wrap gap-1.5">
            {COUNTRIES.map((c) => (
              <span key={c.slug} className="flex items-center gap-1.5 rounded-full bg-white/70 px-2.5 py-1 text-xs font-medium text-ink-900">
                <Flag code={c.flag} className="h-3 w-[18px]" /> {c.shortName || c.name}
              </span>
            ))}
          </div>
          <Link to="/company-registration" className="text-link mt-6 inline-block text-sm">Compare all options</Link>
        </div>

        <div className="p-7 sm:p-10 md:pt-16">
          {status === 'done' ? (
            <div className="flex h-full flex-col justify-center text-center">
              <i className="ri-checkbox-circle-line text-5xl text-ink-900" />
              <p className="mt-3 font-serif text-[1.75rem] leading-tight tracking-[-0.02em] text-ink-900">Thank you — we’ll call you shortly.</p>
              <p className="mt-2 text-ink-800">An adviser will be in touch within one working day.</p>
              <button onClick={close} className="btn-outline mt-6 self-center">Continue browsing</button>
            </div>
          ) : (
            <>
              <p className="font-serif text-[1.625rem] leading-tight tracking-[-0.02em] text-ink-900">Get a free callback</p>
              <p className="mt-1 text-sm text-ink-800">Tell us what you want to set up — we’ll confirm documents, timeline and a fixed fee.</p>
              <form onSubmit={onSubmit} className="mt-6 space-y-4">
                <label className="block">
                  <span className="mb-2 block text-sm font-semibold text-ink-900">Your name</span>
                  <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="input" autoComplete="name" />
                </label>
                <label className="block">
                  <span className="mb-2 block text-sm font-semibold text-ink-900">Phone</span>
                  <input required type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="input" autoComplete="tel" />
                </label>
                <label className="block">
                  <span className="mb-2 block text-sm font-semibold text-ink-900">I want to register</span>
                  <select value={form.entity} onChange={(e) => setForm({ ...form, entity: e.target.value })} className="input">
                    {ENTITY_TYPES.map((t) => <option key={t}>{t}</option>)}
                  </select>
                </label>
                <button type="submit" disabled={status === 'sending'} className="btn-dark w-full">
                  {status === 'sending' ? 'Sending…' : 'Request a callback'}
                </button>
                {status === 'error' && <p className="text-sm text-red-700">Something went wrong — please use WhatsApp instead.</p>}
              </form>
              <a
                href={waLink('Hello Mishra and Associates, I would like to register a company.')}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp mt-3 w-full"
              >
                <i className="ri-whatsapp-line" /> Chat on WhatsApp
              </a>
            </>
          )}
        </div>
      </div>
    </Modal>
  );
}
