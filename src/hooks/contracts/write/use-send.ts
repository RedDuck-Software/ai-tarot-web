import { getAssociatedTokenAddress, createTransferInstruction } from '@solana/spl-token';
import { useWallet } from '@solana/wallet-adapter-react';
import { PublicKey, Transaction } from '@solana/web3.js';
import { useMutation } from '@tanstack/react-query';

import { useGetTokenAndSolBalance } from '../read/use-get-token-and-sol-balance';

import { currencies, OwnerAddress, TCurrencies, wSolMint } from '@/constants/addresses';
import useSendSol from '@/hooks/contracts/write/use-send-sol.ts';
import { connection, network } from '@/lib/solana';
import { sendAndConfirmTransaction } from '@/lib/solana/utils';
import { generateAssociatedTokenAccountInstruction } from '@/lib/utils.ts';

const recipient = new PublicKey(OwnerAddress[network]);

interface ISend {
  amount: number;
  tokenName: TCurrencies;
}

const useSend = () => {
  const { publicKey, sendTransaction } = useWallet();
  const { data: tokens } = useGetTokenAndSolBalance();
  const { mutateAsync: sendSol } = useSendSol();

  return useMutation({
    async mutationFn({ amount, tokenName }: ISend) {
      if (!publicKey) {
        return;
      }

      const tokenBalanceInfo = tokens?.find((token) => token.mint === currencies[tokenName].address.toString());

      if (!tokenBalanceInfo || Number(tokenBalanceInfo.amount) < amount) {
        throw new Error('Insufficient funds');
      }

      if (tokenName === 'wSolMint') {
        return await sendSol(amount);
      }

      const { address: mint, decimals } = currencies[tokenName];

      const rawTx = new Transaction();

      const senderTokenAddress = await getAssociatedTokenAddress(mint, publicKey);
      const recipientTokenAddress = await getAssociatedTokenAddress(mint, recipient);

      const associatedTokenAccountInstruction = await generateAssociatedTokenAccountInstruction({
        owner: recipient,
        payer: publicKey,
        mint,
      });

      if (associatedTokenAccountInstruction) {
        rawTx.add(associatedTokenAccountInstruction);
      }

      rawTx.add(
        createTransferInstruction(senderTokenAddress, recipientTokenAddress, publicKey, amount * 10 ** decimals),
      );

      const latestBlockhash = await connection.getLatestBlockhash({
        commitment: 'finalized',
      });

      rawTx.recentBlockhash = latestBlockhash.blockhash;
      rawTx.feePayer = publicKey;

      const fee = await rawTx.getEstimatedFee(connection);
      const solBalance = tokens?.find((token) => token.mint === wSolMint.toBase58())?.amount;

      if (fee && solBalance && Number(solBalance) + Number(amount) < fee) {
        throw new Error('Insufficient SOL for transaction fee');
      }

      return await sendAndConfirmTransaction(publicKey, rawTx, sendTransaction);
    },
    onError(error) {
      console.trace(error);
    },
  });
};

export default useSend;
