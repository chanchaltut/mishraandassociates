import React from 'react';
import Seo, { faqLd } from '../lib/seo';
import { FAQS } from '../data/content';
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

export default function Home() {
  return (
    <>
      <Seo
        title="GST, Income Tax, Compliance & Global Company Registration"
        description="Mishra and Associates, Delhi — GST, ITR, TDS, audit, ROC and accounting services in India, plus company registration in India, USA, UAE, Singapore, Hong Kong, China and the UK. Call +91 11 6926 6597."
        path="/"
        jsonLd={faqLd(FAQS)}
      />
      <Hero />
      <JurisdictionStrip />
      <PracticeAreas />
      <GlobalSetup />
      <KnowledgeDesk />
      <DueDates />
      <AboutFirm />
      <Process />
      <Testimonials />
      <FAQBlock />
      <CTABand />
    </>
  );
}
