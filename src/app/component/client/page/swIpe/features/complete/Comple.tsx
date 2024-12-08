import {CompletePageProps} from "@/src/app/types/page/swape/deck";
import CompleteDescription
    from "@/src/app/component/client/page/swIpe/features/completeDesctription/CompleteDescription";
import ResultCard from "@/src/app/component/client/common/card/ResultCard";
import Button from "../../../../common/button/Button";


const CompletePage = (props: CompletePageProps) => {
    const {likeCards, setDeletedCards, deletedList, setStep } = props;


    return (
        <>
            <div className='px-4 py-6 flex flex-col gap-6 h-swipe-result-height bg-common-white overflow-y-scroll'>
                <CompleteDescription/>
                <div className='text-text-2 text-body2 font-regular'>
                    {`${likeCards.length - deletedList.length}개 선택됨`}
                </div>
                <div className="grid grid-cols-2 gap-4">
                    {likeCards.map((el, index) => (
                        <ResultCard
                            deleted={deletedList.some(item => item.categoryId === el.categoryId)}
                            handleDeleteCard={setDeletedCards}
                            data={el}
                            key={`result-${index}`}
                        />
                    ))}
                </div>
            </div>
            <div className='h-[118px] w-full bg-common-white fixed bottom-0  max-w-[640px] px-4'>
                <div className='w-full pt-4'>
                    <Button type='primary' size='lg' onClick={() => {setStep('3')}} style='w-full' >
                        식당정보 보러가기
                    </Button>
                </div>
            </div>
        </>
    );
};

export default CompletePage