import Nnzz from '../../public/svg/logo/Nnzzsvg.svg'
import Image from "next/image";
import HeightUnitWrapper from "@/src/component/client/common/heightWrapper/HeightWrapper";
import HomeCarousel from "@/src/component/client/page/landing/features/carousel/HomeCarousel";
import KakaoButton from "@/src/component/client/common/button/KakaoButton";

export default function Home() {
    return (
        <HeightUnitWrapper className="flex flex-col relative flex-grow  items-center  bg-white max-w-[640px] pt-8 overflow-y-hidden mx-auto">
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
            <footer className="w-full absolute bottom-6 px-4 pt-4 pb-8 bg-white">
                <KakaoButton />
            </footer>
        </HeightUnitWrapper>
    );
}
