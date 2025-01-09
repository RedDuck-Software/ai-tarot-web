import { AboutSection } from '@/components/common/About';
import { Header } from '@/components/common/Header';
import { GameSection } from '@/components/pages/game/game';

export default function GamePage() {
  return (
    <>
      <Header />
      <GameSection />
      <AboutSection />
    </>
  );
}
