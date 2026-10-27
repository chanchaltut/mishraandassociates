import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { searchSite } from '../../lib/search';
import { Flag } from '../ui';

const SUGGESTIONS = ['GST registration', 'Company registration in UAE', 'ITR filing', 'TDS return', 'Trademark', 'Singapore'];

export default function SearchDialog({ open, onClose }) {
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const results = searchSite(query);

  useEffect(() => {
    if (open) {
      setQuery('');
      setActive(0);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  if (!open) return null;

  const go = (href) => {
    onClose();
    navigate(href);
  };

  const onKeyDown = (e) => {
    if (e.key === 'Escape') onClose();
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, results.length - 1));
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    }
    if (e.key === 'Enter' && results[active]) go(results[active].href);
  };

  return (
    <div className="fixed inset-0 z-[120] flex items-start justify-center px-4 pt-[10vh]" role="dialog" aria-modal="true" aria-label="Search the site">
      <div className="absolute inset-0 bg-ink-950/60 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />
      <div className="relative w-full max-w-2xl overflow-hidden rounded-panel border border-ink-900 bg-white shadow-lift">
        <div className="flex items-center gap-3 border-b border-line px-5">
          <i className="ri-search-line text-xl text-ink-900" aria-hidden="true" />
          <input
            ref={inputRef}
            autoFocus
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActive(0);
            }}
            onKeyDown={onKeyDown}
            placeholder="Search services, countries, articles, notifications…"
            className="h-16 w-full bg-transparent text-[1.0625rem] text-ink-900 outline-none placeholder:text-muted"
            aria-label="Search"
          />
          <button onClick={onClose} className="rounded-full border border-ink-900 px-2.5 py-1 text-2xs font-semibold text-ink-900 hover:bg-sun">
            ESC
          </button>
        </div>

        <div className="max-h-[60vh] overflow-y-auto p-2">
          {!query && (
            <div className="p-3">
              <p className="mb-3 text-sm font-semibold text-ink-900">Popular searches</p>
              <div className="flex flex-wrap gap-2">
                {SUGGESTIONS.map((s) => (
                  <button key={s} className="chip" onClick={() => setQuery(s)}>
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {query && results.length === 0 && (
            <p className="p-6 text-center text-sm text-muted">
              No results for <strong className="text-ink-900">“{query}”</strong>. Try a broader term, or{' '}
              <button className="link-underline font-semibold" onClick={() => go('/contact')}>ask our team</button>.
            </p>
          )}

          <ul>
            {results.map((r, i) => (
              <li key={`${r.href}-${r.title}`}>
                <button
                  onClick={() => go(r.href)}
                  onMouseEnter={() => setActive(i)}
                  className={`flex w-full items-start gap-3 rounded-lg px-3 py-3 text-left transition-colors ${
                    i === active ? 'bg-sun-light' : ''
                  }`}
                >
                  <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-full bg-cream text-ink-900">
                    {r.flag ? <Flag code={r.flag} className="h-4 w-6" /> : <i className={r.icon} />}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[0.9375rem] font-medium text-ink-900">{r.title}</span>
                    <span className="block truncate text-xs text-muted">{r.meta}</span>
                  </span>
                  <span className="tag mt-1 shrink-0 bg-paper text-ink-800">{r.kind}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
