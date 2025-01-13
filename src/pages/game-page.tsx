import { AboutSection } from '@/components/common/About';
import { Header } from '@/components/common/Header';
import { TarotLine } from '@/components/common/TarotLine';
import { GameSection } from '@/components/pages/game/game';

export default function GamePage() {
  return (
    <>
      <Header />
      <GameSection />
      <TarotLine
        className="border-t border-customBlack"
        words={new Array(10).fill(['Love', 'Money', 'Life', 'Deals', 'Work']).flat(Infinity)}
      />
      <AboutSection />
    </>
  );
}
