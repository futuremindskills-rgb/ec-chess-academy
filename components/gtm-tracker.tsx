"use client"

import { useEffect } from "react"
import { usePathname, useSearchParams } from "next/navigation"

export default function GTMTracker() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    const url = pathname + "?" + searchParams.toString()

    // GTM event
    window.dataLayer = window.dataLayer || []
    window.dataLayer.push({
      event: "pageview",
      page: url,
    })

    // GA direct event
    if (window.gtag) {
      window.gtag("event", "page_view", {
        page_location: window.location.href,
      })
    }
  }, [pathname, searchParams])

  return null
}