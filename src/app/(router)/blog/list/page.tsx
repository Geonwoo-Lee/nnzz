import { QueryClient, HydrationBoundary, dehydrate } from "@tanstack/react-query"
import { queryKey } from "@/src/types/hook/postQuery"
import { NotionAPI } from "notion-client"
import getPageProperties, { getAllPageIds } from "@/src/func/common/notion.utills"
import TestPageClient from "@/src/app/(router)/blog/list/BlogListClient"

async function fetchPosts() {
    const api = new NotionAPI()
    const pageId = process.env.NEXT_PUBLIC_NOTION_DATABASE_ID || "26eb3b6a7ac28183933cf34239a4b326"

    try {
        const response = await api.getPage(pageId)
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

export default async function BlogPage() {
    const queryClient = new QueryClient()

    await queryClient.prefetchQuery({
        queryKey: queryKey.posts(),
        queryFn: fetchPosts,
    })

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <TestPageClient/>
        </HydrationBoundary>
    )
}

export const revalidate = 300