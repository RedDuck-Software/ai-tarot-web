import { useWallet } from '@solana/wallet-adapter-react';
import { Transaction, SystemProgram } from '@solana/web3.js';
import { useMutation } from '@tanstack/react-query';

import { OwnerAddress } from '@/constants/addresses';
import { network } from '@/lib/solana';
import { sendAndConfirmTransaction } from '@/lib/solana/utils';
import { showTxToast } from '@/lib/utils';

const useTransferSolana = () => {
  const { publicKey, sendTransaction } = useWallet();

  return useMutation({
    async mutationFn() {
      if (!publicKey) {
        return;
      }

      await showTxToast('Send Solana', async () => {
        const rawTx = new Transaction();

        rawTx.add(
          SystemProgram.transfer({
            fromPubkey: publicKey,
            toPubkey: OwnerAddress[network],
            lamports: 0.01 * 1e9,
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

export default useTransferSolana;
