// import Deck from "@/src/app/component/deck/Deck";
// import freeFoodData from "@/src/app/dummy/dummy";

import Nnzz from '../../public/svg/logo/Nnzzsvg.svg'
import dynamic from "next/dynamic";



export default function Home() {

    const KakaoButton = dynamic(() => import('@/src/app/component/client/button/KakaoButton'), { ssr: false });

  return (
    <div className="flex flex-col gap-10 bg-white w-full justify-center items-center ">
      {/*<div className="text-xl font-normal text-black text-center">*/}
      {/*    nnzz(냠냠쩝쩝)은 오픈 준비중 ! 박사님들이 열심히 연구중이에요 조금만 기다려주세요 ! 😀🫶*/}
      {/*</div>*/}
      {/*  <Deck cards={freeFoodData}/>*/}
      <div className="h-[100vh] w-full flex flex-col justify-center items-center relative">
        <Nnzz/>
          <div className='absolute bottom-10 w-full pl-4 pr-4'>
              <KakaoButton/>
          </div>
      </div>
    </div>
  );
}