import BottomSheet from "@/src/app/component/client/common/bottomSheet/BottomSheet";
import DateCircle from "@/src/app/component/client/page/home/dateCircle/DateCircle";
import MealTimingSquare from "@/src/app/component/client/page/home/mealTimingSquare/MealTimingSquare";
import {FoodieSettingModalProps} from "@/src/app/types/page/home/modals";


const FoodieScheduleBottomSheet = (props: FoodieSettingModalProps) => {
    const {mealTime, setMealTiming, selectedMealTime , mealTiming, selectDate, modalOpen, closeModal} = props
    return (
        <BottomSheet open={modalOpen} nonPadding={true} backdrop={false} close={closeModal}>
            <div className='flex flex-col gap-10 pb-8 pt-6'>
                <div className='flex flex-col gap-3 px-6'>
                    <div className='text-title2 font-bold'>
                        언제 시작하시나요?
                    </div>
                    <div className='text-body2 font-regular'>
                        식사하는 시간대를 선택해주세요.
                    </div>
                </div>
                <div className="w-full overflow-x-auto">
                    <div className="flex flex-nowrap gap-2 w-max">
                        {mealTime.map((el, index) => (
                            <div key={index} className={`${index === 0 ? 'ml-6' :''} ${index === mealTime.length - 1 ? 'mr-6' :''}`} >
                                <DateCircle
                                    data={el}
                                    callBack={selectDate}
                                    selected={el === selectedMealTime}
                                />
                            </div>
                        ))}
                    </div>
                </div>
                <div className='flex flex-row gap-4 w-full px-6'>
                    <MealTimingSquare type={'lunch'} callBack={() => {
                        setMealTiming('점심')
                    }} active={mealTiming === '점심'}/>
                    <MealTimingSquare type={'dinner'} callBack={() => {
                        setMealTiming('저녁')
                    }} active={mealTiming === '저녁'}/>
                </div>
            </div>
        </BottomSheet>
    )
}

export default FoodieScheduleBottomSheet