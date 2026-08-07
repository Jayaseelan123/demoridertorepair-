import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { VEHICLE_BRANDS, SERVICES, COUPONS } from '../data/mockData';
import { RazorpayModal } from './RazorpayModal';
import {
  Bike,
  Car,
  Zap,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  X,
  MapPin,
  Calendar,
  Clock,
  Tag,
  ShieldCheck,
  User,
  Wrench,
  Sparkles,
} from 'lucide-react';

export const BookingWizardModal: React.FC = () => {
  const {
    isBookingModalOpen,
    setIsBookingModalOpen,
    bookingPreselect,
    selectedCity,
    createBooking,
    userVehicles,
    currentUser,
    setActiveTrackingBookingId,
  } = useApp();

  const [step, setStep] = useState<number>(1);

  // Form State
  const [vehicleType, setVehicleType] = useState<'bike' | 'car' | 'ev'>(
    bookingPreselect.vehicleType || 'bike'
  );
  const [selectedBrand, setSelectedBrand] = useState<string>(
    bookingPreselect.brand || 'Royal Enfield'
  );
  const [modelName, setModelName] = useState<string>('Classic 350');
  const [regNumber, setRegNumber] = useState<string>('KA-01-MJ-8821');

  const [selectedServiceIds, setSelectedServiceIds] = useState<string[]>(
    bookingPreselect.serviceId ? [bookingPreselect.serviceId] : ['s-bike-1']
  );

  const [address, setAddress] = useState<string>('24, Indiranagar 100ft Road');
  const [pincode, setPincode] = useState<string>('560038');
  const [landmark, setLandmark] = useState<string>('Near Toit Brewery');

  const [date, setDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [timeSlot, setTimeSlot] = useState<string>('10:00 AM - 11:00 AM');

  // Coupon
  const [couponCode, setCouponCode] = useState<string>('FIRST100');
  const [appliedDiscount, setAppliedDiscount] = useState<number>(150);

  // Razorpay Modal trigger
  const [showRazorpay, setShowRazorpay] = useState<boolean>(false);
  const [completedBooking, setCompletedBooking] = useState<any>(null);

  useEffect(() => {
    if (bookingPreselect.vehicleType) setVehicleType(bookingPreselect.vehicleType);
    if (bookingPreselect.brand) setSelectedBrand(bookingPreselect.brand);
    if (bookingPreselect.serviceId) setSelectedServiceIds([bookingPreselect.serviceId]);
  }, [bookingPreselect]);

  if (!isBookingModalOpen) return null;

  const brands = VEHICLE_BRANDS.filter(
    (b) => vehicleType === 'ev' || b.type === vehicleType || b.type === 'both'
  );

  const services = SERVICES.filter((s) => s.category === vehicleType);

  const selectedServicesList = SERVICES.filter((s) => selectedServiceIds.includes(s.id));
  const basePrice = selectedServicesList.reduce((acc, s) => acc + s.price, 0);
  const finalPrice = Math.max(0, basePrice - appliedDiscount);

  const toggleService = (id: string) => {
    if (selectedServiceIds.includes(id)) {
      if (selectedServiceIds.length > 1) {
        setSelectedServiceIds((prev) => prev.filter((sId) => sId !== id));
      }
    } else {
      setSelectedServiceIds((prev) => [...prev, id]);
    }
  };

  const handleApplyCoupon = () => {
    const found = COUPONS.find((c) => c.code.toUpperCase() === couponCode.trim().toUpperCase());
    if (found) {
      const disc = Math.min(found.maxDiscount, (basePrice * found.discountPercent) / 100);
      setAppliedDiscount(Math.round(disc));
    } else {
      setAppliedDiscount(0);
    }
  };

  const handleFinalBookingSuccess = (
    method: 'UPI' | 'CARD' | 'NETBANKING' | 'CASH_AFTER_SERVICE',
    txId: string
  ) => {
    setShowRazorpay(false);
    const newBooking = createBooking({
      vehicle: {
        id: `veh-${Date.now()}`,
        type: vehicleType,
        brand: selectedBrand,
        model: modelName,
        registrationNumber: regNumber,
      },
      serviceIds: selectedServiceIds,
      serviceNames: selectedServicesList.map((s) => s.title),
      totalPrice: finalPrice,
      location: {
        address,
        city: selectedCity,
        pincode,
        landmark,
        lat: 12.9783,
        lng: 77.6408,
      },
      date,
      timeSlot,
      payment: {
        method,
        transactionId: txId,
        amount: basePrice,
        discount: appliedDiscount,
        finalAmount: finalPrice,
        status: method === 'CASH_AFTER_SERVICE' ? 'PENDING' : 'PAID',
        paidAt: new Date().toLocaleString(),
      },
    });

    setCompletedBooking(newBooking);
    setStep(5); // Confirmation screen
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-xl animate-in fade-in">
      <div className="bg-[#0a0a0c] border border-white/10 rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl relative flex flex-col max-h-[92vh] text-slate-100">
        
        {/* Header */}
        <div className="p-4 bg-[#050505] border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <Wrench className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-white">Book Doorstep Vehicle Service</h3>
              <p className="text-[11px] text-slate-400">Step {step} of 4 • Fast & Transparent</p>
            </div>
          </div>

          <button
            onClick={() => setIsBookingModalOpen(false)}
            className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Bar */}
        {step <= 4 && (
          <div className="w-full bg-slate-800 h-1">
            <div
              className="bg-gradient-to-r from-blue-500 to-indigo-500 h-full transition-all duration-300"
              style={{ width: `${(step / 4) * 100}%` }}
            />
          </div>
        )}

        {/* Body Steps */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs">
          
          {/* STEP 1: Vehicle Type, Brand & Model */}
          {step === 1 && (
            <div className="space-y-5 animate-in fade-in">
              <div>
                <label className="block text-slate-300 font-bold mb-2">Select Vehicle Type</label>
                <div className="grid grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setVehicleType('bike');
                      setSelectedBrand('Royal Enfield');
                    }}
                    className={`p-4 rounded-2xl border flex flex-col items-center space-y-2 transition ${
                      vehicleType === 'bike'
                        ? 'bg-blue-600/20 border-blue-500 text-blue-400 font-bold'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <Bike className="w-6 h-6" />
                    <span>Bike / Scooter</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setVehicleType('car');
                      setSelectedBrand('Maruti Suzuki');
                    }}
                    className={`p-4 rounded-2xl border flex flex-col items-center space-y-2 transition ${
                      vehicleType === 'car'
                        ? 'bg-blue-600/20 border-blue-500 text-blue-400 font-bold'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <Car className="w-6 h-6" />
                    <span>Car</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setVehicleType('ev');
                      setSelectedBrand('TVS');
                    }}
                    className={`p-4 rounded-2xl border flex flex-col items-center space-y-2 transition ${
                      vehicleType === 'ev'
                        ? 'bg-blue-600/20 border-blue-500 text-blue-400 font-bold'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <Zap className="w-6 h-6" />
                    <span>EV Vehicle</span>
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-2">Select Brand</label>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 max-h-40 overflow-y-auto p-1">
                  {brands.map((b) => (
                    <button
                      key={b.id}
                      type="button"
                      onClick={() => {
                        setSelectedBrand(b.name);
                        setModelName(b.popularModels[0] || 'Standard');
                      }}
                      className={`p-2.5 rounded-xl border text-center transition font-semibold text-xs ${
                        selectedBrand === b.name
                          ? 'bg-blue-600/20 border-blue-500 text-blue-400'
                          : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      {b.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Model Name</label>
                  <input
                    type="text"
                    value={modelName}
                    onChange={(e) => setModelName(e.target.value)}
                    placeholder="e.g. Classic 350 / Creta / Activa"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">Vehicle Reg Number</label>
                  <input
                    type="text"
                    value={regNumber}
                    onChange={(e) => setRegNumber(e.target.value)}
                    placeholder="e.g. KA-01-MJ-8821"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white uppercase"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Service Packages Selection */}
          {step === 2 && (
            <div className="space-y-4 animate-in fade-in">
              <div className="flex items-center justify-between">
                <label className="block text-slate-300 font-bold">Select Required Doorstep Services</label>
                <span className="text-[10px] text-blue-400">Multiple selection allowed</span>
              </div>

              <div className="space-y-3">
                {services.map((s) => {
                  const isChecked = selectedServiceIds.includes(s.id);
                  return (
                    <div
                      key={s.id}
                      onClick={() => toggleService(s.id)}
                      className={`p-4 rounded-2xl border transition cursor-pointer flex items-center justify-between gap-3 ${
                        isChecked
                          ? 'bg-blue-600/15 border-blue-500 ring-1 ring-blue-500/30'
                          : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <div
                          className={`mt-0.5 w-5 h-5 rounded-md border flex items-center justify-center shrink-0 ${
                            isChecked
                              ? 'bg-blue-600 border-blue-500 text-white'
                              : 'border-slate-700 bg-slate-900'
                          }`}
                        >
                          {isChecked && <CheckCircle2 className="w-3.5 h-3.5" />}
                        </div>
                        <div>
                          <div className="font-bold text-white text-xs">{s.title}</div>
                          <div className="text-[11px] text-slate-400 mt-0.5 line-clamp-1">
                            {s.description}
                          </div>
                          <div className="text-[10px] text-emerald-400 font-semibold mt-1">
                            🛡️ {s.warrantyDays}-Day Warranty Included
                          </div>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <div className="font-black text-white text-sm">₹{s.price}</div>
                        <div className="text-[10px] text-slate-500 line-through">₹{s.originalPrice}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 3: Doorstep Location & Schedule */}
          {step === 3 && (
            <div className="space-y-4 animate-in fade-in">
              <div>
                <label className="block text-slate-300 font-bold mb-1">City & Area</label>
                <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 flex items-center gap-2 font-semibold">
                  <MapPin className="w-4 h-4 text-blue-400" />
                  <span>{selectedCity} (Active Doorstep Coverage Zone)</span>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Flat / Building / Street Address</label>
                <textarea
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  rows={2}
                  placeholder="e.g. Apartment 402, Oakwood Residency, Koramangala"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Landmark</label>
                  <input
                    type="text"
                    value={landmark}
                    onChange={(e) => setLandmark(e.target.value)}
                    placeholder="e.g. Near Forum Mall"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">Pincode</label>
                  <input
                    type="text"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    placeholder="560095"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Preferred Date</label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">Time Slot</label>
                  <select
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                  >
                    <option value="10:00 AM - 11:00 AM">10:00 AM - 11:00 AM</option>
                    <option value="12:00 PM - 01:00 PM">12:00 PM - 01:00 PM</option>
                    <option value="02:00 PM - 03:00 PM">02:00 PM - 03:00 PM</option>
                    <option value="04:00 PM - 05:00 PM">04:00 PM - 05:00 PM</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: Review Summary & Promo Coupon */}
          {step === 4 && (
            <div className="space-y-4 animate-in fade-in">
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex justify-between items-center pb-2 border-b border-slate-800 font-bold text-white">
                  <span>Booking Overview</span>
                  <span className="text-blue-400">{vehicleType.toUpperCase()}</span>
                </div>

                <div className="flex justify-between text-slate-300">
                  <span>Vehicle:</span>
                  <span className="font-bold text-white">
                    {selectedBrand} {modelName} ({regNumber})
                  </span>
                </div>

                <div className="flex justify-between text-slate-300">
                  <span>Services:</span>
                  <span className="font-bold text-white text-right">
                    {selectedServicesList.map((s) => s.title).join(', ')}
                  </span>
                </div>

                <div className="flex justify-between text-slate-300">
                  <span>Location:</span>
                  <span className="text-right text-slate-300">
                    {address}, {selectedCity}
                  </span>
                </div>

                <div className="flex justify-between text-slate-300">
                  <span>Schedule:</span>
                  <span className="text-right text-slate-300">
                    {date} @ {timeSlot}
                  </span>
                </div>
              </div>

              {/* Promo Coupon Box */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <label className="block text-slate-300 font-bold flex items-center gap-1">
                  <Tag className="w-3.5 h-3.5 text-blue-400" />
                  <span>Apply Promo Coupon</span>
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Enter Coupon (e.g. FIRST100)"
                    className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs uppercase"
                  />
                  <button
                    type="button"
                    onClick={handleApplyCoupon}
                    className="px-4 py-2 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-500"
                  >
                    Apply
                  </button>
                </div>

                {appliedDiscount > 0 && (
                  <div className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Coupon Applied! Saved ₹{appliedDiscount}
                  </div>
                )}
              </div>

              {/* Price Calculation Breakdown */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="flex justify-between text-slate-400">
                  <span>Base Package Price:</span>
                  <span>₹{basePrice}</span>
                </div>
                <div className="flex justify-between text-emerald-400">
                  <span>Discount:</span>
                  <span>-₹{appliedDiscount}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Doorstep Inspection Fee:</span>
                  <span className="text-emerald-400 font-bold">FREE</span>
                </div>
                <div className="pt-2 border-t border-slate-800 flex justify-between font-black text-white text-base">
                  <span>Total Amount Payable:</span>
                  <span className="text-blue-400">₹{finalPrice}</span>
                </div>
              </div>
            </div>
          )}

          {/* STEP 5: Success Screen */}
          {step === 5 && completedBooking && (
            <div className="text-center py-6 space-y-5 animate-in zoom-in-95">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <span className="text-xs font-bold text-emerald-400 bg-emerald-950 px-3 py-1 rounded-full border border-emerald-800">
                  BOOKING CONFIRMED #{completedBooking.id}
                </span>
                <h3 className="text-2xl font-black text-white mt-3">
                  Verified Mechanic Dispatched!
                </h3>
                <p className="text-xs text-slate-300 max-w-md mx-auto mt-1">
                  Mechanic <strong>{completedBooking.mechanic?.name}</strong> has been assigned to your booking and will reach your doorstep shortly.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-left text-xs space-y-2 max-w-md mx-auto">
                <div className="flex justify-between">
                  <span className="text-slate-400">Mechanic Name:</span>
                  <span className="font-bold text-white">{completedBooking.mechanic?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Mechanic Phone:</span>
                  <span className="font-bold text-emerald-400">{completedBooking.mechanic?.phone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Service ETA:</span>
                  <span className="font-bold text-blue-400">25 Minutes</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2 max-w-md mx-auto">
                <button
                  onClick={() => {
                    setIsBookingModalOpen(false);
                    setActiveTrackingBookingId(completedBooking.id);
                  }}
                  className="flex-1 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-xs shadow-lg shadow-blue-600/30 hover:from-blue-500"
                >
                  🚀 Live Map Track Mechanic
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Footer Navigation Actions */}
        {step <= 4 && (
          <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between">
            {step > 1 ? (
              <button
                onClick={() => setStep(step - 1)}
                className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 font-bold text-xs hover:bg-slate-700 flex items-center space-x-1"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
            ) : (
              <div />
            )}

            {step < 4 ? (
              <button
                onClick={() => setStep(step + 1)}
                className="px-6 py-2.5 rounded-xl bg-blue-600 text-white font-bold text-xs hover:bg-blue-500 transition shadow-lg shadow-blue-600/20 flex items-center space-x-1"
              >
                <span>Continue</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={() => setShowRazorpay(true)}
                className="px-8 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold text-xs shadow-xl shadow-emerald-600/30 hover:from-emerald-500 flex items-center space-x-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>Proceed To Payment (₹{finalPrice})</span>
              </button>
            )}
          </div>
        )}

      </div>

      {/* Embedded Razorpay Trigger */}
      {showRazorpay && (
        <RazorpayModal
          amount={basePrice}
          discount={appliedDiscount}
          finalAmount={finalPrice}
          userName={currentUser.name}
          userEmail={currentUser.email}
          userPhone={currentUser.phone}
          onSuccess={handleFinalBookingSuccess}
          onClose={() => setShowRazorpay(false)}
        />
      )}
    </div>
  );
};
