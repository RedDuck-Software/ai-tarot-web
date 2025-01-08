import { RouterProvider as RRouterProvider } from 'react-router';

import { router } from '@/lib/router';

export function RouterProvider() {
  return <RRouterProvider router={router} />;
}
