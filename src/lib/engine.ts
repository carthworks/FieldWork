import {
  PlanFormState,
  CohortInfo,
  AssessmentResult,
  ScoredTrait,
  StrengthItem,
  FocusItem,
  PhasePlan,
  PlanningHorizon,
  GenerationalPlaybook,
} from '@/types/plan';
import {
  TRAITS,
  INTERESTS,
  ARCHETYPE,
  SECOND,
  STRENGTH,
  FOCUS,
  BLOCKER,
  INTEREST_ACT,
  INTEREST_HABIT,
  ENERGY_LINE,
  LEARN_LINE,
  GOAL_LINE,
  GENERATION_GUIDES,
  GenerationGuideEntry,
} from './constants';

export function calculateAgeFromDob(
  dob?: string,
  fallbackAge?: number | null
): { age: number; birthYear: number } {
  const currentYear = 2026;
  if (!dob) {
    const age = fallbackAge ?? 31;
    return { age, birthYear: currentYear - age };
  }

  const birthDate = new Date(dob);
  if (isNaN(birthDate.getTime())) {
    const age = fallbackAge ?? 31;
    return { age, birthYear: currentYear - age };
  }

  const birthYear = birthDate.getFullYear();
  let age = currentYear - birthYear;
  // Calibrate month/day
  const refDate = new Date('2026-09-14');
  const m = refDate.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && refDate.getDate() < birthDate.getDate())) {
    age--;
  }

  const clampedAge = Math.max(13, Math.min(99, age));
  return { age: clampedAge, birthYear };
}

export function getGenerationGuide(birthYear: number): GenerationGuideEntry {
  const match = GENERATION_GUIDES.find(
    (g) => birthYear >= g.minBirthYear && birthYear <= g.maxBirthYear
  );
  if (match) return match;
  if (birthYear > 2012) return GENERATION_GUIDES[4]; // Gen Alpha
  return GENERATION_GUIDES[3]; // Boomers fallback
}

export function cohort(age: number, birthYear?: number): CohortInfo {
  const year = birthYear ?? 2026 - age;
  const guide = getGenerationGuide(year);
  return {
    band: guide.name,
    years: guide.years,
    myth: guide.stereotype,
  };
}

export function traitBand(score: number): 'high' | 'mid' | 'low' {
  if (score >= 8) return 'high';
  if (score >= 5) return 'mid';
  return 'low';
}

export function phaseLabels(horizon: PlanningHorizon): [string, string, string] {
  if (horizon === 30) return ['Days 1–10', 'Days 11–20', 'Days 21–30'];
  if (horizon === 60) return ['Weeks 1–2', 'Weeks 3–6', 'Weeks 7–8'];
  return ['Month 1', 'Month 2', 'Month 3'];
}

export function generatePlan(state: PlanFormState): AssessmentResult {
  const { age, birthYear } = calculateAgeFromDob(state.dob, state.age);
  const genGuide = getGenerationGuide(birthYear);
  const co = cohort(age, birthYear);

  // Sort traits by value descending, tie-break alphabetically by id
  const sorted = [...TRAITS].sort((a, b) => {
    const valA = state.traits[a.id] ?? 5;
    const valB = state.traits[b.id] ?? 5;
    return valB - valA || a.id.localeCompare(b.id);
  });

  const top = sorted.slice(0, 3);
  const bottom = sorted.slice(-2).reverse();

  const primaryArch = ARCHETYPE[sorted[0].id];
  const secondStreak = SECOND[sorted[1].id];
  const archetypeName = `${primaryArch.n} with ${secondStreak}`;
  const archetypeTagline = primaryArch.l;

  // Scored traits
  const scoredTraits: ScoredTrait[] = sorted.map((t) => {
    const score = state.traits[t.id] ?? 5;
    const band = traitBand(score);
    return {
      ...t,
      score,
      band,
      description: t[band],
    };
  });

  // Strengths
  const strengths: StrengthItem[] = top.map((t) => {
    const st = STRENGTH[t.id];
    return {
      traitId: t.id,
      title: st.t,
      advice: st.s,
    };
  });

  const picks = state.interests || [];
  let interestSynergyText = '';
  if (picks.length > 0) {
    const interestLabels = picks
      .map((id) => INTERESTS.find((i) => i.id === id)?.label.toLowerCase())
      .filter(Boolean)
      .join(', ');
    interestSynergyText = `You have pointed all of this at ${interestLabels}. That is a narrow enough set to make real progress in ${state.horizon} days.`;
  }

  // Focus items
  const focusItems: FocusItem[] = bottom.map((t) => {
    const f = FOCUS[t.id];
    return {
      title: f.t,
      why: f.why,
    };
  });
  const bl = BLOCKER[state.blocker];
  focusItems.push({
    title: bl.t,
    why: bl.why,
  });

  // Nature paragraphs
  const socialV = state.traits.social ?? 5;
  const steadyV = state.traits.steady ?? 5;

  const socialRead =
    socialV >= 7
      ? 'You think out loud and land on the answer in the middle of the sentence, so a day of solo work leaves you flat.'
      : socialV <= 4
      ? 'You process quietly and arrive with the conclusion already formed, which reads as certainty to people who did not see the work.'
      : 'You switch between thinking alone and thinking out loud, and you need a week that has room for both.';

  const natureParagraph1 = `${socialRead} ${ENERGY_LINE[state.energy]}`;

  const steadyRead =
    steadyV >= 7
      ? 'go quiet and functional, which is useful, though people may stop asking how you are'
      : steadyV <= 4
      ? 'feel it immediately and carry it for a while afterwards, so recovery has to be scheduled rather than hoped for'
      : 'hold for a while and then need a genuine break, usually about a day later than you take one';

  const natureParagraph2 = `Under load you ${steadyRead}. New material sticks when ${LEARN_LINE[state.learn]} — so build the plan out of that, not out of whatever a course tells you to do.`;

  // Pace
  const paceDescription =
    state.hours < 3
      ? 'one small action a day'
      : state.hours < 7
      ? 'two or three sessions a week'
      : state.hours < 13
      ? 'a session most days'
      : 'daily blocks with room to go deep';

  // Phases & Actions
  const pl = phaseLabels(state.horizon);

  const phase1Tasks: string[] = [
    bl.acts[0],
    FOCUS[bottom[0].id].acts[0],
    picks[0] ? INTEREST_ACT[picks[0]] : FOCUS[bottom[1].id].acts[0],
  ];

  const phase2Tasks: string[] = [
    FOCUS[bottom[0].id].acts[1],
    FOCUS[bottom[1].id].acts[1],
    picks[1] ? INTEREST_ACT[picks[1]] : bl.acts[1],
  ];

  const phase3Tasks: string[] = [
    FOCUS[bottom[1].id].acts[2],
    bl.acts[1],
    picks[2] ? INTEREST_ACT[picks[2]] : FOCUS[bottom[0].id].acts[2],
  ];

  const phases: PhasePlan[] = [
    {
      label: pl[0],
      title: 'Clear the ground',
      tasks: phase1Tasks.map((text, idx) => ({ id: `p1_t${idx}`, text })),
    },
    {
      label: pl[1],
      title: 'Make it routine',
      tasks: phase2Tasks.map((text, idx) => ({ id: `p2_t${idx}`, text })),
    },
    {
      label: pl[2],
      title: 'Put it in front of someone',
      tasks: phase3Tasks.map((text, idx) => ({ id: `p3_t${idx}`, text })),
    },
  ];

  const habits: string[] = picks
    .slice(0, 3)
    .map((id) => INTEREST_HABIT[id])
    .filter(Boolean)
    .concat(['Ten minutes each Friday: what moved, what stalled']);

  const energyLabel =
    state.energy === 'night' ? 'late at night' : state.energy;

  // Generational Playbook
  const activeThrive =
    state.thriveFactors && state.thriveFactors.length > 0
      ? state.thriveFactors
      : genGuide.defaultThrive;

  const activeNeeds =
    state.leadershipNeeds && state.leadershipNeeds.length > 0
      ? state.leadershipNeeds
      : genGuide.defaultNeeds;

  const playbook: GenerationalPlaybook = {
    generation: genGuide.name,
    years: genGuide.years,
    stereotype: genGuide.stereotype,
    plainTruth: genGuide.plainTruth,
    thriveFactors: activeThrive,
    leadershipNeeds: activeNeeds,
    simpleScript: genGuide.simpleScript,
    leadershipAdvice: genGuide.leadershipAdvice,
  };

  return {
    cohort: co,
    archetypeName,
    archetypeTagline,
    paceDescription,
    scoredTraits,
    strengths,
    interestSynergyText,
    focusItems,
    natureParagraph1,
    natureParagraph2,
    phases,
    habits,
    notes: state.notes,
    horizon: state.horizon,
    goalLabel: GOAL_LINE[state.goal],
    energyLabel,
    userName: state.name || 'Friend',
    age,
    playbook,
  };
}
