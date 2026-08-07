import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { BookingStatus } from '../../types';
import {
  Wrench,
  PhoneCall,
  Navigation,
  CheckCircle2,
  Camera,
  MapPin,
  Clock,
  DollarSign,
  UserCheck,
  Plus,
  AlertCircle,
  Zap,
} from 'lucide-react';

export const MechanicDashboard: React.FC = () => {
  const { bookings, updateBookingStatus, showToast } = useApp();

  // Selected mechanic state (Rajesh Kumar mech-101)
  const [statusToggle, setStatusToggle] = useState<'available' | 'busy' | 'offline'>('available');
  const [selectedBookingId, setSelectedBookingId] = useState<string | null>('RNR-98124');

  // Inspection note and photos simulator state
  const [inspectionNote, setInspectionNote] = useState('All 18 points checked. Chain lube and synthetic engine oil replaced cleanly.');
  const [extraItemName, setExtraItemName] = useState('Front Brake Wire');
  const [extraItemPrice, setExtraItemPrice] = useState(120);

  const activeBooking = bookings.find((b) => b.id === selectedBookingId) || bookings[0];

  const handleStatusChange = (newStatus: BookingStatus) => {
    if (!activeBooking) return;
    updateBookingStatus(activeBooking.id, newStatus, {
      beforePhotos: ['https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=300&auto=format&fit=crop&q=80'],
      afterPhotos: ['https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=300&auto=format&fit=crop&q=80'],
      inspectionNotes: inspectionNote,
    });
  };

  return (
    <section id="mechanic-panel" className="py-24 bg-[#050505] text-white min-h-screen">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Mechanic Header */}
        <div className="p-6 rounded-3xl bg-[#0a0a0c] border border-white/10 shadow-2xl mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4 backdrop-blur-xl">
          <div className="flex items-center space-x-4">
            <img
              src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&auto=format&fit=crop&q=80"
              alt="Rajesh Kumar"
              className="w-16 h-16 rounded-2xl object-cover ring-4 ring-emerald-500/20 shadow-lg"
            />
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-bold text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                  VERIFIED MECHANIC PANEL
                </span>
                <span className="text-xs text-amber-400 font-bold">★ 4.9 (1,420 Jobs)</span>
              </div>
              <h1 className="text-2xl font-black text-white mt-1">Rajesh Kumar</h1>
              <p className="text-xs text-slate-400">Territory: Koramangala & HSR Layout • Vehicle: Hero Splendor</p>
            </div>
          </div>

          {/* Status Toggle & Today Earnings */}
          <div className="flex items-center space-x-4">
            <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 text-right">
              <div className="text-[10px] text-slate-400 uppercase font-bold">Today's Earnings</div>
              <div className="text-xl font-black text-emerald-400">₹2,850 (6 Jobs)</div>
            </div>

            <div className="flex p-1 bg-slate-950 rounded-xl border border-slate-800 text-xs font-bold">
              <button
                onClick={() => {
                  setStatusToggle('available');
                  showToast('You are now ONLINE & receiving doorstep jobs!');
                }}
                className={`px-3 py-1.5 rounded-lg transition ${
                  statusToggle === 'available'
                    ? 'bg-emerald-600 text-white shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Online
              </button>
              <button
                onClick={() => {
                  setStatusToggle('busy');
                  showToast('Status changed to BUSY');
                }}
                className={`px-3 py-1.5 rounded-lg transition ${
                  statusToggle === 'busy'
                    ? 'bg-amber-600 text-white shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Busy
              </button>
            </div>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Assigned Jobs List */}
          <div className="lg:col-span-5 space-y-4">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Wrench className="w-4 h-4 text-blue-400" />
              <span>Assigned Doorstep Jobs ({bookings.length})</span>
            </h2>

            <div className="space-y-3">
              {bookings.map((b) => (
                <div
                  key={b.id}
                  onClick={() => setSelectedBookingId(b.id)}
                  className={`p-4 rounded-2xl border transition cursor-pointer space-y-2 ${
                    selectedBookingId === b.id
                      ? 'bg-blue-600/15 border-blue-500 ring-2 ring-blue-500/30'
                      : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-blue-400">#{b.id}</span>
                    <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                      {b.status.replace('_', ' ')}
                    </span>
                  </div>

                  <h3 className="font-bold text-white text-sm">
                    {b.vehicle.brand} {b.vehicle.model} ({b.vehicle.registrationNumber})
                  </h3>
                  <div className="text-xs text-slate-300 line-clamp-1">
                    Customer: {b.userName} • {b.userPhone}
                  </div>
                  <div className="text-[11px] text-slate-400 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-blue-400 shrink-0" />
                    <span className="truncate">{b.location.address}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Active Job Execution Panel */}
          <div className="lg:col-span-7">
            {activeBooking ? (
              <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl space-y-6">
                
                {/* Header */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                  <div>
                    <span className="text-xs text-blue-400 font-bold">Active Job Control</span>
                    <h2 className="text-xl font-black text-white">
                      #{activeBooking.id} - {activeBooking.vehicle.brand} {activeBooking.vehicle.model}
                    </h2>
                  </div>

                  <a
                    href={`tel:${activeBooking.userPhone}`}
                    className="px-4 py-2 rounded-xl bg-emerald-600 text-white font-bold text-xs flex items-center space-x-1.5"
                  >
                    <PhoneCall className="w-4 h-4" />
                    <span>Call Customer</span>
                  </a>
                </div>

                {/* Customer & Location Box */}
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs space-y-2">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Customer Name:</span>
                    <span className="font-bold text-white">{activeBooking.userName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Address:</span>
                    <span className="font-bold text-white text-right max-w-[250px]">
                      {activeBooking.location.address}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Requested Services:</span>
                    <span className="font-bold text-emerald-400">{activeBooking.serviceNames.join(', ')}</span>
                  </div>
                </div>

                {/* Status Update Buttons */}
                <div>
                  <label className="block text-slate-300 font-bold text-xs uppercase tracking-wider mb-3">
                    Update Service Status
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                    {[
                      { status: 'EN_ROUTE', label: 'En Route To Customer' },
                      { status: 'ARRIVED', label: 'Arrived At Location' },
                      { status: 'INSPECTION', label: 'Start Inspection' },
                      { status: 'IN_PROGRESS', label: 'In Progress' },
                      { status: 'COMPLETED', label: 'Mark Completed' },
                    ].map((st) => (
                      <button
                        key={st.status}
                        onClick={() => handleStatusChange(st.status as BookingStatus)}
                        className={`p-3 rounded-xl border text-center font-bold transition ${
                          activeBooking.status === st.status
                            ? 'bg-blue-600 border-blue-500 text-white shadow-lg'
                            : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                        }`}
                      >
                        {st.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Before & After Photo Upload Simulator */}
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between text-xs font-bold text-white">
                    <span className="flex items-center gap-1">
                      <Camera className="w-4 h-4 text-blue-400" />
                      <span>Before & After Job Photos</span>
                    </span>
                    <button
                      onClick={() => showToast('Simulated camera capture: Photo attached!')}
                      className="text-blue-400 text-[10px] bg-blue-950 px-2 py-1 rounded border border-blue-800"
                    >
                      + Capture Photo
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-[10px]">
                    <div className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-center">
                      <img
                        src="https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=300&auto=format&fit=crop&q=80"
                        alt="Before"
                        className="w-full h-24 object-cover rounded-lg mb-1"
                      />
                      <span className="text-slate-400">Before Inspection</span>
                    </div>

                    <div className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-center">
                      <img
                        src="https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=300&auto=format&fit=crop&q=80"
                        alt="After"
                        className="w-full h-24 object-cover rounded-lg mb-1"
                      />
                      <span className="text-emerald-400 font-bold">After Service</span>
                    </div>
                  </div>
                </div>

                {/* Inspection Notes */}
                <div>
                  <label className="block text-slate-300 font-bold text-xs mb-1">
                    Technician Inspection Notes
                  </label>
                  <textarea
                    value={inspectionNote}
                    onChange={(e) => setInspectionNote(e.target.value)}
                    rows={2}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white"
                  />
                </div>

              </div>
            ) : (
              <div className="p-12 text-center text-slate-500">
                Select a job from the left panel to execute
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
