import { Outlet } from 'react-router';

import { ModalManager } from '../modal-manager';

import { Footer } from '@/components/common/footer';

export function MainLayout() {
  return (
    <main className="w-full">
      <Outlet />

      <ModalManager />

      <Footer />
    </main>
  );
}
