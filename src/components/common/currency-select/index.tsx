import { Select, SelectTrigger, SelectItem, SelectValue, SelectContent } from '@/components/ui/select.tsx';
import { currencies, TCurrencies } from '@/constants/addresses';

interface ICurrencySelect {
  value: string;
  onValueChange: (value: TCurrencies) => void;
}

export const CurrencySelect = ({ value, onValueChange }: ICurrencySelect) => {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="font-poppins">
        <SelectValue placeholder="Theme" />
      </SelectTrigger>
      <SelectContent className="font-poppins">
        {Object.values(currencies).map((e, index) => {
          return (
            <SelectItem key={index} value={Object.keys(currencies)[index]}>
              <div className="flex flex-row items-center gap-4">
                <img src={`/icons/currencies/${Object.keys(currencies)[index]}.svg`} alt="currecy" />
                <div>{e.defaultPrice}</div>
              </div>
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
};
