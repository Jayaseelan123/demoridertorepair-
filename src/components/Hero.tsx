import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Bike,
  Star,
  Clock,
  ShieldCheck,
  CheckCircle2,
  MapPin,
  Calendar,
  ChevronRight,
  Wrench,
  Users,
  Award,
} from 'lucide-react';
import { VEHICLE_BRANDS, SERVICES } from '../data/mockData';

interface HeroProps {
  onExploreClick?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick }) => {
  const { selectedCity, openBookingWizard } = useApp();

  // Quick booking card internal form state
  const [vehicleType, setVehicleType] = useState<'bike'>('bike');
  const [selectedBrand, setSelectedBrand] = useState<string>('Royal Enfield');
  const [selectedService, setSelectedService] = useState<string>('s-bike-1');
  const [userLocation, setUserLocation] = useState<string>(`${selectedCity}, Central Area`);
  const [preferredTime, setPreferredTime] = useState<string>('Today (Within 30 mins)');

  const filteredBrands = VEHICLE_BRANDS.filter((b) => b.type === 'bike');

  const filteredServices = SERVICES.filter((s) => s.category === vehicleType);

  const handleQuickBook = (e: React.FormEvent) => {
    e.preventDefault();
    openBookingWizard({
      vehicleType,
      brand: selectedBrand,
      serviceId: selectedService,
    });
  };

  return (
    <section id="hero" className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden bg-[#050505] text-white">
      {/* Background Graphic & Glow Effects */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-[#050505] to-[#050505] pointer-events-none" />
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Grid Pattern Overlay */}
      <div
        className="absolute inset-0 z-0 opacity-5 pointer-events-none bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:24px_24px]"
      />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-3xl mx-auto space-y-8 text-center">
          <div className="space-y-6">
            {/* Top Pill Badge */}
            <div className="inline-flex items-center justify-center space-x-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold backdrop-blur-sm">
              <span className="flex h-2 w-2 rounded-full bg-blue-400 animate-pulse" />
              <span>Doorstep Service Available in {selectedCity}</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
              We Service All Major <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-indigo-400">Petrol Bike Brands</span>
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Book verified mechanics with 100% transparent pricing for major petrol bike brands. Get general service, engine tuning, or breakdown assistance from Riuka at your doorstep.
            </p>

            {/* Main CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                onClick={() => openBookingWizard()}
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 text-white font-bold text-sm tracking-wide shadow-xl shadow-blue-600/30 hover:shadow-blue-500/50 hover:from-blue-500 hover:to-indigo-500 transform hover:-translate-y-0.5 transition-all"
              >
                Book Service Now
              </button>
              <button
                onClick={() => {
                  if (onExploreClick) onExploreClick();
                  else {
                    const el = document.getElementById('services');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 font-bold text-sm hover:bg-slate-800 hover:border-slate-700 transition"
              >
                Explore Services & Prices
              </button>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="pt-6 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="flex items-center space-x-2 text-left">
              <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-black text-white">2,00,000+</div>
                <div className="text-[11px] text-slate-400 font-medium">Happy Customers</div>
              </div>
            </div>

            <div className="flex items-center space-x-2 text-left">
              <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400">
                <Star className="w-5 h-5 fill-amber-400" />
              </div>
              <div>
                <div className="text-sm font-black text-white">4.8 ★ Rating</div>
                <div className="text-[11px] text-slate-400 font-medium">15k+ Reviews</div>
              </div>
            </div>

            <div className="flex items-center space-x-2 text-left">
              <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-black text-white">30 Min</div>
                <div className="text-[11px] text-slate-400 font-medium">Fast Arrival</div>
              </div>
            </div>

            <div className="flex items-center space-x-2 text-left">
              <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-black text-white">Warranty</div>
                <div className="text-[11px] text-slate-400 font-medium">30-Day Guaranteed</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
