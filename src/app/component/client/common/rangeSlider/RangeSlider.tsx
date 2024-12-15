import React, { useState } from 'react';

const RangeSlider = ({steps, defaultValue, max, changeDistance}: {steps: number[], defaultValue: number, max: number, changeDistance: (distance: number) => void}) => {
    const [value, setValue] = useState(defaultValue);
    const minStep = Math.min(...steps);

    const handleValueChange = (newValue: number) => {
        setValue(newValue);
        changeDistance(newValue);
    };

    const handleSliderClick = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const percentage = x / rect.width;
        const adjustedPercentage = (percentage * (max - minStep)) + minStep;

        let closest = steps[0];
        let minDiff = Math.abs(adjustedPercentage - steps[0]);

        steps.forEach(step => {
            const diff = Math.abs(adjustedPercentage - step);
            if (diff < minDiff) {
                minDiff = diff;
                closest = step;
            }
        });

        handleValueChange(closest);
    };

    const getProgressWidth = () => {
        return `${((value - minStep) / (max - minStep)) * 100}%`;
    };

    const isPointActive = (step: number) => {
        return step <= value;
    };

    return (
        <div className="w-full mx-auto">
            <div className="relative flex items-center">
                <div className="w-full">
                    <div className="h-[18px] flex items-center">
                        <div
                            className="absolute h-1 bg-bg-3 rounded-full w-full cursor-pointer"
                            onClick={handleSliderClick}
                        >
                            <div
                                className="absolute h-full bg-common rounded-full"
                                style={{ width: getProgressWidth() }}
                            />
                        </div>

                        <div className="w-full relative">
                            {steps.map((step, index) => {
                                const dotSize = step === value ? 18 : 10;

                                return (
                                    <div
                                        key={`index-${index}`}
                                        className="absolute top-1/2"
                                        style={{
                                            left: `${((step - minStep) / (max - minStep)) * 100}%`,
                                            transform: 'translate(-50%, -50%)',
                                            cursor: 'pointer',
                                            zIndex: 2
                                        }}
                                        onClick={() => handleValueChange(step)}
                                    >
                                        <div
                                            className={`rounded-full transition-all
                                                ${isPointActive(step) ? 'bg-common border-2 border-common' : 'bg-bg-2 border-2 border-bg-3'}`}
                                            style={{
                                                width: `${dotSize}px`,
                                                height: `${dotSize}px`
                                            }}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <div className="w-full h-[11px]"/>
                    <div className="w-full relative">
                        {steps.map(step => (
                            <div
                                key={step}
                                className="absolute -translate-x-1/2 text-caption2 font-regular text-text-3"
                                style={{
                                    left: `${((step - minStep) / (max - minStep)) * 100}%`
                                }}
                            >
                                {step}m
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RangeSlider;