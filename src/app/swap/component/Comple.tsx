import {useRouter} from "next/navigation";


const CompletePage = () =>{
    const router = useRouter();
    return <div
        className='w-full text-center text-xl font-bold flex h-[100vh] flex-row items-center justify-center gap-3 '>
        몇개가 좋은지 slack에 공유해주세요 !
        <button className='w-28 h-10 rounded-full bg-black text-white' onClick={() => {
            window.location.reload()
        }}>
            다시하기
        </button>
        <button className='w-28 h-10 rounded-full bg-black text-white' onClick={() => {
            router.push('/')
        }}>
            홈으로
        </button>
    </div>
}

export default CompletePage