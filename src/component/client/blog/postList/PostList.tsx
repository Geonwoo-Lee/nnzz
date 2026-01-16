'use client'
import React, { useMemo } from "react"
import PostCard from "@/src/component/client/blog/blogCard/PostCard"
import { DEFAULT_CATEGORY } from "@/src/types/common/blog"
import usePostsQuery from "@/src/hooks/usePostsQuery"
import { useSearchParams } from "next/navigation"
import AdBanner from "@/src/component/client/common/adSense/AdBanner"

const PostList: React.FC = () => {
  const searchParams = useSearchParams()
  const data = usePostsQuery()

  const currentTag = searchParams.get('tag') || undefined
  const currentCategory = searchParams.get('category') || DEFAULT_CATEGORY
  const currentOrder = searchParams.get('order') || "desc"

  const filteredPosts = useMemo(() => {
    let newFilteredPosts = data

    if (currentTag) {
      newFilteredPosts = newFilteredPosts.filter(
        (post) => post?.tags?.includes(currentTag)
      )
    }

    if (currentCategory !== DEFAULT_CATEGORY) {
      newFilteredPosts = newFilteredPosts.filter(
        (post) => post?.category?.includes(currentCategory)
      )
    }

    // 정렬 순서에 따라 처리 (asc일 때만 reverse)
    if (currentOrder === "asc") {
      return [...newFilteredPosts].reverse()
    }

    return newFilteredPosts
  }, [currentTag, currentCategory, currentOrder, data])

  return (
    <div className="my-2">
      <AdBanner
        slot="1022048370"
        type="display"
        style={{ width: '100%', height: '70px' }}
        className="mb-4"
      />

      {!filteredPosts.length && (
        <p className="text-slate-500">Nothing! 😺</p>
      )}

      {filteredPosts.map((post, index) => (
        <React.Fragment key={post.id}>
          <PostCard data={post} mode='vertical'/>
          {(index + 1) % 3 === 0 && index !== filteredPosts.length - 1 && (
            <AdBanner
              slot="2965675659"
              type="display"
              style={{ minHeight: '100px' }}
              className="my-4"
            />
          )}
        </React.Fragment>
      ))}

      <AdBanner
        slot="1022048370"
        type="display"
        className="mt-4"
      />
    </div>
  )
}

export default PostList