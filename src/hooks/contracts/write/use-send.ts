import { getAssociatedTokenAddress, createTransferInstruction } from '@solana/spl-token';
import { useWallet } from '@solana/wallet-adapter-react';
import { PublicKey, Transaction } from '@solana/web3.js';
import { useMutation } from '@tanstack/react-query';

import { currencies, OwnerAddress, TCurrencies } from '@/constants/addresses';
import useSendSol from '@/hooks/contracts/write/use-send-sol.ts';
import { network } from '@/lib/solana';
import { sendAndConfirmTransaction } from '@/lib/solana/utils';
import { generateAssociatedTokenAccountInstruction } from '@/lib/utils.ts';

const recipient = new PublicKey(OwnerAddress[network]);

interface ISend {
  amount: number;
  tokenName: TCurrencies;
}

const useSend = () => {
  const { publicKey, sendTransaction } = useWallet();
  const { mutateAsync: sendSol } = useSendSol();

  return useMutation({
    async mutationFn({ amount, tokenName }: ISend) {
      if (!publicKey) {
        return;
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

      return await sendAndConfirmTransaction(publicKey, rawTx, sendTransaction);
    },
    onError(error) {
      console.trace(error);
    },
  });
};

export default useSend;
