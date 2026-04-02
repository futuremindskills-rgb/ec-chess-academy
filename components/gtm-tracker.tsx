"use client"

import { useEffect } from "react"
import { usePathname, useSearchParams } from "next/navigation"

export default function GTMTracker() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    const url = pathname + (searchParams.toString() ? `?${searchParams.toString()}` : "")

    // ✅ Safe access without TS errors
    const w = window as typeof window & {
      dataLayer?: any[]
      gtag?: (...args: any[]) => void
    }

    // GTM event
    w.dataLayer = w.dataLayer || []
    w.dataLayer.push({
      event: "pageview",
      page: url,
    })

    // GA direct event
    if (typeof w.gtag === "function") {
      w.gtag("event", "page_view", {
        page_location: window.location.href,
      })
    }
  }, [pathname, searchParams])

  return null
}