"use client";
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useLocale } from 'next-intl';
import { 
  Home, 
  ChevronRight, 
  Trophy, 
  ShieldCheck, 
  Zap, 
  ArrowRight, 
  Users, 
  Clock, 
  GraduationCap, 
  Target, 
  Crown, 
  CheckCircle2,
  BookOpen
} from 'lucide-react';

const learningLevels = [
  {
    title: "Beginner",
    titleZh: "入門",
    subtitle: "The Pawn's Journey",
    subtitleZh: "兵卒起步",
    levelNum: "Level 01",
    levelNumZh: "級別 01",
    image: "https://images.unsplash.com/photo-1586165368502-1bad197a6461?q=80&w=2116&auto=format&fit=crop",
    icon: <GraduationCap className="text-white" size={24} />,
    desc: "For students new to the 64 squares. We focus on piece movements, capturing, and the golden rules of the opening.",
    descZh: "適合剛接觸 64 格棋盤的學員，重點學習棋子走法、吃子規則及開局基本原則。",
    features: ["Piece Values", "King Safety", "Basic Checkmates", "Board Notation"],
    featuresZh: ["棋子價值", "王的安全", "基本將死", "棋譜記譜"],
    shadow: "shadow-[8px_8px_0px_#4f46e5]"
  },
  {
    title: "Intermediate",
    titleZh: "中級",
    subtitle: "Tactical Combat",
    subtitleZh: "戰術對弈",
    levelNum: "Level 02",
    levelNumZh: "級別 02",
    image: "https://images.unsplash.com/photo-1529699211952-734e80c4d42b?q=80&w=2071&auto=format&fit=crop",
    icon: <Target className="text-white" size={24} />,
    desc: "Transitioning to competitive play. Mastering tactical motifs like forks, pins, and skewers to win material.",
    descZh: "銜接競賽實戰，掌握叉攻、牽制、串打等戰術主題，提升得子能力。",
    features: ["Tactical Patterns", "Opening Repertoire", "Pawn Structures", "Clock Management"],
    featuresZh: ["戰術模式", "開局棋譜", "兵形結構", "時間管理"],
    shadow: "shadow-[8px_8px_0px_#f97316]"
  },
  {
    title: "Advanced",
    titleZh: "高級",
    subtitle: "Elite Mastery",
    subtitleZh: "精英精進",
    levelNum: "Level 03",
    levelNumZh: "級別 03",
    image: "https://images.unsplash.com/photo-1528819622765-d6bcf132f793?q=80&w=2070&auto=format&fit=crop",
    icon: <Crown className="text-white" size={24} />,
    desc: "Focusing on FIDE standards. Deep calculation, prophylaxis, and master-level endgame techniques.",
    descZh: "以 FIDE 標準為核心，深化計算力、預防性思維及大師級殘局技巧。",
    features: ["Grandmaster Analysis", "Prophylactic Thinking", "Complex Endgames", "FIDE Elo Prep"],
    featuresZh: ["大師級複盤", "預防性思維", "複雜殘局", "FIDE 等級分準備"],
    shadow: "shadow-[8px_8px_0px_#7c3aed]"
  }
];

const timelinePhases = [
  {
    phase: "Phase 01",
    phaseZh: "階段 01",
    title: "Foundation",
    titleZh: "基礎建立",
    desc: "Basic movements, piece values, and the concept of King Safety.",
    descZh: "掌握基本走法、棋子價值及王的安全概念。"
  },
  {
    phase: "Phase 02",
    phaseZh: "階段 02",
    title: "Tactical Strike",
    titleZh: "戰術突破",
    desc: "Mastering motifs like Forks, Pins, and Skewers to win material.",
    descZh: "精通叉攻、牽制、串打等戰術主題，提升得子效率。"
  },
  {
    phase: "Phase 03",
    phaseZh: "階段 03",
    title: "Endgame Mastery",
    titleZh: "殘局精進",
    desc: "Complex pawn endings and professional tournament time handling.",
    descZh: "複雜兵殘及專業賽事時間管理訓練。"
  }
];

export default function InternationalChessPage() {
  const locale = useLocale();
  const isZh = locale === "zh";
  return (
    <div className="bg-[#FAF9F6] font-sans overflow-x-hidden pr-0 lg:pr-24">
      
      {/* --- 1. PREMIUM HERO BANNER --- */}
      <section className="relative pt-32 pb-20 lg:pt-32 lg:pb-40 bg-slate-50 border-b-8 border-indigo-600 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
             style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 30 L30 0 M30 30 L60 30 M30 30 L30 60 M30 30 L0 30' stroke='%23000' stroke-width='1'/%3E%3C/svg%3E")` }} />
        
        <div className="container mx-auto px-6 relative z-10 flex flex-col items-center text-center">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} 
            className="mb-6 bg-indigo-600 text-white px-6 py-2 rounded-2xl border-4 border-slate-900 font-black uppercase tracking-widest rotate-2 shadow-[4px_4px_0px_#0f172a]">
             {isZh ? "FIDE 認證學院" : "FIDE Certified Academy"}
          </motion.div>

          <h1 className="text-3xl md:text-5xl font-[1000] text-slate-900 tracking-tighter leading-[0.9] uppercase mb-8">
            {isZh ? "國際象棋" : "INTERNATIONAL"} <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 italic">{isZh ? "精英課程" : "CHESS ELITE."}</span>
          </h1>

          <p className="max-w-2xl text-lg md:text-xl text-slate-500 font-bold mb-10 leading-tight">
            {isZh ? "從第一步到大師級戰略，我們為香港青少年提供國際標準的象棋訓練與指導。" : "From the first move to Grandmaster strategy. We provide Hong Kong’s elite youth with international-standard chess mentorship."}
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <div className="bg-white px-5 py-3 rounded-2xl border-4 border-slate-900 font-black text-xs uppercase flex items-center gap-2 shadow-[4px_4px_0px_#4f46e5]">
              <Users size={16} className="text-indigo-600" /> {isZh ? "年齡 5 - 18" : "Age 5 - 18"}
            </div>
            <div className="bg-white px-5 py-3 rounded-2xl border-4 border-slate-900 font-black text-xs uppercase flex items-center gap-2 shadow-[4px_4px_0px_#4f46e5]">
              <Clock size={16} className="text-indigo-600" /> {isZh ? "FIDE 標準" : "FIDE Standards"}
            </div>
          </div>

          <nav className="mt-12 inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-white border-2 border-slate-200">
            <Link href="/" className="text-slate-400 hover:text-indigo-600 text-[10px] font-black uppercase flex items-center gap-2 transition-colors">
              <Home size={12} /> {isZh ? "主頁" : "Home"}
            </Link>
            <ChevronRight className="w-3 h-3 text-slate-300" />
            <span className="text-slate-900 font-black text-[10px] uppercase tracking-tight">{isZh ? "國際象棋" : "International Chess"}</span>
          </nav>
        </div>
      </section>

      {/* --- 2. THE LEARNING PATHWAYS (LEVELS GRID) --- */}
      <section className="py-24 lg:py-32 container mx-auto px-6">
        <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-[1000] text-slate-900 tracking-tighter uppercase leading-none mb-4">
                {isZh ? "選擇你的" : "CHOOSE YOUR"} <br /><span className="text-indigo-600 italic">{isZh ? "進階路徑" : "RANKING PATH."}</span>
            </h2>
            <p className="text-slate-400 font-bold uppercase text-[10px] tracking-[0.2em]">{isZh ? "結構化 FIDE 課程體系" : "Structured FIDE Curriculum"}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {learningLevels.map((level, i) => (
            <motion.div 
              key={level.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              className={`group bg-white border-4 border-slate-900 rounded-[2.5rem] overflow-hidden ${level.shadow} hover:translate-y-[-8px] transition-all duration-300`}
            >
              <div className="h-60 relative overflow-hidden border-b-4 border-slate-900">
                <img 
                  src={level.image} 
                  alt={level.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                />
                <div className="absolute top-6 left-6 bg-slate-900 border-2 border-indigo-400 p-3 rounded-2xl">
                    {level.icon}
                </div>
                <div className="absolute bottom-6 right-6 bg-indigo-600 text-white px-4 py-1 rounded-full border-2 border-slate-900 font-black text-[10px] uppercase">
                    {isZh ? level.levelNumZh : level.levelNum}
                </div>
              </div>

              <div className="p-8 space-y-6">
                <div>
                    <h4 className="text-2xl font-[1000] text-slate-900 uppercase leading-none mb-1">{isZh ? level.titleZh : level.title}</h4>
                    <p className="text-[10px] font-black uppercase tracking-widest text-indigo-600">{isZh ? level.subtitleZh : level.subtitle}</p>
                </div>
                
                <p className="text-sm text-slate-500 leading-tight font-bold">
                  {isZh ? level.descZh : level.desc}
                </p>

                <div className="grid grid-cols-1 gap-2 pt-4">
                  {(isZh ? level.featuresZh : level.features).map((feature) => (
                    <div key={feature} className="flex items-center gap-3">
                      <CheckCircle2 size={14} className="text-indigo-500 shrink-0" />
                      <span className="text-[10px] font-black uppercase text-slate-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* --- 3. COGNITIVE SUPERIORITY (IMAGE COMPOSITION) --- */}
      <section className="py-20 bg-slate-900 text-white border-y-8 border-indigo-600 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">
          <div className="relative">
             <div className="relative z-10 border-4 border-white rounded-[4rem] overflow-hidden aspect-square shadow-[15px_15px_0px_#4f46e5]">
                <img src="/3.webp" className="w-full h-full object-cover" alt="International Chess Strategy" />
             </div>
             <div className="absolute -bottom-6 -left-6 z-20 bg-white p-6 rounded-3xl border-4 border-slate-900 text-slate-900 -rotate-3 hidden md:block">
                <ShieldCheck size={32} className="text-indigo-600 mb-2" />
                <h5 className="text-xl font-[1000] uppercase leading-none">Calculated <br /> Logic</h5>
             </div>
          </div>

          <div className="space-y-10">
            <h2 className="text-3xl md:text-5xl font-[1000] tracking-tighter uppercase leading-[0.9]">
              {isZh ? "認知" : "Cognitive"} <br /> <span className="text-indigo-400 italic">{isZh ? "優勢" : "Superiority."}</span>
            </h2>
            <p className="text-xl text-slate-400 font-bold leading-tight">
              {isZh ? "課程遵循 FIDE 官方體系，確保學員掌握計算、預防性思維與戰術規劃能力。" : "Our program follows the official FIDE curriculum to ensure every student masters calculation, prophylaxis, and tactical planning."}
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {(isZh
                ? [
                    { title: '邏輯模式', icon: <Zap /> },
                    { title: '心理韌性', icon: <Target /> },
                    { title: '風險評估', icon: <ShieldCheck /> },
                    { title: '全球等級分', icon: <Trophy /> }
                  ]
                : [
                    { title: 'Logic Patterns', icon: <Zap /> },
                    { title: 'Mental Stamina', icon: <Target /> },
                    { title: 'Calculated Risk', icon: <ShieldCheck /> },
                    { title: 'Global Elo', icon: <Trophy /> }
                  ]).map((item, i) => (
                <div key={i} className="flex items-center gap-4 p-4 bg-slate-800 rounded-2xl border-2 border-white/10 hover:border-indigo-400 transition-colors">
                  <div className="text-indigo-400">{item.icon}</div>
                  <span className="font-black uppercase text-[10px] tracking-widest">{item.title}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- 4. PROGRESSION ROADMAP --- */}
      <section className="py-24 container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6 border-b-4 border-slate-900 pb-8">
            <h2 className="text-3xl md:text-5xl font-[1000] uppercase tracking-tighter leading-none">
              {isZh ? "學院成長" : "ACADEMY"} <br /><span className="text-indigo-600 italic">{isZh ? "時間軸" : "TIMELINE"}</span>
            </h2>
            <div className="flex items-center gap-4 text-slate-400 font-bold uppercase text-[10px] tracking-widest">
                <BookOpen size={16} /> {isZh ? "認證課程體系" : "Certified Syllabus"}
            </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {timelinePhases.map((item, i) => (
            <div key={i} className="group p-10 bg-white border-4 border-slate-900 rounded-[2.5rem] shadow-[8px_8px_0px_#000] hover:bg-indigo-50 transition-colors">
               <div className="mb-6 bg-indigo-600 text-white w-12 h-12 flex items-center justify-center rounded-xl font-black border-2 border-white">0{i+1}</div>
               <span className="text-indigo-600 font-black uppercase text-[10px] tracking-widest mb-2 block">{isZh ? item.phaseZh : item.phase}</span>
               <h3 className="text-2xl font-[1000] uppercase mb-4 leading-none">{isZh ? item.titleZh : item.title}</h3>
               <p className="text-slate-500 font-bold text-sm leading-snug">{isZh ? item.descZh : item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* --- 5. FINAL CALL TO ACTION --- */}
      <section className="py-20 container mx-auto px-6">
        <div className="bg-indigo-600 p-12 md:p-20 rounded-[4rem] border-8 border-slate-900 text-white text-center shadow-[15px_15px_0px_#000] relative overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
             <span className="text-[15vw] font-black uppercase tracking-tighter italic">CHESS</span>
          </div>

          <div className="relative z-10 max-w-3xl mx-auto space-y-10">
            <h2 className="text-3xl md:text-5xl font-[1000] uppercase tracking-tighter leading-[0.85]">
              {isZh ? "準備好掌控棋局了嗎？" : "Ready to win"} <br /> {isZh ? "" : "the board?"}
            </h2>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
                <Link href="/contact" className="inline-flex items-center justify-center gap-4 bg-slate-900 text-white px-12 py-6 rounded-3xl font-black uppercase tracking-widest hover:scale-105 transition-transform border-4 border-white shadow-2xl">
                {isZh ? "預約評估課" : "Book Assessment"} <ArrowRight />
                </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}