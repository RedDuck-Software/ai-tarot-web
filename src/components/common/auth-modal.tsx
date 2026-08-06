import { usePrivy } from '@privy-io/react-auth';
import { Wallet } from 'lucide-react';

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { usePrivyModalStore } from '@/store/privy-modal';

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export const AuthModal = ({ open, onOpenChange }: Props) => {
  const { login } = usePrivy();
  const { setLandingHeader } = usePrivyModalStore();

  const handleWallet = () => {
    setLandingHeader('Choose your wallet');
    onOpenChange(false);
    login({ loginMethods: ['wallet'] });
  };

  const handleEmail = () => {
    setLandingHeader('Log in or sign up');
    onOpenChange(false);
    login({ loginMethods: ['email'] });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm border border-black bg-[#D8BA9F] font-poppins text-black">
        <DialogHeader>
          <DialogTitle className="text-[20px] font-light">Get started</DialogTitle>
          <DialogDescription className="sr-only">Choose how you want to sign in</DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-3 pt-1">
          <button
            onClick={handleWallet}
            className="flex items-center gap-4 rounded-lg border border-black/20 bg-customYellow px-4 py-4 text-left transition-opacity hover:opacity-80"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-black/10">
              <Wallet size={20} />
            </div>
            <div>
              <p className="text-[16px] font-medium leading-snug">Connect a wallet</p>
              <p className="text-[13px] text-black/60">Phantom, Solflare</p>
            </div>
          </button>

          <button
            onClick={handleEmail}
            className="flex items-center gap-4 rounded-lg border border-black/20 bg-[#E8D5AF] px-4 py-4 text-left transition-opacity hover:opacity-80"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-black/10">
              <span className="text-[18px]">✦</span>
            </div>
            <div>
              <p className="text-[16px] font-medium leading-snug">{"Don't have one? Create now"}</p>
              <p className="text-[13px] text-black/60">Sign up with email</p>
            </div>
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
