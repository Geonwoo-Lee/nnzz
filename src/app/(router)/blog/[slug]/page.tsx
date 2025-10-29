import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { NotionAPI } from "notion-client";
import { queryKey } from "@/src/types/hook/postQuery";
import getPageProperties, { filterPosts, getAllPageIds } from "@/src/func/common/notion.utills";
import PostDetailClient from "./PostDetailClient";
import { notFound } from "next/navigation";

export const dynamic = 'force-dynamic'
export const revalidate = 0

async function fetchAllPosts() {
  const api = new NotionAPI()
  const databaseId = "26eb3b6a7ac28183933cf34239a4b326"

  try {
    const response = await api.getPage(databaseId);
    const pageIds = getAllPageIds(response);

    const allPosts = await Promise.all(
      pageIds.map(async (id) => {

        return await getPageProperties(
          id,
          response.block,
          Object.values(response.collection)[0]?.value?.schema || {},
        );
      }),
    );

    return filterPosts(allPosts, {
      acceptStatus: ["Public"],
      acceptType: ["Post"],
    });
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

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 0,
        gcTime: 0,
      },
    },
  })

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