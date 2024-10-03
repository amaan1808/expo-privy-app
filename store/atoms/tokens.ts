import { StateCreator } from "zustand";
import { TAppState } from "../mainStore";

export interface ITokensState {
  isInternetReachable: boolean;
  hasHydrated: boolean;
  setHasHydrated: (val: boolean) => void;
  featured: {
    name: string;
    symbol: string;
    address: string;
    chainId: string;
    decimals: number;
    icon: string;
    verified: boolean;
    isActive: boolean;
    updatedAt: string;
    createdAt: string;
    __v: 0;
  }[];
}

export const initialTokensState = {
  hasHydrated: false,
  isInternetReachable: true,
  featured: [],
};

export const createTokensSlice: StateCreator<
  TAppState,
  [],
  [],
  ITokensState
> = (set, get) => ({
  ...initialTokensState,
  setHasHydrated: (val) => {
    set({
      hasHydrated: val,
    });
  },
});
