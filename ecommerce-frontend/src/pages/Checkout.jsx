import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { 
  ShieldCheck, 
  CreditCard, 
  Wallet, 
  Banknote, 
  ChevronRight, 
  Lock, 
  MapPin, 
  Truck 
} from "lucide-react";

export default function Checkout() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("card");

  // Calculate totals from incoming state
  const totalAmount = state?.items?.reduce((acc, item) => 
    acc + (item.productId?.price * item.quantity), 0) || 0;

  const handleFinalProcess = () => {
    // Logic for final transaction
    console.log("Processing payment via:", paymentMethod);
    navigate("/success");
  };

  return (
    <div className="min-h-screen bg-[#020202] text-white p-6 pt-32 pb-20">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* LEFT: Information Flow (8 Cols) */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Header */}
          <div className="mb-10">
            <h1 className="text-6xl font-black italic uppercase tracking-tighter mb-2">Finalize</h1>
            <div className="flex items-center gap-4 text-gray-500">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-500">Secure Protocol</span>
              <div className="h-px w-20 bg-white/10"></div>
              <span className="text-[10px] font-black uppercase tracking-[0.3em]">Transaction ID: #882-9910</span>
            </div>
          </div>

          {/* 1. Logistics Details */}
          <section className="bg-white/[0.02] border border-white/5 rounded-[2.5rem] p-8">
            <div className="flex items-center gap-3 mb-8">
              <MapPin className="text-indigo-500" size={20} />
              <h2 className="text-xl font-black uppercase italic tracking-tight">Delivery Logistics</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[9px] font-black uppercase text-gray-600 tracking-widest">Shipping Destination</label>
                <div className="p-4 bg-black/40 border border-white/5 rounded-2xl text-sm text-gray-300">
                  712 High-End Avenue, Suite 4, <br /> New York, NY 10001
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[9px] font-black uppercase text-gray-600 tracking-widest">Estimated Arrival</label>
                <div className="p-4 bg-black/40 border border-white/5 rounded-2xl text-sm flex items-center gap-3">
                  <Truck size={16} className="text-indigo-400" />
                  <span className="font-bold text-white uppercase italic">3-5 Business Days</span>
                </div>
              </div>
            </div>
          </section>

          {/* 2. Payment Architecture */}
          <section className="bg-white/[0.02] border border-white/5 rounded-[2.5rem] p-8">
            <div className="flex items-center gap-3 mb-8">
              <CreditCard className="text-indigo-500" size={20} />
              <h2 className="text-xl font-black uppercase italic tracking-tight">Payment Method</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Card Option */}
              <button 
                onClick={() => setPaymentMethod("card")}
                className={`p-6 rounded-[2rem] border transition-all flex flex-col items-start gap-4 ${paymentMethod === 'card' ? 'bg-white text-black border-white' : 'bg-white/5 border-white/5 text-gray-500 hover:border-white/20'}`}
              >
                <CreditCard size={24} />
                <span className="font-black uppercase text-[10px] tracking-widest">Credit Card</span>
              </button>

              {/* Digital Wallet */}
              <button 
                onClick={() => setPaymentMethod("wallet")}
                className={`p-6 rounded-[2rem] border transition-all flex flex-col items-start gap-4 ${paymentMethod === 'wallet' ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white/5 border-white/5 text-gray-500 hover:border-white/20'}`}
              >
                <Wallet size={24} />
                <span className="font-black uppercase text-[10px] tracking-widest">Apple/Google Pay</span>
              </button>

              {/* Crypto / Other */}
              <button 
                onClick={() => setPaymentMethod("crypto")}
                className={`p-6 rounded-[2rem] border transition-all flex flex-col items-start gap-4 ${paymentMethod === 'crypto' ? 'bg-white text-black border-white' : 'bg-white/5 border-white/5 text-gray-500 hover:border-white/20'}`}
              >
                <Banknote size={24} />
                <span className="font-black uppercase text-[10px] tracking-widest">Crypto Currency</span>
              </button>
            </div>

            {/* Conditional Card Input (shown if method is 'card') */}
            {paymentMethod === 'card' && (
              <div className="mt-8 space-y-4 animate-in fade-in duration-500">
                <input 
                  type="text" 
                  placeholder="CARDHOLDER NAME" 
                  className="w-full bg-black/50 border border-white/10 p-5 rounded-2xl text-[10px] font-black tracking-[0.2em] focus:border-indigo-500 outline-none transition-all" 
                />
                <div className="flex gap-4">
                  <input type="text" placeholder="CARD NUMBER" className="flex-[3] bg-black/50 border border-white/10 p-5 rounded-2xl text-[10px] font-black tracking-[0.2em] focus:border-indigo-500 outline-none" />
                  <input type="text" placeholder="MM/YY" className="flex-1 bg-black/50 border border-white/10 p-5 rounded-2xl text-[10px] font-black tracking-[0.2em] focus:border-indigo-500 outline-none text-center" />
                </div>
              </div>
            )}
          </section>
        </div>

        {/* RIGHT: Floating Recap (4 Cols) */}
        <div className="lg:col-span-4">
          <div className="sticky top-32 space-y-6">
            <div className="bg-indigo-600 p-10 rounded-[3rem] shadow-3xl shadow-indigo-500/20 relative overflow-hidden">
              <div className="relative z-10">
                <p className="text-indigo-200 uppercase font-black tracking-[0.3em] text-[10px] mb-8">Executive Summary</p>
                
                <div className="space-y-4 mb-10 border-b border-white/10 pb-8">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-indigo-100">SUBTOTAL</span>
                    <span>${totalAmount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-indigo-100">LOGISTICS</span>
                    <span className="text-white uppercase">Complimentary</span>
                  </div>
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-indigo-100">SURCHARGE</span>
                    <span>$0.00</span>
                  </div>
                </div>

                <div className="mb-10">
                  <p className="text-[10px] font-black text-indigo-200 uppercase tracking-widest mb-2">Total Payable</p>
                  <h2 className="text-6xl font-black italic tracking-tighter">${totalAmount.toFixed(2)}</h2>
                </div>

                <button 
                  onClick={handleFinalProcess}
                  className="w-full bg-white text-black py-6 rounded-2xl font-black uppercase text-[12px] tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-black hover:text-white transition-all group active:scale-95 shadow-2xl"
                >
                  Confirm Payment <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              {/* Decorative Circle */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
            </div>

            <div className="p-6 bg-white/[0.03] border border-white/5 rounded-[2rem] flex items-start gap-4">
               <div className="p-3 bg-green-500/10 rounded-xl">
                  <ShieldCheck className="text-green-500" size={20} />
               </div>
               <div>
                  <p className="text-[10px] font-black uppercase tracking-widest leading-none mb-2">AES-256 Encryption</p>
                  <p className="text-[9px] font-bold text-gray-500 uppercase leading-relaxed tracking-wider">
                    Your financial data is encrypted and processed via isolated secure tunnels.
                  </p>
               </div>
            </div>

            <button 
              onClick={() => navigate(-1)}
              className="w-full text-center text-gray-600 hover:text-white font-black uppercase text-[9px] tracking-[0.3em] transition-colors"
            >
              Abort Transaction
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}