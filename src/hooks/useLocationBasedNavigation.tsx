"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  searchAddressByKeyword,
  getAddressFromCoords,
} from "@/src/func/common/geo.utils";
import { useLocationStore } from "@/src/stores/locationStore";

const useLocationBasedNavigation = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleLocationRequest = () => {
    setIsLoading(true);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const userLocation = await getAddressFromCoords(latitude, longitude);
            if (userLocation) {
              useLocationStore.getState().setUserLocation(userLocation);
              setIsLoading(false);
              router.push("/find-location");
            } else {
              setDefaultLocation();
            }
          } catch {
            setDefaultLocation();
          }
        },
        () => {
          setDefaultLocation();
        },
      );
    } else {
      setDefaultLocation();
    }
  };

  const setDefaultLocation = () => {
    const existing = useLocationStore.getState().userLocation;
    if (existing) {
      setIsLoading(false);
      router.push("/find-location");
      return;
    }

    searchAddressByKeyword("강남역")
      .then((res) => {
        if (res && res.length > 0) {
          const store = useLocationStore.getState();
          store.pushCurrentLocation(res[0]);
          store.setUserLocation(res[0]);
        }
      })
      .catch((error) => {
        console.error("주소 검색 중 오류 발생:", error);
      })
      .finally(() => {
        setIsLoading(false);
        router.push("/find-location");
      });
  };

  return { handleLocationRequest, isLoading };
};

export default useLocationBasedNavigation;
