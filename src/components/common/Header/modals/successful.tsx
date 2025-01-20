import { Button } from '@/components/ui/button';
import { useStatusModalStore } from '@/store/status-modal';

export const SuccessfulModal = () => {
  const { setStatus } = useStatusModalStore();

  return (
    <div className="flex w-[75vw] flex-col items-center justify-center gap-[15px] text-center text-[20px] leading-[30px] md:w-[480px]">
      <img src="/icons/modals/successful.svg" alt="success" className="h-[120px] w-[93px] md:h-[180px] md:w-[140px]" />

      <p className="text-[22px] leading-[30px] md:text-[28px] md:leading-[39px]">Payment Successful</p>

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
