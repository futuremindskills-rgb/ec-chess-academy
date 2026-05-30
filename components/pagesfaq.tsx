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
import { useLocale } from "next-intl";

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
  const locale = useLocale();
  const isZh = locale === "zh";

  const localizedFaq = isZh
    ? [
        { 
          ...faqData[0], 
          question: "小朋友幾多歲開始學習最好？", 
          answer: "我們建議由 4 歲起開始學習。在此階段，我們專注於「認知遊戲」，透過有趣的棋藝主題遊戲建立空間感及基礎邏輯。", 
          category: "入門階段" 
        },
        { 
          ...faqData[1], 
          question: "本院有提供 FIDE 專業認證教練嗎？", 
          answer: "有。我們的主教練團隊具備 FIDE 國際棋聯認證，並擁有超過 15 年國際教學經驗，嚴格遵循國際競賽標準。", 
          category: "專業訓練" 
        },
        { 
          ...faqData[2], 
          question: "你們有提供網上或混合模式課程嗎？", 
          answer: "絕對有。我們使用先進的棋類軟件及互動平台，確保學員在家中亦能獲得高質素的戰術訓練。", 
          category: "課程安排" 
        },
        { 
          ...faqData[3], 
          question: "如何追蹤學員的學習進度？", 
          answer: "每位學員每學期均會收到一份數碼化「成長報告」，詳細記錄其等級分變動、戰術準確度及重點策略分析。", 
          category: "學院體系" 
        }
      ]
    : faqData;

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
            {isZh ? "專業支援" : "Strategic Support"}
          </motion.div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-[1000] text-slate-900 tracking-tighter leading-none uppercase mb-6">
            {isZh ? "常見" : "Frequently Asked"} <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500">{isZh ? "問題" : "Inquiries"}</span>
          </h2>
          <p className="text-slate-500 font-medium max-w-xl mx-auto">
            {isZh 
              ? "了解開啟孩子棋藝學習之旅所需的一切資訊。" 
              : "Everything you need to know about starting your child's chess journey with Hong Kong's premier academy."}
          </p>
        </div>

        {/* FAQ ACCORDIONS STACK */}
        <div className="space-y-5">
          {localizedFaq.map((faq, idx) => (
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
        </div>
      </div>
    </section>
  );
};

export default FAQSection;