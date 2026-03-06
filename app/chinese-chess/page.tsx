"use client";
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Home, 
  ChevronRight, 
  Sparkles, 
  Trophy, 
  Sword, 
  ShieldCheck, 
  Zap, 
  ArrowRight, 
  Medal, 
  Users, 
  Clock, 
  Target 
} from 'lucide-react';

export default function ChineseChessPage() {
  return (
    <div className="bg-white font-sans overflow-x-hidden">
      
      {/* --- PREMIUM HERO BANNER --- */}
      <section className="relative pt-32 pb-20 lg:pt-24 lg:pb-32 bg-slate-900 border-b-8 border-orange-500 text-white">
        {/* Subtle Grid Background */}
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none" 
             style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 30 L30 0 M30 30 L60 30 M30 30 L30 60 M30 30 L0 30' stroke='%23fff' stroke-width='1'/%3E%3C/svg%3E")` }} />
        
        <div className="container mx-auto px-6 relative z-10 flex flex-col items-center text-center">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} 
            className="mb-6 bg-orange-500 text-white px-6 py-2 rounded-2xl border-4 border-white font-black uppercase tracking-widest rotate-2 shadow-[4px_4px_0px_#f97316]">
             Xiangqi Cultural Heritage
          </motion.div>

          <h1 className="text-4xl md:text-6xl font-[1000] text-white tracking-tighter leading-[0.85] uppercase mb-8">
            CHINESE <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500 italic">XIANGQI ELITE.</span>
          </h1>

          <p className="max-w-2xl text-lg md:text-xl text-slate-400 font-bold mb-10 leading-tight">
            Master the rapid piece coordination and aggressive tactics of traditional Chinese military strategy. Heritage meets modern mental discipline.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <div className="bg-white text-slate-900 px-4 py-2 rounded-xl border-2 border-orange-500 font-black text-[10px] uppercase flex items-center gap-2 shadow-[4px_4px_0px_#f97316]">
              <Users size={14} className="text-orange-600" /> Age 5 - 18
            </div>
            <div className="bg-white text-slate-900 px-4 py-2 rounded-xl border-2 border-orange-500 font-black text-[10px] uppercase flex items-center gap-2 shadow-[4px_4px_0px_#f97316]">
              <Clock size={14} className="text-orange-600" /> Traditional Rules
            </div>
          </div>

          <nav className="mt-12 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 border-2 border-white/20">
            <Link href="/" className="text-slate-400 hover:text-orange-400 text-[10px] font-black uppercase flex items-center gap-2">
              <Home size={12} /> Home
            </Link>
            <ChevronRight className="w-3 h-3 text-slate-600" />
            <span className="text-white font-black text-[10px] uppercase tracking-tight">Chinese Chess</span>
          </nav>
        </div>
      </section>

      {/* --- TRADITION REDEFINED (COMPOSITION) --- */}
      <section className="py-20 lg:py-32">
        {/* Grid proportion 1.2fr to 1fr pulls content away from the sidebar pill */}
        <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-20 items-center">
          
          {/* LEFT: IMAGE COMPOSITION */}
          <div className="relative">
            <div className="relative w-full max-w-[480px] aspect-square mx-auto lg:mx-0">
              <div className="absolute inset-0 bg-orange-600 rounded-[3rem] translate-x-4 translate-y-4 -z-10 border-4 border-slate-900" />
              <div className="absolute top-0 left-0 w-[88%] h-[85%] z-10 border-4 border-slate-900 rounded-[3rem] overflow-hidden">
                <img src="/2.webp" className="w-full h-full object-cover" alt="Xiangqi Tactics" />
              </div>
              <motion.div whileHover={{ scale: 1.05, rotate: -3 }}
                className="absolute bottom-[-2%] right-[-2%] w-[62%] h-[58%] z-20 p-2 bg-white rounded-[2.5rem] border-4 border-slate-900 shadow-2xl">
                <img src="/1.webp" className="w-full h-full object-cover rounded-[2rem]" alt="Heritage Session" />
              </motion.div>
              <div className="absolute top-1/2 -left-10 z-30 bg-slate-900 p-5 rounded-3xl border-4 border-orange-500 text-white rotate-12 shadow-xl">
                <Sword size={24} className="mb-1 text-orange-500" />
                <div className="text-2xl font-[1000] leading-none uppercase">Tactical</div>
                <div className="text-[8px] font-black uppercase tracking-tighter mt-1">Focus</div>
              </div>
            </div>
          </div>

          {/* RIGHT: TEXT AND GRID */}
          <div className="space-y-8 lg:max-w-md">
            <h2 className="text-5xl md:text-7xl font-[1000] text-slate-900 tracking-tighter uppercase leading-[0.9]">
              Tradition <br /> <span className="text-orange-600 italic">Redefined.</span>
            </h2>
            <p className="text-lg text-slate-600 font-bold leading-snug">
              Chinese Chess (Xiangqi) is a battle of explosive combinations. We teach students the unique mechanics of the Cannon and the strategic coordination of the Chariot and Horse.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { t: 'Cannon Tactics', i: <Zap /> },
                { t: 'River Strategy', i: <Target /> },
                { t: 'Palace Defense', i: <ShieldCheck /> },
                { t: 'Heritage Play', i: <Medal /> }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-4 bg-white rounded-2xl border-2 border-slate-900 shadow-[6px_6px_0px_#f97316]">
                  <div className="text-orange-600">{item.i}</div>
                  <span className="font-black uppercase text-[10px] tracking-tight">{item.t}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- CURRICULUM ROADMAP --- */}
      <section className="py-20 bg-slate-50 border-y-8 border-slate-900">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-5xl font-[1000] uppercase tracking-tighter mb-16 text-center">
            Xiangqi <span className="text-orange-600 italic">Roadmap</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {[
              { 
                level: "Phase 01", 
                title: "CROSSING RIVER", 
                desc: "Learning basic piece movements, the river crossing rules, and Elephant-Advisor defense.", 
                skills: ["Cannon Mechanics", "River Rules", "Palace Safety"] 
              },
              { 
                level: "Phase 02", 
                title: "TRIPLE ATTACK", 
                desc: "Coordinating the Chariot, Horse, and Cannon for multi-piece tactical combinations.", 
                skills: ["Attack Formation", "Middle Game Trades", "Opening Theory"] 
              },
              { 
                level: "Phase 03", 
                title: "ELITE GENERAL", 
                desc: "Mastering sacrifice tactics and endgame precision for national grading and tournaments.", 
                skills: ["Checkmate Patterns", "Endgame Mastery", "National Prep"] 
              }
            ].map((item, i) => (
              <div key={i} className="relative p-10 bg-white border-4 border-slate-900 rounded-[3rem] shadow-[10px_10px_0px_#f97316] flex flex-col items-start transition-transform hover:translate-y-[-4px]">
                 <div className="mb-6 bg-slate-900 text-white w-14 h-14 flex items-center justify-center rounded-2xl font-black border-4 border-orange-500 shadow-[4px_4px_0px_#f97316]">0{i+1}</div>
                 <span className="text-orange-500 font-black uppercase text-[10px] tracking-widest mb-2">{item.level}</span>
                 <h3 className="text-2xl font-[1000] uppercase mb-4 leading-none">{item.title}</h3>
                 <p className="text-slate-500 font-bold text-sm mb-8 leading-snug">{item.desc}</p>
                 <div className="mt-auto space-y-2">
                    {item.skills.map(skill => (
                      <div key={skill} className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-700">
                        <div className="w-2 h-2 bg-orange-600 rounded-full" /> {skill}
                      </div>
                    ))}
                 </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- FINAL CTA --- */}
      <section className="py-20 max-w-6xl mx-auto px-6">
        <div className="bg-slate-900 p-12 rounded-[4rem] border-8 border-orange-500 text-white text-center shadow-[15px_15px_0px_#f97316] relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-[1000] uppercase tracking-tighter mb-8 leading-none">
              READY TO CROSS <br /> THE RIVER?
            </h2>
            <Link href="/contact" className="inline-flex items-center gap-4 bg-orange-500 text-white px-12 py-6 rounded-3xl border-4 border-white font-black uppercase tracking-widest hover:translate-y-2 transition-transform shadow-2xl">
              Book Trial Class <ArrowRight />
            </Link>
          </div>
          {/* Decorative Sword Background */}
          <div className="absolute -bottom-10 -right-10 opacity-10 rotate-12">
             <Sword size={300} fill="white" />
          </div>
        </div>
      </section>
    </div>
  );
}