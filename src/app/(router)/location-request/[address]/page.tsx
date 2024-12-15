'use client'
import Button from "@/src/app/component/client/common/button/Button";
import Image from "next/image";
import {useRouter} from "next/navigation";
const LocationRequest = ({params}: { params: { address: string } }) => {
    const router = useRouter()
    console.log(params.address)
    // const decodedAddress = decodeURIComponent(params.address)
    return (
        <div className='h-screen flex flex-col relative gap-8 justify-center items-center'>
            <Image src={'/images/logo/not-service.png'} alt='not-service' width={160} height={160} className='mx-auto'/>
            <div>
                <div className='text-center text-title1 font-bold text-text-1'>
                    오픈 요청이 <br/>
                    완료되었어요!
                </div>
                <div className='text-center text-body2 font-medium text-text-3'>
                    오픈 요청이 많은 지역부터 열려요.
                </div>
            </div>
            <div className='absolute w-full bottom-0 pb-20 px-4'>
                <Button type='muted' size='md' style='w-full' onClick={() => {
                    router.push('/home')
                }}>
                    닫기
                </Button>
            </div>
        </div>
    )
}

export default LocationRequest