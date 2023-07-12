import { IconButton } from '@mui/material'
import { BsFillSendCheckFill } from 'react-icons/bs'
import { cn } from '~/lib'

export const SendIcon = ({ onClick, title, className }) => {
    return (
        <IconButton onClick={onClick}>
            <BsFillSendCheckFill
                color={`${title !== "add" ? "#1fb6ff" : "#13ce66"}`}
                className={cn(className)}
            />
        </IconButton>
    )
}
