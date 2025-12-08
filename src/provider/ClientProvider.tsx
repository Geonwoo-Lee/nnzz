'use client'

import dynamic from 'next/dynamic'
import React from 'react'
import LoginBottomSheetProvider from "@/src/core/LoginBottomSheetProvider";

const ReactQueryProvider = dynamic(
    () => import("./ReactQueryProvider"),
    { ssr: false }
)

const ToastProvider = dynamic(
    () => import('@/src/core/ToastProvider'),
    { ssr: false }
)

// const AuthProvider = dynamic(
//     () => import('./AuthProvider'),
//     { ssr: false }
// )

const SplashScreen = dynamic(
    () => import("@/src/component/client/page/splash/SplashScreen"),
    { ssr: false }
)

export default function ClientProviders({
                                            children
                                        }: {
    children: React.ReactNode
}) {
    return (
        <ReactQueryProvider>
            <ToastProvider>
              <LoginBottomSheetProvider>
                {/*<AuthProvider>*/}
                    <SplashScreen>
                        {children}
                    </SplashScreen>
                {/*</AuthProvider>*/}
              </LoginBottomSheetProvider>
            </ToastProvider>
        </ReactQueryProvider>
    )
}