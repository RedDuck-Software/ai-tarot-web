import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { ReactNode } from 'react';

import { cn } from '@/lib/utils';

const inputVariants = cva(
  'w-full bg-transparent py-2 md:py-3 pl-3 md:pl-4 pr-1 text-xs font-[600] leading-[30px] text-[#FFFFFF] sm:text-[20px] focus:outline-none',
  {
    variants: {
      variant: {
        default: '',
      },
      sizes: {
        default: '',
        large: '',
      },
    },
    defaultVariants: {
      sizes: 'default',
      variant: 'default',
    },
  },
);

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement>, VariantProps<typeof inputVariants> {
  asChild?: boolean;
  error?: ReactNode;
  label?: ReactNode;
  endAdornment?: ReactNode;
  startAdornment?: ReactNode;
  wrapperClassName?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      wrapperClassName,
      endAdornment,
      startAdornment,
      error,
      className,
      variant,
      sizes,
      asChild = false,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : 'input';

    if (props.type === 'checkbox') {
      return (
        <div className="flex flex-col">
          <div className="flex flex-row items-center gap-2">
            <Comp ref={ref} className={cn(className)} id={props.name} {...props} />
            <label htmlFor={props.name}>{label}</label>
          </div>
          <div className="text-red-400">{error}</div>
        </div>
      );
    }

    return (
      <div className="flex flex-col gap-2">
        {label}
        <div
          className={cn(
            'grid grid-cols-[auto_1fr_auto] items-center rounded-[16px] bg-[#FFFFFF1A] pr-2 text-white md:pr-3',
            wrapperClassName,
            error ? 'border-red border' : '',
          )}
        >
          {startAdornment ?? <div />}
          <Comp
            className={cn(
              inputVariants({ variant, className, sizes }),
              props.disabled ? 'cursor-not-allowed text-white/50' : 'cursor-pointer placeholder:text-white',
            )}
            ref={ref}
            {...props}
          />
          {endAdornment ?? <div />}
        </div>
        {error && <div className="text-red text-[15px]">{error}</div>}
      </div>
    );
  },
);

Input.displayName = 'Input';

export { Input };
