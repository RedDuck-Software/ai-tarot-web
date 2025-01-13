import { zodResolver } from '@hookform/resolvers/zod';
import { useWallet } from '@solana/wallet-adapter-react';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { z } from 'zod';

import { BaseTooltip } from '@/components/common/BaseTooltip';
import Solana from '@/components/common/Svg/Solana.tsx';
import { Button } from '@/components/ui/button.tsx';
import { env } from '@/env';
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

const DEFAULT_IMAGE = 'images/tarot-game/bord.png';
const SHUFFLE_DECK = 'images/tarot-game/shuffle-deck.png';
const ORACLE_NEEDS_TIME = 'images/tarot-game/oracle-needs-time.png';
const THANKS_ORACLE = 'images/tarot-game/thanks-oracle.png';

const LOADING_IMAGES = [SHUFFLE_DECK, ORACLE_NEEDS_TIME] as const;
const CARD_ANIMATIONS = [
  'firstCardAppearance 1s linear forwards',
  'secondCardAppearance 2s linear forwards',
  'thirdCardAppearance 3s linear forwards',
] as const;

type TarotRequestSchemaType = z.infer<typeof TarotRequestSchema>;

export const GameSection = () => {
  const { publicKey } = useWallet();
  const { setIsOpen } = useWalletModalStore();
  const { mutateAsync: transfer, isSuccess, isPending, data: predictionAnswer } = useMakePrediction();
  const { mutateAsync: transferSol, isPending: isSolPending, isSuccess: isTipSuccess } = useSendSol();

  const [selectedTip, setSelectedTip] = useState<number>(0);
  const [currentMainImage, setCurrentMainImage] = useState<string>(DEFAULT_IMAGE);
  const [currentPendingImage, setCurrentPendingImage] = useState<number>(0);
  const [isFadingOut, setIsFadingOut] = useState<boolean>(false);
  const [showTip, setShowTip] = useState<boolean>(false);

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
      const timer = setTimeout(() => {
        const formatted = predictionAnswer.answer.replaceAll('*', '');

        setValue('question', formatted);
        setShowTip(true);
      }, 3200);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [isSuccess, predictionAnswer, setValue, watch]);

  useEffect(() => {
    if (isTipSuccess) {
      setCurrentMainImage(THANKS_ORACLE);

      const timer = setTimeout(() => {
        setCurrentMainImage(DEFAULT_IMAGE);
      }, 5000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [isTipSuccess]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isPending) {
      interval = setInterval(() => {
        setIsFadingOut(true);

        setTimeout(() => {
          setCurrentPendingImage((prevIndex) => (prevIndex + 1) % LOADING_IMAGES.length);
          setIsFadingOut(false);
        }, 500);
      }, 5000);
      setCurrentMainImage(LOADING_IMAGES[currentPendingImage]);
    } else {
      setCurrentMainImage(DEFAULT_IMAGE);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPending, currentPendingImage]);

  return (
    <div className="container flex flex-col gap-[20px] py-[20px] font-inknut">
      <div className="text-center font-bona-nova-sc text-[30px] sm:text-[50px]">Your Future In One Forecast</div>

      <div className="w-[90vw] overflow-x-auto sm:w-auto">
        <div className="relative -z-50 h-[444px] w-[888px] sm:h-auto sm:w-auto">
          {predictionAnswer && currentMainImage === DEFAULT_IMAGE && (
            <div className="absolute flex h-[93%] w-full flex-row justify-around py-4 sm:h-full sm:justify-evenly">
              {predictionAnswer.tarots.map((e, idx) => {
                return (
                  <img
                    key={e.id}
                    className={cn('rounded-[8px]', e.reverted && 'rotate-180')}
                    style={{ animation: CARD_ANIMATIONS[idx] }}
                    src={`images/cards/${e.id}.jpg`}
                    alt="card"
                  />
                );
              })}
            </div>
          )}
          <img
            src={currentMainImage}
            alt="bord"
            className={cn(
              'relative -z-50 mx-auto h-auto max-h-[484px] w-auto',
              isPending && 'transition-opacity duration-500 ease-in-out',
              isFadingOut ? 'opacity-0' : 'opacity-100',
            )}
          />
        </div>
      </div>

      <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
        <div className="text-center text-[24px]">Type your question and ask the cards</div>
        <BaseTooltip content="COMING SOON">
          <Button size="responsive" className="bg-[#D0C7A3] text-[22px]" variant="outline">
            Suggest question
          </Button>
        </BaseTooltip>
      </div>

      <div className="grid">
        <div className="text-red-700"> {errors.question?.message ? errors.question.message : '⠀'} </div>
        <textarea
          {...register('question')}
          className="min-h-[150px] rounded-[8px] border border-[#3A3939] bg-transparent p-4 placeholder-[#3A3939] outline-none"
          placeholder="Type your question here"
          disabled={isPending}
          rows={7}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-10">
        <div className="flex flex-row items-center gap-4 rounded-[8px] border border-[#3A3939] bg-[#D0C7A3] p-[14px] text-[20px]">
          <Solana />
          <div className="font-poppins">{env.VITE_DEPOSIT_AMOUNT_SOL} SOL</div>
        </div>

        {publicKey ? (
          <Button
            size="responsive"
            variant="outline"
            onClick={handleSubmit(onSubmit)}
            disabled={isPending}
            className="bg-[#9DA990] text-[22px]"
          >
            Make a Forecast
          </Button>
        ) : (
          <Button
            size="responsive"
            variant="outline"
            onClick={() => {
              setIsOpen(true);
            }}
            className="bg-[#9DA990] text-[22px]"
          >
            Connect Wallet
          </Button>
        )}
      </div>

      {showTip && (
        <div className="grid grid-rows-[auto_auto] gap-5 lg:grid-cols-2 lg:gap-10">
          <div className="grid grid-cols-2 gap-[20px] md:grid-cols-5">
            <div className="flex w-full items-center justify-center rounded-[8px] border border-[#3A3939] bg-[#D0C7A3] p-[14px] text-[20px] max-md:col-span-2">
              <Solana />
            </div>

            {[0.002, 0.004, 0.02, 0.5].map((tip) => (
              <Button
                size="responsive"
                variant="outline"
                key={tip}
                onClick={() => {
                  setSelectedTip(selectedTip === tip ? 0 : tip);
                }}
                className={cn(
                  selectedTip === tip ? '!bg-[#9DA990]' : '',
                  'bg-[#D0C7A3] font-poppins text-[20px]',
                  'cursor-pointer select-none',
                )}
              >
                {tip}
              </Button>
            ))}
          </div>

          <Button
            size="responsive"
            variant="outline"
            onClick={handleTip}
            disabled={isSolPending || !publicKey}
            className="bg-[#9DA990] text-[22px]"
          >
            Thank the Oracle
          </Button>
        </div>
      )}
    </div>
  );
};
