import { RouterProvider as RRouterProvider } from 'react-router';

import { router } from '@/constants/router';

export function RouterProvider() {
  return <RRouterProvider router={router} />;
}
