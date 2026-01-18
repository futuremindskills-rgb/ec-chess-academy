"use client";
import React from "react";
import { motion } from "framer-motion";
import { Quote, ThumbsUp, Star, Trophy, Target, Zap } from "lucide-react";

const testimonials = [
  {
    name: "Zhuo Huan",
    role: "Young Champ",
    quote: "Developing a child's focus can be achieved by constantly paying attention to the situation on the board while playing chess. This also helps in logical thinking.",
    result: "1st Place, HK Open",
    image: "/rev1.webp",
    bgColor: "bg-[#FF7A00]",
    pattern: "data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h20v20H0V0zm20 20h20v20H20V20z' fill='%23fff' fill-opacity='0.1' /%3E%3C/svg%3E",
    icon: <Trophy className="w-4 h-4 text-yellow-300" />
  },
  {
    name: "Zhuo Qian",
    role: "Executive @ Central HK",
    quote: "Develop your child's logical thinking skills. A child's brain is in a phase of rapid growth. Each game requires thinking about the course of each move.",
    result: "Elite School Admission",
    image: "/rev2.webp",
    bgColor: "bg-[#8A2BE2]",
    pattern: "data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='2' cy='2' r='1' fill='%23fff' fill-opacity='0.2' /%3E%3C/svg%3E",
    icon: <Target className="w-4 h-4 text-cyan-300" />
  },
  {
    name: "Shun Keng",
    role: "Student",
    quote: "Developing mathematical skills is important. Take Go as an example: a game requires more than 100 moves. Children's calculation abilities will improve.",
    result: "Top 10 Junior",
    image: "/rev3.webp",
    bgColor: "bg-[#1e1b4b]",
    pattern: "data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l30 30-30 30-30-30z' fill='%23fff' fill-opacity='0.05' /%3E%3C/svg%3E",
    icon: <Zap className="w-4 h-4 text-orange-400" />
  },
];

const TestimonialsGrid: React.FC = () => {
  return (
    <section className="py-12 md:py-20 lg:py-24 bg-white overflow-hidden font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* CENTERED HEADING */}
        <div className="text-center mb-10 md:mb-16">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-1.5 rounded-full bg-slate-900 text-white text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] mb-4 shadow-xl"
          >
            <Star size={10} className="fill-current text-yellow-400 md:w-3 md:h-3" />
            Success Stories
          </motion.div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-[1000] text-slate-900 tracking-tighter uppercase leading-[1.1]">
            Voices of Our <span className="text-indigo-600">Grandmasters</span>
          </h2>
        </div>

        {/* RESPONSIVE GRID: 1 col on mobile, 2 on tablet, 3 on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 items-stretch">
          {testimonials.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
              className="relative group flex flex-col h-full"
            >
              {/* THE 3D POP SHADOW (Scaled for mobile) */}
              <div className="absolute inset-0 bg-slate-900 rounded-[30px] md:rounded-[35px] translate-x-1.5 translate-y-1.5 md:translate-x-2.5 md:translate-y-2.5 transition-transform group-hover:translate-x-3.5 group-hover:translate-y-3.5" />

              {/* MAIN COLORFUL CARD */}
              <div className={`relative ${item.bgColor} border-2 border-slate-900 rounded-[30px] md:rounded-[35px] p-6 md:p-8 h-full flex flex-col overflow-hidden`}>
                
                {/* --- INTERNAL PATTERN --- */}
                <div className="absolute inset-0 pointer-events-none z-0" 
                     style={{ backgroundImage: `url("${item.pattern}")` }} />

                <div className="relative z-10 flex flex-col h-full">
                  
                  {/* TOP: PROFILE STICKER */}
                  <div className="flex items-center gap-3 mb-5 md:mb-6">
                    <div className="relative w-12 h-12 md:w-14 md:h-14 shrink-0">
                      <div className="absolute inset-0 rounded-full border-2 border-slate-900 transform rotate-12 bg-white" />
                      <div className="w-full h-full rounded-full overflow-hidden border-2 border-slate-900 relative z-10">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="absolute -top-0.5 -right-0.5 bg-white rounded-full p-1 border border-slate-900 z-20 shadow-lg">
                        <ThumbsUp size={8} className="text-indigo-600 fill-indigo-50 md:w-2.5 md:h-2.5" />
                      </div>
                    </div>
                    <div>
                      <h4 className="font-black uppercase tracking-tight text-sm md:text-base italic text-white leading-none">{item.name}</h4>
                      <div className="inline-block px-2 py-0.5 bg-black/20 backdrop-blur-md rounded-md mt-1">
                        <p className="text-[7px] md:text-[8px] font-black text-white/90 uppercase tracking-widest leading-none">{item.role}</p>
                      </div>
                    </div>
                  </div>

                  {/* QUOTE */}
                  <div className="flex-1 mb-5 md:mb-6">
                    <Quote className="text-white/30 mb-2 w-6 h-6 md:w-7 md:h-7" />
                    <h3 className="text-base md:text-lg lg:text-xl font-[900] leading-snug tracking-tight text-white italic">
                      &quot;{item.quote}&quot;
                    </h3>
                  </div>

                  {/* BOTTOM: DATA BADGE */}
                  <div className="mt-auto pt-4 border-t border-white/20 flex items-center gap-3">
                     <div className="p-1.5 md:p-2 bg-white/20 rounded-xl backdrop-blur-md text-white shrink-0">
                        {item.icon}
                     </div>
                     <div className="flex flex-col">
                        <span className="text-[7px] md:text-[8px] font-black text-white/60 uppercase tracking-widest leading-none mb-1">Impact Result</span>
                        <span className="text-[10px] md:text-xs font-black text-white uppercase tracking-tighter underline decoration-white/40 decoration-2 underline-offset-4">
                          {item.result}
                        </span>
                     </div>
                  </div>

                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsGrid;