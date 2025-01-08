import { createEnv } from '@t3-oss/env-core';
import { z } from 'zod';

export const env = createEnv({
  clientPrefix: 'VITE_',
  client: {
    VITE_API_URL: z.string().optional(),
    VITE_PUBLIC_NETWORKS_MODE: z.enum(['testnet', 'mainnet']).default('testnet'),
    VITE_PUBLIC_SOLANA_RPC: z.string().optional(),
  },
  runtimeEnv: import.meta.env,
});
