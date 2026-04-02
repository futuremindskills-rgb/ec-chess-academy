import type { Metadata, Viewport } from "next"
import Script from "next/script"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import StickySidebar from "@/components/sticky"
import GTMTracker from "@/components/gtm-tracker"

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
}

export const metadata: Metadata = {
  metadataBase: new URL("https://ecchessacademyhk.com"), // CRITICAL FOR BUILD
  title: "EC Chess Academy HK | Elite Chess & Strategy Training",
  description: "Hong Kong's premier strategy academy. Expert FIDE-certified coaching.",
  manifest: "/site.webmanifest",
  icons: {
    apple: "/apple-touch-icon.png",
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32" },
      { url: "/favicon-16x16.png", sizes: "16x16" },
    ],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <head>
        {/* GA4 */}
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
            gtag('config', 'G-WVZSVNQNLW', { send_page_view: false });
          `}
        </Script>

        {/* GTM */}
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
      </head>

      <body className="font-sans antialiased bg-white">
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
        
        {/* WRAP THIS IN SUSPENSE TO PREVENT BUILD FAILURE */}
        <Suspense fallback={null}>
          <GTMTracker />
        </Suspense>

        <main className="relative min-h-screen">
          <Suspense fallback={<div className="h-screen w-full bg-white" />}>
            {children}
          </Suspense>
        </main>

        <Footer />
        <Analytics />
      </body>
    </html>
  )
}
