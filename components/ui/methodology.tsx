"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Swords, 
  BookOpen, 
  Target, 
  Gamepad2, 
  ShieldCheck, 
  Star, 
  Zap,
  ChevronRight,
  Clock,
  Layout
} from "lucide-react";

const ecTeachingSteps = [
  {
    step: "01",
    title: "Game & Review",
    subtitle: "Warm-Up & Analysis",
    description: "Students begin with a warm-up match against peers or teachers to 'get into the zone.' Coaches analyze the game to identify specific learning needs.",
    icon: <Swords className="w-5 h-5 md:w-6 md:h-6 text-slate-900" />,
    color: "bg-[#FFD700]", // YELLOW
    textColor: "text-slate-900",
    accent: "text-slate-900/60"
  },
  {
    step: "02",
    title: "Core Instruction",
    subtitle: "Thematic Learning",
    description: "Based on our 'Teach More, Not Less' principle, we dive into thematic lessons using professional textbooks, ensuring high-level chess mastery.",
    icon: <BookOpen className="w-5 h-5 md:w-6 md:h-6 text-white" />,
    color: "bg-[#8A2BE2]", // PURPLE
    textColor: "text-white",
    accent: "text-purple-100/60"
  },
  {
    step: "03",
    title: "Exercises",
    subtitle: "Memory Consolidation",
    description: "Knowledge is deepened through targeted exercises. This phase ensures concepts are consolidated into long-term memory.",
    icon: <Target className="w-5 h-5 md:w-6 md:h-6 text-white" />,
    color: "bg-[#4F46E5]", // INDIGO
    textColor: "text-white",
    accent: "text-indigo-100/60"
  },
  {
    step: "04",
    title: "Mini-Game",
    subtitle: "Summary & Fun",
    description: "We use self-developed chess games to keep brain activity high in a relaxed atmosphere, summarizing the lesson while keeping it enjoyable.",
    icon: <Gamepad2 className="w-5 h-5 md:w-6 md:h-6 text-white" />,
    color: "bg-[#1a5f5f]", // EC TEAL
    textColor: "text-white",
    accent: "text-teal-100/60"
  }
];

export default function ECTeachingProcess() {
  return (
    <section className="relative py-16 md:py-24 lg:py-32 bg-white overflow-hidden font-sans">
      
      {/* Dynamic Background Blurs */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-1/3 h-1/3 bg-teal-50 rounded-full blur-[80px] md:blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-indigo-50 rounded-full blur-[80px] md:blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 max-w-7xl relative z-10">
        
        {/* --- HEADER --- */}
        <div className="text-center mb-12 md:mb-20 lg:mb-24">
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900 text-white text-[9px] md:text-[10px] font-black uppercase tracking-widest mb-4 shadow-lg"
          >
            <ShieldCheck size={12} className="text-[#f59e0b]" />
            EC Teaching Standard
          </motion.div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-[1000] text-slate-900 tracking-tighter leading-none uppercase mb-6">
            The 60-Minute <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1a5f5f] via-indigo-600 to-[#f59e0b]">Mastery Blueprint</span>
          </h2>
          <p className="text-slate-500 font-bold max-w-2xl mx-auto uppercase text-[10px] md:text-xs tracking-widest px-4">
            Developed in alignment with early childhood expertise for Hong Kong&apos;s future champions.
          </p>
        </div>

        {/* --- PROCESS GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {ecTeachingSteps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className={`${step.color} p-6 sm:p-8 rounded-[30px] md:rounded-[35px] shadow-xl relative group overflow-hidden flex flex-col h-full transition-transform hover:-translate-y-1`}
            >
              {/* Star Watermark Icon */}
              <div className="absolute -right-4 -bottom-4 opacity-10 pointer-events-none transition-transform group-hover:scale-110">
                <Star size={120} fill="currentColor" className={step.textColor} />
              </div>

              {/* Header: Icon & Step Number */}
              <div className="flex items-center justify-between mb-8 md:mb-10 relative z-10">
                 <div className="bg-white/20 backdrop-blur-md w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl flex items-center justify-center border border-white/20">
                    {step.icon}
                 </div>
                 <span className={`text-3xl md:text-4xl font-[1000] opacity-20 ${step.textColor}`}>
                    {step.step}
                 </span>
              </div>

              {/* Body */}
              <div className="relative z-10 flex-grow">
                 <h3 className={`text-[8px] md:text-[9px] font-black uppercase tracking-[0.2em] ${step.accent} mb-1`}>
                    {step.subtitle}
                 </h3>
                 <h4 className={`text-xl md:text-2xl font-black uppercase tracking-tighter leading-tight ${step.textColor} mb-3 md:mb-4`}>
                    {step.title}
                 </h4>
                 <p className={`text-xs md:text-sm font-bold leading-relaxed ${step.accent} group-hover:text-white transition-colors`}>
                    {step.description}
                 </p>
              </div>

              {/* Desktop Connection Arrows (Hidden on mobile/tablet) */}
              {idx < 3 && (
                <div className="hidden lg:flex absolute top-1/2 -right-4 translate-y-[-50%] z-20">
                   <div className="bg-white p-1.5 rounded-full shadow-md border border-slate-50">
                      <ChevronRight size={14} className="text-slate-300" />
                   </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* --- BOTTOM SUMMARY CARD --- */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-10 md:mt-16 p-6 sm:p-8 lg:p-12 bg-slate-900 rounded-[32px] md:rounded-[40px] shadow-2xl relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-8 md:gap-10"
        >
            {/* Background Decor */}
            <div className="absolute top-0 right-0 p-8 opacity-[0.03] pointer-events-none">
                <Layout size={200} className="text-white" />
            </div>
            
            <div className="flex flex-col sm:flex-row items-center gap-4 md:gap-8 relative z-10 text-center sm:text-left">
                <div className="w-14 h-14 md:w-16 md:h-16 shrink-0 bg-[#1a5f5f] rounded-2xl md:rounded-3xl flex items-center justify-center border border-white/10 shadow-xl">
                   <Clock className="text-[#f59e0b] w-6 h-6 md:w-8 md:h-8" />
                </div>
                <div>
                   <h5 className="text-white font-[1000] text-xl md:text-2xl uppercase tracking-tighter">Total Session: 60 Minutes</h5>
                   <p className="text-[#f59e0b] text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em]">Balanced Focus & Retention Framework</p>
                </div>
            </div>

            <div className="bg-white/5 border border-white/10 p-5 md:p-6 rounded-[24px] md:rounded-[30px] backdrop-blur-sm relative z-10 w-full lg:max-w-md">
                <div className="flex items-center gap-2 mb-2">
                    <Zap size={14} className="text-[#f59e0b] fill-[#f59e0b] shrink-0" />
                    <span className="text-white text-[9px] md:text-[10px] font-black uppercase tracking-widest">Mastery Tip</span>
                </div>
                <p className="text-slate-300 text-[11px] md:text-xs font-bold leading-relaxed italic">
                    &quot;Listening to lectures requires high concentration. At EC Chess Academy, we use self-developed mini-games to stimulate brain activity in a relaxed atmosphere, ensuring lessons are summarized and enjoyed.&quot;
                </p>
            </div>
        </motion.div>

      </div>
    </section>
  );
}