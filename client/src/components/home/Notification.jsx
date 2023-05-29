import React from 'react'

export const Notification = ({ blur }) => {
    return (
        <div className={`${blur && "blur-sm"} p-6 w-full ml-5 flex justify-center mt-10 shadow-md shadow-black/10 md:w-full`}>
            <span className='text-lg'>עידכונים</span>
        </div>
    )
}
