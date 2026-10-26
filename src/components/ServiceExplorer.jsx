import React, { useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { PARENT_SERVICES } from '../data/services';
import { SITE, waLink } from '../data/site';
import Ph from './ui/Ph';

const enquiry = (name) => waLink(`Hello ${SITE.name}, I would like to enquire about: ${name}.`);

function CategoryCard({ service, defaultOpen }) {
  const [open, setOpen] = useState(defaultOpen);
  useEffect(() => setOpen(defaultOpen), [defaultOpen]);

  return (
    <article id={service.id} className={`scroll-mt-32 rounded-sm border bg-white transition-all ${open ? 'border-ink-900/40' : 'border-line'}`}>
      <button type="button" onClick={() => setOpen((o) => !o)} className="flex w-full items-center gap-4 p-5 text-left sm:p-6" aria-expanded={open}>
        <span className={`grid h-12 w-12 shrink-0 place-items-center rounded-sm border text-xl transition-colors ${open ? 'border-ink-900 bg-ink-900 text-white' : 'border-line text-brand-700'}`}>
          <i className={service.icon} />
        </span>
        <span className="min-w-0 flex-1">
          <span className="flex flex-wrap items-center gap-2">
            <span className="text-base font-semibold text-ink-900 sm:text-lg">{service.title}</span>
            {service.badge && <span className="tag bg-brass-100 text-brass-600">{service.badge}</span>}
          </span>
          <span className="mt-0.5 block text-sm text-muted">
            {service.subcategories.length} services · from <strong className="text-brand-700"><Ph>{service.startingPrice}</Ph></strong>
          </span>
        </span>
        <i className={`ri-arrow-down-s-line text-2xl text-muted transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      <div className={`grid transition-all duration-300 ${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
        <div className="overflow-hidden">
          <div className="border-t border-line px-5 pb-6 pt-4 sm:px-6">
            <p className="text-sm leading-relaxed text-muted">{service.shortDesc}</p>
            <ul className="mt-4 divide-y divide-line rounded-sm border border-line">
              {service.subcategories.map((sub) => (
                <li key={sub.name} className="flex flex-col gap-2 p-3.5 sm:flex-row sm:items-center sm:gap-4">
                  <span className="flex flex-1 items-start gap-2.5 text-sm font-semibold text-ink-900">
                    <i className="ri-checkbox-circle-fill mt-0.5 text-brand-500" />
                    {sub.href ? <Link to={sub.href} className="hover:text-brand-700 hover:underline">{sub.name}</Link> : sub.name}
                    {sub.popular && <span className="tag bg-brand-50 text-brand-700">Popular</span>}
                  </span>
                  <span className="flex items-center gap-3 pl-6 sm:pl-0">
                    <span className="text-xs font-semibold text-brand-700"><Ph>{sub.price}</Ph></span>
                    {sub.href ? (
                      <Link to={sub.href} className="rounded-sm border border-line px-3 py-1.5 text-xs font-semibold text-ink-800 hover:border-brand-500 hover:text-brand-700">Details</Link>
                    ) : (
                      <a href={enquiry(sub.name)} target="_blank" rel="noopener noreferrer" className="rounded-sm border border-line px-3 py-1.5 text-xs font-semibold text-ink-800 hover:border-whatsapp hover:text-whatsapp">
                        Enquire
                      </a>
                    )}
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-5 flex flex-wrap gap-2">
              <Link to={`/contact?service=${encodeURIComponent(service.title)}`} className="btn-primary !py-2.5">Request a quote</Link>
              <a href={enquiry(service.title)} target="_blank" rel="noopener noreferrer" className="btn-outline !py-2.5"><i className="ri-whatsapp-line" /> WhatsApp</a>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function ServiceExplorer() {
  const [params, setParams] = useSearchParams();
  const category = params.get('category') || 'All';
  const [query, setQuery] = useState(params.get('q') || '');

  const setCategory = (c) => {
    const next = new URLSearchParams(params);
    if (c === 'All') next.delete('category');
    else next.set('category', c);
    setParams(next, { replace: true });
  };

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return PARENT_SERVICES.map((p) => {
      if (category !== 'All' && p.category !== category) return null;
      if (!q) return p;
      if (p.title.toLowerCase().includes(q) || p.shortDesc.toLowerCase().includes(q)) return p;
      const subs = p.subcategories.filter((s) => s.name.toLowerCase().includes(q));
      return subs.length ? { ...p, subcategories: subs } : null;
    }).filter(Boolean);
  }, [category, query]);

  const total = PARENT_SERVICES.reduce((n, p) => n + p.subcategories.length, 0);

  return (
    <div className="grid gap-8 lg:grid-cols-[260px_1fr] lg:gap-12">
      {/* Category rail */}
      <aside className="lg:sticky lg:top-28 lg:self-start">
        <div className="relative">
          <i className="ri-search-line absolute left-4 top-1/2 -translate-y-1/2 text-muted" aria-hidden="true" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={`Search ${total}+ services`}
            className="input !rounded-sm !pl-10"
            aria-label="Search services"
          />
        </div>
        <nav className="scrollbar-none -mx-4 mt-4 flex gap-2 overflow-x-auto px-4 lg:mx-0 lg:flex-col lg:gap-0.5 lg:px-0" aria-label="Service categories">
          {['All', ...PARENT_SERVICES.map((p) => p.category)].map((c) => {
            const active = c === category;
            const p = PARENT_SERVICES.find((x) => x.category === c);
            return (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`flex shrink-0 items-center gap-2.5 rounded-sm px-4 py-2 text-left text-sm font-semibold transition-colors lg:py-2.5 ${
                  active ? 'bg-ink-900 text-white' : 'bg-white text-ink-800 hover:bg-white lg:bg-transparent lg:hover:bg-white'
                }`}
              >
                <i className={`${p?.icon || 'ri-apps-2-line'} ${active ? 'text-brass-300' : 'text-brand-600'}`} />
                {c === 'All' ? 'All practice areas' : c}
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Cards */}
      <div className="space-y-3">
        {filtered.length === 0 && (
          <div className="rounded-sm border border-dashed border-line bg-white p-10 text-center">
            <p className="font-serif text-xl text-ink-900">No services match “{query}”.</p>
            <p className="mt-2 text-sm text-muted">We probably still do it — ask us directly.</p>
            <a href={enquiry(query)} target="_blank" rel="noopener noreferrer" className="btn-whatsapp mt-5"><i className="ri-whatsapp-line" /> Ask on WhatsApp</a>
          </div>
        )}
        {filtered.map((s, i) => (
          <CategoryCard key={s.id} service={s} defaultOpen={category !== 'All' || Boolean(query) || i === 0} />
        ))}
        <p className="pt-3 text-xs text-muted">* Prices are professional fees “starting from”; final quote depends on scope. Government fees are charged at actuals.</p>
      </div>
    </div>
  );
}
