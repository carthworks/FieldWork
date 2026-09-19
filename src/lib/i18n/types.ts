export type SupportedLanguage = 'en' | 'ta' | 'hi' | 'es' | 'fr' | 'de';

export interface LanguageMeta {
  code: SupportedLanguage;
  name: string;
  nativeName: string;
  flag: string;
}

export const SUPPORTED_LANGUAGES: LanguageMeta[] = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', flag: '🇮🇳' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪' },
];

export interface TranslationDictionary {
  // Navigation & Views
  nav_studio: string;
  nav_plan_view: string;
  nav_signals: string;
  nav_copy_plan: string;
  nav_copied: string;
  nav_export_pdf: string;
  nav_data_snapshots: string;
  nav_review_360: string;
  nav_guide: string;
  nav_reset: string;
  nav_menu: string;
  nav_close: string;
  nav_select_lang: string;

  // Header badges & metadata
  header_archetype_badge: string;
  header_horizon_days: string;
  header_pace: string;
  header_goal: string;
  header_peak_energy: string;

  // Modals & Actions
  modal_data_title: string;
  modal_json_section: string;
  modal_json_desc: string;
  modal_btn_download_json: string;
  modal_btn_import_json: string;
  modal_import_success: string;
  modal_import_error: string;
  modal_snapshot_section: string;
  modal_snapshot_desc: string;
  modal_snapshot_placeholder: string;
  modal_btn_save_snapshot: string;
  modal_snapshot_none: string;
  modal_btn_load: string;
  modal_btn_delete: string;

  // Signals Panel Sections
  signals_title: string;
  signals_subtitle: string;
  signals_sec_identity: string;
  signals_sec_traits: string;
  signals_sec_interests: string;
  signals_sec_calibration: string;
  signals_sec_generational: string;

  // Signal Fields
  field_full_name: string;
  field_dob: string;
  field_age: string;
  field_role: string;
  field_target_hours: string;
  field_peak_energy: string;
  field_horizon: string;
  field_goal: string;
  field_blocker: string;
  field_learning: string;
  field_notes: string;

  // Traits
  trait_curiosity: string;
  trait_follow: string;
  trait_social: string;
  trait_read: string;
  trait_steady: string;
  trait_drive: string;

  // Dashboard & Roadmap
  dash_roadmap_title: string;
  dash_weekly_habits: string;
  dash_strengths_title: string;
  dash_growth_title: string;
  dash_nature_title: string;
  dash_playbook_title: string;
  dash_mark_complete: string;
  dash_task_completed: string;
  dash_task_pending: string;
  dash_regenerate: string;

  // Plan View Banner
  plan_goal_prefix: string;
  plan_roadmap_badge: string;
  plan_peak_clarity: string;
  plan_years_old: string;

  // Generational Playbook
  playbook_title: string;
  playbook_desc: string;
  playbook_stereotype: string;
  playbook_myth: string;
  playbook_plain_truth: string;
  playbook_thrive: string;
  playbook_leadership: string;
  playbook_script: string;
  playbook_copy_script: string;
  playbook_copied_script: string;

  // Nature Plainly
  nature_title: string;
  nature_desc: string;
  nature_stereotype: string;
  nature_reality: string;

  // Notes Review
  notes_title: string;
  notes_desc: string;

  // Trait Scores Panel
  traits_title: string;
  traits_desc: string;
  traits_radar_tab: string;
  traits_bars_tab: string;
  traits_both_tab: string;
  traits_peer_overlay: string;
  traits_simulate_peer: string;
  traits_clear_peer: string;

  // Footer
  footer_tagline: string;
  footer_zero_tracking: string;
  footer_client_side: string;
  footer_localstorage: string;
  footer_navigation: string;
  footer_trust: string;
  footer_trust_desc: string;
  footer_crafted_by: string;
  footer_rights: string;
}
