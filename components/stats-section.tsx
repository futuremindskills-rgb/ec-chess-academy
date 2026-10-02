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
  LineChart
} from "lucide-react";
import { useTranslations } from "next-intl";

const FAQSection: React.FC = () => {
  const t = useTranslations("home.faq");
  const [activeIndex, setActiveIndex] = useState<number | null>(0);
  const faqData = [
    {
      question: t("q1"),
      answer: t("a1"),
      icon: <Users className="w-5 h-5 md:w-6 md:h-6" />,
      color: "bg-[#FFD8B1]",
      iconBg: "bg-[#FF7A00]"
    },
    {
      question: t("q2"),
      answer: t("a2"),
      icon: <Award className="w-5 h-5 md:w-6 md:h-6" />,
      color: "bg-[#E9D5FF]",
      iconBg: "bg-[#8A2BE2]"
    },
    {
      question: t("q3"),
      answer: t("a3"),
      icon: <Globe className="w-5 h-5 md:w-6 md:h-6" />,
      color: "bg-[#B2F5F5]",
      iconBg: "bg-[#00B5AD]"
    },
    {
      question: t("q4"),
      answer: t("a4"),
      icon: <LineChart className="w-5 h-5 md:w-6 md:h-6" />,
      color: "bg-[#C7D2FE]",
      iconBg: "bg-[#4F46E5]"
    }
  ];

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
            {t("badge")}
          </motion.div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-[1000] text-slate-900 tracking-tighter uppercase leading-[1.1] md:leading-none">
            {t("titlePrefix")} <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-purple-600 to-indigo-600">{t("titleHighlight")}</span>
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
                      {t("masteryProcess")}
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
                    <h3 className="text-base md:text-lg lg:text-xl font-black tracking-tight text-slate-900 leading-tight">
                      {faq.question}
                    </h3>
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

       

      </div>
    </section>
  );
};

export default FAQSection;