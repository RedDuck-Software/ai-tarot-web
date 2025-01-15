import { useWallet } from '@solana/wallet-adapter-react';
import { SystemProgram, Transaction } from '@solana/web3.js';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';

import { OwnerAddress } from '@/constants/addresses';
import { env } from '@/env';
import useSubmitTarotCards from '@/hooks/api/use-submit-cards';
import { network } from '@/lib/solana';
import { sendAndConfirmTransaction } from '@/lib/solana/utils';
import { getRandomTarotCards } from '@/lib/utils';

let toastId: string | number | null = null;

const notify = () => {
  toastId = toast('Making prediction...', {
    autoClose: false,
    closeOnClick: false,
    draggable: false,
    isLoading: true,
    type: 'default',
  });
};

const updateToast = (toastId: string | number | null) => {
  if (toastId !== null) {
    toast.update(toastId, {
      render: 'Done!',
      type: 'success',
      autoClose: 3000,
      isLoading: false,
    });
  }
};

const handleErrorToast = (toastId: string | number | null) => {
  if (toastId !== null) {
    toast.update(toastId, {
      render: 'Error occurred!',
      type: 'error',
      autoClose: 3000,
      isLoading: false,
    });
  }
};

const useMakePrediction = () => {
  const { publicKey, sendTransaction } = useWallet();
  const { mutateAsync: submitCards } = useSubmitTarotCards();

  return useMutation({
    async mutationFn(question: string) {
      if (!publicKey) {
        return;
      }

      notify();

      const rawTx = new Transaction();

      rawTx.add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: OwnerAddress[network],
          lamports: Number(env.VITE_DEPOSIT_AMOUNT_SOL) * 1e9,
        }),
      );

      const txHash = await sendAndConfirmTransaction(publicKey, rawTx, sendTransaction);

      const tarots = getRandomTarotCards(txHash + publicKey.toBase58());

      const result = await submitCards({ tarots, hash: txHash, question });

      updateToast(toastId);

      return {
        tarots,
        answer: result?.response ?? '',
      };
    },

    onError(error) {
      console.trace(error);
      handleErrorToast(toastId);
    },
  });
};

export default useMakePrediction;
