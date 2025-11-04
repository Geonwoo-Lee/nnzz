'use client'

import { useRouter, useSearchParams } from "next/navigation"
import React from "react"
import { useCategoriesQuery } from "@/src/hooks/useCategoriesQuery"

const CategoryList = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const currentCategory = searchParams.get('category') || undefined
  const data = useCategoriesQuery()

  const handleClickCategory = (value: string | undefined) => {
    const params = new URLSearchParams(searchParams.toString())

    if (!value || currentCategory === value) {
      params.delete('category')
    } else {
      params.set('category', value)
    }

    const query = params.toString()
    router.push(query ? `/blog/list/?${query}` : '/blog/list')
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="text-heading4 font-medium text-text-2">
        쩝쩝박사의 맛집 픽을 확인해보세요
      </div>
      <div className="flex gap-1 overflow-x-auto scrollbar-hide">
        <button
          onClick={() => handleClickCategory(undefined)}
          className={`
            px-3 py-2 rounded-[1000px] text-caption2 font-medium shrink-0 cursor-pointer
            transition-colors
            ${!currentCategory
            ? 'text-text-7 bg-bg-9'
            : 'text-text-2 bg-bg-1'
          }
          `}
        >
          전체
        </button>

        {Object.keys(data).map((key) => (
          <button
            key={key}
            onClick={() => handleClickCategory(key)}
            className={`
              px-3 py-2 rounded-[1000px] text-caption2 font-medium shrink-0 cursor-pointer
              transition-colors
              ${currentCategory === key
              ? 'text-text-7 bg-bg-9'
              : 'text-text-2 bg-bg-1'
            }
            `}
          >
            {key}
          </button>
        ))}
      </div>
    </div>
  )
}

export default CategoryList