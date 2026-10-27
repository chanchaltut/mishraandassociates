import React from 'react';
import { Link } from 'react-router-dom';
import Seo from '../lib/seo';

export default function NotFound() {
  return (
    <>
      <Seo title="Page not found" path="/404" noindex />
      <section className="relative overflow-hidden bg-texture">
        <div className="container-site relative flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
          <p className="font-serif text-[8rem] italic leading-none tracking-[-0.05em] text-ink-900 sm:text-[11rem]">404</p>
          <h1 className="h-display mt-4 text-[2.5rem] leading-[1.05] sm:text-[3.5rem]">This page has been <em className="italic">filed elsewhere.</em></h1>
          <p className="mt-4 max-w-md text-lg text-ink-900">The page you’re looking for doesn’t exist or has moved.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/" className="btn-dark">Go to homepage</Link>
            <Link to="/services" className="btn-light">Browse services</Link>
          </div>
        </div>
      </section>
    </>
  );
}
