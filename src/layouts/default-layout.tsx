import { Outlet } from 'react-router';

import { Footer } from '@/components/common/Footer';

export function DefaultLayout() {
  return (
    <main className="w-full">
      <Outlet />
      <Footer />
    </main>
  );
}
