'use client'

import React from "react"
import usePostQuery from "@/src/hooks/usePostQuery"
import BlogCategory from "@/src/component/client/blog/blogCategory/BlogCategory"
import BlogHeader from "@/src/component/client/blog/blogHeader/BlogHeader"
import NotionRenderer from "@/src/component/client/blog/notionRenderer/NotionRenderer"
import AdBanner from "@/src/component/client/common/adSense/AdBanner"

const PostDetailClient: React.FC = () => {
  const data = usePostQuery()

  if (!data) {
    return (
      <div className="max-w-[640px] mx-auto px-6 py-12">
        <div className="animate-pulse">
          <div className="h-8 bg-slate-200 rounded mb-4"></div>
          <div className="h-4 bg-slate-200 rounded mb-2"></div>
          <div className="h-4 bg-slate-200 rounded"></div>
        </div>
      </div>
    )
  }

  const category = (data.category && data.category?.[0]) || undefined

  return (
    <div className="max-w-[640px] mx-auto px-6 py-3 rounded-3xl bg-white shadow-md">
      <article className="mx-auto max-w-full">
        {category && (
          <div className="mb-2">
            <BlogCategory readOnly={data.status?.[0] === "PublicOnDetail"}>
              {category}
            </BlogCategory>
          </div>
        )}

        {data.type?.[0] === "Post" && <BlogHeader data={data} />}

        <AdBanner
          slot="2965675659"
          type="display"
          className="my-6"
        />

        {data.recordMap && (
          <div>
            <NotionRenderer recordMap={data.recordMap} />
          </div>
        )}

        <AdBanner
          slot="1022048370"
          type="display"
          style={{ minHeight: '250px' }}
          className="my-6"
        />
      </article>
    </div>
  )
}

export default PostDetailClient