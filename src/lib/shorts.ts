import { NotionAPI } from "notion-client";
import getPageProperties, { filterShorts, getAllPageIds } from "@/src/func/common/notion.utills";
import { TContent } from "@/src/types/common/notion";
import { memoryCache } from "./cache";

const CACHE_KEY = "shorts_list";
const CACHE_TTL = 5 * 60 * 1000; // 5분

export async function fetchShorts(retryCount = 0) {
  // 캐시 확인
  const cached = memoryCache.get<TContent[]>(CACHE_KEY);
  if (cached) {
    console.log("Returning cached shorts data");
    return cached;
  }

  const api = new NotionAPI();
  const pageId =
    process.env.NEXT_PUBLIC_NOTION_SHORTS_PAGE_ID ||
    "26eb3b6a7ac28183933cf34239a4b326";
  const maxRetries = 3;

  try {
    const response = await api.getPage(pageId);
    const pageIds = getAllPageIds(response);

    const allContent = await Promise.all(
      pageIds.map(async (id) => {
        return await getPageProperties(
          id,
          response.block,
          Object.values(response.collection)[0]?.value?.schema || {},
        );
      }),
    );

    const filtered = filterShorts(allContent as TContent[], {
      acceptStatus: ["Public"],
      acceptType: ["Shorts"],
    });

    // 캐시에 저장
    memoryCache.set(CACHE_KEY, filtered, CACHE_TTL);

    return filtered;
  } catch (error) {
    console.error(`Failed to fetch shorts (attempt ${retryCount + 1}/${maxRetries + 1}):`, error);

    if (retryCount < maxRetries) {
      // Exponential backoff: 2초, 4초, 8초
      const delay = Math.pow(2, retryCount + 1) * 1000;
      console.log(`Retrying in ${delay}ms...`);
      await new Promise(resolve => setTimeout(resolve, delay));
      return fetchShorts(retryCount + 1);
    }

    // 재시도 실패 시 캐시에 있는 오래된 데이터라도 반환
    const staleCache = memoryCache.get<TContent[]>(CACHE_KEY, true);
    if (staleCache) {
      console.warn("Returning stale cached data due to API failure");
      return staleCache;
    }

    return [];
  }
}