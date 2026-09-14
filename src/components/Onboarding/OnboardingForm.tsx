import React, { useState } from 'react';
import { PlanFormState } from '@/types/plan';
import { StepIndicator } from './StepIndicator';
import { Step1About } from './Step1About';
import { Step2Traits } from './Step2Traits';
import { Step3Interests } from './Step3Interests';
import { Step4Obstacles } from './Step4Obstacles';
import { Button } from '../Common/Button';
import { Wordmark } from '../Common/Wordmark';

interface OnboardingFormProps {
  state: PlanFormState;
  onChange: (updates: Partial<PlanFormState>) => void;
  onComplete: () => void;
  currentStep: number;
  onStepChange: (step: number) => void;
}

const TOTAL_STEPS = 4;

export const OnboardingForm: React.FC<OnboardingFormProps> = ({
  state,
  onChange,
  onComplete,
  currentStep,
  onStepChange,
}) => {
  const [errorMessage, setErrorMessage] = useState('');

  const validateStep = (step: number): string => {
    if (step === 1) {
      if (!state.name.trim()) {
        return 'Add a first name so the plan has somebody to talk to.';
      }
      if (!state.age || state.age < 13 || state.age > 99) {
        return 'Enter an age between 13 and 99.';
      }
    }
    if (step === 3 && state.interests.length < 3) {
      return 'Pick at least three areas — three is what the plan needs to work with.';
    }
    return '';
  };

  const handleNext = () => {
    const error = validateStep(currentStep);
    if (error) {
      setErrorMessage(error);
      return;
    }
    setErrorMessage('');
    if (currentStep === TOTAL_STEPS) {
      onComplete();
      return;
    }
    const nextStep = currentStep + 1;
    onStepChange(nextStep);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setErrorMessage('');
      const prevStep = currentStep - 1;
      onStepChange(prevStep);
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  };

  return (
    <main id="onboarding" className="sheet">
      <Wordmark />

      <div className="mast">
        <h1>
          A development plan<br />built from your answers
        </h1>
        <div className="markerline">
          Six minutes of questions. One plan you can actually work through.
        </div>
      </div>

      <div className="promise">
        <div>
          <h3>What we ask for</h3>
          <ul>
            <li>Your age and what you do right now</li>
            <li>How you operate, on six sliders</li>
            <li>Three to five areas you care about</li>
            <li>One goal and the thing blocking it</li>
            <li>How much time you have each week</li>
          </ul>
        </div>
        <div>
          <h3>What you get back</h3>
          <ul>
            <li>Your character traits, scored and explained</li>
            <li>The strengths to lean on</li>
            <li>Two or three areas to work on, and why</li>
            <li>A read on your nature, minus the clichés</li>
            <li>A dated action plan you can tick off</li>
          </ul>
        </div>
      </div>

      <form
        id="form"
        className="card"
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
          handleNext();
        }}
      >
        <StepIndicator currentStep={currentStep} totalSteps={TOTAL_STEPS} />

        {currentStep === 1 && <Step1About state={state} onChange={onChange} />}
        {currentStep === 2 && <Step2Traits state={state} onChange={onChange} />}
        {currentStep === 3 && (
          <Step3Interests state={state} onChange={onChange} />
        )}
        {currentStep === 4 && (
          <Step4Obstacles state={state} onChange={onChange} />
        )}

        {errorMessage && (
          <p className="err" id="err" role="alert">
            {errorMessage}
          </p>
        )}

        <div className="nav">
          {currentStep > 1 ? (
            <Button
              type="button"
              variant="quiet"
              id="back"
              onClick={handleBack}
            >
              Go back
            </Button>
          ) : (
            <span></span>
          )}
          <span></span>
          <Button type="button" variant="primary" id="next" onClick={handleNext}>
            {currentStep === TOTAL_STEPS ? 'Build my plan' : 'Continue'}
          </Button>
        </div>
      </form>
    </main>
  );
};
