"use client";
import React from "react";
import { motion } from "framer-motion";
import { 
  ShieldCheck,
  ChevronRight,
  TrendingUp,
  CheckCircle2
} from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";

const GameCurriculumSection: React.FC = () => {
  const t = useTranslations("home.courses");
  const games = [
    {
      level: t("cards.0.level"),
      name: t("cards.0.name"),
      desc: t("cards.0.desc"),
      willLearn: [t("cards.0.learn0"), t("cards.0.learn1"), t("cards.0.learn2"), t("cards.0.learn3")],
      stats: { focus: t("cards.0.focus"), difficulty: "85%" },
      color: "from-blue-500 to-indigo-600",
      accent: "text-blue-600",
      bgAccent: "bg-blue-600",
      image: "/go.png",
      href: "/go-wieqi",
    },
    {
      level: t("cards.1.level"),
      name: t("cards.1.name"),
      desc: t("cards.1.desc"),
      willLearn: [t("cards.1.learn0"), t("cards.1.learn1"), t("cards.1.learn2"), t("cards.1.learn3")],
      stats: { focus: t("cards.1.focus"), difficulty: "75%" },
      color: "from-purple-500 to-indigo-600",
      accent: "text-purple-600",
      bgAccent: "bg-purple-600",
      image: "/chess.png",
      href: "/international-chess",
    },
    {
      level: t("cards.2.level"),
      name: t("cards.2.name"),
      desc: t("cards.2.desc"),
      willLearn: [t("cards.2.learn0"), t("cards.2.learn1"), t("cards.2.learn2"), t("cards.2.learn3")],
      stats: { focus: t("cards.2.focus"), difficulty: "70%" },
      color: "from-orange-500 to-red-600",
      accent: "text-orange-600",
      bgAccent: "bg-orange-600",
      image: "/c-chess.png",
      href: "/chinese-chess",
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-white relative overflow-hidden">
      
      {/* Background Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none opacity-40">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 md:w-96 md:h-96 bg-indigo-50 rounded-full blur-[80px] md:blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 md:w-96 md:h-96 bg-orange-50 rounded-full blur-[80px] md:blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        
        {/* --- CENTERED HEADER (Same as original Curriculum) --- */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-20">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 md:px-4 md:py-1.5 rounded-full bg-slate-900 text-white text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] mb-4 md:mb-6 shadow-xl"
          >
            <ShieldCheck size={14} className="text-orange-400" />
            {t("badge")}
          </motion.div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-[1000] text-slate-900 leading-[1.1] md:leading-[0.9] tracking-tighter uppercase">
            {t("titlePrefix")} {" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-purple-600 to-indigo-950">
              {t("titleHighlight")}
            </span>
          </h2>
        </div>

        {/* --- CARDS GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {games.map((game, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative group h-full"
            >
              <div className="relative h-full bg-slate-50 border border-slate-100 rounded-[32px] md:rounded-[48px] p-2 md:p-3 transition-all duration-500 group-hover:bg-white group-hover:shadow-[0_40px_80px_-15px_rgba(0,0,0,0.1)] group-hover:border-slate-200">
                
                {/* 1. TOP SECTION: Visual Header with Game Image */}
                <div className={`relative h-32 md:h-44 w-full rounded-[24px] md:rounded-[40px] overflow-hidden bg-gradient-to-br ${game.color} flex items-center justify-center`}>
                  <div className="absolute inset-0 opacity-20" style={{ backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`, backgroundSize: '20px 20px' }} />
                  
                  {/* Image Container */}
                  <div className="relative z-10 w-20 h-20 md:w-28 md:h-28 flex items-center justify-center">
                     <div className="absolute inset-0 bg-white/20 blur-2xl rounded-full" />
                     <img 
                        src={game.image} 
                        alt={game.name} 
                        className="relative z-10 w-full h-full object-contain drop-shadow-2xl transform group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-500"
                     />
                  </div>

                  <div className="absolute top-4 left-4 md:top-6 md:left-6 px-3 py-1 md:px-4 md:py-1.5 bg-black/20 backdrop-blur-md rounded-full border border-white/10">
                    <span className="text-[8px] md:text-[10px] font-black text-white tracking-widest">{game.level}</span>
                  </div>
                </div>

                {/* 2. BODY SECTION: Content */}
                <div className="px-4 py-6 md:px-6 md:py-8 space-y-5 md:space-y-7">
                  <div className="space-y-2 md:space-y-3">
                    <h3 className="text-xl md:text-2xl font-[1000] text-slate-900 uppercase tracking-tighter leading-none">
                      {game.name}
                    </h3>
                    <p className="text-slate-500 text-[12px] md:text-[13px] font-medium leading-relaxed">
                      {game.desc}
                    </p>
                  </div>

                  {/* BULLET POINTS - SYLLABUS */}
                  <div className="space-y-3 pt-1">
                    <p className="text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest">{t("learningOutcomes")}</p>
                    <div className="space-y-2">
                      {game.willLearn.map((item, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <CheckCircle2 className={`${game.accent} opacity-80 mt-0.5 w-4 h-4 shrink-0`} />
                          <span className="text-[12px] md:text-[13px] font-bold text-slate-700 tracking-tight leading-tight">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Mini Stats Bar */}
                  <div className="bg-white p-3 md:p-4 rounded-2xl md:rounded-3xl border border-slate-100 flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="text-[8px] md:text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">{t("cognitiveFocus")}</span>
                      <span className="text-[10px] md:text-xs font-bold text-slate-800">{game.stats.focus}</span>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="text-[8px] md:text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1 text-right">{t("masteryCurve")}</span>
                      <div className="flex items-center gap-2">
                        <div className="h-1 w-8 md:h-1.5 md:w-12 bg-slate-100 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            whileInView={{ width: game.stats.difficulty }}
                            viewport={{ once: true }}
                            className={`h-full ${game.bgAccent}`}
                          />
                        </div>
                        <span className="text-[9px] md:text-[10px] font-bold text-slate-600">{game.stats.difficulty}</span>
                      </div>
                    </div>
                  </div>

                  {/* Action Button */}
                  <Link 
                    href={game.href}
                    className={`flex items-center justify-between w-full p-4 md:p-5 rounded-2xl md:rounded-3xl transition-all duration-300 ${game.bgAccent} group-hover:scale-[1.02] shadow-xl shadow-current/20 text-white`}
                  >
                    <span className="text-[10px] md:text-xs font-black uppercase tracking-widest">{t("viewFullPage")}</span>
                    <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* --- FOOTER --- */}
        <div className="mt-12 md:mt-16 flex justify-center">
          <div className="px-4 py-3 md:px-6 bg-slate-50 border border-slate-100 rounded-full text-[10px] md:text-[11px] font-bold text-slate-400 flex items-center gap-2 md:gap-3 text-center sm:text-left">
            <TrendingUp size={14} className="text-indigo-600 shrink-0" />
            {t("footerNote")}
          </div>
        </div>

      </div>
    </section>
  );
};

export default GameCurriculumSection;