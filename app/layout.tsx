import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Analytics } from "@vercel/analytics/next";
import { Suspense } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import StickySidebar from "@/components/sticky";
import "./globals.css"


// ✅ Viewport (correct)
export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

// ✅ Metadata
export const metadata: Metadata = {
  title: "EC Chess Academy HK | Elite Chess & Strategy Training",
  description:
    "Hong Kong's premier strategy academy. Expert FIDE-certified coaching for International Chess, Chinese Chess, and Go. Shaping young minds since 2010.",
  metadataBase: new URL("https://ecchessacademyhk.com"),
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: "EC Chess Academy Hong Kong",
    description:
      "Professional chess academy specializing in International Chess, Chinese Chess (Xiangqi), and Go (Weiqi).",
    url: "https://ecchessacademyhk.com",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Hong Kong",
      addressRegion: "HK",
    },
    sameAs: [
      "https://www.facebook.com/ecchess",
      "https://www.instagram.com/ec_chess/",
    ],
  };

  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <head>
        {/* ✅ GA4 */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-WVZSVNQNLW"
          strategy="afterInteractive"
        />
        <Script id="ga-script" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            window.gtag = gtag;
            gtag('js', new Date());
            gtag('config', 'G-WVZSVNQNLW', {
              send_page_view: false
            });
          `}
        </Script>

        {/* ✅ GTM */}
        <Script id="gtm-script" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];
            w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});
            var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
            j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
            f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-TCNQWKNR');
          `}
        </Script>

        {/* ✅ Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>

      <body className="font-sans antialiased bg-white text-slate-900">
        {/* ✅ GTM noscript */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-TCNQWKNR"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>

        <Header />
        <StickySidebar />

        <main className="relative min-h-screen">
          <Suspense fallback={<div className="h-screen w-full bg-white animate-pulse" />}>
            {children}
          </Suspense>
        </main>

        <Footer />
        <Analytics />
      </body>
    </html>
  );
}