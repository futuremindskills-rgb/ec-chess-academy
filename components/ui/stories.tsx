"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Trophy,
  ChevronLeft,
  ChevronRight,
  Quote,
  Star,
  Target,
  ShieldCheck,
  Medal,
} from "lucide-react";
import { useLocale } from "next-intl";

const successStories = [
  {
    name: "Ng Kwun Wang",
    chineseName: "吳冠宏",
    age: 14,
    location: "Yew Chung Int. School",
    locationZh: "耀中国际学校",
    duration: "Advanced Track",
    beforeRating: "Competitive",
    beforeRatingZh: "竞争组",
    afterRating: "U14 Champion",
    afterRatingZh: "U14 冠军",
    beforeResult: "Regional Participant",
    beforeResultZh: "地区赛事参赛者",
    afterResult: "DCD Charity Tournament 1st",
    afterResultZh: "DCD慈善赛冠军",
    insight:
      "Guanhong's calm judgement and steady mindset allowed him to stand out in a highly competitive open field.",
    insightZh: "冠宏凭借冷静判断与稳定心态，在高强度公开赛中脱颖而出。",
    images: ["/ng1.jpeg", "/ng2.jpeg", "/ng3.jpeg"],
    cardBg: "bg-[#F5F3FF]",
    accent: "text-purple-600",
    glow: "shadow-purple-200/70",
    pattern:
      "data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l30 30-30 30-30-30z' fill='%237c3aed' fill-opacity='0.05' /%3E%3C/svg%3E",
  },
  {
    name: "Luo Xu Nan",
    chineseName: "駱栩南",
    age: 9,
    location: "Kowloon",
    locationZh: "九龙",
    duration: "Intensive Course",
    beforeRating: "Intermediate",
    beforeRatingZh: "中级",
    afterRating: "2nd Place (Silver)",
    afterRatingZh: "第2名（银牌）",
    beforeResult: "Club Level Player",
    beforeResultZh: "俱乐部级选手",
    afterResult: "HK Inter-School Runner-up",
    afterResultZh: "香港校际赛亚军",
    insight:
      "Xu Nan's focus and stability during high-pressure matches led him through numerous rounds to a well-deserved silver medal.",
    insightZh: "栩南在高压对局中保持专注稳定，历经多轮比赛最终斩获银牌。",
    images: ["/luo1.jpeg", "/luo2.jpeg"],
    cardBg: "bg-[#FFF7ED]",
    accent: "text-orange-600",
    glow: "shadow-orange-200/70",
    pattern:
      "data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='2' cy='2' r='1' fill='%23ea580c' fill-opacity='0.07' /%3E%3C/svg%3E",
  },
  {
    name: "Wong Ping Hei",
    chineseName: "黃秉禧",
    age: 7,
    location: "Kowloon City",
    locationZh: "九龙城",
    duration: "Foundation Plus",
    beforeRating: "Novice",
    beforeRatingZh: "入门",
    afterRating: "3rd Place (Bronze)",
    afterRatingZh: "第3名（铜牌）",
    beforeResult: "Learning Fundamentals",
    beforeResultZh: "基础学习阶段",
    afterResult: "TCA Novice U7 Individual",
    afterResultZh: "TCA U7新手组个人奖",
    insight:
      "Ping Hei's disciplined attitude and consistent effort resulted in a fantastic podium finish in the U7 division.",
    insightZh: "秉禧以自律态度与持续努力，在U7组别取得优异领奖台成绩。",
    images: ["/wong1.jpeg", "/wong2.jpeg", "/wong3.jpeg"],
    cardBg: "bg-[#EEF2FF]",
    accent: "text-indigo-600",
    glow: "shadow-indigo-200/70",
    pattern:
      "data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h20v20H0V0zm20 20h20v20H20V20z' fill='%234338ca' fill-opacity='0.05' /%3E%3C/svg%3E",
  },
  {
    name: "Jim Tsz Chun",
    chineseName: "詹梓進",
    age: 12,
    location: "Hong Kong",
    locationZh: "香港",
    duration: "Elite Training",
    beforeRating: "Top Tier",
    beforeRatingZh: "高阶组",
    afterRating: "Multi-Year Medalist",
    afterRatingZh: "连续多年获奖",
    beforeResult: "Junior Competitor",
    beforeResultZh: "青少年组选手",
    afterResult: "Runner-up (2021 & 2022)",
    afterResultZh: "亚军（2021与2022）",
    insight:
      "Tsz Chun has maintained consistent excellence over several years, securing silver in both U12 and High Primary categories.",
    insightZh: "梓进多年保持稳定高水平，在U12与高小组别连续获得银牌。",
    images: [
      "/jim1.jpeg",
      "/jim2.jpeg",
      "/jim3.jpeg",
      "/jim4.jpeg",
      "/jim5.jpeg",
      "/jim6.jpeg",
      "/jim7.jpeg",
      "/jim8.jpeg",
      "/jim9.jpeg",
      "/jim10.jpeg",
      "/jim11.jpeg",
      "/jim12.jpeg",
      "/jim13.jpeg",
      "/jim14.jpeg",
      "/jim15.jpeg",
      "/jim16.jpeg",
      "/jim17.jpeg",
      "/jim18.jpeg",
      "/jim19.jpeg",
    ],
    cardBg: "bg-[#F0FDF4]",
    accent: "text-emerald-600",
    glow: "shadow-emerald-200/70",
    pattern:
      "data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='0' y='0' width='10' height='10' fill='%23059669' fill-opacity='0.04' /%3E%3C/svg%3E",
  },
];

const InnerImageSlider = ({ images }: { images: string[] }) => {
  const [imgIdx, setImgIdx] = useState(0);

  const nextImg = (e: React.MouseEvent) => {
    e.stopPropagation();
    setImgIdx((prev) => (prev + 1) % images.length);
  };

  const prevImg = (e: React.MouseEvent) => {
    e.stopPropagation();
    setImgIdx((prev) => (prev - 1 + images.length) % images.length);
  };

  useEffect(() => {
    if (images.length <= 1) return;

    const timer = setInterval(() => {
      setImgIdx((prev) => (prev + 1) % images.length);
    }, 3500);

    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <div className="relative group w-full h-full overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.img
          key={imgIdx}
          src={images[imgIdx]}
          alt="Student achievement"
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.45 }}
          className="w-full h-full object-cover"
        />
      </AnimatePresence>

      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

      {images.length > 1 && (
        <>
          <button
            onClick={prevImg}
            className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-slate-900 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-md"
          >
            <ChevronLeft size={16} />
          </button>

          <button
            onClick={nextImg}
            className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-slate-900 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-md"
          >
            <ChevronRight size={16} />
          </button>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
            {images.map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  width: i === imgIdx ? 22 : 6,
                  opacity: i === imgIdx ? 1 : 0.5,
                }}
                className={`h-1.5 rounded-full ${
                  i === imgIdx ? "bg-white" : "bg-white/60"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

const SuccessStoriesSlider: React.FC = () => {
  const locale = useLocale();
  const isZh = locale === "zh";
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const next = useCallback(() => {
    setIndex((prev) => (prev + 1) % successStories.length);
  }, []);

  const prev = () => {
    setIndex(
      (prev) => (prev - 1 + successStories.length) % successStories.length
    );
  };

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      next();
    }, 6000);

    return () => clearInterval(interval);
  }, [next, isPaused, index]);

  const current = successStories[index];

  return (
    <section className="py-16 md:py-24 bg-white overflow-hidden font-sans relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.08),transparent_35%)]" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        {/* HEADER */}
        <div className="text-center mb-10 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900 text-white text-[9px] md:text-[10px] font-black uppercase tracking-[0.25em] mb-4 md:mb-6 shadow-2xl"
          >
            <Star
              size={10}
              className="text-yellow-400 fill-current md:w-3 md:h-3"
            />
            {isZh ? "学院荣誉榜" : "Academy Hall of Fame"}
          </motion.div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-[1000] text-slate-900 tracking-[-0.06em] uppercase leading-[0.95]">
            {isZh ? "近期" : "Recent Wins"}
            <br />
            <span className="text-indigo-600 relative inline-block">
              {isZh ? "成功故事" : "Success Stories."}
              <span className="absolute left-0 bottom-1 md:bottom-2 w-full h-3 md:h-5 bg-orange-200/60 -z-10 rounded-full" />
            </span>
          </h2>
        </div>

        {/* SLIDER */}
        <div
          className="relative max-w-5xl mx-auto"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -40, scale: 0.97 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="relative"
            >
              {/* DEPTH SHADOW */}
              <div className="absolute inset-0 bg-slate-900 rounded-[36px] md:rounded-[52px] translate-x-3 translate-y-3 md:translate-x-5 md:translate-y-5 -z-10" />

              {/* MAIN CARD */}
              <div
                className={`relative ${current.cardBg} rounded-[36px] md:rounded-[52px] border-[3px] md:border-4 border-slate-900 overflow-hidden`}
              >
                {/* Pattern */}
                <div
                  className="absolute inset-0 opacity-100 pointer-events-none"
                  style={{
                    backgroundImage: `url("${current.pattern}")`,
                  }}
                />

                {/* TOP BAR */}
                <div className="flex items-center justify-between px-6 md:px-10 pt-6 md:pt-8 relative z-10">
                  <div className="flex items-center gap-2 bg-white/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-white shadow-sm">
                    <Medal size={14} className={current.accent} />
                    <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.18em] text-slate-700">
                      {isZh ? "学员风采" : "Featured Student"}
                    </span>
                  </div>

                  <div className="hidden md:flex items-center gap-2 text-slate-500">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em]">
                      {index + 1} / {successStories.length}
                    </span>
                  </div>
                </div>

                <div className="p-6 sm:p-10 md:p-14 flex flex-col lg:flex-row items-center gap-10 md:gap-14 lg:gap-16 relative z-10">
                  {/* IMAGE */}
                  <div className="relative flex-shrink-0">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 26,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="absolute -inset-5 border-[3px] border-dashed border-white/80 rounded-full opacity-60"
                    />

                    <div
                      className={`absolute inset-0 rounded-full blur-3xl opacity-30 ${current.glow}`}
                    />

                    <div className="w-52 h-52 sm:w-72 sm:h-72 md:w-[340px] md:h-[340px] rounded-full overflow-hidden border-[8px] md:border-[12px] border-white shadow-2xl relative z-10 bg-slate-200">
                      <InnerImageSlider images={current.images} />
                    </div>

                    <motion.div
                      initial={{ rotate: -15 }}
                      animate={{ rotate: 12 }}
                      transition={{
                        repeat: Infinity,
                        repeatType: "reverse",
                        duration: 3,
                      }}
                      className="absolute bottom-2 right-0 md:-bottom-2 md:-right-2 w-16 h-16 md:w-20 md:h-20 bg-yellow-400 rounded-full flex items-center justify-center border-[3px] md:border-4 border-slate-900 shadow-xl z-20"
                    >
                      <Trophy className="text-slate-900" size={28} />
                    </motion.div>

                    <p className="text-center mt-5 text-[10px] font-black uppercase text-slate-400 tracking-[0.25em]">
                      {isZh ? "滑动查看成果" : "Swipe Through Achievements"}
                    </p>
                  </div>

                  {/* CONTENT */}
                  <div className="flex-1 w-full text-center lg:text-left">
                    {/* NAME */}
                    <div className="mb-8">
                      <span
                        className={`font-black italic uppercase tracking-[0.25em] text-[10px] md:text-[11px] ${current.accent}`}
                      >
                        {isZh ? "学员成就" : "Student Achievement"}
                      </span>

                      <h3 className="mt-2 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-[1000] tracking-[-0.06em] uppercase text-slate-900 leading-none">
                        {current.name}
                      </h3>

                      <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 mt-4">
                        <div className="inline-flex px-3 py-1 rounded-xl bg-white border border-slate-200 text-slate-600 text-[10px] md:text-[11px] font-black uppercase tracking-[0.18em]">
                          {current.chineseName}
                        </div>

                        <div className="inline-flex px-3 py-1 rounded-xl bg-white/70 border border-white text-slate-500 text-[10px] md:text-[11px] font-black uppercase tracking-[0.18em]">
                          {isZh ? "年龄" : "Age"} {current.age}
                        </div>

                        <div className="inline-flex px-3 py-1 rounded-xl bg-white/70 border border-white text-slate-500 text-[10px] md:text-[11px] font-black uppercase tracking-[0.18em]">
                          {isZh ? current.locationZh : current.location}
                        </div>
                      </div>
                    </div>

                    {/* STATS */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-7">
                      {/* BEFORE */}
                      <motion.div
                        whileHover={{ y: -4 }}
                        className="p-5 md:p-6 bg-white/60 backdrop-blur-md rounded-[28px] border-2 border-white shadow-lg"
                      >
                        <div className="flex items-center justify-center lg:justify-start gap-2 mb-3">
                          <Target size={15} className="text-slate-400" />
                          <span className="text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-[0.22em]">
                            {isZh ? "过往记录" : "Previous Record"}
                          </span>
                        </div>

                        <div className="text-2xl md:text-3xl font-[1000] tracking-tight text-slate-500">
                          {isZh ? current.beforeRatingZh : current.beforeRating}
                        </div>

                        <p className="text-[11px] md:text-xs font-bold text-slate-500 mt-3 uppercase tracking-wide">
                          {isZh ? current.beforeResultZh : current.beforeResult}
                        </p>
                      </motion.div>

                      {/* AFTER */}
                      <motion.div
                        whileHover={{ y: -4 }}
                        className="p-5 md:p-6 bg-white rounded-[28px] border-2 border-slate-900 shadow-2xl"
                      >
                        <div className="flex items-center justify-center lg:justify-start gap-2 mb-3">
                          <Trophy
                            size={15}
                            className={current.accent}
                          />

                          <span
                            className={`text-[9px] md:text-[10px] font-black uppercase tracking-[0.22em] ${current.accent}`}
                          >
                            {isZh ? "赛事成绩" : "Tournament Result"}
                          </span>
                        </div>

                        <div
                          className={`text-2xl md:text-3xl font-[1000] tracking-tight ${current.accent}`}
                        >
                          {isZh ? current.afterRatingZh : current.afterRating}
                        </div>

                        <p className="text-[11px] md:text-xs font-black text-slate-900 mt-3 uppercase tracking-wide">
                          {isZh ? current.afterResultZh : current.afterResult}
                        </p>
                      </motion.div>
                    </div>

                    {/* QUOTE */}
                    <motion.div
                      whileHover={{ y: -2 }}
                      className="relative p-6 md:p-7 bg-white border-2 border-slate-900 rounded-[30px] shadow-xl overflow-hidden"
                    >
                      <Quote className="absolute top-4 right-5 text-slate-100 w-14 h-14" />

                      <div className="flex items-center gap-2 mb-3">
                        <ShieldCheck
                          className={current.accent}
                          size={16}
                        />

                        <h4 className="text-[9px] md:text-[10px] font-black uppercase text-slate-400 tracking-[0.22em]">
                          {isZh ? "导师点评" : "Instructor Remark"}
                        </h4>
                      </div>

                      <p className="relative z-10 text-slate-700 font-bold italic text-sm md:text-base leading-relaxed">
                        &quot;{isZh ? current.insightZh : current.insight}&quot;
                      </p>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* CONTROLS */}
          <div className="mt-12 md:mt-16 flex items-center justify-center gap-5">
            <button
              onClick={prev}
              className="group relative w-14 h-14 md:w-16 md:h-16 bg-white rounded-full border-2 border-slate-900 flex items-center justify-center active:translate-y-0.5 shadow-xl"
            >
              <div className="absolute inset-0 bg-slate-900 rounded-full translate-x-1.5 translate-y-1.5 -z-10 transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" />

              <ChevronLeft
                className="text-slate-900 group-hover:-translate-x-1 transition-transform"
                size={24}
              />
            </button>

            {/* INDICATORS */}
            <div className="flex items-center gap-2">
              {successStories.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  className={`transition-all duration-300 rounded-full ${
                    i === index
                      ? "w-10 h-3 bg-slate-900"
                      : "w-3 h-3 bg-slate-300 hover:bg-slate-400"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="group relative w-14 h-14 md:w-16 md:h-16 bg-white rounded-full border-2 border-slate-900 flex items-center justify-center active:translate-y-0.5 shadow-xl"
            >
              <div className="absolute inset-0 bg-slate-900 rounded-full translate-x-1.5 translate-y-1.5 -z-10 transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" />

              <ChevronRight
                className="text-slate-900 group-hover:translate-x-1 transition-transform"
                size={24}
              />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SuccessStoriesSlider;