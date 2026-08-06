import { TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { PublicKey } from '@solana/web3.js';
import { useQuery } from '@tanstack/react-query';

import { wSolMint } from '@/constants/addresses';
import { connection } from '@/constants/solana';
import { usePrivyWallet } from '@/hooks/privy/use-privy-wallet';

export const useGetTokenAndSolBalance = () => {
  const { primaryWallet } = usePrivyWallet();
  const address = primaryWallet?.address;

  return useQuery({
    queryKey: ['solBalance', address],
    queryFn: async () => {
      try {
        if (!address) return undefined;

        const publicKey = new PublicKey(address);
        const solBalance = await connection.getBalance(publicKey);
        const tokenAccounts = await connection.getParsedTokenAccountsByOwner(publicKey, {
          programId: TOKEN_PROGRAM_ID,
        });

        const sol = {
          decimals: 9,
          amount: String(solBalance),
          mint: wSolMint.toString(),
        };

        if (tokenAccounts.value.length === 0) return [sol];

        const res = tokenAccounts.value.map((accountInfo) => {
          const info = accountInfo.account.data.parsed.info;
          const { decimals, amount } = info.tokenAmount;
          const { mint } = info;
          return { decimals, amount, mint };
        });

        return [sol, ...res];
      } catch (error) {
        throw new Error(`Failed to fetch token balance: ${error}`);
      }
    },
    enabled: !!address,
  });
};
