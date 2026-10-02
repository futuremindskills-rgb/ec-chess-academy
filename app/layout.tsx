import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { NextIntlClientProvider } from "next-intl";
import enMessages from "@/messages/en.json";
import StructuredData from "@/components/seo/json-ld";
import { SEO_CONFIG, getPageMetadata } from "@/config/seo";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: SEO_CONFIG.site.themeColor,
  width: "device-width",
  initialScale: 1,
};

const baseHomeMetadata = getPageMetadata("home", "en");

export const metadata: Metadata = {
  ...baseHomeMetadata,
  manifest: "/site.webmanifest",
  verification: {
    google: SEO_CONFIG.verification.googleSiteVerification || undefined,
    other: SEO_CONFIG.verification.bingSiteVerification
      ? { "msvalidate.01": [SEO_CONFIG.verification.bingSiteVerification] }
      : undefined,
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
        {SEO_CONFIG.analytics.googleAnalyticsId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${SEO_CONFIG.analytics.googleAnalyticsId}`}
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
                gtag('config', '${SEO_CONFIG.analytics.googleAnalyticsId}', {
                  send_page_view: false
                });
              `}
            </Script>
          </>
        )}

        {/* Google Tag Manager */}
        {SEO_CONFIG.analytics.googleTagManagerId && (
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
              })(window,document,'script','dataLayer','${SEO_CONFIG.analytics.googleTagManagerId}');
            `}
          </Script>
        )}
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