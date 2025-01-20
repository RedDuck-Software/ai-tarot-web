import { AboutSection } from '@/components/common/about-section';
import { TarotLine } from '@/components/common/tarot-line';
import { CtaBlock } from '@/components/pages/home/cta';
import { Faq } from '@/components/pages/home/faq';
import { Hero } from '@/components/pages/home/hero';
import { WORDS } from '@/constants/words';

export default function HomePage() {
  return (
    <>
      <Hero />
      <TarotLine words={new Array(1).fill(WORDS).flat(Infinity)} />
      <AboutSection />
      <CtaBlock />
      <Faq />
    </>
  );
}
