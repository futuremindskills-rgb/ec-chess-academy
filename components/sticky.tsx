"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ChevronUp, MessageCircle } from "lucide-react";
import Link from "next/link";

const StickySidebar: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Handle Scroll to Top visibility logic
  useEffect(() => {
    const toggleVisibility = () => {
      // Show "Top" button when user scrolls down 400px
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
    // Added right-6 and top-[55%] to give it a floaty, modern placement
    <div className="fixed right-1 top-[55%] -translate-y-1/2 z-[100] hidden lg:flex flex-col items-center">
      
      {/* --- MASCOT HEAD (Floating above the pill) --- */}
      <motion.div 
        whileHover={{ y: -5, rotate: -8 }}
        transition={{ type: "spring", stiffness: 300 }}
        className="relative w-30 h-30 -mb-4 z-10 drop-shadow-2xl cursor-pointer"
      >
         <img 
            src="/cat.png" // Your mascot image
            alt="Academy Mascot" 
            className="w-full h-full object-contain" 
         />
      </motion.div>

      {/* --- ACTION PILL (Now rounded on all sides) --- */}
      <div className="
  bg-[#FF7A00]
  rounded-full
  py-7 px-3
  flex flex-col
  items-center
  gap-4
  shadow-[0_20px_50px_rgba(255,122,0,0.3)]
  border-2 border-white/40
">

        
        {/* FREE TRIAL BUTTON */}
        <Link href="/book-demo" className="group flex flex-col items-center gap-2">
          <motion.div 
            whileHover={{ scale: 1.15, rotate: 12 }}
            className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-[#FF7A00] shadow-xl group-hover:bg-indigo-900 group-hover:text-white transition-all duration-300"
          >
            <Sparkles size={22} fill="currentColor" fillOpacity={0.1} />
          </motion.div>
          <span className="text-[9px] font-[1000] text-white uppercase text-center leading-none tracking-tighter">
            Free <br/> Trial
          </span>
        </Link>

        {/* CHAT NOW BUTTON */}
        <Link href="https://wa.me/yournumber" target="_blank" className="group flex flex-col items-center gap-2">
          <motion.div 
            whileHover={{ scale: 1.15, rotate: -12 }}
            className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-[#FF7A00] shadow-xl group-hover:bg-[#25D366] group-hover:text-white transition-all duration-300"
          >
            <MessageCircle size={22} fill="currentColor" fillOpacity={0.1} />
          </motion.div>
          <span className="text-[9px] font-[1000] text-white uppercase text-center leading-none tracking-tighter">
            Chat <br/> Now
          </span>
        </Link>

        {/* SCROLL TO TOP - Animated Presence */}
        <AnimatePresence>
          {isVisible && (
            <motion.button
              initial={{ opacity: 0, scale: 0, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0, y: 20 }}
              onClick={scrollToTop}
              className="mt-2 group flex flex-col items-center gap-1.5"
            >
              <div className="w-10 h-10 rounded-full bg-black/30 flex items-center justify-center text-white hover:bg-white hover:text-[#FF7A00] transition-all border border-white/20 shadow-inner">
                <ChevronUp size={20} strokeWidth={4} />
              </div>
              <span className="text-[8px] font-black text-white/80 uppercase tracking-widest">Top</span>
            </motion.button>
          )}
        </AnimatePresence>
      </div>

    </div>
  );
};

export default StickySidebar;