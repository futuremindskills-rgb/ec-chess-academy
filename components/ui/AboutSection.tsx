"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { 
  Trophy, 
  Sparkles, 
  Crown, 
  Target, 
  ShieldCheck,
  Zap
} from 'lucide-react';

const AboutSection: React.FC = () => {
  return (
    <section className="py-12 md:py-20 lg:py-32 bg-white overflow-hidden font-sans">
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
        <div className="flex flex-col lg:grid lg:grid-cols-12 items-center gap-12 md:gap-16 lg:gap-20">
          
          {/* --- LEFT: VISUAL COMPOSITION --- */}
          <div className="w-full lg:col-span-6 relative order-1">
            <div className="relative w-full max-w-[320px] sm:max-w-[450px] lg:max-w-[500px] aspect-square mx-auto lg:mx-0">
              
              {/* 3D Solid Shadow - Scaled for mobile */}
              <div className="absolute inset-0 bg-[#0f172a] rounded-[2rem] md:rounded-[3rem] translate-x-2 translate-y-2 md:translate-x-4 md:translate-y-4 -z-10" />

              {/* Main Image */}
              <div className="absolute top-0 left-0 w-[85%] h-[80%] z-10 border-2 md:border-4 border-slate-900 rounded-[2rem] md:rounded-[3rem] overflow-hidden bg-slate-100">
                <img src="/3.webp" className="w-full h-full object-cover" alt="Elite Coaching" />
              </div>

              {/* Overlapping Image */}
              <motion.div 
                whileHover={{ scale: 1.05, rotate: -3 }}
                className="absolute bottom-[-2%] right-[-2%] md:bottom-[-5%] md:right-[-5%] w-[60%] h-[55%] z-20 p-1.5 md:p-2 bg-white rounded-[1.5rem] md:rounded-[2.5rem] border-2 md:border-4 border-slate-900 shadow-2xl"
              >
                <img src="/2.webp" className="w-full h-full object-cover rounded-[1.2rem] md:rounded-[2rem]" alt="Strategy" />
              </motion.div>

              {/* Sticker Badge - Adjusted positioning for mobile safety */}
              <div className="absolute top-1/2 -left-4 sm:-left-10 z-30 bg-orange-500 p-3 sm:p-5 rounded-2xl sm:rounded-3xl border-2 md:border-4 border-slate-900 text-white -rotate-12 shadow-xl">
                <Trophy size={20} className="mb-1 sm:w-6 sm:h-6" />
                <div className="text-xl sm:text-3xl font-[1000] leading-none">15+</div>
                <div className="text-[7px] sm:text-[8px] font-black uppercase tracking-tighter">Years Expert</div>
              </div>
            </div>
          </div>

          {/* --- RIGHT: CONTENT AREA --- */}
          <div className="w-full lg:col-span-6 space-y-6 md:space-y-8 order-2">
            
            <div className="flex justify-center lg:justify-start">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900 text-white text-[9px] md:text-[10px] font-black uppercase tracking-widest">
                <Sparkles size={12} className="text-orange-400" />
                Elite Academy HK
              </div>
            </div>

            <div className="text-center lg:text-left space-y-4">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-[1000] text-slate-900 leading-[1.1] tracking-tighter uppercase">
                Elite Strategy. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-purple-600 to-indigo-600 italic">
                  Local Champions.
                </span>
              </h2>

              <p className="text-base md:text-lg lg:text-xl text-slate-500 font-bold leading-tight max-w-lg mx-auto lg:mx-0">
                We turn potential into strategy. EC Chess provides Hong Kong’s youth with FIDE-standard training and cognitive growth.
              </p>
            </div>

            {/* Scannable Grid - 2 columns on most screens */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4 pt-2">
               {[
                 { text: "FIDE Certified", icon: <ShieldCheck size={18} /> }, 
                 { text: "HK Training Hub", icon: <Crown size={18} /> }, 
                 { text: "Logic Focused", icon: <Target size={18} /> }, 
                 { text: "Proven Results", icon: <Zap size={18} /> }
               ].map((item, idx) => (
                 <div key={idx} className="flex items-center gap-2 sm:gap-3 p-2.5 sm:p-3 bg-slate-50 rounded-xl sm:rounded-2xl border border-slate-100">
                    <div className="text-indigo-600 shrink-0">{item.icon}</div>
                    <span className="text-slate-900 font-black uppercase text-[8px] sm:text-[10px] tracking-tight leading-none">{item.text}</span>
                 </div>
               ))}
            </div>

            {/* Bottom Academy Seal */}
            <div className="flex items-center justify-center lg:justify-start gap-4 sm:gap-5 pt-6 border-t border-slate-100">
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full border-2 border-slate-900 p-1 shrink-0">
                    <img src="/icon.png" className="w-full h-full object-contain" alt="EC Logo" />
                </div>
                <div className="text-left">
                  <h4 className="text-base sm:text-lg font-black text-slate-900 uppercase leading-none">EC Academy HK</h4>
                  <p className="text-[8px] sm:text-[10px] font-black text-orange-500 uppercase tracking-widest mt-1 italic leading-none">Building The Grandmasters of Life</p>
                </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutSection;