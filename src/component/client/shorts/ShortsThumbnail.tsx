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
  const videoId = getYouTubeVideoId(short.videoUrl || '')
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`

  return (
    <Link
      href={`/shorts/${short.idx}`}
      className="group block relative w-full rounded-xl overflow-hidden bg-slate-100 border-0"
      style={{ aspectRatio: '9/16' }}
    >
      {short.videoUrl?.includes('youtube') && (
        <Image
          src={thumbnailUrl}
          alt={short.title}
          fill
          className="object-cover scale-102 group-hover:scale-105 transition-transform duration-300 border-0"
        />
      )}
    </Link>
  )
}