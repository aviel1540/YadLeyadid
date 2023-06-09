import { clsx } from "clsx"
import { twMerge } from 'tailwind-merge'

export const Button = ({ className, disabled, title, ...props }) => {

    const cn = (...input) => {
        return twMerge(clsx(input))
    }

    return (
        <button {...props} className={cn({ "cursor-not-allowed": disabled }, className)} disabled={disabled}>{title}</button>
    )
}
