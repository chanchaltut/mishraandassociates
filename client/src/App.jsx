import React, { lazy, Suspense, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import FloatingActions from './components/layout/FloatingActions';
import IncorporationPopup from './components/layout/IncorporationPopup';
import PreviewBar from './components/layout/PreviewBar';
import SafeSection from './components/SafeSection';
import Home from './pages/Home';
import { SITE } from './data/site';

const Services = lazy(() => import('./pages/Services'));
const ServiceDetail = lazy(() => import('./pages/ServiceDetail'));
const GlobalIncorporation = lazy(() => import('./pages/GlobalIncorporation'));
const CountryPage = lazy(() => import('./pages/CountryPage'));
const Blog = lazy(() => import('./pages/Blog'));
const Article = lazy(() => import('./pages/Article'));
const News = lazy(() => import('./pages/News'));
const Notifications = lazy(() => import('./pages/Notifications'));
const ComplianceCalendar = lazy(() => import('./pages/ComplianceCalendar'));
const FAQ = lazy(() => import('./pages/FAQ'));
const AboutUs = lazy(() => import('./pages/AboutUs'));
const Contact = lazy(() => import('./pages/Contact'));
const Tenders = lazy(() => import('./pages/Tenders'));
const TrademarkSearch = lazy(() => import('./pages/TrademarkSearch'));
const Clients = lazy(() => import('./pages/Clients'));
const PrivacyPolicy = lazy(() => import('./pages/Legal').then((m) => ({ default: m.PrivacyPolicy })));
const TermsConditions = lazy(() => import('./pages/Legal').then((m) => ({ default: m.TermsConditions })));
const NotFound = lazy(() => import('./pages/NotFound'));
const AdminApp = lazy(() => import('./admin/AdminApp'));

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

const PageLoader = () => (
  <div className="grid min-h-[60vh] place-items-center bg-white">
    <div className="h-10 w-10 animate-spin rounded-full border-2 border-ink-900 border-t-sun" />
  </div>
);

// Shown instead of a blank screen if a page fails to render
function PageError() {
  return (
    <div className="container-site grid min-h-[50vh] place-items-center py-20 text-center">
      <div>
        <p className="font-serif text-[2rem] leading-tight text-ink-900">This page couldn’t be displayed.</p>
        <p className="mt-3 text-ink-800">
          Please refresh, or reach us on <a href={`tel:${SITE.phone.tel}`} className="text-link">{SITE.phone.display}</a> or{' '}
          <a href={`mailto:${SITE.email}`} className="text-link">{SITE.email}</a>.
        </p>
      </div>
    </div>
  );
}

export default function App() {
  const { pathname } = useLocation();

  // The admin panel is a separate lazy chunk; visitors never download it
  if (pathname === '/admin' || pathname.startsWith('/admin/')) {
    return (
      <Suspense fallback={<PageLoader />}>
        <AdminApp />
      </Suspense>
    );
  }

  return (
    <>
      <ScrollToTop />
      <PreviewBar />
      <SafeSection><Header /></SafeSection>
      <main id="main">
        <SafeSection resetKey={pathname} fallback={<PageError />}>
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
              <Route path="/tenders" element={<Tenders />} />
              <Route path="/trademark-search" element={<TrademarkSearch />} />
              <Route path="/faqs" element={<FAQ />} />
              <Route path="/faq" element={<Navigate to="/faqs" replace />} />

              <Route path="/about" element={<AboutUs />} />
              <Route path="/clients" element={<Clients />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms-conditions" element={<TermsConditions />} />

              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </SafeSection>
      </main>
      <SafeSection><Footer /></SafeSection>
      {SITE.features?.floatingButtons !== false && <FloatingActions />}
      {SITE.features?.incorporationPopup !== false && <SafeSection><IncorporationPopup /></SafeSection>}
    </>
  );
}
