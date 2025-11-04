// hooks/usePostsQuery.ts
import { useQuery } from "@tanstack/react-query"
import { TPost } from "@/src/types/common/notion"
import { queryKey } from "@/src/types/hook/postQuery"
import { filterPosts } from "@/src/func/common/notion.utills"
import { useMemo } from "react"

const usePostsQuery = (category?: string) => {
  const { data: allData } = useQuery({
    queryKey: queryKey.posts(),
    initialData: [] as TPost[],
    enabled: false,
  })

  const posts = useMemo(() => {
    let filteredPosts = filterPosts(allData || [], {
      acceptStatus: ["Public"],
      acceptType: ["Post"]
    })

    if (category && category !== 'all') {
      filteredPosts = filteredPosts.filter((post) =>
        post.category?.includes(category)
      )
    }

    return filteredPosts
  }, [allData, category])

  if (!posts) throw new Error("Posts data is not found")

  return posts
}

export default usePostsQuery