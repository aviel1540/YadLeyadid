import { IconButton } from '@mui/material'
import clsx from 'clsx'
import React from 'react'
import { BsFillSendCheckFill } from 'react-icons/bs'
import { twMerge } from 'tailwind-merge'

export const SendIcon = ({ onClick, title, className }) => {

    const cn = (...input) => twMerge(clsx(input))

    return (
        <IconButton onClick={onClick} >
            <BsFillSendCheckFill
                color={`${title !== "add" ? "#1fb6ff" : "#13ce66"}`}
                className={cn(className)} />
        </IconButton>
    )
}
