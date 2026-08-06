import { create } from 'zustand';

type PrivyModalStore = {
  landingHeader: string;
  setLandingHeader: (header: string) => void;
};

export const usePrivyModalStore = create<PrivyModalStore>((set) => ({
  landingHeader: 'Log in or sign up',
  setLandingHeader: (header) => {
    set({ landingHeader: header });
  },
}));
