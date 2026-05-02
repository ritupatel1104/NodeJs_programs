import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ShoppingBag, 
  ArrowRight, 
  Zap, 
  ShieldCheck, 
  Smartphone,
  MousePointer2,
  CreditCard,
  PackageCheck
} from 'lucide-react';
import { motion } from 'framer-motion';

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-[#050505] text-white min-h-screen flex flex-col font-sans overflow-x-hidden">
    

     {/* --- 2. HERO SECTION --- */}
{/* --- 2. HERO SECTION --- */}
<section className="relative min-h-[90vh] flex flex-col lg:flex-row items-center justify-between pt-32 pb-10 px-8 lg:px-20 overflow-hidden">
  
  {/* Dynamic Background Glows */}
  <div className="absolute top-1/4 left-0 w-[400px] h-[400px] bg-indigo-500/20 blur-[120px] rounded-full animate-pulse" />
  <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] bg-pink-500/10 blur-[120px] rounded-full" />

  {/* LEFT SIDE: Interactive 3D Phone & Floating Elements */}
  <motion.div 
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 1.2 }}
    className="relative w-full lg:w-1/2 order-2 lg:order-1 flex justify-center items-center"
  >
    {/* The Main "App" Mockup */}
    <motion.div 
      animate={{ 
        y: [0, -20, 0],
        rotateZ: [0, -1, 1, 0] 
      }} 
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      className="relative z-10 w-[280px] md:w-[350px] lg:w-[400px]"
    >
      <img 
        src="https://images.unsplash.com/photo-1512428559087-560fa5ceab42?auto=format&fit=crop&q=80&w=1000" 
        alt="Interactive Shopping App" 
        className="rounded-[3rem] border-[8px] border-white/5 shadow-2xl brightness-90 hover:brightness-100 transition-all cursor-pointer"
      />

      {/* Floating Interactive Card 1: Live Purchases */}
      <motion.div 
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="absolute -left-12 top-20 bg-white/10 backdrop-blur-xl border border-white/20 p-4 rounded-2xl shadow-2xl hidden md:block w-48"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center text-green-400">
            <PackageCheck size={16} />
          </div>
          <p className="text-[10px] font-bold text-white uppercase leading-tight">Order Shipped<br/><span className="text-gray-400 font-medium">2 mins ago</span></p>
        </div>
      </motion.div>

      {/* Floating Interactive Card 2: Security/Trust */}
      <motion.div 
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 1.3, duration: 0.8 }}
        className="absolute -right-12 bottom-20 bg-indigo-600 p-4 rounded-2xl shadow-[0_20px_50px_rgba(79,70,229,0.4)] hidden md:block"
      >
        <div className="flex items-center gap-3">
          <ShieldCheck className="text-white" size={24} />
          <div>
            <p className="text-[10px] font-black text-indigo-100 uppercase tracking-widest">Verified</p>
            <p className="text-xs font-bold text-white italic">Secured Checkout</p>
          </div>
        </div>
      </motion.div>
    </motion.div>

    {/* Background Decorative Element */}
    <div className="absolute w-[500px] h-[500px] border border-white/5 rounded-full animate-[spin_20s_linear_infinite]" />
  </motion.div>

  {/* RIGHT SIDE: Persuasive Content */}
  <motion.div 
    initial={{ opacity: 0, x: 100 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 1 }}
    className="w-full lg:w-1/2 lg:pl-16 text-center lg:text-left z-20 space-y-10 order-1 lg:order-2"
  >
    <div className="space-y-6">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="inline-block px-4 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[10px] font-black uppercase tracking-[0.3em]"
      >
       Don’t Think, Just Cart
      </motion.div>
      
      <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.85] text-white">
        SHOP WITHOUT <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-white to-pink-500">
          LIMITS.
        </span>
      </h1>
      
      <p className="text-gray-400 max-w-xl mx-auto lg:mx-0 text-lg md:text-xl font-medium leading-relaxed">
        Experience a marketplace where quality meets convenience. Curated products, 
        instant tracking, and a community of  happy shoppers.
      </p>
    </div>

    <div className="flex flex-col sm:flex-row items-center gap-6 justify-center lg:justify-start">
      <motion.button 
        whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(99,102,241,0.4)" }}
        whileTap={{ scale: 0.95 }}
        onClick={() => navigate('/login')}
        className="px-12 py-5 bg-indigo-600 text-white font-black rounded-2xl transition-all flex items-center gap-3 uppercase text-sm tracking-widest"
      >
        Get Started <ArrowRight size={20} />
      </motion.button>
      
      
    </div>
  </motion.div>
</section>

      {/* --- 3. PLATFORM DETAILS (Tightened Gap) --- */}
      <section className="py-20 px-8 max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-white/5">
        <div className="group p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-indigo-500/30 transition-all">
          <Zap className="text-indigo-500 mb-6 group-hover:scale-110 transition-transform" size={32} />
          <h3 className="text-xl font-black uppercase tracking-tighter mb-4 italic">Instant Delivery</h3>
          <p className="text-gray-500 leading-relaxed text-sm">No waiting for shipping. Access your digital items immediately after purchase.</p>
        </div>
        <div className="group p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-pink-500/30 transition-all">
          <ShoppingBag className="text-pink-500 mb-6 group-hover:scale-110 transition-transform" size={32} />
          <h3 className="text-xl font-black uppercase tracking-tighter mb-4 italic">Vast Marketplace</h3>
          <p className="text-gray-500 leading-relaxed text-sm">Explore thousands of premium products from verified global creators.</p>
        </div>
        <div className="group p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-emerald-500/30 transition-all">
          <ShieldCheck className="text-emerald-500 mb-6 group-hover:scale-110 transition-transform" size={32} />
          <h3 className="text-xl font-black uppercase tracking-tighter mb-4 italic">Verified Trust</h3>
          <p className="text-gray-500 leading-relaxed text-sm">Shop with confidence. Every transaction is protected by our secure protocols.</p>
        </div>
      </section>

      {/* --- 4. "HOW IT WORKS" SECTION --- */}
      <section className="py-24 px-8 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-black uppercase tracking-tighter">Your Journey in 3 Steps</h2>
        </div>
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
                { icon: <Smartphone />, label: "Join the Club", desc: "Create an account to access member-only deals." },
                { icon: <MousePointer2 />, label: "Pick Your Favorites", desc: "Browse our curated categories and add to your cart." },
                { icon: <CreditCard />, label: "Fast Checkout", desc: "Pay securely and get your items in record time." }
            ].map((step, i) => (
                <div key={i} className="text-center space-y-4">
                    <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto text-indigo-400 border border-white/10">
                        {step.icon}
                    </div>
                    <h4 className="font-bold uppercase tracking-widest text-sm">{step.label}</h4>
                    <p className="text-gray-500 text-xs">{step.desc}</p>
                </div>
            ))}
        </div>
      </section>

      {/* --- 5. CALL TO ACTION SECTION --- */}
      <section className="py-32 px-6">
        <div className="max-w-5xl mx-auto bg-gradient-to-r from-indigo-600 to-pink-600 rounded-[3rem] p-12 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-20"><PackageCheck size={120} /></div>
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-6">READY TO UPGRADE?</h2>
          <p className="text-white/80 max-w-xl mx-auto mb-10 font-medium">Join our members who are already shopping smarter and saving daily.</p>
          <button 
          
            className="px-12 py-5 bg-black text-white font-black rounded-2xl hover:bg-white hover:text-black transition-all uppercase tracking-widest"
          >
            Create My Account
          </button>
        </div>
      </section>


      {/* --- 6. FOOTER --- */}
      <footer className="py-12 px-8 border-t border-white/5 text-center">
         <div className="flex items-center justify-center gap-2 mb-4">
          <div className="w-6 h-6 bg-indigo-600 rounded flex items-center justify-center font-black text-xs">SV</div>
          <span className="text-xl font-black tracking-tighter">SHOPVELLA</span>
        </div>
        <p className="text-gray-600 text-[10px] uppercase tracking-[0.5em]">© 2026 SHOPVELLA COMMERCE HUB. Premium Goods only.</p>
      </footer>

    </div>
  );
};

export default Dashboard;