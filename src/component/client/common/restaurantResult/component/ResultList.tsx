import Loading from "@/src/component/client/common/loading/Loading";
import ResultCard from "@/src/component/client/common/restaurantResult/component/ResultCard";
import React from "react";
import {FindStore} from "@/src/types/models/find";
import {useRouter} from "next/navigation";
import CategoryList from "@/src/component/client/common/restaurantResult/component/CategoryList";
// import AdBanner from "@/src/component/client/common/adSense/AdBanner";

const ResultList = (props: { restaurants: FindStore[],filteredRestaurants: FindStore[], isUp: boolean, isLoading: boolean, setStep: (step: 'map' | 'list' | 'result') => void, setSelectedStore: (storeId: FindStore) => void, setFilteredRestaurants: (restaurants: FindStore[]) => void }) => {
    const {restaurants, isUp, isLoading, setStep, setSelectedStore, setFilteredRestaurants, filteredRestaurants} = props
    const router = useRouter()


    return (
        <div
            className={`pb-10 w-full ${isUp ? 'h-restaurant-result-up-height' : 'h-restaurant-result-height'} overflow-y-scroll bg-bg-0`}>
            <header
                className={`w-full max-w-[640px] flex items-center justify-between relative h-header-height bg-common-white px-4`}>
                <div className=" flex-shrink-0 ">
                </div>
                <div
                    className="absolute inset-x-0 text-title2 font-bold text-text-2 flex justify-center max-w-[180px] mx-auto whitespace-nowrap">
                    식당보기
                </div>
                <div className="flex-shrink-0 text-caption1 text-text-2 font-medium" onClick={() => {
                    router.push('/home')
                }}>
                    처음으로
                </div>
            </header>
          {/*<AdBanner*/}
          {/*  slot="1022048370"*/}
          {/*  style={{ width: '100%', height: '70px' }}*/}
          {/*/>*/}
            <CategoryList
                restaurants={restaurants}
                filteredRestaurants={filteredRestaurants}
                setFilteredRestaurants={setFilteredRestaurants}
            />

            {
                isLoading && <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <Loading/>
                </div>
            }
            <div className='flex flex-col gap-4'>
                <div className='text-body2 font-regular text-text-2 px-4 pt-2'>
                    식당 <span className='font-bold'>{filteredRestaurants.length}</span>개를 찾았어요.
                </div>
                <div>
                    {
                        filteredRestaurants.map((el, index) => (
                            <ResultCard setStep={setStep} setSelectedStore={setSelectedStore} key={`result-${index}`} data={el}/>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default ResultList