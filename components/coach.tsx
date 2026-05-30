"use client";
import React, { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Trophy, ChevronLeft, ChevronRight, Medal, Star, User } from "lucide-react";
import { useLocale } from "next-intl";

interface Coach {
  id: number;
  nameEn: string;
  nameZh: string;
  titleEn: string;
  titleZh: string;
  image: string;
  mainRankEn: string;
  mainRankZh: string;
  detailsEn: string[];
  detailsZh: string[];
}

const coaches: Coach[] = [
  {
    id: 1,
    nameEn: "Herman Wong",
    nameZh: "黃寶權",
    titleEn: "Course Director / Head Coach",
    titleZh: "課程總監 / 主教練",
    image: "/herman.jpg",
    mainRankEn: "Chinese Chess: 2280",
    mainRankZh: "中國象棋等級分: 2280",
    detailsZh: [
      "EC 卓思棋院課程總監",
      "超過十年棋藝教學經驗",
      "國際棋聯國家級訓練員 (FIDE NI)",
      "國際棋聯國家級裁判 (NA)",
      "中國象棋前甲組棋手 (等級分 2280)",
      "圍棋 1 級棋士",
      "任教科目：國際象棋、中國象棋、圍棋"
    ],
    detailsEn: [
      "Course Director of Masters Academy",
      "10+ years of chess teaching experience",
      "FIDE National Instructor (NI)",
      "National Arbiter (NA)",
      "Former Div. A Chinese Chess Player (2280)",
      "Go (Weiqi) 1-Kyu",
      "Subjects: Int. Chess, Chinese Chess, Go"
    ]
  },
  {
    id: 3,
    nameEn: "Gary Yuen",
    nameZh: "袁維堯",
    titleEn: "Chess Consultant",
    titleZh: "棋藝顧問",
    image: "/gary.jpg",
    mainRankEn: "Chinese Chess: 2102",
    mainRankZh: "中國象棋等級分: 2102",
    detailsZh: [
      "EC 卓思棋院課程顧問",
      "超過十五年棋藝比賽經驗",
      "中國象棋前甲組棋手 (等級分 2102)",
      "圍棋 10 級棋士"
    ],
    detailsEn: [
      "Academy Course Consultant",
      "15+ years of competitive experience",
      "Former Div. A Chinese Chess Player (2102)",
      "Go (Weiqi) 10-Kyu"
    ]
  },
  {
    id: 5,
    nameEn: "Ray Ng",
    nameZh: "吳浩軒",
    titleEn: "Go (Weiqi) Coach",
    titleZh: "圍棋教練",
    image: "/rayng.jpg",
    mainRankEn: "Go 5-Dan",
    mainRankZh: "圍棋 5 段",
    detailsZh: [
      "中國圍棋協會頒授 5 段資歷",
      "5 年以上教學經驗",
      "2019 香港圍棋協會晉段組 冠軍",
      "深圳市第 11 屆「體彩杯」甲級組 第 10 名"
    ],
    detailsEn: [
      "CWA Certified 5-Dan Master",
      "5+ years of teaching experience",
      "2019 HK Go Association Promotion Champion",
      "10th Place, Shenzhen 11th 'Sports Lottery Cup'"
    ]
  },
  {
    id: 6,
    nameEn: "Alikhan Nurgazy",
    nameZh: "阿利汗",
    titleEn: "International Chess Master",
    titleZh: "國際象棋大師",
    image: "/alikhan.png",
    mainRankEn: "Expert Coach",
    mainRankZh: "專家級教練",
    detailsZh: [
      "擁有多年豐富經驗的專業國際象棋教練",
      "專注於開發學生策略思維及全局觀",
      "提升解難能力與邏輯分析能力",
      "實戰技巧與深度理論相結合"
    ],
    detailsEn: [
      "Professional coach with years of experience",
      "Specializes in developing strategic thinking",
      "Expert in enhancing problem-solving skills",
      "Combines practical techniques with philosophy"
    ]
  },
  {
    id: 8,
    nameEn: "Starry Ho",
    nameZh: "何盈鏗",
    titleEn: "Go Coach",
    titleZh: "圍棋教練",
    image: "/starry.jpg",
    mainRankEn: "Go 3-Dan",
    mainRankZh: "圍棋 3 段",
    detailsZh: [
      "3 年以上教學及幼兒教育經驗",
      "第十屆香港兒童棋院盃 冠軍",
      "弘德圍棋春季升級賽 高級組 冠軍",
      "累積逾十年棋藝賽事經驗"
    ],
    detailsEn: [
      "3+ years experience in Early Childhood Education",
      "10th HK Children's Chess Academy Cup Champion",
      "Hung Tak Go Spring Tournament Champion",
      "10+ years of tournament experience"
    ]
  },
  {
    id: 9,
    nameEn: "Sam Fok",
    nameZh: "霍駿森",
    titleEn: "Go Coach",
    titleZh: "圍棋教練",
    image: "/sam.png",
    mainRankEn: "Go 4-Dan",
    mainRankZh: "圍棋 4 段",
    detailsZh: [
      "中國圍棋協會頒授 4 段資歷",
      "2 年以上教學經驗 / 逾十年比賽經驗",
      "2018 第一屆全院圍棋尖子爭霸戰 亞軍",
      "2021 第四屆弘德圍棋讀秒賽 季軍"
    ],
    detailsEn: [
      "CWA Certified 4-Dan Master",
      "2+ years teaching / 10+ years competitive exp.",
      "2018 1st Academy Go Elite Tournament Runner-up",
      "2021 4th Hung Tak Go Rapid Match 2nd Runner-up"
    ]
  },
  {
    id: 10,
    nameEn: "Kei",
    nameZh: "紀敏業",
    titleEn: "Chess Instructor",
    titleZh: "棋藝導師",
    image: "/kie.jpg",
    mainRankEn: "Chess.com: 1500",
    mainRankZh: "國際象棋等級分: 1500",
    detailsZh: [
      "精通中國象棋及國際象棋",
      "Chess.com 水平達 1500 (全球前 30%)",
      "3 年以上棋藝教學經驗",
      "教學理念：培養冷靜、耐性與良好品格"
    ],
    detailsEn: [
      "Expert in Chinese and International Chess",
      "Chess.com 1500 (Top 30% Global)",
      "3+ years of teaching experience",
      "Focus: Patience, calm, and character building"
    ]
  },
  {
    id: 11,
    nameEn: "Luke Lau",
    nameZh: "劉律言",
    titleEn: "Int. Chess Consultant",
    titleZh: "國際象棋顧問",
    image: "/lau.png",
    mainRankEn: "Chinese Chess: 2102",
    mainRankZh: "中國象棋等級分: 2102",
    detailsZh: [
      "EC 卓思棋院棋藝顧問",
      "超過十五年棋藝比賽經驗",
      "中國象棋前甲組棋手 (等級分 2102)",
      "專長：國際象棋策略諮詢及指導"
    ],
    detailsEn: [
      "Academy Chess Strategy Consultant",
      "15+ years of tournament experience",
      "Former Div. A Chinese Chess Player (2102)",
      "Specialty: Strategic consultation"
    ]
  },
  {
    id: 12,
    nameEn: "Ryan Ng",
    nameZh: "伍殷樂",
    titleEn: "Go Coach",
    titleZh: "圍棋教練",
    image: "/ryanng.jpg",
    mainRankEn: "Go 4-Dan",
    mainRankZh: "圍棋 4 段",
    detailsZh: [
      "中國圍棋協會頒授 4 段資歷",
      "2 年以上教學經驗",
      "累積超過十年棋藝比賽經驗",
      "擅長青少年圍棋實戰技術指導"
    ],
    detailsEn: [
      "CWA Certified 4-Dan Master",
      "2+ years of teaching experience",
      "10+ years of tournament experience",
      "Expert in youth tactical training"
    ]
  },
  {
    id: 13,
    nameEn: "Bruce Yiu",
    nameZh: "姚信熙",
    titleEn: "Three-Chess Coach",
    titleZh: "三棋教練",
    image: "/bruce.png",
    mainRankEn: "Go 1-Dan",
    mainRankZh: "圍棋 1 段",
    detailsZh: [
      "精通中國象棋、國際象棋及圍棋",
      "3 年以上教學及幼兒教育經驗",
      "圍棋一段專業資歷",
      "教學理念：致力推廣及傳承國際象棋文化"
    ],
    detailsEn: [
      "Proficient in Chinese Chess, Int. Chess & Go",
      "3+ years teaching / Early Childhood expert",
      "Go 1-Dan Certified",
      "Mission: Promoting the legacy of chess"
    ]
  },
  {
    id: 14,
    nameEn: "Karen Lo",
    nameZh: "羅嘉欣",
    titleEn: "Early Childhood Instructor",
    titleZh: "幼兒棋藝導師",
    image: "/karen.png",
    mainRankEn: "Go 1-Dan",
    mainRankZh: "圍棋 1 段",
    detailsZh: [
      "具備豐富幼兒教育教學經驗",
      "現任大埔多間小學圍棋隊教練",
      "圍棋一段專業資歷",
      "同時精通中國象棋及國際象棋"
    ],
    detailsEn: [
      "Expert in Early Childhood Education",
      "Coach for multiple primary school Go teams",
      "Go 1-Dan Qualification",
      "Fluent in Chinese and International Chess"
    ]
  },
  {
    id: 15,
    nameEn: "Chen Jue Xuan",
    nameZh: "陳珏軒",
    titleEn: "Int. Chess Coach",
    titleZh: "國際象棋教練",
    image: "/chewng.png",
    mainRankEn: "Chess.com: 1500",
    mainRankZh: "國際象棋等級分: 1500",
    detailsZh: [
      "專注國際象棋教學，擁有多年的培訓經驗",
      "擅長透過棋盤遊戲開發學生策略思維",
      "因材施教，重點提升學生解難能力"
    ],
    detailsEn: [
      "Focused on Int. Chess for many years",
      "Uses game-based learning for strategy",
      "Personalized teaching to boost problem-solving"
    ]
  },
  {
    id: 17,
    nameEn: "JE Wong",
    nameZh: "黃浩希",
    titleEn: "Three-Chess Coach",
    titleZh: "三棋教練",
    image: "/je.png",
    mainRankEn: "Go 1-Dan",
    mainRankZh: "圍棋 1 段",
    detailsZh: [
      "精通中國象棋、國際象棋及圍棋",
      "3 年以上教學及幼兒教育經驗",
      "圍棋一段專業資歷"
    ],
    detailsEn: [
      "Proficient in all three chess disciplines",
      "3+ years of teaching experience",
      "Certified Go 1-Dan"
    ]
  },
  {
    id: 18,
    nameEn: "Sylvia Wong",
    nameZh: "黃慶梅",
    titleEn: "Three-Chess Coach",
    titleZh: "三棋教練",
    image: "/sylvia.png",
    mainRankEn: "Go 1-Dan",
    mainRankZh: "圍棋 1 段",
    detailsZh: [
      "精通中國象棋、國際象棋及圍棋",
      "3 年以上教學及幼兒教育經驗",
      "圍棋一段專業資歷"
    ],
    detailsEn: [
      "Expert in Chinese, Int. Chess & Go",
      "3+ years teaching / Early childhood focus",
      "Certified Go 1-Dan"
    ]
  },
  {
    id: 16,
    nameEn: "Zhang Jin Xuan",
    nameZh: "張進軒",
    titleEn: "Int. Chess Coach",
    titleZh: "國際象棋教練",
    image: "/coaches/zhang-jin.jpg",
    mainRankEn: "Chess.com: 1500",
    mainRankZh: "國際象棋等級分: 1500",
    detailsZh: [
      "自幼學習國際象棋，曾參加多場大型錦標賽",
      "曾獲全港 U18 組別 第八名",
      "致力推廣冷靜思考、堅持不懈的良好品格"
    ],
    detailsEn: [
      "Lifelong chess player and tournament veteran",
      "8th Place in U18 Championship",
      "Promotes persistence and focus through chess"
    ]
  },
  {
    id: 7,
    nameEn: "Lin Lok Sam",
    nameZh: "林洛琛",
    titleEn: "International Chess Coach",
    titleZh: "國際象棋教練",
    image: "/coaches/lin.jpg",
    mainRankEn: "FIDE Rating: 1515",
    mainRankZh: "FIDE 等級分: 1515",
    detailsZh: [
      "10 歲起接受專業國際象棋訓練",
      "2024 全港國際象棋大師賽 U18 亞軍",
      "2022 香港慈善象棋秋季公開賽 U18 第四名"
    ],
    detailsEn: [
      "Started international chess at age 10",
      "2024 HK Chess Master Tournament U18 Runner-up",
      "2022 HK Charity Chess Autumn Open U18 4th"
    ]
  },
  {
    id: 4,
    nameEn: "Zhuang Youjing",
    nameZh: "莊有靖",
    titleEn: "Chinese Chess Coach",
    titleZh: "中國象棋教練",
    image: "/coaches/zhuang.jpg",
    mainRankEn: "Chinese Chess: 2124",
    mainRankZh: "中國象棋等級分: 2124",
    detailsZh: [
      "具備豐富大賽經驗 (等級分達 2124)",
      "2014 全港小學中國象棋個人賽 冠軍",
      "2018 第二屆「港。象棋」盃 公開組 冠軍"
    ],
    detailsEn: [
      "High-level competition experience (Rating 2124)",
      "2014 HK Primary School Individual Champion",
      "2018 2nd 'Hong Kong Chess' Cup Open Champion"
    ]
  },
  {
    id: 2,
    nameEn: "Wong An Wing",
    nameZh: "黃安榮",
    titleEn: "Elite Group A Coach",
    titleZh: "精英甲組教練",
    image: "/coaches/an-wing.jpg",
    mainRankEn: "Chinese Chess: 2361",
    mainRankZh: "中國象棋等級分: 2361",
    detailsZh: [
      "現役香港頂尖甲組棋手 (等級分 2361)",
      "2022 卓思盃全港中國象棋公開賽 冠軍",
      "2019 全港中國象棋賽 甲組 第九名"
    ],
    detailsEn: [
      "Top-tier active Div. A Player (Rating 2361)",
      "2022 Masters Cup HK Open Champion",
      "2019 HK Chinese Chess Championship Div. A 9th"
    ]
  },
  {
    id: 19,
    nameEn: "Situ Yi",
    nameZh: "司徒翊",
    titleEn: "Go Coach",
    titleZh: "圍棋教練",
    image: "/coaches/situ.jpg",
    mainRankEn: "Go 3-Dan",
    mainRankZh: "圍棋 3 段",
    detailsZh: [
      "2018 第一屆全院圍棋尖子爭霸戰 亞軍",
      "2021 第四屆弘德圍棋讀秒賽 季軍",
      "第 21 屆香港業餘圍棋公開賽 一段組 第四名"
    ],
    detailsEn: [
      "2018 1st Academy Go Elite Runner-up",
      "2021 4th Hung Tak Go Rapid Match 3rd Place",
      "21st HK Amateur Go Open 1-Dan Group 4th"
    ]
  },
  {
    id: 20,
    nameEn: "Chen Yan Wing",
    nameZh: "陳洐榮",
    titleEn: "Three-Chess Coach",
    titleZh: "三棋教練",
    image: "/coaches/chen-yan.jpg",
    mainRankEn: "Go 1-Dan",
    mainRankZh: "圍棋 1 段",
    detailsZh: [
      "圍棋一段專業資歷",
      "現任大埔區小學圍棋隊教練",
      "3 年以上教學及幼兒教育經驗"
    ],
    detailsEn: [
      "Certified Go 1-Dan",
      "Coach for Tai Po primary school teams",
      "3+ years teaching / Early childhood expert"
    ]
  }
];

export default function CompactCoachSlider() {
  const [index, setIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);
  const locale = useLocale();
  const isZh = locale === "zh";

  useEffect(() => {
    const updateSize = () => {
      if (window.innerWidth >= 1280) setVisibleCards(3);
      else if (window.innerWidth >= 768) setVisibleCards(2);
      else setVisibleCards(1);
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const maxIndex = Math.max(0, coaches.length - visibleCards);
  
  const next = useCallback(() => {
    setIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  const prev = useCallback(() => {
    setIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  }, [maxIndex]);

  useEffect(() => {
    const timer = setInterval(next, 8000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section className="relative w-full py-16 md:py-28 bg-[#020617] overflow-hidden font-sans">
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-orange-600/10 rounded-full blur-[140px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-indigo-600/10 rounded-full blur-[140px]" />
      </div>

      <div className="container relative z-10 mx-auto px-6 max-w-7xl">
        <div className="text-center mb-12 md:mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-500 mb-4"
          >
            <Trophy className="w-4 h-4" />
            <span className="font-bold uppercase tracking-[0.2em] text-[10px] md:text-xs">
              {isZh ? "精英教練團隊" : "Elite Faculty"}
            </span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-6xl font-black text-white uppercase tracking-tighter leading-none mb-6"
          >
            {isZh ? "棋壇" : "The"} <span className="text-orange-500 italic">{isZh ? "大師" : "Masters"}</span>
          </motion.h2>
          <div className="w-20 h-1.5 bg-gradient-to-r from-orange-500 to-transparent mx-auto rounded-full" />
        </div>

        <div className="relative group">
          <div className="overflow-hidden px-2 py-8" ref={containerRef}>
            <motion.div 
              className="flex gap-6"
              animate={{ 
                x: `calc(-${index * (100 / visibleCards)}% - ${index * (visibleCards === 1 ? 0 : 24)}px)` 
              }}
              transition={{ type: "spring", stiffness: 120, damping: 20 }}
            >
              {coaches.map((coach) => (
                <div key={coach.id} className="w-full md:w-[calc(50%-12px)] xl:w-[calc(33.333%-16px)] shrink-0">
                  <div className="bg-slate-900/40 border border-white/5 rounded-[2.5rem] overflow-hidden backdrop-blur-md flex flex-col h-[620px] md:h-[750px] group/card hover:border-orange-500/30 transition-all duration-500 shadow-2xl relative">
                    
                    <div className="relative h-64 md:h-80 shrink-0 overflow-hidden bg-slate-950">
                      <Image 
                        src={coach.image} 
                        alt={isZh ? coach.nameZh : coach.nameEn}
                        fill
                        className="object-cover object-top group-hover/card:scale-110 transition-transform duration-1000 ease-out"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent opacity-90" />
                      
                      <div className="absolute bottom-6 left-8 right-8">
                        <h3 className="text-2xl md:text-3xl font-black text-white uppercase leading-none tracking-tight mb-1">
                          {isZh ? coach.nameZh : coach.nameEn}
                        </h3>
                        {isZh && <p className="text-orange-500 font-bold text-lg">{coach.nameEn}</p>}
                      </div>
                      
                      <div className="absolute top-6 right-6 bg-orange-600 text-white text-[10px] md:text-[11px] font-black px-4 py-2 rounded-xl shadow-2xl border border-white/10 tracking-widest uppercase">
                        {isZh ? coach.mainRankZh : coach.mainRankEn}
                      </div>
                    </div>

                    <div className="p-8 flex-grow flex flex-col">
                      <div className="flex items-center gap-2 mb-6">
                         <Medal className="w-4 h-4 text-orange-500" />
                         <span className="text-indigo-300 text-[10px] font-black uppercase tracking-[0.2em]">
                           {isZh ? "資歷與成就" : "Achievements"}
                         </span>
                      </div>
                      
                      <div className="flex-grow overflow-y-auto pr-2 custom-scrollbar">
                        <ul className="space-y-4">
                          {(isZh ? coach.detailsZh : coach.detailsEn).map((detail, i) => (
                            <li key={i} className="flex items-start gap-3 text-[13px] md:text-[15px] text-slate-300 font-medium leading-snug">
                              <Star size={12} className="mt-1 shrink-0 text-orange-500/80 fill-orange-500/20" />
                              <span>{detail}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="pt-6 border-t border-white/5 mt-6">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center">
                                <User size={14} className="text-orange-500" />
                            </div>
                            <p className="text-[10px] md:text-[11px] text-indigo-400 font-black uppercase tracking-[0.15em] italic truncate">
                              {isZh ? coach.titleZh : coach.titleEn}
                            </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          <div className="flex justify-center items-center gap-6 mt-12">
            <button onClick={prev} className="w-14 h-14 rounded-2xl bg-white/5 text-white flex items-center justify-center border border-white/10 hover:bg-orange-500 transition-all group/btn">
              <ChevronLeft className="w-6 h-6 group-hover/btn:-translate-x-1" strokeWidth={3} />
            </button>
            <div className="flex gap-2">
                {Array.from({ length: maxIndex + 1 }).map((_, i) => (
                    <div key={i} className={`h-1.5 rounded-full transition-all ${index === i ? 'w-8 bg-orange-500' : 'w-2 bg-slate-700'}`} />
                ))}
            </div>
            <button onClick={next} className="w-14 h-14 rounded-2xl bg-white/5 text-white flex items-center justify-center border border-white/10 hover:bg-orange-500 transition-all group/btn">
              <ChevronRight className="w-6 h-6 group-hover/btn:translate-x-1" strokeWidth={3} />
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar { width: 3px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: rgba(255,255,255,0.01); }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(249, 115, 22, 0.3); border-radius: 10px; }
      `}</style>
    </section>
  );
}