import { RouterProvider } from '@/providers/router-provider';
import { SolanaProvider } from '@/providers/solana-provider';

function App() {
  return (
    <SolanaProvider>
      <RouterProvider />
    </SolanaProvider>
  );
}

export default App;
