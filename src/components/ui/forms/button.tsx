import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { Loader2 } from "lucide-react"

import { cn } from "../../../lib/utils"
import { useClickBackpressure } from "../../../hooks/use-click-backpressure"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0" +
  " hover-elevate active-elevate-2",
  {
    variants: {
      variant: {
        default:
          // @replit: no hover, and add primary border
          "bg-primary text-primary-foreground border border-primary-border",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm border-destructive-border",
        outline:
          "border border-button-outline shadow-xs active:shadow-none",
        // filled with lower opacity — clear distinction from the default primary button
        secondary:
          "border bg-primary/10 text-primary border-primary/20 hover:bg-primary/15",
        // @replit no hover, transparent border
        ghost: "border border-transparent",
        link: "text-primary underline underline-offset-4 hover:opacity-80",
      },
      size: {
        // @replit changed sizes
        default: "min-h-9 px-4 py-2",
        sm: "min-h-8 rounded-md px-3 text-xs",
        lg: "min-h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  /**
   * Shows a spinner and disables the button while true.
   * The spinner replaces any leading icon; text is preserved.
   */
  isLoading?: boolean
  /** Label shown next to the spinner when isLoading is true. Defaults to children. */
  loadingText?: string
  /**
   * Cooldown duration in seconds to prevent rapid multiple clicks.
   * Pass any number in seconds (e.g. 1, 0.5, 2) or `true` for the default 1 second.
   * Pass `false` or `0` to disable debouncing.
   */
  debounceSec?: number | boolean | undefined
  /**
   * Callback invoked when a click is blocked by cooldown or in-flight backpressure.
   */
  onBlocked?: ((reason: 'in_flight' | 'cooldown') => void) | undefined
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      isLoading = false,
      loadingText,
      debounceSec,
      onBlocked,
      onClick,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    let effectiveDebounceSec: number | false
    if (debounceSec === false) {
      effectiveDebounceSec = false
    } else if (typeof debounceSec === "number") {
      effectiveDebounceSec = debounceSec
    } else {
      effectiveDebounceSec = 1
    }

    const isDebounceDisabled =
      effectiveDebounceSec === false || effectiveDebounceSec <= 0

    const { execute: debouncedOnClick, isPending } = useClickBackpressure(onClick, {
      debounceSec: isDebounceDisabled ? false : effectiveDebounceSec,
      disabled: isDebounceDisabled,
      onBlocked,
    })

    const isEffectiveLoading = isLoading || (!isDebounceDisabled && isPending)
    const Comp = asChild ? Slot : "button"

    let handleClick: React.MouseEventHandler<HTMLButtonElement> | undefined
    if (onClick) {
      if (isDebounceDisabled) {
        handleClick = onClick
      } else {
        handleClick = (e) => {
          void debouncedOnClick(e)
        }
      }
    }

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled || isEffectiveLoading}
        aria-busy={isLoading || isPending}
        onClick={handleClick}
        {...props}
      >
        {isEffectiveLoading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin shrink-0" />
            {loadingText ?? children}
          </>
        ) : (
          children
        )}
      </Comp>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
