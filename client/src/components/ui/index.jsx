import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { flagUrl } from '../../lib/format';
import { SITE } from '../../data/site';
import { pageOverride } from '../../data/pages';

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
      <h2 className={`h-display mt-4 text-[2.25rem] leading-[1.04] sm:text-[2.875rem] lg:text-[3.5rem] ${light ? '!text-white' : ''}`}>
        {title}{accent && <> <em className="italic">{accent}</em></>}
      </h2>
      {intro && <p className={`mt-5 text-[1.0625rem] leading-relaxed sm:text-lg ${center ? 'mx-auto max-w-2xl' : 'max-w-2xl'} ${light ? 'text-white/75' : 'text-ink-800'}`}>{intro}</p>}
    </div>
  );
}

// ─── Inner page hero ──────────────────────────────────────────
// Full-bleed block. tone: 'beige' (textured) or 'white'.
const HERO_TONES = { beige: 'bg-texture', white: 'bg-white border-b border-line' };

export function PageHero({ crumbs = [], children, aside, tone = 'beige', ...text }) {
  // Admin → "Pages & SEO" can replace the heading block; blank fields keep the page's own text
  const page = pageOverride(crumbs[crumbs.length - 1]?.path);
  const eyebrow = page?.eyebrow || text.eyebrow;
  const title = page?.heading || text.title;
  const accent = page?.heading ? page.accent : text.accent;
  const intro = page?.intro || text.intro;
  return (
    <section className={`relative overflow-hidden ${HERO_TONES[tone]}`}>
      <div className="container-site relative pb-14 pt-6 sm:pb-20 sm:pt-8 lg:pb-24">
        {crumbs.length > 0 && <Breadcrumbs items={crumbs} />}
        <div className={`mt-10 grid gap-10 sm:mt-14 ${aside ? 'lg:grid-cols-[1fr_380px] lg:items-end lg:gap-16' : ''}`}>
          <div className="max-w-4xl">
            {eyebrow && <p className="eyebrow">{eyebrow}</p>}
            <h1 className="h-display mt-4 text-[2.75rem] leading-[1.02] sm:text-[3.75rem] lg:text-[4.5rem]">
              {title}{accent && <> <em className="italic">{accent}</em></>}
            </h1>
            {intro && <p className="mt-6 max-w-2xl text-[1.0625rem] leading-relaxed text-ink-800 sm:text-xl">{intro}</p>}
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
      <ol className="flex flex-wrap items-center gap-1.5 text-[0.8125rem] text-ink-800">
        {items.map((it, i) => (
          <li key={it.path} className="flex items-center gap-1.5">
            {i > 0 && <span className="text-ink-900/40" aria-hidden="true">/</span>}
            {i < items.length - 1 ? (
              <Link to={it.path} className="underline decoration-ink-900/30 underline-offset-[3px] hover:decoration-ink-900">{it.name}</Link>
            ) : (
              <span className="font-medium text-ink-900" aria-current="page">{it.name}</span>
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
    <div className="border-t border-ink-900">
      {items.map((it, i) => {
        const isOpen = open === i;
        return (
          <div key={it.q} className="border-b border-ink-900/20">
            <button
              type="button"
              className="group flex w-full items-start justify-between gap-6 py-6 text-left"
              onClick={() => setOpen(isOpen ? -1 : i)}
              aria-expanded={isOpen}
            >
              <span className="font-serif text-[1.3rem] leading-snug tracking-[-0.01em] text-ink-900 sm:text-[1.5rem]">{it.q}</span>
              <span
                className={`mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-full border border-ink-900 text-lg transition-colors ${isOpen ? 'bg-ink-900 text-white' : 'text-ink-900 group-hover:bg-sun'}`}
                aria-hidden="true"
              >
                <i className={isOpen ? 'ri-subtract-line' : 'ri-add-line'} />
              </span>
            </button>
            <div className={`grid transition-all duration-300 ${isOpen ? 'grid-rows-[1fr] pb-6' : 'grid-rows-[0fr]'}`}>
              <p className="overflow-hidden text-[1.0625rem] leading-relaxed text-ink-800 sm:pr-16">{it.a}</p>
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
  return <span className="tag bg-sun-light text-ink-900" title="Demo entry — will be replaced from the admin panel">Sample</span>;
}
