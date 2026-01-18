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

export default function MethodologySection() {
  
  const pillars = [
    {
      title: "Concept-Based Mastery",
      description: "We move beyond memorizing opening moves. Our focus is on the 'Deep Logic'—ensuring students grasp the fundamental positional principles that govern the board.",
      icon: <Lightbulb className="w-7 h-7 md:w-8 md:h-8 text-orange-500" />,
      color: "bg-orange-500",
    },
    {
      title: "Tactical Scaffolding",
      description: "Complex strategies are broken down into manageable patterns—Forks, Pins, and Skewers. We use 'Step-by-Step' logic to build a powerful tactical database.",
      icon: <Layers className="w-7 h-7 md:w-8 md:h-8 text-purple-600" />,
      color: "bg-purple-600",
    },
    {
      title: "Metacognitive Thinking",
      description: "We teach students 'how to calculate'—monitoring their own thought process, identifying opponent threats, and regulating their focus for long-term accuracy.",
      icon: <BrainCircuit className="w-7 h-7 md:w-8 md:h-8 text-indigo-600" />,
      color: "bg-indigo-600",
    },
    {
      title: "Tournament Resilience",
      description: "Chess isn't just abstract theory. We build the 'Champion Mindset'—from time management under pressure to recovering from mistakes with analytical grit.",
      icon: <ShieldCheck className="w-7 h-7 md:w-8 md:h-8 text-cyan-500" />,
      color: "bg-cyan-500",
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-white font-sans relative overflow-hidden">
      
      {/* Decorative Background - Hidden on small mobile to reduce clutter */}
      <div className="hidden sm:block absolute top-0 right-0 w-1/3 h-full bg-slate-50 -skew-x-12 z-0"></div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10 max-w-7xl">
        
        {/* --- HEADER SECTION --- */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900 text-white text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] mb-6 shadow-xl"
          >
            <ShieldCheck className="w-4 h-4 text-orange-400" />
            <span>FIDE-Standard Pedagogy</span>
          </motion.div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-[1000] text-slate-900 leading-[1.1] md:leading-[0.9] tracking-tighter uppercase mb-6 md:mb-8">
            Teaching for <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-purple-600 to-indigo-950 italic">
              Strategic Mastery.
            </span>
          </h2>
          
          <p className="text-base md:text-lg lg:text-xl text-slate-500 font-medium leading-relaxed px-4">
            At EC Chess Academy, we bridge the gap between simple moves and competitive excellence. Our philosophy blends international FIDE rigor with 15 years of HK training experience.
          </p>
        </div>

        {/* --- THE PILLARS GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 lg:gap-14 relative">
          
          {/* Central Connecting Node - Visible only on Desktop/Tablets */}
          <div className="hidden md:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 lg:w-32 lg:h-32 bg-white rounded-[32px] lg:rounded-[40px] border-[6px] lg:border-8 border-slate-50 z-20 items-center justify-center shadow-2xl shadow-indigo-500/20">
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
                group relative p-8 md:p-10 rounded-[32px] md:rounded-[40px] border-2 border-slate-900 bg-white 
                shadow-[8px_8px_0px_#0f172a] md:shadow-[12px_12px_0px_#0f172a] 
                hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all duration-300
                ${idx % 2 === 0 ? 'md:text-right md:pr-14 lg:pr-16' : 'md:text-left md:pl-14 lg:pl-16'}
              `}
            >
              <div className={`relative z-10 flex flex-col ${idx % 2 === 0 ? 'md:items-end' : 'md:items-start'}`}>
                
                {/* Icon Sticker */}
                <div className={`
                  w-14 h-14 md:w-16 md:h-16 rounded-[20px] md:rounded-[24px] flex items-center justify-center mb-6 shadow-xl text-white
                  ${pillar.color} group-hover:rotate-12 transition-transform duration-500
                  ${idx % 2 === 0 ? 'md:order-last md:mt-6 md:mb-0' : ''}
                `}>
                  {pillar.icon}
                </div>

                <h3 className="text-xl md:text-2xl font-[1000] text-slate-900 mb-3 md:mb-4 uppercase tracking-tighter">
                  {pillar.title}
                </h3>
                
                <p className="text-slate-500 leading-relaxed font-medium text-sm md:text-base">
                  {pillar.description}
                </p>

                <div className={`mt-6 flex items-center gap-2 font-black text-[9px] md:text-[10px] uppercase tracking-[0.2em] ${idx % 2 === 0 ? 'flex-row-reverse' : ''} opacity-40 group-hover:opacity-100 transition-opacity`}>
                   <CheckCircle2 size={14} />
                   <span>Quality Standard</span>
                </div>
              </div>

            </motion.div>
          ))}
        </div>

        {/* --- BOTTOM STATEMENT --- */}
        <div className="mt-16 md:mt-24 text-center px-2">
           <div className="inline-block relative p-8 sm:p-12 lg:p-16 bg-[#0f172a] rounded-[32px] sm:rounded-[60px] text-white w-full max-w-5xl shadow-2xl overflow-hidden border-4 border-slate-800">
              {/* Catchy internal glow */}
              <div className="absolute top-0 right-0 w-48 sm:w-80 h-48 sm:h-80 bg-indigo-500/10 rounded-full blur-[60px] sm:blur-[100px] -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-48 sm:w-80 h-48 sm:h-80 bg-orange-500/10 rounded-full blur-[60px] sm:blur-[100px] translate-y-1/2 -translate-x-1/2" />
              
              <h3 className="text-xl sm:text-2xl md:text-4xl font-[1000] uppercase tracking-tighter mb-8 relative z-10 leading-tight sm:leading-none">
                "Chess is more than a game—it's a <span className="text-orange-400 italic">blueprint</span> for cognitive architecture."
              </h3>
              
              <div className="flex flex-col items-center gap-4 relative z-10">
                <p className="text-slate-400 font-black text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.3em]">
                  — The EC Academy Philosophy
                </p>
                <div className="h-[1px] w-16 sm:w-20 bg-orange-500/50" />
                <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-orange-400 hover:text-white transition-colors group">
                   Learn the full process <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
           </div>
        </div>

      </div>
    </section>
  );
}