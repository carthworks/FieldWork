export type TraitId = 'curiosity' | 'follow' | 'social' | 'read' | 'steady' | 'drive';

export interface TraitDefinition {
  id: TraitId;
  name: string;
  lo: string;
  hi: string;
  high: string;
  mid: string;
  low: string;
}

export interface InterestDefinition {
  id: string;
  label: string;
}

export type RoleType =
  | 'studying'
  | 'early'
  | 'ic'
  | 'lead'
  | 'founder'
  | 'between'
  | 'care';

export type EnergyTime = 'morning' | 'midday' | 'evening' | 'night';

export type GoalType =
  | 'promo'
  | 'switch'
  | 'build'
  | 'lead'
  | 'skill'
  | 'health'
  | 'consistent';

export type BlockerType =
  | 'time'
  | 'focus'
  | 'judged'
  | 'plan'
  | 'energy'
  | 'finish';

export type LearningStyle = 'doing' | 'reading' | 'teaching' | 'watching';

export type PlanningHorizon = 30 | 60 | 90;

export interface PlanFormState {
  name: string;
  dob?: string; // Date of Birth (YYYY-MM-DD)
  age: number | null;
  role: RoleType;
  hours: number;
  energy: EnergyTime;
  traits: Record<TraitId, number>;
  interests: string[];
  goal: GoalType;
  blocker: BlockerType;
  learn: LearningStyle;
  horizon: PlanningHorizon;
  notes: string;
  thriveFactors: string[];
  leadershipNeeds: string[];
}

export interface CohortInfo {
  band: string;
  years: string;
  myth: string;
}

export interface GenerationalPlaybook {
  generation: string;
  years: string;
  stereotype: string;
  plainTruth: string;
  thriveFactors: string[];
  leadershipNeeds: string[];
  simpleScript: string;
  leadershipAdvice: string;
}

export interface ScoredTrait extends TraitDefinition {
  score: number;
  band: 'high' | 'mid' | 'low';
  description: string;
}

export interface StrengthItem {
  traitId: TraitId;
  title: string;
  advice: string;
}

export interface FocusItem {
  title: string;
  why: string;
}

export interface TaskItem {
  id: string;
  text: string;
}

export interface PhasePlan {
  label: string;
  title: string;
  tasks: TaskItem[];
}

export interface AssessmentResult {
  cohort: CohortInfo;
  archetypeName: string;
  archetypeTagline: string;
  paceDescription: string;
  scoredTraits: ScoredTrait[];
  strengths: StrengthItem[];
  interestSynergyText: string;
  focusItems: FocusItem[];
  natureParagraph1: string;
  natureParagraph2: string;
  phases: PhasePlan[];
  habits: string[];
  notes: string;
  horizon: PlanningHorizon;
  goalLabel: string;
  energyLabel: string;
  userName: string;
  age: number;
  playbook: GenerationalPlaybook;
}
