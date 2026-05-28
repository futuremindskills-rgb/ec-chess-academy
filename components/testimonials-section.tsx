"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Quote, ThumbsUp, Star, Trophy, Target, Zap } from "lucide-react";
import { useLocale } from "next-intl";

interface Testimonial {
  nameEn: string;
  nameZh: string;
  roleEn: string;
  roleZh: string;
  quoteEn: string;
  quoteZh: string;
  resultEn: string;
  resultZh: string;
  image: string;
  bgColor: string;
  pattern: string;
  icon: React.ReactNode;
}

const testimonials: Testimonial[] = [
  {
    nameEn: "Zhuo Huan",
    nameZh: "卓桓",
    roleEn: "Young Champ",
    roleZh: "小小冠軍學員",
    quoteEn: "Developing a child's focus can be achieved by constantly paying attention to the situation on the board. This also helps in logical thinking.",
    quoteZh: "透過下棋時不斷關注棋盤上的局勢，可以有效培養孩子的專注力，這對邏輯思維的發展也有很大幫助。",
    resultEn: "1st Place, HK Open",
    resultZh: "全港公開賽冠軍",
    image: "/rev1.webp",
    bgColor: "bg-[#FF7A00]",
    pattern: "data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h20v20H0V0zm20 20h20v20H20V20z' fill='%23fff' fill-opacity='0.1' /%3E%3C/svg%3E",
    icon: <Trophy className="w-4 h-4 text-yellow-300" />
  },
  {
    nameEn: "Zhuo Qian",
    nameZh: "卓芊家長",
    roleEn: "Executive @ Central HK",
    roleZh: "中環高級行政人員",
    quoteEn: "A child's brain is in a phase of rapid growth. Each game requires thinking about the course of each move, developing vital logical skills.",
    quoteZh: "孩子的腦部正處於快速發育階段。每盤棋都需要思考每一步的走法與後果，這對鍛煉邏輯思考能力至關重要。",
    resultEn: "Elite School Admission",
    resultZh: "成功升讀名校",
    image: "/rev2.webp",
    bgColor: "bg-[#8A2BE2]",
    pattern: "data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='2' cy='2' r='1' fill='%23fff' fill-opacity='0.2' /%3E%3C/svg%3E",
    icon: <Target className="w-4 h-4 text-cyan-300" />
  },
  {
    nameEn: "Shun Keng",
    nameZh: "舜鏗",
    roleEn: "Student",
    roleZh: "棋院學員",
    quoteEn: "Developing mathematical skills is important. In Go, a game requires more than 100 moves. My calculation abilities improved significantly.",
    quoteZh: "發展數學能力非常重要。以圍棋為例，一局棋往往需要思考超過一百步，這讓我的計算能力得到了顯著提升。",
    resultEn: "Top 10 Junior",
    resultZh: "青少年組前十名",
    image: "/rev3.webp",
    bgColor: "bg-[#1e1b4b]",
    pattern: "data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l30 30-30 30-30-30z' fill='%23fff' fill-opacity='0.05' /%3E%3C/svg%3E",
    icon: <Zap className="w-4 h-4 text-orange-400" />
  },
];

const TestimonialsGrid: React.FC = () => {
  const locale = useLocale();
  const isZh = locale === "zh";

  return (
    <section className="py-16 md:py-28 bg-white overflow-hidden font-sans">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* CENTERED HEADING */}
        <div className="text-center mb-16 md:mb-24">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900 text-white text-[10px] md:text-[11px] font-black uppercase tracking-[0.2em] mb-6 shadow-xl"
          >
            <Star size={12} className="fill-current text-yellow-400" />
            {isZh ? "學員與家長心聲" : "VOICES OF SUCCESS"}
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-5xl md:text-7xl font-[1000] text-slate-900 tracking-tighter uppercase leading-[0.9]"
          >
            {isZh ? "成就" : "THE"} <span className="text-indigo-600 italic">{isZh ? "卓越實力" : "MASTERS"}</span> <br />
            <span className="text-slate-400">{isZh ? "見證成長" : "IN THEIR WORDS"}</span>
          </motion.h2>
        </div>

        {/* RESPONSIVE GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12">
          {testimonials.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative group flex flex-col h-full"
            >
              {/* THE 3D POP SHADOW */}
              <div className="absolute inset-0 bg-slate-900 rounded-[40px] translate-x-2 translate-y-2 md:translate-x-3 md:translate-y-3 transition-transform group-hover:translate-x-1 group-hover:translate-y-1" />

              {/* MAIN CARD */}
              <div className={`relative ${item.bgColor} border-2 border-slate-900 rounded-[40px] p-8 md:p-10 h-full flex flex-col overflow-hidden`}>
                
                {/* --- INTERNAL PATTERN --- */}
                <div 
                  className="absolute inset-0 pointer-events-none z-0 opacity-40" 
                  style={{ backgroundImage: `url("${item.pattern}")` }} 
                />

                <div className="relative z-10 flex flex-col h-full">
                  
                  {/* TOP: PROFILE STICKER */}
                  <div className="flex items-center gap-4 mb-8">
                    <div className="relative w-14 h-14 md:w-16 md:h-16 shrink-0">
                      <div className="absolute inset-0 rounded-full border-2 border-slate-900 transform rotate-12 bg-white" />
                      <div className="w-full h-full rounded-full overflow-hidden border-2 border-slate-900 relative z-10">
                        <Image 
                          src={item.image} 
                          alt={isZh ? item.nameZh : item.nameEn} 
                          fill 
                          className="object-cover"
                        />
                      </div>
                      <div className="absolute -top-1 -right-1 bg-white rounded-full p-1.5 border border-slate-900 z-20 shadow-lg">
                        <ThumbsUp size={10} className="text-indigo-600 fill-indigo-50" />
                      </div>
                    </div>
                    <div>
                      <h4 className="font-black uppercase tracking-tight text-lg md:text-xl italic text-white leading-none">
                        {isZh ? item.nameZh : item.nameEn}
                      </h4>
                      <div className="inline-block px-2.5 py-1 bg-black/30 backdrop-blur-md rounded-lg mt-2">
                        <p className="text-[10px] md:text-[11px] font-black text-white uppercase tracking-widest leading-none">
                          {isZh ? item.roleZh : item.roleEn}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* QUOTE */}
                  <div className="flex-1 mb-8">
                    <Quote className="text-white/40 mb-4 w-8 h-8" strokeWidth={3} />
                    <h3 className={`text-xl md:text-2xl font-[900] leading-tight tracking-tight text-white italic ${isZh ? 'not-italic font-bold' : ''}`}>
                      &quot;{isZh ? item.quoteZh : item.quoteEn}&quot;
                    </h3>
                  </div>

                  {/* BOTTOM: DATA BADGE */}
                  <div className="mt-auto pt-6 border-t border-white/20 flex items-center gap-4">
                     <div className="p-2.5 bg-white/20 rounded-2xl backdrop-blur-md text-white shrink-0 border border-white/10">
                        {item.icon}
                     </div>
                     <div className="flex flex-col">
                        <span className="text-[10px] font-black text-white/70 uppercase tracking-widest leading-none mb-1.5">
                          {isZh ? "達成目標" : "KEY ACHIEVEMENT"}
                        </span>
                        <span className="text-sm md:text-base font-black text-white uppercase tracking-tighter decoration-white/40 decoration-2 underline-offset-4">
                          {isZh ? item.resultZh : item.resultEn}
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