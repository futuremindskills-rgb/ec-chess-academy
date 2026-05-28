import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import Script from "next/script";

import Footer from "@/components/footer";
import Header from "@/components/header";
import StickySidebar from "@/components/sticky";
import { routing } from "@/i18n/routing";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";

type Props = {
  children: React.ReactNode;
  params: { locale: string };
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

// Required for Static Site Generation (SSG) in Next.js 14 with next-intl
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = params;
  // Fallback check to prevent build crash if locale is missing
  if (!routing.locales.includes(locale as any)) return {};

  const t = await getTranslations({ locale, namespace: "metadata" });

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
      images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: t("siteName") }],
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

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = params;

  // Validate that the incoming `locale` parameter is valid
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);
  
  const messages = await getMessages();

  return (
    <html lang={locale} className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <head>
        {/* Google Tag Manager & Analytics */}
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-WVZSVNQNLW" strategy="afterInteractive" />
        <Script id="ga-script" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} window.gtag = gtag; gtag('js', new Date()); gtag('config', 'G-WVZSVNQNLW', {send_page_view: false});`}
        </Script>
        <Script id="gtm-script" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer' ? '&l=' + l : '';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id=' + i + dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-TCNQWKNR');`}
        </Script>
      </head>
      <body className="bg-white font-sans antialiased text-slate-900">
        <noscript>
          <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-TCNQWKNR" height="0" width="0" style={{ display: "none", visibility: "hidden" }} />
        </noscript>
        
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Header />
          <StickySidebar />
          <main className="relative min-h-screen">
            <Suspense fallback={<div className="h-screen w-full animate-pulse bg-white" />}>
              {children}
            </Suspense>
          </main>
          <Footer />
          <Analytics />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}