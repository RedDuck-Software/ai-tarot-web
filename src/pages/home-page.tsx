import { ConnectWalletButton } from '@/components/common/Header/connect-wallet-button';
import useTransferSolana from '@/hooks/contracts/write/use-transfer-solana';

export function HomePage() {
  const { mutateAsync: transfer } = useTransferSolana();

  const handleTransfer = async () => {
    await transfer();
  };
  return (
    <div>
      <h1>Home page</h1>
      <ConnectWalletButton />
      <button onClick={() => void handleTransfer()}>handleTransfer</button>
    </div>
  );
}
