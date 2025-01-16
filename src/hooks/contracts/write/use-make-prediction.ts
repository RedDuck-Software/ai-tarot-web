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
import { Status, useStatusModalStore } from '@/store/status-modal';

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

const useMakePrediction = () => {
  const { publicKey, sendTransaction } = useWallet();
  const { mutateAsync: submitCards } = useSubmitTarotCards();
  const { setStatus } = useStatusModalStore();

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
      setStatus(Status.Failed);
      if (toastId) {
        toast.dismiss(toastId);
      }
    },
  });
};

export default useMakePrediction;
