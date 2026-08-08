import React from 'react';
import { MousePointerClick, UserCheck, Wrench, ShieldCheck, ArrowRight } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      number: '01',
      icon: MousePointerClick,
      title: 'Book Online',
      desc: 'Select your petrol bike brand, required doorstep service, and preferred time slot in under 60 seconds.',
      highlight: '30-Sec Booking',
    },
    {
      number: '02',
      icon: UserCheck,
      title: 'Mechanic Arrives',
      desc: 'A background-verified certified mechanic arrives at your home or office with a fully equipped mobile kit.',
      highlight: '30-Min SLA',
    },
    {
      number: '03',
      icon: Wrench,
      title: 'Petrol Bike Gets Serviced',
      desc: 'Get live digital updates & inspection photos on your phone as your petrol bike gets serviced right in front of you.',
      highlight: '100% Transparent',
    },
    {
      number: '04',
      icon: ShieldCheck,
      title: 'Payment + Warranty',
      desc: 'Test drive your vehicle, pay conveniently via UPI or Cards, and receive a 30-day warranty tax invoice instantly.',
      highlight: '30-Day Guarantee',
    },
  ];

  return (
    <section id="how-it-works" className="py-20 bg-[#050505] text-white relative overflow-hidden border-t border-white/5">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
          <div className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">
            Simple 4-Step Process
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-white">
            How Ride N Repair Works
          </h2>
          <p className="text-sm text-slate-400">
            Hassle-free doorstep petrol bike maintenance without waiting at garages
          </p>
        </div>

        {/* 4 Steps Animated Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className="bg-[#0a0a0c]/80 border border-white/10 rounded-3xl p-6 relative flex flex-col justify-between space-y-6 hover:border-blue-500/40 transition group backdrop-blur-md shadow-2xl"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 group-hover:scale-110 transition">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-3xl font-black text-slate-800 group-hover:text-blue-500/30 transition">
                      {step.number}
                    </span>
                  </div>

                  <span className="inline-block text-[10px] font-bold text-emerald-400 bg-emerald-950/80 border border-emerald-800/80 px-2 py-0.5 rounded mb-2">
                    {step.highlight}
                  </span>

                  <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">{step.desc}</p>
                </div>

                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-10">
                    <div className="w-6 h-6 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400">
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
