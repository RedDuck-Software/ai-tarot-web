import { lazy } from 'react';
import { createBrowserRouter } from 'react-router';

import { DefaultLayout } from '@/components/common/layouts/default-layout';
import { MainLayout } from '@/components/common/layouts/main-layout';

export const routes = {
  HOME: '/',
  GAME: '/game',
  ADMIN: '/admin',
} as const;

export const router = createBrowserRouter([
  {
    Component: MainLayout,
    children: [
      {
        path: routes.HOME,
        Component: lazy(() => import('@/pages/home-page')),
      },
      {
        path: routes.GAME,
        Component: lazy(() => import('@/pages/game-page')),
      },
      {
        path: routes.ADMIN,
        Component: lazy(() => import('@/pages/admin-page')),
      },
    ],
  },
  {
    Component: DefaultLayout,
    children: [
      {
        path: '*',
        Component: lazy(() => import('@/pages/not-found')),
      },
    ],
  },
]);
