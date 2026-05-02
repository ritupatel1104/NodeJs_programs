import { useEffect, useState } from "react";
import api from "../utils/api";
import { Heart, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion"; // Added imports

export default function Wishlist() {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusMsg, setStatusMsg] = useState(""); // Added state

  const fetchWishlist = async () => {
    try {
      const res = await api.get('/wishlist/all');
      setWishlistItems(res.data.wishlist?.productIds || []);
    } catch (err) {
      console.error("Wishlist Fetch Error:", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  // Added toast logic
  const showToast = (msg) => {
    setStatusMsg(msg);
    setTimeout(() => setStatusMsg(""), 3000);
  };

  useEffect(() => { fetchWishlist(); }, []);

  if (loading) return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center">
      <div className="text-pink-500 font-bold animate-pulse tracking-widest">LOADING WISHLIST...</div>
    </div>
  );

  const handleRemove = async (entryId) => {
    try {
      await api.delete(`/wishlist/remove/${entryId}`);
      showToast("Removed from Wishlist"); // Added toast call
      fetchWishlist(); 
    } catch (err) {
      console.error("Remove Error:", err.response?.data || err.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white p-8 relative">
      
      {/* Feedback Toast */}
      <AnimatePresence>
        {statusMsg && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-8 right-8 z-[110] bg-pink-600 px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-3 font-bold border border-white/10"
          >
            <Trash2 size={18} /> {statusMsg}
          </motion.div>
        )}
      </AnimatePresence>

      <header className="max-w-7xl mx-auto mb-12 flex items-center gap-4">
        <Heart className="text-pink-600" fill="currentColor" size={32} />
        <h1 className="text-5xl font-black tracking-tighter">WISHLIST</h1>
      </header>

      <div className="max-w-7xl mx-auto">
        {wishlistItems.length === 0 ? (
          <div className="border border-dashed border-white/10 p-20 rounded-[3rem] text-center">
            <p className="text-gray-500 uppercase tracking-widest text-sm">Your wishlist is empty</p>
            <Link to="/shop" className="mt-4 inline-block text-indigo-400 hover:text-white underline">Browse the shop</Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {wishlistItems.map((entry) => {
              const product = entry?.items?.productId;
              if (!product) return null;

              return (
                <div key={entry._id} className="group flex flex-col">
                  <div className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] bg-white/5 border border-white/10 group-hover:border-pink-500/30 transition-all duration-500">
                    <img 
                      src={product.images?.[0]} 
                      alt={product.name} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <button 
                      onClick={() => handleRemove(entry._id)}
                      className="absolute top-4 right-4 bg-black/60 backdrop-blur-md p-3 rounded-2xl text-gray-400 hover:text-red-500 border border-white/5 transition-all"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>

                  <div className="mt-4 px-2">
                    <h3 className="font-bold text-lg group-hover:text-pink-400 transition-colors uppercase tracking-tight">
                      {product.name || "Unknown Product"}
                    </h3>
                    <p className="text-pink-500 font-black text-xl mt-1">${product.price || 0}</p>
                    <Link 
                      to={`/product/${product._id}`}
                      className="mt-4 block w-full bg-white text-black py-3 rounded-2xl font-bold text-center text-xs hover:bg-indigo-500 hover:text-white transition-all uppercase"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}