'use client'

import PostList from "@/src/component/client/blog/postList/PostList"
import CategoryList from "@/src/component/client/blog/categoryList/CategoryList"

const Feed = () => {
  return (
    <div className="max-w-[640px] mx-auto px-4 py-2">
      <div className="mb-4">
        <CategoryList />
      </div>
      <PostList />
    </div>
  )
}

export default Feed