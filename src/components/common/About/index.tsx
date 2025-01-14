import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const rules = [
  {
    name: 'Avoid asking the same question repeatedly',
    description:
      'Tarot cards "sense" when a question is repeated too often. If you ask the same question more than four or five times in a day, the cards may start providing distorted answers, creating confusion. Some Tarot readers believe that the cards might even begin to "joke" or deliberately mislead. Limit yourself to one question on a topic every few days or weeks to ensure the answers remain clear and accurate. Be patient and trust the first result.\n',
  },
  {
    name: 'Formulate questions properly',
    description:
      'The way you phrase your question is critical to successful readings. Avoid overly specific or closed questions, for example:\n' +
      'Incorrect: “When will I die?”\n' +
      'Correct: “What changes are ahead in my life?”\n' +
      '\n' +
      '\n' +
      'Incorrect: “How many points will I score on my exam?”\n' +
      'Correct: “How can I prepare effectively to pass my exam?”\n' +
      '\n' +
      '\n' +
      'Incorrect: “When will the war end?”\n' +
      'Correct: “What developments might occur in the current situation soon?”\n' +
      'Cards respond better to open-ended questions focused on predictions or processes.\n',
  },
  {
    name: 'Ask one question at a time',
    description:
      'Avoid double-barreled questions. For example:\n' +
      'Incorrect: “Does my boss admire me, and will I get a raise?”\n' +
      'Correct: First, ask: “Does my boss admire me?” Then: “Will I get a raise?”\n',
  },
  {
    name: 'Avoid questions containing "Or"',
    description:
      'Tarot struggles to provide clear answers to questions with alternatives. Break them into separate inquiries:\n' +
      'Incorrect: “Does she like me or hate me?”\n' +
      'Correct: First, ask: “How does she feel about me?” Then: “Does she hate me?”\n',
  },
  {
    name: 'Avoid using “Should I”\n',
    description:
      'The phrase “should I” makes the question too dependent on subjective interpretation. Reframe the question:\n' +
      'Incorrect: “Should I buy an apartment this month?”\n' +
      'Correct: “What will happen if I buy an apartment this month?”\n' +
      'This approach allows the cards to describe the potential outcomes of your decision.\n',
  },
  {
    name: 'The closer the timeframe, the more accurate the answer\n',
    description:
      'Predictions for the near future (e.g., a day or a week) are more precise than for distant timelines. For instance:\n' +
      'A forecast for tomorrow will yield clearer, actionable advice.\n' +
      'A prediction for the second Monday of 2030 will be vague and uncertain.\n',
  },
  {
    name: 'Avoid reading for deceased people',
    description:
      'Questions about the deceased are considered taboo in Tarot readings. If you have concerns about departed loved ones, it’s better to seek answers through other practices or methods. Tarot focuses on living, current energy.\n',
  },
  {
    name: 'Avoid reading for military personnel',
    description:
      'Questions about military matters are complex and unpredictable. The cards may not provide accurate information or could be misleading. Such inquiries are believed to disrupt the energetic balance.\n',
  },
  {
    name: 'Account for reversed cards',
    description:
      'When working with Tarot, remember that each card can appear in a reversed position. This completely changes its meaning or adds important nuances:\n' +
      'An upright card often indicates active actions or clear events.\n' +
      'A reversed card points to obstacles, hidden influences, or internal struggles.\n',
  },
  {
    name: 'Respect the Tarot reader and their time',
    description:
      'Reading Tarot requires concentration and energy. Be polite, ask clear questions, and avoid trying to "test" the reader with tricky or skeptical inquiries. This creates a negative atmosphere and may influence the results.\n',
  },
  {
    name: 'Don’t expect absolute accuracy\n',
    description:
      'Tarot is a tool for guidance and forecasting, not a definitive roadmap. The cards do not provide 100% accurate predictions but rather describe probabilities and trends that can change based on your actions.\n',
  },
  {
    name: 'Avoid readings when you are emotionally overwhelmed\n',
    description:
      'Strong emotions like anger, fear, or despair can distort the reading. Try to calm yourself and approach the session with a clear mind for the most accurate insights.',
  },
  {
    name: 'Phrase questions neutrally without expecting a specific answer\n',
    description:
      'Avoid leading the cards toward a particular response. For example:\n' +
      'Incorrect: "Why is he such a terrible person?"\n' +
      'Correct: "What are the prospects of our relationship?"\n' +
      'This allows for an unbiased and objective reading.\n',
  },
  {
    name: 'Consider the context of your question',
    description:
      'If you want to understand how to improve a situation, ask open-ended questions instead of seeking simple yes/no answers:\n' +
      'Instead of "Will I get a job?" ask, "What do I need to do to find a job?"\n',
  },
  {
    name: 'Avoid questions about others’ health or lives',
    description:
      "Tarot is not a medical tool or a way to control someone else's life. Avoid asking questions like:\n" +
      '"How much longer will I live?"\n' +
      '"Will my neighbor get sick?"\n' +
      'For such concerns, it’s better to consult doctors or therapists.\n',
  },
  {
    name: 'The cards do not take responsibility for your decisions',
    description:
      'Remember, you are responsible for your actions. Tarot provides guidance, but the final decisions are yours. Do not shift responsibility for your choices onto the cards or the reader.\n',
  },
  {
    name: 'Don’t confuse Tarot with magic or “love spells”\n',
    description:
      'Tarot is a tool for analysis and predictions, not a way to manipulate others. If you want to resolve an issue, focus on yourself rather than trying to control other people.\n',
  },
  {
    name: 'Avoid asking out of idle curiosity',
    description:
      'The cards respond better to serious and mindful questions. If you ask something just for fun or out of boredom, the answers may be vague or unhelpful.\n',
  },
  {
    name: 'Prepare in Advance',
    description:
      'Before the session, think carefully about what you want to know. Prepare specific questions to make the reading more meaningful and productive.',
  },
];

export const AboutSection = () => {
  return (
    <div className="grid w-full grid-rows-[auto_auto] bg-[url('/images/textures/green.png')] bg-repeat font-inknut *:pb-[80px] *:pt-[80px] *:lg:pb-[60px] xl:grid-cols-2">
      <div className="flex h-full min-h-full w-full flex-col justify-between border-black px-[24px] lg:pl-[140px] lg:pr-[100px] xl:border-r">
        <div className="space-y-8">
          <p className="text-[40px] font-light leading-[48px] md:text-[60px] md:leading-[72px]">About Tarot</p>
          <p className="text-[18px] font-light leading-[25px] md:text-[20px] md:leading-[28px]">
            The standard Tarot deck consists of 78 cards divided into two main categories:
          </p>
          <ul className="text-[18px] font-light leading-[25px] md:text-[20px] md:leading-[28px]">
            <li>
              Major Arcana (22 cards) — representing major life lessons, significant events, and profound questions.
            </li>
            <br />
            <li>
              Minor Arcana (56 cards) — reflecting everyday situations, emotions, and actions, divided into four suits:
              Wands, Cups, Swords, and Pentacles.
            </li>
          </ul>

          <p className="text-[18px] font-light leading-[25px] md:text-[20px] md:leading-[28px]">
            Each card has an upright and reversed meaning. A reversed card can dramatically change the interpretation or
            offer additional nuances.{' '}
          </p>

          <p className="text-[18px] font-light leading-[25px] md:text-[20px] md:leading-[28px]">
            TarotSol AI combines traditional Tarot reading techniques with artificial intelligence and blockchain to
            provide personalized insights based on your questions.
          </p>

          <p className="text-[18px] font-light leading-[25px] md:text-[20px] md:leading-[28px]">
            We blend the ancient art of numerology with modern AI and blockchain technologies to provide personalized
            Tarot reading, using your unique transaction ID and wallet address to generate a one-of-a-kind numerological
            signature that selects your cards, while our AI Oracle interprets them to provide clear and insightful
            guidance.
          </p>

          <p className="text-[18px] font-light leading-[25px] md:text-[20px] md:leading-[28px]">
            The card selection process within TarotSol is not just random generation like in other products but carries
            a kind of &#34;fateful&#34; significance. The transaction hash is assigned to you by the blockchain itself,
            as is your wallet&#39;s public address — making the outcome entirely beyond anyone&#39;s influence. The
            blockchain weaves the threads of fate.
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

        <p className="text-[18px] font-light leading-[25px] md:text-[20px] md:leading-[28px]">
          By following these recommendations, you’ll be able to receive accurate and insightful answers from Tarot cards
          while maintaining their sincerity and objectivity.
        </p>

        <div className="flex w-full max-w-full flex-row justify-between overflow-x-auto *:h-[248px] *:w-[173px] max-md:gap-6 2xl:*:h-[310px] 2xl:*:w-[217px]">
          <img src="/images/libra-card.png" alt="tarot1" />
          <img src="/images/libra-card.png" alt="tarot2" />
          <img src="/images/libra-card.png" alt="tarot3" />
        </div>

        <Accordion type="single" collapsible>
          {rules.map((e, i) => (
            <AccordionItem value={`item-${i}`} key={i}>
              <AccordionTrigger>{e.name}</AccordionTrigger>
              <AccordionContent>
                <pre className="text-wrap">{e.description}</pre>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};
