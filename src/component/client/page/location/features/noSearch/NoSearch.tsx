import Image from 'next/image'
import Button from '../../../../common/button/Button'


const NoSearch = () => {
    return <div className='h-location-no-search-height relative flex flex-col justify-between'>
        <div className='flex h-full items-center justify-center'>
            <div className='flex justify-center flex-col items-center '>
                <Image src={'/images/status/NoData.png'} alt='no-data' width={160} height={160}/>
                <div className='text-center text-body2 font-medium text-text-3'>
                    검색 결과가 없어요. <br/>
                    찾으려는 주소를 확인한 뒤 다시 검색해주세요.
                </div>
            </div>
        </div>
        <div className='bottom-0 py-6 px-4 w-full'>
            <Button type='primary' onClick={() => {
            }} size='lg' style='w-full'>
                다시 검색하기
            </Button>
        </div>
    </div>
}

export default NoSearch