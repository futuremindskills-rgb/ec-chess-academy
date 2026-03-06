"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ChevronUp, MessageCircle } from "lucide-react";
import Link from "next/link";

const StickySidebar: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 400) setIsVisible(true);
      else setIsVisible(false);
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="fixed right-0 lg:right-0 top-[60%] -translate-y-1/2 z-[100] flex flex-col items-center scale-75 md:scale-90 lg:scale-100 origin-right transition-transform duration-300">
      
      {/* --- MASCOT HEAD --- */}
      <motion.div 
        whileHover={{ y: -5, rotate: -8 }}
        transition={{ type: "spring", stiffness: 300 }}
        className="relative w-24 h-24 lg:w-30 lg:h-30 -mb-4 z-10 drop-shadow-2xl cursor-pointer"
      >
         <img 
            src="/cat.png" 
            alt="Mascot" 
            className="w-full h-full object-contain" 
         />
      </motion.div>

      {/* --- ACTION PILL --- */}
      <div className="
        bg-[#FF7A00]
        rounded-full
        py-6 px-3 lg:py-7 lg:px-4
        flex flex-col
        items-center
        gap-4 lg:gap-5
        shadow-[0_20px_50px_rgba(255,122,0,0.3)]
        border-2 border-white/40
        backdrop-blur-sm
      ">
        
        {/* FREE TRIAL BUTTON */}
        <Link href="/contact" className="group flex flex-col items-center gap-1 lg:gap-2">
          <motion.div 
            whileHover={{ scale: 1.15, rotate: 12 }}
            whileTap={{ scale: 0.9 }}
            className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-white flex items-center justify-center text-[#FF7A00] shadow-xl group-hover:bg-indigo-900 group-hover:text-white transition-all duration-300"
          >
            {/* Fix: Use className for responsive sizes instead of lg:size */}
            <Sparkles 
              className="w-5 h-5 lg:w-6 lg:h-6" 
              fill="currentColor" 
              fillOpacity={0.1} 
            />
          </motion.div>
          <span className="text-[8px] lg:text-[9px] font-[1000] text-white uppercase text-center leading-none tracking-tighter">
            Free <br/> Trial
          </span>
        </Link>

        {/* CHAT NOW BUTTON */}
        <Link href="https://wa.me/85254066800" target="_blank" className="group flex flex-col items-center gap-1 lg:gap-2">
          <motion.div 
            whileHover={{ scale: 1.15, rotate: -12 }}
            whileTap={{ scale: 0.9 }}
            className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-white flex items-center justify-center text-[#FF7A00] shadow-xl group-hover:bg-[#25D366] group-hover:text-white transition-all duration-300"
          >
            {/* Fix: Use className for responsive sizes */}
            <MessageCircle 
              className="w-5 h-5 lg:w-6 lg:h-6" 
              fill="currentColor" 
              fillOpacity={0.1} 
            />
          </motion.div>
          <span className="text-[8px] lg:text-[9px] font-[1000] text-white uppercase text-center leading-none tracking-tighter">
            Chat <br/> Now
          </span>
        </Link>

        {/* SCROLL TO TOP - Animated Presence */}
        <AnimatePresence>
          {isVisible && (
            <motion.button
              initial={{ opacity: 0, scale: 0, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0, y: 10 }}
              onClick={scrollToTop}
              className="mt-1 group flex flex-col items-center gap-1"
            >
              <div className="w-9 h-9 lg:w-10 lg:h-10 rounded-full bg-black/30 flex items-center justify-center text-white hover:bg-white hover:text-[#FF7A00] transition-all border border-white/20 shadow-inner">
                {/* Fix: Removed lg:size and used className */}
                <ChevronUp 
                  strokeWidth={4} 
                  className="w-4 h-4 lg:w-5 lg:h-5" 
                />
              </div>
              <span className="text-[7px] lg:text-[8px] font-black text-white/80 uppercase tracking-widest">Top</span>
            </motion.button>
          )}
        </AnimatePresence>
      </div>

    </div>
  );
};

export default StickySidebar;