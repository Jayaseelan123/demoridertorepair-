import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MECHANICS, CITIES, COUPONS } from '../../data/mockData';
import {
  ShieldAlert,
  Users,
  Wrench,
  DollarSign,
  TrendingUp,
  MapPin,
  Tag,
  CheckCircle2,
  Edit2,
  Plus,
  Search,
  Filter,
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const {
    bookings,
    servicesList,
    updateServicePrice,
    assignMechanicToBooking,
    updateBookingStatus,
    showToast,
  } = useApp();

  const [activeTab, setActiveTab] = useState<
    'overview' | 'bookings' | 'services' | 'mechanics' | 'cities' | 'coupons'
  >('overview');

  // Edit price state
  const [editingServiceId, setEditingServiceId] = useState<string | null>(null);
  const [newPriceVal, setNewPriceVal] = useState<number>(0);

  // New coupon form
  const [newCode, setNewCode] = useState('SUMMER20');
  const [newDiscPct, setNewDiscPct] = useState(20);

  const totalRevenue = bookings.reduce((acc, b) => acc + b.payment.finalAmount, 0);

  return (
    <section id="admin-panel" className="py-24 bg-[#050505] text-white min-h-screen">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Admin Header */}
        <div className="p-6 rounded-3xl bg-[#0a0a0c] border border-white/10 shadow-2xl mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4 backdrop-blur-xl">
          <div>
            <div className="text-xs font-bold text-purple-400 bg-purple-950 px-2.5 py-1 rounded-md border border-purple-800 inline-block mb-1">
              ADMIN CONTROL CENTER
            </div>
            <h1 className="text-2xl font-black text-white">Ride N Repair Platform Operations</h1>
            <p className="text-xs text-slate-400">Manage bookings, verified mechanics, pricing catalog & revenue</p>
          </div>

          <div className="flex items-center space-x-3">
            <span className="text-xs text-emerald-400 font-bold bg-emerald-950 px-3 py-1.5 rounded-xl border border-emerald-800">
              ● All Systems Operational
            </span>
          </div>
        </div>

        {/* Overview Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
            <div className="text-xs text-slate-400 font-bold">Total Platform Revenue</div>
            <div className="text-2xl font-black text-emerald-400">₹{totalRevenue.toLocaleString()}</div>
            <div className="text-[10px] text-emerald-500 font-semibold">+18.4% from last week</div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
            <div className="text-xs text-slate-400 font-bold">Total Bookings</div>
            <div className="text-2xl font-black text-white">{bookings.length}</div>
            <div className="text-[10px] text-blue-400 font-semibold">100% Doorstep Fulfilled</div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
            <div className="text-xs text-slate-400 font-bold">Active Mechanics</div>
            <div className="text-2xl font-black text-indigo-400">{MECHANICS.length} Technicians</div>
            <div className="text-[10px] text-slate-400 font-semibold">100% Background Verified</div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
            <div className="text-xs text-slate-400 font-bold">Customer CSAT</div>
            <div className="text-2xl font-black text-amber-400">4.9 / 5.0 ★</div>
            <div className="text-[10px] text-slate-400 font-semibold">Based on 15,200 reviews</div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center space-x-2 border-b border-slate-800 pb-4 mb-8 overflow-x-auto text-xs font-bold">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2.5 rounded-xl transition ${
              activeTab === 'overview' ? 'bg-purple-600 text-white' : 'bg-slate-900 text-slate-400'
            }`}
          >
            Overview & Bookings
          </button>
          <button
            onClick={() => setActiveTab('services')}
            className={`px-4 py-2.5 rounded-xl transition ${
              activeTab === 'services' ? 'bg-purple-600 text-white' : 'bg-slate-900 text-slate-400'
            }`}
          >
            Services Catalog & Prices
          </button>
          <button
            onClick={() => setActiveTab('mechanics')}
            className={`px-4 py-2.5 rounded-xl transition ${
              activeTab === 'mechanics' ? 'bg-purple-600 text-white' : 'bg-slate-900 text-slate-400'
            }`}
          >
            Mechanics Directory
          </button>
          <button
            onClick={() => setActiveTab('cities')}
            className={`px-4 py-2.5 rounded-xl transition ${
              activeTab === 'cities' ? 'bg-purple-600 text-white' : 'bg-slate-900 text-slate-400'
            }`}
          >
            Cities & Coverage
          </button>
          <button
            onClick={() => setActiveTab('coupons')}
            className={`px-4 py-2.5 rounded-xl transition ${
              activeTab === 'coupons' ? 'bg-purple-600 text-white' : 'bg-slate-900 text-slate-400'
            }`}
          >
            Coupons & Discounts
          </button>
        </div>

        {/* TAB 1: BOOKINGS MANAGEMENT */}
        {activeTab === 'overview' && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-white">All Customer Bookings</h2>

            <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-950 text-slate-400 uppercase font-bold text-[10px] border-b border-slate-800">
                  <tr>
                    <th className="p-4">Booking ID</th>
                    <th className="p-4">Customer</th>
                    <th className="p-4">Vehicle</th>
                    <th className="p-4">Services</th>
                    <th className="p-4">Amount</th>
                    <th className="p-4">Assigned Mechanic</th>
                    <th className="p-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80">
                  {bookings.map((b) => (
                    <tr key={b.id} className="hover:bg-slate-800/40">
                      <td className="p-4 font-bold text-blue-400">#{b.id}</td>
                      <td className="p-4 font-semibold text-white">
                        {b.userName}
                        <div className="text-[10px] text-slate-500">{b.userPhone}</div>
                      </td>
                      <td className="p-4 font-medium text-slate-200">
                        {b.vehicle.brand} {b.vehicle.model}
                        <div className="text-[10px] text-slate-400 uppercase">{b.vehicle.registrationNumber}</div>
                      </td>
                      <td className="p-4 max-w-[200px] truncate">{b.serviceNames.join(', ')}</td>
                      <td className="p-4 font-bold text-emerald-400">₹{b.payment.finalAmount}</td>
                      <td className="p-4">
                        <select
                          value={b.mechanicId || MECHANICS[0].id}
                          onChange={(e) => assignMechanicToBooking(b.id, e.target.value)}
                          className="bg-slate-950 border border-slate-800 rounded px-2 py-1 text-xs text-slate-200"
                        >
                          {MECHANICS.map((m) => (
                            <option key={m.id} value={m.id}>
                              {m.name} ({m.rating}★)
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="p-4">
                        <span className="px-2 py-1 rounded bg-blue-950 text-blue-400 font-bold text-[10px] border border-blue-800">
                          {b.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: SERVICE CATALOG & PRICES */}
        {activeTab === 'services' && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-white">Service Packages & Pricing Control</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {servicesList.map((s) => (
                <div key={s.id} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[10px] font-bold text-blue-400 uppercase bg-blue-950 px-2 py-0.5 rounded">
                        {s.category.toUpperCase()} • {s.subCategory}
                      </span>
                      <h3 className="font-bold text-white text-base mt-1">{s.title}</h3>
                    </div>

                    <div className="text-right">
                      <div className="text-lg font-black text-white">₹{s.price}</div>
                      <div className="text-xs text-slate-500 line-through">₹{s.originalPrice}</div>
                    </div>
                  </div>

                  {editingServiceId === s.id ? (
                    <div className="flex gap-2">
                      <input
                        type="number"
                        value={newPriceVal}
                        onChange={(e) => setNewPriceVal(Number(e.target.value))}
                        className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-white"
                      />
                      <button
                        onClick={() => {
                          updateServicePrice(s.id, newPriceVal);
                          setEditingServiceId(null);
                        }}
                        className="px-3 py-1.5 bg-emerald-600 text-white font-bold rounded-xl text-xs"
                      >
                        Save
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => {
                        setEditingServiceId(s.id);
                        setNewPriceVal(s.price);
                      }}
                      className="px-3 py-1.5 bg-slate-800 text-slate-300 hover:text-white rounded-xl text-xs font-semibold flex items-center gap-1"
                    >
                      <Edit2 className="w-3 h-3" /> Update Base Price
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: MECHANICS DIRECTORY */}
        {activeTab === 'mechanics' && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-white">Verified Mechanics Onboarding & Roster</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {MECHANICS.map((m) => (
                <div key={m.id} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                  <div className="flex items-center space-x-3">
                    <img src={m.photo} alt={m.name} className="w-12 h-12 rounded-xl object-cover" />
                    <div>
                      <h3 className="font-bold text-white text-sm">{m.name}</h3>
                      <div className="text-xs text-slate-400">{m.phone}</div>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-950 text-xs space-y-1 text-slate-300">
                    <div className="flex justify-between">
                      <span>Total Jobs Done:</span>
                      <span className="font-bold text-white">{m.totalJobs}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Rating:</span>
                      <span className="font-bold text-amber-400">★ {m.rating}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Specialization:</span>
                      <span className="font-bold uppercase text-blue-400">{m.specialization.join(', ')}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: CITIES & COVERAGE */}
        {activeTab === 'cities' && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-white">Active Service Cities</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs">
              {CITIES.map((c) => (
                <div key={c.id} className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                  <div className="font-bold text-white text-sm">{c.name} ({c.state})</div>
                  <div className="text-slate-400 mt-1">{c.activeAreas.length} Active Localities</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: COUPONS */}
        {activeTab === 'coupons' && (
          <div className="space-y-4 max-w-lg">
            <h2 className="text-lg font-bold text-white">Promo Coupons</h2>
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2 text-xs">
              {COUPONS.map((cp, i) => (
                <div key={i} className="flex justify-between p-2 rounded bg-slate-950 font-mono">
                  <span className="font-bold text-blue-400">{cp.code}</span>
                  <span className="text-emerald-400">{cp.discountPercent}% OFF (Max ₹{cp.maxDiscount})</span>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
