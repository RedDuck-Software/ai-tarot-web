import { QueryProvider } from '@/providers/query-provider';
import { RouterProvider } from '@/providers/router-provider';
import { SolanaProvider } from '@/providers/solana-provider';

function App() {
  return (
    <SolanaProvider>
      <QueryProvider>
        <RouterProvider />
      </QueryProvider>
    </SolanaProvider>
  );
}

export default App;
