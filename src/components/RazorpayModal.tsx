import React, { useState } from 'react';
import { ShieldCheck, Lock, CheckCircle2, QrCode, CreditCard, Landmark, DollarSign, X } from 'lucide-react';

interface RazorpayModalProps {
  amount: number;
  discount: number;
  finalAmount: number;
  userName: string;
  userEmail: string;
  userPhone: string;
  onSuccess: (method: 'UPI' | 'CARD' | 'NETBANKING' | 'CASH_AFTER_SERVICE', transactionId: string) => void;
  onClose: () => void;
}

export const RazorpayModal: React.FC<RazorpayModalProps> = ({
  amount,
  discount,
  finalAmount,
  userName,
  userEmail,
  userPhone,
  onSuccess,
  onClose,
}) => {
  const [method, setMethod] = useState<'UPI' | 'CARD' | 'NETBANKING' | 'CASH_AFTER_SERVICE'>('UPI');
  const [isProcessing, setIsProcessing] = useState(false);
  const [cardDetails, setCardDetails] = useState({
    number: '4111 2222 3333 4444',
    expiry: '12/28',
    cvv: '889',
    name: userName || 'Anish Verma',
  });

  const handlePay = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      const txId = `pay_${Math.random().toString(36).substring(2, 11)}`;
      onSuccess(method, txId);
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-in fade-in">
      <div className="bg-[#0a0a0c] border border-white/10 rounded-3xl max-w-md w-full overflow-hidden shadow-2xl relative text-slate-100">
        
        {/* Razorpay Brand Header */}
        <div className="bg-blue-900/90 p-4 border-b border-blue-800 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center font-black text-white text-lg">
              R
            </div>
            <div>
              <div className="text-xs font-bold text-blue-200 uppercase tracking-widest">
                Razorpay Secure
              </div>
              <div className="text-sm font-black text-white">Ride N Repair Services</div>
            </div>
          </div>
          <button onClick={onClose} className="text-blue-300 hover:text-white p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Amount Summary */}
        <div className="p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between text-xs">
          <div>
            <span className="text-slate-400">Total Payable:</span>
            <div className="text-2xl font-black text-white">₹{finalAmount}</div>
            {discount > 0 && (
              <span className="text-[10px] text-emerald-400">
                Applied Discount: -₹{discount}
              </span>
            )}
          </div>
          <div className="text-right text-slate-400">
            <div>{userName}</div>
            <div className="text-[10px] text-slate-500">{userPhone}</div>
          </div>
        </div>

        {/* Payment Options Selection */}
        <div className="p-5 space-y-4 text-xs">
          <div className="text-xs font-bold text-slate-300 uppercase tracking-wider">
            Select Payment Method
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setMethod('UPI')}
              className={`p-3 rounded-xl border flex flex-col items-center space-y-1 transition ${
                method === 'UPI'
                  ? 'bg-blue-600/20 border-blue-500 text-blue-400 font-bold'
                  : 'bg-slate-800 border-slate-700/80 text-slate-400 hover:border-slate-600'
              }`}
            >
              <QrCode className="w-5 h-5" />
              <span>UPI / QR Code</span>
            </button>

            <button
              type="button"
              onClick={() => setMethod('CARD')}
              className={`p-3 rounded-xl border flex flex-col items-center space-y-1 transition ${
                method === 'CARD'
                  ? 'bg-blue-600/20 border-blue-500 text-blue-400 font-bold'
                  : 'bg-slate-800 border-slate-700/80 text-slate-400 hover:border-slate-600'
              }`}
            >
              <CreditCard className="w-5 h-5" />
              <span>Card / Debit / Credit</span>
            </button>

            <button
              type="button"
              onClick={() => setMethod('NETBANKING')}
              className={`p-3 rounded-xl border flex flex-col items-center space-y-1 transition ${
                method === 'NETBANKING'
                  ? 'bg-blue-600/20 border-blue-500 text-blue-400 font-bold'
                  : 'bg-slate-800 border-slate-700/80 text-slate-400 hover:border-slate-600'
              }`}
            >
              <Landmark className="w-5 h-5" />
              <span>Netbanking</span>
            </button>

            <button
              type="button"
              onClick={() => setMethod('CASH_AFTER_SERVICE')}
              className={`p-3 rounded-xl border flex flex-col items-center space-y-1 transition ${
                method === 'CASH_AFTER_SERVICE'
                  ? 'bg-blue-600/20 border-blue-500 text-blue-400 font-bold'
                  : 'bg-slate-800 border-slate-700/80 text-slate-400 hover:border-slate-600'
              }`}
            >
              <DollarSign className="w-5 h-5" />
              <span>Pay After Service</span>
            </button>
          </div>

          {/* Payment Method Details Preview */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
            {method === 'UPI' && (
              <div className="text-center space-y-2">
                <div className="w-32 h-32 mx-auto bg-white p-2 rounded-xl border flex items-center justify-center">
                  {/* Mock UPI QR Code SVG */}
                  <svg className="w-full h-full text-slate-950" viewBox="0 0 100 100">
                    <rect width="100" height="100" fill="#ffffff" />
                    <path d="M 10 10 H 35 V 35 H 10 Z M 15 15 V 30 H 30 V 15 Z M 20 20 H 25 V 25 H 20 Z" fill="#000" />
                    <path d="M 65 10 H 90 V 35 H 65 Z M 70 15 V 30 H 85 V 15 Z M 75 20 H 80 V 25 H 75 Z" fill="#000" />
                    <path d="M 10 65 H 35 V 90 H 10 Z M 15 70 V 85 H 30 V 70 Z M 20 75 H 25 V 80 H 20 Z" fill="#000" />
                    <rect x="40" y="40" width="20" height="20" fill="#000" />
                    <rect x="65" y="65" width="20" height="20" fill="#000" />
                  </svg>
                </div>
                <div className="text-[11px] text-slate-400 font-medium">
                  Scan QR with Google Pay, PhonePe, Paytm or BHIM UPI
                </div>
              </div>
            )}

            {method === 'CARD' && (
              <div className="space-y-2">
                <input
                  type="text"
                  value={cardDetails.number}
                  onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value })}
                  placeholder="Card Number"
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs"
                />
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={cardDetails.expiry}
                    onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
                    placeholder="MM/YY"
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs"
                  />
                  <input
                    type="text"
                    value={cardDetails.cvv}
                    onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
                    placeholder="CVV"
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs"
                  />
                </div>
              </div>
            )}

            {method === 'NETBANKING' && (
              <div className="grid grid-cols-2 gap-2 text-center text-slate-300">
                <div className="p-2 rounded bg-slate-900 border border-slate-800 font-semibold">HDFC Bank</div>
                <div className="p-2 rounded bg-slate-900 border border-slate-800 font-semibold">State Bank of India</div>
                <div className="p-2 rounded bg-slate-900 border border-slate-800 font-semibold">ICICI Bank</div>
                <div className="p-2 rounded bg-slate-900 border border-slate-800 font-semibold">Axis Bank</div>
              </div>
            )}

            {method === 'CASH_AFTER_SERVICE' && (
              <div className="text-slate-300 text-center space-y-1 py-1">
                <p className="font-bold text-white">Pay Cash or UPI To Mechanic</p>
                <p className="text-[11px] text-slate-400">
                  You can inspect the bike, test ride, and pay after completion.
                </p>
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={handlePay}
            disabled={isProcessing}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold text-sm shadow-xl shadow-emerald-600/30 hover:from-emerald-500 hover:to-teal-500 transition flex items-center justify-center space-x-2"
          >
            {isProcessing ? (
              <span className="flex items-center space-x-2">
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                <span>Authorizing Razorpay Payment...</span>
              </span>
            ) : (
              <span className="flex items-center space-x-2">
                <Lock className="w-4 h-4" />
                <span>
                  {method === 'CASH_AFTER_SERVICE'
                    ? 'Confirm Booking (Pay After Service)'
                    : `Pay ₹${finalAmount} Now`}
                </span>
              </span>
            )}
          </button>

          <div className="text-[10px] text-center text-slate-500 flex items-center justify-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>256-Bit SSL Encryption • PCI-DSS Compliant</span>
          </div>

        </div>

      </div>
    </div>
  );
};
