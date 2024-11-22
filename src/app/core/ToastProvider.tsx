'use client';

import { createContext, ReactNode, useContext, useState, useCallback, useRef, useEffect } from "react";
import {ToastAlign, ToastPosition} from "@/src/app/types/common/toast";
import Toast from "@/src/app/component/client/common/toast/Toast";

type ToastItem = {
    id: number;
    message: string;
    position: ToastPosition;
    align: ToastAlign;
};

type ShowToastFunction = (
    message: string,
    position: ToastPosition,
    align: ToastAlign,
) => void;

const ToastContext = createContext<ShowToastFunction | undefined>(undefined);

const ToastProvider = ({ children }: { children: ReactNode }) => {
    const [currentToast, setCurrentToast] = useState<ToastItem | null>(null);
    const [isVisible, setIsVisible] = useState(false);
    const toastQueue = useRef<ToastItem[]>([]);
    const toastIdCounter = useRef(0);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const clearCurrentTimeout = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }
    };

    const isToastDuplicate = (message: string): boolean => {
        if (currentToast && currentToast.message === message) {
            return true;
        }
        return toastQueue.current.some(toast => toast.message === message);
    };

    const showNextToast = useCallback(() => {
        clearCurrentTimeout();
        if (toastQueue.current.length > 0) {
            const nextToast = toastQueue.current.shift()!;
            setCurrentToast(nextToast);
            setIsVisible(true);

            timeoutRef.current = setTimeout(() => {
                setIsVisible(false);
                timeoutRef.current = setTimeout(showNextToast, 300);
            }, 2000);
        } else {
            setCurrentToast(null);
        }
    }, []);

    const showToast: ShowToastFunction = useCallback((message, position, align) => {
        // 중복 메시지 체크
        if (isToastDuplicate(message)) {
            return; // 중복된 메시지가 있으면 새 토스트를 표시하지 않음
        }

        const newToast: ToastItem = { id: toastIdCounter.current++, message, position, align };

        if (currentToast === null && !isVisible) {
            setCurrentToast(newToast);
            setIsVisible(true);
            clearCurrentTimeout();
            timeoutRef.current = setTimeout(() => {
                setIsVisible(false);
                timeoutRef.current = setTimeout(showNextToast, 300);
            }, 2000);
        } else {
            // 큐에 최대 5개의 토스트만 허용
            if (toastQueue.current.length < 5) {
                toastQueue.current.push(newToast);
            }
        }
    }, [currentToast, isVisible, showNextToast]);

    useEffect(() => {
        return () => clearCurrentTimeout();
    }, []);

    return (
        <ToastContext.Provider value={showToast}>
            {children}
            {currentToast && (
                <Toast
                    key={currentToast.id}
                    message={currentToast.message}
                    isVisible={isVisible}
                    align={currentToast.align}
                    position={currentToast.position}
                />
            )}
        </ToastContext.Provider>
    );
};

export default ToastProvider;

export const useToast = (): ShowToastFunction => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error("useToast must be used within a ToastProvider");
    }
    return context;
};