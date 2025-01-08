/* eslint-disable @typescript-eslint/no-unused-expressions */
import { WalletAdapterProps } from '@solana/wallet-adapter-base';
import { PublicKey, Transaction } from '@solana/web3.js';

import { connection } from '.';

export const sendAndConfirmTransaction = async (
  payer: PublicKey,
  tx: Transaction,
  sendTransaction: WalletAdapterProps['sendTransaction'],
): Promise<string> => {
  const latestBlockHash = await connection.getLatestBlockhash({
    commitment: 'finalized',
  });

  tx.feePayer = payer;
  tx.recentBlockhash = latestBlockHash.blockhash;

  const txHash = await sendTransaction(tx, connection, { skipPreflight: true });

  const result = await connection.confirmTransaction(
    {
      ...latestBlockHash,
      signature: txHash,
    },
    'finalized',
  );

  if (result.value.err) result.value.err;

  return txHash;
};
