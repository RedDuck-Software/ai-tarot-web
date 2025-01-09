import { Suspense } from 'react';
import { ToastContainer } from 'react-toastify';

import { Loader } from '@/components/common/Loader';
import { QueryProvider } from '@/providers/query-provider';
import { RouterProvider } from '@/providers/router-provider';
import { SolanaProvider } from '@/providers/solana-provider';

function App() {
  return (
    <SolanaProvider>
      <QueryProvider>
        <Suspense fallback={<Loader />}>
          <RouterProvider />
          <ToastContainer position="bottom-left" />
        </Suspense>
      </QueryProvider>
    </SolanaProvider>
  );
}

export default App;
