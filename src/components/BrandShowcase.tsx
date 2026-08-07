import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { VEHICLE_BRANDS } from '../data/mockData';
import { Bike, Car, ChevronRight, ShieldCheck } from 'lucide-react';

export const BrandShowcase: React.FC = () => {
  const { openBookingWizard } = useApp();
  const [tab, setTab] = useState<'bike' | 'car'>('bike');

  const brands = VEHICLE_BRANDS.filter((b) => b.type === tab || b.type === 'both');

  return (
    <section className="py-16 bg-[#050505] text-white border-t border-white/5">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="text-[10px] font-bold text-blue-400 uppercase tracking-widest mb-1">
              Supported Manufacturers
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-white">
              We Repair All Major Brands & Models
            </h2>
            <p className="text-xs md:text-sm text-slate-400 mt-1">
              Certified mechanics trained with genuine OEM spare parts for every vehicle brand
            </p>
          </div>

          {/* Tab Filter */}
          <div className="inline-flex p-1 rounded-2xl bg-[#0a0a0c] border border-white/10 shrink-0">
            <button
              onClick={() => setTab('bike')}
              className={`px-5 py-2 rounded-xl text-xs font-bold transition flex items-center space-x-2 ${
                tab === 'bike' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Bike className="w-4 h-4" />
              <span>Bike Brands</span>
            </button>

            <button
              onClick={() => setTab('car')}
              className={`px-5 py-2 rounded-xl text-xs font-bold transition flex items-center space-x-2 ${
                tab === 'car' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Car className="w-4 h-4" />
              <span>Car Brands</span>
            </button>
          </div>
        </div>

        {/* Brands Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4">
          {brands.map((brand) => (
            <div
              key={brand.id}
              onClick={() =>
                openBookingWizard({
                  vehicleType: tab,
                  brand: brand.name,
                })
              }
              className="bg-[#0a0a0c]/80 border border-white/10 rounded-2xl p-5 hover:border-blue-500/40 hover:bg-[#0e0e11] transition duration-300 cursor-pointer group flex flex-col justify-between space-y-4 shadow-lg backdrop-blur-md"
            >
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-slate-800 p-2 flex items-center justify-center overflow-hidden ring-1 ring-slate-700/50 group-hover:scale-110 transition duration-300">
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover rounded"
                  />
                </div>
                <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-blue-400 group-hover:translate-x-1 transition" />
              </div>

              <div>
                <h3 className="font-bold text-white text-sm group-hover:text-blue-400 transition">
                  {brand.name}
                </h3>
                <div className="text-[10px] text-slate-400 mt-1 line-clamp-1">
                  Popular: {brand.popularModels.slice(0, 3).join(', ')}
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-400 group-hover:text-slate-300">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-400" />
                  <span>Genuine Parts</span>
                </span>
                <span className="text-blue-400 font-semibold group-hover:underline">
                  Book Service →
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
