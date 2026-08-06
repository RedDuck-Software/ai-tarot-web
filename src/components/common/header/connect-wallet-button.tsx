import { usePrivy } from '@privy-io/react-auth';
import { Copy } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';

import { AuthModal } from '@/components/common/auth-modal';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { usdcMint, usdtMint, wSolMint } from '@/constants/addresses';
import { usePrivyWallet, TokenBalance } from '@/hooks/privy/use-privy-wallet';
import { shortenAddress } from '@/lib/utils';
import { useWalletModalStore } from '@/store/wallet-modal';

const CURRENCY_LABELS: Record<string, string> = {
  [wSolMint.toString()]: 'SOL',
  [usdcMint.toString()]: 'USDC',
  [usdtMint.toString()]: 'USDT',
};

const CURRENCY_ICONS: Record<string, string> = {
  [wSolMint.toString()]: '/icons/currencies/wSolMint.svg',
  [usdcMint.toString()]: '/icons/currencies/usdcMint.svg',
  [usdtMint.toString()]: '/icons/currencies/usdtMint.svg',
};

const formatBalance = (b: TokenBalance) => {
  const val = Number(b.amount) / Math.pow(10, b.decimals);
  return val < 0.001 ? '0' : val.toFixed(3);
};

const getCurrencyLabel = (mint: string) => CURRENCY_LABELS[mint] ?? `${mint.slice(0, 4)}...`;

type StandardWallet = {
  features?: {
    'standard:disconnect'?: { disconnect: () => Promise<void> };
  };
};

export const ConnectWalletButton = () => {
  const { setIsOpen } = useWalletModalStore();
  const { logout } = usePrivy();
  const { ready, isIncompatibleLogin, primaryWallet, privyWallet, externalWallets, balances, externalBalances } =
    usePrivyWallet();

  const buttonRef = useRef<HTMLButtonElement>(null);
  const [popoverWidth, setPopoverWidth] = useState<number>();
  const [disconnecting, setDisconnecting] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);

  useEffect(() => {
    if (buttonRef.current?.clientWidth) setPopoverWidth(buttonRef.current.clientWidth);
  }, [buttonRef.current?.clientWidth]);

  useEffect(() => {
    if (primaryWallet) setIsOpen(false);
  }, [primaryWallet, setIsOpen]);

  useEffect(() => {
    if (!isIncompatibleLogin) return;
    toast.error(
      'MetaMask is an Ethereum wallet and cannot be used with this Solana app. Please use Phantom, Solflare, or sign in with email.',
      { autoClose: 6000 },
    );
    void logout();
  }, [isIncompatibleLogin, logout]);

  const primaryAddress = primaryWallet?.address;
  const isEmbedded = primaryWallet === privyWallet;

  const primaryBalances = isEmbedded ? balances : externalBalances;
  const walletLabel = isEmbedded
    ? '✦ My Wallet'
    : primaryWallet
      ? ((primaryWallet.standardWallet as unknown as { name?: string }).name ?? 'Wallet')
      : 'Wallet';

  const popW = Math.max(popoverWidth ?? 0, 260);

  if (!ready) {
    return (
      <Button
        variant="outline"
        disabled
        className="h-fit w-full bg-customYellow px-[24px] py-[15px] text-[22px] font-light leading-[26px] text-black opacity-60"
      >
        Connect Wallet
      </Button>
    );
  }

  if (!primaryAddress) {
    return (
      <>
        <Button
          variant="outline"
          className="h-fit w-full bg-customYellow px-[24px] py-[15px] text-[22px] font-light leading-[26px] text-black"
          onClick={() => {
            setAuthOpen(true);
          }}
        >
          Connect Wallet
        </Button>
        <AuthModal open={authOpen} onOpenChange={setAuthOpen} />
      </>
    );
  }

  const handleDisconnect = async () => {
    if (disconnecting) return;
    setDisconnecting(true);

    const uniqueStdWallets = [...new Set(externalWallets.map((w) => w.standardWallet as StandardWallet))];

    try {
      await logout();
    } catch (_) {
      void _;
    }

    for (const stdWallet of uniqueStdWallets) {
      if (stdWallet.features?.['standard:disconnect']) {
        try {
          await stdWallet.features['standard:disconnect'].disconnect();
        } catch (_) {
          void _;
        }
      }
    }

    setDisconnecting(false);
  };

  const nonZeroBalances = primaryBalances?.filter((b) => Number(b.amount) > 0);

  return (
    <Popover>
      <PopoverTrigger ref={buttonRef} asChild>
        <Button
          variant="outline"
          className="h-fit w-full bg-customYellow px-[24px] py-[15px] font-poppins text-[22px] font-light leading-[26px] text-black"
        >
          {shortenAddress(primaryAddress)}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        style={{ width: popW }}
        className="flex flex-col gap-3 rounded-lg border border-black bg-[#D8BA9F] p-4"
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="font-poppins text-[11px] font-semibold uppercase tracking-widest text-black/40">
              {walletLabel}
            </p>
            <span className="font-mono text-[15px] font-medium tracking-tight">
              {shortenAddress(primaryAddress, 5, 5)}
            </span>
          </div>
          <button
            onClick={() => navigator.clipboard.writeText(primaryAddress).then(() => toast.success('Address copied'))}
            className="opacity-40 transition-opacity hover:opacity-100"
          >
            <Copy size={14} />
          </button>
        </div>

        <div className="rounded-md bg-[#E8D5AF] px-3 py-2">
          {nonZeroBalances?.length ? (
            nonZeroBalances.map((b) => (
              <div key={b.mint} className="flex items-center justify-between py-1">
                <div className="flex items-center gap-2">
                  {CURRENCY_ICONS[b.mint] && (
                    <img src={CURRENCY_ICONS[b.mint]} alt={getCurrencyLabel(b.mint)} className="h-[22px] w-[22px]" />
                  )}
                  <span className="font-poppins text-[14px] font-medium">{getCurrencyLabel(b.mint)}</span>
                </div>
                <span className="font-poppins text-[14px]">{formatBalance(b)}</span>
              </div>
            ))
          ) : (
            <p className="text-center text-[13px] italic text-black/50">No funds — top up with card</p>
          )}
        </div>

        <Button
          onClick={() => void handleDisconnect()}
          disabled={disconnecting}
          className="h-fit w-full bg-customRed py-[10px] text-[18px] font-light text-white hover:bg-customRed hover:opacity-80 disabled:opacity-50"
        >
          {disconnecting ? 'Disconnecting...' : 'Disconnect'}
        </Button>
      </PopoverContent>
    </Popover>
  );
};
