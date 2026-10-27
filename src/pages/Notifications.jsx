import React, { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Seo, { breadcrumbLd } from '../lib/seo';
import { NOTIFICATIONS, AUTHORITIES, authorityOf } from '../data/notifications';
import { formatDate } from '../lib/format';
import { PageHero, SampleBadge } from '../components/ui';
import Ph from '../components/ui/Ph';
import { CTABand } from '../components/Blocks';

export default function Notifications() {
  const [params, setParams] = useSearchParams();
  const authority = params.get('authority') || 'all';
  const [query, setQuery] = useState('');

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    return NOTIFICATIONS.filter(
      (n) => (authority === 'all' || n.authority === authority) && (!q || `${n.title} ${n.number}`.toLowerCase().includes(q))
    );
  }, [authority, query]);

  const crumbs = [{ name: 'Home', path: '/' }, { name: 'Notifications', path: '/notifications' }];
  const setAuthority = (id) => setParams(id === 'all' ? {} : { authority: id }, { replace: true });

  return (
    <>
      <Seo
        title="Notifications & Circulars — CBDT, CBIC, MCA, RBI, SEBI, DGFT"
        description="Latest notifications and circulars from CBDT, CBIC (GST & Customs), MCA, RBI, SEBI and DGFT, compiled by Mishra and Associates."
        path="/notifications"
        jsonLd={breadcrumbLd(crumbs)}
      />
      <PageHero
        crumbs={crumbs}
        eyebrow="Knowledge hub"
        title="Notifications &"
        accent="circulars."
        intro="Official releases from India’s tax and regulatory authorities, organised by issuing body. Open the source document or ask us what it means for you."
      />

      <section className="bg-white py-14 sm:py-20">
        <div className="container-site">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="scrollbar-none -mx-4 flex gap-2 overflow-x-auto px-4 lg:mx-0 lg:flex-wrap lg:px-0">
              <button onClick={() => setAuthority('all')} className={`chip shrink-0 !py-2 ${authority === 'all' ? 'chip-active' : ''}`}>All authorities</button>
              {AUTHORITIES.map((a) => (
                <button key={a.id} onClick={() => setAuthority(a.id)} className={`chip shrink-0 !py-2 ${authority === a.id ? 'chip-active' : ''}`} title={a.full}>
                  {a.name}
                </button>
              ))}
            </div>
            <div className="relative lg:w-72">
              <i className="ri-search-line absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
              <input type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search subject or number" className="input !rounded-full !pl-10" aria-label="Search notifications" />
            </div>
          </div>

          {/* Desktop table */}
          <div className="mt-8 hidden overflow-hidden rounded-panel border border-ink-900 bg-white md:block">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-ink-900 bg-cream">
                <tr className="text-[0.8125rem] font-semibold text-ink-900">
                  <th className="px-5 py-4">Date</th>
                  <th className="px-5 py-4">Authority</th>
                  <th className="px-5 py-4">Number</th>
                  <th className="px-5 py-4">Subject</th>
                  <th className="px-5 py-4 text-right">Document</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {rows.map((n) => (
                  <tr key={n.id} className="align-top transition-colors hover:bg-sun-light">
                    <td className="whitespace-nowrap px-5 py-4 text-muted">{formatDate(n.date)}</td>
                    <td className="px-5 py-4">
                      <span className="tag bg-ink-900 text-white">{authorityOf(n.authority)?.name}</span>
                      <span className="mt-1 block text-xs text-muted">{n.type}</span>
                    </td>
                    <td className="px-5 py-4 text-xs font-semibold text-ink-800"><Ph>{n.number}</Ph></td>
                    <td className="px-5 py-4">
                      <span className="font-medium leading-snug text-ink-900">{n.title}</span> <SampleBadge item={n} />
                    </td>
                    <td className="px-5 py-4 text-right">
                      {n.pdfUrl && (
                        <a href={n.pdfUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 rounded-full border border-ink-900 px-3.5 py-1.5 text-xs font-medium text-ink-900 transition-colors hover:bg-sun">
                          <i className="ri-file-pdf-2-line" /> PDF
                        </a>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {rows.length === 0 && <p className="p-10 text-center text-muted">No notifications match your filters.</p>}
          </div>

          {/* Mobile cards */}
          <ul className="mt-6 space-y-3 md:hidden">
            {rows.map((n) => (
              <li key={n.id} className="rounded-card border border-line bg-white p-5">
                <div className="flex items-center justify-between gap-2">
                  <span className="tag bg-ink-900 text-white">{authorityOf(n.authority)?.name}</span>
                  <span className="text-xs text-muted">{formatDate(n.date)}</span>
                </div>
                <p className="mt-3 font-medium leading-snug text-ink-900">{n.title}</p>
                <p className="mt-1 text-xs text-muted"><Ph>{n.number}</Ph> · {n.type}</p>
                <div className="mt-3 flex items-center justify-between">
                  <SampleBadge item={n} />
                  {n.pdfUrl && <a href={n.pdfUrl} target="_blank" rel="noopener noreferrer" className="text-link text-xs"><i className="ri-file-pdf-2-line" /> View PDF</a>}
                </div>
              </li>
            ))}
            {rows.length === 0 && <li className="py-10 text-center text-muted">No notifications match your filters.</li>}
          </ul>
        </div>
      </section>
      <CTABand title="Not sure how a notification" accent="affects you?" text="Send it to us — we’ll explain what changes for your business and what needs to be filed." />
    </>
  );
}
