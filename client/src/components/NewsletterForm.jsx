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
      <p className={`flex items-center gap-2 text-[0.9375rem] font-semibold ${dark ? 'text-sun' : 'text-ink-900'}`}>
        <i className="ri-checkbox-circle-line text-lg" /> You’re subscribed. Look out for the next brief.
      </p>
    );
  }

  // Inline: one pill containing input + button. Stacked: separate pill input and full-width button.
  const shell = stacked
    ? 'flex flex-col gap-2'
    : `flex flex-col gap-2 sm:flex-row sm:rounded-full sm:border sm:p-1.5 ${dark ? 'sm:border-white/30 sm:bg-white/5' : 'sm:border-ink-900 sm:bg-white'}`;
  const field = `h-12 min-w-0 flex-1 rounded-full border px-5 text-[0.9375rem] outline-none ${
    dark ? 'border-white/30 bg-white/5 text-white placeholder:text-white/50' : 'border-ink-900 bg-white text-ink-900 placeholder:text-muted'
  } ${stacked ? '' : 'sm:h-11 sm:border-0 sm:bg-transparent sm:px-4'}`;

  return (
    <form onSubmit={onSubmit} className="w-full">
      <div className={shell}>
        <label htmlFor={id} className="sr-only">Email address</label>
        <input
          id={id}
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your work email"
          className={field}
        />
        <button type="submit" disabled={status === 'sending'} className={dark ? 'btn-primary' : 'btn-dark'}>
          {status === 'sending' ? 'Subscribing…' : 'Subscribe'}
        </button>
      </div>
      {status === 'error' && <p className={`mt-2 text-xs ${dark ? 'text-rose' : 'text-red-700'}`}>Couldn’t subscribe right now — please try again.</p>}
      <p className={`mt-3 text-xs ${dark ? 'text-white/60' : 'text-ink-800'}`}>No spam. Unsubscribe any time.</p>
    </form>
  );
}
