import { Outlet } from 'react-router';

export function DefaultLayout() {
  return (
    <main className="w-full">
      <Outlet />
    </main>
  );
}
