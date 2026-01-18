"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Users, 
  BookOpenCheck, 
  MessagesSquare, 
  TrendingUp, 
  ClipboardCheck, 
  Heart, 
  Award,
  ShieldCheck,
  Star
} from "lucide-react";

const academyFeatures = [
  {
    title: "Small Class Sizes",
    description: "Classes are divided by ability levels to ensure every student receives personalized guidance and appropriate tactical support.",
    icon: <Users className="w-5 h-5 md:w-6 md:h-6 text-slate-900" />,
    color: "bg-[#FFD700]", // YELLOW
    textColor: "text-slate-900"
  },
  {
    title: "Professional Materials",
    description: "Our carefully compiled HK curriculum combines theoretical knowledge with practical skills to systematically master chess strategy.",
    icon: <BookOpenCheck className="w-5 h-5 md:w-6 md:h-6 text-white" />,
    color: "bg-[#8A2BE2]", // PURPLE
    textColor: "text-white"
  },
  {
    title: "Interactive Learning",
    description: "Students engage in group discussions and live practice, promoting active communication and collaborative problem-solving.",
    icon: <MessagesSquare className="w-5 h-5 md:w-6 md:h-6 text-white" />,
    color: "bg-[#4F46E5]", // INDIGO
    textColor: "text-white"
  },
  {
    title: "Step-by-Step Path",
    description: "A structured learning roadmap that progresses from fundamental rules to advanced tournament-level skills.",
    icon: <TrendingUp className="w-5 h-5 md:w-6 md:h-6 text-white" />,
    color: "bg-[#1a5f5f]", // TEAL
    textColor: "text-white"
  },
  {
    title: "Comprehensive Assessment",
    description: "Regular tests and performance feedback help students understand their growth and continuously sharpen their chess abilities.",
    icon: <ClipboardCheck className="w-5 h-5 md:w-6 md:h-6 text-slate-900" />,
    color: "bg-[#FFD700]", // YELLOW
    textColor: "text-slate-900"
  },
  {
    title: "Passion for Learning",
    description: "We foster a deep interest in chess using diverse methods and self-developed games to keep students motivated and curious.",
    icon: <Heart className="w-5 h-5 md:w-6 md:h-6 text-white" />,
    color: "bg-[#8A2BE2]", // PURPLE
    textColor: "text-white"
  },
  {
    title: "Professional Faculty",
    description: "Our experienced and passionate coaching team provides the high-level support needed to succeed on the competitive chess journey.",
    icon: <Award className="w-5 h-5 md:w-6 md:h-6 text-white" />,
    color: "bg-[#4F46E5]", // INDIGO
    textColor: "text-white"
  }
];

export default function ECAdvantage() {
  return (
    <section className="relative py-16 md:py-24 lg:py-32 bg-white overflow-hidden font-sans">
      
      {/* Background Decor - Responsive Sizes */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-64 h-64 md:w-1/3 md:h-1/3 bg-yellow-50 rounded-full blur-[80px] md:blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-64 h-64 md:w-1/3 md:h-1/3 bg-purple-50 rounded-full blur-[80px] md:blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 max-w-7xl relative z-10">
        
        {/* --- HEADER --- */}
        <div className="text-center mb-12 md:mb-20">
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900 text-white text-[9px] md:text-[10px] font-black uppercase tracking-widest mb-4 shadow-lg"
          >
            <ShieldCheck size={12} className="text-[#f59e0b]" />
            Elite Standards
          </motion.div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-[1000] text-slate-900 tracking-tighter leading-[1.1] uppercase mb-4 md:mb-6">
            The EC Strategic <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1a5f5f] via-indigo-600 to-[#f59e0b]">Advantage</span>
          </h2>
          <p className="text-slate-500 font-bold max-w-2xl mx-auto uppercase text-[10px] md:text-xs tracking-widest px-4">
            Why Hong Kong parents choose EC Chess Academy for excellence in education.
          </p>
        </div>

        {/* --- FEATURES GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {academyFeatures.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              viewport={{ once: true }}
              className={`${item.color} p-6 md:p-8 rounded-[30px] md:rounded-[35px] shadow-lg relative group overflow-hidden flex flex-col h-full 
                ${idx === 6 ? 'md:col-span-2 lg:col-span-3 md:flex-row md:items-center md:gap-8' : ''}`}
            >
              {/* Star Background Decoration */}
              <div className="absolute -right-4 -bottom-4 opacity-10 pointer-events-none transition-transform group-hover:scale-110">
                <Star size={120} fill="currentColor" className={item.textColor} />
              </div>

              {/* Icon Container */}
              <div className="bg-white/20 backdrop-blur-md w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl flex items-center justify-center border border-white/20 mb-6 md:mb-0 shrink-0 relative z-10">
                {item.icon}
              </div>

              {/* Content Container */}
              <div className="relative z-10 md:flex-grow">
                <h4 className={`text-xl md:text-2xl font-black uppercase tracking-tighter leading-tight ${item.textColor} mb-2 md:mb-3`}>
                  {item.title}
                </h4>
                <p className={`text-xs md:text-sm font-bold leading-relaxed opacity-80 ${item.textColor} max-w-md`}>
                  {item.description}
                </p>
              </div>

              {/* Hidden Divider on Mobile for Spanning Card */}
              <div className={`${idx === 6 ? 'hidden md:block' : 'block'} mt-6 pt-6 border-t border-white/10 relative z-10`}>
                 <span className={`text-[8px] md:text-[9px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full bg-white/20 ${item.textColor}`}>
                    EC Standards
                 </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* --- BOTTOM DECOR --- */}
        <div className="mt-12 flex justify-center opacity-20">
           <div className="flex gap-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="w-2 h-2 rounded-full bg-slate-900" />
              ))}
           </div>
        </div>

      </div>
    </section>
  );
}