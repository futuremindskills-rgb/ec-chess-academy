"use client"

import React, { useState, useEffect, useCallback } from "react"
import { motion } from "framer-motion"
import { Trophy, ChevronLeft, ChevronRight, Medal } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Coach {
  id: number
  nameEn: string
  nameZh: string
  title: string
  image: string
  mainRank: string
  details: string[]
}

const coaches: Coach[] = [
  {
    id: 1,
    nameEn: "Herman Wong",
    nameZh: "黃寶權",
    title: "Course Director / Head Coach",
    image: "/herman.jpg",
    mainRank: "Chinese Chess: 2280",
    details: [
      "卓思棋院課程總監",
      "超過十年棋藝教學經驗",
      "國際棋聯國家級訓練員 FIDE National Instructor",
      "國際棋聯國家級裁判 National Arbiter",
      "中國象棋前甲組棋手 (象棋等級分: 2280)",
      "圍棋 1 級棋士",
      "任教科：國際象棋 + 中國象棋 + 圍棋"
    ]
  },
  {
    id: 3,
    nameEn: "Gary Yuen",
    nameZh: "袁維堯",
    title: "Chess Consultant",
    image: "/gary.jpg",
    mainRank: "Chinese Chess: 2102",
    details: [
      "卓思棋院課程顧問",
      "超過十五年棋藝比賽經驗",
      "中國象棋前甲組棋手 (象棋等級分: 2102)",
      "圍棋 10 級棋士"
    ]
  },
  {
    id: 5,
    nameEn: "Ray Ng",
    nameZh: "吳浩軒",
    title: "Go (Weiqi) Coach",
    image: "/rayng.jpg",
    mainRank: "Go 5-Dan",
    details: [
      "中國圍棋協會頒授 5 段",
      "5 年以上教學經驗",
      "曾任多間小學圍棋隊教練",
      "逾 10 年棋藝比賽經驗",
      "2019 香港圍棋協會港圍棋賽 晉段組 冠軍",
      "第 18 屆香港業餘圍棋公開賽 5-9級組 第五名",
      "深圳市第十一屆“體彩杯” 圍棋聯賽 甲級組 第十名"
    ]
  },
  {
    id: 6,
    nameEn: "Alikhan Nurgazy",
    nameZh: "Russian Coach",
    title: "International Chess Master",
    image: "/alikhan.png",
    mainRank: "Expert Coach",
    details: [
      "Dedicated chess coach with years of experience",
      "Specializes in developing strategic thinking",
      "Expert in enhancing problem-solving skills",
      "Practical techniques combined with deep philosophy",
      "Passionate about inspiring student growth"
    ]
  },
  {
    id: 8,
    nameEn: "Starry Ho",
    nameZh: "何盈鏗",
    title: "Go Coach",
    image: "/starry.jpg",
    mainRank: "Go 3-Dan",
    details: [
      "3 年以上教學經驗 / 幼兒教育經驗豐富",
      "第十屆香港兒童棋院杯 冠軍",
      "弘德圍棋春季升級賽 高級組 冠軍",
      "第十一屆香港兒童棋院杯 冠軍",
      "工聯會杯全港青少年圍棋大賽 亞軍",
      "第九屆燕京杯全港校際錦標賽 季軍",
      "逾十年棋藝賽經驗"
    ]
  },
  {
    id: 9,
    nameEn: "Sam Fok",
    nameZh: "霍駿森",
    title: "Go Coach",
    image: "/sam.png",
    mainRank: "Go 4-Dan",
    details: [
      "中國圍棋協會頒授 4 段",
      "2 年以上教學經驗 / 逾十年比賽經驗",
      "2018 第一屆全院圍棋尖子爭霸戰 亞軍",
      "2021 第四屆弘德圍棋讀秒賽 季軍",
      "2020 年春季升級賽(高級組) 第四名",
      "第二十一屆香港業餘圍棋公開賽 1段組 第四名"
    ]
  },
  {
    id: 10,
    nameEn: "Kei",
    nameZh: "紀敏業",
    title: "Chess Instructor",
    image: "/kie.jpg",
    mainRank: "Chess.com: 1500",
    details: [
      "精通中國象棋及國際象棋",
      "Chess.com 水平達 1500 (高於全球 70% 棋手)",
      "3 年以上棋藝教學經驗",
      "兩位小朋友的父親，幼兒教育經驗豐富",
      "教學理念：透過棋藝培養冷靜、耐性與良好品格"
    ]
  },
  {
    id: 11,
    nameEn: "Luke Lau",
    nameZh: "劉律言",
    title: "Int. Chess Consultant",
    image: "/lau.png",
    mainRank: "Chinese Chess: 2102",
    details: [
      "卓思棋院棋藝顧問",
      "超過十五年棋藝比賽經驗",
      "中國象棋前甲組棋手 (象棋等級分: 2102)",
      "專長：國際象棋策略諮詢"
    ]
  },
  {
    id: 12,
    nameEn: "Ryan Ng",
    nameZh: "伍殷樂",
    title: "Go Coach",
    image: "/ryanng.jpg",
    mainRank: "Go 4-Dan",
    details: [
      "中國圍棋協會頒授 4 段",
      "2 年以上教學經驗",
      "超過十年棋藝比賽經驗",
      "擅長青少年圍棋實戰指導"
    ]
  },
  {
    id: 13,
    nameEn: "Bruce Yiu",
    nameZh: "姚信熙",
    title: "Three-Chess Coach",
    image: "/bruce.png",
    mainRank: "Go 1-Dan",
    details: [
      "精通中國象棋、國際象棋及圍棋",
      "3 年以上教學經驗 / 幼兒教育經驗豐富",
      "圍棋一段資歷",
      "教學理念：致力推廣國際象棋傳承"
    ]
  },
  {
    id: 14,
    nameEn: "Karen Lo",
    nameZh: "羅嘉欣",
    title: "Early Childhood Instructor",
    image: "/karen.png",
    mainRank: "Go 1-Dan",
    details: [
      "幼兒教育經驗豐富",
      "任大埔多間小學圍棋隊教練",
      "圍棋一段資歷",
      "3 年以上教學經驗",
      "精通中國象棋及國際象棋"
    ]
  },
  {
    id: 15,
    nameEn: "Chen Jue Xuan",
    nameZh: "陳珏軒",
    title: "Int. Chess Coach",
    image: "/chewng.png",
    mainRank: "Chess.com: 1500",
    details: [
      "專注國際象棋教學，擁有多年的培訓經驗",
      "擅長透過遊戲培養戰略思維",
      "因材施教，幫助學生提升解難能力",
      "教學理念：鼓勵學生對運動的熱愛，培養耐性"
    ]
  },
  {
    id: 17,
    nameEn: "JE Wong",
    nameZh: "黃浩希",
    title: "Three-Chess Coach",
    image: "/je.png",
    mainRank: "Go 1-Dan",
    details: [
      "精通中國象棋、國際象棋及圍棋",
      "3 年以上教學經驗 / 幼兒教育經驗豐富",
      "圍棋一段資歷"
    ]
  },
  {
    id: 18,
    nameEn: "Sylvia Wong",
    nameZh: "黃慶梅",
    title: "Three-Chess Coach",
    image: "/sylvia.png",
    mainRank: "Go 1-Dan",
    details: [
      "精通中國象棋、國際象棋及圍棋",
      "3 年以上教學經驗 / 幼兒教育經驗豐富",
      "圍棋一段資歷"
    ]
  },
  
  {
    id: 16,
    nameEn: "Zhang Jin Xuan",
    nameZh: "張進軒",
    title: "Int. Chess Coach",
    image: "/coaches/zhang-jin.jpg",
    mainRank: "Chess.com: 1500",
    details: [
      "自小開始學習國際象棋，參加過多場錦標賽",
      "曾獲 U18 組別 第八名",
      "曾任國際象棋助教，熟悉與小朋友相處",
      "致力推廣國際象棋冷靜、堅持的良好品格"
    ]
  },
  
  {
    id: 7,
    nameEn: "Lin Lok Sam",
    nameZh: "林洛琛",
    title: "International Chess Coach",
    image: "/coaches/lin.jpg",
    mainRank: "FIDE Rating: 1515",
    details: [
      "自10歲開始學習國際象棋",
      "熟悉比賽流程，知識理解全面",
      "2024 HK Chess Master Tournament U18 第二名",
      "2022 HK Charity Chess Autumn Rapid Open U18 4th",
      "2022 HK National Junior Chess Championship U16",
      "2024 HK SAR Junior Chess Championship U18"
    ]
  },
  
  {
    id: 4,
    nameEn: "Zhuang Youjing",
    nameZh: "莊有靖",
    title: "Chinese Chess Coach",
    image: "/coaches/zhuang.jpg",
    mainRank: "Chinese Chess: 2124",
    details: [
      "豐富棋藝大賽經驗 (等級分 2124)",
      "2013 第六屆中國香港棋院院內隊際賽 冠軍",
      "2014 全港小學中國象棋個人賽 冠軍",
      "2015-16 第四十一屆全港青年學藝比賽 冠軍",
      "2018 港澳少年象棋交流賽 冠軍",
      "2018 第二屆「港。象棋」盃 公開組個人冠軍",
      "2019 廣東省青少年象棋錦標賽 男子16歲組 第五名"
    ]
  },
  {
    id: 2,
    nameEn: "Wong An Wing",
    nameZh: "黃安榮",
    title: "Elite Group A Coach",
    image: "/coaches/an-wing.jpg",
    mainRank: "Chinese Chess: 2361",
    details: [
      "現役香港頂尖甲組棋手 (等級分 2361)",
      "2022 卓思盃全港中國象棋公開賽 冠軍",
      "2022 第一屆「好棋心」盃 冠軍",
      "2022 香港習弈棋院 百花盃 冠軍",
      "2022 香港習弈棋院 中國象棋快棋公開賽 冠軍",
      "2017 理工大學中國象棋 大專組 冠軍",
      "2018 坊聯盃象棋賽 公開組 冠軍",
      "2017 第一屆「食民營杯」U23組 冠軍",
      "2019 全港中國象棋賽 甲組 第九名"
    ]
  },
  {
    id: 19,
    nameEn: "Situ Yi",
    nameZh: "司徒翊",
    title: "Go Coach",
    image: "/coaches/situ.jpg",
    mainRank: "Go 3-Dan",
    details: [
      "2018 第一屆全院圍棋尖子爭霸戰 亞軍",
      "2020 年春季升級賽(高級組) 第四名",
      "2021 第四屆弘德圍棋讀秒賽 季軍",
      "第二十一屆香港業餘圍棋公開賽 1段組 第四名"
    ]
  },
  {
    id: 20,
    nameEn: "Chen Yan Wing",
    nameZh: "陳洐榮",
    title: "Three-Chess Coach",
    image: "/coaches/chen-yan.jpg",
    mainRank: "Go 1-Dan",
    details: [
      "圍棋一段資歷",
      "任大埔小學圍棋隊教練",
      "3 年以上教學經驗 / 幼兒教育經驗豐富",
      "精通中國象棋及國際象棋"
    ]
  }
];

export function CompactCoachSlider() {
  const [index, setIndex] = useState(0);

  const next = useCallback(() => {
    setIndex((prev) => (prev + 1) % (coaches.length - 2));
  }, []);

  const prev = useCallback(() => {
    setIndex((prev) => (prev - 1 + (coaches.length - 2)) % (coaches.length - 2));
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section className="relative w-full py-20 bg-[#1e1b4b] overflow-hidden font-sans">
      
      <div className="container relative z-30 mx-auto px-4 max-w-7xl">
        {/* CENTERED HEADER */}
        <div className="text-center mb-12 space-y-3">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="flex items-center justify-center gap-2 text-orange-500">
            <Trophy className="w-5 h-5" />
            <span className="font-black uppercase tracking-[0.3em] text-[10px]">Expert Faculty</span>
          </motion.div>
          <h2 className="text-4xl font-black text-white uppercase tracking-tighter">
            The <span className="text-orange-500 italic">Masters</span> Selection
          </h2>
        </div>

        {/* SLIDER GRID */}
        <div className="relative group">
          <div className="overflow-hidden">
            <motion.div 
              className="flex gap-6"
              animate={{ x: `calc(-${index * (100 / 3)}% - ${index * 16}px)` }}
              transition={{ type: "spring", stiffness: 200, damping: 25 }}
            >
              {coaches.map((coach) => (
                <div key={coach.id} className="min-w-full md:min-w-[calc(33.333%-16px)] shrink-0">
                  {/* Card Height slightly reduced to 600px and gap removed */}
                  <div className="bg-white/5 border border-white/10 rounded-[2.5rem] overflow-hidden backdrop-blur-sm flex flex-col h-[600px]">
                    
                    {/* LARGER IMAGE SPACE (h-72 instead of h-48) */}
                    <div className="relative h-72 shrink-0">
                      <img src={coach.image} className="w-full h-full object-cover" alt={coach.nameEn} />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#1e1b4b] via-[#1e1b4b]/20 to-transparent" />
                      
                      {/* Name Overlay moved slightly for visibility */}
                      <div className="absolute bottom-6 left-8">
                        <h3 className="text-2xl font-black text-white uppercase leading-none tracking-tight">{coach.nameEn}</h3>
                        <p className="text-orange-500 font-bold text-xl mt-1">{coach.nameZh}</p>
                      </div>
                      
                      <div className="absolute top-6 right-6 bg-orange-500 text-white text-[10px] font-black px-3 py-1.5 rounded shadow-lg">
                        {coach.mainRank}
                      </div>
                    </div>

                    {/* CONTENT AREA: justify-between removes the bottom gap */}
                    <div className="p-8 flex-grow flex flex-col justify-between min-h-0">
                      
                      <div className="flex flex-col min-h-0">
                        <p className="text-orange-400 text-[10px] font-black uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                          <Medal className="w-4 h-4" /> Qualifications & Awards
                        </p>
                        
                        {/* Custom scrollable list with all data */}
                        <div className="overflow-y-auto pr-3 custom-scrollbar">
                          <ul className="space-y-3">
                            {coach.details.map((detail, i) => (
                              <li key={i} className="flex items-start gap-3 text-[12px] text-indigo-100/90 leading-relaxed">
                                <div className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-1.5 shrink-0" />
                                {detail}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      
                      {/* FOOTER: Tightened gap to content */}
                      <div className="mt-6 pt-5 border-t border-white/10">
                        <p className="text-[11px] text-indigo-300 font-black uppercase tracking-widest">{coach.title}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Navigation Buttons */}
          <button onClick={prev} className="absolute -left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-orange-500 text-white flex items-center justify-center shadow-2xl z-40 hover:scale-110 transition-transform active:scale-95">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button onClick={next} className="absolute -right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-orange-500 text-white flex items-center justify-center shadow-2xl z-40 hover:scale-110 transition-transform active:scale-95">
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: rgba(255,255,255,0.03); }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #f97316; border-radius: 10px; }
      `}</style>
    </section>
  )
}