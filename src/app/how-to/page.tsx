import React from 'react';
import Link from 'next/link';
import { Wordmark } from '@/components/Common/Wordmark';
import { Footer } from '@/components/Common/Footer';

export const metadata = {
  title: 'How to Use Fieldwork — User Guide & Deliverables',
  description:
    'Step-by-step guide on how to configure your development signals and get the most out of your Fieldwork development roadmap.',
};

// User Guide & Deliverables page
export default function HowToPage() {
  return (
    <div className="studio-root">
      {/* Top Navigation */}
      <header className="studio-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <Wordmark />
          <span className="badge badge-neutral">User Guide</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Link href="/" className="btn primary" style={{ padding: '6px 14px', fontSize: '13px' }}>
            ← Back to Studio
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="studio-main" style={{ maxWidth: '960px', paddingBottom: '90px' }}>
        {/* Hero Section */}
        <section
          className="dashboard-banner animate-fade-in"
          style={{ marginBottom: '28px' }}
        >
          <div className="banner-sub">
            <span className="badge badge-lime">Interactive Walkthrough</span>
            <span>·</span>
            <span>5-Minute Guide</span>
          </div>
          <h1>How to Use Fieldwork &amp; Your Deliverables</h1>
          <p className="tagline">
            Fieldwork translates your personal signals, life stage, and operating
            traits into a clear, jargon-free development roadmap you can actually
            execute and share with leaders.
          </p>
          <div style={{ marginTop: '16px' }}>
            <Link href="/" className="btn primary">
              Open Live Studio →
            </Link>
          </div>
        </section>

        {/* Section 1: How to Use */}
        <section style={{ marginBottom: '36px' }}>
          <div style={{ marginBottom: '16px' }}>
            <h2 style={{ fontSize: '22px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span
                style={{
                  width: '10px',
                  height: '10px',
                  borderRadius: '2px',
                  background: 'var(--lime-100)',
                  display: 'inline-block',
                }}
              />
              Step-by-Step: How to Use the Studio
            </h2>
            <p style={{ color: 'var(--neutral-500)', fontSize: '14px', margin: '4px 0 0' }}>
              The Studio updates reactively in real time as you adjust inputs on the left.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {/* Step 1 */}
            <div className="hf-card">
              <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                <span
                  style={{
                    background: 'var(--lime-50-a20)',
                    color: 'var(--lime-100)',
                    border: '1px solid rgba(209, 254, 23, 0.35)',
                    padding: '4px 10px',
                    borderRadius: 'var(--r-md)',
                    fontFamily: 'var(--font-grotesk)',
                    fontWeight: 700,
                    fontSize: '13px',
                  }}
                >
                  Step 1
                </span>
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: '16px', marginBottom: '4px' }}>
                    Enter Your Name &amp; Date of Birth (DOB)
                  </h3>
                  <p style={{ color: 'var(--white-a80)', fontSize: '13.5px', margin: 0, lineHeight: 1.5 }}>
                    Enter your first name and pick your birthdate. Fieldwork
                    automatically computes your exact age and unlocks your
                    generational cohort (<strong>Gen Z</strong>,{' '}
                    <strong>Millennials</strong>, <strong>Gen X</strong>, or{' '}
                    <strong>Boomers</strong>) without lazy stereotypes. Also select
                    your role, weekly hours you can protect, and peak energy time.
                  </p>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="hf-card">
              <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                <span
                  style={{
                    background: 'var(--lime-50-a20)',
                    color: 'var(--lime-100)',
                    border: '1px solid rgba(209, 254, 23, 0.35)',
                    padding: '4px 10px',
                    borderRadius: 'var(--r-md)',
                    fontFamily: 'var(--font-grotesk)',
                    fontWeight: 700,
                    fontSize: '13px',
                  }}
                >
                  Step 2
                </span>
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: '16px', marginBottom: '4px' }}>
                    Tune Culture &amp; Leadership Fit
                  </h3>
                  <p style={{ color: 'var(--white-a80)', fontSize: '13.5px', margin: 0, lineHeight: 1.5 }}>
                    Select the workplace conditions that help you thrive (e.g.{' '}
                    <em>Flexibility</em>, <em>Purpose</em>, <em>Fast feedback</em>)
                    and specify what you need from managers (e.g.{' '}
                    <em>Give ownership, not constant oversight</em>,{' '}
                    <em>Coaching, not just managing</em>). These are pre-populated
                    from your generation and can be freely customized.
                  </p>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="hf-card">
              <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                <span
                  style={{
                    background: 'var(--lime-50-a20)',
                    color: 'var(--lime-100)',
                    border: '1px solid rgba(209, 254, 23, 0.35)',
                    padding: '4px 10px',
                    borderRadius: 'var(--r-md)',
                    fontFamily: 'var(--font-grotesk)',
                    fontWeight: 700,
                    fontSize: '13px',
                  }}
                >
                  Step 3
                </span>
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: '16px', marginBottom: '4px' }}>
                    Calibrate Your 6 Operating Traits
                  </h3>
                  <p style={{ color: 'var(--white-a80)', fontSize: '13.5px', margin: 0, lineHeight: 1.5 }}>
                    Move the electric-lime sliders (1 to 10) for{' '}
                    <strong>Curiosity</strong>, <strong>Follow-through</strong>,{' '}
                    <strong>Social energy</strong>, <strong>Reading people</strong>,{' '}
                    <strong>Steadiness under pressure</strong>, and{' '}
                    <strong>Appetite for challenge</strong>. Rate how you{' '}
                    <em>actually operate on a normal week</em>, not an idealized version.
                  </p>
                </div>
              </div>
            </div>

            {/* Step 4 */}
            <div className="hf-card">
              <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                <span
                  style={{
                    background: 'var(--lime-50-a20)',
                    color: 'var(--lime-100)',
                    border: '1px solid rgba(209, 254, 23, 0.35)',
                    padding: '4px 10px',
                    borderRadius: 'var(--r-md)',
                    fontFamily: 'var(--font-grotesk)',
                    fontWeight: 700,
                    fontSize: '13px',
                  }}
                >
                  Step 4
                </span>
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: '16px', marginBottom: '4px' }}>
                    Pick Focus Domains &amp; Blocker
                  </h3>
                  <p style={{ color: 'var(--white-a80)', fontSize: '13.5px', margin: 0, lineHeight: 1.5 }}>
                    Choose 3 to 5 areas of interest (e.g. <em>Technical craft</em>,{' '}
                    <em>Leading people</em>, <em>Writing &amp; speaking</em>), name
                    your target goal, identify your biggest friction point (time,
                    focus, energy, fear of judgment), and set your execution horizon
                    (30, 60, or 90 days).
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Deliverables */}
        <section style={{ marginBottom: '36px' }}>
          <div style={{ marginBottom: '16px' }}>
            <h2 style={{ fontSize: '22px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span
                style={{
                  width: '10px',
                  height: '10px',
                  borderRadius: '2px',
                  background: 'var(--lime-100)',
                  display: 'inline-block',
                }}
              />
              The 6 Key Deliverables You Receive
            </h2>
            <p style={{ color: 'var(--neutral-500)', fontSize: '14px', margin: '4px 0 0' }}>
              Every output is calculated deterministically and customized to your exact answers.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '16px',
            }}
          >
            {/* Deliverable 1 */}
            <div className="hf-card">
              <span className="badge badge-lime" style={{ marginBottom: '10px' }}>
                Deliverable 01
              </span>
              <h3 style={{ fontSize: '16px', marginBottom: '6px' }}>
                Generational Alignment Playbook
              </h3>
              <p style={{ fontSize: '13px', color: 'var(--white-a80)', lineHeight: 1.45 }}>
                Busts unfair stereotypes, validates what environments let you thrive,
                and generates a <strong>1-minute conversation script</strong> you can
                share with your manager in 1-on-1s.
              </p>
            </div>

            {/* Deliverable 2 */}
            <div className="hf-card">
              <span className="badge badge-neutral" style={{ marginBottom: '10px' }}>
                Deliverable 02
              </span>
              <h3 style={{ fontSize: '16px', marginBottom: '6px' }}>
                Archetype &amp; Operational Streak
              </h3>
              <p style={{ fontSize: '13px', color: 'var(--white-a80)', lineHeight: 1.45 }}>
                Identifies your primary archetype (e.g. <em>The Scout</em>,{' '}
                <em>The Closer</em>, <em>The Anchor</em>, <em>The Climber</em>) paired
                with your behavioral streak to capture your unique work identity.
              </p>
            </div>

            {/* Deliverable 3 */}
            <div className="hf-card">
              <span className="badge badge-neutral" style={{ marginBottom: '10px' }}>
                Deliverable 03
              </span>
              <h3 style={{ fontSize: '16px', marginBottom: '6px' }}>
                Ranked Trait Intelligence
              </h3>
              <p style={{ fontSize: '13px', color: 'var(--white-a80)', lineHeight: 1.45 }}>
                Ranks all 6 core operating traits with visual electric-lime meters,
                providing plain-English reads on high, mid, and low scores.
              </p>
            </div>

            {/* Deliverable 4 */}
            <div className="hf-card">
              <span className="badge badge-neutral" style={{ marginBottom: '10px' }}>
                Deliverable 04
              </span>
              <h3 style={{ fontSize: '16px', marginBottom: '6px' }}>
                Strengths &amp; Growth Antidotes
              </h3>
              <p style={{ fontSize: '13px', color: 'var(--white-a80)', lineHeight: 1.45 }}>
                Highlights your top 3 strengths and synergies with chosen domains,
                plus specific counter-strategies for your 2 lowest traits and chosen blocker.
              </p>
            </div>

            {/* Deliverable 5 */}
            <div className="hf-card">
              <span className="badge badge-lime" style={{ marginBottom: '10px' }}>
                Deliverable 05
              </span>
              <h3 style={{ fontSize: '16px', marginBottom: '6px' }}>
                9-Action Phased Roadmap
              </h3>
              <p style={{ fontSize: '13px', color: 'var(--white-a80)', lineHeight: 1.45 }}>
                Sequenced across 3 milestones (<em>Clear the ground</em>,{' '}
                <em>Make it routine</em>, <em>Put it in front of someone</em>) with
                interactive checkboxes and live completion tracking.
              </p>
            </div>

            {/* Deliverable 6 */}
            <div className="hf-card">
              <span className="badge badge-neutral" style={{ marginBottom: '10px' }}>
                Deliverable 06
              </span>
              <h3 style={{ fontSize: '16px', marginBottom: '6px' }}>
                One-Click Exports (PDF &amp; Markdown)
              </h3>
              <p style={{ fontSize: '13px', color: 'var(--white-a80)', lineHeight: 1.45 }}>
                Export a clean, distraction-free PDF formatted for printing or copy
                a complete Markdown summary directly to your clipboard for Notion,
                Slack, or email.
              </p>
            </div>
          </div>
        </section>

        {/* Section 3: Where to Use */}
        <section className="hf-card" style={{ padding: '24px' }}>
          <h2 style={{ fontSize: '20px', marginBottom: '12px' }}>
            Where &amp; When to Use Fieldwork
          </h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '16px',
            }}
          >
            <div>
              <h4 style={{ color: 'var(--lime-100)', marginBottom: '4px' }}>
                1-on-1s with Your Manager
              </h4>
              <p style={{ fontSize: '13px', color: 'var(--white-a80)', margin: 0 }}>
                Use the &ldquo;How to Work With Me&rdquo; script to align expectations,
                request autonomy, and request feedback in a constructive way.
              </p>
            </div>

            <div>
              <h4 style={{ color: 'var(--lime-100)', marginBottom: '4px' }}>
                Quarterly Development Reviews
              </h4>
              <p style={{ fontSize: '13px', color: 'var(--white-a80)', margin: 0 }}>
                Export your 30, 60, or 90-day plan as a PDF to anchor performance
                reviews and professional development discussions.
              </p>
            </div>

            <div>
              <h4 style={{ color: 'var(--lime-100)', marginBottom: '4px' }}>
                Leading Cross-Gen Teams
              </h4>
              <p style={{ fontSize: '13px', color: 'var(--white-a80)', margin: 0 }}>
                Reference the Generational Guide to understand what colleagues from
                different cohorts need to perform at their best.
              </p>
            </div>
          </div>

          <div style={{ marginTop: '24px', borderTop: '1px solid var(--white-a10)', paddingTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
            <p style={{ margin: 0, fontSize: '13.5px', color: 'var(--white-a70)' }}>
              Ready to generate your personalized development plan?
            </p>
            <Link href="/" className="btn primary">
              Start in Studio →
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
