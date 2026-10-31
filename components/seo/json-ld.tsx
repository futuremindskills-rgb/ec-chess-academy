import React from "react";
import { getSiteJsonLd, getFaqJsonLd } from "@/config/seo";

interface StructuredDataProps {
  locale: string;
}

export default function StructuredData({ locale }: StructuredDataProps) {
  const siteSchema = getSiteJsonLd(locale);
  const faqSchema = getFaqJsonLd(locale);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(siteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}
