"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ChevronDown, 
  ShieldCheck, 
  Star, 
  Zap, 
  MessageCircle
} from "lucide-react";

const faqData = [
  {
    question: "What is the best age to start learning?",
    answer: "We recommend starting as early as 4 years old. At this stage, we focus on 'Cognitive Play' to build spatial awareness and basic logic through fun chess-themed games.",
    category: "Beginner",
    color: "bg-[#FFD700]", // YELLOW
    accent: "text-slate-900"
  },
  {
    question: "Do you provide FIDE certified coaching?",
    answer: "Yes, our lead coaches are FIDE-certified and have over 15 years of international experience. We follow official global standards for competitive training.",
    category: "Pro Training",
    color: "bg-[#8A2BE2]", // PURPLE
    accent: "text-white"
  },
  {
    question: "Do you offer online or hybrid classes?",
    answer: "Absolutely. We use advanced chess software and interactive platforms to ensure students across the region can learn from home without losing tactical quality.",
    category: "Logistics",
    color: "bg-[#4F46E5]", // INDIGO
    accent: "text-white"
  },
  {
    question: "How do you track student progress?",
    answer: "Every student receives a digital 'Mastery Report' every term, detailing their rating growth, tactical accuracy, and strategic focus areas.",
    category: "Academy",
    color: "bg-[#1a5f5f]", // ACADEMY TEAL
    accent: "text-white"
  }
];

const FAQSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  return (
    <section className="py-20 lg:py-28 bg-white relative overflow-hidden font-sans">
      
      {/* Dynamic Background Blurs */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-1/4 h-1/4 bg-yellow-50 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-purple-50 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        
        {/* HEADER SECTION */}
        <div className="text-center mb-16 lg:mb-20">
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest mb-4 shadow-lg"
          >
            <ShieldCheck size={12} className="text-yellow-400" />
            Strategic Support
          </motion.div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-[1000] text-slate-900 tracking-tighter leading-none uppercase mb-6">
            Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500">Inquiries</span>
          </h2>
          <p className="text-slate-500 font-medium max-w-xl mx-auto">
            Everything you need to know about starting your child's chess journey with Dubai's premier academy.
          </p>
        </div>

        {/* FAQ ACCORDIONS STACK */}
        <div className="space-y-5">
          {faqData.map((faq, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className={`group rounded-[35px] transition-all duration-500 relative overflow-hidden shadow-lg border-2 ${
                activeIndex === idx 
                ? `${faq.color} border-transparent` 
                : "bg-white border-slate-50 hover:border-slate-200 shadow-sm"
              }`}
            >
              {/* Decorative Star for Active State */}
              {activeIndex === idx && (
                <div className="absolute -right-4 -bottom-4 opacity-10 pointer-events-none">
                  <Star size={140} fill="currentColor" className={faq.accent} />
                </div>
              )}

              <button
                onClick={() => setActiveIndex(activeIndex === idx ? null : idx)}
                className="w-full p-7 lg:p-9 flex items-center justify-between text-left relative z-10"
              >
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <span className={`text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full w-fit ${
                    activeIndex === idx ? "bg-white/30 text-inherit" : "bg-slate-100 text-slate-400"
                  }`}>
                    {faq.category}
                  </span>
                  <h4 className={`text-lg lg:text-xl font-black tracking-tighter uppercase ${
                    activeIndex === idx ? faq.accent : "text-slate-900"
                  }`}>
                    {faq.question}
                  </h4>
                </div>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-500 shrink-0 ml-4 ${
                  activeIndex === idx ? "bg-white/20 rotate-180" : "bg-slate-50"
                }`}>
                  <ChevronDown size={20} className={activeIndex === idx ? faq.accent : "text-slate-400"} />
                </div>
              </button>

              <AnimatePresence>
                {activeIndex === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="relative z-10"
                  >
                    <div className="px-7 pb-9 lg:px-9 lg:pb-12">
                      <div className={`w-12 h-1 rounded-full mb-6 opacity-40 ${activeIndex === idx ? 'bg-white' : 'bg-indigo-600'}`} />
                      <p className={`text-sm lg:text-lg font-bold leading-relaxed max-w-3xl ${
                        activeIndex === idx ? faq.accent : "text-slate-500"
                      }`}>
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}

          {/* Support CTA Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="mt-12 p-10 bg-slate-900 rounded-[40px] flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden shadow-2xl"
          >
             <div className="absolute top-0 right-0 p-4 opacity-10">
                <Zap size={60} className="text-yellow-400" />
             </div>
             <div className="flex items-center gap-6 text-center md:text-left relative z-10">
                <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-md">
                  <MessageCircle className="text-[#f59e0b] w-7 h-7" />
                </div>
                <div className="flex flex-col">
                  <p className="text-white font-[1000] text-xl uppercase tracking-tighter">Still Unsure?</p>
                  <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Chat with our Grandmaster Support Team</p>
                </div>
             </div>
             <button className="relative z-10 px-8 py-4 bg-[#f59e0b] text-slate-900 font-black text-xs uppercase tracking-widest rounded-2xl hover:scale-105 transition-all shadow-xl shadow-[#f59e0b]/20 active:scale-95">
                Connect via WhatsApp
             </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;