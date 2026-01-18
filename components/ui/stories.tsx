"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Trophy, 
  ChevronLeft, 
  ChevronRight, 
  Quote, 
  Star,
  Target,
  ShieldCheck
} from "lucide-react";

const successStories = [
  {
    name: "Zishun",
    age: 12,
    location: "Hong Kong",
    duration: "12 Months",
    beforeRating: "1450",
    afterRating: "1720+",
    beforeResult: "Tactical gaps identified",
    afterResult: "Top 3 local finishes",
    insight: "Zishan focused on endgame precision. His mindset transformed from reactive to pro-active strategy.",
    image: "/rev4.webp",
    cardBg: "bg-[#EEF2FF]", 
    accent: "text-indigo-600",
    pattern: "data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h20v20H0V0zm20 20h20v20H20V20z' fill='%234338ca' fill-opacity='0.05' /%3E%3C/svg%3E"
  },
  {
    name: "Shun Keng",
    age: 9,
    location: "Kowloon",
    duration: "8 Months",
    beforeRating: "Beginner",
    afterRating: "Junior Champ",
    beforeResult: "Zero prior knowledge",
    afterResult: "School Team Captain",
    insight: "Shun has incredible spatial memory. We used tactical patterns to harness her natural talent.",
    image: "/rev3.webp",
    cardBg: "bg-[#FFF7ED]", 
    accent: "text-orange-600",
    pattern: "data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='2' cy='2' r='1' fill='%23ea580c' fill-opacity='0.07' /%3E%3C/svg%3E"
  },
  {
    name: "Zhuo Qian",
    age: 15,
    location: "Central HK",
    duration: "18 Months",
    beforeRating: "1600",
    afterRating: "1950+",
    beforeResult: "Plateaued for 2 years",
    afterResult: "Advanced player",
    insight: "We used deep engine analysis to fix positional weaknesses in closed structures.",
    image: "/rev2.webp",
    cardBg: "bg-[#F5F3FF]", 
    accent: "text-purple-600",
    pattern: "data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l30 30-30 30-30-30z' fill='%237c3aed' fill-opacity='0.05' /%3E%3C/svg%3E"
  }
];

const SuccessStoriesSlider: React.FC = () => {
  const [index, setIndex] = useState(0);

  const next = () => setIndex((prev) => (prev + 1) % successStories.length);
  const prev = () => setIndex((prev) => (prev - 1 + successStories.length) % successStories.length);

  return (
    <section className="py-16 md:py-24 bg-white overflow-hidden font-sans">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* HEADER */}
        <div className="text-center mb-10 md:mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900 text-white text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] mb-4 md:mb-6 shadow-xl"
          >
            <Star size={10} className="text-yellow-400 fill-current md:w-3 md:h-3" />
            Academy Hall of Fame
          </motion.div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-[1000] text-slate-900 tracking-tighter uppercase leading-[1.1]">
            Proven Results <br /> 
            <span className="text-indigo-600 underline decoration-orange-200 underline-offset-4 md:underline-offset-8 decoration-4 md:decoration-8">Real Growth.</span>
          </h2>
        </div>

        {/* SLIDER CONTAINER */}
        <div className="relative max-w-5xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div 
              key={index}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="relative"
            >
              {/* 3D POP SHADOW */}
              <div className="absolute inset-0 bg-[#0f172a] rounded-[32px] md:rounded-[50px] translate-x-2 translate-y-2 md:translate-x-4 md:translate-y-4 -z-10" />

              {/* MAIN CONTENT CARD */}
              <div className={`relative ${successStories[index].cardBg} rounded-[32px] md:rounded-[50px] border-[3px] md:border-4 border-slate-900 p-6 sm:p-10 md:p-14 flex flex-col lg:flex-row items-center gap-8 md:gap-12 lg:gap-16 overflow-hidden`}>
                
                {/* PATTERN OVERLAY */}
                <div className="absolute inset-0 opacity-100 pointer-events-none z-0" 
                     style={{ backgroundImage: `url("${successStories[index].pattern}")` }} />

                {/* IMAGE SECTION */}
                <div className="relative z-10 flex-shrink-0">
                  <div className="w-40 h-40 sm:w-56 sm:h-56 md:w-72 md:h-72 relative">
                    <motion.div 
                      animate={{ rotate: 360 }} 
                      transition={{ duration: 25, repeat: Infinity, ease: "linear" }} 
                      className="absolute -inset-2 md:-inset-4 border-[2px] md:border-[3px] border-white rounded-full border-dashed opacity-40" 
                    />
                    <div className="w-full h-full rounded-full overflow-hidden border-[6px] md:border-[10px] border-white shadow-xl relative z-10">
                      <img 
                        src={successStories[index].image} 
                        alt={successStories[index].name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {/* Floating Badge */}
                    <div className="absolute -bottom-1 -right-1 md:-bottom-2 md:-right-2 w-16 h-16 md:w-20 md:h-20 bg-yellow-400 rounded-full flex items-center justify-center border-[3px] md:border-4 border-slate-900 shadow-xl rotate-12 z-20">
                       <span className="text-[8px] md:text-[10px] font-[1000] text-slate-900 uppercase text-center leading-none tracking-tighter">Elite<br/>Result</span>
                    </div>
                  </div>
                </div>

                {/* TEXT CONTENT */}
                <div className="relative z-10 flex-1 space-y-6 md:space-y-8 text-center lg:text-left w-full">
                  <div>
                    <span className={`font-bold italic uppercase tracking-widest text-[10px] md:text-[11px] ${successStories[index].accent}`}>Student Spotlight</span>
                    <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-[1000] text-slate-900 uppercase tracking-tighter mt-1">
                      {successStories[index].name} 
                      <div className="block sm:inline-block text-[9px] md:text-[11px] font-black bg-white/60 border border-white px-2 py-1 rounded-lg sm:ml-3 mt-2 sm:mt-0 text-slate-500 tracking-widest uppercase align-middle">
                        Age {successStories[index].age} | HK
                      </div>
                    </h3>
                  </div>

                  {/* DATA GRID */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                    <div className="p-4 md:p-6 bg-white/40 backdrop-blur-md rounded-2xl md:rounded-3xl border-2 border-white shadow-sm flex flex-col items-center lg:items-start">
                      <div className="flex items-center gap-2 mb-2">
                        <Target size={14} className="text-slate-400" />
                        <span className="text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest">Initial Rank</span>
                      </div>
                      <div className="text-2xl md:text-3xl font-black text-slate-500 leading-none">{successStories[index].beforeRating}</div>
                      <p className="text-[10px] md:text-[11px] font-bold text-slate-500 mt-2">{successStories[index].beforeResult}</p>
                    </div>

                    <div className="p-4 md:p-6 bg-white rounded-2xl md:rounded-3xl border-2 border-slate-900 shadow-lg flex flex-col items-center lg:items-start">
                      <div className="flex items-center gap-2 mb-2">
                        <Trophy size={14} className={successStories[index].accent} />
                        <span className={`text-[9px] md:text-[10px] font-black uppercase tracking-widest ${successStories[index].accent}`}>Current Rank</span>
                      </div>
                      <div className={`text-2xl md:text-3xl font-black ${successStories[index].accent} leading-none underline decoration-2 md:decoration-4 underline-offset-4`}>
                        {successStories[index].afterRating}
                      </div>
                      <p className="text-[10px] md:text-[11px] font-black text-slate-900 mt-2">{successStories[index].afterResult}</p>
                    </div>
                  </div>

                  {/* COACH INSIGHT */}
                  <div className="p-5 md:p-6 bg-white border-2 border-slate-900 rounded-[24px] md:rounded-[32px] relative shadow-sm text-left">
                    <Quote className="absolute top-2 right-4 md:top-4 md:right-6 text-slate-100 w-8 h-8 md:w-12 md:h-12" />
                    <div className="flex items-center gap-2 mb-2">
                       <ShieldCheck className={successStories[index].accent} size={14} />
                       <h4 className="text-[9px] md:text-[10px] font-black uppercase text-slate-400 tracking-widest">Coaching Perspective</h4>
                    </div>
                    <p className="text-slate-700 font-bold italic text-xs md:text-sm leading-relaxed relative z-10">
                      &quot;{successStories[index].insight}&quot;
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* NAVIGATION BUTTONS */}
          <div className="mt-10 md:mt-16 flex justify-center gap-4 md:gap-8">
            <button 
              onClick={prev}
              className="group relative w-12 h-12 md:w-14 md:h-14 bg-white rounded-full border-2 border-slate-900 flex items-center justify-center transition-all active:translate-y-0.5 shadow-md"
            >
              <div className="absolute inset-0 bg-slate-900 rounded-full translate-x-1 translate-y-1 -z-10 transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
              <ChevronLeft className="text-slate-900 group-hover:-translate-x-0.5 transition-transform" size={20} />
            </button>

            <button 
              onClick={next}
              className="group relative w-12 h-12 md:w-14 md:h-14 bg-white rounded-full border-2 border-slate-900 flex items-center justify-center transition-all active:translate-y-0.5 shadow-md"
            >
              <div className="absolute inset-0 bg-slate-900 rounded-full translate-x-1 translate-y-1 -z-10 transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
              <ChevronRight className="text-slate-900 group-hover:translate-x-0.5 transition-transform" size={20} />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};

export default SuccessStoriesSlider;