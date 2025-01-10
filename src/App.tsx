import { Suspense } from 'react';
import { ToastContainer } from 'react-toastify';

import { Loader } from '@/components/common/Loader';
import { QueryProvider } from '@/providers/query-provider';
import { RouterProvider } from '@/providers/router-provider';
import { SolanaProvider } from '@/providers/solana-provider';

import '@fontsource/bona-nova-sc/400.css';
import '@fontsource/bona-nova-sc/700.css';
import '@fontsource/poppins/400.css';

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
