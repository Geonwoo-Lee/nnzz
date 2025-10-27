'use client'

import { useQuery } from "@tanstack/react-query"
import { queryKey } from "@/src/types/hook/postQuery"
import { PostDetail } from "@/src/types/common/notion"
import { useParams } from "next/navigation"

const usePostQuery = () => {
  const params = useParams()
  const slug = params?.slug as string

  const { data } = useQuery<PostDetail>({
    queryKey: queryKey.post(slug),
    enabled: !!slug, // slug가 있을 때만 쿼리 실행
  })

  return data
}

export default usePostQuery
