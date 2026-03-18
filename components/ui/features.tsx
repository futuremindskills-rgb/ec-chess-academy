"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Users, 
  BookOpenCheck, 
  MonitorPlay, 
  Award, 
  ClipboardCheck, 
  ShieldCheck,
  MessagesSquare,
  Star
} from "lucide-react";

const academyFeatures = [
  {
    title: "Small Class Sizes",
    description: "1:6 Coach-to-student ratio ensuring every child receives personalized tactical guidance.",
    image: "/50.jpeg",
    icon: <Users className="w-5 h-5 text-slate-900" />,
    color: "bg-[#FFD700]", // YELLOW
    textColor: "text-slate-900",
    accent: "text-slate-900/60"
  },
  {
    title: "Teaching Material",
    description: "Carefully compiled HK textbooks that systematically bridge theory with match play.",
    image: "/13.jpeg",
    icon: <BookOpenCheck className="w-5 h-5 text-white" />,
    color: "bg-[#8A2BE2]", // PURPLE
    textColor: "text-white",
    accent: "text-purple-100/60"
  },
  {
    title: "Learning Platform",
    description: "Interactive digital tools for real-time practice, game analysis, and progress tracking.",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=600&auto=format&fit=crop",
    icon: <MonitorPlay className="w-5 h-5 text-white" />,
    color: "bg-[#4F46E5]", // INDIGO
    textColor: "text-white",
    accent: "text-indigo-100/60"
  },
  {
    title: "Expert Faculty",
    description: "FIDE-certified masters and passionate educators dedicated to nurturing elite logic.",
    image: "/jim11.jpeg",
    icon: <Award className="w-5 h-5 text-white" />,
    color: "bg-[#1a5f5f]", // TEAL
    textColor: "text-white",
    accent: "text-teal-100/60"
  },
  {
    title: "Logic Assessment",
    description: "Regular performance feedback and testing to visualize growth and sharpen abilities.",
    image: "/30.jpeg",
    icon: <ClipboardCheck className="text-slate-900" />,
    color: "bg-[#FFD700]", // YELLOW
    textColor: "text-slate-900",
    accent: "text-slate-900/60"
  },
  {
    title: "Collaborative Study",
    description: "Group discussions that promote active communication and peer-to-peer problem solving.",
    image: "/49.jpeg",
    icon: <MessagesSquare className="w-5 h-5 text-white" />,
    color: "bg-[#8A2BE2]", // PURPLE
    textColor: "text-white",
    accent: "text-purple-100/60"
  }
];

export default function ECAdvantage() {
  return (
    <section className="relative py-16 md:py-24 lg:py-32 bg-white overflow-hidden font-sans">
      
      {/* Background Decor */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-yellow-50 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-purple-50 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 max-w-7xl relative z-10">
        
        {/* --- HEADER --- */}
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest mb-4 shadow-lg"
          >
            <ShieldCheck size={12} className="text-[#f59e0b]" />
            Elite Standards
          </motion.div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-[1000] text-slate-900 tracking-tighter leading-none uppercase mb-6">
            The EC Strategic <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1a5f5f] via-indigo-600 to-[#f59e0b]">Advantage</span>
          </h2>
        </div>

        {/* --- FEATURES GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {academyFeatures.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className={`${item.color} p-2 rounded-[40px] shadow-2xl relative group overflow-hidden flex flex-col h-full transition-all hover:-translate-y-2`}
            >
              {/* IMAGE INSET */}
              <div className="relative h-44 w-full rounded-[32px] overflow-hidden mb-6">
                <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
              </div>

              <div className="px-6 pb-8 flex-grow">
                {/* Icon & Decor */}
                <div className="flex items-center justify-between mb-6 relative z-10">
                   <div className="bg-white/20 backdrop-blur-md w-12 h-12 rounded-2xl flex items-center justify-center border border-white/20">
                      {item.icon}
                   </div>
                   <div className={`opacity-10 group-hover:scale-110 transition-transform`}>
                      <Star size={40} fill="currentColor" className={item.textColor} />
                   </div>
                </div>

                {/* Content */}
                <div className="relative z-10">
                   <h4 className={`text-2xl font-black uppercase tracking-tighter leading-tight ${item.textColor} mb-3`}>
                     {item.title}
                   </h4>
                   <p className={`text-xs font-bold leading-relaxed ${item.accent} group-hover:text-white transition-colors`}>
                     {item.description}
                   </p>
                </div>
              </div>

              {/* Tag Decor */}
              <div className="absolute top-6 right-8">
                 <span className={`text-[8px] font-black uppercase tracking-widest px-3 py-1 rounded-full bg-white/20 ${item.textColor} backdrop-blur-sm`}>
                    EC Elite
                 </span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}