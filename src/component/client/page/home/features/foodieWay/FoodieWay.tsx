'use client';

import {FoodieWayConfigType, FoodieWayProps} from "@/src/types/page/home/foodieWay";
import Image from "next/image";

const FoodieWay = ({type, onChangeWay} : FoodieWayProps) => {
    const wayConfig: FoodieWayConfigType = {
      fast: {
        title: "빠른 찾기",
        description: "빨리 빨리 \n고르고싶어요",
        icon: (
          <Image
            src={"/images/items/FastFind2.png"}
            alt="fast"
            width={52}
            height={52}
          />
        ),
      },
      slow: {
        title: "맛의 짝 찾기",
        description: "카드 스와이프로",
        icon: (
          <Image
            src={"/images/items/SlowFind2.png"}
            alt="fast"
            width={52}
            height={52}
          />
        ),
      },
    };

    return <div className={`w-full rounded-[16px] bg-blue-50`} onClick={onChangeWay}>
        <div className='p-4 w-full flex flex-row justify-between h-[138px] relative'>
            <div className='flex flex-col gap-2'>
                <div className='whitespace-pre-wrap text-caption2 font-medium '>
                    {wayConfig[type].description}
                </div>
                <div className='text-title2 font-medium'>
                    {wayConfig[type].title}
                </div>
            </div>
            <div className='absolute bottom-0 right-0'>
                {wayConfig[type].icon}
            </div>
        </div>
    </div>
}

export default FoodieWay