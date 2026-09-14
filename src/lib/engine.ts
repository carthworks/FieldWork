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
  TraitId,
  SignalQualityReport,
  PerceptionGap,
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

  const signalQuality = calculateSignalQuality(state.traits, state.reverseProbes);

  const peerReview = state.peerReview || null;
  const perceptionGaps = peerReview
    ? calculatePerceptionGaps(state.traits, peerReview.traits, peerReview.peerName)
    : undefined;

  return {
    cohort: co,
    archetypeName,
    archetypeTagline,
    paceDescription,
    scoredTraits,
    traits: state.traits,
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
    signalQuality,
    peerReview,
    perceptionGaps,
  };
}

export function calculateSignalQuality(
  traits: Record<TraitId, number>,
  reverseProbes?: Partial<Record<'curiosity_probe' | 'steady_probe', number>>
): SignalQualityReport {
  const vals = Object.values(traits);
  const mean = vals.reduce((a, b) => a + b, 0) / (vals.length || 1);
  const variance =
    vals.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / (vals.length || 1);
  const stdDev = Math.sqrt(variance);

  // Check straight-lining: all in [5, 7] or identical
  const allInMidZone = vals.every((v) => v >= 5 && v <= 7);
  const isIdentical = vals.every((v) => v === vals[0]);
  const straightLined = isIdentical || (allInMidZone && stdDev <= 0.85);

  const details: string[] = [];

  // Check reverse probes for internal consistency
  let hasDiscrepancy = false;
  if (reverseProbes) {
    if ((traits.curiosity ?? 5) >= 8 && (reverseProbes.curiosity_probe ?? 0) >= 4) {
      hasDiscrepancy = true;
      details.push(
        `Curiosity Tension: You rated Curiosity at ${traits.curiosity}/10, but noted a strong preference for standard operating procedures when stakes are high.`
      );
    }
    if ((traits.steady ?? 5) >= 8 && (reverseProbes.steady_probe ?? 0) >= 4) {
      hasDiscrepancy = true;
      details.push(
        `Steadiness Tension: You rated Pressure Steadiness at ${traits.steady}/10, but noted unexpected fires disrupt your mental focus for the entire workday.`
      );
    }
  }

  if (straightLined) {
    details.push(
      `Straight-Lining Detected: All 6 traits are clustered in the safe 5–7 mid-zone (StdDev: ${stdDev.toFixed(
        2
      )}).`
    );
    return {
      status: 'straight_lined',
      variance,
      mean,
      straightLined: true,
      hasDiscrepancy,
      message:
        'Signal Quality Alert: Flat Mid-Zone Clustering (Straight-Lining). You rated all six traits in the safe 5–7 middle zone. A development plan built on flat noise produces generic advice.',
      actionPrompt:
        'Push your actual extremes. Where are you truly in your element (8–10), and where do you hit genuine friction (1–4)? Real contrast unlocks high-confidence archetypes and blindspots.',
      details,
    };
  }

  if (hasDiscrepancy) {
    return {
      status: 'discrepant',
      variance,
      mean,
      straightLined: false,
      hasDiscrepancy: true,
      message:
        'Calibration Gap Detected: Your rated trait strengths show meaningful tension with your behavioral probe responses.',
      actionPrompt:
        'Consider whether your high self-ratings reflect how you aspire to operate vs. how you actually behave under delivery pressure.',
      details,
    };
  }

  if (stdDev >= 1.8) {
    return {
      status: 'high_contrast',
      variance,
      mean,
      straightLined: false,
      hasDiscrepancy: false,
      message:
        'High Signal Quality: Sharp contrast across traits unlocks high-confidence archetype and blindspot analysis.',
      details: ['Distinct peaks and valleys across operating baseline.'],
    };
  }

  return {
    status: 'moderate',
    variance,
    mean,
    straightLined: false,
    hasDiscrepancy: false,
    message:
      'Moderate Signal Quality: Healthy distribution across operating dimensions.',
    details: ['Balanced variance across traits.'],
  };
}

export function calculatePerceptionGaps(
  selfTraits: Record<TraitId, number>,
  peerTraits: Record<TraitId, number>,
  peerName = 'Colleague'
): PerceptionGap[] {
  return TRAITS.map((t) => {
    const selfScore = selfTraits[t.id] ?? 5;
    const peerScore = peerTraits[t.id] ?? 5;
    const delta = peerScore - selfScore;

    if (delta <= -2) {
      return {
        traitId: t.id,
        traitName: t.name,
        selfScore,
        peerScore,
        delta,
        type: 'blindspot' as const,
        headline: `Potential Blindspot (${Math.abs(delta)} pts lower)`,
        coachingAdvice: `You perceive yourself at ${selfScore}/10, but ${peerName} observes ${peerScore}/10. Ask for specific examples in your next 1-on-1 where your execution felt lower than your internal intent.`,
      };
    } else if (delta >= 2) {
      return {
        traitId: t.id,
        traitName: t.name,
        selfScore,
        peerScore,
        delta,
        type: 'hidden_strength' as const,
        headline: `Hidden Superpower (+${delta} pts higher)`,
        coachingAdvice: `${peerName} observes ${peerScore}/10, outperforming your self-rating of ${selfScore}/10. You project capability and poise that you may be discounting.`,
      };
    } else {
      return {
        traitId: t.id,
        traitName: t.name,
        selfScore,
        peerScore,
        delta,
        type: 'aligned' as const,
        headline: 'Calibrated Alignment (±1 pt)',
        coachingAdvice: `Self-perception and observed reality match cleanly. Both you and ${peerName} share the same assessment of your baseline here.`,
      };
    }
  });
}

