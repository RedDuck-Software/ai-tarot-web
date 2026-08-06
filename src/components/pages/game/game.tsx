import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useRef, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { z } from 'zod';

import { getRandomDemoReading, type DemoReading } from './demo-readings';

import { BaseTooltip } from '@/components/common/base-tooltip';
import { CurrencySelect } from '@/components/common/currency-select';
import { TopUpCardDialog } from '@/components/common/top-up-card-dialog';
import { Button } from '@/components/ui/button.tsx';
import { currencies, Currencies } from '@/constants/addresses';
import usePaymentPrices from '@/hooks/api/use-payment-prices';
import useStatus from '@/hooks/api/use-status';
import usePrivyMakePrediction from '@/hooks/contracts/write/use-privy-make-prediction';
import useSend from '@/hooks/contracts/write/use-send';
import { usePrivyWallet } from '@/hooks/privy/use-privy-wallet';
import { useBreakpoint } from '@/hooks/use-breakpoint';
import { cn, showTxToast } from '@/lib/utils';

const TarotRequestSchema = z.object({
  question: z
    .string()
    .min(3, 'Min 3 symbols')
    .max(1000, 'Max 1000 symbols')
    // .regex(/^[a-zA-Z0-9.,!?-\s]+$/, 'Only English letters and numbers are allowed')
    .refine((value) => value.trim() !== '', {
      message: 'String cannot consist of only spaces',
    }),
});

const DEFAULT_IMAGE = 'images/tarot-game/board.png';
const SHUFFLE_DECK = 'images/tarot-game/shuffle-deck.png';
const ORACLE_NEEDS_TIME = 'images/tarot-game/oracle-needs-time.png';
const THANKS_ORACLE = 'images/tarot-game/thanks-oracle.png';
const SHUTDOWN = 'images/tarot-game/shutdown.png';

const DEFAULT_IMAGE_SM = 'images/tarot-game/board-sm.png';
const SHUFFLE_DECK_SM = 'images/tarot-game/shuffle-deck-sm.png';
const ORACLE_NEEDS_TIME_SM = 'images/tarot-game/oracle-needs-time-sm.png';
const THANKS_ORACLE_SM = 'images/tarot-game/thanks-oracle-sm.png';
const SHUTDOWN_SM = 'images/tarot-game/shutdown-sm.png';

const LOADING_IMAGES = [SHUFFLE_DECK, ORACLE_NEEDS_TIME] as const;
const LOADING_IMAGES_SM = [SHUFFLE_DECK_SM, ORACLE_NEEDS_TIME_SM] as const;

const CARD_ANIMATIONS = [
  'firstCardAppearance 1s linear forwards',
  'secondCardAppearance 2s linear forwards',
  'thirdCardAppearance 3s linear forwards',
] as const;

const STEP_MESSAGES: Record<string, string> = {
  shuffling: 'Shuffling the deck...',
  drawing: 'The Oracle draws your cards...',
  consulting: 'Reading the ancient wisdom...',
};

const SUGGEST_QUESTION_HINT_STORAGE_KEY = 'tarotsol-ai-suggest-question-seen-v3';
const SUGGEST_QUESTION_TOOLTIP_AUTO_HIDE_MS = 4000;

const formatReadingResponse = ({ answer, question }: Pick<DemoReading, 'answer' | 'question'>) =>
  `Your answer:\n${answer}\n\n\nYour question:\n${question}`;

type TarotRequestSchemaType = z.infer<typeof TarotRequestSchema>;

export const GameSection = () => {
  const { primaryWallet } = usePrivyWallet();
  const primaryAddress = primaryWallet?.address;

  const isMd = useBreakpoint('md');
  const { mutateAsync: privyTransfer, isPending } = usePrivyMakePrediction();
  const { mutateAsync: transferCurrency, isPending: isSolPending, isSuccess: isTipSuccess } = useSend();
  const { data: status } = useStatus();
  const { data: paymentPrices } = usePaymentPrices();

  const [currencyName, setCurrencyName] = useState<Currencies>(Object.keys(currencies)[0] as Currencies);
  const [currentMainImage, setCurrentMainImage] = useState<string>(isMd ? DEFAULT_IMAGE : DEFAULT_IMAGE_SM);
  const [selectedTip, setSelectedTip] = useState<number>(0);
  const [currentPendingImage, setCurrentPendingImage] = useState<number>(0);
  const [isFadingOut, setIsFadingOut] = useState<boolean>(false);
  const [showTip, setShowTip] = useState<boolean>(false);
  const [isRetry, setRetry] = useState<boolean>(false);
  const [dontReload, setDontReload] = useState<boolean>(false);
  const [demoReading, setDemoReading] = useState<DemoReading | null>(null);
  const [displayedTarots, setDisplayedTarots] = useState<DemoReading['tarots'] | null>(null);
  const [isDemoPending, setIsDemoPending] = useState<boolean>(false);
  const [isSuggestHintActive, setIsSuggestHintActive] = useState<boolean>(false);
  const [isSuggestIntroTooltipOpen, setIsSuggestIntroTooltipOpen] = useState<boolean>(false);
  const [loadingStep, setLoadingStep] = useState<string | null>(null);
  const [isTopUpOpen, setIsTopUpOpen] = useState(false);
  const questionsCache = useRef<string[]>([]);
  const demoTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const predictionResponseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const loadingTransitionTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const stepTimers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<TarotRequestSchemaType>({
    resolver: zodResolver(TarotRequestSchema),
  });

  useEffect(() => {
    try {
      if (!window.localStorage.getItem(SUGGEST_QUESTION_HINT_STORAGE_KEY)) {
        setIsSuggestHintActive(true);
        setIsSuggestIntroTooltipOpen(true);
      }
    } catch {
      setIsSuggestHintActive(true);
      setIsSuggestIntroTooltipOpen(true);
    }
  }, []);

  useEffect(() => {
    if (!isSuggestIntroTooltipOpen) {
      return;
    }

    const timer = setTimeout(() => {
      setIsSuggestIntroTooltipOpen(false);

      try {
        window.localStorage.setItem(SUGGEST_QUESTION_HINT_STORAGE_KEY, 'true');
      } catch {
        return;
      }
    }, SUGGEST_QUESTION_TOOLTIP_AUTO_HIDE_MS);

    return () => {
      clearTimeout(timer);
    };
  }, [isSuggestIntroTooltipOpen]);

  useEffect(() => {
    return () => {
      if (demoTimer.current) clearTimeout(demoTimer.current);
      if (predictionResponseTimer.current) clearTimeout(predictionResponseTimer.current);
      stepTimers.current.forEach(clearTimeout);
    };
  }, []);

  useEffect(() => {
    if (!isPending) setLoadingStep(null);
  }, [isPending]);

  useEffect(() => {
    if (isTipSuccess) {
      setCurrentMainImage(isMd ? THANKS_ORACLE : THANKS_ORACLE_SM);

      const timer = setTimeout(() => {
        setCurrentMainImage(isMd ? DEFAULT_IMAGE : DEFAULT_IMAGE_SM);
      }, 5000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [isMd, isTipSuccess]);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;

    if (isPending || isDemoPending) {
      interval = setInterval(() => {
        setIsFadingOut(true);

        loadingTransitionTimer.current = setTimeout(() => {
          setCurrentPendingImage((prevIndex) => (prevIndex + 1) % LOADING_IMAGES.length);
          setIsFadingOut(false);
        }, 500);
      }, 5000);
      setCurrentMainImage(isMd ? LOADING_IMAGES[currentPendingImage] : LOADING_IMAGES_SM[currentPendingImage]);
    } else {
      setCurrentMainImage(isMd ? DEFAULT_IMAGE : DEFAULT_IMAGE_SM);
    }

    return () => {
      if (interval) clearInterval(interval);

      if (loadingTransitionTimer.current) {
        clearTimeout(loadingTransitionTimer.current);
      }
    };
  }, [isPending, isDemoPending, currentPendingImage, isMd]);

  useEffect(() => {
    if (!showTip) {
      return;
    }

    const handler = (event: BeforeUnloadEvent) => {
      event.preventDefault();
    };

    if (dontReload) {
      window.removeEventListener('beforeunload', handler);
      return;
    }

    window.addEventListener('beforeunload', handler);

    return () => {
      window.removeEventListener('beforeunload', handler);
    };
  }, [showTip, dontReload]);

  const onPrivySubmit: SubmitHandler<TarotRequestSchemaType> = async (data, e) => {
    e?.preventDefault();
    if (isDemoPending) return;
    if (predictionResponseTimer.current) clearTimeout(predictionResponseTimer.current);
    setDemoReading(null);
    setDisplayedTarots(null);
    setShowTip(false);
    setRetry(false);
    const trimmedQuestion = data.question.trim();
    const amount = paymentPrices?.[currencyName] ?? currencies[currencyName].defaultPrice;
    const result = await privyTransfer({
      question: trimmedQuestion,
      tokenName: currencyName,
      amount,
      onStep: setLoadingStep,
    });
    if (!result) return;
    setDisplayedTarots(result.tarots);
    predictionResponseTimer.current = setTimeout(() => {
      const formatted = result.answer.replaceAll('*', '');
      setValue('question', formatReadingResponse({ answer: formatted, question: trimmedQuestion }));
      setShowTip(true);
      setRetry(true);
    }, 3200);
  };

  const handleDemoReading = () => {
    if (demoTimer.current) clearTimeout(demoTimer.current);
    if (predictionResponseTimer.current) clearTimeout(predictionResponseTimer.current);
    stepTimers.current.forEach(clearTimeout);
    stepTimers.current = [];

    const reading = getRandomDemoReading();

    setDemoReading(null);
    setDisplayedTarots(null);
    setShowTip(false);
    setRetry(false);
    setIsDemoPending(true);
    setValue('question', reading.question);
    setLoadingStep('shuffling');

    stepTimers.current.push(
      setTimeout(() => {
        setLoadingStep('drawing');
      }, 1600),
      setTimeout(() => {
        setLoadingStep('consulting');
      }, 3200),
    );

    demoTimer.current = setTimeout(() => {
      setLoadingStep(null);
      setDemoReading(reading);
      setDisplayedTarots(reading.tarots);
      setValue('question', formatReadingResponse(reading));
      setShowTip(false);
      setRetry(false);
      setIsDemoPending(false);
    }, 4800);
  };

  const handleTip = async () => {
    if (!primaryAddress) {
      toast.error('Connect wallet first');
      return;
    }

    if (!selectedTip) {
      toast.error('Select tip first');
      return;
    }

    await showTxToast('Tipping the Oracle', async () => {
      await transferCurrency({ amount: selectedTip, tokenName: currencyName });
    });
  };

  const handleSuggestQuestion = async () => {
    setIsSuggestHintActive(false);
    setIsSuggestIntroTooltipOpen(false);

    try {
      window.localStorage.setItem(SUGGEST_QUESTION_HINT_STORAGE_KEY, 'true');
    } catch {
      // Ignore localStorage failures; suggesting a question should still work.
    }

    if (questionsCache.current.length === 0) {
      try {
        const res = await fetch('/text/questions.txt');

        if (!res.ok) {
          throw new Error('Questions file request failed');
        }

        const text = await res.text();
        questionsCache.current = text
          .split(/\r?\n/)
          .map((item) => item.trim())
          .filter(Boolean);
      } catch {
        toast.error('Could not load suggested questions');
        return;
      }
    }

    if (questionsCache.current.length === 0) {
      toast.error('No suggested questions available');
      return;
    }

    setValue('question', questionsCache.current[Math.floor(Math.random() * questionsCache.current.length)]);
  };

  const activeTarots = displayedTarots;

  return (
    <div className="container flex flex-col gap-[20px] py-[20px] font-inknut">
      <div className="text-center font-bona-nova-sc text-[30px] sm:text-[50px]">Your Future In One Forecast</div>

      <div className="w-[90vw] overflow-x-auto sm:w-auto">
        <div className="relative -z-50 sm:h-auto sm:w-auto md:min-w-[888px]">
          {activeTarots && (
            <div className="flex h-[93%] w-full flex-col justify-around py-4 max-md:gap-4 sm:h-full sm:justify-evenly md:absolute md:flex-row">
              {activeTarots.map((e, idx) => (
                <img
                  key={e.id}
                  className={cn('mx-auto rounded-[8px] max-md:h-[485px] max-md:w-[280px]', e.reverted && 'rotate-180')}
                  style={{ animation: CARD_ANIMATIONS[idx] }}
                  src={`images/cards/${e.id}.png`}
                  alt={`Card ${e.id}`}
                  onError={(e) => {
                    e.currentTarget.src = e.currentTarget.src.replace('.png', '.jpg');
                  }}
                />
              ))}
            </div>
          )}

          <img
            src={status?.isShutDown ? (isMd ? SHUTDOWN : SHUTDOWN_SM) : currentMainImage}
            alt="board"
            className={cn(
              'relative -z-50 mx-auto h-auto max-h-[484px] w-auto',
              isPending && 'transition-opacity duration-500 ease-in-out',
              isDemoPending && 'transition-opacity duration-500 ease-in-out',
              isFadingOut ? 'opacity-0' : 'opacity-100',
              !isMd && activeTarots && 'hidden',
            )}
          />
        </div>
      </div>

      {loadingStep && (
        <p
          key={loadingStep}
          className="animate-in fade-in text-center font-inknut text-[18px] italic text-[#621421] duration-500"
        >
          {STEP_MESSAGES[loadingStep]}
        </p>
      )}

      <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
        <div className="text-center text-[20px] md:text-[24px]">Type your question and ask the cards</div>
        <BaseTooltip
          content={
            <>
              Not sure what to ask? Let the oracle
              <br />
              suggest a question for you →
            </>
          }
          forceOpen={isSuggestIntroTooltipOpen || undefined}
          className={cn(isSuggestHintActive && 'animate-pulse rounded-[8px] ring-4 ring-[#621421]/40')}
        >
          <Button
            onClick={handleSuggestQuestion}
            size="responsive"
            className="bg-[#D0C7A3] text-[22px]"
            variant="outline"
          >
            Suggest question
          </Button>
        </BaseTooltip>
      </div>

      <div className="grid overflow-hidden">
        <div className="text-red-700"> {errors.question?.message ? errors.question.message : '⠀'} </div>
        <textarea
          {...register('question')}
          className="min-h-[150px] rounded-[8px] border border-[#3A3939] bg-transparent p-4 placeholder-[#3A3939] outline-none"
          placeholder="Type your question here"
          disabled={isPending || isDemoPending || showTip}
          rows={7}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-6">
        <Button
          size="responsive"
          onClick={handleDemoReading}
          disabled={isPending || isDemoPending}
          className="bg-[#9DA990] text-[22px]"
        >
          Try a Free Demo Reading
        </Button>
        <Button
          size="responsive"
          variant="outline"
          onClick={() => {
            setIsTopUpOpen(true);
          }}
          className="bg-[#D0C7A3] text-[22px]"
        >
          Top up with card
        </Button>
      </div>

      {demoReading && (
        <div className="rounded-[8px] border border-[#3A3939] bg-[#D0C7A3]/70 p-4 text-center font-poppins text-[18px] leading-[27px]">
          Connect your wallet or top up with card to ask your own question!
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-10">
        <CurrencySelect onValueChange={setCurrencyName} prices={paymentPrices ?? undefined} value={currencyName} />
        {primaryAddress ? (
          <BaseTooltip content={status?.isShutDown ? 'Oracle is taking a brake' : ''}>
            <Button
              size="responsive"
              variant="outline"
              onClick={
                isRetry
                  ? () => {
                      setDontReload(true);
                      setTimeout(() => {
                        window.location.reload();
                      }, 10);
                    }
                  : handleSubmit(onPrivySubmit)
              }
              disabled={isPending || isDemoPending || (status?.isShutDown ?? false) || !paymentPrices}
              className="h-full w-full bg-[#9DA990] text-[22px]"
            >
              {isRetry ? 'Make a new Forecast' : 'Make a Forecast'}
            </Button>
          </BaseTooltip>
        ) : (
          <Button size="responsive" variant="outline" disabled className="h-full w-full bg-[#9DA990] text-[22px]">
            Make a Forecast
          </Button>
        )}
      </div>

      {showTip && (
        <div className="grid grid-rows-[auto_auto] gap-5 lg:grid-cols-2 lg:gap-10">
          <div className="grid grid-cols-2 gap-[20px] md:grid-cols-5">
            <div className="flex w-full items-center justify-center rounded-[8px] border border-[#3A3939] bg-[#D0C7A3] p-[14px] text-[20px] max-md:col-span-2">
              <img src={`/icons/currencies/${currencyName}.svg`} alt="currecy" />
            </div>

            {currencies[currencyName].tips.map((tip) => (
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
            disabled={isSolPending}
            className="bg-[#9DA990] text-[22px]"
          >
            Thank the Oracle
          </Button>
        </div>
      )}

      <TopUpCardDialog open={isTopUpOpen} onOpenChange={setIsTopUpOpen} />
    </div>
  );
};
