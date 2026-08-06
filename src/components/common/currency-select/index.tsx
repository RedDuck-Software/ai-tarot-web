import { Select, SelectTrigger, SelectItem, SelectValue, SelectContent } from '@/components/ui/select.tsx';
import { currencies, Currencies } from '@/constants/addresses';

type CurrencySelect = {
  value: string;
  prices?: Partial<Record<Currencies, number>>;
  onValueChange: (value: Currencies) => void;
};

const formatPrice = (price?: number) => {
  if (!price) {
    return '...';
  }

  return price.toLocaleString('en-US', {
    maximumFractionDigits: 6,
  });
};

export const CurrencySelect = ({ value, prices, onValueChange }: CurrencySelect) => {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="font-poppins">
        <SelectValue />
      </SelectTrigger>
      <SelectContent className="font-poppins">
        {Object.keys(currencies).map((currencyName) => {
          const typedCurrencyName = currencyName as Currencies;

          return (
            <SelectItem key={currencyName} value={currencyName}>
              <div className="flex flex-row items-center gap-4">
                <img src={`/icons/currencies/${currencyName}.svg`} alt="currency" />
                <div>{formatPrice(prices?.[typedCurrencyName])}</div>
              </div>
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
};
