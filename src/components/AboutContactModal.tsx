import React, { useState } from 'react';
import { Wrench, PhoneCall, Mail, MapPin, CheckCircle2, X } from 'lucide-react';

interface AboutContactModalProps {
  initialTab?: 'about' | 'contact';
  onClose: () => void;
}

export const AboutContactModal: React.FC<AboutContactModalProps> = ({
  initialTab = 'about',
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'about' | 'contact'>(initialTab);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmitContact = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-in fade-in">
      <div className="bg-[#0a0a0c] border border-white/10 rounded-3xl max-w-xl w-full overflow-hidden shadow-2xl relative text-slate-100 flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-4 bg-[#050505] border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setActiveTab('about')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                activeTab === 'about' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              About Ride N Repair
            </button>
            <button
              onClick={() => setActiveTab('contact')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                activeTab === 'contact' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Contact Support
            </button>
          </div>

          <button onClick={onClose} className="p-1 text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs text-slate-300 leading-relaxed">
          {activeTab === 'about' ? (
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center font-black">
                  <Wrench className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Ride N Repair Platform</h3>
                  <div className="text-[11px] text-blue-400 font-semibold">
                    Doorstep Petrol Bike Service Pioneer
                  </div>
                </div>
              </div>

              <p>
                Founded with a mission to bring complete honesty, speed, and comfort to petrol bike maintenance, Ride N Repair connects petrol bike owners directly with background-verified mechanics who arrive right at your driveway with genuine OEM parts and specialized mobile toolkits.
              </p>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="font-bold text-white text-sm mb-1">Our Core Promises:</div>
                <div className="flex items-center space-x-2 text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>100% Upfront Transparent Fixed Rates (No Labor Shock)</span>
                </div>
                <div className="flex items-center space-x-2 text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>30-Day No-Questions-Asked Service Guarantee</span>
                </div>
                <div className="flex items-center space-x-2 text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Live GPS Tracking & Before/After Job Photos</span>
                </div>
              </div>
            </div>
          ) : (
            <div>
              {submitted ? (
                <div className="text-center py-8 space-y-3">
                  <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                  <h3 className="text-lg font-bold text-white">Message Received!</h3>
                  <p className="text-xs text-slate-400">
                    Our 24x7 doorstep support team will contact you within 15 minutes.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmitContact} className="space-y-3">
                  <div>
                    <label className="block text-slate-300 font-bold mb-1">Your Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Anish Verma"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-bold mb-1">Phone Number</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98450 12345"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-bold mb-1">How Can We Help?</label>
                    <textarea
                      rows={3}
                      required
                      placeholder="e.g. Inquiring about corporate fleet bike servicing..."
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white text-xs"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-blue-600 font-bold text-white text-xs shadow-lg"
                  >
                    Send Message To Customer Care
                  </button>
                </form>
              )}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
