import HomeMealSettingServer from "@/src/component/server/page/home/homeMealSettingServer/HomeMealSettingServer";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { fetchShorts } from "@/src/lib/shorts";
import { queryKey } from "@/src/types/hook/postQuery";
import { isShorts } from "@/src/types/common/notion";

const Home = async () => {
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
      <HomeMealSettingServer />
    </HydrationBoundary>
  );
};

export default Home;
