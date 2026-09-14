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
3. **Calibrate 6 Operating Traits & Grounded Forced Choices**:
   - **Forced-Choice Behavioral Dilemmas**:
     - **Follow-Through**: *"Scrap & Restart Fresh"* vs. *"Finish It Badly"* (replaces abstract self-rating with real dilemma tradeoffs).
     - **Challenge & Ambition**: *"Fortify What Works"* vs. *"Push Into the Deep End"*.
   - **Calibrated Sliders**:
     - **Curiosity**: Sticking with what you know vs. Chasing new things
     - **Social Energy**: Recharging alone vs. Recharging around people
     - **Reading People**: Focusing on the task vs. Tracking the room
     - **Steadiness under Pressure**: Feeling it sharply vs. Staying level
   - **Reverse-Worded Verification Probes**:
     - Validates stated traits against visceral delivery friction (detects acquiescence and aspiration bias).
   - **Straight-Lining Detection**:
     - Automatically flags if all sliders land in the 5–7 mid-zone, encouraging genuine contrast.
   - **360° Colleague Rating & Dual Hexagon Overlay**:
     - Share a private link (`/peer-review?u=...&s=...`) for a peer or manager to rate observed traits.
     - Draws a dual-color polygon (**Electric Lime** for Self vs. **Electric Cyan** for Colleague) revealing **Blindspots** and **Hidden Superpowers**.
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

## ⚡ Signal Quality Upgrades Implemented

To eliminate self-assessment noise and straight-lining, Fieldwork implements a comprehensive three-tier signal quality calibration system:

> *"Signal quality is your weakest link. Six self-rated sliders is one person's opinion of themselves on a good day."*

### 1. Straight-Lining & Mid-Zone Clustering Detection
- **The Problem**: When respondents rate everything moderately (5–7), traditional tools present an unearned, confident archetype built entirely on noise.
- **The Fix**: Fieldwork computes real-time variance and mid-zone clustering across your 6 operating traits. If all traits land between 5 and 7 (or score variance $< 1.0$), the studio flags **`Straight-Lining Detected`** with an electric-rose diagnostic banner urging the user to embrace genuine contrast and identify real operational peaks and valleys.

### 2. Reverse-Worded Verification Probes
- **The Problem**: Aspiration bias leads people to rate themselves high on abstract traits like Curiosity and Steadiness.
- **The Fix**: Introduces visceral delivery friction probes with agreement chips:
  - *Curiosity Check*: *"I prefer sticking to standard, proven routines over experimenting with unproven methods."*
  - *Steadiness Check*: *"Unexpected emergencies throw off my focus for the remainder of the day."*
- Detects discrepancies between self-image and delivery reality.

### 3. Grounded Forced-Choice Behavioral Dilemma Cards
- **The Problem**: Asking someone to rate their own follow-through or ambition yields self-flattery.
- **The Fix**: Replaces abstract sliders with concrete behavioral tradeoffs:
  - **Follow-Through Dilemma**: *"When a critical project stalls, I'd rather scrap it and restart fresh / push through and finish it badly than leave it half-done."*
  - **Challenge & Ambition Dilemma**: *"When choosing your next horizon, I'd rather fortify and master proven systems / push into the deep end on an ambiguous stretch."*

### 4. 360° Colleague Calibration & Dual Hexagon Overlay
- **The Problem**: Self-ratings only reflect one person's internal self-image.
- **The Fix**: 
  - Generate a secure, private share URL (`/peer-review?u=...&s=...`) for a colleague, manager, or peer to rate observed traits (100% client-side via URL query encoding, zero remote storage).
  - Draws the colleague's shape in **Electric Cyan** directly over the user's **Electric Lime** polygon in the radar container.
  - Automatically calculates **Perception Gaps**:
    - **Blindspots**: Areas where self-rating exceeds peer observations by $\ge 2$ points.
    - **Hidden Superpowers**: Strengths colleagues experience that the user undervalues.
    - **Aligned Baselines**: Shared mutual clarity.

### 5. Mobile-Ready Responsive Architecture
- **Adaptive Layout**: 100% fluid across viewports from 320px (iPhone SE, compact Android) up to 4K displays.
- **Sticky Mobile Tab Switcher**: Full-width segmented tab switcher (`Studio` / `Plan View` / `Signals`) allowing users on mobile to easily flip between entering signals and viewing their live roadmap without endless scrolling.
- **Touch Targets ($\ge 44\text{px}$)**: Enhanced range slider thumbs (26px touch targets), full-width stacked dilemma cards on small screens, and spacious checklist tap targets adhering strictly to WCAG 2.1 AA.
- **Safe Area Insets**: Native notch and dynamic island padding support on iOS Safari (`env(safe-area-inset-top/bottom)`).

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

