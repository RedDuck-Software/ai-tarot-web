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

export const showTxToast = (methodName: string, promise: () => Promise<void>) =>
  toast.promise(promise, {
    pending: `${methodName} in progress`,
    success: `${methodName} completed`,
    error: `${methodName} failed`,
  });

export const getRandomTarotCards = (hash: string): TarotCard[] => {
  const TAROT_CARDS_AMOUNT = 78;

  const splitedHash = splitStringIntoEqualParts(hash, Math.floor(hash.length / 3));

  const tarotIds: number[] = [];

  while (tarotIds.length < 3) {
    let tarotId = calculateByteSum(splitedHash[tarotIds.length]) % TAROT_CARDS_AMOUNT;

    while (tarotIds.includes(tarotId)) {
      tarotId = (tarotId + 1) % TAROT_CARDS_AMOUNT;
    }

    tarotIds.push(tarotId);
  }

  const isReverted = splitedHash
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

console.log(
  'getRandomTarotCards',
  getRandomTarotCards(
    'd47bmsYwzMLqmAzmBaQ8ywtjBkx3jWNgSL71E6Mqi4ZEXHNDk9oTCgrN3B6UkiKorvc7HGFKiBwKB12mGGJV2dj' +
      'Ai1UV9wcsBC8mACaW11sJdCL5ot8nL16pJ7oZXqoS2h5',
  ),
);
