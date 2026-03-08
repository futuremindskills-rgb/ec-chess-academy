"use client"

import React, { useState, useEffect, useCallback, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
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

// ... (Coaches data remains exactly the same as your provided code)
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

export function CompactCoachSlider() {
  const [index, setIndex] = useState(0)
  const [visibleCards, setVisibleCards] = useState(1)
  const [gapSize, setGapSize] = useState(16)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== "undefined") {
        if (window.innerWidth >= 1024) {
          setVisibleCards(3)
          setGapSize(24)
        } else if (window.innerWidth >= 768) {
          setVisibleCards(2)
          setGapSize(20)
        } else {
          setVisibleCards(1)
          setGapSize(16)
        }
      }
    }
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const maxIndex = coaches.length - visibleCards
  const next = useCallback(() => setIndex((prev) => (prev >= maxIndex ? 0 : prev + 1)), [maxIndex])
  const prev = useCallback(() => setIndex((prev) => (prev <= 0 ? maxIndex : prev - 1)), [maxIndex])

  useEffect(() => {
    const timer = setInterval(next, 5000)
    return () => clearInterval(timer)
  }, [next])

  return (
    <section className="relative w-full py-12 md:py-24 bg-[#1e1b4b] overflow-hidden font-sans">
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
        <div className="absolute top-10 left-10 w-48 md:w-64 h-48 md:h-64 bg-orange-500 rounded-full blur-[80px] md:blur-[120px]" />
        <div className="absolute bottom-10 right-10 w-48 md:w-64 h-48 md:h-64 bg-indigo-500 rounded-full blur-[80px] md:blur-[120px]" />
      </div>

      <div className="container relative z-30 mx-auto px-4 max-w-7xl">
        <div className="text-center mb-8 md:mb-16 space-y-2 md:space-y-4">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="flex items-center justify-center gap-2 text-orange-500">
            <Trophy className="w-4 h-4 md:w-5 md:h-5" />
            <span className="font-black uppercase tracking-[0.2em] text-[8px] md:text-[10px]">Elite Faculty</span>
          </motion.div>
          <h2 className="text-3xl md:text-6xl font-[1000] text-white uppercase tracking-tighter leading-none">
            The <span className="text-orange-500 italic">Masters</span>
          </h2>
          <div className="w-12 md:w-20 h-1 bg-orange-500 mx-auto rounded-full" />
        </div>

        <div className="relative">
          <div className="overflow-hidden" ref={containerRef}>
            <motion.div 
              className="flex"
              style={{ gap: `${gapSize}px` }}
              animate={{ x: `calc(-${index * (100 / visibleCards)}% - ${index * ((visibleCards - 1) * gapSize / visibleCards)}px)` }}
              transition={{ type: "spring", stiffness: 100, damping: 24 }}
            >
              {coaches.map((coach) => (
                <div key={coach.id} className="min-w-full md:min-w-[calc(50%-10px)] lg:min-w-[calc(33.333%-16px)] shrink-0">
                  {/* COMPACT HEIGHT ON MOBILE: h-[420px] vs h-[620px] on Desktop */}
                  <div className="bg-white/5 border-2 border-white/10 rounded-[2rem] md:rounded-[2.5rem] overflow-hidden backdrop-blur-md flex flex-col h-[420px] md:h-[620px] group hover:border-orange-500/50 transition-all">
                    
                    {/* IMAGE SECTION: Shorter on mobile */}
                    <div className="relative h-44 md:h-72 shrink-0 overflow-hidden">
                      <img src={coach.image} className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700" alt={coach.nameEn} />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#1e1b4b] via-transparent to-transparent opacity-90" />
                      
                      <div className="absolute bottom-3 md:bottom-6 left-4 md:left-8">
                        <h3 className="text-lg md:text-3xl font-[1000] text-white uppercase leading-none">{coach.nameEn}</h3>
                        <p className="text-orange-500 font-black text-sm md:text-xl mt-0.5 md:mt-1">{coach.nameZh}</p>
                      </div>
                      
                      <div className="absolute top-3 md:top-6 right-3 md:right-6 bg-orange-500 text-white text-[8px] md:text-[10px] font-black px-2 md:px-4 py-1 md:py-2 rounded-lg md:rounded-xl shadow-lg">
                        {coach.mainRank}
                      </div>
                    </div>

                    {/* CONTENT SECTION: Reduced padding and font on mobile */}
                    <div className="p-4 md:p-8 flex-grow flex flex-col justify-between overflow-hidden">
                      <div className="space-y-3 md:space-y-6 overflow-hidden">
                        <div className="flex items-center gap-2">
                           <Medal className="w-4 h-4 text-orange-500" />
                           <span className="text-orange-400 text-[8px] md:text-[10px] font-black uppercase tracking-widest">Achievements</span>
                        </div>
                        
                        <div className="overflow-y-auto pr-1 custom-scrollbar h-[120px] md:h-[180px]">
                          <ul className="space-y-2 md:space-y-3">
                            {coach.details.map((detail, i) => (
                              <li key={i} className="flex items-start gap-2 text-[10px] md:text-[12px] text-indigo-100 font-bold leading-tight md:leading-relaxed">
                                <Star size={8} className="mt-1 shrink-0 text-orange-500 fill-orange-500" />
                                {detail}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      
                      <div className="pt-3 md:pt-6 border-t border-white/10 shrink-0">
                        <p className="text-[9px] md:text-[11px] text-indigo-300 font-black uppercase tracking-[0.1em] md:tracking-[0.2em] italic truncate">
                          {coach.title}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* MOBILE ADAPTIVE NAVIGATION */}
          <div className="flex justify-center gap-4 mt-8 md:mt-0">
            <button 
                onClick={prev} 
                className="md:absolute md:-left-4 lg:-left-12 md:top-1/2 md:-translate-y-1/2 w-10 h-10 md:w-14 md:h-14 rounded-full bg-orange-500 text-white flex items-center justify-center shadow-lg md:shadow-[6px_6px_0px_#000] border-2 border-white z-40 hover:scale-110 active:scale-95 transition-all"
            >
              <ChevronLeft className="w-5 h-5 md:w-7 md:h-7 stroke-[3px]" />
            </button>
            <button 
                onClick={next} 
                className="md:absolute md:-right-4 lg:-right-12 md:top-1/2 md:-translate-y-1/2 w-10 h-10 md:w-14 md:h-14 rounded-full bg-orange-500 text-white flex items-center justify-center shadow-lg md:shadow-[6px_6px_0px_#000] border-2 border-white z-40 hover:scale-110 active:scale-95 transition-all"
            >
              <ChevronRight className="w-5 h-5 md:w-7 md:h-7 stroke-[3px]" />
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar { width: 3px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #f97316; border-radius: 10px; }
      `}</style>
    </section>
  )
}