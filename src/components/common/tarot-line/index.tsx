import { useBreakpoint } from '@/hooks/use-breakpoint';
import { cn } from '@/lib/utils';
import { BaseComponentProps } from '@/types';

export const TarotLine = ({ className, words }: BaseComponentProps<{ words: string[] }>) => {
  const isMd = useBreakpoint('lg');
  const wordsArr = isMd ? words : words.slice(0, 2);

  return (
    <div
      className={cn(
        "flex h-[92px] w-full flex-row items-center overflow-hidden border-b border-customBlack bg-[url('/images/textures/sand.webp')] bg-repeat",
        className,
      )}
    >
      <div className="flex w-full justify-center overflow-hidden">
        <div className="flex justify-between">
          {wordsArr.map((word, index) => (
            <div
              key={index}
              className={cn(
                'ml-12 flex flex-row items-center gap-12 md:ml-[140px] md:gap-[140px]',
                index === 0 && '!ml-0',
              )}
            >
              <p className="text-[24px] font-light leading-7 text-black">{word}</p>

              {index !== wordsArr.length - 1 && (
                <svg width="44" height="50" viewBox="0 0 44 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M22.9379 42.0602C22.6499 43.4392 22.4239 44.7557 22.25 45.9043C22.0762 44.7557 21.8501 43.4392 21.5621 42.0602C21.1196 39.9413 20.5285 37.6638 19.7505 35.6164C18.9761 33.5784 17.9997 31.7222 16.7638 30.4862C14.3388 28.0612 10.2775 26.5752 6.90317 25.6936C5.79005 25.4028 4.74038 25.1749 3.83184 25C4.74038 24.8251 5.79005 24.5972 6.90317 24.3064C10.2775 23.4248 14.3388 21.9388 16.7638 19.5138C17.9997 18.2778 18.9761 16.4216 19.7505 14.3836C20.5285 12.3362 21.1196 10.0587 21.5621 7.93976C21.8501 6.56076 22.0762 5.24433 22.25 4.09569C22.4239 5.24433 22.6499 6.56076 22.9379 7.93976C23.3805 10.0587 23.9716 12.3362 24.7496 14.3836C25.524 16.4216 26.5004 18.2778 27.7363 19.5138C30.1613 21.9388 34.2226 23.4248 37.5969 24.3064C38.71 24.5972 39.7597 24.8251 40.6682 25C39.7597 25.1749 38.71 25.4028 37.5969 25.6936C34.2226 26.5752 30.1613 28.0612 27.7363 30.4862C26.5004 31.7222 25.524 33.5784 24.7496 35.6164C23.9716 37.6638 23.3805 39.9413 22.9379 42.0602Z"
                    fill="#E5BF39"
                    stroke="#1E1E1E"
                  />
                </svg>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
