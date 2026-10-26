import React, { useId, useState } from 'react';
import { submitForm } from '../lib/api';

export default function NewsletterForm({ dark = false, stacked = false }) {
  const id = useId();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    const res = await submitForm('subscribers', { email, source: 'newsletter' });
    setStatus(res.ok ? 'done' : 'error');
    if (res.ok) setEmail('');
  };

  if (status === 'done') {
    return (
      <p className={`flex items-center gap-2 text-sm font-semibold ${dark ? 'text-brass-300' : 'text-brand-700'}`}>
        <i className="ri-checkbox-circle-line text-lg" /> You’re subscribed. Look out for the next brief.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="w-full">
      <div className={`flex flex-col gap-2 rounded-sm p-1.5 ${stacked ? '' : 'sm:flex-row'} ${dark ? 'border border-white/15 bg-white/5' : 'border border-line bg-white'}`}>
        <label htmlFor={id} className="sr-only">Email address</label>
        <input
          id={id}
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your work email"
          className={`h-12 flex-1 rounded-sm bg-transparent px-4 text-sm outline-none ${dark ? 'text-white placeholder:text-white/40' : 'text-ink-900 placeholder:text-muted/70'}`}
        />
        <button type="submit" disabled={status === 'sending'} className={dark ? 'btn-brass' : 'btn-primary'}>
          {status === 'sending' ? 'Subscribing…' : 'Subscribe'}
        </button>
      </div>
      {status === 'error' && <p className="mt-2 text-xs text-red-400">Couldn’t subscribe right now — please try again.</p>}
      <p className={`mt-2 text-xs ${dark ? 'text-white/45' : 'text-muted'}`}>No spam. Unsubscribe any time.</p>
    </form>
  );
}
