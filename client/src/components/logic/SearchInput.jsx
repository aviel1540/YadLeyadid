import { TextField } from '@mui/material'
import React from 'react'
import { cn } from '~/lib'

export const SearchInput = ({ className, placeholder, helperText, setText }) => {
    return (
        <TextField
            id="outlined-search"
            variant="standard"
            type="search"
            className={cn("w-50", className)}
            placeholder={placeholder}
            helperText={helperText}
            onChange={({ target }) => setText(target.value)}
            color="warning"
        />
    )
}
