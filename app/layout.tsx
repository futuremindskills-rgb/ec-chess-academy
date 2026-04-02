import type React from "react"
import type { Metadata } from "next"
import Script from "next/script"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import StickySidebar from "@/components/sticky"
import GTMTracker from "@/components/gtm-tracker"
export const metadata: Metadata = {
  title: "EC Chess Academy HK | Elite Chess & Strategy Training",
  description:
    "Hong Kong's premier strategy academy. Expert FIDE-certified coaching for International Chess, Chinese Chess, and Go. Shaping young minds since 2010.",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* Favicons */}
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />

        {/* ================= GA4 ================= */}
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

            // ❗ prevent double pageviews (GTM will also track)
            gtag('config', 'G-WVZSVNQNLW', {
              send_page_view: false
            });
          `}
        </Script>

        {/* ================= GTM ================= */}
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

        {/* Structured Data */}
        <script type="application/ld+json">
          {`
          {
            "@context": "https://schema.org",
            "@type": "EducationalOrganization",
            "name": "EC Chess Academy Hong Kong",
            "description": "Professional chess academy specializing in International Chess, Chinese Chess (Xiangqi), and Go (Weiqi).",
            "url": "https://ecchessacademyhk.com",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Hong Kong",
              "addressRegion": "HK"
            },
            "sameAs": [
              "https://www.facebook.com/ecchess",
              "https://www.instagram.com/ec_chess/"
            ]
          }
          `}
        </script>
      </head>

      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased bg-white`}>
        
        {/* GTM noscript */}
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
        <GTMTracker />

        <main className="relative min-h-screen">
          <Suspense fallback={<div className="h-screen w-full bg-white animate-pulse" />}>
            {children}
          </Suspense>
        </main>

        <Footer />
        <Analytics />
      </body>
    </html>
  )
}