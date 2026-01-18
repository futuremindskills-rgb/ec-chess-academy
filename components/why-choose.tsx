"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import Image from "next/image";
import { 
  Trophy, 
  BrainCircuit, 
  Target, 
  Lightbulb, 
  ShieldCheck,
  Star,
  Zap
} from "lucide-react";

export default function TeachingPhilosophy() {
  
  const pillars = [
    {
      title: "Cognitive Theory",
      description: "Developing spatial and logical thinking architecture through board play.",
      icon: <BrainCircuit className="w-5 h-5 text-indigo-900" />,
      cardBg: "bg-[#FFD700]", // YELLOW
      textColor: "text-slate-900",
      descColor: "text-slate-800",
    },
    {
      title: "Tactical Grit",
      description: "Teaching students to handle pressure and recover from setbacks with focus.",
      icon: <Target className="w-5 h-5 text-white" />,
      cardBg: "bg-[#8A2BE2]", // PURPLE
      textColor: "text-white",
      descColor: "text-purple-100",
    },
    {
      title: "Elite Pedagogy",
      description: "Expert coaching using AI-driven software for deep tactical game analysis.",
      icon: <Lightbulb className="w-5 h-5 text-white" />,
      cardBg: "bg-[#4F46E5]", // INDIGO
      textColor: "text-white",
      descColor: "text-indigo-100",
    },
    {
      title: "Strategic Foresight",
      description: "Fostering the ability to think 10 steps ahead for academic and life success.",
      icon: <Trophy className="w-5 h-5 text-white" />,
      cardBg: "bg-[#00CEC9]", // TEAL
      textColor: "text-white",
      descColor: "text-teal-50",
    },
  ];

  const cardVariants: Variants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" } 
    }
  };

  return (
    <section className="min-h-screen flex items-center py-16 lg:py-24 relative overflow-hidden bg-white font-sans">
      
      {/* Background Ambient Accents */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-full lg:w-1/3 h-1/3 bg-yellow-50 rounded-full blur-[80px] lg:blur-[120px] opacity-60" />
        <div className="absolute bottom-0 left-0 w-full lg:w-1/3 h-1/3 bg-purple-50 rounded-full blur-[80px] lg:blur-[120px] opacity-60" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 z-10 w-full">
        
        {/* Responsive Header Section */}
        <div className="text-center mb-12 lg:mb-20">
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest mb-4 shadow-xl"
          >
            <ShieldCheck size={14} className="text-yellow-400" />
            Strategic Pedagogy
          </motion.div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-[1000] text-slate-900 tracking-tighter leading-none uppercase">
            Our Teaching <br className="md:hidden" /> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500">Philosophy</span>
          </h2>
        </div>

        {/* Layout: Content grid (Stacked on mobile, 2 cols on tablet, 12 on desktop) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-6 items-center">
          
          {/* Left Cards - Order 2 on Mobile */}
          <div className="lg:col-span-3 space-y-6 order-2 lg:order-1">
             <PhilosophyCard pillar={pillars[0]} cardVariants={cardVariants} />
             <PhilosophyCard pillar={pillars[1]} cardVariants={cardVariants} />
          </div>

          {/* Center Visual - Order 1 on Mobile */}
          <div className="lg:col-span-6 flex justify-center relative order-1 lg:order-2 py-10 lg:py-0">
            <div className="relative w-56 h-56 sm:w-72 sm:h-72 lg:w-80 lg:h-80 xl:w-[400px] xl:h-[400px]">
              {/* Spinning Decorative Rings */}
              <div className="absolute inset-0 border-2 border-dashed border-yellow-200 rounded-full animate-[spin_20s_linear_infinite] opacity-60" />
              <div className="absolute inset-4 sm:inset-6 border border-purple-200 rounded-full animate-[spin_30s_linear_infinite_reverse] opacity-60" />
              
              {/* Main Image Frame */}
              <div className="absolute inset-3 sm:inset-4 rounded-[40px] sm:rounded-[60px] overflow-hidden border-[6px] sm:border-[10px] border-white shadow-2xl bg-slate-50 z-10">
                 <Image 
                   src="/demo.png" 
                   alt="Chess Mentorship" 
                   fill
                   className="object-cover"
                   priority
                 />
              </div>

              {/* Floating Performance Tag */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -top-4 -right-2 sm:right-4 z-20 bg-white p-2 sm:p-3 rounded-2xl shadow-2xl flex items-center gap-2 border border-slate-50"
              >
                <div className="bg-yellow-400 p-1.5 rounded-lg shadow-inner">
                   <Zap className="text-white w-3 h-3 sm:w-4 sm:h-4 fill-current" />
                </div>
                <div className="flex flex-col">
                   <span className="text-[8px] font-black text-slate-400 uppercase leading-none">Peak</span>
                   <span className="text-[10px] sm:text-[11px] font-bold text-slate-900 leading-none">Logic</span>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Right Cards - Order 3 on Mobile */}
          <div className="lg:col-span-3 space-y-6 order-3">
             <PhilosophyCard pillar={pillars[2]} cardVariants={cardVariants} />
             <PhilosophyCard pillar={pillars[3]} cardVariants={cardVariants} />
          </div>

        </div>
      </div>
    </section>
  );
}

function PhilosophyCard({ pillar, cardVariants }: { pillar: any, cardVariants: any }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={cardVariants}
      whileHover={{ y: -8 }}
      className={`${pillar.cardBg} p-6 sm:p-8 rounded-[30px] sm:rounded-[35px] shadow-lg transition-all duration-300 relative group overflow-hidden h-full flex flex-col justify-between`}
    >
      {/* Visual Watermark */}
      <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:scale-125 transition-transform duration-700">
         <Star size={80} fill="currentColor" />
      </div>

      <div className="relative z-10">
        <div className="bg-white/20 w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center mb-6 backdrop-blur-md shadow-sm">
          {pillar.icon}
        </div>

        <h3 className={`text-xl font-black ${pillar.textColor} mb-3 uppercase tracking-tighter leading-tight`}>
          {pillar.title}
        </h3>
        <p className={`leading-relaxed text-sm font-medium ${pillar.descColor} mb-6`}>
          {pillar.description}
        </p>
      </div>
      
      <div className="relative z-10">
        <span className="text-[9px] font-black uppercase tracking-widest bg-white/30 px-3 py-1 rounded-full text-inherit border border-white/20">
          Academy Standard
        </span>
      </div>
    </motion.div>
  );
}