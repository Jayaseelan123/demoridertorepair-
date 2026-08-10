import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Wrench,
  PhoneCall,
  Mail,
  MapPin,
  ShieldCheck,
  Instagram,
  Facebook,
  Twitter,
  Linkedin,
} from 'lucide-react';

interface FooterProps {
  onNavigatePage?: (page: 'home' | 'about' | 'services' | 'pricing' | 'contact') => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigatePage }) => {
  const { openQuickBooking } = useApp();

  return (
    <footer className="bg-[#030304] text-slate-400 text-xs border-t border-white/10 pt-16 pb-12">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Top 4 Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-12 border-b border-white/10">
          
          {/* Col 1: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white">
                <Wrench className="w-5 h-5 stroke-[2.5]" />
              </div>
              <span className="text-2xl font-black tracking-tight text-white">
                RIDE <span className="text-blue-500">N</span> REPAIR
              </span>
            </div>

            <p className="text-slate-300 leading-relaxed max-w-sm">
              India's premier doorstep petrol bike service platform. Verified mechanics, upfront transparent pricing, and 30-day service warranty delivered directly to your doorstep.
            </p>

            {/* Emergency Hotline Box */}
            <div className="p-3.5 rounded-xl bg-blue-950/40 border border-blue-800/50 flex items-center space-x-3 text-white">
              <div className="p-2.5 rounded-lg bg-blue-600 text-white shrink-0">
                <PhoneCall className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[10px] font-semibold uppercase text-blue-300">
                  24x7 Doorstep Breakdown Hotline
                </div>
                <div className="text-sm font-black text-white">1800-RNR-CARE (1800 767 2273)</div>
              </div>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2 text-slate-300">
              <li><button onClick={() => onNavigatePage?.('home')} className="hover:text-blue-400 transition text-left">Home</button></li>
              <li><button onClick={() => onNavigatePage?.('services')} className="hover:text-blue-400 transition text-left">Doorstep Services</button></li>
              <li><button onClick={() => onNavigatePage?.('home')} className="hover:text-blue-400 transition text-left">How It Works</button></li>
              <li><button onClick={() => onNavigatePage?.('pricing')} className="hover:text-blue-400 transition text-left">Pricing & Packages</button></li>
              <li><button onClick={() => onNavigatePage?.('home')} className="hover:text-blue-400 transition text-left">Covered Cities</button></li>
            </ul>
          </div>

          {/* Col 3: Services */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm uppercase tracking-wider">Services</h4>
            <ul className="space-y-2 text-slate-300">
              <li><button onClick={() => { onNavigatePage?.('services'); openQuickBooking(); }} className="hover:text-blue-400 transition text-left">Petrol Bike General Service</button></li>
              <li><button onClick={() => { onNavigatePage?.('services'); openQuickBooking(); }} className="hover:text-blue-400 transition text-left">Engine Tuning & Pickup Care</button></li>
              <li><button onClick={() => { onNavigatePage?.('services'); openQuickBooking(); }} className="hover:text-blue-400 transition text-left">Doorstep Breakdown Assistance</button></li>
            </ul>
          </div>

          {/* Col 4: Contact & Support */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm uppercase tracking-wider">Head Office</h4>
            <ul className="space-y-2 text-slate-300">
              <li className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <span>Level 5, Ride N Repair Tower, Koramangala, Bengaluru - 560095</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                <span>support@ridenrepair.com</span>
              </li>
              <li className="flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>ISO 9001:2026 Certified Auto Platform</span>
              </li>
            </ul>

            <div className="flex space-x-3 pt-2 text-slate-400">
              <a href="#" className="p-2 rounded-lg bg-slate-900 hover:text-white hover:bg-slate-800 transition"><Facebook className="w-4 h-4" /></a>
              <a href="#" className="p-2 rounded-lg bg-slate-900 hover:text-white hover:bg-slate-800 transition"><Instagram className="w-4 h-4" /></a>
              <a href="#" className="p-2 rounded-lg bg-slate-900 hover:text-white hover:bg-slate-800 transition"><Twitter className="w-4 h-4" /></a>
              <a href="#" className="p-2 rounded-lg bg-slate-900 hover:text-white hover:bg-slate-800 transition"><Linkedin className="w-4 h-4" /></a>
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-[11px] text-slate-500 gap-4">
          <div>
            © {new Date().getFullYear()} Ride N Repair Technologies Pvt. Ltd. All rights reserved.
          </div>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-slate-300">Privacy Policy</a>
            <a href="#" className="hover:text-slate-300">Terms of Service</a>
            <a href="#" className="hover:text-slate-300">Refund Policy</a>
            <a href="#" className="hover:text-slate-300">Mechanic Onboarding</a>
          </div>
        </div>

      </div>
    </footer>
  );
};
