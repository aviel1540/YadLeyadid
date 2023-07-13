import React from 'react'
import { Client, TitleTab } from '~/components'

export const ClientPage = () => {

    return (
        <>
            <TitleTab title="איזור אישי" key='client' />
            <Client />
        </>

    )
}
