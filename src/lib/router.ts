import { lazy } from 'react';
import { createBrowserRouter } from 'react-router';

import { DefaultLayout } from '@/layouts/default-layout';

export const routes = {
  HOME: '/',
  GAME: '/game',
} as const;

export const router = createBrowserRouter([
  {
    Component: DefaultLayout,
    children: [
      {
        path: routes.HOME,
        Component: lazy(() => import('@/pages/home-page')),
      },
      {
        path: routes.GAME,
        Component: lazy(() => import('@/pages/game-page')),
      },
    ],
  },
]);
