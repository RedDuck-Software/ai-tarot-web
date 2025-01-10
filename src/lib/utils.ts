import { clsx, type ClassValue } from 'clsx';
import { toast } from 'react-toastify';
import { twMerge } from 'tailwind-merge';
import { stringToBytes } from 'viem';

import { TarotCard } from '@/types/tarot';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const shortenAddress = (address: string, fromStart = 4, fromEnd = 4) => {
  return `${address.slice(0, fromStart)}...${address.slice(-fromEnd)}`;
};

export function showTxToast<T = void>(methodName: string, promise: () => Promise<T>) {
  return toast.promise<T>(promise, {
    pending: `${methodName} in progress`,
    success: `${methodName} completed`,
    error: `${methodName} failed`,
  });
}

export const getRandomTarotCards = (hash: string): TarotCard[] => {
  const TAROT_CARDS_AMOUNT = 78;

  const splittedHash = splitStringIntoEqualParts(hash, Math.floor(hash.length / 3));

  const tarotIds: number[] = [];

  while (tarotIds.length < 3) {
    let tarotId = calculateByteSum(splittedHash[tarotIds.length]) % TAROT_CARDS_AMOUNT;

    while (tarotIds.includes(tarotId)) {
      tarotId = (tarotId + 1) % TAROT_CARDS_AMOUNT;
    }

    tarotIds.push(tarotId);
  }

  const isReverted = splittedHash
    .map((part) => calculateByteSum(part.slice(0, 3)))
    .map((sum) => sum % 7 === 0)
    .slice(0, 3);

  return tarotIds.map((tarot, idx) => ({ id: tarot, reverted: isReverted[idx] }));
};

const calculateByteSum = (str: string): number => stringToBytes(str).reduce((sum, byte) => sum + byte, 0);

const splitStringIntoEqualParts = (str: string, partSize: number): string[] => {
  const parts: string[] = [];

  for (let i = 0; i < str.length; i += partSize) {
    parts.push(str.substring(i, i + partSize));
  }

  return parts;
};
