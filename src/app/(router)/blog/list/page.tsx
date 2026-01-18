// app/(route)/blog/list/page.tsx
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { queryKey } from "@/src/types/hook/postQuery";
import { NotionAPI } from "notion-client";
import getPageProperties, { filterPosts, getAllPageIds } from "@/src/func/common/notion.utills";
import Feed from "@/src/component/server/blog/Feed";
import { TPost } from "@/src/types/common/notion";
import { memoryCache } from "@/src/lib/cache";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const CACHE_KEY = "posts_list";
const CACHE_TTL = 5 * 60 * 1000; // 5분

async function fetchPosts(retryCount = 0): Promise<TPost[]> {
  // 캐시 확인
  const cached = memoryCache.get<TPost[]>(CACHE_KEY);
  if (cached) {
    console.log("Returning cached posts data");
    return cached;
  }

  const api = new NotionAPI();
  const pageId =
    process.env.NEXT_PUBLIC_NOTION_POST_PAGE_ID!
  const maxRetries = 3;

  try {
    const response = await api.getPage(pageId);
    const pageIds = getAllPageIds(response);

    const allPosts = await Promise.all(
      pageIds.map(async (id) => {
        return await getPageProperties(
          id,
          response.block,
          Object.values(response.collection)[0]?.value?.schema || {},
        );
      }),
    );

    const filtered = filterPosts(allPosts, {
      acceptStatus: ["Public"],
      acceptType: ["Post"],
    });

    // 캐시에 저장
    memoryCache.set(CACHE_KEY, filtered, CACHE_TTL);

    return filtered;
  } catch (error) {
    console.error(`Failed to fetch posts (attempt ${retryCount + 1}/${maxRetries + 1}):`, error);

    if (retryCount < maxRetries) {
      // Exponential backoff: 2초, 4초, 8초
      const delay = Math.pow(2, retryCount + 1) * 1000;
      console.log(`Retrying in ${delay}ms...`);
      await new Promise(resolve => setTimeout(resolve, delay));
      return fetchPosts(retryCount + 1);
    }

    console.error("Error details:", {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      pageId: pageId,
      env: process.env.NODE_ENV
    });

    // 재시도 실패 시 캐시에 있는 오래된 데이터라도 반환
    const staleCache = memoryCache.get<TPost[]>(CACHE_KEY, true);
    if (staleCache) {
      console.warn("Returning stale cached data due to API failure");
      return staleCache;
    }

    return [];
  }
}

export default async function BlogPage() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 0,
        gcTime: 0,
      },
    },
  });

  const posts = await fetchPosts();

  await queryClient.prefetchQuery({
    queryKey: queryKey.posts(),
    queryFn: () => posts,
  });

  const baseUrl = 'https://www.nnzz.today';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: '냠냠쩝쩝 맛집 블로그',
    description: '직장인을 위한 점심메뉴 고민 해결!',
    itemListElement: posts.slice(0, 10).map((post, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Article',
        '@id': `${baseUrl}/blog/${post.slug}`,
        url: `${baseUrl}/blog/${post.slug}`,
        headline: post.title,
        description: post.summary || post.title,
        image: post.thumbnail || `${baseUrl}//icon/app-icon-192x192.png`,
        datePublished: post.date,
        author: {
          '@type': 'Person',
          name: post.author?.[0]?.name || '냠냠쩝쩝',
        },
        keywords: post.tags?.join(', '),
        about: {
          '@type': 'Thing',
          name: '맛집 블로그'
        }
      },
    })),
  };

  // 웹사이트 정보
  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: '냠냠쩝쩝',
    alternateName: 'NNZZ',
    url: baseUrl,
    description: '직장인을 위한 맛집 추천 및 메뉴 추천 서비스',
    potentialAction: {
      '@type': 'SearchAction',
      target: `${baseUrl}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string'
    },
    publisher: {
      '@type': 'Organization',
      name: '냠냠쩝쩝',
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}//icon/app-icon-192x192.png`,
      },
    },
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: '냠냠쩝쩝 홈',
        item: `${baseUrl}/home`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: '냠냠쩝쩝 블로그',
        item: `${baseUrl}/blog/list`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Feed />
      </HydrationBoundary>
    </>
  );
}