"use client"

import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"
import { cn } from "@/lib/utils"
import { getProficiencyColor } from "@/lib/utils"

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> & {
    showLabel?: boolean
    proficiency?: number
  }
>(({ className, value, showLabel, proficiency, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      "relative h-2 w-full overflow-hidden rounded-full bg-secondary",
      className
    )}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className={cn(
        "h-full w-full flex-1 bg-primary transition-all duration-1000 ease-out",
        proficiency && `bg-gradient-to-r from-blue-500 to-purple-500`
      )}
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    />
    {showLabel && proficiency !== undefined && (
      <div className="absolute top-full left-0 mt-1 flex justify-between text-xs text-muted-foreground">
        <span>0%</span>
        <span className={cn("font-medium", getProficiencyColor(proficiency))}>
          {proficiency}%
        </span>
        <span>100%</span>
      </div>
    )}
  </ProgressPrimitive.Root>
))
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }