import React, { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { SITE, NAV, KNOWLEDGE_LINKS, waLink } from '../../data/site';
import { PARENT_SERVICES } from '../../data/services';
import { COUNTRIES } from '../../data/countries';
import { NOTIFICATIONS, authorityOf } from '../../data/notifications';
import { NEWS } from '../../data/news';
import Logo from '../ui/Logo';
import { Flag } from '../ui';
import SearchDialog from './SearchDialog';

// ─── Demo strip (only in demo mode) ───────────────────────────
function DemoBar() {
  const [hidden, setHidden] = useState(false);
  const [highlights, setHighlights] = useState(true);

  useEffect(() => {
    document.body.classList.toggle('ph-hidden', !highlights);
  }, [highlights]);

  if (!SITE.demoMode || hidden) return null;
  return (
    <div className="no-print border-b border-sun-deep/40 bg-sun-light text-ink-900">
      <div className="container-site flex items-center gap-3 py-2 text-xs">
        <i className="ri-edit-circle-line text-base" aria-hidden="true" />
        <p className="flex-1 font-medium">
          Demo preview — <span className="ph">highlighted</span> fields are placeholders awaiting your details. News and notifications are sample entries.
        </p>
        <button onClick={() => setHighlights((v) => !v)} className="hidden whitespace-nowrap font-semibold underline underline-offset-2 sm:inline">
          {highlights ? 'Hide highlights' : 'Show highlights'}
        </button>
        <button onClick={() => setHidden(true)} aria-label="Dismiss demo notice" className="grid h-6 w-6 place-items-center rounded-full hover:bg-sun">
          <i className="ri-close-line" />
        </button>
      </div>
    </div>
  );
}

// ─── Updates ticker ───────────────────────────────────────────
function TopBar() {
  const items = [
    ...NOTIFICATIONS.slice(0, 5).map((n) => ({ label: authorityOf(n.authority)?.name, text: n.title, href: '/notifications' })),
    ...NEWS.slice(0, 4).map((n) => ({ label: n.category, text: n.title, href: `/news/${n.slug}` })),
  ];
  const loop = [...items, ...items];

  return (
    <div className="no-print on-dark bg-ink-800 text-white">
      <div className="container-site flex h-10 items-center gap-4 text-[0.8125rem]">
        <Link to="/notifications" className="flex shrink-0 items-center gap-2 font-semibold text-sun hover:underline">
          Latest updates
        </Link>
        <div className="mask-fade-x relative flex-1 overflow-hidden">
          <div className="flex w-max animate-ticker gap-10 hover:[animation-play-state:paused]">
            {loop.map((it, i) => (
              <Link key={i} to={it.href} className="flex shrink-0 items-center gap-2 whitespace-nowrap text-white/85 hover:text-white hover:underline" tabIndex={i >= items.length ? -1 : 0}>
                <span className="font-semibold text-white">{it.label}</span>
                <span>{it.text}</span>
              </Link>
            ))}
          </div>
        </div>
        <div className="hidden shrink-0 items-center gap-5 text-white/85 lg:flex">
          <a href={`tel:${SITE.phone.tel}`} className="flex items-center gap-1.5 hover:text-white hover:underline">
            <i className="ri-phone-line" /> {SITE.phone.display}
          </a>
          <a href={`mailto:${SITE.email}`} className="flex items-center gap-1.5 hover:text-white hover:underline">
            <i className="ri-mail-line" /> {SITE.email}
          </a>
        </div>
      </div>
    </div>
  );
}

// ─── Mega-menu panels ─────────────────────────────────────────
function ServicesPanel() {
  return (
    <div className="grid grid-cols-[1fr_320px] gap-10">
      <div>
        <p className="text-sm font-semibold text-ink-900">Practice areas</p>
        <div className="mt-4 grid grid-cols-3 gap-x-6 gap-y-1">
          {PARENT_SERVICES.filter((p) => !p.isGlobal).map((p) => (
            <Link
              key={p.id}
              to={`/services?category=${encodeURIComponent(p.category)}`}
              className="group flex items-start gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-paper"
            >
              <i className={`${p.icon} mt-0.5 text-lg text-ink-900`} aria-hidden="true" />
              <span>
                <span className="block text-[0.9375rem] font-medium text-ink-900 group-hover:underline">{p.title}</span>
                <span className="mt-0.5 block text-xs text-muted">{p.subcategories.length} services · from {p.startingPrice}</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
      <div className="flex flex-col rounded-card bg-cream p-6">
        <p className="text-sm font-semibold text-ink-900">Company registration</p>
        <p className="mt-2 font-serif text-[1.6rem] leading-[1.1] tracking-[-0.02em] text-ink-900">India and six international jurisdictions.</p>
        <div className="mt-4 grid grid-cols-2 gap-1">
          {COUNTRIES.map((c) => (
            <Link key={c.slug} to={`/company-registration/${c.slug}`} className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-[0.8125rem] font-medium text-ink-900 hover:bg-white">
              <Flag code={c.flag} className="h-3.5 w-5" />
              {c.shortName || c.name}
            </Link>
          ))}
        </div>
        <Link to="/services" className="text-link mt-auto self-start pt-4 text-sm">View all services</Link>
      </div>
    </div>
  );
}

function GlobalPanel() {
  return (
    <div className="grid grid-cols-[1fr_300px] gap-10">
      <div className="grid grid-cols-2 gap-1">
        {COUNTRIES.map((c) => (
          <Link key={c.slug} to={`/company-registration/${c.slug}`} className="group flex items-center gap-4 rounded-lg p-3 transition-colors hover:bg-paper">
            <Flag code={c.flag} name={c.name} className="h-8 w-12" />
            <span>
              <span className="block text-[0.9375rem] font-medium text-ink-900 group-hover:underline">{c.headline}</span>
              <span className="block text-xs text-muted">{c.facts[0].value}</span>
            </span>
          </Link>
        ))}
      </div>
      <div className="rounded-card bg-texture p-6">
        <p className="text-sm font-semibold text-ink-900">Not sure where?</p>
        <p className="mt-2 font-serif text-[1.6rem] leading-[1.1] tracking-[-0.02em] text-ink-900">Compare all seven jurisdictions side by side.</p>
        <Link to="/company-registration" className="btn-dark mt-6">Compare jurisdictions</Link>
      </div>
    </div>
  );
}

function KnowledgePanel() {
  return (
    <div className="grid grid-cols-4 gap-4">
      {KNOWLEDGE_LINKS.map((k) => (
        <Link key={k.href} to={k.href} className="group rounded-card p-4 transition-colors hover:bg-paper">
          <span className="grid h-10 w-10 place-items-center rounded-full bg-cream text-lg text-ink-900">
            <i className={k.icon} />
          </span>
          <p className="mt-4 font-serif text-xl tracking-[-0.01em] text-ink-900 group-hover:underline">{k.name}</p>
          <p className="mt-1 text-[0.8125rem] leading-relaxed text-muted">{k.desc}</p>
        </Link>
      ))}
    </div>
  );
}

const PANELS = { services: ServicesPanel, global: GlobalPanel, knowledge: KnowledgePanel };

// ─── Mobile drawer ────────────────────────────────────────────
function MobileDrawer({ open, onClose, onSearch }) {
  const [section, setSection] = useState(null);
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
  }, [open]);

  const groups = {
    services: PARENT_SERVICES.map((p) => ({ name: p.title, href: `/services?category=${encodeURIComponent(p.category)}` })),
    global: [{ name: 'Compare jurisdictions', href: '/company-registration' }, ...COUNTRIES.map((c) => ({ name: c.headline, href: `/company-registration/${c.slug}`, flag: c.flag }))],
    knowledge: KNOWLEDGE_LINKS,
  };

  return (
    <div className={`fixed inset-0 z-[110] overflow-hidden lg:hidden ${open ? '' : 'pointer-events-none invisible'}`} aria-hidden={!open}>
      <div className={`absolute inset-0 bg-ink-950/50 transition-opacity ${open ? 'opacity-100' : 'opacity-0'}`} onClick={onClose} />
      <aside
        className={`absolute right-0 top-0 flex h-full w-[88%] max-w-sm flex-col bg-white shadow-lift transition-transform duration-300 ${open ? 'translate-x-0' : 'translate-x-full'}`}
        role="dialog"
        aria-label="Menu"
      >
        <div className="flex items-center justify-between border-b border-line p-4">
          <Logo compact />
          <div className="flex items-center gap-2">
            <button onClick={onSearch} className="grid h-10 w-10 place-items-center rounded-full border border-ink-900" aria-label="Search">
              <i className="ri-search-line" />
            </button>
            <button onClick={onClose} className="grid h-10 w-10 place-items-center rounded-full border border-ink-900" aria-label="Close menu">
              <i className="ri-close-line text-lg" />
            </button>
          </div>
        </div>
        <nav className="flex-1 overflow-y-auto px-5 py-2">
          {NAV.map((item) =>
            item.menu ? (
              <div key={item.name} className="border-b border-line">
                <button className="flex w-full items-center justify-between py-4 text-left font-serif text-2xl tracking-[-0.02em] text-ink-900" onClick={() => setSection(section === item.menu ? null : item.menu)} aria-expanded={section === item.menu}>
                  {item.name}
                  <i className={`ri-arrow-down-s-line text-xl transition-transform ${section === item.menu ? 'rotate-180' : ''}`} />
                </button>
                {section === item.menu && (
                  <ul className="pb-4">
                    {groups[item.menu].map((g) => (
                      <li key={g.href}>
                        <Link to={g.href} onClick={onClose} className="flex items-center gap-3 rounded-lg px-2 py-2.5 text-[0.9375rem] text-ink-900 hover:bg-paper">
                          {g.flag && <Flag code={g.flag} className="h-3.5 w-5" />}
                          {g.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ) : (
              <Link key={item.name} to={item.href} onClick={onClose} className="block border-b border-line py-4 font-serif text-2xl tracking-[-0.02em] text-ink-900">
                {item.name}
              </Link>
            )
          )}
        </nav>
        <div className="space-y-3 border-t border-line p-5">
          <Link to="/contact" onClick={onClose} className="btn-primary w-full">Book a consultation</Link>
          <div className="grid grid-cols-2 gap-3">
            <a href={`tel:${SITE.phone.tel}`} className="btn-outline"><i className="ri-phone-line" /> Call</a>
            <a href={waLink()} target="_blank" rel="noopener noreferrer" className="btn-whatsapp"><i className="ri-whatsapp-line" /> WhatsApp</a>
          </div>
        </div>
      </aside>
    </div>
  );
}

// ─── Header ───────────────────────────────────────────────────
export default function Header() {
  const [menu, setMenu] = useState(null);
  const [drawer, setDrawer] = useState(false);
  const [search, setSearch] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMenu(null);
    setDrawer(false);
  }, [location.pathname, location.search]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearch(true);
      }
      if (e.key === 'Escape') setMenu(null);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('keydown', onKey);
    };
  }, []);

  const Panel = menu ? PANELS[menu] : null;
  const isSection = (item) =>
    item.href === '/' ? location.pathname === '/' : location.pathname.startsWith(item.href) ||
      (item.menu === 'knowledge' && KNOWLEDGE_LINKS.some((k) => !NAV.some((n) => n.href === k.href) && location.pathname.startsWith(k.href)));

  return (
    <>
      <DemoBar />
      <TopBar />
      <header
        className={`sticky top-0 z-[100] border-b bg-white transition-shadow duration-300 ${scrolled || menu ? 'border-line shadow-soft' : 'border-line'}`}
        onMouseLeave={() => setMenu(null)}
      >
        <div className="container-site flex h-[68px] items-center justify-between gap-4">
          <Link to="/" aria-label={`${SITE.name} — home`} className="shrink-0">
            <Logo />
          </Link>

          <nav className="hidden items-center lg:flex" aria-label="Main">
            <ul className="flex items-center gap-0.5">
              {NAV.map((item) => (
                <li key={item.name} onMouseEnter={() => setMenu(item.menu || null)}>
                  {item.menu ? (
                    <button
                      className={`flex items-center gap-1 whitespace-nowrap rounded-full px-2.5 py-2 text-[0.9375rem] xl:px-3.5 font-medium text-ink-900 transition-colors hover:bg-paper ${
                        menu === item.menu || isSection(item) ? 'bg-paper' : ''
                      }`}
                      onClick={() => setMenu(menu === item.menu ? null : item.menu)}
                      aria-expanded={menu === item.menu}
                    >
                      {item.name}
                      <i className={`ri-arrow-down-s-line transition-transform ${menu === item.menu ? 'rotate-180' : ''}`} />
                    </button>
                  ) : (
                    <NavLink
                      to={item.href}
                      end={item.href === '/'}
                      className={({ isActive }) =>
                        `block whitespace-nowrap rounded-full px-2.5 py-2 text-[0.9375rem] xl:px-3.5 font-medium text-ink-900 transition-colors hover:bg-paper ${isActive ? 'bg-paper' : ''}`
                      }
                    >
                      {item.name}
                    </NavLink>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setSearch(true)}
              className="grid h-10 w-10 place-items-center rounded-full text-lg text-ink-900 transition-colors hover:bg-paper"
              aria-label="Search the site (Ctrl+K)"
              title="Search (Ctrl+K)"
            >
              <i className="ri-search-line" />
            </button>
            <Link to="/contact" className="btn-dark btn-sm hidden sm:inline-flex lg:hidden xl:inline-flex">
              Book a consultation
            </Link>
            <button onClick={() => setDrawer(true)} className="grid h-10 w-10 place-items-center rounded-full border border-ink-900 text-ink-900 lg:hidden" aria-label="Open menu">
              <i className="ri-menu-line text-lg" />
            </button>
          </div>
        </div>

        {/* Mega menu */}
        <div className={`absolute inset-x-0 top-full hidden lg:block ${Panel ? '' : 'pointer-events-none'}`}>
          <div className={`border-b border-line bg-white shadow-lift transition-all duration-200 ${Panel ? 'translate-y-0 opacity-100' : '-translate-y-2 opacity-0'}`}>
            <div className="container-site py-8">{Panel && <Panel />}</div>
          </div>
        </div>
      </header>

      <MobileDrawer open={drawer} onClose={() => setDrawer(false)} onSearch={() => { setDrawer(false); setSearch(true); }} />
      <SearchDialog open={search} onClose={() => setSearch(false)} />
    </>
  );
}
