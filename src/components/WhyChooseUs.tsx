import React from 'react';
import {
  Home,
  ShieldCheck,
  Tag,
  CheckCircle,
  Smartphone,
  Award,
} from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const features = [
    {
      icon: Home,
      title: 'Doorstep Service',
      desc: 'No more wasting hours in workshop waiting rooms. Our mechanic arrives at your home or office parking.',
    },
    {
      icon: ShieldCheck,
      title: 'Verified Mechanics',
      desc: '100% background-verified technicians with police checks and hands-on skill certification.',
    },
    {
      icon: Tag,
      title: 'Transparent Pricing',
      desc: 'Upfront fixed pricing with detailed breakdown. No hidden fees or unexpected bill additions.',
    },
    {
      icon: CheckCircle,
      title: 'Genuine Spare Parts',
      desc: 'We strictly use 100% authentic OEM/OES spare parts with manufacturer warranty seals.',
    },
    {
      icon: Smartphone,
      title: 'Live Service Updates',
      desc: 'Track mechanic ETA live on interactive map and receive before/after photos directly on your phone.',
    },
    {
      icon: Award,
      title: '30-Day Warranty Protection',
      desc: 'Every service is backed by a 30-day or 1,000 KM No-Questions-Asked money-back warranty.',
    },
  ];

  return (
    <section className="py-20 bg-[#050505] text-white border-t border-white/5">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
          <div className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">
            Why Customers Trust Us
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-white">
            Built For Complete Peace Of Mind
          </h2>
          <p className="text-sm text-slate-400">
            Reinventing auto care with reliability, speed, and absolute transparency.
          </p>
        </div>

        {/* Features 6-card grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={idx}
                className="bg-[#0a0a0c]/80 border border-white/10 rounded-3xl p-6 hover:border-blue-500/40 hover:bg-[#0e0e11] transition duration-300 space-y-3 backdrop-blur-md shadow-2xl"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-600/15 border border-blue-500/30 flex items-center justify-center text-blue-400">
                  <Icon className="w-6 h-6" />
                </div>

                <h3 className="text-lg font-bold text-white">{feat.title}</h3>
                <p className="text-xs text-slate-300 leading-relaxed">{feat.desc}</p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
