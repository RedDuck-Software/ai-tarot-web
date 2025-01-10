import { zodResolver } from '@hookform/resolvers/zod';
import { useWallet } from '@solana/wallet-adapter-react';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

import Solana from '@/components/common/Svg/Solana.tsx';
import useMakePrediction from '@/hooks/contracts/write/use-make-prediction';
import { useWalletModalStore } from '@/store/wallet-modal.tsx';

const TarotRequestSchema = z.object({
  question: z
    .string()
    .min(3)
    .max(1000)
    .regex(/^[a-zA-Z0-9.,!? ]+$/, 'Only English letters and numbers are allowed')
    .refine((value) => value.trim() !== '', { message: 'String cannot consist of only spaces' }),
});

type TarotRequestSchemaType = z.infer<typeof TarotRequestSchema>;

export const GameSection = () => {
  const { publicKey } = useWallet();
  const { setIsOpen } = useWalletModalStore();
  const { mutateAsync: transfer, isSuccess, isPending, data: predictionAnswer } = useMakePrediction();

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

  useEffect(() => {
    if (predictionAnswer) {
      setValue('question', predictionAnswer.answer);
    }
  }, [isSuccess, predictionAnswer, setValue, watch]);

  return (
    <div className="font-inknut container flex flex-col gap-[20px] py-[20px]">
      <div className="font-bona-nova-sc text-center text-[50px]">Your Future In One Bet</div>
      <div className="relative">
        {predictionAnswer && (
          <div className="absolute flex h-full w-full flex-row justify-evenly py-4">
            {predictionAnswer.tarots.map((e) => {
              return <img className="rounded-[8px]" src={`images/cards/${e.id}.jpg`} alt="card" />;
            })}
          </div>
        )}
        <img src="images/tarot-game/bord.png" alt="bord" />
      </div>
      <div className="flex flex-row items-center justify-between">
        <div className="text-[24px]">Type your question and ask the cards</div>
        <button className="rounded-[8px] border border-[#3A3939] bg-[#E8D5AF] px-[20px] py-[13px] text-[22px]">
          Suggest question
        </button>
      </div>
      <div className="grid">
        <div className="text-red-700"> {errors.question?.message ? 'min 3 symbols' : '⠀'} </div>
        <textarea
          {...register('question')}
          className="rounded-[8px] border border-[#3A3939] bg-transparent p-4 placeholder-[#3A3939]"
          placeholder="Type your question here"
          disabled={isPending}
          rows={7}
        />
      </div>
      <div className="grid grid-cols-2 gap-10">
        <div className="flex flex-row items-center gap-4 rounded-[8px] border border-[#3A3939] bg-[#D0C7A3] p-[14px] text-[20px]">
          <Solana />
          <div className="font-poppins">0.002 $SOL</div>
        </div>
        {publicKey ? (
          <button
            onClick={handleSubmit(onSubmit)}
            disabled={isPending}
            className="rounded-[8px] border border-[#3A3939] bg-[#9DA990] text-[22px] text-[#4F5548]"
          >
            Make a Forecast
          </button>
        ) : (
          <button
            onClick={() => {
              setIsOpen(true);
            }}
            className="rounded-[8px] border border-[#3A3939] bg-[#9DA990] text-[22px] text-[#4F5548]"
          >
            Connect Wallet
          </button>
        )}
      </div>
    </div>
  );
};
