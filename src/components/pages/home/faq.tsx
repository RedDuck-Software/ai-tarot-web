import { GoToTwitterBtn } from '@/components/common/GoToTwitterBtn';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const BENEFITS = [
  {
    subtitle: '-Personalized Experience:',
    reason:
      'Each reading is uniquely generated using your transaction ID and wallet address, ensuring that your experience is one-of-a-kind.',
  },
  {
    subtitle: '-AI Insights:',
    reason:
      'Our AI Oracle interprets the Tarot cards drawn for you, providing clear explanations and guidance based on their meanings.',
  },
  {
    subtitle: '-Accessible Wisdom:',
    reason: 'Whether for fun or serious inquiry, our platform makes Tarot accessible to everyone.',
  },
];

const FAQ_MOCK = [
  {
    title: 'How do I get started?',
    description:
      'Go to the App, simply connect your Solana wallet, enter your question, select a payment method, and confirm the transaction. The Oracle will give you the answers to your questions',
  },
  {
    title: 'Which wallets are supported?',
    description: 'We currently support two Solana-compatible wallets: Phantom and Solflare',
  },
  { title: 'What payment tokens can I use?', description: 'You can choose SOL for your payment.' },
  {
    title: 'Can I use this service anonymously?',
    description:
      "Yes, your identity is not tied to the readings, as you are using your wallet to access the service. Your questions and the Oracle's answers remain confidential and are not displayed publicly, including within the blockchain.",
  },
  {
    title: 'How to ask questions to the Oracle?',
    description:
      'Please review the segment with the rules. There you will find instructions and tips for using TarotSol AI.',
  },
  {
    title: 'How accurate are the readings?',
    description:
      'While our AI provides insights based on numerology and Tarot symbolism, the accuracy can vary. Tarot readings are meant for guidance, not absolute predictions.',
  },
  {
    title: 'Can I use this platform for fun?',
    description:
      'Absolutely! TarotSol AI is perfect for fun, learning, or seeking insights into life’s questions. Just keep in mind that unserious questions will provide unserious answers',
  },
  {
    title: 'How long does it take to get my reading?',
    description:
      'The reading will appear shortly, in less than 15 seconds, after your transaction is processed. Please be patient during this time.',
  },
  {
    title: 'Is there a limit to how many readings I can do?',
    description: 'There is no set limit, but we recommend pacing yourself to ensure thoughtful questions.',
  },
  {
    title: 'Can I access my past readings or share my readings with others?',
    description:
      'Currently, sharing results or viewing session history cannot be accessed, but this feature is in development. We’re constantly improving our services and adding new features, so stay tuned for updates!',
  },
  {
    title: 'Why Choose Us?',
    description: (
      <div className="text-black">
        {BENEFITS.map((e, idx) => (
          <p key={idx}>
            <span className="font-bold">{e.subtitle}</span> {e.reason}
          </p>
        ))}
      </div>
    ),
  },
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
      <div className="flex h-full min-h-full w-full flex-col justify-between border-black px-[24px] pt-[80px] lg:pl-[140px] lg:pr-[60px]">
        <div className="space-y-8">
          <p className="text-[40px] font-light leading-[48px] max-sm:max-w-[327px] md:text-[60px] md:leading-[72px]">
            Horoscope on X (Twitter) for every day
          </p>
          <div className="w-full md:max-w-[240px]">
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
