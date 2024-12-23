'use client';

import {FoodieWayConfigType, FoodieWayProps} from "@/src/app/types/page/home/foodieWay";
import Image from "next/image";

const FoodieWay = ({type, onChangeWay} : FoodieWayProps) => {
    const wayConfig: FoodieWayConfigType = {
        fast: {
            title: '빠른 찾기',
            description: '빨리 빨리 \n고르고싶어요',
            icon: <Image src={'/images/items/FastFind.png'} alt='fast' width={135} height={135} />
        },
        slow: {
            title: '맛의 짝 찾기',
            description: '무엇을 먹고 싶은지 \n잘 모르겠어요',
            icon: <Image src={'/images/items/SlowFind.png'} alt='fast' width={135} height={135} />
        },
    }
    const typeStyle = () => {
        switch (type) {
            case 'fast':
                return 'bg-green-200'
            case 'slow':
                return 'bg-red-200'
        }
    }
    return <div className={`w-full rounded-[16px]  ${typeStyle()}`} onClick={onChangeWay}>
        <div className='p-4 w-full flex flex-row justify-between h-[135px] relative'>
            <div className='flex flex-col gap-2'>
                <div className='whitespace-pre-wrap text-caption1 font-regular '>
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