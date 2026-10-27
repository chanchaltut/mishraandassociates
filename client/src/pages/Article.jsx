import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Seo, { breadcrumbLd, ORG_ID, absUrl } from '../lib/seo';
import { getPost, BLOG_POSTS } from '../data/blog';
import { getNews, NEWS } from '../data/news';
import { SITE, waLink } from '../data/site';
import { formatDate } from '../lib/format';
import { Breadcrumbs, RichText, SampleBadge } from '../components/ui';
import NewsletterForm from '../components/NewsletterForm';
import { CTABand } from '../components/Blocks';
import NotFound from './NotFound';

function Share({ url, title }) {
  const [copied, setCopied] = useState(false);
  const links = [
    { icon: 'ri-whatsapp-line', label: 'WhatsApp', href: `https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}` },
    { icon: 'ri-linkedin-fill', label: 'LinkedIn', href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}` },
    { icon: 'ri-twitter-x-line', label: 'X', href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}` },
  ];
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable */
    }
  };
  return (
    <div className="flex items-center gap-2">
      {links.map((l) => (
        <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer" aria-label={`Share on ${l.label}`} className="grid h-10 w-10 place-items-center rounded-full border border-ink-900 text-ink-900 transition-colors hover:bg-white">
          <i className={l.icon} />
        </a>
      ))}
      <button onClick={copy} className="grid h-10 w-10 place-items-center rounded-full border border-ink-900 text-ink-900 transition-colors hover:bg-white" aria-label="Copy link">
        <i className={copied ? 'ri-check-line' : 'ri-link'} />
      </button>
    </div>
  );
}

/** Shared article layout for blog posts (/blog/:slug) and news (/news/:slug). */
export default function Article({ kind }) {
  const { slug } = useParams();
  const isNews = kind === 'news';
  const item = isNews ? getNews(slug) : getPost(slug);
  if (!item) return <NotFound />;

  const base = isNews ? '/news' : '/blog';
  const path = `${base}/${item.slug}`;
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: isNews ? 'News' : 'Blog', path: base },
    { name: item.title.length > 48 ? `${item.title.slice(0, 48)}…` : item.title, path },
  ];
  const paragraphs = isNews ? item.body : item.content;
  const description = isNews ? item.summary : item.excerpt;
  const more = (isNews ? NEWS : BLOG_POSTS).filter((x) => x.slug !== item.slug).slice(0, 3);

  return (
    <>
      <Seo
        title={item.title}
        description={description}
        path={path}
        type="article"
        image={item.image || SITE.ogImage}
        jsonLd={[
          breadcrumbLd(crumbs),
          {
            '@context': 'https://schema.org',
            '@type': isNews ? 'NewsArticle' : 'BlogPosting',
            headline: item.title,
            description,
            image: item.image ? [item.image] : undefined,
            datePublished: item.date,
            dateModified: item.date,
            author: { '@type': 'Organization', name: item.author || SITE.name, url: SITE.url },
            publisher: { '@id': ORG_ID },
            mainEntityOfPage: absUrl(path),
          },
        ]}
      />

      <article className="bg-white">
        <header className="bg-cream">
          <div className="container-site max-w-4xl pb-14 pt-6 sm:pb-20 sm:pt-8">
            <Breadcrumbs items={crumbs} />
            <p className="mt-10 flex items-center gap-2 text-sm font-semibold text-ink-900 sm:mt-14">
              {item.category} <SampleBadge item={item} />
            </p>
            <h1 className="h-display mt-4 text-[2.5rem] leading-[1.04] sm:text-[3.75rem]">{item.title}</h1>
            <p className="mt-6 text-lg leading-relaxed text-ink-800 sm:text-xl">{description}</p>
            <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-ink-900/25 pt-6">
              <div className="flex items-center gap-3 text-sm">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-sun font-serif italic text-ink-900 shadow-edge">m&amp;a</span>
                <span>
                  <span className="block font-semibold text-ink-900">{item.author || `${SITE.name} Desk`}</span>
                  <span className="text-ink-800">{formatDate(item.date, { day: 'numeric', month: 'long', year: 'numeric' })}{item.readTime ? ` · ${item.readTime}` : ''}</span>
                </span>
              </div>
              <Share url={absUrl(path)} title={item.title} />
            </div>
          </div>
        </header>

        {item.image && (
          <div className="container-site max-w-5xl">
            <img src={item.image.replace('w=800', 'w=1400')} alt="" className="mt-10 aspect-[21/9] w-full rounded-panel object-cover sm:mt-14" />
          </div>
        )}

        <div className="container-site grid max-w-5xl gap-12 py-12 sm:py-16 lg:grid-cols-[1fr_260px]">
          <div className="max-w-2xl">
            <RichText paragraphs={paragraphs} />
            <div className="mt-12 rounded-card bg-paper p-6 text-sm leading-relaxed text-ink-800">
              This article is for general information and does not constitute professional advice. Laws and rates may have changed since publication.
              <Link to="/contact" className="text-link ml-1">Speak to us</Link> about your specific situation.
            </div>
          </div>
          <aside className="space-y-4 lg:sticky lg:top-28 lg:self-start">
            <div className="on-dark rounded-panel bg-ink-900 p-7 text-white">
              <p className="font-serif text-[1.625rem] leading-tight tracking-[-0.02em]">Need help with <em className="italic">this?</em></p>
              <p className="mt-2 text-sm text-white/75">Talk to an adviser — usually same-day response.</p>
              <a href={waLink(`Hello ${SITE.name}, I read “${item.title}” and have a question.`)} target="_blank" rel="noopener noreferrer" className="btn-primary mt-5 w-full">
                <i className="ri-whatsapp-line" /> Ask on WhatsApp
              </a>
            </div>
            <div className="rounded-panel bg-cream p-7">
              <p className="font-serif text-[1.375rem] tracking-[-0.015em] text-ink-900">Get the weekly brief</p>
              <div className="mt-3"><NewsletterForm stacked /></div>
            </div>
          </aside>
        </div>
      </article>

      <section className="bg-paper py-20 sm:py-24">
        <div className="container-site">
          <div className="flex items-end justify-between">
            <h2 className="h-display text-[2.25rem] leading-[1.05] sm:text-[2.75rem]">{isNews ? 'More news' : 'Keep reading'}</h2>
            <Link to={base} className="text-link text-sm">View all</Link>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {more.map((m) => (
              <Link key={m.slug} to={`${base}/${m.slug}`} className="group rounded-card bg-white p-7 transition-colors hover:bg-sun-light">
                <p className="label font-semibold text-ink-900">{m.category} · {formatDate(m.date)}</p>
                <p className="mt-3 font-serif text-[1.5rem] leading-[1.15] tracking-[-0.015em] text-ink-900 group-hover:underline">{m.title}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <CTABand />
    </>
  );
}
