"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Home, ChevronRight, Trophy, Sparkles, Swords } from 'lucide-react';
import { useLocale } from 'next-intl';

const TournamentBanner: React.FC = () => {
  const locale = useLocale();
  const isZh = locale === "zh";
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
          animate={{ opacity: 0.35 }} 
          className="absolute -inset-[5%] grid grid-cols-2 md:grid-cols-4 gap-3 transform rotate-2 scale-105"
        >
          {bgThumbnails.map((src, i) => (
            <div 
              key={i} 
              className="aspect-video bg-slate-100 rounded-xl overflow-hidden border border-slate-100 shadow-sm"
            >
              <img 
                src={src} 
                alt="Tournament Action" 
                className="w-full h-full object-cover" 
              />
            </div>
          ))}
        </motion.div>

        {/* --- 2. THE OVERLAY (Fading into white background) --- */}
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
          <Trophy size={10} className="text-[#f59e0b]" />
          {isZh ? "竞技舞台" : "Competitive Arena"}
        </motion.div>

        {/* Title */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-7xl font-[1000] text-slate-900 mb-4 tracking-tighter leading-[0.95] uppercase"
        >
          {isZh ? "精英" : "ELITE"} <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1a5f5f] to-[#f59e0b]">
            {isZh ? "赛事" : "TOURNAMENTS"}
          </span>
        </motion.h1>
        
        {/* Compact Description */}
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-sm md:text-lg text-slate-600 max-w-xl mb-8 font-medium leading-snug"
        >
          {isZh ? "通过常规院内赛事与 FIDE 评级比赛检验实力，培养韧性与体育精神。" : "Testing skills, building resilience, and fostering sportsmanship through regular internal events and FIDE-rated championships."}
        </motion.p>

        {/* Breadcrumb Navigation */}
        <motion.nav 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white shadow-xl border border-slate-100"
        >
          <Link href="/" className="text-slate-400 hover:text-[#1a5f5f] transition-colors flex items-center gap-2 text-[10px] font-black uppercase tracking-widest">
            <Home size={12} />
            <span>{isZh ? "主页" : "Home"}</span>
          </Link>
          
          <ChevronRight className="w-3 h-3 text-slate-200" strokeWidth={3} />
          
          <span className="text-slate-900 font-black text-[10px] uppercase tracking-widest">
            {isZh ? "赛事" : "Tournaments"}
          </span>
        </motion.nav>

      </div>

      {/* Subtle Floating Swords Icon */}
      <motion.div 
        animate={{ 
          y: [0, -10, 0],
          opacity: [0.1, 0.3, 0.1]
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-10 left-[10%] text-[#1a5f5f] hidden md:block"
      >
        <Swords size={32} />
      </motion.div>

      {/* Subtle Floating Sparkle */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.5, 0.2]
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 right-[10%] text-[#f59e0b] hidden md:block"
      >
        <Sparkles size={20} />
      </motion.div>
    </div>
  );
};

export default TournamentBanner;