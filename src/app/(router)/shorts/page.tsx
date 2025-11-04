// app/(router)/shorts/page.tsx
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { queryKey } from "@/src/types/hook/postQuery";
import { NotionAPI } from "notion-client";
import getPageProperties, { filterShorts, getAllPageIds } from "@/src/func/common/notion.utills";
import ShortsListClient from "@/src/app/(router)/shorts/ShortsListClient";
import { TContent } from "@/src/types/common/notion";

export const dynamic = "force-dynamic";
export const revalidate = 0;

async function fetchShorts() {
  const api = new NotionAPI();
  const pageId =
    process.env.NEXT_PUBLIC_NOTION_SHORTS_PAGE_ID ||
    "26eb3b6a7ac28183933cf34239a4b326";

  try {
    const response = await api.getPage(pageId);
    const pageIds = getAllPageIds(response);

    const allContent = await Promise.all(
      pageIds.map(async (id) => {
        return await getPageProperties(
          id,
          response.block,
          Object.values(response.collection)[0]?.value?.schema || {},
        );
      }),
    );

    return filterShorts(allContent as TContent[], {
      acceptStatus: ["Public"],
      acceptType: ["Shorts"],
    });
  } catch (error) {
    console.error("Failed to fetch shorts:", error);
    return [];
  }
}

export default async function ShortsPage() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
        gcTime: 5 * 60 * 1000,
      },
    },
  });

  await queryClient.prefetchQuery({
    queryKey: queryKey.shorts(),
    queryFn: fetchShorts,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ShortsListClient />
    </HydrationBoundary>
  );
}