import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import StickySidebar from "@/components/sticky" // NEW IMPORT
import "./globals.css"

export const metadata: Metadata = {
  title: "EC Chess Academy HK | Elite Chess & Strategy Training",
  description:
    "Hong Kong's premier strategy academy. Expert FIDE-certified coaching for International Chess, Chinese Chess, and Go. Shaping young minds since 2010.",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        
        {/* Updated SEO Structured Data for EC Chess */}
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
        
        {/* Navigation & Sidebar */}
        <Header />
        <StickySidebar /> 
        
        {/* Main Content */}
        <main className="relative min-h-screen">
          <Suspense fallback={<div className="h-screen w-full bg-white animate-pulse" />}>
            {children}
          </Suspense>
        </main>
        
        {/* Footer & Extras */}
        <Footer />
        <Analytics />
      </body>
    </html>
  )
}