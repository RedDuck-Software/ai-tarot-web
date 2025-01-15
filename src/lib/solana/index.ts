import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { PhantomWalletAdapter, SolflareWalletAdapter } from '@solana/wallet-adapter-wallets';
import { clusterApiUrl, Connection } from '@solana/web3.js';

import { env } from '@/env';

export const network =
  env.VITE_PUBLIC_NETWORKS_MODE === 'mainnet' ? WalletAdapterNetwork.Mainnet : WalletAdapterNetwork.Devnet;

console.log('wallets', network);

export const endpoint = env.VITE_PUBLIC_SOLANA_RPC ?? clusterApiUrl(network);

export const wallets = [new PhantomWalletAdapter(), new SolflareWalletAdapter()];

export const connection = new Connection(endpoint, 'confirmed');
