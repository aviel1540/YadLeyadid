import { cn } from "~/lib"

export const Button = ({ className, disabled, title, ...props }) => {

    return (
        <button
            {...props}
            className={cn({ "cursor-not-allowed": disabled }, className)}
            disabled={disabled}>
            {title}
        </button>
    )
}
