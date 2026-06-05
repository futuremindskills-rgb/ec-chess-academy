"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useLocale } from 'next-intl';
import { 
  Home, 
  ChevronRight, 
  Sword, 
  ShieldCheck, 
  Zap, 
  ArrowRight, 
  Medal, 
  Users, 
  Clock, 
  Target,
  GraduationCap,
  Crown,
  CheckCircle2,
  BookOpen,
  Trophy
} from 'lucide-react';

// Level-specific data with imagery
const learningLevels = [
  {
    title: "Beginner",
    titleZh: "入門",
    subtitle: "The Foundation",
    subtitleZh: "基礎建立",
    levelNum: "Level 01",
    levelNumZh: "級別 01",
    image: "/beginner.jpg",
    icon: <GraduationCap className="text-white" size={24} />,
    desc: "Perfect for young generals starting their journey. We focus on board geography and basic piece mechanics.",
    descZh: "適合剛起步的小將，重點學習棋盤地理及基本棋子走法。",
    features: ["Piece Movements", "River & Palace Rules", "Basic Checkmates", "Etiquette"],
    featuresZh: ["棋子走法", "楚河漢界規則", "基本將死", "棋局禮儀"],
    color: "bg-blue-600",
    shadow: "shadow-[8px_8px_0px_#2563eb]"
  },
  {
    title: "Intermediate",
    titleZh: "中級",
    subtitle: "Tactical Strike",
    subtitleZh: "戰術突破",
    levelNum: "Level 02",
    levelNumZh: "級別 02",
    image: "/inter.jpg",
    icon: <Target className="text-white" size={24} />,
    desc: "For players who have mastered the rules and are ready to learn complex piece coordination and middle-game traps.",
    descZh: "適合已掌握規則的學員，學習複雜子力配合及中局陷阱。",
    features: ["Cannon Combinations", "Horse & Chariot Sync", "Opening Theory", "Material Trading"],
    featuresZh: ["炮法組合", "馬車協同", "開局理論", "子力交換"],
    color: "bg-orange-600",
    shadow: "shadow-[8px_8px_0px_#ea580c]"
  },
  {
    title: "Advanced",
    titleZh: "高級",
    subtitle: "Master Strategy",
    subtitleZh: "大師戰略",
    levelNum: "Level 03",
    levelNumZh: "級別 03",
    image: "/adv.jpg",
    icon: <Crown className="text-white" size={24} />,
    desc: "Elite training for competitive players. Focuses on deep calculation, endgame puzzles, and national ranking prep.",
    descZh: "精英競賽訓練，深化計算力、殘局謎題及全國等級分準備。",
    features: ["Grandmaster Analysis", "Endgame Precision", "Psychology of Play", "National Grading"],
    featuresZh: ["大師級複盤", "殘局精準度", "對弈心理", "全國等級分"],
    color: "bg-purple-600",
    shadow: "shadow-[8px_8px_0px_#9333ea]"
  }
];

const timelinePhases = [
  {
    phase: "Phase 01",
    phaseZh: "階段 01",
    title: "River Recon",
    titleZh: "楚河偵察",
    desc: "Understanding the geography of the board and piece values.",
    descZh: "理解棋盤地理及棋子價值。"
  },
  {
    phase: "Phase 02",
    phaseZh: "階段 02",
    title: "Triple Offensive",
    titleZh: "三子聯攻",
    desc: "Mastering the coordination of Chariot, Horse, and Cannon attacks.",
    descZh: "掌握車、馬、炮三大子力的協同進攻。"
  },
  {
    phase: "Phase 03",
    phaseZh: "階段 03",
    title: "Imperial Guard",
    titleZh: "御林精進",
    desc: "National grading preparation and advanced endgame patterns.",
    descZh: "全國等級分準備及進階殘局模式。"
  }
];

export default function ChineseChessPage() {
  const locale = useLocale();
  const isZh = locale === "zh";
  return (
    <div className="bg-[#FAF9F6] font-sans overflow-x-hidden">
      
      {/* --- 1. HERO SECTION --- */}
      <section className="relative pt-22 pb-10 lg:pt-22 lg:pb-10 bg-slate-900 border-b-8 border-orange-500 text-white overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-orange-500/5 skew-x-12 translate-x-20 pointer-events-none" />
        
        <div className="container mx-auto px-6 relative z-10 flex flex-col items-center text-center">
          <motion.div 
            initial={{ y: -20, opacity: 0 }} 
            animate={{ y: 0, opacity: 1 }}
            className="mb-6 bg-orange-500 text-white px-6 py-2 rounded-2xl border-4 border-white font-black uppercase tracking-widest rotate-2 shadow-[6px_6px_0px_#000]">
             {isZh ? "傳統象棋精英訓練" : "Traditional Xiangqi Excellence"}
          </motion.div>

          <h1 className="text-5xl md:text-8xl font-[1000] text-white tracking-tighter leading-[0.85] uppercase mb-8">
            {isZh ? "中國象棋" : "CHINESE"} <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500 italic">{isZh ? "精英課程" : "ELITE CHESS."}</span>
          </h1>

          <p className="max-w-2xl text-lg md:text-xl text-slate-400 font-bold mb-10 leading-tight">
            {isZh ? "掌握炮與車的戰術藝術，從基礎過河攻防到大師級全盤戰略。" : "Master the art of the Cannon and the Chariot. From basic river-crossing to Grandmaster-level military strategy."}
          </p>

          <div className="flex flex-wrap justify-center gap-4">
             <div className="bg-white text-slate-900 px-5 py-3 rounded-2xl border-4 border-slate-900 font-black text-xs uppercase flex items-center gap-2 shadow-[4px_4px_0px_#f97316]">
                <Users size={16} className="text-orange-600" /> {isZh ? "年齡 5 - 18" : "Age 5 - 18"}
             </div>
             <div className="bg-white text-slate-900 px-5 py-3 rounded-2xl border-4 border-slate-900 font-black text-xs uppercase flex items-center gap-2 shadow-[4px_4px_0px_#f97316]">
                <Clock size={16} className="text-orange-600" /> {isZh ? "平日與週末班" : "Weekend & Weekday"}
             </div>
          </div>

          <nav className="mt-12 inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-slate-800 border-2 border-white/10">
            <Link href="/" className="text-slate-400 hover:text-orange-400 text-[10px] font-black uppercase flex items-center gap-2">
              <Home size={12} /> {isZh ? "主頁" : "Home"}
            </Link>
            <ChevronRight className="w-3 h-3 text-slate-600" />
            <span className="text-white font-black text-[10px] uppercase tracking-tight">{isZh ? "中國象棋" : "Chinese Chess"}</span>
          </nav>
        </div>
      </section>

      {/* --- 2. THE LEARNING PATHS (BEGINNER, INTERMEDIATE, ADVANCED) --- */}
      <section className="py-24 lg:py-32 container mx-auto px-6">
        <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-[1000] text-slate-900 tracking-tighter uppercase leading-none mb-4">
                {isZh ? "選擇你的" : "CHOOSE YOUR"} <br /><span className="text-orange-600 italic">{isZh ? "競技等級" : "BATTLE RANK."}</span>
            </h2>
            <div className="inline-block bg-slate-900 text-white px-4 py-1 font-black text-[10px] uppercase tracking-[0.3em]">
                {isZh ? "結構化進階等級" : "Structured Mastery Levels"}
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {learningLevels.map((level, i) => (
            <motion.div 
              key={level.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`group bg-white border-4 border-slate-900 rounded-[2.5rem] overflow-hidden ${level.shadow} hover:translate-y-[-8px] transition-all duration-300`}
            >
              {/* Level Image Wrapper */}
              <div className="h-60 relative overflow-hidden border-b-4 border-slate-900">
                <img 
                  src={level.image} 
                  alt={level.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                />
                <div className={`absolute top-6 left-6 ${level.color} border-4 border-slate-900 p-3 rounded-2xl`}>
                    {level.icon}
                </div>
                <div className="absolute bottom-6 right-6 bg-slate-900 text-white px-4 py-1 rounded-full border-2 border-orange-500 font-black text-[10px] uppercase">
                    {isZh ? level.levelNumZh : level.levelNum}
                </div>
              </div>

              {/* Level Content */}
              <div className="p-8 space-y-6">
                <div>
                    <h4 className="text-3xl font-[1000] text-slate-900 uppercase leading-none mb-1">{isZh ? level.titleZh : level.title}</h4>
                    <p className="text-[10px] font-black uppercase tracking-widest text-orange-600">{isZh ? level.subtitleZh : level.subtitle}</p>
                </div>
                
                <p className="text-sm text-slate-500 leading-tight font-bold">
                  {isZh ? level.descZh : level.desc}
                </p>

                <div className="grid grid-cols-1 gap-2 pt-4">
                  {(isZh ? level.featuresZh : level.features).map((feature) => (
                    <div key={feature} className="flex items-center gap-3">
                      <CheckCircle2 size={14} className="text-orange-500 shrink-0" />
                      <span className="text-[10px] font-black uppercase text-slate-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* --- 3. TRADITION & STRATEGY --- */}
      <section className="py-20 bg-slate-900 text-white overflow-hidden border-y-8 border-orange-500">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">
          
          <div className="relative">
             <div className="relative z-10 border-4 border-white rounded-[3rem] overflow-hidden aspect-square shadow-[15px_15px_0px_#f97316]">
                <img src="/1.webp" className="w-full h-full object-cover" alt="Xiangqi Strategy" />
             </div>
             <div className="absolute -bottom-6 -left-6 z-20 bg-white p-6 rounded-3xl border-4 border-slate-900 text-slate-900 -rotate-3 hidden md:block">
                <Sword size={32} className="text-orange-600 mb-2" />
                <h5 className="text-xl font-[1000] uppercase leading-none">Ancient <br /> Warfare</h5>
             </div>
          </div>

          <div className="space-y-10">
            <h2 className="text-3xl md:text-5xl font-[1000] tracking-tighter uppercase leading-[0.9]">
              {isZh ? "掌握" : "Master the"} <br /> <span className="text-orange-500 italic">{isZh ? "古法智慧" : "Old World"}</span> {isZh ? "" : "Ways."}
            </h2>
            <p className="text-xl text-slate-400 font-bold leading-tight">
              {isZh ? "我們訓練學員協調「車馬炮」三大核心子力，以高精度拆解對手防線。" : "We teach students how to coordinate \"The Big Three\"—Chariots, Horses, and Cannons—to dismantle opponent defenses with surgical precision."}
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {(isZh
                ? [
                    { title: '炮法戰術', icon: <Zap /> },
                    { title: '過河進攻', icon: <Target /> },
                    { title: '宮防體系', icon: <ShieldCheck /> },
                    { title: '文化傳承', icon: <Medal /> }
                  ]
                : [
                    { title: 'Cannon Tactics', icon: <Zap /> },
                    { title: 'River Crossing', icon: <Target /> },
                    { title: 'Palace Defense', icon: <ShieldCheck /> },
                    { title: 'Cultural Heritage', icon: <Medal /> }
                  ]).map((item, i) => (
                <div key={i} className="flex items-center gap-4 p-4 bg-slate-800 rounded-2xl border-2 border-white/10 hover:border-orange-500 transition-colors">
                  <div className="text-orange-500">{item.icon}</div>
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
              {isZh ? "學員成長" : "STUDENT"} <br /><span className="text-orange-600 italic">{isZh ? "時間軸" : "TIMELINE"}</span>
            </h2>
            <div className="flex items-center gap-4 text-slate-400 font-bold uppercase text-[10px] tracking-widest">
                <BookOpen size={16} /> {isZh ? "認證課程體系" : "Certified Syllabus"}
            </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {timelinePhases.map((item, i) => (
            <div key={i} className="group p-10 bg-white border-4 border-slate-900 rounded-[2.5rem] shadow-[8px_8px_0px_#000] hover:bg-orange-50 transition-colors">
               <div className="mb-6 bg-slate-900 text-white w-12 h-12 flex items-center justify-center rounded-xl font-black border-2 border-orange-500">0{i+1}</div>
               <span className="text-orange-500 font-black uppercase text-[10px] tracking-widest mb-2 block">{isZh ? item.phaseZh : item.phase}</span>
               <h3 className="text-2xl font-[1000] uppercase mb-4 leading-none">{isZh ? item.titleZh : item.title}</h3>
               <p className="text-slate-500 font-bold text-sm leading-snug">{isZh ? item.descZh : item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* --- 5. FINAL CALL TO ACTION --- */}
      <section className="py-20 container mx-auto px-6">
        <div className="bg-orange-500 p-12 md:p-20 rounded-[4rem] border-8 border-slate-900 text-white text-center shadow-[15px_15px_0px_#000] relative overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
             <span className="text-[15vw] font-black uppercase tracking-tighter">XIANGQI</span>
          </div>

          <div className="relative z-10 max-w-3xl mx-auto space-y-10">
            <h2 className="text-2xl md:text-5xl font-[1000] uppercase tracking-tighter leading-[0.85]">
              {isZh ? "準備好稱王棋盤了嗎？" : "Ready to claim"} <br /> {isZh ? "" : "the throne?"}
            </h2>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
                <Link href="/contact" className="inline-flex items-center justify-center gap-4 bg-slate-900 text-white px-12 py-6 rounded-3xl font-black uppercase tracking-widest hover:scale-105 transition-transform border-4 border-white shadow-2xl">
                {isZh ? "預約試課" : "Book Trial Lesson"} <ArrowRight />
                </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}