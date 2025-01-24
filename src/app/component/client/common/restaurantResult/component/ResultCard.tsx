import {FindStore} from "@/src/app/types/models/find";
import Button from "../../button/Button";


const ResultCard = ({data, isMap, setStep, setSelectedStore}: {data: FindStore, isMap?: boolean, setStep: (step: 'map' | 'list' | 'result') => void, setSelectedStore: (store: FindStore) => void}) => {
    const {name, address, distance, category, broadcasts, menus, last } = data
    return (
        <div className={`bg-bg-0 w-full bg-common-white ${isMap ? 'rounded-[12px] border border-line-2' : ''} ${last ? '' : 'border-b border-line-1  '}`}>
            <div className='p-4 flex flex-col gap-6'>
                <div className='flex flex-col gap-6'>
                    <div className='flex flex-col gap-3'>
                        <div className='flex flex-row justify-between items-center'>
                            <div className='flex flex-row gap-2 items-center'>
                                <div className='text-title2 font-bold text-text-1 antialiased'>
                                    {name}
                                </div>
                                <div className='text-text-3 text-caption2 font-regular'>
                                    {distance}m
                                </div>
                            </div>
                            <div className='inline-flex justify-center px-3 py-2 items-center rounded-[1200px] bg-amber-50 text-caption2 font-medium text-amber-600'>
                                {category}
                            </div>
                        </div>
                        <div className='text-caption2 font-medium text-text-2 truncate'>
                            {address}
                        </div>
                        <div className='flex flex-row'>
                            {
                                broadcasts && (
                                    broadcasts.map((el, index) => (
                                        <div key={`broadcast-${index}`} className='text-caption2 font-regular text-text-2'>
                                            {broadcasts.length > 1 && index > 0 && ' · '}
                                            {el.broadcast_name}
                                        </div>
                                    ))
                                )
                            }
                        </div>
                    </div>
                    <div className='flex flex-col gap-[14px]'>
                        {
                            menus && menus.map((el, index) => (
                             <div key={`menu-${index}`} className='flex flex-row justify-between items-center '>
                                 <div className='text-caption2 font-regular text-text-3'>
                                     {el.menu_name}
                                 </div>
                                 <div className='text-caption2 font-medium text-text-2'>
                                     {el.price}
                                 </div>
                            </div>
                            ))
                        }
                    </div>
                </div>
                    <Button type='outlined' style='w-full' size='md' onClick={() => {
                        setStep('result')
                        setSelectedStore(data)
                    }}>
                        이 식당으로 할게요
                    </Button>
            </div>
        </div>
    )
}

export default ResultCard