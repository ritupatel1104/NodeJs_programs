import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Globe, ShieldCheck, Layers, Zap, Box, Truck 
} from 'lucide-react';
// 1. IMPORT your ChatDrawer component here
import ChatDrawer from '../components/ChatDrawer'; 

const About = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const features = [
    {
      title: "Infinite Catalog",
      desc: "From high-performance tech to bespoke fashion, we bridge the gap between every category of modern living.",
      icon: <Layers className="text-indigo-400" size={24} />
    },
    {
      title: "Global Logistics",
      desc: "Our proprietary fulfillment network ensures that whether it's a micro-chip or a winter coat, it arrives in record time.",
      icon: <Truck className="text-purple-400" size={24} />
    },
    {
      title: "Certified Quality",
      desc: "Every category has a dedicated expert panel. If it’s on Vella, it has passed our 48-point quality inspection.",
      icon: <ShieldCheck className="text-pink-400" size={24} />
    }
  ];

  return (
    <div className="bg-[#050505] text-white min-h-screen selection:bg-indigo-500/30 overflow-x-hidden">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-32 pb-20 px-6 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid lg:grid-cols-2 gap-16 items-center"
        >
          <div>
            <span className="flex items-center gap-2 text-indigo-400 font-black tracking-[0.3em] uppercase text-[10px] mb-6">
              <Globe size={14} /> Global Commerce 
            </span>
            <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-[0.9] mb-8 italic">
              EVERYTHING <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-400">IN ONE VAULT.</span>
            </h1>
            <p className="text-gray-400 text-lg leading-relaxed max-w-xl">
              Vella was built on a simple premise: Why go to ten stores when you can find the pinnacle of every category in one? We’ve unified electronics, fashion, and lifestyle tech into a single, seamless ecosystem. 
            </p>
          </div>
          <div className="relative aspect-video lg:aspect-square rounded-[3rem] overflow-hidden border border-white/10 group">
            <img 
              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop" 
              className="object-cover w-full h-full grayscale group-hover:grayscale-0 transition-all duration-700 scale-110" 
              alt="Warehouse Tech"
            />
          </div>
        </motion.div>
      </section>

      {/* 2. CORE FEATURES */}
      <section className="py-32 px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <motion.div 
              key={i}
              className="p-10 rounded-[2.5rem] bg-white/5 border border-white/5 hover:border-indigo-500/50 transition-all group"
            >
              <div className="mb-6 p-4 bg-white/5 w-fit rounded-2xl group-hover:bg-indigo-500 transition-colors">
                {f.icon}
              </div>
              <h4 className="text-2xl font-bold mb-4 tracking-tight uppercase italic">{f.title}</h4>
              <p className="text-gray-500 leading-relaxed text-sm">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 3. SUPPORT FOOTER */}
      <section className="py-32 px-6 max-w-7xl mx-auto">
        <div className="bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-[3rem] p-8 md:p-20 text-center relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-10 opacity-10 group-hover:opacity-20 transition-opacity">
            <Zap size={200} />
          </div>
          <div className="relative z-10">
            <h3 className="text-3xl md:text-6xl font-black tracking-tighter mb-6 italic uppercase">Universal Support</h3>
            <p className="max-w-xl mx-auto mb-10 text-gray-400 text-lg">Whether it's a technical query or a sizing guide, our experts are standing by.</p>
            <div className="flex flex-wrap justify-center gap-4">

              {/* THIS TRIGGER BUTTON NOW WORKS */}
              <button 
                onClick={() => setIsChatOpen(true)}
                className="bg-white text-black px-10 py-4 rounded-full font-black uppercase text-xs tracking-[0.2em] hover:bg-indigo-500 hover:text-white transition-all active:scale-95"
              >
                Chat Now
              </button>
              
              <button className="bg-white/5 backdrop-blur-md text-white border border-white/10 px-10 py-4 rounded-full font-black uppercase text-xs tracking-[0.2em] hover:bg-white/10 transition-all">Knowledge Base</button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. RENDER THE DRAWER COMPONENT HERE */}
      <ChatDrawer 
        isOpen={isChatOpen} 
        onClose={() => setIsChatOpen(false)} 
      />

    </div>
  );
};

export default About;