import Nnzz from '../../public/svg/logo/Nnzzsvg.svg'
import dynamic from "next/dynamic";
import Image from "next/image";
import HeightUnitWrapper from "@/src/app/component/client/common/heightWrapper/HeightWrapper";

export default function Home() {
    const KakaoButton = dynamic(() => import('@/src/app/component/client/common/button/KakaoButton'), { ssr: false });
    const HomeCarousel = dynamic(() => import('@/src/app/component/client/page/landing/features/carousel/HomeCarousel'), {ssr: false});
    return (
        <HeightUnitWrapper className="flex flex-col flex-grow  items-center justify-between bg-white max-w-[640px] pt-8 overflow-y-hidden mx-auto">
                <div className="w-full flex flex-col items-center justify-center">
                    <div className='flex flex-col justify-center items-center gap-8 pb-16'>
                        <Image width={128} height={128} src={'/images/logo/nnzz-home-logo.png'} alt='nnzz-logo'/>
                        <div className='flex flex-col justify-center items-center gap-4 text-slate-700 font-regular text-body1'>
                            <Nnzz/>
                            직장인들 점심 저녁 메뉴 고민을 함께 해요🧚‍
                        </div>
                    </div>
                </div>
            <HomeCarousel/>
            <footer className="w-full px-4 pt-4 pb-8 bg-white">
                <KakaoButton/>
            </footer>
        </HeightUnitWrapper>
    );
}
