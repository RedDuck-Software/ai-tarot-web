import { zodResolver } from '@hookform/resolvers/zod';
import { useWallet } from '@solana/wallet-adapter-react';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { z } from 'zod';

import Solana from '@/components/common/Svg/Solana.tsx';
import useMakePrediction from '@/hooks/contracts/write/use-make-prediction';
import useSendSol from '@/hooks/contracts/write/use-send-sol';
import { cn } from '@/lib/utils';
import { useWalletModalStore } from '@/store/wallet-modal.tsx';

const TarotRequestSchema = z.object({
  question: z
    .string()
    .min(3, 'Min 3 symbols')
    .max(1000, 'Max 1000 symbols')
    .regex(/^[a-zA-Z0-9.,!? ]+$/, 'Only English letters and numbers are allowed')
    .refine((value) => value.trim() !== '', { message: 'String cannot consist of only spaces' }),
});

type TarotRequestSchemaType = z.infer<typeof TarotRequestSchema>;

export const GameSection = () => {
  const { publicKey } = useWallet();
  const { setIsOpen } = useWalletModalStore();
  const { mutateAsync: transfer, isSuccess, isPending, data: predictionAnswer } = useMakePrediction();
  const { mutateAsync: transferSol, isPending: isSolPending } = useSendSol();

  const [selectedTip, setSelectedTip] = useState<number>(0);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<TarotRequestSchemaType>({
    resolver: zodResolver(TarotRequestSchema),
  });

  const onSubmit: SubmitHandler<TarotRequestSchemaType> = async (data, e) => {
    e?.preventDefault();
    console.log('SubmitHandler data', data);
    await transfer(watch('question').trim());
  };

  const handleTip = async () => {
    if (!publicKey) {
      toast.error('Connect wallet first');
      return;
    }

    if (!selectedTip) {
      toast.error('Select tip first');
      return;
    }

    await transferSol(selectedTip);
  };

  useEffect(() => {
    if (predictionAnswer) {
      setValue('question', predictionAnswer.answer);
    }
  }, [isSuccess, predictionAnswer, setValue, watch]);

  return (
    <div className="container flex flex-col gap-[20px] py-[20px] font-inknut">
      <div className="text-center font-bona-nova-sc text-[50px]">Your Future In One Bet</div>

      <div className="relative -z-50">
        {predictionAnswer && (
          <div className="absolute flex h-full w-full flex-row justify-evenly py-4">
            {predictionAnswer.tarots.map((e) => {
              return <img key={e.id} className="rounded-[8px]" src={`images/cards/${e.id}.jpg`} alt="card" />;
            })}
          </div>
        )}
        <img src="images/tarot-game/bord.png" alt="bord" className="relative -z-50" />
      </div>

      <div className="flex flex-row items-center justify-between">
        <div className="text-[24px]">Type your question and ask the cards</div>
        <button className="rounded-[8px] border border-[#3A3939] bg-[#E8D5AF] px-[20px] py-[13px] text-[22px]">
          Suggest question
        </button>
      </div>

      <div className="grid">
        <div className="text-red-700"> {errors.question?.message ? errors.question.message : '⠀'} </div>
        <textarea
          {...register('question')}
          className="rounded-[8px] border border-[#3A3939] bg-transparent p-4 placeholder-[#3A3939] outline-none"
          placeholder="Type your question here"
          disabled={isPending}
          rows={7}
        />
      </div>

      <div className="grid grid-cols-2 gap-10">
        <div className="flex flex-row items-center gap-4 rounded-[8px] border border-[#3A3939] bg-[#D0C7A3] p-[14px] text-[20px]">
          <Solana />
          <div className="font-poppins">0.002 SOL</div>
        </div>

        {publicKey ? (
          <button
            onClick={handleSubmit(onSubmit)}
            disabled={isPending}
            className="rounded-[8px] border border-[#3A3939] bg-[#9DA990] text-[22px] text-black disabled:text-[#4F5548]"
          >
            Make a Forecast
          </button>
        ) : (
          <button
            onClick={() => {
              setIsOpen(true);
            }}
            className="rounded-[8px] border border-[#3A3939] bg-[#9DA990] text-[22px] text-black disabled:text-[#4F5548]"
          >
            Connect Wallet
          </button>
        )}
      </div>

      <div className="grid grid-rows-[auto_auto] gap-5 lg:grid-cols-2 lg:gap-10">
        <div className="grid grid-cols-2 gap-[20px] md:grid-cols-5">
          <div className="flex w-full items-center justify-center rounded-[8px] border border-[#3A3939] bg-[#D0C7A3] p-[14px] text-[20px] max-md:col-span-2">
            <Solana />
          </div>

          {[0.002, 0.004, 0.02, 0.5].map((tip) => (
            <div
              key={tip}
              onClick={() => {
                setSelectedTip(selectedTip === tip ? 0 : tip);
              }}
              className={cn(
                selectedTip === tip ? '!bg-[#9DA990]' : '',
                'flex w-full items-center justify-center rounded-[8px] border border-[#3A3939] bg-[#D0C7A3] p-[14px] font-poppins text-[20px]',
                'cursor-pointer select-none',
              )}
            >
              {tip}
            </div>
          ))}
        </div>

        <button
          onClick={handleTip}
          disabled={isSolPending || !publicKey}
          className="h-[60px] rounded-[8px] border border-[#3A3939] bg-[#9DA990] text-[22px] text-black disabled:text-[#4F5548]"
        >
          Thank the Oracle
        </button>
      </div>
    </div>
  );
};
