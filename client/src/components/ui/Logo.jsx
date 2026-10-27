import React from 'react';
import { SITE } from '../../data/site';
import { img } from '../../lib/images';

/**
 * Brand logo. Until the final artwork is supplied (SITE.logo), a typographic
 * placeholder mark is rendered. `tone` switches colours for dark backgrounds.
 */
export default function Logo({ tone = 'dark', compact = false, className = '' }) {
  if (SITE.logo) {
    return <img src={img(SITE.logo, 400)} alt={SITE.name} className={`h-10 w-auto ${className}`} />;
  }

  const light = tone === 'light';
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <span
        className={`grid h-10 w-10 shrink-0 place-items-center rounded-full bg-sun text-ink-900 ${light ? '' : 'shadow-edge'}`}
        aria-hidden="true"
      >
        <span className="font-serif text-[1.05rem] italic leading-none tracking-[-0.03em]">m&amp;a</span>
      </span>
      {!compact && (
        <span className={`font-serif text-[1.375rem] leading-none tracking-[-0.03em] ${light ? 'text-white' : 'text-ink-900'}`}>
          Mishra <span className="italic">&amp;</span> Associates
        </span>
      )}
    </span>
  );
}
