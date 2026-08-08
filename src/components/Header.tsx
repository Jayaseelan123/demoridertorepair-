import React, { useState, useEffect } from 'react';
import { Wrench, Menu, X } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface HeaderProps {
  onNavigateSection?: (sectionId: string) => void;
  onNavigatePage?: (page: 'home' | 'about' | 'services' | 'pricing' | 'contact') => void;
  onOpenAuthModal?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onNavigateSection,
  onNavigatePage,
  onOpenAuthModal,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { openQuickBooking } = useApp();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (id: string) => {
    setMobileMenuOpen(false);
    if (onNavigateSection) {
      onNavigateSection(id);
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handlePageChange = (page: 'home' | 'about' | 'services' | 'pricing' | 'contact') => {
    setMobileMenuOpen(false);
    if (onNavigatePage) {
      onNavigatePage(page);
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#050505]/90 backdrop-blur-xl border-b border-white/10 shadow-2xl py-3'
            : 'bg-gradient-to-b from-[#050505]/90 via-[#050505]/50 to-transparent py-4'
        } top-0`}
      >
        <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
          {/* Left: Brand Logo */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => handlePageChange('home')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center shadow-lg shadow-blue-500/20 ring-1 ring-white/20">
              <Wrench className="w-5 h-5 text-white stroke-[2.5]" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl md:text-2xl font-black tracking-tight text-white flex items-center gap-1 font-sans">
                RIDE <span className="text-blue-500">N</span> REPAIR
              </span>
              <span className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold -mt-1">
                Doorstep Petrol Bike Care
              </span>
            </div>
          </div>

          {/* Center Navigation Links (Desktop) */}
          <nav className="hidden lg:flex items-center space-x-6 text-sm font-medium text-slate-300">
            <button
              onClick={() => handlePageChange('home')}
              className="hover:text-blue-400 transition cursor-pointer"
            >
              Home
            </button>
            <button
              onClick={() => handlePageChange('services')}
              className="hover:text-blue-400 transition cursor-pointer"
            >
              Services
            </button>
            <button
              onClick={() => handlePageChange('about')}
              className="hover:text-blue-400 transition cursor-pointer"
            >
              About
            </button>
            <button
              onClick={() => handlePageChange('pricing')}
              className="hover:text-blue-400 transition cursor-pointer"
            >
              Pricing
            </button>
            <button
              onClick={() => handlePageChange('contact')}
              className="hover:text-blue-400 transition cursor-pointer"
            >
              Contact
            </button>
          </nav>

          {/* Right Action Items intentionally removed to keep header minimal (logo + nav only) */}

          {/* Right Action Items: Book Now on desktop + compact mobile booking */}
          <div className="hidden lg:flex items-center space-x-3">
            <button
              onClick={() => openQuickBooking()}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-sm tracking-wide shadow-lg shadow-blue-600/30 hover:from-blue-500 hover:to-indigo-500"
            >
              Book Now
            </button>
          </div>

          {/* Mobile Right Controls: compact book button + menu toggle */}
          <div className="lg:hidden flex items-center space-x-2">
            <button
              onClick={() => openQuickBooking()}
              className="px-3 py-1.5 rounded-lg bg-blue-600 text-white font-bold text-xs"
              aria-label="Book Now"
            >
              Book
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-300 hover:text-white focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Slide-Out Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-slate-950/95 border-b border-slate-800 px-6 py-6 space-y-4 shadow-2xl backdrop-blur-xl animate-in slide-in-from-top duration-200">
            <nav className="flex flex-col space-y-3 font-medium text-slate-200 text-sm">
              <button
                onClick={() => handlePageChange('home')}
                className="text-left py-1 hover:text-blue-400"
              >
                Home
              </button>
              <button
                onClick={() => handlePageChange('services')}
                className="text-left py-1 hover:text-blue-400"
              >
                Services
              </button>
              <button
                onClick={() => handlePageChange('about')}
                className="text-left py-1 hover:text-blue-400"
              >
                About
              </button>
              <button
                onClick={() => handlePageChange('pricing')}
                className="text-left py-1 hover:text-blue-400"
              >
                Pricing
              </button>
              <button
                onClick={() => handlePageChange('contact')}
                className="text-left py-1 hover:text-blue-400"
              >
                Contact
              </button>
            </nav>
          </div>
        )}
      </header>
    </>
  );
};
