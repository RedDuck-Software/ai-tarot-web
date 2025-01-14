import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { PublicKey } from '@solana/web3.js';

export const wSolMint = new PublicKey('So11111111111111111111111111111111111111112');

// todo change addresses
export const OwnerAddress = {
  [WalletAdapterNetwork.Mainnet]: new PublicKey('9Her7ga9XNUdjGj8utwkze9v2d1k6aZ9tac9SzJweED8'),
  [WalletAdapterNetwork.Devnet]: new PublicKey('9Her7ga9XNUdjGj8utwkze9v2d1k6aZ9tac9SzJweED8'),
};
