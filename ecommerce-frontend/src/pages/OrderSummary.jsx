import { Link, useLocation, useNavigate } from "react-router-dom";
import api from "../utils/api";
import { ArrowLeft, Zap, ShieldCheck } from "lucide-react";

export default function OrderSummary() {
  const { state } = useLocation();
  const navigate = useNavigate();

  // 1. DATA EXTRACTION: Check if it's the full cart or a single product
  const isFullCart = state?.isFullCart;
  const items = isFullCart ? state.items : [{ productId: state?.product, quantity: state?.selectedQuantity || 1 }];

  // Safety check: if no data exists
  if (!state || (!isFullCart && !state.product)) {
    return (
      <div className="h-screen bg-black text-white flex items-center justify-center font-bold uppercase tracking-widest">
        No order data found.
      </div>
    );
  }

  // 2. CALCULATION: Sum up the total for all items in the list
  const totalAmount = items.reduce((acc, item) => {
    return acc + (item.productId?.price * item.quantity);
  }, 0);

  const confirmOrder = async () => {
    try {
      // 3. PREPARE PAYLOAD: Map the items to match your backend expectations
      const orderData = {
        items: items.map(item => ({
          productId: item.productId._id,
          quantity: item.quantity
        }))
      };

      const res = await api.post("/order/add", orderData);

      if (res.status === 200) {
      
        navigate("/checkout");
      }
    } catch (err) {
      alert(err.response?.data?.message || "Order failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white p-6 pt-28">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-10">
          <h1 className="text-4xl font-black italic uppercase tracking-tighter">
            {isFullCart ? "Confirm Bulk Order" : "Confirm Order"}
          </h1>
          <div className="flex items-center gap-2 text-indigo-400 bg-indigo-400/10 px-4 py-2 rounded-full border border-indigo-400/20">
            <ShieldCheck size={16} />
            <span className="text-[10px] font-black uppercase tracking-widest">Secure Checkout</span>
          </div>
        </div>

        <div className="bg-[#0a0a0a] border border-white/5 rounded-[2.5rem] p-8 mb-8 shadow-2xl">
          
          {/* 4. ITEM LIST: Map through the items array (works for 1 or many) */}
          <div className="space-y-6 border-b border-white/5 pb-8 mb-8">
            <p className="text-[10px] font-black uppercase text-gray-500 tracking-[0.3em]">Manifest Selection</p>
            {items.map((item, idx) => (
              <div key={idx} className="flex gap-6 items-center">
                <div className="w-20 h-20 rounded-2xl overflow-hidden border border-white/10 flex-shrink-0">
                  <img src={item.productId?.images[0]} alt="" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <h2 className="text-lg font-black uppercase italic tracking-tight">{item.productId?.name}</h2>
                  <div className="flex gap-4 mt-1">
                    <span className="text-gray-500 text-[10px] font-bold uppercase tracking-widest">
                      Qty: <b className="text-white">{item.quantity}</b>
                    </span>
                    <span className="text-gray-500 text-[10px] font-bold uppercase tracking-widest">
                      Price: <b className="text-white">${item.productId?.price}</b>
                    </span>
                  </div>
                </div>
                <div className="text-right">
                    <p className="text-xl font-black italic">${(item.productId?.price * item.quantity).toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Pricing Breakdown */}
          <div className="space-y-4">
            <div className="flex justify-between text-gray-400 font-medium">
              <span>Subtotal Aggregate</span>
              <span>${totalAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-400 font-medium">
              <span>Logistics Fee</span>
              <span className="text-green-500 font-black uppercase text-[10px]">Complimentary</span>
            </div>

            <div className="flex justify-between items-end pt-6 border-t border-white/10">
              <div>
                <p className="text-[10px] font-black uppercase text-gray-500 tracking-widest mb-1">Total Payable</p>
                <span className="text-5xl font-black text-white italic tracking-tighter">${totalAmount.toFixed(2)}</span>
              </div>
              <Link to="/checkout">
                <button
                onClick={confirmOrder}
                className="bg-white text-black h-16 px-10 rounded-2xl font-black uppercase tracking-widest flex items-center gap-3 hover:bg-indigo-600 hover:text-white transition-all active:scale-95 shadow-xl shadow-white/5"
              >
                <Zap size={20} fill="currentColor" /> BUY NOW
              </button>
              </Link>
            
            </div>
          </div>
        </div>

        <button
          onClick={() => navigate(-1)}
          className="w-full flex items-center justify-center gap-2 text-gray-600 hover:text-white transition-colors font-bold uppercase text-[10px] tracking-widest"
        >
          <ArrowLeft size={14} /> Adjust Selection
        </button>
      </div>
    </div>
  );
}