import { WalletReadyState } from '@solana/wallet-adapter-base';
import { useWallet } from '@solana/wallet-adapter-react';
import { PhantomWalletName, SolflareWalletName } from '@solana/wallet-adapter-wallets';
import { useCallback, useEffect, useRef, useState } from 'react';

import { SvgComponent } from './progress-bar';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { shortenAddress } from '@/lib/utils';
import { useWalletModalStore } from '@/store/wallet-modal';

export const ConnectWalletButton = () => {
  const { isOpen, setIsOpen } = useWalletModalStore();

  const { select, wallets, publicKey, disconnect, connecting, wallet } = useWallet();

  const filteredWallets = wallets.filter(
    (wallet) => wallet.adapter.name == SolflareWalletName || wallet.adapter.name == PhantomWalletName,
  );

  const onOpenChange = useCallback(
    (open: boolean) => {
      setIsOpen(open);
    },
    [setIsOpen],
  );

  const buttonRef = useRef<HTMLButtonElement>(null);

  const [popoverWidth, setPopoverWidth] = useState<number>();

  const handleDisconnect = async () => {
    await disconnect();
    setIsOpen(false);
  };

  useEffect(() => {
    if (buttonRef.current?.clientWidth) {
      setPopoverWidth(buttonRef.current.clientWidth);
    }
  }, [buttonRef.current?.clientWidth]);

  useEffect(() => {
    if (publicKey) {
      setIsOpen(false);
    }
  }, [publicKey]);

  if (publicKey) {
    return (
      <Popover>
        <PopoverTrigger ref={buttonRef} asChild>
          <Button
            ref={buttonRef}
            variant={'outline'}
            className="h-fit w-full bg-customYellow px-[24px] py-[15px] text-[22px] font-light leading-[26px] text-black"
          >
            {shortenAddress(publicKey.toBase58())}
          </Button>
        </PopoverTrigger>
        <PopoverContent style={{ width: popoverWidth }} className="border-0" asChild>
          <Button
            onClick={() => void handleDisconnect()}
            className="h-fit w-full bg-customRed px-[24px] py-[15px] text-[20px] font-light leading-[24px] text-white"
          >
            Disconnect
          </Button>
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button
          variant={'outline'}
          className="h-fit w-full bg-customYellow px-[24px] py-[15px] text-[22px] font-light leading-[26px] text-black"
          onClick={() => {
            setIsOpen(true);
          }}
        >
          Connect Wallet
        </Button>
      </DialogTrigger>
      <DialogContent>
        {!!wallet && connecting ? (
          <div className="flex flex-col items-center justify-center gap-[30px]">
            <img
              src={wallet.adapter.icon}
              alt={wallet.adapter.name}
              className="h-[84px] w-[84px]"
              height={84}
              width={84}
            />
            <div className="flex flex-col items-center justify-center gap-[15px] text-center text-[20px] leading-[30px]">
              <div>Awaiting Connect Confirmation</div>
              <SvgComponent />
            </div>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>
                <p>Connect Wallet</p>
              </DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-[20px]">
              {filteredWallets.map((wallet) => (
                <Button
                  key={wallet.adapter.name}
                  className="flex h-full w-full flex-col gap-[15px] bg-customYellow p-[15px] text-[18px] leading-[27px]"
                  onClick={() => {
                    const selectedWallet = filteredWallets.find((w) => w.adapter.name === wallet.adapter.name);

                    if (selectedWallet) {
                      if (selectedWallet.readyState != WalletReadyState.Installed) {
                        window.open(selectedWallet.adapter.url, '_blank');
                      }

                      select(selectedWallet.adapter.name);
                    }
                  }}
                >
                  <img
                    src={wallet.adapter.icon}
                    alt={wallet.adapter.name}
                    className="h-[60px] w-[60px]"
                    height={60}
                    width={60}
                  />
                  {wallet.adapter.name}
                </Button>
              ))}
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};
