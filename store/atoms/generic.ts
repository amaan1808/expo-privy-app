import { StateCreator } from 'zustand';
import { TAppState } from '../mainStore';

export interface IGenericStoreState {
	isInternetReachable: boolean;
	hasHydrated: boolean;
	setHasHydrated: (val: boolean) => void;
}

export const initialGenericStoreState = {
	hasHydrated: false,
	isInternetReachable: true,
};

export const createGenericStoreSlice: StateCreator<
	TAppState,
	[],
	[],
	IGenericStoreState
> = (set, get) => ({
	...initialGenericStoreState,
	setHasHydrated: (val) => {
		set({
			hasHydrated: val,
		});
	},
});
