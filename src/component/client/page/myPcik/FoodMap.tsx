"use client"
import { useEffect, useState } from "react";
import {
  FoodHistoryGroupWithImage,
  FoodStoreItemWithImage,
} from "@/src/types/page/home/mypick";
import MyApi from "@/src/app/api/client/my/Home";
import AuthUtils from "@/src/func/common/auth.utils";
import DateUtils from "@/src/func/common/date.utils";
import FoodMapItem from "./FoodMapItem";
import foodData from "@/src/dummy/dummy";
import NoFoodItem from "@/src/component/client/page/myPcik/NoFoodItem";

const FoodMap = () => {
  const [cardList, setCardList] = useState<FoodHistoryGroupWithImage[]>([]);

  useEffect(() => {
    MyApi.getMyPick()
      .then((res) => {
        const mergedData = res.map((group) => ({
          ...group,
          items: group.items
            .map((item) => {
              const clientItem = foodData.find(
                (clientItem) =>
                  clientItem.categoryId.toString() ===
                  item.categoryId.toString(),
              );

              if (!clientItem) return null;

              return {
                ...item,
                imageUrl: clientItem.imageUrl,
                bgType: clientItem.bgType,
              };
            })
            .filter((item): item is FoodStoreItemWithImage => item !== null), // null 제거
        }));

        setCardList(mergedData);
      })
      .catch((err) => {
        if (err) {
          AuthUtils.removeToken();
          AuthUtils.removeUserInfo();
          AuthUtils.removeLocation();
          window.location.href = "/";
        }
      });
  }, []);

  return (
    <>
      {cardList.length === 0 ? (
        <NoFoodItem />
      ) : (
        <>
          <img
            src={"/images/banner/myPickBanner.png"}
            alt="myPickBanner"
            className="w-full min-h-[80px]"
          />
          <div className="pt-5 pb-5">
            {cardList.map((group) => (
              <div key={group.createdDate} className="px-4 flex flex-col gap-5">
                <div className="flex items-center gap-1 text-lg font-semibold">
                  <span>{group.createdDate.replaceAll("-", ".").slice(5)}</span>
                  <span className="text-gray-500">
                    {DateUtils.getKoreanDay(group.createdDate)}
                  </span>
                </div>
                {group.items.map((item) => (
                  <FoodMapItem key={item.storeId} data={item} />
                ))}
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default FoodMap;
