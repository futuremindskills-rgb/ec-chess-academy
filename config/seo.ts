import type { Metadata } from "next";

/**
 * ==============================================================================
 * EC CHESS ACADEMY - CENTRAL SEO CONFIGURATION FILE
 * ==============================================================================
 *
 * Instructions for the SEO Team:
 * 1. To update meta titles, descriptions, keywords, or social images for any page,
 *    edit the `pages` section below.
 * 2. Both English (`en`) and Traditional Chinese (`zh`, zh-Hant-HK) are supported
 *    per page. All Chinese copy must be Traditional Chinese (Hong Kong usage).
 * 3. To update site-wide details (domain, brand name, verification tokens, etc.),
 *    edit the `site` or `verification` sections.
 * 4. To update Google Rich Snippets / JSON-LD schemas (FAQs, branches, course
 *    catalog), edit the `structuredData` section below.
 *
 * Length guidelines (from the SEO audit):
 *   - EN title:        50-60 characters
 *   - EN description:  120-160 characters
 *   - ZH title:        about 20-30 characters (Google truncates CJK by pixel width)
 *   - ZH description:  about 60-90 characters
 *
 * Keyword strategy (from audit "Top Organic Keyword Rankings"):
 *   "chess hong kong" (390/mo), "hk chess" (390/mo), "hong kong chess club" (70/mo),
 *   "chess hk" (30/mo). These phrases are worked into the homepage and
 *   key landing page titles / descriptions / headings.
 * ==============================================================================
 */

// ------------------------------------------------------------------------------
// SHARED CONSTANTS (single source of truth for NAP consistency)
// ------------------------------------------------------------------------------
export type Locale = "en" | "zh";

/** Matches the Google Business Profile (Kowloon City). */
const PHONE_PRIMARY = "+852 4614 4561";
/** Number shown on the live website. CONFIRM which branch it belongs to. */
const PHONE_SECONDARY = "+852 5406 6800";

/**
 * Bump this date whenever page content / prices / schedules are meaningfully
 * updated. It feeds `dateModified` in JSON-LD (a freshness signal for Google and
 * AI search engines). Format: YYYY-MM-DD.
 */
const CONTENT_LAST_UPDATED = "2026-10-03";

export interface PageLocaleSeo {
  title: string;
  description: string;
  keywords?: string[];
  ogTitle?: string;
  ogDescription?: string;
  /** Descriptive alt text for the social-share image (falls back to title). */
  imageAlt?: string;
  /** Short label used in BreadcrumbList schema (falls back to title). */
  breadcrumb?: string;
}

export interface PageSeoConfig {
  path: string; // Relative path (e.g., "/about")
  ogImage?: string; // Optional custom OG image for this page (defaults to site.defaultImage)
  robots?: {
    index?: boolean;
    follow?: boolean;
  };
  en: PageLocaleSeo;
  zh: PageLocaleSeo;
}

export const SEO_CONFIG = {
  // ==========================================
  // 1. GLOBAL SITE CONFIGURATION
  // ==========================================
  site: {
    name: "EC Chess Academy HK",
    nameZh: "EC 卓思棋院 (香港)",
    baseUrl: "https://ecchess.com",
    defaultLocale: "en" as Locale,
    locales: ["en", "zh"] as const,
    // Value for <html lang="..."> per locale. Use getHtmlLang(locale) in the layout.
    htmlLang: { en: "en-HK", zh: "zh-Hant-HK" } as Record<Locale, string>,
    // Value for hreflang alternates per locale.
    hreflang: { en: "en-HK", zh: "zh-HK" } as Record<Locale, string>,
    ogLocale: { en: "en_HK", zh: "zh_HK" } as Record<Locale, string>,
    defaultImage: "/og-image.jpg", // Use 1200x630 JPG/PNG (avoid .webp for social previews)
    logoUrl: "https://ecchess.com/icon.png",
    themeColor: "#ffffff",
    twitterHandle: "@ecchess",
    foundingDate: "2010", // Inferred from the site's 2010-2026 copyright range. CONFIRM.
    lastUpdated: CONTENT_LAST_UPDATED,
  },

  // ==========================================
  // 2. VERIFICATION & TRACKING IDS
  // ==========================================
  verification: {
    googleSiteVerification: "google2927da2fac444a7f", // HTML-file token (served from /public). Not emitted as a meta tag.
    googleMetaToken: "", // Optional: content value of <meta name="google-site-verification">
    bingSiteVerification: "", // Optional: Bing Webmaster tools token (emitted as msvalidate.01)
    yandexVerification: "",
  },

  analytics: {
    googleAnalyticsId: "G-WVZSVNQNLW",
    googleTagManagerId: "GTM-KNXZDXMT",
  },

  // ==========================================
  // 3. SOCIAL MEDIA PROFILES (used for schema `sameAs`)
  // Keep identical to the links shown on the website footer.
  // ==========================================
  socialLinks: {
    facebook: "https://www.facebook.com/ecchess",
    instagram: "https://www.instagram.com/ec_chess/",
    twitter: "https://twitter.com/ecchess",
    linkedin: "https://www.linkedin.com/company/ecchess",
    // Channel URL as linked on the live site (the previous @ecchess handle did not match).
    youtube: "https://www.youtube.com/channel/UCFE9a760LSOF1d1k-MCfy4w",
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
        title: "Chess Hong Kong | Kids Chess, Xiangqi & Go | EC Chess HK",
        description:
          "FIDE-certified coaching in International Chess, Chinese Chess (Xiangqi) and Go (Weiqi) for kids and adults in Hong Kong. Join EC Chess Academy HK: free trial.",
        keywords: [
          "chess hong kong",
          "hk chess",
          "chess hk",
          "hong kong chess club",
          "chess academy hong kong",
          "kids chess classes hong kong",
          "fide chess coach hong kong",
          "chinese chess xiangqi classes hong kong",
          "go weiqi lessons hong kong",
          "chess lessons kowloon city",
          "chess classes yuen long",
          "chess classes shek mun shatin",
        ],
        ogTitle: "EC Chess Academy HK | Elite Chess & Strategy Training",
        ogDescription:
          "Hong Kong chess academy with FIDE-certified coaches for International Chess, Chinese Chess (Xiangqi) and Go (Weiqi). Kowloon City, Yuen Long & Shek Mun.",
        imageAlt: "EC Chess Academy HK - chess, Xiangqi and Go training in Hong Kong",
        breadcrumb: "Home",
      },
      zh: {
        title: "香港棋院 | 國際象棋、中國象棋、圍棋班 - EC 卓思棋院",
        description:
          "EC 卓思棋院 (香港) 提供國際象棋、中國象棋及圍棋課程，由 FIDE 認證教練親授，設九龍城、元朗及沙田石門教學點。適合 3.5 歲以上兒童及成人，歡迎預約免費試堂。",
        keywords: [
          "香港棋院",
          "香港國際象棋班",
          "兒童學棋",
          "中國象棋班",
          "圍棋班",
          "FIDE 認證教練",
          "九龍城棋院",
          "元朗棋院",
          "沙田石門棋藝班",
          "免費試堂",
        ],
        ogTitle: "EC 卓思棋院 (香港) | 精英棋藝與策略訓練",
        ogDescription:
          "香港專業棋院，提供國際象棋、中國象棋及圍棋課程。培養專注力、戰術計算及競技心態，歡迎預約免費試堂。",
        imageAlt: "EC 卓思棋院 (香港) - 國際象棋、中國象棋及圍棋培訓",
        breadcrumb: "首頁",
      },
    } satisfies PageSeoConfig,

    // --- About Us ---
    about: {
      path: "/about",
      ogImage: "/og-image.jpg",
      robots: { index: true, follow: true },
      en: {
        title: "About EC Chess Academy HK | FIDE-Certified Chess Coaches",
        description:
          "Meet the FIDE-certified coaches and Hong Kong representative players behind EC Chess Academy HK, with 15+ years of chess, Xiangqi and Go coaching.",
        keywords: [
          "about ec chess",
          "chess coaches hong kong",
          "fide certified instructors hk",
          "chess academy hong kong history",
        ],
        ogTitle: "About EC Chess Academy HK | Our Story & Elite Coaches",
        ogDescription:
          "Meet our FIDE-certified trainers and national-level masters dedicated to nurturing young chess champions in Hong Kong.",
        imageAlt: "EC Chess Academy HK coaching team and academy story",
        breadcrumb: "About Us",
      },
      zh: {
        title: "關於我們 | FIDE 認證棋藝導師 - EC 卓思棋院",
        description:
          "認識 EC 卓思棋院的 FIDE 認證教練與香港代表隊棋手團隊，擁有逾 15 年國際象棋、中國象棋及圍棋精英培訓經驗，培養思維敏銳的棋壇新星。",
        keywords: ["關於卓思棋院", "香港國際象棋教練", "FIDE 認證導師", "棋院簡介", "九龍城棋院"],
        ogTitle: "關於我們 | EC 卓思棋院 (香港)",
        ogDescription: "匯聚 FIDE 認證教練與香港代表隊棋手，提供頂尖的棋藝策略培訓。",
        imageAlt: "EC 卓思棋院 (香港) 導師團隊與辦學理念",
        breadcrumb: "關於我們",
      },
    } satisfies PageSeoConfig,

    // --- Courses (Overview) ---
    courses: {
      path: "/courses",
      ogImage: "/inter.jpg",
      robots: { index: true, follow: true },
      en: {
        title: "Chess, Xiangqi & Go Classes in Hong Kong | EC Chess HK",
        description:
          "Chess, Chinese Chess (Xiangqi) and Go courses for ages 3.5+, from beginners to tournament players. In-person classes in Hong Kong plus online options.",
        keywords: [
          "chess classes hong kong",
          "chess courses hk",
          "xiangqi lessons hong kong",
          "go weiqi courses hk",
          "kids chess lessons hong kong",
        ],
        ogTitle: "Chess, Xiangqi & Go Courses | EC Chess Academy HK",
        ogDescription:
          "Explore our full range of International Chess, Chinese Chess and Go courses for ages 3.5+ and every skill level.",
        imageAlt: "EC Chess Academy HK course overview - chess, Xiangqi and Go",
        breadcrumb: "Courses",
      },
      zh: {
        title: "棋藝課程 | 國際象棋、中國象棋、圍棋班 - EC 卓思棋院",
        description:
          "EC 卓思棋院提供國際象棋、中國象棋及圍棋課程，由 3.5 歲幼兒啟蒙班至精英競賽班，設實體課堂及線上教學，助學員循序漸進提升棋力。",
        keywords: ["棋藝課程", "香港棋藝班", "幼兒學棋", "兒童棋藝班", "國際象棋班", "圍棋入門班", "象棋比賽班"],
        ogTitle: "棋藝課程一覽 | EC 卓思棋院 (香港)",
        ogDescription: "由淺入深，系統化培育學員戰術計算、心理素質與棋理佈局。",
        imageAlt: "EC 卓思棋院 (香港) 課程一覽",
        breadcrumb: "課程",
      },
    } satisfies PageSeoConfig,

    // --- International Chess ---
    internationalChess: {
      path: "/international-chess",
      ogImage: "/chess.png",
      robots: { index: true, follow: true },
      en: {
        title: "International Chess Classes Hong Kong | FIDE Coaching",
        description:
          "FIDE-standard International Chess classes in Hong Kong. Learn openings, tactics and endgames with certified coaches and prepare for rated tournaments.",
        keywords: [
          "international chess hong kong",
          "chess classes hong kong",
          "fide chess training hk",
          "junior chess club hong kong",
          "chess lessons for kids hk",
        ],
        ogTitle: "International Chess Coaching | FIDE-Standard Courses HK",
        ogDescription:
          "Master tactical calculation, opening theory and endgame strategy with FIDE-certified trainers in Hong Kong.",
        imageAlt: "International Chess classes at EC Chess Academy HK",
        breadcrumb: "International Chess",
      },
      zh: {
        title: "國際象棋課程 | FIDE 認證教練授課 - EC 卓思棋院",
        description:
          "由 FIDE 認證教練親授國際象棋課程，系統學習開局理論、戰術組合及殘局技巧，培養大局觀與比賽心理素質，協助學員備戰國際等級分賽事。",
        keywords: ["國際象棋課程", "香港國際象棋班", "FIDE 認證教練", "兒童國際象棋", "國際象棋比賽培訓"],
        ogTitle: "國際象棋課程 | EC 卓思棋院 (香港)",
        ogDescription: "香港專業國際象棋訓練系統，助學員累積 FIDE 國際等級分。",
        imageAlt: "EC 卓思棋院 (香港) 國際象棋課堂",
        breadcrumb: "國際象棋",
      },
    } satisfies PageSeoConfig,

    // --- Chinese Chess (Xiangqi) ---
    chineseChess: {
      path: "/chinese-chess",
      ogImage: "/c-chess.png",
      robots: { index: true, follow: true },
      en: {
        title: "Chinese Chess (Xiangqi) Classes in Hong Kong | EC Chess",
        description:
          "Learn Chinese Chess (Xiangqi) in Hong Kong. Master openings, attack and defence, and endgame technique with master trainers, for kids and adults.",
        keywords: [
          "chinese chess hong kong",
          "xiangqi classes hong kong",
          "xiangqi lessons hk",
          "learn xiangqi",
          "chinese chess for kids hk",
        ],
        ogTitle: "Chinese Chess (Xiangqi) Classes | EC Chess Academy HK",
        ogDescription:
          "Rich cultural heritage meets sharp attacking and defensive calculation in our Xiangqi courses for all levels.",
        imageAlt: "Chinese Chess (Xiangqi) classes at EC Chess Academy HK",
        breadcrumb: "Chinese Chess",
      },
      zh: {
        title: "中國象棋課程 | 象棋班 - EC 卓思棋院 (香港)",
        description:
          "專業中國象棋班，系統教授開局、中局攻防及殘局殺法，結合中華棋藝文化與現代思維訓練，培養空間佈局、計算力與專注力，適合兒童及成人。",
        keywords: ["中國象棋課程", "香港象棋班", "兒童學象棋", "中國象棋戰術", "象棋入門班"],
        ogTitle: "中國象棋課程 | EC 卓思棋院 (香港)",
        ogDescription: "傳承千年中式智慧，鍛煉縱深佈局與攻守平衡。",
        imageAlt: "EC 卓思棋院 (香港) 中國象棋課堂",
        breadcrumb: "中國象棋",
      },
    } satisfies PageSeoConfig,

    // --- Go (Weiqi) ---
    // NOTE: route key/path keep the original "wieqi" spelling so existing routes and
    // imports do not break. If the route is renamed, add a 301 redirect.
    goWieqi: {
      path: "/go-wieqi",
      ogImage: "/go.png",
      robots: { index: true, follow: true },
      en: {
        title: "Go (Weiqi) Lessons in Hong Kong | EC Chess Academy HK",
        description:
          "Professional Go (Weiqi) coaching in Hong Kong. Build territory control, reading depth, intuition and calm focus, from first stones to advanced play.",
        keywords: [
          "go lessons hong kong",
          "weiqi classes hong kong",
          "learn go game hk",
          "weiqi academy hk",
          "kids go classes hong kong",
        ],
        ogTitle: "Go (Weiqi) Strategy Programs | EC Chess Academy HK",
        ogDescription:
          "Develop deep reading, territory control and big-picture foresight with experienced Go instructors in Hong Kong.",
        imageAlt: "Go (Weiqi) classes at EC Chess Academy HK",
        breadcrumb: "Go (Weiqi)",
      },
      zh: {
        title: "圍棋班 | 兒童及成人圍棋課程 - EC 卓思棋院 (香港)",
        description:
          "專業圍棋 (Weiqi) 課程，由入門至進階循序漸進，培養宏觀大局觀、死活計算力及冷靜專注力，適合兒童及成人學習。",
        keywords: ["圍棋課程", "香港圍棋班", "香港學圍棋", "兒童圍棋啟蒙", "圍棋入門班"],
        ogTitle: "圍棋課程 | EC 卓思棋院 (香港)",
        ogDescription: "黑白博弈，啟發無窮智慧與深度專注力。",
        imageAlt: "EC 卓思棋院 (香港) 圍棋課堂",
        breadcrumb: "圍棋",
      },
    } satisfies PageSeoConfig,

    // --- Shek Mun Teaching Point (Phonics Lab) ---
    shekMunPhonicsLab: {
      path: "/courses/shek-mun-phonics-lab",
      ogImage: "/1.webp", // TODO: replace with a 1200x630 JPG/PNG (WhatsApp/Facebook handle these more reliably than WebP)
      robots: { index: true, follow: true },
      en: {
        title: "Shek Mun Chess Classes | EC Chess x Phonics Lab, Shatin",
        description:
          "Official EC Chess teaching point at Phonics Lab Education, Kings Wing Plaza 2, Shek Mun, Shatin. Coaching in International Chess, Xiangqi & Go. Book a trial.",
        keywords: [
          "shek mun chess class",
          "shatin chess classes",
          "phonics lab chess",
          "kings wing plaza chess",
          "kids chess lessons shatin",
          "shek mun weiqi go",
        ],
        ogTitle: "Shek Mun Chess Classes | EC Chess x Phonics Lab",
        ogDescription:
          "Chess, Xiangqi & Go courses at Kings Wing Plaza 2, Shek Mun, Shatin, taught by certified EC Chess coaches.",
        imageAlt: "EC Chess teaching point at Phonics Lab, Shek Mun, Shatin",
        breadcrumb: "Shek Mun Teaching Point",
      },
      zh: {
        title: "沙田石門學棋 | EC 卓思棋院 × 英研教育 Phonics Lab",
        description:
          "EC 卓思棋院進駐沙田石門京瑞廣場 2 期（英研教育 Phonics Lab），由本院 FIDE 認證教練親授國際象棋、中國象棋及圍棋課程，現正接受試堂預約。",
        keywords: [
          "沙田學棋",
          "石門國際象棋班",
          "京瑞廣場棋院",
          "英研教育棋藝班",
          "石門圍棋班",
          "沙田象棋班",
        ],
        ogTitle: "沙田石門教學點 | EC 卓思棋院 × 英研教育 Phonics Lab",
        ogDescription: "沙田石門京瑞廣場 2 期專業棋藝教學點，國際象棋、中國象棋及圍棋課程現正招生。",
        imageAlt: "EC 卓思棋院 × 英研教育 Phonics Lab 沙田石門教學點",
        breadcrumb: "沙田石門教學點",
      },
    } satisfies PageSeoConfig,

    // --- Tournaments ---
    tournaments: {
      path: "/tournaments",
      ogImage: "/og-image.jpg",
      robots: { index: true, follow: true },
      en: {
        title: "Chess Tournaments Hong Kong | Events & Registration",
        description:
          "Find upcoming International Chess, Chinese Chess and Go tournaments in Hong Kong. View schedules and register online with EC Chess Academy HK.",
        keywords: [
          "chess tournaments hong kong",
          "hk chess championship",
          "junior chess competition hk",
          "chess tournament registration",
        ],
        ogTitle: "Chess Tournaments & Competitions | EC Chess Academy HK",
        ogDescription:
          "Register for upcoming tournaments and test your skills against top players across Hong Kong.",
        imageAlt: "Chess tournaments and competitions in Hong Kong - EC Chess Academy HK",
        breadcrumb: "Tournaments",
      },
      zh: {
        title: "香港棋藝比賽 | 賽事消息及報名 - EC 卓思棋院",
        description:
          "緊貼香港最新國際象棋、中國象棋及圍棋賽事資訊，提供賽程公佈及線上報名，適合各年齡及程度的棋手累積實戰經驗、挑戰自我。",
        keywords: ["香港象棋比賽", "香港國際象棋賽事", "圍棋公開賽", "棋藝比賽報名", "兒童棋藝比賽"],
        ogTitle: "比賽消息及賽事報名 | EC 卓思棋院 (香港)",
        ogDescription: "定期舉辦及推薦香港各級別公開賽，提供專業實戰競技舞台。",
        imageAlt: "香港棋藝比賽 - EC 卓思棋院",
        breadcrumb: "賽事",
      },
    } satisfies PageSeoConfig,

    // --- Achievements ---
    achievements: {
      path: "/achievements",
      ogImage: "/og-image.jpg",
      robots: { index: true, follow: true },
      en: {
        title: "Student Achievements & Hall of Fame | EC Chess Academy HK",
        description:
          "See the awards, rating gains and tournament victories of EC Chess Academy HK students in Hong Kong and international chess championships.",
        keywords: [
          "chess trophies hong kong",
          "chess awards hk",
          "student chess achievements",
          "fide rated students hong kong",
        ],
        ogTitle: "Student Hall of Fame & Achievements | EC Chess Academy",
        ogDescription:
          "Discover how our students excel in Hong Kong championships and international rated events.",
        imageAlt: "EC Chess Academy HK student awards and tournament victories",
        breadcrumb: "Achievements",
      },
      zh: {
        title: "榮譽榜 | 學員比賽成績及獎項 - EC 卓思棋院",
        description:
          "見證 EC 卓思棋院學員在全港及國際賽事中的優異成績與榮譽，包括獎項、等級分進步及比賽冠軍，紀錄每一步成長與突破。",
        keywords: ["棋院榮譽榜", "學生比賽成績", "象棋冠軍", "國際象棋獎項", "香港棋藝比賽成績"],
        ogTitle: "榮譽榜與學員獎項 | EC 卓思棋院 (香港)",
        ogDescription: "見證學員在各大賽事斬獲佳績，成就非凡棋藝之路。",
        imageAlt: "EC 卓思棋院 (香港) 學員獎項及賽事成績",
        breadcrumb: "榮譽榜",
      },
    } satisfies PageSeoConfig,

    // --- Gallery ---
    gallery: {
      path: "/gallery",
      ogImage: "/og-image.jpg",
      robots: { index: true, follow: true },
      en: {
        title: "Photo Gallery | Classes, Camps & Events | EC Chess HK",
        description:
          "Browse photos and highlights from EC Chess Academy HK classes, holiday camps and tournament days, and see our students in action.",
        keywords: ["chess gallery hk", "chess camp photos hong kong", "chess class highlights"],
        ogTitle: "Photo Gallery | EC Chess Academy HK",
        ogDescription:
          "Classroom highlights, tournament moments and award ceremonies at EC Chess Academy HK.",
        imageAlt: "EC Chess Academy HK class and event photo gallery",
        breadcrumb: "Gallery",
      },
      zh: {
        title: "活動花絮 | 課堂、集訓營及賽事相片 - EC 卓思棋院",
        description:
          "瀏覽 EC 卓思棋院課堂互動、假期集訓營及賽事頒獎的精彩相片，感受學員專注投入的棋藝時刻與愉快的學習氣氛。",
        keywords: ["活動花絮", "棋院課堂相片", "比賽相集", "集訓營活動"],
        ogTitle: "活動花絮與精彩相冊 | EC 卓思棋院 (香港)",
        ogDescription: "紀錄學員在課堂與賽事中的專注身影與喜悅時刻。",
        imageAlt: "EC 卓思棋院 (香港) 課堂及活動相冊",
        breadcrumb: "相冊",
      },
    } satisfies PageSeoConfig,

    // --- Blog ---
    blog: {
      path: "/blog",
      ogImage: "/og-image.jpg",
      robots: { index: true, follow: true },
      en: {
        title: "Chess Strategy Blog & Tips for Kids | EC Chess Academy HK",
        description:
          "Expert chess strategy articles, tactics guides, tournament preparation tips and parenting advice on building focus and thinking skills through chess.",
        keywords: [
          "chess blog hong kong",
          "chess tips for kids",
          "chess opening guides",
          "chess strategy articles",
          "benefits of chess for children",
        ],
        ogTitle: "Chess Strategy & Insights Blog | EC Chess Academy HK",
        ogDescription:
          "Tactical insights, opening strategies and mental preparation from our coaches.",
        imageAlt: "EC Chess Academy HK blog - chess strategy and parenting tips",
        breadcrumb: "Blog",
      },
      zh: {
        title: "棋藝專欄 | 學棋技巧與策略指南 - EC 卓思棋院",
        description:
          "閱讀教練撰寫的開局分析、戰術指南、比賽心得及兒童專注力培育文章，深入了解學棋的好處與進階心法，助家長及學員全面掌握棋藝知識。",
        keywords: ["棋藝專欄", "學棋技巧", "國際象棋指南", "兒童專注力提升", "學棋好處", "象棋策略"],
        ogTitle: "棋藝專欄與策略網誌 | EC 卓思棋院 (香港)",
        ogDescription: "教練撰寫棋理與心法指南，助你全面提升對弈水平。",
        imageAlt: "EC 卓思棋院 (香港) 棋藝專欄",
        breadcrumb: "棋藝專欄",
      },
    } satisfies PageSeoConfig,

    // --- Contact Us ---
    contact: {
      path: "/contact",
      ogImage: "/og-image.jpg",
      robots: { index: true, follow: true },
      en: {
        title: "Contact EC Chess Academy HK | Kowloon City & Yuen Long",
        description: `Contact EC Chess Academy HK. Visit our Kowloon City, Yuen Long and Shek Mun locations, or call / WhatsApp ${PHONE_PRIMARY} to enquire or book a trial class.`,
        keywords: [
          "contact ec chess",
          "chess school kowloon city",
          "chess school yuen long",
          "chess academy hong kong phone",
        ],
        ogTitle: "Contact EC Chess Academy HK",
        ogDescription: `Reach our Kowloon City, Yuen Long and Shek Mun locations. Call or WhatsApp ${PHONE_PRIMARY}.`,
        imageAlt: "Contact EC Chess Academy HK - Kowloon City, Yuen Long and Shek Mun",
        breadcrumb: "Contact Us",
      },
      zh: {
        title: "聯絡我們 | 九龍城、元朗及石門 - EC 卓思棋院",
        description: `歡迎聯絡 EC 卓思棋院，查詢課程詳情、預約免費試堂，或親臨九龍城、元朗及沙田石門參觀。電話及 WhatsApp：${PHONE_PRIMARY}。`,
        keywords: ["聯絡卓思棋院", "九龍城棋院地址", "元朗棋院地址", "棋院電話", "WhatsApp 查詢"],
        ogTitle: "聯絡我們 | EC 卓思棋院 (香港)",
        ogDescription: `九龍城、元朗及沙田石門，歡迎致電或 WhatsApp (${PHONE_PRIMARY}) 查詢。`,
        imageAlt: "聯絡 EC 卓思棋院 (香港)",
        breadcrumb: "聯絡我們",
      },
    } satisfies PageSeoConfig,

    // --- Book Free Demo ---
    bookDemo: {
      path: "/book-demo",
      ogImage: "/demo.webp", // TODO: replace with a 1200x630 JPG/PNG for reliable social previews
      robots: { index: true, follow: true },
      en: {
        title: "Book a Free Chess Trial Class | EC Chess Academy HK",
        description:
          "Book a free chess trial class and skill assessment in Hong Kong. Our FIDE-certified coaches will find the right level and class for your child.",
        keywords: [
          "free chess trial class hong kong",
          "chess trial lesson hk",
          "chess skill assessment hk",
          "book chess class",
        ],
        ogTitle: "Book a Free Chess Trial Class | EC Chess Academy HK",
        ogDescription:
          "Try an interactive trial lesson and get a personalised level assessment for your child.",
        imageAlt: "Book a free trial class at EC Chess Academy HK",
        breadcrumb: "Book a Free Trial",
      },
      zh: {
        title: "預約免費試堂 | 棋力評估 - EC 卓思棋院 (香港)",
        description:
          "立即預約免費試堂及棋力評估，由 FIDE 認證教練了解孩子程度，並推薦最適合的國際象棋、中國象棋或圍棋課程，輕鬆踏出學棋第一步。",
        keywords: ["預約試堂", "免費學棋試堂", "兒童棋力評估", "香港棋藝試堂"],
        ogTitle: "預約免費試堂與棋力評估 | EC 卓思棋院 (香港)",
        ogDescription: "專業導師評估棋力，為孩子度身訂造最適切的學習進程。",
        imageAlt: "預約 EC 卓思棋院 (香港) 免費試堂",
        breadcrumb: "預約試堂",
      },
    } satisfies PageSeoConfig,

    // --- Policies ---
    policies: {
      path: "/policies",
      robots: { index: true, follow: true },
      en: {
        title: "Academy Policies | Tuition, Make-Up Classes & Safety",
        description:
          "Review EC Chess Academy HK policies on tuition payment, make-up classes, student safety and class guidelines for parents and students.",
        keywords: ["chess academy policies", "class regulations", "make-up class policy"],
        breadcrumb: "Policies",
      },
      zh: {
        title: "學院政策 | 學費、補堂及安全指引 - EC 卓思棋院",
        description:
          "查閱 EC 卓思棋院的上課守則、補堂安排、學費政策及學員安全指引，讓家長及學員在報讀前清楚了解各項安排與規定。",
        keywords: ["上課守則", "補堂政策", "學費安排", "學院條款"],
        breadcrumb: "學院政策",
      },
    } satisfies PageSeoConfig,

    // --- Terms ---
    terms: {
      path: "/terms",
      robots: { index: true, follow: true },
      en: {
        title: "Terms & Conditions | Enrolment & Website Use | EC Chess HK",
        description:
          "Official terms of service and website usage conditions for EC Chess Academy HK, including enrolment and privacy information.",
        keywords: ["terms of service", "website terms", "ec chess terms"],
        breadcrumb: "Terms & Conditions",
      },
      zh: {
        title: "服務條款與細則 | EC 卓思棋院 (香港)",
        description:
          "EC 卓思棋院 (香港) 官方服務條款，涵蓋報名細則、網站使用守則及私隱政策，保障學員、家長及本院的權益。",
        keywords: ["服務條款", "使用守則", "私隱政策"],
        breadcrumb: "服務條款",
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
      alternateNames: ["EC Chess", "卓思棋院", "EC Chess Education", "EC Chess Academy"],
      // TODO: if the academy previously traded as "Kidult Chess Academy" (the audit shows
      // you rank for that term), add it to alternateNames above. Do NOT add it otherwise.
      descriptionEn:
        "Hong Kong chess academy offering FIDE-certified coaching in International Chess, Chinese Chess (Xiangqi) and Go (Weiqi) for children and adults, with locations in Kowloon City, Yuen Long and Shek Mun.",
      descriptionZh:
        "香港專業棋院，提供由 FIDE 認證教練親授的國際象棋、中國象棋及圍棋課程，適合兒童及成人，設九龍城、元朗及沙田石門教學點。",
      sloganEn: "Building Brilliant Minds Through Chess.",
      sloganZh: "以棋育人，啟迪智慧。",
      telephone: PHONE_PRIMARY, // Matches Google Business Profile
      email: "enquiry.ecchess@gmail.com",
      /**
       * The audit flagged plain-text email addresses (spam-scraper risk). JSON-LD is
       * part of the raw HTML, so the email is OMITTED from schema by default. Set to
       * true only if you accept that trade-off.
       */
      exposeEmailInSchema: false,
      priceRange: "$$",
      address: {
        streetAddress: "Room B, 3/F, 352 Prince Edward Road West, Kowloon City",
        addressLocality: "Kowloon City",
        addressRegion: "Kowloon",
        addressCountry: "HK",
      },
      // TODO: verify against Google Maps (right-click the pin > copy coordinates).
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
      areaServed: ["Hong Kong", "Kowloon City", "Yuen Long", "Sha Tin"],
      knowsAbout: [
        "International Chess",
        "Chinese Chess (Xiangqi)",
        "Go (Weiqi)",
        "FIDE chess coaching",
        "Children's cognitive development through chess",
      ],
      /**
       * Both numbers appear on the live site (the audit detected +852 5406 6800 on the
       * page while Google Business Profile lists +852 4614 4561). Keep the NAP
       * identical everywhere and label each number below.
       */
      contactPoints: [
        { telephone: PHONE_PRIMARY, contactType: "customer service", availableLanguage: ["English", "Chinese"] },
        { telephone: PHONE_SECONDARY, contactType: "customer service", availableLanguage: ["English", "Chinese"] },
      ],
    },

    /**
     * Physical locations. Each becomes its own LocalBusiness node in the JSON-LD graph.
     * Empty strings are automatically omitted from the output.
     * TODO (important): the audit found the Yuen Long LocalBusiness schema had NO street
     * address, and the page showed no address either. Fill `streetAddress` below.
     */
    branches: [
      {
        id: "kowloon-city",
        nameEn: "EC Chess Academy HK - Kowloon City",
        nameZh: "EC 卓思棋院 (香港) - 九龍城校",
        telephone: PHONE_PRIMARY,
        streetAddress: "Room B, 3/F, 352 Prince Edward Road West",
        addressLocality: "Kowloon City",
        addressRegion: "Kowloon",
        latitude: "22.3275",
        longitude: "114.1882",
      },
      {
        id: "yuen-long",
        nameEn: "EC Chess Academy HK - Yuen Long",
        nameZh: "EC 卓思棋院 (香港) - 元朗校",
        telephone: "", // TODO: add the Yuen Long phone number if different (possibly PHONE_SECONDARY)
        streetAddress: "", // TODO: REQUIRED - add the full Yuen Long street address
        addressLocality: "Yuen Long",
        addressRegion: "New Territories",
        latitude: "",
        longitude: "",
      },
      {
        id: "shek-mun",
        nameEn: "EC Chess Academy HK - Shek Mun Teaching Point (Phonics Lab)",
        nameZh: "EC 卓思棋院 (香港) - 沙田石門教學點 (英研教育 Phonics Lab)",
        telephone: "",
        streetAddress: "Phonics Lab Education, Kings Wing Plaza 2, Shek Mun", // TODO: add street number
        addressLocality: "Sha Tin",
        addressRegion: "New Territories",
        latitude: "",
        longitude: "",
      },
    ],

    // Course offerings for Schema.org OfferCatalog. `pageKey` links each course to its landing page.
    courses: [
      {
        pageKey: "internationalChess" as const,
        nameEn: "International Chess Course (FIDE Standard)",
        nameZh: "國際象棋課程 (FIDE 標準)",
        descriptionEn:
          "FIDE-standard International Chess course focusing on strategic vision, opening theory, tactical calculation, endgames and competition mindset.",
        descriptionZh: "FIDE 標準國際象棋課程，專注培養大局觀、開局理論、戰術計算、殘局技巧及比賽心理素質。",
      },
      {
        pageKey: "chineseChess" as const,
        nameEn: "Chinese Chess Course (Xiangqi)",
        nameZh: "中國象棋課程",
        descriptionEn:
          "Xiangqi course combining cultural heritage with attack-and-defence tactical thinking and spatial planning.",
        descriptionZh: "結合中華棋藝文化與攻防博弈思維，強化空間佈局、計算力與專注力。",
      },
      {
        pageKey: "goWieqi" as const,
        nameEn: "Go / Weiqi Course",
        nameZh: "圍棋課程",
        descriptionEn:
          "Go (Weiqi) course developing deep reading, territory control, big-picture foresight and calm focus.",
        descriptionZh: "培養宏觀大局觀、深度計算力、地域掌控及冷靜專注力的圍棋課程。",
      },
    ],

    /**
     * FAQ Schema.
     * IMPORTANT: Google requires FAQ markup to match content that is VISIBLE on the page.
     * The audit noted that on the live homepage only one Q&A answer was visibly developed.
     * Make sure every question + full answer below is rendered in the page HTML (not hidden
     * behind client-side-only accordions), or remove the ones that are not shown.
     * Note: Google now shows FAQ rich results only for a few site types, but this content is
     * still valuable for AI search / LLM answer engines (the "Answer Alignment" audit check).
     */
    faqs: [
      {
        questionEn: "What is the best age for children to start learning chess?",
        questionZh: "幾歲開始學棋最合適？",
        answerEn:
          "Ages 3.5 to 4 are ideal for foundational introduction using fun games and visual stories. Children aged 6+ rapidly advance into tactical calculation and tournament play.",
        answerZh:
          "3.5 至 4 歲是啟蒙的黃金期。我們透過趣味故事與遊戲化引導，在幼兒階段建立空間感與專注習慣；6 歲以上則可快速進入戰術與競賽思維。",
      },
      {
        questionEn: "Do instructors possess recognized international qualifications?",
        questionZh: "導師是否具備國際認可資格？",
        answerEn:
          "Yes. Our senior coaching team holds FIDE official certifications, Hong Kong team representation, and over 15 years of proven elite training experience.",
        answerZh:
          "是。主教練團隊均持 FIDE 國際棋聯認證、香港代表隊資格及國家一級棋士資歷，具備 15 年以上名校及精英學員培訓經驗。",
      },
      {
        questionEn: "Do you offer in-person, online, or hybrid classes?",
        questionZh: "提供線上還是實體混合課程？",
        answerEn:
          "We provide in-person training at our Kowloon City and Yuen Long campuses, as well as 1-on-1 interactive online analysis systems for hybrid learning.",
        answerZh:
          "我們在九龍城及元朗設有實體分校，同時配備一對一高清互動線上覆盤系統，支援混合學習與彈性上課時間。",
      },
      {
        questionEn: "How do you track student progress and ratings?",
        questionZh: "如何追蹤學員的進度與段位？",
        answerEn:
          "Every student has an individualized progress profile with tactical assessments every 8-10 lessons, along with regular internal and HK rating tournament pathways.",
        answerZh:
          "每位學員均擁有專屬成長檔案，每 8-10 堂進行階段性戰術評估，定期安排香港積分賽及升級推薦。",
      },
      {
        questionEn: "How can I book a free trial class?",
        questionZh: "如何預約免費試堂？",
        answerEn:
          "Use the Book a Free Trial page or message us on WhatsApp. A coach will assess your child's current level and recommend the most suitable class.",
        answerZh:
          "可透過網站「預約試堂」頁面，或以 WhatsApp 與我們聯絡。教練會評估孩子現時的棋力，並推薦最適合的課程。",
      },
      {
        questionEn: "Where are your chess classes located in Hong Kong?",
        questionZh: "棋藝班設於香港哪些地區？",
        answerEn:
          "We teach at our Kowloon City and Yuen Long campuses, and at our Shek Mun teaching point in Sha Tin (Phonics Lab Education, Kings Wing Plaza 2).",
        answerZh:
          "我們於九龍城及元朗設有分校，另在沙田石門京瑞廣場 2 期（英研教育 Phonics Lab）設有教學點。",
      },
      {
        questionEn: "Which games do you teach?",
        questionZh: "提供哪些棋類課程？",
        answerEn:
          "We teach International Chess, Chinese Chess (Xiangqi) and Go (Weiqi), from beginner classes for ages 3.5+ to advanced and tournament preparation.",
        answerZh:
          "我們提供國際象棋、中國象棋及圍棋課程，由 3.5 歲以上的啟蒙班，到進階及比賽培訓班均有開辦。",
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

function isLocale(value: string): value is Locale {
  return (SEO_CONFIG.site.locales as readonly string[]).includes(value);
}

function resolveLocale(locale?: string): Locale {
  return locale && isLocale(locale) ? locale : SEO_CONFIG.site.defaultLocale;
}

function getPage(pageKey: PageKey): PageSeoConfig {
  return SEO_CONFIG.pages[pageKey];
}

function pageUrl(pageKey: PageKey, locale: Locale): string {
  return `${SEO_CONFIG.site.baseUrl}/${locale}${getPage(pageKey).path}`;
}

/** Value for <html lang="..."> (e.g. "en-HK" / "zh-Hant-HK"). */
export function getHtmlLang(locale?: string): string {
  return SEO_CONFIG.site.htmlLang[resolveLocale(locale)];
}

/**
 * Generates standard Next.js Metadata for any page key and locale
 */
export function getPageMetadata(pageKey: PageKey, locale: string = "en"): Metadata {
  const loc = resolveLocale(locale);
  const page = getPage(pageKey);
  const content = page[loc];
  const site = SEO_CONFIG.site;
  const otherLoc: Locale = loc === "en" ? "zh" : "en";
  const siteName = loc === "zh" ? site.nameZh : site.name;
  const canonicalUrl = `${site.baseUrl}/${loc}${page.path}`;
  const ogImageUrl = page.ogImage || site.defaultImage;
  const imageAlt = content.imageAlt || content.title;
  const index = page.robots?.index !== false;
  const follow = page.robots?.follow !== false;

  const v = SEO_CONFIG.verification;
  const verification: NonNullable<Metadata["verification"]> = {};
  if (v.googleMetaToken) verification.google = v.googleMetaToken;
  if (v.yandexVerification) verification.yandex = v.yandexVerification;
  if (v.bingSiteVerification) verification.other = { "msvalidate.01": v.bingSiteVerification };

  return {
    metadataBase: new URL(site.baseUrl),
    // `absolute` stops a root-layout title template from appending the brand twice.
    title: { absolute: content.title },
    description: content.description,
    keywords: content.keywords,
    applicationName: siteName,
    authors: [{ name: site.name, url: site.baseUrl }],
    creator: site.name,
    publisher: site.name,
    category: "education",
    alternates: {
      canonical: `/${loc}${page.path}`,
      languages: {
        [site.hreflang.en]: `/en${page.path}`,
        [site.hreflang.zh]: `/zh${page.path}`,
        "x-default": `/en${page.path}`,
      },
    },
    openGraph: {
      title: content.ogTitle || content.title,
      description: content.ogDescription || content.description,
      url: canonicalUrl,
      siteName,
      locale: site.ogLocale[loc],
      alternateLocale: [site.ogLocale[otherLoc]],
      type: "website",
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: imageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: content.ogTitle || content.title,
      description: content.ogDescription || content.description,
      images: [{ url: ogImageUrl, alt: imageAlt }],
      site: site.twitterHandle,
      creator: site.twitterHandle,
    },
    robots: {
      index,
      follow,
      googleBot: {
        index,
        follow,
        // Allow large image previews and full text snippets in Google results / AI Overviews.
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    ...(Object.keys(verification).length > 0 ? { verification } : {}),
  };
}

/**
 * Creates a standard Next.js generateMetadata function for localized routes.
 * Works with both Next.js 14 (sync params) and 15+ (Promise params).
 */
export function createPageMetadata(pageKey: PageKey) {
  return async function generateMetadata({
    params,
  }: {
    params: Promise<{ locale?: string }> | { locale?: string };
  }): Promise<Metadata> {
    const resolved = await params;
    return getPageMetadata(pageKey, resolved?.locale || "en");
  };
}

/**
 * ==============================================================================
 * JSON-LD BUILDERS (Schema.org)
 * ==============================================================================
 * Usage in a layout or page (server component):
 *
 *   <script
 *     type="application/ld+json"
 *     dangerouslySetInnerHTML={{ __html: JSON.stringify(getSiteJsonLd(locale)) }}
 *   />
 *
 * - getSiteJsonLd(locale)            -> put once in the root/locale layout
 * - getWebPageJsonLd(pageKey, locale) -> every page (adds dateModified freshness signal)
 * - getBreadcrumbJsonLd(pageKey, locale) -> every non-home page
 * - getFaqJsonLd(locale)             -> only on pages that visibly show the FAQ
 *
 * Empty values (e.g. an unfilled branch address) are stripped automatically.
 */

/** Recursively removes empty strings, null/undefined, empty arrays and empty objects. */
function prune<T>(value: T): T {
  if (Array.isArray(value)) {
    const arr = value.map((item) => prune(item)).filter((item) => item !== undefined);
    return (arr.length > 0 ? arr : undefined) as T;
  }
  if (value && typeof value === "object") {
    const entries = Object.entries(value as Record<string, unknown>)
      .map(([k, val]) => [k, prune(val)] as const)
      .filter(([, val]) => val !== undefined);
    return (entries.length > 0 ? Object.fromEntries(entries) : undefined) as T;
  }
  if (value === "" || value === null || value === undefined) return undefined as T;
  return value;
}

const ORG_ID = () => `${SEO_CONFIG.site.baseUrl}/#organization`;
const WEBSITE_ID = () => `${SEO_CONFIG.site.baseUrl}/#website`;

export function getSiteJsonLd(locale: string = "en") {
  const loc = resolveLocale(locale);
  const isZh = loc === "zh";
  const { site, socialLinks, structuredData: sd } = SEO_CONFIG;
  const org = sd.organization;
  const imageUrl = `${site.baseUrl}${site.defaultImage}`;

  const organization = {
    "@type": ["EducationalOrganization", "LocalBusiness"],
    "@id": ORG_ID(),
    name: isZh ? org.nameZh : org.nameEn,
    alternateName: org.alternateNames,
    url: `${site.baseUrl}/${loc}`,
    logo: { "@type": "ImageObject", url: site.logoUrl },
    image: imageUrl,
    description: isZh ? org.descriptionZh : org.descriptionEn,
    slogan: isZh ? org.sloganZh : org.sloganEn,
    foundingDate: site.foundingDate,
    telephone: org.telephone,
    email: org.exposeEmailInSchema ? org.email : undefined,
    priceRange: org.priceRange,
    address: {
      "@type": "PostalAddress",
      streetAddress: org.address.streetAddress,
      addressLocality: org.address.addressLocality,
      addressRegion: org.address.addressRegion,
      addressCountry: org.address.addressCountry,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: org.geo.latitude,
      longitude: org.geo.longitude,
    },
    openingHoursSpecification: org.openingHours.map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: h.days,
      opens: h.opens,
      closes: h.closes,
    })),
    areaServed: org.areaServed.map((name) => ({ "@type": "AdministrativeArea", name })),
    knowsAbout: org.knowsAbout,
    contactPoint: org.contactPoints.map((c) => ({
      "@type": "ContactPoint",
      telephone: c.telephone,
      contactType: c.contactType,
      availableLanguage: c.availableLanguage,
    })),
    sameAs: Object.values(socialLinks),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: isZh ? "棋藝課程" : "Chess, Xiangqi & Go Courses",
      itemListElement: sd.courses.map((course) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Course",
          name: isZh ? course.nameZh : course.nameEn,
          description: isZh ? course.descriptionZh : course.descriptionEn,
          url: pageUrl(course.pageKey, loc),
          provider: { "@id": ORG_ID() },
          audience: { "@type": "PeopleAudience", suggestedMinAge: 3.5 },
        },
      })),
    },
  };

  const website = {
    "@type": "WebSite",
    "@id": WEBSITE_ID(),
    url: `${site.baseUrl}/${loc}`,
    name: isZh ? site.nameZh : site.name,
    inLanguage: site.htmlLang[loc],
    publisher: { "@id": ORG_ID() },
  };

  const branches = sd.branches.map((b) => ({
    "@type": "LocalBusiness",
    "@id": `${site.baseUrl}/#branch-${b.id}`,
    name: isZh ? b.nameZh : b.nameEn,
    parentOrganization: { "@id": ORG_ID() },
    url: `${site.baseUrl}/${loc}/contact`,
    telephone: b.telephone,
    image: imageUrl,
    priceRange: org.priceRange,
    address: {
      "@type": "PostalAddress",
      streetAddress: b.streetAddress,
      addressLocality: b.addressLocality,
      addressRegion: b.addressRegion,
      addressCountry: "HK",
    },
    geo:
      b.latitude && b.longitude
        ? { "@type": "GeoCoordinates", latitude: b.latitude, longitude: b.longitude }
        : undefined,
  }));

  return prune({
    "@context": "https://schema.org",
    "@graph": [organization, website, ...branches],
  });
}

export function getWebPageJsonLd(pageKey: PageKey, locale: string = "en") {
  const loc = resolveLocale(locale);
  const content = getPage(pageKey)[loc];
  const url = pageUrl(pageKey, loc);

  return prune({
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: content.title,
    description: content.description,
    inLanguage: SEO_CONFIG.site.htmlLang[loc],
    isPartOf: { "@id": WEBSITE_ID() },
    about: { "@id": ORG_ID() },
    dateModified: SEO_CONFIG.site.lastUpdated,
  });
}

export function getBreadcrumbJsonLd(pageKey: PageKey, locale: string = "en") {
  const loc = resolveLocale(locale);
  const page = getPage(pageKey);
  const home = SEO_CONFIG.pages.home;

  const trail: { name: string; url: string }[] = [
    { name: home[loc].breadcrumb || home[loc].title, url: pageUrl("home", loc) },
  ];

  // Course landing pages sit under "Courses" in the information architecture.
  const courseChildKeys: PageKey[] = ["internationalChess", "chineseChess", "goWieqi", "shekMunPhonicsLab"];
  if (courseChildKeys.includes(pageKey)) {
    trail.push({
      name: SEO_CONFIG.pages.courses[loc].breadcrumb || SEO_CONFIG.pages.courses[loc].title,
      url: pageUrl("courses", loc),
    });
  }
  if (pageKey !== "home") {
    trail.push({ name: page[loc].breadcrumb || page[loc].title, url: pageUrl(pageKey, loc) });
  }

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function getFaqJsonLd(locale: string = "en") {
  const isZh = resolveLocale(locale) === "zh";
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: SEO_CONFIG.structuredData.faqs.map((faq) => ({
      "@type": "Question",
      name: isZh ? faq.questionZh : faq.questionEn,
      acceptedAnswer: {
        "@type": "Answer",
        text: isZh ? faq.answerZh : faq.answerEn,
      },
    })),
  };
}
