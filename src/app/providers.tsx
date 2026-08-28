"use client"

import { ReactNode } from "react"
import { TooltipProvider } from "@/components/ui/tooltip"
import { UserProfileProvider } from "@/lib/user-profile-context"

export function Providers({ children }: { children: ReactNode }) {
  return (
    <UserProfileProvider>
      <TooltipProvider>{children}</TooltipProvider>
    </UserProfileProvider>
  )
}