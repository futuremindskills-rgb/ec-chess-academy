"use client";
import React from "react";
import { motion } from "framer-motion";
import { 
  Zap, 
  Target, 
  Crown, 
  ShieldCheck,
  ChevronRight,
  TrendingUp,
  CheckCircle2
} from "lucide-react";
import Link from "next/link";

const CurriculumSection: React.FC = () => {
  const courses = [
    {
      level: "LEVEL 01",
      name: "Beginner",
      desc: "Laying the cognitive foundation. Perfect for young thinkers starting their journey.",
      willLearn: ["Piece Movement & Values", "Basic Checkmate Patterns", "Board Notation & Rules", "Opening Fundamentals"],
      stats: { focus: "Logic", difficulty: "25%" },
      color: "from-orange-400 to-orange-600",
      accent: "text-orange-500",
      bgAccent: "bg-orange-500",
      icon: <Zap className="w-6 h-6 md:w-7 md:h-7" />,
    },
    {
      level: "LEVEL 02",
      name: "Intermediate",
      desc: "Diving into tactical depth and coordination. Building tournament-ready skills.",
      willLearn: ["Tactical Motifs (Forks, Pins)", "Endgame Fundamentals", "Middle-Game Calculation", "Tournament Etiquette"],
      stats: { focus: "Tactics", difficulty: "65%" },
      color: "from-purple-500 to-indigo-600",
      accent: "text-purple-600",
      bgAccent: "bg-purple-600",
      icon: <Target className="w-6 h-6 md:w-7 md:h-7" />,
    },
    {
      level: "LEVEL 03",
      name: "Advanced",
      desc: "Mastery of positional nuances and psychological strategy for competitive play.",
      willLearn: ["Advanced Engine Analysis", "Pro Pawn Structures", "Dynamic Piece Sacrifices", "Opening Theory Mastery"],
      stats: { focus: "Strategy", difficulty: "95%" },
      color: "from-[#1e1b4b] to-[#0f172a]",
      accent: "text-indigo-950",
      bgAccent: "bg-indigo-950",
      icon: <Crown className="w-6 h-6 md:w-7 md:h-7" />,
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-white relative overflow-hidden">
      
      {/* Background Ambient Glow - Scaled for mobile */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none opacity-40">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 md:w-96 md:h-96 bg-indigo-50 rounded-full blur-[80px] md:blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 md:w-96 md:h-96 bg-orange-50 rounded-full blur-[80px] md:blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        
        {/* --- CENTERED HEADER --- */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-20">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 md:px-4 md:py-1.5 rounded-full bg-slate-900 text-white text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] mb-4 md:mb-6 shadow-xl"
          >
            <ShieldCheck size={14} className="text-orange-400" />
            Strategic Roadmap
          </motion.div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-[1000] text-slate-900 leading-[1.1] md:leading-[0.9] tracking-tighter uppercase">
            CHOOSE YOUR {" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-purple-600 to-indigo-950">
              CURRICULUM
            </span>
          </h2>
        </div>

        {/* --- CARDS GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {courses.map((course, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative group h-full"
            >
              <div className="relative h-full bg-slate-50 border border-slate-100 rounded-[32px] md:rounded-[48px] p-2 md:p-3 transition-all duration-500 group-hover:bg-white group-hover:shadow-[0_40px_80px_-15px_rgba(0,0,0,0.1)] group-hover:border-slate-200">
                
                {/* 1. TOP SECTION: Visual Header */}
                <div className={`relative h-32 md:h-44 w-full rounded-[24px] md:rounded-[40px] overflow-hidden bg-gradient-to-br ${course.color} flex items-center justify-center`}>
                  <div className="absolute inset-0 opacity-20" style={{ backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`, backgroundSize: '20px 20px' }} />
                  <div className="relative z-10 w-14 h-14 md:w-20 md:h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 shadow-2xl">
                    <div className="text-white transform group-hover:scale-110 transition-transform duration-500">
                      {course.icon}
                    </div>
                  </div>
                  <div className="absolute top-4 left-4 md:top-6 md:left-6 px-3 py-1 md:px-4 md:py-1.5 bg-black/20 backdrop-blur-md rounded-full border border-white/10">
                    <span className="text-[8px] md:text-[10px] font-black text-white tracking-widest">{course.level}</span>
                  </div>
                </div>

                {/* 2. BODY SECTION: Content */}
                <div className="px-4 py-6 md:px-6 md:py-8 space-y-5 md:space-y-7">
                  <div className="space-y-2 md:space-y-3">
                    <h3 className="text-xl md:text-2xl font-[1000] text-slate-900 uppercase tracking-tighter leading-none">
                      {course.name}
                    </h3>
                    <p className="text-slate-500 text-[12px] md:text-[13px] font-medium leading-relaxed">
                      {course.desc}
                    </p>
                  </div>

                  {/* BULLET POINTS - SYLLABUS */}
                  <div className="space-y-3 pt-1">
                    <p className="text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest">Course Syllabus</p>
                    <div className="space-y-2">
                      {course.willLearn.map((item, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <CheckCircle2 className={`${course.accent} opacity-80 mt-0.5 w-4 h-4 shrink-0`} />
                          <span className="text-[12px] md:text-[13px] font-bold text-slate-700 tracking-tight leading-tight">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Mini Stats Bar */}
                  <div className="bg-white p-3 md:p-4 rounded-2xl md:rounded-3xl border border-slate-100 flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="text-[8px] md:text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Focus</span>
                      <span className="text-[10px] md:text-xs font-bold text-slate-800">{course.stats.focus}</span>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="text-[8px] md:text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1 text-right">Difficulty</span>
                      <div className="flex items-center gap-2">
                        <div className="h-1 w-8 md:h-1.5 md:w-12 bg-slate-100 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            whileInView={{ width: course.stats.difficulty }}
                            viewport={{ once: true }}
                            className={`h-full ${course.bgAccent}`}
                          />
                        </div>
                        <span className="text-[9px] md:text-[10px] font-bold text-slate-600">{course.stats.difficulty}</span>
                      </div>
                    </div>
                  </div>

                  {/* Action Button */}
                  <Link 
                    href="/courses"
                    className={`flex items-center justify-between w-full p-4 md:p-5 rounded-2xl md:rounded-3xl transition-all duration-300 ${course.bgAccent} group-hover:scale-[1.02] shadow-xl shadow-current text-white`}
                  >
                    <span className="text-[10px] md:text-xs font-black uppercase tracking-widest">Enroll Level</span>
                    <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* --- FOOTER --- */}
        <div className="mt-12 md:mt-16 flex justify-center">
          <div className="px-4 py-3 md:px-6 bg-slate-50 border border-slate-100 rounded-full text-[10px] md:text-[11px] font-bold text-slate-400 flex items-center gap-2 md:gap-3 text-center sm:text-left">
            <TrendingUp size={14} className="text-indigo-600 shrink-0" />
            Continuous assessment & progress reports provided for all students
          </div>
        </div>

      </div>
    </section>
  );
};

export default CurriculumSection;