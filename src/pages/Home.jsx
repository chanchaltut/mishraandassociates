import React from 'react';
import Seo, { faqLd } from '../lib/seo';
import { SITE } from '../data/site';
import { FAQS, HOME_SECTIONS } from '../data/content';
import SafeSection from '../components/SafeSection';
import Hero from '../components/home/Hero';
import {
  JurisdictionStrip,
  PracticeAreas,
  GlobalSetup,
  KnowledgeDesk,
  DueDates,
  AboutFirm,
  Process,
  Testimonials,
} from '../components/home/Sections';
import { FAQBlock, CTABand } from '../components/Blocks';

// Order of the home page; each can be switched off in admin → "Home page"
const SECTIONS = [
  ['jurisdictionStrip', JurisdictionStrip],
  ['practiceAreas', PracticeAreas],
  ['globalSetup', GlobalSetup],
  ['knowledgeDesk', KnowledgeDesk],
  ['dueDates', DueDates],
  ['aboutFirm', AboutFirm],
  ['process', Process],
  ['testimonials', Testimonials],
  ['faq', FAQBlock],
  ['cta', CTABand],
];

export default function Home() {
  return (
    <>
      <Seo
        title="GST, Income Tax, Compliance & Global Company Registration"
        description={`${SITE.name}, Delhi — GST, ITR, TDS, audit, ROC and accounting services in India, plus company registration in India, USA, UAE, Singapore, Hong Kong, China and the UK. Call ${SITE.phone.display}.`}
        path="/"
        jsonLd={faqLd(FAQS)}
      />
      <SafeSection>
        <Hero />
      </SafeSection>
      {SECTIONS.map((entry) => {
        const [key, Section] = entry;
        if (HOME_SECTIONS[key] === false) return null;
        return (
          <SafeSection key={key}>
            <Section />
          </SafeSection>
        );
      })}
    </>
  );
}
