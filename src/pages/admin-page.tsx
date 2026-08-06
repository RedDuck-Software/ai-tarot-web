/* eslint-disable @typescript-eslint/no-floating-promises */
import { useWallet } from '@solana/wallet-adapter-react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';

import { Header } from '@/components/common/header';
import { Button } from '@/components/ui/button';
import { OwnerAddress } from '@/constants/addresses';
import { network } from '@/constants/solana';
import useControlService from '@/hooks/api/use-control-service';
import useStatus from '@/hooks/api/use-status';

export default function AdminPage() {
  const { publicKey } = useWallet();
  const navigate = useNavigate();

  const { data: status } = useStatus();

  const { mutateAsync } = useControlService();

  useEffect(() => {
    if (!publicKey?.equals(OwnerAddress[network])) {
      navigate('/');
    }
  }, [navigate, publicKey]);

  const handleControl = async (status: boolean) => {
    await mutateAsync({
      status: status,
    });
  };

  return (
    <>
      <Header />

      <div className="mt-8 space-y-4 px-4">
        <p>Status: {status?.isShutDown === true ? 'Disabled' : 'Enabled'}</p>

        <div className="flex h-[50vh] w-1/2 flex-row justify-between gap-4">
          <Button
            onClick={() => handleControl(true)}
            variant={'outline'}
            className="min-h-[60px] w-full bg-[url('/images/textures/green.png')] bg-repeat text-[22px] transition-all ease-in-out hover:opacity-80"
          >
            Enable
          </Button>
          <Button
            onClick={() => handleControl(false)}
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
