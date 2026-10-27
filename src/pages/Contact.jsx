import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Seo, { breadcrumbLd } from '../lib/seo';
import { SITE, waLink } from '../data/site';
import { PARENT_SERVICES } from '../data/services';
import { submitForm, isBackendConnected } from '../lib/api';
import { PageHero } from '../components/ui';
import Ph from '../components/ui/Ph';

const EMPTY = { name: '', email: '', phone: '', service: '', message: '' };

export default function Contact() {
  const [params] = useSearchParams();
  const [form, setForm] = useState({ ...EMPTY, service: params.get('service') || '' });
  const [status, setStatus] = useState('idle');

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    const res = await submitForm('enquiries', form);
    setStatus(res.ok ? 'done' : 'error');
    if (res.ok) setForm(EMPTY);
  };

  const crumbs = [{ name: 'Home', path: '/' }, { name: 'Contact', path: '/contact' }];
  const serviceOptions = [...PARENT_SERVICES.map((p) => p.title)];
  if (form.service && !serviceOptions.includes(form.service)) serviceOptions.unshift(form.service);

  const cards = [
    { icon: 'ri-phone-line', label: 'Call', value: SITE.phone.display, href: `tel:${SITE.phone.tel}` },
    { icon: 'ri-mail-line', label: 'Email', value: SITE.email, href: `mailto:${SITE.email}` },
    { icon: 'ri-whatsapp-line', label: 'WhatsApp', value: SITE.whatsappDisplay, href: waLink(), external: true },
  ];

  return (
    <>
      <Seo
        title="Contact Us — Book a Consultation"
        description={`Contact Mishra and Associates, Delhi. Call ${SITE.phone.display} or email ${SITE.email} for GST, income tax, compliance and company registration in India and abroad.`}
        path="/contact"
        jsonLd={[
          breadcrumbLd(crumbs),
          { '@context': 'https://schema.org', '@type': 'ContactPage', name: 'Contact Mishra and Associates', url: `${SITE.url}/contact` },
        ]}
      />
      <PageHero crumbs={crumbs} eyebrow="Contact" title="Let’s talk about" accent="what you need." intro="Tell us a little about your requirement. We reply within one working day with next steps and a fixed quote." />

      <section className="bg-white py-16 sm:py-20">
        <div className="container-site grid gap-8 lg:grid-cols-[380px_1fr] lg:gap-10">
          <div className="space-y-3">
            {cards.map((c) => (
              <a
                key={c.label}
                href={c.href}
                {...(c.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="group flex items-center gap-4 rounded-card bg-paper p-5 transition-colors hover:bg-sun-light"
              >
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-ink-900 bg-white text-xl text-ink-900 transition-colors group-hover:bg-ink-900 group-hover:text-white">
                  <i className={c.icon} />
                </span>
                <span className="min-w-0">
                  <span className="block label">{c.label}</span>
                  <span className="block break-words text-[1.0625rem] font-medium text-ink-900 group-hover:underline">{c.value}</span>
                </span>
              </a>
            ))}

            <div className="on-dark rounded-card bg-ink-900 p-7 text-white">
              <p className="text-sm font-semibold text-sun">Office</p>
              <p className="mt-3 font-serif text-[1.25rem] leading-snug text-white">
                {SITE.legalName}<br />
                <Ph>{SITE.address.street}</Ph><br />
                {SITE.address.city} <Ph>{SITE.address.postalCode}</Ph>, {SITE.address.country}
              </p>
              <p className="mt-4 flex items-center gap-2 text-sm text-white/70"><i className="ri-time-line text-sun" /> <Ph>{SITE.hours}</Ph></p>
            </div>

            <div className="grid aspect-[4/3] place-items-center overflow-hidden rounded-card bg-paper">
              {SITE.address.mapEmbedUrl ? (
                <iframe title="Office location" src={SITE.address.mapEmbedUrl} className="h-full w-full" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
              ) : (
                <p className="px-6 text-center text-sm text-muted"><i className="ri-map-2-line mb-2 block text-3xl" />Map will appear once the office address is confirmed.</p>
              )}
            </div>
          </div>

          <div className="rounded-panel border border-ink-900 bg-white p-6 sm:p-12">
            <h2 className="h-display text-[2.25rem] leading-[1.05] sm:text-[2.75rem]">Send an <em className="italic">enquiry</em></h2>
            <p className="mt-3 text-sm text-ink-800">Fields marked * are required.</p>

            {status === 'done' ? (
              <div className="mt-8 rounded-card bg-mint p-8 text-center">
                <i className="ri-checkbox-circle-line text-5xl text-ink-900" />
                <p className="mt-3 font-serif text-[1.75rem] leading-tight tracking-[-0.02em] text-ink-900">Thank you — we’ve received your enquiry.</p>
                <p className="mt-2 text-ink-800">An adviser will get back to you within one working day.</p>
                {!isBackendConnected && SITE.demoMode && (
                  <p className="mt-4 text-xs text-ink-900">Demo mode: enquiries will be delivered to the admin panel and email once the backend is connected.</p>
                )}
                <button onClick={() => setStatus('idle')} className="btn-outline mt-6">Send another</button>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="mt-8 grid gap-5 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-2 block text-sm font-semibold text-ink-900">Full name *</span>
                  <input name="name" required value={form.name} onChange={onChange} className="input" autoComplete="name" />
                </label>
                <label className="block">
                  <span className="mb-2 block text-sm font-semibold text-ink-900">Phone *</span>
                  <input name="phone" type="tel" required value={form.phone} onChange={onChange} className="input" autoComplete="tel" />
                </label>
                <label className="block">
                  <span className="mb-2 block text-sm font-semibold text-ink-900">Email *</span>
                  <input name="email" type="email" required value={form.email} onChange={onChange} className="input" autoComplete="email" />
                </label>
                <label className="block">
                  <span className="mb-2 block text-sm font-semibold text-ink-900">Service</span>
                  <select name="service" value={form.service} onChange={onChange} className="input">
                    <option value="">Select a service</option>
                    {serviceOptions.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </label>
                <label className="block sm:col-span-2">
                  <span className="mb-2 block text-sm font-semibold text-ink-900">How can we help? *</span>
                  <textarea name="message" required rows={5} value={form.message} onChange={onChange} className="input resize-none" />
                </label>
                <div className="flex flex-col gap-3 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-xs text-ink-800">By submitting, you agree to our privacy policy.</p>
                  <button type="submit" disabled={status === 'sending'} className="btn-primary !px-7 !py-3.5">
                    {status === 'sending' ? 'Sending…' : 'Send enquiry'} <i className="ri-send-plane-line" />
                  </button>
                </div>
                {status === 'error' && (
                  <p className="text-sm text-red-700 sm:col-span-2">
                    Something went wrong. Please call {SITE.phone.display} or email {SITE.email}.
                  </p>
                )}
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
