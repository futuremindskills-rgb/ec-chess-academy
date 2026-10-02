import React from "react";
import { SEO_CONFIG } from "@/config/seo";

interface StructuredDataProps {
  locale: string;
}

export default function StructuredData({ locale }: StructuredDataProps) {
  const isZh = locale === "zh";
  const { site, socialLinks, structuredData } = SEO_CONFIG;
  const { organization, courses, faqs } = structuredData;

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "@id": `${site.baseUrl}/#organization`,
    name: isZh ? organization.nameZh : organization.nameEn,
    alternateName: organization.alternateNames,
    url: `${site.baseUrl}/${locale}`,
    logo: site.logoUrl,
    image: `${site.baseUrl}${site.defaultImage}`,
    description: isZh ? organization.descriptionZh : organization.descriptionEn,
    telephone: organization.telephone,
    email: organization.email,
    priceRange: organization.priceRange,
    address: {
      "@type": "PostalAddress",
      streetAddress: organization.address.streetAddress,
      addressLocality: organization.address.addressLocality,
      addressRegion: organization.address.addressRegion,
      addressCountry: organization.address.addressCountry,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: organization.geo.latitude,
      longitude: organization.geo.longitude,
    },
    openingHoursSpecification: organization.openingHours.map((oh) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: oh.days,
      opens: oh.opens,
      closes: oh.closes,
    })),
    sameAs: Object.values(socialLinks).filter(Boolean),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: isZh ? "棋藝課程" : "Chess & Strategy Programs",
      itemListElement: courses.map((course) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Course",
          name: isZh ? course.nameZh : course.nameEn,
          description: isZh ? course.descriptionZh : course.descriptionEn,
          provider: {
            "@type": "Organization",
            name: isZh ? organization.nameZh : organization.nameEn,
          },
        },
      })),
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: isZh ? faq.questionZh : faq.questionEn,
      acceptedAnswer: {
        "@type": "Answer",
        text: isZh ? faq.answerZh : faq.answerEn,
      },
    })),
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: isZh ? site.nameZh : site.name,
    url: site.baseUrl,
    inLanguage: [locale === "zh" ? "zh-HK" : "en-HK"],
    publisher: {
      "@type": "Organization",
      name: isZh ? site.nameZh : site.name,
      logo: {
        "@type": "ImageObject",
        url: site.logoUrl,
      },
    },
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
