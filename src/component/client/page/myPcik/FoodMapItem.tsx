// FoodMapItem.tsx
import { FoodStoreItemWithImage } from "@/src/types/page/home/mypick";
import Image from "next/image";
import React from "react";
import Button from "@/src/component/client/common/button/Button";

const FoodMapItem = ({ data }: { data: FoodStoreItemWithImage }) => {
  const handleOpenNaverMap = () => {
    window.open(`https://map.naver.com/p/entry/place/${data.storeId}`, '_blank');
  };

  return (
    <div className="flex flex-row w-full gap-4">
      <div className={"flex flex-col gap-1"}>
        <div className="relative w-[48px] h-[48px] rounded-[8px] overflow-hidden flex items-center justify-center">
          {data.bgType && (
            <Image
              src={`/images/bg/${data.bgType}.png`}
              alt="background"
              fill
              className="object-cover"
              draggable={false}
            />
          )}

          <Image
            src={data.imageUrl}
            alt={data.name}
            width={32}
            height={32}
            className="relative z-10"
            draggable={false}
          />
        </div>
        <div className="flex-1 border-l-2 border-bg-3 ml-[23px]"></div>
      </div>
      <div className="w-full min-h-[175px] bg-bg-0 rounded-[16px]">
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-3">
            <div className="text-body1 font-bold text-text-1">{data.name}</div>
            <div className="text-caption3 line-clamp-1 truncate font-regular text-text-3">
              {data.address}
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <div className="text-caption1 flex items-center gap-1 flex-row text-text-1 font-medium">
              🍽️ {data.category}
            </div>
            <div className="flex flex-row items-center gap-1 text-caption1 font-medium text-text-1">
              ⏱️
              <div className="">{data.cardDate.replaceAll("-", ".")}</div>·
              <div>{data.mealtime}</div>
            </div>
          </div>
          <Button onClick={handleOpenNaverMap} type="secondary" size="md">
            지도 확인하기
          </Button>
        </div>
      </div>
    </div>
  );
};
export default FoodMapItem;
