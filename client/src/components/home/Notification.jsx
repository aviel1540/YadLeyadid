import React from 'react'

export const Notification = ({ blur }) => {
    return (
        <main className={`${blur && "blur-sm"} p-6 w-full ml-5 flex justify-start mt-10 shadow-md shadow-black/10 md:w-full`}>
            <h1 className='text-lg h-8 mb-5 font-bold underline'>עדכונים</h1>
        </main>
    )
}
