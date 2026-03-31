import * as React from "react"
import { cn } from "@/lib/utils"
import { Card, CardHeader, CardContent } from "@/components/ui/card"

// 1. The Base Card (Standardizes our min-height and padding)
export const AppCard = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <Card ref={ref} className={cn("flex flex-col min-h-[140px] shadow-sm", className)} {...props} />
  )
)
AppCard.displayName = "AppCard"

// 2. The Header Layout (Flex between for Top Row)
export const AppCardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <CardHeader ref={ref} className={cn("flex flex-row justify-between items-start p-4 pb-0", className)} {...props} />
  )
)
AppCardHeader.displayName = "AppCardHeader"

// 3. The Content Layout (Pushes to bottom, standardizes spacing)
export const AppCardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <CardContent ref={ref} className={cn("mt-auto p-4 pt-4", className)} {...props} />
  )
)
AppCardContent.displayName = "AppCardContent"

// 4. Typography: Metric Label (The tiny uppercase text)
export const AppCardLabel = ({ className, children }: React.HTMLAttributes<HTMLParagraphElement>) => (
  <p className={cn("text-[10px] md:text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1", className)}>
    {children}
  </p>
)

// 5. Typography: Metric Value (The giant number)
export const AppCardValue = ({ className, children }: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h3 className={cn("text-2xl md:text-3xl font-extrabold text-foreground", className)}>
    {children}
  </h3>
)

// 6. Utility Elements: Icon Box & Standard Badges
export const AppCardIcon = ({ className, children }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("p-2.5 rounded-lg bg-primary/10 text-primary", className)}>
    {children}
  </div>
)