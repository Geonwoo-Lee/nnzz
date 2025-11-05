// src/component/client/shorts/ShortsThumbnailCard.tsx
'use client'

import Link from 'next/link'
import Image from 'next/image'
import { TShorts } from '@/src/types/common/notion'

interface ShortsThumbnailCardProps {
  short: TShorts
}

function getYouTubeVideoId(url: string): string | null {
  if (!url) return null
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/shorts\/)([^&\n?#]+)/,
  ]
  for (const pattern of patterns) {
    const match = url.match(pattern)
    if (match) return match[1]
  }
  return null
}

export default function ShortsThumbnailCard({ short }: ShortsThumbnailCardProps) {
  return (
    <Link
      href={`/shorts/${short.idx}`}
      className="group block relative w-full rounded-xl overflow-hidden"
      style={{ aspectRatio: '9/16' }}
    >
      {/* 썸네일 */}
      {short.videoUrl?.includes('youtube') && (
        <Image
          src={`https://img.youtube.com/vi/${getYouTubeVideoId(short.videoUrl)}/maxresdefault.jpg`}
          alt={short.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
      )}
    </Link>
  )
}