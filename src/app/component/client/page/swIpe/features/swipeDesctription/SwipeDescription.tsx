import UserName from "@/src/app/component/client/common/userName/UserName";
import DateUtils from "@/src/app/func/common/date.utils";


const SwipeDescription = ({type}: {type: string}) => {
    return <div className=' text-center px-4 flex flex-col gap-8'>
            <div className='text-text-1 text-title2 font-medium flex flex-row justify-center gap-1'>
                <UserName style='text-text-1 text-title2 font-medium'/>님의 오늘의 {`${DateUtils.mealRenderer(type)}`}픽은?
            </div>
    </div>
}

export default SwipeDescription