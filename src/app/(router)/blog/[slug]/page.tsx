import { QueryClient, HydrationBoundary, dehydrate } from "@tanstack/react-query"
import { NotionAPI } from "notion-client"
import { queryKey } from "@/src/types/hook/postQuery"
import getPageProperties, { getAllPageIds } from "@/src/func/common/notion.utills"
import PostDetailClient from "./PostDetailClient"
import { notFound } from "next/navigation"

async function fetchAllPosts() {
  const api = new NotionAPI()
  const databaseId = process.env.NEXT_PUBLIC_NOTION_DATABASE_ID || "26eb3b6a7ac28183933cf34239a4b326"

  try {
    const response = await api.getPage(databaseId)
    const pageIds = getAllPageIds(response)

    const posts = await Promise.all(
      pageIds.map(async (id) => {
        const properties = await getPageProperties(
          id,
          response.block,
          Object.values(response.collection)[0]?.value?.schema || {}
        )
        return properties
      })
    )

    return posts
  } catch (error) {
    console.error("Failed to fetch posts:", error)
    return []
  }
}

async function fetchPostBySlug(slug: string) {
  const api = new NotionAPI()

  try {
    const allPosts = await fetchAllPosts()

    const post = allPosts.find(p => p.slug === slug)

    if (!post) {
      console.error(`Post not found for slug: ${slug}`)
      return null
    }

    const recordMap = await api.getPage(post.id)

    return {
      ...post,
      recordMap,
    }
  } catch (error) {
    console.error("Failed to fetch post:", error)
    return null
  }
}

export default async function PostPage({
                                         params
                                       }: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  const queryClient = new QueryClient()

  const post = await fetchPostBySlug(slug)

  if (!post) {
    notFound()
  }

  await queryClient.prefetchQuery({
    queryKey: queryKey.post(slug),
    queryFn: () => post,
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PostDetailClient />
    </HydrationBoundary>
  )
}

export const revalidate = 300