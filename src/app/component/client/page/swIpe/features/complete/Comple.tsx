import {CompletePageProps} from "@/src/app/types/page/swape/deck";
import CompleteDescription
    from "@/src/app/component/client/page/swIpe/features/completeDesctription/CompleteDescription";
import ResultCard from "@/src/app/component/client/common/card/ResultCard";


const CompletePage = (props: CompletePageProps) => {
    const {likeCards, setDeletedCards, deletedList } = props;

    return (
        <div className='px-4 py-6 flex flex-col gap-6'>
            <CompleteDescription/>
            <div className='text-text-2 text-body2 font-regular'>
                {`${likeCards.length - deletedList.length}개 선택됨`}
            </div>
            <div className="grid grid-cols-2 gap-4">
                {likeCards.map((el, index) => (
                    <ResultCard
                        deleted={deletedList.some(item => item.id === el.id)}
                        handleDeleteCard={setDeletedCards}
                        data={el}
                        key={`result-${index}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default CompletePage