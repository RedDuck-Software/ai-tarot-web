import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { PublicKey } from '@solana/web3.js';

export const wSolMint = new PublicKey('So11111111111111111111111111111111111111112');

// todo change addresses
export const OwnerAddress = {
  [WalletAdapterNetwork.Mainnet]: new PublicKey('dBLGG3ERvVsAexwfLeRaPUSzQQryKsabNEFKpuMqQqQ'),
  [WalletAdapterNetwork.Devnet]: new PublicKey('dBLGG3ERvVsAexwfLeRaPUSzQQryKsabNEFKpuMqQqQ'),
};
