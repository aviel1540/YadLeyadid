import React from 'react'
import { Administrator, TitleTab } from '~/components'

export const AdministratorPage = () => {
    return (
        <>
            <TitleTab title="מנהלי מערכת" key='administrator' />
            <Administrator />
        </>
    )
}
