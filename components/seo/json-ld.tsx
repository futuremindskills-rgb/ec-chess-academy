import React from "react";

interface StructuredDataProps {
  locale: string;
}

export default function StructuredData({ locale }: StructuredDataProps) {
  const isZh = locale === "zh";

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "@id": "https://ecchess.com/#organization",
    "name": isZh ? "EC 卓思棋院 (香港)" : "EC Chess Academy HK",
    "alternateName": ["EC Chess", "卓思棋院", "EC Chess Education"],
    "url": `https://ecchess.com/${locale}`,
    "logo": "https://ecchess.com/icon.png",
    "image": "https://ecchess.com/og-image.jpg",
    "description": isZh
      ? "香港領先策略棋院，提供國際象棋、中國象棋及圍棋的專業 FIDE 認證訓練課程。"
      : "Hong Kong's premier strategy academy offering expert FIDE-certified coaching for International Chess, Chinese Chess, and Go.",
    "telephone": "+852 4614 4561",
    "email": "enquiry.ecchess@gmail.com",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Room B, 3/F, 352 Prince Edward Road West, Kowloon City",
      "addressLocality": "Kowloon City",
      "addressRegion": "Kowloon",
      "addressCountry": "HK"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "22.3275",
      "longitude": "114.1882"
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        "opens": "09:00",
        "closes": "19:00"
      }
    ],
    "sameAs": [
      "https://www.facebook.com/ecchess",
      "https://www.instagram.com/ec_chess/",
      "https://twitter.com/ecchess",
      "https://www.linkedin.com/company/ecchess",
      "https://www.youtube.com/@ecchess"
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": isZh ? "棋藝課程" : "Chess & Strategy Programs",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Course",
            "name": isZh ? "國際象棋課程 (FIDE 標準)" : "International Chess Course (FIDE Standard)",
            "description": isZh ? "專注培養大局觀、戰術計算及比賽心理素質。" : "Focuses on strategic vision, tactical calculation, and competition mindset.",
            "provider": {
              "@type": "Organization",
              "name": "EC Chess Academy HK"
            }
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Course",
            "name": isZh ? "中國象棋課程" : "Chinese Chess Course (Xiangqi)",
            "description": isZh ? "結合傳統文化與攻防博弈思維，強化空間佈局。" : "Combines cultural heritage with offense-defense tactical thinking.",
            "provider": {
              "@type": "Organization",
              "name": "EC Chess Academy HK"
            }
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Course",
            "name": isZh ? "圍棋課程" : "Go / Weiqi Course",
            "description": isZh ? "鍛煉千變萬化的宏觀佈局與深度專注力。" : "Develops deep calculations, territory control, and macro foresight.",
            "provider": {
              "@type": "Organization",
              "name": "EC Chess Academy HK"
            }
          }
        }
      ]
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": isZh ? "幾歲開始學棋最合適？" : "What is the best age for children to start learning chess?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": isZh
            ? "3.5至4歲是啟蒙的黃金期。我們透過趣味故事與遊戲化引導，在幼兒階段建立空間感與專注習慣；6歲以上則可快速進入戰術與競賽思維。"
            : "Ages 3.5 to 4 are ideal for foundational introduction using fun games and visual stories. Children aged 6+ rapidly advance into tactical calculation and tournament play."
        }
      },
      {
        "@type": "Question",
        "name": isZh ? "導師是否具備國際認可資格？" : "Do instructors possess recognized international qualifications?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": isZh
            ? "是。主教練團隊均持 FIDE 國際棋聯認證、香港代表隊資格及國家一級棋士資歷，具備 15 年以上名校及精英學員培訓經驗。"
            : "Yes. Our senior coaching team holds FIDE official certifications, Hong Kong team representation, and over 15 years of proven elite training experience."
        }
      },
      {
        "@type": "Question",
        "name": isZh ? "提供線上還是實體混合課程？" : "Do you offer in-person, online, or hybrid classes?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": isZh
            ? "我們在九龍城及元朗設有實體旗艦分校，同時配備一對一高清互動線上覆盤系統，支援混合學習與彈性上課時間。"
            : "We provide in-person training at our Kowloon City and Yuen Long campuses, as well as 1-on-1 interactive online analysis systems for hybrid learning."
        }
      },
      {
        "@type": "Question",
        "name": isZh ? "如何追蹤學員的進度與段位？" : "How do you track student progress and ratings?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": isZh
            ? "每位學員均擁有專屬成長檔案，每 8-10 堂進行階段性戰術評估，定期安排香港積分錦標賽及升級推薦。"
            : "Every student has an individualized progress profile with tactical assessments every 8-10 lessons, along with regular internal and HK rating tournament pathways."
        }
      }
    ]
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "EC Chess Academy HK",
    "url": "https://ecchess.com",
    "inLanguage": [locale === "zh" ? "zh-HK" : "en-HK"],
    "publisher": {
      "@type": "Organization",
      "name": "EC Chess Academy HK",
      "logo": {
        "@type": "ImageObject",
        "url": "https://ecchess.com/icon.png"
      }
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  );
}
