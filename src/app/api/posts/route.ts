import { NextResponse } from "next/server";
import { NotionAPI } from "notion-client";
import getPageProperties, { filterPosts, getAllPageIds } from "@/src/func/common/notion.utills";

export async function GET() {
  const api = new NotionAPI();
  const pageId = process.env.NEXT_PUBLIC_NOTION_DATABASE_ID || "26eb3b6a7ac28183933cf34239a4b326";

  try {
    const response = await api.getPage(pageId);
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

    const posts = filterPosts(allPosts, {
      acceptStatus: ["Public"],
      acceptType: ["Post"],
    });

    return NextResponse.json(posts);
  } catch (error) {
    console.error("Failed to fetch posts:", error);
    return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 });
  }
}

export const dynamic = "force-dynamic";