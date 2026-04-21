import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type StoredLocation = any;

type LocationState = {
  pinedLocation: StoredLocation | null;
  userLocation: StoredLocation | null;
  currentLocationList: StoredLocation[];
};

type LocationActions = {
  setPinedLocation: (loc: StoredLocation) => void;
  clearPinedLocation: () => void;
  setUserLocation: (loc: StoredLocation) => void;
  clearUserLocation: () => void;
  pushCurrentLocation: (loc: StoredLocation) => void;
  setCurrentLocationList: (list: StoredLocation[]) => void;
  clearLocation: () => void;
};

const STORAGE_KEY = "nnzz_location";
const LEGACY_PINED = "pinedLocation";
const LEGACY_USER = "userLocation";
const LEGACY_CURRENT = "currentLocation";

const migrateLegacy = (): Partial<LocationState> => {
  if (typeof window === "undefined") return {};
  try {
    const out: Partial<LocationState> = {};
    const pined = localStorage.getItem(LEGACY_PINED);
    const user = localStorage.getItem(LEGACY_USER);
    const current = localStorage.getItem(LEGACY_CURRENT);
    if (pined) out.pinedLocation = JSON.parse(pined);
    if (user) out.userLocation = JSON.parse(user);
    if (current) out.currentLocationList = JSON.parse(current);
    if (pined || user || current) {
      localStorage.removeItem(LEGACY_PINED);
      localStorage.removeItem(LEGACY_USER);
      localStorage.removeItem(LEGACY_CURRENT);
    }
    return out;
  } catch {
    return {};
  }
};

export const useLocationStore = create<LocationState & LocationActions>()(
  persist(
    (set, get) => ({
      pinedLocation: null,
      userLocation: null,
      currentLocationList: [],
      setPinedLocation: (loc) => set({ pinedLocation: loc }),
      clearPinedLocation: () => set({ pinedLocation: null }),
      setUserLocation: (loc) => set({ userLocation: loc }),
      clearUserLocation: () => set({ userLocation: null }),
      pushCurrentLocation: (loc) =>
        set({ currentLocationList: [...get().currentLocationList, loc] }),
      setCurrentLocationList: (list) => set({ currentLocationList: list }),
      clearLocation: () =>
        set({ pinedLocation: null, userLocation: null, currentLocationList: [] }),
    }),
    {
      name: STORAGE_KEY,
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        if (!state) return;
        const hasData =
          state.pinedLocation != null ||
          state.userLocation != null ||
          (state.currentLocationList && state.currentLocationList.length > 0);
        if (hasData) return;
        const legacy = migrateLegacy();
        if (
          legacy.pinedLocation ||
          legacy.userLocation ||
          legacy.currentLocationList
        ) {
          useLocationStore.setState({
            pinedLocation: legacy.pinedLocation ?? null,
            userLocation: legacy.userLocation ?? null,
            currentLocationList: legacy.currentLocationList ?? [],
          });
        }
      },
    },
  ),
);
