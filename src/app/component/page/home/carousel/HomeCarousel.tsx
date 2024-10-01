import ConveyorCarousel from "@/src/app/component/client/conveyorCarousel/ConveyorCarousel";
import {CarouselDirection} from "@/src/app/types/component/carousel";


const HomeCarousel = () => {
    const testArray = ['', '', '','','','','','','',]
    return (
   <div className='w-full max-w-[640px] mx-auto flex flex-col'>
       <ConveyorCarousel speed={30}>
           <div className='flex flex-row gap-6 py-3'>
               {
                   testArray.map((el, index) => (
                       <div
                           key={`1st-carousel-key-${index}`}
                           className={`w-[83px] h-[83px] rounded-[16px] bg-[#F2EBEB] ${index === testArray.length-1 ? 'mr-6' : ''}`}>
                       </div>
                   ))
               }
           </div>
       </ConveyorCarousel>
       <ConveyorCarousel speed={30} direction={CarouselDirection.RIGHT}>
           <div className='flex flex-row gap-6 py-3'>
               {
                   testArray.map((el, index) => (
                       <div
                           key={`2st-carousel-key-${index}`}
                           className={`w-[83px] h-[83px] rounded-[16px] bg-[#F2EBEB] ${index === testArray.length - 1 ? 'mr-6' : ''}`}>
                       </div>
                   ))
               }
           </div>
       </ConveyorCarousel>
   </div>
    )
}

export default HomeCarousel