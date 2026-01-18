import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { queryKey } from "@/src/types/hook/postQuery";
import ShortsListView from "@/src/app/(router)/shorts/list/ShortsListView";
import { fetchShorts } from "@/src/lib/shorts";
import { isShorts } from "@/src/types/common/notion";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function ShortsListPage() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
        gcTime: 5 * 60 * 1000,
      },
    },
  });

  const allShorts = await fetchShorts();

  const sortedShorts = [...allShorts]
    .filter(isShorts)
    .sort((a, b) => {
      const idxA = Number(a.idx);
      const idxB = Number(b.idx);
      return idxA - idxB;
    });

  await queryClient.prefetchQuery({
    queryKey: queryKey.shorts(),
    queryFn: () => sortedShorts,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ShortsListView />
    </HydrationBoundary>
  );
}