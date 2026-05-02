import React from 'react';
import { motion } from 'framer-motion';
import { 
  Mail, Phone, MapPin, Clock, 
  MessageSquare, Globe, Shield, 
  ArrowUpRight, Send, HelpCircle
} from 'lucide-react';

const ContactPage = () => {
  const contactStats = [
    { label: "Average Response", value: "24m", icon: <Clock size={20} /> },
    { label: "Support Resolution", value: "99.8%", icon: <Shield size={20} /> },
    { label: "Global Offices", value: "12", icon: <Globe size={20} /> }
  ];

  return (
    <div className="bg-[#050505] text-white min-h-screen pt-28 pb-20 px-6 selection:bg-indigo-500/30">
      <div className="max-w-7xl mx-auto">
        
        {/* --- HEADER SECTION --- */}
        <div className="mb-20">
          <motion.span 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-indigo-400 font-black tracking-[0.3em] uppercase text-[10px] mb-4 block"
          >
            Connect With Vella
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-8xl font-black tracking-tighter leading-none italic uppercase"
          >
            Get In <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-400">Touch.</span>
          </motion.h1>
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
          
          {/* --- LEFT COLUMN: CONTACT CHANNELS (BENTO STYLE) --- */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* STATS GRID */}
            <div className="grid grid-cols-3 gap-4">
              {contactStats.map((stat, i) => (
                <div key={i} className="bg-white/5 border border-white/10 p-4 rounded-3xl text-center">
                  <div className="flex justify-center text-indigo-400 mb-2">{stat.icon}</div>
                  <div className="text-xl font-bold">{stat.value}</div>
                  <div className="text-[10px] text-gray-500 uppercase font-black tracking-widest">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* DIRECT CHANNELS */}
            <div className="bg-gradient-to-br from-indigo-600/20 to-purple-600/10 border border-white/10 rounded-[2.5rem] p-8 relative overflow-hidden group">
               <div className="relative z-10">
                  <h3 className="text-2xl font-bold mb-6 italic italic">Priority Support</h3>
                  <div className="space-y-6">
                    <div className="flex items-center gap-4 group/item cursor-pointer">
                      <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center group-hover/item:bg-indigo-500 transition-colors">
                        <Mail size={20} />
                      </div>
                      <div>
                        <p className="text-[10px] text-gray-500 uppercase font-black">Email Us</p>
                        <p className="font-bold">support@vella.com</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 group/item cursor-pointer">
                      <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center group-hover/item:bg-indigo-500 transition-colors">
                        <Phone size={20} />
                      </div>
                      <div>
                        <p className="text-[10px] text-gray-500 uppercase font-black">Call Central</p>
                        <p className="font-bold">+1 (888) VELLA-HQ</p>
                      </div>
                    </div>
                  </div>
               </div>
               <ArrowUpRight className="absolute top-6 right-6 text-white/20 group-hover:text-white transition-all" size={40} />
            </div>

            {/* GLOBAL LOCATIONS */}
            <div className="bg-white/5 border border-white/5 rounded-[2.5rem] p-8">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2 italic italic">
                <MapPin size={18} className="text-indigo-400" /> HQ Locations
              </h3>
              <div className="grid grid-cols-2 gap-6 text-sm">
                <div>
                  <p className="font-bold text-gray-300">San Francisco</p>
                  <p className="text-gray-500 text-xs">44 Tehama St, CA 94105</p>
                </div>
                <div>
                  <p className="font-bold text-gray-300">London</p>
                  <p className="text-gray-500 text-xs">20-22 Wenlock Rd, N1 7GU</p>
                </div>
              </div>
            </div>
          </div>

          {/* --- RIGHT COLUMN: THE HEAVY FORM --- */}
          <div className="lg:col-span-7">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="bg-white/5 border border-white/10 rounded-[3rem] p-8 md:p-12 relative overflow-hidden backdrop-blur-xl"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 blur-[100px] -z-10" />
              
              <h2 className="text-3xl font-black mb-8 italic uppercase italic">Submit a Ticket</h2>
              
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase font-black text-gray-500 tracking-widest ml-2">Full Name</label>
                    <input type="text" placeholder="John Doe" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-indigo-500 transition-all" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase font-black text-gray-500 tracking-widest ml-2">Email Address</label>
                    <input type="email" placeholder="john@example.com" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-indigo-500 transition-all" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-black text-gray-500 tracking-widest ml-2">Department</label>
                  <select className="w-full bg-[#0a0a0a] border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-indigo-500 transition-all appearance-none cursor-pointer">
                    <option>General Inquiry</option>
                    <option>Order Tracking</option>
                    <option>Technical Support</option>
                    <option>Returns & Exchanges</option>
                    <option>Business/Wholesale</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-black text-gray-500 tracking-widest ml-2">Detailed Message</label>
                  <textarea rows="5" placeholder="How can we help?" className="w-full bg-white/5 border border-white/10 rounded-3xl px-6 py-4 outline-none focus:border-indigo-500 transition-all resize-none"></textarea>
                </div>

                <button className="w-full bg-white text-black py-5 rounded-full font-black uppercase text-xs tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-indigo-500 hover:text-white transition-all active:scale-[0.98]">
                  Initialize Transmission <Send size={16} />
                </button>
              </form>
            </motion.div>
          </div>
        </div>

        {/* --- BOTTOM SECTION: FAQ TEASER --- */}
        <div className="mt-20 border-t border-white/5 pt-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
              <HelpCircle className="text-gray-400" />
            </div>
            <div>
              <p className="font-bold italic">Looking for instant answers?</p>
              <p className="text-gray-500 text-sm">Our self-service knowledge base is available 24/7.</p>
            </div>
          </div>
          <button className="px-8 py-4 border border-white/10 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-white/5 transition-all">
            Visit Help Center
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;