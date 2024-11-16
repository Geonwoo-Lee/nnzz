'use client'
import Lottie from "lottie-react"
import LoadingLottie from '../../../../lib/lotties/nnzz-lottie.json'


const Loading = () => {
    return (
        <div className='h-full flex items-center justify-center'>
            <Lottie
                animationData={LoadingLottie}
                loop={true}
                autoplay={true}
            />
        </div>
    )
}

export default Loading