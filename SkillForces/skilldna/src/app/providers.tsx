"use client"

import { ReactNode } from "react"
import { TooltipProvider } from "@/components/ui/tooltip"

export function Providers({ children }: { children: ReactNode }) {
  return (
    <TooltipProvider>{children}</TooltipProvider>
  )
}