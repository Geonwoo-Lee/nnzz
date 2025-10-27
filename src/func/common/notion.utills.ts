import { idToUuid } from "notion-utils"
import { ExtendedRecordMap, ID } from "notion-types"
import { getTextContent, getDateValue } from "notion-utils"
import { NotionAPI } from "notion-client"
import { BlockMap, CollectionPropertySchemaMap } from "notion-types"
import {customMapImageUrl} from "@/src/func/common/image.utils";
import { TPosts, TPostStatus, TPostType } from "@/src/types/common/notion";


export function getAllPageIds(
    response: ExtendedRecordMap,
    viewId?: string
) {
    const collectionQuery = response.collection_query
    const views = Object.values(collectionQuery)[0]

    let pageIds: ID[] = []
    if (viewId) {
        const vId = idToUuid(viewId)
        pageIds = views[vId]?.blockIds
    } else {
        const pageSet = new Set<ID>()
        Object.values(views).forEach((view: any) => {
            view?.collection_group_results?.blockIds?.forEach((id: ID) =>
                pageSet.add(id)
            )
        })
        pageIds = [...pageSet]
    }
    return pageIds
}


async function getPageProperties(
    id: string,
    block: BlockMap,
    schema: CollectionPropertySchemaMap
) {
    const api = new NotionAPI()
    const rawProperties = Object.entries(block?.[id]?.value?.properties || [])
    const excludeProperties = ["date", "select", "multi_select", "person", "file"]
    const properties: any = {}
    for (let i = 0; i < rawProperties.length; i++) {
        const [key, val]: any = rawProperties[i]
        properties.id = id
        if (schema[key]?.type && !excludeProperties.includes(schema[key].type)) {
            properties[schema[key].name] = getTextContent(val)
        } else {
            switch (schema[key]?.type) {
                case "file": {
                    try {
                        const Block = block?.[id].value
                        const url: string = val[0][1][0][1]
                        const newurl = customMapImageUrl(url, Block)
                        properties[schema[key].name] = newurl
                    } catch (error) {
                        properties[schema[key].name] = undefined
                    }
                    break
                }
                case "date": {
                    const dateProperty: any = getDateValue(val)
                    delete dateProperty.type
                    properties[schema[key].name] = dateProperty
                    break
                }
                case "select": {
                    const selects = getTextContent(val)
                    if (selects[0]?.length) {
                        properties[schema[key].name] = selects.split(",")
                    }
                    break
                }
                case "multi_select": {
                    const selects = getTextContent(val)
                    if (selects[0]?.length) {
                        properties[schema[key].name] = selects.split(",")
                    }
                    break
                }
                case "person": {
                    const rawUsers = val.flat()

                    const users = []
                    for (let i = 0; i < rawUsers.length; i++) {
                        if (rawUsers[i][0][1]) {
                            const userId = rawUsers[i][0]
                            const res: any = await api.getUsers(userId)
                            const resValue =
                                res?.recordMapWithRoles?.notion_user?.[userId[1]]?.value
                            const user = {
                                id: resValue?.id,
                                name:
                                    resValue?.name ||
                                    `${resValue?.family_name}${resValue?.given_name}` ||
                                    undefined,
                                profile_photo: resValue?.profile_photo || null,
                            }
                            users.push(user)
                        }
                    }
                    properties[schema[key].name] = users
                    break
                }
                default:
                    break
            }
        }
    }
    return properties
}

export { getPageProperties as default }


export function getAllSelectItemsFromPosts(
  key: "tags" | "category",
  posts: TPosts
) {
  const selectedPosts = posts.filter((post) => post?.[key])
  const items = [...selectedPosts.map((p) => p[key]).flat()]
  const itemObj: { [itemName: string]: number } = {}
  items.forEach((item) => {
    if (!item) return
    if (item in itemObj) {
      itemObj[item]++
    } else {
      itemObj[item] = 1
    }
  })
  return itemObj
}


export type FilterPostsOptions = {
  acceptStatus?: TPostStatus[]
  acceptType?: TPostType[]
}

const initialOption: FilterPostsOptions = {
  acceptStatus: ["Public"],
  acceptType: ["Post"],
}
const current = new Date()
const tomorrow = new Date(current)
tomorrow.setDate(tomorrow.getDate() + 1)
tomorrow.setHours(0, 0, 0, 0)

export function filterPosts(
  posts: TPosts,
  options: FilterPostsOptions = initialOption
) {
  const { acceptStatus = ["Public"], acceptType = ["Post"] } = options
  const filteredPosts = posts
    .filter((post) => {
      const postDate = new Date(post?.date?.start_date || post.createdTime)
      if (!post.title || !post.slug || postDate > tomorrow) return false
      return true
    })
    .filter((post) => {
      const postStatus = post.status[0]
      return acceptStatus.includes(postStatus)
    })
    .filter((post) => {
      const postType = post.type[0]
      return acceptType.includes(postType)
    })
  return filteredPosts
}


