import { useSignAndSendTransaction } from '@privy-io/react-auth/solana';
import { getAssociatedTokenAddress, createTransferInstruction } from '@solana/spl-token';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction } from '@solana/web3.js';
import { useMutation } from '@tanstack/react-query';
import bs58 from 'bs58';

import { useGetTokenAndSolBalance } from '../read/use-get-token-and-sol-balance';

import { currencies, OwnerAddress, Currencies, wSolMint } from '@/constants/addresses';
import { connection, network } from '@/constants/solana';
import { usePrivyWallet } from '@/hooks/privy/use-privy-wallet';
import { generateAssociatedTokenAccountInstruction } from '@/lib/utils.ts';

const recipient = new PublicKey(OwnerAddress[network]);
const solanaChain = network === WalletAdapterNetwork.Mainnet ? ('solana:mainnet' as const) : ('solana:devnet' as const);

type Send = {
  amount: number;
  tokenName: Currencies;
};

const useSend = () => {
  const { primaryWallet } = usePrivyWallet();
  const { signAndSendTransaction } = useSignAndSendTransaction();
  const { data: tokens } = useGetTokenAndSolBalance();

  return useMutation({
    async mutationFn({ amount, tokenName }: Send) {
      if (!primaryWallet) return;

      const address = primaryWallet.address;
      const activeWallet = primaryWallet;
      const publicKey = new PublicKey(address);

      if (tokenName === 'wSolMint') {
        const lamports = Math.round(amount * LAMPORTS_PER_SOL);
        const solBalance = await connection.getBalance(publicKey);
        const rawTx = new Transaction();
        rawTx.add(
          SystemProgram.transfer({
            fromPubkey: publicKey,
            toPubkey: OwnerAddress[network],
            lamports,
          }),
        );
        const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash({ commitment: 'finalized' });
        rawTx.recentBlockhash = blockhash;
        rawTx.feePayer = publicKey;
        const fee = await rawTx.getEstimatedFee(connection);
        if (fee && solBalance < fee + lamports) {
          throw new Error('Insufficient funds');
        }
        const { signature } = await signAndSendTransaction({
          transaction: rawTx.serialize({ requireAllSignatures: false, verifySignatures: false }),
          wallet: activeWallet,
          chain: solanaChain,
          options: { skipPreflight: true, commitment: 'finalized' },
        });
        const txSig = bs58.encode(signature);
        await connection.confirmTransaction({ signature: txSig, blockhash, lastValidBlockHeight }, 'finalized');
        return txSig;
      }

      const tokenBalanceInfo = tokens?.find((token) => token.mint === currencies[tokenName].address.toString());
      if (!tokenBalanceInfo || Number(tokenBalanceInfo.amount) < amount) {
        throw new Error('Insufficient funds');
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

      const latestBlockhash = await connection.getLatestBlockhash({ commitment: 'finalized' });
      rawTx.recentBlockhash = latestBlockhash.blockhash;
      rawTx.feePayer = publicKey;

      const fee = await rawTx.getEstimatedFee(connection);
      const solBalance = tokens?.find((t) => t.mint === wSolMint.toBase58())?.amount;
      if (fee && solBalance && Number(solBalance) < fee) {
        throw new Error('Insufficient funds');
      }

      const { signature } = await signAndSendTransaction({
        transaction: rawTx.serialize({ requireAllSignatures: false, verifySignatures: false }),
        wallet: activeWallet,
        chain: solanaChain,
        options: { skipPreflight: true, commitment: 'finalized' },
      });
      const txSig = bs58.encode(signature);
      await connection.confirmTransaction(
        {
          signature: txSig,
          blockhash: latestBlockhash.blockhash,
          lastValidBlockHeight: latestBlockhash.lastValidBlockHeight,
        },
        'finalized',
      );
      return txSig;
    },
  });
};

export default useSend;
