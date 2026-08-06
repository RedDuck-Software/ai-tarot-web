import { Button } from '@/components/ui/button';
import { useStatusModalStore } from '@/store/status-modal';

export const CanceledModal = () => {
  const { setStatus } = useStatusModalStore();

  return (
    <div className="flex w-[75vw] flex-col items-center justify-center gap-[15px] text-center text-[20px] leading-[30px] md:w-[480px]">
      <img src="/icons/modals/scissors.svg" alt="failed" className="h-[116px] w-[107px] md:h-[173px] md:w-[159px]" />

      <p className="text-[22px] leading-[30px] md:text-[28px] md:leading-[39px]">Transaction Cancelled</p>
      <p className="text-[16px] leading-[22px] md:text-[18px] md:leading-[25px]">
        Your transaction has been cancelled. To receive a response from the Oracle, please complete the transaction.
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
