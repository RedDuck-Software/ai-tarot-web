import { AboutSection } from '@/components/common/About';
import { TarotLine } from '@/components/common/TarotLine';
import { CtaBlock } from '@/components/pages/home/cta';
import { Hero } from '@/components/pages/home/hero';

export default function HomePage() {
  return (
    <>
      <Hero />
      <TarotLine words={new Array(5).fill(['Love', 'Money', 'Life', 'Deals', 'Work']).flat(Infinity)} />
      <AboutSection />
      <CtaBlock />
    </>
  );
}
