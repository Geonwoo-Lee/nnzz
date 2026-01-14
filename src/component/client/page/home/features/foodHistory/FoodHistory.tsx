import { useEffect, useState } from "react";
import MyApi from "@/src/app/api/client/my/Home";
import { FoodHistoryGroup, FoodCard } from "@/src/types/page/home/mypick";
import FoodHistoryCard from "@/src/component/client/page/home/features/foodHistory/FoodHistoryCard";
import PickIcon from "../../../../../../../public/svg/items/home/pick.svg";
import AuthUtils from "@/src/func/common/auth.utils";
import { useRouter } from "next/navigation";
import NoList from "@/src/component/client/page/home/features/foodHistory/NoList";

const FoodHistory = () => {
  const router = useRouter();
  const [cardList, setCardList] = useState<FoodCard[]>([]);

  useEffect(() => {
    MyApi.getMyPick()
      .then((res: FoodHistoryGroup[]) => {
        const flattened = res.flatMap((group) =>
          group.items.map((item) => ({
            ...item,
            createdDate: group.createdDate,
          })),
        );
        setCardList(flattened);
      })
      .catch((err) => {
        if (err) {
          AuthUtils.removeToken();
          AuthUtils.removeUserInfo();
          AuthUtils.removeLocation();
        }
      });
  }, []);

  return (
    <div className="flex flex-col gap-3 pt-6 pb-10">
      <div className="flex flex-row px-5 justify-between w-full items-center">
        <div className="flex flex-row gap-1 items-center">
          <PickIcon />
          <div className="text-title2 font-bold text-text-1">마이 픽</div>
        </div>
        <div
          className="text-body2 font-medium text-text-2"
          onClick={() => {
            router.push("/mypick");
          }}
        >
          더보기
        </div>
      </div>
      <div className="flex flex-row gap-3 w-full overflow-x-scroll">
        {cardList.length < 0 ? (
          cardList.map((item, index) => (
            <div
              key={`food-history-item-${index}`}
              className={`${index === 0 ? "pl-5" : ""} ${index === cardList.length - 1 ? "pr-5" : ""}`}
            >
              <FoodHistoryCard data={item} />
            </div>
          ))
        ) : (
          <NoList />
        )}
      </div>
    </div>
  );
};

export default FoodHistory;
