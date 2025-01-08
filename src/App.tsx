import { ToastContainer } from 'react-toastify';

import { QueryProvider } from '@/providers/query-provider';
import { RouterProvider } from '@/providers/router-provider';
import { SolanaProvider } from '@/providers/solana-provider';

function App() {
  return (
    <SolanaProvider>
      <QueryProvider>
        <RouterProvider />
        <ToastContainer position="bottom-left" />
      </QueryProvider>
    </SolanaProvider>
  );
}

export default App;
