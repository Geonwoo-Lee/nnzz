'use client';

import {FoodieWayConfigType, FoodieWayProps} from "@/src/app/types/page/home/foodieWay";
import Image from "next/image";

const FoodieWay = ({type, onChangeWay} : FoodieWayProps) => {
    const wayConfig: FoodieWayConfigType = {
        fast: {
            title: '빠른 찾기',
            description: '빨리빨리 \n 고르고싶어요',
            icon: <Image src={'/images/items/FastFind.png'} alt='fast' width={135} height={135} />
        },
        slow: {
            title: '맛의 짝 찾기',
            description: '무엇을 먹고 싶은지 \n 잘 모르겠어요',
            icon: <Image src={'/images/items/SlowFind.png'} alt='fast' width={135} height={135} />
        },
    }
    const typeStyle = () => {
        switch (type) {
            case 'fast':
                return 'bg-red-200'
            case 'slow':
                return 'bg-green-200'
        }
    }
    return <div className={`w-full rounded-[16px] ${typeStyle()}`} onClick={onChangeWay}>
        <div className='p-4 w-full flex flex-row justify-between'>
            <div className='flex flex-col gap-2'>
                <div className='whitespace-pre-wrap text-caption1 font-regular '>
                    {wayConfig[type].description}
                </div>
                <div className='text-title2 font-semibold'>
                    {wayConfig[type].title}
                </div>
            </div>
            {wayConfig[type].icon}
        </div>
    </div>
}

export default FoodieWay