"use client"

import { useEffect } from "react"
import { usePathname, useSearchParams } from "next/navigation"

export default function GTMTracker() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    try {
      if (typeof window === "undefined") return

      const url =
        pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : "")

      const w = window as any

      // GTM
      if (w.dataLayer) {
        w.dataLayer.push({
          event: "pageview",
          page: url,
        })
      }

      // GA
      if (typeof w.gtag === "function") {
        w.gtag("event", "page_view", {
          page_location: window.location.href,
        })
      }
    } catch (err) {
      console.error("GTMTracker error:", err)
    }
  }, [pathname, searchParams])

  return null
}
