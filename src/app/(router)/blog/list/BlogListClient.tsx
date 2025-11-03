'use client'

import PostList from "@/src/component/client/blog/postList/PostList"
import TagList from "@/src/component/client/blog/tagList/TagList"

const Feed = () => {
  return (
    <div className="max-w-[640px] mx-auto px-4 py-2">
      <div className="mb-4">
        <TagList />
      </div>
      <PostList />
    </div>
  )
}

export default Feed