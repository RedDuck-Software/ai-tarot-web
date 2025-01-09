import { zodResolver } from '@hookform/resolvers/zod';
import { useWallet } from '@solana/wallet-adapter-react';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { z } from 'zod';

import { ConnectWalletButton } from '@/components/common/Header/connect-wallet-button';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import useMakePrediction from '@/hooks/contracts/write/use-make-prediction';

const TarotRequestSchema = z.object({
  question: z
    .string()
    .min(3)
    .max(1000)
    .regex(/^[a-zA-Z0-9.,!? ]+$/, 'Only English letters and numbers are allowed')
    .refine((value) => value.trim() !== '', { message: 'String cannot consist of only spaces' }),
});

type TarotRequestSchemaType = z.infer<typeof TarotRequestSchema>;

export default function GamePage() {
  const { publicKey } = useWallet();
  const { mutateAsync: transfer, isSuccess, isPending, data: predictionAnswer } = useMakePrediction();

  console.log('predictionAnswer', predictionAnswer);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<TarotRequestSchemaType>({ resolver: zodResolver(TarotRequestSchema) });

  const onSubmit: SubmitHandler<TarotRequestSchemaType> = async (data, e) => {
    e?.preventDefault();
    console.log('SubmitHandler data', data);
    await transfer(watch('question').trim());
  };

  useEffect(() => {
    if (predictionAnswer) {
      setValue('question', predictionAnswer.response + '\n' + watch('question'));
    }
  }, [isSuccess, predictionAnswer, setValue, watch]);

  return (
    <div className="mx-auto w-[600px] max-w-[600px] rounded-lg bg-gray-50 p-6 shadow-md">
      <h1 className="mb-6 text-center text-3xl font-semibold text-gray-800">Game Page</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-4">
        <Input
          asChild
          error={errors.question && <span className="text-sm text-red-600">{errors.question.message}</span>}
        >
          <textarea
            {...register('question')}
            disabled={isPending}
            placeholder="Enter your question here..."
            className="max-h-[500px] min-h-[150px] w-full resize-y rounded-lg border border-gray-300 p-3 text-black shadow-sm placeholder:text-black focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={4}
          />
        </Input>
        <Button
          type="button"
          onClick={async () => {
            const questionValue = watch('question');
            if (questionValue) {
              await navigator.clipboard.writeText(questionValue);
              toast.success('Copied!');
            }
          }}
          className="w-full rounded-lg bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700 shadow-md transition hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
        >
          Copy Text
        </Button>
        <Button
          className={`mt-4 w-full rounded-lg bg-blue-500 px-4 py-2 text-white shadow-md transition hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-gray-400`}
          type="submit"
          disabled={!publicKey || isPending}
        >
          Make a Prediction
        </Button>
      </form>
      <div className="mt-4">
        <ConnectWalletButton />
      </div>
    </div>
  );
}
