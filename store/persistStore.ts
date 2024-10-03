import { createWithEqualityFn } from "zustand/traditional";
import { createJSONStorage, persist } from "zustand/middleware";
// import AsyncStorage from "@react-native-async-storage/async-storage";
import { shallow } from "zustand/shallow";
import { useAppBoundStore } from "./mainStore";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface IPersistStoreState {
  currentTheme: string;
  accessToken: string;
  setCurrentTheme: (currentTheme: "light" | "dark") => void;
  setAccessToken: (accessToken: string) => void;
}

export const initialPersistStore = {
  currentTheme: "dark",
  accessToken: "",
};

/*
usePersistentStore is a hook to a persistent redux(zustand) store.
config:
		{
			name: 'persistStore', // unique name
			storage: createJSONStorage(() => AsyncStorage),
		}

*/

export const usePersistentStore = createWithEqualityFn<IPersistStoreState>()(
  persist(
    (set, get) => ({
      ...initialPersistStore,
      setCurrentTheme: (currentTheme: "light" | "dark") => {
        set({ currentTheme });
      },
      setAccessToken: (accessToken: string) => {
        set({ accessToken });
      },
    }),
    {
      name: "persistStore", // unique name
      storage: createJSONStorage(() => AsyncStorage),
      onRehydrateStorage: () => () => {
        useAppBoundStore.getState().setHasHydrated(true);
      },
    }
  ),
  shallow
);
