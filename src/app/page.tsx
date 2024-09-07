import Image from 'next/image';

export default function Home() {
  return (
    <div className="flex flex-col gap-10 bg-amber-50 w-full justify-center items-center h-[100vh]">
        <Image src='/nnzzImage.jpeg' width={300} height={300} alt='nnzz'/>
      <div className="text-xl font-normal text-center">
          nnzz은 오픈 준비중 ! 박사님들이 열심히 연구중이에요 조금만 기다려주세요 ! 😀🫶
      </div>
    </div>
  );
}