import React, { useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Seo, { breadcrumbLd, absUrl } from '../lib/seo';
import { BLOG_POSTS, BLOG_CATEGORIES } from '../data/blog';
import { formatDate } from '../lib/format';
import { PageHero } from '../components/ui';
import { CTABand } from '../components/Blocks';

export default function Blog() {
  const [params, setParams] = useSearchParams();
  const category = params.get('category') || 'All';
  const [query, setQuery] = useState('');

  const posts = useMemo(() => {
    const q = query.trim().toLowerCase();
    return BLOG_POSTS.filter((p) => (category === 'All' || p.category === category) && (!q || `${p.title} ${p.excerpt}`.toLowerCase().includes(q)));
  }, [category, query]);

  const [featured, ...rest] = posts;
  const crumbs = [{ name: 'Home', path: '/' }, { name: 'Blog', path: '/blog' }];

  const setCategory = (c) => setParams(c === 'All' ? {} : { category: c }, { replace: true });

  return (
    <>
      <Seo
        title="Blog — Tax, GST, Compliance & Global Setup Guides"
        description="Plain-English guides on income tax, GST, TDS, company law and overseas incorporation from the team at Mishra and Associates."
        path="/blog"
        jsonLd={[
          breadcrumbLd(crumbs),
          {
            '@context': 'https://schema.org',
            '@type': 'Blog',
            name: 'Mishra and Associates — Blog',
            url: absUrl('/blog'),
            blogPost: BLOG_POSTS.map((p) => ({ '@type': 'BlogPosting', headline: p.title, url: absUrl(`/blog/${p.slug}`), datePublished: p.date })),
          },
        ]}
      />
      <PageHero crumbs={crumbs} eyebrow="Blog & guides" title="Clear answers to" accent="taxing questions." intro="Practical explainers written by our team — what the law says, what it means for you, and what to do next." />

      <section className="bg-paper py-12 sm:py-16">
        <div className="container-site">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="scrollbar-none -mx-4 flex gap-2 overflow-x-auto px-4 lg:mx-0 lg:px-0">
              {BLOG_CATEGORIES.map((c) => (
                <button key={c} onClick={() => setCategory(c)} className={`chip shrink-0 !py-2 ${c === category ? 'chip-active' : ''}`}>{c}</button>
              ))}
            </div>
            <div className="relative lg:w-72">
              <i className="ri-search-line absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
              <input type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search articles" className="input !rounded-full !pl-10" aria-label="Search articles" />
            </div>
          </div>

          {posts.length === 0 && <p className="mt-16 text-center text-muted">No articles found.</p>}

          {featured && (
            <Link to={`/blog/${featured.slug}`} className="group mt-10 grid overflow-hidden rounded-[28px] border border-line bg-white lg:grid-cols-2">
              <div className="aspect-[16/10] overflow-hidden bg-paper-2 lg:aspect-auto">
                <img src={featured.image} alt="" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className="flex flex-col justify-center p-7 sm:p-10">
                <p className="text-2xs font-bold uppercase tracking-wider text-brass-600">Featured · {featured.category}</p>
                <h2 className="mt-3 font-serif text-3xl leading-tight text-ink-900 group-hover:text-brand-700 sm:text-4xl">{featured.title}</h2>
                <p className="mt-4 leading-relaxed text-muted">{featured.excerpt}</p>
                <p className="mt-6 text-xs font-semibold text-muted">{formatDate(featured.date)} · {featured.readTime}</p>
              </div>
            </Link>
          )}

          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((p) => (
              <Link key={p.slug} to={`/blog/${p.slug}`} className="group flex flex-col overflow-hidden rounded-3xl border border-line bg-white transition-all hover:-translate-y-1 hover:shadow-lift">
                <div className="aspect-[16/10] overflow-hidden bg-paper-2">
                  <img src={p.image} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <p className="text-2xs font-bold uppercase tracking-wider text-brass-600">{p.category}</p>
                  <h3 className="mt-2 font-serif text-xl leading-snug group-hover:text-brand-700">{p.title}</h3>
                  <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted">{p.excerpt}</p>
                  <p className="mt-auto pt-5 text-xs font-semibold text-muted">{formatDate(p.date)} · {p.readTime}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <CTABand />
    </>
  );
}
