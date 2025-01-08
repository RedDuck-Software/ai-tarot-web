import { clsx, type ClassValue } from 'clsx';
import { toast } from 'react-toastify';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const shortenAddress = (address: string, fromStart = 4, fromEnd = 4) => {
  return `${address.slice(0, fromStart)}...${address.slice(-fromEnd)}`;
};

export const showTxToast = (methodName: string, promise: () => Promise<void>) =>
  toast.promise(promise, {
    pending: `${methodName} in progress`,
    success: `${methodName} completed`,
    error: `${methodName} failed`,
  });
