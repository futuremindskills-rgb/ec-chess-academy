"use client";
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Home, ChevronRight, Sparkles, Trophy, Users } from 'lucide-react';
import { useLocale } from 'next-intl';

const AboutBanner: React.FC = () => {
  const locale = useLocale();
  const isZh = locale === "zh";
  const bgThumbnails = [
    "/1.webp", "/2.webp", "/3.webp", "/1.webp",
    "/2.webp", "/3.webp", "/1.webp", "/2.webp",
  ];

  return (
    // Reduced padding from pt-40/pb-32 to pt-28/pb-16
    <div className="relative w-full bg-white overflow-hidden pt-28 pb-16 lg:pt-16 lg:pb-20 font-sans">
      
      {/* --- 1. IMAGE GRID BACKGROUND --- */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }} 
          className="absolute -inset-[5%] grid grid-cols-2 md:grid-cols-4 gap-3 transform rotate-2 scale-105"
        >
          {bgThumbnails.map((src, i) => (
            <div key={i} className="aspect-video bg-slate-100 rounded-xl overflow-hidden border border-slate-100">
              <img src={src} alt="" className="w-full h-full object-cover" />
            </div>
          ))}
        </motion.div>
        {/* Gradients to fade edges */}
        <div className="absolute inset-0 bg-gradient-to-b from-white via-white/20 to-white z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-white z-10" />
      </div>

      {/* --- 2. MAIN CONTENT --- */}
      <div className="container mx-auto px-6 relative z-20 flex flex-col items-center text-center">
        
        {/* Compact Badge */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 text-white text-[9px] font-black uppercase tracking-widest mb-4 shadow-lg"
        >
          <Sparkles size={10} className="text-orange-400" />
          {isZh ? "创立于 2010" : "Established 2010"}
        </motion.div>

        {/* Scaled Down Title */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-7xl font-[1000] text-slate-900 mb-4 tracking-tighter leading-[0.95]"
        >
          {isZh ? "棋艺" : "MASTERS"} <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-indigo-900">
            {isZh ? "大师团队" : "OF THE BOARD"}
          </span>
        </motion.h1>
        
        {/* Compact Description */}
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-sm md:text-lg text-slate-600 max-w-xl mb-8 font-medium leading-snug"
        >
          {isZh ? "以精英棋艺导师体系，把潜力转化为真正实力。" : "Dubai&apos;s premier strategy academy. We turn potential into excellence through elite chess mentorship."}
        </motion.p>

        {/* Smaller Breadcrumb */}
        <motion.nav 
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white shadow-xl border border-slate-100 mb-12"
        >
          <Link href="/" className="text-slate-400 hover:text-orange-500 transition-colors flex items-center gap-2 text-[10px] font-black uppercase">
            <Home size={12} /> {isZh ? "主页" : "Home"}
          </Link>
          <ChevronRight className="w-3 h-3 text-slate-200" strokeWidth={3} />
          <span className="text-slate-900 font-black text-[10px] uppercase">{isZh ? "关于学院" : "About Academy"}</span>
        </motion.nav>

        {/* Tightened Stats Grid */}
        <div className="grid grid-cols-3 gap-8 md:gap-16 border-t border-slate-100 pt-8 w-full max-w-2xl">
            <div className="flex flex-col items-center">
                <span className="text-2xl md:text-3xl font-black text-slate-900">15+</span>
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{isZh ? "年经验" : "Years"}</span>
            </div>
            <div className="flex flex-col items-center">
                <span className="text-2xl md:text-3xl font-black text-slate-900">500+</span>
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{isZh ? "学员" : "Students"}</span>
            </div>
            <div className="flex flex-col items-center">
                <span className="text-2xl md:text-3xl font-black text-slate-900 uppercase">FIDE</span>
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{isZh ? "认证" : "Certified"}</span>
            </div>
        </div>
      </div>
    </div>
  );
};

export default AboutBanner;