import { createEnv } from '@t3-oss/env-core';
import { z } from 'zod';

export const env = createEnv({
  clientPrefix: 'VITE_',
  client: {
    VITE_API_URL: z.string().optional(),
    VITE_PUBLIC_NETWORKS_MODE: z.enum(['testnet', 'mainnet']).default('testnet'),
    VITE_PUBLIC_SOLANA_RPC: z.string().optional(),
    VITE_WSOL_MINT: z.string().default('So11111111111111111111111111111111111111112'),
    VITE_USDC_MINT: z.string().default('GcdYBygdoiv6KNH4noHmdkK5hvKqdnfUUKMhe9d7vHek'),
    VITE_USDT_MINT: z.string().default('DViAQybZkCmA3RioGmaZ3c5SsxAdPARoCTKpE5qKe8Z9'),
    VITE_TWITTER_URL: z.string().optional(),
  },
  runtimeEnv: import.meta.env,
});
