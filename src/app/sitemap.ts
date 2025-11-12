import { MetadataRoute } from 'next'
import { NotionAPI } from "notion-client"
import getPageProperties, { filterPosts, getAllPageIds } from "@/src/func/common/notion.utills"
import { TPost } from "@/src/types/common/notion";

export const dynamic = 'force-dynamic'
export const revalidate = 1800

async function fetchAllPosts(): Promise<TPost[]> {
  const api = new NotionAPI()
  const databaseId = "26eb3b6a7ac28183933cf34239a4b326"

  try {
    const response = await api.getPage(databaseId)
    const pageIds = getAllPageIds(response)

    const allPosts = await Promise.all(
      pageIds.map(async (id) => {
        return await getPageProperties(
          id,
          response.block,
          Object.values(response.collection)[0]?.value?.schema || {},
        )
      }),
    )

    return filterPosts(allPosts, {
      acceptStatus: ["Public"],
      acceptType: ["Post"],
    })
  } catch (error) {
    console.error("Failed to fetch posts:", error)
    return []
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.nnzz.today'

  let posts: TPost[] = []
  try {
    posts = await fetchAllPosts()
  } catch (error) {
    console.error("Error fetching posts for sitemap:", error)
  }

  const postUrls = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date.start_date),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  const types = ['점심', '저녁']
  const days = ['월요일', '화요일', '수요일', '목요일', '금요일', '토요일', '일요일']

  const fastChoiceUrls = types.flatMap(type =>
    days.map(day => ({
      url: `${baseUrl}/fast-choice/${encodeURIComponent(type)}/${encodeURIComponent(day)}`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.6,
    }))
  )

  const swipeUrls = types.flatMap(type =>
    days.map(day => ({
      url: `${baseUrl}/swipe/${encodeURIComponent(type)}/${encodeURIComponent(day)}`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.6,
    }))
  )

  const randomUrls = types.flatMap(type =>
    days.map(day => ({
      url: `${baseUrl}/random/${encodeURIComponent(type)}/${encodeURIComponent(day)}`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.7,
    }))
  )

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/home`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    // 위치 관련
    {
      url: `${baseUrl}/find-location`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/location`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/location-request`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.4,
    },
    {
      url: `${baseUrl}/blog/list`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/shorts`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/shorts/list`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/sign-up`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/setting`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.4,
    },
    {
      url: `${baseUrl}/edit`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.4,
    },
    ...randomUrls,
    ...fastChoiceUrls,
    ...swipeUrls,
    ...postUrls,
  ]
}