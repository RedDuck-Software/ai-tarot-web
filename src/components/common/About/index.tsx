import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export const AboutSection = () => {
  return (
    <div className="font-inknut grid w-full grid-cols-2 bg-[url('/about.png')] bg-repeat *:pb-[60px] *:pt-[80px]">
      <div className="flex h-full min-h-full w-full flex-col justify-between border-r border-black pl-[140px] pr-[100px]">
        <div className="space-y-8">
          <p className="text-[60px] font-light leading-[72px]">About Tarot</p>
          <p className="text-[20px] font-light leading-[28px]">
            Lorem ipsum dolor sit amet consectetur. Posuere auctor vivamus sed leo non pellentesque. Massa sed eget est
            porta facilisis rhoncus mauris. Pellentesque malesuada morbi volutpat dictum. Sollicitudin suspendisse
            aliquam imperdiet rutrum interdum. Dignissim in diam vestibulum sodales nibh nec scelerisque id. Sit
            facilisi vestibulum etiam nunc a. Ullamcorper amet sed etiam ac adipiscing mauris cursus blandit vitae.
            Lacus eget gravida morbi condimentum lobortis a. Blandit gravida dictum mollis scelerisque feugiat dis.
          </p>
        </div>

        <img src="/sun.png" alt="tarot1" className="!mt-auto ml-auto h-[320px] w-[305px]" />
      </div>

      <div className="w-full space-y-8 pl-[100px] pr-[140px]">
        <p className="text-[60px] font-light leading-[72px]">Rules</p>

        <div className="flex w-full max-w-full flex-row justify-between overflow-x-hidden *:h-[248px] *:w-[173px] 2xl:*:h-[310px] 2xl:*:w-[217px]">
          <img src="/libra-card.png" alt="tarot1" />
          <img src="/libra-card.png" alt="tarot2" />
          <img src="/libra-card.png" alt="tarot3" />
        </div>

        <Accordion type="single" defaultValue="item-0">
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
