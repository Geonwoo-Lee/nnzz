// CategoryList.tsx
'use client'

import { useSearchParams } from "next/navigation"
import React from "react"
import { useCategoriesQuery } from "@/src/hooks/useCategoriesQuery"

const CategoryList = () => {
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
    const newUrl = query ? `/blog/list/?${query}` : '/blog/list'

    // URL만 변경하고 페이지 리렌더링은 하지 않음 (훨씬 빠름)
    window.history.pushState(null, '', newUrl)

    // searchParams 변경을 감지하도록 popstate 이벤트 트리거
    window.dispatchEvent(new PopStateEvent('popstate'))
  }

  return (
    <div className="flex gap-1 overflow-x-auto scrollbar-hide">
      <button
        onClick={() => handleClickCategory(undefined)}
        className={`
          px-3 py-2 rounded-[1000px] text-caption1 font-medium shrink-0 cursor-pointer
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
            px-3 py-2 rounded-[1000px] text-caption1 font-medium shrink-0 cursor-pointer
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
  )
}

export default CategoryList