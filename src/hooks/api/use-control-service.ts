import { useWallet } from '@solana/wallet-adapter-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import bs58 from 'bs58';

import { post } from './utils';

import { authClient } from '@/lib/fetcher';

const useControlService = () => {
  const { publicKey, signMessage } = useWallet();

  const client = useQueryClient();

  return useMutation({
    async mutationFn({ status }: { status: boolean }) {
      if (!publicKey || !signMessage) {
        return;
      }

      const client = authClient();

      const uuid = crypto.randomUUID();

      const message = `I am the admin of Tarot ${uuid}`;

      const encodedMessage = new TextEncoder().encode(message);
      const signature = bs58.encode(await signMessage(encodedMessage));

      client.setHeader('x-admin-signature', signature);
      client.setHeader('x-admin-uuid', uuid);

      return await post<{
        isShutDown: boolean;
        id: number;
      }>(client, status ? `shutdown/enable` : 'shutdown/shutdown');
    },
    async onSuccess() {
      await client.invalidateQueries({
        queryKey: ['status'],
      });
    },
    onError(error) {
      console.trace(error);
    },
  });
};

export default useControlService;
