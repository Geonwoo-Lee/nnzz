import React, { useState, ReactElement, useMemo } from 'react';

interface StepProps {
    children: React.ReactNode;
}

interface FunnelProps {
    children: ReactElement<StepProps>[];
    reverse?: boolean;  // reverse prop 추가
}

type FunnelComponent = React.FC<FunnelProps> & {
    Step: React.FC<StepProps>;
};

export function useNestedFunnel(initialStep: number = 1) {
    const [step, setStep] = useState<number>(initialStep);

    const Step: React.FC<StepProps> = ({ children }) => {
        return <>{children}</>;
    };

    Step.displayName = "Step";

    const NestedFunnel: FunnelComponent = useMemo(() => {
        type FunnelComponentWithStep = React.FC<FunnelProps> & { Step: React.FC<StepProps> };

        const FunnelComponent: FunnelComponentWithStep = ({ children, reverse = false }) => {
            const childrenArray = React.Children.toArray(children) as ReactElement<StepProps>[];
            const visibleChildren = childrenArray.slice(0, step);

            const orderedChildren = reverse ? [...visibleChildren].reverse() : visibleChildren;

            return (
                <>
                    {orderedChildren.map((child, index) => (
                        <div key={`funnel-step-${reverse ? step - index - 1 : index}`}>
                            {React.cloneElement(child, {
                                ...child.props,
                            })}
                        </div>
                    ))}
                </>
            );
        };

        FunnelComponent.Step = Step;
        return FunnelComponent;
    }, [step]);

    return {
        Funnel: NestedFunnel,
        currentStep: step,
        nextStep: () => setStep(prev => prev + 1),
        prevStep: () => setStep(prev => Math.max(prev - 1, 1)),
        goToStep: (newStep: number) => setStep(newStep),
    };
}