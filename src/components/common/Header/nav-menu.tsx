import { ConnectWalletButton } from './connect-wallet-button';

import { env } from '@/env';
import { cn } from '@/lib/utils';
import { BaseComponentProps } from '@/types';

export const NavMenu = ({ className }: BaseComponentProps) => {
  return (
    <nav className={cn('flex items-center gap-5', className)}>
      <a
        href={env.VITE_TWITTER_URL}
        target="_blank"
        className="order-last flex h-[56px] min-w-[56px] max-w-[56px] cursor-pointer items-center justify-center rounded-md border border-customBlack bg-customYellow md:order-none"
        rel="noreferrer"
      >
        <img src="/icons/socials/twitter.svg" alt="twitter" />
      </a>
      <ConnectWalletButton />
    </nav>
  );
};
