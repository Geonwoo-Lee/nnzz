'use client'

import Image from "next/image"
import React from "react"
import Tag from "@/src/component/client/blog/blogTag/BlogTag";
import DateUtils from "@/src/func/common/date.utils";
import { TPost } from "@/src/types/common/notion";

type Props = {
  data: TPost
}

const BlogHeader: React.FC<Props> = ({ data }) => {
  return (
    <div>
      <h1 className="text-3xl font-bold leading-9">
        {data.title}
      </h1>
      {data.type[0] !== "Paper" && (
        <nav className="mt-6 text-slate-700">
          <div className="flex items-center gap-3 mb-3">
            {data.author?.[0]?.name && (
              <>
                <div className="flex items-center gap-2">
                  <div>{data.author[0].name}</div>
                </div>
                <div className="self-stretch w-px bg-slate-600 my-1" />
              </>
            )}
            <div className="mr-2">
              {DateUtils.formatDate(
                data?.date?.start_date || data.createdTime,
                'ko-KR'
              )}
            </div>
          </div>

          {data.tags && (
            <div className="flex items-center mb-4">
              <div className="flex gap-2 overflow-x-auto flex-nowrap max-w-full scrollbar-hide">
                {data.tags.map((tag: string) => (
                  <Tag key={tag}>{tag}</Tag>
                ))}
              </div>
            </div>
          )}

          {data.thumbnail && (
            <div className="relative w-full bg-slate-200 rounded-3xl overflow-hidden mb-7 pb-[66%]">
              <Image
                src={data.thumbnail}
                className="object-cover"
                fill
                alt={data.title}
              />
            </div>
          )}
        </nav>
      )}
    </div>
  )
}

export default BlogHeader