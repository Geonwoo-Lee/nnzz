'use client'

import useShortsQuery from '@/src/hooks/useShortsQuery'
import ShortsThumbnailCard from "@/src/component/client/shorts/ShortsThumbnail";
import YoutubeIcon from "../../../../../public/svg/items/home/youtubeIcon.svg"

export default function ShortsListView() {
  const shorts = useShortsQuery()

  return (
    <div className="container mx-auto px-4 py-8 flex flex-col gap-5">
      <h1 className="text-title2 font-bold flex flrex-row gap-2 items-center">
        <YoutubeIcon/>
        <span >냠쩝 쇼츠</span>
      </h1>
      <div className="grid grid-cols-2 gap-4">
        {shorts.map((short) => (
          <ShortsThumbnailCard key={short.id} short={short} />
        ))}
      </div>
    </div>
  )
}

