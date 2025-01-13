import { useLayoutEffect } from 'react';

import { AboutSection } from '@/components/common/About';
import { Header } from '@/components/common/Header';
import { TarotLine } from '@/components/common/TarotLine';
import { GameSection } from '@/components/pages/game/game';
import { WORDS } from '@/constants/words';

export default function GamePage() {
  useLayoutEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);
  return (
    <>
      <Header />
      <GameSection />
      <TarotLine className="border-t border-customBlack" words={new Array(1).fill(WORDS).flat(Infinity)} />
      <AboutSection />
    </>
  );
}
