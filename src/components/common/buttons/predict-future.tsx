import { Link } from 'react-router';

import { Button } from '@/components/ui/button';
import { routes } from '@/constants/router';

export const PredictFutureBtn = () => {
  return (
    <Link to={routes.GAME}>
      <Button
        variant={'outline'}
        className="min-h-[60px] w-full bg-[url('/images/textures/green.png')] bg-repeat text-[22px] transition-all ease-in-out hover:opacity-80"
      >
        Predict Future
      </Button>
    </Link>
  );
};
