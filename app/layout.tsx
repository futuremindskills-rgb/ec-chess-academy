import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { NextIntlClientProvider } from "next-intl";
import enMessages from "@/messages/en.json";
import StructuredData from "@/components/seo/json-ld";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "EC Chess Academy HK | Elite Chess & Strategy Training",
  description: "Hong Kong's premier strategy academy. Expert FIDE-certified coaching for International Chess, Chinese Chess (Xiangqi), and Go (Weiqi) for all ages.",
  metadataBase: new URL("https://ecchess.com"),
  alternates: {
    canonical: "/en",
    languages: {
      en: "/en",
      zh: "/zh",
      "x-default": "/en",
    },
  },
  openGraph: {
    title: "EC Chess Academy HK | Elite Chess & Strategy Training",
    description: "Hong Kong's premier strategy academy. Expert FIDE-certified coaching for International Chess, Chinese Chess, and Go (Weiqi) for all skill levels.",
    url: "https://ecchess.com/en",
    siteName: "EC Chess Academy HK",
    locale: "en_HK",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "EC Chess Academy HK",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "EC Chess Academy HK",
    description: "Hong Kong's elite strategy academy offering FIDE-certified International Chess, Chinese Chess, and Go training for juniors and champions.",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${GeistSans.variable} ${GeistMono.variable}`}
    >
      <head>
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-WVZSVNQNLW"
          strategy="lazyOnload"
        />

        <Script id="ga-script" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];

            function gtag(){
              dataLayer.push(arguments);
            }

            window.gtag = gtag;

            gtag('js', new Date());

            gtag('config', 'G-WVZSVNQNLW', {
              send_page_view: false
            });
          `}
        </Script>

        {/* Google Tag Manager */}
        <Script id="gtm-script" strategy="lazyOnload">
          {`
            (function(w,d,s,l,i){
              w[l]=w[l]||[];
              w[l].push({
                'gtm.start': new Date().getTime(),
                event:'gtm.js'
              });

              var f=d.getElementsByTagName(s)[0],
                  j=d.createElement(s),
                  dl=l!='dataLayer' ? '&l=' + l : '';

              j.async=true;
              j.src='https://www.googletagmanager.com/gtm.js?id=' + i + dl;

              f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-KNXZDXMT');
          `}
        </Script>
      </head>

      <body className="bg-white font-sans antialiased text-slate-900">
        <StructuredData locale="en" />
        {/* GTM NoScript */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-KNXZDXMT"
            height="0"
            width="0"
            style={{
              display: "none",
              visibility: "hidden",
            }}
          />
        </noscript>

        <NextIntlClientProvider locale="en" messages={enMessages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}