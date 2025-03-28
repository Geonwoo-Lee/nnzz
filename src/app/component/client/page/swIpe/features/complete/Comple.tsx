import {CompletePageProps} from "@/src/app/types/page/swape/deck";
import CompleteDescription
    from "@/src/app/component/client/page/swIpe/features/completeDesctription/CompleteDescription";
import ResultCard from "@/src/app/component/client/common/card/ResultCard";
import Button from "../../../../common/button/Button";


const CompletePage = (props: CompletePageProps) => {
    const {likeCards,day, type, setDeletedCards, deletedList, setStep } = props;


    return (
        <>
            <div className='px-4 py-6 flex flex-col gap-6 h-swipe-result-height bg-common-white overflow-y-scroll'>
                <CompleteDescription deletedList={deletedList} day={day} type={type} likeCards={likeCards}/>
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
            <div className='] w-full bg-common-white fixed bottom-0 z-10  max-w-[640px] px-4'>
                <div className='w-full pt-4'>
                    <Button disabled={likeCards.length === deletedList.length} type='primary' size='lg' onClick={setStep} style='w-full' >
                        식당정보 보러가기
                    </Button>
                    <Button  type='transparent' size='lg' onClick={() => {
                        window.location.reload()
                    }} style='w-full' >
                        처음으로
                    </Button>
                </div>
            </div>
        </>
    );
};

export default CompletePage