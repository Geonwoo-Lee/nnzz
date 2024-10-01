// import Deck from "@/src/app/component/deck/Deck";
// import freeFoodData from "@/src/app/dummy/dummy";

import Nnzz from '../../public/svg/logo/Nnzzsvg.svg'
import dynamic from "next/dynamic";
import Image from "next/image";



export default function Home() {

    const KakaoButton = dynamic(() => import('@/src/app/component/client/button/KakaoButton'), { ssr: false });
    const HomeCarousel = dynamic(() => import('@/src/app/component/page/home/carousel/HomeCarousel'), {ssr: false});



  return (
    <div className="flex flex-col gap-10 bg-white w-full justify-center items-center ">
      {/*<div className="text-xl font-normal text-black text-center">*/}
      {/*    nnzz(냠냠쩝쩝)은 오픈 준비중 ! 박사님들이 열심히 연구중이에요 조금만 기다려주세요 ! 😀🫶*/}
      {/*</div>*/}
      {/*  <Deck cards={freeFoodData}/>*/}
      <div className="h-[100vh] w-full flex flex-col items-center justify-center relative">
             <div className='flex flex-col justify-center items-center gap-8  pt-16 pb-16'>
                 <Image width={128} height={128} src={'/images/logo/nnzz-home-logo.png'}  alt='nnzz-logo'/>
                 <div className='flex flex-col  justify-center items-center gap-4 text-common font-bold text-md'>
                     <Nnzz/>
                     직장인들 점심 저녁 메뉴 고민을 함께 해요🧚‍
                 </div>
             </div>
          <HomeCarousel/>
          <div className='absolute bottom-10 w-full pl-4 pr-4'>
              <KakaoButton/>
          </div>
      </div>
    </div>
  );
}


// import Nnzz from '../../public/svg/logo/Nnzzsvg.svg'
// import dynamic from "next/dynamic";
// import Image from "next/image";
//
// export default function Home() {
//     const KakaoButton = dynamic(() => import('@/src/app/component/client/button/KakaoButton'), { ssr: false });
//     const HomeCarousel = dynamic(() => import('@/src/app/component/page/home/carousel/HomeCarousel'), {ssr: false});
//
//     return (
//         <div className="flex flex-col min-h-screen bg-white w-full">
//             <div className="flex flex-col flex-grow">
//                 <div className='flex flex-col justify-center items-center gap-8 pt-16'>
//                     <Image width={82} height={107} src={'/images/logo/nnzz-home-logo.png'} alt='nnzz-logo'/>
//                     <div className='flex flex-col justify-center items-center gap-4 text-common font-bold text-md'>
//                         <Nnzz/>
//                         직장인들 점심 저녁 메뉴 고민을 함께 해요🧚‍
//                     </div>
//                 </div>
//                 <div className="flex-grow flex items-center overflow-hidden">
//                     <HomeCarousel/>
//                 </div>
//             </div>
//             <div className='w-full px-4 pb-10'>
//                 <KakaoButton/>
//             </div>
//         </div>
//     );
// }