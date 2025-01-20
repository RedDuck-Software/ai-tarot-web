import { create } from 'zustand';

export enum Status {
  Success = 1,
  Failed = 2,
  InsufficientFunds = 3,
  Canceled = 4,
}

interface StatusModalStore {
  status: Status | null;
  setStatus: (setStatus: Status | null) => void;
}

export const useStatusModalStore = create<StatusModalStore>((set) => ({
  status: null,
  setStatus: (status: Status | null) => {
    set({ status });
  },
}));
