import { getAssociatedTokenAddress, createTransferInstruction } from '@solana/spl-token';
import { useWallet } from '@solana/wallet-adapter-react';
import { Transaction, PublicKey } from '@solana/web3.js';
import { useMutation } from '@tanstack/react-query';

import { sendAndConfirmTransaction } from '@/lib/solana/utils';
import { showTxToast } from '@/lib/utils';

const mintAddress = new PublicKey('So11111111111111111111111111111111111111112');
const recipientAddress = new PublicKey('Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB');

const useTransferSolana = () => {
  const { publicKey, sendTransaction } = useWallet();

  return useMutation({
    async mutationFn() {
      if (!publicKey) {
        return;
      }

      await showTxToast('Send Solana', async () => {
        const senderTokenAccount = await getAssociatedTokenAddress(mintAddress, publicKey);
        const recipientTokenAccount = await getAssociatedTokenAddress(mintAddress, recipientAddress);

        const amount = 100 * Math.pow(10, 6);

        const rawTx = new Transaction().add(
          createTransferInstruction(senderTokenAccount, recipientTokenAccount, publicKey, amount),
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
