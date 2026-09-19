import { SupportedLanguage } from './types';
import {
  TraitId,
  GoalType,
  EnergyTime,
  PlanningHorizon,
  GenerationGuideEntry,
  CohortInfo,
  LearningStyle,
} from '@/types/plan';

interface ArchetypeTranslation {
  name: string;
  tagline: string;
}

const ARCHETYPES: Record<
  TraitId,
  Record<SupportedLanguage, ArchetypeTranslation>
> = {
  curiosity: {
    en: {
      name: 'The Autonomous Explorer',
      tagline: 'Follows live curiosity into non-obvious technical depth.',
    },
    ta: {
      name: 'தன்னிச்சையான ஆய்வாளர் (Autonomous Explorer)',
      tagline: 'இயல்பான ஆர்வத்தைப் பின்பற்றி ஆழமான தொழில்நுட்ப புரிதலை உருவாக்குகிறார்.',
    },
    hi: {
      name: 'स्वायत्त अन्वेषक (Autonomous Explorer)',
      tagline: 'स्वाभाविक जिज्ञासा से असाधारण तकनीकी गहराई हासिल करते हैं।',
    },
    es: {
      name: 'El Explorador Autónomo',
      tagline: 'Sigue la curiosidad viva hacia una profundidad técnica no evidente.',
    },
    fr: {
      name: 'L\'Explorateur Autonome',
      tagline: 'Suit une curiosité vive vers une profondeur technique remarquable.',
    },
    de: {
      name: 'Der Autonome Entdecker',
      tagline: 'Folgt lebendiger Neugier in fundierte technische Tiefe.',
    },
  },
  follow: {
    en: {
      name: 'The High-Velocity Finisher',
      tagline: 'Relentless follow-through that turns messy starts into shipped work.',
    },
    ta: {
      name: 'துரித வேக நிறைவாளர் (High-Velocity Finisher)',
      tagline: 'எந்தவொரு சிக்கலான தொடக்கத்தையும் முழுமை பெற்ற படைப்பாக மாற்றும் விடாமுயற்சி கொண்டவர்.',
    },
    hi: {
      name: 'तीव्र गति समापनकर्ता (High-Velocity Finisher)',
      tagline: 'अधूरी शुरुआत को भी सफलतापूर्वक पूर्ण कार्य में बदलने की अटूट लगन।',
    },
    es: {
      name: 'El Finalizador de Alta Velocidad',
      tagline: 'Seguimiento incansable que transforma inicios complejos en trabajo entregado.',
    },
    fr: {
      name: 'Le Finisseur Haute Vélocité',
      tagline: 'Un suivi rigoureux qui transforme des débuts complexes en livraisons concrètes.',
    },
    de: {
      name: 'Der Schnelle Umsetzer',
      tagline: 'Unermüdlicher Abschlussgeist, der unfertige Anfänge in fertige Ergebnisse verwandelt.',
    },
  },
  social: {
    en: {
      name: 'The Catalyst Facilitator',
      tagline: 'Builds shared alignment and high-trust collaborative cadence.',
    },
    ta: {
      name: 'ஒருங்கிணைக்கும் வழிகாட்டி (Catalyst Facilitator)',
      tagline: 'குழுவில் பரஸ்பர நம்பிக்கையையும் சிறந்த ஒருங்கிணைப்பையும் உருவாக்குகிறார்.',
    },
    hi: {
      name: 'उत्प्रेरक सूत्रधार (Catalyst Facilitator)',
      tagline: 'साझा तालमेल और उच्च विश्वास का सहयोगी माहौल तैयार करते हैं।',
    },
    es: {
      name: 'El Facilitador Catalizador',
      tagline: 'Construye alineación compartida y un ritmo colaborativo de alta confianza.',
    },
    fr: {
      name: 'Le Facilitateur Catalyseur',
      tagline: 'Crée un alignement partagé et une dynamique collaborative de confiance.',
    },
    de: {
      name: 'Der Katalysator-Moderator',
      tagline: 'Baut gemeinsame Ausrichtung und vertrauensvolle Zusammenarbeit auf.',
    },
  },
  read: {
    en: {
      name: 'The Systems Thinker',
      tagline: 'Synthesizes complex documents and architectural nuances into clean execution.',
    },
    ta: {
      name: 'கட்டமைப்பு சிந்தனையாளர் (Systems Thinker)',
      tagline: 'சிக்கலான ஆவணங்களையும் நுணுக்கங்களையும் தெளிவான திட்டமாக மாற்றுகிறார்.',
    },
    hi: {
      name: 'व्यवस्था विचारक (Systems Thinker)',
      tagline: 'जटिल प्रलेखन और संरचनात्मक बारीकियों को स्पष्ट कार्ययोजना में बदलते हैं।',
    },
    es: {
      name: 'El Pensador Sistémico',
      tagline: 'Sintetiza documentos complejos y matices arquitectónicos en una ejecución limpia.',
    },
    fr: {
      name: 'Le Penseur Systémique',
      tagline: 'Synthétise la complexité architecturale en une exécution claire.',
    },
    de: {
      name: 'Der Systemdenker',
      tagline: 'Synthetisiert komplexe Zusammenhänge in eine saubere Umsetzung.',
    },
  },
  steady: {
    en: {
      name: 'The Deep Operator',
      tagline: 'Turns deep focus and disciplined rhythm into exceptional craft.',
    },
    ta: {
      name: 'ஆழ்ந்த செயல்பாட்டாளர் (Deep Operator)',
      tagline: 'ஆழ்ந்த கவனம் மற்றும் ஒழுங்குமுறையான உழைப்பை சிறந்த சாதனைகளாக மாற்றுகிறார்.',
    },
    hi: {
      name: 'गहन संचालक (Deep Operator)',
      tagline: 'गहन एकाग्रता और अनुशासित लय को उत्कृष्ट शिल्प में बदलते हैं।',
    },
    es: {
      name: 'El Operador Profundo',
      tagline: 'Convierte el enfoque profundo y el ritmo disciplinado en maestría técnica.',
    },
    fr: {
      name: 'L\'Opérateur Approfondi',
      tagline: 'Transforme la concentration profonde et le rythme en savoir-faire d\'exception.',
    },
    de: {
      name: 'Der Vertiefte Operator',
      tagline: 'Macht tiefen Fokus und disziplinierten Rhythmus zu exzellenter Qualität.',
    },
  },
  drive: {
    en: {
      name: 'The Decisive Architect',
      tagline: 'Decisive bias for action that breaks logjams and creates momentum.',
    },
    ta: {
      name: 'தீர்க்கமான வடிவமைப்பாளர் (Decisive Architect)',
      tagline: 'துணிச்சலான முடிவுகளால் தடைகளை உடைத்து வேகமான வளர்ச்சியை உருவாக்குகிறார்.',
    },
    hi: {
      name: 'निर्णायक वास्तुकार (Decisive Architect)',
      tagline: 'दृढ़ निर्णयों से बाधाओं को दूर कर कार्य में गति लाते हैं।',
    },
    es: {
      name: 'El Arquitecto Decidido',
      tagline: 'Inclinación decisiva hacia la acción que supera obstáculos y genera impulso.',
    },
    fr: {
      name: 'L\'Architecte Décisif',
      tagline: 'Un sens aigu de l\'action qui débloque les impasses et crée l\'élan.',
    },
    de: {
      name: 'Der Entschlossene Architekt',
      tagline: 'Entschlossener Handlungswille, der Engpässe löst und Schwung erzeugt.',
    },
  },
};

const SECOND_STREAKS: Record<TraitId, Record<SupportedLanguage, string>> = {
  curiosity: {
    en: 'an expansive exploratory edge',
    ta: 'பரந்த ஆய்வு நோக்குடன்',
    hi: 'व्यापक खोजपरक दृष्टिकोण के साथ',
    es: 'un enfoque exploratorio expansivo',
    fr: 'une dimension exploratoire affirmée',
    de: 'einem ausgeprägten Entdeckergeist',
  },
  follow: {
    en: 'disciplined execution rhythm',
    ta: 'ஒழுங்கமைக்கப்பட்ட செயல்பாட்டு நெறியுடன்',
    hi: 'अनुशासित निष्पादन लय के साथ',
    es: 'un ritmo de ejecución disciplinado',
    fr: 'un rythme d\'exécution discipliné',
    de: 'disziplinierter Umsetzungsstärke',
  },
  social: {
    en: 'strong collaborative radar',
    ta: 'வலுவான கூட்டுழைப்பு உணர்வுடன்',
    hi: 'मजबूत सहयोगी तालमेल के साथ',
    es: 'un radar colaborativo sólido',
    fr: 'un sens aigu de la collaboration',
    de: 'starkem Teamgespür',
  },
  read: {
    en: 'deep structural synthesis',
    ta: 'ஆழ்ந்த கட்டமைப்பு தொகுப்புடன்',
    hi: 'गहन संरचनात्मक संश्लेषण के साथ',
    es: 'una síntesis estructural profunda',
    fr: 'une synthèse structurelle approfondie',
    de: 'fundierter analytischer Tiefe',
  },
  steady: {
    en: 'calm, unwavering consistency',
    ta: 'அமைதியான, அசைக்க முடியாத தொடர்ச்சியுடன்',
    hi: 'शांत और अटल निरंतरता के साथ',
    es: 'una consistencia serena e inquebrantable',
    fr: 'une régularité calme et inébranlable',
    de: 'ruhiger, unerschütterlicher Beständigkeit',
  },
  drive: {
    en: 'sharp executive decision-making',
    ta: 'கூர்மையான தலைமை முடிவெடுக்கும் திறனுடன்',
    hi: 'सटीक नेतृत्व निर्णय क्षमता के साथ',
    es: 'una toma de decisiones ejecutiva precisa',
    fr: 'une prise de décision rapide et claire',
    de: 'zielgerichteter Führungsentscheidung',
  },
};

export function getLocalizedArchetype(
  primaryId: TraitId,
  secondId: TraitId,
  lang: SupportedLanguage
): ArchetypeTranslation {
  const p = ARCHETYPES[primaryId]?.[lang] || ARCHETYPES[primaryId]?.en;
  const s = SECOND_STREAKS[secondId]?.[lang] || SECOND_STREAKS[secondId]?.en;

  let combinedName = `${p.name} with ${s}`;
  if (lang === 'ta' || lang === 'hi') {
    combinedName = `${p.name} · ${s}`;
  }

  return {
    name: combinedName,
    tagline: p.tagline,
  };
}

export function getLocalizedPace(hours: number, lang: SupportedLanguage): string {
  if (lang === 'ta') {
    if (hours < 3) return 'ஒரு நாளைக்கு ஒரு சிறிய செயல்பாடு';
    if (hours < 7) return 'வாரத்திற்கு 2 அல்லது 3 அமர்வுகள்';
    if (hours < 13) return 'பெரும்பாலான நாட்களில் வழக்கமான அமர்வு';
    return 'ஆழ்ந்து செயல்படுவதற்கான தினசரி நேர ஒதுக்கீடு';
  }
  if (lang === 'hi') {
    if (hours < 3) return 'प्रतिदिन एक छोटा केंद्रित कार्य';
    if (hours < 7) return 'सप्ताह में 2 या 3 केंद्रित सत्र';
    if (hours < 13) return 'अधिकांश दिनों में नियमित सत्र';
    return 'गहन कार्य के लिए समर्पित दैनिक सत्र';
  }
  if (lang === 'es') {
    if (hours < 3) return 'una pequeña acción al día';
    if (hours < 7) return 'dos o tres sesiones por semana';
    if (hours < 13) return 'una sesión casi todos los días';
    return 'bloques diarios para profundizar';
  }
  if (hours < 3) return 'one small action a day';
  if (hours < 7) return 'two or three sessions a week';
  if (hours < 13) return 'a session most days';
  return 'daily blocks with room to go deep';
}

export function getLocalizedGoal(goal: GoalType, lang: SupportedLanguage): string {
  const map: Record<GoalType, Record<SupportedLanguage, string>> = {
    promo: {
      en: 'get promoted or take on more scope',
      ta: 'பதவி உயர்வு அல்லது கூடுதல் பொறுப்பு',
      hi: 'पदोन्नति या अतिरिक्त दायित्व लेना',
      es: 'obtener un ascenso o mayor alcance',
      fr: 'obtenir une promotion ou élargir son périmètre',
      de: 'Beförderung oder mehr Verantwortung übernehmen',
    },
    switch: {
      en: 'move into different work',
      ta: 'புதிய பணித்துறைக்கு மாறுதல்',
      hi: 'नए कार्यक्षेत्र में जाना',
      es: 'cambiar hacia un trabajo diferente',
      fr: 'évoluer vers un métier différent',
      de: 'in einen anderen Bereich wechseln',
    },
    build: {
      en: 'build something of my own',
      ta: 'சொந்தமாக ஒன்றை உருவாக்குதல்',
      hi: 'स्वयं का कुछ नया निर्माण करना',
      es: 'construir algo propio',
      fr: 'créer mon propre projet',
      de: 'etwas Eigenes aufbauen',
    },
    lead: {
      en: 'lead people better',
      ta: 'குழுவை சிறப்பாக வழிநடத்துதல்',
      hi: 'टीम का बेहतर नेतृत्व करना',
      es: 'liderar mejor a las personas',
      fr: 'mieux diriger et accompagner les équipes',
      de: 'Menschen besser führen',
    },
    skill: {
      en: 'get properly good at a hard skill',
      ta: 'ஒரு கடினமான தொழில்நுட்ப திறனில் தேர்ச்சி பெறுதல்',
      hi: 'कठिन कौशल में पूरी महारत हासिल करना',
      es: 'dominar a fondo una habilidad compleja',
      fr: 'maîtriser pleinement une compétence technique',
      de: 'eine anspruchsvolle Fähigkeit wirklich meistern',
    },
    health: {
      en: 'feel healthier and steadier',
      ta: 'ஆரோக்கியமாகவும் நிலையாகவும் உணர்தல்',
      hi: 'अधिक स्वस्थ और संतुलित महसूस करना',
      es: 'sentirme más sano y constante',
      fr: 'se sentir plus sain et plus serein',
      de: 'gesünder und stabiler fühlen',
    },
    consistent: {
      en: 'just be consistent for once',
      ta: 'விடாமுயற்சியுடன் தொடர்ந்து செயல்படுதல்',
      hi: 'निरंतर और नियमित बने रहना',
      es: 'ser verdaderamente constante por fin',
      fr: 'être enfin constant dans la durée',
      de: 'einfach mal dauerhaft dranbleiben',
    },
  };
  return map[goal]?.[lang] || map[goal]?.en;
}

export function getLocalizedEnergy(energy: EnergyTime, lang: SupportedLanguage): string {
  const map: Record<EnergyTime, Record<SupportedLanguage, string>> = {
    morning: {
      en: 'early morning',
      ta: 'அதிகாலையில்',
      hi: 'प्रातःकाल में',
      es: 'a primera hora de la mañana',
      fr: 'tôt le matin',
      de: 'am frühen Morgen',
    },
    midday: {
      en: 'around midday',
      ta: 'நண்பகலில்',
      hi: 'दोपहर में',
      es: 'hacia el mediodía',
      fr: 'en milieu de journée',
      de: 'um die Mittagszeit',
    },
    evening: {
      en: 'in the evening',
      ta: 'மாலையில்',
      hi: 'संध्याकाल में',
      es: 'por la tarde',
      fr: 'en soirée',
      de: 'am Abend',
    },
    night: {
      en: 'late at night',
      ta: 'இரவில்',
      hi: 'देर रात में',
      es: 'tarde en la noche',
      fr: 'tard dans la nuit',
      de: 'spät in der Nacht',
    },
  };
  return map[energy]?.[lang] || map[energy]?.en;
}

export function getLocalizedPhaseLabels(
  horizon: PlanningHorizon,
  lang: SupportedLanguage
): [string, string, string] {
  if (lang === 'ta') {
    if (horizon === 30) return ['நாட்கள் 1–10', 'நாட்கள் 11–20', 'நாட்கள் 21–30'];
    if (horizon === 60) return ['வாரங்கள் 1–2', 'வாரங்கள் 3–6', 'வாரங்கள் 7–8'];
    return ['மாதம் 1', 'மாதம் 2', 'மாதம் 3'];
  }
  if (lang === 'hi') {
    if (horizon === 30) return ['दिन 1–10', 'दिन 11–20', 'दिन 21–30'];
    if (horizon === 60) return ['सप्ताह 1–2', 'सप्ताह 3–6', 'सप्ताह 7–8'];
    return ['माह 1', 'माह 2', 'माह 3'];
  }
  if (lang === 'es') {
    if (horizon === 30) return ['Días 1–10', 'Días 11–20', 'Días 21–30'];
    if (horizon === 60) return ['Semanas 1–2', 'Semanas 3–6', 'Semanas 7–8'];
    return ['Mes 1', 'Mes 2', 'Mes 3'];
  }
  if (horizon === 30) return ['Days 1–10', 'Days 11–20', 'Days 21–30'];
  if (horizon === 60) return ['Weeks 1–2', 'Weeks 3–6', 'Weeks 7–8'];
  return ['Month 1', 'Month 2', 'Month 3'];
}

export function getLocalizedPhaseTitles(lang: SupportedLanguage): [string, string, string] {
  if (lang === 'ta') {
    return [
      'அடித்தளத்தை உருவாக்குங்கள்',
      'வழக்கமான நடைமுறையாக்குங்கள்',
      'பிறருடன் பகிர்ந்து உறுதிப்படுத்துங்கள்',
    ];
  }
  if (lang === 'hi') {
    return [
      'मजबूत नींव तैयार करें',
      'नियमित दिनचर्या बनाएं',
      'दूसरों के सामने प्रस्तुत करें',
    ];
  }
  if (lang === 'es') {
    return [
      'Despejar el terreno inicial',
      'Convertirlo en rutina estable',
      'Ponerlo a prueba y compartirlo',
    ];
  }
  return ['Clear the ground', 'Make it routine', 'Put it in front of someone'];
}

export function getLocalizedDefaultHabit(lang: SupportedLanguage): string {
  if (lang === 'ta') {
    return 'ஒவ்வொரு வெள்ளிக்கிழமையும் 10 நிமிடங்கள்: என்ன முன்னேறியது, என்ன தேங்கியது என மீள்பார்வை';
  }
  if (lang === 'hi') {
    return 'प्रत्येक शुक्रवार 10 मिनट: क्या आगे बढ़ा और कहाँ रुकावट आई, इसकी समीक्षा';
  }
  if (lang === 'es') {
    return 'Diez minutos cada viernes: qué avanzó y qué se estancó';
  }
  return 'Ten minutes each Friday: what moved, what stalled';
}

const LOCALIZED_GENERATION_GUIDES: Record<
  string,
  Record<
    SupportedLanguage,
    {
      name: string;
      years: string;
      stereotype: string;
      plainTruth: string;
      defaultThrive: string[];
      defaultNeeds: string[];
      simpleScript: string;
      leadershipAdvice: string;
    }
  >
> = {
  gen_z: {
    en: {
      name: 'Gen Z',
      years: '1997–2012',
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
    ta: {
      name: 'ஜென் ஜி (Gen Z)',
      years: '1997–2012',
      stereotype: 'கவனம் சிதறியவர். உரிமை கோருபவர். பொறுமையற்றவர்.',
      plainTruth: 'நீங்கள் வேகமானவர், நேரடியானவர், மற்றும் அர்த்தமுள்ள பணியை விரும்புபவர். உங்களுக்கு நுணுக்கமான மேற்பார்வை தேவையில்லை—தெளிவும் நம்பிக்கையுமே தேவை.',
      defaultThrive: ['தெளிவான எதிர்பார்ப்புகள்', 'உடனடி கருத்துப் பகிர்வு', 'பணி நெகிழ்வுத்தன்மை'],
      defaultNeeds: [
        'பணியின் நோக்கத்தை விளக்குங்கள்',
        'பயனுள்ள நேரத்தில் உடனடி கருத்து அளியுங்கள்',
        'தொடர் கண்காணிப்பிற்குப் பதிலாக பொறுப்பை வழங்குங்கள்',
      ],
      simpleScript: '"முழுமையான நோக்கத்தை அறிந்து, தீர்வை நானே உருவாக்கும் சுதந்திரமும், வாரக்கணக்கில் காத்திருக்காமல் உடனடி ஆலோசனைகளும் கிடைக்கும்போது நான் மிகச் சிறப்பாகச் செயல்படுகிறேன்."',
      leadershipAdvice: 'நோக்கத்துடனும் தெளிவான பின்னணியுடனும் வழிநடத்துங்கள். எதிர்பார்க்கும் முடிவை விளக்குங்கள், பரிசீலனை நேரங்களை முடிவுசெய்து, அவர்களின் சுயாதீன செயல்பாட்டிற்கு வழியமையுங்கள்.',
    },
    hi: {
      name: 'जेन ज़ी (Gen Z)',
      years: '1997–2012',
      stereotype: 'भटके हुए ध्यान वाले। हक जताने वाले। अधीर।',
      plainTruth: 'आप तेज़, स्पष्ट और सार्थक काम करने वाले हैं। आपको सूक्ष्म-प्रबंधन की नहीं—स्पष्टता और भरोसे की आवश्यकता है।',
      defaultThrive: ['स्पष्ट अपेक्षाएं', 'त्वरित प्रतिक्रिया', 'लचीलापन'],
      defaultNeeds: [
        'काम के पीछे का उद्देश्य स्पष्ट करें',
        'समय रहते उपयोगी प्रतिक्रिया दें',
        'लगातार निगरानी के बजाय जिम्मेदारी सौंपें',
      ],
      simpleScript: '"मैं सबसे बेहतर काम तब करता हूँ जब मुझे कार्य का मुख्य उद्देश्य पता हो, समाधान का स्वामित्व मिले और हफ्तों के इंतजार के बजाय त्वरित संवाद हो।"',
      leadershipAdvice: 'उद्देश्य और संदर्भ के साथ नेतृत्व करें। अपेक्षित परिणाम स्पष्ट करें, समीक्षा बिंदु तय करें और अनावश्यक हस्तक्षेप से बचें।',
    },
    es: {
      name: 'Gen Z',
      years: '1997–2012',
      stereotype: 'Distraído. Exigente. Impaciente.',
      plainTruth: 'Eres rápido, directo y buscas trabajo con sentido real. No necesitas microgestión; necesitas claridad y confianza.',
      defaultThrive: ['Expectativas claras', 'Retroalimentación rápida', 'Flexibilidad'],
      defaultNeeds: [
        'Explicar el motivo del trabajo',
        'Dar retroalimentación oportuna',
        'Dar autonomía, no supervisión constante',
      ],
      simpleScript: '"Rindo al máximo cuando conozco el propósito general, tengo espacio para adueñarme de la solución y recibo revisiones rápidas."',
      leadershipAdvice: 'Lidera con propósito y contexto. Explica el resultado deseado, acuerda puntos de control y evita el detalle excesivo.',
    },
    fr: {
      name: 'Gen Z',
      years: '1997–2012',
      stereotype: 'Distrait. Exigeant. Impatient.',
      plainTruth: 'Vous êtes rapide, direct et recherchez un travail qui a du sens. Vous n\'avez pas besoin de microgestion, mais de clarté et de confiance.',
      defaultThrive: ['Attentes claires', 'Retours rapides', 'Flexibilité'],
      defaultNeeds: [
        'Expliquer le sens du travail',
        'Fournir des retours utiles à temps',
        'Donner l\'autonomie plutôt qu\'un contrôle constant',
      ],
      simpleScript: '"Je donne le meilleur quand je comprends la vision globale, que j\'ai l\'autonomie sur la solution et des points réguliers rapides."',
      leadershipAdvice: 'Guidez par le sens et le contexte. Définissez le résultat visé, convenez de jalons clairs et laissez faire.',
    },
    de: {
      name: 'Gen Z',
      years: '1997–2012',
      stereotype: 'Abgelenkt. Anspruchsvoll. Ungeduldig.',
      plainTruth: 'Du bist schnell, direkt und willst Arbeit, die Sinn ergibt. Du brauchst kein Mikromanagement, sondern Klarheit und Vertrauen.',
      defaultThrive: ['Klare Erwartungen', 'Schnelles Feedback', 'Flexibilität'],
      defaultNeeds: [
        'Den Sinn der Aufgabe erklären',
        'Zeitnahes Feedback geben',
        'Verantwortung statt Dauerüberwachung',
      ],
      simpleScript: '"Ich arbeite am besten, wenn ich das große Ganze kenne, Raum für eigene Lösungen habe und schnelles Feedback erhalte."',
      leadershipAdvice: 'Führe mit Sinn und Kontext. Nenne das gewünschte Ergebnis, vereinbare Meilensteine und ziehe dich aus dem Kleinteiligen zurück.',
    },
  },
  millennials: {
    en: {
      name: 'Millennials',
      years: '1981–1996',
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
    ta: {
      name: 'மில்லினியல்ஸ் (Millennials)',
      years: '1981–1996',
      stereotype: 'அடிக்கடி வேலை மாறுபவர் அல்லது எதிர்பார்ப்புகள் மிகுந்தவர்.',
      plainTruth: 'பணியின் ஆழமான தாக்கம், வளர்ச்சி மற்றும் குழுவின் ஒற்றுமை ஆகியவற்றில் நீங்கள் மிகுந்த அக்கறை கொண்டுள்ளீர்கள். மேலதிகார உத்தரவுகளை விட வழிகாட்டலையே விரும்புகிறீர்கள்.',
      defaultThrive: ['கூட்டு முயற்சி', 'உயர்ந்த நோக்கம்', 'வாழ்க்கை-பணி சமநிலை'],
      defaultNeeds: [
        'வேலையை நிஜ உலக தாக்கத்துடன் இணைத்தல்',
        'புதிய யோசனைகளுக்கு வாய்ப்பளித்தல்',
        'நிர்வாகம் மட்டுமின்றி நல்ல வழிகாட்டுதல்',
      ],
      simpleScript: '"நான் வெளிப்படையாகக் குழுவுடன் இணைந்து, எனது வேலை எவ்வாறு பயன் தருகிறது என்பதைப் புரிந்து, வெறும் பணிகளைத் தராமல் என் திறன்களை வளர்க்கும் மேலாளருடன் பணியாற்றும்போது சிறப்பாகச் செயல்படுகிறேன்."',
      leadershipAdvice: 'சிக்கல்களைத் தீர்ப்பதில் அவர்களை ஈடுபடுத்துங்கள். அவர்களின் கருத்துகளை தொடக்கத்திலேயே கேட்டு, அவர்களது பங்களிப்பு எவ்வாறு வாடிக்கையாளர்களுக்கோ அல்லது நிறுவன குறிக்கோளுக்கோ உதவுகிறது என்பதை வெளிப்படுத்துங்கள்.',
    },
    hi: {
      name: 'मिलेनियल्स (Millennials)',
      years: '1981–1996',
      stereotype: 'अक्सर नौकरी बदलने वाले या अत्यधिक अपेक्षा रखने वाले।',
      plainTruth: 'आप सार्थक प्रभाव, व्यक्तिगत विकास और टीम समन्वय को बहुत महत्व देते हैं। आप आदेशों के बजाय सही मार्गदर्शन पसंद करते हैं।',
      defaultThrive: ['सहयोग', 'सार्थक उद्देश्य', 'संतुलन'],
      defaultNeeds: [
        'काम को वास्तविक प्रभाव से जोड़ना',
        'नए विचारों के लिए अवसर देना',
        'सिर्फ प्रबंधन नहीं बल्कि कोचिंग प्रदान करना',
      ],
      simpleScript: '"मैं तब सबसे बेहतर प्रदर्शन करता हूँ जब मैं खुलकर सहयोग कर सकूँ, समझ सकूँ कि मेरा काम कैसे बदलाव ला रहा है, और ऐसा प्रबंधक मिले जो केवल कार्य सौंपने के बजाय मेरे कौशल को निखारे।"',
      leadershipAdvice: 'समस्या समाधान में उन्हें शामिल करें। शुरुआत में ही उनकी राय लें और दिखाएं कि उनका योगदान कैसे ग्राहकों या मिशन में सीधे मदद कर रहा है।',
    },
    es: {
      name: 'Millennials',
      years: '1981–1996',
      stereotype: 'Exigente o propenso a cambiar de trabajo.',
      plainTruth: 'Te importa profundamente el impacto significativo, el crecimiento y la cohesión del equipo. Valoras la mentoría por encima de las órdenes jerárquicas.',
      defaultThrive: ['Colaboración', 'Propósito', 'Equilibrio'],
      defaultNeeds: [
        'Conectar el trabajo con el impacto',
        'Dar espacio a nuevas ideas',
        'Entrenar, no solo gestionar',
      ],
      simpleScript: '"Prospero cuando puedo colaborar abiertamente, entender el impacto de mi trabajo y contar con un líder que desarrolle mis habilidades en lugar de solo asignar tareas."',
      leadershipAdvice: 'Involúcralos en la resolución de problemas. Pide su opinión temprano y muéstrales cómo sus aportes benefician directamente a los clientes o a la misión.',
    },
    fr: {
      name: 'Millennials',
      years: '1981–1996',
      stereotype: 'Instable ou en quête permanente de sens.',
      plainTruth: 'Vous accordez une grande importance à l\'impact réel, à la progression et à la cohésion d\'équipe. Vous privilégiez le mentorat aux directives descendantes.',
      defaultThrive: ['Collaboration', 'Sens', 'Équilibre'],
      defaultNeeds: [
        'Lier le travail à l\'impact concret',
        'Laisser place aux idées nouvelles',
        'Coacher plutôt que simplement encadrer',
      ],
      simpleScript: '"Je m\'épanouis quand je collabore ouvertement, comprends l\'impact de mon travail et bénéficie d\'un accompagnement formateur."',
      leadershipAdvice: 'Associez-les à la réflexion dès le début et montrez-leur en quoi leur contribution fait avancer la mission.',
    },
    de: {
      name: 'Millennials',
      years: '1981–1996',
      stereotype: 'Anspruchsvoll oder wechselfreudig.',
      plainTruth: 'Du legst großen Wert auf sinnvolle Wirkung, persönliches Wachstum und Teamzusammenhalt. Du schätzt Mentoring mehr als hierarchische Vorgaben.',
      defaultThrive: ['Zusammenarbeit', 'Sinnhaftigkeit', 'Balance'],
      defaultNeeds: [
        'Arbeit mit Wirkung verknüpfen',
        'Raum für Ideen schaffen',
        'Coachen statt nur Verwalten',
      ],
      simpleScript: '"Ich blühe auf, wenn ich offen zusammenarbeiten kann, die Wirkung meiner Arbeit spüre und ein Manager mich gezielt fördert."',
      leadershipAdvice: 'Binde sie früh in Problemlösungen ein und zeige auf, wie ihre Beiträge den Kunden oder dem Vorhaben nützen.',
    },
  },
  gen_x: {
    en: {
      name: 'Gen X',
      years: '1965–1980',
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
    ta: {
      name: 'ஜென் எக்ஸ் (Gen X)',
      years: '1965–1980',
      stereotype: 'சந்தேகப்படுபவர் அல்லது ஒதுங்கி இருப்பவர்.',
      plainTruth: 'நீங்கள் சுயசார்பும், அதிக திறமையும், நேரத்தையும் நடைமுறை முடிவுகளையும் கடுமையாகப் பாதுகாக்கும் குணம் கொண்டவர். வீண் பேச்சுகள் தேவையில்லை—சுயாதீனமே தேவை.',
      defaultThrive: ['சுயாதீனம்', 'திறன்மிகு செயல்பாடு', 'தகுதி'],
      defaultNeeds: [
        'அவர்களின் விநியோகத் திறனை நம்புதல்',
        'கூட்டங்களை பயனுள்ளதாக வைத்திருத்தல்',
        'அவர்களின் நேரத்தை மதித்தல்',
      ],
      simpleScript: '"இலக்கை என்னிடம் கூறி, அதை நிறைவேற்ற என்னை நம்புங்கள், மேலும் கூட்டங்களை முடிவுகளை நோக்கியதாக வையுங்கள். எனக்குச் சுதந்திரம் கிடைக்கும்போது சிறந்த பலனைத் தருகிறேன்."',
      leadershipAdvice: 'அவர்களின் சுதந்திரத்தை மதிக்கவும். முடிவில்லாத நிலைக் கூட்டங்களைத் தவிர்க்கவும்; திறமையாகத் தொடர்பு கொண்டு அவர்களின் அனுபவத்தை நம்பவும்.',
    },
    hi: {
      name: 'जेन एक्स (Gen X)',
      years: '1965–1980',
      stereotype: 'संदेही या अनासक्त।',
      plainTruth: 'आप आत्मनिर्भर, अत्यधिक सक्षम और समय व व्यावहारिक परिणामों के प्रति बेहद सजग हैं। आपको दिखावा नहीं—स्वायत्तता चाहिए।',
      defaultThrive: ['स्वतंत्रता', 'दक्षता', 'सक्षमता'],
      defaultNeeds: [
        'काम पूरा करने पर भरोसा रखना',
        'बैठकों को उपयोगी बनाए रखना',
        'उनके समय का सम्मान करना',
      ],
      simpleScript: '"मुझे लक्ष्य बताइए, निष्पादन पर भरोसा रखें और बैठकों को केवल निर्णयों पर केंद्रित रखें। स्वायत्तता मिलने पर मैं सर्वश्रेष्ठ परिणाम देता हूँ।"',
      leadershipAdvice: 'उनकी स्वतंत्रता का सम्मान करें। लंबी बैठकों से बचें, सीधे संवाद करें और उनके अनुभव पर विश्वास रखें।',
    },
    es: {
      name: 'Gen X',
      years: '1965–1980',
      stereotype: 'Escéptico o distante.',
      plainTruth: 'Eres autosuficiente, altamente competente y proteges con rigor tu tiempo y resultados prácticos. No necesitas adornos; necesitas autonomía.',
      defaultThrive: ['Independencia', 'Eficiencia', 'Competencia'],
      defaultNeeds: [
        'Confiar en su entrega',
        'Mantener reuniones útiles',
        'Respetar su tiempo',
      ],
      simpleScript: '"Dame el objetivo, confía en mi ejecución y enfoca las reuniones en decisiones. Rindo mejor cuando tengo autonomía."',
      leadershipAdvice: 'Respeta su independencia. Evita reuniones interminables; comunícate con eficiencia y confía en su trayectoria.',
    },
    fr: {
      name: 'Gen X',
      years: '1965–1980',
      stereotype: 'Sceptique ou distant.',
      plainTruth: 'Vous êtes autonome, très compétent et très protecteur de votre temps et des résultats concrets. Vous n\'avez pas besoin d\'artifices, mais d\'autonomie.',
      defaultThrive: ['Indépendance', 'Efficacité', 'Compétence'],
      defaultNeeds: [
        'Faire confiance sur la livraison',
        'Garder des réunions utiles',
        'Respecter leur temps',
      ],
      simpleScript: '"Donnez-moi la cible, faites-moi confiance pour exécuter et concentrez les réunions sur les décisions. Je réussis avec de l\'autonomie."',
      leadershipAdvice: 'Respectez leur autonomie. Évitez les réunions de statut inutiles, communiquez de façon concise et fiez-vous à leur solide expérience.',
    },
    de: {
      name: 'Gen X',
      years: '1965–1980',
      stereotype: 'Skeptisch oder distanziert.',
      plainTruth: 'Du bist selbstständig, äußerst fähig und schützt deine Zeit und praktische Ergebnisse konsequent. Du brauchst kein Drumherum, sondern Autonomie.',
      defaultThrive: ['Unabhängigkeit', 'Effizienz', 'Kompetenz'],
      defaultNeeds: [
        'Auf die Umsetzung vertrauen',
        'Meetings effizient halten',
        'Ihre Zeit respektieren',
      ],
      simpleScript: '"Gib mir das Ziel, vertraue meiner Umsetzung und halte Meetings entscheidungsfokussiert. Bei Autonomie liefere ich das Beste."',
      leadershipAdvice: 'Respektiere ihre Unabhängigkeit. Vermeide endlose Statusmeetings, kommuniziere direkt und setze auf ihre Erfahrung.',
    },
  },
  boomers: {
    en: {
      name: 'Boomers',
      years: '1946–1964',
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
    ta: {
      name: 'பூமர்ஸ் (Boomers)',
      years: '1946–1964',
      stereotype: 'மாற்றங்களை ஏற்காதவர் அல்லது பிடிவாதமானவர்.',
      plainTruth: 'நீங்கள் ஆழ்ந்த நிறுவன அனுபவம், நிலைத்தன்மை மற்றும் நிரூபிக்கப்பட்ட நம்பகத்தன்மையைக் கொண்டுவருகிறீர்கள். நேர்த்தியான பணித்திறனுக்கான மரியாதையையும் நேரடி உரையாடலையும் பாராட்டுகிறீர்கள்.',
      defaultThrive: ['அனுபவம்', 'நம்பகத்தன்மை', 'நிலைத்தன்மை'],
      defaultNeeds: [
        'அவர்களின் அனுபவத்தைப் பயன்படுத்துதல்',
        'முடிவுகளில் அவர்களை ஈடுபடுத்துதல்',
        'அவர்களின் அறிவுக்கு மதிப்பளித்தல்',
      ],
      simpleScript: '"நான் கடினமாகப் பெற்ற அனுபவத்தையும் தொடர்ச்சியான நிலைத்தன்மையையும் தருகிறேன். முக்கியமான முடிவுகளில் என்னை முன்கூட்டியே ஈடுபடுத்துங்கள், அணிக்கு வழிகாட்ட உதவுங்கள்."',
      leadershipAdvice: 'அவர்களின் பரந்த அனுபவத்தைப் பயன்படுத்துங்கள். புதிய மாற்றங்களைக் கொண்டுவரும்போது, அவர்களிடம் நேரடியாகக் கலந்தாலோசித்து அவர்கள் உருவாக்கிய உறுதியான அடித்தளத்தை அங்கீகரியுங்கள்.',
    },
    hi: {
      name: 'बूमर्स (Boomers)',
      years: '1946–1964',
      stereotype: 'कठोर या बदलाव का विरोध करने वाले।',
      plainTruth: 'आप गहरा संस्थागत अनुभव, स्थिरता और परखी हुई निष्ठा लेकर आते हैं। आप कार्य कुशलता के सम्मान और स्पष्ट संवाद को सराहते हैं।',
      defaultThrive: ['अनुभव', 'निष्ठा', 'स्थिरता'],
      defaultNeeds: [
        'उनके अनुभव से लाभ उठाना',
        'निर्णयों में उन्हें शामिल करना',
        'उनके ज्ञान का सम्मान करना',
      ],
      simpleScript: '"मैं कठिन परिश्रम से प्राप्त अनुभव और स्थिरता प्रदान करता हूँ। महत्वपूर्ण निर्णयों में मुझे शुरुआत में शामिल करें और टीम का मार्गदर्शन करने का अवसर दें।"',
      leadershipAdvice: 'उनके अनुभव का उपयोग करें। परिवर्तन लाते समय उनसे सीधा परामर्श लें और उनके द्वारा बनाई गई मजबूत नींव को स्वीकारें।',
    },
    es: {
      name: 'Boomers',
      years: '1946–1964',
      stereotype: 'Rígido o resistente al cambio.',
      plainTruth: 'Aportas profunda sabiduría institucional, estabilidad y lealtad comprobada. Valoras el respeto por el oficio y el diálogo transparente.',
      defaultThrive: ['Experiencia', 'Lealtad', 'Estabilidad'],
      defaultNeeds: [
        'Aprovechar su experiencia',
        'Involucrarlos en decisiones',
        'Mostrar respeto por sus conocimientos',
      ],
      simpleScript: '"Aporto experiencia consolidada y constancia. Involúcrame temprano en grandes decisiones y permíteme asesorar al equipo."',
      leadershipAdvice: 'Aprovecha su experiencia. Al implementar cambios, consúltalos directamente y reconoce los cimientos que han construido.',
    },
    fr: {
      name: 'Boomers',
      years: '1946–1964',
      stereotype: 'Rigide ou réticent au changement.',
      plainTruth: 'Vous apportez une profonde sagesse institutionnelle, de la stabilité et une loyauté éprouvée. Vous appréciez le travail bien fait et le dialogue direct.',
      defaultThrive: ['Expérience', 'Loyauté', 'Stabilité'],
      defaultNeeds: [
        'S\'appuyer sur leur expérience',
        'Les associer aux décisions clés',
        'Valoriser leurs connaissances',
      ],
      simpleScript: '"J\'apporte une solide expérience et de la régularité. Associez-moi tôt aux décisions et laissez-moi transmettre au groupe."',
      leadershipAdvice: 'Mettez à profit leur recul. Lors de transformations, échangez directement avec eux et valorisez les bases solides qu\'ils ont posées.',
    },
    de: {
      name: 'Boomers',
      years: '1946–1964',
      stereotype: 'Unflexibel oder veränderungsresistent.',
      plainTruth: 'Du bringst fundierte institutionelle Erfahrung, Stabilität und Verlässlichkeit mit. Du schätzt echtes Handwerk und direkten Dialog.',
      defaultThrive: ['Erfahrung', 'Loyalität', 'Stabilität'],
      defaultNeeds: [
        'Von ihrer Erfahrung lernen',
        'In Entscheidungen einbeziehen',
        'Fachwissen respektieren',
      ],
      simpleScript: '"Ich bringe hart erarbeitete Erfahrung und Beständigkeit mit. Bindet mich früh ein und lasst mich mein Wissen weitergeben."',
      leadershipAdvice: 'Nutze ihren Erfahrungsschatz. Beziehe sie bei Veränderungen früh ein und würdige das Fundament, das sie geschaffen haben.',
    },
  },
  gen_alpha: {
    en: {
      name: 'Gen Alpha',
      years: '2013 and later',
      stereotype: 'Screen-addicted with no patience.',
      plainTruth: 'You learn through instant interactive feedback, visual models, and fluid technological tools.',
      defaultThrive: ['Interactive learning', 'Visual feedback', 'Digital fluency'],
      defaultNeeds: [
        'Rapid prototype cycles',
        'Hands-on problem solving',
        'Clear, direct challenges',
      ],
      simpleScript: '"I learn fastest by experimenting hands-on and seeing immediate outcomes."',
      leadershipAdvice: 'Provide short, dynamic feedback loops with modern digital tools.',
    },
    ta: {
      name: 'ஜென் ஆல்ஃபா (Gen Alpha)',
      years: '2013 மற்றும் அதற்குப் பிறகு',
      stereotype: 'திரையிலேயே மூழ்கியிருப்பவர், பொறுமையற்றவர்.',
      plainTruth: 'உடனடி ஊடாடும் கருத்துகள், காட்சி மாதிரிகள் மற்றும் நவீன தொழில்நுட்பக் கருவிகள் மூலம் நீங்கள் வேகமாகப் பயில்கிறீர்கள்.',
      defaultThrive: ['ஊடாடும் கற்றல்', 'காட்சி வழிகாட்டல்', 'டிஜிட்டல் சரளத்தன்மை'],
      defaultNeeds: [
        'வேகமான மாதிரி சோதனைகள்',
        'நேரடி சிக்கல் தீர்வு',
        'தெளிவான, நேரடி சவால்கள்',
      ],
      simpleScript: '"நேரடியாகப் பரிசோதித்துப் பார்த்து உடனடி முடிவுகளைக் காண்பதன் மூலம் நான் மிக விரைவாகக் கற்றுக்கொள்கிறேன்."',
      leadershipAdvice: 'நவீன டிஜிட்டல் கருவிகளுடன் குறுகிய, சுறுசுறுப்பான கருத்துப் பகிர்வுகளை அளியுங்கள்.',
    },
    hi: {
      name: 'जेन अल्फा (Gen Alpha)',
      years: '2013 और बाद में',
      stereotype: 'स्क्रीन से चिपके रहने वाले और अधीर।',
      plainTruth: 'आप त्वरित इंटरैक्टिव प्रतिक्रिया, विज़ुअल मॉडल और उन्नत तकनीकी उपकरणों के माध्यम से सीखते हैं।',
      defaultThrive: ['इंटरैक्टिव लर्निंग', 'विज़ुअल फीडबैक', 'डिजिटल दक्षता'],
      defaultNeeds: [
        'तीव्र प्रोटोटाइप चक्र',
        'व्यावहारिक समस्या समाधान',
        'स्पष्ट और सीधी चुनौतियाँ',
      ],
      simpleScript: '"मैं व्यावहारिक प्रयोगों और त्वरित परिणामों को देखकर सबसे तेजी से सीखता हूँ।"',
      leadershipAdvice: 'आधुनिक डिजिटल उपकरणों के साथ संक्षिप्त और गतिशील प्रतिक्रिया चक्र प्रदान करें।',
    },
    es: {
      name: 'Gen Alpha',
      years: '2013 en adelante',
      stereotype: 'Apegado a las pantallas y sin paciencia.',
      plainTruth: 'Aprendes mediante retroalimentación interactiva instantánea, modelos visuales y herramientas tecnológicas fluidas.',
      defaultThrive: ['Aprendizaje interactivo', 'Retroalimentación visual', 'Fluidez digital'],
      defaultNeeds: [
        'Ciclos rápidos de prototipo',
        'Resolución práctica de problemas',
        'Desafíos claros y directos',
      ],
      simpleScript: '"Aprendo más rápido experimentando de forma práctica y viendo resultados inmediatos."',
      leadershipAdvice: 'Proporciona ciclos de retroalimentación cortos y dinámicos con herramientas digitales modernas.',
    },
    fr: {
      name: 'Gen Alpha',
      years: '2013 et après',
      stereotype: 'Accro aux écrans et sans patience.',
      plainTruth: 'Vous apprenez grâce à des retours interactifs instantanés, des modèles visuels et des outils technologiques fluides.',
      defaultThrive: ['Apprentissage interactif', 'Retours visuels', 'Aisance numérique'],
      defaultNeeds: [
        'Prototypes rapides',
        'Résolution pratique de défis',
        'Défis clairs et directs',
      ],
      simpleScript: '"J\'apprends plus vite en testant directement et en observant le résultat immédiat."',
      leadershipAdvice: 'Offrez des boucles d\'apprentissage courtes et dynamiques avec des outils actuels.',
    },
    de: {
      name: 'Gen Alpha',
      years: '2013 und später',
      stereotype: 'Bildschirmfixiert und ungeduldig.',
      plainTruth: 'Du lernst durch sofortiges interaktives Feedback, visuelle Modelle und moderne digitale Werkzeuge.',
      defaultThrive: ['Interaktives Lernen', 'Visuelles Feedback', 'Digitale Souveränität'],
      defaultNeeds: [
        'Schnelle Prototypenzyklen',
        'Praktische Problemlösung',
        'Klare, direkte Herausforderungen',
      ],
      simpleScript: '"Ich lerne am schnellsten durch Ausprobieren und unmittelbare Resultate."',
      leadershipAdvice: 'Biete kurze, dynamische Feedbackschleifen mit modernen digitalen Tools.',
    },
  },
};

export function getLocalizedGenerationGuide(
  birthYear: number,
  lang: SupportedLanguage
): GenerationGuideEntry {
  let key = 'boomers';
  let minYear = 1946;
  let maxYear = 1964;

  if (birthYear >= 1997 && birthYear <= 2012) {
    key = 'gen_z';
    minYear = 1997;
    maxYear = 2012;
  } else if (birthYear >= 1981 && birthYear <= 1996) {
    key = 'millennials';
    minYear = 1981;
    maxYear = 1996;
  } else if (birthYear >= 1965 && birthYear <= 1980) {
    key = 'gen_x';
    minYear = 1965;
    maxYear = 1980;
  } else if (birthYear > 2012) {
    key = 'gen_alpha';
    minYear = 2013;
    maxYear = 2030;
  }

  const guide = LOCALIZED_GENERATION_GUIDES[key][lang] || LOCALIZED_GENERATION_GUIDES[key].en;
  return {
    key,
    minBirthYear: minYear,
    maxBirthYear: maxYear,
    name: guide.name,
    years: guide.years,
    stereotype: guide.stereotype,
    plainTruth: guide.plainTruth,
    defaultThrive: guide.defaultThrive,
    defaultNeeds: guide.defaultNeeds,
    simpleScript: guide.simpleScript,
    leadershipAdvice: guide.leadershipAdvice,
  };
}

export function getLocalizedCohort(
  age: number,
  birthYear: number | undefined,
  lang: SupportedLanguage
): CohortInfo {
  const year = birthYear ?? 2026 - age;
  const guide = getLocalizedGenerationGuide(year, lang);
  return {
    band: guide.name,
    years: guide.years,
    myth: guide.stereotype,
  };
}

export function getLocalizedNatureParagraphs(
  socialScore: number,
  steadyScore: number,
  energy: EnergyTime,
  learn: LearningStyle,
  lang: SupportedLanguage
): { paragraph1: string; paragraph2: string } {
  // English (Default)
  if (lang === 'en') {
    const socialRead =
      socialScore >= 7
        ? 'You think out loud and land on the answer in the middle of the sentence, so a day of solo work leaves you flat.'
        : socialScore <= 4
        ? 'You process quietly and arrive with the conclusion already formed, which reads as certainty to people who did not see the work.'
        : 'You switch between thinking alone and thinking out loud, and you need a week that has room for both.';

    const energyLineMap: Record<EnergyTime, string> = {
      morning: 'Your clearest thinking happens early, so anything that matters should meet the day before the day meets you.',
      midday: 'You warm up rather than start hot. Guard late morning and stop scheduling meetings into it.',
      evening: 'Your best hours arrive after most people have stopped. Build the plan around evenings instead of fighting for mornings.',
      night: 'You do your real work late. That is workable, as long as the mornings after are not also load-bearing.',
    };

    const steadyRead =
      steadyScore >= 7
        ? 'go quiet and functional, which is useful, though people may stop asking how you are'
        : steadyScore <= 4
        ? 'feel it immediately and carry it for a while afterwards, so recovery has to be scheduled rather than hoped for'
        : 'hold for a while and then need a genuine break, usually about a day later than you take one';

    const learnLineMap: Record<LearningStyle, string> = {
      doing: 'you build with it',
      reading: 'you read and take notes on it',
      teaching: 'you explain it to someone else',
      watching: 'you watch it done once first',
    };

    return {
      paragraph1: `${socialRead} ${energyLineMap[energy]}`,
      paragraph2: `Under load you ${steadyRead}. New material sticks when ${learnLineMap[learn]} — so build the plan out of that, not out of whatever a course tells you to do.`,
    };
  }

  // Tamil (தமிழ்)
  if (lang === 'ta') {
    const socialRead =
      socialScore >= 7
        ? 'நீங்கள் உரையாடலின் போக்கிலேயே விடைகளைக் கண்டடைவீர்கள், எனவே தனியாக மட்டுமே வேலை செய்யும் நாள் உங்களுக்குச் சோர்வை ஏற்படுத்தக்கூடும்.'
        : socialScore <= 4
        ? 'நீங்கள் அமைதியாகச் சிந்தித்து, ஏற்கனவே முடிவான தெளிவோடு வருகிறீர்கள்; உங்கள் பின்னணி உழைப்பைப் பார்க்காதவர்களுக்கு இது அதீத உறுதியாகத் தோன்றலாம்.'
        : 'நீங்கள் தனியாகச் சிந்திப்பதற்கும் குழுவுடன் பகிர்வதற்கும் இடையே மாறி மாறிச் செயல்படுகிறீர்கள்; இரண்டிற்கும் இடமளிக்கும் ஒரு வாரம் உங்களுக்குத் தேவை.';

    const energyLineMap: Record<EnergyTime, string> = {
      morning: 'உங்கள் தெளிவான சிந்தனை அதிகாலையிலேயே நிகழ்கிறது, எனவே முக்கியமான காரியங்களை நாள் தொடங்கும்போதே கையில் எடுங்கள்.',
      midday: 'நீங்கள் மெதுவாக வேகமெடுக்கிறீர்கள். நண்பகல் நேரத்தைப் பாதுகாத்து, அதில் தேவையற்ற கூட்டங்களைத் தவிருங்கள்.',
      evening: 'பெரும்பாலான மக்கள் ஓய்வெடுக்கும் மாலையிலேயே உங்கள் சிறந்த ஆற்றல் வெளிப்படுகிறது. மாலையை மையமாகக் கொண்டு திட்டமிடுங்கள்.',
      night: 'இரவு நேரத்திலேயே உங்கள் ஆழமான உழைப்பு நிகழ்கிறது. மறுநாள் காலை அதிக சுமை இல்லாதவரை இது சிறப்பாக அமையும்.',
    };

    const steadyRead =
      steadyScore >= 7
        ? 'அமைதியாகவும் செயல்திறனுடனும் செயல்படுவீர்கள், இது பயனுள்ளது'
        : steadyScore <= 4
        ? 'அழுத்தத்தை உடனடியாக உணர்வீர்கள், எனவே ஓய்வை முன்கூட்டியே திட்டமிட வேண்டும்'
        : 'சிறிது காலம் தாங்கிப் பிடித்துவிட்டு பின் உண்மையான ஓய்வு தேவைப்படும்';

    const learnLineMap: Record<LearningStyle, string> = {
      doing: 'நீங்களாக செய்து பார்க்கும் போது',
      reading: 'வாசித்து குறிப்பெடுக்கும் போது',
      teaching: 'மற்றவருக்கு விளக்கும் போது',
      watching: 'ஒருமுறை பிறர் செய்வதைப் பார்க்கும் போது',
    };

    return {
      paragraph1: `${socialRead} ${energyLineMap[energy]}`,
      paragraph2: `பணிச்சுமையின் போது நீங்கள் ${steadyRead}. ${learnLineMap[learn]} புதிய விஷயங்கள் மனதில் ஆழமாகப் பதியும் — எனவே எந்தப் பொதுவான பயிற்சி சொல்வதையும் விட, இதன் அடிப்படையில் திட்டத்தை அமையுங்கள்.`,
    };
  }

  // Hindi (हिन्दी)
  if (lang === 'hi') {
    const socialRead =
      socialScore >= 7
        ? 'आप बातचीत करते हुए सोचते हैं और बोलते-बोलते ही समाधान तक पहुँचते हैं, इसलिए अकेले काम करने का पूरा दिन आपको थका सकता है।'
        : socialScore <= 4
        ? 'आप शांत रहकर विचार करते हैं और पहले से तय निष्कर्ष के साथ आते हैं, जो दूसरों को पूर्ण आत्मविश्वास लगता है।'
        : 'आप अकेले विचार करने और दूसरों के साथ साझा करने के बीच संतुलन बनाते हैं, और आपको ऐसा सप्ताह चाहिए जिसमें दोनों के लिए जगह हो।';

    const energyLineMap: Record<EnergyTime, string> = {
      morning: 'आपकी सबसे स्पष्ट सोच सुबह होती है, इसलिए जो महत्वपूर्ण है उसे दिन शुरू होने से पहले ही संभाल लें।',
      midday: 'आप धीरे-धीरे लय पकड़ते हैं। दोपहर के समय को सुरक्षित रखें और इसमें बैठकों का बोझ न डालें।',
      evening: 'अधिकांश लोगों के काम बंद करने के बाद आपका सर्वश्रेष्ठ समय आता है। सुबह से जूझने के बजाय शाम के अनुसार योजना बनाएं।',
      night: 'आप देर रात में वास्तविक काम करते हैं। जब तक अगली सुबह काम का भारी बोझ न हो, तब तक यह कारगर है।',
    };

    const steadyRead =
      steadyScore >= 7
        ? 'शांत और पूरी तरह से कार्यात्मक रहते हैं'
        : steadyScore <= 4
        ? 'दबाव को तुरंत महसूस करते हैं, इसलिए आराम को समय पर निर्धारित करना आवश्यक है'
        : 'कुछ समय तक संभालते हैं और फिर एक वास्तविक विश्राम की आवश्यकता होती है';

    const learnLineMap: Record<LearningStyle, string> = {
      doing: 'आप स्वयं बनाकर सीखते हैं',
      reading: 'आप पढ़कर नोट्स बनाते हैं',
      teaching: 'आप किसी अन्य को समझाते हैं',
      watching: 'आप पहले किसी को करते हुए देखते हैं',
    };

    return {
      paragraph1: `${socialRead} ${energyLineMap[energy]}`,
      paragraph2: `दबाव में आप ${steadyRead}। नई बातें तब दिल में उतरती हैं जब ${learnLineMap[learn]} — इसलिए अपनी योजना इसी के आधार पर बनाएं, न कि किसी बाहरी पाठ्यक्रम के निर्देशों पर।`,
    };
  }

  // Spanish (Español)
  if (lang === 'es') {
    const socialRead =
      socialScore >= 7
        ? 'Piensas en voz alta y llegas a la respuesta a mitad de la frase, por lo que un día completo a solas te agota.'
        : socialScore <= 4
        ? 'Procesas en silencio y llegas con la conclusión ya formada, lo que transmite gran seguridad a los demás.'
        : 'Alternas entre pensar en solitario y dialogar en grupo, y necesitas una semana con espacio para ambos.';

    const energyLineMap: Record<EnergyTime, string> = {
      morning: 'Tu pensamiento más lúcido ocurre temprano, así que lo crucial debe abordarse al comenzar la jornada.',
      midday: 'Entras en calor gradualmente. Protege el final de la mañana y evita saturarlo de reuniones.',
      evening: 'Tus mejores horas llegan cuando la mayoría termina. Diseña tu plan alrededor de las tardes.',
      night: 'Realizas tu mejor trabajo tarde en la noche. Funciona siempre que las mañanas siguientes no sean pesadas.',
    };

    const steadyRead =
      steadyScore >= 7
        ? 'te mantienes sereno y funcional'
        : steadyScore <= 4
        ? 'sientes la tensión al instante, por lo que debes agendar pausas deliberadas'
        : 'resistes un tiempo y luego necesitas un descanso genuino';

    const learnLineMap: Record<LearningStyle, string> = {
      doing: 'construyes con ello',
      reading: 'lees y tomas notas',
      teaching: 'se lo explicas a alguien más',
      watching: 'lo observas en acción primero',
    };

    return {
      paragraph1: `${socialRead} ${energyLineMap[energy]}`,
      paragraph2: `Bajo presión sueles ${steadyRead}. El material nuevo se asimila cuando ${learnLineMap[learn]} — así que diseña tu plan con base en eso.`,
    };
  }

  // Fallback to English
  return getLocalizedNatureParagraphs(socialScore, steadyScore, energy, learn, 'en');
}
