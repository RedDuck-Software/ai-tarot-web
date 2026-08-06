import { useWallet } from '@solana/wallet-adapter-react';
import { useMutation } from '@tanstack/react-query';

import { post } from './utils';

import { authClient } from '@/lib/fetcher';
import { TarotCard } from '@/types/tarot';

const useSubmitTarotCards = () => {
  const { publicKey } = useWallet();

  return useMutation({
    async mutationFn({
      tarots,
      hash,
      question,
      address,
    }: {
      tarots: TarotCard[];
      hash: string;
      question: string;
      address: string;
    }) {
      if (!publicKey) {
        return;
      }

      const client = authClient();

      return await post<{ response: string }>(client, `tarot/generate-response`, {
        tarots,
        hash,
        question,
        address,
      });
    },

    onError(error) {
      console.trace(error);
    },
  });
};

export default useSubmitTarotCards;
