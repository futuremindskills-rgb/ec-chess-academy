"use client";
import React from "react";
import { motion } from "framer-motion";
import { 
  Trophy, 
  TrendingUp, 
  Users, 
  Globe, 
  ChevronRight, 
  Zap, 
  Sparkles,
  Crown
} from "lucide-react";
import Link from "next/link";
import AchievementsBanner from "@/components/ui/AchievementsBanner";
import SuccessStoriesSlider from "@/components/ui/stories";
import ChampionGallery from "@/components/ui/champion";
import { useLocale } from "next-intl";

export default function AchievementsPage() {
  const locale = useLocale();
  const isZh = locale === "zh";
  
  const stats = [
    { label: isZh ? "FIDE 等級分提升" : "FIDE Rating Gained", value: "30+", icon: <TrendingUp className="text-orange-500" /> },
    { label: isZh ? "精英表現" : "Elite Performance", value: "2000+", icon: <Trophy className="text-purple-600" /> },
    { label: isZh ? "培訓學員" : "Students Trained", value: "500+", icon: <Users className="text-indigo-600" /> },
    { label: isZh ? "本地賽事" : "Local Tournaments", value: "15", icon: <Globe className="text-cyan-500" /> },
  ];

  const journeys = [
    { name: "1500 → 1750", time: isZh ? "10 個月" : "10 Months", note: isZh ? "系統化開局訓練" : "Structured opening prep" },
    { name: "1650 → 1900", time: isZh ? "12 個月" : "12 Months", note: isZh ? "戰術紀律強化" : "Tactical discipline" },
    { name: isZh ? "入門 → 隊長" : "Beginner → Captain", time: isZh ? "校隊" : "School Team", note: isZh ? "領導力訓練" : "Leadership training" },
  ];

  return (
    <div className="bg-white font-sans overflow-x-hidden">
      
      <AchievementsBanner/>

      {/* --- 2. KEY MILESTONES --- */}
      <section className="py-10 md:py-20 container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-10">
          {stats.map((stat, i) => (
            <motion.div 
              key={i} 
              whileHover={{ y: -5 }} 
              className="bg-slate-50 border-2 border-slate-100 p-4 sm:p-6 md:p-8 rounded-[24px] md:rounded-[40px] text-center shadow-sm relative overflow-hidden group"
            >
               <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-100 transition-opacity" />
               <div className="relative z-10 flex flex-col items-center">
                  <div className="w-10 h-10 md:w-14 md:h-14 bg-white rounded-xl md:rounded-2xl flex items-center justify-center mb-2 md:mb-4 shadow-md">
                    {React.cloneElement(stat.icon as React.ReactElement, { size: 20, className: (stat.icon as any).props.className })}
                  </div>
                  <div className="text-xl sm:text-3xl md:text-5xl font-[1000] text-slate-900 leading-none mb-1 md:mb-2">
                    {stat.value}
                  </div>
                  <div className="text-[7px] sm:text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest leading-tight">
                    {stat.label}
                  </div>
               </div>
            </motion.div>
          ))}
        </div>
      </section>
      
      <ChampionGallery/>
      <SuccessStoriesSlider/>
      

      {/* --- 4. RATING IMPROVEMENT JOURNEYS --- */}
      <section className="py-16 md:py-24 container mx-auto px-4 md:px-6">
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-3xl md:text-5xl font-[1000] text-slate-900 tracking-tighter uppercase leading-none">
            {isZh ? "進步" : "The"} <span className="text-indigo-600 italic">{isZh ? "圖譜" : "Progress"}</span> {isZh ? "紀錄" : "Grid"}
          </h2>
          <p className="text-slate-400 font-bold uppercase text-[9px] md:text-[10px] tracking-widest mt-3">
            {isZh ? "實質進步證明" : "Concrete Proof of Improvement"}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {journeys.map((j, i) => (
            <div 
              key={i} 
              className="group relative bg-white border-4 border-slate-900 p-6 md:p-8 rounded-[32px] md:rounded-[40px] shadow-[6px_6px_0px_#1e1b4b] md:shadow-[10px_10px_0px_#1e1b4b] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all"
            >
               <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white mb-6">
                  <TrendingUp size={20} />
               </div>
               <h3 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tighter mb-1">{j.name}</h3>
               <p className="text-indigo-600 font-black uppercase text-[10px] tracking-widest mb-6">{j.time} {isZh ? "計劃" : "Program"}</p>
               <p className="text-slate-500 text-sm font-medium leading-relaxed">
                  {isZh ? "透過" : "Achieved through"} <span className="text-slate-900 font-bold">{j.note}</span> {isZh ? "及每週穩定的賽事複盤達成。" : "and consistent weekly tournament analysis."}
               </p>
            </div>
          ))}
        </div>
      </section>

      {/* --- 5. TOURNAMENT HIGHLIGHTS --- */}
     <section className="py-16 md:py-20 bg-indigo-950 relative overflow-hidden">
  <div 
    className="absolute inset-0 opacity-10 pointer-events-none" 
    style={{ backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`, backgroundSize: '24px 24px' }} 
  />
  
  <div className="container mx-auto px-6 relative z-10 text-center text-white mb-12 md:mb-16">
    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500 text-white text-[9px] font-black uppercase tracking-widest mb-4 border border-white/50 shadow-lg">
      <Trophy size={10} fill="currentColor" />
      {isZh ? "冠軍賽事標準" : "Championship Standards"}
    </div>
    
    <h2 className="text-3xl md:text-5xl font-[1000] tracking-tighter uppercase mb-6 leading-none">
      {isZh ? "競技" : "Competitive"} <span className="text-orange-400 italic">{isZh ? "卓越" : "Excellence"}</span>
    </h2>

    <div className="flex flex-wrap justify-center gap-2">
      {(isZh ? ['FIDE 評級賽', '標準賽', '快棋', '超快棋'] : ['FIDE Rated', 'Standard', 'Rapid', 'Blitz']).map(tag => (
        <span key={tag} className="px-3 py-1 bg-white/5 backdrop-blur-sm rounded-full border border-white/20 text-[8px] md:text-[9px] font-black uppercase tracking-[0.2em]">
          {tag}
        </span>
      ))}
    </div>
  </div>

  <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
    
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      className="bg-white p-2 rounded-[40px] border-4 border-slate-900 shadow-[12px_12px_0px_#4f46e5] flex flex-col"
    >
      <div className="relative h-48 md:h-52 w-full rounded-[32px] overflow-hidden mb-6">
        <img 
          src="/2.webp" 
          alt="Tournament Highlights" 
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 left-4 bg-orange-500 text-white px-3 py-1 rounded-full border-2 border-slate-900 font-black text-[9px] uppercase shadow-lg">
          {isZh ? "新賽季" : "New Season"}
        </div>
      </div>

      <div className="px-6 pb-6 flex-grow">
        <h3 className="text-xl md:text-2xl font-[1000] text-slate-900 uppercase tracking-tighter mb-6">
          {isZh ? "棋院亮點" : "Academy Highlights"}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {(isZh
            ? ["每年 15+ 場賽事", "8 次登上頒獎台", "FIDE 晉級計劃", "快棋模擬訓練"]
            : ["15+ Annual Tournaments", "8 Podium Finishes", "FIDE Entry Program", "Rapid Simulations"]
          ).map((text, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 border border-indigo-100 shrink-0">
                <Zap size={14} fill="currentColor" />
              </div>
              <span className="text-slate-700 font-black uppercase text-[10px] leading-tight">{text}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>

    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      className="bg-orange-500 p-8 md:p-10 rounded-[40px] border-4 border-slate-900 shadow-[12px_12px_0px_#ffffff] flex flex-col justify-center relative overflow-hidden group"
    >
      <Trophy size={200} className="absolute -bottom-10 -right-10 text-white/10 rotate-12 pointer-events-none group-hover:scale-110 transition-transform duration-700" />
      
      <div className="relative z-10">
        <div className="bg-white w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-xl border-2 border-slate-900">
          <Trophy size={24} className="text-orange-500" fill="currentColor" />
        </div>
        
        <h3 className="text-3xl md:text-4xl lg:text-5xl font-[1000] text-white uppercase tracking-tighter leading-[0.85] mb-4">
          {isZh ? "精英" : "Elite"} <br/> {isZh ? "訓練基地" : "Training Hub"}
        </h3>
        
        <p className="text-white font-bold text-xs md:text-base leading-snug max-w-sm mb-8 opacity-90">
          {isZh ? "我們模擬國際賽制及評級體系，幫助學員掌握時間管理，並在高壓環境中保持穩定發揮。" : "We simulate international formats and ranking systems, ensuring students master the clock and conquer high-pressure environments."}
        </p>

        <button className="bg-slate-900 text-white px-6 py-3 rounded-xl font-black uppercase text-[9px] tracking-widest border border-white shadow-lg hover:bg-indigo-600 transition-all active:scale-95">
          {isZh ? "查看賽事日曆" : "View Tournament Calendar"}
        </button>
      </div>
    </motion.div>

  </div>
</section>

      {/* --- 6. START YOUR STORY CTA --- */}
      <section className="py-16 md:py-32 px-4 md:px-6">
         <div className="max-w-4xl mx-auto bg-white border-4 border-slate-900 rounded-[32px] md:rounded-[60px] p-8 md:p-16 lg:p-20 text-center relative shadow-[10px_10px_0px_#f97316] md:shadow-[24px_24px_0px_#f97316]">
            
            <motion.div 
              animate={{ rotate: 360 }} 
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }} 
              className="absolute -top-12 -left-12 text-slate-100 hidden xl:block -z-10"
            >
               <Crown size={240} />
            </motion.div>
            
            <div className="space-y-6 md:space-y-8 relative z-10">
               <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 bg-orange-100 text-orange-600 rounded-full text-[8px] md:text-[10px] font-black uppercase tracking-widest">
                  <Sparkles size={14} className="animate-pulse" />
                  {isZh ? "由此開啟你的棋藝旅程" : "Your Journey Starts Here"}
               </div>
               <h2 className="text-3xl md:text-6xl font-[1000] text-slate-900 uppercase tracking-tighter leading-[0.9] md:leading-none">
                  {isZh ? "寫下你的" : "Start Your"} <br/> 
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500 italic">
                    {isZh ? "成功故事" : "Success Story"}
                  </span>
               </h2>
               <p className="text-slate-500 font-medium max-w-xl mx-auto text-sm md:text-lg leading-relaxed">
                  {isZh ? "每一項成就都始於有紀律的訓練及專業指導。今天就踏出關鍵一步。" : "Every achievement starts with disciplined training and the right guidance. Make your move today."}
               </p>
               
               <div className="flex flex-col sm:flex-row justify-center items-center gap-3 md:gap-5 pt-4 md:pt-6">
                  <Link 
                    href="/contact" 
                    className="w-full sm:w-auto px-8 md:px-12 py-4 md:py-5 bg-slate-900 text-white rounded-xl md:rounded-2xl font-black uppercase tracking-widest text-[10px] md:text-xs hover:bg-orange-600 transition-all flex items-center justify-center gap-3 shadow-lg hover:shadow-orange-200 active:scale-95"
                  >
                    {isZh ? "預約免費試堂" : "Book Free Demo"} <ChevronRight size={18} />
                  </Link>
                  <Link 
                    href="/courses" 
                    className="w-full sm:w-auto px-8 md:px-12 py-4 md:py-5 bg-white border-2 border-slate-900 text-slate-900 rounded-xl md:rounded-2xl font-black uppercase tracking-widest text-[10px] md:text-xs hover:bg-slate-50 transition-all active:scale-95"
                  >
                    {isZh ? "查看課程" : "View Programs"}
                  </Link>
               </div>
            </div>
         </div>
      </section>

    </div>
  );
}