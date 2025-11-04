import { NextPage } from "next"
import { AppProps } from "next/app"
import { ExtendedRecordMap } from "notion-types"
import { ReactElement, ReactNode } from "react"

export type NextPageWithLayout<PageProps = Record<string, unknown>> = NextPage<PageProps> & {
  getLayout?: (page: ReactElement) => ReactNode
}

export type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export type TPostStatus = "Private" | "Public" | "PublicOnDetail"
export type TPostType = "Post" | "Shorts"

type TContentBase = {
  id: string
  date: { start_date: string }
  slug: string
  tags?: string[]
  category?: string[]
  author?: {
    id: string
    name: string
    profile_photo?: string
  }[]
  title: string
  status: TPostStatus[]
  createdTime: string
  thumbnail?: string
  summary?: string
}

export type TPost = TContentBase & {
  type: ["Post"]
  fullWidth: boolean
}

export type TShorts = TContentBase & {
  type: ["Shorts"]
  videoUrl?: string
}

export type TContent = TPost | TShorts

export type PostDetail = TPost & {
  recordMap: ExtendedRecordMap
}

export type ShortsDetail = TShorts & {
  recordMap: ExtendedRecordMap
}

export type ContentDetail = PostDetail | ShortsDetail

export type TPosts = TPost[]
export type TShortsList = TShorts[]
export type TContents = TContent[]

export type TTags = {
  [tagName: string]: number
}
export type TCategories = {
  [category: string]: number
}

export type SchemeType = "light" | "dark"

export function isPost(content: TContent): content is TPost {
  return content.type[0] === "Post"
}

export function isShorts(content: TContent): content is TShorts {
  return content.type[0] === "Shorts"
}