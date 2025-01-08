import { Outlet } from 'react-router';

export function DefaultLayout() {
  return (
    <main>
      <Outlet />
    </main>
  );
}
