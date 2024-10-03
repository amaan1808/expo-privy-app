import { StateCreator } from "zustand";
import { TAppState } from "../mainStore";
export interface ILoginState {
  isLoggedIn: boolean;
  usdcBalance: number;
  isUserBanned: boolean;
  userId: string | null;
  address: string | null;
  showSplashScreen: boolean;
  profile: {
    userId: string;
    username: string;
    email: string;
    profileImage: string;
    chatToken: string;
  };
  setLoggedIn: (isLoggedIn: boolean) => void;
  setShowSplashScreen: (showSplashScreen: boolean) => void;
  setProfileInfo: ({ ...profile }) => void;
  setBalance: (balance: number) => void;
}

export const initialLoginState = {
  isLoggedIn: false,
  usdcBalance: 0,
  isUserBanned: false,
  userId: null,
  address: null,
  showSplashScreen: true,
  profile: {
    userId: "",
    username: "",
    email: "",
    profileImage: "",
    chatToken: "",
  },
};

export const createLoginSlice: StateCreator<TAppState, [], [], ILoginState> = (
  set,
  get
) => ({
  ...initialLoginState,
  setLoggedIn: (isLoggedIn: boolean) => {
    set({ isLoggedIn });
  },
  setShowSplashScreen: (showSplashScreen: boolean) => {
    set({ showSplashScreen });
  },
  setProfileInfo: (data: any) => {
    set({ profile: data });
  },
  setBalance: (balance: number) => {
    set({ usdcBalance: balance });
  },
});
