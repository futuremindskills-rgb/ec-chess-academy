"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Trophy, 
  ChevronLeft, 
  ChevronRight, 
  Quote, 
  Star,
  Target,
  ShieldCheck,
  Medal
} from "lucide-react";

// New data structure based on your photos
const successStories = [
  {
    name: "Ng Kwun Wang",
    chineseName: "吳冠宏",
    age: 14,
    location: "Yew Chung Int. School",
    duration: "Advanced Track",
    beforeRating: "Competitive",
    afterRating: "U14 Champion",
    beforeResult: "Regional Participant",
    afterResult: "DCD Charity Tournament 1st",
    insight: "Guanhong's calm judgement and steady mindset allowed him to stand out in a highly competitive open field.",
    // Replace these with your actual image paths
    images: ["/ng1.jpeg", "/ng2.jpeg", "/ng3.jpeg"],
    cardBg: "bg-[#F5F3FF]", 
    accent: "text-purple-600",
    pattern: "data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l30 30-30 30-30-30z' fill='%237c3aed' fill-opacity='0.05' /%3E%3C/svg%3E"
  },
  {
    name: "Luo Xu Nan",
    chineseName: "駱栩南",
    age: 9,
    location: "Kowloon",
    duration: "Intensive Course",
    beforeRating: "Intermediate",
    afterRating: "2nd Place (Silver)",
    beforeResult: "Club Level Player",
    afterResult: "HK Inter-School Runner-up",
    insight: "Xu Nan's focus and stability during high-pressure matches led him through numerous rounds to a well-deserved silver medal.",
    images: ["/luo1.jpeg", "/luo2.jpeg"],
    cardBg: "bg-[#FFF7ED]", 
    accent: "text-orange-600",
    pattern: "data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='2' cy='2' r='1' fill='%23ea580c' fill-opacity='0.07' /%3E%3C/svg%3E"
  },
  {
    name: "Wong Ping Hei",
    chineseName: "黃秉禧",
    age: 7,
    location: "Kowloon City",
    duration: "Foundation Plus",
    beforeRating: "Novice",
    afterRating: "3rd Place (Bronze)",
    beforeResult: "Learning Fundamentals",
    afterResult: "TCA Novice U7 Individual",
    insight: "Ping Hei's disciplined attitude and consistent effort resulted in a fantastic podium finish in the U7 division.",
    images: ["/wong1.jpeg", "/wong2.jpeg", "/wong3.jpeg"],
    cardBg: "bg-[#EEF2FF]", 
    accent: "text-indigo-600",
    pattern: "data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h20v20H0V0zm20 20h20v20H20V20z' fill='%234338ca' fill-opacity='0.05' /%3E%3C/svg%3E"
  },
  {
    name: "Jim Tsz Chun",
    chineseName: "詹梓進",
    age: 12,
    location: "Hong Kong",
    duration: "Elite Training",
    beforeRating: "Top Tier",
    afterRating: "Multi-Year Medalist",
    beforeResult: "Junior Competitor",
    afterResult: "Runner-up (2021 & 2022)",
    insight: "Tsz Chun has maintained consistent excellence over several years, securing silver in both U12 and High Primary categories.",
    images: ["/jim1.jpeg", "/jim2.jpeg", "/jim3.jpeg", "/jim4.jpeg", "/jim5.jpeg", "/jim6.jpeg", "/jim7.jpeg", "/jim8.jpeg", "/jim9.jpeg", "/jim10.jpeg", "/jim11.jpeg", "/jim12.jpeg", "/jim13.jpeg", "/jim14.jpeg", "/jim15.jpeg", "/jim16.jpeg", "/jim17.jpeg", "/jim18.jpeg", "/jim19.jpeg"],
    cardBg: "bg-[#F0FDF4]", 
    accent: "text-emerald-600",
    pattern: "data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='0' y='0' width='10' height='10' fill='%23059669' fill-opacity='0.04' /%3E%3C/svg%3E"
  }
];

// Inner Image Slider Component
const InnerImageSlider = ({ images }: { images: string[] }) => {
  const [imgIdx, setImgIdx] = useState(0);

  const nextImg = (e: React.MouseEvent) => {
    e.stopPropagation();
    setImgIdx((prev) => (prev + 1) % images.length);
  };

  const prevImg = (e: React.MouseEvent) => {
    e.stopPropagation();
    setImgIdx((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="relative group w-full h-full">
      <AnimatePresence mode="wait">
        <motion.img 
          key={imgIdx}
          src={images[imgIdx]} 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="w-full h-full object-cover"
        />
      </AnimatePresence>
      
      {images.length > 1 && (
        <>
          <button onClick={prevImg} className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
            <ChevronLeft size={16} />
          </button>
          <button onClick={nextImg} className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
            <ChevronRight size={16} />
          </button>
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1">
            {images.map((_, i) => (
              <div key={i} className={`w-1.5 h-1.5 rounded-full ${i === imgIdx ? 'bg-white' : 'bg-white/40'}`} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

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
            Recent Wins <br /> 
            <span className="text-indigo-600 underline decoration-orange-200 underline-offset-4 md:underline-offset-8 decoration-4 md:decoration-8">Success Stories.</span>
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
              <div className="absolute inset-0 bg-[#0f172a] rounded-[32px] md:rounded-[50px] translate-x-2 translate-y-2 md:translate-x-4 md:translate-y-4 -z-10" />

              <div className={`relative ${successStories[index].cardBg} rounded-[32px] md:rounded-[50px] border-[3px] md:border-4 border-slate-900 p-6 sm:p-10 md:p-14 flex flex-col lg:flex-row items-center gap-8 md:gap-12 lg:gap-16 overflow-hidden`}>
                
                <div className="absolute inset-0 opacity-100 pointer-events-none z-0" 
                     style={{ backgroundImage: `url("${successStories[index].pattern}")` }} />

                {/* IMAGE SECTION WITH NESTED SLIDER */}
                <div className="relative z-10 flex-shrink-0">
                  <div className="w-44 h-44 sm:w-60 sm:h-60 md:w-80 md:h-80 relative">
                    <motion.div 
                      animate={{ rotate: 360 }} 
                      transition={{ duration: 25, repeat: Infinity, ease: "linear" }} 
                      className="absolute -inset-2 md:-inset-4 border-[2px] md:border-[3px] border-white rounded-full border-dashed opacity-40" 
                    />
                    <div className="w-full h-full rounded-full overflow-hidden border-[6px] md:border-[10px] border-white shadow-xl relative z-10 bg-slate-200">
                      <InnerImageSlider images={successStories[index].images} />
                    </div>
                    {/* Badge */}
                    <div className="absolute -bottom-1 -right-1 md:-bottom-2 md:-right-2 w-16 h-16 md:w-20 md:h-20 bg-yellow-400 rounded-full flex items-center justify-center border-[3px] md:border-4 border-slate-900 shadow-xl rotate-12 z-20">
                       <Medal className="text-slate-900" size={24} />
                    </div>
                  </div>
                  <p className="text-center mt-4 text-[10px] font-black uppercase text-slate-400 tracking-widest">Click arrows to view photos</p>
                </div>

                {/* TEXT CONTENT */}
                <div className="relative z-10 flex-1 space-y-6 md:space-y-8 text-center lg:text-left w-full">
                  <div>
                    <span className={`font-bold italic uppercase tracking-widest text-[10px] md:text-[11px] ${successStories[index].accent}`}>Student Achievement</span>
                    <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-[1000] text-slate-900 uppercase tracking-tighter mt-1">
                      {successStories[index].name} 
                      <div className="block sm:inline-block text-[10px] md:text-[12px] font-black bg-white/60 border border-white px-2 py-1 rounded-lg sm:ml-3 mt-2 sm:mt-0 text-slate-600 tracking-normal align-middle">
                        {successStories[index].chineseName}
                      </div>
                    </h3>
                  </div>

                  {/* DATA GRID */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                    <div className="p-4 md:p-6 bg-white/40 backdrop-blur-md rounded-2xl md:rounded-3xl border-2 border-white shadow-sm flex flex-col items-center lg:items-start">
                      <div className="flex items-center gap-2 mb-2">
                        <Target size={14} className="text-slate-400" />
                        <span className="text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest">Previous Record</span>
                      </div>
                      <div className="text-xl md:text-2xl font-black text-slate-500 leading-none">{successStories[index].beforeRating}</div>
                      <p className="text-[10px] md:text-[11px] font-bold text-slate-500 mt-2">{successStories[index].beforeResult}</p>
                    </div>

                    <div className="p-4 md:p-6 bg-white rounded-2xl md:rounded-3xl border-2 border-slate-900 shadow-lg flex flex-col items-center lg:items-start">
                      <div className="flex items-center gap-2 mb-2">
                        <Trophy size={14} className={successStories[index].accent} />
                        <span className={`text-[9px] md:text-[10px] font-black uppercase tracking-widest ${successStories[index].accent}`}>Tournament Result</span>
                      </div>
                      <div className={`text-xl md:text-2xl font-black ${successStories[index].accent} leading-none underline decoration-2 md:decoration-4 underline-offset-4`}>
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
                       <h4 className="text-[9px] md:text-[10px] font-black uppercase text-slate-400 tracking-widest">Instructor Remark</h4>
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