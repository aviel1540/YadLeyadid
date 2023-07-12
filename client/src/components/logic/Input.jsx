import { forwardRef } from "react"
import { cn } from "~/lib"

export const Input = forwardRef(({ className, type, title, ...props }, ref) => {
    return (
        <input
            type={type}
            {...props}
            className={cn('block px-4 py-2 mt-2 border rounded-md', className)}
            ref={ref}
        />
    )
})
