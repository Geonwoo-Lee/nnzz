'use client'
import React, { useEffect, useState } from "react"
import PostCard from "@/src/component/client/blog/blogCard/PostCard"
import { DEFAULT_CATEGORY } from "@/src/types/common/blog"
import usePostsQuery from "@/src/hooks/usePostsQuery"
import {  useSearchParams } from "next/navigation"
import AdBanner from "@/src/component/client/common/adSense/AdBanner";

const PostList: React.FC = () => {
    const searchParams = useSearchParams()
    const data = usePostsQuery()
    const [filteredPosts, setFilteredPosts] = useState(data)

    const currentTag = searchParams.get('tag') || undefined
    const currentCategory = searchParams.get('category') || DEFAULT_CATEGORY
    const currentOrder = searchParams.get('order') || "desc"

    useEffect(() => {
        setFilteredPosts(() => {
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

            if (currentOrder !== "desc") {
                newFilteredPosts = newFilteredPosts.reverse()
            }

            return newFilteredPosts
        })
    }, [ currentTag, currentCategory, currentOrder, data])

    return (
        <div className="my-2">
          <AdBanner
            slot="1022048370"
            style={{ width: '100%', height: '70px' }}
          />
            {!filteredPosts.length && (
                <p className="text-slate-500">Nothing! 😺</p>
            )}
            {filteredPosts.map((post) => (
                <PostCard key={post.id} data={post}  mode='vertical'/>
            ))}
          <AdBanner slot="0987654321" />
        </div>
    )
}

export default PostList