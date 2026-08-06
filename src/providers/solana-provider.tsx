import { PrivyProvider } from '@privy-io/react-auth';
import { toSolanaWalletConnectors } from '@privy-io/react-auth/solana';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { PropsWithChildren } from 'react';

import { endpoint } from '@/constants/solana';
import { env } from '@/env';
import { usePrivyModalStore } from '@/store/privy-modal';

export const SolanaProvider = ({ children }: PropsWithChildren) => {
  const { landingHeader } = usePrivyModalStore();

  return (
    <PrivyProvider
      appId={env.VITE_PRIVY_APP_ID}
      config={{
        loginMethods: ['email', 'wallet'],
        appearance: {
          landingHeader,
          walletList: ['phantom', 'solflare'],
        },
        embeddedWallets: {
          solana: {
            createOnLogin: 'off',
          },
        },
        externalWallets: {
          solana: { connectors: toSolanaWalletConnectors({ shouldAutoConnect: false }) },
        },
      }}
    >
      <ConnectionProvider endpoint={endpoint}>
        <WalletProvider wallets={[]} autoConnect={false}>
          {children}
        </WalletProvider>
      </ConnectionProvider>
    </PrivyProvider>
  );
};
