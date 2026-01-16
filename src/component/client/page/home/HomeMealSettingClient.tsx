"use client";

import { useEffect, useState } from "react";
import DateUtils from "@/src/func/common/date.utils";
import { DayInfo, MealTimingType } from "@/src/types/page/home/homeSelect";
import { useRouter } from "next/navigation";
import HomeMealSettingComponent from "@/src/component/client/page/home/features/HomeMealSettingComponent";
import AuthUtils from "@/src/func/common/auth.utils";
import { useToast } from "@/src/core/ToastProvider";
import { ToastAlign, ToastPosition } from "@/src/types/common/toast";
import FoodieWay from "@/src/component/client/page/home/features/foodieWay/FoodieWay";
import ShortsListView from "@/src/app/(router)/shorts/list/ShortsListView";
import { useLoginBottomSheet } from "@/src/core/LoginBottomSheetProvider";
import NotLogin from "@/src/component/client/page/home/features/notLogin/NotLogin";
import FoodHistory from "@/src/component/client/page/home/features/foodHistory/FoodHistory";
import AdBanner from "@/src/component/client/common/adSense/AdBanner";

const HomeMealSettingClient = () => {
  const router = useRouter();
  const isLogin = AuthUtils.isLoggedIn();
  const { showLoginSheet } = useLoginBottomSheet();
  const showToast = useToast();
  const [selectedLocation, setSelectedLocation] = useState("현재 위치");
  const [mealTime] = useState<DayInfo[]>(DateUtils.getWeekDates());
  const [selectedMealTime, setSelectedMealTime] = useState<DayInfo>(
    mealTime[0],
  );
  const [mealTiming, setMealTiming] = useState<MealTimingType>();
  const [wayToFind, setWayToFind] = useState("");
  const [, setWayBottomSheet] = useState(false);
  const [mealTimingBottomSheet, setMealTimingBottomSheet] = useState(false);
  const [initialMealTime, setInitialMealTime] = useState<DayInfo | null>(null);
  const [initialMealTiming, setInitialMealTiming] = useState<
    string | undefined
  >("");
  const location = localStorage.getItem("pinedLocation");
  const userName = AuthUtils.getUserInfo()?.nickname
    ? AuthUtils.getUserInfo()?.nickname
    : "냠냠";

  const moveToMap = () => {
    router.push("/location");
  };

  const selectDate = (data: DayInfo) => {
    setSelectedMealTime(data);
  };

  const openScheduleBottomSheet = () => {
    setInitialMealTime(selectedMealTime);
    setInitialMealTiming(mealTiming);
    setMealTimingBottomSheet(true);
  };

  const closeScheduleBottomSheet = () => {
    const isDateSelected = !!selectedMealTime;

    const isMealTimingSelected =
      mealTiming !== undefined && mealTiming !== null && mealTiming !== "";

    const hasMealTimeChanged = initialMealTime !== selectedMealTime;
    const hasMealTimingChanged = initialMealTiming !== mealTiming;
    const hasSelectionChanged = hasMealTimeChanged || hasMealTimingChanged;

    const wasInitialMealTimingValid =
      initialMealTiming !== undefined &&
      initialMealTiming !== null &&
      initialMealTiming !== "";

    if (
      isDateSelected &&
      isMealTimingSelected &&
      (hasSelectionChanged || wasInitialMealTimingValid)
    ) {
      setMealTimingBottomSheet(false);

      if (wayToFind === "") {
        setTimeout(() => {
          setWayBottomSheet(true);
        }, 100);
      }
    }
  };

  const mealTimingController = (timing: MealTimingType) => {
    setMealTiming(timing);
  };

  useEffect(() => {
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", "#FF334C");
    return () => {
      document
        .querySelector('meta[name="theme-color"]')
        ?.setAttribute("content", "#fff");
    };
  }, []);

  const changeWayRequest = (way: "빠르게" | "꼼꼼히") => {
    const isLogin = AuthUtils.isLoggedIn();

    if (!isLogin) {
      showLoginSheet().then(() => {
        onChangeWay(way);
      });
    } else {
      onChangeWay(way);
    }
  };

  const onChangeWay = (way: "빠르게" | "꼼꼼히") => {
    setWayToFind(way);
    setWayBottomSheet(false);

    if (selectedLocation && selectedMealTime) {
      const mealTimingToEng = () => {
        if (mealTiming === "저녁") {
          return "dinner";
        } else {
          return "lunch";
        }
      };
      const formatDate = (dateStr: string) => {
        const [month, day] = dateStr
          .replace(/[월일]/g, "")
          .trim()
          .split(" ")
          .map(Number);
        const year = new Date().getFullYear();
        return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
      };

      const formattedDate = formatDate(selectedMealTime.date);
      if (selectedLocation === "현재 위치") {
        showToast(
          "위치를 선택해주세요",
          ToastPosition.BOTTOM,
          ToastAlign.CENTER,
        );
        return;
      }

      if (way === "꼼꼼히") {
        router.push(`/swipe/${mealTimingToEng()}/${formattedDate}`);
      } else {
        router.push(`/fast-choice/${mealTimingToEng()}/${formattedDate}`);
      }
    }
  };

  useEffect(() => {
    if (!selectedMealTime) return;

    const now = new Date();
    const currentHour = now.getHours();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    const selectedDate = DateUtils.parseDateString(selectedMealTime.date);

    if (selectedDate && selectedDate.getTime() === today.getTime()) {
      setMealTiming(currentHour < 15 ? "점심" : "저녁");
    } else {
      setMealTiming("");
    }
  }, [selectedMealTime]);

  useEffect(() => {
    if (!selectedMealTime) return;

    const now = new Date();
    const currentHour = now.getHours();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    const selectedDate = DateUtils.parseDateString(selectedMealTime.date);

    if (selectedDate && selectedDate.getTime() === today.getTime()) {
      setMealTiming(currentHour < 15 ? "점심" : "저녁");
    } else {
      setMealTiming("");
    }
  }, [selectedMealTime]);

  useEffect(() => {
    // 이미 바텀시트가 열려있지 않을 때만 고려
    if (
      !mealTimingBottomSheet &&
      selectedLocation !== "현재 위치" &&
      selectedMealTime &&
      mealTiming !== undefined &&
      mealTiming !== null &&
      wayToFind === ""
    ) {
      setWayBottomSheet(true);
    }
  }, [
    selectedLocation,
    selectedMealTime,
    mealTiming,
    wayToFind,
    mealTimingBottomSheet,
  ]);

  useEffect(() => {
    if (location) {
      const locationData = JSON.parse(location);
      if (!locationData.name) {
        setSelectedLocation(locationData.address);
      } else {
        setSelectedLocation(locationData.name);
      }
    }
  }, [location]);

  return (
    <div className="bg-slate-50">
      <div className="flex flex-col gap-4 p-5 bg-[#FF334C] rounded-bl-[16px]">
        <div className="font-medium text-title1 text-text-7">{userName}님,</div>
        <div className="flex flex-row gap-1 items-center font-medium text-title1 text-text-7 whitespace-nowrap">
          <HomeMealSettingComponent.HomeSelect
            selected={selectedLocation !== "현재 위치"}
            callBack={moveToMap}
            data={selectedLocation}
          />{" "}
          주변에서
        </div>
        <div className="font-medium text-title1 flex flex-row gap-1 items-center text-text-7">
          <HomeMealSettingComponent.HomeSelect
            selected={!!selectedMealTime}
            data={`${selectedMealTime.day} ${mealTiming}`}
            callBack={openScheduleBottomSheet}
          />
          메뉴 골라봐요!
        </div>
        <div className="flex flex-row gap-4">
          <FoodieWay
            type={"slow"}
            onChangeWay={() => changeWayRequest("꼼꼼히")}
          />
          <FoodieWay
            type={"fast"}
            onChangeWay={() => changeWayRequest("빠르게")}
          />
        </div>
        <HomeMealSettingComponent.FoodieScheduleBottomSheet
          closeModal={closeScheduleBottomSheet}
          modalOpen={mealTimingBottomSheet}
          mealTiming={mealTiming}
          mealTime={mealTime}
          selectDate={selectDate}
          selectedMealTime={selectedMealTime}
          setMealTiming={mealTimingController}
        />
      </div>
        {isLogin ? <FoodHistory /> : <NotLogin />}
      <AdBanner
        slot="2965675659"
        type="display"
        style={{ minHeight: '100px' }}
        className="my-4"
      />
      <div className="pb-10">
        <ShortsListView />
      </div>
    </div>
  );
};

export default HomeMealSettingClient;
