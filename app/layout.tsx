import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Analytics } from "@vercel/analytics/next";
import { Suspense } from "react";

import Header from "@/components/header";
import Footer from "@/components/footer";
import StickySidebar from "@/components/sticky";
import "@/lib/payment-reconciliation";

import "./globals.css";

// ✅ Viewport
export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

// ✅ SEO Metadata
export const metadata: Metadata = {
  title: "EC Chess Academy HK | Elite Chess & Strategy Training",

  description:
    "Hong Kong's premier strategy academy. Expert FIDE-certified coaching for International Chess, Chinese Chess, and Go. Shaping young minds since 2010.",

  metadataBase: new URL("https://ecchess.com"),

  alternates: {
    canonical: "https://ecchess.com",
  },

  keywords: [
    "Hong Kong Chess Academy",
    "Chess Classes HK",
    "Children Chess Classes Hong Kong",
    "Go Classes Hong Kong",
    "Chinese Chess Hong Kong",
    "EC Chess Academy",
    "Kowloon City Chess Class",
    "Yuen Long Chess Class",
  ],

  openGraph: {
    title: "EC Chess Academy HK | Elite Chess & Strategy Training",

    description:
      "Professional chess coaching for International Chess, Chinese Chess, and Go in Hong Kong.",

    url: "https://ecchess.com",

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

    description:
      "Elite chess & strategy training academy in Hong Kong.",

    images: ["/og-image.jpg"],
  },

  icons: {
    icon: [
      {
        url: "/favicon-16x16.png",
        sizes: "16x16",
        type: "image/png",
      },
      {
        url: "/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
    ],

    apple: [
      {
        url: "/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  },

  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // ✅ Structured Data
  const jsonLd = {
    "@context": "https://schema.org",

    "@type": "School",

    name: "EC Chess 卓思棋院",

    alternateName: "EC Chess Academy HK",

    url: "https://ecchess.com",

    logo: "https://ecchess.com/logo.png",

    description:
      "Professional children's chess academy offering International Chess, Chinese Chess, and Go training in Hong Kong.",

    telephone: "+852-4614-4561",

    address: {
      "@type": "PostalAddress",

      addressLocality: "Kowloon City & Yuen Long",

      addressRegion: "Hong Kong",

      addressCountry: "HK",
    },

    sameAs: [
      "https://www.facebook.com/ecchess",
      "https://www.instagram.com/ec_chess/",
    ],

    subOrganization: [
      {
        "@type": "LocalBusiness",

        name: "EC Chess 卓思棋院 - Kowloon City Branch",

        address: {
          "@type": "PostalAddress",

          streetAddress: "太子道西352號薈學坊3樓B室",

          addressLocality: "Kowloon City",

          addressRegion: "Kowloon",

          addressCountry: "HK",
        },
      },

      {
        "@type": "LocalBusiness",

        name: "EC Chess 卓思棋院 - Yuen Long Branch",

        address: {
          "@type": "PostalAddress",

          streetAddress: "壽富街元朗中心218室",

          addressLocality: "Yuen Long",

          addressRegion: "New Territories",

          addressCountry: "HK",
        },
      },
    ],
  };

  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable}`}
    >
      <head>
        {/* ✅ Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-WVZSVNQNLW"
          strategy="afterInteractive"
        />

        <Script id="ga-script" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];

            function gtag() {
              dataLayer.push(arguments);
            }

            window.gtag = gtag;

            gtag('js', new Date());

            gtag('config', 'G-WVZSVNQNLW', {
              send_page_view: false
            });
          `}
        </Script>

        {/* ✅ Google Tag Manager */}
        <Script id="gtm-script" strategy="afterInteractive">
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

            })(window,document,'script','dataLayer','GTM-TCNQWKNR');
          `}
        </Script>

        {/* ✅ Google Translate */}
        <Script
          src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
          strategy="afterInteractive"
        />

        <Script id="google-translate-init" strategy="afterInteractive">
          {`
            function googleTranslateElementInit() {
              new google.translate.TranslateElement(
                {
                  pageLanguage: 'en',
                  includedLanguages: 'en,zh-CN,zh-TW',
                  autoDisplay: false,
                },
                'google_translate_element'
              );
            }

            window.googleTranslateElementInit = googleTranslateElementInit;
          `}
        </Script>

        {/* ✅ JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd),
          }}
        />
      </head>

      <body className="bg-white font-sans antialiased text-slate-900">
        {/* ✅ Hidden Google Translate Element */}
        <div id="google_translate_element" className="hidden" />

        {/* ✅ GTM NoScript */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-TCNQWKNR"
            height="0"
            width="0"
            style={{
              display: "none",
              visibility: "hidden",
            }}
          />
        </noscript>

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
      </body>
    </html>
  );
}