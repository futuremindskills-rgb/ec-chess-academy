"use client";
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Home, 
  ChevronRight, 
  Sparkles, 
  Trophy, 
  Target, 
  ShieldCheck, 
  Zap, 
  ArrowRight, 
  Layout, 
  Compass, 
  Clock, 
  Users 
} from 'lucide-react';

export default function WeiqiPage() {
  return (
    <div className="bg-white font-sans overflow-x-hidden">
      
      {/* --- PREMIUM HERO BANNER --- */}
      <section className="relative pt-32 pb-20 lg:pt-24 lg:pb-32 bg-slate-50 border-b-8 border-slate-900">
        {/* Subtle Grid Background */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
             style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 30 L30 0 M30 30 L60 30 M30 30 L30 60 M30 30 L0 30' stroke='%23000' stroke-width='1'/%3E%3C/svg%3E")` }} />
        
        <div className="container mx-auto px-6 relative z-10 flex flex-col items-center text-center">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} 
            className="mb-6 bg-orange-500 text-white px-6 py-2 rounded-2xl border-4 border-slate-900 font-black uppercase tracking-widest -rotate-2 shadow-[4px_4px_0px_#0f172a]">
             The Zen of Strategy
          </motion.div>

          <h1 className="text-4xl md:text-6xl font-[1000] text-slate-900 tracking-tighter leading-[0.85] uppercase mb-8">
            GO / <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-600 italic">WEIQI MASTERS.</span>
          </h1>

          <p className="max-w-2xl text-lg md:text-xl text-slate-500 font-bold mb-10 leading-tight">
            Master the ancient art of balance and spatial reasoning. We teach students to see the whole board, fostering a mindset of patience and global planning.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <div className="bg-white px-4 py-2 rounded-xl border-2 border-slate-900 font-black text-[10px] uppercase flex items-center gap-2 shadow-[4px_4px_0px_#0f172a]">
              <Users size={14} className="text-orange-500" /> Age 4 - 18
            </div>
            <div className="bg-white px-4 py-2 rounded-xl border-2 border-slate-900 font-black text-[10px] uppercase flex items-center gap-2 shadow-[4px_4px_0px_#0f172a]">
              <Clock size={14} className="text-orange-500" /> Professional 19x19
            </div>
          </div>
        </div>
      </section>

      {/* --- ART OF BALANCE (OVERLAPPING COMPOSITION) --- */}
      <section className="py-20 lg:py-32">
        {/* Grid proportion 1.2fr to 1fr pulls content away from the sidebar pill */}
        <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-[1.2fr_1fr] gap-12 items-center">
          
          {/* LEFT: IMAGE COMPOSITION */}
          <div className="relative">
            <div className="relative w-full max-w-[480px] aspect-square mx-auto lg:mx-0">
              <div className="absolute inset-0 bg-slate-900 rounded-[3rem] translate-x-4 translate-y-4 -z-10 border-4 border-orange-500" />
              <div className="absolute top-0 left-0 w-[88%] h-[85%] z-10 border-4 border-slate-900 rounded-[3rem] overflow-hidden">
                <img src="/44.jpeg" className="w-full h-full object-cover" alt="Go Weiqi Focus" />
              </div>
              <motion.div whileHover={{ scale: 1.05, rotate: 3 }}
                className="absolute bottom-[-2%] right-[-2%] w-[62%] h-[58%] z-20 p-2 bg-white rounded-[2.5rem] border-4 border-slate-900 shadow-2xl">
                <img src="/26.jpeg" className="w-full h-full object-cover rounded-[2rem]" alt="Strategy Sessions" />
              </motion.div>
              <div className="absolute top-1/2 -left-8 z-30 bg-white p-4 rounded-2xl border-4 border-slate-900 text-slate-900 rotate-12 shadow-xl">
                <Target size={32} className="text-orange-500" />
                <div className="text-xs font-black uppercase mt-1">Focus</div>
              </div>
            </div>
          </div>

          {/* RIGHT: TEXT AND GRID */}
          <div className="space-y-8 lg:max-w-md">
            <h2 className="text-5xl md:text-7xl font-[1000] text-slate-900 tracking-tighter uppercase leading-[0.9]">
              The Art of <br /> <span className="text-orange-500 italic">Balance.</span>
            </h2>
            <p className="text-lg text-slate-600 font-bold leading-snug">
              In Go, greed leads to defeat. Our program teaches students to balance territory and influence, cultivating a "Whole Board" perspective that applies to both the game and life.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { t: 'Spatial Logic', i: <Layout /> },
                { t: 'Calm Judgment', i: <ShieldCheck /> },
                { t: 'Global Strategy', i: <Compass /> },
                { t: 'Patience Mastery', i: <Zap /> }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-4 bg-white rounded-2xl border-4 border-slate-900 shadow-[6px_6px_0px_#0f172a]">
                  <div className="text-orange-500">{item.i}</div>
                  <span className="font-black uppercase text-[10px] tracking-tight">{item.t}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- ACADEMY ROADMAP --- */}
      <section className="py-20 bg-slate-50 border-y-8 border-slate-900">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-5xl font-[1000] uppercase tracking-tighter mb-16 text-center">
            Go Weiqi <span className="text-orange-500">Roadmap</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                level: "Foundation", 
                title: "9x9 BOARD", 
                desc: "Understanding liberties, capturing stones, and basic 9x9 territory boundaries.", 
                skills: ["Atari Basics", "Liberty Rules", "Capturing Stone"] 
              },
              { 
                level: "Tactician", 
                title: "13x13 STAGE", 
                desc: "Introduction to Joseki (Corner patterns) and Fuseki (Opening frameworks).", 
                skills: ["Opening Play", "Life & Death", "Ko Fights"] 
              },
              { 
                level: "Strategist", 
                title: "19x19 MASTERY", 
                desc: "Professional board size. Whole-board thinking and deep reading for Dan-level play.", 
                skills: ["Global Analysis", "Yose Endgame", "Pro Analysis"] 
              }
            ].map((item, i) => (
              <div key={i} className="relative p-10 bg-white border-4 border-slate-900 rounded-[3rem] shadow-[10px_10px_0px_#f97316] flex flex-col items-start group hover:translate-y-[-4px] transition-transform">
                 <div className="mb-6 bg-slate-900 text-white w-14 h-14 flex items-center justify-center rounded-2xl font-black border-4 border-orange-500 shadow-[4px_4px_0px_#f97316]">0{i+1}</div>
                 <span className="text-orange-500 font-black uppercase text-[10px] tracking-widest mb-2">{item.level}</span>
                 <h3 className="text-2xl font-[1000] uppercase mb-4 leading-none">{item.title}</h3>
                 <p className="text-slate-500 font-bold text-sm mb-8 leading-snug">{item.desc}</p>
                 <div className="mt-auto space-y-2">
                    {item.skills.map(skill => (
                      <div key={skill} className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-700">
                        <div className="w-2 h-2 bg-orange-500 rounded-full" /> {skill}
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
        <div className="bg-orange-500 p-12 rounded-[4rem] border-8 border-slate-900 text-white text-center shadow-[15px_15px_0px_#0f172a] relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-[1000] uppercase tracking-tighter mb-8 leading-none">
              Start Your <br /> Master Journey.
            </h2>
            <Link href="/contact" className="inline-flex items-center gap-4 bg-white text-slate-900 px-12 py-6 rounded-3xl border-4 border-slate-900 font-black uppercase tracking-widest hover:translate-y-2 transition-transform shadow-xl">
              Book Free Trial <ArrowRight />
            </Link>
          </div>
          {/* Decorative Elements */}
          <div className="absolute -bottom-10 -right-10 opacity-20 rotate-12">
             <Sparkles size={300} fill="white" />
          </div>
        </div>
      </section>
    </div>
  );
}