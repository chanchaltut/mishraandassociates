import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api, formatDateTime } from '../api';
import { useAdmin } from '../AdminApp';
import { PageTitle, Notice, Loading, Card } from '../ui';
import { openPreview } from './ContentEditor';

const TYPE_ICONS = {
  enquiries: 'ri-chat-3-line',
  subscribers: 'ri-mail-line',
  'tender-subscriptions': 'ri-auction-line',
  'trademark-searches': 'ri-search-eye-line',
};
const TYPE_LABELS = {
  enquiries: 'Enquiries',
  subscribers: 'Newsletter subscribers',
  'tender-subscriptions': 'Tender subscriptions',
  'trademark-searches': 'Trademark requests',
};

const QUICK = [
  ['home', 'Edit the home page hero', 'ri-home-4-line'],
  ['services', 'Change service prices', 'ri-price-tag-3-line'],
  ['notifications', 'Add a notification', 'ri-notification-3-line'],
  ['news', 'Post news', 'ri-newspaper-line'],
  ['tenders', 'Add tenders', 'ri-auction-line'],
  ['settings', 'Announcement bar & contact details', 'ri-megaphone-line'],
];

export default function Dashboard() {
  const { user } = useAdmin();
  const [data, setData] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    api('/admin/dashboard').then(setData).catch((err) => setError(err.message));
  }, []);

  if (error) return <Notice tone="error">{error}</Notice>;
  if (!data) return <Loading />;
  const { integrations: on } = data;

  return (
    <>
      <PageTitle title={`Hello, ${user.name.split(' ')[0]}`} description="Everything on the website can be changed from here. Save your edits, then press Publish.">
        <button onClick={() => openPreview('/')} className="btn-outline btn-sm"><i className="ri-eye-line" /> Preview site</button>
      </PageTitle>

      {(!on.deploy || !on.uploads || !on.email) && (
        <Notice tone="warning" className="mb-6">
          <p className="font-semibold">Setup to finish:</p>
          <ul className="mt-1 list-disc pl-5">
            {!on.deploy && <li>Automatic website rebuild after publishing (VERCEL_DEPLOY_HOOK_URL).</li>}
            {!on.uploads && <li>Image and PDF uploads (CLOUDINARY_URL). Until then, paste image links.</li>}
            {!on.email && <li>Email alerts for new enquiries (RESEND_API_KEY). Enquiries are still saved in the Inbox.</li>}
          </ul>
        </Notice>
      )}

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {Object.entries(data.submissions).map(([type, c]) => (
          <Link key={type} to={`/admin/inbox?type=${type}`} className="rounded-panel border border-line bg-white p-5 transition-colors hover:border-ink-900">
            <i className={`${TYPE_ICONS[type]} text-xl text-brand-600`} />
            <p className="mt-3 font-serif text-[2.25rem] leading-none text-ink-900">{c.total}</p>
            <p className="mt-1 text-sm text-ink-800">{TYPE_LABELS[type]}</p>
            {c.new > 0 && <p className="mt-2 inline-block rounded-full bg-sun px-2 py-0.5 text-2xs font-semibold text-ink-900">{c.new} new</p>}
          </Link>
        ))}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.3fr_1fr]">
        <Card>
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-ink-900">Latest enquiries</h2>
            <Link to="/admin/inbox" className="text-link text-sm">Open inbox</Link>
          </div>
          {data.recent.length === 0 ? (
            <p className="mt-4 text-sm text-muted">No enquiries yet. They appear here as soon as someone submits a form on the website.</p>
          ) : (
            <ul className="mt-3 divide-y divide-line">
              {data.recent.map((s) => (
                <li key={s._id} className="flex items-start gap-3 py-3">
                  <i className={`${TYPE_ICONS[s.type]} mt-0.5 text-brand-600`} />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-ink-900">{s.data.name || s.data.email || s.data.phone}</p>
                    <p className="truncate text-xs text-ink-800">{s.data.service || s.data.message || s.data.mark || TYPE_LABELS[s.type]}</p>
                  </div>
                  <div className="shrink-0 text-right">
                    <p className="text-xs text-muted">{formatDateTime(s.createdAt)}</p>
                    {s.status === 'new' && <span className="tag bg-sun text-ink-900">New</span>}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </Card>

        <div className="space-y-6">
          <Card>
            <h2 className="font-semibold text-ink-900">Website status</h2>
            {data.unpublished.length > 0 ? (
              <p className="mt-2 text-sm text-ink-800">
                Saved but not published: {data.unpublished.map((u) => u.title).join(', ')}. Press <strong>Publish</strong> at the top to put them live.
              </p>
            ) : (
              <p className="mt-2 text-sm text-ink-800">Everything saved is live.</p>
            )}
            <p className="mt-3 text-xs text-muted">
              Last published: {data.lastPublish ? `${formatDateTime(data.lastPublish.createdAt)} by ${data.lastPublish.publishedBy || '—'}` : 'never (the website shows its original content)'}
            </p>
          </Card>
          <Card>
            <h2 className="font-semibold text-ink-900">Quick edits</h2>
            <ul className="mt-3 space-y-1">
              {QUICK.map(([key, label, icon]) => (
                <li key={key}>
                  <Link to={`/admin/content/${key}`} className="flex items-center gap-3 rounded-lg px-2 py-2 text-sm text-ink-900 hover:bg-paper">
                    <i className={`${icon} text-brand-600`} /> {label}
                  </Link>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>
    </>
  );
}
