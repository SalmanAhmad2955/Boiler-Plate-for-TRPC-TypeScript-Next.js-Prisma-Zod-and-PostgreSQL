import create from "zustand";
import { IUser } from "../lib/types";

type Store = {
  authUser: IUser | null;
  pageLoading: boolean;
  email: string;
  setAuthUser: (user: IUser) => void;
  setUploadingImage: (isUploading: boolean) => void;
  setPageLoading: (isLoading: boolean) => void;
  setEmail: (text: string) => void;
};

const useStore = create<Store>((set) => ({
  authUser: null,
  pageLoading: false,
  email: "",
  setAuthUser: (user) => set((state) => ({ ...state, authUser: user })),
  setUploadingImage: (isUploading) =>
    set((state) => ({ ...state, uploadingImage: isUploading })),
  setPageLoading: (isLoading) =>
    set((state) => ({ ...state, pageLoading: isLoading })),
  setEmail: (text) => set((state) => ({ ...state, email: text })),
}));

export default useStore;
