import { PlanFormState, PlanSnapshot, TaskItem } from '@/types/plan';
import { DEFAULT_PLAN_STATE } from './constants';

const STATE_KEY = 'fieldwork_plan_form_state_v1';
const TASKS_KEY = 'fieldwork_completed_tasks_v1';
const STEP_KEY = 'fieldwork_current_step_v1';
const CUSTOM_TASKS_KEY = 'fieldwork_custom_tasks_v1';
const SNAPSHOTS_KEY = 'fieldwork_plan_snapshots_v1';

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

export function loadCustomTasks(): Record<number, TaskItem[]> {
  if (typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem(CUSTOM_TASKS_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function saveCustomTasks(tasks: Record<number, TaskItem[]>): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(CUSTOM_TASKS_KEY, JSON.stringify(tasks));
  } catch (e) {
    console.warn('Failed to save custom tasks to localStorage', e);
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

export function loadPlanSnapshots(): PlanSnapshot[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(SNAPSHOTS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function savePlanSnapshot(snapshot: PlanSnapshot): PlanSnapshot[] {
  if (typeof window === 'undefined') return [];
  try {
    const existing = loadPlanSnapshots().filter((s) => s.id !== snapshot.id);
    const updated = [snapshot, ...existing].slice(0, 15); // keep last 15 snapshots
    localStorage.setItem(SNAPSHOTS_KEY, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.warn('Failed to save plan snapshot', e);
    return [];
  }
}

export function deletePlanSnapshot(id: string): PlanSnapshot[] {
  if (typeof window === 'undefined') return [];
  try {
    const existing = loadPlanSnapshots().filter((s) => s.id !== id);
    localStorage.setItem(SNAPSHOTS_KEY, JSON.stringify(existing));
    return existing;
  } catch {
    return [];
  }
}

export function clearSavedPlan(): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(STATE_KEY);
    localStorage.removeItem(TASKS_KEY);
    localStorage.removeItem(STEP_KEY);
    localStorage.removeItem(CUSTOM_TASKS_KEY);
  } catch {}
}

export interface PlanExportData {
  version: string;
  exportedAt: string;
  state: PlanFormState;
  completedTasks: Record<string, boolean>;
  customTasks: Record<number, TaskItem[]>;
}

export function exportPlanAsJson(
  state: PlanFormState,
  completedTasks: Record<string, boolean>,
  customTasks: Record<number, TaskItem[]> = {}
): string {
  const exportData: PlanExportData = {
    version: '1.0.0',
    exportedAt: new Date().toISOString(),
    state,
    completedTasks,
    customTasks,
  };
  return JSON.stringify(exportData, null, 2);
}

export function downloadJsonFile(filename: string, jsonString: string): void {
  if (typeof window === 'undefined') return;
  const blob = new Blob([jsonString], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', filename.endsWith('.json') ? filename : `${filename}.json`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function importPlanFromJson(jsonString: string): {
  success: boolean;
  state?: PlanFormState;
  completedTasks?: Record<string, boolean>;
  customTasks?: Record<number, TaskItem[]>;
  error?: string;
} {
  try {
    const parsed = JSON.parse(jsonString);
    if (!parsed || typeof parsed !== 'object') {
      return { success: false, error: 'Invalid JSON format.' };
    }

    // Support both direct PlanFormState and wrapped PlanExportData
    const incomingState: PlanFormState = parsed.state || (parsed.traits ? parsed : null);
    if (!incomingState || !incomingState.traits) {
      return { success: false, error: 'JSON missing valid Fieldwork plan state.' };
    }

    const mergedState: PlanFormState = { ...DEFAULT_PLAN_STATE, ...incomingState };
    const completedTasks: Record<string, boolean> = parsed.completedTasks || {};
    const customTasks: Record<number, TaskItem[]> = parsed.customTasks || {};

    return {
      success: true,
      state: mergedState,
      completedTasks,
      customTasks,
    };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Malformed JSON file.';
    return { success: false, error: msg };
  }
}
