import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { PropsWithChildren } from 'react';

import { endpoint, wallets } from '@/constants/solana';

export const SolanaProvider = ({ children }: PropsWithChildren) => {
  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        {children}
      </WalletProvider>
    </ConnectionProvider>
  );
};
