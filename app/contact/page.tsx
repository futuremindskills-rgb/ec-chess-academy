"use client";

import React from "react";
import { useLocale } from "next-intl";

// Component Imports
import PageBanner from "@/components/ui/ContactBanner";
import ContactSection from "@/components/ui/ContactSection";
import OutreachSection from "@/components/ui/outreach";
import ColorfulFAQSection from "@/components/pagesfaq";
import VisitCampusCTA from "@/components/ui/cta";

// Note: Removed unused imports to keep the code clean 
// (DemoBookingCTA, FaqSection, etc. were imported but not used in the JSX)

export default function ContactPage() {
  const locale = useLocale();
  const isZh = locale === "zh";

  return (
    <div className="min-h-screen bg-white">
      {/* 1. Dynamic Page Banner */}
      <PageBanner 
        title={isZh ? "聯繫" : "CONTACT"}
        highlight={isZh ? "我們" : "US"}
        description={isZh 
          ? "對我們的課程有疑問嗎？我們的大師教練隨時準備為您提供幫助。" 
          : "Have questions about our programs? Our master coaches are ready to assist you."
        }
        currentPage={isZh ? "聯絡中心" : "Contact Center"}
      />

      {/* 2. Main Contact Form & Info Section */}
      <ContactSection />

      {/* 3. Global Outreach / Map Section */}
      <OutreachSection />

      {/* 4. Frequently Asked Questions */}
      <ColorfulFAQSection />

      {/* 5. Final Call to Action */}
      <VisitCampusCTA />
    </div>
  );
}