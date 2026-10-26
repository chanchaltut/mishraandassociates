import React from 'react';
import { Link } from 'react-router-dom';
import Seo from '../lib/seo';

export default function NotFound() {
  return (
    <>
      <Seo title="Page not found" path="/404" noindex />
      <section className="relative overflow-hidden bg-paper">
        <div className="bg-grid pointer-events-none absolute inset-0 opacity-60" />
        <div className="container-site relative flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
          <p className="font-serif text-8xl italic text-brass-500">404</p>
          <h1 className="h-display mt-4 text-3xl sm:text-4xl">This page has been filed elsewhere.</h1>
          <p className="mt-3 max-w-md text-muted">The page you’re looking for doesn’t exist or has moved.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/" className="btn-primary">Go to homepage</Link>
            <Link to="/services" className="btn-outline">Browse services</Link>
          </div>
        </div>
      </section>
    </>
  );
}
