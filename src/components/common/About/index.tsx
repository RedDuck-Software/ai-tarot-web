import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export const AboutSection = () => {
  return (
    <div className="grid w-full grid-rows-[auto_auto] bg-[url('/images/textures/green.png')] bg-repeat font-inknut *:pb-[80px] *:pt-[80px] *:lg:pb-[60px] xl:grid-cols-2">
      <div className="flex h-full min-h-full w-full flex-col justify-between border-black px-[24px] lg:pl-[140px] lg:pr-[100px] xl:border-r">
        <div className="space-y-8">
          <p className="text-[40px] font-light leading-[48px] md:text-[60px] md:leading-[72px]">About Tarot</p>
          <p className="text-[18px] font-light leading-[25px] md:text-[20px] md:leading-[28px]">
            Lorem ipsum dolor sit amet consectetur. Posuere auctor vivamus sed leo non pellentesque. Massa sed eget est
            porta facilisis rhoncus mauris. Pellentesque malesuada morbi volutpat dictum. Sollicitudin suspendisse
            aliquam imperdiet rutrum interdum. Dignissim in diam vestibulum sodales nibh nec scelerisque id. Sit
            facilisi vestibulum etiam nunc a. Ullamcorper amet sed etiam ac adipiscing mauris cursus blandit vitae.
            Lacus eget gravida morbi condimentum lobortis a. Blandit gravida dictum mollis scelerisque feugiat dis.
          </p>
        </div>

        <img
          src="/images/sun.png"
          alt="tarot1"
          className="mt-12 h-[320px] w-[305px] max-md:mx-auto md:!ml-auto md:!mt-auto"
        />
      </div>

      <div className="w-full space-y-8 px-[24px] lg:pl-[100px] lg:pr-[140px]">
        <p className="text-[40px] font-light leading-[48px] md:text-[60px] md:leading-[72px]">Rules</p>

        <div className="flex w-full max-w-full flex-row justify-between overflow-x-auto *:h-[248px] *:w-[173px] max-md:gap-6 2xl:*:h-[310px] 2xl:*:w-[217px]">
          <img src="/images/libra-card.png" alt="tarot1" />
          <img src="/images/libra-card.png" alt="tarot2" />
          <img src="/images/libra-card.png" alt="tarot3" />
        </div>

        <Accordion type="single" collapsible>
          {new Array(6).fill(0).map((_, i) => (
            <AccordionItem value={`item-${i}`} key={i}>
              <AccordionTrigger>Is it accessible?</AccordionTrigger>
              <AccordionContent>Yes. It adheres to the WAI-ARIA design pattern.</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};
