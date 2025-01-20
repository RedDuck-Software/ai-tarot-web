import { Button } from '@/components/ui/button';
import { useStatusModalStore } from '@/store/status-modal';

export const InsufficientFundsModal = () => {
  const { setStatus } = useStatusModalStore();

  return (
    <div className="flex w-[75vw] flex-col items-center justify-center gap-[15px] text-center text-[20px] leading-[30px] md:w-[484px]">
      <img src="/icons/modals/funds.svg" alt="failed" className="h-[116px] w-[181px] md:h-[167px] md:w-[261px]" />

      <p className="text-[22px] leading-[30px] md:text-[28px] md:leading-[39px]">Insufficient Funds</p>
      <p className="text-[16px] leading-[22px] md:text-[18px] md:leading-[25px]">
        Unfortunately, you don’t have enough funds to complete the payment. Please top up your wallet or choose another
        payment method.
      </p>

      <Button
        onClick={() => {
          setStatus(null);
        }}
        variant="secondary"
        size="lg"
        className="!h-[60px] w-full text-[22px] leading-[30px]"
      >
        Close
      </Button>
    </div>
  );
};
