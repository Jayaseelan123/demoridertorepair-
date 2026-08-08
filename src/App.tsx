import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { LiveTrackingModal } from './components/LiveTrackingModal';
import { BookingWizardModal } from './components/BookingWizardModal';
import { MechanicDashboard } from './components/dashboards/MechanicDashboard';
import { AdminDashboard } from './components/dashboards/AdminDashboard';
import { HomePage, AboutPage, ServicesPage, PricingPage, ContactPage } from './pages/SitePages';
import { CheckCircle2 } from 'lucide-react';

type PageKey = 'home' | 'about' | 'services' | 'pricing' | 'contact';

function AppContent() {
  const { role, toastMessage, activeTrackingBookingId } = useApp();
  const [activePage, setActivePage] = useState<PageKey>('home');

  const handleNavigateSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handlePageChange = (page: PageKey) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#050505] text-slate-100 font-sans antialiased selection:bg-blue-500 selection:text-white">
      {/* Toast Notification Container */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-[#0c0c0e] border border-blue-500/40 text-white px-4 py-3 rounded-2xl shadow-2xl flex items-center space-x-3 text-xs font-semibold animate-in slide-in-from-bottom duration-300 ring-1 ring-blue-500/20 backdrop-blur-xl">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Sticky Navbar Header */}
      <Header
        onNavigateSection={handleNavigateSection}
        onNavigatePage={handlePageChange}
        onOpenAuthModal={() => {
          const el = document.getElementById('dashboard');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Dynamic Role View Switching: Customer Landing vs Mechanic Panel vs Admin Panel */}
      {role === 'customer' && (
        <>
          {activePage === 'home' && <HomePage />}
          {activePage === 'about' && <AboutPage />}
          {activePage === 'services' && <ServicesPage />}
          {activePage === 'pricing' && <PricingPage />}
          {activePage === 'contact' && <ContactPage />}
        </>
      )}

      {role === 'mechanic' && (
        <main className="pt-8">
          <MechanicDashboard />
        </main>
      )}

      {role === 'admin' && (
        <main className="pt-8">
          <AdminDashboard />
        </main>
      )}

      {/* Footer */}
      <Footer onNavigatePage={handlePageChange} />

      {/* Modals & Overlays */}
      <BookingWizardModal />

      {activeTrackingBookingId && <LiveTrackingModal />}

    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
