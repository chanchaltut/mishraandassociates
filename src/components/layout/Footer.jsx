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
      <h3 className="text-[0.9375rem] font-semibold text-ink-900">{title}</h3>
      <ul className="mt-5 space-y-3 text-[0.9375rem]">{children}</ul>
    </div>
  );
}

const FLink = ({ to, children }) => (
  <li>
    <Link to={to} className="text-ink-800 underline-offset-[3px] hover:text-ink-900 hover:underline">{children}</Link>
  </li>
);

export default function Footer() {
  return (
    <footer className="relative bg-paper-2 text-ink-900">

      {/* Newsletter band */}
      <div className="border-b border-ink-900/15">
        <div className="container-site grid gap-8 py-14 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-16">
          <div>
            <p className="eyebrow">The Weekly Brief</p>
            <p className="mt-3 font-serif text-[2rem] leading-[1.08] tracking-[-0.025em] sm:text-[2.5rem]">
              Notifications, due dates and what they mean for you — <em className="italic">in five minutes a week.</em>
            </p>
          </div>
          <NewsletterForm />
        </div>
      </div>

      <div className="container-site grid grid-cols-2 gap-x-6 gap-y-12 py-16 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div className="col-span-2 lg:col-span-1">
          <Logo />
          <p className="mt-6 max-w-sm text-[0.9375rem] leading-relaxed text-ink-800">{SITE.description}</p>
          <ul className="mt-6 space-y-3 text-[0.9375rem] text-ink-800">
            <li className="flex gap-3">
              <i className="ri-map-pin-line mt-0.5 text-ink-900" />
              <span><Ph>{SITE.address.street}</Ph>, {SITE.address.city} <Ph>{SITE.address.postalCode}</Ph></span>
            </li>
            <li className="flex gap-3">
              <i className="ri-phone-line mt-0.5 text-ink-900" />
              <a href={`tel:${SITE.phone.tel}`} className="hover:text-ink-900 hover:underline">{SITE.phone.display}</a>
            </li>
            <li className="flex gap-3">
              <i className="ri-whatsapp-line mt-0.5 text-ink-900" />
              <a href={waLink()} target="_blank" rel="noopener noreferrer" className="hover:text-ink-900 hover:underline">{SITE.whatsappDisplay}</a>
            </li>
            <li className="flex gap-3">
              <i className="ri-mail-line mt-0.5 text-ink-900" />
              <a href={`mailto:${SITE.email}`} className="break-all hover:text-ink-900 hover:underline">{SITE.email}</a>
            </li>
            <li className="flex gap-3">
              <i className="ri-time-line mt-0.5 text-ink-900" />
              <span><Ph>{SITE.hours}</Ph></span>
            </li>
          </ul>
          <div className="mt-7 flex gap-2">
            {SOCIALS.map((s) => (
              <a
                key={s.key}
                href={SITE.social[s.key]}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="grid h-10 w-10 place-items-center rounded-full border border-ink-900 text-ink-900 transition-colors hover:bg-sun"
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
          <FLink to="/services">All services</FLink>
        </Col>

        <Col title="Company registration">
          {COUNTRIES.map((c) => (
            <FLink key={c.slug} to={`/company-registration/${c.slug}`}>{c.name}</FLink>
          ))}
          <FLink to="/company-registration">Compare jurisdictions</FLink>
        </Col>

        <div className="col-span-2 grid grid-cols-2 gap-6 sm:col-span-1 sm:block sm:space-y-10 lg:col-span-1">
          <Col title="Knowledge hub">
            {KNOWLEDGE_LINKS.map((k) => <FLink key={k.href} to={k.href}>{k.name}</FLink>)}
          </Col>
          <Col title="Firm">
            <FLink to="/about">About us</FLink>
            <FLink to="/clients">Our clients</FLink>
            <FLink to="/contact">Contact</FLink>
            <FLink to="/privacy-policy">Privacy policy</FLink>
            <FLink to="/terms-conditions">Terms of use</FLink>
          </Col>
        </div>
      </div>

      <div className="border-t border-ink-900/15">
        <div className="container-site space-y-4 py-7 text-xs text-ink-800">
          <p className="max-w-4xl leading-relaxed">
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
              <a href="https://codehyphen.in" target="_blank" rel="noopener noreferrer" className="font-semibold text-ink-900 underline underline-offset-2">
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
