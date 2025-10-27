'use client'

import { useRouter } from "next/navigation"
import React from "react"
import { COLOR_SET } from "@/src/func/common/color.utils"

export const getColorClassByName = (name: string): string => {
    try {
        let sum = 0
        name.split("").forEach((alphabet) => (sum = sum + alphabet.charCodeAt(0)))
        const colorKey = sum
            .toString(16)
            ?.[sum.toString(16).length - 1].toUpperCase()
        return COLOR_SET[colorKey]
    } catch {
        return COLOR_SET[0]
    }
}

type Props = {
    children: string
    readOnly?: boolean
}

const BlogCategory: React.FC<Props> = ({ readOnly = false, children }) => {
    const router = useRouter()

    const handleClick = (value: string) => {
        if (readOnly) return
        router.push(`/blog/?category=${value}`)
    }

    return (
        <div
            onClick={() => handleClick(children)}
            className={`py-1 px-2 rounded-full w-fit text-sm opacity-90 text-gray-100 ${
                readOnly ? "cursor-default" : "cursor-pointer"
            }`}
            style={{
                backgroundColor: getColorClassByName(children),
            }}
        >
            {children}
        </div>
    )
}

export default BlogCategory