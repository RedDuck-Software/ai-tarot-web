import { useWallet } from '@solana/wallet-adapter-react';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';

import { currencies, Currencies } from '@/constants/addresses';
import useSubmitTarotCards from '@/hooks/api/use-submit-cards';
import useSend from '@/hooks/contracts/write/use-send';
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

type MakePrediction = {
  question: string;
  tokenName: Currencies;
};

const useMakePrediction = () => {
  const { publicKey } = useWallet();
  const { mutateAsync: submitCards } = useSubmitTarotCards();
  const { mutateAsync: sendCurrency } = useSend();
  const { setStatus } = useStatusModalStore();

  return useMutation({
    async mutationFn({ question, tokenName }: MakePrediction) {
      if (!publicKey) {
        return;
      }

      notify();

      const txHash = await sendCurrency({ amount: currencies[tokenName].defaultPrice, tokenName });

      if (!txHash) {
        return;
      }

      const tarots = getRandomTarotCards(txHash + publicKey.toBase58());

      const result = await submitCards({
        tarots,
        hash: txHash,
        question,
        address: currencies[tokenName].address.toString(),
      });

      if (toastId) {
        toast.dismiss(toastId);
      }

      // setStatus(Status.Success);

      return {
        tarots,
        answer: result?.response ?? '',
      };
    },

    onError(error) {
      console.trace(error);

      if (toastId) {
        toast.dismiss(toastId);
      }

      if (error.message === 'User rejected the request.') {
        setStatus(Status.Canceled);
        return;
      }

      if (error.message === 'Insufficient funds') {
        setStatus(Status.InsufficientFunds);
        return;
      }

      setStatus(Status.Failed);
    },
  });
};

export default useMakePrediction;
