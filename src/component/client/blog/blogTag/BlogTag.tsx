'use client'

import { useRouter } from "next/navigation"
import React from "react"

type Props = {
  children: string
}

const Tag: React.FC<Props> = ({ children }) => {
  const router = useRouter()

  const handleClick = (value: string) => {
    router.push(`/?tag=${value}`)
  }

  return (
    <div
      onClick={() => handleClick(children)}
      className="py-2 px-3 rounded-full text-caption2 font-medium leading-4 text-red-600 bg-red-50 cursor-pointer hover:bg-red-100 transition-colors"
    >
      {children}
    </div>
  )
}

export default Tag