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
import { SEO_CONFIG, getPageMetadata } from "@/config/seo";

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

  const baseMetadata = getPageMetadata("home", locale);

  return {
    ...baseMetadata,
    manifest: "/site.webmanifest",
    verification: {
      google: SEO_CONFIG.verification.googleSiteVerification || undefined,
      other: SEO_CONFIG.verification.bingSiteVerification
        ? { "msvalidate.01": [SEO_CONFIG.verification.bingSiteVerification] }
        : undefined,
    },
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