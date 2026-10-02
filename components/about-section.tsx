"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Trophy, ShieldCheck, Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";

const AboutSection: React.FC = () => {
  const t = useTranslations("home.about");
  return (
    <section className="relative w-full py-16 md:py-24 lg:py-32 bg-white overflow-hidden">
      
      {/* --- MOVING BACKGROUND LINES (Responsive Scaling) --- */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <svg 
          className="w-full h-full opacity-[0.1]" 
          viewBox="0 0 1200 600" 
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          <motion.path
            d="M-100 300 C 150 100, 450 500, 1200 200"
            stroke="#380869" 
            strokeWidth="4"
            fill="transparent"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            transition={{ duration: 5, ease: "easeInOut" }}
            viewport={{ once: true }}
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* LEFT: TEXT CONTENT */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 space-y-8 order-2 lg:order-1"
          >
            <div className="space-y-4 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-50 border border-orange-100 text-orange-600 text-[10px] md:text-xs font-black uppercase tracking-widest shadow-sm">
                <Sparkles size={14} />
                {t("badge")}
              </div>
              
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-[1000] text-slate-900 leading-[1.1] tracking-tighter uppercase">
                {t("titlePrefix")} <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">{t("titleHighlight")}</span> <br className="hidden sm:block" />
                {t("titleSuffix")}
              </h2>
            </div>

            <div className="space-y-6 text-center lg:text-left max-w-2xl mx-auto lg:mx-0">
              <p className="text-slate-500 text-base md:text-lg lg:text-xl leading-relaxed font-medium">
                {t("description1")}
              </p>
              
              <p className="text-slate-500 text-base md:text-lg lg:text-xl leading-relaxed font-medium">
                {t("description2")}
              </p>
            </div>

            {/* Micro Stats List (Adaptive Grid) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-8 border-t border-slate-100">
              <div className="flex items-center justify-center lg:justify-start gap-4">
                <div className="w-12 h-12 shrink-0 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 shadow-inner">
                  <ShieldCheck size={22} />
                </div>
                <span className="text-xs md:text-sm font-black text-slate-700 uppercase tracking-tight leading-tight">
                  {t("stat1a")} <br/> {t("stat1b")}
                </span>
              </div>
              <div className="flex items-center justify-center lg:justify-start gap-4">
                <div className="w-12 h-12 shrink-0 rounded-2xl bg-orange-50 flex items-center justify-center text-orange-600 shadow-inner">
                  <Trophy size={22} />
                </div>
                <span className="text-xs md:text-sm font-black text-slate-700 uppercase tracking-tight leading-tight">
                  {t("stat2a")} <br/> {t("stat2b")}
                </span>
              </div>
            </div>
          </motion.div>

          {/* RIGHT: ORGANIC IMAGE (Optimized for Mobile) */}
          <div className="lg:col-span-6 relative flex justify-center lg:justify-end order-1 lg:order-2 py-8 md:py-12">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="relative w-full max-w-[320px] md:max-w-[420px] lg:max-w-[480px]"
            >
              
              {/* --- THICK ROTATING RINGS --- */}
              {/* Scaled insets for mobile to prevent overflow */}
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-4 md:-inset-8 border-[8px] md:border-[12px] border-cyan-600/30 opacity-50 pointer-events-none"
                style={{ borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%" }}
              />

              <motion.div 
                animate={{ rotate: -360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-6 md:-inset-12 border-[6px] md:border-[8px] border-dashed border-orange-800/20 opacity-30 pointer-events-none hidden sm:block"
                style={{ borderRadius: "40% 60% 70% 30% / 50% 60% 40% 50%" }}
              />

              {/* Main Organic Image Container */}
              <div 
                className="relative overflow-hidden aspect-square bg-slate-100 shadow-2xl z-10 border-[8px] md:border-[12px] border-white"
                style={{ 
                  borderRadius: "30% 70% 70% 30% / 30% 30% 70% 70%", 
                }}
              >
                <Image 
                  src="/3.webp" 
                  alt="About EC Chess Academy" 
                  fill
                  sizes="(max-width: 768px) 100vw, 480px"
                  className="object-cover transition-transform duration-700 hover:scale-110"
                />
              </div>

              {/* FLOATING STATS BADGE (Responsive Sizing) */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-6 -left-4 md:-bottom-10 md:-left-8 lg:-left-12 bg-white p-4 md:p-6 lg:p-8 rounded-3xl md:rounded-full shadow-2xl border border-slate-50 z-20 flex flex-col items-center justify-center text-center min-w-[120px] md:min-w-[150px]"
              >
                <div className="w-10 h-10 md:w-12 md:h-12 bg-indigo-600 rounded-full flex items-center justify-center mb-2 md:mb-3 shadow-lg shadow-indigo-100 text-white">
                  <Trophy size={20} className="md:w-6 md:h-6" />
                </div>
                <span className="text-2xl md:text-3xl font-black text-slate-900 leading-none">+15</span>
                <span className="text-[8px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">
                  {t("yearsOf")} <br/> {t("excellence")}
                </span>
              </motion.div>

            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutSection;