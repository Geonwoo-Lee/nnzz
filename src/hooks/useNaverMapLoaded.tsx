'use client'
import { useState, useEffect } from 'react';

let isNaverMapScriptLoaded = false;
let scriptPromise: Promise<boolean> | null = null;

export const useNaverMapLoaded = () => {
    const [isLoaded, setIsLoaded] = useState(isNaverMapScriptLoaded);
    const [mapScriptError, setMapScriptError] = useState<string | null>(null);

    useEffect(() => {
        if (isNaverMapScriptLoaded) {
            setIsLoaded(true);
            return;
        }

        if (!scriptPromise) {
            scriptPromise = new Promise<boolean>((resolve, reject) => {
                const script = document.createElement('script');
                script.src = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_PUBLIC_NAVER_CLIENT_ID}`;
                script.async = true;

                script.onload = () => {
                    isNaverMapScriptLoaded = true;
                    setIsLoaded(true);
                    resolve(true);
                };

                script.onerror = (error) => {
                    setMapScriptError('Failed to load Naver Maps script');
                    reject(error);
                };

                document.head.appendChild(script);
            });
        } else {
            scriptPromise.then(() => {
                setIsLoaded(true);
            }).catch(err => {
                setMapScriptError(err instanceof Error ? err.message : 'Unknown error');
            });
        }
    }, []);

    return { isLoaded, mapScriptError };
};