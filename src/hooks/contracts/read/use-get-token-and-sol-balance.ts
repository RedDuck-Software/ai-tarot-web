import { TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { useWallet } from '@solana/wallet-adapter-react';
import { useQuery } from '@tanstack/react-query';

import { wSolMint } from '@/constants/addresses';
import { connection } from '@/lib/solana';

export const useGetTokenAndSolBalance = () => {
  const { publicKey } = useWallet();

  return useQuery({
    queryKey: ['solBalance', publicKey],
    queryFn: async () => {
      try {
        if (!publicKey) {
          return undefined;
        }

        const solBalance = await connection.getBalance(publicKey);

        const tokenAccounts = await connection.getParsedTokenAccountsByOwner(publicKey, {
          programId: TOKEN_PROGRAM_ID,
        });

        const sol = {
          decimals: 9,
          amount: String(solBalance),
          mint: wSolMint.toString(),
        };

        if (tokenAccounts.value.length === 0) {
          return [sol];
        }

        const res = tokenAccounts.value.map((accountInfo) => {
          const info = accountInfo.account.data.parsed.info;
          const { decimals, amount } = info.tokenAmount;
          const { mint } = info;

          return {
            decimals,
            amount,
            mint,
          };
        });

        return [sol, ...res];
      } catch (error) {
        throw new Error(`Failed to fetch token balance: ${error}`);
      }
    },
    enabled: !!publicKey,
  });
};
