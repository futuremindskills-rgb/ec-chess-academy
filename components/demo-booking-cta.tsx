"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  ArrowRight, 
  MessageCircle, 
  Sparkles,
  Zap,
  Crown
} from "lucide-react";

export default function CTASection() {
  return (
    <section className="relative py-16 bg-white overflow-hidden font-sans">
      
      <div className="container mx-auto max-w-4xl px-6 relative z-10">
        
        {/* --- COMPACT MODULE --- */}
        <div className="relative group">
          
          {/* 3D SOLID SHADOW */}
          <div className="absolute inset-0 bg-[#1e1b4b] rounded-[32px] translate-x-2 translate-y-2 transition-transform group-hover:translate-x-3 group-hover:translate-y-3" />

          {/* MAIN CARD */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative bg-[#4F46E5] rounded-[32px] border-4 border-[#1e1b4b] p-8 md:p-12 overflow-hidden"
          >
            
            {/* Subtle Chess Pattern */}
            <div className="absolute inset-0 opacity-5 pointer-events-none" 
                 style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h15v15H0V0zm15 15h15v15H15V15z' fill='%23ffffff' /%3E%3C/svg%3E")` }} />

            <div className="relative z-10 flex flex-col items-center text-center space-y-6">
              
              {/* Sticker Tags */}
              <div className="flex gap-2">
                <div className="px-3 py-1 bg-white rounded-full border-2 border-[#1e1b4b] flex items-center gap-1.5 shadow-[3px_3px_0px_#1e1b4b]">
                  <Sparkles size={12} className="text-orange-500" />
                  <span className="text-[9px] font-black uppercase tracking-widest text-[#1e1b4b]">Enrollment Open</span>
                </div>
                <div className="px-3 py-1 bg-yellow-400 rounded-full border-2 border-[#1e1b4b] flex items-center gap-1.5 shadow-[3px_3px_0px_#1e1b4b]">
                  <Crown size={12} className="text-[#1e1b4b]" />
                  <span className="text-[9px] font-black uppercase tracking-widest text-[#1e1b4b]">Master Class</span>
                </div>
              </div>

              {/* Headline */}
              <h2 className="text-3xl md:text-5xl font-[1000] text-white leading-none tracking-tighter uppercase italic">
                Ready to make <br />
                <span className="bg-white text-[#4F46E5] px-3 py-1 inline-block transform -rotate-1 mt-2 border-[3px] border-[#1e1b4b] shadow-[6px_6px_0px_#1e1b4b]">
                   YOUR MOVE?
                </span>
              </h2>

              <p className="text-white/90 text-sm md:text-lg font-bold max-w-lg">
                Unlock focus and strategic thinking. Join HK&apos;s premier Academy today.
              </p>

              {/* ACTION BUTTONS */}
              <div className="flex flex-col sm:flex-row gap-4 w-full justify-center pt-2">
                <Link href="https://wa.me/85246144561" target="_blank">
                  <button className="w-full sm:w-auto px-8 py-4 bg-white text-[#1e1b4b] rounded-xl font-[1000] uppercase tracking-widest text-xs border-[3px] border-[#1e1b4b] shadow-[5px_5px_0px_#1e1b4b] transition-all hover:translate-y-0.5 hover:shadow-none flex items-center justify-center gap-2">
                    <MessageCircle size={18} className="fill-current" />
                    Book Free Trial
                  </button>
                </Link>

                <Link href="/courses">
                  <button className="w-full sm:w-auto px-8 py-4 bg-[#1e1b4b] text-white rounded-xl font-[1000] uppercase tracking-widest text-xs border-[3px] border-white/10 transition-all hover:bg-white hover:text-[#1e1b4b] flex items-center justify-center gap-2">
                    View Courses
                    <ArrowRight size={18} />
                  </button>
                </Link>
              </div>

            </div>

            {/* DECORATIVE BREAKOUTS - Scaled Down */}
           

            {/* Corner Icon */}
            <div className="absolute bottom-4 left-4 opacity-10">
               <Zap size={60} className="text-white fill-current" />
            </div>

          </motion.div>
        </div>

        {/* CATCHY FOOTER NOTE */}
        <div className="mt-10 flex items-center justify-center gap-6 opacity-30">
            <span className="text-[9px] font-black uppercase tracking-[0.2em]">FIDE Certified</span>
            <div className="w-1 h-1 rounded-full bg-slate-900" />
            <span className="text-[9px] font-black uppercase tracking-[0.2em]">Hong Kong Representative</span>
        </div>

      </div>
    </section>
  );
}