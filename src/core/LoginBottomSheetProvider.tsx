'use client';

import { createContext, ReactNode, useContext, useState, useCallback, useRef, useEffect } from "react";
import LoginBottomSheet from "@/src/component/client/common/loginBottomSheet/LoginBottomSheet";

type LoginResult = 'login' | 'close';

interface LoginBottomSheetContextType {
  showLoginSheet: () => Promise<LoginResult>;
  hideLoginSheet: () => void;
  isVisible: boolean;
}

const LoginBottomSheetContext = createContext<LoginBottomSheetContextType | undefined>(undefined);

interface LoginBottomSheetProviderProps {
  children: ReactNode;
}

const LoginBottomSheetProvider = ({ children }: LoginBottomSheetProviderProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const resolveRef = useRef<((value: LoginResult) => void) | null>(null);

  const showLoginSheet = useCallback(() => {
    return new Promise<LoginResult>((resolve) => {
      resolveRef.current = resolve;
      setIsVisible(true);
    });
  }, []);

  const hideLoginSheet = useCallback(() => {
    setIsVisible(false);
    if (resolveRef.current) {
      resolveRef.current('close');
      resolveRef.current = null;
    }
  }, []);

  const handleLoginSuccess = useCallback(() => {
    setIsVisible(false);
    if (resolveRef.current) {
      resolveRef.current('login');
      resolveRef.current = null;
    }
  }, []);

  useEffect(() => {
    return () => {
      if (resolveRef.current) {
        resolveRef.current('close');
        resolveRef.current = null;
      }
    };
  }, []);

  const value = {
    showLoginSheet,
    hideLoginSheet,
    isVisible
  };

  return (
    <LoginBottomSheetContext.Provider value={value}>
      {children}
      <LoginBottomSheet
        open={isVisible}
        close={hideLoginSheet}
        onLoginSuccess={handleLoginSuccess}
      />
    </LoginBottomSheetContext.Provider>
  );
};

export default LoginBottomSheetProvider;

export const useLoginBottomSheet = () => {
  const context = useContext(LoginBottomSheetContext);
  if (!context) {
    throw new Error("useLoginBottomSheet must be used within a LoginBottomSheetProvider");
  }
  return context;
};