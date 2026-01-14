import Image from "next/image"

const MealTaroist = () => {
  return (
    <div className='flex flex-col bg-[#FAE0E3] h-full'>
      <div className='flex-1 py-10 flex flex-col gap-3 justify-center items-center'>
        <div className='text-heading2 font-bold text-text-1'>
          오늘 먹을 메뉴 뽑기!
        </div>
        <div className='text-body1 font-medium text-text-2'>
          카드를 뽑아 오늘의 메뉴를 정해봐요
        </div>
      </div>
      <div className='w-full aspect-[393/195] relative'>
        <Image src={'/assets/TarotMaster.png'} className='object-cover' alt={'tarot-master'} fill/>
      </div>
    </div>
  )
}

export default MealTaroist
