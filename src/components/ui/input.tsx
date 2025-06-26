import * as React from "react"

import { cn } from "@/lib/utils"

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <div className="relative group w-full">
        <input
          type={type}
          className={cn(
            "flex h-10 w-full rounded-none border-0 border-b-2 border-input bg-transparent px-3 py-2 text-base file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            className
          )}
          ref={ref}
          {...props}
        />
        <div className="absolute bottom-0 left-0 h-[2px] w-full origin-center scale-x-0 bg-focus-gradient bg-400 transition-transform duration-300 group-focus-within:scale-x-100 group-focus-within:animate-gradient-flow" />
      </div>
    )
  }
)
Input.displayName = "Input"

export { Input }
