import { Link } from 'react-router';

import { Button } from '@/components/ui/button';
import { env } from '@/env';
import { routes } from '@/lib/router';

export const Hero = () => {
  return (
    <div className="relative flex min-h-[812px] flex-col items-center justify-between pb-[52px] pt-20 md:min-h-[988px] md:pb-[72px] md:pt-24">
      <h1 className="font-bonaNova text-center text-[40px] md:text-[60px]">TarotSol AI</h1>
      <div className="flex flex-col gap-6 md:flex-row md:gap-10">
        <a href={env.VITE_TWITTER_URL} target="_blank" rel="noreferrer">
          <Button variant={'outline'} className="min-h-[60px] w-full text-[22px] font-light">
            Go to Twitter
          </Button>
        </a>
        <Link to={routes.GAME}>
          <Button
            variant={'outline'}
            className="min-h-[60px] w-full bg-[url('/images/textures/green.png')] bg-repeat text-[22px]"
          >
            Predict Future
          </Button>
        </Link>
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
