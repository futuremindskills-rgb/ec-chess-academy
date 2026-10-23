"use client";
import React, { useState, useEffect, useCallback, useRef, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Trophy, 
  ChevronLeft, 
  ChevronRight, 
  Medal, 
  Star, 
  User, 
  Eye, 
  X, 
  Award,
  Sparkles
} from "lucide-react";
import { useLocale } from "next-intl";

export interface Coach {
  id: number;
  nameEn: string;
  nameZh: string;
  titleEn: string;
  titleZh: string;
  image: string;
  poster?: string;
  category: "chess" | "chinese_chess" | "go" | "all_chess";
  subjectEn: string;
  subjectZh: string;
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
    category: "all_chess",
    subjectEn: "Int. Chess, Chinese Chess, Go",
    subjectZh: "國際象棋、中國象棋、圍棋",
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
      "Course Director of EC Chess Academy",
      "10+ years of chess teaching experience",
      "FIDE National Instructor (NI)",
      "FIDE National Arbiter (NA)",
      "Former Div. A Chinese Chess Player (2280)",
      "Go (Weiqi) 1-Kyu",
      "Subjects: Int. Chess, Chinese Chess, Go"
    ]
  },
  {
    id: 3,
    nameEn: "Gary Yuen",
    nameZh: "袁維堯",
    titleEn: "Chinese Chess Consultant",
    titleZh: "中國象棋顧問",
    image: "/gary.jpg",
    poster: "/posters/gary.png",
    category: "chinese_chess",
    subjectEn: "Chinese Chess",
    subjectZh: "中國象棋",
    mainRankEn: "Div. A Player (2102)",
    mainRankZh: "甲組棋手 (2102)",
    detailsZh: [
      "中國象棋現役甲組棋手 (象棋等級分: 2102)",
      "本院課程顧問",
      "超過十五年棋藝比賽經驗",
      "圍棋 1 段棋士",
      "任教科目：中國象棋"
    ],
    detailsEn: [
      "Active Division A Chinese Chess Player (Rating: 2102)",
      "Academy Curriculum Consultant",
      "Over 15 years of tournament experience",
      "Go (Weiqi) 1-Dan Player",
      "Subject: Chinese Chess (Xiangqi)"
    ]
  },
  {
    id: 21,
    nameEn: "Alexis Villanueva",
    nameZh: "Alexis Villanueva",
    titleEn: "Foreign Coach",
    titleZh: "外籍教練",
    image: "/alexis.png",
    poster: "/posters/alexis.png",
    category: "chess",
    subjectEn: "International Chess",
    subjectZh: "國際象棋",
    mainRankEn: "All-English Coach",
    mainRankZh: "全英語外籍教練",
    detailsZh: [
      "全英語教學 (All-English Teaching)",
      "曾任拔萃女書院棋隊教練",
      "曾任保良局蔡繼有學校 (小學部) 棋隊教練",
      "曾任澳洲國際學校 (小學部) 棋隊教練",
      "曾任香港建造商會保良局學校 (小學部) 棋隊教練",
      "任教科目：國際象棋"
    ],
    detailsEn: [
      "100% All-English immersive chess coaching",
      "Former Coach: Diocesan Girls' School (DGS)",
      "Former Coach: PLK Choi Kai Yau School (Primary)",
      "Former Coach: Australian International School (AISHK)",
      "Former Coach: HKCA Po Leung Kuk School (Primary)",
      "Subject: International Chess"
    ]
  },
  {
    id: 8,
    nameEn: "Starry Ho",
    nameZh: "何盈鏗",
    titleEn: "Go Coach",
    titleZh: "圍棋教練",
    image: "/starry.jpg",
    poster: "/posters/starry.png",
    category: "go",
    subjectEn: "Go (Weiqi)",
    subjectZh: "圍棋",
    mainRankEn: "Go 3-Dan",
    mainRankZh: "圍棋 3 段",
    detailsZh: [
      "中國圍棋協會頒授 3 段棋士",
      "本院高級導師",
      "小學校隊教練",
      "逾 9 年棋藝比賽及教學經驗",
      "任教科目：圍棋"
    ],
    detailsEn: [
      "Chinese Weiqi Association Certified 3-Dan Master",
      "Academy Senior Tutor",
      "Primary School Team Coach",
      "Over 9 years of tournament and coaching experience",
      "Subject: Go (Weiqi)"
    ]
  },
  {
    id: 10,
    nameEn: "Billy Kei",
    nameZh: "紀敏業",
    titleEn: "Chess Coach",
    titleZh: "象棋教練",
    image: "/kie.jpg",
    poster: "/posters/billy.png",
    category: "chinese_chess",
    subjectEn: "Int. Chess + Chinese Chess",
    subjectZh: "國際象棋 + 中國象棋",
    mainRankEn: "Rating: 1500",
    mainRankZh: "等級分: 1500",
    detailsZh: [
      "精通中國象棋及國際象棋",
      "本院中級導師",
      "等級分: 1500",
      "逾 3 年棋藝比賽及教學經驗",
      "任教科目：國際象棋 + 中國象棋"
    ],
    detailsEn: [
      "Proficient in Chinese and International Chess",
      "Academy Intermediate Tutor",
      "Official Rating: 1500",
      "Over 3 years of competitive and teaching experience",
      "Subjects: International Chess + Chinese Chess"
    ]
  },
  {
    id: 5,
    nameEn: "Ray Ng",
    nameZh: "吳浩軒",
    titleEn: "Go Coach",
    titleZh: "圍棋教練",
    image: "/rayng.jpg",
    poster: "/posters/ray.png",
    category: "go",
    subjectEn: "Go (Weiqi)",
    subjectZh: "圍棋",
    mainRankEn: "Go 5-Dan",
    mainRankZh: "圍棋 5 段",
    detailsZh: [
      "中國圍棋協會頒授 5 段棋士",
      "小學校隊教練",
      "本院高級導師",
      "逾 8 年棋藝比賽及教學經驗",
      "任教科目：圍棋"
    ],
    detailsEn: [
      "Chinese Weiqi Association Certified 5-Dan Master",
      "Primary School Team Coach",
      "Academy Senior Tutor",
      "Over 8 years of tournament and teaching experience",
      "Teaching Subject: Go (Weiqi)"
    ]
  },
  {
    id: 22,
    nameEn: "Jeffery Yu",
    nameZh: "余文傑",
    titleEn: "Three-Chess Coach",
    titleZh: "三棋教練",
    image: "/jeffery.png",
    poster: "/posters/jeffery.png",
    category: "all_chess",
    subjectEn: "Int. Chess, Go, Chinese Chess",
    subjectZh: "國際象棋、圍棋、中國象棋",
    mainRankEn: "Three-Chess Specialist",
    mainRankZh: "三棋專業導師",
    detailsZh: [
      "中小學棋隊教練",
      "逾 3 年棋藝教學及比賽經驗",
      "本院專業導師",
      "精通國際象棋、圍棋及中國象棋",
      "任教科目：國際象棋、圍棋 + 中國象棋"
    ],
    detailsEn: [
      "Primary & Secondary School Chess Team Coach",
      "Over 3 years of chess teaching and competition experience",
      "Academy Professional Tutor",
      "Proficient in International Chess, Go, and Chinese Chess",
      "Teaching Subjects: Int. Chess, Go + Chinese Chess"
    ]
  },
  {
    id: 23,
    nameEn: "Jacky Chung",
    nameZh: "鍾逸傑",
    titleEn: "Three-Chess Coach & Tournament Director",
    titleZh: "三棋教練 / 賽務總監",
    image: "/jacky.png",
    poster: "/posters/jacky.png",
    category: "all_chess",
    subjectEn: "Int. Chess + Chinese Chess + Go",
    subjectZh: "國際象棋 + 中國象棋 + 圍棋",
    mainRankEn: "Tournament Director / Go 1-Kyu",
    mainRankZh: "賽務總監 / 圍棋 1 級",
    detailsZh: [
      "中國圍棋協會頒授 1 級棋士",
      "小學校隊教練",
      "本院中級導師及賽務總監",
      "豐富幼兒及 SEN 特殊教育教學經驗",
      "任教科目：國際象棋 + 中國象棋 + 圍棋"
    ],
    detailsEn: [
      "Chinese Weiqi Association Certified 1-Kyu Player",
      "Primary School Team Coach",
      "Academy Intermediate Tutor & Tournament Operations Director",
      "Rich teaching experience in Early Childhood & SEN Education",
      "Teaching Subjects: Int. Chess + Chinese Chess + Go"
    ]
  },
  {
    id: 13,
    nameEn: "Bruce Yiu",
    nameZh: "姚信熙",
    titleEn: "Three-Chess Coach",
    titleZh: "三棋教練",
    image: "/bruce.png",
    poster: "/posters/bruce.png",
    category: "all_chess",
    subjectEn: "Int. Chess + Go",
    subjectZh: "國際象棋 + 圍棋",
    mainRankEn: "Go 1-Dan",
    mainRankZh: "圍棋 1 段",
    detailsZh: [
      "精通圍棋及國際象棋",
      "圍棋 1 段棋士",
      "逾 3 年棋藝教學經驗",
      "本院中級導師",
      "任教科目：國際象棋 + 圍棋"
    ],
    detailsEn: [
      "Proficient in Go & International Chess",
      "Go (Weiqi) 1-Dan Certified Player",
      "Over 3 years of chess teaching experience",
      "Academy Intermediate Tutor",
      "Teaching Subjects: International Chess + Go"
    ]
  },
  {
    id: 12,
    nameEn: "Ryan Ng",
    nameZh: "伍殷樂",
    titleEn: "Go Coach",
    titleZh: "圍棋教練",
    image: "/ryanng.jpg",
    poster: "/posters/ryan.png",
    category: "go",
    subjectEn: "Go (Weiqi)",
    subjectZh: "圍棋",
    mainRankEn: "Go 4-Dan",
    mainRankZh: "圍棋 4 段",
    detailsZh: [
      "中國圍棋協會頒授 4 段棋士",
      "本院中級導師",
      "小學校隊教練",
      "逾 9 年棋藝比賽及教學經驗",
      "任教科目：圍棋"
    ],
    detailsEn: [
      "Chinese Weiqi Association Certified 4-Dan Master",
      "Academy Intermediate Tutor",
      "Primary School Team Coach",
      "Over 9 years of competitive tournament and teaching experience",
      "Teaching Subject: Go (Weiqi)"
    ]
  },
  {
    id: 6,
    nameEn: "Alikhan Nurgazy",
    nameZh: "阿利汗",
    titleEn: "International Chess Master",
    titleZh: "國際象棋大師",
    image: "/alikhan.png",
    category: "chess",
    subjectEn: "International Chess",
    subjectZh: "國際象棋",
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
    id: 9,
    nameEn: "Sam Fok",
    nameZh: "霍駿森",
    titleEn: "Go Coach",
    titleZh: "圍棋教練",
    image: "/sam.png",
    category: "go",
    subjectEn: "Go (Weiqi)",
    subjectZh: "圍棋",
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
    id: 11,
    nameEn: "Luke Lau",
    nameZh: "劉律言",
    titleEn: "Int. Chess Consultant",
    titleZh: "國際象棋顧問",
    image: "/lau.png",
    category: "chess",
    subjectEn: "Int. Chess & Chinese Chess",
    subjectZh: "國際象棋、中國象棋",
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
    id: 14,
    nameEn: "Karen Lo",
    nameZh: "羅嘉欣",
    titleEn: "Early Childhood Instructor",
    titleZh: "幼兒棋藝導師",
    image: "/karen.png",
    category: "all_chess",
    subjectEn: "Youth Chess & Go",
    subjectZh: "幼兒三棋、圍棋",
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
    category: "chess",
    subjectEn: "International Chess",
    subjectZh: "國際象棋",
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
    category: "all_chess",
    subjectEn: "Chinese Chess, Int. Chess, Go",
    subjectZh: "中國象棋、國際象棋、圍棋",
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
    category: "all_chess",
    subjectEn: "Chinese Chess, Int. Chess, Go",
    subjectZh: "中國象棋、國際象棋、圍棋",
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
  }
];

export default function CompactCoachSlider() {
  const [index, setIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [activePoster, setActivePoster] = useState<{ url: string; name: string } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const locale = useLocale();
  const isZh = locale === "zh";

  // Filter coaches based on category
  const filteredCoaches = useMemo(() => {
    if (selectedCategory === "all") return coaches;
    if (selectedCategory === "chess") {
      return coaches.filter(c => c.category === "chess" || c.category === "all_chess" || c.subjectZh.includes("國際象棋"));
    }
    if (selectedCategory === "chinese_chess") {
      return coaches.filter(c => c.category === "chinese_chess" || c.category === "all_chess" || c.subjectZh.includes("中國象棋"));
    }
    if (selectedCategory === "go") {
      return coaches.filter(c => c.category === "go" || c.category === "all_chess" || c.subjectZh.includes("圍棋"));
    }
    return coaches;
  }, [selectedCategory]);

  useEffect(() => {
    setIndex(0);
  }, [selectedCategory]);

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

  const maxIndex = Math.max(0, filteredCoaches.length - visibleCards);
  
  const next = useCallback(() => {
    setIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  const prev = useCallback(() => {
    setIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  }, [maxIndex]);

  useEffect(() => {
    const timer = setInterval(next, 7000);
    return () => clearInterval(timer);
  }, [next]);

  const categories = [
    { key: "all", labelZh: "全部導師", labelEn: "All Faculty" },
    { key: "chess", labelZh: "國際象棋", labelEn: "International Chess" },
    { key: "chinese_chess", labelZh: "中國象棋", labelEn: "Chinese Chess" },
    { key: "go", labelZh: "圍棋", labelEn: "Go (Weiqi)" },
  ];

  return (
    <section className="relative w-full py-16 md:py-28 bg-[#020617] overflow-hidden font-sans">
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-orange-600/10 rounded-full blur-[140px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-indigo-600/10 rounded-full blur-[140px]" />
      </div>

      <div className="container relative z-10 mx-auto px-6 max-w-7xl">
        <div className="text-center mb-10 md:mb-14">
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
            className="text-3xl md:text-6xl font-black text-white uppercase tracking-tighter leading-none mb-4"
          >
            {isZh ? "棋壇" : "The"} <span className="text-orange-500 italic">{isZh ? "大師團隊" : "Masters"}</span>
          </motion.h2>

          <p className="text-slate-400 text-sm md:text-base max-w-2xl mx-auto mb-6">
            {isZh 
              ? "由現役甲組棋手、國際棋聯 (FIDE) 認證教練、外籍全英語導師、賽務總監及圍棋高段名師組成的頂尖師資團隊"
              : "Led by active Division A masters, FIDE certified instructors, foreign all-English coaches, and Dan-ranked Go masters"}
          </p>

          <div className="w-20 h-1.5 bg-gradient-to-r from-orange-500 to-transparent mx-auto rounded-full mb-8" />

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setSelectedCategory(cat.key)}
                className={`px-4 py-2 rounded-xl text-xs md:text-sm font-bold tracking-wide transition-all duration-300 ${
                  selectedCategory === cat.key
                    ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg shadow-orange-500/25 scale-105"
                    : "bg-slate-900/80 text-slate-400 border border-white/5 hover:border-orange-500/30 hover:text-white"
                }`}
              >
                {isZh ? cat.labelZh : cat.labelEn}
              </button>
            ))}
          </div>
        </div>

        <div className="relative group">
          <div className="overflow-hidden px-2 py-4" ref={containerRef}>
            <motion.div 
              className="flex gap-6"
              animate={{ 
                x: `calc(-${index * (100 / visibleCards)}% - ${index * (visibleCards === 1 ? 0 : 24)}px)` 
              }}
              transition={{ type: "spring", stiffness: 120, damping: 20 }}
            >
              {filteredCoaches.map((coach) => (
                <div key={coach.id} className="w-full md:w-[calc(50%-12px)] xl:w-[calc(33.333%-16px)] shrink-0">
                  <div className="bg-slate-900/50 border border-white/10 rounded-[2.5rem] overflow-hidden backdrop-blur-md flex flex-col h-[650px] md:h-[770px] group/card hover:border-orange-500/40 transition-all duration-500 shadow-2xl relative">
                    
                    {/* Header Image Section */}
                    <div className="relative h-64 md:h-80 shrink-0 overflow-hidden bg-slate-950">
                      <Image 
                        src={coach.image} 
                        alt={isZh ? coach.nameZh : coach.nameEn}
                        fill
                        className="object-cover object-top group-hover/card:scale-105 transition-transform duration-700 ease-out"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-slate-950/40 to-transparent opacity-95" />
                      
                      {/* Name Badge */}
                      <div className="absolute bottom-5 left-6 right-6">
                        <h3 className="text-2xl md:text-3xl font-black text-white uppercase leading-none tracking-tight mb-1">
                          {isZh ? coach.nameZh : coach.nameEn}
                        </h3>
                        {isZh && (
                          <p className="text-orange-400 font-bold text-sm md:text-base tracking-wide">
                            {coach.nameEn}
                          </p>
                        )}
                      </div>
                      
                      {/* Rank Badge */}
                      <div className="absolute top-5 right-5 bg-gradient-to-r from-orange-600 to-amber-600 text-white text-[10px] md:text-[11px] font-black px-3.5 py-1.5 rounded-xl shadow-xl border border-white/10 tracking-wider uppercase">
                        {isZh ? coach.mainRankZh : coach.mainRankEn}
                      </div>

                      {/* Poster Button (if coach has official poster) */}
                      {coach.poster && (
                        <button
                          onClick={() => setActivePoster({ url: coach.poster!, name: isZh ? coach.nameZh : coach.nameEn })}
                          className="absolute top-5 left-5 bg-slate-900/80 hover:bg-orange-500 text-white text-[10px] md:text-[11px] font-bold px-3 py-1.5 rounded-xl border border-white/15 backdrop-blur-md flex items-center gap-1.5 transition-all shadow-lg group/poster"
                          title={isZh ? "查看官方宣傳海報" : "View Official Poster"}
                        >
                          <Eye className="w-3.5 h-3.5 text-orange-400 group-hover/poster:text-white transition-colors" />
                          <span>{isZh ? "官方海報" : "Poster"}</span>
                        </button>
                      )}
                    </div>

                    {/* Content Section */}
                    <div className="p-6 md:p-8 flex-grow flex flex-col justify-between">
                      <div>
                        {/* Teaching Subject Badge */}
                        <div className="mb-4 inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold">
                          <span className="text-[10px] font-black uppercase tracking-wider text-emerald-500">
                            {isZh ? "任教科目:" : "Subject:"}
                          </span>
                          <span>{isZh ? coach.subjectZh : coach.subjectEn}</span>
                        </div>

                        <div className="flex items-center gap-2 mb-4">
                          <Medal className="w-4 h-4 text-orange-500" />
                          <span className="text-indigo-300 text-[10px] font-black uppercase tracking-[0.2em]">
                            {isZh ? "資歷與成就" : "Qualifications & Achievements"}
                          </span>
                        </div>
                        
                        <div className="overflow-y-auto max-h-[220px] md:max-h-[260px] pr-2 custom-scrollbar">
                          <ul className="space-y-3">
                            {(isZh ? coach.detailsZh : coach.detailsEn).map((detail, i) => (
                              <li key={i} className="flex items-start gap-2.5 text-[13px] md:text-[14px] text-slate-300 font-medium leading-snug">
                                <Star size={12} className="mt-1 shrink-0 text-orange-500 fill-orange-500/30" />
                                <span>{detail}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      
                      {/* Bottom Role / Action Footer */}
                      <div className="pt-4 border-t border-white/10 mt-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center shrink-0 border border-white/5">
                            <User size={14} className="text-orange-500" />
                          </div>
                          <p className="text-[11px] md:text-[12px] text-indigo-400 font-black uppercase tracking-wider italic truncate">
                            {isZh ? coach.titleZh : coach.titleEn}
                          </p>
                        </div>

                        {coach.poster && (
                          <button
                            onClick={() => setActivePoster({ url: coach.poster!, name: isZh ? coach.nameZh : coach.nameEn })}
                            className="text-xs text-slate-400 hover:text-orange-400 flex items-center gap-1 font-semibold transition-colors"
                          >
                            <span>{isZh ? "查看海報" : "View"}</span>
                            <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Navigation Controls */}
          <div className="flex justify-center items-center gap-6 mt-10">
            <button 
              onClick={prev} 
              aria-label="Previous coach"
              className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-white/5 text-white flex items-center justify-center border border-white/10 hover:bg-orange-500 hover:border-orange-500 transition-all group/btn shadow-lg"
            >
              <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 group-hover/btn:-translate-x-1 transition-transform" strokeWidth={3} />
            </button>
            <div className="flex gap-2">
              {Array.from({ length: maxIndex + 1 }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    index === i ? 'w-8 bg-orange-500' : 'w-2 bg-slate-700 hover:bg-slate-500'
                  }`} 
                />
              ))}
            </div>
            <button 
              onClick={next} 
              aria-label="Next coach"
              className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-white/5 text-white flex items-center justify-center border border-white/10 hover:bg-orange-500 hover:border-orange-500 transition-all group/btn shadow-lg"
            >
              <ChevronRight className="w-5 h-5 md:w-6 md:h-6 group-hover/btn:translate-x-1 transition-transform" strokeWidth={3} />
            </button>
          </div>
        </div>
      </div>

      {/* Official Poster Lightbox Modal */}
      <AnimatePresence>
        {activePoster && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActivePoster(null)}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 md:p-8"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-lg w-full max-h-[92vh] flex flex-col items-center bg-slate-900 border border-white/10 rounded-3xl overflow-hidden shadow-2xl"
            >
              <div className="w-full flex items-center justify-between p-4 bg-slate-950/80 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-orange-500" />
                  <span className="text-white font-bold text-sm">
                    {activePoster.name} - {isZh ? "官方宣傳海報" : "Official Poster"}
                  </span>
                </div>
                <button
                  onClick={() => setActivePoster(null)}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-red-500/80 text-white flex items-center justify-center transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="relative w-full aspect-[595/842] overflow-hidden bg-slate-950">
                <Image
                  src={activePoster.url}
                  alt={activePoster.name}
                  fill
                  className="object-contain p-2"
                  sizes="(max-width: 768px) 90vw, 500px"
                  priority
                />
              </div>

              <div className="w-full p-3 bg-slate-950/90 text-center border-t border-white/5">
                <p className="text-xs text-slate-400">
                  {isZh ? "EC 卓思棋院官方認證導師海報" : "Official EC Chess Academy Faculty Certificate"}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: rgba(255,255,255,0.02); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(249, 115, 22, 0.4); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(249, 115, 22, 0.7); }
      `}</style>
    </section>
  );
}