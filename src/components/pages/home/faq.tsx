import { GoToTwitterBtn } from '@/components/common/GoToTwitterBtn';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const FAQ_MOCK = [
  { title: 'What is Tarot?', description: 'Lorem ipsum' },
  { title: 'How does this site work?', description: 'Lorem ipsum' },
  { title: 'How many questions can I ask?', description: 'Lorem ipsum' },
  { title: 'How much does this cost?', description: 'Lorem ipsum' },
  { title: 'Can I share my reading with others?', description: 'Lorem ipsum' },
];

export const Faq = () => {
  return (
    <div className="grid w-full grid-rows-[auto_auto] bg-[url('/images/textures/green.png')] bg-repeat font-inknut *:pb-[80px] *:lg:pb-[140px] xl:grid-cols-2">
      <div className="w-full space-y-8 border-black px-[24px] pt-[80px] lg:pl-[100px] lg:pr-[140px] xl:border-r">
        <p className="text-[40px] font-light leading-[48px] md:text-[60px] md:leading-[72px]">
          Frequently Asked Questions
        </p>

        <Accordion type="single" collapsible>
          {FAQ_MOCK.map((el, i) => (
            <AccordionItem value={`item-${i}`} key={i}>
              <AccordionTrigger>{el.title}</AccordionTrigger>
              <AccordionContent>{el.description}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
      <div className="flex h-full min-h-full w-full flex-col justify-between border-black px-[24px] pt-[80px] lg:pl-[140px] lg:pr-[80px]">
        <div className="space-y-8">
          <p className="text-[40px] font-light leading-[48px] max-sm:max-w-[327px] md:text-[60px] md:leading-[72px]">
            Horoscope on Twitter for every day
          </p>
          <div className="w-full md:max-w-[210px]">
            <GoToTwitterBtn />
          </div>
          <img
            src="/images/horoscope.png"
            alt="horoscope"
            className="mx-auto h-[327px] w-[327px] md:mx-0 md:h-auto md:w-auto"
          />
        </div>
      </div>
    </div>
  );
};
