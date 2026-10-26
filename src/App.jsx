import React, { lazy, Suspense, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import FloatingActions from './components/layout/FloatingActions';
import Home from './pages/Home';

const Services = lazy(() => import('./pages/Services'));
const ServiceDetail = lazy(() => import('./pages/ServiceDetail'));
const GlobalIncorporation = lazy(() => import('./pages/GlobalIncorporation'));
const CountryPage = lazy(() => import('./pages/CountryPage'));
const Blog = lazy(() => import('./pages/Blog'));
const Article = lazy(() => import('./pages/Article'));
const News = lazy(() => import('./pages/News'));
const Notifications = lazy(() => import('./pages/Notifications'));
const ComplianceCalendar = lazy(() => import('./pages/ComplianceCalendar'));
const AboutUs = lazy(() => import('./pages/AboutUs'));
const Contact = lazy(() => import('./pages/Contact'));
const PrivacyPolicy = lazy(() => import('./pages/Legal').then((m) => ({ default: m.PrivacyPolicy })));
const TermsConditions = lazy(() => import('./pages/Legal').then((m) => ({ default: m.TermsConditions })));
const NotFound = lazy(() => import('./pages/NotFound'));

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

const PageLoader = () => (
  <div className="grid min-h-[60vh] place-items-center bg-paper">
    <div className="h-10 w-10 animate-spin rounded-full border-2 border-brand-600 border-t-transparent" />
  </div>
);

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Header />
      <main id="main">
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/services" element={<Services />} />
            <Route path="/services/:slug" element={<ServiceDetail />} />

            <Route path="/company-registration" element={<GlobalIncorporation />} />
            <Route path="/company-registration/:country" element={<CountryPage />} />

            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<Article kind="blog" />} />
            <Route path="/insights" element={<Navigate to="/blog" replace />} />
            <Route path="/news" element={<News />} />
            <Route path="/news/:slug" element={<Article kind="news" />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/compliance-calendar" element={<ComplianceCalendar />} />

            <Route path="/about" element={<AboutUs />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-conditions" element={<TermsConditions />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
      <FloatingActions />
    </>
  );
}
