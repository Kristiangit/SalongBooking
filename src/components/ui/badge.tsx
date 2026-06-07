import * as React from "react"

import { cn } from "@/lib/utils"

const Badge = React.forwardRef<HTMLSpanElement, React.HTMLAttributes<HTMLSpanElement>>(function Badge(
  { className, ...props },
  ref
) {
  return (
    <span
      ref={ref}
      className={cn(
        "inline-flex rounded-full bg-slate-800/90 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-slate-300 shadow-sm shadow-slate-950/20",
        className
      )}
      {...props}
    />
  )
})
Badge.displayName = "Badge"

export { Badge }
