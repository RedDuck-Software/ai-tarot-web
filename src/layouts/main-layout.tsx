import { Outlet } from 'react-router';

import { Footer } from '@/components/common/Footer';

export function MainLayout() {
  return (
    <main className="w-full">
      <Outlet />
      <Footer />
    </main>
  );
}
