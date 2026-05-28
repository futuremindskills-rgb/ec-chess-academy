"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  Star, 
  CheckCircle2, 
  ShieldCheck, 
  Crown, 
  MessageCircle 
} from 'lucide-react';
import { useLocale } from 'next-intl';

const CoachCtaSection: React.FC = () => {
  const locale = useLocale();
  const isZh = locale === "zh";
  return (
    <section className="relative py-16 md:py-24 px-4 sm:px-6 bg-white font-sans overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-full md:w-1/3 h-full bg-orange-50 rounded-full blur-[120px] opacity-40 -translate-y-1/2 translate-x-1/4 pointer-events-none"></div>

      <div className="w-full max-w-6xl mx-auto relative z-10">
        
        {/* THE MODULE WRAPPER WITH 3D SHADOW */}
        <div className="relative group">
          {/* THE 3D SOLID SHADOW - Scaled for mobile */}
          <div className="absolute inset-0 bg-[#1e1b4b] rounded-[40px] md:rounded-[50px] translate-x-2 translate-y-2 md:translate-x-4 md:translate-y-4 -z-10 transition-transform group-hover:translate-x-3 md:group-hover:translate-x-5" />

          {/* MAIN CARD CONTAINER */}
          <div className="bg-white rounded-[40px] md:rounded-[50px] border-[3px] md:border-4 border-slate-900 overflow-hidden flex flex-col lg:flex-row shadow-2xl">
            
            {/* --- LEFT: CONTENT AREA --- */}
            <div className="w-full lg:w-[60%] p-8 sm:p-12 md:p-16 lg:p-20 flex flex-col justify-center">
              
              {/* Sticker Label */}
              <div className="inline-flex items-center gap-2 self-start px-3 py-1.5 md:px-4 md:py-1.5 rounded-full bg-slate-900 text-white text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] mb-6 md:mb-8 shadow-xl">
                <ShieldCheck size={14} className="text-orange-400" />
                <span>{isZh ? "FIDE 专业导师" : "Professional FIDE Mentorship"}</span>
              </div>

              {/* Headline - Responsive Sizes */}
              <h2 className="text-3xl sm:text-5xl md:text-6xl font-[1000] text-slate-900 mb-6 md:mb-8 leading-[1.1] md:leading-[0.9] tracking-tighter uppercase">
                {isZh ? "掌控棋盘" : "Master the Board"} <br className="hidden sm:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-purple-600 to-indigo-950 italic">
                  {isZh ? "师从顶尖导师" : "With the Best."}
                </span>
              </h2>

              {/* Subtext */}
              <p className="text-slate-500 text-base md:text-xl font-medium mb-8 md:mb-10 leading-relaxed max-w-lg">
                {isZh ? "有正确指导，进步会更快。我们的 " : "Training accelerates when you have the right guide. Our "}<strong className="text-slate-900 font-black">FIDE-{isZh ? "认证" : "Certified"}</strong>{isZh ? " 导师将国际理论与战术精度结合。" : " mentors combine international theory with tactical precision."}
              </p>

              {/* Catchy Benefits Grid - Stays 1 col on tiny, 2 col on sm+ */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10 md:mb-12">
                {[
                  isZh ? "FIDE认证导师" : "FIDE Certified Instructors",
                  isZh ? "个性化成长路径" : "Personalized Roadmaps",
                  isZh ? "赛事思维训练" : "Tournament Mindset",
                  isZh ? "深度引擎复盘" : "Deep Engine Analysis"
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="w-5 h-5 md:w-6 md:h-6 rounded-lg bg-orange-100 flex items-center justify-center shrink-0 border border-orange-200">
                      <CheckCircle2 className="w-3 h-3 md:w-4 md:h-4 text-orange-600" />
                    </div>
                    <span className="text-slate-700 font-black uppercase text-[9px] md:text-[10px] tracking-tight">{item}</span>
                  </div>
                ))}
              </div>

              {/* ACTION BUTTONS */}
              <div className="flex flex-col sm:flex-row gap-4 md:gap-5">
                <Link href="/contact" className="w-full sm:w-auto">
                  <button className="w-full group bg-slate-900 text-white font-black uppercase tracking-widest text-[10px] md:text-xs py-4 md:py-5 px-8 md:px-10 rounded-2xl flex items-center justify-center gap-3 transition-all hover:bg-orange-500 hover:-translate-y-1 shadow-xl active:scale-95">
                    <MessageCircle size={18} className="fill-current" />
                    {isZh ? "免费评估" : "Free Assessment"}
                  </button>
                </Link>
                <Link href="/about" className="w-full sm:w-auto">
                  <button className="w-full bg-white border-2 border-slate-900 text-slate-900 font-black uppercase tracking-widest text-[10px] md:text-xs py-4 md:py-5 px-8 md:px-10 rounded-2xl hover:bg-slate-50 transition-all flex items-center justify-center gap-2 active:scale-95">
                    {isZh ? "导师团队" : "Our Mentors"}
                    <ArrowRight size={18} className="text-orange-500" />
                  </button>
                </Link>
              </div>
            </div>

            {/* --- RIGHT: IMAGE / VISUAL AREA --- */}
            <div className="w-full lg:w-[40%] relative min-h-[350px] sm:min-h-[450px] lg:min-h-full bg-slate-100 border-t-[3px] lg:border-t-0 lg:border-l-[3px] border-slate-900">
              {/* Main Image */}
              <img 
                src="/3.webp" 
                alt="EC Chess Academy Coaching" 
                className="w-full h-full object-cover grayscale-[0.2] hover:grayscale-0 transition-all duration-700"
              />
              
              <div className="absolute inset-0 bg-indigo-950/10 mix-blend-overlay"></div>
              <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-slate-900/60 to-transparent"></div>

              {/* STICKER: Floating 'Top Academy' Badge - Responsive positioning and scale */}
              <motion.div 
                animate={{ rotate: [-3, 3, -3], y: [0, -8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-6 right-6 md:top-10 md:right-10 bg-white p-3 md:p-5 rounded-[20px] md:rounded-[30px] shadow-2xl border-[3px] md:border-4 border-slate-900 z-20 scale-90 md:scale-100"
              >
                 <div className="flex items-center gap-0.5 md:gap-1 mb-1 md:mb-2 justify-center">
                   {[1,2,3,4,5].map(i => <Star key={i} className="w-3 h-3 md:w-4 md:h-4 text-yellow-400 fill-yellow-400" />)}
                 </div>
                 <p className="text-[8px] md:text-[10px] font-black text-slate-900 uppercase tracking-widest text-center leading-none">Top Rated HK Academy</p>
              </motion.div>

              {/* STICKER: Floating 'FIDE' Badge */}
              <motion.div 
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-6 left-6 md:bottom-10 md:left-10 bg-yellow-400 p-3 md:p-5 rounded-[20px] md:rounded-[30px] shadow-2xl border-[3px] md:border-4 border-slate-900 flex items-center gap-3 md:gap-4 z-20 rotate-[-4deg] scale-90 md:scale-100"
              >
                 <div className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-xl md:rounded-2xl flex items-center justify-center text-slate-900 shadow-md">
                    <Crown size={20} className="md:w-6 md:h-6" />
                 </div>
                 <div>
                    <p className="text-xs md:text-sm font-[1000] text-slate-900 uppercase leading-none">FIDE Certified</p>
                 <p className="text-[8px] md:text-[9px] text-slate-700 font-black uppercase tracking-widest mt-1">{isZh ? "精英标准" : "Elite Standard"}</p>
                 </div>
              </motion.div>

            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default CoachCtaSection;