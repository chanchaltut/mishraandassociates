import React from 'react';
import { Link } from 'react-router-dom';
import { SITE, waLink } from '../data/site';
import { FAQS } from '../data/content';
import { SectionHeading, Accordion } from './ui';

export function FAQBlock({ items = FAQS, title = 'Questions,', accent = 'answered.', intro }) {
  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="container-site grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionHeading
            eyebrow="FAQ"
            title={title}
            accent={accent}
            intro={intro || 'Can’t find what you’re looking for? Our team usually replies within one working day.'}
          />
          <Link to="/contact" className="btn-outline mt-8">Ask a question</Link>
        </div>
        <Accordion items={items} />
      </div>
    </section>
  );
}

export function CTABand({
  title = 'Let’s get your compliance',
  accent = 'off your plate.',
  text = 'Tell us what you need. We’ll confirm scope, timeline and a fixed fee — usually the same day.',
}) {
  return (
    <section className="bg-paper px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <div className="on-dark relative mx-auto max-w-site overflow-hidden rounded-[32px] bg-brand-800 px-6 py-14 text-white sm:px-12 lg:px-16 lg:py-20">
        <div className="bg-grid-dark pointer-events-none absolute inset-0" />
        <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-brass-400/20 blur-3xl" />
        <div className="relative grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:items-center">
          <div>
            <h2 className="h-display text-3xl leading-tight !text-white sm:text-5xl">
              {title} <em className="italic text-brass-300">{accent}</em>
            </h2>
            <p className="mt-4 max-w-xl text-white/75">{text}</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col lg:items-end">
            <Link to="/contact" className="btn-brass !px-7 !py-4">Book a consultation <i className="ri-arrow-right-up-line" /></Link>
            <div className="flex flex-wrap gap-3">
              <a href={`tel:${SITE.phone.tel}`} className="btn-outline-light"><i className="ri-phone-line" /> {SITE.phone.display}</a>
              <a href={waLink()} target="_blank" rel="noopener noreferrer" className="btn-outline-light"><i className="ri-whatsapp-line" /> WhatsApp</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
