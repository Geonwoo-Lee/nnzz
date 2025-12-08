// app/(route)/blog/[slug]/page.tsx
import { NotionAPI } from "notion-client";
import getPageProperties, { filterPosts, getAllPageIds } from "@/src/func/common/notion.utills";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { PostDetail } from "@/src/types/common/notion";
import BlogCategory from "@/src/component/client/blog/blogCategory/BlogCategory";
import BlogHeader from "@/src/component/client/blog/blogHeader/BlogHeader";
import NotionRenderer from "@/src/component/client/blog/notionRenderer/NotionRenderer";

export const dynamic = 'force-dynamic'
export const revalidate = 0

async function fetchAllPosts() {
  const api = new NotionAPI()
  const databaseId = "26eb3b6a7ac28183933cf34239a4b326"

  try {
    const response = await api.getPage(databaseId);
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

    return filterPosts(allPosts, {
      acceptStatus: ["Public"],
      acceptType: ["Post"],
    });
  } catch (error) {
    console.error("Failed to fetch posts:", error)
    return []
  }
}

async function fetchPostBySlug(slug: string): Promise<PostDetail | null> {
  const api = new NotionAPI()

  try {
    const allPosts = await fetchAllPosts()
    const post = allPosts.find(p => p.slug === slug)

    if (!post) {
      return null
    }

    const recordMap = await api.getPage(post.id)

    return {
      ...post,
      recordMap,
    }
  } catch (error) {
    console.error("Failed to fetch post:", error)
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
              <BlogCategory readOnly={post.status?.[0] === "PublicOnDetail"}>
                {category}
              </BlogCategory>
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
  )
}