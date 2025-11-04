import { useQuery } from "@tanstack/react-query";
import { TShorts } from "@/src/types/common/notion";
import { queryKey } from "@/src/types/hook/postQuery";

const useShortsQuery = () => {
  const { data } = useQuery<TShorts[]>({
    queryKey: queryKey.shorts(),
    initialData: [],
  });

  return data || [];
}

export default useShortsQuery