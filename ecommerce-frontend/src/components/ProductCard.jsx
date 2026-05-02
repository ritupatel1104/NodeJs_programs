import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, X, Star, ArrowRight, ChevronLeft } from 'lucide-react';

const ProductCard = ({ product }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Function to handle closing
  const handleClose = (e) => {
    if (e) e.stopPropagation();
    setIsOpen(false);
  };

  return (
    <div className="relative flex items-center justify-center p-4">
      {/* Background Dimmer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            // Lower z-index than Navbar (usually z-50), but higher than grid
            className="fixed inset-0 bg-black/90 backdrop-blur-md z-40"
          />
        )}
      </AnimatePresence>

      <motion.div
        layout
        onClick={() => !isOpen && setIsOpen(true)}
        className={`relative bg-[#121212] border border-white/10 overflow-hidden cursor-pointer
          ${isOpen 
            ? 'fixed inset-x-4 inset-y-20 md:inset-20 z-40 rounded-[2.5rem] p-8 flex flex-col md:flex-row gap-8 shadow-2xl' 
            : 'w-72 rounded-[2rem] p-4 hover:border-indigo-500/50 transition-colors'
          }`}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        {/* Navigation / Header inside the expanded view */}
        {isOpen && (
          <div className="absolute top-6 left-6 right-6 flex justify-between items-center z-50">
            <button 
              onClick={handleClose}
              className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors text-sm font-medium border border-white/10"
            >
              <ChevronLeft size={18} /> Go Back
            </button>
            <button 
              onClick={handleClose}
              className="p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors border border-white/10"
            >
              <X size={20} />
            </button>
          </div>
        )}

        {/* Product Image */}
        <motion.div 
            layout 
            className={`relative overflow-hidden rounded-2xl bg-white/5 ${
                isOpen ? 'w-full md:w-1/2 aspect-square mt-12 md:mt-0' : 'w-full aspect-[4/5] mb-4'
            }`}
        >
          <motion.img 
            layout
            src={product.images?.[0]} 
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Product Content */}
        <motion.div layout className={`flex flex-col ${isOpen ? 'md:w-1/2 justify-center' : ''}`}>
          <motion.span layout className="text-indigo-500 text-[10px] font-black uppercase tracking-[0.2em] mb-1">
            {product.brand}
          </motion.span>
          
          <motion.h2 layout className={`font-bold tracking-tight leading-tight ${isOpen ? 'text-4xl mb-4 uppercase' : 'text-lg mb-2'}`}>
            {product.name}
          </motion.h2>

          {isOpen && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-4">
                <span className="text-3xl font-black">${product.price}</span>
                <div className="flex items-center gap-1 text-yellow-500 text-sm">
                  <Star size={16} fill="currentColor" />
                  <span>4.9 (2.4k reviews)</span>
                </div>
              </div>

              <p className="text-gray-400 leading-relaxed text-lg">
                {product.description || "Premium build quality meets modern aesthetics. Designed for high-performance and durability."}
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <button className="flex-1 bg-white text-black py-4 rounded-2xl font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-indigo-600 hover:text-white transition-all active:scale-95">
                  <ShoppingBag size={20} /> Add to Cart
                </button>
              </div>
            </motion.div>
          )}

          {!isOpen && (
            <motion.div layout className="flex justify-between items-center">
              <span className="text-xl font-black">${product.price}</span>
              <div className="p-2 bg-indigo-600 rounded-lg">
                <ArrowRight size={16} />
              </div>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ProductCard;