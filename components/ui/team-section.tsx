"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Lightbulb, 
  Layers, 
  BrainCircuit, 
  ShieldCheck, 
  Crown, 
  CheckCircle2,
  ChevronRight
} from 'lucide-react';
import { useLocale } from 'next-intl';

export default function MethodologySection() {
  const locale = useLocale();
  const isZh = locale === "zh";
  
  const pillars = [
    {
      titleEn: "Concept-Based Mastery",
      titleZh: "概念主導教學",
      descEn: "We move beyond memorizing opening moves. Our focus is on the 'Deep Logic'—ensuring students grasp the fundamental positional principles that govern the board.",
      descZh: "我們不主張死記硬背開局。本院專注於「深層邏輯」——確保學員掌握主宰棋盤的基本空間及位置原則，建立紮實根基。",
      icon: <Lightbulb className="w-7 h-7 md:w-8 md:h-8 text-orange-500" />,
      color: "bg-orange-500",
    },
    {
      titleEn: "Tactical Scaffolding",
      titleZh: "戰術循序漸進",
      descEn: "Complex strategies are broken down into manageable patterns—Forks, Pins, and Skewers. We use 'Step-by-Step' logic to build a powerful tactical database.",
      descZh: "將複雜戰略分解為易於理解的模式，如雙重攻擊、牽制及串擊。我們透過「步進式」邏輯引導學員建立強大的戰術資料庫。",
      icon: <Layers className="w-7 h-7 md:w-8 md:h-8 text-purple-600" />,
      color: "bg-purple-600",
    },
    {
      titleEn: "Metacognitive Thinking",
      titleZh: "元認知思維訓練",
      descEn: "We teach students 'how to calculate'—monitoring their own thought process, identifying opponent threats, and regulating their focus for accuracy.",
      descZh: "我們教導學員「如何計算」——監控個人的思維過程，識別對手的威脅，並於長時間比賽中調節專注力與思維準確性。",
      icon: <BrainCircuit className="w-7 h-7 md:w-8 md:h-8 text-indigo-600" />,
      color: "bg-indigo-600",
    },
    {
      titleEn: "Tournament Resilience",
      titleZh: "競技抗壓韌性",
      descEn: "Chess isn't just abstract theory. We build the 'Champion Mindset'—from time management under pressure to recovering from mistakes with analytical grit.",
      descZh: "棋藝不只是抽象理論。我們致力建立「冠軍心態」——由高壓下的時間管理，到以分析力及抗壓韌性從錯誤中恢復並保持冷靜。",
      icon: <ShieldCheck className="w-7 h-7 md:w-8 md:h-8 text-cyan-500" />,
      color: "bg-cyan-500",
    }
  ];

  return (
    <section className="py-16 md:py-28 bg-white font-sans relative overflow-hidden">
      
      {/* Decorative Background */}
      <div className="hidden sm:block absolute top-0 right-0 w-1/3 h-full bg-slate-50 -skew-x-12 z-0" aria-hidden="true" />

      <div className="container mx-auto px-6 relative z-10 max-w-7xl">
        
        {/* --- HEADER SECTION --- */}
        <div className="text-center max-w-4xl mx-auto mb-16 md:mb-24">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900 text-white text-[10px] font-black uppercase tracking-[0.2em] mb-6 shadow-xl"
          >
            <ShieldCheck className="w-4 h-4 text-orange-400" />
            <span>{isZh ? "FIDE 國際標準教學法" : "FIDE-Standard Pedagogy"}</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-5xl md:text-5xl font-[1000] text-slate-900 leading-[1.1] md:leading-[0.9] tracking-tighter uppercase mb-8"
          >
            {isZh ? "教學成就" : "Teaching for"} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-purple-600 to-indigo-950 italic">
              {isZh ? "卓越戰略思維" : "Strategic Mastery."}
            </span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-base md:text-xl text-slate-500 font-medium leading-relaxed max-w-3xl mx-auto"
          >
            {isZh 
              ? "在 EC 卓思棋院，我們致力銜接基礎走法與競技表現。我們的教學哲學融合了 FIDE 國際嚴謹規範與香港 15 年的專業培訓經驗。" 
              : "At EC Chess Academy, we bridge the gap between simple moves and competitive excellence. Our philosophy blends international FIDE rigor with 15 years of HK training experience."}
          </motion.p>
        </div>

        {/* --- THE PILLARS GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 relative">
          
          {/* Central Connecting Node */}
          <div className="hidden md:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 lg:w-32 lg:h-32 bg-white rounded-[32px] lg:rounded-[40px] border-[6px] lg:border-8 border-slate-50 z-20 items-center justify-center shadow-2xl shadow-indigo-500/20" aria-hidden="true">
             <motion.div 
               animate={{ rotate: [0, 10, -10, 0] }}
               transition={{ duration: 6, repeat: Infinity }}
               className="text-indigo-600"
             >
                <Crown size={40} className="lg:w-12 lg:h-12" strokeWidth={2.5} />
             </motion.div>
          </div>

          {pillars.map((pillar, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true, margin: "-50px" }}
              className={`
                group relative p-8 md:p-12 rounded-[32px] md:rounded-[48px] border-2 border-slate-900 bg-white 
                shadow-[8px_8px_0px_#0f172a] md:shadow-[14px_14px_0px_#0f172a] 
                hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all duration-300
                ${idx % 2 === 0 ? 'md:text-right md:pr-16' : 'md:text-left md:pl-16'}
              `}
            >
              <div className={`relative z-10 flex flex-col ${idx % 2 === 0 ? 'md:items-end' : 'md:items-start'}`}>
                
                {/* Icon Sticker */}
                <div className={`
                  w-14 h-14 md:w-20 md:h-20 rounded-[20px] md:rounded-[28px] flex items-center justify-center mb-6 shadow-xl text-white
                  ${pillar.color} group-hover:rotate-12 transition-transform duration-500
                  ${idx % 2 === 0 ? 'md:order-last md:mt-8 md:mb-0' : ''}
                `}>
                  {pillar.icon}
                </div>

                <h3 className="text-2xl md:text-3xl font-[1000] text-slate-900 mb-4 uppercase tracking-tighter">
                  {isZh ? pillar.titleZh : pillar.titleEn}
                </h3>
                
                <p className="text-slate-500 leading-relaxed font-medium text-sm md:text-lg">
                  {isZh ? pillar.descZh : pillar.descEn}
                </p>

                <div className={`mt-8 flex items-center gap-2 font-black text-[10px] md:text-[11px] uppercase tracking-[0.2em] ${idx % 2 === 0 ? 'flex-row-reverse' : ''} text-slate-400 group-hover:text-slate-900 transition-colors`}>
                   <CheckCircle2 size={16} className="text-orange-500" />
                   <span>{isZh ? "教學品質保證標準" : "Quality Standard"}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* --- BOTTOM STATEMENT --- */}
        <div className="mt-20 md:mt-32 text-center px-2">
           <motion.div 
             initial={{ opacity: 0, scale: 0.95 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true }}
             className="inline-block relative p-10 sm:p-16 lg:p-20 bg-[#0f172a] rounded-[40px] sm:rounded-[70px] text-white w-full max-w-5xl shadow-2xl overflow-hidden border-4 border-slate-800"
           >
              {/* Artistic Blurs */}
              <div className="absolute top-0 right-0 w-64 md:w-96 h-64 md:h-96 bg-indigo-500/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-64 md:w-96 h-64 md:h-96 bg-orange-500/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />
              
              <h3 className="text-2xl sm:text-3xl md:text-5xl font-[1000] uppercase tracking-tighter mb-10 relative z-10 leading-tight">
                {isZh ? "棋藝不只是遊戲，更是認知能力構建的" : "Chess is more than a game—it's a"}{" "}
                <span className="text-orange-400 italic">{isZh ? "藍圖" : "blueprint"}</span>
                {isZh ? "。" : " for cognitive architecture."}
              </h3>
              
              <div className="flex flex-col items-center gap-6 relative z-10">
                <p className="text-slate-400 font-black text-xs md:text-sm uppercase tracking-[0.3em]">
                  {isZh ? "— EC 卓思棋院教學理念" : "— The EC Academy Philosophy"}
                </p>
                <div className="h-[2px] w-20 bg-orange-500/50" />
                <button className="flex items-center gap-3 text-xs md:text-sm font-black uppercase tracking-widest text-orange-400 hover:text-white transition-all group">
                   {isZh ? "了解完整課程體系" : "Explore the curriculum"} 
                   <ChevronRight size={18} className="group-hover:translate-x-2 transition-transform" />
                </button>
              </div>
           </motion.div>
        </div>

      </div>
    </section>
  );
}