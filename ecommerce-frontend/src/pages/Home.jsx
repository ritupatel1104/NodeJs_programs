import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { 
  Smartphone, Shirt, Sparkles, Home as HomeIcon, 
  BookOpen, Puzzle, Bike, Utensils, Search, 
  ShoppingBag, ChevronRight, Zap
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem('token'); 
        const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/product/all`, {
          withCredentials: true,
          headers: { 'Authorization': `Bearer ${token}` }
        });

        if (res.data.products) {
          setFeaturedProducts(res.data.products.slice(0, 4));
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const categories = [
    { name: 'Electronics', icon: <Smartphone size={18} /> },
    { name: 'Fashion', icon: <Shirt size={18} /> },
    { name: 'Beauty', icon: <Sparkles size={18} /> },
    { name: 'Home', icon: <HomeIcon size={18} /> },
    { name: 'Novels', icon: <BookOpen size={18} /> },
    { name: 'Toys', icon: <Puzzle size={18} /> },
    { name: 'Sports', icon: <Bike size={18} /> },
    { name: 'Kitchen', icon: <Utensils size={18} /> },
    { name: 'Wearables', icon: <Zap size={18} /> },
  ];

  return (
    <div className="bg-[#050505] min-h-screen text-white pb-20 selection:bg-indigo-500/30 overflow-x-hidden w-full">
      
      {/* 1. HERO SECTION */}
      <section className="w-full px-4 sm:px-6 lg:px-12 pt-10 md:pt-20 pb-8 max-w-[1440px] mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative w-full rounded-[2rem] md:rounded-[4rem] overflow-hidden flex items-center justify-center border border-white/10 group shadow-2xl aspect-[4/5] sm:aspect-[16/9] md:aspect-[21/9]"
        >
          <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
            style={{ 
              backgroundImage: `url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop')`, 
              filter: 'brightness(0.3) saturate(1.2)' 
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40" />

          <div className="relative z-10 text-center px-6 w-full">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-block px-4 py-1.5 mb-4 md:mb-6 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
                <span className="text-[10px] md:text-xs font-black tracking-[0.2em] md:tracking-[0.3em] text-indigo-300 uppercase">
                  The Future of Retail
                </span>
              </div>
              
              <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-none italic select-none">
                VELLA
              </h1>
              
              <p className="mt-4 md:mt-6 text-xs md:text-lg font-medium text-gray-300 max-w-xl mx-auto leading-relaxed opacity-90">
                Experience the next evolution of shopping where high fashion meets cutting-edge technology.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* 2. SEARCH BAR */}
      <section className="px-4 sm:px-6 py-6 max-w-3xl mx-auto w-full">
        <div className="relative group">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-indigo-400 transition-colors" size={20} />
          <input 
            type="text" 
            placeholder="Search for Products" 
            className="w-full bg-white/5 border border-white/10 py-4 md:py-6 pl-14 pr-6 rounded-2xl outline-none focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 transition-all font-medium text-base md:text-lg text-white"
          />
        </div>
      </section>

      {/* 3. CATEGORIES SECTION */}
      <section className="px-4 sm:px-6 lg:px-12 py-10 max-w-[1440px] mx-auto w-full">
        <div className="mb-8 text-center md:text-left">
          <h2 className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.3em] italic mb-1">Browse by Department</h2>
          <p className="text-2xl md:text-3xl font-bold text-white">Our Collections</p>
        </div>

        <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-9 gap-3 md:gap-5">
          {categories.map((cat, i) => (
            <div key={i} className="aspect-square bg-white/5 border border-white/10 rounded-2xl md:rounded-3xl flex flex-col items-center justify-center group hover:bg-white transition-all duration-500 cursor-pointer overflow-hidden">
              <div className="w-10 h-10 md:w-14 md:h-14 bg-white/5 rounded-xl md:rounded-2xl mb-2 flex items-center justify-center text-gray-400 group-hover:bg-indigo-500 group-hover:text-white transition-all duration-500">
                {cat.icon}
              </div>
              <span className="font-black uppercase tracking-tighter text-[8px] md:text-[10px] text-gray-500 group-hover:text-black transition-colors duration-500 text-center px-1">
                {cat.name}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* 4. DEALS OF THE DAY */}
      <section className="pl-4 sm:pl-6 lg:pl-12 py-12 max-w-[1440px] mx-auto w-full">
        <div className="mb-8 pr-4 text-center md:text-left">
          <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest">Limited Time</span>
          <h2 className="text-3xl md:text-4xl font-black tracking-tighter mt-1">Deals of the Day</h2>
        </div>

        <div className="flex gap-4 md:gap-6 overflow-x-auto pb-8 pr-4  snap-x snap-mandatory">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="min-w-[75vw] sm:min-w-[320px] md:min-w-[380px] snap-start bg-white/5 border border-white/10 rounded-[1.5rem] md:rounded-[2rem] p-4 md:p-5 flex gap-4 md:gap-5 group hover:border-indigo-500/50 transition-all cursor-pointer">
              <div className="w-20 h-20 md:w-32 md:h-32 aspect-square bg-neutral-900 rounded-xl md:rounded-2xl flex-shrink-0 flex items-center justify-center border border-white/5">
                <span className="text-white/5 font-black italic text-sm md:text-xl">VELLA</span>
              </div>
              <div className="flex flex-col justify-center overflow-hidden">
                <h3 className="text-sm md:text-base font-bold text-gray-200 truncate mb-1">Premium Item</h3>
                <button className="text-[10px] font-black text-indigo-400 hover:text-white transition-all uppercase w-fit tracking-wider">
                  Shop Now →
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. FEATURED PRODUCTS */}
      {/* 5. FEATURED PRODUCTS */}
<section className="px-4 sm:px-6 lg:px-12 py-12 md:py-20 max-w-[1440px] mx-auto w-full">
  <div className="flex flex-col sm:flex-row justify-between items-center sm:items-end mb-12 gap-6">
    <div className="text-center sm:text-left">
      <h2 className="text-4xl md:text-6xl font-black tracking-tighter italic">FEATURED</h2>
      <p className="text-gray-400 text-sm font-medium">Handpicked for your style.</p>
    </div>
    <button 
      onClick={() => navigate('/shop')}
      className="flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black font-bold hover:bg-indigo-500 hover:text-white transition-all text-xs"
    >
      View All <ChevronRight size={16}/>
    </button>
  </div>

  <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
    {loading ? (
      [1, 2, 3, 4].map(i => <div key={i} className="aspect-[3/4] bg-white/5 animate-pulse rounded-[2rem] md:rounded-[2.5rem]" />)
    ) : (
      featuredProducts.map(product => (
        <div 
          key={product._id} 
          // ADD THIS LINE:
          onClick={() => navigate(`/product/${product._id}`)}
          className="group bg-white/5 p-4 md:p-6 rounded-[2rem] md:rounded-[2.5rem] border border-white/5 hover:border-indigo-500/40 transition-all flex flex-col h-full cursor-pointer"
        >
          <div className="aspect-square bg-neutral-900 rounded-2xl md:rounded-3xl mb-4 md:mb-6 flex items-center justify-center relative overflow-hidden shadow-inner">
            {/* Added actual product image support if available, otherwise fallback to placeholder */}
            {product.images && product.images[0] ? (
              <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-80 group-hover:opacity-100" />
            ) : (
              <span className="text-white/[0.03] font-black text-2xl md:text-4xl italic uppercase select-none">Vella</span>
            )}
            
            <button className="absolute bottom-4 right-4 bg-white text-black p-3 md:p-4 rounded-xl md:rounded-2xl opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all shadow-xl active:scale-90">
              <ShoppingBag size={18} />
            </button>
          </div>
          <h4 className="font-bold text-gray-200 truncate text-base md:text-lg mb-2 group-hover:text-indigo-400 transition-colors">{product.name}</h4>
          <div className="flex justify-between items-center mt-auto">
            <p className="text-indigo-400 font-black text-xl md:text-2xl italic">${product.price}</p>
            <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-gray-600 group-hover:text-indigo-500">
              <Zap size={14} />
            </div>
          </div>
        </div>
      ))
    )}
  </div>
</section>

      {/* CSS Utility for No Scrollbar */}
     <style>{`
  .no-scrollbar::-webkit-scrollbar { 
    display: none; 
  }
  .no-scrollbar { 
    -ms-overflow-style: none; 
    scrollbar-width: none; 
  }
`}</style>
    </div>
  );
};

export default Home;