import React from 'react';
import { Link } from 'react-router-dom';
import { SITE, waLink } from '../data/site';
import { FAQS } from '../data/content';
import { SectionHeading, Accordion } from './ui';

export function FAQBlock({ items = FAQS, title = 'Questions,', accent = 'answered.', intro }) {
  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="container-site grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionHeading
            eyebrow="FAQ"
            title={title}
            accent={accent}
            intro={intro || 'Can’t find what you’re looking for? Our team usually replies within one working day.'}
          />
          <div className="mt-9 flex flex-wrap items-center gap-6">
            <Link to="/contact" className="btn-outline">Ask a question</Link>
            <Link to="/faqs" className="text-link text-[0.9375rem]">View all FAQs</Link>
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
    <section className="bg-texture">
      <div className="container-site py-20 text-center sm:py-28">
        <h2 className="h-display mx-auto max-w-4xl text-[2.5rem] leading-[1.02] sm:text-[3.75rem] lg:text-[4.5rem]">
          {title} <em className="italic">{accent}</em>
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-[1.0625rem] leading-relaxed text-ink-900 sm:text-lg">{text}</p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Link to="/contact" className="btn-dark !px-7 !py-3.5">Book a consultation</Link>
          <a href={`tel:${SITE.phone.tel}`} className="btn-light !px-7 !py-3.5"><i className="ri-phone-line" /> {SITE.phone.display}</a>
          <a href={waLink()} target="_blank" rel="noopener noreferrer" className="btn-light !px-7 !py-3.5"><i className="ri-whatsapp-line" /> WhatsApp</a>
        </div>
      </div>
    </section>
  );
}
