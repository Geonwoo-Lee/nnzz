import {GenderAgeSelectWrapProps} from "@/src/types/page/sign-up/sign-up";
import Checked from '../../../../../../../public/svg/items/common/Checked.svg'


const GenderAgeSelectWrap = (props: GenderAgeSelectWrapProps) => {
    const { type,  setSelectedValue, selectList, selectedValue} = props
    const direction = () => {
        if(type === 'gender') {
            return 'flex flex-col'
        } else {
            return 'grid grid-cols-2 gap-4'
        }
    }
    return (
        <div className='flex flex-col'>
            <div className='flex flex-col gap-1 px-5'>
                <div className='py-4 border-b border-line1 text-text-3 font-medium text-caption1'>
                    {type === 'age' ? '나이대' : '성별 선택'}
                </div>
                <div className={`w-full ${direction()}`}>
                    {
                        selectList.map((el, index) => (
                            <div key={`list-${index}`} className='w-full justify-between flex flex-row  h-[48px] items-center text-text-2 text-body2 font-medium' onClick={() => {
                                setSelectedValue(el, type);
                            }}>
                                <div>
                                    {el}
                                </div>
                                {
                                    selectedValue === el && <Checked className='flex-shrink-0'/>
                                }
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default GenderAgeSelectWrap;