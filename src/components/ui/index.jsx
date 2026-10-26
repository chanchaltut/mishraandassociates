import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { flagUrl } from '../../lib/format';
import { SITE } from '../../data/site';

// ─── Scroll reveal ────────────────────────────────────────────
export function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const root = ref.current;
    if (!root) return undefined;
    const els = root.querySelectorAll('.reveal');
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-visible');
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  });
  return ref;
}

// ─── Section heading ──────────────────────────────────────────
export function SectionHeading({ eyebrow, title, accent, intro, align = 'left', light = false, className = '' }) {
  const center = align === 'center';
  return (
    <div className={`${center ? 'mx-auto text-center' : ''} max-w-3xl ${className}`}>
      {eyebrow && <p className={`eyebrow ${light ? 'eyebrow-light' : ''}`}>{eyebrow}</p>}
      <h2 className={`h-display mt-4 text-3xl leading-[1.12] sm:text-4xl lg:text-[2.75rem] ${light ? '!text-white' : ''}`}>
        {title} {accent && <em className={`italic ${light ? 'text-brass-300' : 'text-brand-600'}`}>{accent}</em>}
      </h2>
      {intro && <p className={`mt-4 text-base leading-relaxed sm:text-lg ${light ? 'text-white/70' : 'text-muted'}`}>{intro}</p>}
    </div>
  );
}

// ─── Inner page hero ──────────────────────────────────────────
export function PageHero({ eyebrow, title, accent, intro, crumbs = [], children, aside }) {
  return (
    <section className="relative overflow-hidden border-b border-line bg-paper">
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-60 [mask-image:linear-gradient(to_bottom,#000,transparent)]" />
      <div className="container-site relative pb-12 pt-10 sm:pb-16 sm:pt-14">
        {crumbs.length > 0 && <Breadcrumbs items={crumbs} />}
        <div className={`mt-6 grid gap-10 ${aside ? 'lg:grid-cols-[1fr_380px] lg:items-end' : ''}`}>
          <div className="max-w-3xl">
            {eyebrow && <p className="eyebrow">{eyebrow}</p>}
            <h1 className="h-display mt-4 text-4xl leading-[1.06] sm:text-5xl lg:text-6xl">
              {title} {accent && <em className="italic text-brand-600">{accent}</em>}
            </h1>
            {intro && <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">{intro}</p>}
            {children}
          </div>
          {aside}
        </div>
      </div>
    </section>
  );
}

export function Breadcrumbs({ items }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-1.5 text-xs font-medium text-muted">
        {items.map((it, i) => (
          <li key={it.path} className="flex items-center gap-1.5">
            {i > 0 && <i className="ri-arrow-right-s-line text-muted/60" aria-hidden="true" />}
            {i < items.length - 1 ? (
              <Link to={it.path} className="hover:text-brand-700">{it.name}</Link>
            ) : (
              <span className="text-ink-900" aria-current="page">{it.name}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

// ─── Flag image ───────────────────────────────────────────────
export function Flag({ code, name, className = 'h-6 w-9' }) {
  return (
    <img
      src={flagUrl(code, 80)}
      srcSet={`${flagUrl(code, 160)} 2x`}
      alt={name ? `${name} flag` : ''}
      loading="lazy"
      className={`rounded-[3px] object-cover shadow-[0_0_0_1px_rgb(0_0_0/0.08)] ${className}`}
    />
  );
}

// ─── Accordion list (FAQs) ────────────────────────────────────
export function Accordion({ items, defaultOpen = 0 }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="divide-y divide-line border-y border-line">
      {items.map((it, i) => {
        const isOpen = open === i;
        return (
          <div key={it.q}>
            <button
              type="button"
              className="flex w-full items-start justify-between gap-6 py-5 text-left"
              onClick={() => setOpen(isOpen ? -1 : i)}
              aria-expanded={isOpen}
            >
              <span className="font-serif text-lg font-medium text-ink-900 sm:text-xl">{it.q}</span>
              <span
                className={`mt-1 grid h-7 w-7 shrink-0 place-items-center rounded-full border transition-all ${
                  isOpen ? 'rotate-45 border-brand-600 bg-brand-600 text-white' : 'border-line text-ink-800'
                }`}
                aria-hidden="true"
              >
                <i className="ri-add-line" />
              </span>
            </button>
            <div className={`grid transition-all duration-300 ${isOpen ? 'grid-rows-[1fr] pb-5' : 'grid-rows-[0fr]'}`}>
              <p className="overflow-hidden pr-12 leading-relaxed text-muted">{it.a}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─── Article body: paragraphs with **bold** lead-ins and \n breaks ─
const renderInline = (text) =>
  text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith('**') ? <strong key={i}>{part.slice(2, -2)}</strong> : <React.Fragment key={i}>{part}</React.Fragment>
  );

export function RichText({ paragraphs }) {
  return (
    <div className="prose-article">
      {paragraphs.map((para, i) => {
        const [first, ...rest] = para.split('\n');
        const heading = /^\*\*[^*]+\*\*$/.test(first.trim());
        if (heading) {
          return (
            <React.Fragment key={i}>
              <h2>{first.trim().slice(2, -2)}</h2>
              {rest.filter((l) => l.trim()).map((line, j) => <p key={j}>{renderInline(line)}</p>)}
            </React.Fragment>
          );
        }
        return para.split('\n').filter((l) => l.trim()).map((line, j) => <p key={`${i}-${j}`}>{renderInline(line)}</p>);
      })}
    </div>
  );
}

// ─── Small "sample" badge used on demo news / notifications ───
export function SampleBadge({ item }) {
  if (!SITE.demoMode || !item?.sample) return null;
  return <span className="tag bg-brass-100 text-brass-600" title="Demo entry — will be replaced from the admin panel">Sample</span>;
}
