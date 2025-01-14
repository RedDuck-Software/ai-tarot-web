import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { PublicKey } from '@solana/web3.js';

export const wSolMint = new PublicKey('So11111111111111111111111111111111111111112');

export const OwnerAddress = {
  [WalletAdapterNetwork.Mainnet]: new PublicKey('2Mko2nLhSiehXGJDseYCj6hYQdrK3cKNMetcGaXtbrJk'),
  [WalletAdapterNetwork.Devnet]: new PublicKey('9L3FxnqEurHxQBANpcZbjgP8tHUNrLFXzGk1pjZVr47x'),
};
