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
  reverseProbes?: Partial<Record<'curiosity_probe' | 'steady_probe', number>>;
  peerReview?: PeerReviewData | null;
  customTasks?: Record<number, TaskItem[]>;
}

export type SignalQualityStatus =
  | 'high_contrast'
  | 'moderate'
  | 'straight_lined'
  | 'discrepant';

export interface SignalQualityReport {
  status: SignalQualityStatus;
  variance: number;
  mean: number;
  straightLined: boolean;
  hasDiscrepancy: boolean;
  message: string;
  actionPrompt?: string;
  details: string[];
}

export interface PeerReviewData {
  peerName: string;
  peerRole?: string;
  traits: Record<TraitId, number>;
  submittedAt?: string;
}

export interface PerceptionGap {
  traitId: TraitId;
  traitName: string;
  selfScore: number;
  peerScore: number;
  delta: number; // peerScore - selfScore
  type: 'blindspot' | 'hidden_strength' | 'aligned';
  headline: string;
  coachingAdvice: string;
}

export interface CohortInfo {
  band: string;
  years: string;
  myth: string;
}

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
  traits: Record<TraitId, number>;
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
  signalQuality: SignalQualityReport;
  peerReview?: PeerReviewData | null;
  perceptionGaps?: PerceptionGap[];
}

export interface PersonaPreset {
  id: string;
  name: string;
  tagline: string;
  icon: string;
  state: Partial<PlanFormState>;
}

export interface PlanSnapshot {
  id: string;
  title: string;
  createdAt: string;
  state: PlanFormState;
  completedTasks: Record<string, boolean>;
}


