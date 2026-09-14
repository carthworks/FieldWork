import { PlanFormState } from '@/types/plan';
import { DEFAULT_PLAN_STATE } from './constants';

const STATE_KEY = 'fieldwork_plan_form_state_v1';
const TASKS_KEY = 'fieldwork_completed_tasks_v1';
const STEP_KEY = 'fieldwork_current_step_v1';

export function loadSavedFormState(): PlanFormState {
  if (typeof window === 'undefined') return DEFAULT_PLAN_STATE;
  try {
    const raw = localStorage.getItem(STATE_KEY);
    if (!raw) return DEFAULT_PLAN_STATE;
    const parsed = JSON.parse(raw);
    return { ...DEFAULT_PLAN_STATE, ...parsed };
  } catch {
    return DEFAULT_PLAN_STATE;
  }
}

export function saveFormState(state: PlanFormState): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STATE_KEY, JSON.stringify(state));
  } catch (e) {
    console.warn('Failed to save form state to localStorage', e);
  }
}

export function loadCompletedTasks(): Record<string, boolean> {
  if (typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem(TASKS_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function saveCompletedTasks(tasks: Record<string, boolean>): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
  } catch (e) {
    console.warn('Failed to save completed tasks to localStorage', e);
  }
}

export function loadSavedStep(): number {
  if (typeof window === 'undefined') return 1;
  try {
    const raw = localStorage.getItem(STEP_KEY);
    const n = raw ? parseInt(raw, 10) : 1;
    return n >= 1 && n <= 4 ? n : 1;
  } catch {
    return 1;
  }
}

export function saveSavedStep(step: number): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STEP_KEY, String(step));
  } catch {}
}

export function clearSavedPlan(): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(STATE_KEY);
    localStorage.removeItem(TASKS_KEY);
    localStorage.removeItem(STEP_KEY);
  } catch {}
}
