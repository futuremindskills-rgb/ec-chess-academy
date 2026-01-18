"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ChevronDown, 
  HelpCircle, 
  Sparkles, 
  Users, 
  Award, 
  Globe, 
  LineChart,
  MessageCircle,
  Phone
} from "lucide-react";

const faqData = [
  {
    question: "What is the best age to start learning?",
    answer: "We recommend starting as early as 3-4 years old. At this stage, we focus on 'Cognitive Play' to build spatial awareness and basic logic through fun chess-themed games.",
    icon: <Users className="w-5 h-5 md:w-6 md:h-6" />,
    color: "bg-[#FFD8B1]", 
    iconBg: "bg-[#FF7A00]"
  },
  {
    question: "Do you provide FIDE certified coaching?",
    answer: "Yes, our lead coaches are FIDE-certified and have over 15 years of international coaching experience. We follow the official HK and Global standards.",
    icon: <Award className="w-5 h-5 md:w-6 md:h-6" />,
    color: "bg-[#E9D5FF]", 
    iconBg: "bg-[#8A2BE2]"
  },
  {
    question: "Do you offer online or hybrid classes?",
    answer: "Absolutely. We use advanced chess software and interactive platforms to ensure students across Hong Kong can learn from home without losing tactical quality.",
    icon: <Globe className="w-5 h-5 md:w-6 md:h-6" />,
    color: "bg-[#B2F5F5]", 
    iconBg: "bg-[#00B5AD]"
  },
  {
    question: "How do you track student progress?",
    answer: "Every student receives a digital 'Grandmaster Progress Report' every term, detailing their rating growth, tactical accuracy, and strategic focus areas.",
    icon: <LineChart className="w-5 h-5 md:w-6 md:h-6" />,
    color: "bg-[#C7D2FE]", 
    iconBg: "bg-[#4F46E5]"
  }
];

const FAQSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  return (
    <section className="py-12 md:py-20 lg:py-24 bg-white relative overflow-hidden font-sans">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* --- HEADER --- */}
        <div className="text-center mb-12 md:mb-16 lg:mb-24">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900 text-white text-[10px] font-black uppercase tracking-[0.2em] mb-4"
          >
            <HelpCircle size={14} className="text-orange-400" />
            Support Center
          </motion.div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-[1000] text-slate-900 tracking-tighter uppercase leading-[1.1] md:leading-none">
            Strategic <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-purple-600 to-indigo-600">Q&A</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          
          {/* LEFT: ANIMATION PANEL */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5 lg:sticky lg:top-32 order-2 lg:order-1"
          >
            <div className="relative group max-w-md mx-auto lg:max-w-none">
              <div className="absolute inset-0 bg-slate-900 rounded-[32px] md:rounded-[40px] translate-x-1 translate-y-1 md:translate-x-2 md:translate-y-2 -z-10" />
              
              <div className="relative aspect-square bg-white rounded-[32px] md:rounded-[40px] border-2 border-slate-900 flex items-center justify-center p-6 md:p-12 shadow-xl">
                <motion.div
                  animate={{ y: [0, -15, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  className="w-full h-full"
                >
                  <video
                    src="/faq.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-contain"
                  />
                </motion.div>

                {/* Floating Label */}
                <div className="absolute bottom-6 left-6 right-6 md:bottom-8 md:left-8 md:right-8">
                  <div className="p-3 md:p-4 bg-white/80 backdrop-blur-md border border-slate-100 rounded-xl md:rounded-2xl shadow-lg flex items-center gap-3">
                    <Sparkles size={16} className="text-orange-500 shrink-0" />
                    <p className="text-slate-900 font-black text-[9px] md:text-[10px] uppercase tracking-widest leading-tight">
                      EC Mastery Process
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* RIGHT: ACCORDIONS */}
          <div className="lg:col-span-7 space-y-4 order-1 lg:order-2">
            {faqData.map((faq, idx) => (
              <motion.div
                key={idx}
                className={`group rounded-[24px] md:rounded-[32px] border-2 transition-all duration-300 ${faq.color} ${
                    activeIndex === idx ? "border-slate-900 shadow-[4px_4px_0px_#0f172a] md:shadow-[8px_8px_0px_#0f172a]" : "border-transparent"
                }`}
              >
                <button
                  onClick={() => setActiveIndex(activeIndex === idx ? null : idx)}
                  className="w-full p-5 md:p-7 flex items-center justify-between text-left gap-4"
                >
                  <div className="flex items-center gap-4 md:gap-5">
                    <div className={`w-10 h-10 md:w-12 md:h-12 shrink-0 rounded-xl md:rounded-2xl flex items-center justify-center text-white shadow-lg transition-transform ${
                        activeIndex === idx ? "scale-110" : ""
                    } ${faq.iconBg}`}>
                      {faq.icon}
                    </div>
                    <h4 className="text-base md:text-lg lg:text-xl font-black tracking-tight text-slate-900 leading-tight">
                      {faq.question}
                    </h4>
                  </div>
                  <div className={`w-8 h-8 shrink-0 rounded-full flex items-center justify-center transition-all ${
                    activeIndex === idx ? "bg-slate-900 text-white rotate-180" : "bg-white/50 text-slate-600"
                  }`}>
                    <ChevronDown size={18} />
                  </div>
                </button>

                <AnimatePresence>
                  {activeIndex === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                    >
                      <div className="px-5 pb-5 md:px-10 lg:px-24 md:pb-8">
                        <div className="p-5 md:p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/50">
                            <p className="text-slate-700 text-sm md:text-base font-bold leading-relaxed">
                            {faq.answer}
                            </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>

        {/* --- BOTTOM CONTACT PILL --- */}
        <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 md:mt-20 max-w-3xl mx-auto p-6 md:p-8 bg-slate-900 rounded-[32px] md:rounded-[40px] relative overflow-hidden shadow-2xl"
        >
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8 text-center md:text-left">
                
                <div className="flex flex-col md:flex-row items-center gap-4 md:gap-5">
                    <div className="shrink-0 w-12 h-12 md:w-14 md:h-14 bg-orange-500 rounded-2xl flex items-center justify-center shadow-lg md:rotate-3">
                        <MessageCircle className="text-white w-6 h-6 md:w-7 md:h-7" />
                    </div>
                    <div>
                        <h3 className="text-lg md:text-2xl font-black text-white tracking-tight uppercase leading-none">
                            Still have <span className="text-orange-400">Questions?</span>
                        </h3>
                        <p className="text-slate-400 text-[9px] md:text-[10px] font-bold uppercase tracking-widest mt-2">
                            Support team is here 24/7
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-3 w-full md:w-auto">
                    <button className="flex-1 md:flex-none px-6 md:px-8 py-3.5 md:py-4 bg-orange-500 text-white font-black text-[9px] md:text-[10px] uppercase tracking-widest rounded-xl hover:bg-white hover:text-slate-900 transition-all shadow-lg active:scale-95">
                        WhatsApp Us
                    </button>
                    <button className="p-3.5 md:p-4 bg-white/10 text-white rounded-xl hover:bg-white hover:text-slate-900 transition-all border border-white/10">
                        <Phone size={18} />
                    </button>
                </div>
            </div>
        </motion.div>

      </div>
    </section>
  );
};

export default FAQSection;