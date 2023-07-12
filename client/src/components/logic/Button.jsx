import { cn } from "~/lib"
import { FaSpinner } from 'react-icons/fa'

export const Button = ({ className, disabled, title, isLoading, children, ...props }) => {

    return (
        <button
            {...props}
            className={cn({ "cursor-not-allowed": disabled }, className)}
            disabled={disabled}
        >
            {isLoading ?
                <div className="flex justify-center">
                    <FaSpinner className='mr-2 h-5 w-5 animate-spin text-black/75' />
                </div>
                : title}
        </button>
    )
}
