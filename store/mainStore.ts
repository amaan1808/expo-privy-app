import { createWithEqualityFn } from "zustand/traditional";
import { shallow } from "zustand/shallow";
import { createLoginSlice, ILoginState } from "./atoms";
import { createGenericStoreSlice, IGenericStoreState } from "./atoms/generic";
import { createTokensSlice, ITokensState } from "./atoms/tokens";

export type TAppState = ILoginState & IGenericStoreState & ITokensState;

export const useAppBoundStore = createWithEqualityFn<TAppState>()(
  (...args) => ({
    ...createLoginSlice(...args),
    ...createGenericStoreSlice(...args),
    ...createTokensSlice(...args),
  }),
  shallow
);
