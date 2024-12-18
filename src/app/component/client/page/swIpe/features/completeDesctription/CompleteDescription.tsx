import Image from 'next/image'
import UserName from "@/src/app/component/client/common/userName/UserName";
import {CompleteBaseProps} from "@/src/app/types/page/swape/deck";
import DateUtils from "@/src/app/func/common/date.utils";

const CompleteDescription = (props: CompleteBaseProps) => {
    const {day, type, likeCards, deletedList} = props
    return (
        <div className='flex flex-col gap-6'>
            <div className='flex flex-row justify-between items-center'>
                <div className='flex flex-col justify-start gap-4'>
                    <div className='text-title1 font-bold text-common'>
                        <div className='flex flex-row gap-1'><UserName style='text-title1 font-bold text-common'/>님의</div> 오늘점심 <span className='text-primary-6'>Pick!</span>
                    </div>
                    <div className='text-body2 font-medium'>
                        진짜 먹고 싶은 메뉴만 남겨볼까요?
                    </div>
                </div>
                <Image src='/images/items/Pick.png' alt='pick-image' width={83} height={83}/>
            </div>
            {
                likeCards.length - deletedList.length > 4 ? (
                        <div className='text-text-2 text-caption1 font-medium w-full bg-bg-1 py-4 rounded-[12px] px-4'>
                            👀 카드가 <span className='text-primary-6'>4개 이하</span>일 때 식당을 고르기 쉬워요
                        </div>
                    )
                    : <div className=' text-caption1 font-medium w-full bg-bg-1 py-4 rounded-[12px] px-4 text-text-2'>
                        {`${DateUtils.getWeekdayWithTimezone(day)}의 ${DateUtils.mealRenderer(type)}으로 다음의 카드를 골랐어요`}
                    </div>
            }
        </div>
    )
}

export default CompleteDescription