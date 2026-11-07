"use client";

import React from "react";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  Calendar,
  Phone,
  MessageCircle,
  Home,
  BookOpen,
  Trophy,
  ArrowRight,
  ShieldCheck,
  Clock,
  Sparkles,
  MapPin,
  HeartHandshake,
} from "lucide-react";

export default function ThankYouPage() {
  const locale = useLocale();
  const isZh = locale === "zh";

  const nextSteps = [
    {
      step: "01",
      icon: <Clock className="w-6 h-6 text-indigo-600" />,
      title: isZh ? "教練審核與評估" : "Coach Review & Assessment",
      desc: isZh
        ? "我們的 FIDE 認證導師團隊會仔細審閱您提供的資料，根據學員的年齡與經驗進行程度分級。"
        : "Our FIDE-certified master trainers will review your submission to determine the ideal skill assessment.",
    },
    {
      step: "02",
      icon: <MessageCircle className="w-6 h-6 text-amber-500" />,
      title: isZh ? "專人聯絡與確認" : "Personalized Recommendation",
      desc: isZh
        ? "我們將於 24 小時內透過 WhatsApp 或電話與您聯絡，推薦合適的班期及分校（九龍城、元朗或沙田石門）。"
        : "Within 24 hours, we'll reach out via WhatsApp or phone to confirm suitable time slots and branch arrangements.",
    },
    {
      step: "03",
      icon: <HeartHandshake className="w-6 h-6 text-emerald-500" />,
      title: isZh ? "踏出棋藝第一步" : "Experience The Lesson",
      desc: isZh
        ? "親臨課堂體驗沉浸式對弈樂趣，由名師一對一觀察與指導，激發孩子的戰術思維與大局觀。"
        : "Join your trial session, experience live coaching from national masters, and spark a lifelong love for chess.",
    },
  ];

  const quickContacts = [
    {
      campus: isZh ? "九龍城分校" : "Kowloon City Branch",
      address: isZh ? "太子道西 348-352 號 Smart-A 3/B 室" : "Smart-A Unit 3/B, 348-352 Prince Edward Road West",
      phone: "+852 4614 4561",
      whatsappUrl: "https://form.wa.link/ecchess",
      bgClass: "bg-gradient-to-br from-amber-500 to-amber-600 text-slate-900",
      btnClass: "bg-slate-900 text-white hover:bg-slate-800",
    },
    {
      campus: isZh ? "元朗分校" : "Yuen Long Branch",
      address: isZh ? "壽富街元朗中心 218 室" : "Room 218, Yuen Long Centre, Sau Fu Street",
      phone: "+852 5406 6800",
      whatsappUrl: "https://form.wa.link/ecchessylc",
      bgClass: "bg-gradient-to-br from-indigo-600 to-indigo-700 text-white",
      btnClass: "bg-white text-indigo-700 hover:bg-slate-100",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans pt-24 pb-20 lg:pt-32 lg:pb-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        
        {/* --- 1. HERO CONFIRMATION CARD --- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-[36px] sm:rounded-[44px] p-8 sm:p-14 border border-slate-100 shadow-xl shadow-slate-200/50 text-center relative overflow-hidden mb-10"
        >
          {/* Subtle Decorative Background Blob */}
          <div className="absolute top-0 right-1/2 translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-50/80 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-amber-50/80 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center">
            {/* Animated Check Badge */}
            <motion.div
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.1 }}
              className="w-24 h-24 sm:w-28 sm:h-28 bg-emerald-500 text-white rounded-[32px] flex items-center justify-center shadow-xl shadow-emerald-500/30 mb-8"
            >
              <CheckCircle2 className="w-12 h-12 sm:w-14 sm:h-14 stroke-[2.5]" />
            </motion.div>

            {/* Pill */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900 text-amber-400 text-[11px] font-[1000] uppercase tracking-widest mb-4 shadow-md">
              <Sparkles size={13} className="text-amber-400" />
              {isZh ? "已成功提交查詢" : "ENQUIRY SUCCESSFULLY TRANSMITTED"}
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-[1000] text-slate-900 tracking-tighter uppercase leading-[1.05] max-w-3xl mb-5">
              {isZh ? (
                <>
                  感謝您的查詢，<br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-amber-500">
                    我們已收到您的資料！
                  </span>
                </>
              ) : (
                <>
                  THANK YOU FOR <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-amber-500">
                    REACHING OUT!
                  </span>
                </>
              )}
            </h1>

            {/* Description */}
            <p className="text-slate-600 font-semibold text-base sm:text-lg max-w-2xl leading-relaxed mb-8">
              {isZh
                ? "我們的大師教練團隊已收到您的查詢，並將於 24 小時內與您聯絡，為學員推薦最適切的試堂與課程安排。"
                : "We have received your message. Our master coaching team is already reviewing your details and will get in touch within 24 hours."}
            </p>

            {/* Quick action buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 w-full max-w-md">
              <Link
                href="/"
                className="flex-1 min-w-[140px] bg-slate-900 hover:bg-slate-800 text-white font-[1000] text-xs uppercase tracking-widest py-4 px-6 rounded-2xl flex items-center justify-center gap-2 transition-all active:scale-95 shadow-lg shadow-slate-900/10"
              >
                <Home size={15} />
                {isZh ? "返回首頁" : "Back to Home"}
              </Link>
              <Link
                href="/courses"
                className="flex-1 min-w-[140px] bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-[1000] text-xs uppercase tracking-widest py-4 px-6 rounded-2xl flex items-center justify-center gap-2 transition-all active:scale-95"
              >
                <BookOpen size={15} />
                {isZh ? "瀏覽課程" : "Explore Courses"}
              </Link>
            </div>
          </div>
        </motion.div>

        {/* --- 2. WHAT HAPPENS NEXT SECTION --- */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-[1000] text-slate-900 tracking-tight uppercase">
              {isZh ? "接下來的安排" : "What Happens Next?"}
            </h2>
            <p className="text-slate-500 font-bold text-xs uppercase tracking-widest mt-1">
              {isZh ? "簡單三步，助孩子開啟思維博弈之旅" : "Three quick steps to kickstart your journey"}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {nextSteps.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * (idx + 1) }}
                className="bg-white rounded-[30px] p-7 border border-slate-100 shadow-sm relative group hover:border-indigo-200 transition-all"
              >
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center group-hover:scale-110 transition-transform">
                    {step.icon}
                  </div>
                  <span className="text-3xl font-[1000] text-slate-200 group-hover:text-indigo-200 transition-colors">
                    {step.step}
                  </span>
                </div>
                <h3 className="text-lg font-[1000] text-slate-900 mb-2 leading-snug">
                  {step.title}
                </h3>
                <p className="text-slate-500 font-medium text-xs sm:text-sm leading-relaxed">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* --- 3. URGENT ASSISTANCE / WHATSAPP CONNECT --- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-white rounded-[36px] p-8 sm:p-10 border border-slate-100 shadow-sm"
        >
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8 pb-8 border-b border-slate-100">
            <div>
              <span className="inline-flex items-center gap-1.5 text-[11px] font-[1000] uppercase tracking-widest text-indigo-600 mb-2">
                <ShieldCheck size={14} />
                {isZh ? "急需即時回覆？" : "Need Instant Confirmation?"}
              </span>
              <h3 className="text-2xl sm:text-3xl font-[1000] text-slate-900 tracking-tight uppercase">
                {isZh ? "直接 WhatsApp 聯絡各分校" : "Connect with Our Campus Directly"}
              </h3>
              <p className="text-slate-500 font-medium text-sm mt-1 max-w-xl">
                {isZh
                  ? "若想即時鎖定熱門試堂時段，歡迎直接點擊下方按鈕以 WhatsApp 與校務處對話："
                  : "If you need immediate assistance or want to secure an urgent trial slot, click to WhatsApp our campus:"}
              </p>
            </div>
            <Link
              href="/tournaments"
              className="inline-flex items-center gap-2 self-start lg:self-center px-5 py-3 rounded-2xl bg-amber-50 hover:bg-amber-100 text-amber-800 text-xs font-[1000] uppercase tracking-widest transition-all"
            >
              <Trophy size={14} className="text-amber-600" />
              {isZh ? "瀏覽最新賽事" : "View Tournaments"}
              <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {quickContacts.map((c, idx) => (
              <div
                key={idx}
                className="bg-slate-50 rounded-[28px] p-6 border border-slate-100 flex flex-col justify-between"
              >
                <div className="mb-4">
                  <div className="flex items-center gap-2 text-indigo-600 font-[1000] text-xs uppercase tracking-wider mb-1">
                    <MapPin size={14} />
                    <span>{c.campus}</span>
                  </div>
                  <p className="text-xs text-slate-500 font-medium mb-2">{c.address}</p>
                  <p className="text-sm font-[1000] text-slate-900 flex items-center gap-2">
                    <Phone size={14} className="text-slate-400" />
                    {c.phone}
                  </p>
                </div>
                <a
                  href={c.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-[1000] text-xs uppercase tracking-widest py-3.5 px-5 rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/10 transition-all active:scale-95"
                >
                  <MessageCircle size={16} />
                  {isZh ? "立即 WhatsApp 查詢" : "WhatsApp Us Now"}
                </a>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </div>
  );
}

