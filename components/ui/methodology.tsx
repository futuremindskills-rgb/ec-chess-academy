"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { 
  Swords, 
  BookOpen, 
  Target, 
  Gamepad2, 
  ShieldCheck, 
  ChevronRight,
  Clock,
  Layout
} from "lucide-react";
import { useLocale } from "next-intl";

const ecTeachingSteps = [
  {
    step: "01",
    titleEn: "Review",
    titleZh: "棋局複盤",
    subtitleEn: "Warm-Up Match",
    subtitleZh: "對局回顧與分析",
    descEn: "Analyzing recent games to identify specific learning needs and focus areas.",
    descZh: "透過分析近期對局，精確識別學員的學習進度，並針對薄弱環節進行專項強化。",
    image: "/47.jpg",
    icon: <Swords className="w-5 h-5 text-slate-900" />,
    color: "bg-[#FFD700]", // YELLOW
    textColor: "text-slate-900",
    accent: "text-slate-900/60"
  },
  {
    step: "02",
    titleEn: "Lecture",
    titleZh: "專題教學",
    subtitleEn: "Thematic Learning",
    subtitleZh: "國際大師課程",
    descEn: "High-level thematic lessons using professional international textbooks.",
    descZh: "採用國際專業教材，進行高水平的專題教學，深入淺出講解各項戰略核心。",
    image: "/22.jpg",
    icon: <BookOpen className="w-5 h-5 text-white" />,
    color: "bg-[#8A2BE2]", // PURPLE
    textColor: "text-white",
    accent: "text-purple-100/60"
  },
  {
    step: "03",
    titleEn: "Exercise",
    titleZh: "專項練習",
    subtitleEn: "Consolidation",
    subtitleZh: "知識鞏固訓練",
    descEn: "Deepening knowledge through targeted memory and calculation exercises.",
    descZh: "透過針對性的記憶與計算力訓練，加深學員對課堂知識的理解並學以致用。",
    image: "/20.jpg",
    icon: <Target className="w-5 h-5 text-white" />,
    color: "bg-[#4F46E5]", // INDIGO
    textColor: "text-white",
    accent: "text-indigo-100/60"
  },
  {
    step: "04",
    titleEn: "Mini-Game",
    titleZh: "棋藝遊戲",
    subtitleEn: "Summary & Fun",
    subtitleZh: "互動總結與評核",
    descEn: "Summarizing the lesson through interactive, self-developed chess games.",
    descZh: "透過本院自研的互動棋藝遊戲，在輕鬆的氛圍中鞏固課堂重點並完成複習。",
    image: "/1.jpg",
    icon: <Gamepad2 className="w-5 h-5 text-white" />,
    color: "bg-[#1a5f5f]", // EC TEAL
    textColor: "text-white",
    accent: "text-teal-100/60"
  }
];

export default function ECTeachingProcess() {
  const locale = useLocale();
  const isZh = locale === "zh";

  return (
    <section className="relative py-16 md:py-24 bg-white overflow-hidden font-sans">
      
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 left-0 w-1/3 h-1/3 bg-teal-50 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-indigo-50 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        
        {/* --- HEADER --- */}
        <div className="text-center mb-16 md:mb-24">
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900 text-white text-[10px] font-black uppercase tracking-[0.2em] mb-4 shadow-lg"
          >
            <ShieldCheck size={14} className="text-[#f59e0b]" />
            {isZh ? "EC 國際教學規範" : "EC Teaching Standard"}
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-[1000] text-slate-900 tracking-tighter leading-none uppercase mb-6"
          >
            {isZh ? "60 分鐘" : "The 60-Minute"} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1a5f5f] via-indigo-600 to-[#f59e0b]">
              {isZh ? "大師成長藍圖" : "Mastery Blueprint"}
            </span>
          </motion.h2>
        </div>

        {/* --- PROCESS GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {ecTeachingSteps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className={`${step.color} p-2 rounded-[48px] shadow-2xl relative group overflow-hidden flex flex-col h-full transition-all duration-500 hover:-translate-y-3 hover:shadow-indigo-500/10`}
            >
              {/* IMAGE INSET */}
              <div className="relative h-52 w-full rounded-[40px] overflow-hidden mb-6">
                <Image 
                    src={step.image} 
                    alt={isZh ? step.titleZh : step.titleEn} 
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110" 
                    sizes="(max-width: 768px) 100vw, 25vw"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
              </div>

              <div className="px-6 pb-10 flex-grow flex flex-col">
                {/* Icon & Step Number */}
                <div className="flex items-center justify-between mb-8 relative z-10">
                   <div className="bg-white/20 backdrop-blur-md w-14 h-14 rounded-2xl flex items-center justify-center border border-white/20 shadow-inner">
                      {step.icon}
                   </div>
                   <span className={`text-5xl font-[1000] opacity-20 ${step.textColor}`}>
                      {step.step}
                   </span>
                </div>

                {/* Body Content */}
                <div className="relative z-10">
                   <h3 className={`text-[10px] md:text-[11px] font-black uppercase tracking-[0.2em] ${step.accent} mb-2`}>
                      {isZh ? step.subtitleZh : step.subtitleEn}
                   </h3>
                   <h4 className={`text-2xl md:text-3xl font-black uppercase tracking-tighter leading-tight ${step.textColor} mb-4`}>
                      {isZh ? step.titleZh : step.titleEn}
                   </h4>
                   <p className={`text-sm md:text-base font-bold leading-relaxed ${step.accent} group-hover:text-white transition-colors duration-300`}>
                      {isZh ? step.descZh : step.descEn}
                   </p>
                </div>
              </div>

              {/* Connecting Arrows (Desktop Only) */}
              {idx < 3 && (
                <div className="hidden lg:flex absolute top-[60%] -right-4 translate-y-[-50%] z-20">
                   <div className="bg-white p-2 rounded-full shadow-xl border border-slate-50">
                      <ChevronRight size={16} className="text-slate-400" strokeWidth={3} />
                   </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* --- BOTTOM SUMMARY CARD --- */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mt-16 p-8 lg:p-14 bg-slate-900 rounded-[50px] shadow-2xl relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-12"
        >
            <div className="absolute top-0 right-0 p-10 opacity-[0.05] pointer-events-none" aria-hidden="true">
                <Layout size={240} className="text-white" />
            </div>
            
            <div className="flex flex-col sm:flex-row items-center gap-8 relative z-10 text-center sm:text-left">
                <div className="w-20 h-20 shrink-0 bg-[#1a5f5f] rounded-[28px] flex items-center justify-center border border-white/10 shadow-2xl">
                   <Clock className="text-[#f59e0b] w-10 h-10" strokeWidth={2.5} />
                </div>
                <div>
                   <h5 className="text-white font-[1000] text-3xl md:text-4xl uppercase tracking-tighter leading-none mb-3">
                     {isZh ? "課堂總時長：60 分鐘" : "Total Session: 60 Minutes"}
                   </h5>
                   <p className="text-[#f59e0b] text-[11px] md:text-xs font-black uppercase tracking-[0.3em]">
                     {isZh ? "專注力與高效記憶平衡架構" : "Balanced Focus & Retention Framework"}
                   </p>
                </div>
            </div>

            <div className="bg-white/5 border border-white/10 p-8 rounded-[32px] backdrop-blur-sm relative z-10 w-full lg:max-w-md">
                <p className="text-slate-300 text-sm md:text-base font-bold leading-relaxed italic">
                    &quot;{isZh 
                      ? "我們透過自研的棋藝互動遊戲，在輕鬆的氛圍中啟發學員思維，確保小朋友能在快樂中鞏固課堂所學。" 
                      : "We use self-developed mini-games to stimulate brain activity in a relaxed atmosphere, ensuring lessons are summarized and enjoyed."}&quot;
                </p>
            </div>
        </motion.div>

      </div>
    </section>
  );
}