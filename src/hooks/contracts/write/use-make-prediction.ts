import { useWallet } from '@solana/wallet-adapter-react';
import { SystemProgram, Transaction } from '@solana/web3.js';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { toast } from 'react-toastify';

import { OwnerAddress } from '@/constants/addresses';
import { env } from '@/env';
import useSubmitTarotCards from '@/hooks/api/use-submit-cards';
import { network } from '@/lib/solana';
import { sendAndConfirmTransaction } from '@/lib/solana/utils';
import { getRandomTarotCards } from '@/lib/utils';

const notify = (setToastId: React.Dispatch<React.SetStateAction<string | number | null>>) => {
  const id = toast('Making prediction...', {
    autoClose: false,
    closeOnClick: false,
    draggable: false,
    isLoading: true,
    type: 'default',
  });
  setToastId(id);
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
  const [toastId, setToastId] = useState<string | number | null>(null);

  return useMutation({
    async mutationFn(question: string) {
      if (!publicKey) {
        return;
      }

      notify(setToastId);

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

      console.log(result);

      updateToast(toastId);

      console.log('updateToast');

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
