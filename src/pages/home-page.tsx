import { Link } from 'react-router';

import { Button } from '@/components/ui/button';
import { routes } from '@/lib/router';

export default function HomePage() {
  return (
    <div>
      <h1 className="mb-4 text-center text-2xl">Home page</h1>
      <div className="flex gap-4">
        <Link to={routes.GAME}>
          <Button>Go to app</Button>
        </Link>
        <a href="https://x.com/" target="_blank" rel="noreferrer">
          <Button>Twitter</Button>
        </a>
      </div>
    </div>
  );
}
