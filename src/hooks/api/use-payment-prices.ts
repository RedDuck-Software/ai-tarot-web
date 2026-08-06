import { useQuery } from '@tanstack/react-query';

import { get } from './utils';

import { authClient } from '@/lib/fetcher';

export type PaymentPrices = {
  wSolMint: number;
  usdcMint: number;
  usdtMint: number;
};

const usePaymentPrices = () => {
  return useQuery({
    queryKey: ['payment-prices'],
    queryFn: async () => {
      const client = authClient();

      return await get<PaymentPrices>(client, 'tarot/payment-prices');
    },
    staleTime: 5 * 60 * 1000,
    retry: 2,
  });
};

export default usePaymentPrices;
