import { useWallet } from '@solana/wallet-adapter-react';
import { SystemProgram, Transaction } from '@solana/web3.js';
import { useMutation } from '@tanstack/react-query';

import { OwnerAddress } from '@/constants/addresses';
import { network } from '@/lib/solana';
import { sendAndConfirmTransaction } from '@/lib/solana/utils';
import { showTxToast } from '@/lib/utils';

const useSendSol = () => {
  const { publicKey, sendTransaction } = useWallet();

  return useMutation({
    async mutationFn(amount: number) {
      if (!publicKey) {
        return;
      }

      await showTxToast('Tipping the Oracle', async () => {
        const rawTx = new Transaction();

        rawTx.add(
          SystemProgram.transfer({
            fromPubkey: publicKey,
            toPubkey: OwnerAddress[network],
            lamports: Number(amount) * 1e9,
          }),
        );

        await sendAndConfirmTransaction(publicKey, rawTx, sendTransaction);
      });
    },
    onError(error) {
      console.trace(error);
    },
  });
};

export default useSendSol;
