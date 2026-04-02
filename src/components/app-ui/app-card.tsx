import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { Card, CardHeader, CardContent } from "@/components/ui/card"

const appCardVariants = cva("flex flex-col", {
  variants: {
    variant: {
      default: "min-h-[140px] shadow-sm",
      category:
        "min-h-[110px] bg-muted/30 dark:bg-muted/10 shadow-none ring-0 border border-transparent hover:border-border transition-all cursor-pointer group py-3 px-4 gap-3 data-[size=sm]:py-3 data-[size=sm]:gap-3",
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

export type AppCardProps = React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof appCardVariants>

// 1. The Base Card (Standardizes our min-height and padding)
export const AppCard = React.forwardRef<HTMLDivElement, AppCardProps>(
  ({ className, variant, ...props }, ref) => (
    <Card
      ref={ref}
      className={cn(appCardVariants({ variant }), className)}
      {...props}
    />
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