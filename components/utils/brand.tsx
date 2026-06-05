import React from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

function Brand({ className }: { className?: string }) {
  return (
    <Link href="/">
      <h2 className={cn("text-white font-bold text-2xl tracking-tight")}>
        TYKON
      </h2>
    </Link>
  )
}

export default Brand