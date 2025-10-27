import { useQuery } from "@tanstack/react-query"
import {TPost} from "@/src/types/common/notion";
import {queryKey} from "@/src/types/hook/postQuery";

const usePostsQuery = () => {
    const { data } = useQuery({
        queryKey: queryKey.posts(),
        initialData: [] as TPost[],
        enabled: false,
    })

    if (!data) throw new Error("Posts data is not found")

    return data
}

export default usePostsQuery
