# Fieldwork — Real-Time Development Studio & Generational Playbook

A modern, high-contrast **Single Page Application (SPA)** built with **Next.js 15 (App Router, React 19, TypeScript)** adhering strictly to the **Higgsfield AI design system**. 

Fieldwork translates your personal signals, life stage, and baseline operating traits into an actionable, jargon-free personal development roadmap and generational alignment playbook.

---

## 🎨 Higgsfield AI Design System

The application is built upon the high-contrast Higgsfield aesthetic:
- **Canvas & Deep Surfaces**: Deep black canvas (`#0f1113`), dark elevated panels (`#1a1a1a`, `#23262a`), and clean subtle borders (`rgba(255, 255, 255, 0.1)`).
- **Electric Lime Signature Accent**: `lime-100` (`#d1fe17`) for active controls, custom range sliders, progress meters, checkmarks, badges, and brand highlights.
- **Typography**: Google Fonts `Inter` (`font-sans`) for clean readability and `Space Grotesk` (`font-grotesk`) for bold titles, badges, and stats via `next/font/google`.
- **Custom Elevation**: Inset neon outlines (`inset 0 0 0 1.5px #d1fe17`), glowing hover states, and calibrated border radii (`sm: 2px`, `md: 6px`, `lg: 10px`, `xl: 12px`, `full: 9999px`).
- **4px Spatial Grid**: Strict layout spacing adhering to 4px increments.

---

## 🚀 How to Use the App

The studio features a **live 2-column layout** where your roadmap and diagnostics update reactively in real time:

1. **Identity & Date of Birth (DOB)**:
   - Enter your name and pick your **Date of Birth (DOB)**.
   - Fieldwork automatically calculates your exact age and identifies your generational cohort (**Gen Z**, **Millennials**, **Gen X**, **Boomers**, or **Gen Alpha**).
   - Select your current role, weekly hours you can protect, and peak mental clarity window.
2. **Work Culture & Leadership Fit**:
   - Select what conditions help you do your best work (e.g., *Flexibility*, *Clear expectations*, *Purpose*, *Collaboration*).
   - Choose how you prefer to be led and supported by managers and peers (e.g., *Give ownership, not constant oversight*, *Coaching, not just managing*).
3. **Calibrate 6 Operating Traits**:
   - Adjust the electric-lime range sliders (1 to 10) for:
     - **Curiosity**: Sticking with what you know vs. Chasing new things
     - **Follow-through**: Improvising as you go vs. Finishing what you start
     - **Social Energy**: Recharging alone vs. Recharging around people
     - **Reading People**: Focusing on the task vs. Tracking the room
     - **Steadiness under Pressure**: Feeling it sharply vs. Staying level
     - **Appetite for Challenge**: Protecting what works vs. Pushing for more
4. **Focus & Ambitions**:
   - Pick 3 to 5 areas of interest (e.g., *Technical craft*, *Leading people*, *Creative work*, *Starting something*).
   - Choose your primary target goal for this horizon.
5. **Friction & Horizon**:
   - Name your honest blocker (*Time*, *Focus drift*, *Fear of judgment*, *Unclear next step*, *Low energy*, or *Finishing stalled projects*).
   - Select your learning style and planning horizon (**30**, **60**, or **90** days).

---

## 📦 Deliverables Produced by the App

Fieldwork delivers a comprehensive suite of personalized career and development assets:

### 1. Generational Alignment Playbook
- **Busts the Stereotype**: Replaces lazy generation tropes with empowering plain truth.
- **Your Thrive Checklist**: Concrete environmental factors you need to do your best work.
- **What You Need from Leadership**: Specific expectations for support and collaboration.
- **"How to Work with Me" 1-Minute Script**: A copy-pasteable phrase ready to share with managers in 1-on-1s or team READMEs.
- **Cross-Generational Leadership Tip**: Guidance for leading colleagues across other generations.

### 2. Behavioral Archetype & Operating Streak
- Categorizes your primary archetype (*The Scout*, *The Closer*, *The Connector*, *The Reader*, *The Anchor*, or *The Climber*).
- Pairs it with your secondary behavioral streak (e.g. *a restless streak*, *a finishing streak*, *a calm streak*).

### 3. Ranked Trait Diagnostics
- Visual electric-lime percentage meters ranking all 6 core operating traits from strongest baseline to lowest.
- Detailed descriptions contextualizing your high, mid, or low tendencies.

### 4. Strengths to Lean On & Growth Antidotes
- **Top 3 Strengths**: Tactical suggestions and synergy notes based on your chosen focus domains.
- **Where to Put the Work**: Targeted action items for your 2 lowest traits plus an actionable remedy for your named blocker.

### 5. Plain Nature Analysis
- Nuanced assessment of your social processing style, recovery under pressure, peak energy windows, and learning mode.

### 6. Interactive 9-Action Phased Roadmap
- Sequenced across 3 phases:
  - **Phase 1**: *Clear the ground*
  - **Phase 2**: *Make it routine*
  - **Phase 3**: *Put it in front of someone*
- Interactive checkboxes with task strike-through and a live progress tracker (`X of 9 completed`).
- Weekly habit chips to reinforce consistency.

### 7. Instant Sharing & Export Tools
- **Copy Plan**: One-click Markdown export of your complete plan to the clipboard for Notion, Slack, or documentation.
- **Export PDF**: Clean, print-optimized format with buttons and navigation hidden.
- **Local Persistence**: All inputs, selected tags, and checked tasks are safely remembered in `localStorage`.

---

## 📖 In-App Guide Page (`/how-to`)

Visit the interactive guide anytime by clicking **Guide & Deliverables** in the top navigation or navigating to:
```
http://localhost:3000/how-to
```
It provides a detailed breakdown of each deliverable, tips for 1-on-1s, and quarterly review frameworks.

---

## 🛠️ Project Structure

```
my-nature/
├── README.md                           # Documentation, Deliverables & Compliance guide
├── package.json                        # Next.js 15, React 19, TypeScript
├── tsconfig.json                       # Path aliases (@/*)
├── next.config.ts                      # Next.js configuration
├── src/
│   ├── app/
│   │   ├── layout.tsx                  # Inter & Space Grotesk Google fonts, Metadata & Signature
│   │   ├── page.tsx                    # Live Single Page Studio (SPA) + Footer
│   │   ├── how-to/
│   │   │   └── page.tsx                # Dedicated User Guide & Deliverables page
│   │   ├── privacy/
│   │   │   └── page.tsx                # Privacy Policy, GDPR/CCPA & Zero-Tracking Guarantee
│   │   ├── terms/
│   │   │   └── page.tsx                # Terms of Service & Open Source License
│   │   ├── robots.ts                   # Next.js App Router robots.txt generator
│   │   ├── sitemap.ts                  # Next.js App Router sitemap.xml generator
│   │   ├── error.tsx                   # Client-side error boundary with recovery
│   │   ├── not-found.tsx               # Custom 404 page with brand styling
│   │   └── globals.css                 # Complete Higgsfield AI design system & WCAG AA focus rings
│   ├── types/
│   │   └── plan.ts                     # TypeScript interfaces
│   ├── lib/
│   │   ├── constants.ts                # Traits, Interests, Infographic Generation data
│   │   ├── engine.ts                   # Deterministic assessment & playbook engine
│   │   └── storage.ts                  # Safe browser localStorage persistence
│   └── components/
│       ├── Common/
│       │   ├── Wordmark.tsx            # Brand mark with electric lime diamond
│       │   ├── Button.tsx              # Higgsfield button component
│       │   ├── Footer.tsx              # Trust anchors, legal links, and author credits
│       │   └── ConsoleSignature.tsx    # DevTools styled console branding & window.Fieldwork helper
│       ├── Studio/
│       │   ├── StudioHeader.tsx        # Top navbar with view switcher & export actions
│       │   └── SignalsPanel.tsx        # Left column: DOB, Culture, Traits, Focus inputs
│       └── Dashboard/
│           ├── DashboardView.tsx       # Live plan orchestrator
│           ├── BannerHeader.tsx        # Live Archetype hero card
│           ├── GenerationalPlaybookCard.tsx # Infographic guide & 1-on-1 script
│           ├── TraitScoresPanel.tsx    # 6 ranked trait meters
│           ├── StrengthsPanel.tsx      # Top 3 strengths + synergy
│           ├── GrowthPanel.tsx         # Bottom 2 traits + blocker remedy
│           ├── NaturePlainlyPanel.tsx  # Unvarnished personality read
│           ├── PhasedPlanCard.tsx      # 3-phase 9-action roadmap with checklist
│           └── NotesReviewPanel.tsx    # Custom user notes callout
```

---

## ⚡ Getting Started

### Prerequisites
- Node.js 18+ (tested on Node v22)
- npm, yarn, or pnpm

### Installation

```bash
npm install
```

### Running Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) (or port specified in terminal) in your browser.

### Type-Checking & Verification

```bash
npm run lint    # Runs tsc --noEmit
```

### Production Build

```bash
npm run build
npm run start
```

---

## 🔒 Web Trust, Privacy & Anti-Dark Patterns

Fieldwork is built according to rigorous consumer trust and legal standards:
- **Zero Remote Telemetry**: 100% of data processing (archetype derivation, generational playbook matching, trait scoring) happens client-side. No user input or date of birth is sent across the internet.
- **Zero Tracking Cookies**: No marketing pixels, third-party cookies, or surveillance scripts.
- **Data Minimization**: Uses browser `localStorage` solely to maintain your active plan and completed tasks.
- **1-Click Reset**: Clear all stored data at any time with a single confirmation.
- **Transparent Open Access**: Free forever, no paywalls, no drip pricing, no subscription continuity traps.
- **WCAG 2.1 AA Accessibility**: High contrast dark theme tokens, semantic HTML5 structure, accessible range sliders, and high-visibility `:focus-visible` focus rings for keyboard navigation.

---

## 💻 Developer Console Signature & DevTools API

When opening browser Developer Tools (`F12`), Fieldwork outputs a styled ASCII branding banner and registers an interactive helper object on `window.Fieldwork`:

```javascript
// Available in browser DevTools:
Fieldwork.help()             // Displays available helper commands table
Fieldwork.getPlan()          // Returns current state, tasks, and calculated assessment
Fieldwork.getState()         // Returns raw input signals
Fieldwork.getCompletedTasks()// Returns checked milestones dictionary
Fieldwork.reset()            // Prompts and clears saved data
Fieldwork.developer          // Author metadata and profile links
Fieldwork.version            // Active application build version
```

---

## 📄 License & Author

- **Author**: Karthikeyan T ([@carthworks](https://github.com/carthworks))
- **LinkedIn**: [Karthikeyan T](https://www.linkedin.com/in/carthworks)
- **License**: Released under the **Apache-2.0 / MIT License**. Free for personal and commercial self-development use.

