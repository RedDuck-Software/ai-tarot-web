import Solana from '@/components/common/Svg/Solana.tsx';
import { Select, SelectTrigger, SelectItem, SelectValue, SelectContent } from '@/components/ui/select.tsx';

export const CurrencySelect = () => {
  return (
    <Select>
      <SelectTrigger>
        <SelectValue placeholder="Theme" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="light">
          <div className="flex flex-row items-center gap-4">
            <Solana />
            <div>0.003</div>
          </div>
        </SelectItem>
        <SelectItem value="dark">Dark</SelectItem>
        <SelectItem value="system">System</SelectItem>
      </SelectContent>
    </Select>
  );
};
