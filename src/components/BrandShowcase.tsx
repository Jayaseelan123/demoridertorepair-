import React from 'react';
import { useApp } from '../context/AppContext';
import { VEHICLE_BRANDS } from '../data/mockData';
import { Bike, ChevronRight, ShieldCheck } from 'lucide-react';

export const BrandShowcase: React.FC = () => {
  const { openQuickBooking } = useApp();

  const brands = VEHICLE_BRANDS.filter((b) => b.type === 'bike');

  return (
    <section className="py-16 bg-[#050505] text-white border-t border-white/5">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-10 gap-4">
          <div>
            <div className="text-[10px] font-bold text-blue-400 uppercase tracking-widest mb-1">
              Supported Manufacturers
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-white">
              We Service All Major Petrol Bike Brands
            </h2>
            <p className="text-xs md:text-sm text-slate-400 mt-1">
              Certified petrol-bike mechanics trained with genuine OEM spare parts for every major bike brand.
            </p>
          </div>
        </div>

        {/* Brands Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4">
          {brands.map((brand) => (
            <div
              key={brand.id}
              onClick={() => openQuickBooking()}
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
