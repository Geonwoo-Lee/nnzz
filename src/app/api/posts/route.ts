import { NextResponse } from "next/server";
import { NotionAPI } from "notion-client";
import getPageProperties, { filterPosts, getAllPageIds } from "@/src/func/common/notion.utills";

export async function GET() {
  const api = new NotionAPI();
  const pageId = process.env.NEXT_PUBLIC_NOTION_DATABASE_ID || "26eb3b6a7ac28183933cf34239a4b326";

  try {
    const response = await api.getPage(pageId);
    const pageIds = await getAllPageIds(response, api);

    const collectionValue = Object.values(response.collection)[0] as unknown as { value: { value: { schema: Record<string, any> } } };
    const schema = collectionValue?.value?.value?.schema || {};

    const results = await Promise.allSettled(
      pageIds.map((id) => getPageProperties(id, response.block, schema)),
    );
    const allPosts = results
      .filter((r): r is PromiseFulfilledResult<any> => r.status === "fulfilled")
      .map((r) => r.value);

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