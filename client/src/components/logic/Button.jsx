import { FaSpinner } from 'react-icons/fa'
import { cn } from "~/lib"

export const Button = ({ className, children, disabled, isLoading, ...props }) => {

    return (
        <button
            {...props}
            className={cn({ "cursor-not-allowed": disabled }, className)}
            disabled={disabled}
        >
            {isLoading ?
                <div className="flex justify-center">
                    <FaSpinner className='h-5 w-5 animate-spin text-black/80' />
                </div>
                : children}
        </button>
    )
}
