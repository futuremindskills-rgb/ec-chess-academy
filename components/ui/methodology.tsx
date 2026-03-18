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
  ChevronRight,
  Clock,
  Layout
} from "lucide-react";

const ecTeachingSteps = [
  {
    step: "01",
    title: "Review",
    subtitle: "Warm-Up Match",
    description: "Analyzing recent games to identify specific learning needs and focus areas.",
    image: "/47.jpeg",
    icon: <Swords className="w-5 h-5 text-slate-900" />,
    color: "bg-[#FFD700]", // YELLOW
    textColor: "text-slate-900",
    accent: "text-slate-900/60"
  },
  {
    step: "02",
    title: "Lecture",
    subtitle: "Thematic Learning",
    description: "High-level thematic lessons using professional international textbooks.",
    image: "/22.jpeg",
    icon: <BookOpen className="w-5 h-5 text-white" />,
    color: "bg-[#8A2BE2]", // PURPLE
    textColor: "text-white",
    accent: "text-purple-100/60"
  },
  {
    step: "03",
    title: "Exercise",
    subtitle: "Consolidation",
    description: "Deepening knowledge through targeted memory and calculation exercises.",
    image: "/20.jpeg",
    icon: <Target className="w-5 h-5 text-white" />,
    color: "bg-[#4F46E5]", // INDIGO
    textColor: "text-white",
    accent: "text-indigo-100/60"
  },
  {
    step: "04",
    title: "Mini-Game",
    subtitle: "Summary & Fun",
    description: "Summarizing the lesson through interactive, self-developed chess games.",
    image: "/1.jpeg",
    icon: <Gamepad2 className="w-5 h-5 text-white" />,
    color: "bg-[#1a5f5f]", // EC TEAL
    textColor: "text-white",
    accent: "text-teal-100/60"
  }
];

export default function ECTeachingProcess() {
  return (
    <section className="relative py-6 md:py-14 lg:py-12 bg-white overflow-hidden font-sans">
      
      {/* Background Blurs */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-1/3 h-1/3 bg-teal-50 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-indigo-50 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 max-w-7xl relative z-10">
        
        {/* --- HEADER --- */}
        <div className="text-center mb-16 md:mb-20">
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest mb-4 shadow-lg"
          >
            <ShieldCheck size={12} className="text-[#f59e0b]" />
            EC Teaching Standard
          </motion.div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-[1000] text-slate-900 tracking-tighter leading-none uppercase mb-6">
            The 60-Minute <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1a5f5f] via-indigo-600 to-[#f59e0b]">Mastery Blueprint</span>
          </h2>
        </div>

        {/* --- PROCESS GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {ecTeachingSteps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className={`${step.color} p-2 rounded-[40px] shadow-2xl relative group overflow-hidden flex flex-col h-full transition-all hover:-translate-y-2`}
            >
              {/* IMAGE INSET */}
              <div className="relative h-48 w-full rounded-[32px] overflow-hidden mb-6">
                <img 
                    src={step.image} 
                    alt={step.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
              </div>

              <div className="px-6 pb-8 flex-grow flex flex-col">
                {/* Icon & Step Number */}
                <div className="flex items-center justify-between mb-6 relative z-10">
                   <div className="bg-white/20 backdrop-blur-md w-12 h-12 rounded-2xl flex items-center justify-center border border-white/20">
                      {step.icon}
                   </div>
                   <span className={`text-4xl font-[1000] opacity-20 ${step.textColor}`}>
                      {step.step}
                   </span>
                </div>

                {/* Body Content */}
                <div className="relative z-10">
                   <h3 className={`text-[9px] font-black uppercase tracking-[0.2em] ${step.accent} mb-1`}>
                      {step.subtitle}
                   </h3>
                   <h4 className={`text-2xl font-black uppercase tracking-tighter leading-tight ${step.textColor} mb-3`}>
                      {step.title}
                   </h4>
                   <p className={`text-xs font-bold leading-relaxed ${step.accent} group-hover:text-white transition-colors`}>
                      {step.description}
                   </p>
                </div>
              </div>

              {/* Connecting Arrows */}
              {idx < 3 && (
                <div className="hidden lg:flex absolute top-[60%] -right-4 translate-y-[-50%] z-20">
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
          className="mt-12 p-8 lg:p-12 bg-slate-900 rounded-[40px] shadow-2xl relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-10"
        >
            <div className="absolute top-0 right-0 p-8 opacity-[0.03] pointer-events-none">
                <Layout size={200} className="text-white" />
            </div>
            
            <div className="flex flex-col sm:flex-row items-center gap-8 relative z-10 text-center sm:text-left">
                <div className="w-16 h-16 shrink-0 bg-[#1a5f5f] rounded-3xl flex items-center justify-center border border-white/10 shadow-xl">
                   <Clock className="text-[#f59e0b] w-8 h-8" />
                </div>
                <div>
                   <h5 className="text-white font-[1000] text-2xl uppercase tracking-tighter leading-none mb-2">Total Session: 60 Minutes</h5>
                   <p className="text-[#f59e0b] text-[10px] font-black uppercase tracking-[0.2em]">Balanced Focus & Retention Framework</p>
                </div>
            </div>

            <div className="bg-white/5 border border-white/10 p-6 rounded-[30px] backdrop-blur-sm relative z-10 w-full lg:max-w-md">
                <p className="text-slate-300 text-xs font-bold leading-relaxed italic">
                    &quot;We use self-developed mini-games to stimulate brain activity in a relaxed atmosphere, ensuring lessons are summarized and enjoyed.&quot;
                </p>
            </div>
        </motion.div>

      </div>
    </section>
  );
}