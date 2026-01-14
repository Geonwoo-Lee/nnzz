import Image from "next/image"

const MealTaroist = () => {
  return (
    <div className='flex flex-col bg-[#FAE0E3] h-full'>
      <div className='flex-1 flex flex-col gap-4 justify-center items-center px-4 min-h-0'>
        <div className='text-heading2 font-bold text-text-1'>
          오늘 먹을 메뉴 뽑기!
        </div>
        <div className='text-body1 font-medium text-text-2'>
          카드를 뽑아 오늘의 메뉴를 정해봐요
        </div>
      </div>
      <div className='w-full flex-1 flex items-end justify-center min-h-0'>
        <div className='w-full max-h-full relative'>
          <Image src={'/assets/TarotMaster.png'} className='object-contain w-full h-auto' alt={'tarot-master'} width={393} height={195}/>
        </div>
      </div>
    </div>
  )
}

export default MealTaroist