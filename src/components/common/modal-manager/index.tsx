import { BaseErrorModal } from '../header/modals/base-error';
import { CanceledModal } from '../header/modals/cancelled';
import { InsufficientFundsModal } from '../header/modals/insufficient-funds';
import { SuccessfulModal } from '../header/modals/successful';

import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Status, useStatusModalStore } from '@/store/status-modal';

export const ModalManager = () => {
  const { status, setStatus } = useStatusModalStore();

  return (
    <Dialog
      open={!!status}
      onOpenChange={() => {
        setStatus(null);
      }}
    >
      <DialogContent
        className="w-fit rounded-lg border-0 bg-[#D8BA9F] !p-[20] max-sm:w-fit md:!p-[40px]"
        hideX={!!status}
      >
        <DialogTitle className="hidden" />

        {status === Status.Success && <SuccessfulModal />}
        {status === Status.Failed && <BaseErrorModal />}
        {status === Status.InsufficientFunds && <InsufficientFundsModal />}
        {status === Status.Canceled && <CanceledModal />}
      </DialogContent>
    </Dialog>
  );
};
