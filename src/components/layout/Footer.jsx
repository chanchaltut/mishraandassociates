import React from 'react';
import { Link } from 'react-router-dom';
import { SITE, KNOWLEDGE_LINKS, fullAddress, waLink } from '../../data/site';
import { PARENT_SERVICES } from '../../data/services';
import { COUNTRIES } from '../../data/countries';
import Logo from '../ui/Logo';
import Ph from '../ui/Ph';
import NewsletterForm from '../NewsletterForm';

const SOCIALS = [
  { key: 'linkedin', icon: 'ri-linkedin-fill', label: 'LinkedIn' },
  { key: 'x', icon: 'ri-twitter-x-line', label: 'X' },
  { key: 'facebook', icon: 'ri-facebook-fill', label: 'Facebook' },
  { key: 'instagram', icon: 'ri-instagram-line', label: 'Instagram' },
  { key: 'youtube', icon: 'ri-youtube-line', label: 'YouTube' },
];

function Col({ title, children }) {
  return (
    <div>
      <h3 className="text-2xs font-bold uppercase tracking-[0.18em] !text-brass-300">{title}</h3>
      <ul className="mt-5 space-y-2.5 text-sm">{children}</ul>
    </div>
  );
}

const FLink = ({ to, children }) => (
  <li>
    <Link to={to} className="text-white/65 transition-colors hover:text-white">{children}</Link>
  </li>
);

export default function Footer() {
  return (
    <footer className="on-dark relative overflow-hidden bg-ink-950 text-white">
      <div className="bg-grid-dark pointer-events-none absolute inset-0" />

      {/* Newsletter band */}
      <div className="relative border-b border-white/10">
        <div className="container-site grid gap-8 py-12 lg:grid-cols-[1.1fr_1fr] lg:items-center">
          <div>
            <p className="eyebrow eyebrow-light">The Weekly Brief</p>
            <p className="mt-3 font-serif text-2xl leading-snug sm:text-3xl">
              Notifications, due dates and what they mean for you — <em className="italic text-brass-300">in five minutes a week.</em>
            </p>
          </div>
          <NewsletterForm dark />
        </div>
      </div>

      <div className="container-site relative grid grid-cols-2 gap-x-6 gap-y-12 py-14 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div className="col-span-2 lg:col-span-1">
          <Logo tone="light" />
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-white/65">{SITE.description}</p>
          <ul className="mt-6 space-y-3 text-sm">
            <li className="flex gap-3">
              <i className="ri-map-pin-line mt-0.5 text-brass-300" />
              <span className="text-white/75"><Ph>{SITE.address.street}</Ph>, {SITE.address.city} <Ph>{SITE.address.postalCode}</Ph></span>
            </li>
            <li className="flex gap-3">
              <i className="ri-phone-line mt-0.5 text-brass-300" />
              <a href={`tel:${SITE.phone.tel}`} className="text-white/75 hover:text-white">{SITE.phone.display}</a>
            </li>
            <li className="flex gap-3">
              <i className="ri-whatsapp-line mt-0.5 text-brass-300" />
              <a href={waLink()} target="_blank" rel="noopener noreferrer" className="text-white/75 hover:text-white">{SITE.whatsappDisplay}</a>
            </li>
            <li className="flex gap-3">
              <i className="ri-mail-line mt-0.5 text-brass-300" />
              <a href={`mailto:${SITE.email}`} className="text-white/75 hover:text-white">{SITE.email}</a>
            </li>
            <li className="flex gap-3">
              <i className="ri-time-line mt-0.5 text-brass-300" />
              <span className="text-white/75"><Ph>{SITE.hours}</Ph></span>
            </li>
          </ul>
          <div className="mt-6 flex gap-2">
            {SOCIALS.map((s) => (
              <a
                key={s.key}
                href={SITE.social[s.key]}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="grid h-9 w-9 place-items-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-brass-300 hover:text-brass-300"
              >
                <i className={s.icon} />
              </a>
            ))}
          </div>
        </div>

        <Col title="Services">
          {PARENT_SERVICES.filter((p) => !p.isGlobal).slice(0, 9).map((p) => (
            <FLink key={p.id} to={`/services?category=${encodeURIComponent(p.category)}`}>{p.title}</FLink>
          ))}
          <FLink to="/services">All services →</FLink>
        </Col>

        <Col title="Company Registration">
          {COUNTRIES.map((c) => (
            <FLink key={c.slug} to={`/company-registration/${c.slug}`}>{c.name}</FLink>
          ))}
          <FLink to="/company-registration">Compare jurisdictions →</FLink>
        </Col>

        <div className="col-span-2 grid grid-cols-2 gap-6 sm:col-span-1 sm:block sm:space-y-10 lg:col-span-1">
          <Col title="Knowledge Hub">
            {KNOWLEDGE_LINKS.map((k) => <FLink key={k.href} to={k.href}>{k.name}</FLink>)}
          </Col>
          <Col title="Firm">
            <FLink to="/about">About us</FLink>
            <FLink to="/contact">Contact</FLink>
            <FLink to="/privacy-policy">Privacy policy</FLink>
            <FLink to="/terms-conditions">Terms of use</FLink>
          </Col>
        </div>
      </div>

      <div className="relative border-t border-white/10">
        <div className="container-site space-y-4 py-6 text-xs text-white/50">
          <p className="leading-relaxed">
            Disclaimer: Information on this website is for general guidance only and does not constitute professional advice. Laws, rates and due dates change;
            please consult us before acting on any information. Government and statutory fees are charged at actuals.
          </p>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <p>
              © {new Date().getFullYear()} {SITE.legalName}. All rights reserved. <span className="hidden sm:inline">·</span>{' '}
              <Ph>{SITE.registration}</Ph>
            </p>
            <p>
              Designed &amp; developed by{' '}
              <a href="https://codehyphen.in" target="_blank" rel="noopener noreferrer" className="font-semibold text-white/70 hover:text-brass-300">
                Code Hyphen
              </a>
            </p>
          </div>
          <p className="sr-only">{fullAddress()}</p>
        </div>
      </div>
    </footer>
  );
}
