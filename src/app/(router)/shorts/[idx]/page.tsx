import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { queryKey } from "@/src/types/hook/postQuery";
import { notFound } from "next/navigation";
import ShortsListClient from "@/src/app/(router)/shorts/[idx]/ShortsListClient";
import { fetchShorts } from "@/src/lib/shorts";
import { isShorts } from "@/src/types/common/notion";

export const dynamic = "force-dynamic";
export const revalidate = 0;

interface ShortsPageProps {
  params: Promise<{
    idx: string;
  }>;
}

export default async function ShortsPage({ params }: ShortsPageProps) {
  const { idx } = await params;

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

  const targetIndex = sortedShorts.findIndex(short => short.idx === idx);

  if (targetIndex === -1) {
    notFound();
  }

  const reorderedShorts = [
    sortedShorts[targetIndex],
    ...sortedShorts.slice(0, targetIndex),
    ...sortedShorts.slice(targetIndex + 1),
  ];

  await queryClient.prefetchQuery({
    queryKey: queryKey.shorts(),
    queryFn: () => reorderedShorts,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ShortsListClient />
    </HydrationBoundary>
  );
}