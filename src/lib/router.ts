import { DefaultLayout } from '@/layouts/default-layout';
import { HomePage } from '@/pages/home-page';
import { createBrowserRouter } from 'react-router';

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
        Component: HomePage,
      },
      {
        path: routes.GAME,
        Component: HomePage,
      },
    ],
  },
]);
