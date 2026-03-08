"use client"

import React, { useState, useEffect, useCallback, useRef } from "react"
import { motion } from "framer-motion"
import { Trophy, ChevronLeft, ChevronRight, Medal, Star } from "lucide-react"

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
        "中國象棋前甲組棋手 (2280)",
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
        "中國象棋前甲組棋手 (2102)",
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
        "2019 香港圍棋協會港圍棋賽 晉段組 冠軍",
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
        "Practical techniques combined with deep philosophy"
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
        "2021 第四屆弘德圍棋讀秒賽 季軍"
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
        "中國象棋前甲組棋手 (2102)",
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
        "因材施教，幫助學生提升解難能力"
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
        "2024 HK Chess Master Tournament U18 第二名",
        "2022 HK Charity Chess Autumn Rapid Open U18 4th"
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
        "2014 全港小學中國象棋個人賽 冠軍",
        "2018 第二屆「港。象棋」盃 公開組個人冠軍"
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
        "2021 第四屆弘德圍棋讀秒賽 季軍",
        "第二十一屆香港业余围棋公开赛 1段組 第四名"
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
        "3 年以上教學經驗 / 幼兒教育經驗豐富"
      ]
    }
  ];

export default function CompactCoachSlider() {
  const [index, setIndex] = useState(0)
  const [visibleCards, setVisibleCards] = useState(1)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const updateSize = () => {
      if (window.innerWidth >= 1280) setVisibleCards(3)
      else if (window.innerWidth >= 768) setVisibleCards(2)
      else setVisibleCards(1)
    }
    updateSize()
    window.addEventListener("resize", updateSize)
    return () => window.removeEventListener("resize", updateSize)
  }, [])

  const maxIndex = Math.max(0, coaches.length - visibleCards)
  
  const next = useCallback(() => {
    setIndex((prev) => (prev >= maxIndex ? 0 : prev + 1))
  }, [maxIndex])

  const prev = useCallback(() => {
    setIndex((prev) => (prev <= 0 ? maxIndex : prev - 1))
  }, [maxIndex])

  useEffect(() => {
    const timer = setInterval(next, 6000)
    return () => clearInterval(timer)
  }, [next])

  return (
    <section className="relative w-full py-16 md:py-24 bg-[#0f172a] overflow-hidden font-sans">
      <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-orange-600 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-600 rounded-full blur-[120px]" />
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="text-center mb-10 md:mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-2 text-orange-500 mb-2"
          >
            <Trophy className="w-4 h-4 md:w-5 md:h-5" />
            <span className="font-bold uppercase tracking-[0.3em] text-[10px] md:text-xs">Elite Faculty</span>
          </motion.div>
          
          <h2 className="text-4xl md:text-7xl font-black text-white uppercase tracking-tighter leading-none mb-4">
            The <span className="text-orange-500 italic">Masters</span>
          </h2>
          <div className="w-16 md:w-24 h-1.5 bg-orange-500 mx-auto rounded-full" />
        </div>

        <div className="relative group">
          <div className="overflow-hidden px-2 py-4" ref={containerRef}>
            <motion.div 
              className="flex gap-4 md:gap-6"
              animate={{ 
                x: `calc(-${index * (100 / visibleCards)}% - ${index * (visibleCards === 1 ? 0 : (visibleCards === 2 ? 16 : 24))}px)` 
              }}
              transition={{ type: "spring", stiffness: 180, damping: 25 }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={(e, { offset }) => {
                if (offset.x < -50 && index < maxIndex) next()
                else if (offset.x > 50 && index > 0) prev()
              }}
            >
              {coaches.map((coach) => (
                <div 
                  key={coach.id} 
                  className="w-full md:w-[calc(50%-8px)] xl:w-[calc(33.333%-16px)] shrink-0"
                >
                  <div className="bg-[#1e1b4b]/50 border border-white/10 rounded-[2.5rem] overflow-hidden backdrop-blur-xl flex flex-col h-[550px] md:h-[680px] group/card hover:border-orange-500/40 transition-all duration-500 shadow-2xl">
                    
                    {/* IMAGE SECTION: Height reduced and object-top added for 'zoom out' effect */}
                    <div className="relative h-58 md:h-72 shrink-0 overflow-hidden bg-slate-900">
                      <img 
                        src={coach.image} 
                        className="w-full h-full object-cover object-top group-hover/card:scale-105 transition-all duration-700" 
                        alt={coach.nameEn} 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#1e1b4b] via-transparent to-transparent opacity-90" />
                      
                      <div className="absolute bottom-4 left-6 md:bottom-6 md:left-8">
                        <h3 className="text-xl md:text-3xl font-black text-white uppercase leading-none tracking-tight">
                          {coach.nameEn}
                        </h3>
                        <p className="text-orange-500 font-bold text-base md:text-xl mt-1">
                          {coach.nameZh}
                        </p>
                      </div>
                      
                      <div className="absolute top-4 right-4 bg-orange-500 text-white text-[9px] md:text-[11px] font-black px-3 py-1.5 rounded-lg shadow-xl border border-white/10">
                        {coach.mainRank}
                      </div>
                    </div>

                    <div className="p-6 md:p-8 flex-grow flex flex-col justify-between">
                      <div className="space-y-4 md:space-y-6">
                        <div className="flex items-center gap-2">
                           <Medal className="w-3.5 h-3.5 text-orange-500" />
                           <span className="text-orange-400 text-[10px] font-black uppercase tracking-widest">Achievements</span>
                        </div>
                        
                        <div className="max-h-[180px] md:max-h-[240px] overflow-y-auto pr-2 custom-scrollbar">
                          <ul className="space-y-3 md:space-y-4">
                            {coach.details.map((detail, i) => (
                              <li key={i} className="flex items-start gap-3 text-[12px] md:text-[14px] text-indigo-50 font-medium leading-relaxed">
                                <Star size={10} className="mt-1 shrink-0 text-orange-500 fill-orange-500" />
                                <span>{detail}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      
                      <div className="pt-5 border-t border-white/10 mt-auto">
                        <p className="text-[10px] md:text-[11px] text-indigo-300 font-black uppercase tracking-[0.2em] italic truncate">
                          {coach.title}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          <div className="flex justify-center md:block mt-8">
            <button 
                onClick={prev} 
                className="md:absolute md:-left-4 lg:-left-8 xl:-left-12 md:top-1/2 md:-translate-y-1/2 mr-4 md:mr-0 w-11 h-11 md:w-14 md:h-14 rounded-full bg-orange-500 text-white flex items-center justify-center shadow-lg border-2 border-white/20 z-40 hover:bg-orange-600 transition-all active:scale-90"
                aria-label="Previous"
            >
              <ChevronLeft className="w-6 h-6 md:w-7 md:h-7 stroke-[3px]" />
            </button>
            <button 
                onClick={next} 
                className="md:absolute md:-right-4 lg:-right-8 xl:-right-12 md:top-1/2 md:-translate-y-1/2 w-11 h-11 md:w-14 md:h-14 rounded-full bg-orange-500 text-white flex items-center justify-center shadow-lg border-2 border-white/20 z-40 hover:bg-orange-600 transition-all active:scale-90"
                aria-label="Next"
            >
              <ChevronRight className="w-6 h-6 md:w-7 md:h-7 stroke-[3px]" />
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar { width: 3px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: rgba(255,255,255,0.02); }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #f97316; border-radius: 10px; }
      `}</style>
    </section>
  )
}