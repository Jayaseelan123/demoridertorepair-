import React, { useState } from 'react';
import { REVIEWS } from '../data/mockData';
import { Star, ShieldCheck, Quote, ChevronLeft, ChevronRight } from 'lucide-react';

export const ReviewsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextReview = () => {
    setCurrentIndex((prev) => (prev + 1) % REVIEWS.length);
  };

  const prevReview = () => {
    setCurrentIndex((prev) => (prev - 1 + REVIEWS.length) % REVIEWS.length);
  };

  return (
    <section className="py-20 bg-[#050505] text-white relative border-t border-white/5">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center space-x-1 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold backdrop-blur-md">
            <Star className="w-3.5 h-3.5 fill-amber-400" />
            <span>4.8 / 5 Rated Across 15,000+ Services</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-white">
            What Vehicle Owners Say
          </h2>
          <p className="text-sm text-slate-400">
            Real feedback from verified Ride N Repair customers
          </p>
        </div>

        {/* Reviews Carousel & Grid */}
        <div className="max-w-4xl mx-auto relative">
          
          <div className="bg-[#0a0a0c]/80 border border-white/10 rounded-3xl p-8 shadow-2xl relative backdrop-blur-md">
            <Quote className="w-12 h-12 text-blue-500/10 absolute top-6 right-6" />

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <div className="flex items-center space-x-4">
                <img
                  src={REVIEWS[currentIndex].userAvatar}
                  alt={REVIEWS[currentIndex].userName}
                  referrerPolicy="no-referrer"
                  className="w-14 h-14 rounded-full object-cover ring-2 ring-blue-500/30"
                />
                <div>
                  <h3 className="font-bold text-white text-base">
                    {REVIEWS[currentIndex].userName}
                  </h3>
                  <div className="text-xs text-slate-400">
                    {REVIEWS[currentIndex].vehicleModel} • {REVIEWS[currentIndex].city}
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-start sm:items-end">
                <div className="flex text-amber-400 space-x-1">
                  {[...Array(REVIEWS[currentIndex].rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <div className="text-[10px] text-emerald-400 flex items-center gap-1 mt-1 font-semibold">
                  <ShieldCheck className="w-3 h-3" />
                  <span>Verified Service Customer</span>
                </div>
              </div>
            </div>

            <p className="text-sm md:text-base text-slate-200 leading-relaxed italic">
              "{REVIEWS[currentIndex].comment}"
            </p>

            <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <span>Service: <strong>{REVIEWS[currentIndex].serviceName}</strong></span>
              <span>{REVIEWS[currentIndex].date}</span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between mt-6">
            <div className="flex space-x-2">
              {REVIEWS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={`w-2.5 h-2.5 rounded-full transition ${
                    currentIndex === i ? 'bg-blue-500 w-8' : 'bg-slate-800'
                  }`}
                />
              ))}
            </div>

            <div className="flex space-x-2">
              <button
                onClick={prevReview}
                className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 transition"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextReview}
                className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 transition"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
