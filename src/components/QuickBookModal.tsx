import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export const QuickBookModal: React.FC = () => {
  const { isQuickBookingOpen, setIsQuickBookingOpen } = useApp();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [vehicleName, setVehicleName] = useState('');
  const [vehicleNo, setVehicleNo] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isQuickBookingOpen) return null;

  const whatsappNumbers = ['8489770824', '9360496101'];

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const msg = `Quick Booking Request%0AName: ${encodeURIComponent(name)}%0APhone: ${encodeURIComponent(phone)}%0AVehicle: ${encodeURIComponent(vehicleName)}%0ARegistration: ${encodeURIComponent(vehicleNo)}`;

    // Open WhatsApp chat for both numbers in new tabs (adds country code +91)
    whatsappNumbers.forEach((n) => {
      const url = `https://wa.me/91${n}?text=${msg}`;
      window.open(url, '_blank');
    });

    setSubmitted(true);
    setTimeout(() => {
      setIsQuickBookingOpen(false);
      setSubmitted(false);
      setName('');
      setPhone('');
      setVehicleName('');
      setVehicleNo('');
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60">
      <div className="w-full max-w-md bg-[#0a0a0c] border border-white/10 rounded-2xl p-6 text-slate-100">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold">Quick Book Now</h3>
          <button onClick={() => setIsQuickBookingOpen(false)} className="text-slate-400">✕</button>
        </div>

        {submitted ? (
          <div className="text-center py-6">
            <div className="font-bold text-emerald-400">Message sent to WhatsApp</div>
            <div className="text-xs text-slate-400 mt-2">We opened WhatsApp chat(s) for the numbers below:</div>
            <div className="mt-3 text-sm font-mono text-white">{whatsappNumbers.join(' + ')}</div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label className="text-xs text-slate-300">Name</label>
              <input required value={name} onChange={(e) => setName(e.target.value)} className="w-full mt-1 px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-sm" />
            </div>

            <div>
              <label className="text-xs text-slate-300">Phone</label>
              <input required value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full mt-1 px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-sm" />
            </div>

            <div>
              <label className="text-xs text-slate-300">Vehicle Name</label>
              <input required value={vehicleName} onChange={(e) => setVehicleName(e.target.value)} className="w-full mt-1 px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-sm" />
            </div>

            <div>
              <label className="text-xs text-slate-300">Vehicle No</label>
              <input required value={vehicleNo} onChange={(e) => setVehicleNo(e.target.value)} className="w-full mt-1 px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-sm" />
            </div>

            <div className="mt-2 text-sm font-mono text-white text-center">
              {whatsappNumbers.join(' + ')}
            </div>

            <div className="pt-3">
              <button type="submit" className="w-full px-4 py-2 rounded-xl bg-blue-600 text-white font-bold">Send via WhatsApp</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
