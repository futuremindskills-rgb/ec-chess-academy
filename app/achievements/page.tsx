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

export default function AchievementsPage() {
  const stats = [
    { label: "FIDE Rating Gained", value: "30+", icon: <TrendingUp className="text-orange-500" /> },
    { label: "Elite Performance", value: "2000+", icon: <Trophy className="text-purple-600" /> },
    { label: "Students Trained", value: "100+", icon: <Users className="text-indigo-600" /> },
    { label: "Local Tournaments", value: "15", icon: <Globe className="text-cyan-500" /> },
  ];

  const journeys = [
    { name: "1500 → 1750", time: "10 Months", note: "Structured opening prep" },
    { name: "1650 → 1900", time: "12 Months", note: "Tactical discipline" },
    { name: "Beginner → Captain", time: "School Team", note: "Leadership training" },
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

      <SuccessStoriesSlider/>
      <ChampionGallery/>

      {/* --- 4. RATING IMPROVEMENT JOURNEYS --- */}
      <section className="py-16 md:py-24 container mx-auto px-4 md:px-6">
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-3xl md:text-5xl font-[1000] text-slate-900 tracking-tighter uppercase leading-none">
            The <span className="text-indigo-600 italic">Progress</span> Grid
          </h2>
          <p className="text-slate-400 font-bold uppercase text-[9px] md:text-[10px] tracking-widest mt-3">
            Concrete Proof of Improvement
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
               <p className="text-indigo-600 font-black uppercase text-[10px] tracking-widest mb-6">{j.time} Program</p>
               <p className="text-slate-500 text-sm font-medium leading-relaxed">
                  Achieved through <span className="text-slate-900 font-bold">{j.note}</span> and consistent weekly tournament analysis.
               </p>
            </div>
          ))}
        </div>
      </section>

      {/* --- 5. TOURNAMENT HIGHLIGHTS --- */}
      <section className="py-16 md:py-24 bg-indigo-950 relative overflow-hidden">
         {/* Adaptive background pattern */}
         <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`, backgroundSize: '20px 20px' }} />
         
         <div className="container mx-auto px-4 md:px-6 relative z-10 text-center text-white mb-12 md:mb-16">
            <h2 className="text-3xl md:text-6xl font-[1000] tracking-tighter uppercase mb-6 leading-tight">
              Competitive <br className="xs:hidden" /> <span className="text-orange-400">Excellence</span>
            </h2>
            <div className="flex flex-wrap justify-center gap-2 md:gap-4">
               {['Standard', 'Rapid', 'Blitz', 'FIDE Rated'].map(tag => (
                 <span key={tag} className="px-3 py-1.5 md:px-4 md:py-1.5 bg-white/10 rounded-full border border-white/20 text-[8px] md:text-[10px] font-black uppercase tracking-widest">
                   {tag}
                 </span>
               ))}
            </div>
         </div>

         <div className="max-w-6xl mx-auto px-4 md:px-6 grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-10">
            {/* Highlights Card */}
            <div className="bg-white p-7 md:p-12 rounded-[32px] md:rounded-[48px] border-4 border-slate-900">
               <h3 className="text-xl md:text-2xl font-black text-slate-900 uppercase tracking-tight mb-8">2025 Highlights</h3>
               <div className="space-y-5 md:space-y-7">
                  {[
                    "15 Academy Tournaments Conducted",
                    "8 Podium Finishes in HK Local Opens",
                    "12 Students received first FIDE Rating",
                    "Weekly Online Rapid Simulations"
                  ].map((text, i) => (
                    <div key={i} className="flex items-start gap-4">
                       <Zap className="text-orange-500 shrink-0 mt-0.5" size={18} fill="currentColor" />
                       <span className="text-slate-700 font-bold text-xs md:text-base tracking-tight leading-snug">{text}</span>
                    </div>
                  ))}
               </div>
            </div>

            {/* Hub Card */}
            <div className="bg-orange-500 p-7 md:p-12 rounded-[32px] md:rounded-[48px] border-4 border-slate-900 flex flex-col justify-center relative overflow-hidden">
               <div className="relative z-10">
                  <Trophy size={48} className="text-white mb-6 md:w-20 md:h-20" />
                  <h3 className="text-2xl md:text-4xl font-black text-white uppercase tracking-tighter leading-none mb-4">
                    Elite Training <br/> Hub
                  </h3>
                  <p className="text-white/90 text-sm md:text-base font-bold leading-relaxed max-w-sm">
                    Exposure to international formats and local ranking systems ensures our students are never intimidated by the clock.
                  </p>
               </div>
               {/* Scaled decoration icon for visual depth */}
               <Trophy size={180} className="absolute -bottom-10 -right-10 text-white/10 rotate-12 pointer-events-none" />
            </div>
         </div>
      </section>

      {/* --- 6. START YOUR STORY CTA --- */}
      <section className="py-16 md:py-32 px-4 md:px-6">
         <div className="max-w-4xl mx-auto bg-white border-4 border-slate-900 rounded-[32px] md:rounded-[60px] p-8 md:p-16 lg:p-20 text-center relative shadow-[10px_10px_0px_#f97316] md:shadow-[24px_24px_0px_#f97316]">
            
            {/* Desktop Decoration */}
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
                  Your Journey Starts Here
               </div>
               <h2 className="text-3xl md:text-6xl font-[1000] text-slate-900 uppercase tracking-tighter leading-[0.9] md:leading-none">
                  Start Your <br/> 
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500 italic">
                    Success Story
                  </span>
               </h2>
               <p className="text-slate-500 font-medium max-w-xl mx-auto text-sm md:text-lg leading-relaxed">
                  Every achievement starts with disciplined training and the right guidance. Make your move today.
               </p>
               
               <div className="flex flex-col sm:flex-row justify-center items-center gap-3 md:gap-5 pt-4 md:pt-6">
                  <Link 
                    href="/book-demo" 
                    className="w-full sm:w-auto px-8 md:px-12 py-4 md:py-5 bg-slate-900 text-white rounded-xl md:rounded-2xl font-black uppercase tracking-widest text-[10px] md:text-xs hover:bg-orange-600 transition-all flex items-center justify-center gap-3 shadow-lg hover:shadow-orange-200 active:scale-95"
                  >
                    Book Free Demo <ChevronRight size={18} />
                  </Link>
                  <Link 
                    href="/courses" 
                    className="w-full sm:w-auto px-8 md:px-12 py-4 md:py-5 bg-white border-2 border-slate-900 text-slate-900 rounded-xl md:rounded-2xl font-black uppercase tracking-widest text-[10px] md:text-xs hover:bg-slate-50 transition-all active:scale-95"
                  >
                    View Programs
                  </Link>
               </div>
            </div>
         </div>
      </section>

    </div>
  );
}