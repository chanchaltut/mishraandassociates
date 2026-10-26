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
          <div className="mt-8 flex flex-wrap items-center gap-5">
            <Link to="/contact" className="btn-outline">Ask a question</Link>
            <Link to="/faqs" className="text-sm font-semibold text-brand-700 hover:underline">View all FAQs →</Link>
          </div>
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
    <section className="on-dark border-t-2 border-brass-400 bg-brand-800 text-white">
      <div className="container-site grid gap-10 py-16 sm:py-20 lg:grid-cols-[1.3fr_1fr] lg:items-center">
        <div>
          <h2 className="h-display text-3xl leading-tight !text-white sm:text-[2.6rem]">
            {title} {accent}
          </h2>
          <p className="mt-4 max-w-xl text-white/70">{text}</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row lg:flex-col lg:items-end">
          <Link to="/contact" className="btn-brass !px-7 !py-3.5">Book a consultation <i className="ri-arrow-right-line" /></Link>
          <div className="flex flex-wrap gap-3">
            <a href={`tel:${SITE.phone.tel}`} className="btn-outline-light"><i className="ri-phone-line" /> {SITE.phone.display}</a>
            <a href={waLink()} target="_blank" rel="noopener noreferrer" className="btn-outline-light"><i className="ri-whatsapp-line" /> WhatsApp</a>
          </div>
        </div>
      </div>
    </section>
  );
}
