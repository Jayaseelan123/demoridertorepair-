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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Hero Left Content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Top Pill Badge */}
            <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold backdrop-blur-sm">
              <span className="flex h-2 w-2 rounded-full bg-blue-400 animate-pulse" />
              <span>Doorstep Service Available in {selectedCity}</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
              Professional <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-indigo-400">Petrol Bike Service</span> At Your Doorstep
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Book verified mechanics with 100% transparent pricing. Get general service, engine tuning, or breakdown assistance for your petrol bike at home or office.
            </p>

            {/* Main CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-2">
              <button
                onClick={() => openBookingWizard()}
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 text-white font-bold text-sm tracking-wide shadow-xl shadow-blue-600/30 hover:shadow-blue-500/50 hover:from-blue-500 hover:to-indigo-500 transform hover:-translate-y-0.5 transition-all flex items-center justify-center space-x-2"
              >
                <Wrench className="w-5 h-5 text-blue-200" />
                <span>Book Service Now</span>
                <ChevronRight className="w-4 h-4 text-blue-200" />
              </button>

              <button
                onClick={() => {
                  if (onExploreClick) onExploreClick();
                  else {
                    const el = document.getElementById('services');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 font-bold text-sm hover:bg-slate-800 hover:border-slate-700 transition flex items-center justify-center space-x-2"
              >
                <span>Explore Services & Prices</span>
              </button>
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

          {/* Hero Right Quick Booking Card */}
          <div className="lg:col-span-5">
            <div className="bg-[#0a0a0c]/90 border border-white/10 rounded-3xl p-6 shadow-2xl backdrop-blur-xl relative overflow-hidden ring-1 ring-white/5">
              
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5">
                <div>
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <Wrench className="w-5 h-5 text-blue-400" />
                    <span>Instant Doorstep Booking</span>
                  </h3>
                  <p className="text-xs text-slate-400">Select details & get mechanic at your doorstep</p>
                </div>
                <span className="text-[10px] font-bold px-2 py-1 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  LIVE SLOTS
                </span>
              </div>

              <form onSubmit={handleQuickBook} className="space-y-4 text-xs">
                {/* 1. Bike Selection */}
                <div>
                  <label className="block text-slate-300 font-semibold mb-2">1. Select Petrol Bike</label>
                  <div className="grid grid-cols-1 gap-2">
                    <button
                      type="button"
                      onClick={() => setVehicleType('bike')}
                      className="p-3 rounded-xl border bg-blue-600/20 border-blue-500 text-blue-400 font-bold flex items-center justify-center space-x-2 transition"
                    >
                      <Bike className="w-5 h-5" />
                      <span>Petrol Bike</span>
                    </button>
                  </div>
                </div>

                {/* 2. Brand & Service Select */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Brand</label>
                    <select
                      value={selectedBrand}
                      onChange={(e) => setSelectedBrand(e.target.value)}
                      className="w-full bg-slate-800 border border-slate-700 text-slate-200 rounded-xl px-3 py-2.5 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    >
                      {filteredBrands.map((b) => (
                        <option key={b.id} value={b.name}>
                          {b.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Required Service</label>
                    <select
                      value={selectedService}
                      onChange={(e) => setSelectedService(e.target.value)}
                      className="w-full bg-slate-800 border border-slate-700 text-slate-200 rounded-xl px-3 py-2.5 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    >
                      {filteredServices.map((s) => (
                        <option key={s.id} value={s.id}>
                          {s.title} (₹{s.price})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* 3. Location */}
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Service Location</label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-blue-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      value={userLocation}
                      onChange={(e) => setUserLocation(e.target.value)}
                      placeholder="Enter house no, street or locality"
                      className="w-full bg-slate-800 border border-slate-700 text-slate-200 rounded-xl pl-9 pr-3 py-2.5 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                </div>

                {/* 4. Preferred Time Slot */}
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Preferred Time Slot</label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-blue-400 absolute left-3 top-3" />
                    <select
                      value={preferredTime}
                      onChange={(e) => setPreferredTime(e.target.value)}
                      className="w-full bg-slate-800 border border-slate-700 text-slate-200 rounded-xl pl-9 pr-3 py-2.5 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    >
                      <option value="Today (Within 30 mins)">⚡ Emergency (Within 30 Mins Arrival)</option>
                      <option value="Today - Evening (04:00 PM - 06:00 PM)">Today - Evening (04:00 PM - 06:00 PM)</option>
                      <option value="Tomorrow - Morning (09:00 AM - 11:00 AM)">Tomorrow - Morning (09:00 AM - 11:00 AM)</option>
                      <option value="Tomorrow - Afternoon (01:00 PM - 03:00 PM)">Tomorrow - Afternoon (01:00 PM - 03:00 PM)</option>
                    </select>
                  </div>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-sm tracking-wide shadow-lg shadow-blue-600/30 hover:from-blue-500 hover:to-indigo-500 transition transform hover:-translate-y-0.5 flex items-center justify-center space-x-2"
                >
                  <span>Proceed To Booking</span>
                  <ChevronRight className="w-4 h-4" />
                </button>

                <div className="text-[10px] text-center text-slate-400 pt-1 flex items-center justify-center gap-2">
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" /> Pay After Service Available
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" /> Free Cancellation
                  </span>
                </div>
              </form>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
