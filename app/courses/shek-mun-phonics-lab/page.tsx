"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useLocale } from "next-intl";
import { 
  MapPin, 
  Sparkles, 
  GraduationCap, 
  Trophy, 
  ShieldCheck, 
  Clock, 
  Calendar, 
  Phone, 
  MessageCircle, 
  ChevronRight, 
  CheckCircle2, 
  Star, 
  Compass, 
  Users, 
  Target, 
  Building2,
  Navigation,
  ArrowRight,
  HelpCircle,
  Crown,
  BookOpen,
  Award,
  Zap,
  Check
} from "lucide-react";

export default function ShekMunPhonicsLabPage() {
  const locale = useLocale();
  const isZh = locale === "zh";

  const [activeCourseTab, setActiveCourseTab] = useState<"intl" | "chinese" | "go">("intl");
  const [copiedAddress, setCopiedAddress] = useState(false);

  const addressText = isZh 
    ? "香港沙田石門安群街 1 號京瑞廣場 2 期 7 樓 B 室" 
    : "Flat B, 7/F, Kings Wing Plaza 2, 1 On Kwan Street, Shek Mun, Shatin, HK";

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(addressText);
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2500);
  };

  const waLink = "https://wa.me/85246144561?text=" + encodeURIComponent(
    isZh 
      ? "你好，我想查詢沙田石門教學點 (Phonics Lab) 的棋藝課程及試堂安排。" 
      : "Hello, I would like to inquire about the Chess courses and trial classes at the Shek Mun Teaching Point (Phonics Lab)."
  );

  const ScallopedWave = ({ flip }: { flip?: boolean }) => (
    <div className={`absolute left-0 w-full leading-[0] z-20 pointer-events-none ${flip ? 'bottom-0' : 'top-0 rotate-180'}`}>
      <svg 
        viewBox="0 0 1440 48" 
        fill="none" 
        preserveAspectRatio="none" 
        className="w-full h-[24px] sm:h-[36px] md:h-[48px] lg:h-[60px]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path 
          d="M0 48H1440V48C1410 48 1395 36 1365 36C1335 36 1320 48 1290 48C1260 48 1245 36 1215 36C1185 36 1170 48 1140 48C1110 48 1095 36 1065 36C1035 36 1020 48 990 48C960 48 945 36 915 36C885 36 870 48 840 48C810 48 795 36 765 36C735 36 720 48 690 48C660 48 645 36 615 36C585 36 570 48 540 48C510 48 495 36 465 36C435 36 420 48 390 48C360 48 345 36 315 36C285 36 270 48 240 48C210 48 195 36 165 36C135 36 120 48 90 48C60 48 45 36 15 36C7.5 36 0 42 0 48Z" 
          fill="white" 
        />
      </svg>
    </div>
  );

  const courseDetails = {
    intl: {
      name: isZh ? "國際象棋課程" : "International Chess",
      badge: isZh ? "FIDE 國際標準" : "FIDE Standard",
      accentColor: "from-indigo-600 to-blue-600",
      pillBg: "bg-indigo-50 text-indigo-700 border-indigo-200",
      description: isZh
        ? "由 EC 卓思棋院專業認證導師親臨授課，針對 3-12 歲兒童，從棋盤開局原則、戰術計算到殘局殺法，全方位培養邏輯思維、抗逆力及專注力。"
        : "Taught by certified master coaches from EC Chess Academy. Tailored for ages 3-12, covering opening principles, tactical combinations, and endgame techniques to boost logical calculation and resilience.",
      highlights: isZh 
        ? [
            "幼兒啟蒙班 (3-5歲)：趣味故事引入 64 格空間與吃子規則",
            "初中級進階班 (6-9歲)：攻防戰術、叉攻、牽制及比賽記譜",
            "精英競技班 (10-12歲)：FIDE 比賽實戰覆盤與深度計算力訓練",
            "定期推薦參加香港及國際認可棋藝評級錦標賽"
          ]
        : [
            "Early Childhood (Ages 3-5): Fun storytelling introducing 64 squares & piece movements",
            "Junior Intermediate (Ages 6-9): Attack/defense tactics, forks, pins, and tournament notation",
            "Elite Competition (Ages 10-12): Deep game analysis and FIDE standard calculation",
            "Direct pathways to recognized HK & International rating tournaments"
          ]
    },
    chinese: {
      name: isZh ? "中國象棋課程" : "Chinese Chess (Xiangqi)",
      badge: isZh ? "國粹智慧" : "Traditional Strategy",
      accentColor: "from-amber-600 to-orange-600",
      pillBg: "bg-amber-50 text-amber-800 border-amber-200",
      description: isZh
        ? "融匯千年博弈精粹與現代心理素質訓練。由資深象棋名師指導，引導學員熟習楚河漢界佈局、中局博弈與攻守轉換，提升宏觀大局觀。"
        : "Integrating traditional Chinese strategy with cognitive mind training. Students master standard opening formations, mid-game tactical strikes, and macro positional awareness.",
      highlights: isZh 
        ? [
            "基礎啟蒙：掌握九宮、楚河漢界及各兵種協同作戰基本走法",
            "戰術攻防：掌握馬後炮、雙車挫、重炮將等經典殺法組合",
            "棋品修養：學習『落子無悔』的專注態度與勝不驕敗不餒精神",
            "比賽實戰：模擬香港全港中小學象棋錦標賽實況對局"
          ]
        : [
            "Fundamentals: Grasp piece interactions, palace rules, and opening layouts",
            "Tactical Checkmates: Master classic tactical combinations and maneuvers",
            "Etiquette & Discipline: Cultivate calm sportsmanship and decision-making under pressure",
            "Tournament Prep: Practical sparring tailored for HK Interschool Championships"
          ]
    },
    go: {
      name: isZh ? "圍棋培訓課程" : "Go (Weiqi)",
      badge: isZh ? "黑白宇宙" : "Deep Calculation",
      accentColor: "from-emerald-600 to-teal-700",
      pillBg: "bg-emerald-50 text-emerald-800 border-emerald-200",
      description: isZh
        ? "圍棋被譽為思維的體操。透過十九路棋盤的黑白博弈，培養孩子深邃的空間佈局力、死活計算力與長遠策略眼光。"
        : "Known as gymnastics of the mind. Cultivates infinite calculation depth, spatial perception, and long-term macro vision through the ancient art of Go.",
      highlights: isZh 
        ? [
            "入門啟蒙 (十三路/十九路)：氣與吃子規則、圍地概念與基本定式",
            "死活手筋：真假眼辨識、征子、打劫等核心戰術計算",
            "大局觀養成：學會取捨與全盤平衡，告別局部盲目爭奪",
            "段位考級支援：輔導考取中國圍棋協會 / 香港認可級位及段位證書"
          ]
        : [
            "Introductory (13x13 / 19x19): Liberties, territory control, and foundational Joseki",
            "Life & Death / Tesuji: Tactical reading, Ladders, Ko fights, and precise calculation",
            "Strategic Balance: Developing macro foresight beyond immediate territorial skirmishes",
            "Dan/Kyu Certification: Direct guidance for official HK & regional rank testing"
          ]
    }
  };

  const teachingPointAdvantages = [
    {
      icon: <GraduationCap className="w-7 h-7 sm:w-8 sm:h-8 text-indigo-600" />,
      titleZh: "EC 專業導師進駐",
      titleEn: "Certified Master Coaches",
      descZh: "所有棋藝教練均由 EC 卓思棋院統一培訓與派出，具備 FIDE 及代表隊資歷，教學質素保證。",
      descEn: "All chess coaches are certified and dispatched directly by EC Chess Academy, ensuring elite training quality."
    },
    {
      icon: <Building2 className="w-7 h-7 sm:w-8 sm:h-8 text-amber-500" />,
      titleZh: "優質安全校舍環境",
      titleEn: "Premier Learning Space",
      descZh: "座落沙田石門京瑞廣場 2 期 Phonics Lab 校區，環境明亮潔淨、設備齊全，讓孩子安心專注學習。",
      descEn: "Hosted inside Phonics Lab at Kings Wing Plaza 2, featuring a bright, modern, and safe learning environment."
    },
    {
      icon: <Target className="w-7 h-7 sm:w-8 sm:h-8 text-emerald-600" />,
      titleZh: "小班循序漸進制",
      titleEn: "Small-Group Progression",
      descZh: "嚴格控制師生比例，因材施教，針對每位學員思考特質提供個人化戰術指導與覆盤。",
      descEn: "Strict teacher-student ratio with individualized feedback and step-by-step game analysis."
    },
    {
      icon: <Compass className="w-7 h-7 sm:w-8 sm:h-8 text-purple-600" />,
      titleZh: "石門港鐵直達・交通便利",
      titleEn: "Prime MTR Accessibility",
      descZh: "鄰近港鐵石門站 A/C 出口步行僅 2 分鐘，商場設有停車場及豐富餐飲配套，家長接送方便。",
      descEn: "Just a 2-minute walk from Shek Mun MTR Station (Exit A/C), surrounded by dining and parking amenities."
    }
  ];

  const faqs = [
    {
      qZh: "石門教學點與 EC 卓思棋院總校的課程內容一樣嗎？",
      qEn: "Is the curriculum at Shek Mun the same as EC Chess Academy headquarters?",
      aZh: "完全一致。石門教學點採用 EC 卓思棋院同一套專業教學大綱、教材與評估機制，並由本院專業教練親臨執教，確保最高教學水準。",
      aEn: "Yes, exactly identical. The Shek Mun teaching point follows the official EC Chess syllabus, learning materials, and assessment standards taught by our certified coaches."
    },
    {
      qZh: "如何預約石門教學點的試堂？",
      qEn: "How do I book a trial class at the Shek Mun Teaching Point?",
      aZh: "您可以直接點擊頁面上的 WhatsApp 預約按鈕，或致電聯絡我們，我們的課程顧問會為您的孩子安排適合年齡與程度的試堂時段。",
      aEn: "You can click the WhatsApp booking button on this page or call our hotline. Our course advisors will arrange an age-appropriate trial class."
    },
    {
      qZh: "除了國際象棋，石門點有開辦中國象棋和圍棋嗎？",
      qEn: "Does the Shek Mun point offer Chinese Chess and Go in addition to International Chess?",
      aZh: "有的。石門教學點常規設有國際象棋、中國象棋及圍棋三種棋藝課程，各設有幼兒啟蒙、初級至進階班級。",
      aEn: "Yes. Shek Mun offers International Chess, Chinese Chess (Xiangqi), and Go (Weiqi) courses for beginner to advanced levels."
    },
    {
      qZh: "上課地點具體在哪裡？",
      qEn: "What is the exact address of the Shek Mun teaching point?",
      aZh: "上課地址為：香港新界沙田石門安群街 1 號京瑞廣場 2 期 7 樓 B 室 (英研教育 Phonics Lab 校區內)。",
      aEn: "The address is: Flat B, 7/F, Kings Wing Plaza 2, 1 On Kwan Street, Shek Mun, Shatin (inside Phonics Lab Education)."
    }
  ];

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-indigo-500 selection:text-white overflow-x-hidden">
      
      {/* ========================================================================= */}
      {/* 1. ULTRA-PREMIUM RESPONSIVE HERO SECTION */}
      {/* ========================================================================= */}
      <section className="relative pt-18 pb-16 sm:pt-32 sm:pb-20 md:pt-10 md:pb-28 lg:pt-10 lg:pb-32 bg-[#0f0d2c] text-white overflow-hidden">
        
        {/* Dynamic Glowing Aurora Background */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[600px] lg:w-[850px] h-[300px] sm:h-[450px] lg:h-[550px] bg-gradient-to-r from-indigo-600/35 via-purple-600/25 to-amber-500/25 blur-[90px] sm:blur-[140px]" />
          <div className="absolute top-10 right-[-10%] sm:right-[-5%] w-[250px] sm:w-[450px] h-[250px] sm:h-[450px] bg-amber-500/15 rounded-full blur-[80px] sm:blur-[110px]" />
          <div className="absolute bottom-10 left-[-10%] sm:left-[-5%] w-[250px] sm:w-[450px] h-[250px] sm:h-[450px] bg-indigo-500/20 rounded-full blur-[80px] sm:blur-[110px]" />
          {/* Subtle grid pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:3rem_3rem] sm:bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)] opacity-30" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 max-w-7xl relative z-10">
          <div className="grid lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-14 items-center">
            
            {/* LEFT COLUMN: HERO CONTENT */}
            <div className="lg:col-span-7 space-y-5 sm:space-y-6 lg:space-y-7 text-center lg:text-left">
              
              {/* Badges Bar */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 sm:gap-3">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-500/20 via-indigo-500/20 to-purple-500/20 border border-amber-400/40 text-amber-300 text-[10px] sm:text-xs font-black uppercase tracking-wider sm:tracking-widest shadow-lg shadow-amber-500/10 backdrop-blur-md"
                >
                  <Sparkles size={13} className="text-amber-400 animate-pulse shrink-0" />
                  <span>{isZh ? "強強聯手・專業教學點" : "Strategic Collaboration Teaching Point"}</span>
                </motion.div>

                <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-400/30 text-emerald-300 text-[10px] sm:text-xs font-bold tracking-wide backdrop-blur-md">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block shrink-0" />
                  <span>{isZh ? "現正熱烈招生中" : "Admissions Open"}</span>
                </div>
              </div>

              {/* Main Headline */}
              <div className="space-y-2 sm:space-y-3">
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 }}
                  className="inline-block"
                >
                  <p className="text-[11px] sm:text-xs md:text-sm font-black tracking-wider sm:tracking-[0.25em] uppercase text-indigo-300 flex items-center justify-center lg:justify-start gap-1.5 sm:gap-2 flex-wrap">
                    <Crown size={14} className="text-amber-400 shrink-0" />
                    <span>EC CHESS <span className="text-amber-400">×</span> PHONICS LAB EDUCATION</span>
                  </p>
                </motion.div>

                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-5xl font-[1000] tracking-tight uppercase leading-[1.12] sm:leading-[1.08]"
                >
                  <span className="text-white">
                    {isZh ? "沙田石門" : "Shek Mun, Shatin"}
                  </span>
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-orange-400 to-indigo-300 font-serif italic text-2xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-5xl">
                    {isZh ? "專業棋藝教學點" : "Elite Chess Academy Point"}
                  </span>
                </motion.h1>
              </div>

              {/* Subtitle Description */}
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="text-sm sm:text-base lg:text-lg text-slate-300 font-medium leading-relaxed max-w-2xl mx-auto lg:mx-0"
              >
                {isZh 
                  ? "EC 卓思棋院攜手英語名校「英研教育 Phonics Lab」，於沙田石門京瑞廣場 2 期設立專屬棋藝教學點！由本院資深 FIDE 認證教練親自進駐執教，為 3–12 歲學童提供國際象棋、中國象棋及圍棋小班訓練。" 
                  : "EC Chess Academy partners with premier institution Phonics Lab to deliver master-level chess, Xiangqi, and Go education at Kings Wing Plaza 2, Shek Mun. FIDE-certified coaching tailored for ages 3–12."
                }
              </motion.p>

              {/* Hero Key Metric Badges */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 pt-1 max-w-xl mx-auto lg:mx-0"
              >
                <div className="p-3 sm:p-3.5 rounded-xl sm:rounded-2xl bg-white/[0.07] border border-white/10 backdrop-blur-md text-left">
                  <p className="text-[9px] sm:text-[10px] font-black uppercase tracking-wider text-amber-400 mb-0.5">
                    {isZh ? "招生對象" : "Target Ages"}
                  </p>
                  <p className="text-sm sm:text-base font-black text-white">{isZh ? "3–12 歲" : "Ages 3–12"}</p>
                </div>
                <div className="p-3 sm:p-3.5 rounded-xl sm:rounded-2xl bg-white/[0.07] border border-white/10 backdrop-blur-md text-left">
                  <p className="text-[9px] sm:text-[10px] font-black uppercase tracking-wider text-indigo-400 mb-0.5">
                    {isZh ? "教學團隊" : "Faculty"}
                  </p>
                  <p className="text-sm sm:text-base font-black text-white">{isZh ? "FIDE 認證導師" : "FIDE Coaches"}</p>
                </div>
                <div className="p-3 sm:p-3.5 rounded-xl sm:rounded-2xl bg-white/[0.07] border border-white/10 backdrop-blur-md text-left">
                  <p className="text-[9px] sm:text-[10px] font-black uppercase tracking-wider text-emerald-400 mb-0.5">
                    {isZh ? "教學編制" : "Format"}
                  </p>
                  <p className="text-sm sm:text-base font-black text-white">{isZh ? "小班循序制" : "Small Groups"}</p>
                </div>
                <div className="p-3 sm:p-3.5 rounded-xl sm:rounded-2xl bg-white/[0.07] border border-white/10 backdrop-blur-md text-left">
                  <p className="text-[9px] sm:text-[10px] font-black uppercase tracking-wider text-purple-400 mb-0.5">
                    {isZh ? "港鐵直達" : "MTR Access"}
                  </p>
                  <p className="text-sm sm:text-base font-black text-white">{isZh ? "石門站 2 分鐘" : "2 Mins Walk"}</p>
                </div>
              </motion.div>

              {/* Action Buttons */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-2"
              >
                <motion.a 
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative group inline-flex items-center justify-center gap-2.5 sm:gap-3 bg-gradient-to-r from-[#25D366] to-[#1ebe5d] text-slate-950 font-[1000] px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl sm:rounded-2xl shadow-xl shadow-green-500/25 text-xs sm:text-sm uppercase tracking-wider transition-all overflow-hidden text-center"
                >
                  <div className="absolute inset-0 bg-white/30 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                  <MessageCircle size={18} className="fill-current relative z-10 shrink-0" />
                  <span className="relative z-10">{isZh ? "預約石門試堂 (WhatsApp)" : "Book Trial via WhatsApp"}</span>
                </motion.a>

                <a
                  href="#courses"
                  className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3.5 sm:py-4 rounded-xl sm:rounded-2xl bg-white/10 hover:bg-white/20 border border-white/15 text-white text-xs sm:text-sm font-bold uppercase tracking-wider transition-all backdrop-blur-sm text-center"
                >
                  <BookOpen size={16} className="text-amber-400 shrink-0" />
                  <span>{isZh ? "瀏覽開辦課程" : "Explore Courses"}</span>
                  <ArrowRight size={14} className="shrink-0" />
                </a>
              </motion.div>

            </div>

            {/* RIGHT COLUMN: RICH VISUAL COMPOSITION */}
            <div className="lg:col-span-5 relative mt-4 lg:mt-0">
              <motion.div 
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="relative max-w-md mx-auto lg:max-w-none"
              >
                {/* Visual Image Container with Premium Border */}
                <div className="relative h-[280px] sm:h-[380px] md:h-[420px] lg:h-[460px] w-full rounded-[30px] sm:rounded-[40px] overflow-hidden border-2 sm:border-4 border-white/20 shadow-[0_20px_60px_-15px_rgba(79,70,229,0.5)] group">
                  <Image 
                    src="/1.webp" 
                    alt="EC Chess × Phonics Lab Shek Mun Center"
                    fill
                    priority
                    className="object-cover transition-transform duration-1000 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 40vw"
                  />
                  {/* Subtle gradient vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f0d2c] via-[#0f0d2c]/30 to-transparent" />
                  
                  {/* Bottom Image Overlay Details */}
                  <div className="absolute bottom-3 sm:bottom-5 left-3 sm:left-5 right-3 sm:right-5 p-3.5 sm:p-4 rounded-2xl sm:rounded-3xl bg-slate-950/85 backdrop-blur-xl border border-white/15 shadow-2xl">
                    <div className="flex items-center justify-between gap-2.5">
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1.5 text-amber-400 text-[9px] sm:text-[10px] font-black uppercase tracking-wider mb-0.5 truncate">
                          <MapPin size={11} className="shrink-0" />
                          <span className="truncate">{isZh ? "石門京瑞廣場 2 期 7 樓 B 室" : "Kings Wing Plaza 2, 7/F"}</span>
                        </div>
                        <p className="text-white font-[1000] text-xs sm:text-sm truncate">
                          {isZh ? "英研教育 Phonics Lab 校區" : "Phonics Lab Education Center"}
                        </p>
                      </div>
                      
                      <button
                        onClick={handleCopyAddress}
                        className="px-2.5 sm:px-3 py-1.5 rounded-lg sm:rounded-xl bg-white/10 hover:bg-white/20 text-white text-[9px] sm:text-[10px] font-black uppercase tracking-wider transition-all shrink-0 flex items-center gap-1 border border-white/10"
                        title={addressText}
                      >
                        {copiedAddress ? <Check size={11} className="text-emerald-400 shrink-0" /> : <Navigation size={11} className="shrink-0" />}
                        <span>{copiedAddress ? (isZh ? "已複製" : "Copied!") : (isZh ? "複製" : "Copy")}</span>
                      </button>
                    </div>
                  </div>
                </div>

              </motion.div>
            </div>

          </div>
        </div>

        {/* Signature EC Chess Scalloped Bottom Wave */}
        <ScallopedWave flip />

      </section>

      {/* ========================================================================= */}
      {/* 2. WHY CHOOSE SHEK MUN TEACHING POINT */}
      {/* ========================================================================= */}
      <section className="py-16 sm:py-20 md:py-28 bg-slate-50 border-b border-slate-200/80">
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
          
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-indigo-100 text-indigo-700 text-[11px] sm:text-xs font-black uppercase tracking-wider mb-2.5">
              <Star size={12} className="shrink-0" /> {isZh ? "教學點特色" : "Why Learn At Shek Mun"}
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-[1000] text-slate-900 uppercase tracking-tight">
              {isZh ? "頂級師資" : "Top Tier Coaching"} <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 font-serif italic">{isZh ? "走進沙田石門" : "In Shek Mun"}</span>
            </h2>
            <p className="text-slate-600 font-bold text-xs sm:text-sm md:text-base mt-3 sm:mt-4 leading-relaxed">
              {isZh 
                ? "將 EC 卓思棋院總校的專業教學標準，完整無縫移植至石門教學點，讓沙田、馬鞍山及新界東學童就近享受最優質的棋藝培育。" 
                : "Bringing EC Chess Academy's gold-standard curriculum directly to Shek Mun for families in Shatin, Ma On Shan, and New Territories East."}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {teachingPointAdvantages.map((adv, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08 }}
                className="bg-white p-6 sm:p-7 md:p-8 rounded-2xl sm:rounded-[30px] border border-slate-200/70 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-2xl bg-slate-50 flex items-center justify-center mb-5 sm:mb-6 shadow-inner border border-slate-100">
                    {adv.icon}
                  </div>
                  <h3 className="text-lg sm:text-xl font-[1000] text-slate-900 uppercase tracking-tight mb-2.5">
                    {isZh ? adv.titleZh : adv.titleEn}
                  </h3>
                  <p className="text-xs sm:text-sm font-bold text-slate-500 leading-relaxed">
                    {isZh ? adv.descZh : adv.descEn}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. INTERACTIVE COURSES OFFERED AT SHEK MUN */}
      {/* ========================================================================= */}
      <section id="courses" className="py-16 sm:py-20 md:py-28 lg:py-32 bg-white">
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
          
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-[1000] text-slate-900 uppercase tracking-tight">
              {isZh ? "石門教學點" : "Shek Mun"} <span className="text-indigo-600 font-serif italic">{isZh ? "開辦課程" : "Course Catalog"}</span>
            </h2>
            <p className="text-slate-500 font-bold text-xs sm:text-sm md:text-base mt-2 sm:mt-3">
              {isZh ? "點擊切換查看不同棋種在石門教學點的教學重點與進階路徑：" : "Select a discipline below to explore our curriculum offered at Shek Mun:"}
            </p>
          </div>

          {/* Tab Selector */}
          <div className="flex justify-center mb-8 sm:mb-12">
            <div className="inline-flex p-1 sm:p-1.5 bg-slate-100 rounded-xl sm:rounded-2xl border border-slate-200 max-w-md sm:max-w-xl w-full justify-between gap-1">
              {(["intl", "chinese", "go"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveCourseTab(tab)}
                  className={`flex-1 py-2 sm:py-3 px-2.5 sm:px-4 rounded-lg sm:rounded-xl font-[1000] text-[11px] sm:text-xs md:text-sm uppercase tracking-wide transition-all ${
                    activeCourseTab === tab 
                      ? "bg-slate-900 text-white shadow-md sm:shadow-lg" 
                      : "text-slate-600 hover:text-slate-900 hover:bg-white/60"
                  }`}
                >
                  {tab === "intl" && (isZh ? "國際象棋" : "Int'l Chess")}
                  {tab === "chinese" && (isZh ? "中國象棋" : "Xiangqi")}
                  {tab === "go" && (isZh ? "圍棋" : "Go (Weiqi)")}
                </button>
              ))}
            </div>
          </div>

          {/* Active Tab Content Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCourseTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="bg-slate-900 text-white rounded-3xl sm:rounded-[40px] p-6 sm:p-10 md:p-14 lg:p-16 shadow-2xl relative overflow-hidden"
            >
              <div className="grid lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-12 items-center relative z-10">
                
                <div className="lg:col-span-7 space-y-4 sm:space-y-6">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-amber-400 text-[10px] sm:text-xs font-black uppercase tracking-wider border border-white/10">
                    <Trophy size={12} className="shrink-0" />
                    <span>{courseDetails[activeCourseTab].badge}</span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-[1000] text-white tracking-tight uppercase">
                    {courseDetails[activeCourseTab].name}
                  </h3>

                  <p className="text-slate-300 font-medium text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed">
                    {courseDetails[activeCourseTab].description}
                  </p>

                  <div className="space-y-2.5 pt-1 sm:pt-2">
                    <p className="text-[11px] sm:text-xs font-black uppercase tracking-widest text-indigo-400">
                      {isZh ? "石門班級核心重點：" : "Key Learning Modules:"}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                      {courseDetails[activeCourseTab].highlights.map((point, i) => (
                        <div key={i} className="flex items-start gap-2 p-2.5 sm:p-3 rounded-xl bg-white/5 border border-white/10 text-xs sm:text-sm text-slate-200 font-bold">
                          <CheckCircle2 size={15} className="text-emerald-400 shrink-0 mt-0.5" />
                          <span>{point}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 sm:pt-4">
                    <a
                      href={waLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-slate-950 font-[1000] px-6 sm:px-7 py-3 sm:py-3.5 rounded-xl text-xs uppercase tracking-wider shadow-lg transition-all w-full sm:w-auto"
                    >
                      <MessageCircle size={16} className="fill-current shrink-0" />
                      <span>{isZh ? "查詢此課程試堂時段" : "Inquire Class Schedule"}</span>
                    </a>
                  </div>
                </div>

                <div className="lg:col-span-5">
                  <div className="relative h-60 sm:h-72 md:h-80 lg:h-96 rounded-2xl sm:rounded-3xl overflow-hidden border-2 border-white/10 shadow-2xl">
                    <Image
                      src={
                        activeCourseTab === "intl" 
                          ? "/1.webp" 
                          : activeCourseTab === "chinese" 
                          ? "/inter.jpg" 
                          : "/2.webp"
                      }
                      alt={courseDetails[activeCourseTab].name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 40vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6">
                      <p className="text-[10px] sm:text-[11px] font-black uppercase tracking-widest text-amber-400 mb-0.5">
                        {isZh ? "沙田石門 Phonics Lab 教學點" : "Shek Mun Phonics Lab Center"}
                      </p>
                      <p className="text-base sm:text-lg font-black text-white">
                        {courseDetails[activeCourseTab].name}
                      </p>
                    </div>
                  </div>
                </div>

              </div>
            </motion.div>
          </AnimatePresence>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. GOOGLE MAP & LOCATION GUIDE */}
      {/* ========================================================================= */}
      <section className="py-16 sm:py-20 md:py-28 bg-slate-50 border-t border-slate-200/80">
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
          
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-slate-900 text-white text-[11px] sm:text-xs font-black uppercase tracking-wider mb-2.5">
              <MapPin size={12} className="text-amber-400 shrink-0" />
              <span>{isZh ? "位置與交通" : "Location & Directions"}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-[1000] text-slate-900 uppercase tracking-tight">
              {isZh ? "如何前往" : "How To Visit"} <span className="text-indigo-600 font-serif italic">{isZh ? "石門教學點" : "Shek Mun Center"}</span>
            </h2>
            <p className="text-slate-500 font-bold text-xs sm:text-sm md:text-base mt-2">
              {isZh ? "沙田石門安群街 1 號京瑞廣場 2 期 7 樓 B 室 (英研教育 Phonics Lab)" : "Flat B, 7/F, Kings Wing Plaza 2, 1 On Kwan Street, Shek Mun, Shatin"}
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-6 sm:gap-8 items-stretch">
            
            {/* Left Transport Guide */}
            <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl sm:rounded-[35px] border border-slate-200/80 shadow-md flex flex-col justify-between space-y-6">
              <div className="space-y-5 sm:space-y-6">
                <div>
                  <h3 className="text-lg sm:text-xl font-[1000] text-slate-900 uppercase tracking-tight mb-1.5">
                    {isZh ? "交通方式指引" : "Transit Options"}
                  </h3>
                  <p className="text-xs text-slate-500 font-bold">
                    {isZh ? "鄰近港鐵石門站，配套完善，四通八達。" : "Directly connected to Shek Mun MTR with ample amenities."}
                  </p>
                </div>

                <div className="space-y-3 sm:space-y-4">
                  <div className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-indigo-50 border border-indigo-100">
                    <p className="text-xs font-black text-indigo-900 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                      <Compass size={14} className="text-indigo-600 shrink-0" />
                      <span>{isZh ? "港鐵 (MTR)" : "MTR Subway"}</span>
                    </p>
                    <p className="text-xs font-bold text-indigo-800 leading-relaxed">
                      {isZh 
                        ? "屯馬綫「石門站」A 或 C 出口，步行約 2 分鐘即可直達京瑞廣場 2 期。" 
                        : "Tuen Ma Line Shek Mun Station, Exit A or C (approx. 2 mins walk)."
                      }
                    </p>
                  </div>

                  <div className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-amber-50 border border-amber-100">
                    <p className="text-xs font-black text-amber-900 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                      <Building2 size={14} className="text-amber-600 shrink-0" />
                      <span>{isZh ? "巴士 / 小巴" : "Bus / Minibus"}</span>
                    </p>
                    <p className="text-xs font-bold text-amber-800 leading-relaxed">
                      {isZh 
                        ? "多條巴士線途經小瀝源路及大涌橋路（如 82X, 84M, 85X, 89C, 680 等）。" 
                        : "Multiple bus routes via Siu Lek Yuen & Tai Chung Kiu Road (82X, 84M, 85X, 89C, 680)."
                      }
                    </p>
                  </div>

                  <div className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-emerald-50 border border-emerald-100">
                    <p className="text-xs font-black text-emerald-900 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                      <ShieldCheck size={14} className="text-emerald-600 shrink-0" />
                      <span>{isZh ? "自駕及停車場" : "Parking"}</span>
                    </p>
                    <p className="text-xs font-bold text-emerald-800 leading-relaxed">
                      {isZh 
                        ? "京瑞廣場 1 期及 2 期均設有室內時租停車場，方便家長自駕接送。" 
                        : "Hourly indoor parking available inside Kings Wing Plaza 1 & 2."
                      }
                    </p>
                  </div>
                </div>
              </div>

              <a
                href="https://www.google.com/maps/dir/?api=1&destination=Kings+Wing+Plaza+2+Shek+Mun+Hong+Kong"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-slate-900 hover:bg-indigo-600 text-white p-3.5 sm:p-4 rounded-xl sm:rounded-2xl font-black text-xs uppercase tracking-widest transition-all text-center"
              >
                <Navigation size={14} className="shrink-0" />
                <span>{isZh ? "Google 地圖規劃路線" : "Get Directions on Google"}</span>
              </a>
            </div>

            {/* Right Map Embed */}
            <div className="lg:col-span-7 bg-slate-200 rounded-3xl sm:rounded-[35px] overflow-hidden border-4 sm:border-8 border-white shadow-xl min-h-[300px] sm:min-h-[380px] lg:min-h-[460px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3689.6580978932684!2d114.2065874760604!3d22.38870194042845!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x34040645c381c863%3A0xe54d7f5731f8f946!2sKings%20Wing%20Plaza%202!5e0!3m2!1sen!2shk!4v1710000000000!5m2!1sen!2shk"
                className="w-full h-full min-h-[300px] sm:min-h-[380px] lg:min-h-[460px] border-0"
                allowFullScreen
                loading="lazy"
                title="Shek Mun Teaching Point Map"
              />
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. FREQUENTLY ASKED QUESTIONS */}
      {/* ========================================================================= */}
      <section className="py-16 sm:py-20 md:py-28 bg-white">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
          
          <div className="text-center mb-10 sm:mb-14">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-slate-100 text-slate-700 text-[11px] sm:text-xs font-black uppercase tracking-wider mb-2.5">
              <HelpCircle size={13} className="text-indigo-600 shrink-0" />
              <span>{isZh ? "常見問題" : "Shek Mun FAQ"}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-[1000] text-slate-900 uppercase tracking-tight">
              {isZh ? "家長熱門提問" : "Frequently Asked Questions"}
            </h2>
          </div>

          <div className="space-y-3.5 sm:space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="p-5 sm:p-7 md:p-8 rounded-2xl sm:rounded-[25px] bg-slate-50 border border-slate-200/80">
                <h3 className="text-sm sm:text-base md:text-lg font-[1000] text-slate-900 mb-2.5 sm:mb-3 flex items-start gap-2.5 sm:gap-3">
                  <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg sm:rounded-xl bg-indigo-600 text-white text-[11px] sm:text-xs font-black flex items-center justify-center shrink-0 mt-0.5">
                    Q
                  </span>
                  <span>{isZh ? faq.qZh : faq.qEn}</span>
                </h3>
                <p className="text-xs sm:text-sm font-bold text-slate-600 leading-relaxed pl-8 sm:pl-10">
                  {isZh ? faq.aZh : faq.aEn}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. BOTTOM ACTION CTA */}
      {/* ========================================================================= */}
      <section className="py-16 sm:py-20 md:py-24 bg-gradient-to-br from-[#1a1652] via-[#241e6e] to-[#0f0d36] text-white relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 max-w-5xl text-center relative z-10 space-y-6 sm:space-y-8">
          
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-400 text-slate-950 text-[11px] sm:text-xs font-black uppercase tracking-wider shadow-lg">
            <Sparkles size={13} className="shrink-0" />
            <span>{isZh ? "名額有限・立即預約試堂" : "Limited Slots Available"}</span>
          </div>

          <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-5xl font-[1000] tracking-tight uppercase leading-tight sm:leading-none">
            {isZh ? "啟發孩子策略思維" : "Unlock Strategic Potential"} <br />
            <span className="text-amber-400 font-serif italic text-2xl sm:text-4xl md:text-5xl lg:text-5xl">{isZh ? "在沙田石門起步" : "At Shek Mun Today"}</span>
          </h2>

          <p className="text-slate-300 font-medium text-xs sm:text-sm md:text-base lg:text-lg max-w-2xl mx-auto leading-relaxed px-2">
            {isZh
              ? "歡迎預約專業棋藝程度評估及試堂體驗，讓大師級教練助您的孩子建立專注力與自信心。"
              : "Book a professional tactical assessment and trial class today. Let master coaches guide your child toward peak mental focus."}
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 pt-2 sm:pt-4 max-w-md sm:max-w-none mx-auto">
            <motion.a
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 sm:gap-3 bg-[#25D366] hover:bg-[#20ba59] text-slate-950 font-[1000] px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl sm:rounded-2xl shadow-xl text-xs sm:text-sm uppercase tracking-wider transition-all text-center"
            >
              <MessageCircle size={18} className="fill-current shrink-0" />
              <span>{isZh ? "即時 WhatsApp 預約試堂" : "Book via WhatsApp Now"}</span>
            </motion.a>

            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl sm:rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs sm:text-sm font-bold uppercase tracking-wider transition-all text-center"
            >
              <span>{isZh ? "提交線上查詢表格" : "Submit Enquiry Form"}</span>
              <ArrowRight size={15} className="shrink-0" />
            </Link>
          </div>

        </div>
      </section>

    </div>
  );
}
