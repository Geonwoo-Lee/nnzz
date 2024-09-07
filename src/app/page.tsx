import Image from 'next/image';

export default function Home() {
  return (
    <div className="text-2xl font-bold flex flex-col gap-2 bg-amber-50 w-full justify-center items-center h-[100vh]">
        <Image src='/nnzzImage.jpeg' width={300} height={300} alt='nnzz'/>
      Coming Soon !
    </div>
  );
}