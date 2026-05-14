import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { Loader2 } from "lucide-react"

const buttonVariants = cva(
  // BASE: Swapped blue-500 for shadcn's semantic 'ring' variable
  "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        // PRIMARY: Uses your global --primary color. /90 adds a dynamic hover state!
        primary: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm",
        
        // OUTLINE: Uses the global border, background, and accent hover variables
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        
        // GHOST: Transparent base, uses accent variables on hover
        ghost: "hover:bg-accent hover:text-accent-foreground text-foreground/80",
        
        // ELEVATED: Keeps the shadow but uses semantic colors for the text and hover
        elevated: "bg-background text-primary hover:bg-accent hover:text-accent-foreground shadow-lg border border-border",

        segmentedInactive: "bg-transparent text-muted-foreground hover:text-foreground shadow-none border-none",
        segmentedActive: "bg-background text-primary shadow-sm border-none hover:bg-background",
      },
      size: {
        sm: "h-9 px-3 text-xs",
        md: "h-10 px-4 py-2",
        lg: "h-12 px-8 text-base",
        xl: "h-14 px-8 text-lg",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
      isLoading?: Boolean;
    }

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, isLoading, disabled, children, ...props }, ref) => {
    const isDisabled = !!isLoading || !!disabled
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={isDisabled}
        {...props}
      >
        {isLoading && (
          <Loader2 className={cn("h-4 w-4 animate-spin", children && "mr-2")} />
        )}
        {children}
      </button>

    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }