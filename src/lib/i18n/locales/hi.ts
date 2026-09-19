import { TranslationDictionary } from '../types';

export const hi: TranslationDictionary = {
  // Navigation & Views
  nav_studio: 'स्टूडियो',
  nav_plan_view: 'योजना दृश्य',
  nav_signals: 'संकेत',
  nav_copy_plan: 'योजना कॉपी करें',
  nav_copied: '✓ कॉपी किया गया',
  nav_export_pdf: 'PDF निर्यात करें',
  nav_data_snapshots: '💾 डेटा व स्नैपशॉट',
  nav_review_360: '360° समीक्षा',
  nav_guide: 'मार्गदर्शिका व विवरण',
  nav_reset: 'रीसेट करें',
  nav_menu: '⋯ मेनू',
  nav_close: '✕ बंद करें',
  nav_select_lang: 'भाषा',

  // Header badges & metadata
  header_archetype_badge: 'अनुमानित व्यक्तित्व प्रकार',
  header_horizon_days: '{days} दिन',
  header_pace: 'गति',
  header_goal: 'लक्ष्य',
  header_peak_energy: 'शीर्ष ऊर्जा समय',

  // Modals & Actions
  modal_data_title: 'योजना डेटा व स्नैपशॉट',
  modal_json_section: '1. JSON बैकअप और स्थानांतरण',
  modal_json_desc: 'ब्राउज़रों या मशीनों के बीच स्थानांतरित करने के लिए अपने संपूर्ण विन्यास, लक्षण स्कोर और कार्यों को JSON फ़ाइल के रूप में डाउनलोड करें।',
  modal_btn_download_json: '.json बैकअप डाउनलोड करें',
  modal_btn_import_json: '.json बैकअप आयात करें',
  modal_import_success: '✓ योजना सफलतापूर्वक आयात कर स्टूडियो में लोड की गई!',
  modal_import_error: '✕ योजना फ़ाइल पढ़ने में त्रुटि हुई।',
  modal_snapshot_section: '2. संस्करण स्नैपशॉट सहेजें',
  modal_snapshot_desc: 'समय के साथ परिवर्तनों की तुलना करने के लिए अपनी वर्तमान प्राथमिकताओं को एक मील के पत्थर के रूप में सहेजें।',
  modal_snapshot_placeholder: 'स्नैपशॉट का नाम...',
  modal_btn_save_snapshot: 'स्नैपशॉट सहेजें',
  modal_snapshot_none: 'अभी तक कोई स्नैपशॉट नहीं है। समीक्षा शुरू करने के लिए ऊपर एक नया बनाएं।',
  modal_btn_load: 'लोड करें',
  modal_btn_delete: 'हटाएं',

  // Signals Panel Sections
  signals_title: 'संकेत व इनपुट',
  signals_subtitle: 'अपने मानकों को समायोजित करें। योजना वास्तविक समय में स्वतः अपडेट होगी।',
  signals_sec_identity: '1. पहचान व संदर्भ',
  signals_sec_traits: '2. मुख्य कार्यप्रणाली लक्षण',
  signals_sec_interests: '3. रुचियां व समन्वय',
  signals_sec_calibration: '4. रणनीतिक अंशांकन',
  signals_sec_generational: '5. पीढ़ीगत संरेखण',

  // Signal Fields
  field_full_name: 'पूरा नाम',
  field_dob: 'जन्म तिथि',
  field_age: 'आयु',
  field_role: 'वर्तमान करियर चरण',
  field_target_hours: 'साप्ताहिक लक्ष्य घंटे',
  field_peak_energy: 'शीर्ष ऊर्जा समय',
  field_horizon: 'मुख्य योजना अवधि',
  field_goal: 'मुख्य विकास लक्ष्य',
  field_blocker: 'मुख्य घर्षण / बाधा',
  field_learning: 'सीखने की शैली',
  field_notes: 'रणनीतिक नोट्स',

  // Traits
  trait_curiosity: 'जिज्ञासा व अन्वेषण',
  trait_follow: 'क्रियान्वयन व समापन',
  trait_social: 'सामाजिक संवेदनशीलता व सहानुभूति',
  trait_read: 'गहन अध्ययन व संश्लेषण',
  trait_steady: 'निरंतरता व स्थिरता',
  trait_drive: 'नेतृत्व प्रेरणा व निर्णय क्षमता',

  // Dashboard & Roadmap
  dash_roadmap_title: 'कार्ययोजना रोडमैप',
  dash_weekly_habits: 'साप्ताहिक आदतें व अभ्यास',
  dash_strengths_title: 'उपयोग करने योग्य मुख्य ताकतें',
  dash_growth_title: 'सुधार के प्रमुख क्षेत्र',
  dash_nature_title: 'आपका स्वभाव, स्पष्ट रूप से',
  dash_playbook_title: 'पीढ़ीगत प्लेबुक',
  dash_mark_complete: 'पूर्ण चिह्नित करें',
  dash_task_completed: 'पूर्ण',
  dash_task_pending: 'लंबित',
  dash_regenerate: 'डिफ़ॉल्ट पर रीसेट करें',

  // Plan View Banner
  plan_goal_prefix: 'लक्ष्य',
  plan_roadmap_badge: '{days}-दिवसीय कार्ययोजना रोडमैप',
  plan_peak_clarity: 'शीर्ष स्पष्टता समय: {time}',
  plan_years_old: '{age} वर्ष',

  // Generational Playbook
  playbook_title: 'पीढ़ीगत संरेखण प्लेबुक',
  playbook_desc: 'पुरानी रूढ़ियों के बिना कार्यक्षेत्र में सफल होने की व्यावहारिक मार्गदर्शिका।',
  playbook_stereotype: 'अनुचित रूढ़िवादिता',
  playbook_myth: 'मिथक',
  playbook_plain_truth: 'स्पष्ट सच्चाई',
  playbook_thrive: 'जो आपको सफल बनाता है',
  playbook_leadership: 'नेताओं व साथियों से आपकी अपेक्षाएं',
  playbook_script: '1-on-1 बातचीत का तैयार प्रारूप',
  playbook_copy_script: 'प्रारूप कॉपी करें',
  playbook_copied_script: '✓ प्रारूप कॉपी किया गया!',

  // Nature Plainly
  nature_title: 'आपका स्वभाव, स्पष्ट रूप से',
  nature_desc: 'बिना किसी भ्रांति के आपका वास्तविक कार्यप्रणाली विश्लेषण।',
  nature_stereotype: 'आपके आयु वर्ग के लिए सामान्य रूढ़िवादिता',
  nature_reality: 'आपके वास्तविक इनपुट क्या दर्शाते हैं',

  // Notes Review
  notes_title: 'आपका अतिरिक्त संदर्भ व नोट्स',
  notes_desc: 'स्लाइडर्स द्वारा कैप्चर न किए गए अतिरिक्त संकेत।',

  // Trait Scores Panel
  traits_title: 'कार्यप्रणाली लक्षण व सिग्नल गुणवत्ता',
  traits_desc: 'सहकर्मियों की समीक्षा ओवरले के साथ कैलिब्रेटेड प्रोफ़ाइल।',
  traits_radar_tab: 'रडार दृश्य',
  traits_bars_tab: 'बार चार्ट',
  traits_both_tab: 'दोनों',
  traits_peer_overlay: '360° सहकर्मी ओवरले',
  traits_simulate_peer: 'सहकर्मी समीक्षा अनुकरण',
  traits_clear_peer: 'हटाएं',

  // Footer
  footer_tagline: 'व्यक्तिगत संकेतों और व्यवहारिक लक्षणों को एक ठोस विकास रोडमैप में बदलने वाला आधुनिक स्टूडियो। हिग्सफ़ील्ड डिज़ाइन भाषा पर आधारित।',
  footer_zero_tracking: 'शून्य ट्रैकिंग',
  footer_client_side: '100% क्लाइंट-साइड',
  footer_localstorage: 'केवल लोकल स्टोरेज',
  footer_navigation: 'नेविगेशन',
  footer_trust: 'विश्वास व नैतिकता',
  footer_trust_desc: 'फील्डवर्क पूरी तरह आपके ब्राउज़र में चलता है। कोई भी जन्मतिथि, नाम या व्यक्तिगत डेटा कभी किसी बाहरी सर्वर को नहीं भेजा जाता है।',
  footer_crafted_by: 'निर्माता',
  footer_rights: 'Apache-2.0 / MIT लाइसेंस के तहत उपलब्ध। सर्वाधिकार सुरक्षित।',
};
