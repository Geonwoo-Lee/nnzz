'use client'
import { useState, useEffect } from 'react';

let scriptPromise: Promise<boolean> | null = null;

export const useNaverMapLoaded = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [mapScriptError, setMapScriptError] = useState<string | null>(null);

    useEffect(() => {
        if (typeof window !== 'undefined' && window.naver && window.naver.maps) {
            setIsLoaded(true);
            return;
        }

        // 이미 스크립트 태그가 있는지 확인
        const existingScript = document.querySelector(
            'script[src*="oapi.map.naver.com"]'
        );

        if (existingScript) {
            // 스크립트는 있지만 아직 로드 안됨
            const checkInterval = setInterval(() => {
                if (window.naver && window.naver.maps) {
                    setIsLoaded(true);
                    clearInterval(checkInterval);
                }
            }, 100);

            const timeout = setTimeout(() => {
                clearInterval(checkInterval);
                if (!window.naver || !window.naver.maps) {
                    setMapScriptError('Naver Maps script load timeout');
                }
            }, 10000); // 10초 타임아웃

            return () => {
                clearInterval(checkInterval);
                clearTimeout(timeout);
            };
        }

        // 스크립트가 없으면 새로 로드
        if (!scriptPromise) {
            scriptPromise = new Promise<boolean>((resolve, reject) => {
                const script = document.createElement('script');
                script.src = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${process.env.NEXT_PUBLIC_NAVER_CLIENT_ID}`;
                script.async = true;

                script.onload = () => {
                    // 스크립트 로드 후 naver 객체 확인
                    const checkNaver = setInterval(() => {
                        if (window.naver && window.naver.maps) {
                            clearInterval(checkNaver);
                            setIsLoaded(true);
                            resolve(true);
                        }
                    }, 50);

                    setTimeout(() => {
                        clearInterval(checkNaver);
                        if (!window.naver || !window.naver.maps) {
                            const error = new Error('Naver Maps object not available');
                            setMapScriptError(error.message);
                            reject(error);
                        }
                    }, 5000);
                };

                script.onerror = () => {
                    const errorMsg = 'Failed to load Naver Maps script';
                    setMapScriptError(errorMsg);
                    scriptPromise = null; // 재시도 가능하도록 리셋
                    reject(new Error(errorMsg));
                };

                document.head.appendChild(script);
            });
        }

        scriptPromise
            .then(() => setIsLoaded(true))
            .catch(err => {
                setMapScriptError(err instanceof Error ? err.message : 'Unknown error');
            });
    }, []);

    return { isLoaded, mapScriptError };
};