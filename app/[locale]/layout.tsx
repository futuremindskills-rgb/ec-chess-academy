import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import { NextIntlClientProvider } from "next-intl";
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import Footer from "@/components/footer";
import Header from "@/components/header";
import StickySidebar from "@/components/sticky";
import StructuredData from "@/components/seo/json-ld";
import { routing } from "@/i18n/routing";

type Props = {
  children: React.ReactNode;
  params: {
    locale: string;
  };
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({
    locale,
  }));
}

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { locale } = params;

  if (!routing.locales.includes(locale as any)) {
    return {};
  }

  const t = await getTranslations({
    locale,
    namespace: "metadata",
  });

  return {
    title: t("title"),

    description: t("description"),

    metadataBase: new URL("https://ecchess.com"),

    alternates: {
      canonical: `/${locale}`,

      languages: {
        en: "/en",
        zh: "/zh",
      },
    },

    openGraph: {
      title: t("title"),

      description: t("ogDescription"),

      url: `https://ecchess.com/${locale}`,

      siteName: t("siteName"),

      locale: locale === "zh" ? "zh_HK" : "en_HK",

      type: "website",

      images: [
        {
          url: "/og-image.jpg",
          width: 1200,
          height: 630,
          alt: t("siteName"),
        },
      ],
    },

    twitter: {
      card: "summary_large_image",

      title: t("siteName"),

      description: t("twitterDescription"),

      images: ["/og-image.jpg"],
    },

    manifest: "/site.webmanifest",
  };
}

export default async function LocaleLayout({
  children,
  params,
}: Props) {
  const { locale } = params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <NextIntlClientProvider
      locale={locale}
      messages={messages}
    >
      <StructuredData locale={locale} />
      <Header />

      <StickySidebar />

      <main className="relative min-h-screen">
        <Suspense
          fallback={
            <div className="h-screen w-full animate-pulse bg-white" />
          }
        >
          {children}
        </Suspense>
      </main>

      <Footer />

      <Analytics />
    </NextIntlClientProvider>
  );
}