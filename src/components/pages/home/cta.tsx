import { PredictFutureBtn } from '@/components/common/PredictFutureBtn';
import { useBreakpoint } from '@/hooks/use-breakpoint';
import { cn } from '@/lib/utils';
import { BaseComponentProps } from '@/types';

export const CtaBlock = () => {
  const isMd = useBreakpoint('md');

  return (
    <div className="relative flex min-h-[600px] flex-col items-center gap-10 bg-[url('/images/textures/light-yellow.png')] bg-repeat px-6 pb-10 pt-[100px] md:px-10 md:pb-[120px] md:pt-[170px]">
      <div className="flex items-center gap-7 md:hidden">
        <Dot className="w-[16px]" />
        <Star className="-translate-y-10" />
        <Dot className="w-[16px]" />
      </div>
      <p className="max-w-none gap-5 text-center text-[30px] md:max-w-[1200px] md:gap-[50px] md:text-[47px]">
        Unlock the wisdom of Tarot with our innovative AI-powered platform. Our unique approach combines ancient
        numerology and Tarot cards with cutting-edge AI and blockchain technologies to provide you with insightful
        readings tailored to your questions
      </p>
      <div className="flex items-center gap-8 md:hidden">
        <Hand className="max-w-[100px]" />
        <Dot className="translate-y-4" />
        <Hand className="max-w-[100px] scale-x-[-1]" />
      </div>
      <div className="w-full md:max-w-max">
        <PredictFutureBtn />
      </div>
      <Sunburst className="block md:hidden" />
      {isMd && (
        <>
          <Hand className="absolute left-[5%] top-[36%] hidden xl:block 2xl:left-[7%]" />
          <Hand className="absolute right-[7%] top-[42%] hidden scale-x-[-1] xl:block" />
          <Dot className="absolute left-[2%] top-1/2 2xl:left-[4%]" />
          <Dot className="absolute right-[22%] top-[15%]" />
          <Star className="absolute left-[15%] top-[15%]" />
          <Star className="absolute bottom-[15%] right-[8%]" />
          <Sunburst className="absolute bottom-[13%] left-[25%]" />
          <Sunburst className="absolute right-[8%] top-[30px] max-w-[51px] lg:top-[13%]" />
        </>
      )}
    </div>
  );
};

const Star = ({ className }: BaseComponentProps) => (
  <img src="/icons/star.svg" alt="star" className={cn('pointer-events-none', className)} />
);

const Dot = ({ className }: BaseComponentProps) => (
  <img src="/icons/dot.svg" alt="dot" className={cn('pointer-events-none', className)} />
);

const Hand = ({ className }: BaseComponentProps) => (
  <img src="/images/hand.png" alt="hand" className={cn('pointer-events-none', className)} />
);

const Sunburst = ({ className }: BaseComponentProps) => (
  <img src="/icons/sunburst.svg" alt="sunburst" className={cn('pointer-events-none', className)} />
);
