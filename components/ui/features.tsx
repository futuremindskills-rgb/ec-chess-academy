"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { 
  Users, 
  BookOpenCheck, 
  MonitorPlay, 
  Award, 
  ClipboardCheck, 
  ShieldCheck,
  MessagesSquare,
  Star
} from "lucide-react";
import { useLocale } from "next-intl";

const academyFeatures = [
  {
    titleEn: "Small Class Sizes",
    titleZh: "小班制教學",
    descEn: "1:6 Coach-to-student ratio ensuring every child receives personalized tactical guidance.",
    descZh: "1:6 的師生比例，確保每位孩子都能在課堂中獲得個性化的戰術指導與關注。",
    image: "/50.jpeg",
    icon: <Users className="w-5 h-5 text-slate-900" />,
    color: "bg-[#FFD700]", // YELLOW
    textColor: "text-slate-900",
    accent: "text-slate-900/60"
  },
  {
    titleEn: "Teaching Material",
    titleZh: "專業系統教材",
    descEn: "Carefully compiled HK textbooks that systematically bridge theory with match play.",
    descZh: "精心編寫的香港專業教材，系統化地將棋藝理論與實戰比賽經驗完美結合。",
    image: "/13.jpeg",
    icon: <BookOpenCheck className="w-5 h-5 text-white" />,
    color: "bg-[#8A2BE2]", // PURPLE
    textColor: "text-white",
    accent: "text-purple-100/60"
  },
  {
    titleEn: "Learning Platform",
    titleZh: "數位學習平台",
    descEn: "Interactive digital tools for real-time practice, game analysis, and progress tracking.",
    descZh: "互動式數位工具，支援即時練習、精準對局分析以及全方位的進度追蹤。",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=600&auto=format&fit=crop",
    icon: <MonitorPlay className="w-5 h-5 text-white" />,
    color: "bg-[#4F46E5]", // INDIGO
    textColor: "text-white",
    accent: "text-indigo-100/60"
  },
  {
    titleEn: "Expert Faculty",
    titleZh: "專業教練團隊",
    descEn: "FIDE-certified masters and passionate educators dedicated to nurturing elite logic.",
    descZh: "由國際棋聯 (FIDE) 認證大師領銜，專注於培養孩子的高階邏輯與競技素養。",
    image: "/jim11.jpeg",
    icon: <Award className="w-5 h-5 text-white" />,
    color: "bg-[#1a5f5f]", // TEAL
    textColor: "text-white",
    accent: "text-teal-100/60"
  },
  {
    titleEn: "Logic Assessment",
    titleZh: "邏輯能力評估",
    descEn: "Regular performance feedback and testing to visualize growth and sharpen abilities.",
    descZh: "定期的表現反饋與能力測試，讓學習進度可視化，精準磨練實戰思維。",
    image: "/30.jpeg",
    icon: <ClipboardCheck className="text-slate-900" />,
    color: "bg-[#FFD700]", // YELLOW
    textColor: "text-slate-900",
    accent: "text-slate-900/60"
  },
  {
    titleEn: "Collaborative Study",
    titleZh: "合作式深度學習",
    descEn: "Group discussions that promote active communication and peer-to-peer problem solving.",
    descZh: "透過小組討論促進主動溝通，在同伴間的協作解難中提升社交與領導力。",
    image: "/49.jpeg",
    icon: <MessagesSquare className="w-5 h-5 text-white" />,
    color: "bg-[#8A2BE2]", // PURPLE
    textColor: "text-white",
    accent: "text-purple-100/60"
  }
];

export default function ECAdvantage() {
  const locale = useLocale();
  const isZh = locale === "zh";

  return (
    <section className="relative py-16 md:py-28 bg-white overflow-hidden font-sans">
      
      {/* Background Decorative Blurs */}
      <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-yellow-50 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-purple-50 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        
        {/* --- HEADER --- */}
        <div className="text-center mb-16 md:mb-24">
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900 text-white text-[10px] md:text-[11px] font-black uppercase tracking-[0.2em] mb-6 shadow-lg"
          >
            <ShieldCheck size={14} className="text-[#f59e0b]" />
            {isZh ? "精英教學優勢" : "Elite Standards"}
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl lg:text-7xl font-[1000] text-slate-900 tracking-tighter leading-none uppercase mb-6"
          >
            {isZh ? "EC 核心" : "The EC Strategic"} <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1a5f5f] via-indigo-600 to-[#f59e0b]">
               {isZh ? "戰略優勢" : "Advantage"}
            </span>
          </motion.h2>
        </div>

        {/* --- FEATURES GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {academyFeatures.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className={`${item.color} p-2 rounded-[48px] shadow-2xl relative group overflow-hidden flex flex-col h-full transition-all duration-500 hover:-translate-y-3 hover:shadow-indigo-500/10`}
            >
              {/* IMAGE INSET */}
              <div className="relative h-48 w-full rounded-[40px] overflow-hidden mb-6">
                <Image 
                    src={item.image} 
                    alt={isZh ? item.titleZh : item.titleEn} 
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
              </div>

              <div className="px-8 pb-10 flex-grow">
                {/* Icon & Decor */}
                <div className="flex items-center justify-between mb-6 relative z-10">
                   <div className="bg-white/20 backdrop-blur-md w-14 h-14 rounded-2xl flex items-center justify-center border border-white/20 shadow-inner">
                      {item.icon}
                   </div>
                   <div className={`opacity-10 group-hover:scale-125 group-hover:rotate-12 transition-all duration-500`}>
                      <Star size={48} fill="currentColor" className={item.textColor} />
                   </div>
                </div>

                {/* Content */}
                <div className="relative z-10">
                   <h4 className={`text-2xl md:text-3xl font-black uppercase tracking-tighter leading-tight ${item.textColor} mb-4`}>
                     {isZh ? item.titleZh : item.titleEn}
                   </h4>
                   <p className={`text-sm md:text-base font-bold leading-relaxed ${item.accent} group-hover:text-white transition-colors duration-300`}>
                     {isZh ? item.descZh : item.descEn}
                   </p>
                </div>
              </div>

              {/* Tag Decor */}
              <div className="absolute top-6 right-10">
                 <span className={`text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full bg-white/20 ${item.textColor} backdrop-blur-md border border-white/10 shadow-sm`}>
                    {isZh ? "EC 精英" : "EC Elite"}
                 </span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}