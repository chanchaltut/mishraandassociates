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
    <article id={service.id} className={`scroll-mt-32 rounded-card border bg-white transition-colors ${open ? 'border-ink-900' : 'border-line hover:border-ink-900/50'}`}>
      <button type="button" onClick={() => setOpen((o) => !o)} className="flex w-full items-center gap-4 p-5 text-left sm:p-6" aria-expanded={open}>
        <span className={`grid h-12 w-12 shrink-0 place-items-center rounded-full border text-xl transition-colors ${open ? 'border-sun bg-sun text-ink-900' : 'border-transparent bg-paper text-ink-900'}`}>
          <i className={service.icon} />
        </span>
        <span className="min-w-0 flex-1">
          <span className="flex flex-wrap items-center gap-2">
            <span className="font-serif text-[1.375rem] leading-tight tracking-[-0.015em] text-ink-900 sm:text-[1.5rem]">{service.title}</span>
            {service.badge && <span className="tag bg-sun-light text-ink-900">{service.badge}</span>}
          </span>
          <span className="mt-1 block text-sm text-ink-800">
            {service.subcategories.length} services · from <strong className="font-semibold text-ink-900"><Ph>{service.startingPrice}</Ph></strong>
          </span>
        </span>
        <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-full border border-ink-900 text-xl text-ink-900 transition-transform ${open ? 'rotate-180' : ''}`}><i className="ri-arrow-down-s-line" /></span>
      </button>

      <div className={`grid transition-all duration-300 ${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
        <div className="overflow-hidden">
          <div className="border-t border-line px-5 pb-6 pt-4 sm:px-6">
            <p className="text-[0.9375rem] leading-relaxed text-ink-800">{service.shortDesc}</p>
            <ul className="mt-5 divide-y divide-line overflow-hidden rounded-xl border border-line">
              {service.subcategories.map((sub) => (
                <li key={sub.name} className="flex flex-col gap-2 p-3.5 sm:flex-row sm:items-center sm:gap-4">
                  <span className="flex flex-1 items-start gap-2.5 text-[0.9375rem] font-medium text-ink-900">
                    <i className="ri-checkbox-circle-fill mt-0.5 text-brand-500" />
                    {sub.href ? <Link to={sub.href} className="hover:underline">{sub.name}</Link> : sub.name}
                    {sub.popular && <span className="tag bg-brand-50 text-brand-800">Popular</span>}
                  </span>
                  <span className="flex items-center gap-3 pl-6 sm:pl-0">
                    <span className="text-[0.8125rem] font-semibold text-ink-900"><Ph>{sub.price}</Ph></span>
                    {sub.href ? (
                      <Link to={sub.href} className="rounded-full border border-ink-900 px-3.5 py-1.5 text-xs font-medium text-ink-900 transition-colors hover:bg-sun">Details</Link>
                    ) : (
                      <a href={enquiry(sub.name)} target="_blank" rel="noopener noreferrer" className="rounded-full border border-ink-900 px-3.5 py-1.5 text-xs font-medium text-ink-900 transition-colors hover:border-whatsapp hover:bg-whatsapp hover:text-white">
                        Enquire
                      </a>
                    )}
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to={`/contact?service=${encodeURIComponent(service.title)}`} className="btn-primary btn-sm">Request a quote</Link>
              <a href={enquiry(service.title)} target="_blank" rel="noopener noreferrer" className="btn-outline btn-sm"><i className="ri-whatsapp-line" /> WhatsApp</a>
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
            className="input !rounded-full !pl-10"
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
                className={`flex shrink-0 items-center gap-2.5 rounded-full px-4 py-2 text-left text-[0.9375rem] font-medium transition-colors lg:py-2.5 ${
                  active ? 'bg-ink-900 text-white' : 'border border-line bg-white text-ink-900 hover:border-ink-900 lg:border-transparent lg:bg-transparent lg:hover:border-transparent lg:hover:bg-white'
                }`}
              >
                <i className={`${p?.icon || 'ri-apps-2-line'} ${active ? 'text-sun' : 'text-ink-900'}`} />
                {c === 'All' ? 'All practice areas' : c}
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Cards */}
      <div className="space-y-3">
        {filtered.length === 0 && (
          <div className="rounded-card border border-dashed border-line bg-white p-10 text-center">
            <p className="font-serif text-2xl tracking-[-0.015em] text-ink-900">No services match “{query}”.</p>
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
