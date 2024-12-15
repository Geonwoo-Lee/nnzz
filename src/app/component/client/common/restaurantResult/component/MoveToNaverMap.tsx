import Image from 'next/image'

const MoveToNaverMap = () => {
    return (
        <div className='h-screen flex flex-col gap-2 justify-center items-center w-full'>
            <div className='text-center text-title2 font-regular text-text-1'>
                맛있는 여정을 준비하고 있어요... <br/>
                곧 맛집으로 안내해 드릴게요!
            </div>
            <Image width={200} height={200} src='/assets/Food.gif' alt='naver-map' />
        </div>
    )
}

export default MoveToNaverMap