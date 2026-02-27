'use client'

import useShortsQuery from '@/src/hooks/useShortsQuery'
import ShortsThumbnailCard from "@/src/component/client/shorts/ShortsThumbnail";
import YoutubeIcon from "@/src/svg/items/home/YoutubeIcon"
import { useMemo } from 'react'

export default function ShortsListView() {
  const shorts = useShortsQuery()

  const sortedAndLimitedShorts = useMemo(() => {
    return [...shorts]
      .sort((a, b) => {
        const dateA = new Date(a.date?.start_date || a.createdTime).getTime()
        const dateB = new Date(b.date?.start_date || b.createdTime).getTime()
        return dateB - dateA // 최신순 정렬
      })
      .slice(0, 10) // 10개만
  }, [shorts])

  return (
    <div className="px-4 mx-auto w-full flex flex-col gap-5">
      <h1 className="text-title2 font-bold flex flrex-row gap-2 items-center">
        <YoutubeIcon/>
        <span >냠쩝 쇼츠</span>
      </h1>
      <div className="grid grid-cols-2 gap-4">
        {sortedAndLimitedShorts.map((short) => (
          <ShortsThumbnailCard key={short.id} short={short} />
        ))}
      </div>
    </div>
  )
}

