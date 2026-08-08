import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  User,
  Bike,
  Wrench,
  Calendar,
  Clock,
  ShieldCheck,
  FileText,
  Plus,
  Trash2,
  Navigation,
  CheckCircle2,
  Star,
  Download,
  AlertCircle,
} from 'lucide-react';

export const UserDashboard: React.FC = () => {
  const {
    currentUser,
    updateUserProfile,
    userVehicles,
    addUserVehicle,
    removeUserVehicle,
    bookings,
    cancelBooking,
    setActiveTrackingBookingId,
    openBookingWizard,
    showToast,
  } = useApp();

  const [activeTab, setActiveTab] = useState<
    'bookings' | 'vehicles' | 'history' | 'invoices' | 'profile'
  >('bookings');

  // Add vehicle modal
  const [showAddVehicle, setShowAddVehicle] = useState(false);
  const [newVehType, setNewVehType] = useState<'bike'>('bike');
  const [newVehBrand, setNewVehBrand] = useState('Royal Enfield');
  const [newVehModel, setNewVehModel] = useState('Classic 350');
  const [newVehReg, setNewVehReg] = useState('KA-01-MJ-8821');

  // Selected Invoice Modal
  const [selectedInvoice, setSelectedInvoice] = useState<any>(null);

  const handleCreateVehicle = (e: React.FormEvent) => {
    e.preventDefault();
    addUserVehicle({
      type: newVehType,
      brand: newVehBrand,
      model: newVehModel,
      registrationNumber: newVehReg,
    });
    setShowAddVehicle(false);
  };

  const activeBookings = bookings.filter((b) => b.status !== 'COMPLETED' && b.status !== 'CANCELLED');
  const completedBookings = bookings.filter((b) => b.status === 'COMPLETED');

  return (
    <section id="dashboard" className="py-24 bg-[#050505] text-white min-h-screen">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Top User Greeting Banner */}
        <div className="p-6 rounded-3xl bg-gradient-to-r from-blue-950/60 via-[#0a0a0c] to-indigo-950/60 border border-white/10 shadow-2xl mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4 backdrop-blur-xl">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-black text-2xl ring-4 ring-blue-500/20 shadow-lg">
              {currentUser.name.charAt(0)}
            </div>
            <div>
              <div className="text-xs font-bold text-blue-400 uppercase tracking-widest">
                Customer Portal
              </div>
              <h1 className="text-2xl font-black text-white">{currentUser.name}</h1>
              <p className="text-xs text-slate-400">{currentUser.email} • {currentUser.phone}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => openBookingWizard()}
              className="px-5 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-xs shadow-lg hover:from-blue-500 transition flex items-center space-x-1.5"
            >
              <Wrench className="w-4 h-4" />
              <span>Book New Service</span>
            </button>
          </div>
        </div>

        {/* Dashboard Navigation Tabs */}
        <div className="flex items-center space-x-2 border-b border-slate-800 pb-4 mb-8 overflow-x-auto text-xs font-bold">
          <button
            onClick={() => setActiveTab('bookings')}
            className={`px-4 py-2.5 rounded-xl transition flex items-center space-x-2 shrink-0 ${
              activeTab === 'bookings'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'text-slate-400 hover:text-white bg-slate-900'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>Active Bookings ({activeBookings.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('vehicles')}
            className={`px-4 py-2.5 rounded-xl transition flex items-center space-x-2 shrink-0 ${
              activeTab === 'vehicles'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'text-slate-400 hover:text-white bg-slate-900'
            }`}
          >
            <Bike className="w-4 h-4" />
            <span>My Vehicles ({userVehicles.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('history')}
            className={`px-4 py-2.5 rounded-xl transition flex items-center space-x-2 shrink-0 ${
              activeTab === 'history'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'text-slate-400 hover:text-white bg-slate-900'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Service History & Warranty ({completedBookings.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('invoices')}
            className={`px-4 py-2.5 rounded-xl transition flex items-center space-x-2 shrink-0 ${
              activeTab === 'invoices'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'text-slate-400 hover:text-white bg-slate-900'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Tax Invoices</span>
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`px-4 py-2.5 rounded-xl transition flex items-center space-x-2 shrink-0 ${
              activeTab === 'profile'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'text-slate-400 hover:text-white bg-slate-900'
            }`}
          >
            <User className="w-4 h-4" />
            <span>Profile Settings</span>
          </button>
        </div>

        {/* TAB 1: ACTIVE BOOKINGS */}
        {activeTab === 'bookings' && (
          <div className="space-y-6">
            {activeBookings.length === 0 ? (
              <div className="p-12 text-center bg-slate-900/60 border border-slate-800 rounded-3xl space-y-4">
                <Wrench className="w-12 h-12 text-slate-600 mx-auto" />
                <h3 className="text-lg font-bold text-slate-300">No Active Service Bookings</h3>
                <p className="text-xs text-slate-500">Need a doorstep repair or periodic service?</p>
                <button
                  onClick={() => openBookingWizard()}
                  className="px-6 py-3 rounded-xl bg-blue-600 text-white font-bold text-xs"
                >
                  Book Service Now
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {activeBookings.map((b) => (
                  <div
                    key={b.id}
                    className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-4 relative flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-3">
                        <span className="text-xs font-bold text-blue-400 bg-blue-950 px-2.5 py-1 rounded border border-blue-800">
                          #{b.id}
                        </span>
                        <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950 px-2.5 py-1 rounded border border-emerald-800 uppercase animate-pulse">
                          {b.status.replace('_', ' ')}
                        </span>
                      </div>

                      <h3 className="text-base font-bold text-white">
                        {b.vehicle.brand} {b.vehicle.model} ({b.vehicle.registrationNumber})
                      </h3>
                      <p className="text-xs text-slate-400 mt-1">
                        Services: <strong>{b.serviceNames.join(', ')}</strong>
                      </p>

                      <div className="mt-4 p-3 rounded-2xl bg-slate-950 border border-slate-800 text-xs space-y-1.5 text-slate-300">
                        <div className="flex justify-between">
                          <span className="text-slate-500">Scheduled Date:</span>
                          <span>{b.date} @ {b.timeSlot}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500">Doorstep Location:</span>
                          <span className="text-right truncate max-w-[200px]">{b.location.address}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500">Total Price:</span>
                          <span className="font-bold text-emerald-400">₹{b.payment.finalAmount} ({b.payment.status})</span>
                        </div>
                      </div>

                      {b.mechanic && (
                        <div className="mt-3 p-3 rounded-2xl bg-blue-950/40 border border-blue-800/50 flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <img
                              src={b.mechanic.photo}
                              alt={b.mechanic.name}
                              referrerPolicy="no-referrer"
                              className="w-10 h-10 rounded-full object-cover"
                            />
                            <div>
                              <div className="font-bold text-white text-xs">{b.mechanic.name}</div>
                              <div className="text-[10px] text-slate-400">{b.mechanic.phone}</div>
                            </div>
                          </div>
                          <span className="text-[10px] text-blue-300 font-bold bg-blue-900 px-2 py-1 rounded">
                            Verified Tech
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="pt-3 border-t border-slate-800 flex gap-2">
                      <button
                        onClick={() => setActiveTrackingBookingId(b.id)}
                        className="flex-1 py-2.5 rounded-xl bg-blue-600 text-white font-bold text-xs shadow hover:bg-blue-500 transition flex items-center justify-center space-x-1"
                      >
                        <Navigation className="w-3.5 h-3.5" />
                        <span>Live Track GPS</span>
                      </button>

                      <button
                        onClick={() => cancelBooking(b.id)}
                        className="py-2.5 px-3 rounded-xl bg-slate-800 text-rose-400 hover:bg-rose-950/50 text-xs font-semibold"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: MY VEHICLES */}
        {activeTab === 'vehicles' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-bold text-white">Your Saved Garage</h2>
              <button
                onClick={() => setShowAddVehicle(true)}
                className="px-4 py-2 rounded-xl bg-blue-600 text-white font-bold text-xs flex items-center space-x-1"
              >
                <Plus className="w-4 h-4" />
                <span>Add Vehicle</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {userVehicles.map((v) => (
                <div
                  key={v.id}
                  className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-4 relative"
                >
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-blue-600/20 text-blue-400 flex items-center justify-center">
                      <Bike className="w-6 h-6" />
                    </div>

                    <button
                      onClick={() => removeUserVehicle(v.id)}
                      className="p-2 text-slate-500 hover:text-rose-400 transition"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-white">{v.brand} {v.model}</h3>
                    <div className="text-xs text-blue-400 font-mono font-bold uppercase mt-1">
                      {v.registrationNumber}
                    </div>
                  </div>

                  <button
                    onClick={() =>
                      openBookingWizard({
                        vehicleType: v.type,
                        brand: v.brand,
                      })
                    }
                    className="w-full py-2.5 rounded-xl bg-slate-800 text-slate-200 text-xs font-bold hover:bg-slate-700 transition"
                  >
                    Book Service For This Vehicle
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: SERVICE HISTORY & WARRANTY */}
        {activeTab === 'history' && (
          <div className="space-y-6">
            <h2 className="text-lg font-bold text-white">Past Service History & Active Warranties</h2>

            <div className="space-y-4">
              {completedBookings.map((b) => (
                <div
                  key={b.id}
                  className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-bold text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                        SERVICED & COMPLETED
                      </span>
                      <span className="text-xs text-slate-400">#{b.id}</span>
                    </div>

                    <h3 className="text-base font-bold text-white">
                      {b.vehicle.brand} {b.vehicle.model} ({b.vehicle.registrationNumber})
                    </h3>
                    <p className="text-xs text-slate-300">
                      Services Executed: {b.serviceNames.join(', ')}
                    </p>
                    <p className="text-[11px] text-slate-500">Completed On: {b.updatedAt}</p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 text-right">
                    <div className="text-xs text-emerald-400 font-bold flex items-center justify-end gap-1">
                      <ShieldCheck className="w-4 h-4" />
                      <span>30-Day Warranty Active</span>
                    </div>
                    <button
                      onClick={() => setSelectedInvoice(b)}
                      className="px-4 py-2 rounded-xl bg-slate-800 text-white text-xs font-bold hover:bg-slate-700 transition flex items-center justify-end space-x-1"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>View Tax Invoice</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: TAX INVOICES */}
        {activeTab === 'invoices' && (
          <div className="space-y-6">
            <h2 className="text-lg font-bold text-white">Tax Invoices</h2>

            <div className="space-y-3">
              {bookings.map((b) => (
                <div
                  key={b.id}
                  className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between text-xs"
                >
                  <div>
                    <div className="font-bold text-white">Invoice #{b.id}</div>
                    <div className="text-slate-400">{b.date} • {b.vehicle.brand} {b.vehicle.model}</div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <span className="font-bold text-emerald-400">₹{b.payment.finalAmount}</span>
                    <button
                      onClick={() => setSelectedInvoice(b)}
                      className="px-3 py-1.5 rounded-lg bg-blue-600 text-white font-bold hover:bg-blue-500 flex items-center gap-1"
                    >
                      <Download className="w-3 h-3" />
                      <span>Download</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: PROFILE */}
        {activeTab === 'profile' && (
          <div className="max-w-lg bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-4 text-xs">
            <h2 className="text-lg font-bold text-white mb-2">Profile Details</h2>

            <div>
              <label className="block text-slate-300 font-bold mb-1">Full Name</label>
              <input
                type="text"
                value={currentUser.name}
                onChange={(e) => updateUserProfile({ ...currentUser, name: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-bold mb-1">Email Address</label>
              <input
                type="email"
                value={currentUser.email}
                onChange={(e) => updateUserProfile({ ...currentUser, email: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-bold mb-1">Phone Number</label>
              <input
                type="text"
                value={currentUser.phone}
                onChange={(e) => updateUserProfile({ ...currentUser, phone: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white"
              />
            </div>

            <button
              onClick={() => showToast('Profile saved successfully!')}
              className="w-full py-3 rounded-xl bg-blue-600 text-white font-bold text-xs"
            >
              Save Changes
            </button>
          </div>
        )}

      </div>

      {/* Add Vehicle Modal */}
      {showAddVehicle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
          <form
            onSubmit={handleCreateVehicle}
            className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-md w-full space-y-4 text-xs text-white"
          >
            <div className="flex justify-between items-center pb-2 border-b border-slate-800">
              <h3 className="font-bold text-base">Add Vehicle To Garage</h3>
              <button type="button" onClick={() => setShowAddVehicle(false)}>✕</button>
            </div>

            <div>
              <label className="block text-slate-300 font-bold mb-1">Vehicle Type</label>
              <select
                value={newVehType}
                onChange={(e) => setNewVehType(e.target.value as 'bike')}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5"
              >
                <option value="bike">Petrol Bike</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-300 font-bold mb-1">Brand</label>
              <input
                type="text"
                value={newVehBrand}
                onChange={(e) => setNewVehBrand(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-bold mb-1">Model</label>
              <input
                type="text"
                value={newVehModel}
                onChange={(e) => setNewVehModel(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-bold mb-1">Registration Number</label>
              <input
                type="text"
                value={newVehReg}
                onChange={(e) => setNewVehReg(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 uppercase"
              />
            </div>

            <button type="submit" className="w-full py-3 rounded-xl bg-blue-600 font-bold text-white">
              Save Vehicle
            </button>
          </form>
        </div>
      )}

      {/* Invoice Printable View Modal */}
      {selectedInvoice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-lg w-full space-y-4 text-xs text-slate-200">
            <div className="flex justify-between items-center pb-2 border-b border-slate-800">
              <h3 className="font-bold text-base text-white">Tax Invoice #{selectedInvoice.id}</h3>
              <button onClick={() => setSelectedInvoice(null)}>✕</button>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 space-y-2 border border-slate-800">
              <div className="text-sm font-black text-white">Ride N Repair Technologies</div>
              <div>Customer: {selectedInvoice.userName} ({selectedInvoice.userPhone})</div>
              <div>Vehicle: {selectedInvoice.vehicle.brand} {selectedInvoice.vehicle.model}</div>
              <div>Reg No: {selectedInvoice.vehicle.registrationNumber}</div>
              <div>Date: {selectedInvoice.date}</div>
            </div>

            <div>
              <div className="font-bold text-white mb-2">Service Line Items:</div>
              {selectedInvoice.serviceNames.map((name: string, i: number) => (
                <div key={i} className="flex justify-between py-1 border-b border-slate-800/80">
                  <span>{name}</span>
                  <span className="font-bold text-white">Included</span>
                </div>
              ))}
            </div>

            <div className="flex justify-between text-base font-black text-white pt-2 border-t border-slate-800">
              <span>Total Paid:</span>
              <span className="text-emerald-400">₹{selectedInvoice.payment.finalAmount}</span>
            </div>

            <button
              onClick={() => {
                window.print();
              }}
              className="w-full py-3 rounded-xl bg-blue-600 text-white font-bold"
            >
              Print Tax Invoice
            </button>
          </div>
        </div>
      )}

    </section>
  );
};
