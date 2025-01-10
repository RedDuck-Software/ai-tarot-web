import { useWallet } from '@solana/wallet-adapter-react';
import { SystemProgram, Transaction } from '@solana/web3.js';
import { useMutation } from '@tanstack/react-query';

import { OwnerAddress } from '@/constants/addresses';
import { env } from '@/env';
import useSubmitTarotCards from '@/hooks/api/use-submit-cards';
import { network } from '@/lib/solana';
import { sendAndConfirmTransaction } from '@/lib/solana/utils';
import { getRandomTarotCards, showTxToast } from '@/lib/utils';

const useMakePrediction = () => {
  const { publicKey, sendTransaction } = useWallet();
  const { mutateAsync: submitCards } = useSubmitTarotCards();

  return useMutation({
    async mutationFn(question: string) {
      if (!publicKey) {
        return;
      }

      return await showTxToast('Making prediction', async () => {
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

        return {
          tarots,
          answer: result?.response ?? '',
        };
      });
    },

    onError(error) {
      console.trace(error);
    },
  });
};

export default useMakePrediction;
