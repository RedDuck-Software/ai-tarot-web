import { shortenAddress } from '@/lib/utils';
import { WalletReadyState } from '@solana/wallet-adapter-base';
import { useWallet } from '@solana/wallet-adapter-react';

export const ConnectWalletButton = () => {
  const { select, wallets, publicKey, disconnect, connecting, wallet } = useWallet();

  if (publicKey) {
    return (
      <div className="text-white">
        <button className="h-fit w-full bg-black px-[26px] py-[15px] text-[20px] uppercase leading-[24px]">
          {shortenAddress(publicKey.toBase58())}
        </button>

        <button
          onClick={async () => {
            await disconnect();
          }}
          className="h-fit w-full bg-black px-[26px] py-[15px] text-[20px] uppercase leading-[24px]"
        >
          LOG OUT
        </button>
      </div>
    );
  }

  return (
    <>
      {!!wallet && connecting ? (
        <div className="flex flex-col items-center justify-center gap-[30px]">Connecting...</div>
      ) : (
        <>
          <div className="grid grid-cols-2 gap-[20px]">
            {wallets.map((wallet) => (
              <button
                key={wallet.adapter.name}
                className={`bg-customYellow flex h-full w-full flex-col gap-[15px] p-[15px] text-[18px] leading-[27px]`}
                onClick={() => {
                  const selectedWallet = wallets.find((w) => w.adapter.name === wallet.adapter.name);

                  if (selectedWallet) {
                    if (selectedWallet.readyState != WalletReadyState.Installed) {
                      window.open(selectedWallet.adapter.url, '_blank');
                    }

                    select(selectedWallet.adapter.name);
                  }
                }}
              ></button>
            ))}
          </div>
        </>
      )}
    </>
  );
};
