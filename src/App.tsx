import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ServiceCategories } from './components/ServiceCategories';
import { BrandShowcase } from './components/BrandShowcase';
import { HowItWorks } from './components/HowItWorks';
import { WhyChooseUs } from './components/WhyChooseUs';
import { PricingSection } from './components/PricingSection';
import { ReviewsSection } from './components/ReviewsSection';
import { FAQSection } from './components/FAQSection';
import { CitiesSection } from './components/CitiesSection';
import { Footer } from './components/Footer';
import { LiveTrackingModal } from './components/LiveTrackingModal';
import { BookingWizardModal } from './components/BookingWizardModal';
import { UserDashboard } from './components/dashboards/UserDashboard';
import { MechanicDashboard } from './components/dashboards/MechanicDashboard';
import { AdminDashboard } from './components/dashboards/AdminDashboard';
import { AboutContactModal } from './components/AboutContactModal';
import { CheckCircle2, AlertCircle } from 'lucide-react';

function AppContent() {
  const { role, toastMessage, activeTrackingBookingId } = useApp();
  const [aboutModalState, setAboutModalState] = useState<{
    isOpen: boolean;
    tab: 'about' | 'contact';
  }>({
    isOpen: false,
    tab: 'about',
  });

  const handleNavigateSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
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
        onOpenAuthModal={() => {
          const el = document.getElementById('dashboard');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        onOpenAboutModal={() => setAboutModalState({ isOpen: true, tab: 'about' })}
      />

      {/* Dynamic Role View Switching: Customer Landing vs Mechanic Panel vs Admin Panel */}
      {role === 'customer' && (
        <main>
          <Hero onExploreClick={() => handleNavigateSection('services')} />
          <ServiceCategories />
          <BrandShowcase />
          <HowItWorks />
          <WhyChooseUs />
          <PricingSection />
          
          {/* Embedded Customer Dashboard View */}
          <UserDashboard />

          <ReviewsSection />
          <FAQSection />
          <CitiesSection />
        </main>
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
      <Footer />

      {/* Modals & Overlays */}
      <BookingWizardModal />

      {activeTrackingBookingId && <LiveTrackingModal />}

      {aboutModalState.isOpen && (
        <AboutContactModal
          initialTab={aboutModalState.tab}
          onClose={() => setAboutModalState({ isOpen: false, tab: 'about' })}
        />
      )}
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
