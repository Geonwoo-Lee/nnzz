import UserName from "@/src/app/component/client/common/userName/UserName";


const SwipeDescription = () => {
    return <div className='pt-6 text-center px-4 flex flex-col gap-8'>
            <div className='text-text-1 text-title2 font-semibold flex flex-row justify-center gap-1'>
                <UserName style='text-text-1 text-title2 font-semibold'/>님의 오늘의 점심픽은?
            </div>
    </div>
}

export default SwipeDescription