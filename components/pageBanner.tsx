"use client";

import React from 'react';
import Link from 'next/link';
import { Home, ChevronRight, Atom, Sparkles, Target } from 'lucide-react';

const PageBanner: React.FC = () => {
  return (
    <div className="relative w-full bg-slate-50 overflow-hidden pt-32 pb-20 lg:pt-15 lg:pb-6 font-sans">
      
      {/* --- Background Decorative Elements --- */}
      
      {/* 1. Scientific Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.03]" 
           style={{ 
             backgroundImage: 'linear-gradient(#0f172a 1px, transparent 1px), linear-gradient(to right, #0f172a 1px, transparent 1px)', 
             backgroundSize: '40px 40px' 
           }}>
      </div>

      {/* 2. Soft Scientific Blobs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-teal-100/40 rounded-full blur-[100px] opacity-60 pointer-events-none -translate-y-1/3 translate-x-1/3"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-100/40 rounded-full blur-[100px] opacity-70 pointer-events-none translate-y-1/3 -translate-x-1/4"></div>

      
      {/* Atom - Top Left */}
      <div className="absolute top-24 left-10 md:left-20 opacity-10 text-teal-600 animate-[spin_20s_linear_infinite]">
        <Atom className="w-16 h-16" strokeWidth={1.5} />
      </div>

      {/* Target - Right Side */}
      <div className="absolute top-1/3 right-10 md:right-32 opacity-10 text-indigo-500 transform rotate-12 hidden md:block">
        <Target className="w-20 h-20" />
      </div>

      {/* Sparkles - Near Text */}
      <div className="absolute bottom-20 left-1/3 text-teal-500 opacity-40 animate-bounce-slow">
        <Sparkles className="w-6 h-6" />
      </div>

      {/* --- Main Content --- */}
      <div className="container mx-auto px-6 md:px-12 relative z-10 flex flex-col items-center text-center">
        
        {/* Title */}
        <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 tracking-tight relative">
          Study <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-indigo-600">Material</span>
          {/* Decorative Underline */}
          <svg className="absolute w-32 h-3 -bottom-2 left-1/2 -translate-x-1/2 text-teal-400 opacity-50" viewBox="0 0 100 10" preserveAspectRatio="none">
             <path d="M0 5 Q 25 10 50 5 T 100 5" stroke="currentColor" strokeWidth="4" fill="none" />
          </svg>
        </h1>
        
        {/* Description / Subtext */}
        <p className="text-lg md:text-xl text-slate-600 max-w-2xl mb-8 leading-relaxed font-medium">
            Access curated study materials designed to enhance understanding and mastery of Chess concepts.
        </p>

        {/* Breadcrumb Navigation (Pill Style) */}
        <nav className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/80 backdrop-blur-sm border border-slate-200 shadow-sm">
          <Link href="/" className="text-slate-500 hover:text-teal-600 transition-colors flex items-center gap-1.5 text-sm font-semibold">
            <Home className="w-4 h-4" />
            <span>Home</span>
          </Link>
          
          <ChevronRight className="w-4 h-4 text-slate-300" strokeWidth={2.5} />
          
          <span className="text-slate-900 font-bold text-sm">
            Study Material
          </span>
        </nav>

      </div>

      {/* --- CSS Animation --- */}
      <style jsx>{`
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 4s ease-in-out infinite;
        }
      `}</style>

    </div>
  );
};

export default PageBanner;