"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Home, Zap, AlertTriangle } from "lucide-react";

export default function NotFound() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-white px-6 py-16 font-sans">
      
      <div className="w-full max-w-3xl">
        
        {/* 3D SHADOW */}
        <div className="relative group">
          <div className="absolute inset-0 bg-[#1e1b4b] rounded-[32px] translate-x-2 translate-y-2" />

          {/* MAIN CARD */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative bg-[#4F46E5] rounded-[32px] border-4 border-[#1e1b4b] p-8 md:p-12 text-center overflow-hidden"
          >
            
            {/* Subtle Pattern */}
            <div
              className="absolute inset-0 opacity-5 pointer-events-none"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h15v15H0V0zm15 15h15v15H15V15z' fill='%23ffffff' /%3E%3C/svg%3E")`,
              }}
            />

            <div className="relative z-10 flex flex-col items-center gap-6">
              
              {/* Sticker */}
              <div className="px-4 py-1 bg-white rounded-full border-2 border-[#1e1b4b] flex items-center gap-2 shadow-[3px_3px_0px_#1e1b4b]">
                <AlertTriangle size={14} className="text-red-500" />
                <span className="text-[10px] font-black uppercase tracking-widest text-[#1e1b4b]">
                  Page Not Found
                </span>
              </div>

              {/* BIG 404 */}
              <h1 className="text-6xl md:text-8xl font-black text-white tracking-tight">
                404
              </h1>

              {/* Headline */}
              <h2 className="text-2xl md:text-4xl font-black text-white uppercase italic leading-tight">
                You made a wrong move!
              </h2>

              {/* Subtext */}
              <p className="text-white/90 font-bold max-w-md text-sm md:text-lg">
                The page you’re looking for doesn’t exist or has been moved.
              </p>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mt-4">
                
                <Link
                  href="/"
                  className="px-8 py-4 bg-white text-[#1e1b4b] rounded-xl font-black uppercase tracking-widest text-xs border-[3px] border-[#1e1b4b] shadow-[5px_5px_0px_#1e1b4b] transition-all hover:translate-y-[2px] flex items-center justify-center gap-2"
                >
                  <Home size={18} />
                  Go Home
                </Link>

                <Link
                  href="/courses"
                  className="px-8 py-4 bg-[#1e1b4b] text-white rounded-xl font-black uppercase tracking-widest text-xs border-[3px] border-white/10 transition-all hover:bg-white hover:text-[#1e1b4b] flex items-center justify-center gap-2"
                >
                  Explore Courses
                  <ArrowRight size={18} />
                </Link>

              </div>
            </div>

            {/* Decorative Icon */}
            <div className="absolute bottom-4 left-4 opacity-10">
              <Zap size={60} className="text-white fill-current" />
            </div>

          </motion.div>
        </div>
      </div>
    </section>
  );
}