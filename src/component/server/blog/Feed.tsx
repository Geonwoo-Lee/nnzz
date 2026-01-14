import PostList from "@/src/component/client/blog/postList/PostList"
import CategoryList from "@/src/component/client/blog/categoryList/CategoryList"

const Feed = () => {
  return (
    <div className="max-w-[640px] mx-auto">
      <div className="px-4 pt-2">
        <div className="text-title1 font-medium py-5 leading-[1.3] text-text-1">
          쩝쩝박사님들의 <br/>
          <span className="font-bold">지역별 맛집</span> 리뷰 보기!
        </div>
      </div>

      <div className="sticky top-0 z-10 bg-white px-4 pb-4">
        <CategoryList />
      </div>

      <div className="px-4">
        <PostList />
      </div>
    </div>
  )
}

export default Feed