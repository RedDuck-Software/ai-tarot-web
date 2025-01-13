import { ReactNode, useState } from 'react';

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

interface BaseTooltipProps {
  content: ReactNode;
  children: ReactNode;
  className?: string;
  contentClassName?: string;
  as?: 'div' | 'span';
  ignoreOnKeyDown?: boolean;
  forceOpen?: boolean;
}

export const BaseTooltip = ({
  children,
  content,
  className,
  contentClassName,
  as,
  ignoreOnKeyDown,
  forceOpen,
}: BaseTooltipProps) => {
  const [open, setOpen] = useState(false);

  const Slot = as ?? 'div';

  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip open={forceOpen ?? open}>
        <TooltipTrigger asChild>
          <Slot
            tabIndex={0}
            className={cn(className)}
            onClick={() => {
              setOpen(!open);
            }}
            onMouseEnter={() => {
              setOpen(true);
            }}
            onMouseLeave={() => {
              setOpen(false);
            }}
            onTouchStart={() => {
              setOpen(!open);
            }}
            onKeyDown={(e) => {
              if (ignoreOnKeyDown) {
                return;
              }

              e.preventDefault();
              e.key === 'Enter' && setOpen(!open);
            }}
          >
            {children}
          </Slot>
        </TooltipTrigger>
        <TooltipContent className={cn(contentClassName, !content ? 'hidden' : '')}>
          <span className="inline-block">{content}</span>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
