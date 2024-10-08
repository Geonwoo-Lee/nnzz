import ConveyorCarousel from "@/src/app/component/client/page/home/conveyorCarousel/ConveyorCarousel";
import {CarouselDirection} from "@/src/app/types/page/home/carousel";
import Image from 'next/image'


const HomeCarousel = () => {
    const imagePath = '/images/food/'
    const row1 = ['food-row-1-1.png', 'food-row-1-2.png', 'food-row-1-3.png','food-row-1-4.png','food-row-1-5.png']
    const row2 = ['food-row-2-1.png', 'food-row-2-2.png', 'food-row-2-3.png','food-row-2-4.png','food-row-2-5.png']

    const repeatedRow1 = [...row1, ...row1]
    const repeatedRow2 = [...row2, ...row2]
    return (
   <div className='w-full max-w-[640px] mx-auto flex flex-col'>
       <ConveyorCarousel speed={30}>
           <div className='flex flex-row gap-6 py-3'>
               {
                   repeatedRow1.map((el, index) => (
                       <div
                           key={`1st-carousel-key-${index}`}
                           className={`w-[83px] h-[83px] border border-[#F2EBEB] rounded-[16px] flex items-center justify-center bg-[#F7F7F7] ${index === repeatedRow1.length-1 ? 'mr-6' : ''}`}>
                           <Image width={60} height={60} src={`${imagePath}${el}`} alt={`food-row-2-${index}`}/>
                       </div>
                   ))
               }
           </div>
       </ConveyorCarousel>
       <ConveyorCarousel speed={30} direction={CarouselDirection.RIGHT}>
           <div className='flex flex-row gap-6 py-3'>
               {
                   repeatedRow2.map((el, index) => (
                       <div
                           key={`2st-carousel-key-${index}`}
                           className={`w-[83px] items-center border border-[#F2EBEB]  justify-center flex h-[83px] rounded-[16px] bg-[#F7F7F7] ${index === repeatedRow2.length - 1 ? 'mr-6' : ''}`}>
                           <Image width={60} height={60} src={`${imagePath}${el}`} alt={`food-row-2-${index}`}/>
                       </div>
                   ))
               }
           </div>
       </ConveyorCarousel>
   </div>
    )
}

export default HomeCarousel