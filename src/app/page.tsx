import Image from 'next/image';

export default function Home() {
  return (
    <div className="text-2xl font-bold flex justify-center items-center h-[100vh]">
      Coming Soon !
        <Image src='/nnzzImage.jpeg' width={300} height={300} alt='nnzz'/>
    </div>
  );
}