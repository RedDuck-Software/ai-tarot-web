import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router';

import { NavMenu } from './nav-menu';

import { Button } from '@/components/ui/button';
import { routes } from '@/constants/router';
import { useBreakpoint } from '@/hooks/use-breakpoint';
import { cn } from '@/lib/utils';

export const Header = () => {
  const isMd = useBreakpoint('md');
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const handleModalOpen = () => {
    document.body.classList.toggle('overflow-y-hidden');
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <header className="max-h-[69px] border-b border-customBlack bg-[url('/images/textures/sand.webp')] py-[10px] md:max-h-fit md:py-[20px]">
      <div className="mx-auto flex w-full max-w-[1688px] items-center justify-between bg-repeat px-6">
        <Link
          to={routes.HOME}
          onClick={() => {
            if (isMenuOpen) {
              handleModalOpen();
            }
          }}
        >
          <span className="text-[25px] leading-[30px] md:text-[35px] md:leading-[42px]">Tarotsol AI</span>
        </Link>
        <NavMenu className="hidden md:flex" />
        <Button
          className="flex h-[48px] w-[48px] items-center justify-center p-0 text-black md:hidden"
          onClick={handleModalOpen}
        >
          {isMenuOpen ? (
            <X size={24} className="min-h-[24px] min-w-[24px]" />
          ) : (
            <Menu size={24} className="min-h-[24px] min-w-[24px]" />
          )}
        </Button>
      </div>

      {!isMd && (
        <div
          className={cn(
            "fixed inset-0 top-[69px] flex flex-col items-center bg-[url('/images/textures/sand.png')] bg-repeat p-6 pb-0 transition-transform duration-300",
            isMenuOpen ? 'translate-x-0' : 'translate-x-full',
          )}
        >
          <NavMenu className="flex h-full max-w-[327px] flex-col justify-center pb-[80px]" />
        </div>
      )}
    </header>
  );
};
