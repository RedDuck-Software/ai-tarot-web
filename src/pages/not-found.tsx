import { Link } from 'react-router';

import { Button } from '@/components/ui/button';
import { routes } from '@/constants/router';

export default function NotFoundPage() {
  return (
    <div className="relative flex h-screen flex-col items-center gap-6 pb-[52px] pt-20 md:min-h-[865px] md:pb-[72px] md:pt-20">
      <h1 className="text-center font-bona-nova-sc text-[80px]">404</h1>
      <p className="px-8 text-center text-[20px]">The page you are looking for does not exist.</p>
      <Link to={routes.HOME}>
        <Button variant={'outline'} className="min-h-[60px] w-full text-[22px] font-light">
          Go Home
        </Button>
      </Link>

      <div className="absolute bottom-0 -z-[10] h-[335px] w-full bg-[url('/images/landing/clouds.png')] md:h-[370px]" />
    </div>
  );
}
