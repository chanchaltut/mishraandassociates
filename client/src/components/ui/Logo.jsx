import React, { useState } from 'react';
import { SITE } from '../../data/site';
import { img } from '../../lib/images';

const BUILT_IN_LOGO = '/images/logo.webp';

/**
 * Brand logo: the logo uploaded in the admin panel (SITE.logo), else the built-in
 * artwork. If the image can't load, the typographic mark is shown instead.
 */
export default function Logo({ tone = 'dark', compact = false, className = '' }) {
  const src = SITE.logo || BUILT_IN_LOGO;
  const [failed, setFailed] = useState(false);

  if (!failed) {
    return (
      <img
        src={img(src, 700)}
        alt={SITE.name}
        height="56"
        className={`w-auto ${compact ? 'h-8' : 'h-9 sm:h-11'} ${className}`}
        onError={() => setFailed(true)}
      />
    );
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
