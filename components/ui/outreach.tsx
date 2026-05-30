"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { 
  School, 
  Building2, 
  Trophy, 
  Target, 
  BookOpen, 
  Sparkles,
  ChevronRight,
  Handshake,
  LayoutGrid
} from 'lucide-react';
import { useLocale } from 'next-intl';

const OutreachSection = () => {
  const locale = useLocale();
  const isZh = locale === "zh";

  // CATEGORIZED SERVICES - Localized for HK
  const serviceCategories = [
    {
      titleEn: "School & Academic Programs",
      titleZh: "學校及學術項目",
      icon: <School className="w-6 h-6" />,
      itemsEn: [
        "After-School Interest Classes",
        "Inter-School & In-School Competitions",
        "School Team Training",
        "Life-wide Learning Days",
        "Chinese Culture Day Workshops",
        "Strategic Life Planning"
      ],
      itemsZh: [
        "校內課外活動 / 興趣班",
        "校際及校內棋藝比賽",
        "校隊選拔及專項訓練",
        "全方位學習日 (LWLD)",
        "中華文化日工作坊",
        "策略性生涯規劃訓練"
      ]
    },
    {
      titleEn: "Professional & Corporate",
      titleZh: "專業及企業培訓",
      icon: <Building2 className="w-6 h-6" />,
      itemsEn: [
        "Corporate Team Building",
        "Teacher Development Days",
        "Professional Tutor Training",
        "Educational Seminars",
        "Adult Strategic Chess Courses"
      ],
      itemsZh: [
        "企業團隊建設 (Team Building)",
        "教師專業發展日 (TDD)",
        "專業棋藝導師培訓",
        "教育專題講座",
        "成人策略性棋藝課程"
      ]
    },
    {
      titleEn: "Events & Community",
      titleZh: "活動及社區參與",
      icon: <Sparkles className="w-6 h-6" />,
      itemsEn: [
        "Event & Experience Days",
        "Chess Equipment & Sales",
        "Parent-Child Workshops",
        "Bespoke Collaborations"
      ],
      itemsZh: [
        "品牌活動及棋藝體驗日",
        "專業棋具供應及銷售",
        "親子棋藝工作坊",
        "度身訂造跨界合作方案"
      ]
    }
  ];

  // PARTNERSHIP DATA - Standard HK names
  const partnerGroups = [
    {
      categoryEn: "Primary Education",
      categoryZh: "小學合作夥伴",
      schools: [
        "榮光小學 (大埔)",
        "中華傳道會大同學校",
        "圓玄學院陳國超小學",
        "聖公會油塘基顯小學",
        "樂善堂楊仲明學校",
        "百卉九江書院"
      ]
    },
    {
      categoryEn: "Secondary Education",
      categoryZh: "中學合作夥伴",
      schools: [
        "天主教普照中學",
        "聖公會林護紀念中學",
        "粉嶺官立中學"
      ]
    },
    {
      categoryEn: "NGOs & Community",
      categoryZh: "非牟利機構及社群",
      schools: [
        "聖雅各福群會",
        "香港仔坊會",
        "女青年會 (何文田)",
        "貝沙灣住客會所",
        "學識教育中心"
      ]
    }
  ];

  return (
    <section className="relative py-20 md:py-32 bg-white overflow-hidden font-sans">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-40" aria-hidden="true">
        <div className="absolute top-20 right-[-10%] w-[500px] h-[500px] bg-indigo-50 rounded-full blur-[120px]" />
        <div className="absolute bottom-20 left-[-10%] w-[500px] h-[500px] bg-amber-50 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        
        {/* SECTION 1: INTRODUCTION */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-28 md:mb-40">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-600 text-white text-[10px] md:text-[11px] font-black uppercase tracking-[0.2em] mb-6 shadow-lg">
              <Handshake size={14} /> {isZh ? "外展服務" : "Outreach Services"}
            </div>
            <h2 className="text-3xl md:text-5xl font-[1000] text-slate-900 tracking-tighter uppercase leading-[0.9] mb-8">
              {isZh ? "策略思維" : "Strategic Minds"} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 italic">
                {isZh ? "走進社區" : "Beyond The Academy"}
              </span>
            </h2>
            <p className="text-base md:text-xl text-slate-600 font-medium leading-relaxed mb-10">
              {isZh 
                ? "除常規課程外，EC 卓思棋院致力將棋藝教育推廣至社會各界。我們已為學校、大學及企業夥伴舉辦超過 " 
                : "Beyond our standard curriculum, EC Chess Education is dedicated to bringing the benefits of chess to the wider community. We have organized over "}
              <span className="text-indigo-600 font-black">1,000+ {isZh ? "場專項項目" : "specialized programs"}</span>
              {isZh ? "，涵蓋不同層面的教育需求。" : " to date for schools, universities, and corporate partners."}
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 py-10 border-t border-slate-100">
               <div>
                  <h4 className="flex items-center gap-2 text-slate-900 font-black uppercase text-xs md:text-sm tracking-widest mb-3">
                    <Target className="text-indigo-600" size={18} /> {isZh ? "全人發展" : "Holistic Dev"}
                  </h4>
                  <p className="text-sm text-slate-500 font-bold leading-relaxed">
                    {isZh ? "透過邏輯訓練建立耐性、專注力及抗壓能力。" : "Building patience, focus, and resilience through strategic logic."}
                  </p>
               </div>
               <div>
                  <h4 className="flex items-center gap-2 text-slate-900 font-black uppercase text-xs md:text-sm tracking-widest mb-3">
                    <Trophy className="text-amber-500" size={18} /> {isZh ? "精英訓練" : "Elite Training"}
                  </h4>
                  <p className="text-sm text-slate-500 font-bold leading-relaxed">
                    {isZh ? "助學員以自信應對學業及生活中的各種挑戰。" : "Preparing students to navigate life’s challenges with elite confidence."}
                  </p>
               </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative h-[450px] md:h-[600px] rounded-[60px] overflow-hidden shadow-2xl"
          >
            <Image 
              src="/1.webp" 
              alt="Chess Outreach Program"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-900/40 to-transparent" />
            <div className="absolute bottom-8 left-8 right-8 p-8 bg-white/95 backdrop-blur-xl rounded-[35px] shadow-2xl border border-white/20">
               <div className="flex items-center gap-5">
                  <div className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center text-white font-black text-2xl shadow-lg">1k+</div>
                  <div>
                    <p className="text-xs font-black text-slate-900 uppercase tracking-widest">
                      {isZh ? "成功舉辦" : "Successfully Organized"}
                    </p>
                    <p className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest mt-1">
                      {isZh ? "專項外展項目" : "Specialized Outreach Projects"}
                    </p>
                  </div>
               </div>
            </div>
          </motion.div>
        </div>

        {/* SECTION 2: SERVICES GRID */}
        <div className="mb-28 md:mb-40">
          <div className="text-center mb-20">
             <h3 className="text-3xl md:text-5xl font-[1000] text-slate-900 uppercase tracking-tighter">
               {isZh ? "可提供的服務" : "Available Services"}
             </h3>
             <div className="w-24 h-1.5 bg-indigo-600 mx-auto mt-6 rounded-full" />
          </div>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-10">
            {serviceCategories.map((cat, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="bg-slate-50 p-10 md:p-12 rounded-[50px] border border-slate-100 hover:bg-white hover:shadow-2xl hover:border-transparent transition-all duration-500 group"
              >
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-indigo-600 shadow-sm mb-8 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500">
                  {cat.icon}
                </div>
                <h4 className="text-2xl font-[1000] text-slate-900 uppercase tracking-tight mb-8">
                  {isZh ? cat.titleZh : cat.titleEn}
                </h4>
                <ul className="space-y-4">
                  {(isZh ? cat.itemsZh : cat.itemsEn).map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-[13px] md:text-sm font-bold text-slate-500 leading-snug">
                      <ChevronRight size={18} className="text-indigo-400 mt-0.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          <p className="mt-14 text-center text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 max-w-3xl mx-auto leading-relaxed">
            {isZh 
              ? "*服務費用將根據地點、日期、時段及規模調整。歡迎聯絡本院外展主任，獲取度身訂造的建議方案。" 
              : "*Service fees are adjusted based on location, date, time, and scale. Contact our Outreach Officer for a customized proposal."}
          </p>
        </div>

        {/* SECTION 3: PARTNERSHIP TRACK RECORD */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-slate-900 rounded-[60px] p-10 md:p-20 overflow-hidden relative shadow-2xl"
        >
           <div className="absolute top-0 right-0 p-20 opacity-5 text-white pointer-events-none" aria-hidden="true">
              <LayoutGrid size={300} />
           </div>

           <div className="relative z-10">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
                 <div className="max-w-2xl">
                    <h3 className="text-3xl md:text-6xl font-[1000] text-white uppercase tracking-tighter mb-6">
                      {isZh ? "過往及目前" : "Past & Current"} <br />
                      <span className="text-indigo-400 italic">{isZh ? "合作夥伴" : "Partnerships"}</span>
                    </h3>
                    <p className="text-slate-400 font-bold uppercase text-[11px] tracking-[0.3em]">
                      {isZh ? "加入頂尖教育機構及社群網絡" : "Join the leading network of academic institutions"}
                    </p>
                 </div>
              </div>

              <div className="grid lg:grid-cols-3 gap-12 lg:gap-16">
                 {partnerGroups.map((group, idx) => (
                    <div key={idx}>
                       <h5 className="text-indigo-400 font-black uppercase text-xs tracking-[0.2em] mb-8 flex items-center gap-3">
                          <BookOpen size={16} /> {isZh ? group.categoryZh : group.categoryEn}
                       </h5>
                       <div className="flex flex-wrap gap-2.5">
                          {group.schools.map((school, i) => (
                             <span key={i} className="px-5 py-2.5 bg-white/5 hover:bg-indigo-600/20 border border-white/10 rounded-2xl text-[12px] md:text-[13px] font-bold text-slate-300 transition-all cursor-default">
                                {school}
                             </span>
                          ))}
                       </div>
                    </div>
                 ))}
              </div>
           </div>
        </motion.div>

      </div>
    </section>
  );
};

export default OutreachSection;