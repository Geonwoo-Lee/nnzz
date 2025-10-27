import {NotionAPI} from "notion-client"
import {idToUuid} from "notion-utils"

import getPageProperties, {getAllPageIds} from "@/src/func/common/notion.utills";
import {TPosts} from "@/src/types/common/notion";


export const getPosts = async () => {
    let id = process.env.NEXT_PUBLIC_NOTION_PAGE_ID as string
    const api = new NotionAPI()

    const response = await api.getPage(id)
    id = idToUuid(id)
    const collection = Object.values(response.collection)[0]?.value
    const block = response.block
    const schema = collection?.schema

    const rawMetadata = block[id].value

    if (
        rawMetadata?.type !== "collection_view_page" &&
        rawMetadata?.type !== "collection_view"
    ) {
        return []
    } else {
        const pageIds = getAllPageIds(response)
        const data = []
        for (let i = 0; i < pageIds.length; i++) {
            const id = pageIds[i]
            const properties = (await getPageProperties(id, block, schema)) || null
            properties.createdTime = new Date(
                block[id].value?.created_time
            ).toString()
            properties.fullWidth =
                (block[id].value?.format as any)?.page_full_width ?? false

            data.push(properties)
        }
        data.sort((a: any, b: any) => {
            const dateA: any = new Date(a?.date?.start_date || a.createdTime)
            const dateB: any = new Date(b?.date?.start_date || b.createdTime)
            return dateB - dateA
        })

        return data as TPosts
    }
}


export const getRecordMap = async (pageId: string) => {
    const api = new NotionAPI()
    return await api.getPage(pageId)
}

