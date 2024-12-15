'use client'
import Button from "@/src/app/component/client/common/button/Button";
import Image from "next/image";
import {useRouter} from "next/navigation";

const NotServicePage = ({params}: { params: { address: string } }) => {
    const router = useRouter()
    const decodedAddress = decodeURIComponent(params.address)

    return (
        <div className='h-screen flex flex-col relative gap-8 items-center justify-center px-4'>
            <Image src={'/images/logo/not-service.png'} alt='not-service' width={160} height={160} className='mx-auto'/>
            <div className='flex flex-col gap-6'>
                <div className='text-center text-title1 font-bold text-text-1 px-4'>
                    {decodedAddress}는 <br/>
                    오픈 예정 지역이예요!
                </div>
                <div className='text-center text-body2 font-medium text-text-3'>
                    교대역, 강남역, 역삼역, 선릉역, 삼성역 부근에서<br/>
                    우선적으로 서비스를 제공하고 있어요.
                </div>
            </div>
            <div className='absolute flex flex-col gap-4 w-full bottom-0 px-4 pb-20'>
                <Button type='primary' size='md' onClick={() => {
                    router.push(`/location-request/${params.address}`) // 이미 인코딩된 상태이므로 그대로 사용
                }}>
                    오픈 요청하기
                </Button>
                <Button type='secondary' size='md' onClick={() => {
                    router.push('/location')
                }}>
                    위치 다시 찾기
                </Button>
            </div>
        </div>
    )
}

export default NotServicePage