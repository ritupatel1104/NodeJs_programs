import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../utils/api";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ShoppingBag, ArrowLeft, CheckCircle, 
  Star, Truck, ShieldCheck, RotateCcw, Share2, Zap, Plus, Minus 
} from "lucide-react";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [statusMsg, setStatusMsg] = useState("");
  const [activeImage, setActiveImage] = useState(0);
  
  // NEW: Quantity State
  const [quantity, setQuantity] = useState(1);
  
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    api.get(`/product/${id}`)
      .then(res => {
        setProduct(res.data.product);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  // Quantity Handlers
  const incrementQty = () => setQuantity(prev => prev + 1);
  const decrementQty = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  const showToast = (msg) => {
    setStatusMsg(msg);
    setTimeout(() => setStatusMsg(""), 3000);
  };

const addToCart = async () => {
  try {
    await api.post(`/cart/add`, { item: { productId: id, quantity: quantity } });
    showToast("Added to Cart!");
  } catch (err) {
    // Check if the error is because the item is already in the cart
    // Usually, backends send a 400 status or a specific message for duplicates
    const errorMsg = err.response?.data?.message;
    
    if (errorMsg === "Item already in cart" || err.response?.status === 400) {
      showToast("Item is already in your cart!");
    } else if (err.response?.status === 401) {
      // ONLY redirect if the user is truly not logged in
      navigate("/login");
    } else {
      showToast("Something went wrong. Try again.");
    }
  }
};

  const handleBuyNow = () => {
    // Pass product AND the selected quantity to the summary page
    navigate("/order-summary", { state: { product, selectedQuantity: quantity } });
  };

  if (loading) return (
    <div className="h-screen bg-black flex items-center justify-center text-indigo-500 font-bold animate-pulse uppercase tracking-widest">
      Loading...
    </div>
  );

  if (!product) return <div className="h-screen bg-black flex items-center justify-center text-white">Product not found.</div>;

  return (
    <div className="min-h-screen bg-[#050505] text-white p-4 md:p-10 pt-28 relative">
      
      <AnimatePresence>
        {statusMsg && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-10 right-10 z-[110] bg-indigo-600 text-white px-8 py-4 rounded-2xl shadow-2xl flex items-center gap-3 font-bold border border-white/10"
          >
            <CheckCircle size={20} /> {statusMsg}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-6xl mx-auto">
        <button onClick={() => navigate(-1)} className="flex items-center gap-3 text-gray-500 hover:text-white transition-all font-bold uppercase text-[10px] tracking-[0.3em] mb-8">
          <ArrowLeft size={16} /> Back
        </button>

        <div className="flex flex-col lg:flex-row gap-12 items-start">
          
          {/* LEFT: IMAGE SECTION */}
          <div className="w-full lg:w-[450px] flex-shrink-0">
            <div className="relative rounded-[2rem] overflow-hidden bg-[#0a0a0a] border border-white/5 aspect-square mb-6">
              <img 
                src={product.images[activeImage]} 
                className="w-full h-full object-cover" 
                alt={product.name} 
              />
            </div>

            <div className="flex gap-3 overflow-x-auto no-scrollbar">
              {product.images.map((img, idx) => (
                <button 
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 ${activeImage === idx ? 'border-indigo-500' : 'border-transparent opacity-50'}`}
                >
                  <img src={img} className="w-full h-full object-cover" alt="thumb" />
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT: CONTENT SECTION */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-4">
              <span className="text-indigo-400 font-black uppercase tracking-[0.4em] text-[10px]">{product.category}</span>
              <button className="p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors">
                <Share2 size={16} />
              </button>
            </div>

            <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tighter uppercase italic">{product.name}</h1>
            
            <div className="flex items-baseline gap-4 mb-6">
              <span className="text-4xl font-black text-white italic">${product.price}</span>
              <span className="text-gray-600 line-through text-xl font-bold">${(product.price * 1.3).toFixed(0)}</span>
            </div>

            {/* NEW: QUANTITY SELECTOR */}
            <div className="mb-8">
              <p className="text-[10px] font-black uppercase text-gray-500 tracking-[0.2em] mb-3">Select Quantity</p>
              <div className="flex items-center gap-6 bg-white/5 w-fit p-2 rounded-2xl border border-white/10">
                <button 
                  onClick={decrementQty}
                  className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors active:scale-90"
                >
                  <Minus size={16} />
                </button>
                <span className="text-lg font-black w-4 text-center">{quantity}</span>
                <button 
                  onClick={incrementQty}
                  className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors active:scale-90"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>

            <p className="text-gray-400 text-sm leading-relaxed mb-8 max-w-xl">
              {product.description || "Premium quality and exclusive design for the modern lifestyle."}
            </p>

            {/* ACTION BUTTONS */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={addToCart} 
                className="flex-1 border border-white/20 text-white py-5 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-all flex items-center justify-center gap-2"
              >
                <ShoppingBag size={18} /> Add to Cart
              </button>
              
              <button 
                onClick={handleBuyNow}
                className="flex-1 bg-white text-black py-5 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-indigo-600 hover:text-white transition-all flex flex-col items-center justify-center leading-none"
              >
                <div className="flex items-center gap-2 mb-1">
                   <Zap size={16} fill="currentColor" /> <span>Buy Now</span>
                </div>
                
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}