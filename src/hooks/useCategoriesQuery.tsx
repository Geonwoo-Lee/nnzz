import usePostsQuery from "@/src/hooks/usePostsQuery"
import { getAllCategoriesFromPosts } from "@/src/func/common/notion.utills"

export const useCategoriesQuery = () => {
  const posts = usePostsQuery()
  const categories = getAllCategoriesFromPosts(posts)

  return categories
}