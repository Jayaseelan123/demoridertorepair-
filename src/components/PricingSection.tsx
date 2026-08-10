import React from 'react';
import { useApp } from '../context/AppContext';
import { Bike, CheckCircle2, ChevronRight, Sparkles } from 'lucide-react';

export const PricingSection: React.FC = () => {
  const { openBookingWizard } = useApp();

  const pricingPackages = [
    {
      id: 'pkg-bike',
      title: 'Petrol Bike General Service',
      tagline: 'Ideal for daily-use bikes and commuters',
      startingPrice: 450,
      originalPrice: 650,
      vehicleType: 'bike' as const,
      icon: Bike,
      popular: true,
      inclusions: [
        'Castrol / Motul Synthetic Engine Oil',
        'Air & Oil Filter Cleaning / Check',
        'Chain Cleaning & Lubrication',
        'Front & Rear Brake Adjustment',
        'Spark Plug Check & Cleaning',
        '18-Point Full Safety Checkup',
      ],
    },
    {
      id: 'pkg-tune',
      title: 'Engine Tuning & Pickup Care',
      tagline: 'Best for rough idling and low mileage',
      startingPrice: 799,
      originalPrice: 1100,
      vehicleType: 'bike' as const,
      icon: Bike,
      popular: true,
      inclusions: [
        'Fuel System & Carburetor Cleaning',
        'Tappet Clearance Adjustment',
        'Spark Plug Replacement',
        'Throttle & Cable Inspection',
        'Silencer Carbon Clean Check',
      ],
    },
    {
      id: 'pkg-breakdown',
      title: 'Breakdown Assistance',
      tagline: 'Fast help for dead starts or flat tyres',
      startingPrice: 299,
      originalPrice: 450,
      vehicleType: 'bike' as const,
      icon: Bike,
      popular: false,
      inclusions: [
        'Battery Jumpstart Service',
        'Tubeless Puncture Fix',
        'Cable Replacement',
        'Minor Wiring Checks',
        'Doorstep Arrival Within 30 Minutes',
      ],
    },
  ];

  return (
    <section id="pricing" className="py-20 bg-[#050505] text-white relative border-t border-white/5">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
          <div className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">
            Upfront & Transparent Rates
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-white">
            Simple Doorstep Pricing
          </h2>
          <p className="text-sm text-slate-400">
            No surprise labor costs or inflated spare part bills. Pay exactly what you see.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pricingPackages.map((pkg) => {
            const Icon = pkg.icon;
            return (
              <div
                key={pkg.id}
                className={`bg-[#0a0a0c]/80 border rounded-3xl p-6 flex flex-col justify-between space-y-6 relative backdrop-blur-md shadow-2xl ${
                  pkg.popular
                    ? 'border-blue-500/80 ring-2 ring-blue-500/20 shadow-blue-500/10'
                    : 'border-white/10'
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full shadow flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    <span>Best Seller</span>
                  </div>
                )}

                <div>
                  <div className="w-10 h-10 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5" />
                  </div>

                  <h3 className="text-xl font-bold text-white">{pkg.title}</h3>
                  <p className="text-xs text-slate-400 mt-1">{pkg.tagline}</p>

                  <div className="my-6 pt-4 border-t border-slate-800">
                    <div className="text-3xl font-black text-white flex items-baseline gap-2">
                      <span>Starting ₹{pkg.startingPrice}</span>
                      <span className="text-xs text-slate-400 line-through font-normal">
                        ₹{pkg.originalPrice}
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-400 mt-1">Includes labor, lubricants & taxes</p>
                  </div>

                  <div className="space-y-2.5">
                    <div className="text-[11px] font-bold text-slate-300 uppercase tracking-wider">
                      What's Included:
                    </div>
                    {pkg.inclusions.map((item, idx) => (
                      <div key={idx} className="flex items-start space-x-2 text-xs text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => openQuickBooking()}
                  className={`w-full py-3 rounded-xl font-bold text-xs shadow-lg transition flex items-center justify-center space-x-1 ${
                    pkg.popular
                      ? 'bg-blue-600 text-white hover:bg-blue-500 shadow-blue-600/30'
                      : 'bg-slate-800 text-slate-200 hover:bg-slate-700'
                  }`}
                >
                  <span>Book Package Now</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
