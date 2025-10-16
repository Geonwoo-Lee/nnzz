'use client'

import dynamic from 'next/dynamic'
import React from 'react'

// 클라이언트 컴포넌트에서는 ssr: false 사용 가능!
const ReactQueryProvider = dynamic(
    () => import("./ReactQueryProvider"),
    { ssr: false }
)

const ToastProvider = dynamic(
    () => import('@/src/core/ToastProvider'),
    { ssr: false }
)

const AuthProvider = dynamic(
    () => import('./AuthProvider'),
    { ssr: false }
)

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
                <AuthProvider>
                    <SplashScreen>
                        {children}
                    </SplashScreen>
                </AuthProvider>
            </ToastProvider>
        </ReactQueryProvider>
    )
}