// import Deck from "@/src/app/component/deck/Deck";
// import freeFoodData from "@/src/app/dummy/dummy";
import Nnzz from '../../public/svg/logo/Nnzzsvg.svg'
import dynamic from "next/dynamic";
import Image from "next/image";

export default function Home() {
    const KakaoButton = dynamic(() => import('@/src/app/component/client/common/button/KakaoButton'), { ssr: false });
    const HomeCarousel = dynamic(() => import('@/src/app/component/client/page/home/carousel/HomeCarousel'), {ssr: false});

    return (
        <div className="flex flex-col justify-between min-h-screen bg-white max-w-[640px] mx-auto">
            <main className="flex-grow flex flex-col items-center justify-center">
                <div className="w-full flex flex-col items-center justify-center">
                    <div className='flex flex-col justify-center items-center gap-8 pt-16 pb-16'>
                        <Image width={128} height={128} src={'/images/logo/nnzz-home-logo.png'} alt='nnzz-logo'/>
                        <div className='flex flex-col justify-center items-center gap-4 text-slate-700 font-regular text-body1'>
                            <Nnzz/>
                            직장인들 점심 저녁 메뉴 고민을 함께 해요🧚‍
                        </div>
                    </div>
                    <HomeCarousel/>
                </div>
            </main>
            <footer className="w-full px-4 pt-4 pb-8 bg-white">
                <KakaoButton/>
            </footer>
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