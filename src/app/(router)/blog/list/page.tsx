import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { queryKey } from "@/src/types/hook/postQuery";
import { NotionAPI } from "notion-client";
import getPageProperties, { filterPosts, getAllPageIds } from "@/src/func/common/notion.utills";
import TestPageClient from "@/src/app/(router)/blog/list/BlogListClient";

export const dynamic = "force-dynamic";
export const revalidate = 0;

async function fetchPosts() {
  const api = new NotionAPI();
  const pageId =
    process.env.NEXT_PUBLIC_NOTION_DATABASE_ID ||
    "26eb3b6a7ac28183933cf34239a4b326";

  try {
    const response = await api.getPage(pageId);
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
    console.error("Failed to fetch posts:", error);
    return [];
  }
}

export default async function BlogPage() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 0,
        gcTime: 0,
      },
    },
  });

  await queryClient.prefetchQuery({
    queryKey: queryKey.posts(),
    queryFn: fetchPosts,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <TestPageClient />
    </HydrationBoundary>
  );
}
