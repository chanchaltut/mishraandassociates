import React from 'react';
import { SITE } from '../../data/site';

/**
 * Brand logo. Until the final artwork is supplied (SITE.logo), a typographic
 * placeholder mark is rendered. `tone` switches colours for dark backgrounds.
 */
export default function Logo({ tone = 'dark', compact = false, className = '' }) {
  if (SITE.logo) {
    return <img src={SITE.logo} alt={SITE.name} className={`h-10 w-auto ${className}`} />;
  }

  const light = tone === 'light';
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <span
        className={`relative grid h-10 w-10 shrink-0 place-items-center rounded-[10px] ${
          light ? 'bg-brass-400 text-ink-950' : 'bg-ink-900 text-brass-300'
        }`}
        aria-hidden="true"
      >
        <span className="font-serif text-[1.15rem] font-semibold leading-none tracking-tight">
          M<span className={light ? 'text-ink-800' : 'text-white'}>A</span>
        </span>
      </span>
      {!compact && (
        <span className="flex flex-col leading-none">
          <span className={`font-serif text-[1.15rem] font-semibold tracking-tight ${light ? 'text-white' : 'text-ink-900'}`}>
            Mishra <span className={`font-normal italic ${light ? 'text-brass-300' : 'text-brass-500'}`}>and</span> Associates
          </span>
          <span className={`mt-1 hidden text-[0.6rem] font-bold uppercase tracking-[0.22em] sm:block ${light ? 'text-white/55' : 'text-muted'}`}>
            Tax · Compliance · Global Setup
          </span>
        </span>
      )}
    </span>
  );
}
