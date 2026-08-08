import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import {
  MapPin,
  PhoneCall,
  MessageSquare,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Navigation,
  X,
  User,
  Wrench,
  AlertCircle,
} from 'lucide-react';

export const LiveTrackingModal: React.FC = () => {
  const { bookings, activeTrackingBookingId, setActiveTrackingBookingId } = useApp();

  const booking = bookings.find((b) => b.id === activeTrackingBookingId);

  // Simulated GPS movement counter
  const [eta, setEta] = useState(booking?.estimatedArrivalMinutes || 14);

  useEffect(() => {
    if (!booking) return;
    const interval = setInterval(() => {
      setEta((prev) => (prev > 1 ? prev - 1 : 1));
    }, 15000); // decrement ETA periodically for realistic live simulation
    return () => clearInterval(interval);
  }, [booking]);

  if (!booking) return null;

  const mechanic = booking.mechanic;

  const statusSteps = [
    { id: 'MECHANIC_ASSIGNED', label: 'Mechanic Assigned', desc: 'Technician confirmed request' },
    { id: 'EN_ROUTE', label: 'En Route To You', desc: 'Mechanic is driving to doorstep' },
    { id: 'ARRIVED', label: 'Arrived At Location', desc: 'Mechanic has reached your parking' },
    { id: 'INSPECTION', label: 'Bike Inspection', desc: '35-point safety check running' },
    { id: 'IN_PROGRESS', label: 'Service In Progress', desc: 'Executing requested repairs' },
    { id: 'COMPLETED', label: 'Service Completed', desc: '30-day warranty activated' },
  ];

  const currentStepIdx = statusSteps.findIndex((s) => s.id === booking.status);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-xl animate-in fade-in">
      <div className="bg-[#0a0a0c] border border-white/10 rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl relative flex flex-col max-h-[92vh]">
        
        {/* Header Bar */}
        <div className="p-4 bg-[#050505] border-b border-white/10 flex items-center justify-between text-white">
          <div className="flex items-center space-x-3">
            <div className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </div>
            <div>
              <h3 className="font-bold text-sm text-white flex items-center gap-2">
                <span>Live Mechanic Tracking</span>
                <span className="text-xs text-blue-400 bg-blue-950 px-2 py-0.5 rounded border border-blue-800">
                  #{booking.id}
                </span>
              </h3>
              <p className="text-[11px] text-slate-400">Doorstep Arrival ETA: {eta} Mins</p>
            </div>
          </div>

          <button
            onClick={() => setActiveTrackingBookingId(null)}
            className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Simulated Map Canvas */}
        <div className="relative h-64 bg-slate-950 overflow-hidden border-b border-slate-800">
          
          {/* Stylized Dark Map Grid Vector SVG Graphics */}
          <svg className="absolute inset-0 w-full h-full opacity-30" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#3b82f6" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
            {/* Roads */}
            <path d="M 0 100 Q 150 120 300 80 T 600 150" fill="none" stroke="#475569" strokeWidth="12" />
            <path d="M 120 0 Q 140 180 200 300" fill="none" stroke="#475569" strokeWidth="10" />
            <path d="M 0 100 Q 150 120 300 80 T 600 150" fill="none" stroke="#3b82f6" strokeWidth="2" strokeDasharray="6 4" />
          </svg>

          {/* Customer Location Pin */}
          <div className="absolute top-[45%] right-[25%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-10 animate-pulse">
            <div className="px-2 py-1 bg-blue-600 text-white text-[10px] font-bold rounded shadow-lg mb-1 whitespace-nowrap border border-blue-400">
              📍 Your Doorstep Location
            </div>
            <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-2xl ring-4 ring-blue-500/30">
              <MapPin className="w-4 h-4 fill-white" />
            </div>
          </div>

          {/* Animated Mechanic GPS Marker moving towards customer */}
          <div className="absolute top-[52%] left-[28%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-20 transition-all duration-1000">
            <div className="px-2 py-1 bg-emerald-600 text-white text-[10px] font-bold rounded shadow-lg mb-1 whitespace-nowrap border border-emerald-400 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-white animate-ping"></span>
              <span>{mechanic?.name || 'Mechanic'} ({eta} m)</span>
            </div>
            <div className="w-10 h-10 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center shadow-2xl ring-4 ring-emerald-400/40">
              <Navigation className="w-5 h-5 fill-slate-950 transform rotate-45" />
            </div>
          </div>

          {/* Map Floating Controls */}
          <div className="absolute bottom-3 left-3 bg-slate-900/90 border border-slate-800 text-[10px] text-slate-300 px-3 py-1.5 rounded-xl backdrop-blur-md">
            📍 Location: {booking.location.address}
          </div>
        </div>

        {/* Content Body */}
        <div className="p-5 overflow-y-auto space-y-6 flex-1 text-slate-200">
          
          {/* Mechanic Card */}
          {mechanic && (
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <img
                  src={mechanic.photo}
                  alt={mechanic.name}
                  referrerPolicy="no-referrer"
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-blue-500/30"
                />
                <div>
                  <h4 className="font-bold text-white text-sm">{mechanic.name}</h4>
                  <div className="text-xs text-slate-400 flex items-center gap-2 mt-0.5">
                    <span className="text-amber-400 font-semibold">★ {mechanic.rating}</span>
                    <span>•</span>
                    <span>{mechanic.vehicle}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <a
                  href={`tel:${mechanic.phone}`}
                  className="p-2.5 rounded-xl bg-emerald-600/20 border border-emerald-500/40 text-emerald-400 hover:bg-emerald-600 hover:text-white transition flex items-center space-x-1 text-xs font-semibold"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span className="hidden sm:inline">Call</span>
                </a>
              </div>
            </div>
          )}

          {/* Service Timeline Progress */}
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">
              Real-Time Service Progress
            </h4>

            <div className="space-y-4 relative before:absolute before:left-3.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-800">
              {statusSteps.map((step, idx) => {
                const isPassed = idx <= currentStepIdx;
                const isCurrent = idx === currentStepIdx;

                return (
                  <div key={step.id} className="relative pl-9 flex items-start justify-between">
                    <div
                      className={`absolute left-0 top-0.5 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold z-10 transition ${
                        isPassed
                          ? 'bg-blue-600 text-white ring-4 ring-blue-600/20'
                          : 'bg-slate-800 text-slate-500'
                      }`}
                    >
                      {isPassed ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                    </div>

                    <div>
                      <div
                        className={`text-xs font-bold ${
                          isCurrent ? 'text-blue-400' : isPassed ? 'text-white' : 'text-slate-500'
                        }`}
                      >
                        {step.label}
                      </div>
                      <div className="text-[11px] text-slate-400">{step.desc}</div>
                    </div>

                    {isCurrent && (
                      <span className="text-[10px] font-bold text-blue-400 bg-blue-950 px-2 py-0.5 rounded border border-blue-800 animate-pulse">
                        In Progress
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Booking Info Box */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-2">
            <div className="flex justify-between">
              <span className="text-slate-400">Bike Serviced:</span>
              <span className="font-bold text-white">
                {booking.vehicle.brand} {booking.vehicle.model} ({booking.vehicle.registrationNumber})
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Selected Services:</span>
              <span className="font-bold text-white">{booking.serviceNames.join(', ')}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Payment Status:</span>
              <span className="font-bold text-emerald-400">
                ₹{booking.payment.finalAmount} ({booking.payment.status})
              </span>
            </div>
          </div>

        </div>

        {/* Footer actions */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex justify-between items-center">
          <span className="text-xs text-slate-400">Need help? 24x7 Helpline: 1800-RNR-CARE</span>
          <button
            onClick={() => setActiveTrackingBookingId(null)}
            className="px-4 py-2 rounded-xl bg-slate-800 text-slate-200 text-xs font-bold hover:bg-slate-700"
          >
            Close Tracking
          </button>
        </div>

      </div>
    </div>
  );
};
