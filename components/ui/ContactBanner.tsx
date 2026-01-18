"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Home, ChevronRight, HelpCircle, Sparkles } from 'lucide-react';

interface PageBannerProps {
  title?: string;
  highlight?: string;
  description?: string;
  currentPage?: string;
}

const PageBanner: React.FC<PageBannerProps> = ({
  title = "Contact",
  highlight = "Us",
  description = "Have questions about our programs? Our master coaches are ready to assist you.",
  currentPage = "Contact"
}) => {
  
  // Array of images for the Netflix-style background grid
  const bgThumbnails = [
    "/1.webp", "/2.webp", "/3.webp", "/1.webp",
    "/2.webp", "/3.webp", "/1.webp", "/2.webp",
  ];

  return (
    <div className="relative w-full bg-white overflow-hidden pt-28 pb-16 lg:pt-36 lg:pb-20 font-sans border-b border-slate-50">
      
      {/* --- 1. NETFLIX-STYLE IMAGE GRID BACKGROUND --- */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.35 }} // Subtle visibility
          className="absolute -inset-[5%] grid grid-cols-2 md:grid-cols-4 gap-3 transform rotate-2 scale-105"
        >
          {bgThumbnails.map((src, i) => (
            <div 
              key={i} 
              className="aspect-video bg-slate-100 rounded-xl overflow-hidden border border-slate-100 shadow-sm"
            >
              <img 
                src={src} 
                alt="Academy Life" 
                className="w-full h-full object-cover" 
              />
            </div>
          ))}
        </motion.div>

        {/* --- 2. THE OVERLAY (Fading into the white background) --- */}
        <div className="absolute inset-0 bg-gradient-to-b from-white via-white/10 to-white z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-white z-10" />
      </div>

      {/* --- 3. MAIN CONTENT --- */}
      <div className="container mx-auto px-6 relative z-20 flex flex-col items-center text-center">
        
        {/* Top Mini Badge */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 text-white text-[9px] font-black uppercase tracking-widest mb-4 shadow-lg"
        >
          <HelpCircle size={10} className="text-[#f59e0b]" />
          Direct Support
        </motion.div>

        {/* Title with Masters Moves Gradient */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-7xl font-[1000] text-slate-900 mb-4 tracking-tighter leading-[0.95] uppercase"
        >
          {title} <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1a5f5f] to-[#f59e0b]">
            {highlight}
          </span>
        </motion.h1>
        
        {/* Compact Description */}
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-sm md:text-lg text-slate-600 max-w-xl mb-8 font-medium leading-snug"
        >
          {description}
        </motion.p>

        {/* Smaller Breadcrumb Navigation */}
        <motion.nav 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white shadow-xl border border-slate-100"
        >
          <Link href="/" className="text-slate-400 hover:text-[#1a5f5f] transition-colors flex items-center gap-2 text-[10px] font-black uppercase tracking-widest">
            <Home size={12} />
            <span>Home</span>
          </Link>
          
          <ChevronRight className="w-3 h-3 text-slate-200" strokeWidth={3} />
          
          <span className="text-slate-900 font-black text-[10px] uppercase tracking-widest">
            {currentPage}
          </span>
        </motion.nav>

      </div>

      {/* Subtle Bottom Ambient Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-24 bg-gradient-to-t from-slate-50 to-transparent -z-10" />

    </div>
  );
};

export default PageBanner;