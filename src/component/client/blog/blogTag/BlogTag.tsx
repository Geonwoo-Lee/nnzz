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
      className="py-1 px-2 rounded-full text-xs leading-4 font-normal text-slate-600 bg-slate-300 cursor-pointer hover:bg-slate-400 transition-colors"
    >
      {children}
    </div>
  )
}

export default Tag