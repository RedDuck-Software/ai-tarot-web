import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';

import usePrivySend from './use-privy-send';

import { currencies, Currencies } from '@/constants/addresses';
import { post } from '@/hooks/api/utils';
import { usePrivyWallet } from '@/hooks/privy/use-privy-wallet';
import { authClient } from '@/lib/fetcher';
import { getRandomTarotCards } from '@/lib/utils';
import { Status, useStatusModalStore } from '@/store/status-modal';

let toastId: string | number | null = null;

const notify = () => {
  toastId = toast('Connecting with the Oracle...', {
    autoClose: false,
    closeOnClick: false,
    draggable: false,
    isLoading: true,
    type: 'default',
  });
};

type PrivyMakePrediction = {
  question: string;
  tokenName: Currencies;
  amount: number;
  onStep?: (step: string) => void;
};

const usePrivyMakePrediction = () => {
  const { primaryWallet } = usePrivyWallet();
  const { mutateAsync: sendPrivy } = usePrivySend();
  const { setStatus } = useStatusModalStore();

  return useMutation({
    async mutationFn({ question, tokenName, amount, onStep }: PrivyMakePrediction) {
      if (!primaryWallet) throw new Error('No wallet connected');

      notify();
      onStep?.('shuffling');

      const txHash = await sendPrivy({ amount, tokenName, wallet: primaryWallet });

      if (!txHash) return;

      onStep?.('drawing');
      const tarots = getRandomTarotCards(txHash + primaryWallet.address);

      onStep?.('consulting');
      const client = authClient();
      const payload = {
        tarots,
        hash: txHash,
        question,
        address: currencies[tokenName].address.toString(),
      };
      const result = await post<{ response: string }>(client, 'tarot/generate-response', payload);

      if (toastId) toast.dismiss(toastId);

      return { tarots, answer: result?.response ?? '' };
    },

    onError(error) {
      if (toastId) toast.dismiss(toastId);

      if (error instanceof Error) {
        if (error.message === 'User rejected the request.') {
          setStatus(Status.Canceled);
          return;
        }
        if (error.message === 'Insufficient funds') {
          setStatus(Status.InsufficientFunds);
          return;
        }
      }

      setStatus(Status.Failed);
    },
  });
};

export default usePrivyMakePrediction;
