import { useQuery } from '@tanstack/react-query';

import { get } from './utils';

import { authClient } from '@/lib/fetcher';

const useStatus = () => {
  return useQuery({
    queryKey: ['status'],
    queryFn: async () => {
      const client = authClient();

      return await get<{
        isShutDown: boolean;
        id: number;
      } | null>(client, 'shutdown/status');
    },
    refetchInterval: 10000,
  });
};

export default useStatus;
