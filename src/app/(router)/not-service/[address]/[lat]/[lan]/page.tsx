'use client'
import Button from "@/src/app/component/client/common/button/Button";
import Image from "next/image";
import {useRouter} from "next/navigation";
import RequestLocationApi from "@/src/app/api/client/requestLocation/requestLocationApi";
import {useToast} from "@/src/app/core/ToastProvider";
import {ToastAlign, ToastPosition} from "@/src/app/types/common/toast";

const NotServicePage = ({params}: { params: { address: string, lat: string, lan: string } }) => {
    const router = useRouter()
    const decodedAddress = decodeURIComponent(params.address)
    const showToast = useToast()

    const requestOpen = () => {
        RequestLocationApi.requestLocation({
            address: params.address,
            lat: params.lat,
            lng: params.lan
        }).then(() => {
            router.push('/location-request')
        }).catch((error) => {
            showToast(error.message, ToastPosition.BOTTOM, ToastAlign.CENTER)
        })
    }

    return (
        <div className='h-screen flex flex-col relative gap-8 items-center justify-center px-4'>
            <Image src={'/images/logo/not-service.png'} alt='not-service' width={160} height={160} className='mx-auto'/>
            <div className='flex flex-col gap-[22px]'>
                <div className='text-center text-title1 font-bold text-text-1 px-4'>
                    {decodedAddress}는 <br/>
                    오픈 예정 지역이예요!
                </div>
                <div className='text-center text-body2 font-medium text-text-3 leading-6'>
                    강남구, 강동구, 강서구, 관악구, 구로구, 금천구,<br/> 동작구, 서초구, 송파구, 양천구, 영등포구에서<br/>
                    우선적으로 서비스를 제공하고 있어요.
                </div>
            </div>
            <div className='absolute flex flex-col gap-4 w-full bottom-0 px-4 pb-20'>
                <Button type='primary' size='lg' onClick={requestOpen}>
                    오픈 요청하기
                </Button>
                <Button type='secondary' size='lg' onClick={() => {
                    router.push('/location')
                }}>
                    위치 다시 찾기
                </Button>
            </div>
        </div>
    )
}

export default NotServicePage