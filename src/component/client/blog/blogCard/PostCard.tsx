import Link from "next/link";
import Image from "next/image";
import { TPost } from "@/src/types/common/notion";
import DateUtils from "@/src/func/common/date.utils";
import BlogColorTag from "@/src/component/client/blog/blogTag/BlogColorTag";

type Props = {
  data: TPost;
  mode?: "vertical" | "horizon";
};

const PostCard: React.FC<Props> = ({ data, mode = "vertical" }) => {
  const category = (data.category && data.category?.[0]) || undefined;

  return (
    <Link href={`/blog/${data.slug}`} className="block mb-6 border rounded-[16px]  border-black/8">
      <article className="relative overflow-hidden rounded-2xl bg-white transition-shadow duration-300 hover:shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1),0_4px_6px_-2px_rgba(0,0,0,0.05)]">
        {data.thumbnail && (
          <div className={`relative w-full bg-slate-200 ${
            mode === "horizon" ? "aspect-[640/440]" : "aspect-[361/240]"
          }`}>
            <Image
              src={data.thumbnail}
              fill
              alt={data.title}
              className="object-cover"
            />
          </div>
        )}

        <div
          className={`px-5 py-6 ${!data.thumbnail ? "pt-14" : ""} ${!category ? "pt-6" : ""}`}
        >
          <div className="flex flex-col gap-3">
            {category && (
                <BlogColorTag>{category}</BlogColorTag>
            )}
            <div className="flex items-center gap-2">
              <div className="text-caption2 font-regular text-slate-600">
                {DateUtils.formatDate(
                  data?.date?.start_date || data.createdTime,
                  "ko-KR",
                )}
              </div>
            </div>
            <h2 className="text-body1 font-bold cursor-pointer line-clamp-2">
              {data.title}
            </h2>
            <p className="text-caption1 font-regular text-slate-700 line-clamp-2 ">
              {data.summary}
            </p>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default PostCard;