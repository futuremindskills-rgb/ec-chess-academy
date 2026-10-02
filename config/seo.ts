import type { Metadata } from "next";

/**
 * ==============================================================================
 * EC CHESS ACADEMY - CENTRAL SEO CONFIGURATION FILE
 * ==============================================================================
 * 
 * Instructions for the SEO Team:
 * 1. To update meta titles, descriptions, keywords, or social images for any page,
 *    edit the `pages` section below.
 * 2. Both English (`en`) and Traditional Chinese (`zh`) are supported per page.
 * 3. To update site-wide details (domain, brand name, verification tokens, etc.),
 *    edit the `site` or `verification` sections.
 * 4. To update Google Rich Snippets / JSON-LD schemas (FAQs, Local Business info,
 *    Course catalogs), edit the `structuredData` section below.
 * ==============================================================================
 */

export interface PageSeoConfig {
  path: string; // Relative path (e.g., "/about")
  ogImage?: string; // Optional custom OG image for this page (defaults to site.defaultImage)
  robots?: {
    index?: boolean;
    follow?: boolean;
  };
  en: {
    title: string;
    description: string;
    keywords?: string[];
    ogTitle?: string;
    ogDescription?: string;
  };
  zh: {
    title: string;
    description: string;
    keywords?: string[];
    ogTitle?: string;
    ogDescription?: string;
  };
}

export const SEO_CONFIG = {
  // ==========================================
  // 1. GLOBAL SITE CONFIGURATION
  // ==========================================
  site: {
    name: "EC Chess Academy HK",
    nameZh: "EC 卓思棋院 (香港)",
    baseUrl: "https://ecchess.com",
    defaultLocale: "en",
    locales: ["en", "zh"] as const,
    defaultImage: "/og-image.jpg",
    logoUrl: "https://ecchess.com/icon.png",
    themeColor: "#ffffff",
    twitterHandle: "@ecchess",
  },

  // ==========================================
  // 2. VERIFICATION & TRACKING IDS
  // ==========================================
  verification: {
    googleSiteVerification: "google2927da2fac444a7f", // Google Search Console HTML verification file/token
    bingSiteVerification: "", // Optional: Bing Webmaster tools token
    yandexVerification: "",
  },

  analytics: {
    googleAnalyticsId: "G-WVZSVNQNLW",
    googleTagManagerId: "GTM-KNXZDXMT",
  },

  // ==========================================
  // 3. SOCIAL MEDIA PROFILES
  // ==========================================
  socialLinks: {
    facebook: "https://www.facebook.com/ecchess",
    instagram: "https://www.instagram.com/ec_chess/",
    twitter: "https://twitter.com/ecchess",
    linkedin: "https://www.linkedin.com/company/ecchess",
    youtube: "https://www.youtube.com/@ecchess",
  },

  // ==========================================
  // 4. PER-PAGE METADATA (EN & ZH)
  // ==========================================
  pages: {
    // --- Homepage ---
    home: {
      path: "",
      ogImage: "/og-image.jpg",
      robots: { index: true, follow: true },
      en: {
        title: "EC Chess Academy HK | Elite Chess, Xiangqi & Go Training in Hong Kong",
        description: "Hong Kong's premier strategy academy. Expert FIDE-certified coaching for International Chess, Chinese Chess (Xiangqi), and Go (Weiqi) for all ages.",
        keywords: [
          "chess academy hong kong",
          "fide chess coach hk",
          "chinese chess classes kowloon",
          "go weiqi lessons hong kong",
          "kids chess training hk",
          "chess competition preparation"
        ],
        ogTitle: "EC Chess Academy HK | Elite Chess & Strategy Training",
        ogDescription: "Hong Kong's premier strategy academy. Expert FIDE-certified coaching for International Chess, Chinese Chess, and Go (Weiqi) for all skill levels.",
      },
      zh: {
        title: "EC 卓思棋院 (香港) | 專業國際象棋、中國象棋及圍棋訓練課程",
        description: "香港領先策略棋院，提供國際象棋、中國象棋及圍棋的專業 FIDE 認證訓練。全港頂尖導師團隊，啟發兒童邏輯思維與抗壓能力。",
        keywords: [
          "香港棋院",
          "國際象棋課程",
          "中國象棋培訓",
          "圍棋班",
          "九龍城棋院",
          "元朗棋院",
          "兒童棋藝班"
        ],
        ogTitle: "EC 卓思棋院 (香港) | 精英棋藝與策略訓練",
        ogDescription: "於香港提供專業國際象棋、中國象棋及圍棋培訓課程。培養專注力、戰術計算及競技心態。",
      },
    } satisfies PageSeoConfig,

    // --- About Us ---
    about: {
      path: "/about",
      ogImage: "/og-image.jpg",
      robots: { index: true, follow: true },
      en: {
        title: "About EC Chess Academy | Elite Coaching Team & Mission | Hong Kong",
        description: "Learn about EC Chess Academy HK, our certified FIDE instructors, national masters, and our proven pedagogy across Kowloon City and Yuen Long campuses.",
        keywords: ["about ec chess", "chess masters hong kong", "fide instructors hk", "chess academy history"],
        ogTitle: "About EC Chess Academy HK | Our Story & Elite Coaches",
        ogDescription: "Meet our FIDE certified trainers and national masters dedicated to nurturing chess champions in Hong Kong.",
      },
      zh: {
        title: "關於我們 | EC 卓思棋院 - 專業導師團隊與辦學理念",
        description: "了解 EC 卓思棋院的創辦理念、國際棋聯 (FIDE) 認證教練團隊及香港分校特色，致力培養思維敏銳的棋壇精英。",
        keywords: ["關於卓思棋院", "香港國際象棋教練", "九龍城分校", "元朗分校", "棋院簡介"],
        ogTitle: "關於我們 | EC 卓思棋院 (香港)",
        ogDescription: "匯聚 FIDE 認證教練與香港代表隊棋手，提供最頂尖的棋藝策略培訓。",
      },
    } satisfies PageSeoConfig,

    // --- Courses (Overview) ---
    courses: {
      path: "/courses",
      ogImage: "/inter.jpg",
      robots: { index: true, follow: true },
      en: {
        title: "Chess, Xiangqi & Go Courses in Hong Kong | EC Chess Academy",
        description: "Comprehensive strategy courses for beginners to tournament champions. Flexible in-person & online lessons in International Chess, Chinese Chess & Go.",
        keywords: ["chess courses hong kong", "xiangqi lessons hk", "go training courses", "weekend chess classes"],
        ogTitle: "Comprehensive Chess & Strategy Courses | EC Chess Academy",
        ogDescription: "Explore our full range of courses across International Chess, Chinese Chess, and Go for ages 3.5+ and all skill levels.",
      },
      zh: {
        title: "棋藝課程一覽 | 國際象棋、中國象棋及圍棋班 - EC 卓思棋院",
        description: "提供幼兒啟蒙班、初級戰術班至精英競賽班。涵蓋國際象棋、中國象棋及圍棋，支援實體與線上互動教學。",
        keywords: ["棋藝課程", "幼兒學棋", "國際象棋班收費", "圍棋入門班", "象棋比賽班"],
        ogTitle: "棋藝課程一覽 | EC 卓思棋院 (香港)",
        ogDescription: "由淺入深，系統化培育學員戰術計算、心理素質與棋理佈局。",
      },
    } satisfies PageSeoConfig,

    // --- International Chess ---
    internationalChess: {
      path: "/international-chess",
      ogImage: "/chess.png",
      robots: { index: true, follow: true },
      en: {
        title: "International Chess Coaching HK | FIDE Standard Training | EC Chess",
        description: "FIDE-standard International Chess training in Hong Kong. Master opening theory, tactical combinations, and endgame mastery with certified coaches.",
        keywords: ["international chess hong kong", "fide training hk", "junior chess club hk", "western chess lessons"],
        ogTitle: "International Chess Coaching | FIDE Standard Courses",
        ogDescription: "Master tactical calculation, opening theory, and endgame strategies with certified FIDE trainers.",
      },
      zh: {
        title: "國際象棋培訓課程 | FIDE 國際棋聯標準教學 - EC 卓思棋院",
        description: "由 FIDE 國際棋聯認證教練親授，專注培養大局觀、戰術組合計算及國際賽事實戰心理素質。",
        keywords: ["國際象棋課程", "FIDE 認證教練", "香港兒童國象", "國際象棋比賽培訓"],
        ogTitle: "國際象棋培訓課程 | EC 卓思棋院",
        ogDescription: "香港頂尖國際象棋訓練系統，助學員考取國際等級分 (FIDE Rating)。",
      },
    } satisfies PageSeoConfig,

    // --- Chinese Chess (Xiangqi) ---
    chineseChess: {
      path: "/chinese-chess",
      ogImage: "/c-chess.png",
      robots: { index: true, follow: true },
      en: {
        title: "Chinese Chess (Xiangqi) Lessons HK | Traditional Strategy Academy",
        description: "Learn Chinese Chess (Xiangqi) in Hong Kong. Master offensive & defensive maneuvers, strategic formations, and cultural heritage with master trainers.",
        keywords: ["chinese chess hong kong", "xiangqi classes hk", "learn xiangqi", "chinese chess tactics"],
        ogTitle: "Chinese Chess (Xiangqi) Masterclasses | EC Chess Academy",
        ogDescription: "Combines rich cultural heritage with sharp offensive-defensive calculation and tactical thinking.",
      },
      zh: {
        title: "中國象棋課程 | 傳統博弈與攻防戰術訓練 - EC 卓思棋院",
        description: "結合中華文化精粹與現代博弈思維。系統化教學象棋開局、中局博弈與殘局殺法，強化空間佈局與專注力。",
        keywords: ["中國象棋課程", "象棋班香港", "兒童學象棋", "中國象棋戰術"],
        ogTitle: "中國象棋課程 | EC 卓思棋院 (香港)",
        ogDescription: "傳承千年中式智慧，鍛煉縱深佈局與攻守平衡。",
      },
    } satisfies PageSeoConfig,

    // --- Go (Weiqi) ---
    goWieqi: {
      path: "/go-wieqi",
      ogImage: "/go.png",
      robots: { index: true, follow: true },
      en: {
        title: "Go (Weiqi) Coaching in Hong Kong | Deep Calculation & Macro Vision",
        description: "Professional Go (Weiqi) coaching in HK. Develop infinite calculation depth, territory control, intuition, and mental discipline for all ages.",
        keywords: ["go lessons hong kong", "weiqi training hk", "learn go game", "weiqi academy hk"],
        ogTitle: "Go (Weiqi) Strategy Programs | EC Chess Academy HK",
        ogDescription: "Develops deep calculations, territory control, and macro foresight with master Go instructors.",
      },
      zh: {
        title: "圍棋培訓課程 | 宏觀大局觀與深度計算力 - EC 卓思棋院",
        description: "圍棋 (Go / Weiqi) 專業培訓。透過黑白博弈鍛煉千變萬化的宏觀大局觀、死活計算力與冷靜專注力。",
        keywords: ["圍棋課程", "香港學圍棋", "圍棋段位考級", "兒童圍棋啟蒙"],
        ogTitle: "圍棋培訓課程 | EC 卓思棋院 (香港)",
        ogDescription: "黑白博弈，啟發無窮智慧與深度專注力。",
      },
    } satisfies PageSeoConfig,

    // --- Shek Mun Teaching Point (Phonics Lab) ---
    shekMunPhonicsLab: {
      path: "/courses/shek-mun-phonics-lab",
      ogImage: "/1.webp",
      robots: { index: true, follow: true },
      en: {
        title: "Shek Mun Chess Teaching Point | EC Chess × Phonics Lab HK",
        description: "Official EC Chess Teaching Point at Phonics Lab Education (Kings Wing Plaza 2, Shek Mun, Shatin). Master coaching for International Chess, Xiangqi & Go.",
        keywords: [
          "shek mun chess class",
          "shatin chess coaching",
          "phonics lab chess",
          "kings wing plaza chess",
          "kids chess lessons shatin",
          "shek mun weiqi go"
        ],
        ogTitle: "Shek Mun Chess Teaching Point | EC Chess × Phonics Lab",
        ogDescription: "Professional chess, Xiangqi & Go courses at Kings Wing Plaza 2, Shek Mun, Shatin. Taught by certified master coaches.",
      },
      zh: {
        title: "沙田石門教學點 | EC 卓思棋院 × 英研教育 Phonics Lab - 專業棋藝培訓",
        description: "EC 卓思棋院進駐沙田石門京瑞廣場 2 期（英研教育 Phonics Lab）！由本院 FIDE 認證教練親授國際象棋、中國象棋及圍棋課程，現正接受試堂預約。",
        keywords: [
          "沙田學棋",
          "石門國際象棋班",
          "京瑞廣場棋院",
          "英研教育棋藝班",
          "石門圍棋班",
          "沙田象棋班"
        ],
        ogTitle: "沙田石門教學點 | EC 卓思棋院 × 英研教育 Phonics Lab",
        ogDescription: "沙田石門京瑞廣場 2 期專業棋藝教學點，國際象棋、中國象棋及圍棋課程現正熱烈招生！",
      },
    } satisfies PageSeoConfig,

    // --- Tournaments ---
    tournaments: {
      path: "/tournaments",
      ogImage: "/og-image.jpg",
      robots: { index: true, follow: true },
      en: {
        title: "Chess Tournaments & Competitions HK | EC Chess Academy",
        description: "Register for upcoming International Chess, Chinese Chess, and Go tournaments in Hong Kong. View schedules, pairings, and competition rules.",
        keywords: ["chess tournaments hong kong", "hk chess championship", "junior chess competition", "tournament registration"],
        ogTitle: "Chess Tournaments & Competitions | EC Chess Academy",
        ogDescription: "Register for upcoming official tournaments and challenge yourself against top players across Hong Kong.",
      },
      zh: {
        title: "比賽消息及賽事報名 | 香港棋藝公開錦標賽 - EC 卓思棋院",
        description: "緊貼最新國際象棋、中國象棋及圍棋賽事資訊。提供線上即時報名、賽程公佈及對局成績查詢。",
        keywords: ["香港象棋比賽", "國際象棋賽事", "圍棋公開賽", "棋藝比賽報名"],
        ogTitle: "比賽消息及賽事報名 | EC 卓思棋院 (香港)",
        ogDescription: "定期舉辦香港各級別公開錦標賽，提供專業實戰競技舞台。",
      },
    } satisfies PageSeoConfig,

    // --- Achievements ---
    achievements: {
      path: "/achievements",
      ogImage: "/og-image.jpg",
      robots: { index: true, follow: true },
      en: {
        title: "Student Achievements & Hall of Fame | EC Chess Academy HK",
        description: "Celebrate the awards, ratings, and tournament victories of EC Chess Academy students in local Hong Kong and international championships.",
        keywords: ["chess trophies hong kong", "chess awards hk", "student achievements chess", "fide rated students"],
        ogTitle: "Student Hall of Fame & Achievements | EC Chess Academy",
        ogDescription: "Discover how our students excel in Hong Kong championships and international FIDE rating events.",
      },
      zh: {
        title: "榮譽榜與學生獎項 | 學員奪冠紀錄 - EC 卓思棋院",
        description: "見證 EC 卓思棋院學員在全港及國際賽事中的卓越成就與榮譽，紀錄每一步成長與突破。",
        keywords: ["棋院榮譽榜", "學生比賽成績", "象棋冠軍", "國際象棋獎項"],
        ogTitle: "榮譽榜與學生獎項 | EC 卓思棋院 (香港)",
        ogDescription: "見證學員在各大賽事斬獲佳績，成就非凡棋藝之路。",
      },
    } satisfies PageSeoConfig,

    // --- Gallery ---
    gallery: {
      path: "/gallery",
      ogImage: "/og-image.jpg",
      robots: { index: true, follow: true },
      en: {
        title: "Photo & Video Gallery | Moments at EC Chess Academy HK",
        description: "Browse photos and highlights from our classroom lessons, holiday intensive camps, and high-stakes tournament competitions.",
        keywords: ["chess gallery hk", "chess camp photos", "chess classroom highlights"],
        ogTitle: "Photo Gallery | EC Chess Academy HK",
        ogDescription: "Explore classroom highlights, tournament moments, and awards ceremonies at EC Chess Academy.",
      },
      zh: {
        title: "活動花絮與精彩相冊 | 課堂與賽事實況 - EC 卓思棋院",
        description: "瀏覽課堂精彩互動、假期集訓營及賽事頒獎相片，感受學員專注投入的棋藝時刻。",
        keywords: ["活動花絮", "棋院課堂相片", "比賽相集", "集訓營活動"],
        ogTitle: "活動花絮與精彩相冊 | EC 卓思棋院 (香港)",
        ogDescription: "紀錄學員在課堂與賽事中的專注身影與喜悅時刻。",
      },
    } satisfies PageSeoConfig,

    // --- Blog ---
    blog: {
      path: "/blog",
      ogImage: "/og-image.jpg",
      robots: { index: true, follow: true },
      en: {
        title: "Chess Strategy Blog & Tips | Expert Guides | EC Chess Academy HK",
        description: "Read expert chess strategy articles, tactical guides, tournament preparation tips, and parenting advice on cognitive growth through chess.",
        keywords: ["chess blog hong kong", "chess opening guides", "kids cognitive training", "chess strategy articles"],
        ogTitle: "Chess Strategy & Insights Blog | EC Chess Academy HK",
        ogDescription: "Master tactical insights, opening strategies, and mental preparation with our coach-written articles.",
      },
      zh: {
        title: "棋藝專欄與策略網誌 | 專業棋理指南 - EC 卓思棋院",
        description: "探索由名師撰寫的開局分析、戰術指南、比賽心得及專注力培育專題文章，深入了解棋藝智慧。",
        keywords: ["棋藝網誌", "學棋技巧", "國際象棋指南", "兒童專注力提升", "象棋策略"],
        ogTitle: "棋藝專欄與策略網誌 | EC 卓思棋院 (香港)",
        ogDescription: "名師撰寫棋理與心法指南，助你全面提升對弈水平。",
      },
    } satisfies PageSeoConfig,

    // --- Contact Us ---
    contact: {
      path: "/contact",
      ogImage: "/og-image.jpg",
      robots: { index: true, follow: true },
      en: {
        title: "Contact Us | Kowloon City & Yuen Long Campuses | EC Chess Academy",
        description: "Get in touch with EC Chess Academy HK. Visit our campuses in Kowloon City and Yuen Long or message us via WhatsApp for inquiries and bookings.",
        keywords: ["contact ec chess", "kowloon city chess school", "yuen long chess school", "chess academy phone number"],
        ogTitle: "Contact EC Chess Academy HK",
        ogDescription: "Reach our Kowloon City & Yuen Long branches. Call or WhatsApp +852 4614 4561.",
      },
      zh: {
        title: "聯絡我們 | 九龍城及元朗旗艦分校 - EC 卓思棋院",
        description: "歡迎聯絡 EC 卓思棋院。查詢課程詳情、預約試堂或親臨九龍城與元朗分校參觀。",
        keywords: ["聯絡卓思棋院", "九龍城棋院地址", "元朗棋院地址", "棋院電話", "WhatsApp查詢"],
        ogTitle: "聯絡我們 | EC 卓思棋院 (香港)",
        ogDescription: "九龍城及元朗雙分校，歡迎致電或 WhatsApp (+852 4614 4561) 查詢。",
      },
    } satisfies PageSeoConfig,

    // --- Book Free Demo ---
    bookDemo: {
      path: "/book-demo",
      ogImage: "/demo.webp",
      robots: { index: true, follow: true },
      en: {
        title: "Book a Free Chess Trial Class | Assessment & Placement | EC Chess",
        description: "Book a free trial class and skill assessment at EC Chess Academy. Discover your child's chess potential with our FIDE-certified instructors.",
        keywords: ["free chess trial hk", "free demo chess class", "chess skill assessment hk"],
        ogTitle: "Book a Free Chess Trial Class | EC Chess Academy HK",
        ogDescription: "Experience an interactive trial session and personalized level assessment for your child.",
      },
      zh: {
        title: "預約免費試堂與棋力評估 | EC 卓思棋院",
        description: "立即預約免費試堂及專業棋力水平評估。讓孩子體驗國際象棋、中國象棋及圍棋的樂趣與思維挑戰。",
        keywords: ["預約試堂", "免費學棋試堂", "兒童棋力評估", "免費試學"],
        ogTitle: "預約免費試堂與棋力評估 | EC 卓思棋院 (香港)",
        ogDescription: "專業導師一對一棋力分析，為孩子度身訂造最適切的學習進階階梯。",
      },
    } satisfies PageSeoConfig,

    // --- Policies ---
    policies: {
      path: "/policies",
      robots: { index: true, follow: true },
      en: {
        title: "Academy Policies & Terms | EC Chess Academy HK",
        description: "Review EC Chess Academy policies on tuition, make-up classes, safety, and operational guidelines.",
        keywords: ["academy policies", "class regulations", "makeup policy"],
      },
      zh: {
        title: "學院政策及條款 | EC 卓思棋院",
        description: "查閱 EC 卓思棋院的上課守則、補堂機制、學費政策及安全指引。",
        keywords: ["上課守則", "補堂政策", "學院條款"],
      },
    } satisfies PageSeoConfig,

    // --- Terms ---
    terms: {
      path: "/terms",
      robots: { index: true, follow: true },
      en: {
        title: "Terms & Conditions | EC Chess Academy HK",
        description: "Official terms of service and website usage conditions for EC Chess Academy HK.",
        keywords: ["terms of service", "website terms", "ec chess terms"],
      },
      zh: {
        title: "服務條款與細則 | EC 卓思棋院",
        description: "EC 卓思棋院官方服務條款、網站使用守則與私隱條例。",
        keywords: ["服務條款", "使用守則", "私隱政策"],
      },
    } satisfies PageSeoConfig,
  },

  // ==============================================================================
  // 5. STRUCTURED DATA / SCHEMA.ORG (JSON-LD) CONFIGURATION
  // ==============================================================================
  structuredData: {
    organization: {
      nameEn: "EC Chess Academy HK",
      nameZh: "EC 卓思棋院 (香港)",
      alternateNames: ["EC Chess", "卓思棋院", "EC Chess Education"],
      descriptionEn: "Hong Kong's premier strategy academy offering expert FIDE-certified coaching for International Chess, Chinese Chess, and Go.",
      descriptionZh: "香港領先策略棋院，提供國際象棋、中國象棋及圍棋的專業 FIDE 認證訓練課程。",
      telephone: "+852 4614 4561",
      email: "enquiry.ecchess@gmail.com",
      priceRange: "$$",
      address: {
        streetAddress: "Room B, 3/F, 352 Prince Edward Road West, Kowloon City",
        addressLocality: "Kowloon City",
        addressRegion: "Kowloon",
        addressCountry: "HK",
      },
      geo: {
        latitude: "22.3275",
        longitude: "114.1882",
      },
      openingHours: [
        {
          days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
          opens: "09:00",
          closes: "19:00",
        },
      ],
    },

    // Course offerings for Schema.org OfferCatalog
    courses: [
      {
        nameEn: "International Chess Course (FIDE Standard)",
        nameZh: "國際象棋課程 (FIDE 標準)",
        descriptionEn: "Focuses on strategic vision, tactical calculation, and competition mindset.",
        descriptionZh: "專注培養大局觀、戰術計算及比賽心理素質。",
      },
      {
        nameEn: "Chinese Chess Course (Xiangqi)",
        nameZh: "中國象棋課程",
        descriptionEn: "Combines cultural heritage with offense-defense tactical thinking.",
        descriptionZh: "結合傳統文化與攻防博弈思維，強化空間佈局。",
      },
      {
        nameEn: "Go / Weiqi Course",
        nameZh: "圍棋課程",
        descriptionEn: "Develops deep calculations, territory control, and macro foresight.",
        descriptionZh: "鍛煉千變萬化的宏觀佈局與深度專注力。",
      },
    ],

    // FAQ Schema displayed in Google Search Results
    faqs: [
      {
        questionEn: "What is the best age for children to start learning chess?",
        questionZh: "幾歲開始學棋最合適？",
        answerEn: "Ages 3.5 to 4 are ideal for foundational introduction using fun games and visual stories. Children aged 6+ rapidly advance into tactical calculation and tournament play.",
        answerZh: "3.5至4歲是啟蒙的黃金期。我們透過趣味故事與遊戲化引導，在幼兒階段建立空間感與專注習慣；6歲以上則可快速進入戰術與競賽思維。",
      },
      {
        questionEn: "Do instructors possess recognized international qualifications?",
        questionZh: "導師是否具備國際認可資格？",
        answerEn: "Yes. Our senior coaching team holds FIDE official certifications, Hong Kong team representation, and over 15 years of proven elite training experience.",
        answerZh: "是。主教練團隊均持 FIDE 國際棋聯認證、香港代表隊資格及國家一級棋士資歷，具備 15 年以上名校及精英學員培訓經驗。",
      },
      {
        questionEn: "Do you offer in-person, online, or hybrid classes?",
        questionZh: "提供線上還是實體混合課程？",
        answerEn: "We provide in-person training at our Kowloon City and Yuen Long campuses, as well as 1-on-1 interactive online analysis systems for hybrid learning.",
        answerZh: "我們在九龍城及元朗設有實體旗艦分校，同時配備一對一高清互動線上覆盤系統，支援混合學習與彈性上課時間。",
      },
      {
        questionEn: "How do you track student progress and ratings?",
        questionZh: "如何追蹤學員的進度與段位？",
        answerEn: "Every student has an individualized progress profile with tactical assessments every 8-10 lessons, along with regular internal and HK rating tournament pathways.",
        answerZh: "每位學員均擁有專屬成長檔案，每 8-10 堂進行階段性戰術評估，定期安排香港積分錦標賽及升級推薦。",
      },
    ],
  },
};

/**
 * ==============================================================================
 * HELPER FUNCTIONS (Used internally by Next.js layouts and pages)
 * ==============================================================================
 */

export type PageKey = keyof typeof SEO_CONFIG.pages;

/**
 * Generates standard Next.js Metadata for any page key and locale
 */
export function getPageMetadata(pageKey: PageKey, locale: string = "en"): Metadata {
  const page: PageSeoConfig = SEO_CONFIG.pages[pageKey];
  const isZh = locale === "zh";
  const content = isZh ? page.zh : page.en;
  const site = SEO_CONFIG.site;
  const canonicalUrl = `${site.baseUrl}/${locale}${page.path}`;
  const ogImageUrl = page.ogImage || site.defaultImage;

  return {
    title: content.title,
    description: content.description,
    keywords: content.keywords,
    metadataBase: new URL(site.baseUrl),
    alternates: {
      canonical: `/${locale}${page.path}`,
      languages: {
        en: `/en${page.path}`,
        zh: `/zh${page.path}`,
        "x-default": `/en${page.path}`,
      },
    },
    openGraph: {
      title: content.ogTitle || content.title,
      description: content.ogDescription || content.description,
      url: canonicalUrl,
      siteName: isZh ? site.nameZh : site.name,
      locale: isZh ? "zh_HK" : "en_HK",
      type: "website",
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: content.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: content.ogTitle || content.title,
      description: content.ogDescription || content.description,
      images: [ogImageUrl],
      creator: site.twitterHandle,
    },
    robots: {
      index: page.robots?.index !== false,
      follow: page.robots?.follow !== false,
    },
  };
}

/**
 * Creates a standard Next.js generateMetadata function for localized routes
 */
export function createPageMetadata(pageKey: PageKey) {
  return async function generateMetadata({
    params,
  }: {
    params: { locale?: string };
  }): Promise<Metadata> {
    return getPageMetadata(pageKey, params?.locale || "en");
  };
}

