"use client";
import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const ProgramsSection: React.FC = () => {
  const programs = [
    {
      title: "Go / Weiqi",
      description: "Master the art of surrounding territory and spatial reasoning.",
      age: "Age 4–18",
      image: "/go.png",
      gradient: "from-blue-500 to-indigo-600",
      shadow: "shadow-blue-200/50",
      href: "/go-wieqi",
    },
    {
      title: "Intl. Chess",
      description: "Build logical thinking and resilience with global standards.",
      age: "Age 5–18",
      image: "/chess.png",
      gradient: "from-purple-600 to-indigo-700",
      shadow: "shadow-purple-200/50",
      href: "/international-chess",
    },
    {
      title: "Chinese Chess",
      description: "Explore tactics through traditional Xiangqi heritage.",
      age: "Age 5–18",
      image: "/c-chess.png",
      gradient: "from-orange-500 to-red-600",
      shadow: "shadow-orange-200/50",
      href: "/chinese-chess",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-white relative overflow-hidden">
      {/* Background Ambient Accents - Scaled for responsiveness */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none">
        <div className="absolute top-0 left-[-10%] w-64 h-64 md:w-96 md:h-96 bg-indigo-600 rounded-full blur-[80px] md:blur-[120px]" />
        <div className="absolute bottom-0 right-[-10%] w-64 h-64 md:w-96 md:h-96 bg-orange-600 rounded-full blur-[80px] md:blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header Section - Centered on all devices */}
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl md:text-5xl font-[1000] text-slate-900 mb-4 tracking-tighter uppercase leading-none"
          >
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-purple-600 to-indigo-600">Learning</span> World
          </motion.h2>
          <p className="text-slate-500 text-sm md:text-base font-medium px-4">
            Professional programs for Hong Kong&apos;s young strategists.
          </p>
        </div>

        {/* Responsive Grid: 1 col on mobile, 3 cols on tablet/desktop */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {programs.map((program, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
              className="relative group bg-slate-50 rounded-[40px] overflow-hidden flex flex-col items-center pt-10 border border-slate-100 transition-all duration-500 hover:bg-white hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)]"
            >
              {/* Image Section */}
              <div className="relative w-full h-36 md:h-32 lg:h-40 px-6 mb-6 transform group-hover:scale-110 transition-transform duration-500">
                {/* Glow effect behind illustration */}
                <div className={`absolute inset-0 m-auto w-24 h-24 rounded-full blur-3xl opacity-20 bg-gradient-to-r ${program.gradient}`} />
                
                <img 
                  src={program.image} 
                  alt={program.title}
                  className="w-full h-full object-contain relative z-10 drop-shadow-2xl"
                  onError={(e) => {
                    e.currentTarget.src = "https://via.placeholder.com/150?text=Chess";
                  }}
                />
              </div>

              {/* Text Content Area */}
              <div className="text-center px-6 pb-24 md:pb-20">
                <h3 className="text-xl lg:text-2xl font-black text-slate-900 mb-2 tracking-tight uppercase">
                  {program.title}
                </h3>
                <p className="text-slate-500 text-[13px] md:text-sm leading-relaxed mb-4 max-w-[240px] mx-auto font-medium">
                  {program.description}
                </p>
                <div className="inline-block px-4 py-1.5 rounded-full bg-white border border-slate-200 text-indigo-600 text-[10px] font-black uppercase tracking-[0.15em] shadow-sm group-hover:border-indigo-100 group-hover:text-indigo-700 transition-colors">
                  {program.age}
                </div>
              </div>

              {/* Responsive Bottom CTA Bar */}
              <Link 
                href={program.href}
                className={`absolute bottom-0 w-full bg-gradient-to-r ${program.gradient} py-5 px-8 flex items-center justify-between transition-all duration-300 group-hover:px-10 ${program.shadow}`}
              >
                <span className="font-black text-white uppercase tracking-[0.2em] text-[10px] md:text-[11px]">Enroll Course</span>
                <div className="bg-white/20 p-2 rounded-full backdrop-blur-md border border-white/20 transition-transform group-hover:rotate-[-45deg]">
                  <ArrowRight className="w-4 h-4 text-white" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Footer Support Label */}
        <div className="mt-12 flex justify-center">
          <div className="bg-slate-50 border border-slate-100 rounded-full px-6 py-2.5 text-[10px] md:text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-3">
             <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
             Customized curriculum for all skill levels
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProgramsSection;