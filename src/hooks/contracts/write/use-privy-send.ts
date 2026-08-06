import { ConnectedStandardSolanaWallet, useSignAndSendTransaction } from '@privy-io/react-auth/solana';
import { createTransferInstruction, getAssociatedTokenAddress, TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction } from '@solana/web3.js';
import { useMutation } from '@tanstack/react-query';
import bs58 from 'bs58';

import { currencies, Currencies, OwnerAddress } from '@/constants/addresses';
import { connection, network } from '@/constants/solana';
import { generateAssociatedTokenAccountInstruction } from '@/lib/utils';

const recipient = new PublicKey(OwnerAddress[network]);
const solanaChain = network === WalletAdapterNetwork.Mainnet ? ('solana:mainnet' as const) : ('solana:devnet' as const);

type PrivySend = {
  amount: number;
  tokenName: Currencies;
  wallet: ConnectedStandardSolanaWallet;
};

const usePrivySend = () => {
  const { signAndSendTransaction } = useSignAndSendTransaction();

  return useMutation({
    async mutationFn({ amount, tokenName, wallet }: PrivySend) {
      const walletPubkey = new PublicKey(wallet.address);
      const solBalance = await connection.getBalance(walletPubkey);

      if (tokenName === 'wSolMint') {
        const rawTx = new Transaction();
        rawTx.add(
          SystemProgram.transfer({
            fromPubkey: walletPubkey,
            toPubkey: OwnerAddress[network],
            lamports: Math.round(amount * LAMPORTS_PER_SOL),
          }),
        );

        const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash({ commitment: 'finalized' });
        rawTx.recentBlockhash = blockhash;
        rawTx.feePayer = walletPubkey;

        const fee = await rawTx.getEstimatedFee(connection);
        if (fee && solBalance < fee + Math.round(amount * LAMPORTS_PER_SOL)) {
          throw new Error('Insufficient funds');
        }

        const { signature } = await signAndSendTransaction({
          transaction: rawTx.serialize({ requireAllSignatures: false, verifySignatures: false }),
          wallet,
          chain: solanaChain,
          options: { skipPreflight: true, commitment: 'finalized' },
        });

        const txSig = bs58.encode(signature);
        await connection.confirmTransaction({ signature: txSig, blockhash, lastValidBlockHeight }, 'finalized');
        return txSig;
      }

      const { address: mint, decimals } = currencies[tokenName];

      const tokenAccounts = await connection.getParsedTokenAccountsByOwner(walletPubkey, {
        programId: TOKEN_PROGRAM_ID,
      });
      const tokenAccount = tokenAccounts.value.find((a) => a.account.data.parsed.info.mint === mint.toBase58());
      const tokenAmount = tokenAccount ? Number(tokenAccount.account.data.parsed.info.tokenAmount.amount) : 0;

      if (tokenAmount < amount * 10 ** decimals) {
        throw new Error('Insufficient funds');
      }

      const rawTx = new Transaction();
      const senderTokenAddress = await getAssociatedTokenAddress(mint, walletPubkey);
      const recipientTokenAddress = await getAssociatedTokenAddress(mint, recipient);

      const ataInstruction = await generateAssociatedTokenAccountInstruction({
        owner: recipient,
        payer: walletPubkey,
        mint,
      });
      if (ataInstruction) rawTx.add(ataInstruction);

      rawTx.add(
        createTransferInstruction(
          senderTokenAddress,
          recipientTokenAddress,
          walletPubkey,
          Math.round(amount * 10 ** decimals),
        ),
      );

      const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash({ commitment: 'finalized' });
      rawTx.recentBlockhash = blockhash;
      rawTx.feePayer = walletPubkey;

      const fee = await rawTx.getEstimatedFee(connection);
      if (fee && solBalance < fee) {
        throw new Error('Insufficient funds');
      }

      const { signature } = await signAndSendTransaction({
        transaction: rawTx.serialize({ requireAllSignatures: false, verifySignatures: false }),
        wallet,
        chain: solanaChain,
        options: { skipPreflight: true, commitment: 'finalized' },
      });

      const txSig = bs58.encode(signature);
      await connection.confirmTransaction({ signature: txSig, blockhash, lastValidBlockHeight }, 'finalized');
      return txSig;
    },
  });
};

export default usePrivySend;
