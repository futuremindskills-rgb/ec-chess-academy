
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Home, AlertTriangle } from "lucide-react";

export default function NotFound() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-white px-6 py-16 font-sans">
      <div className="w-full max-w-3xl">
        <div className="relative">
          {/* Shadow Layer */}
          <div className="absolute inset-0 bg-[#1e1b4b] rounded-[32px] translate-x-2 translate-y-2" />

          {/* Main Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="relative bg-[#4F46E5] rounded-[32px] border-4 border-[#1e1b4b] p-8 md:p-12 text-center overflow-hidden"
          >
            {/* Background Pattern */}
            <div
              className="absolute inset-0 opacity-5 pointer-events-none"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h15v15H0V0zm15 15h15v15H15V15z' fill='%23ffffff'/%3E%3C/svg%3E")`,
              }}
            />

            <div className="relative z-10 flex flex-col items-center gap-6">
              {/* Badge */}
              <div className="px-4 py-1 bg-white rounded-full border-2 border-[#1e1b4b] flex items-center gap-2 shadow-[3px_3px_0px_#1e1b4b]">
                <AlertTriangle size={14} className="text-red-500" />
                <span className="text-[10px] font-black uppercase tracking-widest text-[#1e1b4b]">
                  Error 404
                </span>
              </div>

              {/* Large 404 */}
              <h1 className="text-7xl md:text-9xl font-black text-white tracking-tight">
                404
              </h1>

              {/* Heading */}
              <h2 className="text-2xl md:text-4xl font-black text-white uppercase leading-tight">
                Page Not Found
              </h2>

              {/* Description */}
              <p className="text-white/90 font-medium max-w-lg text-sm md:text-lg leading-relaxed">
                The page you are looking for could not be found. It may have
                been moved, deleted, or the link you followed may be incorrect.
              </p>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-4 mt-2">
                <Link
                  href="/"
                  className="px-8 py-4 bg-white text-[#1e1b4b] rounded-xl font-black uppercase tracking-widest text-xs border-[3px] border-[#1e1b4b] shadow-[5px_5px_0px_#1e1b4b] hover:translate-y-[2px] transition-all flex items-center justify-center gap-2"
                >
                  <Home size={18} />
                  Return Home
                </Link>

                <Link
                  href="/courses"
                  className="px-8 py-4 bg-[#1e1b4b] text-white rounded-xl font-black uppercase tracking-widest text-xs border-[3px] border-white/10 hover:bg-white hover:text-[#1e1b4b] transition-all flex items-center justify-center gap-2"
                >
                  Explore Courses
                  <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}