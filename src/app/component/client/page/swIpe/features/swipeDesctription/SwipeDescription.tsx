

const SwipeDescription = () => {
    return <div className='py-6 px-4 flex flex-col gap-8'>
        <div className='flex flex-col gap-4 text-center'>
            <div className='text-text-1 text-title2 font-semibold '>
                냠냠님의 오늘의 점심픽은?
            </div>
            <div className='font-medium text-text-3 text-body2'>
                오늘 왠지 끌리는 음식을 골라봐요.
            </div>
        </div>
        <div className='flex flex-col gap-3 py-1 justify-center items-center'>
            <div className='bg-bg-9 w-fit rounded-large'>
                <div className='py-2 px-3 text-common-white'>
                    사용 TIP
                </div>
            </div>
            <div>
                먹고 싶은 음식에 하트 ❤️를 눌러주세요!
            </div>
        </div>
    </div>
}

export default SwipeDescription