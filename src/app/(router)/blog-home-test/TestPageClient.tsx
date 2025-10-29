'use client'
import React, { useEffect, useState } from "react"
import PostCard from "@/src/component/client/blog/blogCard/PostCard"
import { DEFAULT_CATEGORY } from "@/src/types/common/blog"
import { useSearchParams } from "next/navigation"
import { TPost } from "@/src/types/common/notion"

const PostList: React.FC = () => {
  const searchParams = useSearchParams()
  const [data, setData] = useState<TPost[]>([])
  const [filteredPosts, setFilteredPosts] = useState<TPost[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const currentTag = searchParams.get('tag') || undefined
  const currentCategory = searchParams.get('category') || DEFAULT_CATEGORY
  const currentOrder = searchParams.get('order') || "desc"

  // 데이터 가져오기
  useEffect(() => {
    async function fetchPosts() {
      try {
        setIsLoading(true)
        const response = await fetch('/api/posts')
        if (!response.ok) throw new Error('Failed to fetch')
        const posts = await response.json()
        setData(posts)
      } catch (error) {
        console.error('Error fetching posts:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchPosts()
  }, [])

  // 필터링
  useEffect(() => {
    setFilteredPosts(() => {
      let newFilteredPosts = [...data]

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

      if (currentOrder !== "desc") {
        newFilteredPosts = newFilteredPosts.reverse()
      }

      return newFilteredPosts
    })
  }, [currentTag, currentCategory, currentOrder, data])

  if (isLoading) {
    return <p className="text-slate-500">Loading...</p>
  }

  return (
    <div className="my-2">
      {!filteredPosts.length && (
        <p className="text-slate-500">Nothing! 😺</p>
      )}
      <div className='flex flex-row gap-2 overflow-x-scroll'>
        {filteredPosts.map((post) => (
          <div key={post.id} className='flex-1 w-full min-w-[250px]'>
            <PostCard mode='horizon' data={post} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default PostList