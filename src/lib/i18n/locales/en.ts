import { TranslationDictionary } from '../types';

export const en: TranslationDictionary = {
  // Navigation & Views
  nav_studio: 'Studio',
  nav_plan_view: 'Plan View',
  nav_signals: 'Signals',
  nav_copy_plan: 'Copy Plan',
  nav_copied: '✓ Copied',
  nav_export_pdf: 'Export PDF',
  nav_data_snapshots: '💾 Data & Snapshots',
  nav_review_360: '360° Review',
  nav_guide: 'Guide & Deliverables',
  nav_reset: 'Reset',
  nav_menu: '⋯ Menu',
  nav_close: '✕ Close',
  nav_select_lang: 'Language',

  // Header badges & metadata
  header_archetype_badge: 'Live Calculated Archetype',
  header_horizon_days: '{days} days',
  header_pace: 'Pace',
  header_goal: 'Goal',
  header_peak_energy: 'Peak Energy',

  // Modals & Actions
  modal_data_title: 'Plan Data & Snapshots',
  modal_json_section: '1. JSON Backup & Migration',
  modal_json_desc: 'Export your full configuration, trait scores, and completed checkboxes as a standalone JSON file to transfer between browsers or machines.',
  modal_btn_download_json: 'Download .json Backup',
  modal_btn_import_json: 'Import .json Backup',
  modal_import_success: '✓ Plan successfully imported and loaded into Studio!',
  modal_import_error: '✕ Failed to parse plan file.',
  modal_snapshot_section: '2. Save Version Snapshot',
  modal_snapshot_desc: 'Freeze your current answers as a named milestone (e.g. "Q1 Baseline") to compare and switch between versions over time.',
  modal_snapshot_placeholder: 'Snapshot name...',
  modal_btn_save_snapshot: 'Save Snapshot',
  modal_snapshot_none: 'No snapshots saved yet. Create one above to anchor your review baseline.',
  modal_btn_load: 'Load',
  modal_btn_delete: 'Delete',

  // Signals Panel Sections
  signals_title: 'Signals & Inputs',
  signals_subtitle: 'Adjust your raw parameters. The plan updates deterministically in real time.',
  signals_sec_identity: '1. Identity & Context',
  signals_sec_traits: '2. Core Operating Traits',
  signals_sec_interests: '3. Domain Interests & Synergies',
  signals_sec_calibration: '4. Strategic Calibration',
  signals_sec_generational: '5. Generational Alignment',

  // Signal Fields
  field_full_name: 'Full Name',
  field_dob: 'Date of Birth',
  field_age: 'Age',
  field_role: 'Current Career Stage',
  field_target_hours: 'Target Weekly Dev Hours',
  field_peak_energy: 'Peak Energy Window',
  field_horizon: 'Primary Planning Horizon',
  field_goal: 'Primary Strategic Focus / Goal',
  field_blocker: 'Primary Friction / Blocker',
  field_learning: 'Preferred Learning Style',
  field_notes: 'Free-form Strategy Notes',

  // Traits
  trait_curiosity: 'Curiosity & Exploration',
  trait_follow: 'Follow-Through & Execution',
  trait_social: 'Social Radar & Empathy',
  trait_read: 'Deep Reading & Synthesis',
  trait_steady: 'Steady Cadence & Consistency',
  trait_drive: 'Executive Drive & Decisiveness',

  // Dashboard & Roadmap
  dash_roadmap_title: 'Action Roadmap',
  dash_weekly_habits: 'Weekly Habits & Rituals',
  dash_strengths_title: 'Key Strengths to Lean On',
  dash_growth_title: 'Where to Put the Work',
  dash_nature_title: 'Your Nature, Plainly',
  dash_playbook_title: 'Generational Playbook',
  dash_mark_complete: 'Mark complete',
  dash_task_completed: 'Completed',
  dash_task_pending: 'Pending',
  dash_regenerate: 'Reset Phase to Default',

  // Plan View Banner
  plan_goal_prefix: 'Goal',
  plan_roadmap_badge: '{days}-Day Roadmap',
  plan_peak_clarity: 'Peak clarity: {time}',
  plan_years_old: '{age} yrs',

  // Generational Playbook
  playbook_title: 'Generational Alignment Playbook',
  playbook_desc: 'A simple, understandable guide to thrive at work without the unfair stereotypes.',
  playbook_stereotype: 'The Unfair Stereotype',
  playbook_myth: 'Myth',
  playbook_plain_truth: 'The Plain Truth',
  playbook_thrive: 'What Helps You Thrive',
  playbook_leadership: 'What You Need From Leaders & Peers',
  playbook_script: 'Ready-to-Use 1-on-1 Script',
  playbook_copy_script: 'Copy Script',
  playbook_copied_script: '✓ Script Copied!',

  // Nature Plainly
  nature_title: 'Your Nature, Read Plainly',
  nature_desc: 'How you operate, unfiltered by cliches.',
  nature_stereotype: 'Stereotype for your age group',
  nature_reality: 'What your signals actually show',

  // Notes Review
  notes_title: 'Your Additional Context',
  notes_desc: 'Signals that were not captured by the sliders.',

  // Trait Scores Panel
  traits_title: 'Operating Traits & Signal Quality',
  traits_desc: 'Calibrated behavioral profile with peer review overlay.',
  traits_radar_tab: 'Radar View',
  traits_bars_tab: 'Bar Chart',
  traits_both_tab: 'Both',
  traits_peer_overlay: '360° Peer Overlay',
  traits_simulate_peer: 'Simulate Peer',
  traits_clear_peer: 'Clear',

  // Footer
  footer_tagline: 'A modern, deterministic development studio translating personal signals and operating traits into an actionable growth roadmap. Built using the Higgsfield AI design language.',
  footer_zero_tracking: 'Zero Tracking',
  footer_client_side: '100% Client-Side',
  footer_localstorage: 'LocalStorage Only',
  footer_navigation: 'Navigation',
  footer_trust: 'Trust & Ethics',
  footer_trust_desc: 'Fieldwork operates completely inside your browser. No personal dates of birth, names, or behavioral scores are ever transmitted to any remote servers, analytics providers, or third parties.',
  footer_crafted_by: 'Crafted By',
  footer_rights: 'Released under Apache-2.0 / MIT. All rights reserved.',
};
