"use client";

import { useRouter } from "next/navigation";
import SaveApi from "@/src/app/api/client/save/save";
import AuthUtils from "@/src/func/common/auth.utils";
import { useLocationStore } from "@/src/stores/locationStore";
import { CurrentLocation } from "@/src/types/page/location/location";
import { MapPlace } from "@/src/component/client/common/map/NaverMap";

const SERVICE_AREAS = [
  "강남구",
  "강동구",
  "강서구",
  "관악구",
  "구로구",
  "금천구",
  "동작구",
  "서초구",
  "송파구",
  "양천구",
  "영등포구",
];

const isServiceArea = (address?: string) =>
  !!address && SERVICE_AREAS.some((gu) => address.includes(gu));

export function useSetPinedLocation() {
  const router = useRouter();

  return (place: CurrentLocation) => {
    const pinnedLocation: MapPlace = {
      name: place.buildingName,
      lat: place.lat,
      lng: place.lng,
      address: place.address,
    };

    if (!isServiceArea(pinnedLocation.address)) {
      router.push(
        `/not-service/${encodeURIComponent(
          (pinnedLocation.address ?? "").replace(/\s+/g, ""),
        )}/${pinnedLocation.lat}/${pinnedLocation.lng}`,
      );
      return;
    }

    const userInfo = AuthUtils.getUserInfo();
    const store = useLocationStore.getState();

    if (!userInfo) {
      store.pushCurrentLocation(place);
      store.setPinedLocation(pinnedLocation);
      router.push("/home");
      return;
    }

    SaveApi.SaveLocation({
      name: pinnedLocation.name,
      address: pinnedLocation.address!,
      latitude: pinnedLocation.lat,
      longitude: pinnedLocation.lng,
    })
      .then(() => {
        store.setPinedLocation(pinnedLocation);
        router.push("/home");
      })
      .catch(() => {
        router.push(
          `/not-service/${encodeURIComponent(
            pinnedLocation.address!.replace(/\s+/g, ""),
          )}/${pinnedLocation.lat}/${pinnedLocation.lng}`,
        );
      });
  };
}
