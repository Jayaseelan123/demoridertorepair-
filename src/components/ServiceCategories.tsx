import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { VehicleType, ServiceItem } from '../types';
import {
  Bike,
  Clock,
  ShieldCheck,
  CheckCircle2,
  ChevronRight,
  Sparkles,
  Wrench,
  Search,
} from 'lucide-react';

export const ServiceCategories: React.FC = () => {
  const { servicesList, openBookingWizard } = useApp();
  const [activeCategory, setActiveCategory] = useState<VehicleType>('bike');
  const [selectedServiceModal, setSelectedServiceModal] = useState<ServiceItem | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredServices = servicesList.filter((s) => {
    const matchesCat = activeCategory === 'all' || s.category === activeCategory;
    const matchesSearch =
      s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.subCategory.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <section id="services" className="py-20 bg-[#050505] text-slate-100 relative border-t border-white/5">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold backdrop-blur-md">
            <Wrench className="w-3.5 h-3.5" />
            <span>Doorstep Petrol Bike Care</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-black tracking-tight text-white">
            Our Petrol Bike Service Packages
          </h2>
          <p className="text-sm md:text-base text-slate-400">
            Certified petrol-bike mechanics brought to your doorstep with genuine spare parts, transparent pricing, and a 30-day service warranty.
          </p>

          {/* Search & Category Filter Tabs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            
            {/* Search Input */}
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Search petrol bike services..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 text-slate-200 text-xs rounded-xl pl-9 pr-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Category Filter Pills */}
            <div className="inline-flex items-center rounded-xl bg-slate-800/80 border border-slate-700/80 px-4 py-2">
              <Bike className="w-3.5 h-3.5 text-blue-400" />
              <span className="ml-2 text-xs font-bold text-white uppercase tracking-[0.16em]">
                Petrol Bike Services Only
              </span>
            </div>

          </div>
        </div>

        {/* Services Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => {
            const savingsPct = Math.round(
              ((service.originalPrice - service.price) / service.originalPrice) * 100
            );

            return (
              <div
                key={service.id}
                className="bg-[#0a0a0c]/80 border border-white/10 rounded-3xl overflow-hidden shadow-2xl hover:border-blue-500/40 hover:shadow-blue-500/10 transition duration-300 flex flex-col group backdrop-blur-md"
              >
                {/* Service Image Banner */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                  
                  {/* Category Pill Badge */}
                  <div className="absolute top-3 left-3 bg-slate-900/90 backdrop-blur-md text-blue-400 border border-slate-700/80 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md flex items-center space-x-1">
                    <Bike className="w-3 h-3" />
                    <span>{service.subCategory}</span>
                  </div>

                  {service.popular && (
                    <div className="absolute top-3 right-3 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md shadow flex items-center space-x-1">
                      <Sparkles className="w-3 h-3 fill-slate-950" />
                      <span>Most Popular</span>
                    </div>
                  )}

                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                    <div className="text-white font-black text-xl flex items-baseline gap-2">
                      <span>₹{service.price}</span>
                      <span className="text-xs text-slate-400 line-through font-normal">
                        ₹{service.originalPrice}
                      </span>
                      <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/80 px-1.5 py-0.5 rounded border border-emerald-800/80">
                        {savingsPct}% OFF
                      </span>
                    </div>
                  </div>
                </div>

                {/* Service Details Body */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-blue-400 transition">
                      {service.title}
                    </h3>
                    <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                      {service.description}
                    </p>

                    {/* Key Specifications Bar */}
                    <div className="mt-3 py-2 px-3 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between text-[11px] text-slate-300">
                      <div className="flex items-center space-x-1">
                        <Clock className="w-3.5 h-3.5 text-blue-400" />
                        <span>{service.durationMinutes} Mins</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                        <span>{service.warrantyDays}-Day Warranty</span>
                      </div>
                    </div>

                    {/* Bullet Points Inclusions Preview */}
                    <ul className="mt-4 space-y-1.5">
                      {service.inclusions.slice(0, 3).map((item, idx) => (
                        <li key={idx} className="text-[11px] text-slate-300 flex items-start space-x-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                          <span className="line-clamp-1">{item}</span>
                        </li>
                      ))}
                      {service.inclusions.length > 3 && (
                        <li className="text-[10px] text-blue-400 font-medium pl-5">
                          + {service.inclusions.length - 3} more items included
                        </li>
                      )}
                    </ul>
                  </div>

                  {/* Actions */}
                  <div className="pt-3 border-t border-slate-800/80">
                    <button
                      onClick={() => setSelectedServiceModal(service)}
                      className="w-full py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 text-xs font-semibold hover:bg-slate-800 transition"
                    >
                      View Details
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>

      {/* Detail Modal */}
      {selectedServiceModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 text-slate-100 space-y-5 shadow-2xl relative">
            <button
              onClick={() => setSelectedServiceModal(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1"
            >
              ✕
            </button>

            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
                <Wrench className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">{selectedServiceModal.title}</h3>
                <span className="text-xs text-blue-400 font-medium uppercase tracking-wider">
                  {selectedServiceModal.subCategory} • {selectedServiceModal.category.toUpperCase()}
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              {selectedServiceModal.description}
            </p>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
              <div>
                <div className="text-2xl font-black text-white">₹{selectedServiceModal.price}</div>
                <div className="text-xs text-slate-400 line-through">
                  ₹{selectedServiceModal.originalPrice}
                </div>
              </div>
              <div className="text-right text-xs text-slate-300">
                <div>⏱️ Duration: <strong>{selectedServiceModal.durationMinutes} mins</strong></div>
                <div>🛡️ Warranty: <strong>{selectedServiceModal.warrantyDays} Days</strong></div>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3">
                Full Package Inclusions:
              </h4>
              <ul className="space-y-2 text-xs">
                {selectedServiceModal.inclusions.map((inc, i) => (
                  <li key={i} className="flex items-start space-x-2 text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{inc}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-2 flex gap-3">
              <button
                onClick={() => setSelectedServiceModal(null)}
                className="w-1/3 py-3 rounded-xl bg-slate-800 text-slate-300 font-semibold text-xs hover:bg-slate-700"
              >
                Close
              </button>
              <button
                onClick={() => {
                  const s = selectedServiceModal;
                  setSelectedServiceModal(null);
                  openBookingWizard({
                    vehicleType: s.category,
                    serviceId: s.id,
                  });
                }}
                className="w-2/3 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-xs shadow-lg shadow-blue-600/30 hover:from-blue-500 hover:to-indigo-500"
              >
                Book This Package Now
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
