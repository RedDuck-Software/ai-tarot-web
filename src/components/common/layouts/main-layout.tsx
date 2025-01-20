import { Outlet } from 'react-router';

import { Footer } from '@/components/common/footer';

export function MainLayout() {
  return (
    <main className="w-full">
      <Outlet />
      <Footer />
    </main>
  );
}
