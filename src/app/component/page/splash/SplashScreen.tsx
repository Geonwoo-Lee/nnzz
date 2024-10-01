'use client'
import React, { useState, useEffect, ReactNode } from "react"
import { usePathname } from "next/navigation"
import Image from 'next/image'

const SplashScreen = ({ children }: { children: ReactNode }) => {
    const [isLoading, setIsLoading] = useState(true)

    const pathname = usePathname()
    const isLanding = pathname === "/"

    useEffect(() => {
        if (isLanding) {
            document.querySelector('meta[name="theme-color"]')?.setAttribute('content', '#FF334C')
        }

        const timeout = setTimeout(() => {
            setIsLoading(false)
            if (isLanding) {
                document.querySelector('meta[name="theme-color"]')?.setAttribute('content', '#fff')
            }
        }, 700)

        return () => {
            clearTimeout(timeout)
            document.querySelector('meta[name="theme-color"]')?.setAttribute('content', '#fff')
        }
    }, [isLanding])

    return (
        isLoading && isLanding ? (
            <div
                className="animate-fadeInPage flex h-[100vh] w-full items-center justify-center relative bg-[#FF334C] bg-cover bg-center bg-blue-gray-900">
                <div className='w-[219px] h-[219px] bg-common-white rounded-full flex items-center justify-center'>
                    <Image  alt='splash' src={'/images/logo/nnzz-splash-logo.png'} width={156} height={156}/>
                </div>
            </div>
        ) : (
            <>
                {children}
            </>
        )
    )
}

export default SplashScreen