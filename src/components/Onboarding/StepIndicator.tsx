import React from 'react';

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

export const StepIndicator: React.FC<StepIndicatorProps> = ({
  currentStep,
  totalSteps,
}) => {
  return (
    <>
      <div className="stepbar" aria-hidden="true">
        {Array.from({ length: totalSteps }).map((_, i) => {
          const stepNumber = i + 1;
          const statusClass =
            stepNumber < currentStep
              ? 'done'
              : stepNumber === currentStep
              ? 'now'
              : '';
          return <span key={stepNumber} className={statusClass}></span>;
        })}
      </div>
      <p className="stepno">
        Step {currentStep} of {totalSteps}
      </p>
    </>
  );
};
