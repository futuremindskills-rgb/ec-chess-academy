"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Home, ChevronRight, Camera, Sparkles } from 'lucide-react';
import { useLocale } from 'next-intl';

const GalleryBanner: React.FC = () => {
  const locale = useLocale();
  const isZh = locale === "zh";
  // Array of images for the Netflix-style background grid
  const bgThumbnails = [
    "/1.webp", "/2.webp", "/3.webp", "/1.webp",
    "/2.webp", "/3.webp", "/1.webp", "/2.webp",
  ];

  return (
    <div className="relative w-full bg-white overflow-hidden pt-24 pb-12 sm:pt-32 sm:pb-16 lg:pt-44 lg:pb-24 font-sans border-b border-slate-50">
      
      {/* --- 1. NETFLIX-STYLE IMAGE GRID BACKGROUND --- */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }} 
          // Responsive Grid: 2 cols for mobile, 3 for tablet, 4 for desktop
          className="absolute -inset-[10%] sm:-inset-[5%] grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4 transform rotate-3 scale-110"
        >
          {bgThumbnails.map((src, i) => (
            <div 
              key={i} 
              className="aspect-video bg-slate-100 rounded-lg sm:rounded-2xl overflow-hidden border border-slate-100 shadow-sm"
            >
              <img 
                src={src} 
                alt="Academy Life" 
                className="w-full h-full object-cover" 
                loading="lazy"
              />
            </div>
          ))}
        </motion.div>

        {/* --- 2. THE OVERLAY (Enhanced Gradients for better readability) --- */}
        <div className="absolute inset-0 bg-gradient-to-b from-white via-white/10 to-white z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-white z-10" />
      </div>

      {/* --- 3. MAIN CONTENT --- */}
      <div className="container mx-auto px-4 sm:px-6 relative z-20 flex flex-col items-center text-center">
        
        {/* Top Mini Badge */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 text-white text-[8px] sm:text-[10px] font-black uppercase tracking-[0.2em] mb-4 sm:mb-6 shadow-xl"
        >
          <Camera size={12} className="text-[#f59e0b]" />
          {isZh ? "视觉之旅" : "Visual Journey"}
        </motion.div>

        {/* Title: Fluid font size from mobile to desktop */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl sm:text-4xl lg:text-7xl font-[1000] text-slate-900 mb-4 sm:mb-6 tracking-tighter leading-[0.85] uppercase"
        >
          {isZh ? "我们的" : "OUR"} <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1a5f5f] to-[#f59e0b]">
            {isZh ? "图库" : "GALLERY"}
          </span>
        </motion.h1>
        
        {/* Compact Description: Responsive width and size */}
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-xs sm:text-base md:text-lg text-slate-600 max-w-[280px] sm:max-w-md md:max-w-xl mb-8 sm:mb-10 font-medium leading-relaxed"
        >
          {isZh ? "记录课堂中的探索、思辨与成长瞬间。" : "Capturing the moments of discovery, critical thinking, and joy in our classrooms."}
        </motion.p>

        {/* Breadcrumb Navigation: Touch-friendly padding for mobile */}
        <motion.nav 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-2.5 sm:py-3 rounded-2xl bg-white/80 backdrop-blur-md shadow-2xl shadow-slate-200/50 border border-slate-100"
        >
          <Link href="/" className="text-slate-400 hover:text-[#1a5f5f] transition-colors flex items-center gap-2 text-[10px] font-black uppercase tracking-widest">
            <Home size={14} />
            <span className="hidden xs:inline">{isZh ? "主页" : "Home"}</span>
          </Link>
          
          <ChevronRight className="w-3 h-3 text-slate-300" strokeWidth={3} />
          
          <span className="text-slate-900 font-black text-[10px] uppercase tracking-widest">
            {isZh ? "图库" : "Gallery"}
          </span>
        </motion.nav>

      </div>

      {/* Floating Sparkles: Multiple icons with varying positions for visual depth */}
      <motion.div 
        animate={{ y: [0, -15, 0], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-12 left-[10%] text-[#f59e0b] hidden sm:block pointer-events-none"
      >
        <Sparkles size={28} />
      </motion.div>

      <motion.div 
        animate={{ y: [0, 15, 0], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute top-20 right-[10%] text-[#1a5f5f] hidden lg:block pointer-events-none"
      >
        <Sparkles size={20} />
      </motion.div>
    </div>
  );
};

export default GalleryBanner;