import { Button } from '@/components/ui/button';
import { env } from '@/env';

export const GoToTwitterBtn = () => {
  return (
    <a href={env.VITE_TWITTER_URL} target="_blank" rel="noreferrer">
      <Button variant={'outline'} className="min-h-[60px] w-full text-[22px] font-light">
        Go to Twitter
      </Button>
    </a>
  );
};
