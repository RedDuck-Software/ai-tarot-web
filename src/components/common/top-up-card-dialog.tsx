import { usePrivy } from '@privy-io/react-auth';
import { useFundWallet } from '@privy-io/react-auth/solana';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { usePrivyWallet } from '@/hooks/privy/use-privy-wallet';
import { shortenAddress } from '@/lib/utils';

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export const TopUpCardDialog = ({ open, onOpenChange }: Props) => {
  const { login } = usePrivy();
  const { ready, primaryWallet } = usePrivyWallet();
  const { fundWallet } = useFundWallet();
  const [loading, setLoading] = useState(false);

  const handleFund = async () => {
    if (!primaryWallet) return;
    setLoading(true);
    try {
      await fundWallet({
        address: primaryWallet.address,
        options: { defaultFundingMethod: 'card', card: { preferredProvider: 'moonpay' } },
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm border border-black bg-[#D8BA9F] font-poppins text-black">
        <DialogHeader>
          <DialogTitle className="text-[20px] font-light">Top up with card</DialogTitle>
          <DialogDescription className="sr-only">
            Purchase crypto with a debit or credit card via MoonPay
          </DialogDescription>
        </DialogHeader>

        {!ready ? (
          <p className="text-[15px] text-black/50">Loading…</p>
        ) : !primaryWallet ? (
          <div className="flex flex-col gap-4">
            <p className="text-[15px] text-black/70">Connect your wallet first to top up with a card.</p>
            <Button
              onClick={() => {
                login();
                onOpenChange(false);
              }}
              className="bg-customYellow text-[18px] font-light text-black hover:bg-customYellow hover:opacity-80"
            >
              Connect Wallet
            </Button>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <div className="rounded-md bg-[#E8D5AF] p-3 text-[14px]">
              <span className="text-black/50">Topping up: </span>
              <span className="font-mono">{shortenAddress(primaryWallet.address, 6, 6)}</span>
            </div>
            <p className="text-[13px] text-black/60">
              Purchase SOL, USDC, or USDT with a debit or credit card via MoonPay. Funds arrive in your wallet within
              seconds.
            </p>
            <Button
              onClick={() => void handleFund()}
              disabled={loading}
              className="bg-customYellow text-[18px] font-light text-black hover:bg-customYellow hover:opacity-80 disabled:opacity-50"
            >
              {loading ? 'Opening…' : 'Buy with card'}
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
