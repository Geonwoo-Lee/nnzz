import usePostsQuery from "@/src/hooks/usePostsQuery";
import { getAllSelectItemsFromPosts } from "../func/common/notion.utills";

export const useTagsQuery = () => {
  const posts = usePostsQuery()
  const tags = getAllSelectItemsFromPosts("tags", posts)

  return tags
}
