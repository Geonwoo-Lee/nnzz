import Image from "next/image"
import { useHeightUnit } from "@/src/hooks/useHeightUnit";
import { useRouter } from "next/navigation";

const NoFoodItem = () => {
  const { unit: unitHeight } = useHeightUnit();
  const router = useRouter();

  return (
    <div
      className="flex flex-col gap-8 items-center justify-center"
      style={{ height: `calc(100${unitHeight} - 60px)` }}
    >
      <div className="relative aspect-[361/197] w-full">
        <Image src={"/assets/noPick.png"} fill alt="no-card-list" />
      </div>
      <div className="flex flex-col items-center gap-8 justify-center text-center">
        <div className="flex flex-col gap-5">
          <div className="text-title1 font-bold text-text-1">
            아직 고른 식당이 없어요!
          </div>
          <div className="text-body2 font-medium text-text-3">
            최종 선택한 식당만 여기에 기록돼요
          </div>
        </div>
        <div onClick={() => {
          router.push("/home")
        }} className="border border-line-3 rounded-[8px] cursor-pointer active:scale-95">
          <div className="py-2.5 px-3 text-caption1 font-medium text-text-3 ">
            먹고싶은 음식 찾아보기
          </div>
        </div>
      </div>
    </div>
  );
}

export default NoFoodItem