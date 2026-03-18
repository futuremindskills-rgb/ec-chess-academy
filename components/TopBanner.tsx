"use client"
import Image from "next/image"
import Link from "next/link"
import { X } from "lucide-react"
import { useState } from "react"

interface TopBannerProps {
  imageUrl: string
  link?: string
}

export function TopBanner({ imageUrl, link }: TopBannerProps) {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  const BannerContent = (
    <div className="relative w-full h-[40px] md:h-[60px] overflow-hidden bg-black">
      <Image 
        src={imageUrl} 
        alt="Announcement Banner" 
        fill 
        className="object-cover hover:opacity-90 transition-opacity"
        priority
      />
      {/* Optional: Close button to hide banner */}
      <button 
        onClick={(e) => {
          e.preventDefault()
          setIsVisible(false)
        }}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-50 p-1 bg-black/20 hover:bg-black/40 rounded-full text-white"
      >
        <X size={16} />
      </button>
    </div>
  )

  return link ? (
    <Link href={link} className="block w-full cursor-pointer">
      {BannerContent}
    </Link>
  ) : (
    BannerContent
  )
}