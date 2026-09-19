import { SupportedLanguage } from './types';

export interface HowToStep {
  step: string;
  title: string;
  desc: string;
}

export interface HowToDeliverable {
  badge: string;
  title: string;
  desc: string;
  highlight?: boolean;
}

export interface HowToUseCase {
  title: string;
  desc: string;
}

export interface HowToPageContent {
  userGuideBadge: string;
  backToStudio: string;
  walkthroughBadge: string;
  readTime: string;
  heroTitle: string;
  heroTagline: string;
  openStudioBtn: string;
  section1Title: string;
  section1Subtitle: string;
  steps: HowToStep[];
  section2Title: string;
  section2Subtitle: string;
  deliverables: HowToDeliverable[];
  section3Title: string;
  useCases: HowToUseCase[];
  ctaQuestion: string;
  ctaButton: string;
}

export const HOW_TO_TRANSLATIONS: Record<SupportedLanguage, HowToPageContent> = {
  // English
  en: {
    userGuideBadge: 'User Guide',
    backToStudio: '← Back to Studio',
    walkthroughBadge: 'Interactive Walkthrough',
    readTime: '5-Minute Guide',
    heroTitle: 'How to Use Fieldwork & Your Deliverables',
    heroTagline:
      'Fieldwork translates your personal signals, life stage, and operating traits into a clear, jargon-free development roadmap you can actually execute and share with leaders.',
    openStudioBtn: 'Open Live Studio →',
    section1Title: 'Step-by-Step: How to Use the Studio',
    section1Subtitle: 'The Studio updates reactively in real time as you adjust inputs on the left.',
    steps: [
      {
        step: 'Step 1',
        title: 'Enter Your Name & Date of Birth (DOB)',
        desc: 'Enter your first name and pick your birthdate. Fieldwork automatically computes your exact age and unlocks your generational cohort (Gen Z, Millennials, Gen X, or Boomers) without lazy stereotypes. Also select your role, weekly hours you can protect, and peak energy time.',
      },
      {
        step: 'Step 2',
        title: 'Tune Culture & Leadership Fit',
        desc: 'Select the workplace conditions that help you thrive (e.g. Flexibility, Purpose, Fast feedback) and specify what you need from managers (e.g. Give ownership, not constant oversight, Coaching, not just managing). These are pre-populated from your generation and can be freely customized.',
      },
      {
        step: 'Step 3',
        title: 'Calibrate Your 6 Operating Traits',
        desc: 'Move the electric-lime sliders (1 to 10) for Curiosity, Follow-through, Social energy, Reading people, Steadiness under pressure, and Appetite for challenge. Rate how you actually operate on a normal week, not an idealized version.',
      },
      {
        step: 'Step 4',
        title: 'Pick Focus Domains & Blocker',
        desc: 'Choose 3 to 5 areas of interest (e.g. Technical craft, Leading people, Writing & speaking), name your target goal, identify your biggest friction point (time, focus, energy, fear of judgment), and set your execution horizon (30, 60, or 90 days).',
      },
    ],
    section2Title: 'The 6 Key Deliverables You Receive',
    section2Subtitle: 'Every output is calculated deterministically and customized to your exact answers.',
    deliverables: [
      {
        badge: 'Deliverable 01',
        title: 'Generational Alignment Playbook',
        desc: 'Busts unfair stereotypes, validates what environments let you thrive, and generates a 1-minute conversation script you can share with your manager in 1-on-1s.',
        highlight: true,
      },
      {
        badge: 'Deliverable 02',
        title: 'Archetype & Operational Streak',
        desc: 'Identifies your primary archetype (e.g. The Autonomous Explorer, The High-Velocity Finisher, The Systems Thinker) paired with your behavioral streak to capture your unique work identity.',
      },
      {
        badge: 'Deliverable 03',
        title: 'Ranked Trait Intelligence & Hexagon',
        desc: 'Ranks all 6 core operating traits with visual electric-lime meters and an interactive 360° radar polygon, comparing self-ratings against observed peer perceptions.',
      },
      {
        badge: 'Deliverable 04',
        title: 'Strengths & Growth Antidotes',
        desc: 'Highlights your top 3 strengths and synergies with chosen domains, plus specific counter-strategies for your 2 lowest traits and chosen blocker.',
      },
      {
        badge: 'Deliverable 05',
        title: '9-Action Phased Roadmap',
        desc: 'Sequenced across 3 milestones (Clear the ground, Make it routine, Put it in front of someone) with interactive checkboxes and live completion tracking.',
        highlight: true,
      },
      {
        badge: 'Deliverable 06',
        title: 'One-Click Exports (PDF & Markdown)',
        desc: 'Export a clean, distraction-free PDF formatted for printing or copy a complete Markdown summary directly to your clipboard for Notion, Slack, or email.',
      },
    ],
    section3Title: 'Where & When to Use Fieldwork',
    useCases: [
      {
        title: '1-on-1s with Your Manager',
        desc: 'Use the "How to Work With Me" script to align expectations, request autonomy, and request feedback in a constructive way.',
      },
      {
        title: 'Quarterly Development Reviews',
        desc: 'Export your 30, 60, or 90-day plan as a PDF to anchor performance reviews and professional development discussions.',
      },
      {
        title: 'Leading Cross-Gen Teams',
        desc: 'Reference the Generational Guide to understand what colleagues from different cohorts need to perform at their best.',
      },
    ],
    ctaQuestion: 'Ready to generate your personalized development plan?',
    ctaButton: 'Start in Studio →',
  },

  // Simple Tamil (எளிய தமிழ்)
  ta: {
    userGuideBadge: 'பயனர் வழிகாட்டி',
    backToStudio: '← ஸ்டுடியோவிற்குத் திரும்பு',
    walkthroughBadge: 'எளிய செயல்முறை விளக்கம்',
    readTime: '5-நிமிட வழிகாட்டி',
    heroTitle: 'ஃபீல்ட்வொர்க்கை எவ்வாறு பயன்படுத்துவது & நீங்கள் பெறும் நன்மைகள்',
    heroTagline:
      'உங்கள் தனிப்பட்ட திறன்கள், வாழ்க்கை நிலை மற்றும் பணிப் பாணியை அடிப்படையாகக் கொண்டு, தேவையில்லாத கடினமான சொற்கள் எதுவுமின்றி, எளிதாகச் செயல்படுத்தக்கூடிய தெளிவான தொழில் வளர்ச்சி வழிகாட்டியை ஃபீல்ட்வொர்க் உருவாக்குகிறது.',
    openStudioBtn: 'நேரடி ஸ்டுடியோவைத் திறக்கவும் →',
    section1Title: 'படிப் படியாக: ஸ்டுடியோவை எவ்வாறு பயன்படுத்துவது?',
    section1Subtitle: 'இடதுபுறத்தில் நீங்கள் தகவல்களை மாற்றும்போதே, வலதுபுறத்தில் உங்கள் திட்டம் உடனுக்குடன் தானாக மாறும்.',
    steps: [
      {
        step: 'படி 1',
        title: 'உங்கள் பெயர் & பிறந்த தேதியை உள்ளிடவும்',
        desc: 'உங்கள் பெயரையும் பிறந்த தேதியையும் கொடுங்கள். ஃபீல்ட்வொர்க் உங்கள் சரியான வயதைக் கணக்கிட்டு, பழைய தவறான கற்பிதங்கள் எதுவுமின்றி உங்கள் தலைமுறையை (Gen Z, Millennials, Gen X, Boomers) தானாகக் கண்டறியும். மேலும் உங்கள் தற்போதைய பணி நிலை, வாரத்திற்கு ஒதுக்கக்கூடிய நேரம் மற்றும் உற்சாகமாக வேலை செய்யும் நேரத்தைத் தேர்வுசெய்யவும்.',
      },
      {
        step: 'படி 2',
        title: 'பணிச் சூழல் & மேலாளர் எதிர்பார்ப்புகளை அமையுங்கள்',
        desc: 'நீங்கள் உற்சாகமாக வேலை செய்ய உதவும் சூழல்களைத் தேர்ந்தெடுக்கவும் (எ.கா: பணி நேர நெகிழ்வுத்தன்மை, தெளிவான நோக்கம், உடனடி ஆலோசனைகள்). மேலும் உங்கள் மேலாளர்களிடம் நீங்கள் எதிர்பார்ப்பவற்றைக் குறிப்பிடவும் (எ.கா: தேவையற்ற கண்காணிப்பைத் தவிர்த்து பொறுப்பை வழங்குவது, நல்ல வழிகாட்டல்). இவற்றை நீங்கள் உங்கள் விருப்பப்படி மாற்றிக்கொள்ளலாம்.',
      },
      {
        step: 'படி 3',
        title: 'உங்கள் 6 முக்கிய வேலை குணங்களை மதிப்பிடுங்கள்',
        desc: 'ஆர்வக் குணம் (Curiosity), தொடங்கியதை முடிக்கும் திறன் (Follow-through), பிறருடன் இணைந்து செயல்படுதல் (Social energy), மனிதர்களைப் புரிந்து கொள்ளுதல் (Reading people), அழுத்தத்தைத் தாங்கும் அமைதி (Steadiness), மற்றும் புதிய சவால்களை ஏற்கும் ஆர்வம் (Drive) ஆகிய 6 அளவுகோல்களை (1 முதல் 10 வரை) அமையுங்கள். ஒரு சாதாரண வாரத்தில் நீங்கள் இயல்பாக எப்படிச் செயல்படுகிறீர்களோ அதையே குறிப்பிடுங்கள்.',
      },
      {
        step: 'படி 4',
        title: 'கவனம் செலுத்த வேண்டிய துறைகள் & தடைகளைத் தேர்ந்தெடுக்கவும்',
        desc: 'உங்களுக்குப் பிடித்த 3 முதல் 5 துறைகளைத் தேர்ந்தெடுக்கவும் (எ.கா: தொழில்நுட்பத் திறன், தலைமைப் பண்பு, பேசுதல் & எழுதுதல்). உங்கள் முக்கிய இலக்கையும், உங்கள் முன்னேற்றத்திற்குத் தடையாக இருக்கும் விஷயத்தையும் (நேரமின்மை, கவனச்சிதறல், சோர்வு, பிறர் என்ன சொல்வார்களோ என்ற பயம்) அடையாளம் கண்டு, திட்டக் காலத்தை (30, 60, அல்லது 90 நாட்கள்) முடிவு செய்யுங்கள்.',
      },
    ],
    section2Title: 'நீங்கள் பெறும் 6 முக்கியமான பயன்கள்',
    section2Subtitle: 'ஒவ்வொரு முடிவும் உங்கள் பதில்களை மட்டுமே அடிப்படையாகக் கொண்டு துல்லியமாக உருவாக்கப்படுகிறது.',
    deliverables: [
      {
        badge: 'பயன் 01',
        title: 'தலைமுறை வழிகாட்டி (Generational Playbook)',
        desc: 'உங்கள் தலைமுறையைப் பற்றிய தவறான எண்ணங்களை உடைத்து, நீங்கள் சிறப்பாகச் செயல்பட என்ன தேவை என்பதை விளக்குகிறது. மேலும் மேலாளருடன் நேரில் பேச உதவும் 1-நிமிட உரையாடல் குறிப்பையும் தருகிறது.',
        highlight: true,
      },
      {
        badge: 'பயன் 02',
        title: 'முதன்மை ஆளுமை அடையாளம் (Archetype)',
        desc: 'உங்கள் முதன்மையான பணி ஆளுமையை (எ.கா: தன்னிச்சையான ஆய்வாளர், துரித வேக நிறைவாளர், கட்டமைப்பு சிந்தனையாளர்) உங்கள் தனித்துவமான வேலைப் பாணியுடன் வெளிப்படுத்துகிறது.',
      },
      {
        badge: 'பயன் 03',
        title: 'குணநலன்கள் பகுப்பாய்வு & வரைபடம் (Trait Radar)',
        desc: 'உங்கள் 6 முக்கிய குணநலன்களையும் வண்ண அளவீடுகள் மற்றும் முப்பரிமாண ரடார் வரைபடம் மூலமாகத் தெளிவாகக் காட்டுகிறது. சக ஊழியர்களின் மதிப்பீட்டையும் இதனுடன் ஒப்பிட்டுப் பார்க்கலாம்.',
      },
      {
        badge: 'பயன் 04',
        title: 'பலங்கள் & பலவீனங்களைச் சரிசெய்யும் வழிகள்',
        desc: 'உங்கள் முக்கிய 3 பலங்களை அடையாளம் கண்டு, பின்தங்கியுள்ள 2 குணங்களையும், உங்கள் வேலைத் தடையையும் எளிதாகக் கையாள்வதற்கான நடைமுறை உத்திகளை வழங்குகிறது.',
      },
      {
        badge: 'பயன் 05',
        title: '3 கட்டங்களாகப் பிரிக்கப்பட்ட 9 செயல்திட்டங்கள்',
        desc: 'அடித்தளம் அமைத்தல், வழக்கமான பழக்கமாக்குதல், பிறருக்கு வெளிப்படுத்துதல் என 3 நிலைகளில் தெளிவான பணிகளாகப் பிரிக்கப்பட்டு, முடித்தவற்றைக் குறிக்கும் தேர்வுப்பெட்டிகளுடன் தரப்படுகிறது.',
        highlight: true,
      },
      {
        badge: 'பயன் 06',
        title: 'ஒரே கிளிக்கில் பதிவிறக்கம் (PDF & Markdown)',
        desc: 'அச்சிடுவதற்கு ஏற்ற நேர்த்தியான PDF கோப்பாகப் பதிவிறக்கலாம், அல்லது நோஷன், ஸ்லாக், மின்னஞ்சலில் உடனடியாக ஒட்ட மார்க்டவுன் வடிவில் நகலெடுக்கலாம்.',
      },
    ],
    section3Title: 'ஃபீல்ட்வொர்க்கை எங்கு, எப்போது பயன்படுத்தலாம்?',
    useCases: [
      {
        title: 'மேலாளருடனான 1-on-1 சந்திப்புகளில்',
        desc: '"என்னிடம் எப்படி இணைந்து பணியாற்றலாம்" என்ற குறிப்பைப் பயன்படுத்தி, உங்கள் தேவைகளையும் எதிர்பார்ப்புகளையும் மேலாளரிடம் கண்ணியமாகவும் தெளிவாகவும் பகிருங்கள்.',
      },
      {
        title: 'காலாண்டு வளர்ச்சி மதிப்பீடுகளில்',
        desc: 'உங்கள் 30, 60, அல்லது 90 நாள் திட்டத்தை PDF ஆக எடுத்துச் சென்று, உங்கள் பணி முன்னேற்றத்தை மேலதிகாரிகளுக்கு நிரூபித்துக் காட்டுங்கள்.',
      },
      {
        title: 'பல்வேறு தலைமுறை குழுக்களை வழிநடத்த',
        desc: 'உங்கள் குழுவில் உள்ள வெவ்வேறு தலைமுறை நண்பர்கள் என்ன மாதிரியான சூழலில் சிறப்பாக உழைப்பார்கள் என்பதைப் புரிந்து கொள்ள தலைமுறை வழிகாட்டியைப் பயன்படுத்துங்கள்.',
      },
    ],
    ctaQuestion: 'உங்களுக்கான தனிப்பட்ட தொழில் வளர்ச்சித் திட்டத்தை உருவாக்கத் தயாரா?',
    ctaButton: 'ஸ்டுடியோவில் தொடங்கவும் →',
  },

  // Hindi (हिन्दी)
  hi: {
    userGuideBadge: 'उपयोगकर्ता मार्गदर्शिका',
    backToStudio: '← स्टूडियो पर वापस जाएं',
    walkthroughBadge: 'सरल इंटरैक्टिव वॉकथ्रू',
    readTime: '5-मिनट की गाइड',
    heroTitle: 'फील्डवर्क का उपयोग कैसे करें और आपकी उपलब्धियां',
    heroTagline:
      'फील्डवर्क आपके व्यक्तिगत संकेतों, जीवन के पड़ाव और काम करने की शैली को एक सरल, बिना किसी जटिल शब्दावली वाले विकास रोडमैप में बदलता है, जिसे आप आसानी से लागू कर सकते हैं और अपने अधिकारियों के साथ साझा कर सकते हैं।',
    openStudioBtn: 'लाइव स्टूडियो खोलें →',
    section1Title: 'चरण-दर-चरण: स्टूडियो का उपयोग कैसे करें',
    section1Subtitle: 'जैसे ही आप बाईं ओर इनपुट बदलते हैं, दाईं ओर आपकी योजना तुरंत रीयल-टाइम में अपडेट होती है।',
    steps: [
      {
        step: 'चरण 1',
        title: 'अपना नाम और जन्म तिथि (DOB) दर्ज करें',
        desc: 'अपना नाम और जन्म तिथि दर्ज करें। फील्डवर्क स्वचालित रूप से आपकी सटीक आयु की गणना करता है और बिना किसी रूढ़िवादिता के आपकी पीढ़ी (Gen Z, Millennials, Gen X, या Boomers) को पहचानता है। साथ ही अपनी भूमिका, साप्ताहिक उपलब्ध समय और शीर्ष ऊर्जा समय चुनें।',
      },
      {
        step: 'चरण 2',
        title: 'कार्य संस्कृति और नेतृत्व की ज़रूरतों को सेट करें',
        desc: 'वे कार्य स्थितियां चुनें जो आपको बेहतर काम करने में मदद करती हैं (जैसे लचीलापन, सार्थक उद्देश्य, त्वरित प्रतिक्रिया) और बताएं कि आपको प्रबंधकों से क्या सहयोग चाहिए (जैसे अनावश्यक निगरानी के बजाय जिम्मेदारी देना, कोचिंग देना)।',
      },
      {
        step: 'चरण 3',
        title: 'अपने 6 प्रमुख कार्य-गुणों को जांचें',
        desc: 'जिज्ञासा (Curiosity), काम पूरा करने की लगन (Follow-through), सामाजिक ऊर्जा (Social energy), लोगों को समझना (Reading people), दबाव में स्थिरता (Steadiness), और चुनौतियों की भूख (Drive) के स्लाइडर्स (1 से 10) को सेट करें। एक सामान्य सप्ताह में आप वास्तव में कैसा काम करते हैं, उसी के आधार पर रेटिंग दें।',
      },
      {
        step: 'चरण 4',
        title: 'फोकस क्षेत्र और मुख्य रुकावट चुनें',
        desc: 'अपनी रुचि के 3 से 5 क्षेत्र चुनें (जैसे तकनीकी कौशल, टीम नेतृत्व, लेखन व संवाद), अपना मुख्य लक्ष्य तय करें, अपनी सबसे बड़ी रुकावट (समय, एकाग्रता, ऊर्जा, आलोचना का डर) चुनें और समय सीमा (30, 60 या 90 दिन) निर्धारित करें।',
      },
    ],
    section2Title: 'आपको मिलने वाले 6 प्रमुख परिणाम',
    section2Subtitle: 'प्रत्येक परिणाम केवल आपकी सटीक प्रविष्टियों के आधार पर तैयार किया जाता है।',
    deliverables: [
      {
        badge: 'परिणाम 01',
        title: 'पीढ़ीगत तालमेल प्लेबुक (Generational Playbook)',
        desc: 'अनुचित रूढ़ियों को तोड़ता है, बताता है कि आप किस माहौल में फलते-फूलते हैं, और प्रबंधकों के साथ 1-on-1 बातचीत के लिए 1-मिनट की सटीक स्क्रिप्ट देता है।',
        highlight: true,
      },
      {
        badge: 'परिणाम 02',
        title: 'कार्यशैली व्यक्तित्व (Archetype)',
        desc: 'आपकी प्राथमिक कार्यशैली (जैसे स्वायत्त अन्वेषक, तीव्र गति समापनकर्ता, सिस्टम्स थिंकर) को आपकी अनूठी पहचान के रूप में दर्शाता है।',
      },
      {
        badge: 'परिणाम 03',
        title: 'क्रमबद्ध गुण विश्लेषण व रडार पॉलीगॉन',
        desc: 'सभी 6 मुख्य कार्य-गुणों को स्पष्ट मीटर और इंटरैक्टिव 360° रडार पॉलीगॉन के साथ प्रस्तुत करता है, जिससे आत्म-मूल्यांकन और सहकर्मियों की धारणा की तुलना होती है।',
      },
      {
        badge: 'परिणाम 04',
        title: 'शक्तियां और विकास के ठोस उपाय',
        desc: 'आपकी शीर्ष 3 शक्तियों को उजागर करता है और कमजोर 2 गुणों व चुनी गई रुकावट से पार पाने के लिए व्यावहारिक रणनीतियाँ प्रदान करता है।',
      },
      {
        badge: 'परिणाम 05',
        title: '9-कार्यों का चरणबद्ध रोडमैप',
        desc: '3 चरणों में व्यवस्थित (नींव तैयार करना, दिनचर्या बनाना, दूसरों के सामने प्रस्तुत करना) इंटरैक्टिव चेकबॉक्स और प्रगति ट्रैकिंग के साथ।',
        highlight: true,
      },
      {
        badge: 'परिणाम 06',
        title: 'एक-क्लिक निर्यात (PDF और Markdown)',
        desc: 'प्रिंटिंग के लिए तैयार स्वच्छ PDF डाउनलोड करें या Notion, Slack व ईमेल में तुरंत साझा करने के लिए Markdown सारांश कॉपी करें।',
      },
    ],
    section3Title: 'फील्डवर्क का उपयोग कब और कहाँ करें?',
    useCases: [
      {
        title: 'प्रबंधक के साथ 1-on-1 बातचीत में',
        desc: '"मेरे साथ कैसे काम करें" स्क्रिप्ट का उपयोग करके अपेक्षाओं में तालमेल बिठाएं और रचनात्मक तरीके से स्वायत्तता व फीडबैक मांगें।',
      },
      {
        title: 'तिमाही विकास समीक्षा में',
        desc: 'अपने 30, 60 या 90 दिनों के प्लान को PDF में निर्यात करें और प्रदर्शन मूल्यांकन व करियर चर्चा का मजबूत आधार बनाएं।',
      },
      {
        title: 'विभिन्न पीढ़ियों की टीमों का नेतृत्व करने में',
        desc: 'पीढ़ीगत गाइड का संदर्भ लेकर समझें कि विभिन्न पीढ़ियों के सहकर्मियों को सर्वश्रेष्ठ प्रदर्शन के लिए किस प्रकार के सहयोग की आवश्यकता है।',
      },
    ],
    ctaQuestion: 'क्या आप अपनी व्यक्तिगत विकास योजना बनाने के लिए तैयार हैं?',
    ctaButton: 'स्टूडियो में शुरू करें →',
  },

  // Spanish (Español)
  es: {
    userGuideBadge: 'Guía de Usuario',
    backToStudio: '← Volver al Estudio',
    walkthroughBadge: 'Recorrido Interactivo',
    readTime: 'Guía de 5 Minutos',
    heroTitle: 'Cómo Usar Fieldwork y tus Entregables',
    heroTagline:
      'Fieldwork traduce tus señales personales, etapa vital y rasgos operativos en una hoja de ruta de desarrollo clara y sin rodeos que puedes ejecutar y compartir con tus líderes.',
    openStudioBtn: 'Abrir Estudio en Vivo →',
    section1Title: 'Paso a Paso: Cómo Usar el Estudio',
    section1Subtitle: 'El Estudio se actualiza en tiempo real a medida que ajustas las señales a la izquierda.',
    steps: [
      {
        step: 'Paso 1',
        title: 'Ingresa tu Nombre y Fecha de Nacimiento (DOB)',
        desc: 'Ingresa tu nombre y selecciona tu fecha de nacimiento. Fieldwork calcula tu edad exacta y determina tu cohorte generacional (Gen Z, Millennials, Gen X o Boomers) sin estereotipos simplistas. Define también tu rol, horas protegidas semanales y momento de mayor energía.',
      },
      {
        step: 'Paso 2',
        title: 'Ajusta Cultura y Ajuste de Liderazgo',
        desc: 'Elige las condiciones laborales que te hacen prosperar (ej. flexibilidad, propósito, retroalimentación rápida) y qué necesitas de tus líderes (ej. autonomía sin microgestión, mentoría).',
      },
      {
        step: 'Paso 3',
        title: 'Calibra tus 6 Rasgos Operativos',
        desc: 'Ajusta los controles de 1 a 10 para Curiosidad, Seguimiento y Cierre, Energía social, Lectura interpersonal, Estabilidad bajo presión y Empuje ante el reto.',
      },
      {
        step: 'Paso 4',
        title: 'Elige Dominios de Enfoque y Bloqueo',
        desc: 'Selecciona de 3 a 5 áreas de interés, define tu objetivo principal, identifica tu mayor fricción y fija el horizonte temporal (30, 60 o 90 días).',
      },
    ],
    section2Title: 'Los 6 Entregables Clave que Recibes',
    section2Subtitle: 'Cada resultado se calcula de forma determinista adaptado a tus respuestas.',
    deliverables: [
      {
        badge: 'Entregable 01',
        title: 'Manual de Alineación Generacional',
        desc: 'Derriba mitos, valida qué entornos te impulsan y genera un guion de conversación de 1 minuto para reuniones 1 a 1.',
        highlight: true,
      },
      {
        badge: 'Entregable 02',
        title: 'Arquetipo e Identidad Operativa',
        desc: 'Identifica tu arquetipo principal combinado con tu ritmo de trabajo característico.',
      },
      {
        badge: 'Entregable 03',
        title: 'Inteligencia de Rasgos y Polígono Radar',
        desc: 'Clasifica los 6 rasgos centrales con indicadores visuales y polígono 360° para comparar autoevaluación con percepción observada.',
      },
      {
        badge: 'Entregable 04',
        title: 'Fortalezas y Antídotos de Crecimiento',
        desc: 'Destaca tus 3 mayores fortalezas y ofrece contrarrestategias prácticas para tus rasgos más bajos y tu bloqueo principal.',
      },
      {
        badge: 'Entregable 05',
        title: 'Hoja de Ruta por Fases de 9 Acciones',
        desc: 'Estructurada en 3 hitos con casillas interactivas y seguimiento de avance en tiempo real.',
        highlight: true,
      },
      {
        badge: 'Entregable 06',
        title: 'Exportaciones en un Clic (PDF y Markdown)',
        desc: 'Exporta un PDF limpio listo para imprimir o copia el resumen en Markdown para Notion, Slack o correo.',
      },
    ],
    section3Title: 'Dónde y Cuándo Usar Fieldwork',
    useCases: [
      {
        title: 'En 1 a 1 con tu Manager',
        desc: 'Usa el guion para alinear expectativas, solicitar autonomía y pedir retroalimentación oportuna.',
      },
      {
        title: 'Revisiones Trimestrales de Desarrollo',
        desc: 'Exporta tu plan a 30, 60 o 90 días en PDF como soporte para conversaciones de desempeño y desarrollo profesional.',
      },
      {
        title: 'Liderazgo de Equipos Multigeneracionales',
        desc: 'Consulta la guía generacional para comprender qué necesita cada colega para dar lo mejor de sí.',
      },
    ],
    ctaQuestion: '¿Listo para generar tu plan de desarrollo personalizado?',
    ctaButton: 'Comenzar en el Estudio →',
  },

  // French (Français)
  fr: {
    userGuideBadge: 'Guide Utilisateur',
    backToStudio: '← Retour au Studio',
    walkthroughBadge: 'Visite Interactive',
    readTime: 'Guide en 5 Minutes',
    heroTitle: 'Comment Utiliser Fieldwork & Vos Livrables',
    heroTagline:
      'Fieldwork transforme vos signaux personnels, votre étape de vie et vos traits opérationnels en une feuille de route claire, sans jargon, prête à être exécutée et partagée.',
    openStudioBtn: 'Ouvrir le Studio en Direct →',
    section1Title: 'Étape par Étape : Comment Utiliser le Studio',
    section1Subtitle: 'Le Studio s\'actualise en direct au fur et à mesure que vous ajustez les signaux à gauche.',
    steps: [
      {
        step: 'Étape 1',
        title: 'Saisissez votre Nom et Date de Naissance (DOB)',
        desc: 'Indiquez votre prénom et date de naissance. Fieldwork détermine votre âge exact et votre cohorte générationnelle (Gen Z, Millennials, Gen X, Boomers) sans clichés simplistes.',
      },
      {
        step: 'Étape 2',
        title: 'Ajustez Culture et Style de Management',
        desc: 'Sélectionnez les facteurs propices à votre épanouissement (flexibilité, sens, retours rapides) et vos attentes vis-à-vis des managers.',
      },
      {
        step: 'Étape 3',
        title: 'Calibrez vos 6 Traits Opérationnels',
        desc: 'Ajustez les curseurs de 1 à 10 pour la Curiosité, le Suivi et Finition, l\'Énergie relationnelle, la Perspicacité, la Constance et le Goût du défi.',
      },
      {
        step: 'Étape 4',
        title: 'Choisissez vos Domaines Clés et Blocages',
        desc: 'Définissez 3 à 5 centres d\'intérêt, nommez votre objectif cible, identifiez votre principal frein et choisissez votre horizon (30, 60 ou 90 jours).',
      },
    ],
    section2Title: 'Les 6 Livrables Clés que Vous Recevez',
    section2Subtitle: 'Chaque résultat est calculé de manière déterministe et personnalisé selon vos réponses.',
    deliverables: [
      {
        badge: 'Livrable 01',
        title: 'Guide d\'Alignement Générationnel',
        desc: 'Déconstruit les stéréotypes, valide vos leviers d\'efficacité et fournit un script de dialogue d\'une minute pour vos points réguliers.',
        highlight: true,
      },
      {
        badge: 'Livrable 02',
        title: 'Archétype & Signature Opérationnelle',
        desc: 'Définit votre archétype principal associé à votre dynamique de travail singulière.',
      },
      {
        badge: 'Livrable 03',
        title: 'Intelligence des Traits & Polygone Radar',
        desc: 'Classe vos 6 traits essentiels avec jauges visuelles et radar 360° pour confronter auto-évaluation et perception observée.',
      },
      {
        badge: 'Livrable 04',
        title: 'Forces & Leviers de Progression',
        desc: 'Met en lumière vos 3 principaux atouts et propose des parades ciblées pour vos traits en retrait et votre frein majeur.',
      },
      {
        badge: 'Livrable 05',
        title: 'Feuille de Route en 3 Phases (9 Actions)',
        desc: 'Articulée autour de 3 étapes clés avec cases interactives et suivi de progression en direct.',
        highlight: true,
      },
      {
        badge: 'Livrable 06',
        title: 'Exports en un Clic (PDF & Markdown)',
        desc: 'Générez un PDF épuré prêt à l\'impression ou copiez la synthèse Markdown complète pour Notion, Slack ou email.',
      },
    ],
    section3Title: 'Où et Quand Utiliser Fieldwork',
    useCases: [
      {
        title: 'En Entretien Individuel (1-on-1)',
        desc: 'Utilisez la trame de dialogue pour aligner les attentes, demander l\'autonomie nécessaire et solliciter des retours constructifs.',
      },
      {
        title: 'Bilans Trimestriels de Développement',
        desc: 'Exportez votre feuille de route en PDF pour appuyer vos entretiens d\'évaluation et vos trajectoires de carrière.',
      },
      {
        title: 'Management d\'Équipes Multigénérationnelles',
        desc: 'Consultez les repères générationnels pour comprendre les conditions optimales de travail de chacun de vos collaborateurs.',
      },
    ],
    ctaQuestion: 'Prêt à générer votre plan de développement personnalisé ?',
    ctaButton: 'Démarrer dans le Studio →',
  },

  // German (Deutsch)
  de: {
    userGuideBadge: 'Benutzerhandbuch',
    backToStudio: '← Zurück zum Studio',
    walkthroughBadge: 'Interaktiver Rundgang',
    readTime: '5-Minuten-Anleitung',
    heroTitle: 'Fieldwork nutzen & Ihre Ergebnisse verstehen',
    heroTagline:
      'Fieldwork übersetzt Ihre Signale, Lebensphase und Arbeitsweisen in einen klaren, verständlichen Entwicklungsplan, den Sie direkt umsetzen und mit Führungskräften teilen können.',
    openStudioBtn: 'Live-Studio öffnen →',
    section1Title: 'Schritt für Schritt: So nutzen Sie das Studio',
    section1Subtitle: 'Das Studio aktualisiert sich in Echtzeit, während Sie links Ihre Angaben anpassen.',
    steps: [
      {
        step: 'Schritt 1',
        title: 'Name & Geburtsdatum eingeben',
        desc: 'Geben Sie Ihren Namen und Ihr Geburtsdatum ein. Fieldwork ermittelt Ihr genaues Alter und Ihre Generationskohorte (Gen Z, Millennials, Gen X, Boomers) ohne pauschale Klischees.',
      },
      {
        step: 'Schritt 2',
        title: 'Arbeitskultur & Führungsbedürfnisse abstimmen',
        desc: 'Wählen Sie Faktoren, die Ihre Leistung fördern (Flexibilität, Sinnstiftung, schnelles Feedback), und formulieren Sie Ihre Erwartungen an Führungskräfte.',
      },
      {
        step: 'Schritt 3',
        title: '6 Kernarbeitsmerkmale kalibrieren',
        desc: 'Stellen Sie die Schieberegler von 1 bis 10 für Neugier, Umsetzungsstärke, Beziehungsenergie, Menschenkenntnis, Belastbarkeit und Herausforderungsbereitschaft ein.',
      },
      {
        step: 'Schritt 4',
        title: 'Fokusbereiche & Haupthürde wählen',
        desc: 'Wählen Sie 3 bis 5 Interessenschwerpunkte, benennen Sie Ihr Ziel, identifizieren Sie Ihre größte Hürde und legen Sie den Zeithorizont (30, 60 oder 90 Tage) fest.',
      },
    ],
    section2Title: 'Die 6 zentralen Ergebnisse, die Sie erhalten',
    section2Subtitle: 'Jede Auswertung wird deterministisch berechnet und exakt auf Ihre Angaben zugeschnitten.',
    deliverables: [
      {
        badge: 'Ergebnis 01',
        title: 'Generationsbezogenes Alignment-Playbook',
        desc: 'Baut Vorurteile ab, zeigt optimale Arbeitsbedingungen auf und liefert ein 1-Minuten-Gesprächsskript für Mitarbeitergespräche.',
        highlight: true,
      },
      {
        badge: 'Ergebnis 02',
        title: 'Archetyp & Arbeitssignatur',
        desc: 'Definiert Ihren Leit-Archetyp in Kombination mit Ihrem charakteristischen Arbeitsrhythmus.',
      },
      {
        badge: 'Ergebnis 03',
        title: 'Merkmalsanalyse & Radar-Polygon',
        desc: 'Rangliste der 6 Kernmerkmale mit visuellen Anzeigen und interaktivem 360°-Polygon zum Abgleich von Selbst- und Fremdbild.',
      },
      {
        badge: 'Ergebnis 04',
        title: 'Stärken & Entwicklungsansätze',
        desc: 'Hebt Ihre 3 Top-Stärken hervor und bietet gezielte Gegenstrategien für Ihre schwächsten Merkmale und Ihre Haupthürde.',
      },
      {
        badge: 'Ergebnis 05',
        title: '9-teiliger Phasen-Fahrplan',
        desc: 'Strukturiert in 3 Meilensteine mit interaktiven Checkboxen und Fortschrittsanzeige.',
        highlight: true,
      },
      {
        badge: 'Ergebnis 06',
        title: 'Ein-Klick-Exporte (PDF & Markdown)',
        desc: 'Druckfertiges, aufgeräumtes PDF herunterladen oder vollständige Markdown-Zusammenfassung für Notion, Slack oder E-Mail kopieren.',
      },
    ],
    section3Title: 'Wo & Wann Fieldwork eingesetzt wird',
    useCases: [
      {
        title: 'In 1-on-1s mit Führungskräften',
        desc: 'Nutzen Sie das Skript, um Erwartungen abzustimmen, Autonomie zu vereinbaren und zeitnahes Feedback zu erbitten.',
      },
      {
        title: 'Quartalsweise Entwicklungsgespräche',
        desc: 'Nutzen Sie Ihren 30-, 60- oder 90-Tage-Plan als fundierte Grundlage für Leistungs- und Karrieregespräche.',
      },
      {
        title: 'Führung generationenübergreifender Teams',
        desc: 'Nutzen Sie die Generationsübersicht, um zu verstehen, welche Rahmenbedingungen Kollegen verschiedener Generationen benötigen.',
      },
    ],
    ctaQuestion: 'Bereit, Ihren persönlichen Entwicklungsplan zu erstellen?',
    ctaButton: 'Im Studio starten →',
  },
};

export function getHowToContent(lang: SupportedLanguage): HowToPageContent {
  return HOW_TO_TRANSLATIONS[lang] || HOW_TO_TRANSLATIONS.en;
}
