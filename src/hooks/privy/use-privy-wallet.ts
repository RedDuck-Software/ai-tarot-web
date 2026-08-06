import { usePrivy } from '@privy-io/react-auth';
import { useCreateWallet, useWallets } from '@privy-io/react-auth/solana';
import { TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { PublicKey } from '@solana/web3.js';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

import { wSolMint } from '@/constants/addresses';
import { connection } from '@/constants/solana';

export type TokenBalance = {
  amount: string;
  decimals: number;
  mint: string;
};

const fetchBalances = async (address: string): Promise<TokenBalance[]> => {
  const publicKey = new PublicKey(address);
  const solBalance = await connection.getBalance(publicKey);
  const tokenAccounts = await connection.getParsedTokenAccountsByOwner(publicKey, {
    programId: TOKEN_PROGRAM_ID,
  });

  const sol: TokenBalance = {
    decimals: 9,
    amount: String(solBalance),
    mint: wSolMint.toString(),
  };

  if (tokenAccounts.value.length === 0) return [sol];

  const tokens = tokenAccounts.value.map((accountInfo) => {
    const info = accountInfo.account.data.parsed.info;
    return {
      decimals: Number(info.tokenAmount.decimals),
      amount: String(info.tokenAmount.amount),
      mint: String(info.mint),
    };
  });

  return [sol, ...tokens];
};

const isPrivyEmbedded = (w: { standardWallet: object }) =>
  'isPrivyWallet' in w.standardWallet && (w.standardWallet as { isPrivyWallet: boolean }).isPrivyWallet;

export const usePrivyWallet = () => {
  const { ready, authenticated, user } = usePrivy();
  const { wallets, ready: walletsReady } = useWallets();
  const { createWallet } = useCreateWallet();

  const privyWallet = walletsReady ? (wallets.find(isPrivyEmbedded) ?? null) : null;
  const externalWallets = walletsReady ? wallets.filter((w) => !isPrivyEmbedded(w)) : [];

  const externalAddressSet = new Set(externalWallets.map((w) => (w as unknown as { address: string }).address));
  const linkedExternalSorted = (user?.linkedAccounts ?? [])
    .filter((a) => a.type === 'wallet' && externalAddressSet.has((a as { address?: string }).address ?? ''))
    .sort((a, b) => {
      const ta = (a as { latestVerifiedAt?: Date | null }).latestVerifiedAt?.getTime() ?? 0;
      const tb = (b as { latestVerifiedAt?: Date | null }).latestVerifiedAt?.getTime() ?? 0;
      return tb - ta;
    });
  const externalWallet =
    linkedExternalSorted.reduce<(typeof externalWallets)[0] | null>((found, linked) => {
      if (found) return found;
      const addr = (linked as { address?: string }).address;
      return externalWallets.find((w) => (w as unknown as { address: string }).address === addr) ?? null;
    }, null) ?? null;

  const primaryWallet = authenticated ? (externalWallet ?? privyWallet) : null;

  const isIncompatibleLogin =
    walletsReady && wallets.some((w) => (w as unknown as { address: string }).address.startsWith('0x'));

  const isEmailUser = user?.linkedAccounts.some(
    (a) => a.type === 'email' || a.type === 'google_oauth' || a.type === 'twitter_oauth',
  );

  useEffect(() => {
    if (!authenticated || !walletsReady || privyWallet || !isEmailUser || externalWallet) return;
    createWallet().catch(() => undefined);
  }, [authenticated, walletsReady, privyWallet, isEmailUser, externalWallet, createWallet]);

  const { data: balances } = useQuery({
    queryKey: ['wallet-balances', privyWallet?.address],
    queryFn: () => fetchBalances(privyWallet?.address ?? ''),
    enabled: !!privyWallet?.address,
    refetchInterval: 15_000,
  });

  const { data: externalBalances } = useQuery({
    queryKey: ['wallet-balances', externalWallet?.address],
    queryFn: () => fetchBalances(externalWallet?.address ?? ''),
    enabled: !!externalWallet?.address,
    refetchInterval: 15_000,
  });

  return {
    ready: ready && walletsReady,
    isIncompatibleLogin,
    primaryWallet,
    privyWallet,
    externalWallet,
    externalWallets,
    balances: balances ?? null,
    externalBalances: externalBalances ?? null,
  };
};
