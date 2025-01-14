/* eslint-disable @typescript-eslint/no-floating-promises */
import { useWallet } from '@solana/wallet-adapter-react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';

import { Header } from '@/components/common/Header';
import { Button } from '@/components/ui/button';
import { OwnerAddress } from '@/constants/addresses';
import useStatus from '@/hooks/api/use-status';
import { network } from '@/lib/solana';

export default function AdminPage() {
  const { publicKey } = useWallet();
  const navigate = useNavigate();
  const { data: status } = useStatus();

  useEffect(() => {
    if (!publicKey?.equals(OwnerAddress[network])) {
      console.log(publicKey?.toBase58(), OwnerAddress[network].toBase58());
      navigate('/');
    }
  }, [navigate, publicKey]);

  return (
    <>
      <Header />

      <div className="mt-8 space-y-4 px-4">
        <p>Status: {status?.isShutDown === false ? 'Disabled' : 'Enabled'}</p>

        <div className="flex h-[50vh] w-1/2 flex-row justify-between gap-4">
          <Button
            variant={'outline'}
            className="min-h-[60px] w-full bg-[url('/images/textures/green.png')] bg-repeat text-[22px] transition-all ease-in-out hover:opacity-80"
          >
            Enable
          </Button>
          <Button
            variant={'outline'}
            className="min-h-[60px] w-full bg-[url('/images/textures/green.png')] bg-repeat text-[22px] transition-all ease-in-out hover:opacity-80"
          >
            Disable
          </Button>
        </div>
      </div>
    </>
  );
}
