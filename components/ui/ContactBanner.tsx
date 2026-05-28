"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Home, ChevronRight, HelpCircle } from 'lucide-react';
import { useLocale } from 'next-intl';

interface PageBannerProps {
  title: string;
  highlight: string;
  description: string;
  currentPage: string;
}

const PageBanner: React.FC<PageBannerProps> = ({
  title,
  highlight,
  description,
  currentPage
}) => {
  const locale = useLocale();
  const isZh = locale === "zh";
  
  // Array of images for the background grid
  const bgThumbnails = [
    "/1.webp", "/2.webp", "/3.webp", "/1.webp",
    "/2.webp", "/3.webp", "/1.webp", "/2.webp",
  ];

  return (
    <header className="relative w-full bg-white overflow-hidden pt-28 pb-16 lg:pt-40 lg:pb-24 font-sans border-b border-slate-50">
      
      {/* --- 1. IMAGE GRID BACKGROUND (Decorative) --- */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <motion.div 
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 0.3, scale: 1.05 }} 
          transition={{ duration: 1.5 }}
          className="absolute -inset-[5%] grid grid-cols-2 md:grid-cols-4 gap-3 transform rotate-2"
        >
          {bgThumbnails.map((src, i) => (
            <div 
              key={i} 
              className="relative aspect-video bg-slate-100 rounded-2xl overflow-hidden border border-slate-100 shadow-sm"
            >
              <Image 
                src={src} 
                alt="" 
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            </div>
          ))}
        </motion.div>

        {/* --- 2. THE OVERLAY (Fading into the white background) --- */}
        <div className="absolute inset-0 bg-gradient-to-b from-white via-white/20 to-white z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-white z-10" />
      </div>

      {/* --- 3. MAIN CONTENT --- */}
      <div className="container mx-auto px-6 relative z-20 flex flex-col items-center text-center">
        
        {/* Top Mini Badge */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900 text-white text-[10px] md:text-[11px] font-black uppercase tracking-[0.2em] mb-6 shadow-xl"
        >
          <HelpCircle size={12} className="text-orange-400" />
          {isZh ? "專屬支持" : "Direct Support"}
        </motion.div>

        {/* Title with Masters Moves Gradient */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-7xl lg:text-8xl font-[1000] text-slate-900 mb-6 tracking-tighter leading-[0.9] uppercase"
        >
          {title} <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1a5f5f] to-orange-500 italic">
            {highlight}
          </span>
        </motion.h1>
        
        {/* Description */}
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-base md:text-xl text-slate-500 max-w-2xl mb-10 font-medium leading-relaxed"
        >
          {description}
        </motion.p>

        {/* Breadcrumb Navigation */}
        <motion.nav 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-3 px-5 py-2.5 rounded-2xl bg-white shadow-2xl shadow-slate-200/50 border border-slate-100"
        >
          <Link 
            href="/" 
            className="text-slate-400 hover:text-orange-600 transition-colors flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider"
          >
            <Home size={14} />
            <span>{isZh ? "主頁" : "Home"}</span>
          </Link>
          
          <ChevronRight className="w-3 h-3 text-slate-200" strokeWidth={3} />
          
          <span className="text-slate-900 font-bold text-[11px] uppercase tracking-wider">
            {currentPage}
          </span>
        </motion.nav>

      </div>

      {/* Subtle Bottom Ambient Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-32 bg-gradient-to-t from-slate-50/50 to-transparent -z-10" />

    </header>
  );
};

export default PageBanner;