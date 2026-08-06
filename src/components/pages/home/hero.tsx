import { useWallet } from '@solana/wallet-adapter-react';

import { AdminBtn } from '@/components/common/buttons/admin';
import { PredictFutureBtn } from '@/components/common/buttons/predict-future';
import { OwnerAddress } from '@/constants/addresses';
import { network } from '@/constants/solana';

const getCompletedReadingsToday = () => {
  const today = new Date();
  const todayKey = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`;
  const seed = todayKey.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);

  return 200 + (seed % 101);
};

export const Hero = () => {
  const { publicKey } = useWallet();
  const completedReadingsToday = getCompletedReadingsToday();

  return (
    <div className="relative flex min-h-[900px] flex-col items-center px-6 pb-[52px] pt-20 md:min-h-[990px] md:pb-[72px] md:pt-24">
      <div className="flex max-w-[860px] flex-col items-center gap-4 text-center">
        <h1 className="font-bona-nova-sc text-[40px] leading-[48px] md:text-[60px] md:leading-[72px]">
          Get a Tarot Reading Powered by AI
        </h1>
        <div className="rounded-md border border-customBlack bg-[#D0C7A3]/90 px-4 py-2 font-poppins text-[18px] leading-[27px]">
          {completedReadingsToday} readings completed today
        </div>
      </div>

      <div className="absolute bottom-[52px] flex w-full max-w-[720px] flex-col items-center gap-8 px-6 text-center md:bottom-[72px] md:gap-10">
        <p className="font-poppins text-[20px] leading-[30px] md:text-[28px] md:leading-[40px]">
          Ask any question about love, money, or work
          <br />
          Get a personal answer in seconds
        </p>

        <div className="flex flex-col gap-6 md:flex-row md:gap-10">
          <PredictFutureBtn />

          {publicKey?.equals(OwnerAddress[network]) && <AdminBtn />}
        </div>
      </div>

      <img
        src="/images/landing/hero-bg.webp"
        alt="bg"
        className="absolute left-1/2 top-0 -z-[20] h-full w-full -translate-x-1/2 object-cover object-center xl:object-contain"
      />

      <div className="absolute top-[477px] -z-[10] h-[335px] w-full bg-[url('/images/landing/clouds.png')] md:top-[495px] md:h-[370px]" />
      <div className="absolute bottom-0 top-[812px] -z-[10] w-full bg-[rgb(234,220,185)] md:top-[865px]" />
    </div>
  );
};
