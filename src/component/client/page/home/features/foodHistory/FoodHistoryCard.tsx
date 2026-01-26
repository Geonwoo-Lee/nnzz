import { FoodCard } from "@/src/types/page/home/mypick";
import Button from "@/src/component/client/common/button/Button";

const FoodHistoryCard = ({ data }: { data: FoodCard }) => {
  const handleOpenNaverMap = () => {
    window.open(`https://map.naver.com/p/entry/place/${data.storeId}`, '_blank');
  };

  return (
    <div className="min-w-[242px] min-h-[175px] bg-bg-0 rounded-[16px] mb-2" style={{ boxShadow: '0px 4px 8px 0px rgba(0, 0, 0, 0.08)' }}>
      <div className="p-4 flex flex-col gap-3">
        <div className="flex flex-col gap-3">
          <div className="text-body1 font-bold text-text-1">{data.name}</div>
          <div className="text-caption3 line-clamp-1 truncate font-regular text-text-3">
            {data.address}
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div className="text-caption1 flex items-center gap-1 flex-row text-text-1 font-medium">
            🍽️ {data.category}
          </div>
          <div className="flex flex-row items-center gap-1 text-caption1 font-medium text-text-1">
            ⏱️
            <div className="">{data.createdDate.replaceAll("-", ".")}</div>·
            <div>{data.mealtime}</div>
          </div>
        </div>
        <Button onClick={handleOpenNaverMap} type="outlined" size="md">
          지도 확인하기
        </Button>
      </div>
    </div>
  );
};

export default FoodHistoryCard;