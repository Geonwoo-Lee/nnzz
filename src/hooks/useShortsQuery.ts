import { useQuery } from "@tanstack/react-query";
import { TShorts } from "@/src/types/common/notion";
import { queryKey } from "@/src/types/hook/postQuery";

const useShortsQuery = () => {
  const { data } = useQuery<TShorts[]>({
    queryKey: queryKey.shorts(),
    queryFn: async () => {
      const response = await fetch('/api/shorts');
      if (!response.ok) {
        throw new Error('Failed to fetch shorts');
      }
      return response.json();
    },
    initialData: [],
    staleTime: 60 * 1000,
  });

  return data || [];
}

export default useShortsQuery