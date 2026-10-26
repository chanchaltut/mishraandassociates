import React, { useEffect, useState } from 'react';
import { SITE, waLink } from '../../data/site';

export default function FloatingActions() {
  const [showTop, setShowTop] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setShowTop(window.scrollY > 600);
      setScrolled(window.scrollY > 420);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      className={`no-print fixed bottom-4 right-4 z-[90] flex flex-col items-end gap-2.5 transition-all duration-300 sm:bottom-6 sm:right-6 ${
        scrolled ? '' : 'max-sm:pointer-events-none max-sm:translate-y-6 max-sm:opacity-0'
      }`}
    >
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`grid h-11 w-11 place-items-center rounded-full border border-line bg-white text-ink-900 shadow-soft transition-all hover:border-brand-500 ${
          showTop ? 'opacity-100' : 'pointer-events-none translate-y-2 opacity-0'
        }`}
        aria-label="Back to top"
      >
        <i className="ri-arrow-up-line" />
      </button>
      <a
        href={`tel:${SITE.phone.tel}`}
        className="grid h-11 w-11 place-items-center rounded-full bg-ink-900 text-brass-300 sm:h-12 sm:w-12 shadow-lift transition-transform hover:-translate-y-0.5"
        aria-label={`Call ${SITE.phone.display}`}
      >
        <i className="ri-phone-fill text-lg" />
      </a>
      <a
        href={waLink()}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex h-12 items-center gap-2 rounded-full bg-whatsapp px-3.5 text-white sm:h-14 sm:pl-4 shadow-lift transition-transform hover:-translate-y-0.5 sm:pr-5"
        aria-label="Chat on WhatsApp"
      >
        <i className="ri-whatsapp-line text-2xl" />
        <span className="hidden text-sm font-bold sm:inline">Chat with us</span>
      </a>
    </div>
  );
}
