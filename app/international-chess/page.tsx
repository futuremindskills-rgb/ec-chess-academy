"use client";
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Home, ChevronRight, Sparkles, Trophy, Target, ShieldCheck, Zap, ArrowRight, Medal, Brain, Globe, Clock, Users } from 'lucide-react';

export default function InternationalChessPage() {
  return (
    /* 
       FIX: Added pr-0 lg:pr-24 to the main wrapper. 
       This creates a "safe lane" on the right so the content NEVER touches the Fixed Sidebar (Pill).
    */
    <div className="bg-white font-sans overflow-x-hidden pr-0 ">
      
      {/* --- PREMIUM HERO BANNER --- */}
      <section className="relative pt-32 pb-20 lg:pt-24 lg:pb-32 bg-slate-50 border-b-8 border-slate-900">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
             style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 30 L30 0 M30 30 L60 30 M30 30 L30 60 M30 30 L0 30' stroke='%23000' stroke-width='1'/%3E%3C/svg%3E")` }} />
        
        <div className="container mx-auto px-6 relative z-10 flex flex-col items-center text-center">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="mb-6 bg-indigo-600 text-white px-6 py-2 rounded-2xl border-4 border-slate-900 font-black uppercase tracking-widest rotate-2 shadow-[4px_4px_0px_#0f172a]">
             FIDE Certified Academy
          </motion.div>

          <h1 className="text-3xl md:text-5xl lg:text-6xl font-[1000] text-slate-900 tracking-tighter leading-[0.85] uppercase mb-8">
            Global <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 italic">Standards.</span>
          </h1>

          <p className="max-w-2xl text-lg md:text-xl text-slate-500 font-bold mb-10 leading-tight">
            From first move to Grandmaster strategy. We provide Hong Kong’s elite youth with international-standard chess mentorship.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <div className="bg-white px-4 py-2 rounded-xl border-2 border-slate-900 font-black text-[10px] uppercase flex items-center gap-2">
              <Users size={14} className="text-indigo-600" /> Age 5 - 18
            </div>
            <div className="bg-white px-4 py-2 rounded-xl border-2 border-slate-900 font-black text-[10px] uppercase flex items-center gap-2">
              <Clock size={14} className="text-indigo-600" /> 90 Min Sessions
            </div>
          </div>
        </div>
      </section>

      {/* --- COGNITIVE SUPERIORITY SECTION --- */}
      {/* FIX: Added max-w-7xl and adjusted the grid to lg:grid-cols-2 for a tighter fit */}
      <section className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* LEFT: IMAGE COMPOSITION */}
          <div className="relative">
            <div className="relative w-full max-w-[480px] aspect-square mx-auto lg:mx-0">
              <div className="absolute inset-0 bg-indigo-600 rounded-[3rem] translate-x-4 translate-y-4 -z-10 border-4 border-slate-900" />
              <div className="absolute top-0 left-0 w-[88%] h-[85%] z-10 border-4 border-slate-900 rounded-[3rem] overflow-hidden">
                <img src="/3.webp" className="w-full h-full object-cover" alt="Elite Coaching" />
              </div>
              <motion.div whileHover={{ scale: 1.05, rotate: -3 }}
                className="absolute bottom-[-2%] right-[-2%] w-[62%] h-[58%] z-20 p-2 bg-white rounded-[2.5rem] border-4 border-slate-900 shadow-2xl">
                <img src="/2.webp" className="w-full h-full object-cover rounded-[2rem]" alt="Strategy" />
              </motion.div>
              <div className="absolute top-1/2 -left-8 z-30 bg-orange-500 p-4 rounded-2xl border-4 border-slate-900 text-white -rotate-12 shadow-xl">
                <Trophy size={20} className="mb-1" />
                <div className="text-2xl font-[1000] leading-none">1st</div>
                <div className="text-[7px] font-black uppercase tracking-tight leading-none mt-1">Inter-School</div>
              </div>
            </div>
          </div>

          {/* RIGHT: TEXT AND GRID */}
          {/* FIX: pr-4 to ensures it never hits the sidebar border */}
          <div className="space-y-8 pr-4">
            <h2 className="text-5xl md:text-7xl font-[1000] text-slate-900 tracking-tighter uppercase leading-[0.9]">
              Cognitive <br /> <span className="text-indigo-600 italic">Superiority.</span>
            </h2>
            <p className="text-lg text-slate-600 font-bold leading-snug max-w-xl">
              Our International Chess program is more than a game—it's a cognitive workout. We follow the official Step Method to ensure every student masters calculation, prophylaxis, and planning.
            </p>
            
            {/* GRID FIX: Tightened the width of the feature boxes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg">
              {['Logic Patterns', 'Calculated Risks', 'Mental Stamina', 'Global Elo'].map((txt, i) => (
                <div key={i} className="flex items-center gap-3 p-4 bg-white rounded-2xl border-4 border-slate-900 shadow-[6px_6px_0px_#0f172a] hover:translate-y-[-2px] transition-transform">
                  <ShieldCheck className="text-indigo-600" size={18} />
                  <span className="font-black uppercase text-[10px] tracking-tight">{txt}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- CURRICULUM ROADMAP --- */}
      <section className="py-20 bg-slate-900 text-white border-y-8 border-slate-900">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-5xl font-[1000] uppercase tracking-tighter mb-16 text-center">Academy <span className="text-indigo-400">Roadmap</span></h2>
          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {[
              { level: "Foundation", title: "THE OPENING", desc: "Basic movements, piece values, and the concept of 'King Safety'.", items: ["Checkmate in 1", "Scholar's Mate", "Castle Rules"] },
              { level: "Tactical", title: "MIDDLE GAME", desc: "Learning tactical motifs like Forks, Pins, and Skewers to win material.", items: ["Combination Play", "Opening Theory", "Pawn Structures"] },
              { level: "Elite", title: "THE ENDGAME", desc: "Mastering complex pawn endings and professional tournament clock handling.", items: ["Opposition Rule", "Candidate Moves", "Calculated Draws"] }
            ].map((item, i) => (
              <div key={i} className="relative p-8 lg:p-10 bg-white/5 border-2 border-white/20 rounded-[3rem] flex flex-col items-start transition-colors hover:bg-white/10">
                 <div className="mb-6 bg-indigo-500 text-white w-12 h-12 flex items-center justify-center rounded-2xl font-black border-2 border-white shadow-[4px_4px_0px_#fff]">0{i+1}</div>
                 <span className="text-indigo-400 font-black uppercase text-[10px] tracking-widest mb-2">{item.level}</span>
                 <h3 className="text-2xl font-[1000] uppercase mb-4 leading-none">{item.title}</h3>
                 <p className="text-slate-400 font-bold text-sm mb-8 leading-snug">{item.desc}</p>
                 <div className="mt-auto space-y-2">
                    {item.items.map(skill => (
                      <div key={skill} className="flex items-center gap-2 text-[10px] font-black uppercase">
                        <Zap size={12} className="text-indigo-400" /> {skill}
                      </div>
                    ))}
                 </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- FINAL CTA --- */}
      <section className="py-20 max-w-7xl mx-auto px-6">
        <div className="bg-indigo-600 p-12 rounded-[4rem] border-8 border-slate-900 text-white text-center shadow-[15px_15px_0px_#0f172a] relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-[1000] uppercase tracking-tighter mb-8 leading-none">Become a <br /> Grandmaster.</h2>
            <Link href="/contact" className="inline-flex items-center gap-4 bg-white text-slate-900 px-12 py-6 rounded-3xl border-4 border-slate-900 font-black uppercase tracking-widest hover:translate-y-2 transition-transform shadow-xl">
              Book Assessment <ArrowRight />
            </Link>
          </div>
          {/* Decorative Background Icon */}
          <div className="absolute -bottom-10 -right-10 opacity-10 rotate-12 scale-150">
             <Trophy size={300} fill="white" />
          </div>
        </div>
      </section>
    </div>
  );
}