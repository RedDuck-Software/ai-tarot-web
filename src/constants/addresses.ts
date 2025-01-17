import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { PublicKey } from '@solana/web3.js';

import { env } from '@/env.ts';

export const wSolMint = new PublicKey(env.VITE_WSOL_MINT);
export const usdcMint = new PublicKey(env.VITE_USDC_MINT);
export const usdtMint = new PublicKey(env.VITE_USDT_MINT);

export const OwnerAddress = {
  [WalletAdapterNetwork.Mainnet]: new PublicKey('2Mko2nLhSiehXGJDseYCj6hYQdrK3cKNMetcGaXtbrJk'),
  [WalletAdapterNetwork.Devnet]: new PublicKey('8LD69Ao7ULmWJNWULkUa5jhaLY9n7ucWcVGFcbfrFNwm'),
};

export const currencies = {
  wSolMint: {
    address: wSolMint,
    decimals: 9,
    tips: [],
  },
  usdcMint: {
    address: usdcMint,
    decimals: 6,
  },
  usdtMint: {
    address: usdtMint,
    decimals: 6,
  },
};

export type TCurrencies = keyof typeof currencies;
