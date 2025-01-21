import { getAssociatedTokenAddress, createTransferInstruction } from '@solana/spl-token';
import { useWallet } from '@solana/wallet-adapter-react';
import { PublicKey, Transaction } from '@solana/web3.js';
import { useMutation } from '@tanstack/react-query';

import { useGetTokenAndSolBalance } from '../read/use-get-token-and-sol-balance';

import { currencies, OwnerAddress, Currencies, wSolMint } from '@/constants/addresses';
import { connection, network } from '@/constants/solana';
import useSendSol from '@/hooks/contracts/write/use-send-sol';
import { sendAndConfirmTransaction } from '@/lib/solana-utils';
import { generateAssociatedTokenAccountInstruction } from '@/lib/utils.ts';

const recipient = new PublicKey(OwnerAddress[network]);

type Send = {
  amount: number;
  tokenName: Currencies;
};

const useSend = () => {
  const { publicKey, sendTransaction } = useWallet();
  const { data: tokens } = useGetTokenAndSolBalance();
  const { mutateAsync: sendSol } = useSendSol();

  return useMutation({
    async mutationFn({ amount, tokenName }: Send) {
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

      console.log('fee', fee, 'solBalance', solBalance, 'amount', amount);

      if (fee && solBalance && Number(solBalance) < fee) {
        throw new Error('Insufficient funds');
      }

      return await sendAndConfirmTransaction(publicKey, rawTx, sendTransaction);
    },
    onError(error) {
      console.trace(error);
    },
  });
};

export default useSend;
