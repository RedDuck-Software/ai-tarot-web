import { router } from '@/lib/router';
import { RouterProvider as RRouterProvider } from 'react-router';

export function RouterProvider() {
  return <RRouterProvider router={router} />;
}
