import {FoodieWayModalProps} from "@/src/types/page/home/modals";
import BottomSheet from "@/src/component/client/common/bottomSheet/BottomSheet";
import FoodieWay from "@/src/component/client/page/home/features/foodieWay/FoodieWay";


const FoodieWayBottomSheet = (props: FoodieWayModalProps) => {
    const {onChangeWay, modalOpen, closeModal} = props


    return <BottomSheet open={modalOpen}  backdrop={false} close={closeModal}>
        <div className='flex flex-col gap-6 bg-bg-0'>
            <div className='text-title2 font-medium text-text-1'>
                먹고 싶은 음식 찾기
            </div>
            <div className='flex flex-col gap-4'>
                <FoodieWay type={"slow"} onChangeWay={() => onChangeWay('꼼꼼히')}/>
                <FoodieWay type={'fast'} onChangeWay={() => onChangeWay('빠르게')}/>
            </div>
        </div>
    </BottomSheet>
}

export default FoodieWayBottomSheet