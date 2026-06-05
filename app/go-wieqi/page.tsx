"use client";
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useLocale } from 'next-intl';
import { 
  Home, 
  ChevronRight, 
  Sparkles, 
  Target, 
  ShieldCheck, 
  Zap, 
  ArrowRight, 
  Layout, 
  Compass, 
  Clock, 
  Users,
  GraduationCap,
  Crown,
  CheckCircle2
} from 'lucide-react';

const learningLevels = [
  {
    title: "Beginner",
    titleZh: "入門",
    subtitle: "Foundation Level",
    subtitleZh: "基礎級別",
    levelNum: "Level 01",
    levelNumZh: "級別 01",
    image: "/wei1.jpeg",
    icon: <GraduationCap className="text-white" size={24} />,
    desc: "Starting on the 9x9 board, we focus on the rules of liberties, capturing stones, and the etiquette of the game.",
    descZh: "從 9×9 棋盤起步，重點學習氣、吃子規則及棋局禮儀。",
    features: ["Atari & Liberties", "9x9 Board Strategy", "Capture Rules", "Game Etiquette"],
    featuresZh: ["叫吃與氣", "9×9 棋盤策略", "吃子規則", "棋局禮儀"],
    shadow: "shadow-[8px_8px_0px_#0f172a]"
  },
  {
    title: "Intermediate",
    titleZh: "中級",
    subtitle: "Tactical Growth",
    subtitleZh: "戰術成長",
    levelNum: "Level 02",
    levelNumZh: "級別 02",
    image: "/wei2.jpg",
    icon: <Target className="text-white" size={24} />,
    desc: "Transitioning to 13x13 boards. Introduction to Joseki (corner patterns) and Fuseki (opening frameworks).",
    descZh: "銜接 13×13 棋盤，入門定式（角部模式）及佈局（開局框架）。",
    features: ["Joseki Patterns", "Life & Death Basics", "13x13 Dynamics", "Ko Fight Logic"],
    featuresZh: ["定式模式", "死活基礎", "13×13 動態", "劫爭邏輯"],
    shadow: "shadow-[8px_8px_0px_#f97316]"
  },
  {
    title: "Advanced",
    titleZh: "高級",
    subtitle: "Master Strategy",
    subtitleZh: "大師戰略",
    levelNum: "Level 03",
    levelNumZh: "級別 03",
    image: "/wei3.png",
    icon: <Crown className="text-white" size={24} />,
    desc: "The full 19x19 professional board. Focusing on 'Whole Board' thinking, Yose (endgame), and Dan-level reading.",
    descZh: "完整 19×19 專業棋盤，重點培養全局思維、官子（殘局）及段位級讀棋能力。",
    features: ["19x19 Professional", "Whole Board Analysis", "Yose Endgame", "Dan Preparation"],
    featuresZh: ["19×19 專業對弈", "全局分析", "官子殘局", "段位準備"],
    shadow: "shadow-[8px_8px_0px_#fbbf24]"
  }
];

export default function WeiqiPage() {
  const locale = useLocale();
  const isZh = locale === "zh";
  return (
    <div className="bg-[#FAF9F6] font-sans overflow-x-hidden">
      
      {/* --- 1. PREMIUM HERO BANNER --- */}
      <section className="relative pt-32 pb-20 lg:pt-32 lg:pb-40 bg-slate-50 border-b-8 border-slate-900 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
             style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 30 L30 0 M30 30 L60 30 M30 30 L30 60 M30 30 L0 30' stroke='%23000' stroke-width='1'/%3E%3C/svg%3E")` }} />
        
        <div className="container mx-auto px-6 relative z-10 flex flex-col items-center text-center">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} 
            className="mb-6 bg-orange-500 text-white px-6 py-2 rounded-2xl border-4 border-slate-900 font-black uppercase tracking-widest -rotate-2 shadow-[4px_4px_0px_#0f172a]">
             {isZh ? "策略之道" : "The Zen of Strategy"}
          </motion.div>

          <h1 className="text-3xl md:text-5xl font-[1000] text-slate-900 tracking-tighter leading-[0.9] uppercase mb-8">
            {isZh ? "圍棋 /" : "GO /"} <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-600 italic">{isZh ? "圍棋大師班" : "WEIQI MASTERS."}</span>
          </h1>

          <p className="max-w-2xl text-lg md:text-xl text-slate-500 font-bold mb-10 leading-tight">
            {isZh ? "掌握古老而深邃的平衡與空間推理藝術。我們訓練學員建立全局觀、耐心與前瞻規劃能力。" : "Master the ancient art of balance and spatial reasoning. We teach students to see the whole board, fostering a mindset of patience and global planning."}
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <div className="bg-white px-5 py-3 rounded-2xl border-4 border-slate-900 font-black text-xs uppercase flex items-center gap-2 shadow-[4px_4px_0px_#0f172a]">
              <Users size={16} className="text-orange-500" /> {isZh ? "年齡 4 - 18" : "Age 4 - 18"}
            </div>
            <div className="bg-white px-5 py-3 rounded-2xl border-4 border-slate-900 font-black text-xs uppercase flex items-center gap-2 shadow-[4px_4px_0px_#0f172a]">
              <Clock size={16} className="text-orange-500" /> {isZh ? "專業 19×19 棋盤" : "Professional 19x19"}
            </div>
          </div>

          <nav className="mt-12 inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-white border-2 border-slate-200">
            <Link href="/" className="text-slate-400 hover:text-orange-500 text-[10px] font-black uppercase flex items-center gap-2 transition-colors">
              <Home size={12} /> {isZh ? "主頁" : "Home"}
            </Link>
            <ChevronRight className="w-3 h-3 text-slate-300" />
            <span className="text-slate-900 font-black text-[10px] uppercase tracking-tight">{isZh ? "圍棋" : "Go Weiqi"}</span>
          </nav>
        </div>
      </section>

      {/* --- 2. LEARNING LEVELS GRID --- */}
      <section className="py-24 lg:py-32 container mx-auto px-6">
        <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-[1000] text-slate-900 tracking-tighter uppercase leading-none mb-4">
                {isZh ? "學習" : "LEARNING"} <br /><span className="text-orange-500 italic">{isZh ? "路徑" : "PATHWAYS."}</span>
            </h2>
            <p className="text-slate-400 font-bold uppercase text-[10px] tracking-[0.2em]">{isZh ? "從基礎到專業精進" : "From Foundation to Professional Mastery"}</p>
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
                <div className="absolute top-6 left-6 bg-slate-900 border-2 border-orange-500 p-3 rounded-2xl">
                    {level.icon}
                </div>
                <div className="absolute bottom-6 right-6 bg-orange-500 text-white px-4 py-1 rounded-full border-2 border-slate-900 font-black text-[10px] uppercase">
                    {isZh ? level.levelNumZh : level.levelNum}
                </div>
              </div>

              <div className="p-8 space-y-6">
                <div>
                    <h4 className="text-2xl font-[1000] text-slate-900 uppercase leading-none mb-1">{isZh ? level.titleZh : level.title}</h4>
                    <p className="text-[10px] font-black uppercase tracking-widest text-orange-500">{isZh ? level.subtitleZh : level.subtitle}</p>
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

      {/* --- 3. ART OF BALANCE COMPOSITION --- */}
      <section className="py-20 bg-slate-900 text-white border-y-8 border-slate-900">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">
          
          <div className="relative">
            <div className="relative z-10 border-4 border-white rounded-[4rem] overflow-hidden aspect-square shadow-[15px_15px_0px_#f97316]">
              <img src="/39.jpeg" className="w-full h-full object-cover" alt="Go Weiqi Focus" />
            </div>
            <div className="absolute -bottom-6 -right-6 z-20 bg-orange-500 p-6 rounded-3xl border-4 border-slate-900 text-white rotate-3 hidden md:block">
              <Target size={32} className="mb-2" />
              <h5 className="text-xl font-[1000] uppercase leading-none italic">Focus</h5>
            </div>
          </div>

          <div className="space-y-10">
            <h2 className="text-3xl md:text-5xl font-[1000] tracking-tighter uppercase leading-[0.9]">
              {isZh ? "平衡的" : "The Art of"} <br /> <span className="text-orange-500 italic">{isZh ? "藝術" : "Balance."}</span>
            </h2>
            <p className="text-xl text-slate-400 font-bold leading-tight">
              {isZh ? "在圍棋中，貪勝往往帶來失敗。我們的課程幫助學員平衡地盤與勢力，培養可應用於棋局與生活的全局視角。" : "In Go, greed leads to defeat. Our program teaches students to balance territory and influence, cultivating a \"Whole Board\" perspective that applies to both the game and life."}
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {(isZh
                ? [
                    { t: '空間邏輯', i: <Layout /> },
                    { t: '沉著判斷', i: <ShieldCheck /> },
                    { t: '全局策略', i: <Compass /> },
                    { t: '耐心修煉', i: <Zap /> }
                  ]
                : [
                    { t: 'Spatial Logic', i: <Layout /> },
                    { t: 'Calm Judgment', i: <ShieldCheck /> },
                    { t: 'Global Strategy', i: <Compass /> },
                    { t: 'Patience Mastery', i: <Zap /> }
                  ]).map((item, i) => (
                <div key={i} className="flex items-center gap-4 p-4 bg-slate-800 rounded-2xl border-2 border-white/10 hover:border-orange-500 transition-colors">
                  <div className="text-orange-500">{item.i}</div>
                  <span className="font-black uppercase text-[10px] tracking-widest">{item.t}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- 4. FINAL CTA --- */}
      <section className="py-20 max-w-6xl mx-auto px-6">
        <div className="bg-orange-500 p-12 rounded-[4rem] border-8 border-slate-900 text-white text-center shadow-[15px_15px_0px_#0f172a] relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-[1000] uppercase tracking-tighter mb-8 leading-none">
              {isZh ? "開啟你的" : "Start Your"} <br /> {isZh ? "大師之路" : "Master Journey."}
            </h2>
            <Link href="/contact" className="inline-flex items-center gap-4 bg-white text-slate-900 px-12 py-6 rounded-3xl border-4 border-slate-900 font-black uppercase tracking-widest hover:scale-105 transition-transform shadow-2xl">
              {isZh ? "預約免費試課" : "Book Free Trial"} <ArrowRight />
            </Link>
          </div>
          <div className="absolute -bottom-10 -right-10 opacity-20 rotate-12">
             <Sparkles size={300} fill="white" />
          </div>
        </div>
      </section>
    </div>
  );
}