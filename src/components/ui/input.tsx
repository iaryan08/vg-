<<<<<<< HEAD

=======
>>>>>>> a99bb5b93e16a4ead5edf2e777a0d89891ddb0d1
import * as React from "react"

import { cn } from "@/lib/utils"

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
<<<<<<< HEAD
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
=======
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
>>>>>>> a99bb5b93e16a4ead5edf2e777a0d89891ddb0d1
    )
  }
)
Input.displayName = "Input"

export { Input }
