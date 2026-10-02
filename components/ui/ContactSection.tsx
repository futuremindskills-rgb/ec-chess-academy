"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Smartphone, 
  Mail, 
  MapPin, 
  Send, 
  Loader2, 
  CheckCircle2, 
  ShieldCheck, 
  ChevronDown,
} from 'lucide-react';
import { useLocale } from 'next-intl';

const ContactSection: React.FC = () => {
  const locale = useLocale();
  const isZh = locale === "zh";
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const payload = {
      parentName: formData.get('parentName'),
      studentName: formData.get('studentName'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      location: formData.get('location'),
      message: formData.get('message'),
    };

    try {
      const response = await fetch('/api/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (result.success) {
        setIsSuccess(true);
      } else {
        throw new Error('Failed to send');
      }
    } catch (error) {
      alert(isZh ? "提交失敗，請直接透過 WhatsApp 聯絡我們。" : "Something went wrong. Please reach out via WhatsApp directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactMethods = [
    {
      title: isZh ? "九龍城分校支援" : "Kowloon City Support",
      value: "4614 4561",
      icon: <Smartphone className="w-5 h-5 text-slate-900" />,
      cardBg: "bg-[#FFD700]", 
      textColor: "text-slate-900",
      link: "https://form.wa.link/ecchess"
    },
    {
      title: isZh ? "元朗分校支援" : "Yuen Long Support",
      value: "5406 6800",
      icon: <Smartphone className="w-5 h-5 text-white" />,
      cardBg: "bg-[#4F46E5]", 
      textColor: "text-white",
      link: "https://form.wa.link/ecchessylc"
    }
  ];

  const branches = [
    {
      name: isZh ? "九龍城分校" : "Kowloon City Branch",
      address: isZh ? "太子道西 348-352 號 Smart-A 3/B 室" : "Smart-A Unit 3/B, 348-352 Prince Edward Road West",
      image: "/kow.jpg",
      accent: "text-amber-400"
    },
    {
      name: isZh ? "元朗分校" : "Yuen Long Branch",
      address: isZh ? "元朗壽富街元朗中心 218 室" : "Room 218, Yuen Long Centre, Sau Fu Street",
      image: "/yew.jpg",
      accent: "text-indigo-400"
    }
  ];

  return (
    <section className="relative py-16 lg:py-24 bg-white overflow-hidden font-sans" id="contact">
      
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-indigo-50 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-amber-50 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        
        {/* HEADER */}
        <div className="text-center mb-12 lg:mb-16">
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest mb-3 shadow-lg"
          >
            <ShieldCheck size={12} className="text-amber-400" />
            {isZh ? "現正招生" : "Admissions Open"}
          </motion.div>
          <h2 className="text-3xl md:text-5xl lg:text-5xl font-[1000] text-slate-900 tracking-tighter leading-none uppercase">
            {isZh ? "開啟您的" : "Start Your"} <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-amber-500">{isZh ? "棋藝之旅" : "Chess Journey"}</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN */}
          <div className="lg:col-span-4 space-y-6">
            <div className="space-y-3">
              {contactMethods.map((method, idx) => (
                <motion.a
                  key={idx}
                  href={method.link}
                  className={`${method.cardBg} block p-5 rounded-[25px] shadow-lg relative group overflow-hidden transition-all hover:-translate-y-1`}
                >
                  <div className="flex items-center gap-4 relative z-10">
                    <div className="bg-white/20 w-10 h-10 rounded-xl flex items-center justify-center backdrop-blur-sm">
                      {method.icon}
                    </div>
                    <div>
                      <h3 className={`text-[9px] font-black uppercase tracking-widest ${method.textColor} opacity-60 mb-0.5`}>
                        {method.title}
                      </h3>
                      <p className={`text-lg font-[1000] ${method.textColor}`}>
                        {method.value}
                      </p>
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>

            <div className="space-y-4 pt-2">
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-2">{isZh ? "歡迎親臨校區" : "Visit Our Centers"}</h4>
              {branches.map((branch, idx) => (
                <div key={idx} className="relative group h-44 rounded-[30px] overflow-hidden shadow-xl">
                  <img src={branch.image} alt={branch.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-6 w-full">
                    <div className={`flex items-center gap-2 ${branch.accent} mb-1`}>
                      <MapPin size={16} />
                      <span className="text-[11px] font-black uppercase tracking-widest">{branch.name}</span>
                    </div>
                    <p className="text-xs font-bold text-slate-200 leading-snug">{branch.address}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT COLUMN: FORM OR SUCCESS */}
          <div className="lg:col-span-8">
            <div className="bg-slate-50 rounded-[40px] p-6 lg:p-12 border border-slate-100 shadow-sm relative overflow-hidden">
               <AnimatePresence mode="wait">
               {isSuccess ? (
                 <motion.div 
                   key="success" 
                   initial={{ opacity: 0, scale: 0.9 }} 
                   animate={{ opacity: 1, scale: 1 }} 
                   exit={{ opacity: 0, scale: 0.9 }}
                   className="py-12 flex flex-col items-center text-center"
                 >
                    <div className="w-20 h-20 bg-emerald-500 text-white rounded-3xl flex items-center justify-center mb-6 shadow-2xl rotate-3">
                       <CheckCircle2 className="w-10 h-10" />
                    </div>
                    <h3 className="text-3xl font-[1000] text-slate-900 mb-2 uppercase tracking-tighter">{isZh ? "提交成功" : "Transmission Sent"}</h3>
                    <p className="text-slate-500 font-bold mb-8 uppercase text-xs tracking-widest">{isZh ? "我們將於 24 小時內處理並回覆您的查詢。" : "We will verify your enquiry and respond within 24 hours."}</p>
                    <button 
                      onClick={() => setIsSuccess(false)} 
                      className="text-indigo-600 font-black text-xs uppercase tracking-widest hover:underline"
                    >
                      {isZh ? "再提交一個查詢" : "Send another enquiry"}
                    </button>
                 </motion.div>
               ) : (
                 <form onSubmit={handleFormSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
                    <div className="space-y-1.5">
                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">{isZh ? "家長姓名" : "Parent Name"}</label>
                       <input name="parentName" type="text" required placeholder={isZh ? "請輸入全名" : "Enter Full Name"} className="w-full px-6 py-4 bg-white border-2 border-slate-100 rounded-[20px] focus:border-indigo-500 outline-none transition-all font-bold text-slate-900" />
                    </div>
                    <div className="space-y-1.5">
                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">{isZh ? "學生姓名" : "Student Name"}</label>
                       <input name="studentName" type="text" placeholder={isZh ? "請輸入學生姓名" : "Enter Student Name"} className="w-full px-6 py-4 bg-white border-2 border-slate-100 rounded-[20px] focus:border-indigo-500 outline-none transition-all font-bold text-slate-900" />
                    </div>
                    <div className="space-y-1.5">
                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">電郵</label>
                       <input name="email" type="email" required placeholder="example@email.com" className="w-full px-6 py-4 bg-white border-2 border-slate-100 rounded-[20px] focus:border-indigo-500 outline-none transition-all font-bold text-slate-900" />
                    </div>
                    <div className="space-y-1.5">
                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">{isZh ? "WhatsApp / 聯絡電話" : "WhatsApp / Phone"}</label>
                       <input name="phone" type="tel" required placeholder="+852" className="w-full px-6 py-4 bg-white border-2 border-slate-100 rounded-[20px] focus:border-indigo-500 outline-none transition-all font-bold text-slate-900" />
                    </div>
                    <div className="md:col-span-2 space-y-1.5">
                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">{isZh ? "意向校區" : "Preferred Location"}</label>
                       <div className="relative">
                          <select name="location" required className="w-full px-6 py-4 bg-white border-2 border-slate-100 rounded-[20px] focus:border-indigo-500 outline-none transition-all font-bold text-slate-900 appearance-none cursor-pointer">
                             <option value="Kowloon City">{isZh ? "九龍城分校" : "Kowloon City Branch"}</option>
                             <option value="Yuen Long">{isZh ? "元朗分校" : "Yuen Long Branch"}</option>
                             <option value="Online">{isZh ? "線上課程" : "Online Sessions"}</option>
                          </select>
                          <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={18} />
                       </div>
                    </div>
                    <div className="md:col-span-2 space-y-1.5">
                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">{isZh ? "查詢內容" : "Enquiry Message"}</label>
                       <textarea name="message" rows={4} required placeholder={isZh ? "可查詢試堂、時間安排或費用等..." : "Ask about trial classes, schedules, or fees..."} className="w-full px-6 py-4 bg-white border-2 border-slate-100 rounded-[25px] focus:border-indigo-500 outline-none transition-all font-bold text-slate-900 resize-none" />
                    </div>
                    <div className="md:col-span-2 pt-2">
                       <button type="submit" disabled={isSubmitting} className="w-full bg-[#4F46E5] hover:bg-slate-900 text-white font-[1000] py-5 px-10 rounded-[25px] flex items-center justify-center gap-3 transition-all active:scale-95 disabled:opacity-50 shadow-xl shadow-indigo-100 uppercase tracking-[0.2em] text-xs">
                          {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <>{isZh ? "提交查詢" : "Submit Application"} <Send size={16} /></>}
                       </button>
                    </div>
                 </form>
               )}
               </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;