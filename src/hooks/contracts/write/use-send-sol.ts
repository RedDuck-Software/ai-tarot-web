import { useWallet } from '@solana/wallet-adapter-react';
import { LAMPORTS_PER_SOL, SystemProgram, Transaction } from '@solana/web3.js';
import { useMutation } from '@tanstack/react-query';

import { useGetTokenAndSolBalance } from '../read/use-get-token-and-sol-balance';

import { OwnerAddress, wSolMint } from '@/constants/addresses';
import { connection, network } from '@/constants/solana';
import { sendAndConfirmTransaction } from '@/lib/solana-utils';

const useSendSol = () => {
  const { publicKey, sendTransaction } = useWallet();
  const { data: tokens } = useGetTokenAndSolBalance();

  return useMutation({
    async mutationFn(amount: number) {
      if (!publicKey) {
        return;
      }

      const rawTx = new Transaction();

      rawTx.add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: OwnerAddress[network],
          lamports: Number(amount) * 1e9,
        }),
      );

      const latestBlockhash = await connection.getLatestBlockhash({
        commitment: 'finalized',
      });

      rawTx.recentBlockhash = latestBlockhash.blockhash;
      rawTx.feePayer = publicKey;

      const fee = await rawTx.getEstimatedFee(connection);
      const solBalance = tokens?.find((token) => token.mint === wSolMint.toBase58())?.amount;

      if (fee && solBalance && Number(solBalance) < fee + amount * LAMPORTS_PER_SOL) {
        throw new Error('Insufficient funds');
      }

      return await sendAndConfirmTransaction(publicKey, rawTx, sendTransaction);
    },
    onError(error) {
      console.trace(error);
    },
  });
};

export default useSendSol;
