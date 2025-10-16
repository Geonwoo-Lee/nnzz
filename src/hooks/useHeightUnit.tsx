import {useState, useEffect} from 'react';

type HeightUnit = 'vh' | 'dvh';

interface UseHeightUnitReturn {
    unit: HeightUnit;
}

export const useHeightUnit = (): UseHeightUnitReturn => {
    const [heightUnit, setHeightUnit] = useState<HeightUnit>('vh');

    useEffect(() => {
        if (typeof window === 'undefined') return;
        try {
            const isPWA: boolean =
                !!window.navigator.standalone ||
                window.matchMedia("(display-mode: standalone)").matches;
            const isMobile: boolean = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
                navigator.userAgent
            );

            let unit: HeightUnit;
            if (isPWA) {
                unit = 'vh';
            } else if (isMobile) {
                unit = 'dvh';
            } else {
                unit = 'vh';
            }
            setHeightUnit(unit);

        } catch (e) {
            console.error('Error in useHeightUnit:', e);
            setHeightUnit('vh');
        }
    }, []);


    return {
        unit: heightUnit,
    };
};