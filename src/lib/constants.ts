import {
  TraitDefinition,
  InterestDefinition,
  TraitId,
  BlockerType,
  EnergyTime,
  GoalType,
  LearningStyle,
  PlanFormState,
  PersonaPreset,
} from '@/types/plan';

export const TRAITS: TraitDefinition[] = [
  {
    id: 'curiosity',
    name: 'Curiosity',
    lo: 'Stick with what I know',
    hi: 'Chase new things',
    high: 'You go looking for new input before anyone asks you to.',
    mid: "You explore when there's a reason to, not by reflex.",
    low: "You'd rather go deeper on what you already know than chase the next thing.",
  },
  {
    id: 'follow',
    name: 'Follow-through',
    lo: 'Improvise as I go',
    hi: 'Finish what I start',
    high: 'Once something is on your list it gets done, on time, without reminders.',
    mid: 'You finish what matters and let the rest quietly lapse.',
    low: 'Starting is easy for you. Landing the last twenty percent is the hard part.',
  },
  {
    id: 'social',
    name: 'Social energy',
    lo: 'Recharge alone',
    hi: 'Recharge around people',
    high: 'People give you energy. A day without them flattens you.',
    mid: 'You can work a room or a quiet afternoon, and you need both.',
    low: 'You do your best thinking alone, and crowded days cost you more than you admit.',
  },
  {
    id: 'read',
    name: 'Reading people',
    lo: 'Focus on the task',
    hi: 'Track the room',
    high: "You pick up what isn't being said, usually before the conversation catches up.",
    mid: "You read people well when you're paying attention to it.",
    low: "You work from what's stated. Subtext often has to be spelled out for you.",
  },
  {
    id: 'steady',
    name: 'Steadiness under pressure',
    lo: 'Feel it sharply',
    hi: 'Stay level',
    high: 'Pressure barely moves your baseline. Others use you as the thermometer.',
    mid: 'You wobble under real pressure and get back to level fairly quickly.',
    low: 'Pressure lands hard on you, and it takes a while to shake off afterwards.',
  },
  {
    id: 'drive',
    name: 'Appetite for challenge',
    lo: 'Protect what works',
    hi: 'Push for more',
    high: 'You get restless in a role about six months before anyone expects you to.',
    mid: "You'll take on a stretch when it's offered, without hunting for one.",
    low: "You value a steady, well-run patch over the next rung, and that's a position, not a flaw.",
  },
];

export const INTERESTS: InterestDefinition[] = [
  { id: 'lead', label: 'Leading people' },
  { id: 'craft', label: 'Technical craft' },
  { id: 'write', label: 'Writing & speaking' },
  { id: 'money', label: 'Money & investing' },
  { id: 'health', label: 'Health & fitness' },
  { id: 'create', label: 'Creative work' },
  { id: 'study', label: 'Study & research' },
  { id: 'venture', label: 'Starting something' },
  { id: 'people', label: 'Relationships' },
  { id: 'calm', label: 'Focus & calm' },
];

export interface GenerationGuideEntry {
  key: string;
  name: string;
  years: string;
  minBirthYear: number;
  maxBirthYear: number;
  stereotype: string;
  plainTruth: string;
  defaultThrive: string[];
  defaultNeeds: string[];
  simpleScript: string;
  leadershipAdvice: string;
}

export const GENERATION_GUIDES: GenerationGuideEntry[] = [
  {
    key: 'gen_z',
    name: 'Gen Z',
    years: '1997–2012',
    minBirthYear: 1997,
    maxBirthYear: 2012,
    stereotype: 'Distracted. Entitled. Impatient.',
    plainTruth: 'You are fast, direct, and want work that actually makes sense. You don\'t need micromanagement—you need clarity and trust.',
    defaultThrive: ['Clear expectations', 'Fast feedback', 'Flexibility'],
    defaultNeeds: [
      'Explain the reason behind the work',
      'Give feedback while it is still useful',
      'Give ownership, not constant oversight',
    ],
    simpleScript: '"I do my best work when I know the big picture why, have room to own the solution, and get quick check-ins rather than waiting weeks for feedback."',
    leadershipAdvice: 'Lead with purpose and context. Tell them the outcome you want, agree on checkpoints, and step out of the weeds.',
  },
  {
    key: 'millennials',
    name: 'Millennials',
    years: '1981–1996',
    minBirthYear: 1981,
    maxBirthYear: 1996,
    stereotype: 'Needy or Job-Hopping.',
    plainTruth: 'You care deeply about meaningful impact, growth, and team cohesion. You value mentorship over top-down commands.',
    defaultThrive: ['Collaboration', 'Purpose', 'Balance'],
    defaultNeeds: [
      'Connecting work to impact',
      'Making room for ideas',
      'Coaching, not just managing',
    ],
    simpleScript: '"I thrive when I can collaborate openly, understand how my work moves the needle, and have a manager who coaches my skills rather than just hands out tasks."',
    leadershipAdvice: 'Involve them in problem-solving. Ask for their input early and show them where their contributions directly help customers or the mission.',
  },
  {
    key: 'gen_x',
    name: 'Gen X',
    years: '1965–1980',
    minBirthYear: 1965,
    maxBirthYear: 1980,
    stereotype: 'Skeptical or Disengaged.',
    plainTruth: 'You are self-reliant, highly capable, and fiercely protective of time and practical results. You don\'t need fluff—you need autonomy.',
    defaultThrive: ['Independence', 'Efficiency', 'Competence'],
    defaultNeeds: [
      'Trusting them to deliver',
      'Keeping meetings useful',
      'Respecting their time',
    ],
    simpleScript: '"Give me the target, trust me to execute, and keep meetings focused on decisions. I deliver best when given autonomy."',
    leadershipAdvice: 'Respect their independence. Avoid endless status meetings; communicate efficiently and trust their track record.',
  },
  {
    key: 'boomers',
    name: 'Boomers',
    years: '1946–1964',
    minBirthYear: 1946,
    maxBirthYear: 1964,
    stereotype: 'Rigid or Resistant.',
    plainTruth: 'You bring deep institutional wisdom, stability, and tested loyalty. You appreciate respect for craftsmanship and clear dialogue.',
    defaultThrive: ['Experience', 'Loyalty', 'Stability'],
    defaultNeeds: [
      'Drawing on their experience',
      'Involving them in decisions',
      'Showing respect for what they know',
    ],
    simpleScript: '"I bring hard-won experience and steady consistency. Involve me early in big decisions and let me help mentor the team."',
    leadershipAdvice: 'Tap into their experience. When rolling out changes, consult them directly and acknowledge the solid foundation they have built.',
  },
  {
    key: 'gen_alpha',
    name: 'Gen Alpha',
    years: '2013 and later',
    minBirthYear: 2013,
    maxBirthYear: 2030,
    stereotype: 'Screen-addicted with no patience.',
    plainTruth: 'You learn through instant interactive feedback, visual models, and fluid technological tools.',
    defaultThrive: ['Interactive learning', 'Visual feedback', 'Digital fluency'],
    defaultNeeds: [
      'Rapid prototype cycles',
      'Hands-on problem solving',
      'Clear, direct challenges',
    ],
    simpleScript: '"I learn fastest by experimenting hands-on and seeing immediate outcomes."',
    leadershipAdvice: 'Keep tasks modular, interactive, and visually clear with concrete short-term milestones.',
  },
];

export const DEFAULT_PLAN_STATE: PlanFormState = {
  name: '',
  dob: '1995-06-15',
  age: 31,
  role: 'ic',
  hours: 5,
  energy: 'morning',
  traits: {
    curiosity: 7,
    follow: 6,
    social: 5,
    read: 6,
    steady: 6,
    drive: 7,
  },
  interests: ['craft', 'write', 'venture'],
  goal: 'promo',
  blocker: 'time',
  learn: 'doing',
  horizon: 60,
  notes: '',
  thriveFactors: ['Collaboration', 'Purpose', 'Balance'],
  leadershipNeeds: [
    'Connecting work to impact',
    'Making room for ideas',
    'Coaching, not just managing',
  ],
  reverseProbes: {
    curiosity_probe: 3,
    steady_probe: 3,
  },
  peerReview: null,
};

export interface ForcedChoiceOption {
  id: string;
  label: string;
  score: number;
  tagline: string;
}

export interface ForcedChoiceDefinition {
  traitId: TraitId;
  title: string;
  scenario: string;
  options: [ForcedChoiceOption, ForcedChoiceOption];
}

export const FORCED_CHOICE_PAIRS: Record<'follow' | 'drive', ForcedChoiceDefinition> = {
  follow: {
    traitId: 'follow',
    title: 'Follow-Through Dilemma',
    scenario: 'When a critical project stalls or drags into messy friction...',
    options: [
      {
        id: 'restart',
        label: 'Scrap & Restart Fresh',
        score: 3,
        tagline: "I'd rather scrap stalled work and start fresh than grind through the ugly last 20%.",
      },
      {
        id: 'finish_badly',
        label: 'Finish It Badly',
        score: 9,
        tagline: "I'd rather push through and finish it badly than ever leave it half-done on the table.",
      },
    ],
  },
  drive: {
    traitId: 'drive',
    title: 'Challenge & Ambition Dilemma',
    scenario: 'When given full autonomy over your quarterly focus...',
    options: [
      {
        id: 'fortify',
        label: 'Fortify What Works',
        score: 3,
        tagline: "I'd rather master, optimize, and stabilize a proven domain without risking public failure.",
      },
      {
        id: 'stretch',
        label: 'Push Into the Deep End',
        score: 9,
        tagline: "I'd rather chase an ambiguous, high-stakes stretch even if there is a real chance of falling short.",
      },
    ],
  },
};

export interface ReverseProbeDefinition {
  id: 'curiosity_probe' | 'steady_probe';
  targetTrait: TraitId;
  statement: string;
  rationale: string;
}

export const REVERSE_PROBES: ReverseProbeDefinition[] = [
  {
    id: 'curiosity_probe',
    targetTrait: 'curiosity',
    statement:
      'In high-stakes work, I strongly prefer proven, standard operating procedures over experimenting with unproven methods.',
    rationale:
      'Tests if high self-rated curiosity holds when real delivery consequences exist.',
  },
  {
    id: 'steady_probe',
    targetTrait: 'steady',
    statement:
      'Unexpected emergencies or harsh critique throw off my mental focus for the remainder of the workday.',
    rationale:
      'Tests if self-rated steadiness reflects actual recovery speed under stress.',
  },
];

export const ARCHETYPE: Record<TraitId, { n: string; l: string }> = {
  curiosity: {
    n: 'The Scout',
    l: 'You find the next thing early and bring it back before anyone else notices it exists.',
  },
  follow: {
    n: 'The Closer',
    l: 'Work that reaches you gets finished, which is rarer than you think it is.',
  },
  social: {
    n: 'The Connector',
    l: 'You move things by moving people, and the room warms up when you show up.',
  },
  read: {
    n: 'The Reader',
    l: 'You hear the thing under the sentence and act on it before it becomes a problem.',
  },
  steady: {
    n: 'The Anchor',
    l: 'When the week goes sideways, people check your face to work out how bad it is.',
  },
  drive: {
    n: 'The Climber',
    l: 'You are always halfway up the next thing, and standing still costs you real energy.',
  },
};

export const SECOND: Record<TraitId, string> = {
  curiosity: 'a restless streak',
  follow: 'a finishing streak',
  social: 'an outward streak',
  read: 'a diplomatic streak',
  steady: 'a calm streak',
  drive: 'a competitive streak',
};

export const STRENGTH: Record<TraitId, { t: string; s: string }> = {
  curiosity: {
    t: 'You spot things early',
    s: 'Give yourself the scanning time deliberately — it is work, not procrastination.',
  },
  follow: {
    t: 'You close loops',
    s: 'Say yes to fewer things, because everything you accept genuinely gets done.',
  },
  social: {
    t: 'You move people',
    s: 'Put yourself where decisions get made out loud, not over email.',
  },
  read: {
    t: 'You read the room',
    s: 'Trust the read enough to name it in the meeting, not after it.',
  },
  steady: {
    t: 'You hold under load',
    s: 'Volunteer for the messy problem. Few people can sit in one without flinching.',
  },
  drive: {
    t: 'You raise the ceiling',
    s: 'Aim at work with a visible edge, or you will invent one out of boredom.',
  },
};

export const FOCUS: Record<
  TraitId,
  { t: string; why: string; acts: [string, string, string] }
> = {
  curiosity: {
    t: 'Widen the input',
    why: 'You run on what you already know, which is efficient right up to the day the ground shifts.',
    acts: [
      'Read one thing outside your field each week and write three lines on it',
      'Ask one person outside your team what they are working on',
      'Try one tool you have been ignoring, for one real task',
    ],
  },
  follow: {
    t: 'Land the last twenty percent',
    why: 'Starting is not your problem. Things stall at ninety percent, where the boring part lives.',
    acts: [
      'Pick one stalled thing and finish it this week, badly if needed',
      'Cap yourself at three open projects and close one before starting a fourth',
      'Write the definition of done before you start, not after',
    ],
  },
  social: {
    t: 'Be seen more often',
    why: "Good work done quietly gets counted late, and sometimes gets counted as someone else's.",
    acts: [
      'Send a short note on what you shipped to one person who should know',
      'Speak once in the first ten minutes of every meeting',
      'Book one conversation a fortnight with someone outside your immediate circle',
    ],
  },
  read: {
    t: 'Check your read out loud',
    why: 'You work from what is stated, so the unstated half of a conversation goes past you.',
    acts: [
      'End one conversation a week with: here is what I think you need, correct me',
      'Ask one clarifying question before you argue a point',
      'Notice who stayed quiet in a meeting and follow up with them',
    ],
  },
  steady: {
    t: 'Build a recovery routine',
    why: 'Pressure lands hard on you and the recovery is currently left to chance.',
    acts: [
      'Name the hard hour of your day and protect the hour after it',
      'Write the thing you are dreading in one sentence before you sleep',
      'Do one physical thing after a bad day, before you replay it',
    ],
  },
  drive: {
    t: 'Aim at something with an edge',
    why: 'You are protecting a steady patch. That works until the patch stops teaching you anything.',
    acts: [
      'Name one thing you would be slightly unqualified to do, and ask for it',
      'Set one target you are not sure you can hit',
      'Put a date on the thing you keep saying you will do eventually',
    ],
  },
};

export const BLOCKER: Record<
  BlockerType,
  { t: string; why: string; acts: [string, string] }
> = {
  time: {
    t: 'Time is not the real constraint',
    why: 'Time gets spent on what is already scheduled, so nothing new survives unless it gets a slot.',
    acts: [
      'Block two named hours in the calendar this week and defend them',
      'Cut one recurring commitment that no longer earns its place',
    ],
  },
  focus: {
    t: 'Protect the start of the work',
    why: 'You drift at the point where the work stops being new, which is a predictable moment you can plan for.',
    acts: [
      'Work in 25-minute blocks with the phone in another room',
      'Stop each session mid-sentence so restarting is easy',
    ],
  },
  judged: {
    t: 'Lower the cost of being seen',
    why: 'Holding back is cheap in the moment and expensive over a year.',
    acts: [
      'Publish or send one unfinished thing to one safe person',
      'Say the half-formed thought in a meeting once a week',
    ],
  },
  plan: {
    t: 'Make the next step embarrassingly small',
    why: 'The plan stalls because the next step is a project, not an action.',
    acts: [
      "Write tomorrow's first action tonight, in one line",
      'Break any task longer than two hours into named pieces',
    ],
  },
  energy: {
    t: 'Match the work to your energy',
    why: 'You are putting your hardest work in your worst hours and calling it a discipline problem.',
    acts: [
      'Move the demanding work into your clearest window',
      'Put one non-negotiable sleep or movement anchor in the week',
    ],
  },
  finish: {
    t: 'Finish before you start',
    why: 'Unfinished things accumulate quietly and each one takes a little attention with it.',
    acts: [
      'List everything half-done, then kill two of them outright',
      'Ship one thing to a real audience this month',
    ],
  },
};

export const INTEREST_ACT: Record<string, string> = {
  lead: 'Run one meeting differently — decision first, discussion second',
  craft: 'Rebuild one thing you already made, properly this time',
  write: 'Write 300 words a week on what you are learning and send it somewhere',
  money: 'Put one hour into the numbers you have been avoiding',
  health: 'Fix one input: sleep, steps or food. Only one.',
  create: 'Make one small finished thing a fortnight, start to end',
  study: 'Work one hard chapter with the book shut afterwards',
  venture: 'Talk to three people who would pay for it before building more',
  people: 'Reach out to one person you have let drift',
  calm: 'Take twenty minutes a day with no screen and no input',
};

export const INTEREST_HABIT: Record<string, string> = {
  lead: 'One coaching conversation a week',
  craft: 'A weekly deep-work block',
  write: 'Friday writing hour',
  money: 'Monthly money review',
  health: 'Three movement days a week',
  create: 'A fortnightly finished piece',
  study: 'Four study blocks a week',
  venture: 'Two customer conversations a week',
  people: 'One real conversation a week',
  calm: 'Daily twenty quiet minutes',
};

export const ENERGY_LINE: Record<EnergyTime, string> = {
  morning:
    'Your clearest thinking happens early, so anything that matters should meet the day before the day meets you.',
  midday:
    'You warm up rather than start hot. Guard late morning and stop scheduling meetings into it.',
  evening:
    'Your best hours arrive after most people have stopped. Build the plan around evenings instead of fighting for mornings.',
  night:
    'You do your real work late. That is workable, as long as the mornings after are not also load-bearing.',
};

export const LEARN_LINE: Record<LearningStyle, string> = {
  doing: 'you build with it',
  reading: 'you read and take notes on it',
  teaching: 'you explain it to someone else',
  watching: 'you watch it done once first',
};

export const GOAL_LINE: Record<GoalType, string> = {
  promo: 'take on more scope',
  switch: 'move into different work',
  build: 'build something of your own',
  lead: 'lead people better',
  skill: 'get properly good at a hard skill',
  health: 'feel healthier and steadier',
  consistent: 'become consistent',
};

export const PERSONA_PRESETS: PersonaPreset[] = [
  {
    id: 'senior_ic',
    name: 'Senior IC → Lead',
    tagline: 'Moving from individual maker to team multiplier without losing technical craft.',
    icon: '🛠️',
    state: {
      name: 'Alex',
      dob: '1992-04-12',
      age: 34,
      role: 'lead',
      hours: 6,
      energy: 'morning',
      traits: {
        curiosity: 7,
        follow: 8,
        social: 7,
        read: 8,
        steady: 7,
        drive: 8,
      },
      interests: ['lead', 'craft', 'write'],
      goal: 'promo',
      blocker: 'time',
      learn: 'doing',
      horizon: 60,
      thriveFactors: ['Autonomy', 'Collaboration', 'Clear goals'],
      leadershipNeeds: [
        'Coaching, not just managing',
        'Connecting work to impact',
        'Making room for ideas',
      ],
      reverseProbes: { curiosity_probe: 2, steady_probe: 2 },
    },
  },
  {
    id: 'founder_burnout',
    name: 'Founder in Burnout',
    tagline: 'Rebuilding focus, non-negotiable health anchors, and shipping momentum.',
    icon: '🔥',
    state: {
      name: 'Morgan',
      dob: '1988-11-20',
      age: 37,
      role: 'founder',
      hours: 10,
      energy: 'night',
      traits: {
        curiosity: 9,
        follow: 5,
        social: 6,
        read: 6,
        steady: 4,
        drive: 9,
      },
      interests: ['venture', 'create', 'calm'],
      goal: 'build',
      blocker: 'finish',
      learn: 'doing',
      horizon: 30,
      thriveFactors: ['Independence', 'Flexibility', 'Speed'],
      leadershipNeeds: [
        'Trusting them to deliver',
        'Respecting their time',
        'Keeping meetings useful',
      ],
      reverseProbes: { curiosity_probe: 2, steady_probe: 4 },
    },
  },
  {
    id: 'gen_z_climber',
    name: 'Gen Z Fast-Track',
    tagline: 'Rapid skill acquisition, proactive ownership, and high visibility early in career.',
    icon: '⚡',
    state: {
      name: 'Taylor',
      dob: '2001-08-14',
      age: 25,
      role: 'early',
      hours: 8,
      energy: 'midday',
      traits: {
        curiosity: 9,
        follow: 6,
        social: 7,
        read: 5,
        steady: 6,
        drive: 9,
      },
      interests: ['craft', 'study', 'venture'],
      goal: 'skill',
      blocker: 'plan',
      learn: 'doing',
      horizon: 90,
      thriveFactors: ['Fast feedback', 'Flexibility', 'Purpose'],
      leadershipNeeds: [
        'Give ownership, not constant oversight',
        'Regular feedback, not silence',
        'Clarity over bureaucracy',
      ],
      reverseProbes: { curiosity_probe: 1, steady_probe: 2 },
    },
  },
  {
    id: 'deep_specialist',
    name: 'Deep-Work Specialist',
    tagline: 'Mastering hard technical domains while shielding deep flow state from noise.',
    icon: '🔬',
    state: {
      name: 'Sam',
      dob: '1995-02-18',
      age: 31,
      role: 'ic',
      hours: 12,
      energy: 'morning',
      traits: {
        curiosity: 8,
        follow: 8,
        social: 3,
        read: 4,
        steady: 8,
        drive: 7,
      },
      interests: ['craft', 'study', 'calm'],
      goal: 'skill',
      blocker: 'focus',
      learn: 'reading',
      horizon: 60,
      thriveFactors: ['Focus', 'Independence', 'Competence'],
      leadershipNeeds: [
        'Keeping meetings useful',
        'Trusting them to deliver',
        'Respecting their time',
      ],
      reverseProbes: { curiosity_probe: 2, steady_probe: 2 },
    },
  },
  {
    id: 'cross_director',
    name: 'Cross-Gen Director',
    tagline: 'Bridging senior stakeholders, generational cultures, and steady execution.',
    icon: '🧭',
    state: {
      name: 'Elena',
      dob: '1979-05-30',
      age: 47,
      role: 'lead',
      hours: 6,
      energy: 'morning',
      traits: {
        curiosity: 6,
        follow: 8,
        social: 8,
        read: 9,
        steady: 8,
        drive: 7,
      },
      interests: ['lead', 'people', 'venture'],
      goal: 'lead',
      blocker: 'energy',
      learn: 'teaching',
      horizon: 90,
      thriveFactors: ['Efficiency', 'Competence', 'Autonomy'],
      leadershipNeeds: [
        'Respecting their time',
        'Involving them in decisions',
        'Trusting them to deliver',
      ],
      reverseProbes: { curiosity_probe: 3, steady_probe: 2 },
    },
  },
];

