interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  stepLabels: string[];
}

export default function ProgressBar({ currentStep, totalSteps, stepLabels }: ProgressBarProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-2">
        {stepLabels.map((label, index) => {
          const stepNumber = index + 1;
          const isActive = stepNumber === currentStep;
          const isCompleted = stepNumber < currentStep;

          return (
            <div key={index} className="flex items-center flex-1">
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-all ${
                    isCompleted
                      ? 'bg-gold text-navy'
                      : isActive
                      ? 'bg-gold text-navy ring-4 ring-gold/30'
                      : 'bg-white/10 text-white/50'
                  }`}
                >
                  {isCompleted ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    stepNumber
                  )}
                </div>
                <span
                  className={`text-xs mt-2 font-medium text-center ${
                    isActive ? 'text-gold' : isCompleted ? 'text-white' : 'text-white/50'
                  }`}
                >
                  {label}
                </span>
              </div>
              {index < totalSteps - 1 && (
                <div
                  className={`flex-1 h-1 mx-2 rounded transition-all ${
                    isCompleted ? 'bg-gold' : 'bg-white/10'
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
