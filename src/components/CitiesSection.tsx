import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CITIES } from '../data/mockData';
import { MapPin, Search, CheckCircle2 } from 'lucide-react';

export const CitiesSection: React.FC = () => {
  const { selectedCity, setSelectedCity } = useApp();
  const [citySearch, setCitySearch] = useState('');

  const filteredCities = CITIES.filter(
    (c) =>
      c.name.toLowerCase().includes(citySearch.toLowerCase()) ||
      c.state.toLowerCase().includes(citySearch.toLowerCase()) ||
      c.activeAreas.some((a) => a.toLowerCase().includes(citySearch.toLowerCase()))
  );

  return (
    <section id="cities" className="py-20 bg-[#050505] text-white relative border-t border-white/5">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold backdrop-blur-md">
            <MapPin className="w-3.5 h-3.5" />
            <span>Pan-India Doorstep Coverage</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-white">
            Available In 15+ Major Cities
          </h2>
          <p className="text-sm text-slate-400">
            Select your city to view nearby active mechanics and service availability.
          </p>

          {/* Search Input */}
          <div className="relative max-w-md mx-auto pt-3">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-6" />
            <input
              type="text"
              placeholder="Search city or locality (e.g. Koramangala, Bandra)..."
              value={citySearch}
              onChange={(e) => setCitySearch(e.target.value)}
              className="w-full bg-[#0a0a0c] border border-white/10 text-slate-200 text-xs rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            />
          </div>
        </div>

        {/* Cities Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredCities.map((city) => {
            const isSelected = selectedCity === city.name;
            return (
              <div
                key={city.id}
                onClick={() => setSelectedCity(city.name)}
                className={`p-5 rounded-2xl border transition duration-200 cursor-pointer flex flex-col justify-between space-y-3 backdrop-blur-md ${
                  isSelected
                    ? 'bg-blue-600/15 border-blue-500 ring-2 ring-blue-500/30 shadow-lg shadow-blue-500/10'
                    : 'bg-[#0a0a0c]/80 border-white/10 hover:border-white/20 hover:bg-[#0d0d10]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <MapPin className={`w-4 h-4 ${isSelected ? 'text-blue-400' : 'text-slate-400'}`} />
                    <h3 className="font-bold text-white text-base">{city.name}</h3>
                  </div>
                  {isSelected && (
                    <span className="text-[10px] font-bold bg-blue-500 text-white px-2 py-0.5 rounded-full flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Selected
                    </span>
                  )}
                </div>

                <div className="text-[11px] text-slate-400">
                  <span className="font-semibold text-slate-300">Active Neighborhoods:</span>{' '}
                  {city.activeAreas.join(', ')}
                </div>

                <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-400">
                  <span>State: {city.state}</span>
                  <span className="text-emerald-400 font-semibold">⚡ 30-Min Arrival</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
