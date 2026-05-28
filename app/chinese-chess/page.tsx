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
    subtitle: "The Foundation",
    levelNum: "Level 01",
    image: "/beginner.jpg",
    icon: <GraduationCap className="text-white" size={24} />,
    desc: "Perfect for young generals starting their journey. We focus on board geography and basic piece mechanics.",
    features: ["Piece Movements", "River & Palace Rules", "Basic Checkmates", "Etiquette"],
    color: "bg-blue-600",
    shadow: "shadow-[8px_8px_0px_#2563eb]"
  },
  {
    title: "Intermediate",
    subtitle: "Tactical Strike",
    levelNum: "Level 02",
    image: "/inter.jpg",
    icon: <Target className="text-white" size={24} />,
    desc: "For players who have mastered the rules and are ready to learn complex piece coordination and middle-game traps.",
    features: ["Cannon Combinations", "Horse & Chariot Sync", "Opening Theory", "Material Trading"],
    color: "bg-orange-600",
    shadow: "shadow-[8px_8px_0px_#ea580c]"
  },
  {
    title: "Advanced",
    subtitle: "Master Strategy",
    levelNum: "Level 03",
    image: "/adv.jpg",
    icon: <Crown className="text-white" size={24} />,
    desc: "Elite training for competitive players. Focuses on deep calculation, endgame puzzles, and national ranking prep.",
    features: ["Grandmaster Analysis", "Endgame Precision", "Psychology of Play", "National Grading"],
    color: "bg-purple-600",
    shadow: "shadow-[8px_8px_0px_#9333ea]"
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
             {isZh ? "传统象棋精英训练" : "Traditional Xiangqi Excellence"}
          </motion.div>

          <h1 className="text-5xl md:text-8xl font-[1000] text-white tracking-tighter leading-[0.85] uppercase mb-8">
            {isZh ? "中国象棋" : "CHINESE"} <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500 italic">{isZh ? "精英课程" : "ELITE CHESS."}</span>
          </h1>

          <p className="max-w-2xl text-lg md:text-xl text-slate-400 font-bold mb-10 leading-tight">
            {isZh ? "掌握炮与车的战术艺术，从基础过河攻防到大师级全盘战略。" : "Master the art of the Cannon and the Chariot. From basic river-crossing to Grandmaster-level military strategy."}
          </p>

          <div className="flex flex-wrap justify-center gap-4">
             <div className="bg-white text-slate-900 px-5 py-3 rounded-2xl border-4 border-slate-900 font-black text-xs uppercase flex items-center gap-2 shadow-[4px_4px_0px_#f97316]">
                <Users size={16} className="text-orange-600" /> {isZh ? "年龄 5 - 18" : "Age 5 - 18"}
             </div>
             <div className="bg-white text-slate-900 px-5 py-3 rounded-2xl border-4 border-slate-900 font-black text-xs uppercase flex items-center gap-2 shadow-[4px_4px_0px_#f97316]">
                <Clock size={16} className="text-orange-600" /> {isZh ? "平日与周末班" : "Weekend & Weekday"}
             </div>
          </div>

          <nav className="mt-12 inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-slate-800 border-2 border-white/10">
            <Link href="/" className="text-slate-400 hover:text-orange-400 text-[10px] font-black uppercase flex items-center gap-2">
              <Home size={12} /> {isZh ? "主页" : "Home"}
            </Link>
            <ChevronRight className="w-3 h-3 text-slate-600" />
            <span className="text-white font-black text-[10px] uppercase tracking-tight">{isZh ? "中国象棋" : "Chinese Chess"}</span>
          </nav>
        </div>
      </section>

      {/* --- 2. THE LEARNING PATHS (BEGINNER, INTERMEDIATE, ADVANCED) --- */}
      <section className="py-24 lg:py-32 container mx-auto px-6">
        <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-[1000] text-slate-900 tracking-tighter uppercase leading-none mb-4">
                {isZh ? "选择你的" : "CHOOSE YOUR"} <br /><span className="text-orange-600 italic">{isZh ? "竞技等级" : "BATTLE RANK."}</span>
            </h2>
            <div className="inline-block bg-slate-900 text-white px-4 py-1 font-black text-[10px] uppercase tracking-[0.3em]">
                {isZh ? "结构化进阶等级" : "Structured Mastery Levels"}
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
                    {level.levelNum}
                </div>
              </div>

              {/* Level Content */}
              <div className="p-8 space-y-6">
                <div>
                    <h4 className="text-3xl font-[1000] text-slate-900 uppercase leading-none mb-1">{level.title}</h4>
                    <p className="text-[10px] font-black uppercase tracking-widest text-orange-600">{level.subtitle}</p>
                </div>
                
                <p className="text-sm text-slate-500 leading-tight font-bold">
                  {level.desc}
                </p>

                <div className="grid grid-cols-1 gap-2 pt-4">
                  {level.features.map((feature) => (
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
              {isZh ? "我们训练学生协调“车马炮”三大核心子力，以高精度拆解对手防线。" : "We teach students how to coordinate \"The Big Three\"—Chariots, Horses, and Cannons—to dismantle opponent defenses with surgical precision."}
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {(isZh
                ? [
                    { title: '炮法战术', icon: <Zap /> },
                    { title: '过河进攻', icon: <Target /> },
                    { title: '宫防体系', icon: <ShieldCheck /> },
                    { title: '文化传承', icon: <Medal /> }
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
              {isZh ? "学员成长" : "STUDENT"} <br /><span className="text-orange-600 italic">{isZh ? "时间轴" : "TIMELINE"}</span>
            </h2>
            <div className="flex items-center gap-4 text-slate-400 font-bold uppercase text-[10px] tracking-widest">
                <BookOpen size={16} /> {isZh ? "认证课程体系" : "Certified Syllabus"}
            </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            { phase: "Phase 01", title: "River Recon", desc: "Understanding the geography of the board and piece values." },
            { phase: "Phase 02", title: "Triple Offensive", desc: "Mastering the coordination of Chariot, Horse, and Cannon attacks." },
            { phase: "Phase 03", title: "Imperial Guard", desc: "National grading preparation and advanced endgame patterns." }
          ].map((item, i) => (
            <div key={i} className="group p-10 bg-white border-4 border-slate-900 rounded-[2.5rem] shadow-[8px_8px_0px_#000] hover:bg-orange-50 transition-colors">
               <div className="mb-6 bg-slate-900 text-white w-12 h-12 flex items-center justify-center rounded-xl font-black border-2 border-orange-500">0{i+1}</div>
               <span className="text-orange-500 font-black uppercase text-[10px] tracking-widest mb-2 block">{item.phase}</span>
               <h3 className="text-2xl font-[1000] uppercase mb-4 leading-none">{item.title}</h3>
               <p className="text-slate-500 font-bold text-sm leading-snug">{item.desc}</p>
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
              {isZh ? "准备好称王棋盘了吗？" : "Ready to claim"} <br /> {isZh ? "" : "the throne?"}
            </h2>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
                <Link href="/contact" className="inline-flex items-center justify-center gap-4 bg-slate-900 text-white px-12 py-6 rounded-3xl font-black uppercase tracking-widest hover:scale-105 transition-transform border-4 border-white shadow-2xl">
                {isZh ? "预约试课" : "Book Trial Lesson"} <ArrowRight />
                </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}