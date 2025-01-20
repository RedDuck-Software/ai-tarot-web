import { Select, SelectTrigger, SelectItem, SelectValue, SelectContent } from '@/components/ui/select.tsx';
import { currencies, Currencies } from '@/constants/addresses';

type CurrencySelect = {
  value: string;
  onValueChange: (value: Currencies) => void;
};

export const CurrencySelect = ({ value, onValueChange }: CurrencySelect) => {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="font-poppins">
        <SelectValue />
      </SelectTrigger>
      <SelectContent className="font-poppins">
        {Object.values(currencies).map((e, index) => {
          return (
            <SelectItem key={index} value={Object.keys(currencies)[index]}>
              <div className="flex flex-row items-center gap-4">
                <img src={`/icons/currencies/${Object.keys(currencies)[index]}.svg`} alt="currency" />
                <div>{e.defaultPrice}</div>
              </div>
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
};
