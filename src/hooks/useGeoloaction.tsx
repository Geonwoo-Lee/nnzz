"use client";

import { useMemo } from "react";
import { getAddressFromCoords } from "@/src/func/common/geo.utils";
import { LocationType } from "@/src/types/models/geo";
import { useLocationStore } from "@/src/stores/locationStore";

const toLocationType = (raw: any): LocationType | null => {
  if (!raw) return null;
  if (raw.latitude != null && raw.longitude != null) return raw as LocationType;
  if (raw.lat != null && raw.lng != null) {
    return {
      latitude: raw.lat,
      longitude: raw.lng,
      address: raw.address ?? "",
      name: raw.name ?? "",
    };
  }
  return raw as LocationType;
};

export function useGeolocation() {
  const pined = useLocationStore((s) => s.pinedLocation);
  const user = useLocationStore((s) => s.userLocation);
  const setUserLocation = useLocationStore((s) => s.setUserLocation);

  const location = useMemo<LocationType | null>(
    () => toLocationType(pined) ?? toLocationType(user),
    [pined, user],
  );

  const requestGeolocation = async () => {
    if (typeof window === "undefined" || !navigator.geolocation) {
      console.error("Geolocation is not supported by this browser.");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        const address = await getAddressFromCoords(latitude, longitude);
        const newLocation: LocationType = {
          latitude,
          longitude,
          address: address?.address || "",
          name: address.name,
        };
        setUserLocation(newLocation);
      },
      (error) => {
        console.error("Geolocation error:", error);
      },
    );
  };

  return { location, requestGeolocation };
}
