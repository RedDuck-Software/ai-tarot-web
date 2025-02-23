import { create } from 'zustand';

type WalletModalStore = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

export const useWalletModalStore = create<WalletModalStore>((set) => ({
  isOpen: false,
  setIsOpen: (isOpen: boolean) => {
    set({ isOpen });
  },
}));
