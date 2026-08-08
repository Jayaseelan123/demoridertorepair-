import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Hero } from '../components/Hero';
import { ServiceCategories } from '../components/ServiceCategories';
import { BrandShowcase } from '../components/BrandShowcase';
import { HowItWorks } from '../components/HowItWorks';
import { WhyChooseUs } from '../components/WhyChooseUs';
import { PricingSection } from '../components/PricingSection';
import { ReviewsSection } from '../components/ReviewsSection';
import { FAQSection } from '../components/FAQSection';
import { CitiesSection } from '../components/CitiesSection';
import { UserDashboard } from '../components/dashboards/UserDashboard';
import { CheckCircle2, Wrench, ShieldCheck, PhoneCall, Mail, MapPin, ArrowRight } from 'lucide-react';

export const HomePage: React.FC = () => (
  <main>
    <Hero />
    <ServiceCategories />
    <BrandShowcase />
    <HowItWorks />
    <WhyChooseUs />
    <PricingSection />
    <UserDashboard />
    <ReviewsSection />
    <FAQSection />
    <CitiesSection />
  </main>
);

export const AboutPage: React.FC = () => {
  const { openBookingWizard } = useApp();

  const highlights = [
    'Doorstep petrol bike servicing with transparent pricing and no hidden charges.',
    'Verified mechanics with live updates, before/after photos, and warranty support.',
    'Fast booking, easy rescheduling, and reliable support for every service call.',
  ];

  return (
    <main className="bg-[#050505] text-slate-100">
      <section className="pt-28 pb-16 px-4 md:px-6">
        <div className="container mx-auto max-w-6xl rounded-[32px] border border-white/10 bg-[#0a0a0c] p-8 md:p-12 shadow-2xl">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-blue-400">
                <Wrench className="h-3.5 w-3.5" />
                About Ride N Repair
              </div>
              <h1 className="text-3xl font-black tracking-tight text-white md:text-5xl">
                A trusted doorstep service platform for modern petrol-bike owners.
              </h1>
              <p className="text-base leading-8 text-slate-400">
                We make bike maintenance simple, fast, and transparent. From general servicing to breakdown help, every visit is handled by professional mechanics who arrive at your location with genuine parts and clear pricing.
              </p>
            </div>
            <button
              onClick={() => openBookingWizard({ vehicleType: 'bike' })}
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-500"
            >
              Book Your Service
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {highlights.map((item) => (
              <div key={item} className="rounded-2xl border border-white/10 bg-slate-950/70 p-5">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600/15 text-blue-400">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <p className="text-sm leading-7 text-slate-300">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <WhyChooseUs />
      <HowItWorks />
    </main>
  );
};

export const ServicesPage: React.FC = () => (
  <main className="bg-[#050505] text-slate-100">
    <section className="pt-28 pb-8 px-4 md:px-6">
      <div className="container mx-auto max-w-5xl text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-blue-400">
          <Wrench className="h-3.5 w-3.5" />
          Petrol Bike Services
        </div>
        <h1 className="mt-4 text-3xl font-black tracking-tight text-white md:text-5xl">
          Everything your petrol bike needs, delivered to your doorstep.
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-slate-400">
          Choose from general servicing, engine tuning, and emergency breakdown recovery, all handled by verified technicians.
        </p>
      </div>
    </section>
    <ServiceCategories />
    <BrandShowcase />
    <HowItWorks />
  </main>
);

export const PricingPage: React.FC = () => (
  <main className="bg-[#050505] text-slate-100">
    <section className="pt-28 pb-8 px-4 md:px-6">
      <div className="container mx-auto max-w-4xl text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-blue-400">
          <ShieldCheck className="h-3.5 w-3.5" />
          Simple Pricing
        </div>
        <h1 className="mt-4 text-3xl font-black tracking-tight text-white md:text-5xl">
          Transparent packages for every petrol-bike need.
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-slate-400">
          See the exact prices before booking and enjoy clear labor, lubricant, and warranty details on every service.
        </p>
      </div>
    </section>
    <PricingSection />
  </main>
);

export const ContactPage: React.FC = () => {
  const { openBookingWizard } = useApp();
  const [submitted, setSubmitted] = useState(false);

  return (
    <main className="bg-[#050505] text-slate-100">
      <section className="pt-28 pb-16 px-4 md:px-6">
        <div className="container mx-auto grid gap-8 lg:grid-cols-[1.1fr_0.9fr] max-w-6xl">
          <div className="rounded-[32px] border border-white/10 bg-[#0a0a0c] p-8 shadow-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-blue-400">
              <PhoneCall className="h-3.5 w-3.5" />
              Contact Support
            </div>
            <h1 className="mt-4 text-3xl font-black tracking-tight text-white md:text-4xl">
              Speak to our support team anytime.
            </h1>
            <p className="mt-4 text-base leading-8 text-slate-400">
              Need help booking a service, checking an appointment, or asking about warranty coverage? Our doorstep support team is ready to assist you.
            </p>

            <div className="mt-8 space-y-4">
              <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-slate-950/70 p-4">
                <PhoneCall className="mt-0.5 h-4 w-4 text-blue-400" />
                <div>
                  <div className="font-semibold text-white">Phone Support</div>
                  <div className="text-sm text-slate-400">1800-RNR-CARE (1800 767 2273)</div>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-slate-950/70 p-4">
                <Mail className="mt-0.5 h-4 w-4 text-blue-400" />
                <div>
                  <div className="font-semibold text-white">Email Support</div>
                  <div className="text-sm text-slate-400">support@ridenrepair.com</div>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-slate-950/70 p-4">
                <MapPin className="mt-0.5 h-4 w-4 text-blue-400" />
                <div>
                  <div className="font-semibold text-white">Service Area</div>
                  <div className="text-sm text-slate-400">Available across major metro cities for doorstep petrol-bike service.</div>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-[32px] border border-white/10 bg-[#0a0a0c] p-8 shadow-2xl">
            {submitted ? (
              <div className="space-y-4 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-400">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
                <h2 className="text-2xl font-bold text-white">Message received!</h2>
                <p className="text-sm leading-7 text-slate-400">
                  Our support team will contact you shortly with the next steps for your bike service request.
                </p>
                <button
                  onClick={() => openBookingWizard({ vehicleType: 'bike' })}
                  className="rounded-2xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-500"
                >
                  Book Service Now
                </button>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSubmitted(true);
                }}
                className="space-y-4"
              >
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-300">Your Name</label>
                  <input className="w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white outline-none" placeholder="Your name" />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-300">Phone Number</label>
                  <input className="w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white outline-none" placeholder="Your phone" />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-300">How can we help?</label>
                  <textarea rows={4} className="w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white outline-none" placeholder="Tell us about your service request" />
                </div>
                <button type="submit" className="w-full rounded-2xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-500">
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </main>
  );
};
