import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import { Trash2, Plus, Minus, Zap, ShoppingBag } from "lucide-react";

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchCart = useCallback(async () => {
    try {
      const res = await api.get('/cart/all');
      setCartItems(res.data.cart?.items || []);
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const handleUpdateQuantity = async (productId, newQty) => {
    if (newQty < 1) {
      handleRemoveItem(productId); 
      return;
    }
    try {
      await api.put('/cart/update-quantity', { productId, quantity: newQty }); 
      fetchCart(); 
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  const handleRemoveItem = async (productId) => {
    try {
      await api.delete(`/cart/product/${productId}`); 
      fetchCart();
    } catch (err) {
      console.error("Remove failed:", err);
    }
  };

  const subtotal = cartItems.reduce((acc, item) => {
    const price = item.productId?.price || 0;
    return acc + (price * item.quantity);
  }, 0);

  if (loading) return (
    <div className="min-h-screen bg-[#020202] flex items-center justify-center">
       <div className="w-12 h-12 border-2 border-white/10 border-t-indigo-500 rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#020202] text-white p-6 md:p-12 pt-32 selection:bg-indigo-500/30">
      <div className="max-w-5xl mx-auto">
        
        {/* Header Section */}
        <div className="flex items-end justify-between mb-12 border-b border-white/5 pb-8">
          <div>
            <h1 className="text-6xl font-black italic tracking-tighter uppercase leading-none">Inventory</h1>
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.5em] mt-3">Personal Selection • {cartItems.length} Units</p>
          </div>
          <ShoppingBag className="text-white/10" size={48} strokeWidth={1} />
        </div>

        {cartItems.length === 0 ? (
          <div className="py-32 text-center bg-white/[0.01] rounded-[3rem] border border-dashed border-white/10">
             <p className="text-gray-600 font-bold uppercase tracking-[0.3em] text-xs">Inventory currently empty</p>
             <button 
                onClick={() => navigate("/shop")}
                className="mt-6 text-indigo-500 font-black uppercase text-[10px] tracking-widest hover:text-white transition-colors"
             >
                Return to Shop
             </button>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Item List */}
            {cartItems.map((item) => (
              <div key={item.productId?._id} className="group relative flex flex-col md:flex-row items-center gap-8 p-8 rounded-[2.5rem] bg-gradient-to-br from-white/[0.03] to-transparent border border-white/5 hover:border-white/10 transition-all duration-500">
                
                {/* Image Section */}
                <div className="relative w-full md:w-32 aspect-square rounded-2xl overflow-hidden bg-black flex-shrink-0 border border-white/5">
                  <img src={item.productId?.images[0]} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={item.productId?.name} />
                </div>

                {/* Content Section */}
                <div className="flex-1 w-full flex flex-col md:flex-row justify-between items-center gap-6">
                  <div className="text-center md:text-left">
                    <h3 className="text-2xl font-black uppercase italic tracking-tight leading-none mb-1">{item.productId?.name}</h3>
                    <p className="text-indigo-400 font-black text-sm">${item.productId?.price}</p>
                    
                    {/* Quantity Selector */}
                    <div className="flex items-center gap-5 bg-black/40 px-3 py-1.5 rounded-xl border border-white/5 w-fit mx-auto md:mx-0 mt-4">
                      <button onClick={() => handleUpdateQuantity(item.productId._id, item.quantity - 1)} className="text-gray-500 hover:text-white transition-colors"><Minus size={14}/></button>
                      <span className="text-xs font-black w-4 text-center">{item.quantity}</span>
                      <button onClick={() => handleUpdateQuantity(item.productId._id, item.quantity + 1)} className="text-gray-500 hover:text-white transition-colors"><Plus size={14}/></button>
                    </div>
                  </div>

                  <div className="flex flex-col items-center md:items-end gap-4">
                    <div className="text-center md:text-right">
                      <p className="text-[9px] font-bold text-gray-600 uppercase tracking-widest mb-1">Item Total</p>
                      <p className="text-3xl font-black italic tracking-tighter">${(item.productId?.price * item.quantity).toFixed(2)}</p>
                    </div>

                    <div className="flex gap-2">
                      <button 
                        onClick={() => handleRemoveItem(item.productId._id)}
                        className="p-3.5 bg-white/5 text-gray-500 rounded-xl hover:bg-red-500/10 hover:text-red-500 transition-all border border-white/5"
                      >
                        <Trash2 size={16} />
                      </button>
                      <button 
                        onClick={() => navigate("/order-summary", { state: { product: item.productId, selectedQuantity: item.quantity } })}
                        className="px-6 py-3.5 bg-white text-black rounded-xl font-black uppercase text-[10px] tracking-widest flex items-center gap-2 hover:bg-indigo-600 hover:text-white transition-all shadow-xl shadow-white/5"
                      >
                        <Zap size={14} fill="currentColor" /> Purchase Item
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Bottom Checkout Section */}
            <div className="mt-20 flex flex-col items-center gap-8">
              
              <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

              <div className="w-full max-w-xl p-10 rounded-[3rem] bg-white/[0.02] border border-white/10 backdrop-blur-xl relative overflow-hidden">
                <div className="relative z-10 mb-8 text-center">
                  <p className="text-[10px] font-black uppercase text-gray-500 tracking-[0.4em] mb-4">Total Aggregate</p>
                  <div className="flex items-baseline justify-center gap-3">
                    <span className="text-7xl font-black italic tracking-tighter text-white">
                      ${subtotal.toFixed(2)}
                    </span>
                    <span className="text-indigo-500 text-sm font-black uppercase tracking-widest">USD</span>
                  </div>
                </div>

                <button 
                  onClick={() => navigate("/order-summary", { state: { items: cartItems, isFullCart: true } })}
                  className="w-full py-6 bg-white text-black rounded-2xl font-black uppercase text-[12px] tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-indigo-600 hover:text-white transition-all active:scale-95 shadow-2xl shadow-indigo-500/10 group"
                >
                  <Zap size={18} fill="currentColor" className="group-hover:animate-pulse" /> Buy All Now
                </button>

                {/* Subtle Glow Effect */}
                <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-indigo-500/5 rounded-full blur-[100px]"></div>
              </div>

              <div className="pb-16">
                <p className="text-[9px] font-bold text-gray-700 uppercase tracking-[0.3em] leading-relaxed text-center">
                  Secure Checkout • Worldwide Logistics • 30-Day Guaranteed Returns
                </p>
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}