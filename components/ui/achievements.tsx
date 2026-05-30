"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Trophy, 
  Star, 
  Crown, 
  CheckCircle2, 
  TrendingUp, 
  Zap,
  ShieldCheck,
  Medal,
  Users
} from 'lucide-react';
import { useLocale } from 'next-intl';

export default function AchievementsSection() {
  const locale = useLocale();
  const isZh = locale === "zh";
  
  const stats = [
    { label: isZh ? "FIDE 等級分提升" : "FIDE Rating Gained", value: "3000+", icon: <TrendingUp /> },
    { label: isZh ? "賽事獎項" : "Tournament Wins", value: "50+", icon: <Trophy /> },
    { label: isZh ? "在讀學員" : "Active Students", value: "500+", icon: <Users /> },
    { label: isZh ? "精英導師" : "Elite Coaches", value: "12", icon: <Crown /> },
  ];

  const milestones = [
    {
      year: '2024',
      title: isZh ? '數碼化教學' : 'Digital Mastery',
      subtitle: isZh ? 'AI 棋局分析' : 'AI Analysis',
      description: isZh
        ? '將先進分析引擎整合至課程體系，為專業級訓練提供強力支援。'
        : 'Integrated advanced engine analysis into our curriculum for pro-level training.',
      icon: <Zap className="w-5 h-5 md:w-6 md:h-6 text-white" />,
      bg: "bg-indigo-600",
    },
    {
      year: '2020',
      title: isZh ? '全港錦標賽' : 'HK Championship',
      subtitle: isZh ? '勇奪三甲佳績' : 'Podium Success',
      description: isZh
        ? '學員於全港青少年公開賽中表現卓越，多次登上頒獎台。'
        : 'Our students achieved multiple Top 3 finishes in the HK Junior Open championships.',
      icon: <Star className="w-5 h-5 md:w-6 md:h-6 text-white" />,
      bg: "bg-orange-500",
    },
    {
      year: '2015',
      title: isZh ? 'FIDE 認證中心' : 'FIDE Hub',
      subtitle: isZh ? '接軌國際標準' : 'Global Standards',
      description: isZh
        ? '正式獲認可為 FIDE 培訓中心，並擁有國際認證導師資格。'
        : 'Officially recognized as a FIDE Training Hub with international certified instructors.',
      icon: <ShieldCheck className="w-5 h-5 md:w-6 md:h-6 text-white" />,
      bg: "bg-purple-600",
    },
    {
      year: '2010',
      title: isZh ? '棋院成立' : 'The Foundation',
      subtitle: isZh ? '紮根香港' : 'HK Origins',
      description: isZh
        ? 'EC 卓思棋院於香港創立，致力培育具戰略思維的年輕一代。'
        : 'Established EC Chess in Hong Kong with a mission to develop strategic young minds.',
      icon: <Medal className="w-5 h-5 md:w-6 md:h-6 text-slate-900" />,
      bg: "bg-slate-100",
    },
  ];

  return (
    <section className="relative py-16 md:py-24 lg:py-32 bg-white font-sans overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl relative z-10">
        
        {/* --- PART 1: HEADER & STATS BAR --- */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 mb-20 md:mb-32 items-center">
          <div className="w-full lg:w-1/2 text-center lg:text-left space-y-6">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900 text-white text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] shadow-xl"
            >
              <Star size={12} className="text-orange-400 fill-orange-400" />
              <span>{isZh ? "實績見證" : "Proven Excellence"}</span>
            </motion.div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-[1000] text-slate-900 leading-[1.1] md:leading-[0.9] tracking-tighter uppercase">
              {isZh ? "將策略" : "Where Strategy"} <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-purple-600 to-indigo-600 italic">
                {isZh ? "轉化為成功" : "Becomes Success."}
              </span>
            </h2>
            <p className="text-slate-500 text-base md:text-xl font-medium leading-relaxed max-w-xl mx-auto lg:mx-0">
              {isZh ? "我們不只傳授棋藝，更致力培育冠軍。亮麗成績背後，是我們對精英訓練及學員認知成長的堅持。" : "We don't just teach moves; we produce champions. Our record reflects a commitment to elite training and long-term cognitive growth."}
            </p>
          </div>

          {/* Stats Grid */}
          <div className="w-full lg:w-1/2 grid grid-cols-2 gap-4 md:gap-6">
            {stats.map((stat, idx) => (
              <div key={idx} className="group relative">
                 <div className="absolute inset-0 bg-slate-900 rounded-[24px] md:rounded-[30px] translate-x-1 translate-y-1 md:translate-x-2 md:translate-y-2 transition-transform group-hover:translate-x-1.5 group-hover:translate-y-1.5" />
                 <div className="relative h-full bg-white border-2 border-slate-900 p-4 md:p-8 rounded-[24px] md:rounded-[30px] flex flex-col items-center text-center transition-all group-hover:-translate-y-1">
                    <div className="w-10 h-10 md:w-14 md:h-14 bg-slate-50 rounded-xl md:rounded-2xl flex items-center justify-center text-indigo-600 mb-3 md:mb-4 shadow-inner shrink-0">
                      {React.cloneElement(stat.icon as React.ReactElement, { className: "w-5 h-5 md:w-7 md:h-7", strokeWidth: 2.5 })}
                    </div>
                    <div className="text-2xl md:text-4xl font-[1000] text-slate-900 leading-none mb-1">{stat.value}</div>
                    <div className="text-[8px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</div>
                 </div>
              </div>
            ))}
          </div>
        </div>

        {/* --- PART 2: MILESTONE CARDS --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-20 md:mb-32">
          {milestones.map((item, index) => (
            <motion.div 
              key={index} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-slate-100 rounded-[32px] md:rounded-[40px] translate-x-1.5 translate-y-1.5" />
              
              <div className="h-full bg-white rounded-[32px] md:rounded-[40px] p-6 md:p-8 relative overflow-hidden border-2 border-slate-100 group-hover:border-indigo-200 transition-all shadow-sm">
                
                {/* Year Badge */}
                <div className="absolute top-5 right-5 px-2.5 py-1 bg-slate-900 rounded-lg text-white font-black text-[9px] md:text-[10px] tracking-widest z-10">
                  {item.year}
                </div>

                {/* Icon Module */}
                <div className={`w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl flex items-center justify-center mb-6 md:mb-8 shadow-lg ${item.bg} group-hover:rotate-12 transition-transform`}>
                  {item.icon}
                </div>

                <h3 className="text-lg md:text-xl font-[1000] text-slate-900 mb-1 uppercase tracking-tight">
                  {item.title}
                </h3>
                <p className="text-[9px] md:text-[10px] font-black text-indigo-500 uppercase tracking-widest mb-3 md:mb-4">
                  {item.subtitle}
                </p>
                <p className="text-slate-500 text-xs md:text-sm font-medium leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* --- PART 3: CERTIFICATIONS STRIP --- */}
        <div className="bg-[#0f172a] rounded-[32px] md:rounded-[50px] p-8 md:p-16 relative overflow-hidden shadow-2xl">
          <div className="absolute -bottom-10 -right-10 opacity-10 pointer-events-none rotate-12 hidden md:block">
            <Crown size={240} className="text-white" />
          </div>

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10">
            <div className="text-center lg:text-left">
              <h3 className="text-2xl md:text-4xl font-[1000] text-white uppercase tracking-tighter mb-2 leading-none">{isZh ? "棋院專業資歷" : "Academy Credentials"}</h3>
              <p className="text-slate-400 font-bold uppercase text-[8px] md:text-[10px] tracking-[0.3em]">{isZh ? "獲得香港及國際專業機構認可" : "Recognized by HK & International Strategic bodies"}</p>
            </div>

            <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 w-full lg:w-auto">
              {[
                isZh ? "FIDE 認證學院" : "FIDE Certified Academy",
                isZh ? "香港代表隊訓練基地" : "HK Representative Training Hub",
                isZh ? "大師級教學體系" : "Grandmaster Level Pedagogy",
              ].map((cert, i) => (
                <div key={i} className="flex items-center gap-3 bg-white/5 backdrop-blur-xl px-5 py-4 rounded-2xl md:rounded-3xl border border-white/10 hover:bg-white/10 transition-colors">
                  <CheckCircle2 className="w-5 h-5 text-orange-500 shrink-0" />
                  <span className="text-[10px] md:text-xs font-black text-white uppercase tracking-widest">{cert}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}