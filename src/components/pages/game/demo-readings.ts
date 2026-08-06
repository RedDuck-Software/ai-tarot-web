import { type TarotCard } from '@/types/tarot';

export type DemoReading = {
  question: string;
  answer: string;
  tarots: TarotCard[];
};

type DemoReadingFixture = readonly [
  question: string,
  answer: string,
  cards: readonly [id: number, reverted: boolean][],
];

const demoReadingFixtures: DemoReadingFixture[] = [
  [
    'What should I focus on in love this week?',
    'The cards point to a softer conversation that has been waiting for the right moment. Lead with honesty, keep the tone light, and let the other person meet you halfway.',
    [
      [6, false],
      [17, false],
      [32, true],
    ],
  ],
  [
    'Is now a good time to change jobs?',
    'A change is possible, but the reading favors preparation before a leap. Update your materials, ask one practical question in every interview, and avoid choosing only from impatience.',
    [
      [1, false],
      [35, false],
      [58, true],
    ],
  ],
  [
    'How can I improve my finances this month?',
    'The strongest signal is small control repeated daily. Review recurring expenses, protect one savings goal, and say no to purchases that are really stress relief in disguise.',
    [
      [4, false],
      [64, true],
      [73, false],
    ],
  ],
  [
    'What energy surrounds my current relationship?',
    'There is warmth here, but also a need for clearer expectations. The cards suggest naming what you want directly instead of hoping the mood will explain it for you.',
    [
      [2, false],
      [10, false],
      [47, true],
    ],
  ],
  [
    'What is blocking my next career step?',
    'The block looks less like talent and more like visibility. Share the work, ask for the room, and let one trusted person know exactly what opportunity you want next.',
    [
      [7, false],
      [21, true],
      [55, false],
    ],
  ],
  [
    'Should I invest more time in my side project?',
    'Yes, if you make the commitment measurable. The cards favor two focused sessions over vague ambition, especially if the project can teach you something useful even before it pays.',
    [
      [14, false],
      [31, false],
      [69, true],
    ],
  ],
  [
    'What should I know before making a big purchase?',
    'Pause for the hidden cost. The reading advises comparing maintenance, time, and emotional pressure, not just price. A slower decision brings a cleaner yes or no.',
    [
      [12, true],
      [40, false],
      [76, false],
    ],
  ],
  [
    'Will communication improve with someone I miss?',
    'There is a path back to contact, but it asks for calm timing. Send one honest message without asking for an immediate outcome, then let silence have room to answer.',
    [
      [18, false],
      [22, true],
      [41, false],
    ],
  ],
  [
    'What is the lesson in my current work stress?',
    'The lesson is boundary before burnout. The cards ask you to separate urgent from important, document what is being asked, and stop carrying invisible work alone.',
    [
      [9, false],
      [27, true],
      [70, false],
    ],
  ],
  [
    'What opportunity am I not seeing?',
    'Look near an old contact or unfinished idea. Something you already began can become useful again when repackaged with more confidence and a clearer ask.',
    [
      [0, false],
      [25, false],
      [62, true],
    ],
  ],
  [
    'How do I attract healthier love?',
    'The reading points to consistency. Choose people whose actions match their words, and let attraction grow beside peace instead of confusing intensity for truth.',
    [
      [3, false],
      [24, true],
      [57, false],
    ],
  ],
  [
    'What should I release to earn more?',
    'Release the habit of underpricing your time. The cards favor a cleaner offer, a firmer rate, and one direct conversation with someone who can actually say yes.',
    [
      [15, true],
      [34, false],
      [75, false],
    ],
  ],
  [
    'Is this business idea worth pursuing?',
    'The idea has life, but it needs proof. Test one narrow version with real people before polishing the whole vision. Feedback is the doorway, not the verdict.',
    [
      [8, false],
      [38, false],
      [66, true],
    ],
  ],
  [
    'What is my next best move after a breakup?',
    'Choose restoration over analysis. The cards recommend rebuilding rhythm, protecting your sleep, and postponing final conclusions until your nervous system feels like yours again.',
    [
      [13, false],
      [28, false],
      [72, true],
    ],
  ],
  [
    'How can I handle conflict at work?',
    'Bring facts, not heat. The reading supports a concise conversation, written follow-up, and a practical proposal that makes the next step easy to accept.',
    [
      [11, false],
      [44, true],
      [61, false],
    ],
  ],
  [
    'Should I trust this new opportunity?',
    'Trust it slowly. The cards show promise, but they also ask for details in writing. Enthusiasm is welcome; due diligence is the protection around it.',
    [
      [19, false],
      [30, true],
      [54, false],
    ],
  ],
  [
    'What do I need to hear about money?',
    'Money wants structure from you, not fear. A simple weekly review will reveal where your energy leaks and where a small increase can become realistic.',
    [
      [5, false],
      [46, false],
      [68, true],
    ],
  ],
  [
    'What is hidden in my current situation?',
    'Someone may be acting from uncertainty rather than opposition. Ask one clarifying question before reacting. The truth is likely less dramatic and more useful than it first appears.',
    [
      [16, true],
      [33, false],
      [59, false],
    ],
  ],
  [
    'How can I make a better decision?',
    'Reduce the decision to one value you refuse to betray. The cards suggest that once this value is named, the noisier options lose much of their pull.',
    [
      [20, false],
      [37, false],
      [65, true],
    ],
  ],
  [
    'What should I do if I feel stuck?',
    'Move the smallest piece first. The reading favors a practical errand, a clear list, and one message sent today. Momentum returns through contact with reality.',
    [
      [23, true],
      [42, false],
      [71, false],
    ],
  ],
  [
    'What does my future self want me to know?',
    'Your future self is less worried about perfect timing than honest direction. Start before certainty arrives, and keep choosing the path that makes you more awake.',
    [
      [26, false],
      [39, true],
      [77, false],
    ],
  ],
  [
    'How can I rebuild confidence?',
    'Confidence returns through kept promises. Make them small enough to honor daily, and let evidence accumulate before asking your feelings to believe again.',
    [
      [29, false],
      [45, false],
      [63, true],
    ],
  ],
  [
    'Is this person serious about me?',
    'Look at consistency, not intensity. The cards suggest the answer is visible in follow-through, especially around plans, timing, and how they respond when things are inconvenient.',
    [
      [6, false],
      [36, true],
      [60, false],
    ],
  ],
  [
    'What is the best way to negotiate salary?',
    'Lead with evidence and a clean number. The cards favor preparation, market context, and silence after the ask. Do not explain away your own value.',
    [
      [4, false],
      [49, false],
      [67, true],
    ],
  ],
  [
    'What should I prioritize this week?',
    'Prioritize the task that makes other tasks lighter. The reading points to one structural fix, one honest conversation, and one evening protected for rest.',
    [
      [14, false],
      [50, true],
      [74, false],
    ],
  ],
  [
    'How do I move on from doubt?',
    'Do not argue with doubt all day. Give it a notebook, a deadline, and a next action. The cards favor motion with humility over waiting for perfect confidence.',
    [
      [17, false],
      [43, true],
      [52, false],
    ],
  ],
  [
    'Will my hard work pay off?',
    'Yes, but the payoff may arrive through refinement rather than force. Improve the part people actually see, and make it easier for others to understand your value.',
    [
      [21, false],
      [48, false],
      [56, true],
    ],
  ],
  [
    'What does this friendship need?',
    'It needs a more honest rhythm. Reach out without performance, name what you miss, and allow the connection to become simpler than it used to be.',
    [
      [2, false],
      [51, true],
      [53, false],
    ],
  ],
  [
    'What is the risk if I wait too long?',
    'The risk is not losing everything; it is training yourself to ignore your own clarity. The cards ask for one visible step before the week closes.',
    [
      [0, false],
      [16, true],
      [31, false],
    ],
  ],
  [
    'What should I ask the oracle today?',
    'Ask where your energy is being spent without consent. The answer will likely point to a habit, obligation, or fear that has been quietly setting your schedule.',
    [
      [9, false],
      [18, false],
      [64, true],
    ],
  ],
  [
    'What is coming next in my career?',
    'A useful opening appears through a practical problem you already know how to solve. Say yes to responsibility that increases leverage, not just busyness.',
    [
      [7, false],
      [35, true],
      [70, false],
    ],
  ],
  [
    'How can I feel more secure in love?',
    'Security grows when you stop auditioning for care. The cards favor mutual effort, calm requests, and choosing people who do not make peace feel boring.',
    [
      [3, false],
      [10, true],
      [19, false],
    ],
  ],
];

const demoReadings = demoReadingFixtures.map<DemoReading>(([question, answer, cards]) => ({
  question,
  answer,
  tarots: cards.map(([id, reverted]) => ({ id, reverted })),
}));

export const getRandomDemoReading = () => demoReadings[Math.floor(Math.random() * demoReadings.length)];
