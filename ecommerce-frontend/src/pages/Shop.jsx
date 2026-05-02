import { useEffect, useState } from "react";
import api from "../utils/api";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom"; // 1. ADD THIS IMPORT
import { 
  ShoppingBag, Heart, CheckCircle, X, Star, 
  ArrowRight, ChevronLeft, Search, Filter 
} from "lucide-react";

export default function Shop() {
  const navigate = useNavigate(); // 2. INITIALIZE NAVIGATE HERE
  
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusMsg, setStatusMsg] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Filter & Search State
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    api.get('/product/all')
      .then(res => {
        setProducts(res.data.products || []);
        setLoading(false);
      })
      .catch(err => {
        console.error("Fetch error:", err.response?.data);
        setLoading(false);
      });
  }, []);

  // Derived Logic
  const categories = ["All", ...new Set(products.map(p => p.category).filter(Boolean))];

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (product.brand && product.brand.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleAddToCart = async (e, productId) => {
    e.stopPropagation(); 
    try {
      await api.post('/cart/add', { item: { productId, quantity: 1 } });
      showToast("Added to Cart!");
    } catch (err) {
      showToast(err.response?.data?.message || "Error adding to cart");
    }
  };

  const handleAddToWishlist = async (e, productId) => {
    e.stopPropagation();
    try {
      await api.post('/wishlist/add', { productId });
      showToast("Added to Wishlist!");
    } catch (err) {
      showToast(err.response?.data?.message || "Error updating wishlist");
    }
  };

  const showToast = (msg) => {
    setStatusMsg(msg);
    setTimeout(() => setStatusMsg(""), 3000);
  };

  if (loading) return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center text-indigo-500 font-bold animate-pulse tracking-widest uppercase">
      Loading Collection...
    </div>
  );

  return (
    <div className="min-h-screen bg-[#050505] text-white p-8 pt-24 relative">
      
      {/* Feedback Toast */}
      <AnimatePresence>
        {statusMsg && (
          <motion.div 
            initial={{ opacity: 0, x: -20 }} 
            animate={{ opacity: 1, x: 0 }} 
            exit={{ opacity: 0, x: -20 }}
            className="fixed bottom-8 left-8 z-[110] bg-indigo-600 px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-3 font-bold border border-white/10"
          >
            <CheckCircle size={18} /> {statusMsg}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header with Filters & Search */}
      <header className="max-w-7xl mx-auto mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div>
          <h1 className="text-4xl font-black tracking-tighter italic">All Products</h1>
          <p className="text-gray-500 mt-2 uppercase tracking-[0.3em] text-xs font-bold">Find what fits your life.</p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
          <div className="relative w-full sm:w-48">
            <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" size={16} />
            <select 
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-3 outline-none focus:border-indigo-500 transition-all appearance-none cursor-pointer font-bold text-sm text-gray-300"
            >
              {categories.map(cat => (
                <option key={cat} value={cat} className="bg-[#0a0a0a]">{cat}</option>
              ))}
            </select>
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
            <input 
              type="text" 
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-3 outline-none focus:border-indigo-500 transition-all font-medium"
            />
          </div>
        </div>
      </header>

      {/* Product Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {filteredProducts.map((product) => {
          const finalPrice = product.discount > 0 
            ? product.price - (product.price * (product.discount / 100)) 
            : product.price;

          return (
            <motion.div 
              key={product._id} 
              onClick={() => navigate(`/product/${product._id}`)} 
              className="group relative cursor-pointer"
            >
              <div className="relative aspect-[3/4] overflow-hidden rounded-[2rem] bg-[#111] transition-all duration-500">
                <img 
                  src={product.images[0]} 
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 group-hover:opacity-50 group-hover:blur-[2px]"
                  alt={product.name}
                />

                <button 
                  onClick={(e) => handleAddToWishlist(e, product._id)}
                  className="absolute top-4 right-4 z-20 p-2 text-white/40 hover:text-pink-500 hover:scale-125 transition-all"
                >
                  <Heart size={20} fill={product.isWishlisted ? "currentColor" : "none"} />
                </button>

                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="overflow-hidden py-2">
                    <motion.div 
                      className="bg-white text-black px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-widest flex items-center gap-2 translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 shadow-[0_10px_30px_rgba(255,255,255,0.2)]"
                    >
                      View Product <ArrowRight size={14} />
                    </motion.div>
                  </div>
                </div>

                <div className="absolute inset-0 bg-indigo-500/0 group-hover:bg-indigo-500/5 transition-colors duration-500" />
              </div>

              <div className="mt-4 px-2">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-bold text-base text-white/80 group-hover:text-indigo-400 transition-colors tracking-tight">
                      {product.name}
                    </h3>
                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">
                      {product.category || "Exclusive"}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-black text-white italic">
                      ${finalPrice.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Expanded Modal - (Optional if you still want modals elsewhere) */}
      <AnimatePresence>
        {selectedProduct && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setSelectedProduct(null)}
              className="fixed inset-0 bg-black/95 backdrop-blur-xl z-[100]"
            />
            {/* Modal Content... */}
          </>
        )}
      </AnimatePresence>
    </div>
  );
}