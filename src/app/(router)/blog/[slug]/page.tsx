// app/(route)/blog/[slug]/page.tsx
import { NotionAPI } from "notion-client";
import getPageProperties, { filterPosts, getAllPageIds } from "@/src/func/common/notion.utills";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { PostDetail } from "@/src/types/common/notion";
import BlogHeader from "@/src/component/client/blog/blogHeader/BlogHeader";
import NotionRenderer from "@/src/component/client/blog/notionRenderer/NotionRenderer";
import { memoryCache } from "@/src/lib/cache";
import BlogColorTag from "@/src/component/client/blog/blogTag/BlogColorTag";

export const dynamic = 'force-dynamic'
export const revalidate = 0

const CACHE_KEY_POSTS = "posts_list";
const CACHE_TTL = 5 * 60 * 1000; // 5분

async function fetchAllPosts(retryCount = 0) {
  // 캐시 확인
  const cached = memoryCache.get<any[]>(CACHE_KEY_POSTS);
  if (cached) {
    return cached;
  }

  const api = new NotionAPI()
  const databaseId = "26eb3b6a7ac28183933cf34239a4b326"
  const maxRetries = 3;

  try {
    const response = await api.getPage(databaseId);
    const pageIds = getAllPageIds(response);

    const allPosts = await Promise.all(
      pageIds.map(async (id) => {
        return await getPageProperties(
          id,
          response.block,
          Object.values(response.collection)[0]?.value?.value?.schema || {},
        );
      }),
    );

    const filtered = filterPosts(allPosts, {
      acceptStatus: ["Public"],
      acceptType: ["Post"],
    });

    // 캐시에 저장
    memoryCache.set(CACHE_KEY_POSTS, filtered, CACHE_TTL);

    return filtered;
  } catch (error) {
    console.error(`Failed to fetch posts (attempt ${retryCount + 1}/${maxRetries + 1}):`, error)

    if (retryCount < maxRetries) {
      const delay = Math.pow(2, retryCount + 1) * 1000;
      await new Promise(resolve => setTimeout(resolve, delay));
      return fetchAllPosts(retryCount + 1);
    }

    const staleCache = memoryCache.get<any[]>(CACHE_KEY_POSTS, true);
    if (staleCache) {
      return staleCache;
    }

    return []
  }
}

async function fetchPostBySlug(slug: string, retryCount = 0): Promise<PostDetail | null> {
  const api = new NotionAPI()
  const maxRetries = 3;
  const CACHE_KEY_POST = `post_detail_${slug}`;

  try {
    // 개별 포스트 캐시 확인
    const cachedPost = memoryCache.get<PostDetail>(CACHE_KEY_POST);
    if (cachedPost) {
      return cachedPost;
    }

    const allPosts = await fetchAllPosts()
    const post = allPosts.find(p => p.slug === slug)

    if (!post) {
      return null
    }

    const recordMap = await api.getPage(post.id)

    const postDetail = {
      ...post,
      recordMap,
    };

    // 개별 포스트 캐시에 저장
    memoryCache.set(CACHE_KEY_POST, postDetail, CACHE_TTL);

    return postDetail;
  } catch (error) {

    if (retryCount < maxRetries) {
      // Exponential backoff: 2초, 4초, 8초
      const delay = Math.pow(2, retryCount + 1) * 1000;
      await new Promise(resolve => setTimeout(resolve, delay));
      return fetchPostBySlug(slug, retryCount + 1);
    }

    // 재시도 실패 시 캐시에 있는 오래된 데이터라도 반환
    const staleCache = memoryCache.get<PostDetail>(CACHE_KEY_POST, true);
    if (staleCache) {
      console.warn(`Returning stale cached post detail for slug: ${slug}`);
      return staleCache;
    }

    return null
  }
}

export async function generateMetadata({
                                         params
                                       }: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = await fetchPostBySlug(slug)

  if (!post) {
    return {
      title: 'Post Not Found',
      description: 'The requested post could not be found.'
    }
  }

  const title = post.title
  const description = post.summary || post.title
  const publishedDate = post.date.start_date
  const tags = post.tags || []
  const ogImage = post.thumbnail!
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://nnzz.today'
  const postUrl = `${siteUrl}/blog/${slug}`
  const authorName = post.author?.[0]?.name || 'Your Name'

  return {
    title,
    description,
    keywords: tags.join(', '),
    authors: [{ name: authorName }],
    openGraph: {
      title,
      description,
      url: postUrl,
      siteName: 'Your Blog Name',
      locale: 'ko_KR',
      type: 'article',
      publishedTime: publishedDate,
      tags: tags,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        }
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
      creator: authorName,
    },
    robots: {
      index: post.status[0] === "Public",
      follow: post.status[0] === "Public",
      googleBot: {
        index: post.status[0] === "Public",
        follow: post.status[0] === "Public",
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    alternates: {
      canonical: postUrl,
    },
  }
}

export default async function PostPage({
                                         params
                                       }: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  const post = await fetchPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const category = (post.category && post.category?.[0]) || undefined

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.summary || post.title,
    image: post.thumbnail!,
    datePublished: post.date.start_date,
    author: {
      '@type': 'Person',
      name: post.author?.[0]?.name || 'NNZZ',
    },
    publisher: {
      '@type': 'Organization',
      name: '냠냠쩝쩝 에디터의 맛집',
      logo: {
        '@type': 'ImageObject',
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/icon/app-icon-192x192.png`,
      },
    },
    keywords: post.tags?.join(', '),
    articleSection: post.category?.[0],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-[640px] mx-auto px-6 py-3 rounded-3xl bg-white shadow-md">
        <article className="mx-auto max-w-full">
          {category && (
            <div className="mb-2">
              <BlogColorTag>
                {category}
              </BlogColorTag>
            </div>
          )}

          {post.type?.[0] === "Post" && <BlogHeader data={post} />}

          {post.recordMap && (
            <div>
              <NotionRenderer recordMap={post.recordMap} />
            </div>
          )}
        </article>
      </div>
    </>
  );
}