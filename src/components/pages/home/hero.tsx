import { GoToTwitterBtn } from '@/components/common/GoToTwitterBtn';
import { PredictFutureBtn } from '@/components/common/PredictFutureBtn';

export const Hero = () => {
  return (
    <div className="relative flex min-h-[812px] flex-col items-center justify-between pb-[52px] pt-20 md:min-h-[865px] md:pb-[72px] md:pt-20">
      <h1 className="text-center font-bona-nova-sc text-[40px] md:text-[60px]">TarotSol AI</h1>
      <div className="flex flex-col gap-6 md:flex-row md:gap-10">
        <GoToTwitterBtn />
        <PredictFutureBtn />
      </div>
      <img
        src="/images/landing/hero-bg.png"
        alt="bg"
        className="absolute left-1/2 top-0 -z-[20] h-full w-full -translate-x-1/2 object-cover object-center xl:object-contain"
      />
      <div className="absolute bottom-0 -z-[10] h-[335px] w-full bg-[url('/images/landing/clouds.png')] md:h-[370px]" />
    </div>
  );
};
